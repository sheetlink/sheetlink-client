/**
 * SheetLink Recipe: Plaid Category Budget
 * Phase 3.23.0 - Recipes Framework
 *
 * Creates a live monthly budget using Plaid's AI-enhanced categories
 * (category_primary, category_detailed) with zero manual tagging.
 */

/**
 * Run the Plaid Category Budget recipe
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Object} {success: boolean, error: string|null}
 */
function runBudgetRecipe(ss) {
  try {
    logRecipe("Budget", "Starting Plaid Category Budget recipe");

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
    const configSheet = getOrCreateSheet(ss, "Budget_Config");
    const monthlySheet = getOrCreateSheet(ss, "Budget_Monthly");
    const varianceSheet = getOrCreateSheet(ss, "Budget_Variance");

    // Setup config sheet
    setupBudgetConfig(configSheet, ss);

    // Setup monthly sheet
    setupBudgetMonthly(monthlySheet, transactionsSheet, headerMap, ss);

    // Setup variance sheet
    setupBudgetVariance(varianceSheet, ss);

    // Format all sheets
    formatSheet(configSheet);
    formatSheet(monthlySheet);
    formatSheet(varianceSheet);

    logRecipe("Budget", "Recipe completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Budget recipe error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Get the most recent month from transaction data (inline helper)
 * @param {Object[]} transactions - Array of transaction objects
 * @returns {string} Most recent month in format "YYYY-MM"
 */
function getMostRecentMonthForBudget(transactions) {
  if (!transactions || transactions.length === 0) {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${now.getFullYear()}-${month}`;
  }

  // Find the most recent date
  let mostRecentDate = null;
  transactions.forEach(txn => {
    let date = null;
    if (txn.date instanceof Date) {
      date = txn.date;
    } else if (typeof txn.date === 'string') {
      const parsed = new Date(txn.date);
      if (!isNaN(parsed.getTime())) {
        date = parsed;
      }
    }

    if (date && (!mostRecentDate || date > mostRecentDate)) {
      mostRecentDate = date;
    }
  });

  if (!mostRecentDate) {
    const now = new Date();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    return `${now.getFullYear()}-${month}`;
  }

  const month = (mostRecentDate.getMonth() + 1).toString().padStart(2, '0');
  return `${mostRecentDate.getFullYear()}-${month}`;
}

/**
 * Setup Budget Config sheet
 * @param {Sheet} sheet - Config sheet
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupBudgetConfig(sheet, ss) {
  // Clear existing data
  sheet.clear();

  // Set headers and instructions
  const headers = ["Setting", "Value", "Description"];
  setHeaders(sheet, headers);

  // Get transactions to find most recent month
  const transactionsSheet = getTransactionsSheet(ss);
  const transactions = getTransactionData(transactionsSheet);
  const recentMonth = getMostRecentMonthForBudget(transactions);

  // Add configuration rows
  const configData = [
    ["Target Month", recentMonth, "Month to analyze (format: YYYY-MM)"],
    ["", "", ""],
    ["Category", "Monthly Budget", "Amount budgeted for this category"],
    ["", "", "Leave blank to set budgets below"]
  ];

  sheet.getRange(2, 1, configData.length, headers.length).setValues(configData);

  // Force B2 to be plain text (not a date)
  sheet.getRange("B2").setNumberFormat("@"); // @ means plain text

  // Create named range for target month
  createNamedRange(sheet, "Budget_TargetMonth", "B2");

  // Style the config sheet
  sheet.getRange("A1:C1").setBackground("#4285f4").setFontColor("white");
  sheet.getRange("A2:C2").setBackground("#fff3cd");
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 300);
}

/**
 * Setup Budget Monthly sheet
 * @param {Sheet} sheet - Monthly sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupBudgetMonthly(sheet, transactionsSheet, headerMap, ss) {
  // Clear existing data (preserve headers if they exist)
  const existingHeaders = sheet.getLastColumn() > 0 ?
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];

  if (existingHeaders.length === 0 || existingHeaders[0] !== "Category") {
    // Set up fresh headers
    const headers = ["Category", "Actual Spend", "Budget", "Variance", "% of Budget"];
    setHeaders(sheet, headers);
  }

  // Get all transactions
  const transactions = getTransactionData(transactionsSheet);

  // Get target month from config
  let targetMonth = ss.getRangeByName("Budget_TargetMonth") ?
    ss.getRangeByName("Budget_TargetMonth").getValue() : getCurrentMonth();

  // Handle case where target month might be a Date object instead of string
  if (targetMonth instanceof Date) {
    const month = (targetMonth.getMonth() + 1).toString().padStart(2, '0');
    targetMonth = `${targetMonth.getFullYear()}-${month}`;
    Logger.log(`Converted Date object to string: ${targetMonth}`);
  }

  // Filter transactions
  const filteredTxns = transactions.filter(txn => {
    // Exclude pending
    if (txn.pending === true || txn.pending === "TRUE") return false;

    // Filter by month
    return isInMonth(txn.date, targetMonth);
  });

  // Aggregate by category_primary
  const categoryTotals = {};
  filteredTxns.forEach(txn => {
    const category = txn.category_primary || "Uncategorized";
    const amount = Math.abs(parseFloat(txn.amount) || 0);

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += amount;
  });

  // Sort categories by spend (descending)
  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  // Write data to sheet
  const dataRows = [];
  sortedCategories.forEach(([category, total]) => {
    dataRows.push([
      category,
      total,
      0, // Budget (user will fill in)
      `=C${dataRows.length + 2}-B${dataRows.length + 2}`, // Variance
      `=IF(C${dataRows.length + 2}>0, B${dataRows.length + 2}/C${dataRows.length + 2}, 0)` // % of Budget
    ]);
  });

  if (dataRows.length > 0) {
    // Clear old data
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clear();
    }

    // Write new data
    sheet.getRange(2, 1, dataRows.length, 5).setValues(dataRows);

    // Format currency columns
    sheet.getRange(2, 2, dataRows.length, 1).setNumberFormat("$#,##0.00");
    sheet.getRange(2, 3, dataRows.length, 1).setNumberFormat("$#,##0.00");
    sheet.getRange(2, 4, dataRows.length, 1).setNumberFormat("$#,##0.00");
    sheet.getRange(2, 5, dataRows.length, 1).setNumberFormat("0.0%");

    // Add conditional formatting for variance
    const varianceRange = sheet.getRange(2, 4, dataRows.length, 1);
    const rule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(0)
      .setBackground("#f4cccc")
      .setRanges([varianceRange])
      .build();

    const rules = sheet.getConditionalFormatRules();
    rules.push(rule);
    sheet.setConditionalFormatRules(rules);

    // Add total row
    const totalRow = sheet.getLastRow() + 1;
    sheet.getRange(totalRow, 1).setValue("TOTAL");
    sheet.getRange(totalRow, 2).setFormula(`=SUM(B2:B${totalRow - 1})`);
    sheet.getRange(totalRow, 3).setFormula(`=SUM(C2:C${totalRow - 1})`);
    sheet.getRange(totalRow, 4).setFormula(`=C${totalRow}-B${totalRow}`);
    sheet.getRange(totalRow, 1, 1, 5).setFontWeight("bold").setBackground("#f3f3f3");
    sheet.getRange(totalRow, 2, 1, 3).setNumberFormat("$#,##0.00");
  }
}

/**
 * Setup Budget Variance sheet
 * @param {Sheet} sheet - Variance sheet
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupBudgetVariance(sheet, ss) {
  // Clear existing data
  sheet.clear();

  // Set headers
  const headers = ["Category", "Budget", "Actual", "Variance", "Status"];
  setHeaders(sheet, headers);

  // Add note
  sheet.getRange("A2").setValue("This sheet shows categories with budget vs actual comparison");
  sheet.getRange("A2").setFontStyle("italic").setFontColor("#666666");

  // Reference to monthly sheet
  const monthlySheet = ss.getSheetByName("Budget_Monthly");
  if (!monthlySheet) return;

  const lastRow = monthlySheet.getLastRow();
  if (lastRow < 2) return;

  // Copy data with formulas
  const dataRows = [];
  for (let i = 2; i <= lastRow; i++) {
    const hasTotal = monthlySheet.getRange(i, 1).getValue() === "TOTAL";
    if (hasTotal) break;

    dataRows.push([
      `=Budget_Monthly!A${i}`,
      `=Budget_Monthly!C${i}`,
      `=Budget_Monthly!B${i}`,
      `=Budget_Monthly!D${i}`,
      `=IF(D${dataRows.length + 3}<0, "OVER", IF(D${dataRows.length + 3}>0, "UNDER", "ON TARGET"))`
    ]);
  }

  if (dataRows.length > 0) {
    sheet.getRange(3, 1, dataRows.length, 5).setValues(dataRows);

    // Format currency
    sheet.getRange(3, 2, dataRows.length, 3).setNumberFormat("$#,##0.00");

    // Conditional formatting for status
    const statusRange = sheet.getRange(3, 5, dataRows.length, 1);
    const overRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("OVER")
      .setBackground("#f4cccc")
      .setRanges([statusRange])
      .build();

    const underRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("UNDER")
      .setBackground("#d9ead3")
      .setRanges([statusRange])
      .build();

    sheet.setConditionalFormatRules([overRule, underRule]);
  }
}
