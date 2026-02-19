/**
 * SheetLink Recipe: Recurring Analysis
 * Version: 2.1.0
 * Standalone Edition
 *
 * Description: Identifies subscriptions and recurring charges
 *
 * Creates: Recurring Analysis
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

function runRecurringRecipe(ss) {
  const startTime = new Date();

  try {
    // Ensure we have a spreadsheet object
    if (!ss) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    // Check for transactions data
    if (!checkTransactionsOrPrompt(ss)) {
      return;
    }

    logRecipe("Recurring", "Starting Subscription & Recurring Spend Detector recipe");
    showToast("Analyzing recurring transactions...", "Recurring Spend", 3);

    // Get transactions sheet
    const transactionsSheet = getTransactionsSheet(ss);

    if (!transactionsSheet) {
      const errorMsg = "Transactions sheet not found. Please sync your transactions first.";
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }

    const headerMap = getHeaderMap(transactionsSheet);

    // Verify required columns exist
    const requiredColumns = ['date', 'amount', 'merchant_name', 'pending'];
    const missingColumns = [];

    for (const col of requiredColumns) {
      if (!getColumnIndex(headerMap, col)) {
        missingColumns.push(col);
      }
    }

    if (missingColumns.length > 0) {
      const errorMsg = `Missing required columns: ${missingColumns.join(', ')}. Please sync your transactions.`;
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // Check if we have enough data
    const rowCount = transactionsSheet.getLastRow();
    if (rowCount < 10) {
      const errorMsg = "Not enough transaction data. Need at least 10 transactions to detect patterns.";
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }

    // Create output sheet (consolidated)
    const recurringSheet = getOrCreateSheet(ss, "Recurring Analysis");

    // Setup recurring analysis sheet
    const result = setupRecurringAnalysis(recurringSheet, transactionsSheet, headerMap, ss);

    const duration = ((new Date() - startTime) / 1000).toFixed(1);

    if (result.count === 0) {
      showToast("No recurring charges detected. Try syncing more transaction history.", "Recurring Spend", 5);
    } else {
      showToast(`Found ${result.count} recurring charges. Total annualized: ${formatCurrency(result.totalAnnualized)}`, "Recurring Spend Complete", 7);
    }

    logRecipe("Recurring", `Recipe completed in ${duration}s. Found ${result.count} recurring merchants.`);
    return { success: true, error: null, ...result };

  } catch (error) {
    Logger.log(`Recurring recipe error: ${error.message}`);
    Logger.log(error.stack);
    showError(`Error analyzing recurring spend: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup consolidated Recurring Analysis sheet
 * @param {Sheet} sheet - Analysis sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Object} {count: number, totalAnnualized: number}
 */
function setupRecurringAnalysis(sheet, transactionsSheet, headerMap, ss) {
  logRecipe("Recurring", "Loading and filtering transaction data...");

  // Configuration - read from existing sheet BEFORE clearing
  let amountTolerance = 0.05;
  let minOccurrences = 3;
  let monthsToAnalyze = 12;
  let minAmount = 5;

  // Try to read config from existing sheet (rows 7-10, column B) BEFORE we clear it
  if (sheet && sheet.getLastRow() >= 10) {
    try {
      const configValues = sheet.getRange("B7:B10").getValues();
      const tolerance = parseFloat(configValues[0][0]);
      const occurrences = parseInt(configValues[1][0]);
      const months = parseInt(configValues[2][0]);
      const amount = parseFloat(configValues[3][0]);

      // Only use values if they're valid numbers
      if (!isNaN(tolerance) && tolerance > 0) amountTolerance = tolerance;
      if (!isNaN(occurrences) && occurrences > 0) minOccurrences = occurrences;
      if (!isNaN(months) && months > 0) monthsToAnalyze = months;
      if (!isNaN(amount) && amount >= 0) minAmount = amount;

      logRecipe("Recurring", `Config from existing sheet: tolerance=${amountTolerance}, minOccur=${minOccurrences}, months=${monthsToAnalyze}, minAmt=${minAmount}`);
    } catch (e) {
      logRecipe("Recurring", "Error reading existing config, using defaults: " + e.message);
    }
  } else {
    logRecipe("Recurring", "No existing config found, using defaults");
  }

  // NOW clear existing data after reading config
  sheet.clear();

  // Get all transactions
  const transactions = getTransactionData(transactionsSheet);

  // Calculate cutoff date
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsToAnalyze);

  // Filter transactions
  const validTxns = transactions.filter(txn => {
    if (txn.pending === true || txn.pending === "TRUE") return false;

    const date = parseDate(txn.date);
    if (!date || date < cutoffDate) return false;

    const amount = Math.abs(parseFloat(txn.amount) || 0);
    return amount >= minAmount;
  });

  logRecipe("Recurring", `Filtered to ${validTxns.length} valid transactions from ${transactions.length} total`);

  // Group by normalized merchant
  const merchantGroups = {};
  validTxns.forEach(txn => {
    const normalized = normalizeMerchant(txn.merchant_name);
    if (!normalized) return;

    if (!merchantGroups[normalized]) {
      merchantGroups[normalized] = {
        originalName: txn.merchant_name,
        transactions: [],
        category: txn.category_primary || "Uncategorized",
        account: txn.account_name || "Unknown Account"
      };
    }

    merchantGroups[normalized].transactions.push({
      date: parseDate(txn.date),
      amount: Math.abs(parseFloat(txn.amount) || 0)
    });
  });

  logRecipe("Recurring", `Grouped into ${Object.keys(merchantGroups).length} unique merchants`);

  // Analyze each merchant group for recurring patterns
  const recurringMerchants = [];

  for (const [normalized, data] of Object.entries(merchantGroups)) {
    const txns = data.transactions;

    // Need minimum occurrences
    if (txns.length < minOccurrences) continue;

    // Sort by date
    txns.sort((a, b) => a.date - b.date);

    // Calculate average amount
    const avgAmount = txns.reduce((sum, t) => sum + t.amount, 0) / txns.length;

    // Check if amounts are similar (within tolerance)
    const withinTolerance = txns.every(t => {
      const diff = Math.abs(t.amount - avgAmount) / avgAmount;
      return diff <= amountTolerance;
    });

    if (!withinTolerance) continue;

    // Calculate average days between charges
    let totalDays = 0;
    for (let i = 1; i < txns.length; i++) {
      totalDays += daysBetween(txns[i].date, txns[i - 1].date);
    }
    const avgDays = totalDays / (txns.length - 1);

    // Determine frequency
    const frequency = determineFrequency(avgDays);

    // Calculate amount variance
    const variance = Math.max(...txns.map(t => t.amount)) - Math.min(...txns.map(t => t.amount));
    const variancePercent = variance / avgAmount;

    // Calculate confidence
    const confidence = calculateConfidence(txns.length, variancePercent, avgDays);

    // Get monthly breakdown
    const monthlySpend = {};
    txns.forEach(t => {
      const monthKey = `${t.date.getFullYear()}-${String(t.date.getMonth() + 1).padStart(2, '0')}`;
      if (!monthlySpend[monthKey]) {
        monthlySpend[monthKey] = 0;
      }
      monthlySpend[monthKey] += t.amount;
    });

    // Calculate total spend across all months
    const totalSpend = Object.values(monthlySpend).reduce((sum, amount) => sum + amount, 0);

    // Calculate annualized spend based on frequency
    let annualizedSpend;
    if (frequency === "Weekly") {
      annualizedSpend = avgAmount * 52;
    } else if (frequency === "Bi-Weekly") {
      annualizedSpend = avgAmount * 26;
    } else if (frequency === "Monthly") {
      annualizedSpend = avgAmount * 12;
    } else if (frequency === "Quarterly") {
      annualizedSpend = avgAmount * 4;
    } else if (frequency === "Semi-Annual") {
      annualizedSpend = avgAmount * 2;
    } else if (frequency === "Annual") {
      annualizedSpend = avgAmount;
    } else {
      // Fallback: use total spend extrapolated to 12 months
      const monthsWithData = Object.keys(monthlySpend).length;
      annualizedSpend = monthsWithData > 0 ? (totalSpend / monthsWithData) * 12 : avgAmount * 12;
    }

    recurringMerchants.push({
      merchant: data.originalName,
      account: data.account,
      category: data.category,
      annualizedSpend: annualizedSpend,
      avgAmount: avgAmount,
      frequency: frequency,
      count: txns.length,
      confidence: confidence,
      monthlySpend: monthlySpend
    });
  }

  // Sort by confidence (descending) then by avg amount (descending)
  recurringMerchants.sort((a, b) => {
    if (b.confidence !== a.confidence) {
      return b.confidence - a.confidence;
    }
    return b.avgAmount - a.avgAmount;
  });

  // Get all unique months (last 12 months)
  const allMonths = [];
  for (let i = monthsToAnalyze - 1; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    allMonths.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  // Build header row
  const headers = ["Merchant", "Account", "Category", "Annualized Spend", "Avg Amount", "Frequency", "Count", "Confidence"];
  allMonths.forEach(month => {
    const parts = month.split('-');
    const monthName = new Date(parts[0], parts[1] - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    headers.push(monthName);
  });

  // Add title and description rows at the top
  sheet.insertRowsBefore(1, 11); // Make room for title, description, config table

  // Row 1: Title (matching cashflow styling)
  sheet.getRange("A1").setValue("Recurring Spend Detector")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");

  // Row 2: Description (matching cashflow styling)
  sheet.getRange("A2").setValue("Identifies likely subscriptions and recurring charges using transaction patterns.")
    .setFontSize(11)
    .setWrap(false);

  // Row 3: Blank
  sheet.getRange("A3").setValue("");

  // Row 4: Config section label
  sheet.getRange("A4").setValue("Configuration")
    .setFontSize(12)
    .setFontWeight("bold")
    .setFontColor("#023820");

  // Row 5: Instructions line
  sheet.getRange("A5").setValue("Edit the values below and re-run the Recurring recipe to apply changes:")
    .setFontStyle("italic")
    .setFontSize(10);

  // Row 6: Config table headers
  const configTableHeaders = [["Parameter", "Value", "Description"]];
  sheet.getRange(6, 1, 1, 3).setValues(configTableHeaders);
  sheet.getRange("A6:E6")
    .setFontWeight("bold")
    .setBackground("#f3f3f3");

  // Rows 7-10: Config table data (use current config values or defaults)
  const configTableData = [
    ["Amount Tolerance (0.05 = 5%)", amountTolerance, "How much can charge amounts vary? (0.05 = 5% variance allowed)"],
    ["Minimum Occurrences", minOccurrences, "Minimum number of times a charge must appear to be considered recurring"],
    ["Months to Analyze", monthsToAnalyze, "How many months of history to analyze (max 12)"],
    ["Minimum Amount ($)", minAmount, "Ignore charges below this amount (reduces noise from small transactions)"]
  ];
  sheet.getRange(7, 1, configTableData.length, 3).setValues(configTableData);

  // Format value cells with yellow background
  sheet.getRange("B7:B10")
    .setBackground("#fffbea")
    .setHorizontalAlignment("right");

  // Clear background on description cells (they should have no color)
  sheet.getRange("C7:C10")
    .setBackground(null);

  // Row 11: Blank
  sheet.getRange("A11").setValue("");

  // Row 12: Data table header
  sheet.getRange(12, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(12, 1, 1, headers.length)
    .setBackground("#0b703a")
    .setFontColor("white")
    .setFontWeight("bold")
    .setHorizontalAlignment("center");

  // Write data
  if (recurringMerchants.length > 0) {
    const dataRows = recurringMerchants.map(m => {
      const row = [
        m.merchant,
        m.account,
        m.category,
        m.annualizedSpend,
        m.avgAmount,
        m.frequency,
        m.count,
        m.confidence
      ];

      // Add placeholder zeros for monthly columns (will be replaced with formulas)
      allMonths.forEach(month => {
        row.push(0);
      });

      return row;
    });

    sheet.getRange(13, 1, dataRows.length, headers.length).setValues(dataRows);

    // Now replace monthly columns with SUMIFS formulas
    const dateCol = getColumnIndex(headerMap, 'date');
    const amountCol = getColumnIndex(headerMap, 'amount');
    const merchantCol = getColumnIndex(headerMap, 'merchant_name');

    if (dateCol && amountCol && merchantCol) {
      for (let i = 0; i < recurringMerchants.length; i++) {
        const rowNum = i + 13; // Data starts at row 13
        const merchant = recurringMerchants[i].merchant;

        // For each month column
        allMonths.forEach((month, monthIdx) => {
          const colNum = 9 + monthIdx; // Monthly columns start at column 9
          const parts = month.split('-');
          const year = parts[0];
          const monthNum = parts[1];

          // Create SUMIFS formula to sum amounts from Transactions where:
          // 1. Merchant matches
          // 2. Date is in the target month/year
          // 3. Amount is negative (we use ABS in display)
          const formula = `=SUMIFS(Transactions!$${columnToLetter(amountCol)}:$${columnToLetter(amountCol)}, ` +
            `Transactions!$${columnToLetter(merchantCol)}:$${columnToLetter(merchantCol)}, A${rowNum}, ` +
            `Transactions!$${columnToLetter(dateCol)}:$${columnToLetter(dateCol)}, ">="&DATE(${year},${monthNum},1), ` +
            `Transactions!$${columnToLetter(dateCol)}:$${columnToLetter(dateCol)}, "<"&DATE(${year},${monthNum}+1,1))`;

          sheet.getRange(rowNum, colNum).setFormula(formula);
        });
      }
    }

    // Format currency columns (Annualized Spend, Avg Amount + all month columns)
    sheet.getRange(13, 4, dataRows.length, 1).setNumberFormat("$#,##0.00"); // Annualized Spend
    sheet.getRange(13, 5, dataRows.length, 1).setNumberFormat("$#,##0.00"); // Avg Amount
    sheet.getRange(13, 9, dataRows.length, allMonths.length).setNumberFormat("$#,##0.00"); // Monthly columns

    // Format confidence as percentage
    sheet.getRange(13, 8, dataRows.length, 1).setNumberFormat("0\"%\"");

    logRecipe("Recurring", `Added ${recurringMerchants.length} recurring merchants to analysis`);

  } else {
    // No recurring charges found - still show title, description, config table
    sheet.getRange("A13").setValue("No recurring charges detected.");
    sheet.getRange("A14").setValue("Tips: Sync at least 3-6 months of transaction history for better pattern detection.");
    sheet.getRange("A13:A14").setFontStyle("italic").setFontColor("#666666");
  }

  // Freeze through header row (row 12)
  sheet.setFrozenRows(12);
  if (recurringMerchants.length > 0) {
    sheet.setFrozenColumns(8); // Freeze through Confidence column
  }

  // Left justify column A (Merchant)
  sheet.getRange(1, 1, sheet.getMaxRows(), 1).setHorizontalAlignment("left");

  // Set column widths for config table
  sheet.setColumnWidth(1, 250); // Parameter
  sheet.setColumnWidth(2, 100); // Value
  sheet.setColumnWidth(3, 400); // Description

  // Reset column widths for data table (these get adjusted again for wider merchant names)
  sheet.setColumnWidth(1, 250); // Merchant
  sheet.setColumnWidth(2, 180); // Account
  sheet.setColumnWidth(3, 150); // Category
  sheet.setColumnWidth(4, 150); // Annualized Spend

  // Return metrics
  const totalAnnualized = recurringMerchants.reduce((sum, m) => sum + m.annualizedSpend, 0);
  return {
    count: recurringMerchants.length,
    totalAnnualized: totalAnnualized
  };
}


/**
 * Convert column number to letter (1 -> A, 2 -> B, etc.)
 * @param {number} column - Column number (1-based)
 * @returns {string} Column letter
 */
function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

/**
 * Normalize merchant name for matching
 * @param {string} merchantName - Raw merchant name
 * @returns {string} Normalized name
 */
function normalizeMerchant(merchantName) {
  if (!merchantName) return "";

  return merchantName
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '') // Remove special characters
    .replace(/\d{4,}/g, '') // Remove long numbers (locations, IDs)
    .substring(0, 20); // Take first 20 chars
}

/**
 * Calculate days between dates
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {number} Days between dates
 */
function daysBetween(date1, date2) {
  const oneDay = 24 * 60 * 60 * 1000;
  return Math.round(Math.abs((date1 - date2) / oneDay));
}

/**
 * Determine frequency from average days
 * @param {number} avgDays - Average days between occurrences
 * @returns {string} Frequency label
 */
function determineFrequency(avgDays) {
  if (avgDays < 10) return "Weekly";
  if (avgDays < 20) return "Bi-Weekly";
  if (avgDays < 35) return "Monthly";
  if (avgDays < 100) return "Quarterly";
  if (avgDays < 200) return "Semi-Annual";
  return "Annual";
}

/**
 * Calculate confidence score
 * @param {number} count - Number of occurrences
 * @param {number} amountVariance - Variance in amounts
 * @param {number} avgDays - Average days between
 * @returns {number} Confidence score 0-100
 */
function calculateConfidence(count, amountVariance, avgDays) {
  let score = 50; // Base score

  // More occurrences = higher confidence
  score += Math.min(count * 10, 30);

  // Lower variance = higher confidence
  score += (1 - Math.min(amountVariance, 1)) * 10;

  // Regular frequency = higher confidence
  if (avgDays >= 25 && avgDays <= 35) score += 10; // Monthly
  if (avgDays >= 6 && avgDays <= 8) score += 10; // Weekly

  return Math.min(Math.round(score), 100);
}



// ========================================
// MENU INTEGRATION
// ========================================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Recurring Analysis')
    .addItem('Run Recipe', 'runRecurringRecipe')
    .addToUi();
}
