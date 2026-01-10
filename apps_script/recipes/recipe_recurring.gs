/**
 * SheetLink Recipe: Subscription & Recurring Spend Detector
 * Phase 3.23.0 - Recipes Framework
 *
 * Identifies likely subscriptions and recurring charges using transaction patterns.
 * Uses merchant matching, amount similarity, and frequency analysis.
 */

/**
 * Run the Recurring Spend Detector recipe
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Object} {success: boolean, error: string|null}
 */
function runRecurringRecipe(ss) {
  try {
    logRecipe("Recurring", "Starting Subscription & Recurring Spend Detector recipe");

    // Get transactions sheet
    const transactionsSheet = getTransactionsSheet(ss);
    const headerMap = getHeaderMap(transactionsSheet);

    // Verify required columns exist
    const requiredColumns = ['date', 'amount', 'merchant_name', 'pending'];
    for (const col of requiredColumns) {
      if (!getColumnIndex(headerMap, col)) {
        return {
          success: false,
          error: `Required column "${col}" not found in transactions sheet`
        };
      }
    }

    // Create output sheets
    const detectedSheet = getOrCreateSheet(ss, "Recurring_Detected");
    const configSheet = getOrCreateSheet(ss, "Recurring_Config");

    // Setup config sheet
    setupRecurringConfig(configSheet, ss);

    // Setup detected sheet
    setupRecurringDetected(detectedSheet, transactionsSheet, headerMap, ss);

    // Format all sheets
    formatSheet(detectedSheet);
    formatSheet(configSheet);

    logRecipe("Recurring", "Recipe completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Recurring recipe error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup Recurring Config sheet
 * @param {Sheet} sheet - Config sheet
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupRecurringConfig(sheet, ss) {
  // Clear existing data
  sheet.clear();

  // Set headers
  const headers = ["Setting", "Value", "Description"];
  setHeaders(sheet, headers);

  // Add configuration rows
  const configData = [
    ["Amount Tolerance (%)", 5, "Variation allowed in amounts (e.g., 5% = $10±$0.50)"],
    ["Minimum Occurrences", 2, "Minimum number of charges to be considered recurring"],
    ["Months to Analyze", 6, "Number of months to look back for patterns"],
    ["Minimum Amount", 5, "Ignore transactions below this amount"]
  ];

  sheet.getRange(2, 1, configData.length, headers.length).setValues(configData);

  // Create named ranges
  createNamedRange(sheet, "Recurring_AmountTolerance", "B2");
  createNamedRange(sheet, "Recurring_MinOccurrences", "B3");
  createNamedRange(sheet, "Recurring_MonthsToAnalyze", "B4");
  createNamedRange(sheet, "Recurring_MinAmount", "B5");

  // Format percentage
  sheet.getRange("B2").setNumberFormat("0\"%\"");
  sheet.getRange("B5").setNumberFormat("$#,##0.00");

  // Style the config sheet
  sheet.getRange("A1:C1").setBackground("#4285f4").setFontColor("white");
  sheet.getRange("A2:C5").setBackground("#fff3cd");
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 400);
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

/**
 * Setup Recurring Detected sheet
 * @param {Sheet} sheet - Detected sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupRecurringDetected(sheet, transactionsSheet, headerMap, ss) {
  // Clear existing data
  const existingHeaders = sheet.getLastColumn() > 0 ?
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];

  if (existingHeaders.length === 0 || existingHeaders[0] !== "Merchant") {
    const headers = ["Merchant", "Avg Amount", "Frequency", "Count", "Last Seen", "Category", "Confidence"];
    setHeaders(sheet, headers);
  }

  // Get configuration
  const amountTolerance = ss.getRangeByName("Recurring_AmountTolerance") ?
    parseFloat(ss.getRangeByName("Recurring_AmountTolerance").getValue()) / 100 || 0.05 : 0.05;

  const minOccurrences = ss.getRangeByName("Recurring_MinOccurrences") ?
    parseInt(ss.getRangeByName("Recurring_MinOccurrences").getValue()) || 2 : 2;

  const monthsToAnalyze = ss.getRangeByName("Recurring_MonthsToAnalyze") ?
    parseInt(ss.getRangeByName("Recurring_MonthsToAnalyze").getValue()) || 6 : 6;

  const minAmount = ss.getRangeByName("Recurring_MinAmount") ?
    parseFloat(ss.getRangeByName("Recurring_MinAmount").getValue()) || 5 : 5;

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

  // Group by normalized merchant
  const merchantGroups = {};
  validTxns.forEach(txn => {
    const normalized = normalizeMerchant(txn.merchant_name);
    if (!normalized) return;

    if (!merchantGroups[normalized]) {
      merchantGroups[normalized] = {
        originalName: txn.merchant_name,
        transactions: [],
        category: txn.category_primary || "Uncategorized"
      };
    }

    merchantGroups[normalized].transactions.push({
      date: parseDate(txn.date),
      amount: Math.abs(parseFloat(txn.amount) || 0)
    });
  });

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

    // Get last seen date
    const lastSeen = txns[txns.length - 1].date;

    recurringMerchants.push({
      merchant: data.originalName,
      avgAmount: avgAmount,
      frequency: frequency,
      count: txns.length,
      lastSeen: lastSeen,
      category: data.category,
      confidence: confidence
    });
  }

  // Sort by confidence (descending) then by avg amount (descending)
  recurringMerchants.sort((a, b) => {
    if (b.confidence !== a.confidence) {
      return b.confidence - a.confidence;
    }
    return b.avgAmount - a.avgAmount;
  });

  // Write data to sheet
  if (recurringMerchants.length > 0) {
    // Clear old data
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clear();
    }

    const dataRows = recurringMerchants.map(m => [
      m.merchant,
      m.avgAmount,
      m.frequency,
      m.count,
      m.lastSeen,
      m.category,
      m.confidence
    ]);

    sheet.getRange(2, 1, dataRows.length, 7).setValues(dataRows);

    // Format currency
    sheet.getRange(2, 2, dataRows.length, 1).setNumberFormat("$#,##0.00");

    // Format date
    sheet.getRange(2, 5, dataRows.length, 1).setNumberFormat("yyyy-mm-dd");

    // Format confidence as percentage
    sheet.getRange(2, 7, dataRows.length, 1).setNumberFormat("0\"%\"");

    // Add conditional formatting for confidence
    const confidenceRange = sheet.getRange(2, 7, dataRows.length, 1);

    const highConfRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThanOrEqualTo(80)
      .setBackground("#d9ead3")
      .setRanges([confidenceRange])
      .build();

    const medConfRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberBetween(60, 79)
      .setBackground("#fff2cc")
      .setRanges([confidenceRange])
      .build();

    const lowConfRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(60)
      .setBackground("#f4cccc")
      .setRanges([confidenceRange])
      .build();

    sheet.setConditionalFormatRules([highConfRule, medConfRule, lowConfRule]);

    // Add summary row
    const summaryRow = sheet.getLastRow() + 2;
    sheet.getRange(summaryRow, 1).setValue("TOTAL RECURRING SPEND");
    sheet.getRange(summaryRow, 2).setFormula(`=SUM(B2:B${summaryRow - 2})*12`);
    sheet.getRange(summaryRow, 3).setValue("(Annual Est.)");
    sheet.getRange(summaryRow, 1, 1, 3).setFontWeight("bold").setBackground("#f3f3f3");
    sheet.getRange(summaryRow, 2).setNumberFormat("$#,##0.00");

  } else {
    // No recurring charges found
    sheet.getRange("A2").setValue("No recurring charges detected. Adjust config settings or sync more data.");
    sheet.getRange("A2").setFontStyle("italic").setFontColor("#666666");
  }
}
