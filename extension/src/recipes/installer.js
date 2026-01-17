/**
 * Recipe installer module
 * Installs recipes to user's Apps Script project using Apps Script API
 */

import { ensureRecipePermissions, getRecipeAuthToken } from '../auth/recipeAuth.js';
import { fetchRecipeCode, fetchRecipeMetadata } from './fetcher.js';

const SCRIPT_API_BASE = 'https://script.googleapis.com/v1';

/**
 * Verify spreadsheet access with current token
 */
async function verifySpreadsheetAccess(spreadsheetId, token) {
  try {
    console.log('[installer] Verifying access to spreadsheet:', spreadsheetId);
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=spreadsheetId,properties.title`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('[installer] Spreadsheet access verification failed:', errorBody);
      return false;
    }

    const data = await response.json();
    console.log('[installer] Spreadsheet accessible:', data.properties?.title);
    return true;
  } catch (error) {
    console.error('[installer] Error verifying spreadsheet access:', error);
    return false;
  }
}

/**
 * Test creating a standalone script (diagnostic)
 */
async function testStandaloneScript(token) {
  try {
    console.log('[installer] Testing standalone script creation...');
    const createUrl = `${SCRIPT_API_BASE}/projects`;
    const requestBody = {
      title: 'SheetLink Test Script'
    };

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    if (!createResponse.ok) {
      const errorBody = await createResponse.text();
      console.error('[installer] Standalone test failed:', errorBody);
      return { success: false, error: errorBody };
    }

    const project = await createResponse.json();
    console.log('[installer] Standalone script created successfully:', project.scriptId);
    return { success: true, scriptId: project.scriptId };
  } catch (error) {
    console.error('[installer] Error testing standalone script:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Get or create Apps Script project for spreadsheet
 */
async function getOrCreateScriptProject(spreadsheetId, token) {
  try {
    // Step 1: Check if we already have a script project for this spreadsheet
    const storageKey = `recipeScriptId_${spreadsheetId}`;
    console.log('[installer] Looking for existing project with key:', storageKey);
    const stored = await chrome.storage.local.get(storageKey);
    console.log('[installer] Storage lookup result:', stored);
    console.log('[installer] Stored script ID:', stored[storageKey]);

    if (stored[storageKey]) {
      console.log('[installer] Found existing script project:', stored[storageKey]);

      // Verify the project still exists and is accessible
      try {
        await getProjectContent(stored[storageKey], token);
        console.log('[installer] Existing project verified, reusing it');
        return stored[storageKey];
      } catch (error) {
        console.log('[installer] Stored project no longer accessible, creating new one');
        // Clear the stale script ID
        await chrome.storage.local.remove(storageKey);
        console.log('[installer] Cleared stale scriptId');
        // Fall through to create new project
      }
    }

    // Step 2: Verify we can access the spreadsheet
    const hasAccess = await verifySpreadsheetAccess(spreadsheetId, token);
    if (!hasAccess) {
      throw new Error('Cannot access spreadsheet. Token may not have spreadsheet permissions.');
    }

    // Step 3: Test standalone script creation (diagnostic - only on first install)
    console.log('[installer] Running diagnostic test...');
    const standaloneTest = await testStandaloneScript(token);
    if (!standaloneTest.success) {
      throw new Error(`Apps Script API test failed: ${standaloneTest.error}`);
    }
    console.log('[installer] Diagnostic passed. Apps Script API is accessible.');

    // Step 4: Create container-bound script
    const createUrl = `${SCRIPT_API_BASE}/projects`;
    const requestBody = {
      title: 'SheetLink Recipes',
      parentId: spreadsheetId
    };

    console.log('[installer] Creating container-bound script with:', requestBody);
    console.log('[installer] Token preview:', token?.substring(0, 20) + '...');

    const createResponse = await fetch(createUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log('[installer] Response status:', createResponse.status);
    console.log('[installer] Response headers:', Object.fromEntries(createResponse.headers));

    if (!createResponse.ok) {
      let errorBody;
      try {
        errorBody = await createResponse.json();
        console.error('[installer] Error response (JSON):', errorBody);
      } catch {
        errorBody = await createResponse.text();
        console.error('[installer] Error response (text):', errorBody);
      }

      throw new Error(
        `Failed to create container-bound script (HTTP ${createResponse.status}). ` +
        `Error: ${JSON.stringify(errorBody)}. ` +
        `This may indicate the parentId parameter is not supported or the spreadsheet ID is invalid.`
      );
    }

    const project = await createResponse.json();
    console.log('[installer] Container-bound script created:', project.scriptId);

    // Step 5: Store the script ID for future use
    await chrome.storage.local.set({ [storageKey]: project.scriptId });
    console.log('[installer] Stored script ID for future recipe installations');

    return project.scriptId;
  } catch (error) {
    console.error('[installer] Error getting/creating project:', error);
    throw error;
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
 * Create appsscript.json manifest file
 */
function createManifest() {
  return {
    name: 'appsscript',
    type: 'JSON',
    source: JSON.stringify({
      timeZone: 'America/New_York',
      dependencies: {},
      exceptionLogging: 'STACKDRIVER',
      runtimeVersion: 'V8'
    }, null, 2)
  };
}

/**
 * Create shared utils.gs file with common utilities
 */
function createUtilsFile() {
  const source = `/**
 * SheetLink Recipes - Shared Utilities
 * Common functions used by all recipes
 */

/**
 * Constants
 */
const TRANSACTIONS_SHEET_NAME = "Transactions";

/**
 * Get or create a sheet by name
 * @param {Spreadsheet} ss - Active spreadsheet
 * @param {string} sheetName - Name of sheet to get/create
 * @returns {Sheet} The requested sheet
 */
function getOrCreateSheet(ss, sheetName) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // Move newly created sheet to the end (furthest right)
    sheet.activate();
    ss.moveActiveSheet(ss.getNumSheets());
    Logger.log(\`Created new sheet: \${sheetName}\`);
  }
  return sheet;
}

/**
 * Get transactions sheet
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Sheet|null} Transactions sheet or null if not found
 */
function getTransactionsSheet(ss) {
  return ss.getSheetByName(TRANSACTIONS_SHEET_NAME);
}

/**
 * Validate transactions sheet exists and has data
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {boolean} True if valid, false otherwise
 */
function validateTransactionsSheet(ss) {
  const sheet = getTransactionsSheet(ss);
  if (!sheet) {
    SpreadsheetApp.getUi().alert('Error: Transactions sheet not found. Please ensure your sheet is named "Transactions".');
    return false;
  }

  const lastRow = sheet.getLastRow();
  if (lastRow <= 1) {
    SpreadsheetApp.getUi().alert('Error: Transactions sheet has no data.');
    return false;
  }

  return true;
}

/**
 * Format currency
 * @param {number} value - Value to format
 * @returns {string} Formatted currency string
 */
function formatCurrency(value) {
  return '$' + value.toFixed(2).replace(/\\d(?=(\\d{3})+\\.)/g, '$&,');
}

/**
 * Get column index by header name
 * @param {Sheet} sheet - Sheet to search
 * @param {string} headerName - Header name to find
 * @returns {number} Column index (1-based) or -1 if not found
 */
function getColumnIndexByHeader(sheet, headerName) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  for (let i = 0; i < headers.length; i++) {
    if (headers[i].toString().toLowerCase() === headerName.toLowerCase()) {
      return i + 1;
    }
  }
  return -1;
}

/**
 * Parse date string to Date object
 * @param {string|Date} dateStr - Date string or Date object
 * @returns {Date} Parsed date
 */
function parseDate(dateStr) {
  if (dateStr instanceof Date) {
    return dateStr;
  }
  return new Date(dateStr);
}

/**
 * Format date as YYYY-MM-DD
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return \`\${year}-\${month}-\${day}\`;
}

/**
 * Get month key from date (YYYY-MM format)
 * @param {Date} date - Date object
 * @returns {string} Month key in YYYY-MM format
 */
function getMonthKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return \`\${year}-\${month}\`;
}

/**
 * Clear sheet contents but preserve headers
 * @param {Sheet} sheet - Sheet to clear
 */
function clearSheetKeepHeaders(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, sheet.getLastColumn()).clear();
  }
}`;

  return {
    name: 'utils',
    type: 'SERVER_JS',
    source: source
  };
}

/**
 * Create menu.gs file that builds the SheetLink Recipes menu
 */
function createMenuFile(installedRecipes) {
  const recipeMenuItems = installedRecipes.map(recipe => {
    const functionName = `run_${recipe.id.replace(/-/g, '_')}`;
    return `    .addItem('${recipe.name}', '${functionName}')`;
  }).join('\n');

  const source = `/**
 * SheetLink Recipes Menu
 * This menu provides access to all installed recipes
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('SheetLink Recipes')
${recipeMenuItems}
    .addToUi();
}`;

  return {
    name: 'menu',
    type: 'SERVER_JS',
    source: source
  };
}

/**
 * Get currently installed recipes from the script project
 */
async function getInstalledRecipes(scriptId, token) {
  try {
    const url = `${SCRIPT_API_BASE}/projects/${scriptId}/content`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) {
      console.log('[installer] Could not fetch existing recipes, assuming first install');
      return [];
    }

    const content = await response.json();
    const installedRecipes = [];

    // Parse existing files to find installed recipes
    for (const file of content.files || []) {
      if (file.name.startsWith('recipe_')) {
        const recipeId = file.name.replace('recipe_', '');
        // Get recipe metadata to get the display name
        try {
          const metadata = await fetchRecipeMetadata(recipeId);
          installedRecipes.push({ id: recipeId, name: metadata.name });
        } catch (error) {
          console.log(`[installer] Could not fetch metadata for ${recipeId}`);
        }
      }
    }

    return installedRecipes;
  } catch (error) {
    console.error('[installer] Error getting installed recipes:', error);
    return [];
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

    // Step 4: Get currently installed recipes
    onProgress?.('Checking installed recipes...');
    const installedRecipes = await getInstalledRecipes(scriptId, token);

    // Step 5: Fetch new recipe code and metadata
    onProgress?.('Downloading recipe...');
    const recipeFile = await fetchRecipeCode(recipeId);
    const recipeMetadata = await fetchRecipeMetadata(recipeId);

    // Rename recipe file to include ID
    recipeFile.name = `recipe_${recipeId}`;

    // Step 6: Add new recipe to installed list
    const updatedRecipes = [
      ...installedRecipes.filter(r => r.id !== recipeId), // Remove if already installed
      { id: recipeId, name: recipeMetadata.name }
    ];

    // Step 7: Create files array with manifest, utils, menu, and all recipes
    const manifestFile = createManifest();
    const utilsFile = createUtilsFile();
    const menuFile = createMenuFile(updatedRecipes);

    // Re-fetch ALL recipe files from GitHub (to get latest code without onOpen())
    // instead of copying old installed code
    const allRecipeFiles = [];
    for (const recipe of updatedRecipes) {
      const file = await fetchRecipeCode(recipe.id);
      file.name = `recipe_${recipe.id}`; // Rename to include ID
      allRecipeFiles.push(file);
    }

    const allFiles = [
      manifestFile,
      utilsFile,
      menuFile,
      ...allRecipeFiles
    ];

    // Step 8: Install to project
    onProgress?.('Installing recipe...');
    await updateScriptProject(scriptId, allFiles, token);

    onProgress?.('Complete!');
    return { success: true, scriptId, installedRecipes: updatedRecipes.map(r => r.id) };
  } catch (error) {
    console.error(`[installer] Error installing ${recipeId}:`, error);
    throw error;
  }
}

/**
 * Get list of installed recipe IDs for current spreadsheet
 * Checks the actual Apps Script project to see which recipes are installed
 */
export async function getInstalledRecipeIds(spreadsheetId) {
  try {
    const scriptIdKey = `recipeScriptId_${spreadsheetId}`;
    const stored = await chrome.storage.local.get(scriptIdKey);
    const scriptId = stored[scriptIdKey];

    // If no script project exists yet, no recipes are installed
    if (!scriptId) {
      console.log('[installer] No script project exists yet');
      return [];
    }

    // Check if we have recipe permissions
    const recipeAuth = await import('../auth/recipeAuth.js');
    if (!await recipeAuth.hasRecipePermissions()) {
      console.log('[installer] No recipe permissions, cannot check installed recipes');
      return [];
    }

    // Get the project content to see which recipes are installed
    try {
      const token = await recipeAuth.getRecipeAuthToken();
      const content = await getProjectContent(scriptId, token);

      // Extract recipe IDs from file names (recipe_<id>.gs)
      const installedRecipes = [];
      for (const file of content.files || []) {
        if (file.name.startsWith('recipe_')) {
          const recipeId = file.name.replace('recipe_', '');
          installedRecipes.push(recipeId);
        }
      }

      console.log('[installer] Found installed recipes:', installedRecipes);
      return installedRecipes;
    } catch (error) {
      // Project doesn't exist or can't be accessed - clear the stored script ID
      console.log('[installer] Script project no longer exists, clearing stored ID');
      await chrome.storage.local.remove(scriptIdKey);
      return [];
    }
  } catch (error) {
    console.error('[installer] Error getting installed recipe IDs:', error);
    return [];
  }
}

/**
 * Helper to get project content
 */
async function getProjectContent(scriptId, token) {
  const url = `${SCRIPT_API_BASE}/projects/${scriptId}/content`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!response.ok) {
    throw new Error(`Failed to get project content: ${response.status}`);
  }

  return await response.json();
}
