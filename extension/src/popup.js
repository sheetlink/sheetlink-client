// popup.js - Main UI controller for extension popup

import { CONFIG } from '../config.js';

// Backend API base URL
const BACKEND_URL = CONFIG.BACKEND_URL;

// DOM elements
let connectBankBtn, connectSandboxBtn, saveSheetBtn, syncNowBtn, disconnectBtn, optionsBtn, retryBtn, generateTestBtn, templatesBtn, learnMoreBtn;
let sheetUrlInput, statusText, errorMessage, loadingMessage;
let connectSection, sheetSection, syncSection, statusSection, errorSection, loadingSection, templatesSection, welcomeSection;
let sandboxBadge, sandboxLink, privacyLink, welcomeTitle, welcomeSubtitle, welcomeDescription, headerSubtitle;
let sheetSuccessModal, syncSuccessOpenSheetBtn, syncSuccessViewAccountsBtn;

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
  learnMoreBtn = document.getElementById('learnMoreBtn');
  saveSheetBtn = document.getElementById('saveSheetBtn');
  syncNowBtn = document.getElementById('syncNowBtn');
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
}

function attachEventListeners() {
  if (connectBankBtn) connectBankBtn.addEventListener('click', handleConnectBank);
  if (connectSandboxBtn) connectSandboxBtn.addEventListener('click', handleConnectSandbox);
  if (learnMoreBtn) learnMoreBtn.addEventListener('click', handleLearnMore);
  saveSheetBtn.addEventListener('click', handleSaveSheet);
  syncNowBtn.addEventListener('click', handleSyncNow);
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
    syncSuccessViewAccountsBtn.addEventListener('click', () => {
      hideSheetSuccessModal();
      syncSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
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
    const data = await chrome.storage.sync.get(['itemId', 'sheetId', 'sheetUrl', 'lastSync', 'hasSeenWelcome', 'sheetlink_connection_status']);

    // Check if we should show the success modal
    if (data.sheetlink_connection_status && data.sheetlink_connection_status.justConnected) {
      // Show success modal
      showSuccessModal();

      // Reset the justConnected flag
      await chrome.storage.sync.set({
        sheetlink_connection_status: {
          ...data.sheetlink_connection_status,
          justConnected: false
        }
      });
    }

    // No bank connected: show welcome screen with sandbox messaging
    if (!data.itemId) {
      showSection('welcome');
      return;
    }

    // Bank connected
    showSection('status');
    updateStatus(CONFIG.isSandbox ? CONFIG.currentCopy.connectedInstitution(CONFIG.DEMO_INSTITUTION_NAME) : 'Connected', true);
    disconnectBtn.classList.remove('hidden');

    if (data.sheetId) {
      // Sheet configured
      showSection('sync');
      document.getElementById('currentSheet').textContent =
        data.sheetUrl ? new URL(data.sheetUrl).pathname.split('/')[3].substring(0, 20) + '...' : data.sheetId;

      if (data.lastSync) {
        document.getElementById('lastSync').textContent = new Date(data.lastSync).toLocaleString();
      }

      // Load auto-sync status
      await updateAutoSyncStatus();
      await loadRecentSyncs();
    } else {
      // Need sheet selection
      showSection('sheet');
    }
  } catch (error) {
    showError('Failed to load state');
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
async function handleConnectBank() {
  try {
    showLoading('Connecting to Plaid...');

    const linkToken = await getLinkToken();

    await openPlaidLink(linkToken);

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
    showError('Please enter a Google Sheets URL');
    return;
  }

  try {
    showLoading('Saving sheet...');

    // Extract sheet ID from URL
    const sheetId = extractSheetId(url);
    if (!sheetId) {
      throw new Error('Invalid Google Sheets URL');
    }

    // Save to storage FIRST (before OAuth potentially closes popup)
    await chrome.storage.sync.set({ sheetId, sheetUrl: url });

    // Then verify access to sheet via Google Sheets API
    // (this may trigger OAuth on first use, causing popup to close/reopen)
    if (window.SheetsAPI) {
      await window.SheetsAPI.verifySheetAccess(sheetId);
    }

    hideLoading();
    updateStatus('Sheet saved successfully!', true);
    await loadState();
  } catch (error) {
    hideLoading();
    showError('Failed to save sheet: ' + error.message);
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
  } catch (error) {
    hideLoading();
    showError('Sync failed: ' + error.message);
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

// Backend API calls
async function getLinkToken() {
  // Get or create a unique user ID for this extension installation
  let userData = await chrome.storage.sync.get(['userId']);

  if (!userData.userId) {
    // Generate a unique user ID for this installation
    userData.userId = 'user_' + Math.random().toString(36).substring(2, 15);
    await chrome.storage.sync.set({ userId: userData.userId });
  }

  const response = await fetch(`${BACKEND_URL}/plaid/link-token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_user_id: userData.userId })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`Failed to get link token: ${errorData.detail || response.statusText}`);
  }

  const data = await response.json();
  return data.link_token;
}

async function exchangePublicToken(publicToken) {
  // Get user ID from storage
  const userData = await chrome.storage.sync.get(['userId']);

  const response = await fetch(`${BACKEND_URL}/plaid/exchange`, {
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

// Plaid Link integration - Opens in new tab to avoid CSP restrictions
async function openPlaidLink(linkToken) {
  return new Promise((resolve, reject) => {
    // Open Plaid Link in a new tab (avoids CSP issues in popup)
    const linkUrl = chrome.runtime.getURL(`src/plaid_link.html?link_token=${encodeURIComponent(linkToken)}`);
    chrome.tabs.create({ url: linkUrl });

    // Listen for completion message from service worker
    const messageListener = (message) => {
      if (message.type === 'PLAID_LINK_SUCCESS') {
        chrome.runtime.onMessage.removeListener(messageListener);
        resolve(message.itemId);
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

  // Verify sheet access first
  try {
    await window.SheetsAPI.verifySheetAccess(sheetId);
  } catch (error) {
    throw new Error(`Cannot access sheet. Make sure you have edit permissions: ${error.message}`);
  }

  // Write accounts data
  if (data.accounts && data.accounts.length > 0) {
    await window.SheetsAPI.writeAccounts(sheetId, data.accounts);
  }

  // Always write transactions tab (creates tab even if no transactions)
  const transactionsData = data.transactions || [];
  const newCount = await window.SheetsAPI.writeTransactions(sheetId, transactionsData);

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

// ===== Success Modal Functions =====

function showSuccessModal() {
  const modal = document.getElementById('connectionSuccessModal');
  if (modal) {
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
        syncSuccessOpenSheetBtn.title = 'Add your Google Sheet URL first';
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
