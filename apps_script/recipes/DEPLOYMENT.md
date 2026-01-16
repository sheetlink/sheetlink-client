# SheetLink Recipes - Deployment Guide

## Package Contents

```
apps_script/recipes/
├── README.md                    # Full documentation
├── DEPLOYMENT.md               # This file
├── appsscript.json             # Apps Script configuration
├── registry.gs                 # Recipe registry
├── runner.gs                   # Recipe execution engine
├── utils.gs                    # Shared utilities
├── recipe_budget.gs            # Budget tracker
├── recipe_cashflow.gs          # Weekly cash flow
├── recipe_recurring.gs         # Recurring spend detector ⭐
├── recipe_ledger.gs            # Account-aware ledger ⭐
├── recipe_financials_v2.gs     # Financial statements suite v2.0 ⭐
└── debug_budget.gs             # Debug utilities
```

## 🚀 Quick Start Deployment

### Option 1: Manual Copy-Paste (Easiest)

1. **Open Your Google Sheet**
   - Navigate to your sheet with transaction data
   - Make sure you have a "Transactions" sheet with required columns

2. **Open Apps Script Editor**
   - Click `Extensions > Apps Script`
   - Delete the default `Code.gs` file

3. **Add Recipe Files** (in this order):
   ```
   1. utils.gs               (Foundation - required first)
   2. registry.gs            (Recipe metadata)
   3. runner.gs              (Execution engine)
   4. recipe_budget.gs
   5. recipe_cashflow.gs
   6. recipe_recurring.gs
   7. recipe_ledger.gs
   8. recipe_financials_v2.gs (v2.0 - formula-driven)
   ```

4. **For Each File**:
   - Click `+ > Script` in Apps Script editor
   - Name it exactly as shown (e.g., "utils", "registry", etc.)
   - Copy entire content from the file
   - Paste into the editor
   - **Important**: Do NOT include `.gs` extension in the name

5. **Save and Test**:
   - Click `Save project` (disk icon)
   - Select function `runRecurringRecipe` from dropdown
   - Click `Run`
   - Authorize when prompted
   - Check your sheet for new tabs!

### Option 2: clasp (Command Line - Advanced)

```bash
# Install clasp
npm install -g @google/clasp

# Login
clasp login

# Navigate to recipes directory
cd apps_script/recipes

# Create new project (or use existing)
clasp create --type sheets --title "SheetLink Financial Analysis" --rootDir .

# OR clone existing project
clasp clone <your-script-id>

# Push all files
clasp push

# Open in browser
clasp open
```

### Option 3: Google Drive Add-on (Packaged Distribution)

Coming soon - will allow one-click installation from Google Workspace Marketplace.

## 📋 Post-Deployment Setup

### 1. Verify Installation

Run this test function to verify all recipes are loaded:

```javascript
function testInstallation() {
  const recipes = getAvailableRecipes();
  Logger.log("Installed recipes:");
  Object.keys(recipes).forEach(id => {
    Logger.log(`- ${id}: ${recipes[id].name}`);
  });
  return "Installation OK";
}
```

Expected output:
```
Installed recipes:
- budget: Plaid Category Budget
- cashflow: Weekly Cash Flow Forecast
- recurring: Subscription & Recurring Spend Detector
- ledger: Account-Aware Ledger View
- financials: Financial Statements Suite
```

### 2. Add Custom Menu (Optional but Recommended)

Create a new file called `menu.gs`:

```javascript
/**
 * Creates custom menu on spreadsheet open
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('📊 Financial Analysis')
    .addItem('💰 Budget Tracker', 'menuRunBudget')
    .addItem('💵 Cash Flow Forecast', 'menuRunCashFlow')
    .addItem('🔄 Recurring Spend Detector', 'menuRunRecurring')
    .addItem('📖 Ledger View', 'menuRunLedger')
    .addItem('📊 Financial Statements', 'menuRunFinancials')
    .addSeparator()
    .addItem('▶️ Run All Recipes', 'menuRunAll')
    .addSeparator()
    .addSubMenu(ui.createMenu('ℹ️ Help')
      .addItem('View Documentation', 'menuShowDocs')
      .addItem('About', 'menuShowAbout'))
    .addToUi();
}

// Menu handlers
function menuRunBudget() {
  showToast("Running Budget Tracker...", "SheetLink", 2);
  runBudgetRecipe();
}

function menuRunCashFlow() {
  showToast("Running Cash Flow Forecast...", "SheetLink", 2);
  runCashFlowRecipe();
}

function menuRunRecurring() {
  showToast("Running Recurring Spend Detector...", "SheetLink", 2);
  runRecurringRecipe();
}

function menuRunLedger() {
  showToast("Running Ledger View...", "SheetLink", 2);
  runLedgerRecipe();
}

function menuRunFinancials() {
  showToast("Running Financial Statements...", "SheetLink", 2);
  runFinancialsRecipe();
}

function menuRunAll() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    'Run All Recipes',
    'This will run all 5 recipes and may take 1-2 minutes. Continue?',
    ui.ButtonSet.YES_NO
  );

  if (response == ui.Button.YES) {
    showToast("Running all recipes...", "SheetLink", 3);
    const recipes = ['budget', 'cashflow', 'recurring', 'ledger', 'financials'];
    recipes.forEach(id => runRecipe(id));
    showToast("All recipes completed!", "SheetLink", 5);
  }
}

function menuShowDocs() {
  const html = HtmlService.createHtmlOutput(
    '<p>Full documentation available at:</p>' +
    '<p><a href="https://github.com/your-repo/sheetlink-recipes" target="_blank">SheetLink Recipes Documentation</a></p>' +
    '<br><p><strong>Quick Start:</strong></p>' +
    '<ol>' +
    '<li>Ensure you have a "Transactions" sheet with Plaid data</li>' +
    '<li>Run recipes from the Financial Analysis menu</li>' +
    '<li>Customize configurations in yellow/cream cells</li>' +
    '</ol>'
  ).setWidth(400).setHeight(250);

  SpreadsheetApp.getUi().showModalDialog(html, 'SheetLink Recipes - Help');
}

function menuShowAbout() {
  const html = HtmlService.createHtmlOutput(
    '<div style="text-align: center; padding: 20px;">' +
    '<h2>📊 SheetLink Recipes</h2>' +
    '<p><strong>Version:</strong> 1.0.0</p>' +
    '<p><strong>Financial Analysis Suite for Small Businesses</strong></p>' +
    '<br>' +
    '<p>Includes:</p>' +
    '<ul style="text-align: left;">' +
    '<li>Budget Tracker</li>' +
    '<li>Cash Flow Forecast</li>' +
    '<li>Recurring Spend Detector</li>' +
    '<li>General Ledger</li>' +
    '<li>Financial Statements (P&L, Balance Sheet, Cash Flow)</li>' +
    '</ul>' +
    '<br>' +
    '<p style="font-size: 10px; color: #666;">© 2026 SheetLink</p>' +
    '</div>'
  ).setWidth(400).setHeight(350);

  SpreadsheetApp.getUi().showModalDialog(html, 'About');
}
```

After adding `menu.gs`, close and reopen your spreadsheet. You'll see a new "📊 Financial Analysis" menu!

### 3. Configure Sheet Structure

Ensure your "Transactions" sheet has these columns (minimum):
- `date` - Transaction date
- `amount` - Amount (positive = expense, negative = income)
- `merchant_name` - Merchant/description
- `category_primary` - Category
- `account_name` - Account name
- `pending` - Pending status

### 4. Run Your First Recipe

**Try Recurring Spend Detector first** - it's the most impressive!

1. Click `Financial Analysis > Recurring Spend Detector`
2. Wait 10-30 seconds (depending on transaction count)
3. Check the new "Recurring_Analysis" and "Recurring_Config" sheets
4. Review detected subscriptions and their annualized costs

## 🔧 Configuration

### Recipe-Specific Configuration

Each recipe has editable configuration cells (highlighted in cream/yellow):

- **Cash Flow**: Starting balance and "as of" date (row 1)
- **Recurring**: Detection parameters in Recurring_Config sheet
- **Ledger**: Settings at top of Ledger_View sheet
- **Financials**: Chart_of_Accounts mappings

### Global Configuration

Edit `utils.gs` if you need to:
- Change transaction sheet name (default: "Transactions")
- Modify date formats
- Adjust column name mappings

## 📊 Verification Checklist

After deployment, verify:

- [ ] All 8 recipe files are loaded (use testInstallation function)
- [ ] Custom menu appears (if you added menu.gs)
- [ ] Transactions sheet exists with required columns
- [ ] At least one recipe runs successfully
- [ ] Output sheets are created with correct formatting
- [ ] No errors in Apps Script logs (View > Logs)

## 🐛 Troubleshooting

### "Recipe not found" Error
- Verify all files are named correctly (no .gs extension in editor)
- Check registry.gs is loaded
- Ensure runner.gs is loaded

### "Cannot read property..." Errors
- Check utils.gs is loaded first
- Verify all dependencies are present
- Review execution order of files

### Authorization Issues
- Click "Review Permissions" when prompted
- Authorize access to spreadsheets
- May need to enable "unsafe scripts" in browser

### Performance Issues
- Recipes optimized for up to 50K transactions
- Consider date range filters for large datasets
- Check Apps Script execution time limits (6 min for custom functions)

## 🚢 Production Deployment

### For Multiple Users/Sheets

1. **Template Approach**:
   - Create master template sheet with recipes installed
   - Users make a copy: File > Make a copy
   - Each user has independent instance

2. **Library Approach** (Advanced):
   - Publish recipes as Apps Script library
   - Users add library to their sheets
   - Centralized updates

3. **Add-on Approach** (Most Professional):
   - Package as Google Workspace Add-on
   - Submit to Marketplace
   - One-click installation for users

### Version Control

Use clasp for version control:
```bash
# Pull latest from Apps Script
clasp pull

# Make changes locally
# ...edit files...

# Push updates
clasp push

# Deploy specific version
clasp deploy --description "v1.0.0 - Initial release"
```

## 📦 Distribution Package

To share with others, provide:
1. This entire `recipes/` folder
2. README.md with instructions
3. Sample Transactions sheet (with fake data)
4. Installation video/screenshots (optional)

## 🔐 Security Notes

- No external API calls
- All code runs in user's Apps Script environment
- No data leaves Google's infrastructure
- Users control all data and permissions

## 📈 Success Metrics

Track these to measure value:
- Time saved on financial reporting
- Subscriptions discovered and canceled
- Budget variance insights acted upon
- Cash flow visibility improvement

## 🎯 Next Steps

After successful deployment:

1. **Week 1**: Run recipes daily, get familiar with outputs
2. **Week 2**: Customize configurations for your business
3. **Week 3**: Set up scheduled runs (triggers)
4. **Week 4**: Train team members on interpreting results
5. **Ongoing**: Regular reviews and optimization

## 🤝 Support

For issues:
1. Check Apps Script logs: View > Logs
2. Review troubleshooting section
3. Verify data format requirements
4. Check execution quotas

## 📝 Changelog

### v2.0.0 (January 2026)
- ✨ Financial Statements v2.0 - Formula-driven architecture
- ✅ Date-aware balance calculations in General Ledger
- ✅ Consolidated Financial Statements tab with monthly trending
- ✅ All statements reference each other dynamically
- ✅ Transaction ID tracking for audit trail
- ✅ Real-time calculations that update with transaction changes

### v1.0.0 (January 2026)
- ✨ Initial production release
- ✅ 5 complete recipes
- ✅ Full documentation
- ✅ Production-ready error handling
- ✅ Customizable configurations
- ✅ Professional formatting

---

**You're now ready to deploy professional-grade financial analysis to your Google Sheets!**

Good luck! 🚀
