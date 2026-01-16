/**
 * SheetLink Recipes - Template Setup
 * Creates staging sheets ready for SheetLink sync
 * Run this after deploying all recipe files to create the template
 */

/**
 * Master setup function - creates template ready for SheetLink sync
 */
function setupTemplate() {
  console.log('Starting setupTemplate...');
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Step 1: Create staged Account and Transactions sheets with headers
  console.log('Step 1: Creating staged Account sheet...');
  createStagedAccountSheet(ss);
  console.log('Step 1: Account sheet created');

  console.log('Step 1: Creating staged Transactions sheet...');
  createStagedTransactionsSheet(ss);
  console.log('Step 1: Transactions sheet created');

  // Step 2: Create welcome/instructions sheet
  console.log('Step 2: Creating Welcome sheet...');
  createWelcomeSheet(ss);
  console.log('Step 2: Welcome sheet created');

  // Step 3: Reorder sheets (Welcome first, then Account, then Transactions)
  console.log('Step 3: Reordering sheets...');
  reorderSheets(ss);
  console.log('Step 3: Sheets reordered');

  // Step 4: Final formatting
  console.log('Step 4: Finalizing template...');
  finalizeTemplate(ss);
  console.log('Step 4: Template finalized');

  console.log('Setup complete - showing alert...');
  SpreadsheetApp.getUi().alert(
    'Template Setup Complete!',
    'The template is ready to use. Next steps:\n\n' +
    '1. Users make a copy of this template\n' +
    '2. Users log into SheetLink and sync their data\n' +
    '3. Data populates Account and Transactions sheets\n' +
    '4. Users run recipes from the SheetLink menu',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
  console.log('setupTemplate finished successfully');
}

/**
 * Creates staged Accounts sheet with full column headers
 */
function createStagedAccountSheet(ss) {
  let sheet = ss.getSheetByName("Accounts");

  // Create new Accounts sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet("Accounts");
  } else {
    sheet.clear();
  }

  // Full column headers for Accounts sheet (all tiers get full columns)
  const headers = [
    "account_id",
    "persistent_account_id",
    "name",
    "official_name",
    "mask",
    "type",
    "subtype",
    "current_balance",
    "available_balance",
    "iso_currency_code",
    "institution",
    "last_synced_at"
  ];

  // Set headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format
  sheet.setFrozenRows(1);

  // Set column widths (optimized - no auto-resize)
  sheet.setColumnWidth(1, 200); // account_id
  sheet.setColumnWidth(2, 200); // persistent_account_id
  sheet.setColumnWidth(3, 200); // name
  sheet.setColumnWidth(4, 200); // official_name
  sheet.setColumnWidth(5, 80);  // mask
  sheet.setColumnWidth(6, 100); // type
  sheet.setColumnWidth(7, 120); // subtype
  sheet.setColumnWidth(8, 140); // current_balance
  sheet.setColumnWidth(9, 140); // available_balance
  sheet.setColumnWidth(10, 100); // iso_currency_code
  sheet.setColumnWidth(11, 200); // institution
  sheet.setColumnWidth(12, 150); // last_synced_at
}

/**
 * Creates staged Transactions sheet with full column headers
 */
function createStagedTransactionsSheet(ss) {
  let sheet = ss.getSheetByName("Transactions");

  // Create new Transactions sheet if doesn't exist
  if (!sheet) {
    sheet = ss.insertSheet("Transactions");
  } else {
    sheet.clear();
  }

  // Full column headers for Transactions sheet (all tiers get full columns)
  const headers = [
    "transaction_id",
    "account_id",
    "persistent_account_id",
    "account_name",
    "account_mask",
    "date",
    "authorized_date",
    "datetime",
    "authorized_datetime",
    "description_raw",
    "merchant_name",
    "merchant_entity_id",
    "amount",
    "iso_currency_code",
    "unofficial_currency_code",
    "pending",
    "pending_transaction_id",
    "check_number",
    "category_primary",
    "category_detailed",
    "payment_channel",
    "transaction_type",
    "transaction_code",
    "location_address",
    "location_city",
    "location_region",
    "location_postal_code",
    "location_country",
    "location_lat",
    "location_lon",
    "website",
    "logo_url",
    "source_institution",
    "synced_at"
  ];

  // Set headers
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  // Format
  sheet.setFrozenRows(1);

  // Set column widths (optimized - no auto-resize for performance)
  sheet.setColumnWidth(1, 200);  // transaction_id
  sheet.setColumnWidth(2, 200);  // account_id
  sheet.setColumnWidth(3, 200);  // persistent_account_id
  sheet.setColumnWidth(4, 150);  // account_name
  sheet.setColumnWidth(5, 100);  // account_mask
  sheet.setColumnWidth(6, 100);  // date
  sheet.setColumnWidth(7, 120);  // authorized_date
  sheet.setColumnWidth(8, 120);  // datetime
  sheet.setColumnWidth(9, 140);  // authorized_datetime
  sheet.setColumnWidth(10, 200); // description_raw
  sheet.setColumnWidth(11, 200); // merchant_name
  sheet.setColumnWidth(12, 150); // merchant_entity_id
  sheet.setColumnWidth(13, 100); // amount
  sheet.setColumnWidth(14, 100); // iso_currency_code
  sheet.setColumnWidth(15, 120); // unofficial_currency_code
  sheet.setColumnWidth(16, 80);  // pending
  sheet.setColumnWidth(17, 150); // pending_transaction_id
  sheet.setColumnWidth(18, 100); // check_number
  sheet.setColumnWidth(19, 150); // category_primary
  sheet.setColumnWidth(20, 180); // category_detailed
  sheet.setColumnWidth(21, 120); // payment_channel
  sheet.setColumnWidth(22, 140); // transaction_type
  sheet.setColumnWidth(23, 120); // transaction_code
  sheet.setColumnWidth(24, 180); // location_address
  sheet.setColumnWidth(25, 120); // location_city
  sheet.setColumnWidth(26, 100); // location_region
  sheet.setColumnWidth(27, 100); // location_postal_code
  sheet.setColumnWidth(28, 100); // location_country
  sheet.setColumnWidth(29, 80);  // location_lat
  sheet.setColumnWidth(30, 80);  // location_lon
  sheet.setColumnWidth(31, 150); // website
  sheet.setColumnWidth(32, 150); // logo_url
  sheet.setColumnWidth(33, 150); // source_institution
  sheet.setColumnWidth(34, 150); // synced_at
}

/**
 * Creates welcome/instructions sheet with modern, clean design
 */
function createWelcomeSheet(ss) {
  let sheet = ss.getSheetByName("Welcome");

  if (!sheet) {
    sheet = ss.insertSheet("Welcome");
  } else {
    sheet.clear();
  }

  // Set column widths for better layout
  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 500);

  // Hide gridlines
  sheet.setHiddenGridlines(true);

  let row = 1;

  // Title
  sheet.getRange(`A${row}`).setValue("SheetLink Financial Recipes")
    .setFontSize(28)
    .setFontWeight("bold")
    .setFontColor("#023820");
  row++;

  sheet.getRange(`A${row}`).setValue("Professional financial analysis for personal finance and small businesses")
    .setFontSize(14)
    .setFontColor("#5f6368")
    .setWrap(false);
  row += 2;

  // Getting Started
  sheet.getRange(`A${row}`).setValue("Getting Started")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");
  sheet.getRange(`A${row}:B${row}`)
    .setBackground("#e7f7f0");
  row++;

  const steps = [
    "1. Make a copy of this template (File > Make a copy)",
    "2. Log into SheetLink and connect your financial accounts",
    "3. Click 'Sync' to populate your Account and Transactions sheets",
    "4. Use the SheetLink menu to run recipes and generate reports"
  ];

  steps.forEach(step => {
    sheet.getRange(`A${row}`).setValue(step)
      .setFontSize(11)
      .setWrap(false);
    row++;
  });
  row++;

  // Available Recipes
  sheet.getRange(`A${row}`).setValue("Available Recipes")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");
  sheet.getRange(`A${row}:B${row}`)
    .setBackground("#e7f7f0");
  row++;

  const recipes = [
    ["Budget Tracker", "Track spending vs budget by category with multi-month variance analysis"],
    ["Cash Flow Forecast", "26-week rolling forecast with account and category breakdowns"],
    ["Recurring Spend Detector", "Automatically identify subscriptions and recurring charges"],
    ["General Ledger", "Traditional accounting ledger with debit/credit format"],
    ["Financial Statements", "Complete P&L, Balance Sheet, and Cash Flow with monthly trending"]
  ];

  recipes.forEach(([name, desc]) => {
    sheet.getRange(`A${row}`).setValue(name)
      .setFontWeight("bold")
      .setFontSize(11)
      .setWrap(false);
    sheet.getRange(`B${row}`).setValue(desc)
      .setFontSize(11)
      .setWrap(false);
    row++;
  });
  row++;

  // Data Requirements
  sheet.getRange(`A${row}`).setValue("Data Requirements")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");
  sheet.getRange(`A${row}:B${row}`)
    .setBackground("#e7f7f0");
  row++;

  sheet.getRange(`A${row}`).setValue("Your Account and Transactions sheets will be populated automatically when you sync with SheetLink.")
    .setFontSize(11)
    .setWrap(false);
  row++;

  sheet.getRange(`A${row}`).setValue("Minimum required columns: date, amount, merchant_name, category_primary, account_name, pending")
    .setFontSize(10)
    .setFontStyle("italic")
    .setFontColor("#5f6368")
    .setWrap(false);
  row += 2;

  // Pro Tips
  sheet.getRange(`A${row}`).setValue("Pro Tips")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");
  sheet.getRange(`A${row}:B${row}`)
    .setBackground("#e7f7f0");
  row++;

  const tips = [
    "Run 'Financial Statements' first to set up your Chart of Accounts",
    "Customize the Chart of Accounts to match your business structure",
    "Sync regularly to keep your reports up to date",
    "Editable cells are highlighted in yellow/cream",
    "Each recipe runs independently - use what you need"
  ];

  tips.forEach(tip => {
    sheet.getRange(`A${row}`).setValue("• " + tip)
      .setFontSize(11)
      .setWrap(false);
    row++;
  });
  row += 2;

  // Support
  sheet.getRange(`A${row}`).setValue("Need Help?")
    .setFontSize(18)
    .setFontWeight("bold")
    .setFontColor("#023820");
  sheet.getRange(`A${row}:B${row}`)
    .setBackground("#e7f7f0");
  row++;

  sheet.getRange(`A${row}`).setValue("Visit the SheetLink menu > Help for documentation and support")
    .setFontSize(11)
    .setWrap(false);
  row += 2;

  // Footer
  sheet.getRange(`A${row}`).setValue("Version 2.0.0")
    .setFontSize(9)
    .setFontColor("#9aa0a6")
    .setWrap(false);

  // Format all text for better readability
  sheet.getRange(`A1:B${row}`).setVerticalAlignment("top");
}

/**
 * Reorder sheets for optimal UX
 */
function reorderSheets(ss) {
  const sheetOrder = [
    "Welcome",
    "Accounts",
    "Transactions"
  ];

  sheetOrder.forEach((name, index) => {
    const sheet = ss.getSheetByName(name);
    if (sheet) {
      ss.setActiveSheet(sheet);
      ss.moveActiveSheet(index + 1);
    }
  });

  // Set Welcome as active sheet
  const welcomeSheet = ss.getSheetByName("Welcome");
  if (welcomeSheet) {
    ss.setActiveSheet(welcomeSheet);
  }
}

/**
 * Final formatting touches
 */
function finalizeTemplate(ss) {
  // Rename spreadsheet
  ss.rename("SheetLink Financial Recipes");

  // Set timezone
  ss.setSpreadsheetTimeZone(Session.getScriptTimeZone());
}

/**
 * Optional: Populate dummy data for testing
 * Run this separately if you want to test recipes with sample data
 */
function populateDummyData() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Create dummy accounts
  createDummyAccounts(ss);

  // Create dummy transactions
  createDummyTransactions(ss);

  SpreadsheetApp.getUi().alert(
    'Dummy Data Created!',
    'Sample accounts and transactions have been populated.\n\n' +
    'You can now test recipes from the SheetLink menu.',
    SpreadsheetApp.getUi().ButtonSet.OK
  );
}

/**
 * Creates dummy account data
 */
function createDummyAccounts(ss) {
  const sheet = ss.getSheetByName("Accounts");
  if (!sheet) return;

  const dummyAccounts = [
    [
      "acc_checking_001",
      "pacc_checking_001",
      "Chase Checking",
      "Chase Total Checking",
      "1234",
      "depository",
      "checking",
      5234.56,
      5234.56,
      "USD",
      "Chase",
      new Date()
    ],
    [
      "acc_credit_001",
      "pacc_credit_001",
      "Chase Freedom",
      "Chase Freedom Unlimited",
      "5678",
      "credit",
      "credit card",
      -1250.32,
      null,
      "USD",
      "Chase",
      new Date()
    ],
    [
      "acc_savings_001",
      "pacc_savings_001",
      "Chase Savings",
      "Chase Savings Account",
      "9012",
      "depository",
      "savings",
      15000.00,
      15000.00,
      "USD",
      "Chase",
      new Date()
    ]
  ];

  // Add data starting at row 2
  sheet.getRange(2, 1, dummyAccounts.length, 12).setValues(dummyAccounts);

  // Format
  sheet.getRange(2, 8, dummyAccounts.length, 1).setNumberFormat("$#,##0.00"); // current_balance
  sheet.getRange(2, 9, dummyAccounts.length, 1).setNumberFormat("$#,##0.00"); // available_balance
}

/**
 * Creates dummy transaction data
 */
function createDummyTransactions(ss) {
  const sheet = ss.getSheetByName("Transactions");
  if (!sheet) return;

  const today = new Date();
  const dummyTransactions = [];

  // Income
  for (let month = 0; month < 6; month++) {
    const date = new Date(today.getFullYear(), today.getMonth() - month, 15);
    const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
    dummyTransactions.push([
      `txn_income_${month}`,
      "acc_checking_001",
      "pacc_checking_001",
      "Chase Checking",
      "1234",
      dateStr,
      dateStr,
      null,
      null,
      "ACH Transfer - Salary",
      "Employer Inc",
      null,
      -5000.00,
      "USD",
      null,
      false,
      null,
      null,
      "INCOME",
      "Paycheck",
      "online",
      "special",
      null,
      null, null, null, null, null, null, null,
      null,
      null,
      "Chase",
      new Date()
    ]);
  }

  // Subscriptions
  const subscriptions = [
    ["Netflix", 15.99, "SUBSCRIPTION", "GENERAL_SERVICES"],
    ["Spotify", 9.99, "SUBSCRIPTION", "GENERAL_SERVICES"],
    ["Adobe Creative Cloud", 54.99, "SOFTWARE", "GENERAL_SERVICES"],
  ];

  subscriptions.forEach((sub, idx) => {
    for (let month = 0; month < 6; month++) {
      const date = new Date(today.getFullYear(), today.getMonth() - month, 5 + idx);
      const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");
      dummyTransactions.push([
        `txn_${sub[0].toLowerCase().replace(/\s/g, '_')}_${month}`,
        "acc_credit_001",
        "pacc_credit_001",
        "Chase Freedom",
        "5678",
        dateStr,
        dateStr,
        null,
        null,
        sub[0],
        sub[0],
        null,
        sub[1],
        "USD",
        null,
        false,
        null,
        null,
        sub[2],
        sub[3],
        "online",
        "digital",
        null,
        null, null, null, null, null, null, null,
        null,
        null,
        "Chase",
        new Date()
      ]);
    }
  });

  // Variable expenses
  const expenses = [
    ["Whole Foods", 125.43, "FOOD_AND_DRINK"],
    ["Shell Gas", 45.00, "TRANSPORTATION"],
    ["Starbucks", 12.50, "FOOD_AND_DRINK"]
  ];

  for (let month = 0; month < 6; month++) {
    expenses.forEach((exp, idx) => {
      const variance = (Math.random() - 0.5) * 0.3 * exp[1];
      const amount = exp[1] + variance;
      const day = 1 + Math.floor(Math.random() * 28);
      const date = new Date(today.getFullYear(), today.getMonth() - month, day);
      const dateStr = Utilities.formatDate(date, Session.getScriptTimeZone(), "yyyy-MM-dd");

      dummyTransactions.push([
        `txn_${exp[0].toLowerCase().replace(/\s/g, '_')}_${month}_${idx}`,
        "acc_credit_001",
        "pacc_credit_001",
        "Chase Freedom",
        "5678",
        dateStr,
        dateStr,
        null,
        null,
        exp[0],
        exp[0],
        null,
        amount,
        "USD",
        null,
        false,
        null,
        null,
        exp[2],
        exp[2],
        "in store",
        "place",
        null,
        null, null, null, null, null, null, null,
        null,
        null,
        "Chase",
        new Date()
      ]);
    });
  }

  // Sort by date descending
  dummyTransactions.sort((a, b) => new Date(b[5]) - new Date(a[5]));

  // Add data starting at row 2
  sheet.getRange(2, 1, dummyTransactions.length, 34).setValues(dummyTransactions);

  // Format
  sheet.getRange(2, 13, dummyTransactions.length, 1).setNumberFormat("$#,##0.00"); // amount
  sheet.getRange(2, 6, dummyTransactions.length, 1).setNumberFormat("yyyy-mm-dd"); // date
  sheet.getRange(2, 7, dummyTransactions.length, 1).setNumberFormat("yyyy-mm-dd"); // authorized_date
}
