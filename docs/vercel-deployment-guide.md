# Vercel Deployment Guide for SheetLink

This guide walks you through deploying the SheetLink landing site to Vercel with custom domain configuration.

## Prerequisites

- [ ] Vercel account created (free tier is fine to start)
- [ ] GitHub repository accessible
- [ ] Domain `sheetlink.app` registered and accessible in your domain registrar
- [ ] Vercel CLI installed (optional but recommended): `npm i -g vercel`

---

## Step 1: Add Domains to Vercel Project

### Option A: Via Vercel Dashboard (Recommended for First-Time)

1. **Deploy to Vercel first:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Set **Root Directory** to `landing`
   - Click "Deploy"

2. **Add custom domains:**
   - Once deployed, go to your project dashboard
   - Click **Settings** → **Domains**
   - Add each domain one by one:

   **Primary domain:**
   ```
   sheetlink.app
   ```
   Click "Add"

   **WWW redirect:**
   ```
   www.sheetlink.app
   ```
   Click "Add" → Vercel will suggest redirecting to `sheetlink.app` → Click "Redirect"

   **Docs subdomain:**
   ```
   docs.sheetlink.app
   ```
   Click "Add"

3. **Vercel will provide DNS instructions** for each domain. Keep this page open - you'll need these values in Step 2.

### Option B: Via Vercel CLI

```bash
cd landing
vercel

# After first deployment, add domains:
vercel domains add sheetlink.app
vercel domains add www.sheetlink.app
vercel domains add docs.sheetlink.app
```

---

## Step 2: Configure DNS Records

You need to configure DNS records at your domain registrar (Namecheap, GoDaddy, Cloudflare, etc.).

### A. Log into your domain registrar

Navigate to the DNS management page for `sheetlink.app`.

### B. Add DNS records

Vercel will provide specific IP addresses or CNAME values. Here's the typical configuration:

#### For `sheetlink.app` (root domain):

**Method 1: A Records (most registrars)**
```
Type: A
Name: @ (or leave blank)
Value: 76.76.21.21
TTL: Auto or 3600
```

**Method 2: ALIAS/ANAME Record (if supported)**
```
Type: ALIAS or ANAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: Auto or 3600
```

#### For `www.sheetlink.app`:

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: Auto or 3600
```

#### For `docs.sheetlink.app`:

```
Type: CNAME
Name: docs
Value: cname.vercel-dns.com
TTL: Auto or 3600
```

### C. Verification

- DNS propagation can take **5 minutes to 48 hours** (usually within 1-2 hours)
- Check status in Vercel dashboard under Settings → Domains
- Domains will show:
  - 🟡 "Invalid Configuration" → waiting for DNS
  - 🟢 "Valid Configuration" → ready!

**Pro tip:** Use [dnschecker.org](https://dnschecker.org) to check DNS propagation status globally.

---

## Step 3: Verify Routing Rules

Once DNS is configured and domains show as "Valid" in Vercel:

### Automatic Configuration

Vercel automatically reads `vercel.json` from your repository. The redirects and rewrites are already configured:

✅ **Redirects:**
- `www.sheetlink.app` → `sheetlink.app` (301)
- `docs.sheetlink.app/` → `sheetlink.app/docs` (302)

✅ **Rewrites:**
- `docs.sheetlink.app/sandbox` → shows `/sandbox` content
- `docs.sheetlink.app/privacy` → shows `/privacy` content

### Test the routing:

Open these URLs and verify they work:

```bash
# Main domain
curl -I https://sheetlink.app
curl -I https://sheetlink.app/beta
curl -I https://sheetlink.app/docs
curl -I https://sheetlink.app/privacy
curl -I https://sheetlink.app/sandbox
curl -I https://sheetlink.app/welcome

# WWW redirect (should return 301 or 308)
curl -I https://www.sheetlink.app

# Docs subdomain (root should redirect to /docs)
curl -I https://docs.sheetlink.app

# Docs subdomain pages (should show content)
curl -I https://docs.sheetlink.app/sandbox
curl -I https://docs.sheetlink.app/privacy
```

Expected responses:
- Main domain pages: `200 OK`
- WWW: `301` or `308` redirect
- `docs.sheetlink.app/`: `302` redirect
- Docs pages: `200 OK`

---

## Step 4: Update Chrome Extension Links

Once production domains are live, update hardcoded URLs in the extension:

### Files to update:

1. **`extension/src/popup.html`** - Check for any hardcoded links
2. **`extension/src/options.html`** - Check for any hardcoded links
3. **`extension/manifest.json`** - Update any web-accessible resources or permissions if needed

### Specific URLs to update:

Search your extension code for development URLs and replace:

**Privacy link:**
```javascript
// Before:
const PRIVACY_URL = 'http://localhost:3000/privacy';

// After:
const PRIVACY_URL = 'https://sheetlink.app/privacy';
```

**Docs link:**
```javascript
// Before:
const DOCS_URL = 'http://localhost:3000/docs';

// After:
const DOCS_URL = 'https://docs.sheetlink.app';
```

**Sandbox guide:**
```javascript
// Before:
const SANDBOX_URL = 'http://localhost:3000/sandbox';

// After:
const SANDBOX_URL = 'https://docs.sheetlink.app/sandbox';
```

**Welcome page:**
```javascript
// Before:
const WELCOME_URL = 'http://localhost:3000/welcome';

// After:
const WELCOME_URL = 'https://sheetlink.app/welcome';
```

### Quick search command:

```bash
# Search for localhost URLs in extension
cd extension
grep -r "localhost:3000" . --exclude-dir=node_modules

# Search for any hardcoded domain references
grep -r "sheetlink.app" . --exclude-dir=node_modules
```

---

## Step 5: Environment Variables (Production)

Set production environment variables in Vercel:

1. Go to project **Settings** → **Environment Variables**
2. Add the following:

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_API_BASE_URL=https://api.sheetlink.app
NEXT_PUBLIC_CHROME_STORE_URL=https://chrome.google.com/webstore/detail/sheetlink/[YOUR_EXTENSION_ID]
```

3. Click "Save"
4. Redeploy for changes to take effect: **Deployments** → click ⋯ → "Redeploy"

---

## Step 6: SSL/HTTPS Verification

Vercel automatically provisions SSL certificates. Verify:

1. Visit all domains with `https://`
2. Check for SSL warnings (should be none)
3. Verify padlock icon in browser
4. Check certificate validity:

```bash
# Check SSL certificate
openssl s_client -connect sheetlink.app:443 -servername sheetlink.app < /dev/null 2>/dev/null | openssl x509 -noout -dates
```

---

## Troubleshooting

### Domain shows "Invalid Configuration"

**Problem:** DNS records not propagated yet

**Solution:**
- Wait 1-2 hours for DNS propagation
- Double-check DNS records match Vercel's instructions exactly
- Try clearing DNS cache: `sudo dscacheutil -flushcache` (macOS) or `ipconfig /flushdns` (Windows)

### Redirects not working

**Problem:** `vercel.json` not being read

**Solution:**
- Verify `vercel.json` is in the `landing/` directory (not root)
- Check JSON syntax: `node -e "JSON.parse(require('fs').readFileSync('vercel.json'))"`
- Redeploy: **Deployments** → ⋯ → "Redeploy"

### 404 on some routes

**Problem:** Next.js pages not building correctly

**Solution:**
- Check build logs: **Deployments** → click deployment → "View Build Logs"
- Verify all page files exist in `src/pages/`
- Check for TypeScript/build errors

### "Too Many Redirects" error

**Problem:** Redirect loop between domains

**Solution:**
- Check DNS CNAME records aren't pointing at each other
- Verify `vercel.json` redirect destinations are correct
- Clear browser cache and cookies

---

## Post-Deployment Checklist

- [ ] All 3 domains resolve correctly
- [ ] WWW redirects to root domain
- [ ] `docs.sheetlink.app` redirects to `/docs`
- [ ] All pages load with HTTPS
- [ ] No SSL certificate warnings
- [ ] Google Analytics tracking works
- [ ] No console errors in browser DevTools
- [ ] Mobile responsive design works
- [ ] All images and assets load
- [ ] Extension links updated and tested
- [ ] Beta signup form works
- [ ] Privacy policy accessible

---

## Quick Commands Reference

```bash
# Deploy to Vercel
cd landing
vercel --prod

# Check DNS propagation
dig sheetlink.app
dig www.sheetlink.app
dig docs.sheetlink.app

# Test HTTP response codes
curl -I https://sheetlink.app
curl -I https://www.sheetlink.app
curl -I https://docs.sheetlink.app

# View Vercel logs
vercel logs

# List domains
vercel domains ls

# Remove a domain (if needed)
vercel domains rm docs.sheetlink.app
```

---

## Need Help?

- **Vercel Docs:** https://vercel.com/docs/concepts/projects/domains
- **DNS Propagation Check:** https://dnschecker.org
- **Vercel Support:** https://vercel.com/support
- **SheetLink Deploy Checklist:** See `docs/deploy-checklist.md`
