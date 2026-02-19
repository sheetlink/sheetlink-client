/**
 * SheetLink Recipe: Financial Statements Suite v2.0
 * Formula-Driven with Date-Aware Balance Calculations
 *
 * Complete financial reporting package including:
 * - Chart of Accounts configuration
 * - General Ledger with dynamic formulas and date-aware balances
 * - Consolidated Financial Statements (P&L, Balance Sheet, Cash Flow) with monthly trending
 *
 * Key Innovation: All calculations are formula-driven and reference each other
 * Balance calculations use same logic as Cash Flow recipe (date-aware)
 *
 * PRODUCTION READY v2.0
 */

/**
 * Run the Financial Statements recipe
 * @param {Spreadsheet} ss - Active spreadsheet
 * @returns {Object} {success: boolean, error: string|null}
 */
function runFinancialsRecipe(ss) {
  try {
    // Ensure we have a spreadsheet object
    if (!ss) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    // Check for transactions data
    if (!checkTransactionsOrPrompt(ss)) {
      return;
    }

    logRecipe("Financials", "Starting Financial Statements Suite v2.0");
    showToast("Generating financial statements...", "Financial Statements", 3);

    // Get transactions sheet
    const transactionsSheet = getTransactionsSheet(ss);

    if (!transactionsSheet) {
      const errorMsg = "Transactions sheet not found. Please sync your transactions first.";
      showError(errorMsg);
      return { success: false, error: errorMsg };
    }

    const headerMap = getHeaderMap(transactionsSheet);

    // Verify required columns exist
    const requiredColumns = ['date', 'amount', 'merchant_name', 'category_primary', 'account_name', 'pending', 'transaction_id'];
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

    // Create or get Chart of Accounts
    const coaSheet = getOrCreateSheet(ss, "Chart of Accounts");
    setupChartOfAccounts(coaSheet, transactionsSheet, headerMap, ss);

    // Create General Ledger (formula-driven)
    const ledgerSheet = getOrCreateSheet(ss, "General Ledger");
    setupGeneralLedgerV2(ledgerSheet, transactionsSheet, headerMap, coaSheet, ss);

    // Create consolidated Financial Statements (all in one tab)
    const statementsSheet = getOrCreateSheet(ss, "Financial Statements");
    setupFinancialStatementsV2(statementsSheet, ledgerSheet, transactionsSheet, headerMap, coaSheet, ss);

    showToast("Financial statements generated successfully!", "Complete", 5);
    logRecipe("Financials", "Recipe v2.0 completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Financials recipe error: ${error.message}`);
    Logger.log(error.stack);
    showError(`Error generating financial statements: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup Chart of Accounts with dynamic category detection
 */
function setupChartOfAccounts(sheet, transactionsSheet, headerMap, ss) {
  sheet.clear();

  // Row 1: Title (matching cashflow styling)
  sheet.getRange("A1")
    .setValue("Chart of Accounts")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820")
    .setHorizontalAlignment("left");

  // Row 2: Description
  sheet.getRange("A2")
    .setValue("Maps Plaid transaction categories to accounting categories. Edit mappings below:")
    .setFontSize(11)
    .setWrap(false)
    .setHorizontalAlignment("left");

  // Row 3: Blank

  // Row 4: Column headers
  const headers = ["Plaid Category", "Type", "Category", "Statement"];
  sheet.getRange(4, 1, 1, 4).setValues([headers]);
  sheet.getRange(4, 1, 1, 4)
    .setFontWeight("bold")
    .setBackground("#0b703a")
    .setFontColor("white");

  // Default mappings (template for known categories)
  const defaultMappings = {
    // Income categories
    "INCOME": ["Revenue", "Income", "P&L"],
    "TRANSFER_IN": ["Transfer", "Transfers In", "Balance Sheet"],
    "TRANSFER_OUT": ["Transfer", "Transfers Out", "Balance Sheet"],
    "LOAN_DISBURSEMENTS": ["Transfer", "Transfers In", "Balance Sheet"],

    // Expense categories
    "FOOD_AND_DRINK": ["Expense", "Meals & Entertainment", "P&L"],
    "GENERAL_MERCHANDISE": ["Expense", "General Merchandise", "P&L"],
    "GENERAL_SERVICES": ["Expense", "Services", "P&L"],
    "ENTERTAINMENT": ["Expense", "Entertainment", "P&L"],
    "TRANSPORTATION": ["Expense", "Transportation", "P&L"],
    "TRAVEL": ["Expense", "Travel", "P&L"],
    "RENT_AND_UTILITIES": ["Expense", "Rent & Utilities", "P&L"],
    "HOME_IMPROVEMENT": ["Expense", "Home Improvement", "P&L"],
    "MEDICAL": ["Expense", "Healthcare", "P&L"],
    "PERSONAL_CARE": ["Expense", "Personal Care", "P&L"],
    "LOAN_PAYMENTS": ["Expense", "Interest & Loan Payments", "P&L"],
    "BANK_FEES": ["Expense", "Bank Fees", "P&L"],
    "GOVERNMENT_AND_NON_PROFIT": ["Expense", "Taxes & Government", "P&L"],
    "OTHER": ["Expense", "Other Expenses", "P&L"],

    // Balance Sheet categories
    "BANK_ACCOUNT": ["Asset", "Cash - Checking", "Balance Sheet"],
    "CREDIT_CARD": ["Liability", "Credit Card Payable", "Balance Sheet"],
    "LOAN": ["Liability", "Loans Payable", "Balance Sheet"]
  };

  // Scan Transactions sheet for all unique categories
  const categoryCol = getColumnIndex(headerMap, 'category_primary');
  const transactionsData = transactionsSheet.getDataRange().getValues();
  const uniqueCategories = new Set();

  // Start from row 2 (skip header)
  for (let i = 1; i < transactionsData.length; i++) {
    const category = transactionsData[i][categoryCol - 1]; // -1 for 0-indexed array
    if (category && category !== "") {
      uniqueCategories.add(category);
    }
  }

  // Read existing mappings from the sheet (if any) to preserve user edits
  const existingMappings = {};
  if (sheet.getLastRow() >= 5) {
    try {
      const existingData = sheet.getRange(5, 1, sheet.getLastRow() - 4, 4).getValues();
      existingData.forEach(row => {
        const plaidCategory = row[0];
        if (plaidCategory && plaidCategory !== "") {
          existingMappings[plaidCategory] = {
            type: row[1],
            category: row[2],
            statement: row[3]
          };
        }
      });
    } catch (e) {
      // If reading fails, just use defaults
    }
  }

  // Build final mappings array: include all unique categories from Transactions
  const mappings = [];
  uniqueCategories.forEach(category => {
    if (existingMappings[category]) {
      // Preserve user's existing mapping
      mappings.push([category, existingMappings[category].type, existingMappings[category].category, existingMappings[category].statement]);
    } else if (defaultMappings[category]) {
      // Use predefined mapping for new categories
      mappings.push([category, ...defaultMappings[category]]);
    } else {
      // Auto-classify unknown categories as Expense > Other Expenses
      mappings.push([category, "Expense", "Other Expenses", "P&L"]);
    }
  });

  // Sort by Type, then by Category
  mappings.sort((a, b) => {
    if (a[1] !== b[1]) return a[1].localeCompare(b[1]); // Sort by Type
    return a[2].localeCompare(b[2]); // Then by Category
  });

  sheet.getRange(5, 1, mappings.length, 4).setValues(mappings);
  sheet.getRange(5, 2, mappings.length, 3).setBackground("#fffbea");

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 150);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(4, 120);
  sheet.setFrozenRows(4);
}

/**
 * Setup General Ledger v2 - Formula-Driven
 */
function setupGeneralLedgerV2(sheet, transactionsSheet, headerMap, coaSheet, ss) {
  sheet.clear();

  let currentRow = 1;

  // Get column letters from transactions sheet
  const dateCol = getColumnIndex(headerMap, 'date');
  const amountCol = getColumnIndex(headerMap, 'amount');
  const pendingCol = getColumnIndex(headerMap, 'pending');
  const transactionIdCol = getColumnIndex(headerMap, 'transaction_id');

  const dateColLetter = columnIndexToLetter(dateCol);
  const amountColLetter = columnIndexToLetter(amountCol);
  const pendingColLetter = columnIndexToLetter(pendingCol);
  const txnIdColLetter = columnIndexToLetter(transactionIdCol);

  // Row 1: Title (matching cashflow styling)
  sheet.getRange("A1")
    .setValue("General Ledger")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820")
    .setHorizontalAlignment("left");
  currentRow++;

  // Row 2: Description
  sheet.getRange("A2")
    .setValue("Complete transaction history with debit/credit accounting format.")
    .setFontSize(11)
    .setWrap(false)
    .setHorizontalAlignment("left");
  currentRow++;

  // Row 3: Blank
  currentRow++;

  // Row 4: Account Balances Configuration Table
  sheet.getRange(currentRow, 1).setValue("Account Balance Configuration")
    .setFontSize(12)
    .setFontWeight("bold")
    .setFontColor("#023820");
  currentRow++;

  sheet.getRange(currentRow, 1).setValue("Auto-detected accounts from Transactions. Edit Account Type and Starting Balance:");
  sheet.getRange(currentRow, 1).setFontStyle("italic").setFontSize(10);
  currentRow++;

  // Account mapping table headers
  const accountConfigHeaders = ["Account Name (from Transactions)", "Account Type", "Starting Balance", "As of Date"];
  sheet.getRange(currentRow, 1, 1, 4).setValues([accountConfigHeaders]);
  sheet.getRange(currentRow, 1, 1, 4).setFontWeight("bold").setBackground("#f3f3f3");
  const accountConfigHeaderRow = currentRow;
  currentRow++;

  // Auto-detect unique accounts from Transactions sheet
  const accountConfigStartRow = currentRow;
  const accountNameCol = getColumnIndex(headerMap, 'account_name');
  const accountNameColLetter = columnIndexToLetter(accountNameCol);

  // Get all account names
  const lastRow = transactionsSheet.getLastRow();
  if (lastRow > 1) {
    const accountNames = transactionsSheet.getRange(2, accountNameCol, lastRow - 1, 1).getValues();

    // Get unique accounts
    const uniqueAccounts = [...new Set(accountNames.map(row => row[0]).filter(name => name && name.trim() !== ''))];

    // Sort accounts
    uniqueAccounts.sort();

    // Add each unique account
    uniqueAccounts.forEach(accountName => {
      // Auto-detect account type based on name
      let accountType = "Asset"; // Default
      let startingBalance = 0;

      if (accountName.toLowerCase().includes("credit card") || accountName.toLowerCase().includes("credit")) {
        accountType = "Liability";
      } else if (accountName.toLowerCase().includes("loan") || accountName.toLowerCase().includes("mortgage")) {
        accountType = "Liability";
      } else if (accountName.toLowerCase().includes("checking") ||
                 accountName.toLowerCase().includes("savings") ||
                 accountName.toLowerCase().includes("bank") ||
                 accountName.toLowerCase().includes("cash")) {
        accountType = "Asset";
      }

      sheet.getRange(currentRow, 1).setValue(accountName).setBackground("#fffbea");
      sheet.getRange(currentRow, 2).setValue(accountType).setBackground("#fffbea");
      sheet.getRange(currentRow, 3).setValue(startingBalance).setNumberFormat("$#,##0.00").setBackground("#fffbea");
      sheet.getRange(currentRow, 4).setValue(new Date()).setNumberFormat("yyyy-mm-dd").setBackground("#fffbea");
      currentRow++;
    });
  }

  const accountConfigEndRow = currentRow - 1;

  // Create named range for the entire config table (for lookup in formulas)
  createNamedRange(sheet, "GL_AccountConfig", `A${accountConfigStartRow}:D${accountConfigEndRow}`);

  // Create a named range for GL_CashBalance (defaults to 0, user can edit the first account's starting balance)
  if (accountConfigEndRow >= accountConfigStartRow) {
    createNamedRange(sheet, "GL_CashBalance", `C${accountConfigStartRow}`);
  }

  currentRow++; // Blank row

  // Ledger headers
  const headers = ["Date", "Transaction ID", "Vendor", "Category", "Type", "Account Name", "Account Type", "Debit", "Credit", "Memo"];
  sheet.getRange(currentRow, 1, 1, 10).setValues([headers]);
  sheet.getRange(currentRow, 1, 1, 10)
    .setFontWeight("bold")
    .setBackground("#0b703a")
    .setFontColor("white")
    .setHorizontalAlignment("left");

  const ledgerHeaderRow = currentRow;
  currentRow++;

  // Get last row of transactions
  const lastTxnRow = transactionsSheet.getLastRow();

  if (lastTxnRow > 1) {
    const dataStartRow = currentRow;
    const numTxns = lastTxnRow - 1; // Excluding header

    // Get column letters for all needed columns
    const merchantCol = columnIndexToLetter(getColumnIndex(headerMap, 'merchant_name'));
    const categoryCol = columnIndexToLetter(getColumnIndex(headerMap, 'category_primary'));
    const accountNameCol = columnIndexToLetter(getColumnIndex(headerMap, 'account_name'));
    const descriptionRawCol = columnIndexToLetter(getColumnIndex(headerMap, 'description_raw'));

    // Build formulas array for batch operation (much faster!)
    const formulas = [];

    for (let i = 0; i < numTxns; i++) {
      const txnRow = i + 2; // Start from row 2 in Transactions
      const ledgerRow = dataStartRow + i;

      const row = [
        // Column A: Date
        `=Transactions!${dateColLetter}${txnRow}`,

        // Column B: Transaction ID
        `=Transactions!${txnIdColLetter}${txnRow}`,

        // Column C: Description
        `=Transactions!${merchantCol}${txnRow}`,

        // Column D: Category (from Chart of Accounts lookup)
        `=IFERROR(VLOOKUP(Transactions!${categoryCol}${txnRow}, 'Chart of Accounts'!$A$5:$C$100, 3, FALSE), "Uncategorized")`,

        // Column E: Type (from Chart of Accounts lookup)
        `=IFERROR(VLOOKUP(Transactions!${categoryCol}${txnRow}, 'Chart of Accounts'!$A$5:$B$100, 2, FALSE), "Expense")`,

        // Column F: Account Name (from Transactions)
        `=Transactions!${accountNameCol}${txnRow}`,

        // Column G: Account Type (lookup Account Name in config table to get Asset/Liability)
        `=IFERROR(VLOOKUP(F${ledgerRow}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 2, FALSE), "")`,

        // Column H: Debit
        // If amt < 0 and Account Type = Asset: Debit = ABS(amt)
        // If amt < 0 and Account Type = Liability: Debit = ABS(amt)
        `=IF(AND(Transactions!${amountColLetter}${txnRow}<0, G${ledgerRow}="Asset"), ABS(Transactions!${amountColLetter}${txnRow}), IF(AND(Transactions!${amountColLetter}${txnRow}<0, G${ledgerRow}="Liability"), ABS(Transactions!${amountColLetter}${txnRow}), ""))`,

        // Column I: Credit
        // If amt > 0 and Account Type = Liability: Credit = ABS(amt)
        // If amt > 0 and Account Type = Asset: Credit = ABS(amt)
        `=IF(AND(Transactions!${amountColLetter}${txnRow}>0, G${ledgerRow}="Liability"), ABS(Transactions!${amountColLetter}${txnRow}), IF(AND(Transactions!${amountColLetter}${txnRow}>0, G${ledgerRow}="Asset"), ABS(Transactions!${amountColLetter}${txnRow}), ""))`,

        // Column J: Memo (description_raw from Transactions)
        `=Transactions!${descriptionRawCol}${txnRow}`
      ];

      formulas.push(row);

      // Batch every 1000 rows to avoid memory issues
      if (formulas.length >= 1000 || i === numTxns - 1) {
        const startRow = dataStartRow + i - formulas.length + 1;
        sheet.getRange(startRow, 1, formulas.length, 10).setFormulas(formulas);
        formulas.length = 0; // Clear array
        SpreadsheetApp.flush(); // Force update
      }
    }

    // Format columns
    sheet.getRange(dataStartRow, 1, numTxns, 1).setNumberFormat("yyyy-mm-dd");
    sheet.getRange(dataStartRow, 8, numTxns, 2).setNumberFormat("$#,##0.00"); // Debit and Credit columns
  }

  sheet.setFrozenRows(ledgerHeaderRow);
  sheet.setColumnWidth(1, 100); // Date
  sheet.setColumnWidth(2, 150); // Transaction ID
  sheet.setColumnWidth(3, 200); // Vendor
  sheet.setColumnWidth(4, 180); // Category
  sheet.setColumnWidth(5, 120); // Type
  sheet.setColumnWidth(6, 180); // Account Name
  sheet.setColumnWidth(7, 120); // Account Type
  sheet.setColumnWidth(8, 100); // Debit
  sheet.setColumnWidth(9, 100); // Credit
  sheet.setColumnWidth(10, 400); // Memo - fixed width 400
}

/**
 * Setup Financial Statements v2 - Consolidated with Monthly Trending
 */
function setupFinancialStatementsV2(sheet, ledgerSheet, transactionsSheet, headerMap, coaSheet, ss) {
  sheet.clear();

  let currentRow = 1;

  // Get column letters
  const dateCol = getColumnIndex(headerMap, 'date');
  const amountCol = getColumnIndex(headerMap, 'amount');
  const categoryCol = getColumnIndex(headerMap, 'category_primary');
  const pendingCol = getColumnIndex(headerMap, 'pending');
  const accountNameCol = getColumnIndex(headerMap, 'account_name');

  const dateColLetter = columnIndexToLetter(dateCol);
  const amountColLetter = columnIndexToLetter(amountCol);
  const categoryColLetter = columnIndexToLetter(categoryCol);
  const pendingColLetter = columnIndexToLetter(pendingCol);
  const accountNameColLetter = columnIndexToLetter(accountNameCol);

  // Get all transactions to determine date range
  const transactions = getTransactionData(transactionsSheet);
  const dates = transactions.map(t => parseDate(t.date)).filter(d => d);
  const minDate = new Date(Math.min(...dates));
  const maxDate = new Date(Math.max(...dates));

  // Generate month list (last 12 months)
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    months.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }

  // Row 1: Title (matching cashflow/ledger styling)
  sheet.getRange("A1")
    .setValue("Financial Statements")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820")
    .setHorizontalAlignment("left");
  currentRow++;

  // Row 2: Description
  sheet.getRange("A2")
    .setValue("Consolidated financial statements with monthly trending showing Profit & Loss, Balance Sheet, and Cash Flow.")
    .setFontSize(11)
    .setWrap(false)
    .setHorizontalAlignment("left");
  currentRow++;

  // Row 3: Blank
  currentRow++;

  // PROFIT & LOSS SECTION
  const plSectionRow = currentRow;
  sheet.getRange(currentRow, 1).setValue("PROFIT & LOSS")
    .setFontWeight("bold")
    .setFontSize(12);
  // Apply background color across entire table width (2 fixed columns + 12 month columns = 14)
  sheet.getRange(currentRow, 1, 1, 2 + months.length)
    .setBackground("#0b703a")
    .setFontColor("white");
  currentRow++;

  // P&L Headers
  const plHeaders = ["Account", "Type"];
  const monthDates = [];
  months.forEach(month => {
    const parts = month.split('-');
    const monthDate = new Date(parts[0], parts[1] - 1, 1); // First of month
    plHeaders.push(monthDate);
    monthDates.push(monthDate);
  });
  sheet.getRange(currentRow, 1, 1, plHeaders.length).setValues([plHeaders]);
  sheet.getRange(currentRow, 1, 1, plHeaders.length).setFontWeight("bold").setBackground("#f3f3f3");
  // Format date columns as MMM-YY (now starting at column 3)
  sheet.getRange(currentRow, 3, 1, months.length).setNumberFormat("mmm-yy");
  const plHeaderRow = currentRow;
  currentRow++;

  // REVENUE section
  sheet.getRange(currentRow, 1).setValue("REVENUE").setFontWeight("bold");
  currentRow++;

  // Revenue rows (pull from COA dynamically)
  const plStartRow = currentRow;

  // Get revenue accounts from Chart of Accounts sheet
  const coaData = coaSheet.getDataRange().getValues();
  const revenueAccountsMap = {}; // Map of accountName -> {plaidCategory, type}

  // Start from row 5 (skip headers), extract all unique Revenue account names where Statement = "P&L"
  for (let i = 4; i < coaData.length; i++) {
    const plaidCategory = coaData[i][0]; // Column A: Plaid Category
    const accountType = coaData[i][1]; // Column B: Type
    const accountName = coaData[i][2]; // Column C: Category
    const statement = coaData[i][3]; // Column D: Statement

    if (accountType === "Revenue" && statement === "P&L" && accountName) {
      // Store the FIRST Plaid category and type for this account name (handles duplicates)
      if (!revenueAccountsMap[accountName]) {
        revenueAccountsMap[accountName] = { plaidCategory, type: accountType };
      }
    }
  }

  Object.keys(revenueAccountsMap).forEach((accountName) => {
    const { plaidCategory, type } = revenueAccountsMap[accountName];

    sheet.getRange(currentRow, 1).setValue(accountName);
    sheet.getRange(currentRow, 2).setValue(type);

    // Monthly columns (now starting at column 3) - sum from General Ledger using Type and Category filter
    months.forEach((month, idx) => {
      const headerCol = columnIndexToLetter(3 + idx);
      const accountRef = `$A${currentRow}`;
      const typeRef = `$B${currentRow}`;

      // Revenue = Debits - Credits where Type and Category match (flipped to make positive)
      // Sum Debits for this Type/Category and date range, minus Credits
      sheet.getRange(currentRow, 3 + idx).setFormula(
        `=SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$D:$D, ${accountRef}, 'General Ledger'!$E:$E, ${typeRef}, ` +
        `'General Ledger'!$A:$A, ">="&${headerCol}$${plHeaderRow}, ` +
        `'General Ledger'!$A:$A, "<"&EOMONTH(${headerCol}$${plHeaderRow}, 0)+1) - ` +
        `SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$D:$D, ${accountRef}, 'General Ledger'!$E:$E, ${typeRef}, ` +
        `'General Ledger'!$A:$A, ">="&${headerCol}$${plHeaderRow}, ` +
        `'General Ledger'!$A:$A, "<"&EOMONTH(${headerCol}$${plHeaderRow}, 0)+1)`
      );
    });
    currentRow++;
  });

  // Total Revenue
  sheet.getRange(currentRow, 1).setValue("Total Revenue").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=SUM(${col}${plStartRow}:${col}${currentRow - 1})`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#d9ead3").setFontWeight("bold");
  const totalRevenueRow = currentRow;
  currentRow++;

  // Blank row
  currentRow++;

  // Expenses (pull from COA dynamically)
  sheet.getRange(currentRow, 1).setValue("EXPENSES").setFontWeight("bold");
  currentRow++;

  const expenseStartRow = currentRow;

  // Get expense accounts from Chart of Accounts sheet
  const expenseAccountsMap = {}; // Map of accountName -> {plaidCategory, type}

  // Extract all unique Expense account names where Statement = "P&L"
  for (let i = 4; i < coaData.length; i++) {
    const plaidCategory = coaData[i][0]; // Column A: Plaid Category
    const accountType = coaData[i][1]; // Column B: Type
    const accountName = coaData[i][2]; // Column C: Category
    const statement = coaData[i][3]; // Column D: Statement

    if (accountType === "Expense" && statement === "P&L" && accountName) {
      // Store the FIRST Plaid category and type for this account name (handles duplicates)
      if (!expenseAccountsMap[accountName]) {
        expenseAccountsMap[accountName] = { plaidCategory, type: accountType };
      }
    }
  }

  Object.keys(expenseAccountsMap).forEach((accountName) => {
    const { plaidCategory, type } = expenseAccountsMap[accountName];

    sheet.getRange(currentRow, 1).setValue(accountName);
    sheet.getRange(currentRow, 2).setValue(type);

    // Monthly columns (now starting at column 3) - sum from General Ledger using Type and Category filter
    months.forEach((month, idx) => {
      const headerCol = columnIndexToLetter(3 + idx);
      const accountRef = `$A${currentRow}`;
      const typeRef = `$B${currentRow}`;

      // Expenses = Debits - Credits where Type and Category match (naturally negative for expenses)
      // For expense transactions: Credits > Debits, so Debits - Credits = negative
      sheet.getRange(currentRow, 3 + idx).setFormula(
        `=SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$D:$D, ${accountRef}, 'General Ledger'!$E:$E, ${typeRef}, ` +
        `'General Ledger'!$A:$A, ">="&${headerCol}$${plHeaderRow}, ` +
        `'General Ledger'!$A:$A, "<"&EOMONTH(${headerCol}$${plHeaderRow}, 0)+1) - ` +
        `SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$D:$D, ${accountRef}, 'General Ledger'!$E:$E, ${typeRef}, ` +
        `'General Ledger'!$A:$A, ">="&${headerCol}$${plHeaderRow}, ` +
        `'General Ledger'!$A:$A, "<"&EOMONTH(${headerCol}$${plHeaderRow}, 0)+1)`
      );
    });
    currentRow++;
  });

  // Total Expenses
  sheet.getRange(currentRow, 1).setValue("Total Expenses").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=SUM(${col}${expenseStartRow}:${col}${currentRow - 1})`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#f4cccc").setFontWeight("bold");
  const totalExpensesRow = currentRow;
  currentRow++;

  // Net Income
  sheet.getRange(currentRow, 1).setValue("NET INCOME").setFontWeight("bold").setFontSize(11);
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=${col}${totalRevenueRow}+${col}${totalExpensesRow}`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#cfe2f3").setFontWeight("bold");
  currentRow += 2;

  // Format currency (now starting at column 3)
  sheet.getRange(plStartRow, 3, currentRow - plStartRow, months.length).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"");

  const netIncomeRow = currentRow - 2; // Save for later reference

  // Get config table range from General Ledger for Balance Sheet formulas
  const namedRanges = ledgerSheet.getNamedRanges();
  let accountConfigStartRow, accountConfigEndRow;

  const configRange = namedRanges.find(nr => nr.getName() === 'GL_AccountConfig');
  if (configRange) {
    const range = configRange.getRange();
    accountConfigStartRow = range.getRow();
    accountConfigEndRow = range.getLastRow();
  } else {
    // Fallback: assume config starts at row 7 (standard structure)
    accountConfigStartRow = 7;
    // Count rows in ledgerSheet to find end
    const glData = ledgerSheet.getDataRange().getValues();
    // Find the first row that contains "Date" header (marks end of config table)
    for (let i = 6; i < glData.length; i++) {
      if (glData[i][0] === 'Date') {
        accountConfigEndRow = i; // Row before the ledger headers
        break;
      }
    }
    if (!accountConfigEndRow) accountConfigEndRow = accountConfigStartRow + 10; // Safe default
  }

  // BALANCE SHEET SECTION
  currentRow += 2; // Extra spacing
  sheet.getRange(currentRow, 1).setValue("BALANCE SHEET")
    .setFontWeight("bold")
    .setFontSize(12);
  // Apply background color across entire table width (2 fixed columns + 12 month columns = 14)
  sheet.getRange(currentRow, 1, 1, 2 + months.length)
    .setBackground("#0b703a")
    .setFontColor("white");
  currentRow++;

  // Balance Sheet Headers (Account, Type, then month dates - align with P&L)
  const bsHeaders = ["Account", "Type"];
  months.forEach(month => {
    const parts = month.split('-');
    const monthDate = new Date(parts[0], parts[1] - 1, 1); // First of month
    bsHeaders.push(monthDate);
  });
  sheet.getRange(currentRow, 1, 1, bsHeaders.length).setValues([bsHeaders]);
  sheet.getRange(currentRow, 1, 1, bsHeaders.length).setFontWeight("bold").setBackground("#f3f3f3");
  // Format date columns as MMM-YY (starting at column 3)
  sheet.getRange(currentRow, 3, 1, months.length).setNumberFormat("mmm-yy");
  const bsHeaderRow = currentRow;
  currentRow++;

  // ASSETS
  sheet.getRange(currentRow, 1).setValue("ASSETS").setFontWeight("bold");
  currentRow++;

  const assetsStartRow = currentRow;

  // Dynamically add all Asset accounts from GL_AccountConfig
  // Track Balance Sheet row numbers for cash accounts
  const configData = ledgerSheet.getRange("GL_AccountConfig").getValues();
  const cashAccountBalanceSheetRows = {};

  configData.forEach((row, idx) => {
    const accountName = row[0];
    const accountType = row[1];
    const startingBalance = row[2];
    const asOfDate = row[3];

    // Skip empty rows or non-Asset accounts
    if (!accountName || accountType !== "Asset") return;

    // Track this row for Cash Flow reconciliation
    cashAccountBalanceSheetRows[accountName] = currentRow;

    sheet.getRange(currentRow, 1).setValue(accountName);
    sheet.getRange(currentRow, 2).setValue("Asset");

    // Monthly balances - date-aware calculation using General Ledger
    months.forEach((month, monthIdx) => {
      const headerCol = columnIndexToLetter(3 + monthIdx);
      const accountRef = `$A${currentRow}`; // Reference to Account Name in column A
      const monthEndDate = `EOMONTH(${headerCol}$${bsHeaderRow}, 0)`; // Last day of month

      // Date-aware formula for Assets:
      // 1. If month end = as-of date: show exact starting balance
      // 2. If month end < as-of date: work backwards (reverse transactions between month-end and as-of date)
      // 3. If month end > as-of date: work forwards (add net change from as-of to month-end)
      const formula =
        `=IF(INT(${monthEndDate})=INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0)), ` +
        // Exact match: show starting balance
        `IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 3, FALSE), 0), ` +
        `IF(${monthEndDate}<IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0), ` +
        // Month ends BEFORE as-of date: reverse transactions (subtract debits, add credits)
        `IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 3, FALSE), 0) - ` +
        `SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(${monthEndDate}), ` +
        `'General Ledger'!$A:$A, "<="&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0))) + ` +
        `SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(${monthEndDate}), ` +
        `'General Ledger'!$A:$A, "<="&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0))), ` +
        // Month ends AFTER as-of date: add net change from as-of to month-end
        `IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 3, FALSE), 0) + ` +
        `SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0)), ` +
        `'General Ledger'!$A:$A, "<="&INT(${monthEndDate})) - ` +
        `SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0)), ` +
        `'General Ledger'!$A:$A, "<="&INT(${monthEndDate}))))`;

      sheet.getRange(currentRow, 3 + monthIdx).setFormula(formula);
    });
    currentRow++;
  });

  // Total Assets
  sheet.getRange(currentRow, 1).setValue("Total Assets").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=SUM(${col}${assetsStartRow}:${col}${currentRow - 1})`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#d9d2e9").setFontWeight("bold");
  const totalAssetsRow = currentRow;
  currentRow++;

  currentRow++; // Blank row

  // LIABILITIES
  sheet.getRange(currentRow, 1).setValue("LIABILITIES").setFontWeight("bold");
  currentRow++;

  const liabilitiesStartRow = currentRow;

  // Dynamically add all Liability accounts from GL_AccountConfig
  // Track Balance Sheet row numbers for Cash Flow adjustments
  const liabilityBalanceSheetRows = {};

  configData.forEach((row, idx) => {
    const accountName = row[0];
    const accountType = row[1];
    const startingBalance = row[2];
    const asOfDate = row[3];

    // Skip empty rows or non-Liability accounts
    if (!accountName || accountType !== "Liability") return;

    // Track this row for Cash Flow adjustments
    liabilityBalanceSheetRows[accountName] = currentRow;

    sheet.getRange(currentRow, 1).setValue(accountName);
    sheet.getRange(currentRow, 2).setValue("Liability");

    // Monthly balances - date-aware calculation using General Ledger (inverted logic for liabilities)
    months.forEach((month, monthIdx) => {
      const headerCol = columnIndexToLetter(3 + monthIdx);
      const accountRef = `$A${currentRow}`; // Reference to Account Name in column A
      const monthEndDate = `EOMONTH(${headerCol}$${bsHeaderRow}, 0)`; // Last day of month

      // Date-aware formula for Liabilities (inverted from Assets):
      // 1. If month end = as-of date: show exact starting balance
      // 2. If month end < as-of date: work backwards (reverse transactions: subtract credits, add debits)
      // 3. If month end > as-of date: work forwards (add net change from as-of to month-end)
      const formula =
        `=IF(INT(${monthEndDate})=INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0)), ` +
        // Exact match: show starting balance
        `IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 3, FALSE), 0), ` +
        `IF(${monthEndDate}<IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0), ` +
        // Month ends BEFORE as-of date: reverse transactions (subtract credits, add debits)
        `IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 3, FALSE), 0) - ` +
        `SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(${monthEndDate}), ` +
        `'General Ledger'!$A:$A, "<="&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0))) + ` +
        `SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(${monthEndDate}), ` +
        `'General Ledger'!$A:$A, "<="&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0))), ` +
        // Month ends AFTER as-of date: add net change from as-of to month-end
        `IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 3, FALSE), 0) + ` +
        `SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0)), ` +
        `'General Ledger'!$A:$A, "<="&INT(${monthEndDate})) - ` +
        `SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$F:$F, ${accountRef}, ` +
        `'General Ledger'!$A:$A, ">"&INT(IFERROR(VLOOKUP(${accountRef}, 'General Ledger'!$A$${accountConfigStartRow}:$D$${accountConfigEndRow}, 4, FALSE), 0)), ` +
        `'General Ledger'!$A:$A, "<="&INT(${monthEndDate}))))`;

      sheet.getRange(currentRow, 3 + monthIdx).setFormula(formula);
    });
    currentRow++;
  });

  // Total Liabilities
  sheet.getRange(currentRow, 1).setValue("Total Liabilities").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=SUM(${col}${liabilitiesStartRow}:${col}${currentRow - 1})`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#f4cccc").setFontWeight("bold");
  const totalLiabilitiesRow = currentRow;
  currentRow++;

  currentRow++; // Blank row

  // EQUITY (calculated as Assets - Liabilities)
  sheet.getRange(currentRow, 1).setValue("EQUITY").setFontWeight("bold");
  currentRow++;

  const equityStartRow = currentRow;

  // Retained Earnings (will reference Total Equity row calculated below)
  sheet.getRange(currentRow, 1).setValue("Retained Earnings");
  sheet.getRange(currentRow, 2).setValue("Equity");
  const retainedEarningsRow = currentRow;
  // Formula will be added after Total Equity row is defined
  currentRow++;

  // Total Equity
  sheet.getRange(currentRow, 1).setValue("Total Equity").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=${col}${totalAssetsRow}-${col}${totalLiabilitiesRow}`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#d9d2e9").setFontWeight("bold");
  const totalEquityRow = currentRow;
  currentRow++;

  // Now go back and set Retained Earnings to equal Total Equity
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(retainedEarningsRow, 3 + idx).setFormula(`=${col}${totalEquityRow}`);
  });

  // Check: Total Liabilities + Equity should equal Total Assets
  sheet.getRange(currentRow, 1).setValue("Check: Liabilities + Equity").setFontStyle("italic");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=${col}${totalLiabilitiesRow}+${col}${totalEquityRow}`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setFontStyle("italic").setBackground("#fff2cc");
  currentRow += 2;

  // Format Balance Sheet currency
  sheet.getRange(assetsStartRow, 3, currentRow - assetsStartRow, months.length).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"");

  // CASH FLOW STATEMENT SECTION
  currentRow += 2; // Extra spacing
  sheet.getRange(currentRow, 1).setValue("CASH FLOW STATEMENT")
    .setFontWeight("bold")
    .setFontSize(12);
  // Apply background color across entire table width (2 fixed columns + 12 month columns = 14)
  sheet.getRange(currentRow, 1, 1, 2 + months.length)
    .setBackground("#0b703a")
    .setFontColor("white");
  currentRow++;

  // Cash Flow Headers (Account, Type, then month dates - align with P&L)
  const cfHeaders = ["Account", "Type"];
  months.forEach(month => {
    const parts = month.split('-');
    const monthDate = new Date(parts[0], parts[1] - 1, 1); // First of month
    cfHeaders.push(monthDate);
  });
  sheet.getRange(currentRow, 1, 1, cfHeaders.length).setValues([cfHeaders]);
  sheet.getRange(currentRow, 1, 1, cfHeaders.length).setFontWeight("bold").setBackground("#f3f3f3");
  // Format date columns as MMM-YY (starting at column 3)
  sheet.getRange(currentRow, 3, 1, months.length).setNumberFormat("mmm-yy");
  const cfHeaderRow = currentRow;
  currentRow++;

  // OPERATING ACTIVITIES (Indirect Method)
  sheet.getRange(currentRow, 1).setValue("OPERATING ACTIVITIES").setFontWeight("bold");
  currentRow++;

  const cfOperatingStartRow = currentRow;

  // Net Income (from P&L)
  sheet.getRange(currentRow, 1).setValue("Net Income");
  sheet.getRange(currentRow, 2).setValue("Operating");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=${col}${netIncomeRow}`);
  });
  const netIncomeRowCF = currentRow;
  currentRow++;

  // Adjustments for changes in working capital
  sheet.getRange(currentRow, 1).setValue("Changes in Working Capital:").setFontStyle("italic");
  currentRow++;

  // Changes in Liabilities (increase = source of cash, add back)
  // For each liability account, sum credits - debits from General Ledger
  Object.keys(liabilityBalanceSheetRows).forEach(accountName => {
    const bsRowNum = liabilityBalanceSheetRows[accountName];

    sheet.getRange(currentRow, 1).setValue(`  Increase in ${accountName}`);
    sheet.getRange(currentRow, 2).setValue("Operating");

    months.forEach((m, monthIdx) => {
      const headerCol = columnIndexToLetter(3 + monthIdx);
      const accountCell = `$A${bsRowNum}`; // Account Name from Balance Sheet (absolute column reference)

      // Calculate net change from General Ledger: Credits - Debits (increase is positive)
      sheet.getRange(currentRow, 3 + monthIdx).setFormula(
        `=SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$F:$F, ${accountCell}, ` +
        `'General Ledger'!$A:$A, ">="&${headerCol}$${cfHeaderRow}, ` +
        `'General Ledger'!$A:$A, "<="&INT(EOMONTH(${headerCol}$${cfHeaderRow}, 0))) - ` +
        `SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$F:$F, ${accountCell}, ` +
        `'General Ledger'!$A:$A, ">="&${headerCol}$${cfHeaderRow}, ` +
        `'General Ledger'!$A:$A, "<="&INT(EOMONTH(${headerCol}$${cfHeaderRow}, 0)))`
      );
    });

    currentRow++;
  });

  // Other Working Capital (plug to reconcile: Total Cash Change - Net Income - Liabilities - CapEx - Loan Proceeds)
  sheet.getRange(currentRow, 1).setValue("  Other Working Capital");
  sheet.getRange(currentRow, 2).setValue("Operating");
  const otherWorkingCapitalRow = currentRow;
  // Formula will be added after we know CapEx and Loan Proceeds rows
  currentRow++;

  // Cash from Operating Activities
  sheet.getRange(currentRow, 1).setValue("Cash from Operating Activities").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=SUM(${col}${cfOperatingStartRow}:${col}${currentRow - 1})`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#d9ead3").setFontWeight("bold");
  const totalCFOperatingRow = currentRow;
  currentRow++;

  currentRow++; // Blank row

  // INVESTING ACTIVITIES
  sheet.getRange(currentRow, 1).setValue("INVESTING ACTIVITIES").setFontWeight("bold");
  currentRow++;

  const cfInvestingStartRow = currentRow;

  // Manual input for capital expenditures
  sheet.getRange(currentRow, 1).setValue("Capital Expenditures");
  sheet.getRange(currentRow, 2).setValue("Investing");
  months.forEach((m, idx) => {
    sheet.getRange(currentRow, 3 + idx).setValue(0).setBackground("#fffbea");
  });
  const capExRow = currentRow;
  currentRow++;

  // Cash from Investing Activities
  sheet.getRange(currentRow, 1).setValue("Cash from Investing Activities").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=SUM(${col}${cfInvestingStartRow}:${col}${currentRow - 1})`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#d9ead3").setFontWeight("bold");
  const totalCFInvestingRow = currentRow;
  currentRow++;

  currentRow++; // Blank row

  // FINANCING ACTIVITIES
  sheet.getRange(currentRow, 1).setValue("FINANCING ACTIVITIES").setFontWeight("bold");
  currentRow++;

  const cfFinancingStartRow = currentRow;

  // Manual input for loan proceeds/repayments
  sheet.getRange(currentRow, 1).setValue("Loan Proceeds / Repayments");
  sheet.getRange(currentRow, 2).setValue("Financing");
  months.forEach((m, idx) => {
    sheet.getRange(currentRow, 3 + idx).setValue(0).setBackground("#fffbea");
  });
  const loanProceedsRow = currentRow;
  currentRow++;

  // Cash from Financing Activities
  sheet.getRange(currentRow, 1).setValue("Cash from Financing Activities").setFontWeight("bold");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(`=SUM(${col}${cfFinancingStartRow}:${col}${currentRow - 1})`);
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#d9ead3").setFontWeight("bold");
  const totalCFFinancingRow = currentRow;
  currentRow++;

  currentRow++; // Blank row

  // NET CHANGE IN CASH
  sheet.getRange(currentRow, 1).setValue("NET CHANGE IN CASH").setFontWeight("bold").setFontSize(11);
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    sheet.getRange(currentRow, 3 + idx).setFormula(
      `=${col}${totalCFOperatingRow}+${col}${totalCFInvestingRow}+${col}${totalCFFinancingRow}`
    );
  });
  sheet.getRange(currentRow, 1, 1, 2 + months.length).setBackground("#fce5cd").setFontWeight("bold");
  const netChangeInCashRow = currentRow;
  currentRow++;

  currentRow++; // Blank row

  // RECONCILIATION - Change in Cash from Balance Sheet
  sheet.getRange(currentRow, 1).setValue("Change in Cash (from Balance Sheet):").setFontStyle("italic");
  months.forEach((m, monthIdx) => {
    const col = columnIndexToLetter(3 + monthIdx);
    const prevCol = monthIdx > 0 ? columnIndexToLetter(3 + monthIdx - 1) : null;

    // Skip first month (no previous month to compare)
    if (monthIdx === 0) {
      sheet.getRange(currentRow, 3 + monthIdx).setValue("");
    } else {
      // Sum all changes in cash accounts (Asset accounts)
      let formula = "=";
      const cashAccountNames = Object.keys(cashAccountBalanceSheetRows);

      if (cashAccountNames.length > 0) {
        // For each cash account, add (current month - previous month)
        const changes = cashAccountNames.map(accountName => {
          const bsRowNum = cashAccountBalanceSheetRows[accountName];
          return `(${col}${bsRowNum}-${prevCol}${bsRowNum})`;
        });
        formula += changes.join("+");
      } else {
        // No cash accounts - show 0
        formula = "0";
      }

      sheet.getRange(currentRow, 3 + monthIdx).setFormula(formula);
    }
  });
  currentRow++;

  // RECONCILIATION - Difference
  sheet.getRange(currentRow, 1).setValue("Difference (to investigate):").setFontStyle("italic").setFontColor("#cc0000");
  months.forEach((m, idx) => {
    const col = columnIndexToLetter(3 + idx);
    // Skip first month (no previous month to compare)
    if (idx === 0) {
      sheet.getRange(currentRow, 3 + idx).setValue("");
    } else {
      sheet.getRange(currentRow, 3 + idx).setFormula(
        `=${col}${netChangeInCashRow}-${col}${currentRow - 1}`
      );
    }
  });
  sheet.getRange(currentRow, 3, 1, months.length).setFontColor("#cc0000");
  const changeFromBalanceSheetRow = currentRow - 1;
  currentRow++;

  // Now go back and fill in "Other Working Capital" formula (plug to reconcile)
  // Formula: Change in Cash (from GL) - Net Income - Sum of Liability Increases - CapEx - Loan Proceeds
  months.forEach((m, monthIdx) => {
    const col = columnIndexToLetter(3 + monthIdx);
    const headerCol = columnIndexToLetter(3 + monthIdx);

    // Build formula to calculate change in cash from General Ledger for all cash accounts
    const cashAccountNames = Object.keys(cashAccountBalanceSheetRows);
    let cashChangeFormula = "";
    if (cashAccountNames.length > 0) {
      // For each cash account, sum (Debits - Credits) from General Ledger
      const cashChanges = cashAccountNames.map(accountName => {
        const bsRowNum = cashAccountBalanceSheetRows[accountName];
        return `(SUMIFS('General Ledger'!$H:$H, 'General Ledger'!$F:$F, $A${bsRowNum}, ` +
               `'General Ledger'!$A:$A, ">="&${headerCol}$${cfHeaderRow}, ` +
               `'General Ledger'!$A:$A, "<="&INT(EOMONTH(${headerCol}$${cfHeaderRow}, 0))) - ` +
               `SUMIFS('General Ledger'!$I:$I, 'General Ledger'!$F:$F, $A${bsRowNum}, ` +
               `'General Ledger'!$A:$A, ">="&${headerCol}$${cfHeaderRow}, ` +
               `'General Ledger'!$A:$A, "<="&INT(EOMONTH(${headerCol}$${cfHeaderRow}, 0))))`;
      });
      cashChangeFormula = cashChanges.join("+");
    } else {
      cashChangeFormula = "0";
    }

    // Build formula to sum all liability increase rows
    const liabilityAccountNames = Object.keys(liabilityBalanceSheetRows);
    let liabilitySum = "";
    if (liabilityAccountNames.length > 0) {
      // Find the range of rows that contain liability increases
      // These are between cfOperatingStartRow+1 and otherWorkingCapitalRow-1
      const firstLiabilityRow = cfOperatingStartRow + 1; // After "Net Income"
      const lastLiabilityRow = otherWorkingCapitalRow - 1; // Before "Other Working Capital"
      liabilitySum = `SUM(${col}${firstLiabilityRow}:${col}${lastLiabilityRow})`;
    } else {
      liabilitySum = "0";
    }

    // Other Working Capital = Change in Cash (from GL) - Net Income - Liability Increases - CapEx - Loan Proceeds
    sheet.getRange(otherWorkingCapitalRow, 3 + monthIdx).setFormula(
      `=${cashChangeFormula}-${col}${cfOperatingStartRow}-${liabilitySum}-${col}${capExRow}-${col}${loanProceedsRow}`
    );
  });

  // Format Cash Flow currency
  sheet.getRange(cfOperatingStartRow, 3, currentRow - cfOperatingStartRow, months.length).setNumberFormat("$#,##0.00_);($#,##0.00);\"-  \"");

  // Set column widths
  sheet.setColumnWidth(1, 250); // Account
  sheet.setColumnWidth(2, 100); // Type
  months.forEach((m, idx) => {
    sheet.setColumnWidth(3 + idx, 100); // Monthly columns
  });

  // Freeze after column B (columns A and B frozen)
  sheet.setFrozenRows(plHeaderRow);
  sheet.setFrozenColumns(2);
}

/**
 * Helper to get column letter from index
 */
function columnIndexToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

/**
 * Helper to create a named range
 * @param {Sheet} sheet - The sheet to create the named range in
 * @param {string} name - Name of the range
 * @param {string} a1Notation - A1 notation for the range (e.g., "B3")
 */
function createNamedRange(sheet, name, a1Notation) {
  try {
    const ss = sheet.getParent();
    const existingRange = ss.getNamedRanges().find(nr => nr.getName() === name);

    if (existingRange) {
      existingRange.remove();
    }

    const range = sheet.getRange(a1Notation);
    ss.setNamedRange(name, range);
  } catch (error) {
    Logger.log(`Error creating named range ${name}: ${error.message}`);
  }
}
