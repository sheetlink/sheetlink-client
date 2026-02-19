# Budget Tracker

## What it does

The Budget Tracker recipe creates a comprehensive monthly budget view that helps you track your spending against budget targets. It automatically categorizes your transactions by Plaid categories and displays actuals, budgets, and variances side-by-side for easy comparison.

## What sheets it creates

- **Budget Monthly** - A multi-month budget tracker with:
  - Actuals: Your actual spending by category for each month
  - Budget: Editable budget targets (enter in yellow cells)
  - Variance: Automatic calculation of Budget - Actuals
  - Conditional formatting: Green for positive variance, red for negative
  - Total row summarizing all categories

## Required columns

Your Transactions sheet must have these columns:
- `date` - Transaction date
- `amount` - Transaction amount (negative for expenses, positive for income)
- `category_primary` - Primary Plaid category
- `pending` - Whether transaction is pending (excluded from calculations)
- `account_name` - Account name

## How to use

1. **Initial Setup**: Click "Budget Tracker" → "Run Recipe" from the menu
2. **Set Budget Targets**: Enter your monthly budget amounts in the yellow cells under the "BUDGET" section
3. **Review Variance**: Green cells show you're under budget (good!), red cells show you're over budget
4. **Monitor Trends**: The table shows multiple months so you can see spending patterns over time

The recipe will automatically:
- Pull all categories from your transactions
- Calculate actual spending by category and month using formulas
- Update totals when you modify budget amounts
- Apply color-coding to help identify problem areas

## How to customize

### Adjust Time Period
The recipe shows all months present in your transaction data. To focus on specific months, you can hide columns or delete them manually.

### Modify Categories
Categories come directly from your Plaid transaction data. To consolidate or rename categories:
1. Edit the Chart of Accounts sheet if available
2. Or manually adjust category names in the Budget Monthly sheet

### Change Conditional Formatting
To adjust the color thresholds:
1. Select the variance columns
2. Go to Format → Conditional formatting
3. Adjust the rules for positive/negative values

### Add Account Filters
The budget shows all accounts combined. To see budget by individual account, you can:
1. Create pivot tables from the Budget Monthly data
2. Or use the Budget By Account recipe instead

## Tips

- **Yellow cells are editable** - These are your budget input cells
- **Formulas auto-update** - When new transactions sync, actuals recalculate automatically
- **Zero budget = no variance** - If you don't set a budget for a category, variance will equal the negative of actuals
- **Pending excluded** - Pending transactions don't count until they clear
