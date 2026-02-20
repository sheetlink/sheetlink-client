/**
 * Recipe Marketplace UI Component
 * Main UI for browsing and installing recipes
 */

import { fetchRecipeList, fetchRecipeMetadata } from './fetcher.js';
import { installRecipe, uninstallRecipe, getInstalledRecipeIds } from './installer.js';
import { hasRecipePermissions } from '../auth/recipeAuth.js';

export class RecipeMarketplace {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.recipes = [];
    this.installedRecipeIds = [];
    this.filter = 'all';
    this.hideInstalled = false;
  }

  async init() {
    try {
      await this.loadRecipes();
      await this.loadInstallCounts();
      await this.loadInstalledRecipes();
      this.render();
    } catch (error) {
      this.renderError(error.message);
    }
  }

  async loadRecipes() {
    this.recipes = await fetchRecipeList();
  }

  async loadInstallCounts() {
    try {
      const response = await fetch('https://api.sheetlink.app/api/recipes/installs');
      if (response.ok) {
        const data = await response.json();
        // Merge install counts into recipe list
        this.recipes = this.recipes.map(recipe => ({
          ...recipe,
          installs: data.installs[recipe.id] || 0
        }));
        console.log('[RecipeMarketplace] Loaded install counts from backend');
      }
    } catch (error) {
      console.warn('[RecipeMarketplace] Failed to load install counts, using defaults:', error);
      // Silent fail - use installs from manifest if backend unavailable
    }
  }

  async loadInstalledRecipes() {
    // Get current spreadsheet ID
    const { sheetId } = await chrome.storage.sync.get('sheetId');
    if (sheetId) {
      this.installedRecipeIds = await getInstalledRecipeIds(sheetId);
      console.log('[RecipeMarketplace] Installed recipes:', this.installedRecipeIds);
    }
  }

  getFilteredRecipes() {
    let filtered = this.recipes;

    // Apply tab filter
    if (this.filter === 'official') {
      filtered = filtered.filter(r => r.type === 'official');
    } else if (this.filter === 'installed') {
      filtered = filtered.filter(r => this.installedRecipeIds.includes(r.id));
    }
    // 'all' shows everything

    // Apply hide installed toggle
    if (this.hideInstalled) {
      filtered = filtered.filter(r => !this.installedRecipeIds.includes(r.id));
    }

    return filtered;
  }

  render() {
    const html = `
      <style>
        .hide-installed-toggle .toggle .slider::before {
          content: "";
          position: absolute;
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
        }
        .hide-installed-toggle .toggle input:checked + .slider {
          background-color: #0B703A !important;
        }
        .hide-installed-toggle .toggle input:checked + .slider::before {
          transform: translateX(20px);
        }
      </style>
      <div class="recipe-marketplace">
        <div class="recipe-header">
          <h2>Recipe Marketplace</h2>
          <p>Install analysis recipes to your spreadsheet</p>
        </div>

        <div class="recipe-filters">
          <button class="filter-btn ${this.filter === 'all' ? 'active' : ''}"
                  data-filter="all">All</button>
          <button class="filter-btn ${this.filter === 'official' ? 'active' : ''}"
                  data-filter="official">Official</button>
          <button class="filter-btn ${this.filter === 'installed' ? 'active' : ''}"
                  data-filter="installed">Installed</button>
        </div>

        <div class="hide-installed-toggle">
          <label style="display: flex; align-items: center; gap: 10px; cursor: pointer; user-select: none;">
            <div class="toggle" style="position: relative; width: 44px; height: 24px; flex-shrink: 0;">
              <input type="checkbox" id="hideInstalledCheckbox" ${this.hideInstalled ? 'checked' : ''} style="opacity: 0; width: 0; height: 0;">
              <span class="slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #d1d5db; transition: 0.3s; border-radius: 24px;"></span>
            </div>
            <span style="font-size: 14px; color: #6b7280; font-weight: 500;">Hide installed</span>
          </label>
        </div>

        <div class="recipe-list">
          ${this.getFilteredRecipes().map(r => this.renderRecipeCard(r)).join('')}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  renderRecipeCard(recipe) {
    const isInstalled = this.installedRecipeIds.includes(recipe.id);
    const badgeClass = recipe.type === 'community' ? 'recipe-badge-community' : 'recipe-badge';
    const badgeText = recipe.type === 'community' ? 'COMMUNITY' : 'OFFICIAL';
    const authorInfo = recipe.type === 'community' && recipe.githubUser ? `<div class="recipe-author">by @${recipe.githubUser}</div>` : '';

    // Strip emojis from recipe name
    const recipeName = (recipe.menuName || recipe.name).replace(/[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Component}]/gu, '').trim();

    return `
      <div class="recipe-card ${isInstalled ? 'installed' : ''}" data-recipe-id="${recipe.id}" data-recipe-source="${recipe.source || recipe.type}">
        <div class="recipe-card-header">
          <h3>${recipeName}</h3>
          <span class="${badgeClass}">${badgeText}</span>
        </div>
        ${authorInfo}
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-stats">
          <span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" x2="12" y1="15" y2="3"/>
            </svg>
            ${recipe.installs || 0} installs
          </span>
          <a href="#" class="view-code-link" data-recipe-id="${recipe.id}" data-recipe-source="${recipe.source || recipe.type}">
            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
            View Code
          </a>
        </div>
        <div class="recipe-actions">
          ${isInstalled ? `
            <button class="btn-primary install-recipe" data-recipe-id="${recipe.id}">
              Reinstall
            </button>
            <button class="btn-secondary uninstall-recipe" data-recipe-id="${recipe.id}">
              Uninstall
            </button>
          ` : `
            <button class="btn-primary install-recipe" data-recipe-id="${recipe.id}">
              Install
            </button>
          `}
        </div>
      </div>
    `;
  }

  renderError(message) {
    this.container.innerHTML = `
      <div class="error-state">
        <p>❌ ${message}</p>
        <button class="btn-primary" onclick="location.reload()">Retry</button>
      </div>
    `;
  }

  attachEventListeners() {
    // Filter buttons
    this.container.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.filter = e.target.dataset.filter;
        this.render();
      });
    });

    // Hide installed toggle - FIX: Don't re-render entire component to preserve animation
    const hideInstalledCheckbox = this.container.querySelector('#hideInstalledCheckbox');
    if (hideInstalledCheckbox) {
      hideInstalledCheckbox.addEventListener('change', (e) => {
        this.hideInstalled = e.target.checked;

        // Only update recipe list, not entire component
        const recipeList = this.container.querySelector('.recipe-list');
        if (recipeList) {
          recipeList.innerHTML = this.getFilteredRecipes()
            .map(r => this.renderRecipeCard(r))
            .join('');

          // Re-attach only recipe card listeners
          this.attachRecipeCardListeners();
        }
      });
    }

    this.attachRecipeCardListeners();
  }

  attachRecipeCardListeners() {
    // View code links
    this.container.querySelectorAll('.view-code-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const recipeId = e.currentTarget.dataset.recipeId;
        const recipeSource = e.currentTarget.dataset.recipeSource || 'official';
        const folder = recipeSource === 'community' ? 'community' : 'official';
        const url = `https://github.com/sheetlink/sheetlink-recipes/tree/main/recipes/${folder}/${recipeId}`;
        chrome.tabs.create({ url });
      });
    });

    // Install buttons
    this.container.querySelectorAll('.install-recipe').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleInstall(e.target.dataset.recipeId));
    });

    // Uninstall buttons
    this.container.querySelectorAll('.uninstall-recipe').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleUninstall(e.target.dataset.recipeId));
    });
  }

  async handleInstall(recipeId) {
    try {
      // Get current spreadsheet ID (stored as 'sheetId' in chrome.storage.sync)
      const { sheetId } = await chrome.storage.sync.get('sheetId');
      if (!sheetId) {
        alert('Please select a spreadsheet first.\n\nGo to the "Sheet" tab to create or select a spreadsheet.');
        return;
      }

      // Check permissions
      const hasPerm = await hasRecipePermissions();
      if (!hasPerm) {
        const consent = confirm(
          'Recipe installation requires additional permissions to access your Apps Script projects.\n\n' +
          'This is safe and only used to install code. Would you like to enable recipes?'
        );
        if (!consent) return;
      }

      // Check if already installed BEFORE starting
      const wasInstalled = this.installedRecipeIds.includes(recipeId);

      // Show progress
      this.showProgress(recipeId);

      // Install
      await installRecipe(recipeId, sheetId, (status) => {
        this.updateProgress(recipeId, status);
      });

      // Refresh installed recipes list
      await this.loadInstalledRecipes();

      // Show success
      this.showSuccess(recipeId, wasInstalled);
    } catch (error) {
      this.showInstallError(recipeId, error.message);
    }
  }

  showProgress(recipeId) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    card.classList.add('installing-state');
    const actions = card.querySelector('.recipe-actions');
    const isInstalled = this.installedRecipeIds.includes(recipeId);
    const verb = isInstalled ? 'Reinstalling' : 'Installing';
    actions.innerHTML = `<div class="installing">${verb}...</div>`;
  }

  updateProgress(recipeId, status) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    const installing = card.querySelector('.installing');
    if (installing) installing.textContent = status;
  }

  showSuccess(recipeId, wasInstalled) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    card.classList.remove('installing-state');
    const actions = card.querySelector('.recipe-actions');
    const verb = wasInstalled ? 'Reinstalled' : 'Installed';
    actions.innerHTML = `
      <div class="success-message">
        ✅ ${verb}! Refresh your spreadsheet to use.
      </div>
    `;
  }

  showInstallError(recipeId, message) {
    // Check if this is a first-time setup error (404 for container-bound script creation)
    const isFirstTimeSetupError = message.includes('Apps Script API setup is still in progress') ||
      message.includes('Requested entity was not found');

    if (isFirstTimeSetupError) {
      this.showFirstTimeSetupModal(recipeId);
      return;
    }

    // Show inline error for other errors
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    card.classList.remove('installing-state');
    const actions = card.querySelector('.recipe-actions');
    actions.innerHTML = `
      <div class="error-message">❌ ${message}</div>
      <button class="btn-primary install-recipe" data-recipe-id="${recipeId}">
        Retry
      </button>
    `;
    this.attachEventListeners();
  }

  showFirstTimeSetupModal(recipeId) {
    // Reset the card to not-installing state
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    if (card) {
      card.classList.remove('installing-state');
      const actions = card.querySelector('.recipe-actions');
      actions.innerHTML = `
        <button class="btn-primary install-recipe" data-recipe-id="${recipeId}">
          Install
        </button>
      `;
    }

    // Create modal overlay
    const modalHTML = `
      <div class="recipe-setup-modal-overlay" id="firstTimeSetupModal">
        <div class="recipe-setup-modal">
          <div class="recipe-setup-modal-header">
            <h3>🔧 First-Time Setup Required</h3>
          </div>
          <div class="recipe-setup-modal-body">
            <p class="setup-intro">
              Before installing recipes, you need to initialize your spreadsheet's Apps Script project.
              This is a <strong>one-time step</strong> that takes about 10 seconds.
            </p>

            <div class="setup-steps">
              <h4>Follow these steps:</h4>
              <ol>
                <li>
                  <strong>Open your spreadsheet</strong> in a new tab
                  <button class="btn-link open-spreadsheet-btn" id="openSpreadsheetBtn">
                    Open Spreadsheet →
                  </button>
                </li>
                <li>
                  In your spreadsheet, click <strong>Extensions → Apps Script</strong>
                </li>
                <li>
                  Wait for the Apps Script editor to load (this creates the project)
                </li>
                <li>
                  Close the Apps Script tab and come back here
                </li>
                <li>
                  Click <strong>"Retry Installation"</strong> below
                </li>
              </ol>
            </div>

            <div class="setup-help">
              <strong>Why is this needed?</strong>
              <p>
                Google's Apps Script API can't create container-bound projects programmatically.
                Opening the Apps Script editor once initializes the project, then SheetLink can
                install recipes automatically.
              </p>
              <a href="https://sheetlink.app/recipes#getting-started" target="_blank" class="setup-docs-link">
                View full setup guide →
              </a>
            </div>
          </div>
          <div class="recipe-setup-modal-footer">
            <button class="btn-secondary" id="setupModalCancelBtn">Cancel</button>
            <button class="btn-primary" id="setupModalRetryBtn">Retry Installation</button>
          </div>
        </div>
      </div>
    `;

    // Inject modal into DOM
    const existingModal = document.getElementById('firstTimeSetupModal');
    if (existingModal) {
      existingModal.remove();
    }
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Attach event listeners
    const modal = document.getElementById('firstTimeSetupModal');
    const cancelBtn = document.getElementById('setupModalCancelBtn');
    const retryBtn = document.getElementById('setupModalRetryBtn');
    const openSpreadsheetBtn = document.getElementById('openSpreadsheetBtn');

    // Cancel button - close modal
    cancelBtn.addEventListener('click', () => {
      modal.remove();
    });

    // Click outside modal to close
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });

    // Open spreadsheet button
    openSpreadsheetBtn.addEventListener('click', async () => {
      const { sheetId } = await chrome.storage.sync.get('sheetId');
      if (sheetId) {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/edit`;
        chrome.tabs.create({ url });
      }
    });

    // Retry button - close modal and retry install
    retryBtn.addEventListener('click', async () => {
      modal.remove();
      await this.handleInstall(recipeId);
    });
  }

  async handleUninstall(recipeId) {
    try {
      // Get current spreadsheet ID
      const { sheetId } = await chrome.storage.sync.get('sheetId');
      if (!sheetId) {
        alert('Please select a spreadsheet first.\n\nGo to the "Sheet" tab to create or select a spreadsheet.');
        return;
      }

      // Confirm uninstall
      const recipe = this.recipes.find(r => r.id === recipeId);
      let recipeName = recipe ? (recipe.menuName || recipe.name) : recipeId;
      // Strip emojis from recipe name
      recipeName = recipeName.replace(/[\p{Emoji}\p{Emoji_Presentation}\p{Emoji_Modifier}\p{Emoji_Component}]/gu, '').trim();
      const confirm = window.confirm(`Are you sure you want to uninstall "${recipeName}"?\n\nThis will remove the recipe from your spreadsheet menu.`);
      if (!confirm) return;

      // Show progress
      this.showUninstallProgress(recipeId);

      // Uninstall
      await uninstallRecipe(recipeId, sheetId, (status) => {
        this.updateProgress(recipeId, status);
      });

      // Refresh installed recipes list
      await this.loadInstalledRecipes();

      // Show success
      this.showUninstallSuccess(recipeId);
    } catch (error) {
      this.showUninstallError(recipeId, error.message);
    }
  }

  showUninstallProgress(recipeId) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    card.classList.add('installing-state');
    const actions = card.querySelector('.recipe-actions');
    actions.innerHTML = `<div class="installing">Uninstalling...</div>`;
  }

  showUninstallSuccess(recipeId) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    card.classList.remove('installing-state');
    const actions = card.querySelector('.recipe-actions');
    actions.innerHTML = `
      <div class="success-message">
        ✅ Uninstalled! Refresh your spreadsheet.
      </div>
    `;

    // After 2 seconds, re-render to show the Install button
    setTimeout(() => {
      this.render();
    }, 2000);
  }

  showUninstallError(recipeId, message) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    card.classList.remove('installing-state');
    const actions = card.querySelector('.recipe-actions');
    actions.innerHTML = `
      <div class="error-message">❌ ${message}</div>
      <button class="btn-secondary uninstall-recipe" data-recipe-id="${recipeId}">
        Retry
      </button>
    `;
    this.attachEventListeners();
  }
}
