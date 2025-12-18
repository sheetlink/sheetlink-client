# Security Policy

## Our Security Commitment

SheetLink is built with security and privacy as core principles. This document outlines our security model, what you can audit, and how to report vulnerabilities.

---

## Security Architecture

### Client-Side Code (Public)

This repository contains **all client-facing code**:
- Chrome extension source code
- Landing site (Next.js)
- Documentation
- Brand assets

All code in this repository is **auditable and open for inspection**.

### Backend API (Private)

The backend is in a **separate private repository** for:
- Intellectual property protection
- Security through obscurity for infrastructure details
- Business logic protection
- Plaid and Chrome Store compliance

**However**, the backend architecture is fully documented in this repository's `/docs` folder and README.

---

## Security Measures

### 1. Data Handling

**What We Store (Encrypted)**:
- Plaid access tokens (Fernet encryption: AES-128-CBC + HMAC)
- Google user identifier (email or stable Google ID)
- Linked sheet metadata (sheet ID, title)
- Plaid metadata (Item IDs, institution IDs, cursors, timestamps)
- Minimal operational logs (non-PII)

**What We DON'T Store**:
- ❌ Transaction line items (amounts, merchants, categories, dates)
- ❌ Account balances or transaction history
- ❌ Bank usernames or passwords (handled exclusively by Plaid)
- ❌ Google OAuth tokens (these remain in your browser)
- ❌ Contents of your Google Sheets

**Pass-Through Architecture**: Transactions flow from Plaid → Backend (in-memory for <1 second) → Browser → Your Sheet. No persistence of transaction data.

### 2. Encryption

- All Plaid tokens encrypted at rest using **Fernet encryption** (AES-128-CBC + HMAC)
- Encryption keys stored in secure environment variables and rotated regularly
- Tokens only decrypted during sync operations
- HTTPS/TLS 1.2+ for all API communication
- No plaintext tokens in logs (privacy middleware suppresses sensitive data)

### 3. Extension Permissions

The Chrome extension requests minimal permissions:
- `storage` - Store user preferences, JWT tokens, and connection status locally
- `alarms` - Schedule JWT token refresh (60-minute expiry)

**We do NOT request**:
- `identity` - Uses manual web-based OAuth instead of chrome.identity API
- `tabs` - Uses basic tab methods that don't require permission
- Browsing history
- Access to all websites
- Clipboard access
- or any unnecessary permissions

### 4. API Security

- CORS restricted to SheetLink domains and extension ID only
- Rate limiting on all endpoints
- Input validation and sanitization
- Privacy middleware (suppresses sensitive data from logs)
- Sheet permission verification (tests write access before connecting)
- Token refresh handling with 5-minute expiry buffer

### 5. Third-Party Services

**Plaid**:
- Handles all bank authentication
- SheetLink never sees your bank credentials
- Plaid is SOC 2 Type II certified
- [Plaid Security](https://plaid.com/security/)

**Google**:
- OAuth 2.0 for authentication
- Sheets API for data writes (not reads)
- [Google Security](https://safety.google/security/)

---

## What You Can Audit

### ✅ Fully Auditable

1. **Extension Code** (`/extension`)
   - All JavaScript source code
   - Manifest permissions
   - OAuth implementation
   - Plaid Link integration

2. **Landing Site** (`/landing`)
   - Next.js application
   - Public pages and forms
   - Analytics implementation

3. **Documentation** (`/docs`)
   - Backend architecture diagrams
   - Data flow documentation
   - Privacy policies
   - Security practices

### ⚠️ Partially Auditable

**Backend API** (private repository):
- Architecture is documented in `/docs/SECURITY.md`
- API endpoints are documented in `/README.md`
- Database schema is documented
- Encryption methods are specified
- Source code is not public

**Self-Hosting Option**: For complete transparency, you can self-host the entire backend using our Docker deployment guide (coming soon).

---

## Reporting a Vulnerability

We take security seriously. If you discover a vulnerability:

### **Please Do:**

1. **Email us privately**: security@sheetlink.app
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Your contact information (optional)
3. **Allow us time**: We'll respond within 48 hours
4. **Coordinate disclosure**: Work with us on responsible disclosure

### **Please Don't:**

- ❌ Publicly disclose the vulnerability before we've patched it
- ❌ Test on production systems without permission
- ❌ Access or modify user data

### **Bug Bounty**

We currently don't have a formal bug bounty program, but we:
- Acknowledge security researchers in our release notes (with permission)
- Provide public thanks and recognition
- May offer rewards for critical vulnerabilities on a case-by-case basis

---

## Security Best Practices for Users

### 1. Extension Installation

**Production (Current):**
- Install only from Chrome Web Store (official source)
- Verify the publisher is "Rudy Martin Del Campo" or "SheetLink"
- Check the extension ID matches our documentation
- Automatic updates via Chrome Web Store

**For Developers:**
- Source code available at: [github.com/sheetlink/sheetlink-client](https://github.com/sheetlink/sheetlink-client)
- Review the source code before use
- Build and load manually in Developer Mode if preferred

### 2. Google Sheets Sharing

- **Keep your Sheets private**: Only share with people you trust
- SheetLink writes data but never reads it
- You control all access permissions

### 3. Disconnect Anytime

- Remove bank connections from the extension's Options page
- This immediately deletes encrypted tokens from our backend
- Revoke Plaid access at [my.plaid.com](https://my.plaid.com/)

### 4. Monitor Activity

- Review your Sheet regularly for unexpected data
- Check sync history in the extension popup
- Report any suspicious activity to security@sheetlink.app

---

## Security Updates

### Current Version: Production Free Tier

Security updates will be communicated via:
- Extension update notifications
- Email (for beta users)
- [GitHub Releases](https://github.com/sheetlink/sheetlink-client/releases)
- Landing page announcements

### Update Policy

- **Critical vulnerabilities**: Patched within 24-48 hours
- **High severity**: Patched within 1 week
- **Medium/Low severity**: Included in next release

---

## Infrastructure Security

### Hosting

- **Backend**: Railway (HTTPS/TLS, SOC 2 Type II)
- **Landing**: Vercel (HTTPS/TLS, DDoS protection)
- **Database**: Railway-managed PostgreSQL, encrypted at rest, automatic backups
- **Item Cleanup**: Automatic orphaned Item detection and removal (30 days inactivity)

### Environment Variables

- Stored securely in hosting platform
- Never committed to git
- Rotated periodically
- Access restricted to maintainers only

---

## Compliance & Certifications

### Current Status (Production Free Tier)

SheetLink is in **Production** with the Free Tier:
- ✅ Real bank connections via Plaid Production
- ✅ 7 days of transaction history per institution
- ✅ Unlimited bank connections
- ✅ Google-authenticated onboarding
- ✅ Sheet permission verification

### Completed Production Requirements

- [x] Plaid Production Access approved
- [x] Chrome Web Store listing ready
- [x] Backend infrastructure security audit (internal)
- [x] Privacy policy updated for production
- [x] Terms of service finalized

---

## Contact

- **Security Issues**: security@sheetlink.app (private, monitored 24/7)
- **General Questions**: rudy@sheetlink.app
- **Public Discussions**: [GitHub Issues](https://github.com/sheetlink/sheetlink-client/issues)

---

## Additional Resources

- [Privacy Policy](./docs/PRIVACY.md)
- [Backend Architecture](./README.md#backend-architecture)
- [Plaid Security](https://plaid.com/security/)
- [Google Security](https://safety.google/security/)

---

**Last Updated**: December 2025
**Version**: Production Free Tier

**Built with security by design. Auditable by choice.**

Copyright (c) 2025 Rudy Martin Del Campo / SheetLink
