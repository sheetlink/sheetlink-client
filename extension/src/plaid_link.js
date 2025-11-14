// plaid_link.js - Handles Plaid Link initialization with local SDK

const statusEl = document.getElementById('status');
const loaderEl = document.getElementById('loader');
const resultEl = document.getElementById('result');

// Get link token from URL params
const urlParams = new URLSearchParams(window.location.search);
const linkToken = urlParams.get('link_token');

// Send message to extension with retry logic
async function sendToExtension(message, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
          if (chrome.runtime.lastError) {
            // Service worker might be asleep, retry
            console.log(`Attempt ${i + 1}: ${chrome.runtime.lastError.message}`);
            reject(new Error(chrome.runtime.lastError.message));
          } else if (response && response.error) {
            reject(new Error(response.error));
          } else {
            resolve(response);
          }
        });
      });
    } catch (error) {
      if (i === retries - 1) {
        throw error; // Last attempt failed
      }
      // Wait before retry (service worker needs time to wake up)
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

async function initializePlaidLink(linkToken) {
  try {
    statusEl.textContent = 'Initializing Plaid Link...';

    // Check if Plaid SDK loaded
    if (typeof Plaid === 'undefined') {
      throw new Error('Plaid SDK failed to load. Please check your connection.');
    }

    console.log('Plaid SDK loaded successfully');
    statusEl.textContent = 'Opening Plaid Link...';

    const handler = Plaid.create({
      token: linkToken,
      onSuccess: async (publicToken, metadata) => {
        console.log('Plaid Link success:', metadata);
        loaderEl.style.display = 'block';
        statusEl.textContent = 'Connected successfully! Exchanging token...';

        try {
          // Send message to extension background with retry
          console.log('Sending exchange request to service worker...');
          const response = await sendToExtension({
            type: 'EXCHANGE_PUBLIC_TOKEN',
            publicToken: publicToken,
            metadata: metadata
          });

          console.log('Exchange successful:', response);
          showSuccess('Bank connected successfully! Opening popup...');

          // Store connection status
          await chrome.storage.sync.set({
            sheetlink_connection_status: {
              status: 'connected',
              mode: 'sandbox',
              institutionName: metadata.institution.name,
              justConnected: true
            }
          });

          // Notify service worker to open popup (after this window closes)
          await sendToExtension({ type: 'PLAID_CONNECTED' });

          // Close quickly so popup can open without interference
          await new Promise(resolve => setTimeout(resolve, 500));

          // Auto-close - service worker will open popup after delay
          window.close();
        } catch (error) {
          console.error('Exchange error:', error);
          loaderEl.style.display = 'none';
          showError('Failed to exchange token: ' + error.message + '. Please close this tab and try again from the extension popup.');
        }
      },
      onLoad: () => {
        console.log('Plaid Link iframe loaded');
        statusEl.textContent = 'Plaid Link ready!';
      },
      onExit: (err, metadata) => {
        loaderEl.style.display = 'none';
        if (err) {
          console.error('Plaid Link error:', err);
          showError(err.display_message || err.error_message || 'Connection failed');
        } else {
          statusEl.textContent = 'Connection cancelled';
          setTimeout(() => window.close(), 2000);
        }
      },
      onEvent: (eventName, metadata) => {
        console.log('Plaid Link event:', eventName, metadata);
      }
    });

    console.log('Opening Plaid Link modal...');
    handler.open();
  } catch (error) {
    console.error('Error initializing Plaid:', error);
    showError(error.message);
  }
}

function showError(message) {
  loaderEl.style.display = 'none';
  resultEl.innerHTML = `<div class="error"><strong>Error:</strong> ${message}</div>`;
}

function showSuccess(message) {
  loaderEl.style.display = 'none';
  resultEl.innerHTML = `<div class="success"><strong>Success:</strong> ${message}</div>`;
}

// Initialize when page loads
if (!linkToken) {
  showError('Missing link token. Please try again from the extension popup.');
} else {
  initializePlaidLink(linkToken);
}
