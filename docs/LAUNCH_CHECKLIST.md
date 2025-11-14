# SheetLink Beta Launch Checklist

Comprehensive checklist for launching SheetLink public beta release.

## Pre-Launch QA Matrix

### Backend API Tests

#### ✅ Authentication & Authorization
- [ ] Google OAuth login flow works end-to-end
- [ ] JWT tokens are generated correctly
- [ ] JWT tokens expire after configured time
- [ ] Protected endpoints reject invalid/expired tokens
- [ ] User info endpoint returns correct data

#### ✅ Plaid Integration
- [ ] Plaid Link opens correctly in all browsers
- [ ] Public token exchange works
- [ ] Access tokens are encrypted in database
- [ ] Sync endpoint retrieves transactions
- [ ] Sandbox environment works for testing
- [ ] Error handling for expired/invalid items
- [ ] Webhook endpoint handles Plaid callbacks

#### ✅ Stripe Subscriptions
- [ ] Checkout session creation works
- [ ] Webhook signature verification passes
- [ ] Subscription status updates correctly
- [ ] Free tier limits enforced (2 bank accounts)
- [ ] Plus tier limits enforced (10 bank accounts)
- [ ] Usage limits prevent exceeding tier caps
- [ ] Cancellation flow works correctly

#### ✅ Auto-Sync Scheduler
- [ ] Background job starts on app startup
- [ ] Hourly sync executes correctly
- [ ] Sync logs are created properly
- [ ] Failed syncs are logged with errors
- [ ] Scheduler status endpoint returns correct data
- [ ] Job doesn't create overlapping runs

#### ✅ Categorization Engine
- [ ] Rule-based categorization works
- [ ] Exact match rules apply correctly
- [ ] Contains match rules apply correctly
- [ ] Regex rules work as expected
- [ ] ML model trains without errors
- [ ] ML suggestions return confidence scores
- [ ] High-confidence categories auto-apply

#### ✅ Monitoring & Health
- [ ] `/status` endpoint returns 200 OK
- [ ] Database health check works
- [ ] Scheduler health check works
- [ ] Sentry captures errors (if configured)
- [ ] Prometheus metrics exposed (if enabled)
- [ ] `/ready` and `/live` probes work

### Extension Tests

#### ✅ Installation & Setup
- [ ] Extension installs from Chrome Web Store
- [ ] Permissions are requested correctly
- [ ] Google OAuth consent screen shows proper scopes
- [ ] First-time setup flow is intuitive

#### ✅ Bank Connection
- [ ] "Connect Bank" button works
- [ ] Plaid Link modal opens correctly
- [ ] Bank search works
- [ ] Credentials submission succeeds
- [ ] Multi-factor auth works (when applicable)
- [ ] Success message shows after connection
- [ ] Disconnect button works

#### ✅ Sheet Selection
- [ ] User can input Google Sheets URL
- [ ] URL validation works correctly
- [ ] Invalid URLs show error message
- [ ] Sheet ID is saved to storage
- [ ] Current sheet displays in UI

#### ✅ Sync Functionality
- [ ] Manual sync button works
- [ ] Loading indicator shows during sync
- [ ] Success message after sync completion
- [ ] Error messages display correctly
- [ ] Accounts tab populates correctly
- [ ] Transactions tab populates correctly
- [ ] Rules tab is created if missing

#### ✅ Categorization in Extension
- [ ] Rules tab is detected correctly
- [ ] Rules are parsed from sheet
- [ ] Categories apply to transactions
- [ ] ML assist toggle works (if enabled)
- [ ] Category suggestions display in UI
- [ ] Manual category override works

#### ✅ Auto-Sync Status Display
- [ ] Scheduler status shows correctly
- [ ] Next run time displays
- [ ] Recent syncs list populates
- [ ] Sync history is accurate

#### ✅ Options/Settings
- [ ] Options page opens correctly
- [ ] All settings save properly
- [ ] Settings persist after extension reload
- [ ] ML assist can be toggled on/off

### Cross-Browser Testing

- [ ] Chrome (latest)
- [ ] Chrome (one version back)
- [ ] Edge (Chromium-based)
- [ ] Brave (if supported)

### Error Handling

- [ ] Network errors show user-friendly messages
- [ ] API rate limits handled gracefully
- [ ] Expired Plaid items prompt re-authentication
- [ ] Invalid sheet URLs show clear errors
- [ ] Subscription expired shows upgrade prompt
- [ ] Missing permissions prompt user action

---

## Security Audit

### Secrets Management

- [ ] `.env` files are in `.gitignore`
- [ ] No secrets committed to git repository
- [ ] Production secrets stored in secure vault (e.g., AWS Secrets Manager, Vault)
- [ ] API keys rotated regularly
- [ ] Stripe webhook secret is configured correctly

### Encryption

- [ ] `ENCRYPTION_KEY` is generated securely (Fernet 256-bit)
- [ ] Plaid access tokens encrypted at rest
- [ ] Database backup encryption enabled
- [ ] TLS/HTTPS enforced in production

### Authentication

- [ ] JWT secret is strong (32+ characters random)
- [ ] JWT expiration time is reasonable (1-24 hours)
- [ ] Google OAuth scopes are minimal and justified
- [ ] OAuth redirect URIs are locked down

### CORS Configuration

- [ ] Production `CORS_ORIGINS` locked to specific extension ID
- [ ] No wildcard `*` origins in production
- [ ] Preflight requests handled correctly

### Input Validation

- [ ] All API endpoints validate input
- [ ] SQL injection not possible (using SQLAlchemy ORM)
- [ ] XSS not possible (React handles escaping)
- [ ] CSRF protection on state-changing endpoints

### Rate Limiting

- [ ] Consider adding rate limiting middleware (TODO)
- [ ] Plaid API rate limits handled gracefully
- [ ] Stripe webhook replay attack protection

---

## Infrastructure Setup

### Database

#### Development
- [ ] SQLite database created
- [ ] Tables auto-created on startup

#### Production
- [ ] PostgreSQL database provisioned
- [ ] Connection pooling configured
- [ ] Automated backups enabled (daily recommended)
- [ ] Backup retention policy defined (30 days recommended)
- [ ] Database credentials rotated

### Application Server

- [ ] Uvicorn running with production settings
- [ ] Process manager configured (systemd, supervisord, or pm2)
- [ ] Log rotation enabled
- [ ] Health check endpoint monitored
- [ ] Auto-restart on crash enabled

### Load Balancer / Reverse Proxy

- [ ] Nginx or similar configured
- [ ] HTTPS/TLS certificate installed (Let's Encrypt)
- [ ] Health checks point to `/status`
- [ ] Request timeout configured (30s recommended)
- [ ] Max body size for uploads set

### Monitoring

- [ ] Sentry project created (https://sentry.io)
- [ ] `SENTRY_DSN` configured in production `.env`
- [ ] Error alerts configured (email, Slack, PagerDuty)
- [ ] Uptime monitoring enabled (UptimeRobot, Pingdom)
- [ ] Prometheus metrics scraper (optional)

### Logging

- [ ] Application logs centralized (CloudWatch, Papertrail, Loggly)
- [ ] Log retention policy defined
- [ ] PII data not logged
- [ ] Error stack traces captured

---

## Plaid Configuration

### Sandbox Environment (Testing)

- [ ] Plaid dashboard set to Sandbox
- [ ] `PLAID_ENV=sandbox` in dev `.env`
- [ ] Test credentials documented

### Development Environment (Beta)

- [ ] Plaid dashboard upgraded to Development
- [ ] `PLAID_ENV=development` in beta `.env`
- [ ] Limited to 100 live Items
- [ ] Real bank connections enabled
- [ ] Webhook URL configured
- [ ] OAuth redirect URI configured

### Production Environment (Future)

- [ ] Application reviewed by Plaid
- [ ] Production access granted
- [ ] `PLAID_ENV=production`
- [ ] Compliance requirements met

### Token Rotation & Expiration

- [ ] Access tokens expire after 30 days by default
- [ ] Update mode enabled for expired tokens
- [ ] Users notified when re-authentication needed
- [ ] Re-authentication flow tested

---

## Stripe Configuration

### Test Mode (Development)

- [ ] Stripe dashboard in Test mode
- [ ] `STRIPE_API_KEY` uses `sk_test_` prefix
- [ ] Test webhook endpoint configured
- [ ] Test credit cards documented (4242 4242 4242 4242)

### Live Mode (Production)

- [ ] Stripe account activated
- [ ] Live API keys configured (`sk_live_`)
- [ ] Live webhook endpoint with HTTPS
- [ ] Webhook signing secret configured
- [ ] Price IDs created for tiers
- [ ] Tax settings configured (if applicable)
- [ ] Payout schedule set

### Subscription Tiers

- [ ] **Free Tier**
  - Price: $0
  - Limits: 2 bank accounts, manual sync only
  - Enforcement logic tested

- [ ] **Plus Tier**
  - Price: (e.g., $9.99/month)
  - Limits: 10 bank accounts, auto-sync enabled
  - Enforcement logic tested

---

## User Data Management

### Data Retention Policy

- [ ] Define retention period for transaction data (e.g., 2 years)
- [ ] Automated deletion of old sync logs (90 days recommended)
- [ ] Inactive user cleanup policy (180 days recommended)

### User Deletion & GDPR

- [ ] Implement user deletion endpoint/admin tool
- [ ] User deletion flow:
  1. [ ] Delete all Plaid items for user
  2. [ ] Revoke Plaid access tokens via API
  3. [ ] Delete encrypted tokens from database
  4. [ ] Delete sync logs
  5. [ ] Delete user account record
  6. [ ] Log deletion audit trail

- [ ] GDPR compliance:
  - [ ] User can export their data
  - [ ] User can delete their account
  - [ ] Privacy policy published
  - [ ] Terms of service published

### Plaid Item Management

- [ ] Users can view connected banks
- [ ] Users can disconnect individual banks
- [ ] Disconnection revokes Plaid access token
- [ ] Database records cleaned up on disconnect

---

## Chrome Web Store Submission

### Extension Package

- [ ] `manifest.json` version updated
- [ ] Icons provided (16x16, 48x48, 128x128)
- [ ] Screenshots prepared (1280x800 or 640x400)
- [ ] Promotional images created (if desired)

### Store Listing

- [ ] App name: "SheetLink"
- [ ] Short description (132 chars max)
- [ ] Detailed description with features
- [ ] Category: Productivity
- [ ] Language: English (add others if supported)
- [ ] Privacy policy URL
- [ ] Support URL / contact email

### Privacy Practices

- [ ] Declare data usage in manifest
- [ ] OAuth scopes justified
- [ ] Privacy policy covers:
  - What data is collected
  - How data is used
  - How data is stored
  - Third-party services (Plaid, Stripe)
  - User rights (export, deletion)

### Review Process

- [ ] Submit for review
- [ ] Wait for approval (typically 1-3 days)
- [ ] Address any rejection feedback
- [ ] Publish after approval

---

## Documentation

- [ ] `README.md` updated with latest features
- [ ] `docs/TEMPLATES.md` complete
- [ ] `docs/SECURITY.md` complete
- [ ] `docs/LAUNCH_CHECKLIST.md` (this file)
- [ ] API documentation generated (`/docs` endpoint)
- [ ] User guide / help documentation
- [ ] Video tutorial (optional but recommended)

---

## Communication Plan

### Beta Launch Announcement

- [ ] Email to beta users
- [ ] Product Hunt launch (optional)
- [ ] Social media posts
- [ ] Blog post explaining features

### Support Channels

- [ ] Support email monitored
- [ ] Discord or community forum (optional)
- [ ] GitHub issues for bug reports
- [ ] Feedback form in extension

### Monitoring Post-Launch

- [ ] Error rate monitoring (Sentry)
- [ ] API response time tracking
- [ ] User sign-up rate
- [ ] Subscription conversion rate
- [ ] Plaid connection success rate
- [ ] User feedback collection

---

## Rollback Plan

### If Critical Bug Found

1. [ ] Stop accepting new sign-ups (maintenance mode)
2. [ ] Revert extension to previous version in Web Store
3. [ ] Roll back backend to last stable release
4. [ ] Communicate issue to users
5. [ ] Fix bug in development
6. [ ] Re-test thoroughly
7. [ ] Re-deploy

### Database Rollback

- [ ] Database backup taken before migration
- [ ] Rollback SQL scripts prepared
- [ ] Test restore procedure verified

---

## Post-Launch Tasks

### Week 1

- [ ] Monitor error rates daily
- [ ] Respond to user feedback promptly
- [ ] Address critical bugs within 24 hours
- [ ] Track key metrics (sign-ups, syncs, errors)

### Week 2-4

- [ ] Analyze usage patterns
- [ ] Collect feature requests
- [ ] Plan next iteration
- [ ] Optimize performance bottlenecks

### Ongoing

- [ ] Monthly security audits
- [ ] Quarterly dependency updates
- [ ] Regular backup testing
- [ ] Plaid API updates monitoring
- [ ] Stripe API updates monitoring

---

## Checklist Summary

| Category | Items | Completed |
|----------|-------|-----------|
| Backend API Tests | 37 | __ / 37 |
| Extension Tests | 34 | __ / 34 |
| Security Audit | 18 | __ / 18 |
| Infrastructure | 16 | __ / 16 |
| Plaid Configuration | 12 | __ / 12 |
| Stripe Configuration | 10 | __ / 10 |
| User Data Management | 14 | __ / 14 |
| Web Store Submission | 13 | __ / 13 |
| Documentation | 7 | __ / 7 |
| **TOTAL** | **161** | **__ / 161** |

---

**Ready for beta launch when all critical items (marked ✅) are complete!**
