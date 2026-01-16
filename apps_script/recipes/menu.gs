/**
 * SheetLink Recipes - Custom Menu
 * Creates menu on spreadsheet open for one-click recipe execution
 */

/**
 * Creates custom menu on spreadsheet open
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('SheetLink Recipes')
    .addItem('Budget Tracker', 'menuRunBudget')
    .addItem('Budget Tracker (by Account)', 'menuRunBudgetByAccount')
    .addItem('Recurring Spend Detector', 'menuRunRecurring')
    .addItem('Cash Flow Forecast', 'menuRunCashFlow')
    .addItem('Financial Statements', 'menuRunFinancials')
    .addSeparator()
    .addSubMenu(ui.createMenu('Settings')
      .addItem('Configure Starting Balance', 'menuConfigureBalance')
      .addItem('Populate Dummy Data', 'menuPopulateDummyData'))
    .addSeparator()
    .addSubMenu(ui.createMenu('Help')
      .addItem('View Documentation', 'menuShowDocs')
      .addItem('About SheetLink Recipes', 'menuShowAbout'))
    .addToUi();
}

// Menu handlers
function menuRunBudget() {
  showToast("Running Budget Tracker...", "SheetLink", 3);
  try {
    runBudgetRecipe();
    showToast("✓ Budget Tracker complete!", "SheetLink", 3);
  } catch (e) {
    showToast("✗ Error: " + e.message, "SheetLink", 5);
  }
}

function menuRunBudgetByAccount() {
  showToast("Running Budget Tracker (by Account)...", "SheetLink", 3);
  try {
    runBudgetByAccountRecipe();
    showToast("✓ Budget Tracker (by Account) complete!", "SheetLink", 3);
  } catch (e) {
    showToast("✗ Error: " + e.message, "SheetLink", 5);
  }
}

function menuRunCashFlow() {
  showToast("Running Cash Flow Forecast...", "SheetLink", 3);
  try {
    runCashFlowRecipe();
    showToast("✓ Cash Flow Forecast complete!", "SheetLink", 3);
  } catch (e) {
    showToast("✗ Error: " + e.message, "SheetLink", 5);
  }
}

function menuRunRecurring() {
  showToast("Running Recurring Spend Detector...", "SheetLink", 3);
  try {
    runRecurringRecipe();
    showToast("✓ Recurring Spend analysis complete!", "SheetLink", 3);
  } catch (e) {
    showToast("✗ Error: " + e.message, "SheetLink", 5);
  }
}

function menuRunLedger() {
  showToast("Running Ledger View...", "SheetLink", 3);
  try {
    runLedgerRecipe();
    showToast("✓ Ledger View complete!", "SheetLink", 3);
  } catch (e) {
    showToast("✗ Error: " + e.message, "SheetLink", 5);
  }
}

function menuRunFinancials() {
  showToast("Running Financial Statements...", "SheetLink", 3);
  try {
    runFinancialsRecipe();
    showToast("✓ Financial Statements complete!", "SheetLink", 3);
  } catch (e) {
    showToast("✗ Error: " + e.message, "SheetLink", 5);
  }
}

function menuConfigureBalance() {
  const ui = SpreadsheetApp.getUi();
  const result = ui.prompt(
    'Configure Starting Balance',
    'Enter your starting balance for Cash Flow and General Ledger:',
    ui.ButtonSet.OK_CANCEL
  );

  if (result.getSelectedButton() == ui.Button.OK) {
    const balance = parseFloat(result.getResponseText());
    if (!isNaN(balance)) {
      // Update General Ledger config
      const ss = SpreadsheetApp.getActiveSpreadsheet();
      const glSheet = ss.getSheetByName("General Ledger");
      if (glSheet) {
        glSheet.getRange("C2").setValue(balance);
      }
      // Update CashFlow Weekly config
      const cfSheet = ss.getSheetByName("CashFlow Weekly");
      if (cfSheet) {
        cfSheet.getRange("E1").setValue(balance);
      }
      showToast("Starting balance updated to $" + balance.toFixed(2), "SheetLink", 3);
    } else {
      showToast("Invalid balance amount", "SheetLink", 3);
    }
  }
}

function menuPopulateDummyData() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Populate Dummy Data',
    'This will add sample accounts and transactions for testing. Continue?',
    ui.ButtonSet.YES_NO
  );

  if (response == ui.Button.YES) {
    showToast("Populating dummy data...", "SheetLink", 3);
    try {
      populateDummyData();
    } catch (e) {
      showToast("Error: " + e.message, "SheetLink", 5);
    }
  }
}

function menuShowDocs() {
  const html = HtmlService.createHtmlOutput(
    '<div style="font-family: Arial, sans-serif; padding: 30px; text-align: center;">' +
    '<h2>SheetLink Recipes Documentation</h2>' +
    '<p style="margin: 20px 0;">View complete documentation and guides online:</p>' +
    '<a href="https://sheetlink.app/recipes" target="_blank" style="display: inline-block; padding: 12px 24px; background-color: #023820; color: white; text-decoration: none; border-radius: 4px; font-weight: bold;">Open Documentation</a>' +
    '<p style="margin-top: 30px; font-size: 12px; color: #666;">Opens in a new tab</p>' +
    '</div>'
  ).setWidth(400).setHeight(200);

  SpreadsheetApp.getUi().showModalDialog(html, 'Documentation');
}

function menuShowAbout() {
  const html = HtmlService.createHtmlOutput(
    '<div style="text-align: center; padding: 30px; font-family: Arial, sans-serif;">' +
    '<h1 style="color: #023820;">SheetLink Recipes</h1>' +
    '<p style="font-size: 18px; color: #666;"><strong>Version 2.0.0</strong></p>' +
    '<p style="font-size: 14px; margin: 20px 0;">Financial Analysis Suite for Personal Finance & Small Businesses</p>' +
    '<hr style="border: 1px solid #eee; margin: 20px 0;">' +
    '<p style="text-align: left; margin: 20px 40px;"><strong>Includes:</strong></p>' +
    '<ul style="text-align: left; margin: 0 40px;">' +
    '<li>Budget Tracker</li>' +
    '<li>Budget Tracker (by Account)</li>' +
    '<li>Cash Flow Forecast</li>' +
    '<li>Recurring Spend Detector</li>' +
    '<li>General Ledger</li>' +
    '<li>Financial Statements (P&L, Balance Sheet, Cash Flow)</li>' +
    '</ul>' +
    '<hr style="border: 1px solid #eee; margin: 20px 0;">' +
    '<p style="font-size: 12px; color: #999; margin-top: 30px;">© 2026 SheetLink</p>' +
    '<p style="font-size: 11px; color: #999;">Built for budgeters and business owners</p>' +
    '</div>'
  ).setWidth(450).setHeight(450);

  SpreadsheetApp.getUi().showModalDialog(html, 'About SheetLink Recipes');
}

/**
 * Helper function for toast notifications
 */
function showToast(message, title, timeoutSeconds) {
  SpreadsheetApp.getActiveSpreadsheet().toast(message, title, timeoutSeconds);
}
