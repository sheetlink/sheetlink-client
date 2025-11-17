# SheetLink Client

> **Privacy-first financial data sync for Google Sheets**

SheetLink is a Chrome extension that connects your bank accounts (via Plaid) to Google Sheets, automatically syncing transactions and account balances. This repository contains the **public client-side code** — the browser extension and marketing website.

**🔒 Privacy-First Design**: All client code is open for inspection. The backend is private for business and security reasons, but its minimal architecture is fully documented below.

---

## 📦 What's in This Repo

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

## 🏗️ Architecture Overview

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
4. **User syncs** → Backend fetches transactions from Plaid
5. **Backend writes to Sheet** → Uses Google Sheets API
6. **No data retention** → Transactions never stored, only passed through

---

## 🔐 Privacy & Security

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

## 🚀 Getting Started

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

## 📚 Documentation

- **[Privacy Policy](./docs/PRIVACY.md)** - Full privacy documentation
- **[Security](./SECURITY.md)** - Security architecture and practices
- **Self-Hosting** - Run your own backend (documentation coming soon)
- **Templates** - Pre-built sheet templates (coming soon)

---

## 🏛️ Backend Architecture

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

## 🎨 Brand Assets

All brand assets (logos, icons, color tokens) are in `/brand`. See [brand/README.md](./brand/README.md) for usage guidelines.

---

## 🧪 Sandbox Mode

Currently, SheetLink operates in **Sandbox Mode** using Plaid's test environment. This means:
- ✅ Fully functional demo with sample institutions
- ✅ No real bank connections
- ✅ Safe to explore all features
- ⏳ Production mode coming soon

---

## 🛠️ Tech Stack

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

## 📄 License

This project is licensed under the **Elastic License 2.0**.

**TL;DR**:
- ✅ View, study, and modify the source code
- ✅ Use for personal projects
- ❌ Create competing commercial services
- ❌ Offer as SaaS without permission

See [LICENSE](./LICENSE) for full terms.

---

## 🤝 Contributing

We welcome contributions to the client-side code:
- Bug reports and feature requests: [GitHub Issues](https://github.com/sheetlink/sheetlink-client/issues)
- Documentation improvements
- UI/UX enhancements
- Extension feature additions

**Note**: Backend changes are not accepted as the backend is private.

---

## 📞 Contact

- **Website**: [sheetlink.app](https://sheetlink.app)
- **Email**: rudy@sheetlink.app
- **Support**: Visit [sheetlink.app/docs](https://sheetlink.app/docs)

---

## 🙏 Acknowledgments

- **Plaid** - Bank connectivity infrastructure
- **Google** - Sheets API and OAuth
- **Chrome Extensions** - Platform for privacy-respecting tools

---

**Built with transparency. Secured by design. Powered by open-source principles.**

Copyright (c) 2025 Rudy Martin Del Campo / SheetLink
