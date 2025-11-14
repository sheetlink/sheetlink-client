# SheetLink Production Deployment Checklist

This checklist covers the steps required to deploy SheetLink to production, including the landing site, Chrome extension, and backend API.

## Pre-Deployment

### Code & Testing
- [ ] All features tested in development environment
- [ ] Extension tested in Chrome with sandbox mode
- [ ] Backend API tested with real Plaid sandbox accounts
- [ ] All tests passing (`npm test`, `pytest`)
- [ ] No console errors in browser DevTools
- [ ] Privacy policy and terms of service reviewed and up-to-date

### Credentials & Secrets
- [ ] Plaid production credentials obtained (CLIENT_ID, SECRET)
- [ ] Plaid production access approved by Plaid team
- [ ] Google OAuth credentials configured for production domains
- [ ] Database encryption key generated (Fernet key)
- [ ] All secrets stored in secure secrets manager (not in code)

## Landing Site Deployment (Vercel)

### Domain Configuration
- [ ] Add custom domains in Vercel project settings:
  - [ ] `sheetlink.app` (primary domain)
  - [ ] `www.sheetlink.app` (redirect to primary)
  - [ ] `docs.sheetlink.app` (for documentation)

### DNS Configuration
For each domain above, configure DNS records:
- [ ] Point A records to Vercel's IP addresses
- [ ] Point CNAME records to `cname.vercel-dns.com`
- [ ] Wait for DNS propagation (can take 24-48 hours)

### Redirects & Rewrites
Verify `vercel.json` includes:
- [ ] `www.sheetlink.app/` → `https://sheetlink.app` (301 permanent)
- [ ] `docs.sheetlink.app/` → `https://sheetlink.app/docs` (302 redirect)
- [ ] `docs.sheetlink.app/sandbox` → `/sandbox` (rewrite)
- [ ] `docs.sheetlink.app/privacy` → `/privacy` (rewrite)

### Environment Variables
Configure in Vercel dashboard:
- [ ] `NEXT_PUBLIC_GA_ID` - Google Analytics tracking ID
- [ ] Any other public environment variables

### Build & Deploy
- [ ] Connect GitHub repository to Vercel
- [ ] Configure production branch (usually `main`)
- [ ] Trigger first production deployment
- [ ] Verify build completes successfully

### Post-Deploy Verification
- [ ] Visit `https://sheetlink.app` - landing page loads
- [ ] Visit `https://sheetlink.app/beta` - beta signup works
- [ ] Visit `https://sheetlink.app/docs` - docs hub loads
- [ ] Visit `https://sheetlink.app/privacy` - privacy policy loads
- [ ] Visit `https://sheetlink.app/sandbox` - sandbox guide loads
- [ ] Visit `https://sheetlink.app/welcome` - welcome page loads
- [ ] Visit `https://docs.sheetlink.app` - redirects to `/docs`
- [ ] Visit `https://docs.sheetlink.app/sandbox` - shows sandbox page
- [ ] Visit `https://docs.sheetlink.app/privacy` - shows privacy page
- [ ] All links work correctly (no 404s)
- [ ] Images and assets load correctly
- [ ] Google Analytics tracking works
- [ ] No mixed-content warnings (all HTTPS)
- [ ] Mobile responsive layout works

## Backend API Deployment

### Infrastructure Setup
Choose deployment platform:
- [ ] Fly.io / Railway / Render / DigitalOcean / AWS / etc.
- [ ] PostgreSQL database provisioned
- [ ] Redis instance provisioned (if using caching)
- [ ] HTTPS/SSL certificate configured

### Environment Variables
Configure in deployment platform:
- [ ] `PLAID_CLIENT_ID` - Plaid production client ID
- [ ] `PLAID_SECRET` - Plaid production secret
- [ ] `PLAID_ENV=production`
- [ ] `DATABASE_URL` - PostgreSQL connection string
- [ ] `ENCRYPTION_KEY` - Fernet encryption key
- [ ] `CORS_ORIGINS` - Comma-separated list of allowed origins (include extension ID)
- [ ] `SECRET_KEY` - FastAPI secret key
- [ ] Any other backend-specific variables

### Database Setup
- [ ] Run database migrations
- [ ] Verify tables created correctly
- [ ] Test database connection

### Deploy Backend
- [ ] Deploy backend code to production
- [ ] Verify API starts successfully
- [ ] Check logs for errors

### API Verification
- [ ] Visit `https://api.sheetlink.app/health` (or equivalent health check)
- [ ] Test `/plaid/link-token` endpoint
- [ ] Test `/plaid/exchange` endpoint
- [ ] Test `/transactions/sync` endpoint
- [ ] Verify CORS headers allow extension requests
- [ ] No authentication bypass vulnerabilities
- [ ] Rate limiting configured

## Chrome Extension Deployment

### Pre-Submission
- [ ] Update `manifest.json` version number
- [ ] Update extension name/description for production
- [ ] Configure production backend URL in extension settings
- [ ] Update all hardcoded URLs to production domains:
  - [ ] Privacy link → `https://sheetlink.app/privacy`
  - [ ] Docs link → `https://docs.sheetlink.app`
  - [ ] Sandbox guide → `https://docs.sheetlink.app/sandbox`
  - [ ] Welcome page → `https://sheetlink.app/welcome`
- [ ] Test extension with production backend in sandbox mode
- [ ] Remove any development/debug code
- [ ] Minify/optimize assets

### Chrome Web Store Submission
- [ ] Create Chrome Web Store developer account ($5 one-time fee)
- [ ] Prepare store listing assets:
  - [ ] 128x128 icon
  - [ ] 440x280 small promo tile
  - [ ] 1400x560 large promo tile (optional)
  - [ ] 1280x800 or 640x400 screenshots (3-5 required)
- [ ] Write store listing copy:
  - [ ] Short description (132 characters max)
  - [ ] Detailed description
  - [ ] Feature list
- [ ] Fill out privacy practices disclosure
- [ ] Submit for review
- [ ] Respond to any review feedback

### Post-Approval
- [ ] Extension published and live
- [ ] Install from Chrome Web Store and test
- [ ] Verify all features work in production
- [ ] Update website with correct extension URL

## Final Verification

### Security
- [ ] All URLs use HTTPS
- [ ] No secrets exposed in client-side code
- [ ] CORS properly configured
- [ ] Rate limiting enabled on API
- [ ] SQL injection protections in place
- [ ] XSS protections enabled
- [ ] Security headers configured (CSP, X-Frame-Options, etc.)

### Monitoring & Analytics
- [ ] Google Analytics tracking verified
- [ ] Error logging configured (Sentry, LogRocket, etc.)
- [ ] Uptime monitoring configured (UptimeRobot, Pingdom, etc.)
- [ ] API performance monitoring enabled
- [ ] Database backups scheduled

### Documentation
- [ ] README updated with production URLs
- [ ] API documentation published
- [ ] User guide/docs complete
- [ ] Privacy policy accessible and accurate
- [ ] Terms of service published

### Support & Legal
- [ ] Support email configured and monitored
- [ ] Privacy policy complies with GDPR/CCPA
- [ ] Terms of service reviewed by legal
- [ ] Cookie consent banner configured (if needed)

## Post-Launch

### Day 1
- [ ] Monitor error logs for issues
- [ ] Check analytics for traffic
- [ ] Test user signup flow end-to-end
- [ ] Respond to any user feedback

### Week 1
- [ ] Review API performance metrics
- [ ] Check database query performance
- [ ] Monitor disk/memory usage
- [ ] Review user feedback and bug reports
- [ ] Fix any critical issues

### Month 1
- [ ] Analyze user behavior in analytics
- [ ] Review feature adoption
- [ ] Plan next iteration based on feedback
- [ ] Consider A/B testing key flows

---

## Quick Reference: Production URLs

| Purpose | URL |
|---------|-----|
| Landing page | `https://sheetlink.app` |
| Beta signup | `https://sheetlink.app/beta` |
| Docs hub | `https://sheetlink.app/docs` |
| Privacy policy | `https://sheetlink.app/privacy` |
| Sandbox guide | `https://sheetlink.app/sandbox` |
| Welcome flow | `https://sheetlink.app/welcome` |
| Docs subdomain | `https://docs.sheetlink.app` (redirects to /docs) |
| Backend API | `https://api.sheetlink.app` |
| Extension | `https://chrome.google.com/webstore/detail/sheetlink/[EXTENSION_ID]` |
