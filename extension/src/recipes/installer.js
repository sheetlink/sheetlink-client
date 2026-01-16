/**
 * Recipe installer module
 * Installs recipes to user's Apps Script project using Apps Script API
 */

import { ensureRecipePermissions, getRecipeAuthToken } from '../auth/recipeAuth.js';
import { fetchRecipeCode } from './fetcher.js';

const SCRIPT_API_BASE = 'https://script.googleapis.com/v1';

/**
 * Get or create Apps Script project for spreadsheet
 */
async function getOrCreateScriptProject(spreadsheetId, token) {
  try {
    // List existing projects to find container-bound script
    const listUrl = `${SCRIPT_API_BASE}/projects?pageSize=100`;
    const listResponse = await fetch(listUrl, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!listResponse.ok) throw new Error(`HTTP ${listResponse.status}`);
    const { projects = [] } = await listResponse.json();

    // Find project bound to this spreadsheet
    const existing = projects.find(p => p.parentId === spreadsheetId);
    if (existing) return existing.scriptId;

    // Create new container-bound script
    const createUrl = `${SCRIPT_API_BASE}/projects`;
    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: 'SheetLink Recipes',
        parentId: spreadsheetId
      })
    });

    if (!createResponse.ok) throw new Error(`HTTP ${createResponse.status}`);
    const project = await createResponse.json();
    return project.scriptId;
  } catch (error) {
    console.error('[installer] Error getting/creating project:', error);
    throw new Error('Failed to access Apps Script project');
  }
}

/**
 * Update script project with recipe code
 */
async function updateScriptProject(scriptId, files, token) {
  try {
    const url = `${SCRIPT_API_BASE}/projects/${scriptId}/content`;
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ files })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('[installer] Error updating project:', error);
    throw error;
  }
}

/**
 * Install recipe to spreadsheet
 */
export async function installRecipe(recipeId, spreadsheetId, onProgress) {
  try {
    // Step 1: Ensure permissions
    onProgress?.('Checking permissions...');
    const hasPermission = await ensureRecipePermissions();
    if (!hasPermission) {
      throw new Error('Recipe installation requires Apps Script permissions');
    }

    // Step 2: Get auth token
    onProgress?.('Authenticating...');
    const token = await getRecipeAuthToken();

    // Step 3: Get or create script project
    onProgress?.('Setting up Apps Script project...');
    const scriptId = await getOrCreateScriptProject(spreadsheetId, token);

    // Step 4: Fetch recipe code
    onProgress?.('Downloading recipe...');
    const recipeFile = await fetchRecipeCode(recipeId);

    // Step 5: Install to project
    onProgress?.('Installing recipe...');
    await updateScriptProject(scriptId, [recipeFile], token);

    onProgress?.('Complete!');
    return { success: true, scriptId };
  } catch (error) {
    console.error(`[installer] Error installing ${recipeId}:`, error);
    throw error;
  }
}
