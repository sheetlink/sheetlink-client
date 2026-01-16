/**
 * Recipe Marketplace UI Component
 * Main UI for browsing and installing recipes
 */

import { fetchRecipeList, fetchRecipeMetadata } from './fetcher.js';
import { installRecipe } from './installer.js';
import { hasRecipePermissions } from '../auth/recipeAuth.js';

export class RecipeMarketplace {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.recipes = [];
    this.filter = 'all';
  }

  async init() {
    try {
      await this.loadRecipes();
      this.render();
    } catch (error) {
      this.renderError(error.message);
    }
  }

  async loadRecipes() {
    this.recipes = await fetchRecipeList();
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
                  data-filter="all">All Recipes</button>
          <button class="filter-btn ${this.filter === 'official' ? 'active' : ''}"
                  data-filter="official">Official</button>
          <button class="filter-btn ${this.filter === 'installed' ? 'active' : ''}"
                  data-filter="installed">Installed</button>
        </div>

        <div class="recipe-list">
          ${this.recipes.map(r => this.renderRecipeCard(r)).join('')}
        </div>
      </div>
    `;

    this.container.innerHTML = html;
    this.attachEventListeners();
  }

  renderRecipeCard(recipe) {
    return `
      <div class="recipe-card" data-recipe-id="${recipe.id}">
        <div class="recipe-card-header">
          <h3>${recipe.menuName || recipe.name}</h3>
          <span class="recipe-badge">${recipe.type}</span>
        </div>
        <p class="recipe-description">${recipe.description}</p>
        <div class="recipe-stats">
          <span>📥 ${recipe.installs || 0} installs</span>
        </div>
        <div class="recipe-actions">
          <button class="btn-secondary view-code" data-recipe-id="${recipe.id}">
            View Code
          </button>
          <button class="btn-primary install-recipe" data-recipe-id="${recipe.id}">
            Install
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
        const recipe = this.recipes.find(r => r.id === recipeId);
        const url = `https://github.com/sheetlink/sheetlink-recipes/tree/main/recipes/official/${recipeId}`;
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

      // Show progress
      this.showProgress(recipeId);

      // Install
      await installRecipe(recipeId, sheetId, (status) => {
        this.updateProgress(recipeId, status);
      });

      // Show success
      this.showSuccess(recipeId);
    } catch (error) {
      this.showInstallError(recipeId, error.message);
    }
  }

  showProgress(recipeId) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    const actions = card.querySelector('.recipe-actions');
    actions.innerHTML = '<div class="installing">Installing...</div>';
  }

  updateProgress(recipeId, status) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    const installing = card.querySelector('.installing');
    if (installing) installing.textContent = status;
  }

  showSuccess(recipeId) {
    const card = this.container.querySelector(`[data-recipe-id="${recipeId}"]`);
    const actions = card.querySelector('.recipe-actions');
    actions.innerHTML = `
      <div class="success-message">
        ✅ Installed! Refresh your spreadsheet to use.
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
