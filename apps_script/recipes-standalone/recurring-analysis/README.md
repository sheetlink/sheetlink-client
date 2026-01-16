# Recurring Analysis

## What it does

The Recurring Analysis recipe automatically identifies subscriptions and recurring charges in your transaction history by analyzing merchant patterns, amount consistency, and payment frequency. It calculates annualized costs and shows monthly spending trends for each recurring charge.

## What sheets it creates

- **Recurring Analysis** - Contains:
  - Configuration section (editable parameters)
  - Recurring charges table with:
    - Merchant name
    - Account charged
    - Category
    - Annualized spend projection
    - Average amount per charge
    - Frequency (Weekly, Monthly, Quarterly, etc.)
    - Occurrence count
    - Confidence score
    - Monthly breakdown showing actual charges

## Required columns

Your Transactions sheet must have these columns:
- `date` - Transaction date
- `amount` - Transaction amount
- `merchant_name` - Merchant/vendor name (used for pattern matching)
- `pending` - Whether pending (excluded)

## How to use

1. **Initial Run**: Click "Recurring Analysis" → "Run Recipe"

2. **Review Results**:
   - Check the recurring charges identified
   - Review confidence scores (higher = more certain it's recurring)
   - Examine monthly patterns to verify accuracy

3. **Customize Detection** (optional):
   - Edit the yellow configuration cells:
     - **Amount Tolerance**: How much can charges vary (0.05 = 5%)
     - **Minimum Occurrences**: Minimum times charge must appear (default: 3)
     - **Months to Analyze**: How far back to look (default: 12)
     - **Minimum Amount**: Ignore charges below this amount (default: $5)
   - Re-run the recipe to apply new settings

4. **Analyze Spending**:
   - Sort by Annualized Spend to see biggest subscription costs
   - Look for subscriptions you forgot about
   - Use monthly columns to verify regularity

## How to customize

### Adjust Detection Sensitivity

Make detection **more strict** (fewer false positives):
- Increase Minimum Occurrences to 4 or 5
- Decrease Amount Tolerance to 0.02 (2%)
- Increase Minimum Amount to filter small charges

Make detection **more lenient** (catch more subscriptions):
- Decrease Minimum Occurrences to 2
- Increase Amount Tolerance to 0.10 (10%)
- Decrease Minimum Amount to $1

### Filter by Confidence
High confidence (80-100%): Very likely a subscription
Medium confidence (60-79%): Probably recurring
Low confidence (40-59%): Might be recurring, needs review

Sort by confidence to focus on the most certain matches first.

### Export for Analysis
The monthly columns use formulas that reference your Transactions sheet, so they'll update automatically as new charges come through.

## How it works

The recipe uses several detection methods:

1. **Merchant Normalization**: Strips location IDs and variations to group charges from the same merchant
2. **Amount Similarity**: Checks if charges are within tolerance (e.g., $9.99 vs $10.01)
3. **Frequency Analysis**: Calculates average days between charges to identify Weekly, Monthly, etc.
4. **Confidence Scoring**: Combines factors like consistency, frequency regularity, and occurrence count

## Tips

- **Sync more history** - The more months of data, the better the detection
- **Review low-confidence items** - These might be legitimate subscriptions with variable amounts
- **Use annualized spend** - Helps prioritize which subscriptions to review for cancellation
- **Check monthly patterns** - Some "subscriptions" might actually be regular but manual payments
- **Re-run periodically** - As you accumulate more transaction history, detection improves
