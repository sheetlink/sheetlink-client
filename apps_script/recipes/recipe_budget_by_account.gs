/**
 * SheetLink Recipe: Plaid Category Budget (by Account)
 * Phase 3.23.0 - Recipes Framework
 * VERSION: 2.1.1-fix-summary-colors
 *
 * Creates budget tables for each account with actuals, budget inputs, and variance.
 * Layout: Category | Actuals (by month) | Budget (by month) | Variance (by month)
 *
 * Date Handling Strategy:
 * - Extension writes dates as text (RAW mode) for fast syncs
 * - Recipe formats date columns when needed for SUMIFS formulas
 * - This approach: fast syncs + correct formulas
 */

/**
 * Run the Budget (by Account) recipe
 * @param {Spreadsheet} ss - Active spreadsheet (optional, defaults to active sheet)
 * @returns {Object} {success: boolean, error: string|null}
 */
function runBudgetByAccountRecipe(ss) {
  try {
    // If no spreadsheet provided, use the active one
    if (!ss) {
      ss = SpreadsheetApp.getActiveSpreadsheet();
    }

    // Check for transactions data
    if (!checkTransactionsOrPrompt(ss)) {
      return;
    }

    logRecipe("BudgetByAccount", "Starting Budget (by Account) recipe");

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

    // Create output sheet
    const accountSheet = getOrCreateSheet(ss, "Budget Monthly (by Account)");

    // Setup the by-account budget tracker
    setupBudgetByAccount(accountSheet, transactionsSheet, headerMap, ss);

    logRecipe("BudgetByAccount", "Recipe completed successfully");
    return { success: true, error: null };

  } catch (error) {
    Logger.log(`Budget (by Account) recipe error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

/**
 * Setup budget tracker with individual account tables
 * @param {Sheet} sheet - Budget sheet
 * @param {Sheet} transactionsSheet - Transactions sheet
 * @param {Object} headerMap - Header map
 * @param {Spreadsheet} ss - Active spreadsheet
 */
function setupBudgetByAccount(sheet, transactionsSheet, headerMap, ss) {
  // Clear existing data
  sheet.clear();

  // Format date and pending columns in Transactions sheet
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

  Logger.log(`[setupBudgetByAccount] Found ${sortedAccounts.length} accounts: ${sortedAccounts.join(', ')}`);

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
    .setValue("Budget Tracker (by Account)")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");

  sheet.getRange(2, 1)
    .setValue("Individual budget tables for each account. Enter your budget amounts in the yellow cells.")
    .setFontSize(11)
    .setWrap(false);

  // Create individual budget tables for each account
  let currentRow = 4; // Start after title section
  if (sortedAccounts.length > 0) {
    sortedAccounts.forEach((account, index) => {
      Logger.log(`[setupBudgetByAccount] Processing account ${index + 1}/${sortedAccounts.length}: ${account} at row ${currentRow}`);
      const accountTxns = validTxns.filter(txn => txn.account_name === account);
      Logger.log(`[setupBudgetByAccount] Account ${account} has ${accountTxns.length} transactions`);
      const nextRow = createBudgetTable(sheet, transactionsSheet, headerMap, accountTxns, account, currentRow, ss, allMonths, allCategories);
      Logger.log(`[setupBudgetByAccount] createBudgetTable returned ${nextRow}, adding 3 for spacing`);
      currentRow = nextRow + 3; // Add spacing between tables
      Logger.log(`[setupBudgetByAccount] Next table will start at row ${currentRow}`);
    });
  } else {
    sheet.getRange(4, 1).setValue("No accounts found. Please sync transactions first.");
  }

  // Freeze headers and category column
  sheet.setFrozenRows(6); // Freeze after title, description, and table headers
  sheet.setFrozenColumns(1);
  sheet.setColumnWidth(1, 250);
}
