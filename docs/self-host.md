# SheetLink Self-Hosting Guide

For maximum privacy, run your own SheetLink backend.

## Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/sheetlink/sheetlink.git
cd sheetlink/backend
```

### 2. Create Environment File
```bash
cp .env.example .env
```

Edit `.env`:
```bash
# Plaid API (get from https://dashboard.plaid.com)
PLAID_CLIENT_ID=your_client_id
PLAID_SECRET=your_secret
PLAID_ENV=sandbox  # or production

# Encryption (generate: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())")
ENCRYPTION_KEY=your_fernet_key_here

# Database
DATABASE_URL=sqlite:///./sheetlink.db  # or postgresql://...

# CORS (add your extension ID)
CORS_ORIGINS=chrome-extension://your-extension-id,http://localhost:3000
```

### 3. Run with Docker
```bash
docker build -t sheetlink-backend .
docker run -p 8000:8000 --env-file .env sheetlink-backend
```

### 4. Run Locally
```bash
python -m venv venv
source venv/bin/activate  # or `venv\Scripts\activate` on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Configure Extension

Edit `extension/src/popup.js`:
```javascript
const BACKEND_URL = 'http://localhost:8000';  // Your backend URL
```

Or use `extension/config.js`:
```javascript
export const CONFIG = {
  API_BASE_URL: "https://your-domain.com",
  // ...
};
```

## Production Deployment

### Option 1: Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - PLAID_CLIENT_ID=${PLAID_CLIENT_ID}
      - PLAID_SECRET=${PLAID_SECRET}
      - ENCRYPTION_KEY=${ENCRYPTION_KEY}
      - DATABASE_URL=postgresql://user:pass@db:5432/sheetlink
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=sheetlink
      - POSTGRES_USER=user
      - POSTGRES_PASSWORD=pass
```

### Option 2: Fly.io
```bash
fly launch
fly secrets set PLAID_CLIENT_ID=xxx PLAID_SECRET=yyy ENCRYPTION_KEY=zzz
fly deploy
```

### Option 3: Railway
1. Connect GitHub repo
2. Add environment variables in dashboard
3. Deploy automatically

## Security Checklist

- [ ] Generate strong `ENCRYPTION_KEY` (never reuse)
- [ ] Use HTTPS in production (Let's Encrypt)
- [ ] Restrict CORS to your extension ID only
- [ ] Use PostgreSQL (not SQLite) for production
- [ ] Enable firewall (only ports 80/443 open)
- [ ] Backup database regularly
- [ ] Monitor logs for suspicious activity

## Troubleshooting

**Extension can't connect to backend:**
- Check CORS_ORIGINS includes extension ID
- Verify backend is running: `curl http://localhost:8000/health`
- Check browser console for errors

**Plaid errors:**
- Verify PLAID_CLIENT_ID and PLAID_SECRET in `.env`
- Check PLAID_ENV matches your account (sandbox/development/production)

**Database errors:**
- Run migrations: `alembic upgrade head`
- Check DATABASE_URL format

## Support

- GitHub Issues: https://github.com/sheetlink/sheetlink/issues
- Docs: https://docs.sheetlink.app

**Built for builders. Host it yourself.**
