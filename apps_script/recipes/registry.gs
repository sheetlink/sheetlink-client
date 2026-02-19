/**
 * SheetLink Recipes Registry
 * Phase 3.23.0 - Recipes Framework
 *
 * Central registry for all available recipes.
 * Each recipe is self-contained and can be executed independently.
 */

const RECIPE_REGISTRY = {
  budget: {
    name: "Plaid Category Budget",
    description: "Multi-month budget tracker with actuals, budget, and variance by category",
    version: "2.1.0",
    entry: runBudgetRecipe,
    outputTabs: ["Budget Monthly", "Budget Monthly (by Account)"]
  },
  cashflow: {
    name: "Weekly Cash Flow Forecast",
    description: "Rolling weekly view with income, expenses, net flow, and ending balance",
    version: "2.0.0",
    entry: runCashFlowRecipe,
    outputTabs: ["CashFlow Weekly"]
  },
  recurring: {
    name: "Subscription & Recurring Spend Detector",
    description: "Identifies subscriptions and recurring charges with annualized costs and monthly trends",
    version: "1.0.0",
    entry: runRecurringRecipe,
    outputTabs: ["Recurring Analysis"]
  },
  ledger: {
    name: "Account-Aware Ledger View",
    description: "Traditional accounting ledger with debit/credit format and transfer detection",
    version: "2.0.0",
    entry: runLedgerRecipe,
    outputTabs: ["Ledger View"]
  },
  financials: {
    name: "Financial Statements Suite",
    description: "Complete formula-driven financial reporting: Chart of Accounts, General Ledger with date-aware balances, consolidated Financial Statements (P&L, Balance Sheet, Cash Flow) with monthly trending",
    version: "2.0.0",
    entry: runFinancialsRecipe,
    outputTabs: ["Chart of Accounts", "General Ledger", "Financial Statements"]
  }
};

/**
 * Get all available recipes
 * @returns {Object} Recipe registry
 */
function getAvailableRecipes() {
  return RECIPE_REGISTRY;
}

/**
 * Get specific recipe by ID
 * @param {string} recipeId - Recipe identifier
 * @returns {Object|null} Recipe object or null if not found
 */
function getRecipe(recipeId) {
  return RECIPE_REGISTRY[recipeId] || null;
}

/**
 * Check if recipe exists
 * @param {string} recipeId - Recipe identifier
 * @returns {boolean}
 */
function recipeExists(recipeId) {
  return recipeId in RECIPE_REGISTRY;
}

/**
 * List all recipe IDs
 * @returns {string[]} Array of recipe IDs
 */
function listRecipeIds() {
  return Object.keys(RECIPE_REGISTRY);
}

/**
 * Get recipe metadata (without entry function)
 * @param {string} recipeId - Recipe identifier
 * @returns {Object|null} Recipe metadata
 */
function getRecipeMetadata(recipeId) {
  const recipe = getRecipe(recipeId);
  if (!recipe) return null;

  return {
    name: recipe.name,
    description: recipe.description,
    version: recipe.version,
    outputTabs: recipe.outputTabs
  };
}
