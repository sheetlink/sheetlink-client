/**
 * Recipe-specific authentication module
 * Handles incremental OAuth for Apps Script API access
 */

const RECIPE_SCOPE = 'https://www.googleapis.com/auth/script.projects';
const RECIPE_ENABLED_KEY = 'recipesEnabled';

/**
 * Check if user has granted recipe OAuth scope
 * We check this by attempting to get a token non-interactively
 */
export async function hasRecipePermissions() {
  try {
    const result = await chrome.storage.local.get(RECIPE_ENABLED_KEY);
    return result[RECIPE_ENABLED_KEY] === true;
  } catch (error) {
    console.error('[recipeAuth] Error checking permissions:', error);
    return false;
  }
}

/**
 * Request recipe OAuth scope from user
 * This triggers the OAuth consent screen
 */
export async function requestRecipePermissions() {
  try {
    // Request OAuth token with the Apps Script scope
    // This will show the OAuth consent screen if the user hasn't granted it yet
    const token = await chrome.identity.getAuthToken({
      interactive: true,
      scopes: [RECIPE_SCOPE]
    });

    if (token) {
      // Mark as enabled
      await chrome.storage.local.set({ [RECIPE_ENABLED_KEY]: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error('[recipeAuth] Error requesting OAuth scope:', error);
    return false;
  }
}

/**
 * Ensure recipe permissions, request if needed
 */
export async function ensureRecipePermissions() {
  const hasPermission = await hasRecipePermissions();
  if (hasPermission) return true;

  return await requestRecipePermissions();
}

/**
 * Get an OAuth token with the Apps Script scope
 * This is used by the installer to make API calls
 */
export async function getRecipeAuthToken() {
  try {
    const token = await chrome.identity.getAuthToken({
      interactive: false,  // Don't show UI, should already be granted
      scopes: [RECIPE_SCOPE]
    });
    return token;
  } catch (error) {
    console.error('[recipeAuth] Error getting auth token:', error);
    throw new Error('Failed to get Apps Script authorization. Please try again.');
  }
}

/**
 * Revoke recipe permissions
 */
export async function revokeRecipePermissions() {
  try {
    // Remove the OAuth token
    const token = await chrome.identity.getAuthToken({
      interactive: false,
      scopes: [RECIPE_SCOPE]
    });

    if (token) {
      await chrome.identity.removeCachedAuthToken({ token });
    }

    await chrome.storage.local.set({ [RECIPE_ENABLED_KEY]: false });
    return true;
  } catch (error) {
    console.error('[recipeAuth] Error revoking permissions:', error);
    return false;
  }
}
