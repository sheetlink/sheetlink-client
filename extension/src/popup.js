// popup.js - Main UI controller for extension popup

import { CONFIG } from '../config.js';

// Backend API base URL
const BACKEND_URL = CONFIG.BACKEND_URL;

// DOM elements
let connectBankBtn, connectSandboxBtn, signInGoogleBtn, saveSheetBtn, syncNowBtn, backfillBtn, disconnectBtn, optionsBtn, retryBtn, generateTestBtn, templatesBtn, learnMoreBtn;
let removeSheetBtn, changeSheetBtn, changeSheetLinkBtn, retrySyncBtn;
let sheetUrlInput, statusText, errorMessage, loadingMessage;
let connectSection, sheetSection, syncSection, statusSection, errorSection, loadingSection, templatesSection, welcomeSection;
let sandboxBadge, sandboxLink, privacyLink, welcomeTitle, welcomeSubtitle, welcomeDescription, headerSubtitle;
let sheetSuccessModal, syncSuccessOpenSheetBtn, syncSuccessViewAccountsBtn;
let sheetErrorBanner, sheetErrorDetail, syncErrorBanner;

// Walkthrough modal
let walkthroughModal;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();
  initializeSandboxMode();

  // Initialize walkthrough modal if in sandbox mode
  if (CONFIG.isSandbox) {
    walkthroughModal = new WalkthroughModal();
    await walkthroughModal.init();
  }

  attachEventListeners();
  await loadState();
});

function initializeElements() {
  // Buttons
  connectBankBtn = document.getElementById('connectBankBtn');
  connectSandboxBtn = document.getElementById('connectSandboxBtn');
  signInGoogleBtn = document.getElementById('signInGoogleBtn');
  learnMoreBtn = document.getElementById('learnMoreBtn');
  saveSheetBtn = document.getElementById('saveSheetBtn');
  removeSheetBtn = document.getElementById('removeSheetBtn');
  changeSheetBtn = document.getElementById('changeSheetBtn');
  changeSheetLinkBtn = document.getElementById('changeSheetLinkBtn');
  retrySyncBtn = document.getElementById('retrySyncBtn');
  syncNowBtn = document.getElementById('syncNowBtn');
  backfillBtn = document.getElementById('backfillBtn');
  generateTestBtn = document.getElementById('generateTestBtn');
  disconnectBtn = document.getElementById('disconnectBtn');
  optionsBtn = document.getElementById('optionsBtn');
  retryBtn = document.getElementById('retryBtn');
  templatesBtn = document.getElementById('templatesBtn');

  // Inputs
  sheetUrlInput = document.getElementById('sheetUrl');

  // Display elements
  statusText = document.getElementById('statusText');
  errorMessage = document.getElementById('errorMessage');
  loadingMessage = document.getElementById('loadingMessage');

  // Sections
  connectSection = document.getElementById('connectSection');
  sheetSection = document.getElementById('sheetSection');
  syncSection = document.getElementById('syncSection');
  statusSection = document.getElementById('statusSection');
  errorSection = document.getElementById('errorSection');
  loadingSection = document.getElementById('loadingSection');
  templatesSection = document.getElementById('templatesSection');
  welcomeSection = document.getElementById('welcomeSection');

  // Sandbox elements
  sandboxBadge = document.getElementById('sandboxBadge');
  sandboxLink = document.getElementById('sandboxLink');
  privacyLink = document.getElementById('privacyLink');
  welcomeTitle = document.getElementById('welcomeTitle');
  welcomeSubtitle = document.getElementById('welcomeSubtitle');
  welcomeDescription = document.getElementById('welcomeDescription');
  headerSubtitle = document.getElementById('headerSubtitle');

  // Sheet success modal elements
  sheetSuccessModal = document.getElementById('sheetSuccessModal');
  syncSuccessOpenSheetBtn = document.getElementById('syncSuccessOpenSheet');
  syncSuccessViewAccountsBtn = document.getElementById('syncSuccessViewAccounts');

  // Error banners
  sheetErrorBanner = document.getElementById('sheetErrorBanner');
  sheetErrorDetail = document.getElementById('sheetErrorDetail');
  syncErrorBanner = document.getElementById('syncErrorBanner');
}

function initializeSandboxMode() {
  const copy = CONFIG.currentCopy;

  // Show/hide sandbox badge
  if (CONFIG.isSandbox) {
    sandboxBadge.classList.remove('hidden');
  }

  // Update copy based on environment
  if (welcomeTitle) welcomeTitle.textContent = copy.welcomeTitle;
  if (welcomeSubtitle) welcomeSubtitle.textContent = copy.welcomeSubtitle;
  if (welcomeDescription) welcomeDescription.textContent = copy.welcomeDescription;

  // Update button text
  if (connectBankBtn) connectBankBtn.textContent = copy.connectButton;
  if (connectSandboxBtn) connectSandboxBtn.textContent = copy.connectButton;
  if (disconnectBtn) disconnectBtn.textContent = copy.resetButton;
  if (syncNowBtn) syncNowBtn.textContent = copy.syncButton;

  // Set sheet success modal footer based on environment
  const sheetSuccessFooter = document.getElementById('sheetSuccessFooter');
  if (sheetSuccessFooter) {
    if (CONFIG.isSandbox) {
      sheetSuccessFooter.textContent = '🧪 You are in Plaid Sandbox mode. This is demo data.';
    } else {
      sheetSuccessFooter.textContent = '🔒 Your data is encrypted and secure.';
    }
  }

  // Hide "Generate Test Transactions" button in production mode
  if (generateTestBtn && !CONFIG.isSandbox) {
    generateTestBtn.style.display = 'none';
  }
}

function attachEventListeners() {
  if (connectBankBtn) connectBankBtn.addEventListener('click', handleConnectBank);
  if (connectSandboxBtn) connectSandboxBtn.addEventListener('click', handleConnectSandbox);
  if (signInGoogleBtn) signInGoogleBtn.addEventListener('click', handleGoogleSignIn);
  if (learnMoreBtn) learnMoreBtn.addEventListener('click', handleLearnMore);
  saveSheetBtn.addEventListener('click', handleSaveSheet);
  if (removeSheetBtn) removeSheetBtn.addEventListener('click', handleRemoveSheet);
  if (changeSheetBtn) changeSheetBtn.addEventListener('click', handleChangeSheet);
  if (changeSheetLinkBtn) changeSheetLinkBtn.addEventListener('click', handleChangeSheet);
  if (retrySyncBtn) retrySyncBtn.addEventListener('click', handleSyncNow);
  syncNowBtn.addEventListener('click', handleSyncNow);
  if (backfillBtn) backfillBtn.addEventListener('click', handleBackfill);
  generateTestBtn.addEventListener('click', handleGenerateTestTransactions);
  disconnectBtn.addEventListener('click', handleDisconnect);
  optionsBtn.addEventListener('click', () => chrome.runtime.openOptionsPage());
  retryBtn.addEventListener('click', handleRetry);
  templatesBtn.addEventListener('click', handleShowTemplates);

  // Sheet success modal buttons
  if (syncSuccessOpenSheetBtn) {
    syncSuccessOpenSheetBtn.addEventListener('click', async () => {
      const { sheetUrl } = await chrome.storage.sync.get(['sheetUrl']);
      if (sheetUrl) {
        chrome.tabs.create({ url: sheetUrl });
        hideSheetSuccessModal();
      }
    });
  }
  if (syncSuccessViewAccountsBtn) {
    syncSuccessViewAccountsBtn.addEventListener('click', hideSheetSuccessModal);
  }

  // Sandbox badge links
  if (sandboxLink) {
    sandboxLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://sheetlink.app/sandbox' });
    });
  }
  if (privacyLink) {
    privacyLink.addEventListener('click', (e) => {
      e.preventDefault();
      chrome.tabs.create({ url: 'https://sheetlink.app/privacy' });
    });
  }

  // Success modal
  const modalNextBtn = document.getElementById('modalNextBtn');
  if (modalNextBtn) {
    modalNextBtn.addEventListener('click', showModalPage2);
  }

  const closeSuccessModalBtn = document.getElementById('closeSuccessModal');
  if (closeSuccessModalBtn) {
    closeSuccessModalBtn.addEventListener('click', hideSuccessModal);
  }

  // Close modal when clicking overlay
  const modalOverlay = document.querySelector('.modal-overlay');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', hideSuccessModal);
  }
}

function handleLearnMore() {
  chrome.tabs.create({ url: 'https://sheetlink.app' });
}

// Load current state from storage
async function loadState() {
  try {
    const data = await chrome.storage.sync.get(['itemId', 'sheetId', 'sheetUrl', 'lastSync', 'hasSeenWelcome', 'sheetlink_connection_status', 'googleAuthenticated', 'googleUserId', 'googleEmail']);

    console.log('[Popup] loadState - googleAuthenticated:', data.googleAuthenticated);
    console.log('[Popup] loadState - googleUserId:', data.googleUserId);

    // Phase 3.9: Update email displays throughout the UI
    if (data.googleEmail) {
      const emailElements = document.querySelectorAll('#connectedUserEmail, #sheetUserEmail');
      emailElements.forEach(el => {
        if (el) el.textContent = data.googleEmail;
      });
    }

    // Phase 3.8: Check if user is authenticated with Google first
    if (!data.googleAuthenticated) {
      console.log('[Popup] User not authenticated - showing welcome screen');
      // User not authenticated - show welcome with "Sign in with Google" button
      showSection('welcome');
      return;
    }

    console.log('[Popup] User is authenticated - continuing with flow');

    // Check if we should show the success modal
    // Only show for first-time connections, not for updates
    if (data.sheetlink_connection_status &&
        data.sheetlink_connection_status.justConnected &&
        !data.sheetlink_connection_status.isUpdate) {
      // Show success modal for first-time connection
      showSuccessModal();

      // Reset the justConnected flag
      await chrome.storage.sync.set({
        sheetlink_connection_status: {
          ...data.sheetlink_connection_status,
          justConnected: false
        }
      });
    } else if (data.sheetlink_connection_status && data.sheetlink_connection_status.justConnected) {
      // For updates, just reset the flag without showing modal
      await chrome.storage.sync.set({
        sheetlink_connection_status: {
          ...data.sheetlink_connection_status,
          justConnected: false,
          isUpdate: false
        }
      });
    }

    // No bank connected: try to restore from backend first (Phase 3.8)
    if (!data.itemId) {
      // Try to restore Items from backend using Google user ID
      const restored = await tryRestoreItems();
      if (restored) {
        // Items restored! Reload state with new itemId
        return loadState();
      }

      // No Items to restore - show connect bank screen
      showSection('connect');
      return;
    }

    // Bank connected
    showSection('status');
    updateStatus(CONFIG.isSandbox ? CONFIG.currentCopy.connectedInstitution(CONFIG.DEMO_INSTITUTION_NAME) : 'Connected', true);
    disconnectBtn.classList.remove('hidden');

    // Phase 3.9 UX: Show step 2 for returning users if they just authenticated
    // Check if user just signed in (first load after Google auth)
    const shouldShowStep2 = !data.hasSeenConnectStep && data.googleAuthenticated;
    if (shouldShowStep2) {
      // Mark that we've shown step 2
      await chrome.storage.sync.set({ hasSeenConnectStep: true });

      // Show connect screen with connection status
      showSection('connect');

      // Fetch and display item info (institution name and accounts)
      await displayItemInfo(data.itemId);

      // Update primary button to "Next"
      const connectBtn = document.getElementById('connectBankBtn');
      if (connectBtn) {
        connectBtn.textContent = 'Next';
        connectBtn.disabled = false;
        // Remove old event listener and add new one for proceeding
        const newBtn = connectBtn.cloneNode(true);
        connectBtn.parentNode.replaceChild(newBtn, connectBtn);
        newBtn.addEventListener('click', () => {
          proceedToSheetSetup(data);
        });
      }

      // Show and wire up "Update Connection" button
      const updateBtn = document.getElementById('updateConnectionBtn');
      if (updateBtn) {
        updateBtn.classList.remove('hidden');
        updateBtn.addEventListener('click', () => handleConnectBank(true));
      }

      return;
    }

    // Normal flow - proceed to sheet setup
    proceedToSheetSetup(data);
  } catch (error) {
    console.error('[Popup] Failed to load state:', error);
    showError('Failed to load state: ' + error.message);
  }
}

// Helper function to proceed to sheet setup after step 2
function proceedToSheetSetup(data) {
    if (data.sheetId) {
      showSection('sync');
      document.getElementById('currentSheet').textContent =
        data.sheetUrl ? new URL(data.sheetUrl).pathname.split('/')[3].substring(0, 20) + '...' : data.sheetId;

      if (changeSheetBtn) {
        changeSheetBtn.classList.remove('hidden');
      }

      if (data.lastSync) {
        document.getElementById('lastSync').textContent = new Date(data.lastSync).toLocaleString();
      }

      updateAutoSyncStatus();
      loadRecentSyncs();
      updateTierDisplay();  // Phase 3: Update tier info
      updateCloudSyncIndicator();  // Phase 3.8: Show cloud sync status
    } else {
      showSection('sheet');
      document.getElementById('currentSheet').textContent = 'Not connected yet';
      if (changeSheetBtn) {
        changeSheetBtn.classList.add('hidden');
      }
    }
}

// Phase 3.9: Fetch and display item info (institution and accounts)
async function displayItemInfo(itemId) {
  try {
    if (!itemId) {
      console.error('No item ID provided');
      // Fall back to generic display
      showGenericBankStatus();
      return;
    }

    console.log(`Fetching item info for: ${itemId}`);

    // Call backend to get item info
    const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}/info`);

    if (!response.ok) {
      console.error('Failed to fetch item info:', response.status);
      // Fall back to generic display
      showGenericBankStatus();
      return;
    }

    const itemInfo = await response.json();
    console.log('Item info received:', itemInfo);

    // Update the bank connection status display with specific details
    const statusEl = document.getElementById('bankConnectionStatus');
    if (statusEl) {
      // Build account list HTML
      let accountsHTML = '';
      if (itemInfo.accounts && itemInfo.accounts.length > 0) {
        accountsHTML = '<div style="margin-top: 8px; font-size: 13px; color: #374151;">';
        itemInfo.accounts.forEach(account => {
          const accountName = account.official_name || account.name;
          const mask = account.mask ? ` (****${account.mask})` : '';
          accountsHTML += `<div style="margin-top: 4px;">• ${accountName}${mask}</div>`;
        });
        accountsHTML += '</div>';
      }

      // Update status element with institution name and accounts
      statusEl.innerHTML = `
        <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #166534; font-weight: 500;">
          <span>✓</span>
          <span>${itemInfo.institution_name}</span>
        </div>
        ${accountsHTML}
      `;
      statusEl.classList.remove('hidden');
    }

  } catch (error) {
    console.error('Error displaying item info:', error);
    // Fall back to generic display
    showGenericBankStatus();
  }
}

// Helper function to show generic bank status (fallback)
function showGenericBankStatus() {
  const statusEl = document.getElementById('bankConnectionStatus');
  if (statusEl) {
    statusEl.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; font-size: 14px; color: #166534; font-weight: 500;">
        <span>✓</span>
        <span>Bank Connected</span>
      </div>
    `;
    statusEl.classList.remove('hidden');
  }
}

// Phase 3.8: Try to restore Items from backend using Google user ID
async function tryRestoreItems() {
  try {
    // Get Google user ID from storage (set during sign-in)
    const { googleUserId } = await chrome.storage.sync.get(['googleUserId']);

    if (!googleUserId) {
      console.log('No Google user ID available for restoration');
      return false;
    }

    console.log('Checking for Items to restore...');

    // Call backend to get user's Items
    const response = await fetch(`${BACKEND_URL}/plaid/items?user_id=${encodeURIComponent(googleUserId)}`);

    if (!response.ok) {
      console.log('Could not fetch Items from backend');
      return false;
    }

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      console.log('No Items found to restore');
      return false;
    }

    // Restore the most recently synced Item
    const mostRecentItem = data.items[0];
    console.log(`Restoring Item: ${mostRecentItem.institution_name}`);

    await chrome.storage.sync.set({
      itemId: mostRecentItem.item_id
    });

    console.log(`Item restored successfully: ${mostRecentItem.item_id}`);
    return true;

  } catch (error) {
    console.error('Error restoring Items:', error);
    return false; // Silent fail - user sees normal welcome screen
  }
}

// Update tier display from backend
async function updateTierDisplay() {
  try {
    const response = await fetch(`${BACKEND_URL}/tier/status`);

    if (!response.ok) {
      // If endpoint fails, keep default "Free (7 days)" and hide auto-sync
      const autoSyncCard = document.querySelector('.auto-sync-card');
      if (autoSyncCard) {
        autoSyncCard.style.display = 'none';
      }
      return;
    }

    const data = await response.json();

    // Format tier display
    const tierName = data.tier.charAt(0).toUpperCase() + data.tier.slice(1);
    const tierText = `${tierName} (${data.days_available} days)`;

    // Update UI
    const tierElement = document.getElementById('subscriptionTier');
    if (tierElement) {
      tierElement.textContent = tierText;

      // Color based on tier
      if (data.tier === 'free') {
        tierElement.style.color = '#1a73e8';  // Blue
      } else if (data.tier === 'basic') {
        tierElement.style.color = '#0d9488';  // Teal
      } else if (data.tier === 'pro') {
        tierElement.style.color = '#7c3aed';  // Purple
      }
    }

    // Phase 3: Hide auto-sync card for free tier (auto-sync is paid feature)
    const autoSyncCard = document.querySelector('.auto-sync-card');
    if (autoSyncCard) {
      if (data.tier === 'free') {
        autoSyncCard.style.display = 'none';
      } else {
        autoSyncCard.style.display = 'block';
      }
    }
  } catch (error) {
    // Silently fail - keep default "Free (7 days)" and hide auto-sync
    console.log('Tier status check failed, using default');
    const autoSyncCard = document.querySelector('.auto-sync-card');
    if (autoSyncCard) {
      autoSyncCard.style.display = 'none';
    }
  }
}

// Phase 3.9.5: Update cloud sync indicator (enhanced from 3.8)
async function updateCloudSyncIndicator() {
  try {
    const { googleUserId, itemId } = await chrome.storage.sync.get(['googleUserId', 'itemId']);

    const cloudIndicator = document.getElementById('cloudSyncIndicator');
    if (!cloudIndicator) return;

    // Show cloud sync indicator if user is authenticated and has connected a bank
    if (googleUserId && itemId) {
      cloudIndicator.style.display = 'block';
    } else {
      cloudIndicator.style.display = 'none';
    }
  } catch (error) {
    // Silently fail - non-critical feature
    console.log('[Cloud Sync Indicator] Error:', error);
  }
}

// Phase 3.8: Handle Google Sign-In
async function handleGoogleSignIn() {
  try {
    // Trigger Google OAuth flow via service worker
    // Note: This opens OAuth window and doesn't wait for response
    // Service worker will reopen popup after OAuth completes
    chrome.runtime.sendMessage({ type: 'GET_AUTH_TOKEN' }, async (response) => {
      if (response && response.token) {
        // OAuth completed successfully
        // Get user info after successful OAuth
        const userInfo = await chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' });

        if (!userInfo || !userInfo.id) {
          showError('Could not get Google user information');
          return;
        }

        // Store Google user ID for backend
        await chrome.storage.sync.set({
          googleUserId: userInfo.id,
          googleAuthenticated: true
        });

        // Reload state to show next step (connect bank)
        await loadState();
      }
    });

    // Close popup immediately so OAuth window is visible
    window.close();

  } catch (error) {
    showError('Failed to sign in with Google: ' + error.message);
  }
}

// Handle Connect Sandbox button (with walkthrough)
async function handleConnectSandbox() {
  // Check if user has completed walkthrough
  const completed = await WalkthroughModal.hasCompleted();

  if (!completed && walkthroughModal) {
    // Show walkthrough first, then connect on completion
    walkthroughModal.show(() => {
      handleConnectBank();
    });
  } else {
    // Walkthrough already completed, connect directly
    await handleConnectBank();
  }
}

// Handle Connect Bank button
async function handleConnectBank(isUpdate = false) {
  try {
    // Mark if this is an update connection (not first-time)
    if (isUpdate) {
      await chrome.storage.sync.set({
        isUpdatingConnection: true
      });
    }

    showLoading('Connecting to Plaid...');

    const linkData = await getLinkToken();

    const result = await openPlaidLink(linkData);

    // For OAuth flow (production), result is publicToken that needs to be exchanged
    // For embedded flow (sandbox), result might be itemId (but currently returns publicToken too)
    // We'll always treat it as publicToken and exchange it
    if (!CONFIG.isSandbox && result) {
      showLoading('Exchanging token...');
      const itemId = await exchangePublicToken(result);
      await chrome.storage.sync.set({ itemId });
    }

    hideLoading();
    updateStatus('Bank connected successfully!', true);
    await loadState();
  } catch (error) {
    hideLoading();
    showError('Failed to connect bank: ' + error.message);
  }
}

// Handle Save Sheet button
async function handleSaveSheet() {
  const url = sheetUrlInput.value.trim();

  if (!url) {
    showSheetError('Please enter a Google Sheets URL');
    return;
  }

  try {
    showLoading('Verifying sheet access...');
    hideSheetError();

    const sheetId = extractSheetId(url);
    if (!sheetId) {
      throw new Error('Invalid Google Sheets URL');
    }

    // Phase 3.9.2: Verify access BEFORE saving to prevent 403 errors
    if (window.SheetsAPI) {
      try {
        await window.SheetsAPI.verifySheetAccess(sheetId);
      } catch (verifyError) {
        // Parse error to detect account mismatch (403) vs not found (404)
        const errorMsg = verifyError.message || '';

        if (errorMsg.includes('403')) {
          // Account mismatch - sheet exists but user can't access it
          const { googleEmail } = await chrome.storage.sync.get(['googleEmail']);
          const accountInfo = googleEmail ? ` (signed in as ${googleEmail})` : '';
          throw new Error(
            `Access denied. This sheet is not owned by or shared with your Google account${accountInfo}. ` +
            `Make sure the sheet is owned by ${googleEmail || 'your Google account'} or that you have edit access.`
          );
        } else if (errorMsg.includes('404')) {
          // Sheet not found
          throw new Error(
            'Sheet not found. Double check the URL is correct and that the sheet still exists.'
          );
        } else {
          // Other error
          throw new Error(`Cannot access sheet: ${errorMsg}`);
        }
      }
    }

    // Only save if verification succeeds
    await chrome.storage.sync.set({ sheetId, sheetUrl: url });

    hideLoading();
    updateStatus('Sheet saved successfully!', true);
    await loadState();
  } catch (error) {
    hideLoading();
    showSheetError(error.message);
  }
}

// Handle Sync Now button
async function handleSyncNow() {
  try {
    showLoading('Syncing data from Plaid...');

    const { itemId, sheetId } = await chrome.storage.sync.get(['itemId', 'sheetId']);

    if (!itemId || !sheetId) {
      throw new Error('Missing item ID or sheet ID');
    }

    const hasShownSyncSuccess = localStorage.getItem('hasShownSyncSuccess');

    // Fetch data from backend
    const syncData = await fetchSyncData(itemId);

    // Check if rules are enabled and ensure Rules tab exists
    if (window.RulesEngine) {
      const settings = await window.RulesEngine.getSettings();

      if (settings.enableRulesTab) {
        showLoading('Checking Rules tab...');

        // Check if Rules tab exists, create if not
        const rulesExists = await window.RulesEngine.rulesTabExists(sheetId, settings.rulesTabName);

        if (!rulesExists) {
          showLoading('Creating Rules tab with examples...');
          await window.RulesEngine.createRulesTab(sheetId, settings.rulesTabName);
        }

        // Apply rules and optionally ML to transactions
        if (syncData.transactions) {
          if (settings.enableMLAssist) {
            showLoading('Applying rules and AI categorization...');
            syncData.transactions = await window.RulesEngine.applyRulesAndML(
              sheetId,
              syncData.transactions,
              true
            );
          } else {
            showLoading('Applying rules...');
            syncData.transactions = await window.RulesEngine.applyRules(
              sheetId,
              syncData.transactions
            );
          }
        }
      }
    }

    showLoading('Writing to Google Sheets...');

    // Write to Google Sheets
    const result = await writeToSheets(sheetId, syncData);

    // Update last sync time
    await chrome.storage.sync.set({ lastSync: Date.now() });

    hideLoading();

    // Show detailed success message
    const message = `Sync completed! ${result.accountsWritten} accounts, ${result.transactionsNew} new transactions (${result.transactionsTotal} total)`;
    updateStatus(message, true);

    if (!hasShownSyncSuccess) {
      localStorage.setItem('hasShownSyncSuccess', 'true');
      showSheetSuccessModal();
    }

    await loadState();
    hideSyncError();
  } catch (error) {
    hideLoading();

    // Phase 3.9.2 & 3.9.6: Enhanced error detection for sheet access issues
    const errorMsg = error.message || '';
    const isSheetAccessError = errorMsg.includes('403') ||
                                errorMsg.includes('404') ||
                                errorMsg.includes('Cannot access sheet') ||
                                errorMsg.includes('edit permissions');

    if (isSheetAccessError) {
      showSyncError();
    } else {
      // Phase 3.9.6: Improved generic error messages
      let userFriendlyMsg = errorMsg;

      if (errorMsg.includes('429') || errorMsg.toLowerCase().includes('rate limit')) {
        userFriendlyMsg = 'Rate limit exceeded. Please wait a moment and try again.';
      } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
        userFriendlyMsg = 'Network error. Check your internet connection and try again.';
      }

      showError('Sync failed: ' + userFriendlyMsg);
    }
  }
}

// Handle Backfill button - Fetch full transaction history
async function handleBackfill() {
  try {
    showLoading('Fetching full transaction history...');

    const { itemId, sheetId } = await chrome.storage.sync.get(['itemId', 'sheetId']);

    if (!itemId || !sheetId) {
      throw new Error('Missing item ID or sheet ID');
    }

    // Call backfill endpoint
    const response = await fetch(`${BACKEND_URL}/plaid/backfill`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item_id: itemId })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
      const errorMsg = typeof error.detail === 'string' ? error.detail : JSON.stringify(error);
      throw new Error(errorMsg);
    }

    const result = await response.json();

    // Check if backfill was successful
    if (!result.success) {
      throw new Error(result.error || 'Backfill failed');
    }

    showLoading('Fetching account data...');

    // Fetch accounts data to enrich transactions
    // Backfill only returns transactions, so we need to get accounts separately
    let accountsData = [];
    try {
      const accountsSyncData = await fetchSyncData(itemId);
      accountsData = accountsSyncData.accounts || [];
    } catch (error) {
      console.warn('Could not fetch accounts for enrichment:', error);
      // Continue with empty accounts - transactions will have empty account_name/mask
    }

    showLoading('Writing transactions to sheet...');

    // Write transactions to sheet with account enrichment
    const syncData = {
      accounts: accountsData,
      transactions: result.transactions
    };

    const writeResult = await writeToSheets(sheetId, syncData);

    hideLoading();

    // Show detailed success message
    const daysAllowed = result.max_days_allowed || 90;
    const tier = result.subscription_tier || 'free';
    const message = `Backfill complete! Fetched ${result.total_transactions} transactions (${daysAllowed} days, ${tier} tier)`;

    updateStatus(message, true);
    await loadState();

  } catch (error) {
    hideLoading();
    showError('Backfill failed: ' + error.message);
  }
}

// Handle Generate Test Transactions button (sandbox only)
async function handleGenerateTestTransactions() {
  try {
    showLoading('Generating test transactions...');

    const { itemId } = await chrome.storage.sync.get(['itemId']);

    if (!itemId) {
      throw new Error('No bank connected');
    }

    // Call sandbox endpoint to generate transactions
    const response = await fetch(`${BACKEND_URL}/plaid/sandbox/generate-transactions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ item_id: itemId })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || 'Failed to generate transactions');
    }

    const result = await response.json();

    hideLoading();
    updateStatus('Test transactions generated! Wait 5-10 seconds, then click Sync Now.', true);

  } catch (error) {
    hideLoading();
    showError('Failed to generate transactions: ' + error.message);
  }
}

// Handle Disconnect button
async function handleDisconnect() {
  if (!confirm('Are you sure you want to disconnect your bank? This will remove all stored credentials.')) {
    return;
  }

  try {
    showLoading('Disconnecting...');

    const { itemId } = await chrome.storage.sync.get(['itemId']);

    if (itemId) {
      await deleteBackendTokens(itemId);
    }
    
    // Clear local storage
    await chrome.storage.sync.clear();
    
    hideLoading();
    await loadState();
  } catch (error) {
    showError('Failed to disconnect: ' + error.message);
  }
}

// Handle Retry button
function handleRetry() {
  hideError();
  loadState();
}

// Handle Change Sheet button
async function handleChangeSheet() {
  const { sheetUrl } = await chrome.storage.sync.get(['sheetUrl']);
  if (sheetUrl) {
    sheetUrlInput.value = sheetUrl;
  }
  hideSheetError();
  hideSyncError();
  showSection('sheet');
}

// Handle Remove Sheet button
async function handleRemoveSheet() {
  if (!confirm('Remove linked sheet?\n\nThis will unlink your current Google Sheet. You can link a new one any time.')) {
    return;
  }

  try {
    showLoading('Removing sheet...');

    await chrome.storage.sync.remove(['sheetId', 'sheetUrl']);

    hideLoading();
    updateStatus('Sheet removed', true);
    await loadState();
  } catch (error) {
    hideLoading();
    showError('Failed to remove sheet: ' + error.message);
  }
}

// Backend API calls
async function getLinkToken() {
  // Get or create a unique user ID for this extension installation
  let userData = await chrome.storage.sync.get(['userId']);

  if (!userData.userId) {
    // Generate a unique user ID for this installation
    userData.userId = 'user_' + Math.random().toString(36).substring(2, 15);
    await chrome.storage.sync.set({ userId: userData.userId });
  }

  // For production, use OAuth redirect flow to avoid CSP issues with reCAPTCHA
  const requestBody = {
    client_user_id: userData.userId,
    env: CONFIG.ENV
  };

  // Add redirect_uri for production OAuth flow
  if (!CONFIG.isSandbox) {
    requestBody.redirect_uri = 'https://sheetlink.app/oauth/plaid/callback';
  }

  const response = await fetch(`${BACKEND_URL}/plaid/link-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to get link token: ${errorData.detail || response.statusText}`);
  }

  const data = await response.json();
  return data; // Return full response (includes link_token and hosted_link_url for OAuth)
}

async function exchangePublicToken(publicToken) {
  // Get user ID from storage
  const userData = await chrome.storage.sync.get(['userId']);

  const response = await fetch(`${BACKEND_URL}/plaid/exchange`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      public_token: publicToken,
      client_user_id: userData.userId,
      env: CONFIG.ENV
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Exchange failed: ${errorData.detail || response.statusText}`);
  }

  const data = await response.json();
  return data.item_id;
}

async function fetchSyncData(itemId) {
  const response = await fetch(`${BACKEND_URL}/plaid/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Sync failed: ${errorData.detail || response.statusText}`);
  }

  return await response.json();
}

async function deleteBackendTokens(itemId) {
  const response = await fetch(`${BACKEND_URL}/plaid/item/${itemId}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' }
  });

  // Treat 404 as success - item already doesn't exist
  if (response.status === 404) {
    return { success: true, message: 'Item already deleted' };
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Delete failed: ${errorData.detail || response.statusText}`);
  }

  return await response.json();
}

// Auto-sync status functions
async function updateAutoSyncStatus() {
  try {
    const response = await fetch(`${BACKEND_URL}/sync/scheduler/status`);

    if (!response.ok) {
      document.getElementById('schedulerStatus').textContent = 'Unavailable';
      return;
    }

    const data = await response.json();
    const schedulerStatusEl = document.getElementById('schedulerStatus');
    const nextRunTimeEl = document.getElementById('nextRunTime');

    if (data.scheduler?.running) {
      schedulerStatusEl.textContent = 'Running';
      schedulerStatusEl.style.color = '#10b981';

      // Display next run time
      if (data.scheduler.jobs && data.scheduler.jobs.length > 0) {
        const nextRun = data.scheduler.jobs[0].next_run_time;
        if (nextRun) {
          const nextRunDate = new Date(nextRun);
          const now = new Date();
          const diffMinutes = Math.round((nextRunDate - now) / 1000 / 60);

          if (diffMinutes < 60) {
            nextRunTimeEl.textContent = `in ${diffMinutes} min`;
          } else {
            nextRunTimeEl.textContent = nextRunDate.toLocaleTimeString();
          }
        }
      }
    } else {
      schedulerStatusEl.textContent = 'Stopped';
      schedulerStatusEl.style.color = '#f59e0b';
    }
  } catch (error) {
    document.getElementById('schedulerStatus').textContent = 'Error';
  }
}

async function loadRecentSyncs() {
  try {
    const response = await fetch(`${BACKEND_URL}/sync/sync-logs?limit=5`);

    if (!response.ok) {
      document.getElementById('recentSyncs').textContent = 'Failed to load';
      return;
    }

    const data = await response.json();
    const recentSyncsEl = document.getElementById('recentSyncs');

    if (!data.logs || data.logs.length === 0) {
      recentSyncsEl.innerHTML = '<div style="color: #666;">No syncs yet</div>';
      return;
    }

    // Build sync log list
    const syncHtml = data.logs.map(log => {
      const startTime = new Date(log.started_at);
      const icon = log.success ? '✓' : '✗';
      const color = log.success ? '#10b981' : '#ef4444';
      const timeAgo = getTimeAgo(startTime);

      return `
        <div style="padding: 6px 0; border-bottom: 1px solid #eee;">
          <span style="color: ${color}; font-weight: bold;">${icon}</span>
          ${timeAgo}
          <span style="color: #666; font-size: 11px;">(${log.record_count} records)</span>
          ${!log.success ? `<div style="color: #ef4444; font-size: 10px; margin-top: 2px;">${log.error_message}</div>` : ''}
        </div>
      `;
    }).join('');

    recentSyncsEl.innerHTML = syncHtml;
  } catch (error) {
    document.getElementById('recentSyncs').textContent = 'Error loading syncs';
  }
}

// Utility function to format time ago
function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

// Plaid Link integration - Opens in new tab using embedded SDK
async function openPlaidLink(linkData) {
  return new Promise((resolve, reject) => {
    // Use embedded SDK in extension page for both sandbox and production
    // The SDK handles OAuth redirect internally when needed
    const linkUrl = chrome.runtime.getURL(`src/plaid_link.html?link_token=${encodeURIComponent(linkData.link_token)}`);

    chrome.tabs.create({ url: linkUrl });

    // Listen for completion message from service worker or callback page
    const messageListener = (message) => {
      if (message.type === 'PLAID_LINK_SUCCESS' || message.type === 'PLAID_OAUTH_SUCCESS') {
        chrome.runtime.onMessage.removeListener(messageListener);
        resolve(message.itemId || message.publicToken);
      } else if (message.type === 'PLAID_LINK_ERROR') {
        chrome.runtime.onMessage.removeListener(messageListener);
        reject(new Error(message.error));
      }
    };

    chrome.runtime.onMessage.addListener(messageListener);

    // Timeout after 5 minutes
    setTimeout(() => {
      chrome.runtime.onMessage.removeListener(messageListener);
      reject(new Error('Plaid Link timed out'));
    }, 5 * 60 * 1000);
  });
}

// Google Sheets integration
async function writeToSheets(sheetId, data) {
  if (!window.SheetsAPI) {
    throw new Error('Sheets API not loaded');
  }

  // Phase 3.9.2: Verify sheet access first with enhanced error messages
  try {
    await window.SheetsAPI.verifySheetAccess(sheetId);
  } catch (error) {
    const errorMsg = error.message || '';

    if (errorMsg.includes('403')) {
      // Account mismatch
      const { googleEmail } = await chrome.storage.sync.get(['googleEmail']);
      const accountInfo = googleEmail ? ` Your SheetLink account is signed in as ${googleEmail}.` : '';
      throw new Error(
        `Cannot access sheet - permission denied.${accountInfo} ` +
        `Make sure the sheet is owned by ${googleEmail || 'your Google account'} or that SheetLink has edit access.`
      );
    } else if (errorMsg.includes('404')) {
      throw new Error('Sheet not found. The sheet may have been deleted or the URL is incorrect.');
    } else {
      throw new Error(`Cannot access sheet: ${errorMsg}`);
    }
  }

  // Write accounts data
  if (data.accounts && data.accounts.length > 0) {
    await window.SheetsAPI.writeAccounts(sheetId, data.accounts);
  }

  // Always write transactions tab (creates tab even if no transactions)
  // Pass accounts data for enriching transactions with account_name and account_mask
  const transactionsData = data.transactions || [];
  const accountsData = data.accounts || [];
  const newCount = await window.SheetsAPI.writeTransactions(sheetId, transactionsData, accountsData);

  return {
    accountsWritten: data.accounts?.length || 0,
    transactionsTotal: transactionsData.length,
    transactionsNew: newCount
  };
}

// Utility functions
function extractSheetId(url) {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

function showSection(section) {
  // Hide all sections
  [connectSection, sheetSection, syncSection, statusSection, errorSection, loadingSection, templatesSection, welcomeSection]
    .forEach(el => el && el.classList.add('hidden'));

  // Show requested section
  switch(section) {
    case 'welcome':
      welcomeSection && welcomeSection.classList.remove('hidden');
      // Mark that user has seen welcome
      chrome.storage.sync.set({ hasSeenWelcome: true });
      break;
    case 'connect':
      connectSection.classList.remove('hidden');
      break;
    case 'sheet':
      sheetSection.classList.remove('hidden');
      statusSection.classList.remove('hidden');
      break;
    case 'sync':
      syncSection.classList.remove('hidden');
      statusSection.classList.remove('hidden');
      break;
    case 'status':
      statusSection.classList.remove('hidden');
      break;
    case 'templates':
      templatesSection.classList.remove('hidden');
      break;
  }
}

function showLoading(message) {
  loadingMessage.textContent = message;
  loadingSection.classList.remove('hidden');
  
  // Disable buttons
  [connectBankBtn, saveSheetBtn, syncNowBtn, disconnectBtn].forEach(btn => {
    if (btn) btn.disabled = true;
  });
}

function hideLoading() {
  loadingSection.classList.add('hidden');
  
  // Enable buttons
  [connectBankBtn, saveSheetBtn, syncNowBtn, disconnectBtn].forEach(btn => {
    if (btn) btn.disabled = false;
  });
}

function showError(message) {
  errorMessage.textContent = message;
  errorSection.classList.remove('hidden');
}

function hideError() {
  errorSection.classList.add('hidden');
}

function updateStatus(message, isSuccess) {
  statusText.textContent = message;
  const statusIcon = document.getElementById('statusIcon');
  statusIcon.textContent = isSuccess ? '✓' : '⚠';
  statusIcon.style.color = isSuccess ? '#10b981' : '#f59e0b';
}

function showSheetError(message) {
  if (sheetErrorDetail) {
    sheetErrorDetail.textContent = message;
  }
  if (sheetErrorBanner) {
    sheetErrorBanner.classList.remove('hidden');
  }
}

function hideSheetError() {
  if (sheetErrorBanner) {
    sheetErrorBanner.classList.add('hidden');
  }
}

function showSyncError() {
  if (syncErrorBanner) {
    syncErrorBanner.classList.remove('hidden');
  }
}

function hideSyncError() {
  if (syncErrorBanner) {
    syncErrorBanner.classList.add('hidden');
  }
}

// ===== Success Modal Functions =====

function showSuccessModal() {
  const modal = document.getElementById('connectionSuccessModal');
  if (modal) {
    // Set the modal description text based on environment
    const descriptionEl = document.getElementById('connectionSuccessDescription');
    if (descriptionEl) {
      if (CONFIG.isSandbox) {
        descriptionEl.textContent = 'Your Plaid sandbox account is now linked. You\'re ready to sync transactions to Google Sheets.';
      } else {
        descriptionEl.textContent = 'Your bank account is now linked. You\'re ready to sync transactions to Google Sheets.';
      }
    }

    // Reset to page 1
    const page1 = document.getElementById('modalPage1');
    const page2 = document.getElementById('modalPage2');
    if (page1) page1.classList.remove('hidden');
    if (page2) page2.classList.add('hidden');

    modal.classList.remove('hidden');
  }
}

function showModalPage2() {
  const page1 = document.getElementById('modalPage1');
  const page2 = document.getElementById('modalPage2');
  if (page1 && page2) {
    page1.classList.add('hidden');
    page2.classList.remove('hidden');
  }
}

function hideSuccessModal() {
  const modal = document.getElementById('connectionSuccessModal');
  if (modal) {
    modal.classList.add('hidden');
    // Reset to page 1 when closing
    const page1 = document.getElementById('modalPage1');
    const page2 = document.getElementById('modalPage2');
    if (page1) page1.classList.remove('hidden');
    if (page2) page2.classList.add('hidden');
  }
}

// ===== Sheet Success Modal Functions =====

async function showSheetSuccessModal() {
  if (sheetSuccessModal) {
    const { sheetUrl } = await chrome.storage.sync.get(['sheetUrl']);

    if (syncSuccessOpenSheetBtn) {
      if (!sheetUrl) {
        syncSuccessOpenSheetBtn.disabled = true;
        syncSuccessOpenSheetBtn.title = 'Add a Google Sheet in settings before opening.';
      } else {
        syncSuccessOpenSheetBtn.disabled = false;
        syncSuccessOpenSheetBtn.title = '';
      }
    }

    sheetSuccessModal.classList.remove('hidden');
  }
}

function hideSheetSuccessModal() {
  if (sheetSuccessModal) {
    sheetSuccessModal.classList.add('hidden');
  }
}

// ===== Templates Functionality =====

// Handle Show Templates button
async function handleShowTemplates() {
  try {
    showSection('templates');
    await loadTemplates();
  } catch (error) {
    showError('Failed to load templates: ' + error.message);
  }
}

// Load templates from backend
async function loadTemplates() {
  try {
    const templatesList = document.getElementById('templatesList');
    templatesList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">Loading templates...</div>';

    const response = await fetch(BACKEND_URL + '/templates?limit=10');

    if (!response.ok) {
      throw new Error('Failed to load templates');
    }

    const data = await response.json();

    if (!data.templates || data.templates.length === 0) {
      templatesList.innerHTML = '<div style="text-align: center; padding: 20px; color: #666;">No templates available yet</div>';
      return;
    }

    // Display templates
    const templatesHtml = data.templates.map(template => {
      const shortDesc = template.description.length > 100 ?
        template.description.substring(0, 100) + '...' :
        template.description;

      return '<div class="template-card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px; margin-bottom: 12px;">' +
        '<div style="display: flex; justify-content: space-between; align-items: start;">' +
        '<div style="flex: 1;">' +
        '<h3 style="margin: 0 0 6px 0; font-size: 15px; color: #1f2937;">' + template.title + '</h3>' +
        '<p style="margin: 0 0 8px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">' + shortDesc + '</p>' +
        '<div style="display: flex; align-items: center; gap: 12px; font-size: 11px; color: #9ca3af;">' +
        '<span>📥 ' + template.installs + ' installs</span>' +
        (template.category ? '<span>📂 ' + template.category + '</span>' : '') +
        (template.featured ? '<span style="color: #f59e0b;">⭐ Featured</span>' : '') +
        '</div></div></div>' +
        '<button class="btn btn-secondary install-template-btn" style="width: 100%; margin-top: 12px; font-size: 13px;" ' +
        'data-template-id="' + template.id + '">' +
        'Install Template</button></div>';
    }).join('');

    templatesList.innerHTML = templatesHtml;

    // Add event listeners to install buttons
    document.querySelectorAll('.install-template-btn').forEach(button => {
      button.addEventListener('click', function() {
        const templateId = parseInt(this.getAttribute('data-template-id'));
        handleInstallTemplate(templateId);
      });
    });

  } catch (error) {
    document.getElementById('templatesList').innerHTML =
      '<div style="text-align: center; padding: 20px; color: #ef4444;">Failed to load templates</div>';
  }
}

// Handle Install Template
async function handleInstallTemplate(templateId) {
  try {
    showLoading('Installing template...');

    // Fetch template details
    const templateResponse = await fetch(BACKEND_URL + '/templates/' + templateId);
    if (!templateResponse.ok) {
      throw new Error('Failed to load template details');
    }

    const template = await templateResponse.json();

    // Install template using Drive API
    if (!window.DriveAPI) {
      throw new Error('Drive API not loaded');
    }

    showLoading('Copying template to your Drive...');

    const result = await window.DriveAPI.installTemplate(template);

    if (!result.success) {
      throw new Error(result.error || 'Failed to install template');
    }

    // Record install on backend
    try {
      await fetch(BACKEND_URL + '/templates/install', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: templateId,
          user_id: null
        })
      });
    } catch (err) {
      // Non-critical, continue anyway
    }

    hideLoading();

    // Show success and open sheet
    updateStatus('Template installed: ' + result.sheetName, true);

    // Open the new sheet in a new tab
    window.DriveAPI.openSheet(result.sheetUrl);

    // Optionally save as current sheet
    if (confirm('Set this as your active sheet for syncing?')) {
      await chrome.storage.sync.set({
        sheetId: result.sheetId,
        sheetUrl: result.sheetUrl
      });
      await loadState();
    }

  } catch (error) {
    hideLoading();
    showError('Failed to install template: ' + error.message);
  }
};
