/**
 * SheetLink Recipe: Account-Aware Ledger View
 * Phase 3.23.0 - Recipes Framework
 *
 * Transforms transactions into a traditional accounting-style ledger.
 * Converts amounts to debit/credit format and detects transfers between accounts.
 */

/**
 * Run the Account-Aware Ledger View recipe
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Object} {success: boolean, error: string|null}
 */
function runLedgerRecipe(ss) {
  try {
    logRecipe("Ledger", "Starting Account-Aware Ledger View recipe");

    // Get transactions sheet
    const transactionsSheet = getTransactionsSheet(ss);
    const headerMap = getHeaderMap(transactionsSheet);

    // Verify required columns exist
    const requiredColumns = ['date', 'amount', 'merchant_name', 'account_name', 'pending'];
    for (const col of requiredColumns) {
      if (!getColumnIndex(headerMap, col)) {
        return {
          success: false,
          error: `Required column "${col}" not found in transactions sheet`
        };
      }
    }

    // Create output sheets
    const ledgerSheet = getOrCreateSheet(ss, "Ledger_View");
    const configSheet = getOrCreateSheet(ss, "Ledger_Config");

    // Setup config sheet
    setupLedgerConfig(configSheet, ss);

    // Setup ledger view
    setupLedgerView(ledgerSheet, transactionsSheet, headerMap, ss);

    // Format all sheets
    formatSheet(ledgerSheet);
    formatSheet(configSheet);

    logRecipe("Ledger", "Recipe completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Ledger recipe error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup Ledger Config sheet
 * @param {Sheet} sheet - Config sheet
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupLedgerConfig(sheet, ss) {
  // Clear existing data
  sheet.clear();

  // Set headers
  const headers = ["Setting", "Value", "Description"];
  setHeaders(sheet, headers);

  // Add configuration rows
  const configData = [
    ["Include Pending", "No", "Include pending transactions (Yes/No)"],
    ["Sort By", "Date", "Sort order: Date, Account, or Category"],
    ["Date Range", "All", "Filter by date: All, Last Month, Last Quarter, etc."],
    ["Show Transfers", "Yes", "Show transfer transactions (Yes/No)"]
  ];

  sheet.getRange(2, 1, configData.length, headers.length).setValues(configData);

  // Create named ranges
  createNamedRange(sheet, "Ledger_IncludePending", "B2");
  createNamedRange(sheet, "Ledger_SortBy", "B3");
  createNamedRange(sheet, "Ledger_DateRange", "B4");
  createNamedRange(sheet, "Ledger_ShowTransfers", "B5");

  // Style the config sheet
  sheet.getRange("A1:C1").setBackground("#4285f4").setFontColor("white");
  sheet.getRange("A2:C5").setBackground("#fff3cd");
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 400);
}

/**
 * Detect if transaction is likely a transfer
 * @param {Object} txn - Transaction object
 * @param {Object[]} allTxns - All transactions
 * @returns {boolean}
 */
function isLikelyTransfer(txn, allTxns) {
  // Check transaction_type if available
  const txnType = (txn.transaction_type || "").toUpperCase();
  if (txnType === "TRANSFER" || txnType === "ACCOUNT TRANSFER") {
    return true;
  }

  // Check category
  const category = (txn.category_primary || "").toUpperCase();
  if (category === "TRANSFER" || category === "TRANSFER_IN" || category === "TRANSFER_OUT") {
    return true;
  }

  // Look for matching opposite transaction on same day with same amount
  const txnDate = parseDate(txn.date);
  const txnAmount = parseFloat(txn.amount) || 0;

  const hasMatch = allTxns.some(other => {
    if (other.transaction_id === txn.transaction_id) return false;

    const otherDate = parseDate(other.date);
    const otherAmount = parseFloat(other.amount) || 0;

    // Same day, opposite amounts
    if (txnDate && otherDate &&
        txnDate.toDateString() === otherDate.toDateString() &&
        Math.abs(txnAmount + otherAmount) < 0.01) {
      return true;
    }

    return false;
  });

  return hasMatch;
}

/**
 * Setup Ledger View sheet
 * @param {Sheet} sheet - Ledger sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupLedgerView(sheet, transactionsSheet, headerMap, ss) {
  // Clear existing data
  const existingHeaders = sheet.getLastColumn() > 0 ?
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];

  if (existingHeaders.length === 0 || existingHeaders[0] !== "Date") {
    const headers = [
      "Date",
      "Description",
      "Account",
      "Category",
      "Debit",
      "Credit",
      "Balance",
      "Institution",
      "Type"
    ];
    setHeaders(sheet, headers);
  }

  // Get configuration
  const includePending = ss.getRangeByName("Ledger_IncludePending") ?
    (ss.getRangeByName("Ledger_IncludePending").getValue().toUpperCase() === "YES") : false;

  const showTransfers = ss.getRangeByName("Ledger_ShowTransfers") ?
    (ss.getRangeByName("Ledger_ShowTransfers").getValue().toUpperCase() === "YES") : true;

  const sortBy = ss.getRangeByName("Ledger_SortBy") ?
    ss.getRangeByName("Ledger_SortBy").getValue() : "Date";

  // Get all transactions
  const transactions = getTransactionData(transactionsSheet);

  // Filter transactions
  let filteredTxns = transactions.filter(txn => {
    // Filter pending if not included
    if (!includePending && (txn.pending === true || txn.pending === "TRUE")) {
      return false;
    }
    return true;
  });

  // Detect transfers
  filteredTxns.forEach(txn => {
    txn.isTransfer = isLikelyTransfer(txn, transactions);
  });

  // Filter transfers if not showing
  if (!showTransfers) {
    filteredTxns = filteredTxns.filter(txn => !txn.isTransfer);
  }

  // Sort transactions
  filteredTxns.sort((a, b) => {
    if (sortBy === "Account") {
      const accountCompare = (a.account_name || "").localeCompare(b.account_name || "");
      if (accountCompare !== 0) return accountCompare;
    } else if (sortBy === "Category") {
      const categoryCompare = (a.category_primary || "").localeCompare(b.category_primary || "");
      if (categoryCompare !== 0) return categoryCompare;
    }

    // Default sort by date (descending - newest first)
    const dateA = parseDate(a.date);
    const dateB = parseDate(b.date);
    if (dateA && dateB) {
      return dateB - dateA;
    }
    return 0;
  });

  // Build ledger rows
  const ledgerRows = [];
  const accountBalances = {}; // Track running balance per account

  filteredTxns.forEach(txn => {
    const date = txn.date;
    const description = txn.merchant_name || txn.name || "Unknown";
    const account = txn.account_name || "Unknown Account";
    const category = txn.category_primary || "Uncategorized";
    const amount = parseFloat(txn.amount) || 0;
    const institution = txn.institution_name || "";
    const type = txn.isTransfer ? "Transfer" : (amount < 0 ? "Income" : "Expense");

    // Debit/Credit rules:
    // Positive amounts (expenses) = Debit
    // Negative amounts (income) = Credit
    const debit = amount > 0 ? Math.abs(amount) : null;
    const credit = amount < 0 ? Math.abs(amount) : null;

    // Calculate running balance per account
    if (!accountBalances[account]) {
      accountBalances[account] = 0;
    }
    accountBalances[account] += amount;
    const balance = accountBalances[account];

    ledgerRows.push([
      date,
      description,
      account,
      category,
      debit,
      credit,
      balance,
      institution,
      type
    ]);
  });

  // Write data to sheet
  if (ledgerRows.length > 0) {
    // Clear old data
    if (sheet.getLastRow() > 1) {
      sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).clear();
    }

    // Write new data
    sheet.getRange(2, 1, ledgerRows.length, 9).setValues(ledgerRows);

    // Format date column
    sheet.getRange(2, 1, ledgerRows.length, 1).setNumberFormat("yyyy-mm-dd");

    // Format currency columns (Debit, Credit, Balance)
    sheet.getRange(2, 5, ledgerRows.length, 1).setNumberFormat("$#,##0.00"); // Debit
    sheet.getRange(2, 6, ledgerRows.length, 1).setNumberFormat("$#,##0.00"); // Credit
    sheet.getRange(2, 7, ledgerRows.length, 1).setNumberFormat("$#,##0.00"); // Balance

    // Add conditional formatting for type
    const typeRange = sheet.getRange(2, 9, ledgerRows.length, 1);

    const incomeRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Income")
      .setBackground("#d9ead3")
      .setRanges([typeRange])
      .build();

    const expenseRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Expense")
      .setBackground("#f4cccc")
      .setRanges([typeRange])
      .build();

    const transferRule = SpreadsheetApp.newConditionalFormatRule()
      .whenTextEqualTo("Transfer")
      .setBackground("#cfe2f3")
      .setRanges([typeRange])
      .build();

    sheet.setConditionalFormatRules([incomeRule, expenseRule, transferRule]);

    // Add summary section
    const summaryRow = sheet.getLastRow() + 2;

    // Total Debits
    sheet.getRange(summaryRow, 3).setValue("Total Debits:");
    sheet.getRange(summaryRow, 5).setFormula(`=SUM(E2:E${summaryRow - 2})`);
    sheet.getRange(summaryRow, 5).setNumberFormat("$#,##0.00");

    // Total Credits
    sheet.getRange(summaryRow + 1, 3).setValue("Total Credits:");
    sheet.getRange(summaryRow + 1, 6).setFormula(`=SUM(F2:F${summaryRow - 2})`);
    sheet.getRange(summaryRow + 1, 6).setNumberFormat("$#,##0.00");

    // Net (Debits - Credits)
    sheet.getRange(summaryRow + 2, 3).setValue("Net (Debits - Credits):");
    sheet.getRange(summaryRow + 2, 7).setFormula(`=E${summaryRow}-F${summaryRow + 1}`);
    sheet.getRange(summaryRow + 2, 7).setNumberFormat("$#,##0.00");

    // Format summary rows
    sheet.getRange(summaryRow, 3, 3, 5).setFontWeight("bold").setBackground("#f3f3f3");

    // Freeze header row
    sheet.setFrozenRows(1);

  } else {
    // No data
    sheet.getRange("A2").setValue("No transactions found for ledger view");
    sheet.getRange("A2").setFontStyle("italic").setFontColor("#666666");
  }
}
