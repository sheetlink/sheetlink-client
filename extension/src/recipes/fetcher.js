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

    const code = await response.text();
    return {
      name: 'recipe',
      type: 'SERVER_JS',
      source: code
    };
  } catch (error) {
    console.error(`[fetcher] Error fetching code for ${recipeId}:`, error);
    throw new Error(`Failed to load recipe code for ${recipeId}`);
  }
}
