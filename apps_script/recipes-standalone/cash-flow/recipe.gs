/**
 * SheetLink Recipe: Cash Flow
 * Version: 2.1.0
 * Standalone Edition
 *
 * Description: Weekly cash flow forecast with balance tracking
 *
 * Creates: CashFlow Weekly
 * Requires: date, amount, category_primary, pending, account_name columns
 */

// ========================================
// UTILITIES (inlined from utils.gs)
// ========================================

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
    // Move newly created sheet to the end (furthest right)
    sheet.activate();
    ss.moveActiveSheet(ss.getNumSheets());
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
 * Get the most recent month from transaction data
 * @param {Object[]} transactions - Array of transaction objects
 * @returns {string} Most recent month in format "YYYY-MM"
 */
function getMostRecentMonth(transactions) {
  if (!transactions || transactions.length === 0) {
    return getCurrentMonth();
  }

  // Find the most recent date
  let mostRecentDate = null;
  transactions.forEach(txn => {
    const date = parseDate(txn.date);
    if (date && (!mostRecentDate || date > mostRecentDate)) {
      mostRecentDate = date;
    }
  });

  if (!mostRecentDate) {
    return getCurrentMonth();
  }

  const month = (mostRecentDate.getMonth() + 1).toString().padStart(2, '0');
  return `${mostRecentDate.getFullYear()}-${month}`;
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
 * Check for transactions and show helpful modal if missing
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {boolean} True if transactions exist, false otherwise
 */
function checkTransactionsOrPrompt(ss) {
  const validation = validateTransactionsSheet(ss);

  if (!validation.valid) {
    const ui = SpreadsheetApp.getUi();
    const response = ui.alert(
      'No Transaction Data Found',
      'This recipe requires transaction data to run.\n\n' +
      'Please either:\n' +
      '• Sync your transactions with SheetLink, or\n' +
      '• Run "Populate Dummy Data" from Settings menu to test with sample data\n\n' +
      'Would you like to continue anyway?',
      ui.ButtonSet.YES_NO
    );

    return response == ui.Button.YES;
  }

  return true;
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

/**
 * Format date columns in Transactions sheet
 * Phase 3.23.0: Extension writes dates as text (RAW mode) for speed
 * Recipes format date columns when needed for formulas
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 */
function formatTransactionDateColumns(transactionsSheet, headerMap) {
  const dateCol = getColumnIndex(headerMap, 'date');
  const authorizedDateCol = getColumnIndex(headerMap, 'authorized_date');

  if (!dateCol && !authorizedDateCol) {
    Logger.log('[formatTransactionDateColumns] No date columns found');
    return;
  }

  const lastRow = transactionsSheet.getLastRow();
  if (lastRow < 2) {
    Logger.log('[formatTransactionDateColumns] No data to format');
    return;
  }

  Logger.log('[formatTransactionDateColumns] Formatting date columns...');

  // Format 'date' column
  if (dateCol) {
    const dateRange = transactionsSheet.getRange(2, dateCol, lastRow - 1, 1);
    dateRange.setNumberFormat('yyyy-mm-dd');
    Logger.log(`[formatTransactionDateColumns] Formatted 'date' column (${dateCol})`);
  }

  // Format 'authorized_date' column
  if (authorizedDateCol) {
    const authDateRange = transactionsSheet.getRange(2, authorizedDateCol, lastRow - 1, 1);
    authDateRange.setNumberFormat('yyyy-mm-dd');
    Logger.log(`[formatTransactionDateColumns] Formatted 'authorized_date' column (${authorizedDateCol})`);
  }

  Logger.log('[formatTransactionDateColumns] Date formatting complete');
}

/**
 * Format pending column in Transactions sheet to convert text to boolean
 * Phase 3.23.0: Extension writes pending as text "FALSE"/"TRUE" (RAW mode) for speed
 * Recipes format pending column when needed for formulas
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 */
function formatTransactionPendingColumn(transactionsSheet, headerMap) {
  const pendingCol = getColumnIndex(headerMap, 'pending');

  if (!pendingCol) {
    Logger.log('[formatTransactionPendingColumn] Pending column not found');
    return;
  }

  const lastRow = transactionsSheet.getLastRow();
  if (lastRow < 2) {
    Logger.log('[formatTransactionPendingColumn] No data to format');
    return;
  }

  Logger.log('[formatTransactionPendingColumn] Converting text to boolean in pending column...');

  // Read current values
  const pendingRange = transactionsSheet.getRange(2, pendingCol, lastRow - 1, 1);
  const values = pendingRange.getValues();

  // Convert text "FALSE"/"TRUE" to boolean
  const booleanValues = values.map(row => {
    const val = row[0];
    if (val === 'FALSE' || val === 'false' || val === false) {
      return [false];
    } else if (val === 'TRUE' || val === 'true' || val === true) {
      return [true];
    }
    return [false]; // Default to false if unclear
  });

  // Write back boolean values
  pendingRange.setValues(booleanValues);

  Logger.log(`[formatTransactionPendingColumn] Converted ${booleanValues.length} rows to boolean`);
}


// ========================================
// RECIPE LOGIC
// ========================================

function runCashFlowRecipe(ss) {
  try {
    // Ensure we have a spreadsheet object
    if (!ss) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    // Check for transactions data
    if (!checkTransactionsOrPrompt(ss)) {
      return;
    }

    logRecipe("Cash Flow", "Starting Weekly Cash Flow Forecast recipe");

    // Get transactions sheet
    const transactionsSheet = getTransactionsSheet(ss);
    const headerMap = getHeaderMap(transactionsSheet);

    // Verify required columns exist
    const requiredColumns = ['date', 'amount', 'category_primary', 'pending', 'account_name'];
    for (const col of requiredColumns) {
      if (!getColumnIndex(headerMap, col)) {
        return {
          success: false,
          error: `Required column "${col}" not found in transactions sheet`
        };
      }
    }

    // Format date and pending columns
    formatTransactionDateColumns(transactionsSheet, headerMap);
    formatTransactionPendingColumn(transactionsSheet, headerMap);

    // Create output sheets
    const weeklySheet = getOrCreateSheet(ss, "CashFlow Weekly");

    // Setup weekly cash flow view
    setupWeeklyCashFlow(weeklySheet, transactionsSheet, headerMap, ss);

    logRecipe("Cash Flow", "Recipe completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Cash Flow recipe error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup weekly cash flow view with horizontal week layout
 * @param {Sheet} sheet - Weekly sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupWeeklyCashFlow(sheet, transactionsSheet, headerMap, ss) {
  // Clear existing data
  sheet.clear();

  // Get all transactions
  const transactions = getTransactionData(transactionsSheet);

  // Filter out pending transactions
  const validTxns = transactions.filter(txn => {
    return !(txn.pending === true || txn.pending === "TRUE" || txn.pending === "true");
  });

  if (validTxns.length === 0) {
    sheet.getRange("A1").setValue("No transaction data available. Please sync transactions first.");
    return;
  }

  // Get all unique weeks from transactions
  const allWeeksSet = new Set();
  validTxns.forEach(txn => {
    const date = parseDate(txn.date);
    if (!date) return;
    const week = getISOWeek(date);
    allWeeksSet.add(week);
  });

  // Sort weeks chronologically
  const allWeeks = Array.from(allWeeksSet).sort();

  // Determine how many weeks to show (default: last 16 weeks)
  const weeksToShow = 16;
  const recentWeeks = allWeeks.slice(-weeksToShow);

  if (recentWeeks.length === 0) {
    sheet.getRange("A1").setValue("No weekly data available.");
    return;
  }

  Logger.log(`[setupWeeklyCashFlow] Showing ${recentWeeks.length} weeks: ${recentWeeks[0]} to ${recentWeeks[recentWeeks.length - 1]}`);

  // Add title section at the top
  sheet.getRange(1, 1)
    .setValue("Cash Flow Forecast")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");

  sheet.getRange(2, 1)
    .setValue("Weekly cash flow analysis showing income, expenses, net flow, and running balance over time. Enter your ending cash balance and the date as of that balance in the yellow cells below.")
    .setFontSize(11)
    .setWrap(false);

  // Build table structure (starting at row 4)
  createCashFlowTable(sheet, transactionsSheet, headerMap, recentWeeks, validTxns, ss, 4);

  // Freeze rows and columns (explicitly unfreeze first, then refreeze)
  sheet.setFrozenRows(0); // Unfreeze all rows first
  sheet.setFrozenColumns(0); // Unfreeze all columns first
  sheet.setFrozenRows(6); // Freeze after title, description, and header rows
  sheet.setFrozenColumns(2);
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
}

/**
 * Create cash flow table with horizontal weeks
 * @param {Sheet} sheet - Target sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {string[]} weeks - Array of ISO weeks to display
 * @param {Object[]} validTxns - Array of valid transaction objects
 * @param {Spreadsheet} ss - Active spreadsheet
 * @param {number} startRow - Starting row for the table (default 1)
 */
function createCashFlowTable(sheet, transactionsSheet, headerMap, weeks, validTxns, ss, startRow = 1) {
  const numWeeks = weeks.length;

  // Config section
  sheet.getRange(startRow, 1).setValue("Configuration").setFontSize(12).setFontWeight("bold").setFontColor("#023820");
  sheet.getRange(startRow, 2).setValue("Ending Balance:").setFontWeight("bold");
  sheet.getRange(startRow, 3).setValue(0).setNumberFormat("$#,##0.00").setBackground("#fffbea");
  sheet.getRange(startRow, 4).setValue("As of Date:").setFontWeight("bold");
  sheet.getRange(startRow, 5).setValue(new Date()).setNumberFormat("yyyy-mm-dd").setBackground("#fffbea");

  // Create named ranges for config
  createNamedRange(sheet, "CashFlow_StartingBalance", `C${startRow}`);
  createNamedRange(sheet, "CashFlow_BalanceDate", `E${startRow}`);

  // Header row 1 (Week labels)
  const headerRow1 = ["Week Number", ""];
  weeks.forEach(week => {
    headerRow1.push(week);
  });

  const headerRow1Index = startRow + 1;
  sheet.getRange(headerRow1Index, 1, 1, headerRow1.length).setValues([headerRow1]);

  // Header row 2 (Week ending dates - Sundays)
  const headerRow2 = ["Week Ending", ""];
  weeks.forEach(week => {
    const weekStart = getWeekStartDate(week);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Add 6 days to get Sunday
    headerRow2.push(weekEnd);
  });

  const headerRow2Index = startRow + 2;
  sheet.getRange(headerRow2Index, 1, 1, headerRow2.length)
    .setValues([headerRow2])
    .setNumberFormat("mmm d");

  // Format headers
  sheet.getRange(headerRow1Index, 1, 2, headerRow1.length)
    .setBackground("#0b703a")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Left justify column A headers
  sheet.getRange(headerRow1Index, 1, 2, 1).setHorizontalAlignment("left");

  // Get column indices for formulas
  const dateCol = getColumnIndex(headerMap, 'date');
  const amountCol = getColumnIndex(headerMap, 'amount');
  const categoryCol = getColumnIndex(headerMap, 'category_primary');
  const pendingCol = getColumnIndex(headerMap, 'pending');
  const accountCol = getColumnIndex(headerMap, 'account_name');

  // Convert to column letters
  const dateColLetter = columnIndexToLetter(dateCol);
  const amountColLetter = columnIndexToLetter(amountCol);
  const categoryColLetter = columnIndexToLetter(categoryCol);
  const pendingColLetter = columnIndexToLetter(pendingCol);
  const accountColLetter = columnIndexToLetter(accountCol);

  // Data rows
  let currentRow = startRow + 3;

  // Add Income breakdown header row
  const incomeBreakdownHeader = ["Account", "Category"];
  for (let i = 0; i < numWeeks; i++) {
    incomeBreakdownHeader.push("");
  }
  sheet.getRange(currentRow, 1, 1, incomeBreakdownHeader.length).setValues([incomeBreakdownHeader]);
  sheet.getRange(currentRow, 1, 1, 2).setFontWeight("bold").setFontSize(9);
  currentRow++;

  // Add Income breakdown by Account and Category
  const incomeBreakdownStartRow = currentRow;
  const incomeByAccount = getTransactionsByAccountAndCategory(validTxns, true);
  Object.keys(incomeByAccount).sort().forEach(account => {
    const categories = incomeByAccount[account];
    Object.keys(categories).sort().forEach(category => {
      const categoryRow = [account, category];
      weeks.forEach((week, index) => {
        const colLetter = columnIndexToLetter(3 + index);
        const weekEndCell = `${colLetter}$${headerRow2Index}`;
        const weekStartFormula = `(${weekEndCell}-6)`;

        // Income formula for this specific account + category
        // Reference account and category from columns A and B
        const formula = `=-SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                        `Transactions!$${dateColLetter}:$${dateColLetter}, ">="&${weekStartFormula}, ` +
                        `Transactions!$${dateColLetter}:$${dateColLetter}, "<="&${weekEndCell}, ` +
                        `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE, ` +
                        `Transactions!$${amountColLetter}:$${amountColLetter}, "<0", ` +
                        `Transactions!$${accountColLetter}:$${accountColLetter}, $A${currentRow}, ` +
                        `Transactions!$${categoryColLetter}:$${categoryColLetter}, $B${currentRow})`;
        categoryRow.push(formula);
      });
      sheet.getRange(currentRow, 1, 1, categoryRow.length).setValues([categoryRow]);
      sheet.getRange(currentRow, 3, 1, numWeeks).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"").setFontSize(8);
      currentRow++;
    });
  });
  const incomeBreakdownEndRow = currentRow - 1;

  // Income summary row
  const incomeRow = ["Cash Inflows", ""];
  weeks.forEach((week, index) => {
    const colLetter = columnIndexToLetter(3 + index);
    // Sum all income breakdown rows above
    const formula = `=SUM(${colLetter}${incomeBreakdownStartRow}:${colLetter}${incomeBreakdownEndRow})`;
    incomeRow.push(formula);
  });

  sheet.getRange(currentRow, 1, 1, incomeRow.length).setValues([incomeRow]);
  sheet.getRange(currentRow, 1, 1, 2 + numWeeks)
    .setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"")
    .setBackground("#d9ead3")
    .setFontWeight("bold");
  const incomeRowNumber = currentRow;
  currentRow++;

  // Blank row
  currentRow++;

  // Add Expenses breakdown header row
  const expensesBreakdownHeader = ["Account", "Category"];
  for (let i = 0; i < numWeeks; i++) {
    expensesBreakdownHeader.push("");
  }
  sheet.getRange(currentRow, 1, 1, expensesBreakdownHeader.length).setValues([expensesBreakdownHeader]);
  sheet.getRange(currentRow, 1, 1, 2).setFontWeight("bold").setFontSize(9);
  currentRow++;

  // Add Expenses breakdown by Account and Category
  const expensesBreakdownStartRow = currentRow;
  const expensesByAccount = getTransactionsByAccountAndCategory(validTxns, false);
  Object.keys(expensesByAccount).sort().forEach(account => {
    const categories = expensesByAccount[account];
    Object.keys(categories).sort().forEach(category => {
      const categoryRow = [account, category];
      weeks.forEach((week, index) => {
        const colLetter = columnIndexToLetter(3 + index);
        const weekEndCell = `${colLetter}$${headerRow2Index}`;
        const weekStartFormula = `(${weekEndCell}-6)`;

        // Expenses formula for this specific account + category
        // Reference account and category from columns A and B
        const formula = `=SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                        `Transactions!$${dateColLetter}:$${dateColLetter}, ">="&${weekStartFormula}, ` +
                        `Transactions!$${dateColLetter}:$${dateColLetter}, "<="&${weekEndCell}, ` +
                        `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE, ` +
                        `Transactions!$${amountColLetter}:$${amountColLetter}, ">0", ` +
                        `Transactions!$${accountColLetter}:$${accountColLetter}, $A${currentRow}, ` +
                        `Transactions!$${categoryColLetter}:$${categoryColLetter}, $B${currentRow})`;
        categoryRow.push(formula);
      });
      sheet.getRange(currentRow, 1, 1, categoryRow.length).setValues([categoryRow]);
      sheet.getRange(currentRow, 3, 1, numWeeks).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"").setFontSize(8);
      currentRow++;
    });
  });
  const expensesBreakdownEndRow = currentRow - 1;

  // Expenses summary row
  const expensesRow = ["Cash Outflows", ""];
  weeks.forEach((week, index) => {
    const colLetter = columnIndexToLetter(3 + index);
    // Sum all expenses breakdown rows above
    const formula = `=SUM(${colLetter}${expensesBreakdownStartRow}:${colLetter}${expensesBreakdownEndRow})`;
    expensesRow.push(formula);
  });

  sheet.getRange(currentRow, 1, 1, expensesRow.length).setValues([expensesRow]);
  sheet.getRange(currentRow, 1, 1, 2 + numWeeks)
    .setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"")
    .setBackground("#f4cccc")
    .setFontWeight("bold");
  const expensesRowNumber = currentRow;
  currentRow++;

  // Blank row
  currentRow++;

  // Net Flow section
  const netFlowRow = ["Net Cashflow", ""];
  for (let i = 0; i < numWeeks; i++) {
    const colLetter = columnIndexToLetter(3 + i);
    const formula = `=${colLetter}${expensesRowNumber}-${colLetter}${incomeRowNumber}`;
    netFlowRow.push(formula);
  }

  sheet.getRange(currentRow, 1, 1, netFlowRow.length).setValues([netFlowRow]);
  sheet.getRange(currentRow, 3, 1, numWeeks)
    .setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"")
    .setFontWeight("bold");

  // Add conditional formatting for negative net flow
  const netFlowRange = sheet.getRange(currentRow, 3, 1, numWeeks);
  const negativeRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setFontColor("#cc0000")
    .setRanges([netFlowRange])
    .build();
  sheet.setConditionalFormatRules([negativeRule]);
  const netFlowRowNumber = currentRow;
  currentRow++;

  // Ending Balance section (date-aware cumulative)
  // Logic: "As of Date" represents the ENDING BALANCE on that date
  // The balance shown for each week is the ending balance at the END of that week
  // - If week end date < balance date: work backwards from balance date
  // - If week contains balance date: balance at week end = balance_date + txns from (balance_date+1) to week_end
  // - If week start date > balance date: work forwards from previous week
  const balanceRow = ["Ending Balance", ""];
  const balanceCell = `$C$${startRow}`;
  const dateCell = `$E$${startRow}`;

  for (let i = 0; i < numWeeks; i++) {
    const colLetter = columnIndexToLetter(3 + i);
    const weekEndCell = `${colLetter}$${headerRow2Index}`; // Week-ending dates row
    const weekStartCell = `(${colLetter}$${headerRow2Index}-6)`; // Week start = week end - 6 days

    // Complex formula that handles date-aware balance calculation:
    // All balances shown are ENDING balance at the end of the week (week_end date)
    // The balance_date is just an anchor point

    let formula;
    if (i === 0) {
      // First week - need to determine if before, contains, or after balance date
      formula = `=IF(INT(${weekEndCell})=INT(${dateCell}), ` +
                // Week end date EQUALS balance date: show exact balance
                `${balanceCell}, ` +
                `IF(${weekEndCell}<${dateCell}, ` +
                // Week ends BEFORE balance date: work backwards
                // Plaid: income=negative, expenses=positive. SUMIFS gives net. Subtract net to go backwards.
                // Balance at week_end = Balance at balance_date + SUM(future transactions)
                `${balanceCell} + SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, ">"&${weekEndCell}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, "<="&${dateCell}, ` +
                `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE), ` +
                // Check if week CONTAINS balance date
                `IF(AND(${weekStartCell}<=${dateCell}, ${weekEndCell}>=${dateCell}), ` +
                // Balance at week_end = Balance at balance_date - SUM(transactions from balance_date+1 to week_end)
                // Subtract because we're going forward: expenses (positive) reduce balance, income (negative) increases it
                `${balanceCell} - SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, ">"&${dateCell}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, "<="&${weekEndCell}, ` +
                `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE), ` +
                // Week starts AFTER balance date: work forwards
                // Balance at week_end = Balance at balance_date - SUM(all transactions from balance_date+1 to week_end)
                `${balanceCell} - SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, ">"&${dateCell}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, "<="&${weekEndCell}, ` +
                `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE))))`;
    } else {
      // Subsequent weeks - same logic but can reference previous week
      const prevColLetter = columnIndexToLetter(2 + i - 1);
      formula = `=IF(INT(${weekEndCell})=INT(${dateCell}), ` +
                // Week end date EQUALS balance date: show exact balance
                `${balanceCell}, ` +
                `IF(${weekEndCell}<${dateCell}, ` +
                // Week ends BEFORE balance date: work backwards
                `${balanceCell} + SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, ">"&${weekEndCell}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, "<="&${dateCell}, ` +
                `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE), ` +
                // Check if week CONTAINS balance date
                `IF(AND(${weekStartCell}<=${dateCell}, ${weekEndCell}>=${dateCell}), ` +
                `${balanceCell} - SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, ">"&${dateCell}, ` +
                `Transactions!$${dateColLetter}:$${dateColLetter}, "<="&${weekEndCell}, ` +
                `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE), ` +
                // Week starts AFTER balance date: use previous week balance + net flow
                `${prevColLetter}${currentRow}+${colLetter}${netFlowRowNumber})))`;
    }

    balanceRow.push(formula);
  }

  sheet.getRange(currentRow, 1, 1, balanceRow.length).setValues([balanceRow]);
  sheet.getRange(currentRow, 3, 1, numWeeks)
    .setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"")
    .setFontWeight("bold");
  const balanceRowNumber = currentRow;

  // Add conditional formatting for low balance (< $500)
  const balanceRange = sheet.getRange(currentRow, 3, 1, numWeeks);
  const lowBalanceRule = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(500)
    .setBackground("#f4cccc")
    .setFontColor("#990000")
    .setRanges([balanceRange])
    .build();

  const existingRules = sheet.getConditionalFormatRules();
  existingRules.push(lowBalanceRule);
  sheet.setConditionalFormatRules(existingRules);
  currentRow++;

  // Add summary row
  currentRow++;
  sheet.getRange(currentRow, 1).setValue("SUMMARY").setFontWeight("bold").setFontSize(12);
  currentRow++;

  // Total Income
  sheet.getRange(currentRow, 1).setValue("Total Inflows:");
  const totalIncomeFormula = `=SUM(C${incomeRowNumber}:${columnIndexToLetter(2 + numWeeks)}${incomeRowNumber})`;
  sheet.getRange(currentRow, 2).setFormula(totalIncomeFormula).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"").setBackground("#d9ead3");
  currentRow++;

  // Total Expenses
  sheet.getRange(currentRow, 1).setValue("Total Outflows:");
  const totalExpensesFormula = `=SUM(C${expensesRowNumber}:${columnIndexToLetter(2 + numWeeks)}${expensesRowNumber})`;
  sheet.getRange(currentRow, 2).setFormula(totalExpensesFormula).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"").setBackground("#f4cccc");
  currentRow++;

  // Total Net Flow
  sheet.getRange(currentRow, 1).setValue("Total Net Cashflow:");
  const totalNetFormula = `=B${currentRow - 1}-B${currentRow - 2}`;
  sheet.getRange(currentRow, 2).setFormula(totalNetFormula).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"").setFontWeight("bold");
  currentRow++;

  // Lowest Balance
  sheet.getRange(currentRow, 1).setValue("Lowest Balance:");
  const minBalanceFormula = `=MIN(C${balanceRowNumber}:${columnIndexToLetter(2 + numWeeks)}${balanceRowNumber})`;
  sheet.getRange(currentRow, 2).setFormula(minBalanceFormula).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"").setBackground("#fff2cc");
  currentRow++;

  // Final Balance
  sheet.getRange(currentRow, 1).setValue("Final Balance:");
  const finalBalanceFormula = `=${columnIndexToLetter(2 + numWeeks)}${balanceRowNumber}`;
  sheet.getRange(currentRow, 2).setFormula(finalBalanceFormula).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"").setBackground("#fff2cc").setFontWeight("bold");

  Logger.log("[createCashFlowTable] Cash flow table created successfully");
}

/**
 * Get transactions organized by account and category
 * @param {Object[]} transactions - Array of transaction objects
 * @param {boolean} isIncome - True for income, false for expenses
 * @returns {Object} Nested object: {account: {category: true}}
 */
function getTransactionsByAccountAndCategory(transactions, isIncome) {
  const result = {};

  transactions.forEach(txn => {
    const amount = parseFloat(txn.amount);
    const category = txn.category_primary || 'Uncategorized';
    const account = txn.account_name || 'Unknown Account';

    // Filter based on income/expense
    const isIncomeTransaction = amount < 0 || category === 'INCOME';
    if (isIncome && !isIncomeTransaction) return;
    if (!isIncome && isIncomeTransaction) return;

    // Initialize account if not exists
    if (!result[account]) {
      result[account] = {};
    }

    // Add category to account
    result[account][category] = true;
  });

  return result;
}

/**
 * Get week start date from ISO week string
 * @param {string} isoWeek - ISO week in format "YYYY-WW"
 * @returns {Date} Week start date (Monday)
 */
function getWeekStartDate(isoWeek) {
  const parts = isoWeek.split('-W');
  const year = parseInt(parts[0]);
  const week = parseInt(parts[1]);

  // January 4th is always in week 1
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = jan4.getDay() || 7; // Sunday = 7
  const weekStart = new Date(jan4);
  weekStart.setDate(jan4.getDate() - dayOfWeek + 1 + (week - 1) * 7);

  return weekStart;
}

/**
 * Convert column index to letter (1-based)
 * @param {number} index - Column index (1-based)
 * @returns {string} Column letter (A, B, C, ..., AA, AB, ...)
 */
function columnIndexToLetter(index) {
  let letter = '';
  while (index > 0) {
    const remainder = (index - 1) % 26;
    letter = String.fromCharCode(65 + remainder) + letter;
    index = Math.floor((index - 1) / 26);
  }
  return letter;
}


// ========================================
// MENU INTEGRATION
// ========================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Cash Flow')
    .addItem('Run Recipe', 'runCashFlowRecipe')
    .addToUi();
}
