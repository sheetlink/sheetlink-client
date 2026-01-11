/**
 * SheetLink Recipe: Plaid Category Budget
 * Phase 3.23.0 - Recipes Framework
 *
 * Creates a multi-month budget tracker with actuals, budget inputs, and variance.
 * Layout: Category | Actuals (by month) | Budget (by month) | Variance (by month)
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

    // Create output sheet (consolidate everything into Budget_Monthly)
    const budgetSheet = getOrCreateSheet(ss, "Budget_Monthly");

    // Setup the multi-month budget tracker
    setupMultiMonthBudget(budgetSheet, transactionsSheet, headerMap, ss);

    // Format sheet
    formatSheet(budgetSheet);

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

  // Group transactions by month and category
  const monthlyData = {}; // { "2025-01": { "Food": 500, "Transport": 200 } }
  const allCategories = new Set();
  const allMonths = new Set();

  validTxns.forEach(txn => {
    const date = parseDate(txn.date);
    if (!date) return;

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const yearMonth = `${date.getFullYear()}-${month}`;
    const category = txn.category_primary || "Uncategorized";
    const amount = parseFloat(txn.amount) || 0; // Keep the sign (positive = expense, negative = income)

    if (!monthlyData[yearMonth]) {
      monthlyData[yearMonth] = {};
    }

    if (!monthlyData[yearMonth][category]) {
      monthlyData[yearMonth][category] = 0;
    }

    monthlyData[yearMonth][category] += amount;
    allCategories.add(category);
    allMonths.add(yearMonth);
  });

  // Sort months chronologically
  const sortedMonths = Array.from(allMonths).sort();

  // Sort categories by total spend magnitude (descending), but preserve sign in data
  const categorySums = {};
  Object.values(monthlyData).forEach(monthData => {
    Object.entries(monthData).forEach(([category, amount]) => {
      categorySums[category] = (categorySums[category] || 0) + amount;
    });
  });

  const sortedCategories = Array.from(allCategories).sort((a, b) => {
    // Sort by absolute value (biggest impact first, regardless of income/expense)
    return Math.abs(categorySums[b] || 0) - Math.abs(categorySums[a] || 0);
  });

  // Calculate column layout
  const numMonths = sortedMonths.length;
  const categoryCol = 1; // Column A
  const actualsStartCol = 2; // Column B
  const budgetStartCol = actualsStartCol + numMonths + 1; // Skip a column for spacing
  const varianceStartCol = budgetStartCol + numMonths + 1; // Skip a column for spacing

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
    headerRow2.push(sortedMonths[i]);
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
    headerRow2.push(sortedMonths[i]);
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
    headerRow2.push(sortedMonths[i]);
  }

  // Write headers
  sheet.getRange(1, 1, 1, headerRow1.length).setValues([headerRow1]);
  sheet.getRange(2, 1, 1, headerRow2.length).setValues([headerRow2]);

  // Style headers
  sheet.getRange(1, 1, 2, headerRow1.length)
    .setFontWeight("bold")
    .setBackground("#f3f3f3")
    .setHorizontalAlignment("center");

  // Highlight section labels
  sheet.getRange(1, actualsStartCol).setBackground("#d9ead3"); // Actuals = green
  sheet.getRange(1, budgetStartCol).setBackground("#fff2cc"); // Budget = yellow
  sheet.getRange(1, varianceStartCol).setBackground("#cfe2f3"); // Variance = blue

  // Get Transactions sheet column positions for SUMIFS formulas
  const txnDateCol = getColumnIndex(headerMap, 'date');
  const txnAmountCol = getColumnIndex(headerMap, 'amount');
  const txnCategoryCol = getColumnIndex(headerMap, 'category_primary');
  const txnPendingCol = getColumnIndex(headerMap, 'pending');

  // Convert to column letters for formulas
  const dateColLetter = columnToLetter(txnDateCol);
  const amountColLetter = columnToLetter(txnAmountCol);
  const categoryColLetter = columnToLetter(txnCategoryCol);
  const pendingColLetter = columnToLetter(txnPendingCol);

  // Build data rows
  const dataRows = [];
  sortedCategories.forEach(category => {
    const row = [category];

    // Actuals columns - use SUMIFS formulas (Phase 3.23.0: dates are now proper date values)
    sortedMonths.forEach(month => {
      const rowNum = dataRows.length + 3; // +3 because of 2 header rows + 1-indexed

      // Calculate start and end dates for the month
      const [year, monthNum] = month.split('-');
      const startDate = `${year}-${monthNum}-01`;
      const nextMonth = parseInt(monthNum) === 12 ? `${parseInt(year) + 1}-01-01` : `${year}-${String(parseInt(monthNum) + 1).padStart(2, '0')}-01`;

      // SUMIFS: sum amounts where category matches, pending is FALSE, and date is in month range
      const formula = `=SUMIFS(Transactions!${amountColLetter}:${amountColLetter}, ` +
                     `Transactions!${categoryColLetter}:${categoryColLetter}, $A${rowNum}, ` +
                     `Transactions!${pendingColLetter}:${pendingColLetter}, FALSE, ` +
                     `Transactions!${dateColLetter}:${dateColLetter}, ">="&DATE(${year},${monthNum},1), ` +
                     `Transactions!${dateColLetter}:${dateColLetter}, "<"&DATE(${nextMonth.split('-')[0]},${nextMonth.split('-')[1]},1))`;

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
      const rowNum = dataRows.length + 3; // +3 because of 2 header rows + 1-indexed
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
    sheet.getRange(3, 1, dataRows.length, headerRow1.length).setValues(dataRows);

    // Format actuals as currency (read-only style)
    sheet.getRange(3, actualsStartCol, dataRows.length, numMonths)
      .setNumberFormat("$#,##0.00")
      .setBackground("#f9f9f9"); // Light gray to indicate read-only

    // Format budget as currency (highlighted for input)
    sheet.getRange(3, budgetStartCol, dataRows.length, numMonths)
      .setNumberFormat("$#,##0.00")
      .setBackground("#fffbea"); // Light yellow for input

    // Format variance as currency
    sheet.getRange(3, varianceStartCol, dataRows.length, numMonths)
      .setNumberFormat("$#,##0.00");

    // Add conditional formatting for variance (negative = red, positive = green)
    const varianceRange = sheet.getRange(3, varianceStartCol, dataRows.length, numMonths);

    const negativeRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberLessThan(0)
      .setBackground("#f4cccc")
      .setRanges([varianceRange])
      .build();

    const positiveRule = SpreadsheetApp.newConditionalFormatRule()
      .whenNumberGreaterThan(0)
      .setBackground("#d9ead3")
      .setRanges([varianceRange])
      .build();

    sheet.setConditionalFormatRules([negativeRule, positiveRule]);

    // Add total rows
    const totalRow = dataRows.length + 3;

    // Total label
    sheet.getRange(totalRow, categoryCol).setValue("TOTAL");

    // Total actuals
    for (let i = 0; i < numMonths; i++) {
      const col = actualsStartCol + i;
      const colLetter = columnToLetter(col);
      sheet.getRange(totalRow, col).setFormula(`=SUM(${colLetter}3:${colLetter}${totalRow - 1})`);
    }

    // Total budget
    for (let i = 0; i < numMonths; i++) {
      const col = budgetStartCol + i;
      const colLetter = columnToLetter(col);
      sheet.getRange(totalRow, col).setFormula(`=SUM(${colLetter}3:${colLetter}${totalRow - 1})`);
    }

    // Total variance
    for (let i = 0; i < numMonths; i++) {
      const col = varianceStartCol + i;
      const colLetter = columnToLetter(col);
      sheet.getRange(totalRow, col).setFormula(`=SUM(${colLetter}3:${colLetter}${totalRow - 1})`);
    }

    // Format total row
    sheet.getRange(totalRow, 1, 1, headerRow1.length)
      .setFontWeight("bold")
      .setBackground("#e0e0e0");

    sheet.getRange(totalRow, actualsStartCol, 1, numMonths).setNumberFormat("$#,##0.00");
    sheet.getRange(totalRow, budgetStartCol, 1, numMonths).setNumberFormat("$#,##0.00");
    sheet.getRange(totalRow, varianceStartCol, 1, numMonths).setNumberFormat("$#,##0.00");
  }

  // Freeze headers and category column
  sheet.setFrozenRows(2);
  sheet.setFrozenColumns(1);

  // Set column widths
  sheet.setColumnWidth(categoryCol, 150);
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
