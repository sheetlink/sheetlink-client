/**
 * Recipe-specific authentication module
 * Uses the existing web OAuth flow to request Apps Script scope
 */

const RECIPE_SCOPE = 'https://www.googleapis.com/auth/script.projects';
const RECIPE_ENABLED_KEY = 'recipesEnabled';

/**
 * Generate a random nonce for OpenID Connect
 */
function generateNonce() {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Check if user has granted recipe OAuth scope
 */
export async function hasRecipePermissions() {
  try {
    // Check both local and sync storage (belt and suspenders approach)
    const localResult = await chrome.storage.local.get(RECIPE_ENABLED_KEY);
    const syncResult = await chrome.storage.sync.get(RECIPE_ENABLED_KEY);

    console.log('[recipeAuth] Checking permissions - local storage:', localResult);
    console.log('[recipeAuth] Checking permissions - sync storage:', syncResult);

    const hasPermission = localResult[RECIPE_ENABLED_KEY] === true || syncResult[RECIPE_ENABLED_KEY] === true;
    console.log('[recipeAuth] Has permission:', hasPermission);
    return hasPermission;
  } catch (error) {
    console.error('[recipeAuth] Error checking permissions:', error);
    return false;
  }
}

/**
 * Request recipe OAuth scope from user
 * Opens Google OAuth with Apps Script scope
 */
export async function requestRecipePermissions() {
  try {
    console.log('[recipeAuth] Opening OAuth flow for Apps Script scope...');

    // Build Google OAuth URL with Apps Script scope
    const clientId = '967710910027-qq2tuel7vsi2i06h4h096hbvok8kfmhk.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3002/oauth/callback';
    const scope = [
      'openid',
      'email',
      'profile',
      'https://www.googleapis.com/auth/spreadsheets',
      'https://www.googleapis.com/auth/script.projects'  // Apps Script scope for recipes
    ].join(' ');

    // Generate nonce for OpenID Connect (required for id_token)
    const nonce = generateNonce();
    console.log('[recipeAuth] Generated nonce for OAuth flow');

    // Include extension ID and recipe scope flag in state parameter (required by OAuth callback page)
    // Must be JSON format: { extension_id: "...", recipe_scope: true }
    const stateObj = {
      extension_id: chrome.runtime.id,
      recipe_scope: true
    };
    const state = JSON.stringify(stateObj);
    console.log('[recipeAuth] State parameter:', state);

    const oauthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${encodeURIComponent(clientId)}&` +
      `redirect_uri=${encodeURIComponent(redirectUri)}&` +
      `response_type=token id_token&` +
      `scope=${encodeURIComponent(scope)}&` +
      `nonce=${encodeURIComponent(nonce)}&` +  // Required for id_token
      `state=${encodeURIComponent(state)}&` +  // Extension ID + recipe flag
      `prompt=consent`;  // Force consent screen to get new scopes

    // Open OAuth popup
    const width = 500;
    const height = 600;
    const left = (screen.width / 2) - (width / 2);
    const top = (screen.height / 2) - (height / 2);

    window.open(
      oauthUrl,
      'GoogleAuth',
      `width=${width},height=${height},left=${left},top=${top}`
    );

    // Wait for recipesEnabled to be set
    return new Promise((resolve) => {
      const checkInterval = setInterval(async () => {
        const hasPermission = await hasRecipePermissions();
        if (hasPermission) {
          clearInterval(checkInterval);
          console.log('[recipeAuth] Recipe permissions granted');
          resolve(true);
        }
      }, 500); // Check every 500ms

      // Timeout after 2 minutes
      setTimeout(() => {
        clearInterval(checkInterval);
        console.warn('[recipeAuth] Timeout waiting for recipe permissions');
        resolve(false);
      }, 120000);
    });
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
