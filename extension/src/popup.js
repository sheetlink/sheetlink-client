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

// Phase 3.10: Post-onboarding navigation
let footerNav, legacyFooter;
let pageHome, pageBank, pageSheet, pageSettings;
let homeSyncBtn, homeResyncAllBtn, homeLastSync, homePlanTier, homeStatusPlaid, homeStatusSheet, homeSyncStatus;
let bankInstitutionName, bankAccountsList, updateBankConnectionBtn, addBankBtn, disconnectBankBtn;
let sheetLink, sheetOwner, sheetLastWrite, changeSheetBtnPage, disconnectSheetBtn;
let settingsUserEmail, settingsUserPicture, settingsUserInitial, logoutBtn, advancedOptionsBtn;
let currentTab = 'home';

// User control panel header elements
let defaultHeader, userHeader, userAvatar, userPicture, userInitial, userEmail, userTier;
let bankIndicator, sheetIndicator;

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

  // Phase 3.10: Post-onboarding navigation elements
  footerNav = document.getElementById('footer-nav');
  legacyFooter = document.getElementById('legacy-footer');
  pageHome = document.getElementById('page-home');
  pageBank = document.getElementById('page-bank');
  pageSheet = document.getElementById('page-sheet');
  pageSettings = document.getElementById('page-settings');

  // Home page elements
  homeSyncBtn = document.getElementById('homeSyncBtn');
  homeResyncAllBtn = document.getElementById('homeResyncAllBtn');
  homeLastSync = document.getElementById('homeLastSync');
  homePlanTier = document.getElementById('homePlanTier');
  homeStatusPlaid = document.getElementById('homeStatusPlaid');
  homeStatusSheet = document.getElementById('homeStatusSheet');
  homeSyncStatus = document.getElementById('homeSyncStatus');

  // Bank page elements
  bankInstitutionName = document.getElementById('bankInstitutionName');
  bankAccountsList = document.getElementById('bankAccountsList');
  updateBankConnectionBtn = document.getElementById('updateBankConnectionBtn');
  addBankBtn = document.getElementById('addBankBtn');
  disconnectBankBtn = document.getElementById('disconnectBankBtn');

  // Sheet page elements
  sheetLink = document.getElementById('sheetLink');
  sheetOwner = document.getElementById('sheetOwner');
  sheetLastWrite = document.getElementById('sheetLastWrite');
  changeSheetBtnPage = document.getElementById('changeSheetBtnPage');
  disconnectSheetBtn = document.getElementById('disconnectSheetBtn');

  // Settings page elements
  settingsUserEmail = document.getElementById('settingsUserEmail');
  settingsUserPicture = document.getElementById('settingsUserPicture');
  settingsUserInitial = document.getElementById('settingsUserInitial');
  logoutBtn = document.getElementById('logoutBtn');
  advancedOptionsBtn = document.getElementById('advancedOptionsBtn');

  // User control panel header elements
  defaultHeader = document.getElementById('default-header');
  userHeader = document.getElementById('user-header');
  userAvatar = document.getElementById('userAvatar');
  userPicture = document.getElementById('userPicture');
  userInitial = document.getElementById('userInitial');
  userEmail = document.getElementById('userEmail');
  userTier = document.getElementById('userTier');
  bankIndicator = document.getElementById('bankIndicator');
  sheetIndicator = document.getElementById('sheetIndicator');

  // Add click handlers for indicators (navigate to respective footer nav pages)
  if (bankIndicator) {
    bankIndicator.addEventListener('click', async (e) => {
      // Check if footer nav is visible (user is fully connected)
      if (footerNav && !footerNav.classList.contains('hidden')) {
        await switchTab('bank');
      } else {
        // During onboarding: navigate to bank connection section with proper state
        await showConnectSection();
      }
    });
  }
  if (sheetIndicator) {
    sheetIndicator.addEventListener('click', async (e) => {
      // Check if footer nav is visible (user is fully connected)
      if (footerNav && !footerNav.classList.contains('hidden')) {
        await switchTab('sheet');
      } else {
        // During onboarding: navigate to sheet connection section
        showSection('sheet');
      }
    });
  }
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
  if (signInGoogleBtn) {
    console.log('[Init] Attaching event listener to signInGoogleBtn');
    signInGoogleBtn.addEventListener('click', handleGoogleSignIn);
  } else {
    console.warn('[Init] signInGoogleBtn not found!');
  }
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

  // Phase 3.10: Attach navigation event listeners
  attachNavigationEventListeners();

  // Phase 3.12: Initialize info icon tooltips
  initializeTooltips();
}

function initializeTooltips() {
  // Find all info icons and attach hover listeners
  const infoIcons = document.querySelectorAll('.info-icon');

  infoIcons.forEach(icon => {
    const container = icon.closest('.info-icon-container');
    if (!container) return;

    const buttonWrapper = container.closest('.button-with-tooltip');
    if (!buttonWrapper) return;

    const tooltip = buttonWrapper.querySelector('.info-tooltip');
    if (!tooltip) return;

    // Show tooltip on icon hover
    icon.addEventListener('mouseenter', () => {
      tooltip.classList.add('show');
    });

    // Hide tooltip when leaving icon
    icon.addEventListener('mouseleave', () => {
      tooltip.classList.remove('show');
    });
  });
}

function handleLearnMore() {
  chrome.tabs.create({ url: 'https://sheetlink.app' });
}

// Load current state from storage
async function loadState() {
  try {
    const data = await chrome.storage.sync.get(['itemId', 'sheetId', 'sheetUrl', 'lastSync', 'hasSeenWelcome', 'sheetlink_connection_status', 'googleAuthenticated', 'googleUserId', 'googleEmail', 'hasProgressedToSheetSetup', 'hasCompletedInitialOnboarding']);

    console.log('[Popup] loadState - googleAuthenticated:', data.googleAuthenticated);
    console.log('[Popup] loadState - googleUserId:', data.googleUserId);
    console.log('[Popup] loadState - hasProgressedToSheetSetup:', data.hasProgressedToSheetSetup);
    console.log('[Popup] loadState - hasCompletedInitialOnboarding:', data.hasCompletedInitialOnboarding);

    // Phase 3.9: Update email displays throughout the UI
    if (data.googleEmail) {
      const emailElements = document.querySelectorAll('#sheetUserEmail, #syncGoogleEmail');
      emailElements.forEach(el => {
        if (el) el.textContent = data.googleEmail;
      });
    }

    // Phase 3.8: Check if user is authenticated with Google first
    if (!data.googleAuthenticated) {
      console.log('[Popup] User not authenticated - showing welcome screen');
      // User not authenticated - show welcome with "Sign in with Google" button
      showSection('welcome');
      // Hide disconnect button on welcome screen
      if (disconnectBtn) disconnectBtn.classList.add('hidden');
      return;
    }

    console.log('[Popup] User is authenticated - continuing with flow');

    // Phase 3.10: After Google auth, show user control panel header
    toggleHeader(true);
    updateUserHeader(data.googleEmail, !!data.itemId, !!data.sheetId);
    updateTierDisplay();

    // No bank connected: try to restore from backend
    if (!data.itemId) {
      // If user has completed onboarding before, try to restore silently
      if (data.hasCompletedInitialOnboarding) {
        console.log('[Popup] Checking for items to restore...');
        const restored = await tryRestoreItems();
        if (restored) {
          // Items restored! Reload state with new itemId
          return loadState();
        }

        // No items to restore - show navigation with empty state
        // User can reconnect from Bank page
        await initializeNavigation();
        return;
      }

      // New user - show connect bank screen
      showSection('connect');
      // Hide disconnect button when no bank connected
      if (disconnectBtn) disconnectBtn.classList.add('hidden');
      // Phase 3.10: Initialize navigation (will hide footer nav during onboarding)
      await initializeNavigation();
      return;
    }

    // Bank connected
    // Skip legacy sections for users who have completed onboarding
    if (!data.hasCompletedInitialOnboarding) {
      showSection('status');
      updateStatus(CONFIG.isSandbox ? CONFIG.currentCopy.connectedInstitution(CONFIG.DEMO_INSTITUTION_NAME) : 'Connected', true);
      disconnectBtn.classList.remove('hidden');
    }

    // Phase 3.9 UX: Show step 2 for returning users if they just authenticated
    // BUT skip step 2 if user has already progressed to sheet setup
    // Check if user just signed in (first load after Google auth)
    const shouldShowStep2 = !data.hasSeenConnectStep && data.googleAuthenticated && !data.hasProgressedToSheetSetup && !data.hasCompletedInitialOnboarding;
    if (shouldShowStep2) {
      // Mark that we've shown step 2
      await chrome.storage.sync.set({ hasSeenConnectStep: true });

      // Show connect screen with connection status
      showSection('connect');

      // Fetch and display item info (institution name and accounts)
      await displayItemInfo(data.itemId);

      // Update header to "Add a Bank"
      const connectHeader = document.querySelector('#connectSection h2');
      if (connectHeader) {
        connectHeader.textContent = 'Add a Bank';
      }

      // Hide the initial "Add a Bank via Plaid" button
      const connectBtn = document.getElementById('connectBankBtn');
      if (connectBtn) {
        connectBtn.classList.add('hidden');
      }

      // Show and wire up "Add Another Bank" button (green, primary)
      const updateBtn = document.getElementById('updateConnectionBtn');
      if (updateBtn) {
        updateBtn.classList.remove('hidden');
        updateBtn.addEventListener('click', () => handleConnectBank(true));
      }

      // Show and wire up "Next" button (gray, secondary)
      const nextBtn = document.getElementById('nextBtn');
      if (nextBtn) {
        nextBtn.classList.remove('hidden');
        nextBtn.addEventListener('click', async () => {
          // Mark that user has progressed to sheet setup
          await chrome.storage.sync.set({ hasProgressedToSheetSetup: true });
          proceedToSheetSetup(data);
        });
      }

      // Update Plaid description for multiple institutions
      const plaidDesc = document.getElementById('plaidDescription');
      if (plaidDesc) {
        plaidDesc.textContent = 'Connect multiple institutions to sync all your accounts in one place.';
      }

      // Phase 3.10: Initialize navigation (will hide footer nav since not fully connected)
      await initializeNavigation();
      return;
    }

    // Normal flow - proceed to sheet setup
    // Skip legacy sections for returning users
    if (!data.hasCompletedInitialOnboarding) {
      proceedToSheetSetup(data);
    }

    // Phase 3.10: Initialize navigation after state is loaded
    await initializeNavigation();
  } catch (error) {
    console.error('[Popup] Failed to load state:', error);
    showError('Failed to load state: ' + error.message);
  }
}

// Helper function to show connect section with proper state
async function showConnectSection() {
  const data = await chrome.storage.sync.get(['itemId', 'googleEmail']);

  showSection('connect');

  // If user has a bank connected, show the "Add a Bank" state
  if (data.itemId) {
    // Fetch and display item info (institution name and accounts)
    await displayItemInfo(data.itemId);

    // Update header to "Add a Bank"
    const connectHeader = document.querySelector('#connectSection h2');
    if (connectHeader) {
      connectHeader.textContent = 'Add a Bank';
    }

    // Hide the initial "Add a Bank via Plaid" button
    const connectBtn = document.getElementById('connectBankBtn');
    if (connectBtn) {
      connectBtn.classList.add('hidden');
    }

    // Show and wire up "Add Another Bank" button (green, primary)
    const updateBtn = document.getElementById('updateConnectionBtn');
    if (updateBtn) {
      updateBtn.classList.remove('hidden');
      // Remove old listener and add new one
      const newUpdateBtn = updateBtn.cloneNode(true);
      updateBtn.parentNode.replaceChild(newUpdateBtn, updateBtn);
      newUpdateBtn.addEventListener('click', () => handleConnectBank(true));
    }

    // Show and wire up "Next" button (gray, secondary)
    const nextBtn = document.getElementById('nextBtn');
    if (nextBtn) {
      nextBtn.classList.remove('hidden');
      // Remove old listener and add new one
      const newNextBtn = nextBtn.cloneNode(true);
      nextBtn.parentNode.replaceChild(newNextBtn, nextBtn);
      newNextBtn.addEventListener('click', async () => {
        const fullData = await chrome.storage.sync.get(['itemId', 'sheetId', 'sheetUrl', 'lastSync']);
        await chrome.storage.sync.set({ hasProgressedToSheetSetup: true });
        proceedToSheetSetup(fullData);
      });
    }

    // Update Plaid description for multiple institutions
    const plaidDesc = document.getElementById('plaidDescription');
    if (plaidDesc) {
      plaidDesc.textContent = 'Connect multiple institutions to sync all your accounts in one place.';
    }
  }
}

// Helper function to proceed to sheet setup after step 2
async function proceedToSheetSetup(data) {
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

      // Fetch and display bank name in status
      if (data.itemId) {
        await updateBankStatus(data.itemId);
      }

      updateAutoSyncStatus();
      loadRecentSyncs();
      updateTierDisplay();  // Phase 3: Update tier info
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

    // Update the bank connection status display with collapsible card
    const statusEl = document.getElementById('bankConnectionStatus');
    if (statusEl) {
      const accountCount = itemInfo.accounts ? itemInfo.accounts.length : 0;

      // Build collapsible accounts list
      let accountsHTML = '';
      if (itemInfo.accounts && itemInfo.accounts.length > 0) {
        accountsHTML = '<div class="bank-accounts-list" style="margin-top: 12px; padding-left: 8px; display: none;">';
        itemInfo.accounts.forEach(account => {
          const accountName = account.official_name || account.name;
          const mask = account.mask ? ` ••${account.mask}` : '';
          accountsHTML += `
            <div style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #374151;">
              <div style="font-weight: 500;">${accountName}</div>
              <div style="font-size: 12px; color: #9ca3af; margin-top: 2px;">${mask}</div>
            </div>
          `;
        });
        accountsHTML += '</div>';
      }

      // Create collapsible bank card
      statusEl.innerHTML = `
        <div class="bank-card" style="cursor: pointer; user-select: none;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 8px;">
              <span style="color: #10b981; font-size: 16px;">✓</span>
              <div>
                <div style="font-size: 14px; color: #166534; font-weight: 600;">${itemInfo.institution_name}</div>
                <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">${accountCount} account${accountCount !== 1 ? 's' : ''}</div>
              </div>
            </div>
            <span class="expand-arrow" style="color: #9ca3af; font-size: 14px; transition: transform 0.2s;">▶</span>
          </div>
          ${accountsHTML}
        </div>
      `;
      statusEl.classList.remove('hidden');

      // Add click event listener to toggle expansion
      const bankCard = statusEl.querySelector('.bank-card');
      if (bankCard) {
        bankCard.addEventListener('click', () => {
          const accountsList = bankCard.querySelector('.bank-accounts-list');
          const arrow = bankCard.querySelector('.expand-arrow');

          if (accountsList) {
            const isExpanded = accountsList.style.display !== 'none';
            accountsList.style.display = isExpanded ? 'none' : 'block';
            arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
          }
        });
      }
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

// Update bank status on sync page
async function updateBankStatus(itemId) {
  try {
    // Fetch item info to get institution name and accounts
    const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}/info`);

    if (!response.ok) {
      console.error('Failed to fetch item info for status:', response.status);
      updateStatus('Plaid connected', true);
      return;
    }

    const itemInfo = await response.json();

    // Update status to show "Plaid connected"
    updateStatus('Plaid connected', true);

    // Populate the collapsible details section
    const detailsEl = document.getElementById('bankConnectionDetails');
    const contentEl = document.getElementById('bankConnectionDetailsContent');

    if (detailsEl && contentEl && itemInfo) {
      // Build institution and accounts HTML
      let accountsHTML = '';
      if (itemInfo.accounts && itemInfo.accounts.length > 0) {
        accountsHTML = '<div style="margin-bottom: 12px;">';
        itemInfo.accounts.forEach(account => {
          const accountName = account.official_name || account.name;
          const mask = account.mask ? ` (****${account.mask})` : '';
          accountsHTML += `<div style="margin-top: 6px; color: #374151;">• ${accountName}${mask}</div>`;
        });
        accountsHTML += '</div>';
      }

      contentEl.innerHTML = `
        <div style="font-weight: 600; color: #166534; margin-bottom: 8px;">
          ✓ ${itemInfo.institution_name}
        </div>
        ${accountsHTML}
        <button id="updateConnectionFromDetails" class="btn btn-secondary" style="width: 100%; font-size: 13px; padding: 8px;">
          Update Connection
        </button>
      `;

      // Show the details section
      detailsEl.style.display = 'block';

      // Add event listener for Update Connection button
      const updateBtn = document.getElementById('updateConnectionFromDetails');
      if (updateBtn) {
        updateBtn.addEventListener('click', () => handleConnectBank(true));
      }

      // Add arrow rotation on toggle
      const detailsElement = document.getElementById('bankConnectionDetails');
      const arrow = document.getElementById('dropdownArrow');
      if (detailsElement && arrow) {
        detailsElement.addEventListener('toggle', () => {
          if (detailsElement.open) {
            arrow.style.transform = 'rotate(90deg)';
          } else {
            arrow.style.transform = 'rotate(0deg)';
          }
        });
      }
    }
  } catch (error) {
    console.error('Error updating bank status:', error);
    updateStatus('Plaid connected', true);
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

    // Update user header tier
    if (userTier) {
      userTier.textContent = tierText;
    }

    // Update home page tier
    const homePlanTier = document.getElementById('homePlanTier');
    if (homePlanTier) {
      homePlanTier.textContent = tierText;
    }

    // Update tooltip days value (user header)
    const tierDaysTooltip = document.getElementById('tierDaysTooltip');
    if (tierDaysTooltip) {
      tierDaysTooltip.textContent = `${data.days_available} days`;
    }

    // Update tooltip days value (home page)
    const homeTierDaysTooltip = document.getElementById('homeTierDaysTooltip');
    if (homeTierDaysTooltip) {
      homeTierDaysTooltip.textContent = `${data.days_available} days`;
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
  console.log('[Google Auth] Sign in button clicked');
  try {
    // Check if this is a returning user (has completed onboarding before)
    const { hasCompletedInitialOnboarding } = await chrome.storage.sync.get(['hasCompletedInitialOnboarding']);
    const isReturningUser = hasCompletedInitialOnboarding || isReAuthenticating;

    // Trigger Google OAuth flow via service worker
    // Note: This opens OAuth window and doesn't wait for response
    // Service worker will reopen popup after OAuth completes
    console.log('[Google Auth] Sending GET_AUTH_TOKEN message to service worker');
    // Phase 3.11: Set forceAuth=true when user clicks button (re-authentication or returning user)
    chrome.runtime.sendMessage({
      type: 'GET_AUTH_TOKEN',
      forceAuth: isReturningUser
    }, async (response) => {
      console.log('[Google Auth] Received response from service worker:', response);
      if (response && response.token) {
        // OAuth completed successfully
        // Note: Service worker already fetched and stored user info (googleUserId, googleEmail, googlePicture, googleAuthenticated)
        // during the OAuth callback, so we don't need to fetch it again here

        // Phase 3.11: Check if this is a re-authentication flow
        if (isReAuthenticating) {
          console.log('[ReAuth] Re-authentication successful, returning to home page');

          // Reset subtitle back to normal
          const headerSubtitle = document.getElementById('headerSubtitle');
          if (headerSubtitle) {
            headerSubtitle.textContent = 'Forget dashboards. Feed your spreadsheet.';
          }

          // Clear re-auth flag
          isReAuthenticating = false;

          // Reload state to return to normal flow
          await loadState();
        } else {
          // Normal onboarding flow or returning user - reload state
          await loadState();
        }
      }
    });

    // Phase 3.11: Don't close popup during re-auth or for returning users
    // Service worker will reopen popup after OAuth completes
    if (!isReturningUser) {
      // Only close for first-time onboarding
      console.log('[Google Auth] First-time user - closing popup for OAuth');
      window.close();
    } else {
      console.log('[Google Auth] Returning user - keeping popup open during OAuth');
    }

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
    // Phase 3.11: Mark onboarding as complete when sheet is connected
    await chrome.storage.sync.set({
      sheetId,
      sheetUrl: url,
      hasCompletedInitialOnboarding: true  // Flag for enabling item restoration in future
    });

    hideLoading();
    updateStatus('Sheet saved successfully!', true);
    await loadState();
  } catch (error) {
    hideLoading();
    showSheetError(error.message);
  }
}

// Home page sync status helpers
function showHomeSyncLoading(message = 'Syncing...') {
  if (!homeSyncStatus) return;
  homeSyncStatus.classList.remove('hidden', 'success', 'error');
  homeSyncStatus.classList.add('loading');
  homeSyncStatus.querySelector('.sync-status-loading').style.display = 'flex';
  homeSyncStatus.querySelector('.sync-status-message').style.display = 'none';
  homeSyncStatus.querySelector('#homeSyncStatusText').textContent = message;
}

function showHomeSyncSuccess(message) {
  if (!homeSyncStatus) return;
  homeSyncStatus.classList.remove('hidden', 'loading', 'error');
  homeSyncStatus.classList.add('success');
  homeSyncStatus.querySelector('.sync-status-loading').style.display = 'none';
  homeSyncStatus.querySelector('.sync-status-message').style.display = 'block';
  homeSyncStatus.querySelector('#homeSyncStatusMessage').textContent = message;

  // Auto-hide after 5 seconds
  setTimeout(() => {
    if (homeSyncStatus) homeSyncStatus.classList.add('hidden');
  }, 5000);
}

function showHomeSyncError(message) {
  if (!homeSyncStatus) return;
  homeSyncStatus.classList.remove('hidden', 'loading', 'success');
  homeSyncStatus.classList.add('error');
  homeSyncStatus.querySelector('.sync-status-loading').style.display = 'none';
  homeSyncStatus.querySelector('.sync-status-message').style.display = 'block';
  homeSyncStatus.querySelector('#homeSyncStatusMessage').textContent = message;

  // Auto-hide after 8 seconds
  setTimeout(() => {
    if (homeSyncStatus) homeSyncStatus.classList.add('hidden');
  }, 8000);
}

function hideHomeSyncStatus() {
  if (!homeSyncStatus) return;
  homeSyncStatus.classList.add('hidden');
}

// Handle Sync Now button
async function handleSyncNow() {
  async function attemptSync() {
    try {
      showHomeSyncLoading('Checking your data...');

      const { itemId, sheetId } = await chrome.storage.sync.get(['itemId', 'sheetId']);

      if (!itemId || !sheetId) {
        throw new Error('Missing item ID or sheet ID');
      }

      // Check if we need to backfill (tabs deleted or empty)
      const needsBackfill = await checkIfBackfillNeeded(sheetId);

      // Fetch data from backend (backfill if needed, otherwise incremental sync)
      let syncData;
      if (needsBackfill) {
        console.log('[Sync] Tabs missing or empty, using backfill to re-populate all data');
        showHomeSyncLoading('Fetching all transactions...');
        syncData = await fetchBackfillData(itemId);
      } else {
        console.log('[Sync] Tabs exist with data, using incremental sync');
        showHomeSyncLoading('Fetching new transactions...');
        syncData = await fetchSyncData(itemId);
      }

      // Check if rules are enabled and ensure Rules tab exists
      if (window.RulesEngine) {
        const settings = await window.RulesEngine.getSettings();

        if (settings.enableRulesTab) {
          showHomeSyncLoading('Checking Rules tab...');

          // Check if Rules tab exists, create if not
          const rulesExists = await window.RulesEngine.rulesTabExists(sheetId, settings.rulesTabName);

          if (!rulesExists) {
            showHomeSyncLoading('Creating Rules tab...');
            await window.RulesEngine.createRulesTab(sheetId, settings.rulesTabName);
          }

          // Apply rules and optionally ML to transactions
          if (syncData.transactions) {
            if (settings.enableMLAssist) {
              showHomeSyncLoading('Applying AI categorization...');
              syncData.transactions = await window.RulesEngine.applyRulesAndML(
                sheetId,
                syncData.transactions,
                true
              );
            } else {
              showHomeSyncLoading('Applying rules...');
              syncData.transactions = await window.RulesEngine.applyRules(
                sheetId,
                syncData.transactions
              );
            }
          }
        }
      }

      showHomeSyncLoading('Writing to sheet...');

      // Write to Google Sheets
      const result = await writeToSheets(sheetId, syncData);

      // Update last sync time
      await chrome.storage.sync.set({ lastSync: Date.now() });

      // Show detailed success message
      const message = `Sync completed! ${result.accountsWritten} accounts, ${result.transactionsNew} new transactions (${result.transactionsTotal} total)`;
      showHomeSyncSuccess(message);

      await loadState();
      hideSyncError();
    } catch (error) {
      console.log('[Sync] Error caught:', error);
      console.log('[Sync] Error type:', error.name, 'isAuthError:', error.isAuthError);

      // Phase 3.11: Check for authentication errors
      if (error.isAuthError || error.name === 'AuthenticationError') {
        console.log('[Sync] Auth error detected, showing welcome page for re-authentication');
        hideHomeSyncStatus();
        // Show welcome page for re-authentication (no auto-retry)
        showReAuthPage();
        return;
      }

      // Phase 3.11: Check for permission errors (use custom error class)
      if (error.isPermissionError || error.name === 'PermissionError') {
        showHomeSyncError('Permission denied. Check sheet access.');
        showSyncError();
        return;
      }

      // Phase 3.9.2 & 3.9.6: Enhanced error detection for sheet access issues
      const errorMsg = error.message || '';
      const isSheetAccessError = errorMsg.includes('403') ||
                                  errorMsg.includes('404') ||
                                  errorMsg.includes('Cannot access sheet') ||
                                  errorMsg.includes('edit permissions');

      if (isSheetAccessError) {
        showHomeSyncError('Cannot access sheet. Check permissions.');
        showSyncError();
      } else {
        // Phase 3.9.6: Improved generic error messages
        let userFriendlyMsg = errorMsg;

        if (errorMsg.includes('429') || errorMsg.toLowerCase().includes('rate limit')) {
          userFriendlyMsg = 'Rate limit exceeded. Please wait a moment.';
        } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
          userFriendlyMsg = 'Network error. Check your connection.';
        } else {
          userFriendlyMsg = 'Sync failed: ' + errorMsg;
        }

        showHomeSyncError(userFriendlyMsg);
      }
    }
  }

  await attemptSync();
}

// Handle Re-sync All Data button - Force backfill regardless of tab state
async function handleResyncAll() {
  try {
    showHomeSyncLoading('Re-fetching all data...');

    const { itemId, sheetId } = await chrome.storage.sync.get(['itemId', 'sheetId']);

    if (!itemId || !sheetId) {
      throw new Error('Missing item ID or sheet ID');
    }

    console.log('[Resync All] Forcing backfill to re-fetch all data');

    // Always use backfill (ignore tab state check)
    const syncData = await fetchBackfillData(itemId);

    showHomeSyncLoading('Writing to sheet...');

    // Write to Google Sheets
    const result = await writeToSheets(sheetId, syncData);

    // Update last sync time
    await chrome.storage.sync.set({ lastSync: Date.now() });

    // Show detailed success message
    const message = `Re-sync completed! ${result.accountsWritten} accounts, ${result.transactionsNew} new transactions (${result.transactionsTotal} total)`;
    showHomeSyncSuccess(message);

    await loadState();

  } catch (error) {
    console.log('[Resync All] Error:', error);

    // Check for authentication errors
    if (error.isAuthError || error.name === 'AuthenticationError') {
      console.log('[Resync All] Auth error detected, showing welcome page for re-authentication');
      hideHomeSyncStatus();
      showReAuthPage();
      return;
    }

    // Check for permission errors
    if (error.isPermissionError || error.name === 'PermissionError') {
      showHomeSyncError('Permission denied. Check sheet access.');
      showSyncError();
      return;
    }

    // Handle other errors
    const errorMsg = error.message || '';
    const isSheetAccessError = errorMsg.includes('403') ||
                                errorMsg.includes('404') ||
                                errorMsg.includes('Cannot access sheet') ||
                                errorMsg.includes('edit permissions');

    if (isSheetAccessError) {
      showHomeSyncError('Cannot access sheet. Check permissions.');
      showSyncError();
    } else {
      let userFriendlyMsg = errorMsg;
      if (errorMsg.includes('429') || errorMsg.toLowerCase().includes('rate limit')) {
        userFriendlyMsg = 'Rate limit exceeded. Please wait a moment.';
      } else if (errorMsg.includes('network') || errorMsg.includes('fetch')) {
        userFriendlyMsg = 'Network error. Check your connection.';
      } else {
        userFriendlyMsg = 'Re-sync failed: ' + errorMsg;
      }
      showHomeSyncError(userFriendlyMsg);
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

    const { itemId, googleUserId, googleEmail, googleAuthenticated } = await chrome.storage.sync.get(['itemId', 'googleUserId', 'googleEmail', 'googleAuthenticated']);

    // Call backend to remove item if it exists
    if (itemId) {
      try {
        console.log(`[Disconnect] Calling DELETE /plaid/item/${itemId}`);
        const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}`, {
          method: 'DELETE'
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.warn('Failed to delete item from backend:', response.status, errorText);
          // Continue anyway - at least clear local storage
        } else {
          const result = await response.json();
          console.log('[Disconnect] Item deleted from backend successfully:', result);
        }
      } catch (error) {
        console.error('Error deleting item from backend:', error);
        // Continue anyway - at least clear local storage
      }
    } else {
      console.log('[Disconnect] No itemId found, skipping backend delete');
    }

    // Clear all local storage
    await chrome.storage.sync.clear();

    // Also clear local storage (Google access tokens)
    await chrome.storage.local.clear();

    // Restore Google auth information so user doesn't have to re-authenticate
    if (googleUserId && googleEmail && googleAuthenticated) {
      await chrome.storage.sync.set({
        googleUserId,
        googleEmail,
        googleAuthenticated
      });
    }

    hideLoading();

    // Instead of calling loadState() which triggers onboarding,
    // stay in post-onboarding nav and go to Bank page
    await loadBankPage();
    await switchTab('bank');

    // Update user header
    const updatedData = await chrome.storage.sync.get(['googleEmail', 'sheetId']);
    updateUserHeader(updatedData.googleEmail, false, !!updatedData.sheetId);
  } catch (error) {
    hideLoading();
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
  console.log('[Sync] Fetching data from backend for item_id:', itemId);

  const response = await fetch(`${BACKEND_URL}/plaid/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Sync failed: ${errorData.detail || response.statusText}`);
  }

  const data = await response.json();
  console.log('[Sync] Backend returned:', {
    accounts: data.accounts?.length || 0,
    transactions: data.transactions?.length || 0
  });

  return data;
}

async function fetchBackfillData(itemId) {
  console.log('[Sync] Fetching backfill data from backend for item_id:', itemId);

  const response = await fetch(`${BACKEND_URL}/plaid/backfill`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Backfill failed: ${errorData.detail || response.statusText}`);
  }

  const data = await response.json();
  console.log('[Sync] Backfill returned:', {
    accounts: data.accounts?.length || 0,
    transactions: data.transactions?.length || 0
  });

  // Backfill endpoint returns different format, normalize it
  return {
    accounts: data.accounts || [],
    transactions: data.transactions || []
  };
}

async function checkIfBackfillNeeded(sheetId) {
  console.log('[Sync] Checking if backfill is needed for sheet:', sheetId);

  try {
    // Check if Accounts and Transactions tabs exist and have data
    const accountsEmpty = await isTabEmptyOrMissing(sheetId, 'Accounts');
    const transactionsEmpty = await isTabEmptyOrMissing(sheetId, 'Transactions');

    if (accountsEmpty || transactionsEmpty) {
      console.log('[Sync] Backfill needed - Accounts empty:', accountsEmpty, 'Transactions empty:', transactionsEmpty);
      return true;
    }

    console.log('[Sync] Both tabs exist with data, no backfill needed');
    return false;
  } catch (error) {
    // If it's an authentication error, propagate it up so user can re-authenticate
    if (error.isAuthError || error.name === 'AuthenticationError') {
      console.log('[Sync] Auth error while checking tabs, propagating for re-auth');
      throw error;
    }

    console.log('[Sync] Error checking tabs, defaulting to backfill:', error);
    // If we can't check, safer to backfill
    return true;
  }
}

async function isTabEmptyOrMissing(sheetId, tabName) {
  try {
    // Read the first 2 rows (header + first data row)
    const data = await window.SheetsAPI.readRange(sheetId, `${tabName}!A1:A2`);

    // Tab is empty or missing if:
    // - No data at all (tab doesn't exist)
    // - Only 1 row (just headers, no data)
    // - No rows (completely empty)
    if (!data || data.length <= 1) {
      console.log(`[Sync] Tab "${tabName}" is empty or missing (rows: ${data?.length || 0})`);
      return true;
    }

    return false;
  } catch (error) {
    // If it's an authentication error, propagate it up so user can re-authenticate
    if (error.isAuthError || error.name === 'AuthenticationError') {
      console.log(`[Sync] Auth error while checking tab "${tabName}", propagating for re-auth`);
      throw error;
    }

    // If we get 404 or any other error, tab likely doesn't exist
    console.log(`[Sync] Tab "${tabName}" doesn't exist or is inaccessible:`, error);
    return true;
  }
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
    // Phase 3.11: Re-throw authentication errors unchanged (don't transform them)
    if (error.isAuthError || error.name === 'AuthenticationError') {
      throw error;
    }

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

// Update user control panel header
async function updateUserHeader(googleEmail, hasBank, hasSheet) {
  console.log('[User Header] Updating with:', { googleEmail, hasBank, hasSheet });

  if (!userEmail || !userInitial) return;

  // Update email
  userEmail.textContent = googleEmail || 'user@gmail.com';

  // Get profile picture from storage
  const { googlePicture } = await chrome.storage.sync.get(['googlePicture']);

  // Helper function to check if URL is a generic Google avatar
  const isGenericGoogleAvatar = (url) => {
    if (!url) return true;
    // Generic Google avatars contain specific patterns
    return url.includes('ui-avatars.com') ||
           url.includes('/avatar/') ||
           url.match(/\/s\d+-c\//); // Pattern like /s96-c/ for default size
  };

  // Update avatar - show picture if available and not generic, otherwise show SheetLink logo
  if (googlePicture && userPicture && !isGenericGoogleAvatar(googlePicture)) {
    // Load the image and check if it's actually valid
    const img = new Image();
    img.onload = () => {
      userPicture.src = googlePicture;
      userPicture.classList.remove('hidden', 'fallback-logo');
      userInitial.classList.add('hidden');
    };
    img.onerror = () => {
      // Image failed to load, use SheetLink logo
      userPicture.src = '../assets/brand/sheetlink-mark-green.svg';
      userPicture.classList.remove('hidden');
      userPicture.classList.add('fallback-logo');
      userInitial.classList.add('hidden');
    };
    img.src = googlePicture;
  } else if (userPicture) {
    // Show SheetLink logo as fallback (no picture or generic avatar)
    userPicture.src = '../assets/brand/sheetlink-mark-green.svg';
    userPicture.classList.remove('hidden');
    userPicture.classList.add('fallback-logo');
    userInitial.classList.add('hidden');
  } else {
    // Last resort: show initial
    const initial = googleEmail ? googleEmail.charAt(0).toUpperCase() : 'U';
    userInitial.textContent = initial;
    userInitial.classList.remove('hidden');
  }

  // Update bank indicator
  if (bankIndicator) {
    bankIndicator.classList.remove('connected', 'disconnected');
    bankIndicator.classList.add(hasBank ? 'connected' : 'disconnected');

    // Update tooltip text
    const bankTooltip = document.getElementById('bankTooltipContent');
    if (bankTooltip) {
      bankTooltip.textContent = hasBank ? 'Bank connected' : 'Bank not connected';
    }
  }

  // Update sheet indicator
  if (sheetIndicator) {
    sheetIndicator.classList.remove('connected', 'disconnected');
    sheetIndicator.classList.add(hasSheet ? 'connected' : 'disconnected');

    // Update tooltip text
    const sheetTooltip = document.getElementById('sheetTooltipContent');
    if (sheetTooltip) {
      sheetTooltip.textContent = hasSheet ? 'Sheet connected' : 'Sheet not connected';
    }
  }
}

// Toggle between default header and user control panel header
function toggleHeader(showUserHeader) {
  console.log('[Header] Toggling to:', showUserHeader ? 'user-header' : 'default-header');

  if (showUserHeader) {
    // Show user control panel, hide default header
    if (defaultHeader) defaultHeader.classList.add('hidden');
    if (userHeader) userHeader.classList.remove('hidden');
  } else {
    // Show default header, hide user control panel
    if (defaultHeader) defaultHeader.classList.remove('hidden');
    if (userHeader) userHeader.classList.add('hidden');
  }
}

function showSection(section) {
  // Hide all sections
  [connectSection, sheetSection, syncSection, statusSection, errorSection, loadingSection, templatesSection, welcomeSection]
    .forEach(el => el && el.classList.add('hidden'));

  // Show requested section
  switch(section) {
    case 'welcome':
      welcomeSection && welcomeSection.classList.remove('hidden');
      // Phase 3.10: Hide both headers for modern welcome page
      document.body.classList.add('welcome-active');
      toggleHeader(false);
      if (defaultHeader) defaultHeader.classList.add('hidden');
      // Mark that user has seen welcome
      chrome.storage.sync.set({ hasSeenWelcome: true });
      // Hide legacy footer on welcome
      if (legacyFooter) legacyFooter.classList.add('hidden');
      break;
    case 'connect':
      connectSection.classList.remove('hidden');
      // Phase 3.10: Show user header for authenticated sections
      document.body.classList.remove('welcome-active');
      // Hide legacy footer on Step 2
      if (legacyFooter) legacyFooter.classList.add('hidden');
      break;
    case 'sheet':
      sheetSection.classList.remove('hidden');
      // Phase 3.10: Show default header for other sections
      document.body.classList.remove('welcome-active');
      // Hide legacy footer on Step 3
      if (legacyFooter) legacyFooter.classList.add('hidden');
      break;
    case 'sync':
      syncSection.classList.remove('hidden');
      statusSection.classList.remove('hidden');
      // Phase 3.10: Show default header for other sections
      document.body.classList.remove('welcome-active');
      // Show legacy footer on sync section
      if (legacyFooter) legacyFooter.classList.remove('hidden');
      break;
    case 'status':
      statusSection.classList.remove('hidden');
      // Show legacy footer on status section
      if (legacyFooter) legacyFooter.classList.remove('hidden');
      break;
    case 'templates':
      templatesSection.classList.remove('hidden');
      // Show legacy footer on templates section
      if (legacyFooter) legacyFooter.classList.remove('hidden');
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

    // Set modal description text based on environment
    const descriptionEl = document.getElementById('sheetSuccessDescription');
    if (descriptionEl) {
      if (CONFIG.isSandbox) {
        descriptionEl.textContent = 'Your Google Sheet is now live with sandbox transactions including balances, categories, and sample activity powered by SheetLink.';
      } else {
        descriptionEl.textContent = 'Your Google Sheet is now live with your transaction data including balances, categories, and account activity powered by SheetLink.';
      }
    }

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

// ===== Re-authentication using Welcome Page =====

let isReAuthenticating = false;

/**
 * Show welcome page for re-authentication when token expires
 */
function showReAuthPage() {
  console.log('[ReAuth] Showing welcome page for re-authentication');

  // Mark that we're in re-authentication mode
  isReAuthenticating = true;

  // Hide all post-onboarding pages
  document.querySelectorAll('.page').forEach(page => page.classList.add('hidden'));

  // Hide footer navigation
  const footerNav = document.getElementById('footer-nav');
  if (footerNav) footerNav.classList.add('hidden');

  // Show the welcome section (same as onboarding)
  showSection('welcome');

  // Update the subtitle to indicate session expired
  const headerSubtitle = document.getElementById('headerSubtitle');
  if (headerSubtitle) {
    headerSubtitle.textContent = '🔐 Your session expired. Please sign in again.';
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

// ================================================
// Phase 3.10: Post-Onboarding Navigation System
// ================================================

/**
 * Check if user is fully connected (Google + Plaid + Sheet)
 */
function isFullyConnected(state) {
  return !!(state.googleUserId && state.itemId && state.sheetId);
}

/**
 * Switch to a specific tab/page
 */
async function switchTab(tabName) {
  console.log('[Nav] Switching to tab:', tabName);

  // Hide all pages
  const pages = [pageHome, pageBank, pageSheet, pageSettings];
  pages.forEach(page => {
    if (page) {
      page.classList.remove('active');
      page.classList.add('hidden');
    }
  });

  // Show target page
  let targetPage;
  if (tabName === 'home') targetPage = pageHome;
  if (tabName === 'bank') targetPage = pageBank;
  if (tabName === 'sheet') targetPage = pageSheet;
  if (tabName === 'settings') targetPage = pageSettings;

  if (targetPage) {
    targetPage.classList.remove('hidden');
    targetPage.classList.add('active');
  }

  // Update active tab UI
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.classList.remove('active');
  });
  const activeTab = document.querySelector('.nav-tab[data-page="' + tabName + '"]');
  if (activeTab) {
    activeTab.classList.add('active');
  }

  // Store current tab
  currentTab = tabName;
  await chrome.storage.local.set({ currentTab });

  // Load page-specific data
  if (tabName === 'home') await loadHomePage();
  if (tabName === 'bank') await loadBankPage();
  if (tabName === 'sheet') await loadSheetPage();
  if (tabName === 'settings') await loadSettingsPage();
}

/**
 * Initialize navigation system
 */
async function initializeNavigation() {
  const state = await chrome.storage.sync.get(['googleUserId', 'itemId', 'sheetId', 'hasCompletedOnboarding', 'hasCompletedInitialOnboarding']);

  console.log('[Nav] initializeNavigation called, state:', state);
  console.log('[Nav] isFullyConnected:', isFullyConnected(state));

  // Phase 3.11: Check if user has completed initial onboarding (all 3 steps)
  // Only show post-onboarding navigation after they've finished Google + Bank + Sheet
  const hasReachedPostOnboarding = state.hasCompletedInitialOnboarding;

  if (!hasReachedPostOnboarding) {
    // User is still in onboarding - hide footer nav
    console.log('[Nav] Still in onboarding - hiding footer nav');
    if (footerNav) footerNav.classList.add('hidden');
    if (legacyFooter) legacyFooter.style.display = '';
    return;
  }

  // User has completed initial onboarding (Google + Bank + Sheet)
  // Show footer nav and allow navigation between pages
  if (footerNav) footerNav.classList.remove('hidden');
  if (legacyFooter) legacyFooter.style.display = 'none';

  // Hide all onboarding sections
  const onboardingSections = [welcomeSection, connectSection, sheetSection, syncSection, statusSection];
  onboardingSections.forEach(section => {
    if (section) section.classList.add('hidden');
  });

  // Restore last tab or intelligently default based on connection state
  const { currentTab: savedTab } = await chrome.storage.local.get('currentTab');

  // Default logic:
  // - If fully connected (bank + sheet): default to home
  // - If no bank: default to bank page
  // - If bank but no sheet: default to sheet page
  let defaultTab = 'home';
  if (!state.itemId) {
    defaultTab = 'bank';
  } else if (!state.sheetId) {
    defaultTab = 'sheet';
  }

  await switchTab(savedTab || defaultTab);

  // Attach tab click listeners
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const page = tab.dataset.page;
      switchTab(page);
    });
  });
}

/**
 * Load Home page data
 */
async function loadHomePage() {
  const data = await chrome.storage.sync.get(['lastSync', 'itemId', 'sheetId', 'googleEmail']);

  // Update last sync
  if (homeLastSync && data.lastSync) {
    const date = new Date(data.lastSync);
    homeLastSync.textContent = formatRelativeTime(date);
  }

  // Update connection status dots
  if (homeStatusPlaid) {
    const plaidDot = homeStatusPlaid.querySelector('.status-dot');
    if (plaidDot) {
      plaidDot.className = 'status-dot ' + (data.itemId ? 'status-dot-connected' : 'status-dot-disconnected');
    }
  }
  if (homeStatusSheet) {
    const sheetDot = homeStatusSheet.querySelector('.status-dot');
    if (sheetDot) {
      sheetDot.className = 'status-dot ' + (data.sheetId ? 'status-dot-connected' : 'status-dot-disconnected');
    }
  }

  // Enable/disable sync buttons based on connection status
  const isFullyConnected = data.itemId && data.sheetId;

  if (homeSyncBtn) {
    homeSyncBtn.disabled = !isFullyConnected;

    if (!isFullyConnected) {
      homeSyncBtn.style.opacity = '0.5';
      homeSyncBtn.style.cursor = 'not-allowed';
      homeSyncBtn.title = 'Connect both Plaid and Sheet to sync';
    } else {
      homeSyncBtn.style.opacity = '1';
      homeSyncBtn.style.cursor = 'pointer';
      homeSyncBtn.title = '';
    }
  }

  if (homeResyncAllBtn) {
    homeResyncAllBtn.disabled = !isFullyConnected;

    if (!isFullyConnected) {
      homeResyncAllBtn.style.opacity = '0.5';
      homeResyncAllBtn.style.cursor = 'not-allowed';
      homeResyncAllBtn.title = 'Connect both Plaid and Sheet to sync';
    } else {
      homeResyncAllBtn.style.opacity = '1';
      homeResyncAllBtn.style.cursor = 'pointer';
      homeResyncAllBtn.title = '';
    }
  }

  // Update user header
  updateUserHeader(data.googleEmail, !!data.itemId, !!data.sheetId);

  // Update tier display
  updateTierDisplay();
}

/**
 * Load Bank page data
 */
async function loadBankPage() {
  const data = await chrome.storage.sync.get(['itemId', 'institutionName', 'sheetId', 'googleEmail']);

  const bankListContainer = document.getElementById('bankList');

  if (!data.itemId) {
    // Show empty state
    if (bankListContainer) {
      bankListContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 32px;">
          <div style="font-size: 40px; margin-bottom: 12px;">🏦</div>
          <div style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 8px;">No bank connected</div>
          <div style="font-size: 13px; color: #6b7280;">Connect a bank to start syncing your transactions.</div>
        </div>
      `;
    }
    return;
  }

  // Fetch and display item info with collapsible card
  if (data.itemId) {
    try {
      // Call backend to get item info
      const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(data.itemId)}/info`);

      if (!response.ok) {
        throw new Error('Failed to fetch item info');
      }

      const itemInfo = await response.json();

      if (bankListContainer && itemInfo) {
        const accountCount = itemInfo.accounts ? itemInfo.accounts.length : 0;

        // Build collapsible accounts list
        let accountsHTML = '';
        if (itemInfo.accounts && itemInfo.accounts.length > 0) {
          accountsHTML = '<div class="bank-accounts-list" style="margin-top: 12px; padding-left: 8px; display: none;">';
          itemInfo.accounts.forEach(account => {
            const accountName = account.official_name || account.name;
            const mask = account.mask ? ` ••${account.mask}` : '';
            const type = account.subtype ? ` - ${account.subtype}` : '';
            accountsHTML += `
              <div style="padding: 8px 0; border-bottom: 1px solid #e5e7eb; font-size: 13px; color: #374151;">
                <div style="font-weight: 500;">${accountName}${mask}</div>
                <div style="font-size: 12px; color: #9ca3af; margin-top: 2px;">${account.type}${type}</div>
              </div>
            `;
          });
          accountsHTML += '</div>';
        }

        // Create collapsible bank card
        bankListContainer.innerHTML = `
          <div class="card bank-card" style="cursor: pointer; user-select: none;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
              <div style="display: flex; align-items: center; gap: 8px;">
                <span style="color: #10b981; font-size: 16px;">✓</span>
                <div>
                  <div style="font-size: 14px; color: #166534; font-weight: 600;">${itemInfo.institution_name}</div>
                  <div style="font-size: 12px; color: #6b7280; margin-top: 2px;">${accountCount} account${accountCount !== 1 ? 's' : ''}</div>
                </div>
              </div>
              <span class="expand-arrow" style="color: #9ca3af; font-size: 14px; transition: transform 0.2s;">▶</span>
            </div>
            ${accountsHTML}
          </div>
        `;

        // Add click event listener to toggle expansion
        const bankCard = bankListContainer.querySelector('.bank-card');
        if (bankCard) {
          bankCard.addEventListener('click', () => {
            const accountsList = bankCard.querySelector('.bank-accounts-list');
            const arrow = bankCard.querySelector('.expand-arrow');

            if (accountsList) {
              const isExpanded = accountsList.style.display !== 'none';
              accountsList.style.display = isExpanded ? 'none' : 'block';
              arrow.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(90deg)';
            }
          });
        }
      }
    } catch (error) {
      console.error('Failed to load bank info:', error);
      // Show error state
      if (bankListContainer) {
        bankListContainer.innerHTML = `
          <div class="card">
            <div style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 8px;">${data.institutionName || 'Bank'}</div>
            <div style="font-size: 13px; color: #6b7280;">Connected</div>
          </div>
        `;
      }
    }
  }

  // Update user header
  updateUserHeader(data.googleEmail, !!data.itemId, !!data.sheetId);
}

/**
 * Load Sheet page data
 */
async function loadSheetPage() {
  const data = await chrome.storage.sync.get(['sheetId', 'sheetUrl', 'googleEmail', 'lastSync', 'itemId']);

  const sheetInfoCard = document.querySelector('#page-sheet .sheet-info');
  const sheetActions = document.querySelector('#page-sheet .sheet-actions');

  if (!data.sheetId) {
    // Show empty/disconnected state with input
    if (sheetInfoCard) {
      sheetInfoCard.innerHTML = `
        <div class="status-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span class="status-icon" style="color: #ef4444;">⚠</span>
          <span style="font-size: 14px; font-weight: 500;">No sheet connected</span>
        </div>
        <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">
          Paste the URL of the Google Sheet where you want SheetLink to send your data.
        </p>
        <p style="font-size: 12px; color: #9ca3af; margin-bottom: 16px;">
          Use a sheet owned by <span style="color: #6b7280; font-weight: 500;">${data.googleEmail || 'user@gmail.com'}</span>
        </p>
        <label for="sheetUrlPage" style="font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px; display: block;">Google Sheet URL</label>
        <input
          type="text"
          id="sheetUrlPage"
          placeholder="https://docs.google.com/spreadsheets/d/..."
          style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; margin-bottom: 12px;"
        >
        <button id="saveSheetBtnPage" class="btn btn-primary" style="width: 100%;">Save Sheet</button>
        <div style="margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: #6b7280;">
          <span>🔒</span>
          <span>Write access for transaction syncs only</span>
        </div>
      `;

      // Wire up save sheet button
      const saveSheetBtnPage = document.getElementById('saveSheetBtnPage');
      const sheetUrlPageInput = document.getElementById('sheetUrlPage');

      if (saveSheetBtnPage && sheetUrlPageInput) {
        saveSheetBtnPage.addEventListener('click', async () => {
          const url = sheetUrlPageInput.value.trim();

          if (!url) {
            alert('Please enter a Google Sheet URL');
            return;
          }

          // Validate URL format
          if (!url.includes('docs.google.com/spreadsheets')) {
            alert('Please enter a valid Google Sheets URL');
            return;
          }

          // Extract sheet ID from URL
          const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
          if (!match) {
            alert('Could not extract Sheet ID from URL');
            return;
          }

          const sheetId = match[1];

          // Disable button during save
          saveSheetBtnPage.disabled = true;
          saveSheetBtnPage.textContent = 'Saving...';

          try {
            // Save to storage
            await chrome.storage.sync.set({
              sheetId: sheetId,
              sheetUrl: url
            });

            // Reload sheet page to show connected state
            await loadSheetPage();

            // Update user header
            updateUserHeader(data.googleEmail, !!data.itemId, true);

            // Update home page if it's loaded
            await loadHomePage();
          } catch (error) {
            alert('Failed to save sheet: ' + error.message);
            saveSheetBtnPage.disabled = false;
            saveSheetBtnPage.textContent = 'Save Sheet';
          }
        });
      }
    }

    // Hide disconnect/change buttons when not connected
    if (sheetActions) {
      sheetActions.style.display = 'none';
    }

    // Update user header
    updateUserHeader(data.googleEmail, !!data.itemId, false);
    return;
  }

  // Show connected state
  if (sheetInfoCard) {
    sheetInfoCard.innerHTML = `
      <div class="status-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span class="status-icon" style="color: #10b981;">✓</span>
        <span style="font-size: 14px; font-weight: 500;">Connected to Sheet</span>
      </div>
      <p class="sheet-url" style="margin-bottom: 8px;">
        <a id="sheetLink" href="${data.sheetUrl || '#'}" target="_blank" style="font-size: 13px; color: #3b82f6; text-decoration: none;">Open Sheet →</a>
      </p>
      <p class="sheet-owner" style="font-size: 13px; color: #6b7280; margin-bottom: 4px;">
        Owner: <span id="sheetOwner">${data.googleEmail || 'user@gmail.com'}</span>
      </p>
      <p class="sheet-last-write" style="font-size: 13px; color: #6b7280;">
        Last write: <span id="sheetLastWrite">${data.lastSync ? formatRelativeTime(new Date(data.lastSync)) : 'Never'}</span>
      </p>
    `;
  }

  // Show action buttons when connected
  if (sheetActions) {
    sheetActions.style.display = 'block';
  }

  // Update sheet link
  if (sheetLink && data.sheetUrl) {
    sheetLink.href = data.sheetUrl;
  }

  // Update owner email
  if (sheetOwner && data.googleEmail) {
    sheetOwner.textContent = data.googleEmail;
  }

  // Update last write time
  if (sheetLastWrite && data.lastSync) {
    const date = new Date(data.lastSync);
    sheetLastWrite.textContent = formatRelativeTime(date);
  }

  // Update user header
  updateUserHeader(data.googleEmail, !!data.itemId, !!data.sheetId);
}

/**
 * Format relative time (e.g., "2 hours ago")
 */
function formatRelativeTime(date) {
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return diffMins + ' minute' + (diffMins > 1 ? 's' : '') + ' ago';
  if (diffHours < 24) return diffHours + ' hour' + (diffHours > 1 ? 's' : '') + ' ago';
  return diffDays + ' day' + (diffDays > 1 ? 's' : '') + ' ago';
}

// Attach event listeners for new nav buttons
function attachNavigationEventListeners() {
  // Home page
  if (homeSyncBtn) homeSyncBtn.addEventListener('click', handleSyncNow);
  if (homeResyncAllBtn) homeResyncAllBtn.addEventListener('click', handleResyncAll);

  // Bank page
  if (updateBankConnectionBtn) updateBankConnectionBtn.addEventListener('click', handleConnectBank);
  if (addBankBtn) addBankBtn.addEventListener('click', handleConnectBank);
  if (disconnectBankBtn) disconnectBankBtn.addEventListener('click', handleDisconnect);

  // Sheet page
  if (changeSheetBtnPage) changeSheetBtnPage.addEventListener('click', async () => {
    const sheetInfoCard = document.querySelector('#page-sheet .sheet-info');
    const data = await chrome.storage.sync.get(['googleEmail', 'itemId']);

    if (!sheetInfoCard) return;

    // Show input form
    sheetInfoCard.innerHTML = `
      <div class="status-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span class="status-icon" style="color: #3b82f6;">✎</span>
        <span style="font-size: 14px; font-weight: 500;">Change Sheet</span>
      </div>
      <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">
        Enter a new Google Sheet URL to change where your data is synced.
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin-bottom: 16px;">
        Use a sheet owned by <span style="color: #6b7280; font-weight: 500;">${data.googleEmail || 'user@gmail.com'}</span>
      </p>
      <label for="sheetUrlChange" style="font-size: 13px; font-weight: 500; color: #374151; margin-bottom: 4px; display: block;">Google Sheet URL</label>
      <input
        type="text"
        id="sheetUrlChange"
        placeholder="https://docs.google.com/spreadsheets/d/..."
        style="width: 100%; padding: 8px 12px; border: 1px solid #d1d5db; border-radius: 6px; font-size: 13px; margin-bottom: 12px;"
      >
      <div style="display: flex; gap: 8px;">
        <button id="saveNewSheetBtn" class="btn btn-primary" style="flex: 1;">Save Sheet</button>
        <button id="cancelChangeSheetBtn" class="btn btn-secondary" style="flex: 1;">Cancel</button>
      </div>
      <div style="margin-top: 12px; display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 12px; color: #6b7280;">
        <span>🔒</span>
        <span>Write access for transaction syncs only</span>
      </div>
    `;

    // Wire up save button
    const saveNewSheetBtn = document.getElementById('saveNewSheetBtn');
    const sheetUrlChangeInput = document.getElementById('sheetUrlChange');
    const cancelChangeSheetBtn = document.getElementById('cancelChangeSheetBtn');

    if (saveNewSheetBtn && sheetUrlChangeInput) {
      saveNewSheetBtn.addEventListener('click', async () => {
        const url = sheetUrlChangeInput.value.trim();

        if (!url) {
          alert('Please enter a Google Sheet URL');
          return;
        }

        // Validate URL format
        if (!url.includes('docs.google.com/spreadsheets')) {
          alert('Please enter a valid Google Sheets URL');
          return;
        }

        // Extract sheet ID from URL
        const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (!match) {
          alert('Could not extract Sheet ID from URL');
          return;
        }

        const sheetId = match[1];

        // Disable button during save
        saveNewSheetBtn.disabled = true;
        saveNewSheetBtn.textContent = 'Saving...';

        try {
          // Save to storage
          await chrome.storage.sync.set({
            sheetId: sheetId,
            sheetUrl: url
          });

          // Reload sheet page to show updated connected state
          await loadSheetPage();

          // Update user header
          updateUserHeader(data.googleEmail, !!data.itemId, true);

          // Update home page if it's loaded
          await loadHomePage();
        } catch (error) {
          alert('Failed to save sheet: ' + error.message);
          saveNewSheetBtn.disabled = false;
          saveNewSheetBtn.textContent = 'Save Sheet';
        }
      });
    }

    // Wire up cancel button
    if (cancelChangeSheetBtn) {
      cancelChangeSheetBtn.addEventListener('click', async () => {
        // Reload sheet page to go back to connected state
        await loadSheetPage();
      });
    }
  });
  if (disconnectSheetBtn) disconnectSheetBtn.addEventListener('click', async () => {
    if (confirm('Are you sure you want to disconnect your Google Sheet?')) {
      await chrome.storage.sync.remove(['sheetId', 'sheetUrl']);

      // Reload the sheet page to show disconnected state
      await loadSheetPage();

      // Update user header to reflect disconnected state
      const data = await chrome.storage.sync.get(['googleEmail', 'itemId']);
      updateUserHeader(data.googleEmail, !!data.itemId, false);
    }
  });

  // Settings page event listeners
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  if (advancedOptionsBtn) advancedOptionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
}

/**
 * Load Settings page
 */
async function loadSettingsPage() {
  console.log('[Settings] Loading settings page');

  const data = await chrome.storage.sync.get(['googleEmail', 'googlePicture']);

  // Update user email
  if (settingsUserEmail && data.googleEmail) {
    settingsUserEmail.textContent = data.googleEmail;
  }

  // Update user picture/initial
  if (data.googlePicture && settingsUserPicture) {
    settingsUserPicture.src = data.googlePicture;
    settingsUserPicture.style.display = 'block';
    if (settingsUserInitial) settingsUserInitial.style.display = 'none';
  } else if (data.googleEmail && settingsUserInitial) {
    // Show initial if no picture
    const initial = data.googleEmail.charAt(0).toUpperCase();
    settingsUserInitial.textContent = initial;
    settingsUserInitial.style.display = 'flex';
    if (settingsUserPicture) settingsUserPicture.style.display = 'none';
  }
}

/**
 * Handle logout
 */
async function handleLogout() {
  if (!confirm('Are you sure you want to sign out? This will clear all your data.')) {
    return;
  }

  console.log('[Settings] Logging out');

  // Preserve onboarding completion flag so user doesn't have to onboard again
  const { hasCompletedInitialOnboarding } = await chrome.storage.sync.get(['hasCompletedInitialOnboarding']);

  // Clear all extension data
  await chrome.storage.sync.clear();
  await chrome.storage.local.clear();

  // Restore onboarding flag if it was set (but don't set hasProgressedToSheetSetup)
  // This will make the extension show welcome page, but skip full onboarding after re-auth
  if (hasCompletedInitialOnboarding) {
    await chrome.storage.sync.set({
      hasCompletedInitialOnboarding: true
    });
    console.log('[Settings] Preserved onboarding completion flag');
  }

  // Clear localStorage
  localStorage.clear();

  // Reload the extension to show welcome screen
  window.location.reload();
}

