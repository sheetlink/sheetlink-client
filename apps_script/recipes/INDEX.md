# SheetLink Recipes - File Index

## 📚 Start Here

**New user?** → [QUICK_START.md](QUICK_START.md)
**Deploying template?** → [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md)
**Want overview?** → [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
**Technical details?** → [README.md](README.md)

---

## 📁 File Organization

### Documentation Files

| File | Purpose | Audience |
|------|---------|----------|
| **README.md** | Full technical documentation | Developers |
| **DEPLOYMENT.md** | Manual deployment guide | Developers |
| **TEMPLATE_GUIDE.md** | Template creation & user guide | You + End Users |
| **QUICK_START.md** | 5-minute quick reference | End Users |
| **DEPLOYMENT_SUMMARY.md** | Executive summary & strategy | You |
| **INDEX.md** | This file - navigation | Everyone |

### Core Framework Files

| File | Purpose | Dependencies |
|------|---------|--------------|
| **utils.gs** | Shared utility functions | None (load first) |
| **registry.gs** | Recipe metadata registry | utils.gs |
| **runner.gs** | Recipe execution engine | utils.gs, registry.gs |
| **menu.gs** | Custom Google Sheets menu | runner.gs |

### Recipe Files

| File | Recipe | Version | Key Features |
|------|--------|---------|-------------|
| **recipe_budget.gs** | Budget Tracker | 2.1.0 | Multi-month, variance analysis |
| **recipe_cashflow.gs** | Cash Flow Forecast | 2.0.0 | 26-week, date-aware balances |
| **recipe_recurring.gs** | Subscription Detector | 1.0.0 | Auto-detect, confidence scoring |
| **recipe_ledger.gs** | General Ledger | 2.0.0 | Debit/credit, transfers |
| **recipe_financials_v2.gs** | Financial Statements | 2.0.0 | Formula-driven, P&L + BS + CF |

### Template Files

| File | Purpose | When to Use |
|------|---------|------------|
| **template_setup.gs** | Automated template creator | Run once to create shareable template |

---

## 🎯 Common Tasks

### I want to...

**Create a template to share with users**
1. Read: [TEMPLATE_GUIDE.md](TEMPLATE_GUIDE.md) - Part 1
2. Deploy all .gs files to Apps Script
3. Run: `setupTemplate` function
4. Share as Viewer with copy enabled

**Use the template as an end user**
1. Read: [QUICK_START.md](QUICK_START.md)
2. Make a copy of the template
3. Replace Transactions sheet with your data
4. Run recipes from menu

**Understand the technical architecture**
1. Read: [README.md](README.md)
2. Review: utils.gs → registry.gs → runner.gs
3. Study: recipe_financials_v2.gs (most complex)

**Deploy manually to my own sheet**
1. Read: [DEPLOYMENT.md](DEPLOYMENT.md)
2. Copy files in order listed
3. Test with your data

**Customize a recipe**
1. Read the recipe file (well-commented)
2. Modify the logic
3. Save and test
4. Update version in registry.gs

**Understand the business model**
1. Read: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)
2. See: Monetization Options section
3. See: Competitive Advantages section

---

## 🔍 Finding Specific Information

### How do I...

**Add a new column to Financial Statements?**
→ recipe_financials_v2.gs:409-552 (P&L section)

**Change category mappings?**
→ recipe_financials_v2.gs:112-173 (setupChartOfAccounts)

**Modify the Welcome sheet?**
→ template_setup.gs:199-260 (createWelcomeSheet)

**Add a new menu item?**
→ menu.gs:15-35 (onOpen function)

**Change date-aware balance logic?**
→ recipe_financials_v2.gs:603-632 (Balance Sheet formulas)

**Adjust subscription detection?**
→ recipe_recurring.gs (full file)

**Understand the Plaid sign convention?**
→ README.md:235-243

**Set up time triggers?**
→ DEPLOYMENT.md:289-293

---

## 📊 Version History

### v2.0.0 (Current) - January 2026
- ✨ Financial Statements v2.0 - Formula-driven architecture
- ✨ Template deployment system
- ✨ Custom menu for one-click execution
- ✅ Dynamic category detection
- ✅ Plaid Category column in P&L
- ✅ Aligned monthly columns across all sections
- ✅ Date-aware balance calculations

### v1.0.0 - January 2026
- ✨ Initial production release
- ✅ 5 complete recipes
- ✅ Full documentation
- ✅ Production-ready error handling

---

## 🎓 Learning Path

### Beginner (End User)
1. QUICK_START.md
2. Make a copy of template
3. Experiment with sample data
4. Replace with own data

### Intermediate (Power User)
1. README.md - Recipe Details section
2. Customize Chart of Accounts
3. Modify configurations
4. Create custom views

### Advanced (Developer)
1. README.md - Full technical details
2. Study recipe source code
3. DEPLOYMENT.md - Manual deployment
4. Create custom recipes

### Expert (Maintainer/Distributor)
1. DEPLOYMENT_SUMMARY.md
2. TEMPLATE_GUIDE.md - Part 1
3. Create and maintain template
4. Build community/support

---

## 🔗 Quick Links

**For End Users:**
- [5-Minute Quick Start](QUICK_START.md)
- [Full User Guide](TEMPLATE_GUIDE.md#part-2-user-walkthrough-for-your-users)

**For You (Template Creator):**
- [Template Deployment](TEMPLATE_GUIDE.md#part-1-creating-the-template-for-you)
- [Distribution Strategy](DEPLOYMENT_SUMMARY.md#phase-3-distribute-ongoing)
- [Support Strategy](DEPLOYMENT_SUMMARY.md#-support-strategy)

**For Developers:**
- [Technical Documentation](README.md)
- [Manual Deployment](DEPLOYMENT.md)
- [Architecture](README.md#-technical-details)

---

## 📦 Complete File Manifest

```
recipes/
├── Documentation
│   ├── README.md                    # Main technical documentation
│   ├── DEPLOYMENT.md                # Manual deployment guide
│   ├── TEMPLATE_GUIDE.md            # Template creation & user walkthrough
│   ├── QUICK_START.md               # 5-minute quick reference
│   ├── DEPLOYMENT_SUMMARY.md        # Strategy & executive summary
│   └── INDEX.md                     # This file
│
├── Core Framework
│   ├── utils.gs                     # Shared utilities (load first)
│   ├── registry.gs                  # Recipe registry
│   ├── runner.gs                    # Execution engine
│   └── menu.gs                      # Custom menu
│
├── Recipes
│   ├── recipe_budget.gs             # Budget Tracker (v2.1.0)
│   ├── recipe_cashflow.gs           # Cash Flow Forecast (v2.0.0)
│   ├── recipe_recurring.gs          # Subscription Detector (v1.0.0)
│   ├── recipe_ledger.gs             # General Ledger (v2.0.0)
│   └── recipe_financials_v2.gs      # Financial Statements (v2.0.0) ⭐
│
├── Template
│   └── template_setup.gs            # Automated template creator
│
└── Configuration
    └── appsscript.json              # Apps Script config
```

---

## 💡 Pro Tips

1. **Start with DEPLOYMENT_SUMMARY.md** for the big picture
2. **Use QUICK_START.md** as a handout for users
3. **Bookmark INDEX.md** for quick navigation
4. **Keep README.md** for technical reference
5. **Update TEMPLATE_GUIDE.md** with learnings from real users

---

## 🆘 Troubleshooting Index

| Issue | Solution Location |
|-------|------------------|
| Template setup fails | TEMPLATE_GUIDE.md - Step 3 |
| Menu doesn't appear | menu.gs + QUICK_START.md |
| Wrong balances | README.md:335-343 |
| No subscriptions detected | README.md:332-335 |
| #VALUE! errors | QUICK_START.md - Troubleshooting |
| Authorization issues | DEPLOYMENT.md:285-290 |

---

**Last Updated:** January 2026
**Maintained by:** SheetLink Team
**Version:** 2.0.0

Need help? Start with the appropriate file above based on your role and goal.
