// options.js - Options page controller

import { CONFIG } from '../config.js';

// Default settings
const DEFAULT_SETTINGS = {
  accountsTabName: 'Accounts',
  transactionsTabName: 'Transactions',
  rulesTabName: 'Rules',
  enableRulesTab: false,
  enableMLAssist: false,
  mlConfidenceThreshold: 0.7,
  appendOnly: true,
  backendUrl: CONFIG.BACKEND_URL
};

// DOM elements
let accountsTabNameInput, transactionsTabNameInput, rulesTabNameInput;
let enableRulesTabCheckbox, enableMLAssistCheckbox, appendOnlyCheckbox;
let backendUrlInput;
let saveBtn, resetBtn;
let statusMessage;

// Initialize
document.addEventListener('DOMContentLoaded', async () => {
  initializeElements();
  attachEventListeners();
  await loadSettings();
});

function initializeElements() {
  // Inputs
  accountsTabNameInput = document.getElementById('accountsTabName');
  transactionsTabNameInput = document.getElementById('transactionsTabName');
  rulesTabNameInput = document.getElementById('rulesTabName');
  enableRulesTabCheckbox = document.getElementById('enableRulesTab');
  enableMLAssistCheckbox = document.getElementById('enableMLAssist');
  appendOnlyCheckbox = document.getElementById('appendOnly');
  backendUrlInput = document.getElementById('backendUrl');

  // Buttons
  saveBtn = document.getElementById('saveBtn');
  resetBtn = document.getElementById('resetBtn');

  // Status
  statusMessage = document.getElementById('statusMessage');
}

function attachEventListeners() {
  saveBtn.addEventListener('click', handleSave);
  resetBtn.addEventListener('click', handleReset);
}

// Load settings from storage
async function loadSettings() {
  try {
    const settings = await chrome.storage.sync.get(Object.keys(DEFAULT_SETTINGS));
    
    // Merge with defaults
    const mergedSettings = { ...DEFAULT_SETTINGS, ...settings };
    
    // Populate form
    accountsTabNameInput.value = mergedSettings.accountsTabName;
    transactionsTabNameInput.value = mergedSettings.transactionsTabName;
    rulesTabNameInput.value = mergedSettings.rulesTabName;
    enableRulesTabCheckbox.checked = mergedSettings.enableRulesTab;
    enableMLAssistCheckbox.checked = mergedSettings.enableMLAssist;
    appendOnlyCheckbox.checked = mergedSettings.appendOnly;
    backendUrlInput.value = mergedSettings.backendUrl;
  } catch (error) {
    showStatus('Failed to load settings', 'error');
  }
}

// Handle Save button
async function handleSave() {
  try {
    // Validate inputs
    const backendUrl = backendUrlInput.value.trim();
    if (backendUrl && !isValidUrl(backendUrl)) {
      showStatus('Invalid backend URL', 'error');
      return;
    }

    // Collect settings
    const settings = {
      accountsTabName: accountsTabNameInput.value.trim() || DEFAULT_SETTINGS.accountsTabName,
      transactionsTabName: transactionsTabNameInput.value.trim() || DEFAULT_SETTINGS.transactionsTabName,
      rulesTabName: rulesTabNameInput.value.trim() || DEFAULT_SETTINGS.rulesTabName,
      enableRulesTab: enableRulesTabCheckbox.checked,
      enableMLAssist: enableMLAssistCheckbox.checked,
      mlConfidenceThreshold: DEFAULT_SETTINGS.mlConfidenceThreshold,
      appendOnly: appendOnlyCheckbox.checked,
      backendUrl: backendUrl || DEFAULT_SETTINGS.backendUrl
    };

    // Save to storage
    await chrome.storage.sync.set(settings);
    
    showStatus('Settings saved successfully', 'success');
    
    // Auto-hide success message after 3 seconds
    setTimeout(() => {
      hideStatus();
    }, 3000);
  } catch (error) {
    showStatus('Failed to save settings: ' + error.message, 'error');
  }
}

// Handle Reset button
async function handleReset() {
  if (!confirm('Reset all settings to defaults?')) {
    return;
  }

  try {
    // Clear all settings
    await chrome.storage.sync.remove(Object.keys(DEFAULT_SETTINGS));
    
    // Reload form with defaults
    await loadSettings();
    
    showStatus('Settings reset to defaults', 'success');
    
    setTimeout(() => {
      hideStatus();
    }, 3000);
  } catch (error) {
    showStatus('Failed to reset settings: ' + error.message, 'error');
  }
}

// Utility functions
function isValidUrl(string) {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

function showStatus(message, type) {
  statusMessage.textContent = message;
  statusMessage.className = `status-message ${type}`;
}

function hideStatus() {
  statusMessage.className = 'status-message';
}
