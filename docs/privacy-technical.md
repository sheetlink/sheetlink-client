# SheetLink Technical Privacy Documentation

**Last Updated:** November 2025
**For:** Developers, Security Researchers

## Architecture

```
[Extension] → [SheetLink API] → [Plaid]
                ↓
         [Your Google Sheet]
```

**What we store:** Encrypted tokens + metadata only
**What we DON'T store:** Transaction data, balances, PII

## Database Schema

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    google_user_id VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) NOT NULL,
    subscription_tier VARCHAR(50) DEFAULT 'free',  -- 'free', 'basic', 'pro'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE plaid_items (
    id INTEGER PRIMARY KEY,
    item_id VARCHAR(255) UNIQUE,
    user_id VARCHAR(255),  -- References users.google_user_id
    encrypted_access_token TEXT,  -- Fernet encrypted
    cursor VARCHAR(512),            -- Sync cursor only
    institution_id VARCHAR(255),
    institution_name VARCHAR(255),
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## Encryption

- Algorithm: Fernet (AES-128-CBC + HMAC)
- Key storage: Environment variable `ENCRYPTION_KEY`
- Tokens encrypted at rest, decrypted only during sync

## JWT Authentication

**Flow:**
1. User completes Google OAuth (requests `token id_token` with `openid` scope)
2. Extension receives access token (for Sheets API) and ID token (for backend auth)
3. Extension sends ID token to `POST /auth/login`
4. Backend verifies ID token with Google, extracts email and user ID
5. Backend creates/updates user record in `users` table
6. Backend issues JWT token (HS256, 60-minute expiry)
7. Extension stores JWT in `chrome.storage.sync`
8. Subsequent API requests include `Authorization: Bearer <jwt>`

**JWT Claims:**
```json
{
  "user_id": "uuid",
  "google_user_id": "101689983093482464121",
  "email": "user@gmail.com",
  "subscription_tier": "pro",
  "exp": 1234567890  // 60 minutes from issue
}
```

**Security:**
- Secret key: Environment variable `JWT_SECRET_KEY`
- Algorithm: HS256 (HMAC-SHA256)
- Expiry: 60 minutes (no refresh tokens)
- Stateless: Backend verifies signature and expiry, no session storage

**Privacy:**
- ID token sent once to backend, verified, then discarded (never stored)
- JWT stored only in extension's Chrome storage
- Backend never stores JWT tokens (stateless verification)

## Privacy Middleware

Located: `backend/app/middleware/privacy.py`

- Suppresses detailed logging for `/plaid/*` endpoints
- Logs only: `[PLAID] METHOD /path` (no bodies)
- Redacts sensitive fields automatically

## CORS

Allowed origins:
- `chrome-extension://*`
- `https://sheetlink.app`
- `https://*.sheetlink.app`
- `http://localhost:*` (dev only)

Methods: GET, POST only
Headers: Content-Type, Authorization only

## Verification

```bash
# Check database schema
sqlite3 backend/sheetlink.db ".schema"

# Monitor logs (no transaction data should appear)
tail -f backend/app.log | grep PLAID

# Verify CORS
curl -H "Origin: https://evil.com" http://localhost:8000/plaid/sync
# Should return CORS error

# Verify JWT authentication
# 1. Test unauthenticated access (should work with free tier)
curl http://localhost:8000/tier/status

# 2. Test with invalid JWT (should return 401)
curl -H "Authorization: Bearer invalid_token" http://localhost:8000/tier/status

# 3. Test with valid JWT (requires actual token from extension)
# Open extension console and run:
chrome.storage.sync.get(['jwtToken'], (data) => console.log(data.jwtToken));
# Then use token in curl:
curl -H "Authorization: Bearer <actual_jwt>" http://localhost:8000/tier/status
```

**Built for builders. Auditable by design.**
