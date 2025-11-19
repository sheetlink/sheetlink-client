// service_worker.js - Background service worker for extension

import { CONFIG } from '../config.js';

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
      handleGetAuthToken(sendResponse);
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

    default:
      sendResponse({ error: 'Unknown message type' });
  }
});

// Exchange Plaid public token for item_id
async function handleExchangePublicToken(message, sendResponse) {
  try {
    const { publicToken, metadata } = message;

    // Get user ID from storage
    const userData = await chrome.storage.sync.get(['userId']);

    // Call backend to exchange token
    const response = await fetch(`${CONFIG.BACKEND_URL}/plaid/exchange`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        public_token: publicToken,
        client_user_id: userData.userId
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Exchange failed: ${errorData.detail || response.statusText}`);
    }

    const data = await response.json();
    const itemId = data.item_id;

    // Store item_id
    await chrome.storage.sync.set({ itemId });

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

// Get Google OAuth token using manual OAuth flow
async function handleGetAuthToken(sendResponse) {
  try {
    // Check if we have a cached token in storage
    const result = await chrome.storage.local.get(['googleAccessToken', 'googleTokenExpiry']);
    const now = Date.now();

    // Return cached token if valid and not expired
    if (result.googleAccessToken && result.googleTokenExpiry && result.googleTokenExpiry > now) {
      sendResponse({ token: result.googleAccessToken });
      return;
    }

    // No valid cached token - launch OAuth flow via regular window
    const scopes = CONFIG.GOOGLE_SCOPES.join(' ');
    const extensionId = chrome.runtime.id;
    // Add extension_id as state parameter so it gets passed through OAuth
    const state = JSON.stringify({ extension_id: extensionId });
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${CONFIG.GOOGLE_CLIENT_ID}&` +
      `response_type=token&` +
      `redirect_uri=${encodeURIComponent(CONFIG.GOOGLE_REDIRECT_URI)}&` +
      `scope=${encodeURIComponent(scopes)}&` +
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

  } catch (error) {
    sendResponse({ error: error.message });
  }
}

// Handle OAuth callback from the callback page
chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
  if (message.type === 'OAUTH_SUCCESS') {
    const { accessToken, expiresIn } = message;

    // Cache the token with expiry
    const expiry = Date.now() + (parseInt(expiresIn) * 1000);
    chrome.storage.local.set({
      googleAccessToken: accessToken,
      googleTokenExpiry: expiry
    });

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

