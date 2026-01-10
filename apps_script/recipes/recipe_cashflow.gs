/**
 * SheetLink Recipe: Weekly Cash Flow Forecast
 * Phase 3.23.0 - Recipes Framework
 *
 * Creates a rolling weekly cash flow view using historical income and expenses.
 * Separates income from expenses and calculates net weekly flow with ending balances.
 */

/**
 * Run the Weekly Cash Flow Forecast recipe
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Object} {success: boolean, error: string|null}
 */
function runCashFlowRecipe(ss) {
  try {
    logRecipe("Cash Flow", "Starting Weekly Cash Flow Forecast recipe");

    // Get transactions sheet
    const transactionsSheet = getTransactionsSheet(ss);
    const headerMap = getHeaderMap(transactionsSheet);

    // Verify required columns exist
    const requiredColumns = ['date', 'amount', 'category_primary', 'pending'];
    for (const col of requiredColumns) {
      if (!getColumnIndex(headerMap, col)) {
        return {
          success: false,
          error: `Required column "${col}" not found in transactions sheet`
        };
      }
    }

    // Create output sheets
    const configSheet = getOrCreateSheet(ss, "CashFlow_Config");
    const weeklySheet = getOrCreateSheet(ss, "CashFlow_Weekly");

    // Setup config sheet
    setupCashFlowConfig(configSheet, ss);

    // Setup weekly sheet
    setupCashFlowWeekly(weeklySheet, transactionsSheet, headerMap, ss);

    // Format all sheets
    formatSheet(configSheet);
    formatSheet(weeklySheet);

    logRecipe("Cash Flow", "Recipe completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Cash Flow recipe error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup Cash Flow Config sheet
 * @param {Sheet} sheet - Config sheet
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupCashFlowConfig(sheet, ss) {
  // Clear existing data
  sheet.clear();

  // Set headers
  const headers = ["Setting", "Value", "Description"];
  setHeaders(sheet, headers);

  // Add configuration rows
  const configData = [
    ["Starting Cash Balance", 0, "Your current cash balance (used as starting point)"],
    ["Weeks to Show", 12, "Number of weeks to display in forecast"],
    ["Low Balance Alert", 500, "Highlight weeks where balance falls below this amount"]
  ];

  sheet.getRange(2, 1, configData.length, headers.length).setValues(configData);

  // Create named ranges
  createNamedRange(sheet, "CashFlow_StartingBalance", "B2");
  createNamedRange(sheet, "CashFlow_WeeksToShow", "B3");
  createNamedRange(sheet, "CashFlow_LowBalanceAlert", "B4");

  // Format currency
  sheet.getRange("B2").setNumberFormat("$#,##0.00");
  sheet.getRange("B4").setNumberFormat("$#,##0.00");

  // Style the config sheet
  sheet.getRange("A1:C1").setBackground("#4285f4").setFontColor("white");
  sheet.getRange("A2:C4").setBackground("#fff3cd");
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 350);
}

/**
 * Setup Cash Flow Weekly sheet
 * @param {Sheet} sheet - Weekly sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupCashFlowWeekly(sheet, transactionsSheet, headerMap, ss) {
  // Clear existing data
  const existingHeaders = sheet.getLastColumn() > 0 ?
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];

  if (existingHeaders.length === 0 || existingHeaders[0] !== "Week") {
    // Set up fresh headers
    const headers = ["Week", "Income", "Expenses", "Net Flow", "Ending Balance", "Status"];
    setHeaders(sheet, headers);
  }

  // Get all transactions
  const transactions = getTransactionData(transactionsSheet);

  // Filter out pending transactions
  const validTxns = transactions.filter(txn => {
    return txn.pending !== true && txn.pending !== "TRUE";
  });

  // Group transactions by ISO week
  const weeklyData = {};
  validTxns.forEach(txn => {
    const date = parseDate(txn.date);
    if (!date) return;

    const week = getISOWeek(date);
    const amount = parseFloat(txn.amount) || 0;
    const category = (txn.category_primary || "").toUpperCase();

    if (!weeklyData[week]) {
      weeklyData[week] = { income: 0, expenses: 0 };
    }

    // Negative amounts are income, positive are expenses
    // UNLESS category is explicitly INCOME
    if (amount < 0 || category === "INCOME") {
      weeklyData[week].income += Math.abs(amount);
    } else {
      weeklyData[week].expenses += Math.abs(amount);
    }
  });

  // Sort weeks chronologically
  const sortedWeeks = Object.keys(weeklyData).sort();

  // Get config values
  const startingBalance = ss.getRangeByName("CashFlow_StartingBalance") ?
    parseFloat(ss.getRangeByName("CashFlow_StartingBalance").getValue()) || 0 : 0;

  const weeksToShow = ss.getRangeByName("CashFlow_WeeksToShow") ?
    parseInt(ss.getRangeByName("CashFlow_WeeksToShow").getValue()) || 12 : 12;

  const lowBalanceAlert = ss.getRangeByName("CashFlow_LowBalanceAlert") ?
    parseFloat(ss.getRangeByName("CashFlow_LowBalanceAlert").getValue()) || 500 : 500;

  // Build data rows (show only recent weeks)
  const recentWeeks = sortedWeeks.slice(-weeksToShow);
  const dataRows = [];
  let runningBalance = startingBalance;

  recentWeeks.forEach(week => {
    const data = weeklyData[week];
    const netFlow = data.income - data.expenses;
    runningBalance += netFlow;

    const status = runningBalance < lowBalanceAlert ? "⚠️ LOW" : "✓ OK";

    dataRows.push([
      week,
      data.income,
      data.expenses,
      netFlow,
      runningBalance,
      status
    ]);
  });

  if (dataRows.length > 0) {
    // Clear old data
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clear();
    }

    // Write new data
    sheet.getRange(2, 1, dataRows.length, 6).setValues(dataRows);

    // Format currency columns
    sheet.getRange(2, 2, dataRows.length, 4).setNumberFormat("$#,##0.00");

    // Add conditional formatting for low balance
    const statusRange = sheet.getRange(2, 6, dataRows.length, 1);
    const lowBalanceRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains("LOW")
      .setBackground("#f4cccc")
      .setRanges([statusRange])
      .build();

    const okRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextContains("OK")
      .setBackground("#d9ead3")
      .setRanges([statusRange])
      .build();

    sheet.setConditionalFormatRules([lowBalanceRule, okRule]);

    // Add conditional formatting for negative net flow
    const netFlowRange = sheet.getRange(2, 4, dataRows.length, 1);
    const negativeFlowRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(0)
      .setFontColor("#cc0000")
      .setRanges([netFlowRange])
      .build();

    const existingRules = sheet.getConditionalFormatRules();
    existingRules.push(negativeFlowRule);
    sheet.setConditionalFormatRules(existingRules);

    // Add summary row
    const summaryRow = sheet.getLastRow() + 2;
    sheet.getRange(summaryRow, 1).setValue("SUMMARY");
    sheet.getRange(summaryRow, 2).setFormula(`=SUM(B2:B${summaryRow - 2})`);
    sheet.getRange(summaryRow, 3).setFormula(`=SUM(C2:C${summaryRow - 2})`);
    sheet.getRange(summaryRow, 4).setFormula(`=B${summaryRow}-C${summaryRow}`);
    sheet.getRange(summaryRow, 1, 1, 6).setFontWeight("bold").setBackground("#f3f3f3");
    sheet.getRange(summaryRow, 2, 1, 3).setNumberFormat("$#,##0.00");

    // Add minimum balance row
    const minRow = summaryRow + 1;
    sheet.getRange(minRow, 1).setValue("Lowest Balance");
    sheet.getRange(minRow, 5).setFormula(`=MIN(E2:E${summaryRow - 2})`);
    sheet.getRange(minRow, 1, 1, 6).setFontWeight("bold");
    sheet.getRange(minRow, 5).setNumberFormat("$#,##0.00");
  } else {
    // No data
    sheet.getRange("A2").setValue("No transaction data found for cash flow analysis");
    sheet.getRange("A2").setFontStyle("italic").setFontColor("#666666");
  }
}
