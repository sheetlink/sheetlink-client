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

    // Wrap the entire recipe in a namespace to avoid variable conflicts
    // Each recipe gets isolated scope for its constants and utility functions
    const menuFunctionName = `run_${recipeId.replace(/-/g, '_')}`;

    // Find the main run function name (e.g., runFinancialStatements, runBudgetTracker)
    const mainFunctionMatch = code.match(/function\s+(run[A-Z][a-zA-Z]*)\s*\(/);
    const mainFunctionName = mainFunctionMatch ? mainFunctionMatch[1] : null;

    if (!mainFunctionName) {
      console.warn(`[fetcher] Could not find main run function in ${recipeId}`);
    }

    // Wrap in namespace to isolate constants and utilities
    const wrappedCode = `
// ========================================
// Recipe: ${recipeId}
// ========================================
(function() {
  // Recipe code with isolated scope
${code.split('\n').map(line => '  ' + line).join('\n')}

  // Export main function to global scope for menu
  if (typeof ${mainFunctionName} !== 'undefined') {
    globalThis.${menuFunctionName} = ${mainFunctionName};
  }
})();

/**
 * Menu entry point for ${recipeId}
 * Called from SheetLink Recipes menu
 */
function ${menuFunctionName}() {
  // Call the exported function from the recipe namespace
  if (typeof globalThis.${menuFunctionName} === 'function') {
    return globalThis.${menuFunctionName}();
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
