# Privacy Policy

**Plaid → Google Sheets Chrome Extension**

*Last Updated: February 2026*

## Overview

This Privacy Policy describes how the Plaid → Google Sheets Chrome Extension ("Extension", "we", "our") collects, uses, and protects your information when you use our service.

**TL;DR:**
- ✅ Your bank data goes directly from Plaid → Your Google Sheet (you control it)
- ✅ Rules/categorization runs client-side (in your browser, never sent anywhere)
- ✅ We only store encrypted Plaid tokens on our backend (for sync purposes)
- ✅ We never see, store, or access your Google Sheets
- ✅ Only anonymous aggregate analytics (recipe install counts), no user tracking, no selling of data

---

## Google API OAuth Compliance Summary

In compliance with the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy) and [Google APIs Terms of Service](https://developers.google.com/terms), this section summarizes how SheetLink accesses, uses, stores, and protects Google user data:

### 1. Data Accessed
SheetLink requests the following Google API scopes:
- **`https://www.googleapis.com/auth/spreadsheets`** - Access to read and write data in your Google Sheets
- **`https://www.googleapis.com/auth/script.projects`** - Access to create and manage Apps Script projects for recipe installation

We access:
- Google Sheets API: To write banking transaction data to spreadsheets you explicitly select
- Apps Script API: To programmatically install analysis recipes (pre-built code) into container-bound Apps Script projects
- Google OAuth user info: Your email and user ID for authentication and account management

### 2. Data Usage
- **Spreadsheets scope**: Used exclusively to write banking transaction data and account balances to your Google Sheets. All data processing happens client-side in the extension.
- **Apps Script scope**: Used exclusively to create container-bound script projects, deploy recipe code, and manage custom menu functions. We only access the specific script project we create for your spreadsheet.
- **User info**: Used for authentication, subscription tier management, and associating encrypted Plaid tokens with your account.

### 3. Data Sharing
We **DO NOT** share Google user data with any third parties. Specifically:
- ❌ No selling of data
- ❌ No sharing with advertisers or data brokers
- ❌ No external analytics services receive Google user data
- ❌ No access to your Google Sheets content (data stays in your Sheet under your control)

We may only disclose data if required by law (court order, subpoena). See [Data Sharing & Disclosure](#data-sharing--disclosure) for details.

### 4. Data Storage & Protection
- **Google Sheets data**: NOT stored on our servers. Written directly to your Google Sheet and remains under your control.
- **Apps Script projects**: Container-bound to your spreadsheet. We do not access or store your script project content.
- **OAuth tokens**: Managed by Chrome extension storage (encrypted by Chrome). Google access tokens are stored locally and never transmitted to our backend.
- **User info**: Google user ID and email stored in our backend database (PostgreSQL) for authentication purposes only.

Security measures:
- 🔒 HTTPS/TLS for all API communication
- 🔒 Minimal permissions (scoped OAuth requests)
- 🔒 Client-side data processing (no server-side access to sheet contents)
- 🔒 Container-bound Apps Script projects only (no access to your other projects)

See [Security Measures](#security-measures) for complete details.

### 5. Data Retention & Deletion
- **Google Sheets data**: Retained indefinitely in your Google Sheet (you control retention and deletion)
- **Apps Script projects**: Retained as container-bound projects attached to your spreadsheet until you uninstall recipes
- **User authentication data**: Retained until you revoke access or delete your account

**How to delete your data:**
- Revoke Google OAuth access: Visit [Google Account Permissions](https://myaccount.google.com/permissions) and remove SheetLink
- Delete Google Sheets: Delete tabs or entire spreadsheet from Google Sheets
- Uninstall extension: Remove extension from Chrome to clear all local storage

See [Data Retention](#data-retention) and [Your Privacy Rights](#your-privacy-rights) for complete details.

---

## Google API OAuth Compliance Summary

In compliance with the [Google API Services User Data Policy](https://developers.google.com/terms/api-services-user-data-policy) and [Google APIs Terms of Service](https://developers.google.com/terms), this section summarizes how SheetLink accesses, uses, stores, and protects Google user data:

### 1. Data Accessed
SheetLink requests the following Google API scopes:
- **`https://www.googleapis.com/auth/spreadsheets`** - Access to read and write data in your Google Sheets
- **`https://www.googleapis.com/auth/script.projects`** - Access to create and manage Apps Script projects for recipe installation

We access:
- Google Sheets API: To write banking transaction data to spreadsheets you explicitly select
- Apps Script API: To programmatically install analysis recipes (pre-built code) into container-bound Apps Script projects
- Google OAuth user info: Your email and user ID for authentication and account management

### 2. Data Usage
- **Spreadsheets scope**: Used exclusively to write banking transaction data and account balances to your Google Sheets. All data processing happens client-side in the extension.
- **Apps Script scope**: Used exclusively to create container-bound script projects, deploy recipe code, and manage custom menu functions. We only access the specific script project we create for your spreadsheet.
- **User info**: Used for authentication, subscription tier management, and associating encrypted Plaid tokens with your account.

### 3. Data Sharing
We **DO NOT** share Google user data with any third parties. Specifically:
- ❌ No selling of data
- ❌ No sharing with advertisers or data brokers
- ❌ No external analytics services receive Google user data
- ❌ No access to your Google Sheets content (data stays in your Sheet under your control)

We may only disclose data if required by law (court order, subpoena). See [Data Sharing & Disclosure](#data-sharing--disclosure) for details.

### 4. Data Storage & Protection
- **Google Sheets data**: NOT stored on our servers. Written directly to your Google Sheet and remains under your control.
- **Apps Script projects**: Container-bound to your spreadsheet. We do not access or store your script project content.
- **OAuth tokens**: Managed by Chrome extension storage (encrypted by Chrome). Google access tokens are stored locally and never transmitted to our backend.
- **User info**: Google user ID and email stored in our backend database (PostgreSQL) for authentication purposes only.

Security measures:
- 🔒 HTTPS/TLS for all API communication
- 🔒 Minimal permissions (scoped OAuth requests)
- 🔒 Client-side data processing (no server-side access to sheet contents)
- 🔒 Container-bound Apps Script projects only (no access to your other projects)

See [Security Measures](#security-measures) for complete details.

### 5. Data Retention & Deletion
- **Google Sheets data**: Retained indefinitely in your Google Sheet (you control retention and deletion)
- **Apps Script projects**: Retained as container-bound projects attached to your spreadsheet until you uninstall recipes
- **User authentication data**: Retained until you revoke access or delete your account

**How to delete your data:**
- Revoke Google OAuth access: Visit [Google Account Permissions](https://myaccount.google.com/permissions) and remove SheetLink
- Delete Google Sheets: Delete tabs or entire spreadsheet from Google Sheets
- Uninstall extension: Remove extension from Chrome to clear all local storage

See [Data Retention](#data-retention) and [Your Privacy Rights](#your-privacy-rights) for complete details.

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
- Your Google OAuth token (managed by Chrome and stored locally in extension)

### 3. Google User Identity

**What we store:**
- Your Google user ID (an opaque identifier like `112233445566778899`)
- Your Google email address (e.g., `user@gmail.com`)
- Used to associate bank connections with your Google account

**Why we store it:**
- **User ID**: Prevent abuse by enforcing tier limits and enabling cross-device sync
- **Email**: User identification, subscription management, and support
- **Both**: Required for JWT authentication to enable tier-based features

**Where it's stored:**
- Backend database (PostgreSQL) in the `users` table
- Associated with your Plaid Items and subscription tier
- Email and user ID stored together for authentication

**Privacy guarantees:**
- Google user ID obtained via Google OAuth ID token
- Email obtained from Google OAuth during authentication
- Cannot be used to access your Google account or data beyond what you authorized
- Used ONLY for authentication, tier enforcement, and account management

### 4. Google OAuth Flow & JWT Authentication

**How authentication works:**
- Extension opens OAuth flow in a popup window
- You authorize Google Sheets access via Google's secure OAuth page
- Google redirects to `https://sheetlink.app/oauth/callback` with **two tokens**:
  - **Access token**: Used for Google Sheets API access (never sent to backend)
  - **ID token**: Sent to backend to verify your Google identity
- Callback page immediately sends both tokens to extension via `chrome.runtime.sendMessage`
- Extension caches access token locally and exchanges ID token for JWT

**JWT Authentication Flow:**
1. Extension receives ID token from OAuth callback
2. Extension sends ID token to backend `/auth/login` endpoint
3. Backend verifies ID token with Google, extracts email and user ID
4. Backend creates/updates user record and issues JWT token (60-minute expiry)
5. Extension stores JWT token locally in `chrome.storage.sync`
6. JWT token included in all subsequent API requests (`Authorization: Bearer <token>`)

**What the OAuth callback page does:**
- Extracts access token and ID token from URL
- Communicates tokens to extension (local Chrome messaging only)
- Displays success message, then window can be closed
- **Does NOT** store, log, or transmit tokens to any server

**Privacy guarantees:**
- OAuth access token never leaves your browser
- ID token sent ONLY to backend for one-time verification (not stored)
- JWT token stored locally in extension storage (synced across Chrome instances)
- Callback page runs entirely client-side (no server processing)
- No analytics or tracking on callback page

### 5. Google Sheets Access

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

### 6. Extension Storage

**What's stored locally:**
- Sheet ID and URL (for the selected Google Sheet)
- Last sync timestamp
- User preferences (Rules enabled, tab names, etc.)
- Session ID for Plaid connection
- **JWT token** (60-minute expiry, for authenticated API requests)
- **User info** (user ID, email, subscription tier)

**Where it's stored:**
- `chrome.storage.sync` (synced across Chrome instances)
- Cleared when you click "Disconnect" or uninstall extension

**What we DON'T store:**
- Transaction data
- Account balances
- Bank credentials
- Google OAuth access tokens (managed by Chrome Identity API)
- Google OAuth ID tokens (sent to backend once, then discarded)

### 7. Anonymous System Analytics

**What we collect:**
- Aggregate recipe installation counts (total installs per recipe across all users)
- No personally identifiable information
- No user-specific behavior tracking
- No linkage to Google accounts, spreadsheets, or user identities

**How we collect it:**
- Anonymous POST request when a recipe is installed (no authentication required)
- Only the recipe ID is sent (e.g., "financial-statements")
- No user ID, email, spreadsheet ID, or timestamps stored

**Where it's stored:**
- Backend database with only: `recipe_id` + `install_count`
- No user data whatsoever

**Why we collect it:**
- Product improvement and maintenance
- Understanding which recipes are most valuable to users
- Prioritizing recipe updates and new recipe development

**What we DON'T collect:**
- Which users installed which recipes
- Installation timestamps or patterns
- Any linkage to Google accounts or spreadsheets
- Individual user behavior or analytics

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
- ❌ Use your data for advertising
- ❌ Track individual user behavior or usage patterns
- ❌ Send data to external analytics services (we run our own anonymous aggregate analytics)
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

See [SECURITY.md](../SECURITY.md) for detailed security documentation.

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
- Backend: US-based service
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

- GitHub Issues: [https://github.com/sheetlink/sheetlink-client/issues](https://github.com/sheetlink/sheetlink-client/issues)
- Email: [Create issue on GitHub]

**Data deletion requests:**
- Click "Disconnect" in extension (immediate deletion)
- Or contact us via GitHub issue

**Security issues:**
- See [SECURITY.md](../SECURITY.md) for responsible disclosure process

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
| Google access token | ✅ Yes | Chrome storage | ✅ Yes (Chrome) | ❌ No | ✅ Yes (revoke) |
| Google ID token | ✅ Yes (1× use) | Not stored | N/A | ❌ No | N/A (ephemeral) |
| JWT token | ✅ Yes | Extension storage | ✅ Yes (Chrome) | ❌ No | ✅ Yes (uninstall) |
| Email & User ID | ✅ Yes | Backend DB | ❌ No | ❌ No | ✅ Yes ("Disconnect") |
| Sheet ID | ✅ Yes | Extension storage | ❌ No | ❌ No | ✅ Yes (uninstall) |
| Rules | ✅ Yes | Your Google Sheet | ❌ No* | ❌ No | ✅ Yes (delete tab) |
| Recipe installs | ✅ Yes (aggregate only) | Backend DB | ❌ No | ❌ No | N/A (anonymous) |
| Usage analytics | ❌ No | N/A | N/A | N/A | N/A |

*Google Sheets are encrypted by Google at rest and in transit.
