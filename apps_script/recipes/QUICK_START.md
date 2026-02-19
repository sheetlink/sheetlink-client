# SheetLink Recipes - Quick Start Card

## ⚡ 5-Minute Setup

### 1. Make a Copy
**File > Make a copy**

### 2. Replace Transactions
Delete sample data → Paste your Plaid CSV

### 3. Run Recipes
**📊 SheetLink menu > ▶️ Run All Recipes**

### 4. Done!
Explore your financial reports 🎉

---

## 📋 Required Data Columns

```
date, amount, merchant_name, category_primary, account_name, pending
```

---

## 🎯 What You Get

| Recipe | What It Does | Time |
|--------|-------------|------|
| 📊 Financial Statements | P&L + Balance Sheet + Cash Flow | 20s |
| 💰 Budget Tracker | Budget vs Actuals by category | 10s |
| 💵 Cash Flow Forecast | 26-week forecast | 10s |
| 🔄 Recurring Spend | Find all subscriptions | 15s |
| 📖 Ledger View | Traditional accounting ledger | 10s |

---

## 🔧 Key Configurations

**Chart of Accounts** → Customize category mappings
**General_Ledger C2** → Set starting balance
**CashFlow_Weekly E1** → Set starting balance
**Recurring_Config** → Adjust detection sensitivity

---

## 💡 Pro Tips

✅ Yellow/cream cells = editable
✅ Run "Financial Statements" first
✅ Keep 6+ months of transaction history
✅ Re-run recipes after adding new data

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| No menu | Close & reopen spreadsheet |
| #VALUE! errors | Check column names match exactly |
| Wrong balances | Set starting balance & as-of date |
| No subscriptions | Need 3+ months of data |

---

## 📊 Understanding Your Data

**Plaid Sign Convention:**
- Positive numbers = Expenses/Debits
- Negative numbers = Income/Credits

**Editable Cells:**
- Yellow/cream background = safe to edit
- White background = formulas (don't edit)

---

## 🔄 Regular Workflow

**Weekly:**
1. Sync new Plaid transactions
2. Paste into Transactions sheet
3. Run All Recipes
4. Review reports

**Monthly:**
1. Update Chart of Accounts as needed
2. Review Financial Statements
3. Check Budget variance
4. Cancel unnecessary subscriptions

---

## 🎓 Learn More

**In-Sheet Help:**
📊 SheetLink > Help > View Documentation

**Files:**
- TEMPLATE_GUIDE.md (full guide)
- README.md (technical details)
- DEPLOYMENT.md (deployment info)

---

**Questions?** Everything is in the code - Extensions > Apps Script

**Made with ❤️ for small businesses** | Version 2.0.0
