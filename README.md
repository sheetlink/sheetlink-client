# SheetLink Client

> **Privacy-first financial data sync for Google Sheets**

**[🎯 Available in the Chrome Web Store](https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch)**

SheetLink is a Chrome extension that connects your bank accounts (via Plaid) to Google Sheets, automatically syncing transactions and account balances. This repository contains the **public client-side code** — the browser extension and marketing website.

**🔒 Privacy-First Design**: All client code is open for inspection. The backend is private for business and security reasons, but its minimal architecture is fully documented below.

---

## What's in This Repo

```
sheetlink-client/
├── extension/          # Chrome extension source code
│   ├── src/           # Extension UI and logic
│   ├── manifest.json  # Extension configuration
│   └── assets/        # Icons and branding
├── landing/           # Marketing website (Next.js)
├── docs/              # Public documentation
├── brand/             # Brand assets and design tokens
└── LICENSE            # Elastic License 2.0
```

### What's NOT in This Repo

The backend API is in a separate **private repository** (`sheetlink-api`). See "Backend Architecture" below for full transparency on what the backend does.

---

## Architecture Overview

### How SheetLink Works

```
┌─────────────┐
│   Browser   │
│  Extension  │ ◄─── You're looking at this (public)
└──────┬──────┘
       │
       │ HTTPS
       ▼
┌─────────────┐
│   Backend   │
│  (Private)  │ ◄─── Minimal pass-through service
└──────┬──────┘
       │
       ├─────► Plaid API (bank data)
       └─────► Google Sheets API (write data)
```

### Data Flow

1. **User connects bank** → Extension opens Plaid Link
2. **Plaid returns token** → Extension sends to backend
3. **Backend exchanges token** → Stores encrypted access token
4. **User authorizes Google** → Extension opens OAuth flow, callback page at sheetlink.app/oauth/callback sends token to extension
5. **User syncs** → Backend fetches transactions from Plaid
6. **Backend writes to Sheet** → Uses Google Sheets API
7. **No data retention** → Transactions never stored, only passed through

### OAuth Flow (Beta)

The extension uses a **dynamic OAuth flow** that works with any extension ID:

1. Extension opens Google OAuth in a popup window
2. User authorizes Google Sheets access
3. Google redirects to `https://sheetlink.app/oauth/callback` with access token
4. Callback page sends token back to extension via `chrome.runtime.sendMessage`
5. Extension caches token locally and closes OAuth window

This approach allows beta testers to load the extension manually (which assigns random extension IDs) without requiring OAuth client reconfiguration.

---

## Privacy & Security

### What We Can See
- Encrypted Plaid access tokens (AES-256-GCM)
- Google Sheet IDs you configure
- Sync timestamps and error logs

### What We CANNOT See
- Your bank credentials (handled entirely by Plaid)
- Transaction details (pass-through only, never stored)
- Your Google Sheets data (we only write, never read)

### Why Backend is Private

The backend repository is private for:
1. **Intellectual Property**: Protects business logic and future subscription features
2. **Security**: Prevents exposure of internal security patterns
3. **Plaid Compliance**: Simplifies Plaid production approval process
4. **Chrome Store Review**: Separates reviewer-facing client code from internal services

**Transparency Commitment**: While private, the backend is minimal and fully documented. Architecture diagrams and API documentation are available in `/docs`.

---

## Get Started

SheetLink is **now live** on the Chrome Web Store! Connect your real bank accounts and start syncing transactions to Google Sheets.

### FREE Tier (Available Now)

**[🎯 Add to Chrome](https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch)**

**Free Forever Plan**:
- 🔗 Real bank connections (12,000+ institutions via Plaid)
- 📅 7 days of transaction history per institution
- 🏦 Unlimited bank accounts
- 🔄 Manual sync
- ✅ FREE forever

### PRO Tier (Beta Access)

PRO tier features are available through our beta program:

**PRO Features:**
- 📅 **730 days** (2 years) of transaction history
- ⏰ **Auto-sync** (daily automatic updates)
- 🤖 **AI-powered categorization** (coming soon)
- 📊 **Advanced sheet templates** (coming soon)
- 🎯 **Priority support**

**Join the PRO Beta:**
- 🔗 [sheetlink.app/beta](https://sheetlink.app/beta) - Sign up for beta access
- 💬 [Discord Community](https://discord.gg/eZUBsbAc6G) - Join our beta testers

**Beta Benefits:**
- 🎉 Early access to PRO features
- 💬 Direct line to the development team
- 🚀 Influence product roadmap
- 🎁 Special pricing when PRO launches

### Quick Start

1. **Install Extension** - Click the "Add to Chrome" link above
2. **Sign in with Google** - Authorize Google Sheets access (write-only)
3. **Connect Your Bank** - Select from 12,000+ institutions via Plaid
4. **Link a Google Sheet** - Paste any Google Sheets URL you own
5. **Click "Sync Now"** - Your last 7 days of transactions will appear

**Need help?** Full walkthrough with screenshots: [sheetlink.app/get-started](https://sheetlink.app/get-started)

---

## Current Features (v0.4.5)

### ✅ Available in Production (FREE Tier)

- 🔗 **Real Bank Connections**: Connect any of 12,000+ institutions via Plaid Production
- 🏦 **Multi-Institution Support**: Unlimited bank accounts
- 📅 **7 Days History**: Transaction history per institution (FREE tier)
- 📊 **Google Sheets Integration**: Automatic transaction and account syncing
- 🔄 **Manual Sync**: On-demand sync via extension popup
- 🔐 **Secure OAuth**: Google authentication with JWT tokens
- 📱 **Cross-Device Sync**: Settings synced across Chrome instances
- 🎯 **Smart Features**: Transaction deduplication, delta sync, categorization

### 🚧 Coming Soon (PRO Tier - Beta Available)

- 📅 **730 Days History**: 2 years of transaction data (beta access available)
- ⏰ **Auto-Sync**: Daily automatic updates (beta access available)
- 🤖 **AI Categorization**: Smart transaction categorization (in development)
- 📊 **Advanced Templates**: Pre-built financial tracking sheets (planned)

---

## Roadmap

### ✅ Current Version: v0.4.5 (Production)
- ✅ Plaid Production with real bank connections
- ✅ Google OAuth + JWT authentication
- ✅ Multi-institution support (unlimited banks)
- ✅ FREE tier (7 days history)
- ✅ Manual sync with delta updates
- ✅ Transaction deduplication
- ✅ Plaid AI-enhanced categories (split primary/detailed)
- ✅ Post-onboarding navigation UI
- ✅ Tier upgrade/downgrade handling

### 🚧 In Beta (PRO Tier - Join via sheetlink.app/beta)
- 🔄 PRO tier (730 days history)
- ⏰ Auto-sync infrastructure (UI disabled for FREE)
- 📊 Advanced transaction fields (34 columns vs 13)
- 🎯 Subscription tier management

### 🔮 Planned (v0.5.0+)
- 🤖 AI-powered transaction categorization
- 📊 Pre-built financial templates
- 🌍 Expanded international bank support
- 🔐 Enhanced security features
- 💼 Business/team accounts

---

## For Developers

Want to contribute or run the code locally?

### Extension Development

```bash
cd extension
npm install

# Load unpacked extension in Chrome
# 1. Open chrome://extensions
# 2. Enable "Developer mode"
# 3. Click "Load unpacked"
# 4. Select the /extension directory
```

### Landing Site Development

```bash
cd landing
npm install
npm run dev

# Open http://localhost:3000
```

---

## Documentation

- **[Privacy Policy](./docs/PRIVACY.md)** - Full privacy documentation
- **[Security](./SECURITY.md)** - Security architecture and practices
- **Self-Hosting** - Run your own backend (documentation coming soon)
- **Templates** - Pre-built sheet templates (coming soon)

---

## Backend Architecture

While the backend code is private, here's what it does:

### Backend Components

```
sheetlink-api/
├── /plaid       # Plaid Link token exchange, transaction fetching
├── /google      # Google Sheets API writes
├── /encryption  # AES-256-GCM token encryption
├── /scheduler   # Auto-sync job queue
└── /database    # SQLite (user_id, encrypted tokens, sheet URLs)
```

### Backend Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/plaid/link-token` | POST | Generate Plaid Link token |
| `/plaid/exchange` | POST | Exchange public token for access token |
| `/plaid/accounts` | GET | Fetch account list |
| `/plaid/transactions` | POST | Fetch transactions (pass-through) |
| `/plaid/item/:id` | DELETE | Remove bank connection |
| `/sheets/sync` | POST | Sync transactions to Google Sheet |
| `/scheduler/register` | POST | Register auto-sync schedule |

### Data Storage

The backend stores:
- **User ID** (from Google OAuth)
- **Plaid Item ID** (encrypted with AES-256-GCM)
- **Plaid Access Token** (encrypted with AES-256-GCM)
- **Google Sheet URL** (not encrypted - needed for sync)
- **Last Sync Timestamp**

**Transactions are NEVER stored** — they're fetched from Plaid and immediately written to your Sheet.

---

## Brand Assets

All brand assets (logos, icons, color tokens) are in `/brand`. See [brand/README.md](./brand/README.md) for usage guidelines.

---

## Tech Stack

### Extension
- Vanilla JavaScript (no frameworks)
- Chrome Extension Manifest V3
- Plaid Link SDK
- Google Sheets API
- Google OAuth 2.0

### Landing Site
- Next.js 13
- TypeScript
- Tailwind CSS
- Vercel deployment

---

## License

This project is licensed under the **Elastic License 2.0**.

**TL;DR**:
- ✅ View, study, and modify the source code
- ✅ Use for personal projects
- ❌ Create competing commercial services
- ❌ Offer as SaaS without permission

See [LICENSE](./LICENSE) for full terms.

---

## Contributing

We welcome contributions to the client-side code:
- Bug reports and feature requests: [GitHub Issues](https://github.com/sheetlink/sheetlink-client/issues)
- Documentation improvements
- UI/UX enhancements
- Extension feature additions

**Note**: Backend changes are not accepted as the backend is private.

---

## Support & Contact

### Support Channels

- **Installation Help**: [sheetlink.app/get-started](https://sheetlink.app/get-started)
- **Report Issues**: [GitHub Issues](https://github.com/sheetlink/sheetlink-client/issues)
- **Discord Community**: [https://discord.gg/eZUBsbAc6G](https://discord.gg/eZUBsbAc6G)
- **PRO Beta Access**: [sheetlink.app/beta](https://sheetlink.app/beta)
- **General Questions**: [sheetlink.app/docs](https://sheetlink.app/docs)

### General Contact

- **Website**: [sheetlink.app](https://sheetlink.app)
- **Email**: rudy@sheetlink.app
- **Security**: security@sheetlink.app

---

## Acknowledgments

- **Plaid** - Bank connectivity infrastructure
- **Google** - Sheets API and OAuth
- **Chrome Extensions** - Platform for privacy-respecting tools

---

**Built with transparency. Secured by design. Powered by open-source principles.**

Copyright (c) 2025 Rudy Martin Del Campo / SheetLink
