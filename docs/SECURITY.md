# SheetLink Security Documentation

Comprehensive security architecture and data protection practices for SheetLink.

## Table of Contents

1. [Overview](#overview)
2. [Encryption & Data Protection](#encryption--data-protection)
3. [Authentication & Authorization](#authentication--authorization)
4. [API Security](#api-security)
5. [Third-Party Integrations](#third-party-integrations)
6. [Data Retention & Privacy](#data-retention--privacy)
7. [Incident Response](#incident-response)
8. [Security Best Practices](#security-best-practices)

---

## Overview

SheetLink is designed with security as a top priority. We handle sensitive financial data and implement industry-standard security practices to protect user information.

### Security Principles

1. **Encryption at Rest** - Sensitive data encrypted in database
2. **Encryption in Transit** - TLS 1.2+ for all communications
3. **Least Privilege** - Minimal OAuth scopes and permissions
4. **Zero-Knowledge Architecture** - We don't access user Google Sheets data
5. **Compliance** - GDPR-compliant data handling
6. **Transparency** - Open-source code available for audit

---

## Encryption & Data Protection

### Fernet Symmetric Encryption

We use **Fernet** (symmetric encryption) from the `cryptography` library to encrypt sensitive data at rest.

#### Key Characteristics

- **Algorithm**: AES-128-CBC + HMAC-SHA256
- **Key Size**: 256 bits (32 bytes, base64-encoded to 44 characters)
- **Authentication**: Built-in HMAC prevents tampering
- **Timestamping**: Tokens include timestamp for expiration

#### What We Encrypt

- **Plaid Access Tokens** - Stored encrypted in database
- Future: Stripe customer IDs (if needed)

#### Key Generation

```bash
# Generate a new Fernet key
python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"
```

Output example: `wZiJNn6hK8C3vX2mF7qB_jY4rT9aE1sU5nL0kP8dW3c=`

#### Key Management

**Development:**
- Key stored in `.env` file (gitignored)
- Never commit to version control

**Production:**
- Key stored in secure vault (AWS Secrets Manager, HashiCorp Vault, etc.)
- Environment variable injection at runtime
- Key rotation procedure:
  1. Generate new key
  2. Decrypt all data with old key
  3. Re-encrypt with new key
  4. Update environment variable
  5. Restart application

#### Encryption Implementation

**File**: `backend/app/services/crypto.py`

```python
class CryptoService:
    def encrypt(self, plaintext: str) -> str:
        """Encrypt plaintext using Fernet"""
        return self.fernet.encrypt(plaintext.encode()).decode()

    def decrypt(self, ciphertext: str) -> str:
        """Decrypt ciphertext using Fernet"""
        return self.fernet.decrypt(ciphertext.encode()).decode()
```

**Usage**:
```python
# Encrypt Plaid access token before storing
encrypted_token = crypto_service.encrypt(access_token)
plaid_item.access_token = encrypted_token

# Decrypt when needed
access_token = crypto_service.decrypt(plaid_item.access_token)
```

### Database Encryption

**Development (SQLite):**
- File-based database
- Should be excluded from version control
- Consider encrypting entire SQLite file in production

**Production (PostgreSQL):**
- Enable encryption at rest (AWS RDS, GCP Cloud SQL)
- SSL/TLS for connections (`sslmode=require`)
- Transparent Data Encryption (TDE) recommended

### TLS/HTTPS

- All production traffic over HTTPS
- TLS 1.2+ required
- Certificate from trusted CA (Let's Encrypt recommended)
- HSTS header enabled

---

## Authentication & Authorization

### Google OAuth 2.0

SheetLink uses Google OAuth for user authentication.

#### OAuth Flow

1. User clicks "Login with Google" in extension
2. Extension redirects to Google consent screen
3. User grants permission for requested scopes
4. Google returns authorization code
5. Backend exchanges code for Google ID token
6. Backend verifies ID token signature
7. Backend creates or retrieves user record
8. Backend generates JWT access token
9. Extension stores JWT for future requests

#### OAuth Scopes

We request minimal scopes:

- `openid` - User identity
- `email` - User email address
- `profile` - Basic profile info (name, picture)
- `https://www.googleapis.com/auth/spreadsheets` - Google Sheets access
- `https://www.googleapis.com/auth/drive.file` - Google Drive (for template copying)

**Why these scopes?**
- `spreadsheets` - Required to read/write transaction data to user's sheets
- `drive.file` - Required only for copying template sheets (scoped to app-created files)

#### Security Considerations

- OAuth redirect URI must be registered with Google
- State parameter prevents CSRF attacks
- ID tokens verified using Google's public keys
- Tokens have short expiration (1 hour)

### JWT (JSON Web Tokens)

After OAuth login, we issue a JWT for API authentication.

#### JWT Structure

```json
{
  "user_id": "google-oauth2|1234567890",
  "email": "user@example.com",
  "tier": "free",
  "exp": 1234567890
}
```

#### JWT Configuration

```bash
# .env
JWT_SECRET=your_jwt_secret_here  # 32+ character random string
JWT_ALGORITHM=HS256
JWT_EXPIRATION_MINUTES=60  # 1 hour
```

#### JWT Best Practices

- **Secret Strength**: Use cryptographically random secret (32+ chars)
- **Expiration**: Short-lived tokens (1-24 hours)
- **Algorithm**: HS256 (HMAC + SHA256)
- **Signature Verification**: All protected endpoints verify signature
- **No Sensitive Data**: JWTs are base64-encoded, not encrypted

#### JWT Validation

Every protected endpoint validates:
1. Token signature (using `JWT_SECRET`)
2. Token expiration (`exp` claim)
3. User still exists in database
4. User subscription status (for paid features)

### Authorization (Role-Based)

Currently, SheetLink has simple tier-based authorization:

- **Free Tier**: 2 bank accounts, manual sync only
- **Plus Tier**: 10 bank accounts, auto-sync enabled

Future: Admin roles for template moderation, user support.

---

## API Security

### CORS (Cross-Origin Resource Sharing)

**Development:**
```bash
CORS_ORIGINS=chrome-extension://*,http://localhost:3000
```

**Production:**
```bash
CORS_ORIGINS=chrome-extension://YOUR_EXTENSION_ID_HERE
```

**Security Note:** Never use wildcard `*` in production. Lock down to specific extension ID.

### Input Validation

All API endpoints validate input using Pydantic schemas:

```python
class LinkTokenRequest(BaseModel):
    user_id: str = Field(..., min_length=1)
    products: List[str] = Field(default=["transactions"])
```

**Protections:**
- Type validation (string, int, list, etc.)
- Length constraints
- Format validation (email, URL, etc.)
- SQL injection prevented (using SQLAlchemy ORM)
- XSS prevented (no raw HTML rendering)

### Rate Limiting

**Current Status**: Not implemented (TODO)

**Recommended**:
- Add rate limiting middleware (e.g., `slowapi`)
- Limit per IP: 100 requests/minute
- Limit per user: 1000 requests/hour
- Special limits for sync endpoint (1 request/5 seconds)

### CSRF Protection

- State parameter in OAuth flow
- JWT tokens not stored in cookies (stored in extension storage)
- No session cookies used

### SQL Injection Prevention

- SQLAlchemy ORM used throughout
- Parameterized queries only
- No raw SQL string concatenation

---

## Third-Party Integrations

### Plaid

**What Plaid Handles:**
- Bank authentication
- Transaction retrieval
- Account balance updates

**What We Store:**
- Encrypted access tokens
- Encrypted item IDs
- Sync cursors (not sensitive)

**Security:**
- Tokens encrypted at rest (Fernet)
- Tokens never sent to client
- Tokens expire after 30 days (Update mode re-authenticates)
- Webhook verification (HMAC signature)

**Plaid Security Features:**
- Bank credentials never touch our servers
- Plaid handles MFA and security challenges
- Plaid compliance: SOC 2 Type II, PCI DSS

### Stripe

**What Stripe Handles:**
- Payment processing
- Subscription management
- Customer billing

**What We Store:**
- User's Stripe customer ID (potentially encrypted)
- Subscription status
- Tier information

**Security:**
- Webhook signature verification (HMAC)
- API keys never exposed to client
- PCI compliance handled by Stripe

### Google Sheets API

**What We Access:**
- User's sheets (with explicit permission)
- Read balances from Accounts tab
- Write transactions to Transactions tab
- Read rules from Rules tab

**What We DON'T Access:**
- Sheets user hasn't granted permission to
- Other Google Drive files
- Gmail, Calendar, or other Google services

**Security:**
- OAuth scopes limit access
- Tokens stored securely
- Tokens can be revoked by user anytime

---

## Data Retention & Privacy

### What Data We Collect

| Data Type | Purpose | Retention | Encrypted |
|-----------|---------|-----------|-----------|
| User email | Account identity | Until deletion | No |
| User name | Display purposes | Until deletion | No |
| Plaid access tokens | Bank sync | Until disconnect | Yes (Fernet) |
| Plaid item IDs | Bank identification | Until disconnect | Yes (Fernet) |
| Sync logs | Audit trail | 90 days | No |
| Transaction data | N/A | Not stored * | N/A |
| Google Sheet IDs | User preference | Until cleared | No |

\* **Important**: We do NOT store transaction data. Transactions are fetched from Plaid and written directly to Google Sheets. They pass through our server but are never persisted.

### Data Retention Policy

- **Active Users**: Data retained indefinitely
- **Inactive Users (180 days)**: Reminder email, then deletion
- **Sync Logs**: Auto-deleted after 90 days
- **Deleted Accounts**: All data deleted within 30 days

### GDPR Compliance

**User Rights:**
- **Right to Access**: Users can export their data
- **Right to Erasure**: Users can delete their account
- **Right to Portability**: Transactions already in Google Sheets (user-owned)
- **Right to Rectification**: Users can update their information

**Data Processing Agreement:**
- We are a data processor for Google Sheets data
- We are a data controller for user account data
- Subprocessors: Plaid (bank data), Stripe (payments)

### User Deletion Process

When a user deletes their account:

1. **Revoke Plaid Access Tokens** (via Plaid API)
2. **Delete Plaid Items** (from database)
3. **Delete Sync Logs**
4. **Delete User Record**
5. **Log Audit Trail** (deletion timestamp, reason)

**Google Sheets**: User retains ownership. Data not deleted (user's choice).

**Irreversible**: Once deleted, data cannot be recovered.

---

## Incident Response

### Security Incident Types

1. **Data Breach** - Unauthorized access to database
2. **API Key Exposure** - Secrets leaked in code/logs
3. **Denial of Service** - Service unavailable
4. **Account Takeover** - Unauthorized user access

### Incident Response Plan

**Detection:**
- Sentry error alerts
- Unusual API activity
- User reports
- Security scans

**Response Steps:**

1. **Contain** (within 1 hour)
   - Revoke compromised keys
   - Block malicious IPs
   - Take affected service offline if needed

2. **Assess** (within 4 hours)
   - Determine scope of breach
   - Identify affected users
   - Document timeline

3. **Notify** (within 24 hours)
   - Affected users via email
   - Regulatory authorities (if required)
   - Third-party services (Plaid, Stripe)

4. **Remediate** (within 72 hours)
   - Patch vulnerabilities
   - Reset compromised credentials
   - Restore from backup if needed

5. **Post-Mortem** (within 1 week)
   - Root cause analysis
   - Lessons learned
   - Preventive measures

### Contact

Security incidents: **security@finsync.app**

---

## Security Best Practices

### For Developers

1. **Never Commit Secrets**
   - Use `.env` files (in `.gitignore`)
   - Use environment variables
   - Use secret managers (AWS Secrets Manager, Vault)

2. **Code Review**
   - All PRs require review
   - Security-focused review for auth/crypto changes
   - Automated security scans (Dependabot, Snyk)

3. **Dependency Management**
   - Keep dependencies up to date
   - Review security advisories
   - Use `pip-audit` for Python, `npm audit` for Node.js

4. **Testing**
   - Unit tests for crypto functions
   - Integration tests for auth flows
   - Penetration testing before major releases

### For Users

1. **Strong Passwords**
   - Use unique passwords for bank accounts
   - Enable MFA on bank accounts
   - Use password manager

2. **Review Permissions**
   - Check what apps have Google account access
   - Revoke unused integrations
   - Review Plaid connections regularly

3. **Monitor Activity**
   - Check sync logs in extension
   - Review bank statements regularly
   - Report suspicious activity immediately

4. **Keep Software Updated**
   - Update extension when new version available
   - Keep browser up to date
   - Keep operating system patched

### For Administrators

1. **Key Rotation**
   - Rotate `JWT_SECRET` quarterly
   - Rotate `ENCRYPTION_KEY` annually
   - Rotate API keys when employees leave

2. **Access Control**
   - Principle of least privilege
   - Separate dev/staging/prod environments
   - Audit access logs regularly

3. **Monitoring**
   - Set up Sentry alerts for errors
   - Monitor failed login attempts
   - Track API usage anomalies
   - Set up uptime monitors

4. **Backups**
   - Daily database backups
   - Test restore procedure monthly
   - Store backups encrypted
   - Off-site backup storage

---

## Compliance & Certifications

### Current Compliance

- **GDPR** - General Data Protection Regulation (EU)
- **CCPA** - California Consumer Privacy Act (US)

### Third-Party Certifications

- **Plaid**: SOC 2 Type II, PCI DSS
- **Stripe**: PCI DSS Level 1, SOC 2 Type II
- **Google Cloud**: ISO 27001, SOC 2/3

### Future Considerations

- SOC 2 Type II certification (if scaling to enterprise)
- HIPAA compliance (not applicable for financial data)
- PCI DSS (not applicable - we don't store card data)

---

## Security Audit History

| Date | Auditor | Findings | Status |
|------|---------|----------|--------|
| 2025-11-05 | Internal | Initial security review | Complete |
| TBD | External | Pre-launch audit | Scheduled |

---

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

**Email**: security@finsync.app

**Please include:**
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if known)

**Please DO NOT:**
- Publicly disclose the issue before we've had a chance to address it
- Attempt to access other users' data
- Perform DoS attacks or other malicious testing

**Response Time:**
- Acknowledgment within 24 hours
- Assessment within 72 hours
- Fix deployed within 7 days (for critical issues)

---

**Last Updated**: 2025-11-05
**Version**: 2.5.0
**Maintained By**: SheetLink Security Team
