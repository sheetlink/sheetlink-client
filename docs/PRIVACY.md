# Privacy Policy

**Plaid → Google Sheets Chrome Extension**

*Last Updated: January 2025*

## Overview

This Privacy Policy describes how the Plaid → Google Sheets Chrome Extension ("Extension", "we", "our") collects, uses, and protects your information when you use our service.

**TL;DR:**
- ✅ Your bank data goes directly from Plaid → Your Google Sheet (you control it)
- ✅ Rules/categorization runs client-side (in your browser, never sent anywhere)
- ✅ We only store encrypted Plaid tokens on our backend (for sync purposes)
- ✅ We never see, store, or access your Google Sheets
- ✅ No analytics, no tracking, no selling of data

---

## Information We Collect

### 1. Bank Account Information (via Plaid)

**What we collect:**
- Account balances (current and available)
- Account details (name, mask, type, subtype, institution)
- Transaction history (dates, amounts, descriptions, merchants, categories)

**How we collect it:**
- Through Plaid's secure OAuth connection when you link your bank account
- Retrieved only when you click "Sync Now" in the extension

**Where it goes:**
- Directly from Plaid → Extension → Your Google Sheet
- Never stored on our servers
- Never logged or persisted by the backend

**Third-party access:**
- **Plaid**: Has access to your bank credentials and data (standard OAuth flow)
- **Your bank**: May see that you've authorized Plaid
- **Us**: Never see raw transactions or balances (only encrypted sync metadata)

### 2. Encrypted Tokens

**What we store:**
- Plaid access token (encrypted with Fernet AES-256)
- Plaid item ID (identifier for your bank connection)
- Transaction sync cursor (for delta sync)
- Institution ID and name

**Why we store it:**
- To fetch updated transactions when you click "Sync Now"
- To enable delta sync (only new transactions, no duplicates)
- To track which institution you connected

**Where it's stored:**
- Backend database (local SQLite or PostgreSQL)
- Encrypted at rest using Fernet encryption
- Decrypted only during sync operations

**What we DON'T store:**
- Your bank login credentials (handled entirely by Plaid)
- Transaction details (written directly to your Sheet)
- Your Google OAuth token (managed by Chrome)

### 3. Google Sheets Access

**What we can access:**
- Only the specific Google Sheet(s) you explicitly select
- Write access to create tabs and write data
- Read access to check for Rules tab (if categorization enabled)

**What we CANNOT access:**
- Your other Google Sheets or Drive files
- Personal Google account information beyond basic profile (email for display)
- Any Google services beyond Sheets API

**Where processing happens:**
- Entirely in the Chrome extension (client-side)
- Backend never touches Google Sheets API
- Rules categorization runs in your browser

### 4. Extension Storage

**What's stored locally:**
- Sheet ID and URL (for the selected Google Sheet)
- Last sync timestamp
- User preferences (Rules enabled, tab names, etc.)
- Session ID for Plaid connection

**Where it's stored:**
- `chrome.storage.sync` (synced across Chrome instances)
- Cleared when you click "Disconnect" or uninstall extension

**What we DON'T store:**
- Transaction data
- Account balances
- Bank credentials
- Google OAuth tokens (managed by Chrome Identity API)

---

## How We Use Your Information

### Bank Data (Plaid)
- **Purpose**: Sync transactions and balances to your Google Sheet
- **Processing**: Fetched on-demand when you click "Sync Now"
- **Storage**: Not stored; written directly to your Sheet and discarded
- **Sharing**: Never shared with third parties

### Encrypted Tokens
- **Purpose**: Enable automatic delta sync without re-authentication
- **Processing**: Decrypted only during sync operations on backend
- **Storage**: Encrypted in backend database
- **Sharing**: Never shared; deleted when you disconnect

### Google Sheets
- **Purpose**: Write account and transaction data to tabs you control
- **Processing**: Client-side in extension (backend never accesses Sheets)
- **Storage**: Data remains in your Google Sheet (you control access)
- **Sharing**: Only you control who can access your Google Sheet

### Rules & Categorization
- **Purpose**: Auto-categorize transactions based on your rules
- **Processing**: Runs entirely in the extension (client-side)
- **Storage**: Rules stored in your Google Sheet, never on our servers
- **Sharing**: Never sent to backend or third parties

---

## Third-Party Services

### Plaid
**What they collect:**
- Bank login credentials (OAuth)
- Account and transaction data
- Device and connection information

**Their privacy policy**: [https://plaid.com/legal/#privacy-policy](https://plaid.com/legal/#privacy-policy)

**Why we use them:**
- Industry-standard bank connection provider
- Used by Venmo, Robinhood, Acorns, etc.
- SOC 2 Type II certified, bank-level encryption

**Your rights:**
- Revoke access anytime at [my.plaid.com](https://my.plaid.com/)
- Delete connection in extension (also revokes Plaid access)

### Google (Sheets API)
**What they collect:**
- OAuth consent (scoped to Sheets API only)
- API usage metadata (standard for Google APIs)

**Their privacy policy**: [https://policies.google.com/privacy](https://policies.google.com/privacy)

**Why we use them:**
- You control data storage and access
- Familiar spreadsheet interface
- Free for personal use

**Your rights:**
- Revoke extension access at [Google Account Security](https://myaccount.google.com/permissions)
- Delete your Google Sheet anytime

---

## Data Sharing & Disclosure

### We DO NOT:
- ❌ Sell your data to third parties
- ❌ Share transaction details with anyone
- ❌ Use your data for advertising or analytics
- ❌ Track your usage or behavior
- ❌ Send data to external analytics services
- ❌ Log personally identifiable information (PII)

### We MAY share data if:
- ✅ Required by law (court order, subpoena, regulatory request)
- ✅ To protect our rights or safety
- ✅ In case of merger/acquisition (you'll be notified)

In these cases, we can only share encrypted tokens and metadata, never raw transaction data (we don't have it).

---

## Data Retention

### Bank Data
- **Retention**: Not stored on our servers
- **Location**: Your Google Sheet (you control retention)
- **Deletion**: Delete rows/sheets in your Google Sheet

### Encrypted Tokens
- **Retention**: Until you click "Disconnect" or delete item
- **Deletion**: Immediate upon disconnect (removed from database)

### Extension Storage
- **Retention**: Until you uninstall or clear data
- **Deletion**: Chrome extension settings → Remove extension

### Google Sheets
- **Retention**: Indefinite (under your Google account)
- **Deletion**: Delete the Google Sheet or specific tabs

---

## Your Privacy Rights

### Right to Access
- View all data we store: See backend database (encrypted tokens only)
- Export your data: Download your Google Sheet as CSV/Excel

### Right to Deletion
- **Delete tokens**: Click "Disconnect" in extension → Backend tokens deleted immediately
- **Delete Google data**: Delete tabs or entire Google Sheet
- **Delete extension data**: Uninstall extension → All `chrome.storage` cleared

### Right to Revoke Access
- **Plaid**: Visit [my.plaid.com](https://my.plaid.com/) → Disconnect banks
- **Google**: Visit [Account Permissions](https://myaccount.google.com/permissions) → Remove extension
- **Backend**: Click "Disconnect" → Tokens wiped

### Right to Data Portability
- Your data lives in your Google Sheet (Google Sheets supports export to CSV, Excel, PDF)
- No lock-in; extension just writes data, doesn't control it

---

## Security Measures

See [SECURITY.md](SECURITY.md) for detailed security documentation.

**Key Protections:**
- 🔒 **Encryption at rest**: Plaid tokens encrypted with Fernet (AES-256)
- 🔒 **HTTPS only**: All API communication over TLS
- 🔒 **Minimal permissions**: Extension scoped to Sheets API only
- 🔒 **No PII logging**: Sensitive data redacted in all logs
- 🔒 **CORS restrictions**: Backend locked to extension origin
- 🔒 **Client-side processing**: Rules run in browser, not on servers

---

## Permissions Explained

### Chrome Extension Permissions

**storage**
- **Why**: Store Sheet ID, sync timestamp, user preferences
- **Scope**: Only this extension's data
- **Access**: No other extensions can read this data

**identity**
- **Why**: Manage Google OAuth for Sheets API
- **Scope**: Only Google Sheets API (`https://www.googleapis.com/auth/spreadsheets`)
- **Access**: Chrome manages tokens; extension never sees refresh token

**scripting** (if applicable)
- **Why**: Content scripts for Plaid Link integration
- **Scope**: Only on Plaid Link page
- **Access**: No access to other tabs/pages

### Google API Scopes

**`https://www.googleapis.com/auth/spreadsheets`**
- **Permissions**: Read and write access to Google Sheets
- **Limited to**: Only sheets you explicitly select
- **Cannot access**: Other Drive files, Gmail, Calendar, etc.

### Backend API Access

**Plaid API**
- **Permissions**: Read-only access to accounts and transactions
- **Granted by**: You, via Plaid Link OAuth
- **Revoke**: [my.plaid.com](https://my.plaid.com/) or "Disconnect" button

---

## Children's Privacy

This Extension is not intended for users under 18 years old. We do not knowingly collect information from children. If you believe a child has provided us with data, please contact us to delete it.

---

## International Users

**Data Location:**
- Backend: Hosted in your region (self-hosted or cloud provider of choice)
- Plaid: US-based service (data processed in US)
- Google Sheets: Stored in Google Cloud (location depends on your Google account settings)

**GDPR Compliance (EU users):**
- Right to access: Request backend database dump (encrypted tokens only)
- Right to deletion: Click "Disconnect" (immediate deletion)
- Right to portability: Export Google Sheet as CSV
- Data processor: Plaid (see their GDPR policy)

**CCPA Compliance (California users):**
- We do not sell personal information
- Right to deletion: Available via "Disconnect" button
- Right to know: See backend database or Google Sheet

---

## Changes to This Policy

We may update this Privacy Policy from time to time. Changes will be posted with a new "Last Updated" date at the top.

**Notification of changes:**
- Major changes: Extension update with changelog
- Minor changes: Updated on GitHub repository

**Your continued use** of the Extension after changes constitutes acceptance of the updated policy.

---

## Contact Us

**Questions or concerns about privacy?**

- GitHub Issues: [https://github.com/rudymdc/plaid-sheets-extension/issues](https://github.com/rudymdc/plaid-sheets-extension/issues)
- Email: [Create issue on GitHub]

**Data deletion requests:**
- Click "Disconnect" in extension (immediate deletion)
- Or contact us via GitHub issue

**Security issues:**
- See [SECURITY.md](SECURITY.md) for responsible disclosure process

---

## Transparency Commitments

✅ **Open Source**: Code available on GitHub for audit
✅ **No Hidden Tracking**: No analytics, cookies, or trackers
✅ **Minimal Data**: Only store what's necessary for sync
✅ **User Control**: You can delete all data anytime
✅ **Clear Permissions**: Explicit about what we access and why

---

## Summary Table

| Data Type | Collected? | Stored Where? | Encrypted? | Shared? | Deletable? |
|-----------|-----------|---------------|------------|---------|-----------|
| Bank credentials | ❌ No (Plaid handles) | Plaid servers | ✅ Yes | ❌ No | N/A |
| Transactions | ✅ Yes (transit only) | Your Google Sheet | ❌ No* | ❌ No | ✅ Yes (delete Sheet) |
| Plaid tokens | ✅ Yes | Backend DB | ✅ Yes (Fernet) | ❌ No | ✅ Yes ("Disconnect") |
| Google token | ✅ Yes | Chrome storage | ✅ Yes (Chrome) | ❌ No | ✅ Yes (revoke) |
| Sheet ID | ✅ Yes | Extension storage | ❌ No | ❌ No | ✅ Yes (uninstall) |
| Rules | ✅ Yes | Your Google Sheet | ❌ No* | ❌ No | ✅ Yes (delete tab) |
| Usage analytics | ❌ No | N/A | N/A | N/A | N/A |

*Google Sheets are encrypted by Google at rest and in transit.

---

*This Privacy Policy applies to the open-source version of the extension. If you're using a hosted/modified version, please check with the operator for their privacy policy.*
