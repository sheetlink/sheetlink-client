# Cash Flow Forecast

## What it does

The Cash Flow recipe creates a weekly cash flow forecast that tracks your income, expenses, net flow, and running balance over time. It uses date-aware calculations to show historical balances and forecast future balances based on your transaction patterns.

## What sheets it creates

- **CashFlow Weekly** - A comprehensive cash flow view with:
  - Weekly income breakdown by account and category
  - Weekly expense breakdown by account and category
  - Net cashflow (inflows - outflows)
  - Ending balance projections with date-aware calculations
  - Summary section with totals and key metrics

## Required columns

Your Transactions sheet must have these columns:
- `date` - Transaction date
- `amount` - Transaction amount
- `category_primary` - Category for grouping
- `pending` - Whether pending (excluded)
- `account_name` - Account for tracking sources

## How to use

1. **Configure Starting Point**:
   - Enter your actual **Ending Balance** in the yellow cell
   - Enter the **As of Date** for that balance
   - This anchors all balance calculations

2. **Run the Recipe**: Click "Cash Flow" → "Run Recipe"

3. **Review the Forecast**:
   - See weekly income and expenses broken down by account/category
   - Monitor your projected ending balance for each week
   - Identify weeks with low balances (highlighted in red if < $500)
   - Check the summary section for overall trends

The recipe automatically:
- Calculates income and expenses for each week
- Projects balances forward or backward from your anchor date
- Updates when new transactions sync
- Highlights concerning balance levels

## How to customize

### Adjust Balance Alert Threshold
The sheet highlights balances below $500. To change this:
1. Select the Ending Balance row
2. Go to Format → Conditional formatting
3. Modify the rule to your desired threshold

### Change Time Window
By default, the recipe shows the last 16 weeks. To adjust:
- Edit the `weeksToShow` variable in the code (line 104)
- Or manually hide week columns you don't need

### Modify Category Breakdown Detail
The sheet shows all account/category combinations. To simplify:
- Manually hide rows for minor categories
- Or group transactions into fewer categories before running

### Update Your Balance Anchor
As time passes, update your configuration:
1. Enter your current actual balance in the yellow cell
2. Update the As of Date to today
3. Re-run the recipe to recalculate all projections

## How it works

The date-aware balance calculation:
- Uses your entered balance as an anchor point
- For weeks before the anchor: works backward using transaction history
- For weeks after the anchor: projects forward using transaction data
- For the week containing the anchor: interpolates based on the date

This means you can enter a balance from any date (past, present, or future) and the recipe will correctly calculate balances for all other weeks.

## Tips

- **Keep your anchor date current** - Update it monthly with your actual balance
- **Watch the low balance alerts** - Red highlighting warns of potential cash shortfalls
- **Use the summary section** - Quick view of total inflows, outflows, and balance range
- **Review category breakdowns** - See which categories drive cash flow each week
