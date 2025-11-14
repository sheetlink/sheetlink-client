// drive.js - Google Drive API helper for template installation

/**
 * Get auth token via service worker
 * @returns {Promise<string>} OAuth token
 */
async function getAuthToken() {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(
      { type: 'GET_AUTH_TOKEN' },
      (response) => {
        if (response.error) {
          reject(new Error(response.error));
        } else {
          resolve(response.token);
        }
      }
    );
  });
}

/**
 * Extract sheet ID from Google Sheets URL
 * @param {string} url - Google Sheets URL
 * @returns {string|null} Sheet ID or null
 */
function extractSheetId(url) {
  const match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match ? match[1] : null;
}

/**
 * Copy a Google Sheet to user's Drive
 * @param {string} sourceSheetId - ID of template sheet to copy
 * @param {string} newName - Name for the copied sheet
 * @returns {Promise<Object>} Copy result with new sheet ID and URL
 */
async function copySheet(sourceSheetId, newName) {
  try {
    const token = await getAuthToken();

    // Use Drive API v3 to copy the file
    const copyUrl = `https://www.googleapis.com/drive/v3/files/${sourceSheetId}/copy`;

    const response = await fetch(copyUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newName,
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Failed to copy sheet: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      url: `https://docs.google.com/spreadsheets/d/${data.id}/edit`
    };
  } catch (error) {
    throw error;
  }
}

/**
 * Install a template by copying it to user's Drive
 * @param {Object} template - Template object with title and sheet_url
 * @returns {Promise<Object>} Installation result
 */
async function installTemplate(template) {
  try {
    // Extract source sheet ID
    const sourceSheetId = extractSheetId(template.sheet_url);
    if (!sourceSheetId) {
      throw new Error('Invalid template URL');
    }

    // Generate name for copy
    const copyName = `${template.title} - Copy`;

    // Copy the sheet
    const result = await copySheet(sourceSheetId, copyName);


    return {
      success: true,
      sheetId: result.id,
      sheetUrl: result.url,
      sheetName: result.name
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Open a Google Sheet in a new tab
 * @param {string} sheetUrl - URL of the sheet to open
 */
function openSheet(sheetUrl) {
  chrome.tabs.create({ url: sheetUrl });
}

/**
 * Get list of user's Google Sheets
 * @param {number} maxResults - Maximum number of sheets to return
 * @returns {Promise<Array>} List of user's sheets
 */
async function listUserSheets(maxResults = 10) {
  try {
    const token = await getAuthToken();

    const url = `https://www.googleapis.com/drive/v3/files?q=mimeType='application/vnd.google-apps.spreadsheet'&pageSize=${maxResults}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Failed to list sheets: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();
    return data.files || [];
  } catch (error) {
    throw error;
  }
}

/**
 * Create a new blank Google Sheet
 * @param {string} title - Title for the new sheet
 * @returns {Promise<Object>} Created sheet details
 */
async function createSheet(title) {
  try {
    const token = await getAuthToken();

    // Create using Drive API
    const createUrl = 'https://www.googleapis.com/drive/v3/files';

    const response = await fetch(createUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: title,
        mimeType: 'application/vnd.google-apps.spreadsheet'
      })
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(`Failed to create sheet: ${error.error?.message || response.statusText}`);
    }

    const data = await response.json();

    return {
      id: data.id,
      name: data.name,
      url: `https://docs.google.com/spreadsheets/d/${data.id}/edit`
    };
  } catch (error) {
    throw error;
  }
}

// Export functions
window.DriveAPI = {
  copySheet,
  installTemplate,
  openSheet,
  listUserSheets,
  createSheet,
  extractSheetId
};
