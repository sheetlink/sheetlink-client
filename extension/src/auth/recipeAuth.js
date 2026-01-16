/**
 * Recipe-specific authentication module
 * Uses the existing web OAuth flow to request Apps Script scope
 */

const RECIPE_SCOPE = 'https://www.googleapis.com/auth/script.projects';
const RECIPE_ENABLED_KEY = 'recipesEnabled';

/**
 * Check if user has granted recipe OAuth scope
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
 * Opens a new OAuth flow with the Apps Script scope included
 */
export async function requestRecipePermissions() {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({
      type: 'REQUEST_RECIPE_SCOPE'
    }, (response) => {
      if (response && response.success) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
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
 * Uses the existing Google access token
 */
export async function getRecipeAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: 'GET_AUTH_TOKEN' },
      (response) => {
        if (response && response.token) {
          resolve(response.token);
        } else {
          reject(new Error('Failed to get Apps Script authorization. Please try again.'));
        }
      }
    );
  });
}

/**
 * Revoke recipe permissions
 */
export async function revokeRecipePermissions() {
  try {
    await chrome.storage.local.set({ [RECIPE_ENABLED_KEY]: false });
    return true;
  } catch (error) {
    console.error('[recipeAuth] Error revoking permissions:', error);
    return false;
  }
}
