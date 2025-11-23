// sheets.js - Google Sheets API wrapper for writing banking data

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

/**
 * Account headers schema for the Accounts tab
 */
const ACCOUNTS_HEADERS = [
  'account_id',
  'name',
  'mask',
  'type',
  'subtype',
  'current_balance',
  'available_balance',
  'institution',
  'last_synced_at'
];

/**
 * Transaction headers schema for the Transactions tab (base)
 */
const TRANSACTIONS_HEADERS_BASE = [
  'transaction_id',
  'account_id',
  'date',
  'description_raw',
  'merchant_name',
  'amount',
  'pending',
  'plaid_category',
  'payment_channel',
  'source_institution',
  'synced_at'
];

/**
 * Get transaction headers based on rules settings
 * @param {boolean} includeRules - Whether to include final_category column
 * @returns {array} Transaction headers array
 */
function getTransactionHeaders(includeRules = false) {
  if (includeRules) {
    return [...TRANSACTIONS_HEADERS_BASE, 'final_category'];
  }
  return TRANSACTIONS_HEADERS_BASE;
}

/**
 * Get OAuth token from chrome.identity API
 * @returns {Promise<string>} OAuth access token
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
 * Make authenticated request to Google Sheets API
 * @param {string} token - OAuth token
 * @param {string} url - API endpoint URL
 * @param {string} method - HTTP method
 * @param {object} body - Request body (optional)
 * @returns {Promise<object>} API response
 */
async function sheetsApiRequest(token, url, method = 'GET', body = null) {
  const options = {
    method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      `Sheets API error: ${response.status} - ${errorData.error?.message || response.statusText}`
    );
  }

  return await response.json();
}

/**
 * Get spreadsheet metadata to check if tabs exist
 * @param {string} token - OAuth token
 * @param {string} sheetId - Spreadsheet ID
 * @returns {Promise<object>} Spreadsheet metadata
 */
async function getSpreadsheetMetadata(token, sheetId) {
  const url = `${SHEETS_API_BASE}/${sheetId}?fields=sheets.properties`;
  return await sheetsApiRequest(token, url);
}

/**
 * Create a new tab/sheet in the spreadsheet
 * @param {string} token - OAuth token
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Name for the new tab
 * @returns {Promise<number>} Sheet ID of the created tab
 */
async function createTab(token, sheetId, tabName) {
  const url = `${SHEETS_API_BASE}/${sheetId}:batchUpdate`;
  const body = {
    requests: [{
      addSheet: {
        properties: {
          title: tabName
        }
      }
    }]
  };

  const response = await sheetsApiRequest(token, url, 'POST', body);
  return response.replies[0].addSheet.properties.sheetId;
}

/**
 * Write headers to a tab
 * @param {string} token - OAuth token
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name
 * @param {array} headers - Array of header strings
 */
async function writeHeaders(token, sheetId, tabName, headers) {
  const range = `${tabName}!A1:${String.fromCharCode(64 + headers.length)}1`;
  const url = `${SHEETS_API_BASE}/${sheetId}/values/${encodeURIComponent(range)}?valueInputOption=RAW`;

  const body = {
    range,
    values: [headers]
  };

  await sheetsApiRequest(token, url, 'PUT', body);
}

/**
 * Read values from a range
 * @param {string} token - OAuth token
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} range - A1 notation range
 * @returns {Promise<array>} Values from the range
 */
async function readRange(token, sheetId, range) {
  const url = `${SHEETS_API_BASE}/${sheetId}/values/${encodeURIComponent(range)}`;
  const response = await sheetsApiRequest(token, url);
  return response.values || [];
}

/**
 * Append rows to a tab
 * @param {string} token - OAuth token
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name
 * @param {array} rows - Array of row arrays
 */
async function appendRows(token, sheetId, tabName, rows) {
  if (rows.length === 0) return;

  const range = `${tabName}!A:A`;
  const url = `${SHEETS_API_BASE}/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`;

  const body = {
    range,
    values: rows
  };

  await sheetsApiRequest(token, url, 'POST', body);
}

/**
 * Ensure a tab exists with proper headers
 * Creates the tab if it doesn't exist, writes headers if missing
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name
 * @param {array} headersArray - Array of header strings
 * @returns {Promise<void>}
 */
async function ensureTab(sheetId, tabName, headersArray) {
  const token = await getAuthToken();

  // Get existing sheets
  const metadata = await getSpreadsheetMetadata(token, sheetId);
  const existingSheets = metadata.sheets || [];
  const tabExists = existingSheets.some(sheet => sheet.properties.title === tabName);

  // Create tab if it doesn't exist
  if (!tabExists) {
    await createTab(token, sheetId, tabName);
  }

  // Check if headers exist
  const firstRow = await readRange(token, sheetId, `${tabName}!A1:${String.fromCharCode(64 + headersArray.length)}1`);

  if (firstRow.length === 0 || firstRow[0].length === 0) {
    // Write headers
    await writeHeaders(token, sheetId, tabName, headersArray);
  }
}

/**
 * Append unique rows based on ID column
 * Reads existing IDs, filters out duplicates, then appends new rows
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name
 * @param {array} rows - Array of row arrays (without headers)
 * @param {string} idColumnName - Name of the ID column for deduplication
 * @returns {Promise<number>} Number of new rows added
 */
async function appendUniqueRows(sheetId, tabName, rows, idColumnName) {
  if (rows.length === 0) return 0;

  const token = await getAuthToken();

  // Read all existing data to find ID column
  const allData = await readRange(token, sheetId, `${tabName}!A:ZZ`);

  if (allData.length === 0) {
    // No data at all, shouldn't happen if ensureTab was called
    throw new Error('Tab has no headers');
  }

  const headers = allData[0];
  const idColumnIndex = headers.indexOf(idColumnName);

  if (idColumnIndex === -1) {
    throw new Error(`ID column '${idColumnName}' not found in headers`);
  }

  // For transactions, use fuzzy deduplication to handle Plaid's duplicate IDs
  if (tabName === 'Transactions') {
    return await appendUniqueFuzzyRows(token, sheetId, tabName, rows, headers, allData);
  }

  // For other tabs, use simple ID-based deduplication
  // Extract existing IDs (skip header row)
  const existingIds = new Set();
  for (let i = 1; i < allData.length; i++) {
    const row = allData[i];
    if (row[idColumnIndex]) {
      existingIds.add(row[idColumnIndex]);
    }
  }

  // Filter out rows with existing IDs
  // Assuming the rows array has the same column order as headers
  const newRows = rows.filter(row => {
    const rowId = row[idColumnIndex];
    return rowId && !existingIds.has(rowId);
  });

  // Append new rows
  if (newRows.length > 0) {
    await appendRows(token, sheetId, tabName, newRows);
  }

  return newRows.length;
}

/**
 * Append unique transaction rows using fuzzy matching
 * Plaid sometimes returns the same transaction with different IDs (sync vs backfill)
 * We deduplicate by account_id + date + amount + description
 * @param {string} token - OAuth token
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name
 * @param {array} rows - Array of row arrays
 * @param {array} headers - Header row
 * @param {array} allData - Existing sheet data
 * @returns {Promise<number>} Number of new rows added
 */
async function appendUniqueFuzzyRows(token, sheetId, tabName, rows, headers, allData) {
  // Find column indices
  const accountIdIndex = headers.indexOf('account_id');
  const dateIndex = headers.indexOf('date');
  const amountIndex = headers.indexOf('amount');
  const descriptionIndex = headers.indexOf('description_raw');

  if (accountIdIndex === -1 || dateIndex === -1 || amountIndex === -1 || descriptionIndex === -1) {
    throw new Error('Missing required transaction columns for fuzzy deduplication');
  }

  // Build fuzzy key set from existing data (skip header row)
  const existingKeys = new Set();
  for (let i = 1; i < allData.length; i++) {
    const row = allData[i];
    const accountId = row[accountIdIndex] || '';
    const date = row[dateIndex] || '';
    const amount = row[amountIndex] || '';
    const description = row[descriptionIndex] || '';

    // Create composite key: account_id|date|amount|description
    const fuzzyKey = `${accountId}|${date}|${amount}|${description}`;
    existingKeys.add(fuzzyKey);
  }

  // Filter out duplicate rows
  const newRows = rows.filter(row => {
    const accountId = row[accountIdIndex] || '';
    const date = row[dateIndex] || '';
    const amount = row[amountIndex] || '';
    const description = row[descriptionIndex] || '';

    const fuzzyKey = `${accountId}|${date}|${amount}|${description}`;
    return !existingKeys.has(fuzzyKey);
  });

  // Append new rows
  if (newRows.length > 0) {
    await appendRows(token, sheetId, tabName, newRows);
  }

  return newRows.length;
}

/**
 * Write accounts data to the Accounts tab
 * @param {string} sheetId - Spreadsheet ID
 * @param {array} accountsData - Array of account objects from backend
 * @returns {Promise<void>}
 */
async function writeAccounts(sheetId, accountsData) {
  const tabName = 'Accounts';

  // Ensure tab exists with proper headers
  await ensureTab(sheetId, tabName, ACCOUNTS_HEADERS);

  // Transform accounts data to rows
  const rows = accountsData.map(acc => [
    acc.account_id || '',
    acc.label || acc.name || '',  // Use enriched label if available, fallback to name
    acc.mask || '',
    acc.type || '',
    acc.subtype || '',
    acc.balances?.current || '',
    acc.balances?.available || '',
    acc.institution_name || '',
    new Date().toISOString()
  ]);

  // For accounts, we'll replace all data (not append)
  // First clear existing account rows (keep headers)
  const token = await getAuthToken();

  // Read to find how many rows exist
  const existingData = await readRange(token, sheetId, `${tabName}!A:A`);

  if (existingData.length > 1) {
    // Clear all rows except header
    const clearRange = `${tabName}!A2:I${existingData.length}`;
    const clearUrl = `${SHEETS_API_BASE}/${sheetId}/values/${encodeURIComponent(clearRange)}:clear`;
    await sheetsApiRequest(token, clearUrl, 'POST', {});
  }

  // Append the current accounts
  await appendRows(token, sheetId, tabName, rows);
}

/**
 * Write transactions data to the Transactions tab with deduplication
 * @param {string} sheetId - Spreadsheet ID
 * @param {array} transactionsData - Array of transaction objects from backend
 * @returns {Promise<number>} Number of new transactions added
 */
async function writeTransactions(sheetId, transactionsData) {
  const tabName = 'Transactions';

  // Check if rules are enabled to determine headers
  const settings = await chrome.storage.sync.get(['enableRulesTab']);
  const includeRules = settings.enableRulesTab || false;
  const headers = getTransactionHeaders(includeRules);

  // Ensure tab exists with proper headers
  await ensureTab(sheetId, tabName, headers);

  // Transform transactions data to rows
  const syncedAt = new Date().toISOString();
  const rows = transactionsData.map(txn => {
    const baseRow = [
      txn.transaction_id || '',
      txn.account_id || '',
      txn.date || '',
      txn.description_raw || txn.name || '',
      txn.merchant_name || '',
      txn.amount || '',
      txn.pending ? 'TRUE' : 'FALSE',
      Array.isArray(txn.plaid_category) ? txn.plaid_category.join(', ') :
        (Array.isArray(txn.category) ? txn.category.join(', ') : ''),
      txn.payment_channel || '',
      txn.source_institution || txn.institution_name || '',
      syncedAt
    ];

    // Add final_category if rules are enabled
    if (includeRules) {
      baseRow.push(txn.final_category || '');
    }

    return baseRow;
  });

  // Append only unique transactions
  const newCount = await appendUniqueRows(sheetId, tabName, rows, 'transaction_id');

  return newCount;
}

/**
 * Verify access to a spreadsheet
 * @param {string} sheetId - Spreadsheet ID
 * @returns {Promise<object>} Basic spreadsheet info if accessible
 */
async function verifySheetAccess(sheetId) {
  const token = await getAuthToken();
  const url = `${SHEETS_API_BASE}/${sheetId}?fields=properties.title`;
  return await sheetsApiRequest(token, url);
}

// Export functions for use in popup
window.SheetsAPI = {
  ensureTab,
  appendUniqueRows,
  getAuthToken,
  writeAccounts,
  writeTransactions,
  verifySheetAccess
};
