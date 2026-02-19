/**
 * SheetLink Recipe: Subscription & Recurring Spend Detector
 * Phase 3.23.0 - Recipes Framework
 *
 * Identifies likely subscriptions and recurring charges using transaction patterns.
 * Uses merchant matching, amount similarity, and frequency analysis.
 *
 * PRODUCTION READY v1.0
 * - Comprehensive error handling
 * - User-friendly feedback
 * - Data validation
 * - Summary metrics
 */

/**
 * Run the Recurring Spend Detector recipe
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Object} {success: boolean, error: string|null}
 */
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

