# Budget By Account

## What it does

The Budget By Account recipe creates individual budget tables for each of your financial accounts (checking, credit cards, etc.). This allows you to set account-specific budgets and track spending patterns separately for each account.

## What sheets it creates

- **Budget Monthly (by Account)** - Contains multiple budget tables, one for each account:
  - Each table shows Actuals, Budget, and Variance by category
  - All accounts use the same time period for easy comparison
  - Categories are standardized across all account tables
  - Conditional formatting highlights over/under budget categories

## Required columns

Your Transactions sheet must have these columns:
- `date` - Transaction date
- `amount` - Transaction amount
- `category_primary` - Primary Plaid category
- `pending` - Whether transaction is pending (excluded)
- `account_name` - Account name (used to separate tables)

## How to use

1. **Run the Recipe**: Click "Budget By Account" → "Run Recipe"
2. **Review Account Tables**: Scroll down to see individual tables for each account
3. **Set Budgets**: Enter budget amounts in the yellow cells for each account
4. **Compare Accounts**: See how spending patterns differ across accounts

The recipe automatically:
- Detects all unique account names from your transactions
- Creates a separate budget table for each account
- Maintains consistent categories and time periods across all tables
- Updates calculations when transactions sync

## How to customize

### Focus on Specific Accounts
To hide accounts you don't want to track:
- Manually delete unwanted account tables from the sheet
- Or filter your source transactions before running

### Consolidate Accounts
If you want to combine multiple accounts:
- Edit account names in the Transactions sheet to match
- Re-run the recipe to regenerate tables

### Adjust Category Display
Categories are pulled from all transactions. To show only relevant categories per account:
- Consider creating custom views using pivot tables
- Or manually hide rows for categories with all zeros

### Change Time Window
The recipe shows all months with transaction data. To adjust:
- Hide/delete columns for months outside your target range
- Formulas will continue working for visible months

## Tips

- **Useful for multi-account management** - See which accounts have the highest spending
- **Different budgets per account** - Set tighter budgets for discretionary accounts
- **Account-specific insights** - Identify if certain accounts are used more for specific categories
- **Consistent formatting** - All tables use the same structure for easy comparison
