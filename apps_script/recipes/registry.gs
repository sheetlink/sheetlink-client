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
    description: "Creates a live monthly budget using Plaid's AI-enhanced categories",
    version: "1.0.0",
    entry: runBudgetRecipe,
    outputTabs: ["Budget_Config", "Budget_Monthly", "Budget_Variance"]
  },

  cashflow: {
    name: "Weekly Cash Flow Forecast",
    description: "Creates a rolling weekly cash flow view using historical data",
    version: "1.0.0",
    entry: runCashFlowRecipe,
    outputTabs: ["CashFlow_Config", "CashFlow_Weekly"]
  },

  recurring: {
    name: "Recurring Spend Detector",
    description: "Identifies likely subscriptions and recurring charges",
    version: "1.0.0",
    entry: runRecurringRecipe,
    outputTabs: ["Recurring_Detected", "Recurring_Config"]
  },

  ledger: {
    name: "Account-Aware Ledger View",
    description: "Transforms transactions into a traditional accounting ledger",
    version: "1.0.0",
    entry: runLedgerRecipe,
    outputTabs: ["Ledger_View", "Ledger_Config"]
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
