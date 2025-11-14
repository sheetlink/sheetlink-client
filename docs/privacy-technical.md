# SheetLink Technical Privacy Documentation

**Last Updated:** November 10, 2025
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
CREATE TABLE plaid_items (
    id INTEGER PRIMARY KEY,
    item_id VARCHAR(255) UNIQUE,
    user_id VARCHAR(255),
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
```

**Built for builders. Auditable by design.**
