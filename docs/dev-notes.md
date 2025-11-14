# SheetLink Developer Notes

## Common Development Issues

### MetaMask Console Warnings

**Symptom:** When running `npm run dev`, you may see console warnings like:
```
Failed to connect to MetaMask
```

**Cause:** This warning originates from Chrome extensions injecting `window.ethereum` while running Next.js in development mode. It is **not** related to SheetLink code.

**Solution:** You can safely ignore these warnings. They do not affect SheetLink functionality.

---

## Development Environment

- **Next.js Version:** 16.0.1 (Turbopack)
- **Default Port:** 3000 (or next available)
- **Backend Port:** 8000

---

## Running the Project

### Frontend (Landing Pages)
```bash
cd landing
npm run dev
```

### Backend (API)
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

---

## Known Non-Issues

- **MetaMask warnings:** Ignore (browser extension injection)
- **Port conflicts:** Next.js will auto-select next available port
- **Turbopack warnings:** Related to workspace lockfiles, can be ignored during development

---

**Last Updated:** November 10, 2025
