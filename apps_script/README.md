# SheetLink Recipes

**Phase 3.23.0 - Spreadsheet-Native Financial Systems**

SheetLink Recipes transform your raw transaction data into useful financial systems—entirely within Google Sheets using Apps Script. No exports, no dashboards, no external tools.

---

## What are Recipes?

Recipes are **opinionated Apps Script automations** that:
- Read your SheetLink transaction data
- Apply financial logic (budgeting, forecasting, pattern detection)
- Generate derived views in new tabs
- Never modify your raw transaction data

Think of them as "financial formulas on steroids" that go beyond what regular spreadsheet formulas can do.

---

## Available Recipes

### 1. Plaid Category Budget
**Creates a live monthly budget using Plaid's AI-enhanced categories**

**What it does:**
- Groups transactions by `category_primary`
- Filters out pending transactions
- Calculates actual spend vs budget
- Shows variance and % of budget used
- Highlights over-budget categories

**Output Tabs:**
- `Budget_Config` - Set target month and budgets
- `Budget_Monthly` - Category spending breakdown
- `Budget_Variance` - Budget vs actual comparison

**Use cases:**
- Zero-based budgeting with AI categories
- Monthly spending review
- Category-based expense tracking

---

### 2. Weekly Cash Flow Forecast
**Creates a rolling weekly cash flow view using historical data**

**What it does:**
- Groups transactions by ISO week
- Separates income from expenses
- Calculates net weekly flow
- Tracks running balance week-by-week
- Highlights weeks with low cash

**Output Tabs:**
- `CashFlow_Config` - Set starting balance and alert threshold
- `CashFlow_Weekly` - Week-by-week cash flow analysis

**Use cases:**
- Cash flow planning
- Identifying cash-tight periods
- Income vs expense trends

---

### 3. Subscription & Recurring Spend Detector
**Identifies likely subscriptions and recurring charges automatically**

**What it does:**
- Analyzes transaction patterns (merchant, amount, frequency)
- Detects recurring charges (weekly, monthly, annual)
- Calculates confidence scores
- Estimates total annual recurring spend

**Output Tabs:**
- `Recurring_Detected` - Identified subscriptions with confidence scores
- `Recurring_Config` - Adjust detection sensitivity

**Use cases:**
- Subscription audit
- Find forgotten recurring charges
- Annual subscription cost analysis

---

### 4. Account-Aware Ledger View
**Transforms transactions into traditional accounting ledger**

**What it does:**
- Converts to debit/credit format (positive = debit, negative = credit)
- Detects transfers between accounts automatically
- Calculates running balance per account
- Sorts by date, account, or category
- Filters pending and transfer transactions

**Output Tabs:**
- `Ledger_View` - Accounting-style ledger with debit/credit columns
- `Ledger_Config` - Ledger preferences (sorting, filters)

**Use cases:**
- Double-entry bookkeeping view
- Account balance tracking
- Transfer detection and reconciliation
- Accounting export preparation

---

## How to Use Recipes

### Installation

1. **Open your SheetLink Google Sheet** (the one with transaction data)

2. **Open Apps Script Editor:**
   - Click `Extensions` → `Apps Script`

3. **Copy recipe files:**
   - Create a `recipes` folder in the Apps Script editor
   - Copy all `.gs` files from `apps_script/recipes/` into the editor
   - Save the project

4. **Reload your spreadsheet**
   - Close and reopen your Google Sheet
   - A new menu `SheetLink Recipes` will appear

### Running Recipes

**Option 1: From the menu**
- Click `SheetLink Recipes` → Choose a recipe
- The recipe will run and create output tabs

**Option 2: From Apps Script**
```javascript
// Run a specific recipe
runRecipe('budget');
runRecipe('cashflow');
runRecipe('recurring');

// Run all recipes
runAllRecipes();
```

### Customization

Each recipe has a `_Config` tab where you can:
- Adjust settings (date ranges, thresholds, etc.)
- Set budget amounts
- Configure detection sensitivity

After changing config, re-run the recipe to see updated results.

---

## Technical Details

### Core Principles

1. **Raw data is immutable** - Recipes never modify the `Transactions` sheet
2. **Recipes generate derived views** - Creates new tabs only
3. **Idempotent** - Running multiple times doesn't duplicate data
4. **Header-based** - Uses column names, not positions (future-proof)
5. **Composable** - Multiple recipes can coexist

### Framework Architecture

```
recipes/
├── registry.gs      # Recipe registry and metadata
├── runner.gs        # Execution orchestrator + menu integration
├── utils.gs         # Shared utility functions
├── recipe_budget.gs # Budget recipe implementation
├── recipe_cashflow.gs # Cash flow recipe implementation
└── recipe_recurring.gs # Recurring charges recipe implementation
```

### Adding New Recipes

1. Create `recipe_yourname.gs`
2. Implement `runYourNameRecipe(ss)` function
3. Register in `registry.gs`:
```javascript
yourname: {
  name: "Your Recipe Name",
  description: "What it does",
  version: "1.0.0",
  entry: runYourNameRecipe,
  outputTabs: ["YourName_Output"]
}
```

4. Add menu wrapper in `runner.gs`:
```javascript
function runRecipeYourname() {
  runRecipe('yourname');
}
```

---

## Requirements

- **SheetLink transaction data** - Must have a `Transactions` sheet with synced data
- **Google Apps Script** - Built-in to Google Sheets
- **No special permissions** - Uses same permissions as SheetLink extension

### Required Transaction Columns

Most recipes need these columns (provided by SheetLink):
- `date` - Transaction date
- `amount` - Transaction amount
- `merchant_name` - Merchant name
- `category_primary` - Plaid primary category
- `pending` - Pending status

---

## FAQ

**Q: Will recipes slow down my spreadsheet?**
A: Recipes only run when you execute them. They don't run automatically on every change.

**Q: Can I modify the output tabs?**
A: Yes! Output tabs are yours to customize. Re-running a recipe will update the data but preserve your formatting.

**Q: What if I don't have much transaction data?**
A: Some recipes (like recurring charges) need at least a few months of data to be effective.

**Q: Are recipes safe?**
A: Yes. Recipes are read-only on your transaction data and only write to separate tabs.

**Q: Can I share recipes?**
A: Recipes are contained in your Google Sheet's Apps Script project. You can copy the code to share with others.

**Q: Do recipes work offline?**
A: No. Apps Script requires an internet connection to execute.

---

## Roadmap

**Phase 3.23.0 (Current):**
- ✅ Recipe framework
- ✅ Budget recipe
- ✅ Cash flow recipe
- ✅ Recurring charges recipe
- ✅ Ledger recipe

**Future Phases:**
- Category override rules
- Email/notification alerts
- Pro-only advanced recipes
- Recipe marketplace
- Auto-run scheduling

---

## Support

Questions about recipes?
- **Documentation**: [SheetLink Docs](https://sheetlink.app/docs)
- **Email**: support@sheetlink.app
- **GitHub**: [sheetlink/sheetlink-client](https://github.com/sheetlink/sheetlink-client)

---

**Last Updated:** 2026-01-10
**Version:** 1.0.0
**Phase:** 3.23.0

Copyright (c) 2026 Rudy Martin Del Campo / SheetLink
