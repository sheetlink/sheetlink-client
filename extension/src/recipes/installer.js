/**
 * Recipe installer module
 * Installs recipes to user's Apps Script project using Apps Script API
 */

import { ensureRecipePermissions, getRecipeAuthToken } from '../auth/recipeAuth.js';
import { fetchRecipeCode, fetchRecipeMetadata } from './fetcher.js';

const SCRIPT_API_BASE = 'https://script.googleapis.com/v1';
const CONFIG_SHEET_NAME = '__SheetLink_Config__';

/**
 * Get script ID from hidden config sheet
 */
async function getScriptIdFromHiddenSheet(spreadsheetId, token) {
  try {
    // Get all sheets to find the config sheet
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!response.ok) return null;

    const data = await response.json();
    const configSheet = data.sheets?.find(s => s.properties?.title === CONFIG_SHEET_NAME);

    if (!configSheet) {
      console.log('[installer] Config sheet does not exist yet');
      return null;
    }

    // Read the script ID from cell B4
    const readUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${CONFIG_SHEET_NAME}!B4`;
    const readResponse = await fetch(readUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!readResponse.ok) return null;

    const readData = await readResponse.json();
    const scriptId = readData.values?.[0]?.[0];

    return scriptId || null;
  } catch (error) {
    console.error('[installer] Error reading from hidden sheet:', error);
    return null;
  }
}

/**
 * Store script ID in hidden config sheet
 */
async function storeScriptIdInHiddenSheet(spreadsheetId, scriptId, token) {
  try {
    // First, check if the config sheet exists
    const checkUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties`;
    const checkResponse = await fetch(checkUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    const checkData = await checkResponse.json();
    const configSheet = checkData.sheets?.find(s => s.properties?.title === CONFIG_SHEET_NAME);

    // Create the config sheet if it doesn't exist
    if (!configSheet) {
      console.log('[installer] Creating hidden config sheet');
      const createUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}:batchUpdate`;
      const createResponse = await fetch(createUrl, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [
            {
              addSheet: {
                properties: {
                  title: CONFIG_SHEET_NAME,
                  hidden: true,
                  gridProperties: {
                    rowCount: 10,
                    columnCount: 2
                  }
                }
              }
            }
          ]
        })
      });

      if (!createResponse.ok) {
        console.error('[installer] Failed to create config sheet');
        return false;
      }
      console.log('[installer] Config sheet created successfully');

      // Add header and description on first creation
      const headerUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${CONFIG_SHEET_NAME}!A1:B3?valueInputOption=RAW`;
      await fetch(headerUrl, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          values: [
            ['SheetLink Configuration', ''],
            ['This sheet stores system settings. Do not delete.', ''],
            ['', '']
          ]
        })
      });
    }

    // Write the script ID to cells A4 and B4 (label in A4, ID in B4)
    const writeUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${CONFIG_SHEET_NAME}!A4:B4?valueInputOption=RAW`;
    const writeResponse = await fetch(writeUrl, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        values: [['Apps Script Project ID', scriptId]]
      })
    });

    if (!writeResponse.ok) {
      console.error('[installer] Failed to write script ID to config sheet');
      return false;
    }

    console.log('[installer] Script ID stored in hidden config sheet');
    return true;
  } catch (error) {
    console.error('[installer] Error storing script ID in hidden sheet:', error);
    return false;
  }
}

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
 * Get or create Apps Script project for spreadsheet
 */
async function getOrCreateScriptProject(spreadsheetId, token) {
  try {
    const storageKey = `recipeScriptId_${spreadsheetId}`;

    // Step 1: Check if we have a cached script ID
    console.log('[installer] Looking for cached project with key:', storageKey);
    const stored = await chrome.storage.local.get(storageKey);
    console.log('[installer] Cached script ID:', stored[storageKey]);

    if (stored[storageKey]) {
      // Verify the cached project still exists
      try {
        await getProjectContent(stored[storageKey], token);
        console.log('[installer] Cached project verified, reusing it');
        return stored[storageKey];
      } catch (error) {
        console.log('[installer] Cached project no longer accessible, will search for existing projects');
        await chrome.storage.local.remove(storageKey);
      }
    }

    // Step 2: Check if the spreadsheet has the script ID stored in metadata
    console.log('[installer] Checking spreadsheet metadata for existing script ID...');
    try {
      const metadataResponse = await new Promise((resolve) => {
        chrome.runtime.sendMessage({
          type: 'GET_SPREADSHEET_METADATA',
          spreadsheetId,
          token
        }, resolve);
      });

      if (metadataResponse && metadataResponse.success && metadataResponse.scriptId) {
        const scriptId = metadataResponse.scriptId;
        console.log('[installer] Found script ID in spreadsheet metadata:', scriptId);

        // Verify this script still exists
        try {
          await getProjectContent(scriptId, token);
          console.log('[installer] Spreadsheet-stored project verified, reusing it');
          // Cache it for faster future lookups
          await chrome.storage.local.set({ [storageKey]: scriptId });
          return scriptId;
        } catch (error) {
          console.log('[installer] Spreadsheet-stored project no longer accessible');
        }
      }
    } catch (error) {
      console.log('[installer] Could not check spreadsheet metadata:', error);
    }

    // Step 3: Check hidden config sheet for existing script ID
    console.log('[installer] Checking hidden config sheet for existing script ID...');
    try {
      const storedScriptId = await getScriptIdFromHiddenSheet(spreadsheetId, token);
      if (storedScriptId) {
        console.log('[installer] Found script ID in hidden sheet:', storedScriptId);

        // Verify it's accessible via Apps Script API
        try {
          await getProjectContent(storedScriptId, token);
          console.log('[installer] Hidden sheet script ID verified, reusing it');
          // Cache it for faster future lookups
          await chrome.storage.local.set({ [storageKey]: storedScriptId });
          return storedScriptId;
        } catch (error) {
          console.log('[installer] Hidden sheet script ID not accessible, will create new one');
        }
      } else {
        console.log('[installer] No script ID found in hidden sheet');
      }
    } catch (error) {
      console.log('[installer] Error checking hidden sheet:', error);
    }

    // Step 4: Verify we can access the spreadsheet
    const hasAccess = await verifySpreadsheetAccess(spreadsheetId, token);
    if (!hasAccess) {
      throw new Error('Cannot access spreadsheet. Token may not have spreadsheet permissions.');
    }

    // Step 5: Create container-bound script
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

    // Step 6: Store the script ID in hidden config sheet (survives extension reinstalls)
    try {
      const stored = await storeScriptIdInHiddenSheet(spreadsheetId, project.scriptId, token);
      if (stored) {
        console.log('[installer] Stored script ID in hidden config sheet');
      } else {
        console.warn('[installer] Could not store script ID in hidden config sheet');
      }
    } catch (error) {
      console.warn('[installer] Error storing script ID in hidden config sheet:', error);
    }

    // Step 7: Also cache the script ID locally for faster lookups
    await chrome.storage.local.set({ [storageKey]: project.scriptId });
    console.log('[installer] Cached script ID locally for future recipe installations');

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
 * @returns {Object} {valid: boolean, error: string|null}
 */
function validateTransactionsSheet(ss) {
  const sheet = getTransactionsSheet(ss);

  if (!sheet) {
    return {
      valid: false,
      error: \`Sheet "\${TRANSACTIONS_SHEET_NAME}" not found. Please sync your transactions first.\`
    };
  }

  // Check for actual data by reading first data cell (A2)
  // This is more reliable than getLastRow() which can be inconsistent
  try {
    const firstDataCell = sheet.getRange(2, 1).getValue();
    // Convert to string and trim to handle whitespace and non-string types
    const cellValue = String(firstDataCell || '').trim();

    if (!cellValue) {
      return {
        valid: false,
        error: "No transaction data found. Please sync your transactions first."
      };
    }
  } catch (error) {
    return {
      valid: false,
      error: "Could not read transaction data. Please sync your transactions first."
    };
  }

  return { valid: true, error: null };
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
    return `    .addItem('▸ ${recipe.name}', '${functionName}')`;
  }).join('\n');

  const source = `/**
 * SheetLink Recipes Menu
 * This menu provides access to all installed recipes
 */

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('SheetLink Recipes')
${recipeMenuItems}
    .addSeparator()
    .addSubMenu(ui.createMenu('ⓘ Help')
      .addItem('View Documentation', 'menuShowDocs')
      .addItem('About SheetLink Recipes', 'menuShowAbout'))
    .addToUi();
}

// Help menu handlers
function menuShowDocs() {
  var html = HtmlService.createHtmlOutput(
    '<div style="font-family: Arial, sans-serif; padding: 30px; text-align: center;">' +
    '<h2>SheetLink Recipes Documentation</h2>' +
    '<p style="margin: 20px 0;">View complete documentation and guides online:</p>' +
    '<a href="https://sheetlink.app/recipes" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #023820; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Open Documentation</a>' +
    '<p style="margin-top: 30px; font-size: 12px; color: #666;">Opens in a new tab</p>' +
    '</div>'
  ).setWidth(400).setHeight(200);

  SpreadsheetApp.getUi().showModalDialog(html, 'Documentation');
}

function menuShowAbout() {
  var html = HtmlService.createHtmlOutput(
    '<div style="text-align: center; padding: 30px; font-family: Arial, sans-serif;">' +
    '<h1 style="color: #023820;">SheetLink Recipes</h1>' +
    '<p style="font-size: 18px; color: #666;"><strong>Version 2.0.0</strong></p>' +
    '<p style="font-size: 14px; margin: 20px 0;">Financial Analysis Suite</p>' +
    '<hr style="border: 1px solid #eee; margin: 20px 0;">' +
    '<p style="font-size: 12px; color: #999; margin-top: 30px;">© 2026 SheetLink</p>' +
    '</div>'
  ).setWidth(400).setHeight(300);

  SpreadsheetApp.getUi().showModalDialog(html, 'About SheetLink Recipes');
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
