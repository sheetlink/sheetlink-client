# SheetLink Recipes - Template Deployment & User Guide

## Part 1: Creating the Template (For You)

### Step 1: Create New Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com)
2. Click "Blank" to create new spreadsheet
3. Name it "SheetLink Financial Recipes - Template"

### Step 2: Deploy All Recipe Files

1. Click **Extensions > Apps Script**
2. Delete the default `Code.gs` file
3. Add each file in this exact order:

```
1. utils.gs
2. registry.gs
3. runner.gs
4. menu.gs
5. template_setup.gs
6. recipe_budget.gs
7. recipe_cashflow.gs
8. recipe_recurring.gs
9. recipe_ledger.gs
10. recipe_financials_v2.gs
```

**For each file:**
- Click `+ > Script`
- Name it (without .gs extension)
- Copy/paste the entire content
- Click Save

### Step 3: Run Template Setup

1. In Apps Script editor, select `setupTemplate` function from dropdown
2. Click **Run**
3. Authorize the script when prompted:
   - Click "Review Permissions"
   - Select your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
4. Wait 30-60 seconds for setup to complete
5. You'll see a success dialog

This will:
- Create 6 months of realistic sample transaction data
- Create a Welcome sheet with instructions
- Run all recipes to populate demo reports
- Reorder sheets for optimal UX
- Format everything professionally

### Step 4: Review & Polish

1. Close Apps Script editor
2. Return to your spreadsheet
3. Review each sheet:
   - **📖 Welcome** - User instructions (should be first sheet)
   - **Transactions** - Sample data
   - **Financial_Statements** - P&L, Balance Sheet, Cash Flow
   - **Chart_of_Accounts** - Category mappings
   - **General_Ledger** - Full ledger
   - **Budget_Monthly** - Budget tracker
   - **CashFlow_Weekly** - Cash flow forecast
   - **Recurring_Analysis** - Subscription detector
   - **Ledger_View** - Traditional ledger

4. Test the menu: **📊 SheetLink** should appear in menu bar

### Step 5: Share as Template

1. Click **Share** button (top right)
2. Click **Change to anyone with the link**
3. Set permission to **Viewer**
4. ✅ Check "Viewers and commenters can see the option to download, print, and copy"
5. Click **Copy link**
6. Click **Done**

**Your template is ready!** 🎉

Share this link with users. They'll be able to make their own copy.

---

## Part 2: User Walkthrough (For Your Users)

### 📊 SheetLink Financial Recipes - Getting Started

**Welcome!** This template gives you professional-grade financial analysis for your small business, powered by your Plaid transaction data.

### What You'll Get

- 💰 **Budget Tracker** - Track spending vs budget by category
- 💵 **Cash Flow Forecast** - 26-week rolling forecast
- 🔄 **Recurring Spend Detector** - Find all subscriptions automatically
- 📖 **General Ledger** - Complete accounting ledger
- 📊 **Financial Statements** - P&L, Balance Sheet, Cash Flow

### Quick Start (5 minutes)

#### Step 1: Make Your Copy

1. Click **File > Make a copy**
2. Name it something like "My Business Financials"
3. Choose where to save it (your Drive)
4. Click **Make a copy**

Your new spreadsheet will open automatically.

#### Step 2: Prepare Your Transaction Data

You'll need a CSV export from Plaid with these columns:
- `date` - Transaction date
- `amount` - Amount (positive = expense, negative = income)
- `merchant_name` - Merchant/description
- `category_primary` - Plaid category
- `account_name` - Bank account name
- `pending` - TRUE/FALSE

**Don't have Plaid data?** You can export from:
- Mint (export transactions as CSV)
- Your bank (most support CSV export)
- Accounting software (QuickBooks, Xero, etc.)

*Note: You may need to rename columns to match the required names above.*

#### Step 3: Replace Sample Data

1. Go to the **Transactions** sheet
2. Select all sample data (A2 down to the last row)
3. Press Delete
4. Open your CSV file and copy all your transaction data
5. Paste into **Transactions** sheet starting at row 2 (keep headers in row 1)

**Pro Tip:** Make sure dates are formatted as YYYY-MM-DD and amounts are numbers.

#### Step 4: Run Your First Recipe

1. Look for **📊 SheetLink** in the menu bar at top
2. Click **📊 SheetLink > 📊 Financial Statements**
3. Wait 10-30 seconds (you'll see a "Running..." notification)
4. Check the new sheets that appear!

#### Step 5: Customize Your Chart of Accounts

1. Go to **Chart_of_Accounts** sheet
2. Review how Plaid categories map to your business accounts
3. Edit the mappings to match your needs:
   - Column A: Plaid Category (don't change)
   - Column B: Account Type (Revenue, Expense, Asset, Liability)
   - Column C: Account Name (customize this!)
   - Column D: Statement (P&L or Balance Sheet)

#### Step 6: Set Your Starting Balance

For accurate balance calculations:

1. **General Ledger**: Go to cell C2, enter your actual bank balance as of the date in D2
2. **Cash Flow**: Go to sheet CashFlow_Weekly, cell E1, enter same balance

#### Step 7: Run All Recipes

1. Click **📊 SheetLink > ▶️ Run All Recipes**
2. Click **Yes** to confirm
3. Wait 1-2 minutes
4. Explore all your new financial reports!

### Understanding Your Reports

#### Financial Statements
- **P&L Section**: Revenue and expenses with monthly trending
- **Balance Sheet Section**: Assets and liabilities at month-end
- **Cash Flow Section**: Operating, investing, financing activities

**Key Feature:** All sections are formula-driven and reference each other. Change a category mapping and everything updates automatically!

#### Budget Tracker
- Compare actual spending to budget by category
- See variance (positive = under budget, negative = over budget)
- Monthly trending to spot patterns

#### Cash Flow Forecast
- 26-week view of your cash position
- Projects future balance based on historical patterns
- Breaks down by income, expenses, net flow

#### Recurring Spend Detector
- Automatically finds all subscriptions and recurring charges
- Shows monthly cost and annualized total
- Confidence score tells you how regular the charges are
- Great for finding subscriptions you forgot about!

#### General Ledger
- Traditional accounting ledger with debit/credit format
- Running balance calculations
- Transfer detection
- Full audit trail with transaction IDs

### Customization Tips

**Yellow/Cream Cells = Editable**
Any cell with a yellow or cream background is meant to be customized by you.

**Chart of Accounts**
Map Plaid categories to your own account structure. For example:
- "FOOD_AND_DRINK" → "Meals & Entertainment"
- "LOAN_PAYMENTS" → "Debt Service"

**Budget Amounts**
Edit budget amounts directly in the Budget_Monthly sheet.

**Recurring Detection**
Adjust sensitivity in Recurring_Config sheet:
- Lower tolerance = stricter matching
- Higher tolerance = catches more subscriptions

### Refreshing Data

After adding new transactions:

1. Click **📊 SheetLink > ▶️ Run All Recipes**
2. Wait for completion
3. All reports update with new data

**Or** run individual recipes from the menu as needed.

### Pro Tips

1. **Start with Financials** - Run this first to set up Chart of Accounts
2. **Keep History** - Don't delete old sheets, rename them with dates (e.g., "Budget_Monthly_Jan2026")
3. **Regular Updates** - Run recipes weekly or after syncing new transactions
4. **Backup** - Make periodic copies: File > Make a copy
5. **Share Reports** - Individual sheets can be copied to other spreadsheets

### Troubleshooting

**"Transactions sheet not found"**
- Make sure your data sheet is named exactly "Transactions"

**#VALUE! or #REF! errors**
- Check that all required columns exist in Transactions sheet
- Verify data types (dates as dates, numbers as numbers)

**No subscriptions detected**
- Need at least 3-6 months of data
- Lower the threshold in Recurring_Config sheet

**Balances look wrong**
- Verify Plaid sign convention: income=negative, expenses=positive
- Set correct starting balance and "as of" date
- Check for pending transactions

**Menu doesn't appear**
- Close and reopen the spreadsheet
- Check that Apps Script files are properly installed

### Getting Help

1. Click **📊 SheetLink > Help > View Documentation**
2. Check the README.md file
3. Review the DEPLOYMENT.md file
4. Each recipe has detailed comments in the code

### What's Next?

1. **Week 1**: Run recipes daily, get familiar with outputs
2. **Week 2**: Customize Chart of Accounts and categories
3. **Week 3**: Set up proper starting balances
4. **Week 4**: Train team on reading reports
5. **Ongoing**: Regular reviews and optimization

### Privacy & Security

- ✅ No external API calls
- ✅ All code runs in your Google Apps Script environment
- ✅ No data leaves Google's infrastructure
- ✅ You control all data and permissions
- ✅ Open source - review all code

### Support

For issues or questions:
1. Check this guide
2. Review the recipe code (Extensions > Apps Script)
3. Check Google Apps Script execution logs (View > Logs)

---

## Part 3: Distribution Checklist

Before sharing your template:

- [ ] All recipe files deployed to Apps Script
- [ ] Template setup script run successfully
- [ ] Sample data looks realistic
- [ ] All recipes run without errors
- [ ] Welcome sheet has clear instructions
- [ ] Sheets are in logical order
- [ ] Menu appears and works
- [ ] Sheet is shared as "View only"
- [ ] Copy option is enabled
- [ ] Link is tested (open in incognito to verify)

### Recommended Sharing Methods

**Direct Link**
```
Share this link directly:
https://docs.google.com/spreadsheets/d/[YOUR_SHEET_ID]/edit?usp=sharing

Users click "File > Make a copy"
```

**Landing Page**
Create a simple webpage:
```html
<a href="YOUR_SHEET_LINK">
  Get SheetLink Financial Recipes Template
</a>
```

**Social Media**
```
🎉 New: SheetLink Financial Recipes Template

Turn your Plaid transactions into professional financial reports:
✅ P&L, Balance Sheet, Cash Flow
✅ Budget Tracker
✅ Subscription Detector
✅ 100% Free, Google Sheets

[Link to template]
```

**Email**
```
Subject: Your SheetLink Financial Recipes Template

Hi [Name],

I've set up a Google Sheets template that will automatically
analyze your Plaid transaction data and create:

- Professional financial statements
- Budget tracking
- Cash flow forecasts
- Subscription detection
- Full accounting ledger

Get started: [Link to template]

Instructions are in the Welcome sheet.

Questions? Just reply to this email.
```

---

## Success Metrics to Track

After users start using the template:

- Number of copies made
- Recipes most commonly used
- Common support questions
- Feature requests
- User testimonials

---

**You're ready to deploy!** 🚀

Users will love how easy it is to get professional financial analysis without expensive software.
