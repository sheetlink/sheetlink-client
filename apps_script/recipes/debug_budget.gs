/**
 * Debug script for Budget Recipe
 * Add this file to your Apps Script project and run debugBudgetDetailed()
 */

function debugBudgetDetailed() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const transactionsSheet = getTransactionsSheet(ss);

  Logger.log("=== DETAILED BUDGET DEBUG ===");

  if (!transactionsSheet) {
    Logger.log("ERROR: Transactions sheet not found");
    return;
  }

  // Get all transactions
  const transactions = getTransactionData(transactionsSheet);
  Logger.log(`Total transactions: ${transactions.length}`);

  if (transactions.length === 0) {
    Logger.log("ERROR: No transactions found");
    return;
  }

  // Analyze dates
  Logger.log("\n--- DATE ANALYSIS ---");
  const dates = transactions
    .map(txn => parseDate(txn.date))
    .filter(d => d !== null)
    .sort((a, b) => a - b);

  if (dates.length > 0) {
    const oldest = dates[0];
    const newest = dates[dates.length - 1];
    Logger.log(`Oldest transaction: ${oldest.toISOString().split('T')[0]}`);
    Logger.log(`Newest transaction: ${newest.toISOString().split('T')[0]}`);

    const newestMonth = (newest.getMonth() + 1).toString().padStart(2, '0');
    const detectedMonth = `${newest.getFullYear()}-${newestMonth}`;
    Logger.log(`Detected most recent month: ${detectedMonth}`);
  }

  // Check what getMostRecentMonth returns (calculate manually since it might not be in scope)
  let mostRecentMonth = "2026-01"; // We know from above
  try {
    mostRecentMonth = getMostRecentMonth(transactions);
    Logger.log(`getMostRecentMonth() returned: ${mostRecentMonth}`);
  } catch (e) {
    Logger.log(`getMostRecentMonth() not accessible (using detected value): ${mostRecentMonth}`);
  }

  // Check what Budget_TargetMonth is set to
  const targetMonthRange = ss.getRangeByName("Budget_TargetMonth");
  const targetMonth = targetMonthRange ? targetMonthRange.getValue() : "NOT SET";
  Logger.log(`Budget_TargetMonth cell value: ${targetMonth}`);

  // Count transactions by month
  Logger.log("\n--- TRANSACTIONS BY MONTH ---");
  const monthCounts = {};
  transactions.forEach(txn => {
    const date = parseDate(txn.date);
    if (!date) return;

    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const yearMonth = `${date.getFullYear()}-${month}`;
    monthCounts[yearMonth] = (monthCounts[yearMonth] || 0) + 1;
  });

  // Sort by month and show counts
  Object.entries(monthCounts)
    .sort((a, b) => b[0].localeCompare(a[0])) // Descending
    .slice(0, 12) // Show last 12 months
    .forEach(([month, count]) => {
      Logger.log(`  ${month}: ${count} transactions`);
    });

  // Test filtering with target month
  const finalTargetMonth = targetMonthRange ? targetMonthRange.getValue() : mostRecentMonth;
  Logger.log(`\n--- FILTERING WITH MONTH: ${finalTargetMonth} ---`);

  let pendingCount = 0;
  let notInMonthCount = 0;
  let passedCount = 0;

  const filteredTxns = [];

  transactions.forEach(txn => {
    // Check pending
    const isPending = txn.pending === true || txn.pending === "TRUE" || txn.pending === "true";
    if (isPending) {
      pendingCount++;
      return;
    }

    // Check month (inline since isInMonth might not be in scope)
    let inMonth = false;
    try {
      inMonth = isInMonth(txn.date, finalTargetMonth);
    } catch (e) {
      // Inline implementation
      const d = new Date(txn.date);
      if (d) {
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const transactionMonth = `${d.getFullYear()}-${month}`;
        inMonth = (transactionMonth === finalTargetMonth);
      }
    }

    if (!inMonth) {
      notInMonthCount++;
      return;
    }

    passedCount++;
    filteredTxns.push(txn);
  });

  Logger.log(`Filtered out (pending): ${pendingCount}`);
  Logger.log(`Filtered out (not in target month): ${notInMonthCount}`);
  Logger.log(`PASSED FILTER: ${passedCount}`);

  if (passedCount === 0) {
    Logger.log("\n⚠️ PROBLEM: No transactions passed the filter!");
    Logger.log("This is why Budget Monthly is empty.");
    Logger.log("\nPossible causes:");
    Logger.log("1. Target month doesn't match any transaction dates");
    Logger.log("2. All transactions in target month are marked as pending");
    Logger.log("3. Date parsing issue");
    return;
  }

  // Test aggregation
  Logger.log("\n--- CATEGORY AGGREGATION ---");
  const categoryTotals = {};
  filteredTxns.forEach(txn => {
    const category = txn.category_primary || "Uncategorized";
    const amount = Math.abs(parseFloat(txn.amount) || 0);

    if (!categoryTotals[category]) {
      categoryTotals[category] = 0;
    }
    categoryTotals[category] += amount;
  });

  Logger.log(`Categories found: ${Object.keys(categoryTotals).length}`);

  // Show top 5 categories
  Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([category, total]) => {
      Logger.log(`  ${category}: $${total.toFixed(2)}`);
    });

  Logger.log("\n✅ Debug complete. Check results above.");
}
