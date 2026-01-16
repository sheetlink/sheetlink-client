/**
 * SheetLink Recipe: Plaid Category Budget
 * Phase 3.23.0 - Recipes Framework
 * VERSION: 2.1.1-fix-summary-colors
 *
 * Creates a multi-month budget tracker with actuals, budget inputs, and variance.
 * Layout: Category | Actuals (by month) | Budget (by month) | Variance (by month)
 *
 * Date Handling Strategy:
 * - Extension writes dates as text (RAW mode) for fast syncs
 * - Recipe formats date columns when needed for SUMIFS formulas
 * - This approach: fast syncs + correct formulas
 */

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

    // Charts disabled for cleaner layout
    // Only create charts for ALL ACCOUNTS table (accountName === null)
    // if (!accountName && sortedMonths.length > 0) {
    //   const summaryEndRow = totalRow + 1;
    //   createBudgetCharts(sheet, transactionsSheet, headerMap, sortedMonths, summaryEndRow, ss);
    // }

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
 * Create income and expense breakdown charts from Transactions data
 * @param {Sheet} budgetSheet - Budget sheet where charts will be placed
 * @param {Sheet} transactionsSheet - Transactions sheet with raw data
 * @param {Object} headerMap - Header map from transactions sheet
 * @param {string[]} months - Sorted months
 * @param {number} summaryEndRow - Row where summary section ends
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function createBudgetCharts(budgetSheet, transactionsSheet, headerMap, months, summaryEndRow, ss) {
  try {
    // Clear existing charts
    const existingCharts = budgetSheet.getCharts();
    existingCharts.forEach(chart => budgetSheet.removeChart(chart));

    Logger.log(`[createBudgetCharts] Creating charts from Transactions data, positioning below row ${summaryEndRow}`);

    // Get column indices from Transactions sheet
    const categoryCol = getColumnIndex(headerMap, 'category_primary');
    const amountCol = getColumnIndex(headerMap, 'amount');

    if (!categoryCol || !amountCol) {
      Logger.log('[createBudgetCharts] Missing required columns in Transactions sheet');
      return;
    }

    const categoryColLetter = columnToLetter(categoryCol);
    const amountColLetter = columnToLetter(amountCol);

    // Use most recent month
    const mostRecentMonth = months[months.length - 1];
    const lastRow = transactionsSheet.getLastRow();

    Logger.log(`[createBudgetCharts] Creating charts for ${mostRecentMonth} from Transactions!${categoryColLetter}:${amountColLetter}`);

    // Define ranges from Transactions sheet
    const categoryRange = transactionsSheet.getRange(`${categoryColLetter}1:${categoryColLetter}${lastRow}`);
    const amountRange = transactionsSheet.getRange(`${amountColLetter}1:${amountColLetter}${lastRow}`);

    // Income Pie Chart
    const incomeChart = budgetSheet.newChart()
      .asColumnChart()
      .setChartType(Charts.ChartType.PIE)
      .addRange(categoryRange)
      .addRange(amountRange)
      .setPosition(summaryEndRow + 2, 1, 0, 0)
      .setOption('title', `Income Breakdown - ${mostRecentMonth}`)
      .setOption('width', 450)
      .setOption('height', 350)
      .setOption('pieSliceText', 'percentage')
      .setOption('legend', {position: 'right'})
      .setOption('colors', ['#6aa84f', '#93c47d', '#b6d7a8', '#d9ead3', '#a4c2f4', '#6d9eeb', '#3c78d8'])
      .setOption('pieSliceTextStyle', {fontSize: 10})
      .setOption('sliceVisibilityThreshold', 0.01)
      .build();
    budgetSheet.insertChart(incomeChart);
    Logger.log('[createBudgetCharts] Income chart created');

    // Expense Pie Chart
    const expenseChart = budgetSheet.newChart()
      .asColumnChart()
      .setChartType(Charts.ChartType.PIE)
      .addRange(categoryRange)
      .addRange(amountRange)
      .setPosition(summaryEndRow + 2, 9, 0, 0)
      .setOption('title', `Expense Breakdown - ${mostRecentMonth}`)
      .setOption('width', 450)
      .setOption('height', 350)
      .setOption('pieSliceText', 'percentage')
      .setOption('legend', {position: 'right'})
      .setOption('colors', ['#e06666', '#f6b26b', '#ffd966', '#93c47d', '#76a5af', '#6fa8dc', '#8e7cc3'])
      .setOption('pieSliceTextStyle', {fontSize: 10})
      .setOption('sliceVisibilityThreshold', 0.01)
      .build();
    budgetSheet.insertChart(expenseChart);
    Logger.log('[createBudgetCharts] Expense chart created');

    // Spending Column Chart
    const trendChart = budgetSheet.newChart()
      .asColumnChart()
      .setChartType(Charts.ChartType.COLUMN)
      .addRange(categoryRange)
      .addRange(amountRange)
      .setPosition(summaryEndRow + 2, 17, 0, 0)
      .setOption('title', `Top Spending Categories - ${mostRecentMonth}`)
      .setOption('width', 600)
      .setOption('height', 350)
      .setOption('legend', {position: 'none'})
      .setOption('hAxis', {title: 'Category', slantedText: true, slantedTextAngle: 45, textStyle: {fontSize: 9}})
      .setOption('vAxis', {title: 'Amount ($)', format: '$#,##0'})
      .setOption('bar', {groupWidth: '75%'})
      .setOption('colors', ['#4285f4'])
      .build();
    budgetSheet.insertChart(trendChart);
    Logger.log('[createBudgetCharts] Spending chart created');

    Logger.log('[createBudgetCharts] All 3 charts created successfully');
  } catch (error) {
    Logger.log(`[createBudgetCharts] Error creating charts: ${error.message}`);
    throw error;
  }
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
