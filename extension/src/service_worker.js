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

// Get Google OAuth token using chrome.identity
async function handleGetAuthToken(sendResponse) {
  try {
    // First, try to get cached token (non-interactive)
    chrome.identity.getAuthToken({ interactive: false }, (cachedToken) => {
      // Clear any expected errors from the non-interactive attempt
      if (chrome.runtime.lastError) {
        // This is expected when no token is cached - not a real error
      }

      if (cachedToken) {
        // Token was cached - no OAuth window opened
        sendResponse({ token: cachedToken });
      } else {
        // No cached token - need interactive OAuth (will open window)
        chrome.identity.getAuthToken({ interactive: true }, (token) => {
          if (chrome.runtime.lastError) {
            sendResponse({ error: chrome.runtime.lastError.message });
          } else if (!token) {
            sendResponse({ error: 'No token returned from OAuth' });
          } else {
            sendResponse({ token });

            // Auto-open popup after interactive OAuth (window was shown to user)
            setTimeout(() => {
              openExtensionPopup();
            }, 1000);
          }
        });
      }
    });
  } catch (error) {
    sendResponse({ error: error.message });
  }
}

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

