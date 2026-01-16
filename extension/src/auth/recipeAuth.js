/**
 * Recipe-specific authentication module
 * Handles incremental OAuth for Apps Script API access
 */

const RECIPE_PERMISSION = 'https://www.googleapis.com/auth/script.projects';
const RECIPE_ENABLED_KEY = 'recipesEnabled';

/**
 * Check if user has enabled recipe permissions
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
 * Request recipe permissions from user
 */
export async function requestRecipePermissions() {
  try {
    const granted = await chrome.permissions.request({
      permissions: [RECIPE_PERMISSION]
    });

    if (granted) {
      await chrome.storage.local.set({ [RECIPE_ENABLED_KEY]: true });
      return true;
    }
    return false;
  } catch (error) {
    console.error('[recipeAuth] Error requesting permissions:', error);
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
 * Revoke recipe permissions
 */
export async function revokeRecipePermissions() {
  try {
    await chrome.permissions.remove({
      permissions: [RECIPE_PERMISSION]
    });
    await chrome.storage.local.set({ [RECIPE_ENABLED_KEY]: false });
    return true;
  } catch (error) {
    console.error('[recipeAuth] Error revoking permissions:', error);
    return false;
  }
}
