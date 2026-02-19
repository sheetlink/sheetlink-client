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
export async function fetchRecipeMetadata(recipeId, recipeSource = 'official') {
  try {
    const folder = recipeSource === 'community' ? 'community' : 'official';
    const url = `${GITHUB_BASE}/recipes/${folder}/${recipeId}/metadata.json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return await response.json();
  } catch (error) {
    // Don't log 404s - they're expected when checking community/official fallback
    throw error;
  }
}

/**
 * Fetch recipe code
 */
export async function fetchRecipeCode(recipeId, recipeSource = 'official') {
  try {
    const folder = recipeSource === 'community' ? 'community' : 'official';
    const url = `${GITHUB_BASE}/recipes/${folder}/${recipeId}/recipe.gs`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    let code = await response.text();

    // Remove any existing onOpen() function from the recipe
    // The menu system will provide its own onOpen()
    code = code.replace(/function\s+onOpen\s*\([^)]*\)\s*\{[^}]*\}/g, '');

    // Remove the utilities section since we have a shared utils.gs file
    // Match from "// UTILITIES (inlined from utils.gs)" to the next major section marker
    code = code.replace(/\/\/ ={40,}\n\/\/ UTILITIES.*?\n\/\/ ={40,}\n[\s\S]*?(?=\/\/ ={40,}\n\/\/ [A-Z]|$)/m, '');

    // Also remove standalone utility constants and functions that duplicate utils.gs
    code = code.replace(/^const TRANSACTIONS_SHEET_NAME = .*?;\n/gm, '');
    code = code.replace(/^function (getOrCreateSheet|getTransactionsSheet|validateTransactionsSheet|formatCurrency|getColumnIndexByHeader|parseDate|formatDate|getMonthKey|clearSheetKeepHeaders)\([\s\S]*?\n\}\n/gm, '');

    // Create menu entry point function name
    const menuFunctionName = `run_${recipeId.replace(/-/g, '_')}`;

    // Find the main run function name (e.g., runFinancialStatements, runBudgetTracker)
    const mainFunctionMatch = code.match(/function\s+(run[A-Z][a-zA-Z]*)\s*\(/);
    const mainFunctionName = mainFunctionMatch ? mainFunctionMatch[1] : null;

    if (!mainFunctionName) {
      console.warn(`[fetcher] Could not find main run function in ${recipeId}`);
    }

    // Add menu entry point that calls the recipe's main function
    const wrappedCode = `// ========================================
// Recipe: ${recipeId}
// ========================================

${code}

/**
 * Menu entry point for ${recipeId}
 * Called from SheetLink Recipes menu
 */
function ${menuFunctionName}() {
  if (typeof ${mainFunctionName} === 'function') {
    return ${mainFunctionName}();
  }

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
