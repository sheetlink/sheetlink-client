# SheetLink Extension v0.4.0 - Production Release

**Download:** `sheetlink-extension-v0.4.0.zip`

This is a **major production release** representing months of development across 18+ phases. SheetLink now connects to **real bank accounts** via Plaid Production and includes a complete three-tier subscription system, multi-institution support, and modern wallet-style UI.

---

## 🎉 What's New in v0.4.0

### 🏦 **Production Bank Connections**
- ✅ **Connect real bank accounts** via Plaid Production (no more sandbox-only!)
- ✅ **Real transaction data** from your actual financial institutions
- ✅ **Multi-institution support** - connect unlimited banks and credit cards
- ✅ **Production-grade security** with encrypted token storage

### 🔐 **Google Authentication & JWT Security**
- ✅ **Google OAuth sign-in** - secure authentication with your Google account
- ✅ **JWT-based authorization** with 60-minute session expiry
- ✅ **User identity verification** - prevents impersonation and unauthorized access
- ✅ **Automatic re-authentication** when sessions expire

### 💎 **Three-Tier Subscription System**
- ✅ **FREE Tier** (default):
  - 7 days of transaction history per institution
  - 11 core transaction fields
  - Unlimited bank connections
  - Manual sync control

- ✅ **BASIC Tier** (admin-provisioned):
  - 90 days of transaction history (~3 months)
  - 11 core transaction fields
  - All FREE features

- ✅ **PRO Tier** (admin-provisioned):
  - 730 days of transaction history (2 years!)
  - 33 total transaction fields (enhanced data)
  - Location data, merchant details, enhanced categories
  - All BASIC features

### 🎨 **Modern Post-Onboarding UI**
- ✅ **4-tab wallet-style navigation** (Home, Bank, Sheet, Options)
- ✅ **Home page**: Sync controls, connection status, tier info
- ✅ **Bank page**: Manage institutions (update/add/disconnect)
- ✅ **Sheet page**: Sheet info, owner, last write timestamp
- ✅ **Options page**: Settings and advanced configuration
- ✅ **State persistence** - remembers your tab across popup reloads

### 🏗️ **Technical Improvements**
- ✅ **Centralized state management** - consistent data flow
- ✅ **Tier-based feature gating** - automatic enforcement of limits
- ✅ **Session management** - JWT tokens with 60-minute expiry
- ✅ **Tier mismatch detection** - prevents data corruption
- ✅ **Recovery flows** - handles errors gracefully
- ✅ **PostgreSQL backend** - scalable production infrastructure

---

## 🚀 How to Install

### 1. Download & Unzip
Download `sheetlink-extension-v0.4.0.zip` from the Assets section below and unzip it.

### 2. Load Extension in Chrome
1. Open Chrome and go to `chrome://extensions`
2. Enable "Developer mode" (top-right toggle)
3. Click "Load unpacked"
4. Select the unzipped `sheetlink-extension-v0.4.0/` folder

### 3. Complete Onboarding
The extension will guide you through three steps:

**Step 1: Sign in with Google**
- Click "Sign in with Google"
- Authorize SheetLink to access your Google account
- JWT token generated (60-minute validity)

**Step 2: Connect Your Bank**
- Click "Connect Bank Account"
- Search for your financial institution
- Sign in with your real bank credentials
- Grant Plaid access to your account data

**Step 3: Connect Google Sheet**
- Create a new Google Sheet or use an existing one
- Paste the Sheet URL into SheetLink
- Grant Google Sheets/Drive permissions
- Sheet configured automatically

**You're Done!** 🎉
- Modern 4-tab navigation appears
- Home page shows connection status and sync controls
- Click "Sync Now" to pull your real transactions

---

## 📊 Subscription Tiers

### FREE Tier (Default)
**Cost:** Free forever
**History:** 7 days per institution
**Fields:** 11 core fields
**Connections:** Unlimited banks

**Transaction Fields (11):**
- transaction_id, account_id, date
- description_raw, merchant_name, amount
- iso_currency_code, pending
- plaid_category, payment_channel, transaction_code

### BASIC Tier (Admin-Provisioned)
**Cost:** TBD
**History:** 90 days per institution
**Fields:** 11 core fields
**Connections:** Unlimited banks

### PRO Tier (Admin-Provisioned)
**Cost:** TBD
**History:** 730 days per institution (2 years)
**Fields:** 33 total fields
**Connections:** Unlimited banks

**Additional Fields (22 more):**
- authorized_date, datetime, authorized_datetime
- merchant_entity_id, website, logo_url
- Location: address, city, region, postal_code, country, lat, lon
- personal_finance_category (detailed)
- check_number, pending_transaction_id
- transaction_type

---

## 🔐 Privacy & Security

### What We DO:
- ✅ **Encrypt Plaid tokens** with Fernet (AES-128-CBC + HMAC)
- ✅ **Store JWT tokens** in Chrome's secure storage (60-minute expiry)
- ✅ **Verify identity** via Google OAuth
- ✅ **Pass-through architecture** - data flows directly to your sheet

### What We DON'T:
- ❌ **Never store your transactions** on our servers
- ❌ **Never store your banking credentials** (handled by Plaid)
- ❌ **Never share or sell your data** (ever)
- ❌ **No tracking or analytics** on your financial activity

**For full details:** https://sheetlink.app/privacy

---

## 🆕 Upgrading from v0.3.x

If you're coming from the sandbox-only v0.3.x:

1. **Remove old extension** from `chrome://extensions`
2. **Install v0.4.0** using steps above
3. **Complete new onboarding**:
   - Sign in with Google (new!)
   - Connect your REAL bank account (not sandbox!)
   - Reconnect your Google Sheet

**Note:** This is a production release. Your sheet will receive **real transaction data** from your connected banks.

---

## 📱 What You Need

- ✅ A Google account (for authentication and Sheets access)
- ✅ A real bank account supported by Plaid
- ✅ Google Chrome (latest version recommended)
- ✅ A Google Sheet for storing your transactions

---

## 🌐 Production Infrastructure

**Backend API:** https://api.sheetlink.app
**Landing Site:** https://sheetlink.app
**Database:** PostgreSQL on Railway
**Authentication:** Google OAuth + JWT

---

## 📋 Full Changelog (v0.3.1 → v0.4.0)

### Added
- **Production Plaid integration** - real bank connections
- **Google OAuth authentication** - secure identity verification
- **JWT authorization** - 60-minute session tokens
- **Three-tier subscription system** (FREE/BASIC/PRO)
- **Multi-institution support** - unlimited bank connections
- **Post-onboarding 4-tab navigation** (Home/Bank/Sheet/Options)
- **Centralized state management** - reactive UI updates
- **Tier-based feature gating** - automatic limit enforcement
- **Session management** - JWT expiry handling
- **Tier mismatch detection** - prevents data corruption
- **PostgreSQL backend** - production database
- **Admin provisioning tools** - tier management
- **Enhanced transaction fields** - 33 fields for PRO tier
- **Location data** - merchant locations (PRO)
- **Merchant metadata** - websites, logos (PRO)

### Changed
- **Upgraded from sandbox to production** Plaid environment
- **Authentication flow** - now requires Google sign-in
- **API endpoints** - production URL (api.sheetlink.app)
- **Onboarding flow** - 3-step guided process
- **UI/UX** - modern wallet-style navigation
- **Security** - JWT-based authorization added
- **Data retention** - tier-based limits (7/90/730 days)

### Fixed
- **OAuth "bad client id" errors** (v0.3.1 fix maintained)
- **Token expiry handling** - graceful re-authentication
- **Orphaned Plaid items** - proper cleanup on disconnect
- **Data consistency** - tier-based integrity checks
- **Session persistence** - JWT storage and validation

---

## ⚠️ Important Notes

1. **This is a production build** - connects to real financial institutions
2. **Google sign-in required** - new authentication system
3. **Session expiry** - you'll be prompted to re-auth after 60 minutes
4. **Tier limits enforced** - FREE tier gets 7 days of history
5. **Privacy-first** - we never store your transaction data
6. **No auto-sync yet** - manual sync only (click "Sync Now")

---

## 🐛 Known Issues

- **Auto-sync disabled** - coming in future release (Phase 4)
- **Tier upgrades** - currently admin-provisioned only
- **Self-service billing** - Stripe integration planned (Phase 4)

---

## 📞 Support

**Questions or issues?**
- Email: support@sheetlink.app
- GitHub Issues: https://github.com/sheetlink/sheetlink-client/issues
- Documentation: https://sheetlink.app/docs

---

## 🙏 Thank You

This release represents **18+ development phases** and months of work. Thank you to everyone who tested the sandbox builds and provided feedback!

**What's Next?**
- Phase 4: Stripe integration & self-service upgrades
- Auto-sync capabilities
- Mobile app (future)
- Advanced categorization (future)

---

**Release Date:** December 12, 2025
**Version:** 0.4.0
**Build:** Production
**Environment:** Plaid Production
**Backend:** https://api.sheetlink.app
