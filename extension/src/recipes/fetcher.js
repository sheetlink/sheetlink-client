/**
 * Recipe fetching module
 * Fetches recipe metadata and code from GitHub
 */

const GITHUB_BASE = 'https://raw.githubusercontent.com/sheetlink/sheetlink-recipes/main';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour

/**
 * Fetch recipe list from GitHub
 */
export async function fetchRecipeList() {
  try {
    const url = `${GITHUB_BASE}/manifest.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const manifest = await response.json();
    return manifest.recipes || [];
  } catch (error) {
    console.error('[fetcher] Error fetching recipe list:', error);
    throw new Error('Failed to load recipes. Check your internet connection.');
  }
}

/**
 * Fetch specific recipe metadata
 */
export async function fetchRecipeMetadata(recipeId) {
  try {
    const url = `${GITHUB_BASE}/recipes/official/${recipeId}/metadata.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return await response.json();
  } catch (error) {
    console.error(`[fetcher] Error fetching metadata for ${recipeId}:`, error);
    throw new Error(`Failed to load recipe details for ${recipeId}`);
  }
}

/**
 * Fetch recipe code
 */
export async function fetchRecipeCode(recipeId) {
  try {
    const url = `${GITHUB_BASE}/recipes/official/${recipeId}/recipe.gs`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    let code = await response.text();

    // Remove any existing onOpen() function from the recipe
    // The menu system will provide its own onOpen()
    code = code.replace(/function\s+onOpen\s*\([^)]*\)\s*\{[^}]*\}/g, '');

    // Wrap the code to add a standardized function name for the menu
    // The menu expects run_<recipe_id> format (e.g., run_financial_statements)
    const menuFunctionName = `run_${recipeId.replace(/-/g, '_')}`;

    // Find the main function in the recipe (usually starts with 'function run')
    // and create an alias for the menu system
    const wrappedCode = `${code}

/**
 * Menu entry point for ${recipeId}
 * Called from SheetLink Recipes menu
 */
function ${menuFunctionName}() {
  // Find and call the main recipe function
  // Most recipes export a function starting with 'run'
  if (typeof runFinancialStatements === 'function') return runFinancialStatements();
  if (typeof runBudgetTracker === 'function') return runBudgetTracker();
  if (typeof runCashFlow === 'function') return runCashFlow();
  if (typeof runRecurringAnalysis === 'function') return runRecurringAnalysis();
  if (typeof runBudgetByAccount === 'function') return runBudgetByAccount();

  // Fallback: show error
  SpreadsheetApp.getUi().alert('Recipe function not found. Please reinstall this recipe.');
}`;

    return {
      name: 'recipe',
      type: 'SERVER_JS',
      source: wrappedCode
    };
  } catch (error) {
    console.error(`[fetcher] Error fetching code for ${recipeId}:`, error);
    throw new Error(`Failed to load recipe code for ${recipeId}`);
  }
}
