/**
 * SheetLink Recipe: Budget Tracker
 * Version: 2.1.0
 * Standalone Edition
 *
 * Description: Track spending across categories with monthly actuals, budget targets, and variance analysis
 *
 * Creates: Budget Monthly
 * Requires: date, amount, category_primary, pending, account_name columns
 */

// ========================================
// UTILITIES (inlined from utils.gs)
// ========================================

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

/**
 * Run the Plaid Category Budget recipe
 * @param {Spreadsheet} ss - Active spreadsheet (optional, defaults to active sheet)
 * @returns {Object} {success: boolean, error: string|null}
 */
function runBudgetRecipe(ss) {
  try {
    // If no spreadsheet provided, use the active one
    if (!ss) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    // Check for transactions data
    if (!checkTransactionsOrPrompt(ss)) {
      return;
    }

    logRecipe("Budget", "Starting Plaid Category Budget recipe");

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

    // Create output sheet (consolidate everything into Budget Monthly)
    const budgetSheet = getOrCreateSheet(ss, "Budget Monthly");

    // Setup the multi-month budget tracker
    setupMultiMonthBudget(budgetSheet, transactionsSheet, headerMap, ss);

    logRecipe("Budget", "Recipe completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Budget recipe error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup multi-month budget tracker with actuals, budget, and variance
 * @param {Sheet} sheet - Budget sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupMultiMonthBudget(sheet, transactionsSheet, headerMap, ss) {
  // Clear existing data
  sheet.clear();

  // Phase 3.23.0: Format date and pending columns in Transactions sheet
  // Extension writes dates and booleans as text (RAW mode for speed), so we format them here
  formatTransactionDateColumns(transactionsSheet, headerMap);
  formatTransactionPendingColumn(transactionsSheet, headerMap);

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

  // Get all unique accounts
  const allAccounts = new Set();
  validTxns.forEach(txn => {
    if (txn.account_name) {
      allAccounts.add(txn.account_name);
    }
  });
  const sortedAccounts = Array.from(allAccounts).sort();

  Logger.log(`[setupMultiMonthBudget] Found ${sortedAccounts.length} accounts: ${sortedAccounts.join(', ')}`);

  // Get all unique months across ALL transactions (to keep timeframes aligned)
  const allMonthsSet = new Set();
  validTxns.forEach(txn => {
    const date = parseDate(txn.date);
    if (!date) return;
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const yearMonth = `${date.getFullYear()}-${month}`;
    allMonthsSet.add(yearMonth);
  });
  const allMonths = Array.from(allMonthsSet).sort();

  // Get all unique categories across ALL transactions (to keep categories standardized)
  const allCategoriesSet = new Set();
  const categorySums = {};
  validTxns.forEach(txn => {
    const category = txn.category_primary || "Uncategorized";
    const amount = parseFloat(txn.amount) || 0;
    allCategoriesSet.add(category);
    categorySums[category] = (categorySums[category] || 0) + amount;
  });

  // Sort categories by total spend magnitude (descending)
  const allCategories = Array.from(allCategoriesSet).sort((a, b) => {
    return Math.abs(categorySums[b] || 0) - Math.abs(categorySums[a] || 0);
  });

  // Add title section at the top
  sheet.getRange(1, 1)
    .setValue("Budget Tracker")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");

  sheet.getRange(2, 1)
    .setValue("Track your spending across categories with monthly actuals, budget targets, and variance analysis. Enter your budget amounts in the yellow cells.")
    .setFontSize(11)
    .setWrap(false);

  // Create "ALL ACCOUNTS" budget table on Budget Monthly sheet
  let currentRow = 4; // Start after title section
  currentRow = createBudgetTable(sheet, transactionsSheet, headerMap, validTxns, null, currentRow, ss, allMonths, allCategories);

  // Now freeze headers and category column for main sheet
  sheet.setFrozenRows(6); // Freeze after title, description, and table headers
  sheet.setFrozenColumns(1);
  sheet.setColumnWidth(1, 250);
}

/**
 * Create a single budget table for given transactions
 * @param {Sheet} sheet - Budget sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Object[]} transactions - Filtered transactions for this table
 * @param {string|null} accountName - Account name or null for "ALL ACCOUNTS"
 * @param {number} startRow - Starting row for this table
 * @param {Spreadsheet} ss - Active spreadsheet
 * @param {string[]} allMonths - All months to display (keeps timeframes aligned across accounts)
 * @param {string[]} allCategories - All categories to display (keeps categories standardized across accounts)
 * @returns {number} Next available row after this table
 */
function createBudgetTable(sheet, transactionsSheet, headerMap, transactions, accountName, startRow, ss, allMonths, allCategories) {
  const tableTitle = accountName || "ALL ACCOUNTS";
  Logger.log(`[createBudgetTable] Creating table for: ${tableTitle} at row ${startRow}`);

  // Use provided months and categories to keep tables standardized
  const sortedMonths = allMonths;
  const sortedCategories = allCategories;

  // Calculate column layout
  const numMonths = sortedMonths.length;
  const categoryCol = 1; // Column A
  const actualsStartCol = 2; // Column B
  const spacer1Col = actualsStartCol + numMonths; // Spacer column after actuals
  const budgetStartCol = spacer1Col + 1; // Budget starts after spacer
  const spacer2Col = budgetStartCol + numMonths; // Spacer column after budget
  const varianceStartCol = spacer2Col + 1; // Variance starts after spacer

  // Build headers
  const headerRow1 = ["Category"];
  const headerRow2 = [""];

  // Actuals section headers
  for (let i = 0; i < numMonths; i++) {
    if (i === 0) {
      headerRow1.push("ACTUALS");
    } else {
      headerRow1.push("");
    }
    // Convert "YYYY-MM" to actual date (first day of month)
    const [year, month] = sortedMonths[i].split('-');
    headerRow2.push(new Date(parseInt(year), parseInt(month) - 1, 1));
  }

  // Spacer column
  headerRow1.push("");
  headerRow2.push("");

  // Budget section headers
  for (let i = 0; i < numMonths; i++) {
    if (i === 0) {
      headerRow1.push("BUDGET");
    } else {
      headerRow1.push("");
    }
    // Convert "YYYY-MM" to actual date (first day of month)
    const [year, month] = sortedMonths[i].split('-');
    headerRow2.push(new Date(parseInt(year), parseInt(month) - 1, 1));
  }

  // Spacer column
  headerRow1.push("");
  headerRow2.push("");

  // Variance section headers
  for (let i = 0; i < numMonths; i++) {
    if (i === 0) {
      headerRow1.push("VARIANCE");
    } else {
      headerRow1.push("");
    }
    // Convert "YYYY-MM" to actual date (first day of month)
    const [year, month] = sortedMonths[i].split('-');
    headerRow2.push(new Date(parseInt(year), parseInt(month) - 1, 1));
  }

  // Write table title (don't merge due to frozen columns issue)
  const titleRow = startRow;
  sheet.getRange(titleRow, 1).setValue(tableTitle);
  sheet.getRange(titleRow, 1, 1, headerRow1.length)
    .setFontWeight("bold")
    .setFontSize(12)
    .setBackground("#0b703a")
    .setFontColor("#ffffff");

  // Left align title cell A1
  sheet.getRange(titleRow, 1).setHorizontalAlignment("left");

  // Center align all other title cells
  if (headerRow1.length > 1) {
    sheet.getRange(titleRow, 2, 1, headerRow1.length - 1)
      .setHorizontalAlignment("center");
  }

  // Write headers
  const headerRow1Index = startRow + 1;
  const headerRow2Index = startRow + 2;
  sheet.getRange(headerRow1Index, 1, 1, headerRow1.length).setValues([headerRow1]);
  sheet.getRange(headerRow2Index, 1, 1, headerRow2.length).setValues([headerRow2]);

  // Style headers
  sheet.getRange(headerRow1Index, 1, 2, headerRow1.length)
    .setFontWeight("bold")
    .setBackground("#f3f3f3")
    .setHorizontalAlignment("center");

  // Left align column A headers (Category)
  sheet.getRange(headerRow1Index, 1, 2, 1)
    .setHorizontalAlignment("left");

  // Highlight section labels - extend background across all months in each section
  sheet.getRange(headerRow1Index, actualsStartCol, 1, numMonths).setBackground("#d9ead3"); // Actuals = green
  sheet.getRange(headerRow1Index, budgetStartCol, 1, numMonths).setBackground("#fff2cc"); // Budget = yellow
  sheet.getRange(headerRow1Index, varianceStartCol, 1, numMonths).setBackground("#cfe2f3"); // Variance = blue

  // Format dates in header row 2
  sheet.getRange(headerRow2Index, actualsStartCol, 1, numMonths).setNumberFormat("mmm yyyy");
  sheet.getRange(headerRow2Index, budgetStartCol, 1, numMonths).setNumberFormat("mmm yyyy");
  sheet.getRange(headerRow2Index, varianceStartCol, 1, numMonths).setNumberFormat("mmm yyyy");

  // Get Transactions sheet column positions for SUMIFS formulas
  const txnDateCol = getColumnIndex(headerMap, 'date');
  const txnAmountCol = getColumnIndex(headerMap, 'amount');
  const txnCategoryCol = getColumnIndex(headerMap, 'category_primary');
  const txnPendingCol = getColumnIndex(headerMap, 'pending');
  const txnAccountCol = getColumnIndex(headerMap, 'account_name');

  // Convert to column letters for formulas
  const dateColLetter = columnToLetter(txnDateCol);
  const amountColLetter = columnToLetter(txnAmountCol);
  const categoryColLetter = columnToLetter(txnCategoryCol);
  const pendingColLetter = columnToLetter(txnPendingCol);
  const accountColLetter = columnToLetter(txnAccountCol);

  // Build data rows
  const dataRows = [];
  const dataStartRow = startRow + 3; // After title + 2 header rows

  sortedCategories.forEach(category => {
    const row = [category];

    // Actuals columns - use SUMIFS formulas (Phase 3.23.0: dates are now proper date values)
    sortedMonths.forEach((month, i) => {
      const rowNum = dataStartRow + dataRows.length;
      const colNum = actualsStartCol + i;
      const colLetter = columnToLetter(colNum);

      // Dynamic formula that references the date in header row 2
      // SUMIFS: sum amounts where category matches, pending is FALSE (boolean), and date is in month range
      // Negate the sum to flip signs (expenses positive, income negative)
      let formula = `=-SUMIFS(Transactions!$${amountColLetter}:$${amountColLetter}, ` +
                    `Transactions!$${categoryColLetter}:$${categoryColLetter}, $A${rowNum}, ` +
                    `Transactions!$${pendingColLetter}:$${pendingColLetter}, FALSE, ` +
                    `Transactions!$${dateColLetter}:$${dateColLetter}, ">="&${colLetter}$${headerRow2Index}, ` +
                    `Transactions!$${dateColLetter}:$${dateColLetter}, "<"&EOMONTH(${colLetter}$${headerRow2Index},0)+1`;

      // Add account filter if this is an account-specific table
      if (accountName) {
        formula += `, Transactions!$${accountColLetter}:$${accountColLetter}, "${accountName}"`;
      }

      formula += `)`;


      row.push(formula);
    });

    // Spacer
    row.push("");

    // Budget columns (empty for user input)
    sortedMonths.forEach(() => {
      row.push(0); // Default to 0
    });

    // Spacer
    row.push("");

    // Variance columns (formula: Budget - Actuals)
    sortedMonths.forEach((month, i) => {
      const rowNum = dataStartRow + dataRows.length; // Use proper row offset
      const actualsCol = actualsStartCol + i;
      const budgetCol = budgetStartCol + i;

      // Convert column numbers to A1 notation
      const actualsColLetter = columnToLetter(actualsCol);
      const budgetColLetter = columnToLetter(budgetCol);

      row.push(`=${budgetColLetter}${rowNum}-${actualsColLetter}${rowNum}`);
    });

    dataRows.push(row);
  });

  // Write data rows
  if (dataRows.length > 0) {
    sheet.getRange(dataStartRow, 1, dataRows.length, headerRow1.length).setValues(dataRows);

    // Clear any background colors from data rows first
    sheet.getRange(dataStartRow, 1, dataRows.length, headerRow1.length).setBackground(null);

    // Format actuals as currency with accounting format (show "-  " for zero)
    sheet.getRange(dataStartRow, actualsStartCol, dataRows.length, numMonths)
      .setNumberFormat("$#,##0.00_);($#,##0.00);\"- \"");

    // Format budget as currency with yellow background (for user input)
    sheet.getRange(dataStartRow, budgetStartCol, dataRows.length, numMonths)
      .setBackground("#fffbea")
      .setNumberFormat("$#,##0.00_);($#,##0.00);\"- \"");

    // Format variance as currency with accounting format (show "-  " for zero)
    const varianceRange = sheet.getRange(dataStartRow, varianceStartCol, dataRows.length, numMonths);
    varianceRange.setNumberFormat("$#,##0.00_);($#,##0.00);\"- \"");

    // Add conditional formatting to variance (red for negative, green for positive)
    const varianceRules = sheet.getConditionalFormatRules();

    // Green for positive variance (budget > actuals = good)
    const positiveRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0)
      .setBackground("#d9ead3")
      .setRanges([varianceRange])
      .build();

    // Red for negative variance (budget < actuals = bad)
    const negativeRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(0)
      .setBackground("#f4cccc")
      .setRanges([varianceRange])
      .build();

    varianceRules.push(positiveRule);
    varianceRules.push(negativeRule);
    sheet.setConditionalFormatRules(varianceRules);

    // Add total rows
    const totalRow = dataStartRow + dataRows.length;
    const dataEndRow = totalRow - 1;

    // Total label
    sheet.getRange(totalRow, categoryCol).setValue("TOTAL");

    // Total actuals
    for (let i = 0; i < numMonths; i++) {
      const col = actualsStartCol + i;
      const colLetter = columnToLetter(col);
      sheet.getRange(totalRow, col).setFormula(`=SUM(${colLetter}${dataStartRow}:${colLetter}${dataEndRow})`);
    }

    // Total budget
    for (let i = 0; i < numMonths; i++) {
      const col = budgetStartCol + i;
      const colLetter = columnToLetter(col);
      sheet.getRange(totalRow, col).setFormula(`=SUM(${colLetter}${dataStartRow}:${colLetter}${dataEndRow})`);
    }

    // Total variance
    for (let i = 0; i < numMonths; i++) {
      const col = varianceStartCol + i;
      const colLetter = columnToLetter(col);
      sheet.getRange(totalRow, col).setFormula(`=SUM(${colLetter}${dataStartRow}:${colLetter}${dataEndRow})`);
    }

    // Format total row
    sheet.getRange(totalRow, 1, 1, headerRow1.length)
      .setFontWeight("bold")
      .setBackground("#e0e0e0");

    // Format total actuals
    sheet.getRange(totalRow, actualsStartCol, 1, numMonths)
      .setNumberFormat("$#,##0.00_);($#,##0.00);\"- \"")
      .setBackground("#e0e0e0");

    // Format total budget (keep grey like rest of total row)
    sheet.getRange(totalRow, budgetStartCol, 1, numMonths)
      .setNumberFormat("$#,##0.00_);($#,##0.00);\"- \"")
      .setBackground("#e0e0e0");

    // Format total variance
    const totalVarianceRange = sheet.getRange(totalRow, varianceStartCol, 1, numMonths);
    totalVarianceRange
      .setNumberFormat("$#,##0.00_);($#,##0.00);\"- \"")
      .setBackground("#e0e0e0");

    // Add conditional formatting to total variance row
    const totalVariancePositive = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0)
      .setBackground("#d9ead3")
      .setRanges([totalVarianceRange])
      .build();

    const totalVarianceNegative = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(0)
      .setBackground("#f4cccc")
      .setRanges([totalVarianceRange])
      .build();

    const currentRules = sheet.getConditionalFormatRules();
    currentRules.push(totalVariancePositive);
    currentRules.push(totalVarianceNegative);
    sheet.setConditionalFormatRules(currentRules);

    // Clear spacer columns explicitly (between sections)
    const numRows = totalRow - startRow + 1; // From title to total row
    sheet.getRange(startRow, spacer1Col, numRows, 1).setBackground(null);
    sheet.getRange(startRow, spacer2Col, numRows, 1).setBackground(null);

    // Return the next available row (right after the TOTAL row)
    const nextRow = totalRow + 1;
    Logger.log(`[createBudgetTable] Returning next row: ${nextRow} for table: ${tableTitle}`);
    return nextRow;
  }

  // If no data, return next row
  Logger.log(`[createBudgetTable] No data for table: ${tableTitle}, returning ${startRow + 3}`);
  return startRow + 3;
}

/**
 * Convert column number to letter (e.g., 1 -> A, 27 -> AA)
 * @param {number} column - Column number (1-indexed)
 * @returns {string} Column letter
 */
function columnToLetter(column) {
  let temp;
  let letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

// ========================================
// MENU INTEGRATION
// ========================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Budget Tracker')
    .addItem('Run Recipe', 'runBudgetRecipe')
    .addToUi();
}
