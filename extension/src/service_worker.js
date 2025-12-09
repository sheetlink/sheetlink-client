// service_worker.js - Background service worker for extension

import { CONFIG } from '../config.js';

// Debug logging utility - only logs when CONFIG.DEBUG is true
const debug = (...args) => {
  if (CONFIG.DEBUG) {
    console.log(...args);
  }
};

// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default settings on first install
    chrome.storage.sync.set({
      accountsTabName: 'Accounts',
      transactionsTabName: 'Transactions',
      rulesTabName: 'Rules',
      enableRulesTab: false,
      appendOnly: true,
      backendUrl: CONFIG.BACKEND_URL
    });

    // Open welcome page on first install
    chrome.tabs.create({ url: 'https://sheetlink.app/welcome' });

    // Auto-open popup after welcome page loads
    setTimeout(() => {
      openExtensionPopup();
    }, 2000);
  }
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case 'GET_AUTH_TOKEN':
      handleGetAuthToken(sendResponse, message.forceAuth || false);
      return true; // Keep channel open for async response

    case 'EXCHANGE_PUBLIC_TOKEN':
      handleExchangePublicToken(message, sendResponse);
      return true;

    case 'STORE_SESSION':
      handleStoreSession(message.data, sendResponse);
      return true;

    case 'GET_SESSION':
      handleGetSession(sendResponse);
      return true;

    case 'CLEAR_SESSION':
      handleClearSession(sendResponse);
      return true;

    case 'PLAID_CONNECTED':
      handlePlaidConnected(sendResponse);
      return true;

    case 'PLAID_OAUTH_SUCCESS':
      handlePlaidOAuthSuccess(message, sendResponse);
      return true;

    default:
      sendResponse({ error: 'Unknown message type' });
  }
});

// Exchange Plaid public token for item_id
async function handleExchangePublicToken(message, sendResponse) {
  try {
    const { publicToken, metadata } = message;

    // Phase 3.8: Get Google user ID from storage (set during sign-in)
    const { googleUserId } = await chrome.storage.sync.get(['googleUserId']);

    if (!googleUserId) {
      throw new Error('Not authenticated with Google. Please sign in first.');
    }

    // Call backend to exchange token
    const response = await fetch(`${CONFIG.BACKEND_URL}/plaid/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        public_token: publicToken,
        client_user_id: googleUserId || `anonymous_${Date.now()}`,
        env: CONFIG.ENV
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      // Phase 3.8: Handle rate limiting (HTTP 429)
      if (response.status === 429) {
        throw new Error(errorData.detail || 'Rate limit exceeded');
      }

      throw new Error(`Exchange failed: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    const itemId = data.item_id;

    // Phase 3.14.0: Store pending institution for popup to pick up after reopen
    // Don't overwrite existing itemId - let popup handle adding to institutions array
    await chrome.storage.sync.set({
      pendingInstitution: {
        itemId: itemId,
        institutionName: metadata?.institution?.name || 'Bank',
        institutionId: metadata?.institution?.institution_id || null,
        connectedAt: Date.now()
      }
    });

    // Notify popup of success (if it's listening)
    chrome.runtime.sendMessage({
      type: 'PLAID_LINK_SUCCESS',
      itemId: itemId
    }, () => {
      // Ignore "no receiver" errors - popup might not be open
      if (chrome.runtime.lastError) {
        // Expected - popup might not be open
      }
    });

    sendResponse({ success: true, itemId });
  } catch (error) {
    // Notify popup of error (if it's listening)
    chrome.runtime.sendMessage({
      type: 'PLAID_LINK_ERROR',
      error: error.message
    }, () => {
      // Ignore "no receiver" errors - popup might not be open
      if (chrome.runtime.lastError) {
        // Expected - popup might not be open
      }
    });

    sendResponse({ error: error.message });
  }
}

// Store pending OAuth callback
let pendingOAuthCallback = null;

// Helper function to clear expired token
async function clearExpiredToken() {
  await chrome.storage.local.remove(['googleAccessToken', 'googleTokenExpiry']);
  debug('[Auth] Cleared expired token from storage');
}

// Launch OAuth flow via regular window
async function launchOAuthFlow(sendResponse) {
  const scopes = CONFIG.GOOGLE_SCOPES.join(' ');
  const extensionId = chrome.runtime.id;
  // Add extension_id as state parameter so it gets passed through OAuth
  const state = JSON.stringify({ extension_id: extensionId });
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${CONFIG.GOOGLE_CLIENT_ID}&` +
    `response_type=token id_token&` +
    `redirect_uri=${encodeURIComponent(CONFIG.GOOGLE_REDIRECT_URI)}&` +
    `scope=${encodeURIComponent(scopes)} openid&` +
    `state=${encodeURIComponent(state)}`;

  // Store the callback for later when the OAuth page sends us the token
  pendingOAuthCallback = sendResponse;

  // Open OAuth in a new window
  chrome.windows.create({
    url: authUrl,
    type: 'popup',
    width: 500,
    height: 600,
    focused: true
  });
}

// Get Google OAuth token using manual OAuth flow
async function handleGetAuthToken(sendResponse, forceAuth = false) {
  try {
    // Check if we have a cached token in storage
    const result = await chrome.storage.local.get(['googleAccessToken', 'googleTokenExpiry']);
    const now = Date.now();
    const bufferMs = 5 * 60 * 1000; // 5 minute buffer

    // Return cached token if valid and not expiring soon (unless forcing auth)
    if (!forceAuth &&
        result.googleAccessToken &&
        result.googleTokenExpiry &&
        result.googleTokenExpiry > (now + bufferMs)) {
      const minutesRemaining = Math.round((result.googleTokenExpiry - now) / 60000);
      debug('[Auth] Returning cached token (expires in', minutesRemaining, 'minutes)');
      sendResponse({ token: result.googleAccessToken });
      return;
    }

    // Phase 3.11 + 3.14: Distinguish between first-time auth and re-authentication
    // Check if user has EVER authenticated (separate from having a valid token)
    const syncData = await chrome.storage.sync.get(['googleAuthenticated', 'googleEmail', 'googleUserId']);

    // Phase 3.14.1: Migration - If user has googleEmail/googleUserId but no googleAuthenticated flag,
    // they authenticated before we added the flag. Treat them as authenticated.
    const hasEverAuthenticated = syncData.googleAuthenticated === true ||
                                 !!syncData.googleEmail ||
                                 !!syncData.googleUserId;

    // - forceAuth = true (user clicked button) → always launch OAuth
    // - Never authenticated before = first-time auth → launch OAuth
    // - Previously authenticated = re-authentication → return error (let UI handle)
    const isFirstTimeAuth = !hasEverAuthenticated;

    if (forceAuth || isFirstTimeAuth) {
      debug('[Auth]', forceAuth ? 'User-initiated' : 'First-time', 'authentication, launching OAuth flow');
      // Clear token before launching OAuth
      await clearExpiredToken();
      await launchOAuthFlow(sendResponse);
    } else {
      // Token expired during re-authentication
      const minutesRemaining = result.googleTokenExpiry ?
        Math.round((result.googleTokenExpiry - now) / 60000) : 0;
      debug('[Auth] Re-authentication needed (token expired', minutesRemaining, 'minutes ago), returning error');

      // DON'T clear token yet - keep it so subsequent calls also return error
      // Token will be cleared when user clicks "Continue with Google"
      sendResponse({ error: 'AUTH_EXPIRED' });
    }

  } catch (error) {
    console.error('[Auth] Error in handleGetAuthToken:', error);
    sendResponse({ error: error.message });
  }
}

// Handle OAuth callback from the callback page
chrome.runtime.onMessageExternal.addListener(async (message, sender, sendResponse) => {
  debug('[Service Worker] Received message from external:', message.type);

  if (message.type === 'OAUTH_SUCCESS') {
    debug('[Service Worker] Processing OAUTH_SUCCESS callback');
    const { accessToken, idToken, expiresIn } = message;  // Phase 3.16.0: Also receive ID token

    // Cache the token with expiry
    const expiry = Date.now() + (parseInt(expiresIn) * 1000);
    await chrome.storage.local.set({
      googleAccessToken: accessToken,
      googleTokenExpiry: expiry
    });

    // Phase 3.8: Get Google user ID from Google's API using the access token
    try {
      const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user info from Google');
      }

      const userInfo = await response.json();

      if (userInfo && userInfo.id) {
        debug('[Service Worker] Successfully fetched Google user ID:', userInfo.id);
        debug('[Service Worker] Profile picture URL:', userInfo.picture);

        // Phase 3.13.1: Check if user is switching Google accounts
        const currentData = await chrome.storage.sync.get(['googleEmail', 'hasCompletedInitialOnboarding']);
        const currentEmail = currentData.googleEmail;
        const newEmail = userInfo.email;

        if (currentEmail && currentEmail !== newEmail) {
          // ACCOUNT SWITCH DETECTED - Clear all account-specific data
          console.warn('[Service Worker] ⚠️ Account switch detected!');
          console.warn(`[Service Worker] Old account: ${currentEmail}`);
          console.warn(`[Service Worker] New account: ${newEmail}`);
          console.warn('[Service Worker] Clearing all account-specific data...');

          // Clear all account data except onboarding flag
          await chrome.storage.sync.clear();
          await chrome.storage.local.clear();

          // Restore onboarding flag if it existed
          if (currentData.hasCompletedInitialOnboarding) {
            await chrome.storage.sync.set({ hasCompletedInitialOnboarding: true });
            debug('[Service Worker] Preserved onboarding flag');
          }

          debug('[Service Worker] ✅ Account data cleared - fresh start for new account');

          // Phase 3.13.1: Broadcast account switch to all popups to invalidate StateManager
          chrome.runtime.sendMessage({
            type: 'ACCOUNT_SWITCHED',
            oldEmail: currentEmail,
            newEmail: newEmail,
            newUserData: {
              googleUserId: userInfo.id,
              googleEmail: userInfo.email,
              googlePicture: userInfo.picture,
              googleAuthenticated: true
            }
          }, () => {
            // Ignore errors - popup might not be open
            if (chrome.runtime.lastError) {
              debug('[Service Worker] No popup to notify (expected if closed)');
            }
          });
        }

        await chrome.storage.sync.set({
          googleUserId: userInfo.id,
          googleEmail: userInfo.email || null,
          googlePicture: userInfo.picture || null,
          googleAuthenticated: true
        });

        debug('[Service Worker] Stored googleUserId, googleEmail, googlePicture, and googleAuthenticated flag');

        // Phase 3.16.0: Call /auth/login with ID token to get JWT
        if (idToken) {
          try {
            debug('[Service Worker] Calling /auth/login with ID token...');
            const loginResponse = await fetch(`${CONFIG.BACKEND_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ id_token: idToken })
            });

            if (!loginResponse.ok) {
              const errorData = await loginResponse.json().catch(() => ({}));
              throw new Error(`Login failed: ${errorData.detail || loginResponse.statusText}`);
            }

            const loginData = await loginResponse.json();
            debug('[Service Worker] Login successful:', loginData.email, loginData.subscription_tier);

            // Store JWT token and user info
            const jwtExpiry = Date.now() + (60 * 60 * 1000); // 60 minutes
            await chrome.storage.sync.set({
              jwtToken: loginData.token,
              jwtExpiry: jwtExpiry,
              userId: loginData.user_id,
              userEmail: loginData.email,
              userTier: loginData.subscription_tier
            });

            debug('[Service Worker] Stored JWT token and user info (tier:', loginData.subscription_tier, ')');
          } catch (error) {
            console.error('[Service Worker] Failed to authenticate with backend:', error);
            // Don't fail the OAuth flow - user can still use extension without JWT
          }
        } else {
          console.warn('[Service Worker] No ID token received - JWT authentication skipped');
        }
      } else {
        console.error('[Service Worker] No user ID in Google userinfo response:', userInfo);
      }
    } catch (error) {
      console.error('[Service Worker] Failed to get Google user ID:', error);
    }

    // Call the pending callback if it exists
    if (pendingOAuthCallback) {
      pendingOAuthCallback({ token: accessToken });
      pendingOAuthCallback = null;
    }

    // Close the OAuth window
    if (sender.tab && sender.tab.windowId) {
      chrome.windows.remove(sender.tab.windowId);
    }

    // Respond to the callback page
    sendResponse({ success: true });

    // Auto-open popup after OAuth
    setTimeout(() => {
      openExtensionPopup();
    }, 500);
  }
});

// Store session data
async function handleStoreSession(data, sendResponse) {
  try {
    await chrome.storage.local.set({ session: data });
    sendResponse({ success: true });
  } catch (error) {
    sendResponse({ error: error.message });
  }
}

// Get session data
async function handleGetSession(sendResponse) {
  try {
    const result = await chrome.storage.local.get('session');
    sendResponse({ session: result.session || null });
  } catch (error) {
    sendResponse({ error: error.message });
  }
}

// Clear session data
async function handleClearSession(sendResponse) {
  try {
    await chrome.storage.local.remove('session');
    sendResponse({ success: true });
  } catch (error) {
    sendResponse({ error: error.message });
  }
}

// Helper function to open extension popup
async function openExtensionPopup() {
  try {
    // Try to open the normal action popup first (like clicking the icon)
    try {
      await chrome.action.openPopup();
    } catch (popupError) {
      // Check if error is because popup is already open
      const errorMsg = popupError.message.toLowerCase();
      if (errorMsg.includes('popup') && (errorMsg.includes('showing') || errorMsg.includes('open'))) {
        return; // Don't open a new window if popup is already showing
      }

      // Fallback: Create a small centered window if action popup fails for other reasons

      const width = 400;
      const height = 600;

      // Get current window to calculate centered position
      const currentWindow = await chrome.windows.getCurrent();
      const left = Math.round(currentWindow.left + (currentWindow.width - width) / 2);
      const top = Math.round(currentWindow.top + (currentWindow.height - height) / 2);

      await chrome.windows.create({
        url: chrome.runtime.getURL('src/popup.html'),
        type: 'popup',
        width: width,
        height: height,
        left: left,
        top: top,
        focused: true
      });
    }
  } catch (error) {
    // Error opening popup
  }
}

// Handle Plaid OAuth callback success (production flow)
async function handlePlaidOAuthSuccess(message, sendResponse) {
  try {
    const { publicToken, metadata } = message;

    // Exchange the public token
    const exchangeResult = await handleExchangePublicTokenAsync({ publicToken, metadata });

    if (exchangeResult.error) {
      sendResponse({ error: exchangeResult.error });
      return;
    }

    // Notify popup of success
    chrome.runtime.sendMessage({
      type: 'PLAID_OAUTH_SUCCESS',
      publicToken: publicToken
    }, () => {
      // Ignore "no receiver" errors
      if (chrome.runtime.lastError) {
        // Expected - popup might not be open
      }
    });

    // Respond to callback page
    sendResponse({ success: true, itemId: exchangeResult.itemId });

    // Give the callback page time to show success message, then open popup
    setTimeout(async () => {
      await openExtensionPopup();
    }, 2000);
  } catch (error) {
    sendResponse({ error: error.message });
  }
}

// Async version of handleExchangePublicToken for internal use
async function handleExchangePublicTokenAsync(message) {
  try {
    const { publicToken, metadata } = message;

    // Phase 3.8: Get Google user ID from storage (set during sign-in)
    const { googleUserId } = await chrome.storage.sync.get(['googleUserId']);

    if (!googleUserId) {
      throw new Error('Not authenticated with Google. Please sign in first.');
    }

    // Call backend to exchange token
    const response = await fetch(`${CONFIG.BACKEND_URL}/plaid/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        public_token: publicToken,
        client_user_id: googleUserId,
        env: CONFIG.ENV
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Exchange failed: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    const itemId = data.item_id;

    // Phase 3.14.0: Store pending institution for popup to pick up after reopen
    // Don't overwrite existing itemId - let popup handle adding to institutions array
    await chrome.storage.sync.set({
      pendingInstitution: {
        itemId: itemId,
        institutionName: data.institution_name || metadata?.institution?.name || 'Bank',
        institutionId: metadata?.institution?.institution_id || null,
        connectedAt: Date.now()
      },
      sheetlink_connection_status: {
        status: 'connected',
        mode: CONFIG.ENV,
        institutionName: data.institution_name || metadata?.institution?.name || 'Bank',
        justConnected: true
      }
    });

    return { success: true, itemId };
  } catch (error) {
    return { error: error.message };
  }
}

// Handle Plaid connection success - open popup
async function handlePlaidConnected(sendResponse) {
  // Respond immediately so Plaid window can close without waiting
  sendResponse({ success: true });

  // Continue popup opening asynchronously
  (async () => {
    try {
      // Wait for Plaid Link window to fully close before opening popup
      // This prevents the action popup from disappearing when the Plaid tab closes
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Open popup using helper function
      await openExtensionPopup();
    } catch (error) {
      // Error opening popup after Plaid connection
    }
  })();
}

// Handle extension uninstall
chrome.runtime.setUninstallURL('https://forms.gle/feedback');

// Periodic cleanup of old data (called manually, no auto-sync in MVP)
async function cleanupOldData() {
  try {
    const data = await chrome.storage.sync.get(['lastSync']);

    if (data.lastSync) {
      const daysSinceSync = (Date.now() - data.lastSync) / (1000 * 60 * 60 * 24);

      if (daysSinceSync > 90) {
        // Show notification or badge
      }
    }
  } catch (error) {
    // Error in cleanup
  }
}

// ===== Phase 3.11: Background Token Monitoring =====

// Token monitoring configuration
const TOKEN_CHECK_INTERVAL = 10; // Check every 10 minutes
const TOKEN_REFRESH_THRESHOLD = 15 * 60 * 1000; // Warn if < 15 minutes remaining

// Start token monitoring on extension startup
chrome.runtime.onStartup.addListener(() => {
  debug('[Service Worker] Starting token monitor');
  scheduleTokenCheck();
});

// Start token monitoring on extension install/update
chrome.runtime.onInstalled.addListener(() => {
  debug('[Service Worker] Extension installed, starting token monitor');
  scheduleTokenCheck();
});

// Schedule periodic token checks using alarms
function scheduleTokenCheck() {
  chrome.alarms.create('tokenCheck', {
    periodInMinutes: TOKEN_CHECK_INTERVAL
  });
  debug('[Token Monitor] Scheduled token check every', TOKEN_CHECK_INTERVAL, 'minutes');
}

// Handle alarm events
chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === 'tokenCheck') {
    await checkAndRefreshToken();
  }
});

// Check token expiry and log warnings
async function checkAndRefreshToken() {
  try {
    const result = await chrome.storage.local.get(['googleAccessToken', 'googleTokenExpiry']);
    const { googleAuthenticated } = await chrome.storage.sync.get(['googleAuthenticated']);

    // Only check if user is authenticated
    if (!googleAuthenticated) {
      debug('[Token Monitor] User not authenticated, skipping check');
      return;
    }

    if (!result.googleAccessToken || !result.googleTokenExpiry) {
      debug('[Token Monitor] No token found');
      return;
    }

    const now = Date.now();
    const timeRemaining = result.googleTokenExpiry - now;
    const minutesRemaining = Math.round(timeRemaining / 60000);

    debug('[Token Monitor] Token check - time remaining:', minutesRemaining, 'minutes');

    // If token expires in less than 15 minutes, log warning
    if (timeRemaining < TOKEN_REFRESH_THRESHOLD && timeRemaining > 0) {
      console.warn('[Token Monitor] Token expiring soon (', minutesRemaining, 'minutes)');
      console.warn('[Token Monitor] User will need to re-authenticate on next API call');
    }

    // If already expired, clear it
    if (timeRemaining <= 0) {
      debug('[Token Monitor] Token expired, clearing from storage');
      await chrome.storage.local.remove(['googleAccessToken', 'googleTokenExpiry']);
    }

  } catch (error) {
    console.error('[Token Monitor] Error checking token:', error);
  }
}

