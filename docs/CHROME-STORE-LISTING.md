# Chrome Web Store Listing - SheetLink v0.4.0

## Store Listing Information

### Extension Name
```
SheetLink — Connect Your Bank to Google Sheets
```

### Short Description (132 characters max)
```
Sync your bank transactions to Google Sheets via Plaid. Privacy-first, secure, and encrypted. Free for 7 days of history.
```

### Detailed Description (16,000 characters max)

```
SheetLink connects your real bank accounts to Google Sheets, giving you complete control over your financial data.

🏦 WHAT IS SHEETLINK?

SheetLink uses Plaid to securely connect to 10,000+ financial institutions and automatically sync your transactions to your own Google Sheets. Perfect for personal finance tracking, budgeting, and financial analysis.

✨ KEY FEATURES

• Real Bank Connections - Connect checking, savings, and credit card accounts
• Automatic Sync - Pull transactions directly into your Google Sheets
• Multi-Institution Support - Connect unlimited banks and credit cards
• Privacy-First Architecture - We never store your transaction data
• Three Subscription Tiers - Choose the plan that fits your needs
• Modern UI - Beautiful wallet-style interface

💎 SUBSCRIPTION TIERS

FREE Tier (Default):
• 7 days of transaction history per institution
• 11 core transaction fields
• Unlimited bank connections
• Manual sync control
• Free forever

BASIC Tier:
• 90 days of transaction history (~3 months)
• 11 core transaction fields
• All FREE features

PRO Tier:
• 730 days of transaction history (2 years!)
• 33 total transaction fields (enhanced data)
• Location data, merchant details, enhanced categories
• All BASIC features

🔐 PRIVACY & SECURITY

SheetLink uses a pass-through architecture - your transaction data flows directly from Plaid to your Google Sheet. We NEVER store your transactions on our servers.

What we DO:
✅ Encrypt Plaid access tokens with Fernet (AES-128-CBC + HMAC)
✅ Use JWT authentication with 60-minute session expiry
✅ Verify your identity via Google OAuth
✅ Keep your data flowing directly to YOUR sheet

What we DON'T:
❌ Never store your transactions on our servers
❌ Never store your banking credentials (handled by Plaid)
❌ Never share or sell your data (ever)
❌ No tracking or analytics on your financial activity

Full Privacy Policy: https://sheetlink.app/privacy
Security Details: https://sheetlink.app/security

🚀 HOW IT WORKS

1. Sign in with Google - Secure authentication with your Google account
2. Connect Your Bank - Use Plaid to connect to your financial institution
3. Link Your Sheet - Paste any Google Sheets URL you own
4. Sync Transactions - Click "Sync Now" to pull your transactions
5. Analyze Your Data - Use Google Sheets to track, budget, and analyze

📊 USE CASES

• Personal Finance Tracking - See all your accounts in one place
• Budget Management - Track spending across categories
• Financial Analysis - Create custom reports and visualizations
• Tax Preparation - Export transaction data for tax time
• Business Expense Tracking - Separate personal and business spending

🏦 BANK SUPPORT

SheetLink uses Plaid to connect to 10,000+ financial institutions including:
• Major banks (Chase, Bank of America, Wells Fargo, etc.)
• Credit unions
• Credit card companies
• Investment accounts
• PayPal and Venmo

🎯 WHAT YOU GET

FREE TIER INCLUDES:
• 7 days of transaction history
• Core transaction fields: date, amount, description, merchant, category, account ID, currency, pending status, payment channel, transaction code
• Unlimited bank connections
• Manual sync control
• Google Sheets integration
• Pass-through security (no data storage)

PRO TIER ADDS:
• 2 years of transaction history (730 days)
• 22 additional fields including:
  - Enhanced dates (authorized date, datetime)
  - Merchant metadata (website, logo URL, entity ID)
  - Location data (address, city, region, postal code, lat/lon)
  - Personal finance categories (detailed)
  - Transaction metadata (check number, pending transaction ID)

⚠️ REQUIREMENTS

• Google account (for authentication and Sheets access)
• Real bank account supported by Plaid
• Google Chrome browser (latest version)
• A Google Sheet for storing your transactions

📞 SUPPORT

Questions or issues?
• Email: support@sheetlink.app
• Documentation: https://sheetlink.app/docs
• User Guide: https://sheetlink.app/user-guide

🔄 UPDATES

v0.4.0 brings production bank connections, Google authentication, three-tier subscriptions, and modern wallet-style UI. See our full changelog on GitHub.

📋 PERMISSIONS

SheetLink requests the following permissions:

• storage - Store your preferences and JWT tokens locally
• identity - Google OAuth authentication
• tabs - Open OAuth and Plaid windows
• alarms - Schedule token refresh (future auto-sync)
• googleapis.com - Access Google Sheets and Drive APIs
• cdn.plaid.com - Load Plaid Link for bank connections
• api.sheetlink.app - Connect to SheetLink backend API

All permissions are used solely for the extension's core functionality. We never access data outside of your connected bank accounts and sheet.

---

Built with ❤️ for personal finance enthusiasts.

Website: https://sheetlink.app
GitHub: https://github.com/sheetlink/sheetlink-client
```

### Category
```
Productivity
```

### Language
```
English (United States)
```

---

## Privacy Information

### Privacy Policy URL (Required)
```
https://sheetlink.app/privacy
```

### Permissions Justification

**storage**
```
Used to store user preferences, JWT authentication tokens, and sync state locally in the browser. No data is transmitted to external servers.
```

**identity**
```
Required for Google OAuth authentication. Used to verify user identity and obtain permission to access Google Sheets.
```

**tabs**
```
Used to open OAuth callback window and Plaid Link window for bank connection. Required for proper authentication flow.
```

**alarms**
```
Used for scheduling JWT token refresh. Will be used for future auto-sync functionality (currently disabled).
```

**Host Permissions - googleapis.com**
```
Required to access Google Sheets API and Google Drive API for reading and writing transaction data to user's sheets.
```

**Host Permissions - cdn.plaid.com**
```
Required to load Plaid Link SDK for secure bank connection. Plaid handles all banking credentials.
```

**Host Permissions - api.sheetlink.app**
```
Required to communicate with SheetLink backend API for JWT authentication, tier management, and encrypted token storage.
```

---

## Data Usage Disclosure

### Data Collection
```
SheetLink collects the following data:

User Authentication:
- Google user ID
- Email address
- JWT authentication tokens (stored locally only)

Financial Connections:
- Encrypted Plaid access tokens (encrypted with Fernet AES-128-CBC)
- Institution names
- Connected sheet URLs and IDs

Sync Metadata:
- Last sync timestamp
- Transaction count
- Sync success/failure status

What we DON'T collect:
- Transaction data (pass-through only)
- Banking credentials (handled by Plaid)
- Account balances
- Personal financial information
```

### Data Usage
```
All collected data is used solely for:
- User authentication and authorization
- Connecting to Plaid and Google Sheets APIs
- Enforcing subscription tier limits
- Providing sync functionality

We NEVER:
- Sell or share your data
- Use data for advertising
- Track your browsing activity
- Store your transaction data
```

### Data Sharing
```
SheetLink shares data with:

1. Plaid (plaid.com) - For secure bank connections
   - Encrypted access tokens only
   - No transaction data stored

2. Google (google.com) - For Sheets access
   - OAuth tokens for API access
   - Transaction data written directly to user's sheet

We do NOT share data with any other third parties.
```

---

## Monetization

### Is this extension free?
```
Freemium with paid features
```

### Monetization Details
```
SheetLink offers three tiers:

FREE Tier: Free forever
- 7 days of transaction history
- 11 core transaction fields

BASIC Tier: Admin-provisioned (pricing TBD)
- 90 days of transaction history
- 11 core transaction fields

PRO Tier: Admin-provisioned (pricing TBD)
- 730 days of transaction history (2 years)
- 33 total transaction fields

Stripe integration for self-service upgrades coming in Phase 4.
```

---

## Single Purpose

### Single Purpose Description
```
SheetLink's sole purpose is to sync bank transaction data from Plaid to Google Sheets, providing users with a privacy-first way to track their personal finances.
```

---

## Testing Instructions for Google Review

### Test Account Credentials
```
For Google review team testing:

1. Test Google Account: (provide a test Google account)
2. Test Bank Account: Use Plaid Sandbox
   - Institution: "First Platypus Bank"
   - Username: user_good
   - Password: pass_good
   - MFA: 1234

3. Test Google Sheet: Create any new Google Sheet

Step-by-step test flow:
1. Install extension
2. Sign in with provided Google test account
3. Connect Plaid Sandbox with credentials above
4. Create a new Google Sheet and paste URL
5. Click "Sync Now" to see test transactions appear

Note: Extension connects to production Plaid environment but can use sandbox credentials for testing.
```

---

## Store Listing Checklist

Before submission, ensure you have:

- [ ] Chrome Web Store Developer account ($5)
- [ ] Extension ZIP file (sheetlink-extension-v0.4.0.zip)
- [ ] Small promo tile image (440x280px)
- [ ] At least 1 screenshot (1280x800px)
- [ ] Privacy policy URL (https://sheetlink.app/privacy)
- [ ] Terms of service (https://sheetlink.app/terms)
- [ ] All permissions justified
- [ ] Single purpose statement
- [ ] Test account for review team

---

## Submission URL

Submit at: https://chrome.google.com/webstore/devconsole

Expected review time: 1-3 business days (sometimes faster)
