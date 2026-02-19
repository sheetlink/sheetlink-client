# Financial Statements

## What it does

The Financial Statements recipe generates a complete suite of accounting reports from your transaction data, including a Chart of Accounts, General Ledger, and consolidated financial statements (Profit & Loss, Balance Sheet, and Cash Flow Statement) with monthly trending.

## What sheets it creates

- **Chart of Accounts** - Maps Plaid categories to accounting categories
  - Auto-detects categories from your transactions
  - Editable mappings (Type, Category, Statement)
  - Categorizes as Revenue, Expense, Asset, Liability, or Transfer

- **General Ledger** - Complete transaction-level detail
  - Account configuration table (starting balances and account types)
  - Full ledger with Date, Vendor, Category, Debit/Credit columns
  - Formula-driven entries that reference Transactions sheet

- **Financial Statements** - Consolidated reporting
  - **Profit & Loss**: Revenue and Expenses with monthly trending
  - **Balance Sheet**: Assets, Liabilities, and Equity with date-aware balances
  - **Cash Flow Statement**: Operating, Investing, and Financing activities

## Required columns

Your Transactions sheet must have these columns:
- `date` - Transaction date
- `amount` - Transaction amount
- `merchant_name` - Merchant/vendor
- `category_primary` - Plaid category
- `account_name` - Account name
- `pending` - Whether pending (excluded)
- `transaction_id` - Unique transaction ID

## How to use

1. **Initial Setup**:
   - Click "Financial Statements" → "Run Recipe"
   - Three sheets will be created/updated

2. **Configure Chart of Accounts**:
   - Review the Chart of Accounts sheet
   - Edit category mappings in the yellow cells if needed
   - Assign each Plaid category to appropriate accounting category

3. **Set Account Starting Balances** (in General Ledger sheet):
   - Find the Account Balance Configuration table
   - Enter starting balances for each account (yellow cells)
   - Set the "As of Date" for those balances
   - Verify account types (Asset vs Liability)

4. **Review Financial Statements**:
   - Navigate to Financial Statements sheet
   - Review Profit & Loss for revenue and expenses
   - Check Balance Sheet for account balances
   - Examine Cash Flow Statement for cash movements

All sections use formulas, so they update automatically when:
- New transactions sync
- You modify Chart of Accounts mappings
- You adjust starting balances

## How to customize

### Modify Account Categorization

In the Chart of Accounts sheet:
- Change "Type" to reclassify transactions (Revenue, Expense, etc.)
- Edit "Category" to consolidate or rename accounts
- Update "Statement" to control where items appear (P&L vs Balance Sheet)

### Adjust Starting Balances

In the General Ledger sheet:
- Update starting balances in the yellow cells
- Change the "As of Date" to match your reference point
- Formulas will recalculate all downstream balances

### Focus on Specific Time Periods

Financial Statements show the last 12 months by default. To adjust:
- Edit the `months` calculation in the code (around line 448)
- Or manually hide columns for months you don't need

### Add Manual Adjustments

For items not in transaction data:
- **Capital Expenditures**: Enter amounts in yellow cells (Cash Flow → Investing Activities)
- **Loan Proceeds/Repayments**: Enter amounts in yellow cells (Cash Flow → Financing Activities)

## Understanding the Balance Sheet

The recipe uses **date-aware balance calculations**:
- Takes your entered starting balance as an anchor point
- Calculates balances for all months using transaction data
- Works backward for historical months
- Projects forward for future months
- Properly handles both Assets and Liabilities with correct accounting logic

## Understanding Cash Flow

The Cash Flow Statement uses the **indirect method**:
1. Starts with Net Income from P&L
2. Adjusts for changes in working capital (liability changes)
3. Includes a plug figure for "Other Working Capital" to reconcile
4. Shows change in cash and reconciles to Balance Sheet

Note: Some manual adjustments may be needed for full accuracy (CapEx, loan activity).

## Tips

- **Run after each sync** - Fresh transactions → updated statements
- **Review reconciliation rows** - Check that Cash Flow matches Balance Sheet changes
- **Use for tax prep** - P&L provides income/expense summary
- **Monitor balance sheet trends** - See how equity grows over time
- **Customize account structure** - Adjust Chart of Accounts to match your needs
- **Export for analysis** - All sheets are formula-driven and export-friendly
