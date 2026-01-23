/**
 * Recipe Marketplace UI Component
 * Main UI for browsing and installing recipes
 */

import { fetchRecipeList, fetchRecipeMetadata } from './fetcher.js';
import { installRecipe, getInstalledRecipeIds } from './installer.js';
import { hasRecipePermissions } from '../auth/recipeAuth.js';

export class RecipeMarketplace {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.recipes = [];
    this.installedRecipeIds = [];
    this.filter = 'all';
  }

  async init() {
    try {
      await this.loadRecipes();
      await this.loadInstalledRecipes();
      this.render();
    } catch (error) {
      this.renderError(error.message);
    }
  }

  async loadRecipes() {
    this.recipes = await fetchRecipeList();
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
    if (this.filter === 'official') {
      return this.recipes.filter(r => r.type === 'official');
    } else if (this.filter === 'community') {
      return this.recipes.filter(r => r.type === 'community');
    }
    // 'all' shows everything
    return this.recipes;
  }

  render() {
    const html = `
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
          <button class="filter-btn ${this.filter === 'community' ? 'active' : ''}"
                  data-filter="community">Community</button>
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
    const authorInfo = recipe.type === 'community' && recipe.githubUser ? ` <span class="recipe-author">by @${recipe.githubUser}</span>` : '';

    return `
      <div class="recipe-card ${isInstalled ? 'installed' : ''}" data-recipe-id="${recipe.id}" data-recipe-source="${recipe.source || recipe.type}">
        <div class="recipe-card-header">
          <h3>${recipe.menuName || recipe.name}${authorInfo}</h3>
          <span class="${badgeClass}">${badgeText}</span>
        </div>
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-stats">
          <span>📥 ${recipe.installs || 0} installs</span>
        </div>
        <div class="recipe-actions">
          <button class="btn-secondary view-code" data-recipe-id="${recipe.id}" data-recipe-source="${recipe.source || recipe.type}">
            View Code
          </button>
          <button class="btn-primary install-recipe"
                  data-recipe-id="${recipe.id}">
            ${isInstalled ? 'Reinstall' : 'Install'}
          </button>
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

    // View code buttons
    this.container.querySelectorAll('.view-code').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const recipeId = e.target.dataset.recipeId;
        const recipeSource = e.target.dataset.recipeSource || 'official';
        const folder = recipeSource === 'community' ? 'community' : 'official';
        const url = `https://github.com/sheetlink/sheetlink-recipes/tree/main/recipes/${folder}/${recipeId}`;
        chrome.tabs.create({ url });
      });
    });

    // Install buttons
    this.container.querySelectorAll('.install-recipe').forEach(btn => {
      btn.addEventListener('click', (e) => this.handleInstall(e.target.dataset.recipeId));
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
    const actions = card.querySelector('.recipe-actions');
    const verb = wasInstalled ? 'Reinstalled' : 'Installed';
    actions.innerHTML = `
      <div class="success-message">
        ✅ ${verb}! Refresh your spreadsheet to use.
      </div>
    `;
  }

  showInstallError(recipeId, message) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    const actions = card.querySelector('.recipe-actions');
    actions.innerHTML = `
      <div class="error-message">❌ ${message}</div>
      <button class="btn-primary install-recipe" data-recipe-id="${recipeId}">
        Retry
      </button>
    `;
    this.attachEventListeners();
  }
}
