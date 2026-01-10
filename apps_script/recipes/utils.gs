/**
 * SheetLink Recipes Utilities
 * Phase 3.23.0 - Recipes Framework
 *
 * Shared utility functions for all recipes.
 * Handles sheet operations, header lookups, and data validation.
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
    Logger.log(`Created new sheet: ${sheetName}`);
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
      error: `Sheet "${TRANSACTIONS_SHEET_NAME}" not found. Please sync your transactions first.`
    };
  }

  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return {
      valid: false,
      error: "No transaction data found. Please sync your transactions first."
    };
  }

  return { valid: true, error: null };
}

/**
 * Get header row and create column index map
 * @param {Sheet} sheet - Sheet to read headers from
 * @returns {Object} Map of column names to indices (1-based)
 */
function getHeaderMap(sheet) {
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const headerMap = {};

  headers.forEach((header, index) => {
    if (header) {
      headerMap[header.toString().trim()] = index + 1; // 1-based for Apps Script
    }
  });

  return headerMap;
}

/**
 * Get column index by header name
 * @param {Object} headerMap - Header map from getHeaderMap()
 * @param {string} columnName - Column name to find
 * @returns {number|null} Column index (1-based) or null if not found
 */
function getColumnIndex(headerMap, columnName) {
  return headerMap[columnName] || null;
}

/**
 * Clear sheet contents (preserving headers if specified)
 * @param {Sheet} sheet - Sheet to clear
 * @param {boolean} preserveHeaders - Whether to keep row 1
 */
function clearSheetData(sheet, preserveHeaders = true) {
  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  if (preserveHeaders && lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, lastCol).clear();
  } else if (!preserveHeaders && lastRow > 0) {
    sheet.clear();
  }
}

/**
 * Set sheet headers
 * @param {Sheet} sheet - Sheet to write headers to
 * @param {string[]} headers - Array of header names
 */
function setHeaders(sheet, headers) {
  if (headers.length === 0) return;

  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight("bold")
    .setBackground("#f3f3f3");
}

/**
 * Format sheet with frozen header row
 * @param {Sheet} sheet - Sheet to format
 */
function formatSheet(sheet) {
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, sheet.getLastColumn());
}

/**
 * Get all transaction data as array of objects
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @returns {Object[]} Array of transaction objects
 */
function getTransactionData(transactionsSheet) {
  const lastRow = transactionsSheet.getLastRow();
  const lastCol = transactionsSheet.getLastColumn();

  if (lastRow < 2) return [];

  const headers = transactionsSheet.getRange(1, 1, 1, lastCol).getValues()[0];
  const data = transactionsSheet.getRange(2, 1, lastRow - 1, lastCol).getValues();

  return data.map(row => {
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = row[index];
    });
    return obj;
  });
}

/**
 * Parse date string to Date object
 * @param {string|Date} dateValue - Date string or Date object
 * @returns {Date|null} Date object or null if invalid
 */
function parseDate(dateValue) {
  if (dateValue instanceof Date) {
    return dateValue;
  }

  if (typeof dateValue === 'string') {
    const parsed = new Date(dateValue);
    return isNaN(parsed.getTime()) ? null : parsed;
  }

  return null;
}

/**
 * Get ISO week number from date
 * @param {Date} date - Date object
 * @returns {string} ISO week in format "YYYY-WW"
 */
function getISOWeek(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 4 - (d.getDay() || 7));
  const yearStart = new Date(d.getFullYear(), 0, 1);
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
  return `${d.getFullYear()}-W${weekNo.toString().padStart(2, '0')}`;
}

/**
 * Get current month in format "YYYY-MM"
 * @returns {string} Current month
 */
function getCurrentMonth() {
  const now = new Date();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  return `${now.getFullYear()}-${month}`;
}

/**
 * Check if transaction is in specific month
 * @param {Date|string} date - Transaction date
 * @param {string} targetMonth - Target month in format "YYYY-MM"
 * @returns {boolean}
 */
function isInMonth(date, targetMonth) {
  const d = parseDate(date);
  if (!d) return false;

  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const transactionMonth = `${d.getFullYear()}-${month}`;

  return transactionMonth === targetMonth;
}

/**
 * Format currency value
 * @param {number} value - Numeric value
 * @returns {string} Formatted currency
 */
function formatCurrency(value) {
  return `$${Math.abs(value).toFixed(2)}`;
}

/**
 * Log recipe execution
 * @param {string} recipeName - Name of recipe
 * @param {string} message - Log message
 */
function logRecipe(recipeName, message) {
  Logger.log(`[${recipeName}] ${message}`);
}

/**
 * Show toast notification
 * @param {string} message - Message to display
 * @param {string} title - Toast title
 * @param {number} timeout - Timeout in seconds
 */
function showToast(message, title = "SheetLink Recipes", timeout = 5) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast(message, title, timeout);
}

/**
 * Show error alert
 * @param {string} message - Error message
 */
function showError(message) {
  SpreadsheetApp.getUi().alert("Error", message, SpreadsheetApp.getUi().ButtonSet.OK);
}

/**
 * Create named range
 * @param {Sheet} sheet - Sheet containing the range
 * @param {string} name - Name for the range
 * @param {string} a1Notation - A1 notation for the range (e.g., "B2")
 */
function createNamedRange(sheet, name, a1Notation) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const existingRange = ss.getRangeByName(name);

  if (existingRange) {
    ss.removeNamedRange(name);
  }

  const range = sheet.getRange(a1Notation);
  ss.setNamedRange(name, range);
}
