// sheets.js - Google Sheets API wrapper for writing banking data
// Version: Phase 3.11 - Re-auth error handling - Updated 2025-12-04 03:20

// Use global debug function from popup.html
debug('[Sheets.js] Loading sheets.js - Phase 3.11 - Re-auth fixes v2');

const SHEETS_API_BASE = 'https://sheets.googleapis.com/v4/spreadsheets';

/**
 * Custom error class for authentication failures
 * Used when OAuth token is expired or invalid
 */
class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthenticationError';
    this.isAuthError = true;
  }
}

/**
 * Custom error class for permission/access failures
 * Used when user doesn't have access to the requested resource
 */
class PermissionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'PermissionError';
    this.isPermissionError = true;
  }
}

/**
 * Convert column number to letter (A, B, ... Z, AA, AB, ...)
 * @param {number} n - Column number (1-indexed)
 * @returns {string} Column letter(s)
 */
function columnNumberToLetter(n) {
  let result = '';
  while (n > 0) {
    const remainder = (n - 1) % 26;
    result = String.fromCharCode(65 + remainder) + result;
    n = Math.floor((n - 1) / 26);
  }
  return result;
}

/**
 * Account headers schema for the Accounts tab
 * Comprehensive schema with all Plaid account fields
 */
const ACCOUNTS_HEADERS = [
  'account_id',
  'persistent_account_id',
  'name',
  'official_name',
  'mask',
  'type',
  'subtype',
  'current_balance',
  'available_balance',
  'iso_currency_code',
  'institution',
  'last_synced_at'
];

/**
 * Transaction headers schema - Free Tier (Essential columns only)
 */
const TRANSACTIONS_HEADERS_FREE = [
  'transaction_id',
  'account_name',
  'account_mask',
  'date',
  'merchant_name',
  'amount',
  'iso_currency_code',
  'pending',
  'category_primary',
  'category_detailed',
  'payment_channel',
  'source_institution',
  'synced_at'
];

/**
 * Transaction headers schema - Full (All Plaid transaction fields)
 * Available for paid tiers
 */
const TRANSACTIONS_HEADERS_FULL = [
  'transaction_id',
  'account_id',
  'persistent_account_id',
  'account_name',
  'account_mask',
  'date',
  'authorized_date',
  'datetime',
  'authorized_datetime',
  'description_raw',
  'merchant_name',
  'merchant_entity_id',
  'amount',
  'iso_currency_code',
  'unofficial_currency_code',
  'pending',
  'pending_transaction_id',
  'check_number',
  'category_primary',
  'category_detailed',
  'payment_channel',
  'transaction_type',
  'transaction_code',
  'location_address',
  'location_city',
  'location_region',
  'location_postal_code',
  'location_country',
  'location_lat',
  'location_lon',
  'website',
  'logo_url',
  'source_institution',
  'synced_at'
];

// Alias for backward compatibility
const TRANSACTIONS_HEADERS_BASE = TRANSACTIONS_HEADERS_FREE;

/**
 * Get transaction headers based on tier and rules settings
 * @param {string} tier - Subscription tier: "free", "basic", or "pro"
 * @param {boolean} includeRules - Whether to include final_category column
 * @returns {array} Transaction headers array
 */
function getTransactionHeaders(tier = 'free', includeRules = false) {
  // Phase 3.22.0: All tiers get the same columns (full 34 fields)
  // Only difference is number of days: FREE=7 days, PRO=730 days
  const baseHeaders = TRANSACTIONS_HEADERS_FULL;

  if (includeRules) {
    return [...baseHeaders, 'final_category'];
  }
  return baseHeaders;
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
        debug('[Sheets] getAuthToken response:', response);

        if (response.error) {
          debug('[Sheets] Error in response:', response.error, 'Type:', typeof response.error);

          // Phase 3.11: Check if it's an auth expiry error
          if (response.error === 'AUTH_EXPIRED') {
            debug('[Sheets] AUTH_EXPIRED error from service worker, throwing AuthenticationError');
            const authError = new AuthenticationError('Your session has expired. Please sign in again.');
            debug('[Sheets] Created error:', authError.name, authError.isAuthError);
            reject(authError);
          } else {
            debug('[Sheets] Not AUTH_EXPIRED, throwing generic Error');
            reject(new Error(response.error));
          }
        } else {
          debug('[Sheets] Token received successfully');
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

  // Handle authentication errors (401/403)
  if (response.status === 401 || response.status === 403) {
    const errorData = await response.json().catch(() => ({}));
    const errorMsg = errorData.error?.message || '';

    // Check if it's an auth token error (not a permission error)
    const isAuthError = errorMsg.toLowerCase().includes('invalid') ||
                       errorMsg.toLowerCase().includes('expired') ||
                       errorMsg.toLowerCase().includes('credentials') ||
                       errorMsg.toLowerCase().includes('unauthenticated') ||
                       response.status === 401;

    if (isAuthError) {
      debug('[Sheets API] Authentication error detected, clearing expired token');
      // Clear the expired token
      await chrome.storage.local.remove(['googleAccessToken', 'googleTokenExpiry']);

      // Throw specific auth error
      throw new AuthenticationError('Your session has expired. Please sign in again.');
    }

    // It's a real permission error
    throw new PermissionError(
      `Cannot access sheet: ${errorMsg || 'Permission denied. Make sure the sheet is owned by your account or that you have edit access.'}`
    );
  }

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
  const lastColumn = columnNumberToLetter(headers.length);
  const range = `${tabName}!A1:${lastColumn}1`;
  // Phase 3.23.0: Use RAW mode for fast writes (no parsing overhead)
  // Apps Script recipes will format date columns when needed for formulas
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
  // Phase 3.23.0: Use RAW mode for fast writes (no parsing overhead)
  // Apps Script recipes will format date columns when needed for formulas
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

  // Check if headers exist and have at least the expected columns.
  // Read a wide range to capture any user-added columns beyond the sync schema.
  // We only rewrite headers if there are FEWER columns than expected (missing sync columns),
  // NOT if there are MORE (user may have added custom columns to the right).
  const firstRow = await readRange(token, sheetId, `${tabName}!A1:BZ1`);

  if (firstRow.length === 0 || firstRow[0].length === 0 || firstRow[0].length < headersArray.length) {
    // Clear entire header row first to remove any old columns
    const clearHeaderUrl = `${SHEETS_API_BASE}/${sheetId}/values/${encodeURIComponent(tabName + '!1:1')}:clear`;
    await sheetsApiRequest(token, clearHeaderUrl, 'POST', {});

    // Write new headers
    await writeHeaders(token, sheetId, tabName, headersArray);
    debug(`[Sheets] Updated ${tabName} headers to ${headersArray.length} columns`);
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

  const perfStart = performance.now();
  const token = await getAuthToken();

  // Phase 3.23.0: Fast path - check if sheet is empty with timeout fallback
  // Some sheets have "phantom rows" that make reads extremely slow
  debug(`[PERF] Checking if sheet is empty (with 5s timeout)...`);
  const emptyCheckStart = performance.now();

  try {
    // Race between reading A2 and a 5-second timeout
    const firstDataCell = await Promise.race([
      readRange(token, sheetId, `${tabName}!A2:A2`),
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    ]);

    const checkTime = Math.round(performance.now() - emptyCheckStart);
    debug(`[PERF] Empty check took ${checkTime}ms`);

    const isEmpty = firstDataCell.length === 0 || !firstDataCell[0] || !firstDataCell[0][0];

    if (isEmpty) {
      // Sheet is empty, skip deduplication entirely
      debug(`[appendUniqueRows] Sheet is empty, skipping deduplication`);
      debug(`[PERF] Starting appendRows (${rows.length} rows)...`);
      const appendStart = performance.now();
      await appendRows(token, sheetId, tabName, rows);
      debug(`[PERF] appendRows took ${Math.round(performance.now() - appendStart)}ms`);
      debug(`[PERF] Total appendUniqueRows took ${Math.round(performance.now() - perfStart)}ms`);
      return rows.length;
    }
  } catch (error) {
    if (error.message === 'timeout') {
      // Sheet read timed out - likely has phantom rows
      // Skip deduplication and just append (user will need to clear duplicates manually)
      debug(`[appendUniqueRows] WARNING: Sheet read timed out after 5s - skipping deduplication`);
      debug(`[appendUniqueRows] This sheet may have "phantom rows". Consider creating a fresh sheet.`);
      debug(`[PERF] Starting appendRows (${rows.length} rows)...`);
      const appendStart = performance.now();
      await appendRows(token, sheetId, tabName, rows);
      debug(`[PERF] appendRows took ${Math.round(performance.now() - appendStart)}ms`);
      debug(`[PERF] Total appendUniqueRows took ${Math.round(performance.now() - perfStart)}ms`);
      return rows.length;
    }
    throw error; // Re-throw other errors
  }

  // Sheet has data, do full deduplication
  // Phase 3.22.0: Optimization - read only the header row and ID column for faster deduplication
  // Instead of reading A:ZZ (entire sheet), read just A1:ZZ1 (headers) and then just column A (IDs)
  debug(`[PERF] Starting header read...`);
  const headerStart = performance.now();
  const headersData = await readRange(token, sheetId, `${tabName}!A1:ZZ1`);
  debug(`[PERF] Header read took ${Math.round(performance.now() - headerStart)}ms`);

  if (headersData.length === 0) {
    // No data at all, shouldn't happen if ensureTab was called
    throw new Error('Tab has no headers');
  }

  const headers = headersData[0];
  const idColumnIndex = headers.indexOf(idColumnName);

  if (idColumnIndex === -1) {
    throw new Error(`ID column '${idColumnName}' not found in headers`);
  }

  // Phase 3.22.0: Read only the ID column for much faster deduplication
  // Convert column index to column letter (0 = A, 1 = B, etc.)
  const idColumnLetter = columnNumberToLetter(idColumnIndex + 1);
  debug(`[PERF] Starting ID column read (${idColumnLetter}2:${idColumnLetter})...`);
  const idReadStart = performance.now();
  const idColumnData = await readRange(token, sheetId, `${tabName}!${idColumnLetter}2:${idColumnLetter}`);
  debug(`[PERF] ID column read took ${Math.round(performance.now() - idReadStart)}ms`);

  debug(`[appendUniqueRows] Read ${idColumnData.length} existing IDs from column ${idColumnLetter}`);

  // Case-sensitive ID deduplication — Plaid IDs differing only by case are distinct transactions.
  const existingIds = new Set();
  for (let i = 0; i < idColumnData.length; i++) {
    const idCell = idColumnData[i];
    if (idCell && idCell[0]) {
      existingIds.add(String(idCell[0]));
    }
  }

  debug(`[appendUniqueRows] Found ${existingIds.size} existing IDs in sheet`);
  debug(`[appendUniqueRows] Incoming rows to check: ${rows.length}`);

  // Filter out rows with existing IDs, also dedup within the incoming batch itself
  // (guards against Plaid pagination drift returning the exact same ID twice).
  const newRows = rows.filter(row => {
    const rowId = row[idColumnIndex] ? String(row[idColumnIndex]) : null;
    if (!rowId || existingIds.has(rowId)) return false;
    existingIds.add(rowId);
    return true;
  });

  debug(`[appendUniqueRows] After deduplication: ${newRows.length} unique rows to append`);
  debug(`[appendUniqueRows] Duplicates filtered out: ${rows.length - newRows.length}`);

  // Append new rows
  if (newRows.length > 0) {
    debug(`[PERF] Starting appendRows (${newRows.length} rows)...`);
    const appendStart = performance.now();
    await appendRows(token, sheetId, tabName, newRows);
    debug(`[PERF] appendRows took ${Math.round(performance.now() - appendStart)}ms`);
  }

  debug(`[PERF] Total appendUniqueRows took ${Math.round(performance.now() - perfStart)}ms`);
  return newRows.length;
}

/**
 * Append unique transaction rows using fuzzy matching
 * Plaid sometimes returns the same transaction with different IDs (sync vs backfill)
 * We deduplicate by date + amount + description (excluding account_id to catch duplicates across accounts)
 * @param {string} token - OAuth token
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name
 * @param {array} rows - Array of row arrays
 * @param {array} headers - Header row
 * @param {array} allData - Existing sheet data
 * @returns {Promise<number>} Number of new rows added
 */
async function appendUniqueFuzzyRows(token, sheetId, tabName, rows, headers, allData) {
  debug(`[appendUniqueFuzzyRows] Starting fuzzy deduplication for Transactions`);
  debug(`[appendUniqueFuzzyRows] Total rows in sheet: ${allData.length} (including header)`);
  debug(`[appendUniqueFuzzyRows] Existing data rows: ${allData.length - 1}`);
  debug(`[appendUniqueFuzzyRows] Incoming rows to process: ${rows.length}`);

  // Find column indices
  const dateIndex = headers.indexOf('date');
  const amountIndex = headers.indexOf('amount');
  // Free tier uses merchant_name instead of description_raw
  const descriptionIndex = headers.indexOf('merchant_name') !== -1
    ? headers.indexOf('merchant_name')
    : headers.indexOf('description_raw');

  debug(`[appendUniqueFuzzyRows] Column indices - date: ${dateIndex}, amount: ${amountIndex}, description: ${descriptionIndex}`);

  if (dateIndex === -1 || amountIndex === -1 || descriptionIndex === -1) {
    throw new Error('Missing required transaction columns for fuzzy deduplication');
  }

  // Build fuzzy key set from existing data (skip header row)
  const existingKeys = new Set();
  const existingTransactionIds = new Set();

  for (let i = 1; i < allData.length; i++) {
    const row = allData[i];
    const date = row[dateIndex] || '';
    const amount = row[amountIndex] || '';
    const description = row[descriptionIndex] || '';

    // Create composite key: date|amount|description (no account_id to catch cross-account duplicates)
    const fuzzyKey = `${date}|${amount}|${description}`;
    existingKeys.add(fuzzyKey);

    // Also track transaction_id (first column) for debugging
    if (row[0]) {
      existingTransactionIds.add(row[0]);
    }
  }

  debug(`[appendUniqueFuzzyRows] Built ${existingKeys.size} unique fuzzy keys from existing data`);
  debug(`[appendUniqueFuzzyRows] Found ${existingTransactionIds.size} transaction_ids in existing data`);

  // Log sample of existing transaction IDs for debugging
  const sampleIds = Array.from(existingTransactionIds).slice(0, 5);
  if (sampleIds.length > 0) {
    debug(`[appendUniqueFuzzyRows] Sample existing transaction_ids: ${sampleIds.join(', ')}`);
  }

  // Filter out duplicate rows
  let duplicateCount = 0;
  const newRows = rows.filter(row => {
    const date = row[dateIndex] || '';
    const amount = row[amountIndex] || '';
    const description = row[descriptionIndex] || '';

    const fuzzyKey = `${date}|${amount}|${description}`;
    const isDuplicate = existingKeys.has(fuzzyKey);

    if (isDuplicate) {
      duplicateCount++;
    }

    return !isDuplicate;
  });

  debug(`[appendUniqueFuzzyRows] Deduplication results:`);
  debug(`[appendUniqueFuzzyRows]   - Unique rows to append: ${newRows.length}`);
  debug(`[appendUniqueFuzzyRows]   - Duplicates filtered out: ${duplicateCount}`);
  debug(`[appendUniqueFuzzyRows]   - Total processed: ${rows.length}`);

  // Log sample of incoming transaction IDs for comparison
  const incomingIds = rows.slice(0, 5).map(row => row[0]);
  debug(`[appendUniqueFuzzyRows] Sample incoming transaction_ids: ${incomingIds.join(', ')}`);

  // Append new rows
  if (newRows.length > 0) {
    debug(`[appendUniqueFuzzyRows] Appending ${newRows.length} new rows to sheet`);
    await appendRows(token, sheetId, tabName, newRows);
    debug(`[appendUniqueFuzzyRows] Successfully appended rows`);
  } else {
    debug(`[appendUniqueFuzzyRows] No new rows to append - all were duplicates`);
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
    acc.persistent_account_id || '',
    acc.name || '',
    acc.official_name || '',
    acc.mask || '',
    acc.type || '',
    acc.subtype || '',
    acc.current_balance || acc.balances?.current || '',
    acc.available_balance || acc.balances?.available || '',
    acc.iso_currency_code || '',
    acc.institution_name || '',
    new Date().toISOString()
  ]);

  // For accounts, we'll replace all data (not append)
  // First clear existing account rows (keep headers)
  const token = await getAuthToken();

  // Read to find how many rows exist
  const existingData = await readRange(token, sheetId, `${tabName}!A:A`);

  if (existingData.length > 1) {
    // Clear all rows except header (A-L covers all 12 account columns)
    const clearRange = `${tabName}!A2:L${existingData.length}`;
    const clearUrl = `${SHEETS_API_BASE}/${sheetId}/values/${encodeURIComponent(clearRange)}:clear`;
    await sheetsApiRequest(token, clearUrl, 'POST', {});
  }

  // Append the current accounts
  await appendRows(token, sheetId, tabName, rows);
}

/**
 * Format date columns to display as dates (not serial numbers)
 * Phase 3.23.0: Ensures dates display correctly in Google Sheets
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name
 */
async function formatDateColumns(sheetId, tabName) {
  const token = await getAuthToken();

  // Get sheet metadata to find the sheet ID
  const metadata = await getSpreadsheetMetadata(token, sheetId);
  const sheet = metadata.sheets?.find(s => s.properties.title === tabName);

  if (!sheet) {
    throw new Error(`Sheet '${tabName}' not found`);
  }

  const sheetIdNum = sheet.properties.sheetId;

  // Read headers to find date column indices
  const headersData = await readRange(token, sheetId, `${tabName}!A1:ZZ1`);
  if (headersData.length === 0) {
    throw new Error('No headers found in sheet');
  }

  const headers = headersData[0];
  const dateColumnIndex = headers.indexOf('date');
  const authorizedDateColumnIndex = headers.indexOf('authorized_date');

  if (dateColumnIndex === -1) {
    debug('[Sheets] Date column not found, skipping date formatting');
    return;
  }

  // Apply date formatting to date columns
  const requests = [];

  if (dateColumnIndex !== -1) {
    requests.push({
      repeatCell: {
        range: {
          sheetId: sheetIdNum,
          startRowIndex: 1, // Skip header
          startColumnIndex: dateColumnIndex,
          endColumnIndex: dateColumnIndex + 1
        },
        cell: {
          userEnteredFormat: {
            numberFormat: {
              type: 'DATE',
              pattern: 'yyyy-mm-dd'
            }
          }
        },
        fields: 'userEnteredFormat.numberFormat'
      }
    });
  }

  if (authorizedDateColumnIndex !== -1) {
    requests.push({
      repeatCell: {
        range: {
          sheetId: sheetIdNum,
          startRowIndex: 1, // Skip header
          startColumnIndex: authorizedDateColumnIndex,
          endColumnIndex: authorizedDateColumnIndex + 1
        },
        cell: {
          userEnteredFormat: {
            numberFormat: {
              type: 'DATE',
              pattern: 'yyyy-mm-dd'
            }
          }
        },
        fields: 'userEnteredFormat.numberFormat'
      }
    });
  }

  if (requests.length > 0) {
    const url = `${SHEETS_API_BASE}/${sheetId}:batchUpdate`;
    const body = { requests };
    await sheetsApiRequest(token, url, 'POST', body);
  }
}

/**
 * Sort a sheet by the 'date' column in ascending order (oldest first)
 * Phase 3.22.0: Maintains chronological order after appending data
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name to sort
 */
async function sortSheetByDate(sheetId, tabName) {
  const token = await getAuthToken();

  // Get sheet metadata to find the sheet ID
  const metadata = await getSpreadsheetMetadata(token, sheetId);
  const sheet = metadata.sheets?.find(s => s.properties.title === tabName);

  if (!sheet) {
    throw new Error(`Sheet '${tabName}' not found`);
  }

  const sheetIdNum = sheet.properties.sheetId;

  // Read headers to find the 'date' column index
  const headersData = await readRange(token, sheetId, `${tabName}!A1:ZZ1`);
  if (headersData.length === 0) {
    throw new Error('No headers found in sheet');
  }

  const headers = headersData[0];
  const dateColumnIndex = headers.indexOf('date');

  if (dateColumnIndex === -1) {
    throw new Error('Date column not found in headers');
  }

  // Use Google Sheets API sortRange request
  const url = `${SHEETS_API_BASE}/${sheetId}:batchUpdate`;
  const body = {
    requests: [{
      sortRange: {
        range: {
          sheetId: sheetIdNum,
          startRowIndex: 1, // Skip header row
          startColumnIndex: 0,
          endColumnIndex: headers.length
        },
        sortSpecs: [{
          dimensionIndex: dateColumnIndex,
          sortOrder: 'ASCENDING' // Oldest first
        }]
      }
    }]
  };

  await sheetsApiRequest(token, url, 'POST', body);
  debug(`[Sheets] Sorted ${tabName} by date column (index ${dateColumnIndex})`);
}

/**
 * Remove pending transactions that have been replaced by final posted transactions
 * When Plaid sends a posted transaction, it includes pending_transaction_id linking to the pending version
 * This function finds and removes those pending transactions to prevent duplicates
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tabName - Tab name (usually 'Transactions')
 * @param {array} incomingTransactions - New transactions being added
 * @param {array} headers - Transaction headers
 * @returns {Promise<number>} Number of pending transactions removed
 */
async function removePendingTransactions(sheetId, tabName, incomingTransactions, headers) {
  const token = await getAuthToken();

  // Find pending_transaction_id column index
  const pendingTxnIdIndex = headers.indexOf('pending_transaction_id');
  const txnIdIndex = headers.indexOf('transaction_id');

  if (pendingTxnIdIndex === -1 || txnIdIndex === -1) {
    debug('[removePendingTransactions] Required columns not found, skipping');
    return 0;
  }

  // Collect all pending_transaction_ids from incoming transactions
  const pendingIdsToRemove = new Set();
  incomingTransactions.forEach(txn => {
    if (txn.pending_transaction_id) {
      pendingIdsToRemove.add(txn.pending_transaction_id);
    }
  });

  if (pendingIdsToRemove.size === 0) {
    debug('[removePendingTransactions] No pending transactions to remove');
    return 0;
  }

  debug(`[removePendingTransactions] Found ${pendingIdsToRemove.size} pending transactions to remove:`, Array.from(pendingIdsToRemove));

  // Read all transaction IDs from the sheet
  const txnIdColumnLetter = columnNumberToLetter(txnIdIndex + 1);
  const allTxnIds = await readRange(token, sheetId, `${tabName}!${txnIdColumnLetter}2:${txnIdColumnLetter}`);

  if (allTxnIds.length === 0) {
    debug('[removePendingTransactions] Sheet is empty, nothing to remove');
    return 0;
  }

  // Find row indices to delete (rows that have transaction_id matching a pending_transaction_id)
  const rowsToDelete = [];
  for (let i = 0; i < allTxnIds.length; i++) {
    const txnId = allTxnIds[i] && allTxnIds[i][0];
    if (txnId && pendingIdsToRemove.has(txnId)) {
      // Row number is i + 2 (i is 0-indexed, +1 for header, +1 for 1-indexed)
      rowsToDelete.push(i + 2);
    }
  }

  if (rowsToDelete.length === 0) {
    debug('[removePendingTransactions] No matching pending transactions found in sheet');
    return 0;
  }

  debug(`[removePendingTransactions] Deleting ${rowsToDelete.length} pending transactions at rows:`, rowsToDelete);

  // Get sheet metadata to find the sheet ID
  const metadata = await getSpreadsheetMetadata(token, sheetId);
  const sheet = metadata.sheets?.find(s => s.properties.title === tabName);

  if (!sheet) {
    throw new Error(`Sheet '${tabName}' not found`);
  }

  const sheetIdNum = sheet.properties.sheetId;

  // Delete rows in reverse order to maintain row indices
  // Google Sheets API requires deleting from bottom to top
  const requests = [];
  rowsToDelete.sort((a, b) => b - a); // Sort descending

  for (const rowNum of rowsToDelete) {
    requests.push({
      deleteDimension: {
        range: {
          sheetId: sheetIdNum,
          dimension: 'ROWS',
          startIndex: rowNum - 1, // 0-indexed
          endIndex: rowNum // Exclusive end
        }
      }
    });
  }

  // Execute all deletes in a single batch request
  const url = `${SHEETS_API_BASE}/${sheetId}:batchUpdate`;
  const body = { requests };
  await sheetsApiRequest(token, url, 'POST', body);

  debug(`[removePendingTransactions] Successfully removed ${rowsToDelete.length} pending transactions`);
  return rowsToDelete.length;
}

/**
 * Write transactions data to the Transactions tab with deduplication
 * @param {string} sheetId - Spreadsheet ID
 * @param {array} transactionsData - Array of transaction objects from backend
 * @param {array} accountsData - Array of account objects for enriching transaction data (optional)
 * @param {string} tier - Subscription tier: "free", "basic", or "pro" (default: "free")
 * @param {boolean} clearExisting - Whether to clear existing data before writing (default: true)
 * @returns {Promise<number>} Number of new transactions added
 */
async function writeTransactions(sheetId, transactionsData, accountsData = [], tier = 'free', clearExisting = true) {
  const tabName = 'Transactions';

  debug('[Sheets] writeTransactions called with', transactionsData?.length, 'transactions,', accountsData?.length, 'accounts, tier:', tier, 'clearExisting:', clearExisting);

  // Check if rules are enabled to determine headers
  const settings = await chrome.storage.sync.get(['enableRulesTab']);
  const includeRules = settings.enableRulesTab || false;
  const headers = getTransactionHeaders(tier, includeRules);

  // Ensure tab exists with proper headers
  await ensureTab(sheetId, tabName, headers);
  debug('[Sheets] Transactions tab ensured with headers');

  // Remove pending transactions that have been replaced by final posted transactions
  // This prevents duplicates when a pending transaction becomes final
  if (!clearExisting && transactionsData.length > 0) {
    const removedCount = await removePendingTransactions(sheetId, tabName, transactionsData, headers);
    if (removedCount > 0) {
      debug(`[Sheets] Removed ${removedCount} pending transactions that were replaced by posted transactions`);
    }
  }

  // Clear any existing data rows (including placeholder rows from tier changes)
  // Only clear if clearExisting is true (backfill mode)
  if (clearExisting) {
    const token = await getAuthToken();
    const metadata = await getSpreadsheetMetadata(token, sheetId);
    const transactionsSheet = metadata.sheets?.find(s => s.properties.title === tabName);

    if (transactionsSheet) {
      const sheetIdNum = transactionsSheet.properties.sheetId;

      // Check if there are any existing rows beyond the header
      const allData = await readRange(token, sheetId, `${tabName}!A:A`);

      if (allData.length > 1) {
        // Delete all rows from row 2 onwards
        debug('[Sheets] Clearing existing data rows before writing transactions');
        const url = `${SHEETS_API_BASE}/${sheetId}:batchUpdate`;
        const body = {
          requests: [{
            deleteDimension: {
              range: {
                sheetId: sheetIdNum,
                dimension: 'ROWS',
                startIndex: 1,  // Start from row 2 (0-indexed)
                endIndex: allData.length  // Delete up to current row count
              }
            }
          }]
        };

        await sheetsApiRequest(token, url, 'POST', body);
        debug('[Sheets] Cleared', allData.length - 1, 'existing rows');
      }
    }
  } else {
    debug('[Sheets] Skipping clear (incremental mode) - will append unique transactions');
  }

  // Create account lookup map for enriching transactions
  const accountMap = new Map();
  if (accountsData && accountsData.length > 0) {
    accountsData.forEach(acc => {
      accountMap.set(acc.account_id, {
        name: acc.label || acc.name || '',
        mask: acc.mask || '',
        persistent_account_id: acc.persistent_account_id || ''
      });
    });
  }

  // Deduplicate transactionsData by transaction_id before anything else.
  // Case-sensitive — Plaid IDs that differ only by case are distinct transactions.
  // Guards against Plaid pagination drift returning the exact same ID twice.
  const seenTxnIds = new Set();
  const beforeDedup = transactionsData.length;
  transactionsData = transactionsData.filter(txn => {
    const id = txn.transaction_id;
    if (!id || seenTxnIds.has(id)) return false;
    seenTxnIds.add(id);
    return true;
  });
  debug(`[Sheets] Dedup check: ${beforeDedup} in → ${transactionsData.length} out (${beforeDedup - transactionsData.length} exact duplicates removed)`);

  // Sort transactions by date in ascending order (oldest first)
  // This ensures chronological order when appending: older dates at top, newer at bottom
  transactionsData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // Transform transactions data to rows
  const syncedAt = new Date().toISOString();
  const rows = transactionsData.map(txn => {
    // Look up account info
    const accountInfo = accountMap.get(txn.account_id) || { name: '', mask: '', persistent_account_id: '' };

    // Phase 3.22.0: All tiers get the same columns (full 34 fields)
    // Only difference is number of days: FREE=7 days, PRO=730 days
    const baseRow = [
      txn.transaction_id || '',
      txn.account_id || '',
      accountInfo.persistent_account_id || '',
      accountInfo.name,  // account_name (enriched label)
      accountInfo.mask,  // account_mask (last 4 digits)
      txn.date || '',
      txn.authorized_date || '',
      txn.datetime || '',
      txn.authorized_datetime || '',
      txn.description_raw || txn.name || '',
      txn.merchant_name || '',
      txn.merchant_entity_id || '',
      txn.amount || '',
      txn.iso_currency_code || '',
      txn.unofficial_currency_code || '',
      txn.pending ? 'TRUE' : 'FALSE',
      txn.pending_transaction_id || '',
      txn.check_number || '',
      txn.personal_finance_category?.primary || '',
      txn.personal_finance_category?.detailed || '',
      txn.payment_channel || '',
      txn.transaction_type || '',
      txn.transaction_code || '',
      txn.location?.address || '',
      txn.location?.city || '',
      txn.location?.region || '',
      txn.location?.postal_code || '',
      txn.location?.country || '',
      txn.location?.lat || '',
      txn.location?.lon || '',
      txn.website || '',
      txn.logo_url || '',
      txn.source_institution || txn.institution_name || '',
      syncedAt
    ];

    // Add final_category if rules are enabled
    if (includeRules) {
      baseRow.push(txn.final_category || '');
    }

    return baseRow;
  });

  debug('[Sheets] Prepared', rows.length, 'transaction rows to write');

  // Append only unique transactions
  const newCount = await appendUniqueRows(sheetId, tabName, rows, 'transaction_id');

  debug('[Sheets] Wrote', newCount, 'new transactions (out of', rows.length, 'total)');

  // Phase 3.23.0: Removed sorting step for performance
  // Transactions from Plaid API are already in reverse chronological order
  // If users need sorting, they can manually sort in Google Sheets (Data > Sort range)

  return newCount;
}

/**
 * Verify access to a spreadsheet
 * @param {string} sheetId - Spreadsheet ID
 * @returns {Promise<object>} Basic spreadsheet info if accessible
 */
async function verifySheetAccess(sheetId) {
  debug('[Sheets] verifySheetAccess called for sheetId:', sheetId);
  try {
    const token = await getAuthToken();
    debug('[Sheets] verifySheetAccess got token, testing permissions');

    // First, verify the sheet exists and is readable
    const url = `${SHEETS_API_BASE}/${sheetId}?fields=properties.title,sheets.properties`;
    const metadata = await sheetsApiRequest(token, url);
    debug('[Sheets] Sheet exists and is readable:', metadata.properties.title);

    // Phase 3.13.1: Test WRITE permissions by attempting a test write
    // We need to actually try to write something to verify edit access
    try {
      debug('[Sheets] Testing write permissions with actual write attempt...');

      // Try to update spreadsheet properties (this requires edit access)
      // We'll just read and write back the same title (no visible change)
      const batchUrl = `${SHEETS_API_BASE}/${sheetId}:batchUpdate`;
      const testResponse = await fetch(batchUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          requests: [{
            updateSpreadsheetProperties: {
              properties: {
                title: metadata.properties.title  // Set to current title (no change)
              },
              fields: 'title'
            }
          }]
        })
      });

      debug('[Sheets] Write test response status:', testResponse.status);

      if (!testResponse.ok) {
        const errorData = await testResponse.json().catch(() => ({}));
        const errorMsg = errorData.error?.message || '';
        console.error('[Sheets] Write test failed:', testResponse.status, errorMsg);

        // Check if it's a permission error
        if (testResponse.status === 403 || errorMsg.toLowerCase().includes('permission') ||
            errorMsg.toLowerCase().includes('does not have') || errorMsg.toLowerCase().includes('denied')) {
          throw new PermissionError(
            'You do not have edit access to this sheet. Make sure the sheet is owned by your account or shared with edit permissions.'
          );
        }

        // Other error - this is also concerning, throw it
        throw new Error(`Unable to verify write access: ${errorMsg}`);
      } else {
        debug('[Sheets] ✓ Write permissions confirmed');
      }
    } catch (testError) {
      console.error('[Sheets] Write permission test error:', testError);

      // If it's a PermissionError, re-throw it
      if (testError.isPermissionError || testError.name === 'PermissionError') {
        throw testError;
      }

      // Any other error during write test should also block connection
      throw testError;
    }

    return metadata;
  } catch (error) {
    debug('[Sheets] verifySheetAccess caught error:', error);
    debug('[Sheets] Error name:', error.name, 'isAuthError:', error.isAuthError);
    throw error;
  }
}

/**
 * Read a range from a spreadsheet (wrapper for popup.js)
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} range - Range to read (e.g., "Sheet1!A1:B10")
 * @returns {Promise<array>} Values from the range
 */
async function readRangeWithAuth(sheetId, range) {
  const token = await getAuthToken();
  return await readRange(token, sheetId, range);
}

/**
 * Clear all transaction data and update headers for new tier
 * Phase 3.16.0: Tier change detection - prevents column misalignment
 * @param {string} sheetId - Spreadsheet ID
 * @param {string} tier - New tier ('free', 'basic', 'pro')
 * @returns {Promise<void>}
 */
async function clearTransactionsTab(sheetId, tier = 'free', skipPlaceholders = false) {
  const tabName = 'Transactions';
  const token = await getAuthToken();

  debug(`[Sheets] Clearing Transactions tab and updating headers for tier: ${tier}, skipPlaceholders: ${skipPlaceholders}`);

  // Get current sheet metadata to find the Transactions tab sheet ID
  const metadata = await getSpreadsheetMetadata(token, sheetId);
  const transactionsSheet = metadata.sheets?.find(s => s.properties.title === tabName);

  if (!transactionsSheet) {
    debug('[Sheets] Transactions tab does not exist, nothing to clear');
    return;
  }

  const sheetIdNum = transactionsSheet.properties.sheetId;

  // Clear all data except row 1 (headers)
  // Delete all rows from row 2 onwards
  const url = `${SHEETS_API_BASE}/${sheetId}:batchUpdate`;
  const body = {
    requests: [{
      deleteDimension: {
        range: {
          sheetId: sheetIdNum,
          dimension: 'ROWS',
          startIndex: 1,  // Start from row 2 (0-indexed)
          endIndex: 10000  // Delete up to row 10000 (should be more than enough)
        }
      }
    }]
  };

  await sheetsApiRequest(token, url, 'POST', body);
  debug('[Sheets] Cleared all transaction data');

  // Clear entire header row first (to remove any old columns)
  const clearHeaderUrl = `${SHEETS_API_BASE}/${sheetId}/values/${encodeURIComponent(tabName + '!1:1')}:clear`;
  await sheetsApiRequest(token, clearHeaderUrl, 'POST', {});
  debug('[Sheets] Cleared header row');

  // Update headers for new tier
  const settings = await chrome.storage.sync.get(['enableRulesTab']);
  const includeRules = settings.enableRulesTab || false;
  const headers = getTransactionHeaders(tier, includeRules);

  await writeHeaders(token, sheetId, tabName, headers);
  debug(`[Sheets] Updated headers for ${tier} tier (${headers.length} columns)`);

  // Add placeholder rows to show loading state (unless skipped for immediate sync)
  if (!skipPlaceholders) {
    const placeholderRows = 15;
    const placeholderData = [];
    for (let i = 0; i < placeholderRows; i++) {
      const row = new Array(headers.length).fill('');
      row[0] = i === 7 ? 'Loading transactions...' : '';  // Show message in middle row
      placeholderData.push(row);
    }

    // Phase 3.23.0: Use RAW mode for fast writes (no parsing overhead)
    const placeholderUrl = `${SHEETS_API_BASE}/${sheetId}/values/${tabName}!A2:append?valueInputOption=RAW`;
    await sheetsApiRequest(token, placeholderUrl, 'POST', { values: placeholderData });
    debug(`[Sheets] Added ${placeholderRows} placeholder rows for loading state`);
  } else {
    debug('[Sheets] Skipped placeholder rows (immediate sync)');
  }
}

// Export functions and error classes for use in popup
window.SheetsAPI = {
  ensureTab,
  appendUniqueRows,
  getAuthToken,
  writeAccounts,
  writeTransactions,
  verifySheetAccess,
  readRange: readRangeWithAuth,  // Export wrapper that includes token
  clearTransactionsTab,
  AuthenticationError,
  PermissionError
};
