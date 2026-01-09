// popup.js - Main UI controller for extension popup

import { CONFIG } from '../config.js';

// Update global debug flag from CONFIG (in case it was changed)
window.SHEETLINK_DEBUG = CONFIG.DEBUG;

// Use global debug function
const debug = window.debug;

// Backend API base URL
const BACKEND_URL = CONFIG.BACKEND_URL;

// Phase 3.16.0: Authenticated fetch helper
// Automatically adds JWT token to API requests and handles expiry
async function authenticatedFetch(url, options = {}) {
  try {
    // Get JWT token and expiry from storage
    const { jwtToken, jwtExpiry } = await chrome.storage.sync.get(['jwtToken', 'jwtExpiry']);

    // Check if token exists and is valid
    if (!jwtToken || !jwtExpiry || Date.now() >= jwtExpiry) {
      // Token missing or expired - throw AUTH_REQUIRED error
      const error = new Error('Authentication required');
      error.code = 'AUTH_REQUIRED';
      throw error;
    }

    // Add Authorization header with JWT token
    const headers = {
      ...options.headers,
      'Authorization': `Bearer ${jwtToken}`
    };

    // Make the fetch request with JWT token
    const response = await fetch(url, { ...options, headers });

    // Handle 401 Unauthorized (token invalid/expired on backend)
    if (response.status === 401) {
      const error = new Error('Session expired');
      error.code = 'AUTH_EXPIRED';
      throw error;
    }

    return response;
  } catch (error) {
    // Re-throw auth errors for caller to handle
    if (error.code === 'AUTH_REQUIRED' || error.code === 'AUTH_EXPIRED') {
      throw error;
    }
    // Re-throw other errors
    throw error;
  }
}

// DOM elements
let connectBankBtn, signInGoogleBtn, saveSheetBtn, syncNowBtn, backfillBtn, disconnectBtn, retryBtn, templatesBtn, learnMoreBtn;
let removeSheetBtn, changeSheetBtn, changeSheetLinkBtn, retrySyncBtn;
let sheetUrlInput, statusText, errorMessage, loadingMessage;
let connectSection, sheetSection, syncSection, statusSection, errorSection, loadingSection, templatesSection, welcomeSection;
let welcomeTitle, welcomeSubtitle, welcomeDescription, headerSubtitle;
let sheetSuccessModal, syncSuccessOpenSheetBtn, syncSuccessViewAccountsBtn;
let sheetErrorBanner, sheetErrorDetail, syncErrorBanner;

// Phase 3.10: Post-onboarding navigation
let footerNav, legacyFooter;
let pageHome, pageBank, pageSheet, pageSettings;
let homeSyncBtn, homeResyncAllBtn, homeLastSync, homePlanTier, homeStatusPlaid, homeStatusSheet, homeSyncStatus;
let bankInstitutionName, bankAccountsList, updateBankConnectionBtn, addBankBtn;
let sheetLink, sheetOwner, sheetLastWrite, changeSheetBtnPage, disconnectSheetBtn;
let settingsUserEmail, settingsUserPicture, settingsUserInitial, logoutBtn;
let settingsAccountsTabName, settingsTransactionsTabName, settingsAppendOnly, saveSettingsBtn, settingsStatusMessage;
let currentTab = 'home';

// User control panel header elements
let defaultHeader, userHeader, userAvatar, userPicture, userInitial, userEmail, userTier;
let bankIndicator, sheetIndicator;

// Initialize popup
document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();

  // Phase 3.13.1: Debug - Check raw storage before StateManager init
  const rawStorage = await chrome.storage.sync.get(null);
  debug('[Popup] Raw storage on load:', rawStorage);

  // Phase 3.13: Initialize StateManager ONCE from storage
  debug('[Popup] Initializing StateManager...');
  await window.StateManager.init();
  debug('[Popup] StateManager initialized');

  // Phase 3.14.0: Check for pending institution from OAuth callback
  await handlePendingInstitution();

  attachEventListeners();
  await loadState();
});

// Phase 3.13.1: Listen for account switch events from service worker
chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.type === 'ACCOUNT_SWITCHED') {
    console.warn('[Popup] ⚠️ Account switch detected!');
    console.warn(`[Popup] Old: ${message.oldEmail} → New: ${message.newEmail}`);
    debug('[Popup] Reinitializing StateManager with cleared state...');

    // Force StateManager to re-read from storage (which was cleared)
    window.StateManager._initPromise = null;
    window.StateManager.state = {
      // Reset to defaults, then add new auth data
      googleAuthenticated: false,
      googleEmail: null,
      googleUserId: null,
      googlePicture: null,
      googleAccessToken: null,
      googleTokenExpiry: null,
      itemId: null,
      institutionName: null,
      institutionId: null,
      accounts: null,
      accountsLastFetched: null,
      sheetId: null,
      sheetUrl: null,
      sheetName: null,
      sheetOwner: null,
      sheetLastWrite: null,
      lastSync: null,
      hasSeenWelcome: false,
      hasSeenConnectStep: false,
      hasProgressedToSheetSetup: false,
      hasCompletedInitialOnboarding: false,
      isInitialized: false,
      _initPromise: null,
      ...message.newUserData
    };

    // Reinitialize from storage
    await window.StateManager.init();
    debug('[Popup] StateManager reinitialized, reloading UI...');

    // Reload the UI with fresh state
    await loadState();

    sendResponse({ success: true });
  }
});

function initializeElements() {
  // Buttons
  connectBankBtn = document.getElementById('connectBankBtn');
  signInGoogleBtn = document.getElementById('signInGoogleBtn');
  learnMoreBtn = document.getElementById('learnMoreBtn');
  saveSheetBtn = document.getElementById('saveSheetBtn');
  removeSheetBtn = document.getElementById('removeSheetBtn');
  changeSheetBtn = document.getElementById('changeSheetBtn');
  changeSheetLinkBtn = document.getElementById('changeSheetLinkBtn');
  retrySyncBtn = document.getElementById('retrySyncBtn');
  syncNowBtn = document.getElementById('syncNowBtn');
  backfillBtn = document.getElementById('backfillBtn');
  disconnectBtn = document.getElementById('disconnectBtn');
  // optionsBtn removed - Phase 3.10 replaced with Settings page in footer nav
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

  // Welcome page elements
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
  // disconnectBankBtn removed - managed per-institution in cards

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
  settingsAccountsTabName = document.getElementById('settingsAccountsTabName');
  settingsTransactionsTabName = document.getElementById('settingsTransactionsTabName');
  settingsAppendOnly = document.getElementById('settingsAppendOnly');
  saveSettingsBtn = document.getElementById('saveSettingsBtn');
  settingsStatusMessage = document.getElementById('settingsStatusMessage');

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

function attachEventListeners() {
  if (connectBankBtn) connectBankBtn.addEventListener('click', handleConnectBank);
  if (signInGoogleBtn) {
    debug('[Init] Attaching event listener to signInGoogleBtn');
    signInGoogleBtn.addEventListener('click', handleGoogleSignIn);
  } else {
    console.warn('[Init] signInGoogleBtn not found!');
  }
  if (learnMoreBtn) learnMoreBtn.addEventListener('click', handleLearnMore);
  saveSheetBtn.addEventListener('click', handleSaveSheet);

  // Add Enter key support for sheet URL input
  if (sheetUrlInput) {
    sheetUrlInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        saveSheetBtn.click();
      }
    });
  }

  if (removeSheetBtn) removeSheetBtn.addEventListener('click', handleRemoveSheet);
  if (changeSheetBtn) changeSheetBtn.addEventListener('click', handleChangeSheet);
  if (changeSheetLinkBtn) changeSheetLinkBtn.addEventListener('click', handleChangeSheet);
  if (retrySyncBtn) retrySyncBtn.addEventListener('click', handleSyncNow);
  syncNowBtn.addEventListener('click', handleSyncNow);
  if (backfillBtn) backfillBtn.addEventListener('click', handleBackfill);
  disconnectBtn.addEventListener('click', handleDisconnect);
  // optionsBtn event listener removed - Phase 3.10 replaced with Settings page
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
    // Phase 3.13: Read from StateManager (instant memory access)
    const stateManager = window.StateManager;

    debug('[Popup] loadState - googleAuthenticated:', stateManager.isAuthenticated());
    debug('[Popup] loadState - googleUserId:', stateManager.get('googleUserId'));
    debug('[Popup] loadState - hasProgressedToSheetSetup:', stateManager.get('hasProgressedToSheetSetup'));
    debug('[Popup] loadState - hasCompletedInitialOnboarding:', stateManager.get('hasCompletedInitialOnboarding'));

    // Phase 3.9: Update email displays throughout the UI
    const googleEmail = stateManager.get('googleEmail');
    if (googleEmail) {
      const emailElements = document.querySelectorAll('#sheetUserEmail, #syncGoogleEmail');
      emailElements.forEach(el => {
        if (el) el.textContent = googleEmail;
      });
    }

    // Phase 3.8: Check if user is authenticated with Google first
    if (!stateManager.isAuthenticated()) {
      debug('[Popup] User not authenticated - showing welcome screen');
      // User not authenticated - show welcome with "Sign in with Google" button
      showSection('welcome');
      // Hide disconnect button on welcome screen
      if (disconnectBtn) disconnectBtn.classList.add('hidden');
      return;
    }

    debug('[Popup] User is authenticated - continuing with flow');

    // Phase 3.13: Get state and check if we should show loading screen FIRST
    const itemId = stateManager.get('itemId');
    const sheetId = stateManager.get('sheetId');
    const shouldShowStep2 = itemId && !stateManager.get('hasSeenConnectStep') && !stateManager.get('hasProgressedToSheetSetup') && !stateManager.get('hasCompletedInitialOnboarding');

    // If we're going to show the loading screen, do it IMMEDIATELY before any other UI updates
    if (shouldShowStep2) {
      showLoading('Loading your bank info...');
    }

    // Now update header (will be hidden behind loading screen if showing)
    toggleHeader(true);
    updateUserHeader(googleEmail, !!itemId, !!sheetId);
    updateTierDisplay();

    // No bank connected: try to restore from backend
    if (!itemId) {
      // Phase 3.13: Always try to restore items for authenticated users (not just those with completed onboarding)
      // This handles cases where storage was cleared but backend still has the connection
      const googleUserId = stateManager.get('googleUserId');
      if (googleUserId) {
        debug('[Popup] No itemId in storage, attempting to restore from backend...');
        const restored = await tryRestoreItems();
        if (restored) {
          // Items restored! Reload state with new itemId
          debug('[Popup] Items restored successfully, reloading state...');
          return loadState();
        }
        debug('[Popup] No items found in backend to restore');
      }

      // Check if user has completed onboarding before
      if (stateManager.get('hasCompletedInitialOnboarding')) {
        // Returning user with no items - show navigation with empty state
        debug('[Popup] Returning user with no bank, showing navigation...');
        await initializeNavigation();
        return;
      }

      // New user - show connect bank screen
      debug('[Popup] New user, showing connect bank screen...');
      showSection('connect');
      // Hide disconnect button when no bank connected
      if (disconnectBtn) disconnectBtn.classList.add('hidden');
      // Phase 3.10: Initialize navigation (will hide footer nav during onboarding)
      await initializeNavigation();
      return;
    }

    // Phase 3.9 UX: Show step 2 for returning users if they just authenticated
    // Note: shouldShowStep2 was already checked earlier and loading screen shown if needed
    if (shouldShowStep2) {
      // Mark that we've shown step 2
      await window.StateManager.set({ hasSeenConnectStep: true });

      // Phase 3.14.0: Display ALL connected institutions
      await displayAllInstitutionsOnboarding();

      // Phase 3.13: Configure all UI elements BEFORE showing section (prevents flash)
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
          await window.StateManager.set({ hasProgressedToSheetSetup: true });
          proceedToSheetSetup();
        });
      }

      // Update Plaid description for multiple institutions
      const plaidDesc = document.getElementById('plaidDescription');
      if (plaidDesc) {
        plaidDesc.textContent = 'Connect multiple institutions to sync all your accounts in one place.';
      }

      // NOW hide loading and show connect screen (everything already configured)
      hideLoading();
      showSection('connect');

      // Phase 3.10: Initialize navigation (will hide footer nav since not fully connected)
      await initializeNavigation();
      return;
    }

    // Normal flow - proceed to sheet setup
    // Skip legacy sections for returning users
    if (!stateManager.get('hasCompletedInitialOnboarding')) {
      proceedToSheetSetup();
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
  // Phase 3.13: Use StateManager instead of storage
  const stateManager = window.StateManager;
  const institutions = stateManager.getInstitutions();

  // If user has banks connected, configure everything BEFORE showing section (prevents flash)
  if (institutions.length > 0) {
    // Phase 3.14.0: Display ALL connected institutions
    await displayAllInstitutionsOnboarding();

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
        // Phase 3.13: Use StateManager
        await window.StateManager.set({ hasProgressedToSheetSetup: true });
        proceedToSheetSetup();
      });
    }

    // Update Plaid description for multiple institutions
    const plaidDesc = document.getElementById('plaidDescription');
    if (plaidDesc) {
      plaidDesc.textContent = 'Connect multiple institutions to sync all your accounts in one place.';
    }
  }

  // NOW show section (everything already configured if itemId exists)
  showSection('connect');
}

// Helper function to proceed to sheet setup after step 2
// Phase 3.10+: Updated to use new navigation system instead of legacy sync UI
async function proceedToSheetSetup() {
    // Phase 3.13.1: Ensure initialLoader is hidden (safety check)
    const initialLoader = document.getElementById('initialLoader');
    if (initialLoader && initialLoader.style.display !== 'none') {
      initialLoader.style.display = 'none';
    }

    // Phase 3.13: Get state from StateManager
    const stateManager = window.StateManager;
    const sheetId = stateManager.get('sheetId');
    const hasCompletedOnboarding = stateManager.get('hasCompletedInitialOnboarding');

    // If user has completed onboarding, let initializeNavigation() handle UI
    if (hasCompletedOnboarding) {
      // Navigation will be initialized by main flow - do nothing here
      return;
    }

    // During onboarding: show sheet selection step
    if (!sheetId) {
      showSection('sheet');
    } else {
      // Sheet already connected during onboarding - complete onboarding
      await stateManager.set({ hasCompletedInitialOnboarding: true });
      await initializeNavigation();
    }
}

// Phase 3.14.0: Display all connected institutions on onboarding Step 2
// Uses same styling as Bank page for consistency
async function displayAllInstitutionsOnboarding() {
  const stateManager = window.StateManager;
  const institutions = stateManager.getInstitutions();

  if (institutions.length === 0) {
    showGenericBankStatus();
    return;
  }

  const statusEl = document.getElementById('bankConnectionStatus');
  if (!statusEl) return;

  // Build HTML for all institutions
  let institutionsHTML = '';
  for (const institution of institutions) {
    const { institutionName, accounts } = institution;
    const accountCount = accounts ? accounts.length : 0;

    // Build collapsible accounts list (same structure as Bank page)
    let accountsHTML = '';
    if (accounts && accounts.length > 0) {
      accountsHTML = '<div class="institution-accounts" style="display: none;">';
      accounts.forEach(account => {
        const accountName = account.official_name || account.name;
        const mask = account.mask ? `••${account.mask}` : '0000';
        const type = account.subtype || account.type;
        const balance = account.balances?.current != null
          ? `$${account.balances.current.toFixed(2)}`
          : '';

        accountsHTML += `
          <div class="account-item">
            <div class="account-info">
              <div class="account-name">${accountName} (...${mask})</div>
              <div class="account-type">${type}</div>
            </div>
            <div class="account-balance">${balance}</div>
          </div>
        `;
      });
      accountsHTML += '</div>';
    }

    // Use same structure as Bank page institution cards
    institutionsHTML += `
      <div class="institution-card" style="margin-bottom: 12px;">
        <div class="institution-header">
          <div class="institution-info">
            <span class="status-dot status-dot-connected"></span>
            <div>
              <div class="institution-name">${institutionName}</div>
              <div class="institution-meta">${accountCount} account${accountCount !== 1 ? 's' : ''}</div>
            </div>
          </div>
        </div>
        ${accountsHTML}
      </div>
    `;
  }

  statusEl.innerHTML = institutionsHTML;
  statusEl.classList.remove('hidden');

  // Add click event listeners to toggle expansion (same as Bank page)
  const institutionCards = statusEl.querySelectorAll('.institution-card');
  institutionCards.forEach(card => {
    const header = card.querySelector('.institution-header');
    const accountsList = card.querySelector('.institution-accounts');

    if (header && accountsList) {
      header.style.cursor = 'pointer';
      header.addEventListener('click', () => {
        const isExpanded = accountsList.style.display !== 'none';
        accountsList.style.display = isExpanded ? 'none' : 'block';
      });
    }
  });
}

// Phase 3.9: Fetch and display item info (institution and accounts)
// Phase 3.13: Now uses StateManager caching to prevent flash on reload
async function displayItemInfo(itemId) {
  try {
    if (!itemId) {
      console.error('No item ID provided');
      // Fall back to generic display
      showGenericBankStatus();
      return;
    }

    // Phase 3.13: Check cache first for instant display
    const stateManager = window.StateManager;
    let cachedAccounts = stateManager.getCachedAccounts();
    let cachedInstitutionName = stateManager.get('institutionName');

    // Display cached data IMMEDIATELY if available (NO FLASH!)
    if (cachedAccounts && cachedInstitutionName) {
      debug('[displayItemInfo] Displaying cached data instantly');
      renderBankInfo(cachedInstitutionName, cachedAccounts);
    }

    // Refresh from backend only if cache is stale or missing
    if (!cachedAccounts || stateManager.isCacheStale('accounts')) {
      debug('[displayItemInfo] Cache stale/missing, fetching from backend...');

      const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}/info`);

      if (!response.ok) {
        console.error('[displayItemInfo] Failed to fetch item info:', response.status);
        // If we have cache, we already displayed it. Otherwise show generic.
        if (!cachedAccounts) {
          showGenericBankStatus();
        }
        return;
      }

      const itemInfo = await response.json();
      debug('[displayItemInfo] Fresh data received:', itemInfo);

      // Update cache in StateManager
      await stateManager.setCachedAccounts(itemInfo.accounts, {
        institutionName: itemInfo.institution_name,
        institutionId: itemInfo.institution_id
      });

      // Update display with fresh data
      renderBankInfo(itemInfo.institution_name, itemInfo.accounts);
    } else {
      debug('[displayItemInfo] Using fresh cache, no backend fetch needed');
    }
  } catch (error) {
    console.error('[displayItemInfo] Error:', error);
    showGenericBankStatus();
  }
}

// Phase 3.13: Extracted render logic for reuse
// Updated to use "Active" badge design per user preference
function renderBankInfo(institutionName, accounts) {
  const statusEl = document.getElementById('bankConnectionStatus');
  if (!statusEl) return;

  const accountCount = accounts ? accounts.length : 0;

  // Build collapsible accounts list
  let accountsHTML = '';
  if (accounts && accounts.length > 0) {
    accountsHTML = '<div class="bank-accounts-list" style="margin-top: 12px; border-top: 1px solid #e5e7eb; padding-top: 8px; display: none;">';
    accounts.forEach(account => {
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

  // Create bank card with glowing status dot and account count
  statusEl.innerHTML = `
    <div class="bank-card" style="cursor: pointer; user-select: none;">
      <div class="bank-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: none; padding-bottom: 0;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="status-dot status-dot-connected" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.6), 0 0 4px rgba(16, 185, 129, 0.8);"></span>
          <h3 style="font-size: 16px; font-weight: 600; margin: 0; padding-bottom: 0; color: #1f2937; text-decoration: none; border-bottom: none;">${institutionName}</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 12px; color: #6b7280; font-weight: 500;">${accountCount} account${accountCount !== 1 ? 's' : ''}</span>
          ${accountsHTML ? '<span class="expand-arrow" style="color: #9ca3af; font-size: 14px; transition: transform 0.2s;">▶</span>' : ''}
        </div>
      </div>
      ${accountsHTML}
    </div>
  `;
  statusEl.classList.remove('hidden');

  // Add click event listener to toggle expansion (only if there are accounts)
  if (accountsHTML) {
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

/**
 * Phase 3.14.0: Handle pending institution from OAuth callback
 * Called after StateManager is initialized to check if a new institution
 * was connected via Plaid Link and needs to be added to the institutions array
 */
async function handlePendingInstitution() {
  try {
    const { pendingInstitution } = await chrome.storage.sync.get(['pendingInstitution']);

    if (!pendingInstitution) {
      debug('[handlePendingInstitution] No pending institution found');
      return;
    }

    debug('[handlePendingInstitution] Found pending institution:', pendingInstitution);

    const stateManager = window.StateManager;
    const { itemId, institutionName, institutionId, connectedAt } = pendingInstitution;

    // Fetch full institution details from backend
    try {
      showLoading(`Adding ${institutionName}...`);

      const itemInfoResponse = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}/info`);
      if (!itemInfoResponse.ok) {
        throw new Error('Failed to fetch institution details');
      }

      const itemInfo = await itemInfoResponse.json();

      // Add institution to array
      await stateManager.addInstitution(itemId, {
        institutionName: itemInfo.institution_name,
        institutionId: itemInfo.institution_id,
        accounts: itemInfo.accounts,
        accounts_cached_at: Date.now()
      });

      // Clear the pending flag
      await chrome.storage.sync.remove(['pendingInstitution']);

      debug('[handlePendingInstitution] Successfully added institution:', institutionName);
      hideLoading();
      updateStatus(`${institutionName} connected successfully!`, true);
    } catch (error) {
      console.error('[handlePendingInstitution] Error adding institution:', error);
      hideLoading();
      showError(`Failed to add ${institutionName}: ${error.message}`);

      // Clear the pending flag even on error to avoid retry loops
      await chrome.storage.sync.remove(['pendingInstitution']);
    }
  } catch (error) {
    console.error('[handlePendingInstitution] Error:', error);
    // Silent fail - don't disrupt the normal flow
  }
}

// Phase 3.8: Try to restore Items from backend using Google user ID
/**
 * Phase 3.14.0: Restore ALL institutions from backend
 */
async function tryRestoreItems() {
  try {
    // Phase 3.13: Get Google user ID from StateManager
    const stateManager = window.StateManager;
    const googleUserId = stateManager.get('googleUserId');

    if (!googleUserId) {
      debug('[tryRestoreItems] No Google user ID available for restoration');
      return false;
    }

    debug('[tryRestoreItems] Checking for Items to restore for user:', googleUserId);

    // Call backend to get user's Items
    const response = await fetch(`${BACKEND_URL}/plaid/items?user_id=${encodeURIComponent(googleUserId)}`);

    if (!response.ok) {
      debug('[tryRestoreItems] Could not fetch Items from backend, status:', response.status);
      return false;
    }

    const data = await response.json();
    debug('[tryRestoreItems] Response from backend:', data);

    if (!data.items || data.items.length === 0) {
      debug('[tryRestoreItems] No Items found to restore');
      return false;
    }

    // Phase 3.14.0: Restore ALL items, not just the first one
    debug(`[tryRestoreItems] Restoring ${data.items.length} institution(s)...`);

    for (const item of data.items) {
      try {
        debug(`[tryRestoreItems] Restoring: ${item.institution_name} (${item.item_id})`);

        // Fetch institution details
        const itemInfoResponse = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(item.item_id)}/info`);
        if (!itemInfoResponse.ok) {
          console.error(`[tryRestoreItems] Failed to fetch details for ${item.item_id}`);
          continue;
        }

        const itemInfo = await itemInfoResponse.json();

        // Add to institutions array
        await stateManager.addInstitution(item.item_id, {
          institutionName: itemInfo.institution_name,
          institutionId: itemInfo.institution_id,
          accounts: itemInfo.accounts,
          accounts_cached_at: Date.now()
        });

        debug(`[tryRestoreItems] Successfully restored: ${item.institution_name}`);
      } catch (error) {
        console.error(`[tryRestoreItems] Error restoring ${item.item_id}:`, error);
        // Continue with other items
      }
    }

    debug(`[tryRestoreItems] Restoration complete. Restored ${data.items.length} institution(s)`);
    return true;

  } catch (error) {
    console.error('[tryRestoreItems] Error restoring Items:', error);
    return false; // Silent fail - user sees normal welcome screen
  }
}

// Update tier display from backend
async function updateTierDisplay() {
  try {
    // Phase 3.16.0: Try authenticated call first, force re-auth if expired
    let response;
    try {
      response = await authenticatedFetch(`${BACKEND_URL}/tier/status`);
    } catch (error) {
      if (error.code === 'AUTH_REQUIRED' || error.code === 'AUTH_EXPIRED') {
        // JWT expired/missing - force re-authentication
        debug('[Tier] JWT expired/missing - forcing re-authentication');
        await handleSessionExpired();
        return; // Exit early, user will be redirected to welcome
      } else {
        throw error;
      }
    }

    if (!response.ok) {
      // If endpoint fails, keep default "Free (7 days)" and hide auto-sync
      const autoSyncCard = document.querySelector('.auto-sync-card');
      if (autoSyncCard) {
        autoSyncCard.style.display = 'none';
      }
      return;
    }

    const data = await response.json();

    // Cache tier in chrome.storage for use during sync
    await chrome.storage.sync.set({
      userTier: data.tier,
      tierFetchedAt: Date.now(),
      tierFeatures: data.features || {}
    });
    debug('[Tier] Cached tier in storage:', data.tier);

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

    // Update tier display in user panel
    const tierBadge = document.getElementById('tierBadge');
    const userTier = document.getElementById('userTier');

    if (data.tier === 'basic') {
      // BASIC: Show badge with Lucide plus icon, hide text
      if (tierBadge) {
        tierBadge.innerHTML = `BASIC <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-left: 2px;"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`;
        tierBadge.className = 'tier-badge basic';
      }
      if (userTier) {
        userTier.style.display = 'none';
      }
    } else if (data.tier === 'pro') {
      // PRO: Show badge with Lucide star icon, hide text
      if (tierBadge) {
        tierBadge.innerHTML = `PRO <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display: inline-block; vertical-align: middle; margin-left: 2px;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
        tierBadge.className = 'tier-badge pro';
      }
      if (userTier) {
        userTier.style.display = 'none';
      }
    } else {
      // FREE: Hide badge, show text
      if (tierBadge) {
        tierBadge.className = 'tier-badge hidden';
      }
      if (userTier) {
        userTier.textContent = tierText;
        userTier.style.display = '';
      }
    }

    // Update home page tier
    const homePlanTier = document.getElementById('homePlanTier');
    if (homePlanTier) {
      homePlanTier.textContent = tierText;
    }

    // Update home page tier message
    const homeTierMessage = document.getElementById('homeTierMessage');
    if (homeTierMessage) {
      if (data.tier === 'free') {
        homeTierMessage.textContent = 'Upgrade for longer history and more institutions';
        homeTierMessage.style.color = '#6b7280';
      } else if (data.tier === 'basic') {
        homeTierMessage.textContent = 'Upgrade to Pro for full transaction data';
        homeTierMessage.style.color = '#0d9488';
      } else if (data.tier === 'pro') {
        homeTierMessage.textContent = 'You have access to all features ✓';
        homeTierMessage.style.color = '#10b981';
      }
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
    debug('Tier status check failed, using default');
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
    debug('[Cloud Sync Indicator] Error:', error);
  }
}

// Phase 3.8: Handle Google Sign-In
async function handleGoogleSignIn() {
  debug('[Google Auth] Sign in button clicked');
  try {
    // Phase 3.13: Check if this is a returning user using StateManager
    const stateManager = window.StateManager;
    const hasCompletedInitialOnboarding = stateManager.get('hasCompletedInitialOnboarding');
    const isReAuthenticating = stateManager.get('isReAuthenticating');
    const isReturningUser = hasCompletedInitialOnboarding || isReAuthenticating;

    // Trigger Google OAuth flow via service worker
    // Note: This opens OAuth window and doesn't wait for response
    // Service worker will reopen popup after OAuth completes
    debug('[Google Auth] Sending GET_AUTH_TOKEN message to service worker');
    // Phase 3.16.0: Always set forceAuth=true when user clicks the button
    // The button click itself is explicit user intent to authenticate
    chrome.runtime.sendMessage({
      type: 'GET_AUTH_TOKEN',
      forceAuth: true
    }, async (response) => {
      debug('[Google Auth] Received response from service worker:', response);
      if (response && response.token) {
        // OAuth completed successfully
        // Note: Service worker already fetched and stored user info (googleUserId, googleEmail, googlePicture, googleAuthenticated)
        // during the OAuth callback, so we don't need to fetch it again here

        // Phase 3.11: Check if this is a re-authentication flow
        if (stateManager.get('isReAuthenticating')) {
          debug('[ReAuth] Re-authentication successful, returning to home page');

          // Reset subtitle back to normal
          const headerSubtitle = document.getElementById('headerSubtitle');
          if (headerSubtitle) {
            headerSubtitle.textContent = 'Forget dashboards. Feed your spreadsheet.';
          }

          // Clear re-auth flag
          await stateManager.set({ isReAuthenticating: false });

          // Reload state to return to normal flow
          await loadState();
        } else {
          // Normal onboarding flow or returning user - reload state
          // Wait a moment for service worker storage to sync
          await new Promise(resolve => setTimeout(resolve, 100));
          await loadState();
        }
      }
    });

    // Phase 3.13: Keep popup open for all users during OAuth for better UX
    debug('[Google Auth] Keeping popup open during OAuth');
    // The callback above (line 884) will handle UI updates after OAuth completes

  } catch (error) {
    showError('Failed to sign in with Google: ' + error.message);
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

    // Result is publicToken that needs to be exchanged
    if (result) {
      showLoading('Exchanging token...');
      const itemId = await exchangePublicToken(result);

      // Phase 3.14.0: Fetch institution info immediately after connecting
      showLoading('Fetching institution details...');
      const itemInfoResponse = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}/info`);
      if (!itemInfoResponse.ok) {
        throw new Error('Failed to fetch institution details');
      }
      const itemInfo = await itemInfoResponse.json();

      // Phase 3.14.0: Add institution to array (doesn't overwrite)
      await window.StateManager.addInstitution(itemId, {
        institutionName: itemInfo.institution_name,
        institutionId: itemInfo.institution_id,
        accounts: itemInfo.accounts,
        accounts_cached_at: Date.now()
      });
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
        // Phase 3.14: Check if it's an AuthenticationError (token expired)
        if (verifyError.isAuthError || verifyError.name === 'AuthenticationError') {
          // Re-throw AuthenticationError so outer catch block can handle it
          throw verifyError;
        }

        // Phase 3.13.1: Check if it's a PermissionError (thrown by sheets.js)
        if (verifyError.isPermissionError || verifyError.name === 'PermissionError') {
          // Re-throw PermissionError as-is (already has good message)
          throw verifyError;
        }

        // Parse error to detect account mismatch (403) vs not found (404)
        const errorMsg = verifyError.message || '';

        if (errorMsg.includes('403') || errorMsg.toLowerCase().includes('permission')) {
          // Permission error from API
          const { googleEmail } = await chrome.storage.sync.get(['googleEmail']);
          const accountInfo = googleEmail ? ` (signed in as ${googleEmail})` : '';
          throw new Error(
            `You do not have edit access to this sheet. Make sure the sheet is owned by your account${accountInfo} or shared with edit permissions.`
          );
        } else if (errorMsg.includes('404')) {
          // Sheet not found
          throw new Error(
            'Sheet not found. Double check the URL is correct and that the sheet still exists.'
          );
        } else if (errorMsg.startsWith('Cannot access sheet:')) {
          // Already formatted error - don't double-wrap
          throw verifyError;
        } else {
          // Other error - wrap with context
          throw new Error(`Cannot access sheet: ${errorMsg}`);
        }
      }
    }

    // Only save if verification succeeds
    // Phase 3.13: Use StateManager to persist sheet connection
    await window.StateManager.set({
      sheetId,
      sheetUrl: url,
      hasCompletedInitialOnboarding: true  // Flag for enabling item restoration in future
    });

    // Fetch and cache the sheet name
    await fetchSheetName(sheetId);

    hideLoading();
    updateStatus('Sheet saved successfully!', true);
    await loadState();
  } catch (error) {
    hideLoading();

    // Phase 3.13.1: Check if it's an authentication error
    if (error.name === 'AuthenticationError' || error.isAuthError) {
      console.warn('[Sheet] Authentication error detected, showing welcome page for re-authentication');
      showReAuthPage();
      return;
    }

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

/**
 * Phase 3.14.0: Show message when stuck cursor is detected with fix button
 */
function showSyncCursorIssueMessage() {
  if (!homeSyncStatus) return;

  homeSyncStatus.classList.remove('hidden', 'loading', 'success', 'error');
  homeSyncStatus.classList.add('warning');
  homeSyncStatus.querySelector('.sync-status-loading').style.display = 'none';
  homeSyncStatus.querySelector('.sync-status-message').style.display = 'block';

  const messageEl = homeSyncStatus.querySelector('#homeSyncStatusMessage');
  messageEl.innerHTML = `
    No new transactions found. This might be a sync issue.
    <button id="fixSyncIssuesBtn" style="
      margin-left: 8px;
      padding: 4px 12px;
      background: #f59e0b;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
    ">Fix Sync Issues</button>
  `;

  // Attach click handler
  const fixBtn = document.getElementById('fixSyncIssuesBtn');
  if (fixBtn) {
    fixBtn.addEventListener('click', handleFixSyncIssues);
  }

  // Don't auto-hide - let user decide when to dismiss
}

/**
 * Phase 3.14.0: Reset sync cursors for all institutions and retry
 */
async function handleFixSyncIssues() {
  try {
    showHomeSyncLoading('Resetting sync state...');

    const stateManager = window.StateManager;
    const institutions = stateManager.getInstitutions();

    debug('[Fix Sync] Resetting cursors for', institutions.length, 'institution(s)');

    // Reset cursor for each institution
    for (const institution of institutions) {
      try {
        const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(institution.itemId)}/reset-cursor`, {
          method: 'POST'
        });

        if (!response.ok) {
          console.warn(`[Fix Sync] Failed to reset cursor for ${institution.institutionName}`);
        } else {
          debug(`[Fix Sync] Reset cursor for ${institution.institutionName}`);
        }
      } catch (error) {
        console.error(`[Fix Sync] Error resetting cursor for ${institution.institutionName}:`, error);
      }
    }

    // Retry sync after resetting cursors
    showHomeSyncLoading('Retrying sync...');
    await new Promise(resolve => setTimeout(resolve, 1000)); // Brief delay

    await handleSyncNow();

  } catch (error) {
    console.error('[Fix Sync] Error:', error);
    showHomeSyncError('Failed to fix sync issues. Please try again.');
  }
}

// Handle Sync Now button
/**
 * Phase 3.14.0: Sync all institutions
 */
// Phase 3.17.0: Check for existing sheet data and column mismatch
async function checkSheetDataMismatch(sheetId, currentTier) {
  try {
    debug(`[Sheet Check] Checking for existing data and column mismatch (tier: ${currentTier})`);

    // Get expected column count for current tier
    const expectedColumns = currentTier === 'pro' ? 34 : 13; // FREE: 13 cols, PRO: 34 cols (Phase 3.21.0: split categories)

    // Check if Transactions tab exists and has data
    const token = await window.SheetsAPI.getAuthToken();
    const tabName = 'Transactions';

    try {
      // Try to read first 2 rows (headers + first data row)
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${tabName}!A1:ZZ2`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (!response.ok) {
        // Tab doesn't exist yet, no mismatch possible
        debug('[Sheet Check] Transactions tab does not exist yet');
        return { hasMismatch: false };
      }

      const data = await response.json();
      const values = data.values || [];

      // If no data or only headers, no mismatch issue
      if (values.length < 2) {
        debug('[Sheet Check] No existing transaction data found');
        return { hasMismatch: false };
      }

      // Check column count in existing data
      const existingColumns = values[0]?.length || 0;
      debug(`[Sheet Check] Existing columns: ${existingColumns}, Expected: ${expectedColumns}`);

      if (existingColumns !== expectedColumns) {
        // Column mismatch detected!
        debug('[Sheet Check] COLUMN MISMATCH DETECTED!');

        const message = `⚠️ Column Mismatch Detected!\n\n` +
                       `Your sheet has ${existingColumns} columns but your current tier expects ${expectedColumns} columns.\n\n` +
                       `Syncing now would append mismatched data and corrupt your sheet.\n\n` +
                       `Options:\n` +
                       `1. Clear existing data and re-sync (recommended)\n` +
                       `2. Create a new sheet instead\n` +
                       `3. Cancel sync\n\n` +
                       `Clear existing data and continue?`;

        const userConfirmed = confirm(message);

        if (userConfirmed) {
          debug('[Sheet Check] User confirmed clearing mismatched data');
          showHomeSyncLoading('Clearing mismatched data...');
          await window.SheetsAPI.clearTransactionsTab(sheetId, currentTier);
          return { hasMismatch: true, cleared: true };
        } else {
          debug('[Sheet Check] User cancelled sync due to mismatch');
          return { hasMismatch: true, cleared: false, cancelled: true };
        }
      }

      return { hasMismatch: false };
    } catch (fetchError) {
      // If we can't fetch, assume no data exists
      debug('[Sheet Check] Could not fetch sheet data, assuming no mismatch');
      return { hasMismatch: false };
    }
  } catch (error) {
    console.error('[Sheet Check] Error checking sheet data:', error);
    // Don't block sync on check errors
    return { hasMismatch: false };
  }
}

// Phase 3.16.0: Check for tier changes and prompt user
async function checkTierChange(sheetId) {
  try {
    // Get current tier from storage
    const storage = await chrome.storage.sync.get(['userTier', 'lastSyncTier']);
    const currentTier = storage.userTier || 'free';
    const lastSyncTier = storage.lastSyncTier;

    debug(`[Tier Check] Current tier: ${currentTier}, Last sync tier: ${lastSyncTier}`);

    // If this is first sync or tier hasn't changed, no action needed
    if (!lastSyncTier || lastSyncTier === currentTier) {
      debug('[Tier Check] No tier change detected');
      return { changed: false, currentTier };
    }

    // Tier has changed - show confirmation dialog
    const tierNames = { free: 'FREE', basic: 'BASIC', pro: 'PRO' };
    const oldTierName = tierNames[lastSyncTier] || lastSyncTier.toUpperCase();
    const newTierName = tierNames[currentTier] || currentTier.toUpperCase();

    const message = `Your subscription tier changed from ${oldTierName} to ${newTierName}!\n\n` +
                   `To avoid data misalignment, we recommend clearing existing transactions and re-syncing with the new field format.\n\n` +
                   `Clear existing data and re-sync now?`;

    const userConfirmed = confirm(message);

    if (userConfirmed) {
      debug(`[Tier Check] User confirmed clearing data for tier change: ${lastSyncTier} → ${currentTier}`);

      // Clear the Transactions tab and update headers
      showHomeSyncLoading('Clearing old transaction data...');
      await window.SheetsAPI.clearTransactionsTab(sheetId, currentTier);

      return { changed: true, currentTier, cleared: true };
    } else {
      debug('[Tier Check] User declined clearing data');
      return { changed: true, currentTier, cleared: false, cancelled: true };
    }
  } catch (error) {
    console.error('[Tier Check] Error checking tier change:', error);
    // Don't block sync on tier check errors
    return { changed: false, currentTier: 'free' };
  }
}

async function handleSyncNow() {
  async function attemptSync() {
    try {
      showHomeSyncLoading('Checking your data...');

      // Phase 3.14.0: Use StateManager to get ALL institutions
      const stateManager = window.StateManager;
      const institutions = stateManager.getInstitutions();
      const sheetId = stateManager.get('sheetId');

      if (institutions.length === 0) {
        throw new Error('No banks connected');
      }

      if (!sheetId) {
        throw new Error('Missing sheet ID');
      }

      // Phase 3.17.0: Refresh tier from backend to catch any changes made in Railway
      debug('[Sync] Refreshing tier from backend before sync...');
      showHomeSyncLoading('Checking your subscription...');
      await updateTierDisplay();
      debug('[Sync] Tier refreshed successfully');

      // Phase 3.16.0: Check for tier changes before syncing
      const tierCheck = await checkTierChange(sheetId);
      if (tierCheck.cancelled) {
        // User declined to clear data, cancel the sync
        hideHomeSyncStatus();
        return;
      }

      // Phase 3.17.0: Check for sheet data mismatch (wrong column count)
      const mismatchCheck = await checkSheetDataMismatch(sheetId, tierCheck.currentTier);
      if (mismatchCheck.cancelled) {
        // User declined to clear mismatched data, cancel the sync
        hideHomeSyncStatus();
        return;
      }

      // Check if we need to backfill (tabs deleted or empty)
      const needsBackfill = await checkIfBackfillNeeded(sheetId);

      // Get user's tier for appropriate loading messages
      const storage = await chrome.storage.sync.get(['userTier']);
      const userTier = storage.userTier || 'free';
      const isProTier = userTier === 'pro';

      // Phase 3.14.0: Fetch data from ALL institutions
      let allAccounts = [];
      let allTransactions = [];

      for (const institution of institutions) {
        try {
          // Show tier-aware loading message
          const loadingMsg = needsBackfill && isProTier
            ? `Syncing ${institution.institutionName}... (this may take 10+ seconds on first sync)`
            : `Syncing ${institution.institutionName}...`;
          showHomeSyncLoading(loadingMsg);
          debug(`[Sync] Processing ${institution.institutionName} (${institution.itemId})`);

          // Fetch data from backend (backfill if needed, otherwise incremental sync)
          let syncData;
          if (needsBackfill) {
            debug(`[Sync] Backfilling ${institution.institutionName}`);
            syncData = await fetchBackfillData(institution.itemId);
          } else {
            debug(`[Sync] Incremental sync for ${institution.institutionName}`);
            syncData = await fetchSyncData(institution.itemId);
          }

          // Aggregate accounts and transactions
          if (syncData.accounts) {
            allAccounts = allAccounts.concat(syncData.accounts);
          }
          if (syncData.transactions) {
            allTransactions = allTransactions.concat(syncData.transactions);
          }

          debug(`[Sync] ${institution.institutionName}: ${syncData.transactions?.length || 0} transactions`);
        } catch (error) {
          console.error(`[Sync] Failed to sync ${institution.institutionName}:`, error);

          // Check if this is a Plaid pagination mutation error - retry with backfill
          const errorMsg = error.message || '';
          const isPaginationError = errorMsg.includes('TRANSACTIONS_SYNC_MUTATION_DURING_PAGINATION');

          if (isPaginationError && !needsBackfill) {
            console.warn(`[Sync] Plaid pagination error for ${institution.institutionName}, retrying with backfill...`);
            try {
              showHomeSyncLoading(`Re-syncing ${institution.institutionName}...`);
              debug(`[Sync] Backfill retry for ${institution.institutionName}`);
              const syncData = await fetchBackfillData(institution.itemId);

              // Aggregate accounts and transactions
              if (syncData.accounts) {
                allAccounts = allAccounts.concat(syncData.accounts);
              }
              if (syncData.transactions) {
                allTransactions = allTransactions.concat(syncData.transactions);
              }

              debug(`[Sync] ${institution.institutionName} backfill retry: ${syncData.transactions?.length || 0} transactions`);
              continue; // Skip the fallback account logic
            } catch (retryError) {
              console.error(`[Sync] Backfill retry also failed for ${institution.institutionName}:`, retryError);
            }
          }

          // CRITICAL: Even if sync fails, preserve accounts from cache to avoid data loss
          // When we write to sheets, we need ALL accounts, not just successful syncs
          if (institution.accounts && institution.accounts.length > 0) {
            debug(`[Sync] Using cached accounts for ${institution.institutionName} (${institution.accounts.length} accounts)`);
            allAccounts = allAccounts.concat(institution.accounts);
          } else {
            console.warn(`[Sync] No cached accounts for ${institution.institutionName}, attempting to fetch...`);
            try {
              const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(institution.itemId)}/info`);
              if (response.ok) {
                const itemInfo = await response.json();
                if (itemInfo.accounts) {
                  debug(`[Sync] Fetched ${itemInfo.accounts.length} accounts for ${institution.institutionName}`);
                  allAccounts = allAccounts.concat(itemInfo.accounts);
                }
              }
            } catch (fetchError) {
              console.error(`[Sync] Could not fetch accounts for ${institution.institutionName}:`, fetchError);
            }
          }
          // Continue with other institutions
        }
      }

      // Combine all data
      const syncData = {
        accounts: allAccounts,
        transactions: allTransactions
      };

      debug(`[Sync] Total: ${allAccounts.length} accounts, ${allTransactions.length} transactions`);

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

      // Phase 3.13: Update last sync time in StateManager
      await window.StateManager.set({ lastSync: Date.now() });

      // Phase 3.16.0: Store current tier as lastSyncTier for future tier change detection
      // Note: userTier is already declared earlier in this function
      if (userTier) {
        await chrome.storage.sync.set({ lastSyncTier: userTier });
        debug(`[Sync] Stored lastSyncTier: ${userTier}`);
      }

      // Phase 3.14.0: Show detailed success message with institution count
      const message = `Synced ${institutions.length} ${institutions.length === 1 ? 'bank' : 'banks'}! ${result.accountsWritten} accounts, ${result.transactionsNew} new transactions (${result.transactionsTotal} total)`;
      showHomeSyncSuccess(message);

      // Phase 3.14.0: Smart detection for stuck sync cursor
      // If we fetched transactions but wrote 0 new ones, and it's been a while, cursor might be stuck
      const lastSync = stateManager.get('lastSync');
      const hoursSinceLastSync = lastSync ? (Date.now() - lastSync) / (1000 * 60 * 60) : 999;
      const fetchedTransactions = allTransactions.length;
      const wroteNewTransactions = result.transactionsNew;

      if (fetchedTransactions > 0 && wroteNewTransactions === 0 && hoursSinceLastSync > 6) {
        // Likely stuck cursor - all fetched transactions were duplicates
        debug('[Sync] Possible stuck cursor detected:', {
          fetched: fetchedTransactions,
          wrote: wroteNewTransactions,
          hoursSince: hoursSinceLastSync
        });

        // Show helpful message with fix button
        showSyncCursorIssueMessage();
      }

      await loadState();
      hideSyncError();
    } catch (error) {
      debug('[Sync] Error caught:', error);
      debug('[Sync] Error type:', error.name, 'isAuthError:', error.isAuthError);

      // Phase 3.11: Check for authentication errors
      if (error.isAuthError || error.name === 'AuthenticationError') {
        debug('[Sync] Auth error detected, showing welcome page for re-authentication');
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
    // Get user's tier to show appropriate loading message
    const storage = await chrome.storage.sync.get(['userTier']);
    const userTier = storage.userTier || 'free';

    // PRO users get 2 years of data, which takes longer
    const loadingMessage = userTier === 'pro'
      ? 'Re-fetching 2 years of data... (may take 15-20 seconds)'
      : 'Re-fetching all data...';

    showHomeSyncLoading(loadingMessage);

    // Phase 3.14.0: Use StateManager with multi-institution support
    const stateManager = window.StateManager;
    const institutions = stateManager.getInstitutions();
    const sheetId = stateManager.get('sheetId');

    if (institutions.length === 0 || !sheetId) {
      throw new Error('No banks connected or sheet not set up');
    }

    // Phase 3.16.0: Check for tier changes before syncing
    const tierCheck = await checkTierChange(sheetId);
    if (tierCheck.cancelled) {
      // User declined to clear data, cancel the sync
      hideHomeSyncStatus();
      return;
    }

    debug(`[Resync All] Forcing backfill for ${institutions.length} institution(s)`);

    // Phase 3.14.0: Fetch backfill data from ALL institutions
    let allAccounts = [];
    let allTransactions = [];

    for (const institution of institutions) {
      try {
        showHomeSyncLoading(`Re-syncing ${institution.institutionName}...`);
        debug(`[Resync All] Backfilling ${institution.institutionName}`);

        const syncData = await fetchBackfillData(institution.itemId);

        // Aggregate accounts and transactions
        if (syncData.accounts) {
          allAccounts = allAccounts.concat(syncData.accounts);
        }
        if (syncData.transactions) {
          allTransactions = allTransactions.concat(syncData.transactions);
        }

        debug(`[Resync All] ${institution.institutionName}: ${syncData.transactions?.length || 0} transactions`);
      } catch (error) {
        console.error(`[Resync All] Failed to backfill ${institution.institutionName}:`, error);

        // Use cached accounts as fallback
        if (institution.accounts && institution.accounts.length > 0) {
          allAccounts = allAccounts.concat(institution.accounts);
        }
      }
    }

    const syncData = {
      accounts: allAccounts,
      transactions: allTransactions
    };

    debug(`[Resync All] Total: ${allAccounts.length} accounts, ${allTransactions.length} transactions`);

    showHomeSyncLoading('Writing to sheet...');

    // Write to Google Sheets
    const result = await writeToSheets(sheetId, syncData);

    // Phase 3.13: Update last sync time in StateManager
    await window.StateManager.set({ lastSync: Date.now() });

    // Phase 3.16.0: Store current tier as lastSyncTier for future tier change detection
    // Note: userTier is already declared earlier in this function
    if (userTier) {
      await chrome.storage.sync.set({ lastSyncTier: userTier });
      debug(`[Resync All] Stored lastSyncTier: ${userTier}`);
    }

    // Phase 3.14.0: Show detailed success message with institution count
    const message = `Re-synced ${institutions.length} ${institutions.length === 1 ? 'bank' : 'banks'}! ${result.accountsWritten} accounts, ${result.transactionsNew} new transactions (${result.transactionsTotal} total)`;
    showHomeSyncSuccess(message);

    await loadState();

  } catch (error) {
    debug('[Resync All] Error:', error);

    // Check for authentication errors
    if (error.isAuthError || error.name === 'AuthenticationError') {
      debug('[Resync All] Auth error detected, showing welcome page for re-authentication');
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

    // Call backfill endpoint (Phase 3.16.0: with JWT authentication)
    const response = await authenticatedFetch(`${BACKEND_URL}/plaid/backfill`, {
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

// Check and show session expired message on welcome page
/**
 * Phase 3.16.0: Display styled message on welcome page if session expired
 */
async function checkAndShowSessionExpiredMessage() {
  const { sessionExpired } = await chrome.storage.sync.get(['sessionExpired']);

  if (sessionExpired) {
    // Clear the flag
    await chrome.storage.sync.remove(['sessionExpired']);

    // Find or create the message container
    const welcomeSection = document.getElementById('welcomeSection');
    if (!welcomeSection) return;

    // Create styled message with blue styling and smooth transitions
    const messageHtml = `
      <div id="sessionExpiredMessage" style="
        margin: 0 0 16px 0;
        padding: 12px 16px;
        background: #eff6ff;
        border-left: 4px solid #3b82f6;
        border-radius: 6px;
        font-size: 14px;
        color: #1e40af;
        line-height: 1.5;
        opacity: 0;
        transform: translateY(-8px);
        transition: opacity 0.3s ease-out, transform 0.3s ease-out;
      ">
        <strong>Session Expired</strong><br>
        Your session has expired. Please sign in again to continue.
      </div>
    `;

    // Insert message inside welcome-content before the sign-in button
    const welcomeContent = welcomeSection.querySelector('.welcome-content');
    const signInButton = welcomeSection.querySelector('#signInGoogleBtn');
    const heroSection = welcomeSection.querySelector('.welcome-hero-bg');

    if (welcomeContent && signInButton) {
      signInButton.insertAdjacentHTML('beforebegin', messageHtml);
    } else {
      // Fallback: insert at beginning of welcome content
      welcomeContent?.insertAdjacentHTML('afterbegin', messageHtml);
    }

    // Reduce padding on hero section when message is active
    if (heroSection) {
      heroSection.style.transition = 'padding 0.3s ease-out';
      heroSection.style.paddingBottom = '16px';
    }

    // Trigger fade-in animation
    const msg = document.getElementById('sessionExpiredMessage');
    if (msg) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          msg.style.opacity = '1';
          msg.style.transform = 'translateY(0)';
        });
      });
    }

    // Auto-remove message after 5 seconds with fade-out
    setTimeout(() => {
      const msg = document.getElementById('sessionExpiredMessage');
      if (msg) {
        msg.style.opacity = '0';
        msg.style.transform = 'translateY(-8px)';
        // Remove from DOM after transition completes
        setTimeout(() => {
          msg.remove();
          // Restore hero section padding
          if (heroSection) {
            heroSection.style.paddingBottom = '';
          }
        }, 300);
      }
    }, 5000);
  }
}

// Handle Session Expired - Force Re-authentication
/**
 * Phase 3.16.0: When JWT expires, clear auth state and redirect to welcome
 * This is more reliable than trying to silently refresh the token
 */
let sessionExpiredHandled = false; // Prevent multiple simultaneous calls
async function handleSessionExpired() {
  // Prevent multiple simultaneous calls
  if (sessionExpiredHandled) {
    debug('[Auth] Session expiry already being handled, skipping duplicate call');
    return;
  }
  sessionExpiredHandled = true;

  debug('[Auth] Session expired - clearing auth state and redirecting to welcome');

  // Clear JWT and auth-related data (but keep onboarding state and lastSyncTier)
  // Note: We keep lastSyncTier so tier changes can be detected after re-auth
  await chrome.storage.sync.remove([
    'jwtToken',
    'jwtExpiry',
    'userId',
    'userEmail',
    'userTier',
    'tierFetchedAt',
    'tierFeatures'
  ]);

  // Set session expired flag for welcome page to display message
  // Note: Keep hasCompletedInitialOnboarding so user doesn't re-enter onboarding
  await chrome.storage.sync.set({
    sessionExpired: true,
    googleAuthenticated: false
  });

  // Reload popup to show welcome screen with session expired message
  window.location.reload();
}

// Handle Disconnect button
/**
 * Phase 3.14.0: Handle disconnecting ALL institutions
 */
async function handleDisconnect() {
  const institutions = window.StateManager.getInstitutions();

  if (institutions.length === 0) {
    showError('No banks connected');
    return;
  }

  const bankNames = institutions.map(i => i.institutionName).join(', ');

  const confirmed = confirm(
    `Disconnect ALL banks?\n\n` +
    `This will remove: ${bankNames}\n\n` +
    `All stored credentials will be removed.`
  );

  if (!confirmed) return;

  try {
    showLoading('Disconnecting all banks...');

    // Disconnect each institution from backend
    for (const institution of institutions) {
      try {
        debug(`[Disconnect] Calling DELETE /plaid/item/${institution.itemId}`);
        await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(institution.itemId)}`, {
          method: 'DELETE'
        });
      } catch (error) {
        console.error(`Error deleting ${institution.institutionName} from backend:`, error);
        // Continue anyway - at least clear local storage
      }
    }

    // Get auth data before clearing storage
    const { googleUserId, googleEmail, googleAuthenticated, hasCompletedInitialOnboarding, sheetId, sheetUrl, sheetName } =
      await chrome.storage.sync.get(['googleUserId', 'googleEmail', 'googleAuthenticated', 'hasCompletedInitialOnboarding', 'sheetId', 'sheetUrl', 'sheetName']);

    // Clear all institutions from StateManager
    await window.StateManager.set({
      institutions: [],
      itemId: null,
      institutionName: null,
      institutionId: null,
      accounts: null,
      accountsLastFetched: null
    });

    hideLoading();

    // Reload bank page to show empty state
    await loadBankPage();
    updateStatus('All banks disconnected', true);

    // Update user header
    updateUserHeader(googleEmail, false, !!sheetId);
  } catch (error) {
    hideLoading();
    showError('Failed to disconnect banks: ' + error.message);
  }
}

/**
 * Phase 3.14.0: Handle disconnecting a single institution
 */
async function handleDisconnectInstitution(itemId, institutionName) {
  const confirmed = confirm(
    `Disconnect ${institutionName}?\n\n` +
    `This will remove all accounts from this institution. ` +
    `Your other connected banks will not be affected.`
  );

  if (!confirmed) return;

  try {
    showLoading(`Disconnecting ${institutionName}...`);

    // Call backend to disconnect
    const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to disconnect institution');
    }

    debug(`[Bank] Disconnected ${institutionName} from backend`);

    // Remove from local state
    await window.StateManager.removeInstitution(itemId);

    hideLoading();

    // Reload bank page
    await loadBankPage();

    // Show success message
    updateStatus(`${institutionName} disconnected successfully`, true);
  } catch (error) {
    hideLoading();
    showError(`Failed to disconnect ${institutionName}: ${error.message}`);
  }
}

/**
 * Phase 3.14.0: Handle updating institution connection (e.g., when login credentials change)
 */
async function handleUpdateConnection(itemId) {
  try {
    showLoading('Opening Plaid to update connection...');

    // Get or create userId from storage (same format as getLinkToken)
    let userData = await chrome.storage.sync.get(['userId']);
    if (!userData.userId) {
      // Generate a unique user ID if it doesn't exist
      userData.userId = 'user_' + Math.random().toString(36).substring(2, 15);
      await chrome.storage.sync.set({ userId: userData.userId });
      debug('[handleUpdateConnection] Generated new userId:', userData.userId);
    }

    // Get update mode link token for this specific itemId
    const requestBody = {
      client_user_id: userData.userId,
      env: CONFIG.ENV,
      item_id: itemId,  // Tells backend to create link token in update mode
      redirect_uri: 'https://sheetlink.app/oauth/plaid/callback'
    };

    const response = await fetch(`${BACKEND_URL}/plaid/link-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Failed to get link token for update: ${errorData.detail || response.statusText}`);
    }

    const linkData = await response.json();

    // Open Plaid Link in update mode
    const result = await openPlaidLink(linkData);

    if (result) {
      // Fetch updated institution info
      showLoading('Fetching updated institution details...');
      const itemInfoResponse = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}/info`);
      if (!itemInfoResponse.ok) {
        throw new Error('Failed to fetch updated institution details');
      }
      const itemInfo = await itemInfoResponse.json();

      // Update cache
      await window.StateManager.updateInstitutionCache(itemId, itemInfo.accounts, {
        institutionName: itemInfo.institution_name,
        institutionId: itemInfo.institution_id
      });

      hideLoading();
      updateStatus('Connection updated successfully!', true);
      await loadBankPage();
    } else {
      hideLoading();
    }
  } catch (error) {
    hideLoading();
    showError('Failed to update connection: ' + error.message);
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

    // Phase 3.13: Use StateManager to clear sheet connection
    await window.StateManager.set({
      sheetId: null,
      sheetUrl: null
    });

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

  // Add redirect_uri for OAuth flow
  requestBody.redirect_uri = 'https://sheetlink.app/oauth/plaid/callback';

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
  debug('[Sync] Fetching data from backend for item_id:', itemId);

  // Phase 3.16.0: Use authenticated fetch for sync (enables tier-based features)
  const response = await authenticatedFetch(`${BACKEND_URL}/plaid/sync`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Sync failed: ${errorData.detail || response.statusText}`);
  }

  const data = await response.json();
  debug('[Sync] Backend returned:', {
    accounts: data.accounts?.length || 0,
    transactions: data.transactions?.length || 0
  });

  // Log warning if accounts are missing
  if (!data.accounts || data.accounts.length === 0) {
    console.warn('[Sync] ⚠️ Backend returned 0 accounts - this may indicate a backend issue');
    console.warn('[Sync] Full response:', data);
  }

  return data;
}

async function fetchBackfillData(itemId) {
  debug('[Sync] Fetching backfill data from backend for item_id:', itemId);

  // Phase 3.16.0: Use authenticated fetch for backfill (enables tier-based features)
  const response = await authenticatedFetch(`${BACKEND_URL}/plaid/backfill`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ item_id: itemId })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Backfill failed: ${errorData.detail || response.statusText}`);
  }

  const data = await response.json();
  debug('[Sync] Backfill returned:', {
    accounts: data.accounts?.length || 0,
    transactions: data.transactions?.length || 0
  });

  // Log warning if accounts are missing
  if (!data.accounts || data.accounts.length === 0) {
    console.warn('[Sync] ⚠️ Backend returned 0 accounts - this may indicate a backend issue');
    console.warn('[Sync] Full response:', data);
  }

  // Backfill endpoint returns different format, normalize it
  return {
    accounts: data.accounts || [],
    transactions: data.transactions || []
  };
}

async function checkIfBackfillNeeded(sheetId) {
  debug('[Sync] Checking if backfill is needed for sheet:', sheetId);

  try {
    // Check if Accounts and Transactions tabs exist and have data
    const accountsEmpty = await isTabEmptyOrMissing(sheetId, 'Accounts');
    const transactionsEmpty = await isTabEmptyOrMissing(sheetId, 'Transactions');

    if (accountsEmpty || transactionsEmpty) {
      debug('[Sync] Backfill needed - Accounts empty:', accountsEmpty, 'Transactions empty:', transactionsEmpty);
      return true;
    }

    debug('[Sync] Both tabs exist with data, no backfill needed');
    return false;
  } catch (error) {
    // If it's an authentication error, propagate it up so user can re-authenticate
    if (error.isAuthError || error.name === 'AuthenticationError') {
      debug('[Sync] Auth error while checking tabs, propagating for re-auth');
      throw error;
    }

    debug('[Sync] Error checking tabs, defaulting to backfill:', error);
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
      debug(`[Sync] Tab "${tabName}" is empty or missing (rows: ${data?.length || 0})`);
      return true;
    }

    return false;
  } catch (error) {
    // If it's an authentication error, propagate it up so user can re-authenticate
    if (error.isAuthError || error.name === 'AuthenticationError') {
      debug(`[Sync] Auth error while checking tab "${tabName}", propagating for re-auth`);
      throw error;
    }

    // If we get 404 or any other error, tab likely doesn't exist
    debug(`[Sync] Tab "${tabName}" doesn't exist or is inaccessible:`, error);
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
    // Use embedded SDK in extension page
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

  // Fetch user tier to determine transaction fields
  // PRO tier gets 33 fields, FREE/BASIC get 11 fields
  let userTier = 'free';  // Default to free tier
  try {
    const storage = await chrome.storage.sync.get(['userTier']);
    if (storage.userTier) {
      userTier = storage.userTier;
      debug('[Sheets] Using cached tier:', userTier);
    } else {
      debug('[Sheets] No cached tier, defaulting to free');
    }
  } catch (error) {
    debug('[Sheets] Error fetching tier from storage:', error);
  }

  // Always write transactions tab (creates tab even if no transactions)
  // Pass accounts data for enriching transactions with account_name and account_mask
  // Pass tier to determine which transaction fields to write
  const transactionsData = data.transactions || [];
  const accountsData = data.accounts || [];
  const newCount = await window.SheetsAPI.writeTransactions(sheetId, transactionsData, accountsData, userTier);

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
  debug('[User Header] Updating with:', { googleEmail, hasBank, hasSheet });

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
  debug('[Header] Toggling to:', showUserHeader ? 'user-header' : 'default-header');

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
  // Phase 3.13: Hide initial loader when content is ready
  const initialLoader = document.getElementById('initialLoader');
  if (initialLoader) {
    initialLoader.style.display = 'none';
  }

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
      window.StateManager.set({ hasSeenWelcome: true });
      // Hide legacy footer on welcome
      if (legacyFooter) legacyFooter.classList.add('hidden');

      // Phase 3.16.0: Check for session expired and show message
      checkAndShowSessionExpiredMessage();
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
  // Phase 3.13: Use unified loader (keep it visible or show it again)
  const initialLoader = document.getElementById('initialLoader');
  const initialLoadingMessage = document.getElementById('initialLoadingMessage');

  if (initialLoader) {
    initialLoader.style.display = 'flex';
  }
  if (initialLoadingMessage) {
    initialLoadingMessage.textContent = message;
  }

  // Disable buttons
  [connectBankBtn, saveSheetBtn, syncNowBtn, disconnectBtn].forEach(btn => {
    if (btn) btn.disabled = true;
  });
}

function hideLoading() {
  // Phase 3.13: Hide unified loader
  const initialLoader = document.getElementById('initialLoader');
  if (initialLoader) {
    initialLoader.style.display = 'none';
  }

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
    // Set the modal description text
    const descriptionEl = document.getElementById('connectionSuccessDescription');
    if (descriptionEl) {
      descriptionEl.textContent = 'Your bank account is now linked. You\'re ready to sync transactions to Google Sheets.';
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

    // Set modal description text
    const descriptionEl = document.getElementById('sheetSuccessDescription');
    if (descriptionEl) {
      descriptionEl.textContent = 'Your Google Sheet is now live with your transaction data including balances, categories, and account activity powered by SheetLink.';
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

// Phase 3.13.1: isReAuthenticating moved to StateManager for persistence
// let isReAuthenticating = false; // REMOVED

/**
 * Show welcome page for re-authentication when token expires
 */
function showReAuthPage() {
  debug('[ReAuth] Showing welcome page for re-authentication');

  // Mark that we're in re-authentication mode
  window.StateManager.set({ isReAuthenticating: true });

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
      await window.StateManager.set({
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
  debug('[Nav] Switching to tab:', tabName);

  // Phase 3.13.1: Remove welcome background when switching to post-onboarding pages
  document.body.classList.remove('welcome-active');

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
  // Phase 3.13: Use StateManager for instant, consistent state access
  const stateManager = window.StateManager;
  const googleUserId = stateManager.get('googleUserId');
  const itemId = stateManager.get('itemId');
  const sheetId = stateManager.get('sheetId');
  const hasCompletedInitialOnboarding = stateManager.get('hasCompletedInitialOnboarding');

  debug('[Nav] initializeNavigation called');
  debug('[Nav] isFullyConnected:', stateManager.isFullyConnected());
  debug('[Nav] State:', { googleUserId, itemId, sheetId, hasCompletedInitialOnboarding });

  // Phase 3.11: Check if user has completed initial onboarding (all 3 steps)
  // Only show post-onboarding navigation after they've finished Google + Bank + Sheet
  const hasReachedPostOnboarding = hasCompletedInitialOnboarding;

  if (!hasReachedPostOnboarding) {
    // User is still in onboarding - hide footer nav
    debug('[Nav] Still in onboarding - hiding footer nav');
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

  // Phase 3.13: Always default to home page for returning users
  // This provides a better UX after sign-in/re-authentication
  // Users can easily navigate to Bank or Sheet pages if needed
  let defaultTab = 'home';

  await switchTab(savedTab || defaultTab);

  // Attach tab click listeners
  document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const page = tab.dataset.page;
      switchTab(page);
    });
  });

  // Phase 3.13: Hide initial loader after navigation is ready
  hideLoading();
}

/**
 * Load Home page data
 */
async function loadHomePage() {
  // Phase 3.13: Use StateManager for instant, consistent state access
  const stateManager = window.StateManager;
  const lastSync = stateManager.get('lastSync');
  const itemId = stateManager.get('itemId');
  const sheetId = stateManager.get('sheetId');
  const googleEmail = stateManager.get('googleEmail');

  // Update last sync
  if (homeLastSync && lastSync) {
    const date = new Date(lastSync);
    homeLastSync.textContent = formatRelativeTime(date);
  }

  // Update connection status dots
  if (homeStatusPlaid) {
    const plaidDot = homeStatusPlaid.querySelector('.status-dot');
    if (plaidDot) {
      plaidDot.className = 'status-dot ' + (itemId ? 'status-dot-connected' : 'status-dot-disconnected');
    }
  }
  if (homeStatusSheet) {
    const sheetDot = homeStatusSheet.querySelector('.status-dot');
    if (sheetDot) {
      sheetDot.className = 'status-dot ' + (sheetId ? 'status-dot-connected' : 'status-dot-disconnected');
    }
  }

  // Enable/disable sync buttons based on connection status
  const isFullyConnected = stateManager.isFullyConnected();

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
  updateUserHeader(googleEmail, !!itemId, !!sheetId);

  // Update tier display
  updateTierDisplay();
}

/**
 * Phase 3.14.0: Render Individual Institution Card
 */
async function renderInstitution(institution, container) {
  const { itemId, institutionName, accounts, accounts_cached_at } = institution;

  // Create institution card
  const card = document.createElement('div');
  card.className = 'institution-card';
  card.dataset.itemId = itemId;

  // Render accounts (use cached if fresh, fetch if stale)
  let accountsToRender = accounts || [];

  if (!accounts || isInstitutionCacheStale(institution)) {
    try {
      debug(`[Bank] Fetching fresh accounts for ${institutionName}...`);

      // Fetch fresh data from backend
      const response = await fetch(`${BACKEND_URL}/plaid/item/${encodeURIComponent(itemId)}/info`);
      if (response.ok) {
        const itemInfo = await response.json();
        accountsToRender = itemInfo.accounts;

        // Update cache
        await window.StateManager.updateInstitutionCache(itemId, itemInfo.accounts, {
          institutionName: itemInfo.institution_name,
          institutionId: itemInfo.institution_id
        });

        debug(`[Bank] Cache updated for ${institutionName}`);
      }
    } catch (error) {
      console.error(`[Bank] Failed to fetch accounts for ${institutionName}:`, error);
      // Use cached data as fallback
    }
  } else {
    debug(`[Bank] Using cached accounts for ${institutionName}`);
  }

  // Build HTML
  const connectedDate = institution.connected_at
    ? new Date(institution.connected_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    : 'Recently';

  const accountCount = accountsToRender.length;

  // Build accounts list HTML
  let accountsHTML = '';
  if (accountsToRender.length > 0) {
    accountsHTML = '<div class="institution-accounts" style="display: none;">';
    accountsToRender.forEach(account => {
      const accountName = account.official_name || account.name;
      const mask = account.mask ? `••${account.mask}` : '0000';
      const type = account.subtype || account.type;
      const balance = account.balances?.current != null
        ? `$${account.balances.current.toFixed(2)}`
        : '';

      accountsHTML += `
        <div class="account-item">
          <div class="account-info">
            <div class="account-name">${accountName} (...${mask})</div>
            <div class="account-type">${type}</div>
          </div>
          <div class="account-balance">${balance}</div>
        </div>
      `;
    });
    accountsHTML += '</div>';
  }

  card.innerHTML = `
    <div class="institution-header">
      <div class="institution-info">
        <span class="status-dot status-dot-connected"></span>
        <div>
          <div class="institution-name">${institutionName}</div>
          <div class="institution-meta">${accountCount} account${accountCount !== 1 ? 's' : ''}</div>
        </div>
      </div>
      <button class="institution-actions-btn" data-item-id="${itemId}">⋮</button>
    </div>
    ${accountsHTML}
    <div class="institution-actions hidden">
      <button class="update-connection-btn" data-item-id="${itemId}">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
        </svg>
        Edit
      </button>
      <button class="disconnect-institution-btn" data-item-id="${itemId}">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="3 6 5 6 21 6"></polyline>
          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          <line x1="10" y1="11" x2="10" y2="17"></line>
          <line x1="14" y1="11" x2="14" y2="17"></line>
        </svg>
        Disconnect
      </button>
    </div>
  `;

  container.appendChild(card);

  // Attach event listeners
  const actionsBtn = card.querySelector('.institution-actions-btn');
  const actionsMenu = card.querySelector('.institution-actions');
  const updateBtn = card.querySelector('.update-connection-btn');
  const disconnectBtn = card.querySelector('.disconnect-institution-btn');
  const header = card.querySelector('.institution-header');
  const accountsList = card.querySelector('.institution-accounts');

  // Toggle accounts list on header click
  if (accountsList && accountsToRender.length > 0) {
    header.style.cursor = 'pointer';
    header.addEventListener('click', (e) => {
      // Don't toggle if clicking actions button
      if (e.target.closest('.institution-actions-btn')) return;

      const isExpanded = accountsList.style.display !== 'none';
      accountsList.style.display = isExpanded ? 'none' : 'block';
    });
  }

  // Toggle actions menu
  actionsBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    actionsMenu.classList.toggle('hidden');

    // Close other open action menus
    document.querySelectorAll('.institution-actions').forEach(menu => {
      if (menu !== actionsMenu) {
        menu.classList.add('hidden');
      }
    });
  });

  // Update connection handler
  updateBtn.addEventListener('click', () => {
    handleUpdateConnection(itemId);
    actionsMenu.classList.add('hidden');
  });

  // Disconnect handler
  disconnectBtn.addEventListener('click', () => {
    handleDisconnectInstitution(itemId, institutionName);
    actionsMenu.classList.add('hidden');
  });

  // Close actions menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.institution-card')) {
      actionsMenu.classList.add('hidden');
    }
  });
}

/**
 * Phase 3.14.0: Check if institution cache is stale
 */
function isInstitutionCacheStale(institution) {
  if (!institution.accounts_cached_at) return true;
  const cacheAge = Date.now() - institution.accounts_cached_at;
  return cacheAge > (5 * 60 * 1000); // 5 minutes
}

/**
 * Load Bank page data
 * Phase 3.13: Uses cached accounts for instant display, refreshes in background if stale
 */
/**
 * Phase 3.14.0: Load Bank Page with Multi-Institution Support
 */
async function loadBankPage() {
  const stateManager = window.StateManager;
  const institutions = stateManager.getInstitutions();
  const googleEmail = stateManager.get('googleEmail');
  const sheetId = stateManager.get('sheetId');

  const bankListContainer = document.getElementById('bankList');

  if (institutions.length === 0) {
    // Show empty state
    if (bankListContainer) {
      bankListContainer.innerHTML = `
        <div class="card" style="text-align: center; padding: 32px;">
          <div style="font-size: 40px; margin-bottom: 12px;">🏦</div>
          <div style="font-size: 14px; font-weight: 600; color: #374151; margin-bottom: 8px;">No banks connected</div>
          <div style="font-size: 13px; color: #6b7280;">Connect a bank to start syncing your transactions.</div>
        </div>
      `;
    }
    return;
  }

  // Clear container
  bankListContainer.innerHTML = '';

  // Render each institution
  for (const institution of institutions) {
    await renderInstitution(institution, bankListContainer);
  }

  // Update user header
  updateUserHeader(googleEmail, institutions.length > 0, !!sheetId);
}

/**
 * Render bank accounts in the UI
 * Phase 3.13: Extracted for reuse by cache and refresh logic
 * Updated to use "Active" badge design per user preference
 */
function renderBankAccounts(accounts, institutionName, container) {
  if (!container) return;

  const accountCount = accounts ? accounts.length : 0;

  // Build collapsible accounts list
  let accountsHTML = '';
  if (accounts && accounts.length > 0) {
    accountsHTML = '<div class="bank-accounts-list" style="margin-top: 12px; border-top: 1px solid #e5e7eb; padding-top: 8px; display: none;">';
    accounts.forEach(account => {
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

  // Create bank card with glowing status dot and account count
  container.innerHTML = `
    <div class="card bank-card" style="cursor: pointer; user-select: none;">
      <div class="bank-header" style="display: flex; align-items: center; justify-content: space-between; border-bottom: none; padding-bottom: 0;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <span class="status-dot status-dot-connected" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.6), 0 0 4px rgba(16, 185, 129, 0.8);"></span>
          <h3 style="font-size: 16px; font-weight: 600; margin: 0; padding-bottom: 0; color: #1f2937; text-decoration: none; border-bottom: none;">${institutionName}</h3>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="font-size: 12px; color: #6b7280; font-weight: 500;">${accountCount} account${accountCount !== 1 ? 's' : ''}</span>
          ${accountsHTML ? '<span class="expand-arrow" style="color: #9ca3af; font-size: 14px; transition: transform 0.2s;">▶</span>' : ''}
        </div>
      </div>
      ${accountsHTML}
    </div>
  `;

  // Add click event listener to toggle expansion (only if there are accounts)
  if (accountsHTML) {
    const bankCard = container.querySelector('.bank-card');
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
}

/**
 * Fetch sheet name from Google Sheets API
 */
async function fetchSheetName(sheetId) {
  try {
    debug('[fetchSheetName] Fetching sheet name for ID:', sheetId);

    // Get access token from SheetsAPI (service worker)
    if (!window.SheetsAPI) {
      console.error('[fetchSheetName] SheetsAPI not available');
      return null;
    }

    debug('[fetchSheetName] Getting auth token...');
    const accessToken = await window.SheetsAPI.getAuthToken();

    if (!accessToken) {
      console.error('[fetchSheetName] No access token available');
      return null;
    }

    debug('[fetchSheetName] Making API call to Google Sheets...');
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?fields=properties.title`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[fetchSheetName] API call failed:', response.status, errorText);
      return null;
    }

    const data = await response.json();
    debug('[fetchSheetName] API response:', data);
    const sheetName = data?.properties?.title || null;

    if (sheetName) {
      // Store in StateManager for caching
      const stateManager = window.StateManager;
      await stateManager.set({ sheetName });
      debug('[fetchSheetName] Sheet name fetched and cached:', sheetName);
    } else {
      console.warn('[fetchSheetName] No title found in response');
    }

    return sheetName;
  } catch (error) {
    console.error('[fetchSheetName] Error:', error);
    return null;
  }
}

/**
 * Load Sheet page data
 */
async function loadSheetPage() {
  // Phase 3.13: Use StateManager for instant, consistent state access
  const stateManager = window.StateManager;
  const sheetId = stateManager.get('sheetId');
  const sheetUrl = stateManager.get('sheetUrl');
  const googleEmail = stateManager.get('googleEmail');
  const lastSync = stateManager.get('lastSync');
  const itemId = stateManager.get('itemId');

  const sheetInfoCard = document.querySelector('#page-sheet .sheet-info');
  const sheetActions = document.querySelector('#page-sheet .sheet-actions');

  if (!sheetId) {
    // Show empty/disconnected state with input
    if (sheetInfoCard) {
      sheetInfoCard.innerHTML = `
        <div class="status-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
          <span class="status-dot status-dot-disconnected" style="width: 8px; height: 8px; border-radius: 50%; background: #ef4444; box-shadow: 0 0 8px rgba(239, 68, 68, 0.6), 0 0 4px rgba(239, 68, 68, 0.8);"></span>
          <span style="font-size: 14px; font-weight: 500;">No sheet connected</span>
        </div>

        <!-- Error banner for permission/access errors -->
        <div id="sheetPageErrorBanner" class="hidden" style="margin-bottom: 12px; padding: 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;">
          <div style="font-weight: 600; color: #991b1b; margin-bottom: 6px; font-size: 14px;">Cannot Access Google Sheet</div>
          <div id="sheetPageErrorDetail" style="font-size: 13px; color: #7f1d1d; line-height: 1.5;"></div>
        </div>

        <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">
          Paste the URL of the Google Sheet where you want SheetLink to send your data.
        </p>
        <p style="font-size: 12px; color: #9ca3af; margin-bottom: 16px;">
          Use a sheet owned by <span style="color: #6b7280; font-weight: 500;">${googleEmail || 'user@gmail.com'}</span>
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
        // Add Enter key support
        sheetUrlPageInput.addEventListener('keypress', (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            saveSheetBtnPage.click();
          }
        });

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
          saveSheetBtnPage.textContent = 'Verifying...';

          try {
            // Phase 3.13.1: Hide any previous errors
            const errorBanner = document.getElementById('sheetPageErrorBanner');
            if (errorBanner) errorBanner.classList.add('hidden');

            // Phase 3.13.1: Verify sheet access BEFORE saving
            debug('[Sheet Page] Verifying access for sheet:', sheetId);
            debug('[Sheet Page] window.SheetsAPI available?', !!window.SheetsAPI);

            if (!window.SheetsAPI) {
              throw new Error('Sheets API not loaded. Please reload the extension and try again.');
            }

            try {
              await window.SheetsAPI.verifySheetAccess(sheetId);
              debug('[Sheet Page] ✓ Verification passed');
            } catch (verifyError) {
              console.error('[Sheet Page] Verification failed:', verifyError);

              // Handle authentication errors - re-throw so outer catch can redirect to welcome
              if (verifyError.isAuthError || verifyError.name === 'AuthenticationError') {
                throw verifyError;
              }

              // Handle permission errors with clear messages
              if (verifyError.isPermissionError || verifyError.name === 'PermissionError') {
                throw verifyError;
              }

              const errorMsg = verifyError.message || '';
              if (errorMsg.includes('403') || errorMsg.toLowerCase().includes('permission')) {
                throw new Error('You do not have edit access to this sheet. Make sure the sheet is owned by your account or shared with edit permissions.');
              } else if (errorMsg.includes('404')) {
                throw new Error('Sheet not found. Double check the URL is correct and that the sheet still exists.');
              } else if (errorMsg.startsWith('Cannot access sheet:')) {
                throw verifyError;
              } else {
                throw new Error(`Cannot access sheet: ${errorMsg}`);
              }
            }

            saveSheetBtnPage.textContent = 'Saving...';

            // Phase 3.13: Save to StateManager
            debug('[Sheet Page] Saving sheet to StateManager');
            await window.StateManager.set({
              sheetId: sheetId,
              sheetUrl: url
            });

            // Reload sheet page to show connected state
            await loadSheetPage();

            // Update user header
            const stateManager = window.StateManager;
            updateUserHeader(stateManager.get('googleEmail'), !!stateManager.get('itemId'), true);

            // Update home page if it's loaded
            await loadHomePage();
          } catch (error) {
            // Phase 3.14: Check for authentication errors
            if (error.isAuthError || error.name === 'AuthenticationError') {
              debug('[Sheet Page] Auth error detected, showing welcome page for re-authentication');
              saveSheetBtnPage.disabled = false;
              saveSheetBtnPage.textContent = 'Save Sheet';
              showReAuthPage();
              return;
            }

            // Show error in UI instead of alert
            const errorBanner = document.getElementById('sheetPageErrorBanner');
            const errorDetail = document.getElementById('sheetPageErrorDetail');
            if (errorBanner && errorDetail) {
              errorDetail.textContent = error.message;
              errorBanner.classList.remove('hidden');

              // Auto-hide after 8 seconds (consistent with sync errors)
              setTimeout(() => {
                if (errorBanner) errorBanner.classList.add('hidden');
              }, 8000);
            }

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
    updateUserHeader(googleEmail, !!itemId, false);
    return;
  }

  // Fetch sheet name if we don't have it cached
  let sheetName = stateManager.get('sheetName');
  if (!sheetName && sheetId) {
    sheetName = await fetchSheetName(sheetId);
  }

  // Show connected state
  if (sheetInfoCard) {
    // Extract first 5 characters of sheet ID for display
    const shortId = sheetId ? sheetId.substring(0, 5) + '...' : '';
    const displayName = sheetName ? `${sheetName} (${shortId})` : `Google Sheet (${shortId})`;

    sheetInfoCard.innerHTML = `
      <div class="status-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span class="status-dot status-dot-connected" style="width: 8px; height: 8px; border-radius: 50%; background: #10b981; box-shadow: 0 0 8px rgba(16, 185, 129, 0.6), 0 0 4px rgba(16, 185, 129, 0.8);"></span>
        <span style="font-size: 14px; font-weight: 500;">${displayName}</span>
      </div>
      <p class="sheet-url" style="margin-bottom: 8px;">
        <a id="sheetLink" href="${sheetUrl || '#'}" target="_blank" style="font-size: 13px; color: #3b82f6; text-decoration: none;">Open Sheet →</a>
      </p>
      <p class="sheet-owner" style="font-size: 13px; color: #6b7280; margin-bottom: 4px;">
        Owner: <span id="sheetOwner">${googleEmail || 'user@gmail.com'}</span>
      </p>
      <p class="sheet-last-write" style="font-size: 13px; color: #6b7280;">
        Last write: <span id="sheetLastWrite">${lastSync ? formatRelativeTime(new Date(lastSync)) : 'Never'}</span>
      </p>
    `;
  }

  // Show action buttons when connected
  if (sheetActions) {
    sheetActions.style.display = 'block';
  }

  // Update sheet link
  if (sheetLink && sheetUrl) {
    sheetLink.href = sheetUrl;
  }

  // Update owner email
  if (sheetOwner && googleEmail) {
    sheetOwner.textContent = googleEmail;
  }

  // Update last write time
  if (sheetLastWrite && lastSync) {
    const date = new Date(lastSync);
    sheetLastWrite.textContent = formatRelativeTime(date);
  }

  // Update user header
  updateUserHeader(googleEmail, !!itemId, !!sheetId);
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
  // disconnectBankBtn removed - managed per-institution in cards

  // Sheet page
  if (changeSheetBtnPage) changeSheetBtnPage.addEventListener('click', async () => {
    const sheetInfoCard = document.querySelector('#page-sheet .sheet-info');
    // Phase 3.13: Use StateManager
    const stateManager = window.StateManager;
    const googleEmail = stateManager.get('googleEmail');
    const itemId = stateManager.get('itemId');

    if (!sheetInfoCard) return;

    // Show input form with blue dot indicator
    sheetInfoCard.innerHTML = `
      <div class="status-item" style="display: flex; align-items: center; gap: 8px; margin-bottom: 12px;">
        <span class="status-dot" style="width: 8px; height: 8px; border-radius: 50%; background: #3b82f6; box-shadow: 0 0 8px rgba(59, 130, 246, 0.6), 0 0 4px rgba(59, 130, 246, 0.8);"></span>
        <span style="font-size: 14px; font-weight: 500;">Change Sheet</span>
      </div>

      <!-- Error banner for permission/access errors -->
      <div id="sheetChangeErrorBanner" class="hidden" style="margin-bottom: 12px; padding: 12px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 6px;">
        <div style="font-weight: 600; color: #991b1b; margin-bottom: 6px; font-size: 14px;">Cannot Access Google Sheet</div>
        <div id="sheetChangeErrorDetail" style="font-size: 13px; color: #7f1d1d; line-height: 1.5;"></div>
      </div>

      <p style="font-size: 13px; color: #6b7280; margin-bottom: 12px;">
        Enter a new Google Sheet URL to change where your data is synced.
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin-bottom: 16px;">
        Use a sheet owned by <span style="color: #6b7280; font-weight: 500;">${googleEmail || 'user@gmail.com'}</span>
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
        saveNewSheetBtn.textContent = 'Verifying...';

        try {
          // Phase 3.13.1: Hide any previous errors
          const errorBanner = document.getElementById('sheetChangeErrorBanner');
          if (errorBanner) errorBanner.classList.add('hidden');

          // Phase 3.13.1: Verify sheet access BEFORE saving
          debug('[Sheet Change] Verifying access for sheet:', sheetId);
          debug('[Sheet Change] window.SheetsAPI available?', !!window.SheetsAPI);

          if (!window.SheetsAPI) {
            throw new Error('Sheets API not loaded. Please reload the extension and try again.');
          }

          try {
            await window.SheetsAPI.verifySheetAccess(sheetId);
            debug('[Sheet Change] ✓ Verification passed');
          } catch (verifyError) {
            console.error('[Sheet Change] Verification failed:', verifyError);

            // Handle authentication errors - re-throw so outer catch can redirect to welcome
            if (verifyError.isAuthError || verifyError.name === 'AuthenticationError') {
              throw verifyError;
            }

            // Handle permission errors with clear messages
            if (verifyError.isPermissionError || verifyError.name === 'PermissionError') {
              throw verifyError;
            }

            const errorMsg = verifyError.message || '';
            if (errorMsg.includes('403') || errorMsg.toLowerCase().includes('permission')) {
              throw new Error('You do not have edit access to this sheet. Make sure the sheet is owned by your account or shared with edit permissions.');
            } else if (errorMsg.includes('404')) {
              throw new Error('Sheet not found. Double check the URL is correct and that the sheet still exists.');
            } else if (errorMsg.startsWith('Cannot access sheet:')) {
              throw verifyError;
            } else {
              throw new Error(`Cannot access sheet: ${errorMsg}`);
            }
          }

          saveNewSheetBtn.textContent = 'Saving...';

          // Phase 3.13: Save to StateManager
          debug('[Sheet Change] Saving sheet to StateManager');
          await window.StateManager.set({
            sheetId: sheetId,
            sheetUrl: url
          });

          // Reload sheet page to show updated connected state
          await loadSheetPage();

          // Update user header
          updateUserHeader(googleEmail, !!itemId, true);

          // Update home page if it's loaded
          await loadHomePage();
        } catch (error) {
          // Phase 3.14: Check for authentication errors
          if (error.isAuthError || error.name === 'AuthenticationError') {
            debug('[Sheet Change] Auth error detected, showing welcome page for re-authentication');
            saveNewSheetBtn.disabled = false;
            saveNewSheetBtn.textContent = 'Save Sheet';
            showReAuthPage();
            return;
          }

          // Show error in UI instead of alert
          const errorBanner = document.getElementById('sheetChangeErrorBanner');
          const errorDetail = document.getElementById('sheetChangeErrorDetail');
          if (errorBanner && errorDetail) {
            errorDetail.textContent = error.message;
            errorBanner.classList.remove('hidden');

            // Auto-hide after 8 seconds (consistent with sync errors)
            setTimeout(() => {
              if (errorBanner) errorBanner.classList.add('hidden');
            }, 8000);
          }

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
      // Phase 3.13.1: Clear all sheet-related state including cached name
      await window.StateManager.set({
        sheetId: null,
        sheetUrl: null,
        sheetName: null,
        sheetOwner: null,
        sheetLastWrite: null
      });

      // Reload the sheet page to show disconnected state
      await loadSheetPage();

      // Update user header to reflect disconnected state
      // Phase 3.13: Use StateManager
      const stateManager = window.StateManager;
      updateUserHeader(stateManager.get('googleEmail'), !!stateManager.get('itemId'), false);
    }
  });

  // Settings page event listeners
  if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);
  if (saveSettingsBtn) saveSettingsBtn.addEventListener('click', handleSaveSettings);
}

/**
 * Load Settings page
 */
async function loadSettingsPage() {
  debug('[Settings] Loading settings page');

  // Phase 3.13: Use StateManager
  const stateManager = window.StateManager;
  const googleEmail = stateManager.get('googleEmail');
  const googlePicture = stateManager.get('googlePicture');

  // Update user email
  if (settingsUserEmail && googleEmail) {
    settingsUserEmail.textContent = googleEmail;
  }

  // Update user picture/initial
  if (googlePicture && settingsUserPicture) {
    settingsUserPicture.src = googlePicture;
    settingsUserPicture.style.display = 'block';
    if (settingsUserInitial) settingsUserInitial.style.display = 'none';
  } else if (googleEmail && settingsUserInitial) {
    // Show initial if no picture
    const initial = googleEmail.charAt(0).toUpperCase();
    settingsUserInitial.textContent = initial;
    settingsUserInitial.style.display = 'flex';
    if (settingsUserPicture) settingsUserPicture.style.display = 'none';
  }

  // Load settings from storage
  chrome.storage.sync.get({
    accountsTabName: 'Accounts',
    transactionsTabName: 'Transactions',
    appendOnly: true
  }, (settings) => {
    if (settingsAccountsTabName) settingsAccountsTabName.value = settings.accountsTabName;
    if (settingsTransactionsTabName) settingsTransactionsTabName.value = settings.transactionsTabName;
    if (settingsAppendOnly) settingsAppendOnly.checked = settings.appendOnly;
  });
}

/**
 * Handle save settings
 */
async function handleSaveSettings() {
  debug('[Settings] Saving settings');

  try {
    // Get values from inputs
    const accountsTabName = settingsAccountsTabName?.value || 'Accounts';
    const transactionsTabName = settingsTransactionsTabName?.value || 'Transactions';
    const appendOnly = settingsAppendOnly?.checked ?? true;

    // Save to storage
    await chrome.storage.sync.set({
      accountsTabName,
      transactionsTabName,
      appendOnly
    });

    // Show success message
    if (settingsStatusMessage) {
      settingsStatusMessage.textContent = '✓ Settings saved successfully';
      settingsStatusMessage.className = 'success';
      settingsStatusMessage.classList.remove('hidden');

      // Hide after 3 seconds
      setTimeout(() => {
        settingsStatusMessage.classList.add('hidden');
      }, 3000);
    }

    debug('[Settings] ✓ Settings saved:', { accountsTabName, transactionsTabName, appendOnly });
  } catch (error) {
    console.error('[Settings] Error saving settings:', error);

    // Show error message
    if (settingsStatusMessage) {
      settingsStatusMessage.textContent = '✗ Error saving settings';
      settingsStatusMessage.className = 'error';
      settingsStatusMessage.classList.remove('hidden');

      setTimeout(() => {
        settingsStatusMessage.classList.add('hidden');
      }, 3000);
    }
  }
}

/**
 * Handle logout
 */
async function handleLogout() {
  if (!confirm('Are you sure you want to sign out? This will clear all your data.')) {
    return;
  }

  debug('[Settings] Logging out');

  // Phase 3.13.1: Debug - log state before clear
  debug('[Logout] State before clear:', {
    itemId: window.StateManager.get('itemId'),
    sheetId: window.StateManager.get('sheetId'),
    institutionName: window.StateManager.get('institutionName')
  });

  // Phase 3.13: Use StateManager to clear all state (preserves onboarding flag)
  await window.StateManager.clear(true);

  // Phase 3.13.1: Debug - verify storage is actually cleared
  const afterClear = await chrome.storage.sync.get(['itemId', 'sheetId', 'institutionName', 'hasCompletedInitialOnboarding']);
  debug('[Logout] Storage after clear:', afterClear);

  // Clear localStorage
  localStorage.clear();

  // Reload the extension to show welcome screen
  window.location.reload();
}

