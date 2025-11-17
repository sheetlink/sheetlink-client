# SheetLink Client Repository - Branding & Compliance Audit Report

**Date**: January 17, 2025
**Auditor**: Claude Code (Automated)
**Repository**: sheetlink-client
**Purpose**: Pre-Plaid Production & Chrome Store compliance audit

---

## Executive Summary

This audit identified **5 critical branding issues** and **3 compliance risks** that must be addressed before Plaid production approval and Chrome Web Store listing.

**Status**: ⚠️ **FAILED** - Critical branding issues found
**Action Required**: Update all `finsync` references to `sheetlink` branding

---

## Part 1: Branding Issues

### 🔴 CRITICAL - Old Branding (`finsync`)

All instances must be replaced with `sheetlink` equivalents before public review.

#### Issue 1: Security Contact Email (SECURITY.md)
**File**: `docs/SECURITY.md`
**Line**: 429
**Found**: `security@finsync.app`
**Replace with**: `security@sheetlink.app`
**Context**:
```markdown
Security incidents: **security@finsync.app**
```

**Severity**: 🔴 **CRITICAL**
**Impact**: Plaid/Chrome reviewers will see outdated branding. Security contact will not work.

---

#### Issue 2: Security Contact Email (SECURITY.md - duplicate)
**File**: `docs/SECURITY.md`
**Line**: 539
**Found**: `**Email**: security@finsync.app`
**Replace with**: `**Email**: security@sheetlink.app`
**Context**:
```markdown
**Email**: security@finsync.app

**Please include:**
```

**Severity**: 🔴 **CRITICAL**
**Impact**: Duplicate of Issue 1. Must be fixed for consistency.

---

#### Issue 3: Support Email (TEMPLATES.md)
**File**: `docs/TEMPLATES.md`
**Line**: 297
**Found**: `support@finsync.app`
**Replace with**: `support@sheetlink.app`
**Context**:
```markdown
- **Email**: support@finsync.app
- **Discord**: discord.gg/finsync (coming soon)
```

**Severity**: 🔴 **CRITICAL**
**Impact**: Template creators will try to contact wrong email.

---

#### Issue 4: Discord Link (TEMPLATES.md)
**File**: `docs/TEMPLATES.md`
**Line**: 298
**Found**: `discord.gg/finsync`
**Replace with**: `discord.gg/sheetlink` OR remove line entirely
**Context**:
```markdown
- **Discord**: discord.gg/finsync (coming soon)
```

**Severity**: 🟡 **MEDIUM**
**Impact**: Link doesn't exist yet. Either update or remove.
**Recommendation**: Remove this line entirely until Discord is set up.

---

#### Issue 5: Documentation Domain (TEMPLATES.md)
**File**: `docs/TEMPLATES.md`
**Line**: 299
**Found**: `docs.finsync.app`
**Replace with**: `docs.sheetlink.app` OR `sheetlink.app/docs`
**Context**:
```markdown
- **Documentation**: docs.finsync.app
```

**Severity**: 🔴 **CRITICAL**
**Impact**: Broken link. Use correct production URL.
**Recommendation**: Use `sheetlink.app/docs` (matches deploy-checklist.md)

---

### Summary of Branding Issues

| File | Line | Old | New | Severity |
|------|------|-----|-----|----------|
| `docs/SECURITY.md` | 429 | `security@finsync.app` | `security@sheetlink.app` | 🔴 CRITICAL |
| `docs/SECURITY.md` | 539 | `security@finsync.app` | `security@sheetlink.app` | 🔴 CRITICAL |
| `docs/TEMPLATES.md` | 297 | `support@finsync.app` | `support@sheetlink.app` | 🔴 CRITICAL |
| `docs/TEMPLATES.md` | 298 | `discord.gg/finsync` | *(remove line)* | 🟡 MEDIUM |
| `docs/TEMPLATES.md` | 299 | `docs.finsync.app` | `sheetlink.app/docs` | 🔴 CRITICAL |

**Total Critical Issues**: 4
**Total Medium Issues**: 1

---

## Part 2: Compliance Risks

### 🟠 HIGH - GitHub Repository Reference

**File**: `docs/PRIVACY.md`
**Line**: 321
**Found**: `https://github.com/rudymdc/plaid-sheets-extension/issues`
**Replace with**: `https://github.com/sheetlink/sheetlink-client/issues`
**Context**:
```markdown
**Questions or concerns about privacy?**

- GitHub Issues: [https://github.com/rudymdc/plaid-sheets-extension/issues](...)
```

**Severity**: 🟠 **HIGH**
**Impact**: Public-facing privacy policy links to old/wrong repository. Plaid/Chrome reviewers will notice inconsistency.
**Risk**: Confusion about which repo is official. Could delay approval.

---

### 🟡 MEDIUM - "Coming Soon" Messaging Inconsistency

**Files**: Multiple
**Issue**: Self-hosting guide exists (`docs/self-host.md`) but is still referenced as "coming soon" in:
- `SECURITY.md:123` - "Docker deployment guide (coming soon)"
- `landing/src/pages/privacy.tsx:246` - "Self-hosting guide coming soon"

**Recommended Fix**:
1. Update `SECURITY.md:123`:
   ```markdown
   - **Self-Hosting Option**: For complete transparency, you can self-host the entire backend using our [Docker deployment guide](./docs/self-host.md).
   ```

2. Update `landing/src/pages/privacy.tsx:246`:
   ```markdown
   Want complete control? Run your own SheetLink backend with Docker or cloud providers. [Read the self-hosting guide](https://sheetlink.app/docs/self-host).
   ```

**Severity**: 🟡 **MEDIUM**
**Impact**: Documentation inconsistency. Reviewers may think self-hosting isn't implemented yet.

---

### 🟢 LOW - "Real Bank Connections Coming Soon"

**Files**: Multiple files reference production mode as "coming soon"
**Status**: ✅ **ACCURATE** - This is correct since app is currently Sandbox-only
**No action required** - These references are truthful and appropriate

Examples:
- `extension/config.js:36` - "Real banks coming soon"
- `extension/src/options.html:356` - "Early testers get lifetime free access"
- `README.md:175` - "Production mode coming soon"

**Recommendation**: Keep these references until Plaid production approval.

---

## Part 3: Recommended Fixes

### Batch Replacement Script

Create a script to fix all branding issues at once:

```bash
#!/bin/bash
# fix-branding.sh

# Fix SECURITY.md
sed -i '' 's/security@finsync\.app/security@sheetlink.app/g' docs/SECURITY.md

# Fix TEMPLATES.md
sed -i '' 's/support@finsync\.app/support@sheetlink.app/g' docs/TEMPLATES.md
sed -i '' 's/docs\.finsync\.app/sheetlink.app\/docs/g' docs/TEMPLATES.md
sed -i '' '/discord\.gg\/finsync/d' docs/TEMPLATES.md  # Remove Discord line

# Fix PRIVACY.md
sed -i '' 's|rudymdc/plaid-sheets-extension|sheetlink/sheetlink-client|g' docs/PRIVACY.md

# Fix self-hosting references
sed -i '' 's/Docker deployment guide (coming soon)/[Docker deployment guide](\.\/docs\/self-host\.md)/g' SECURITY.md

echo "✅ Branding fixes applied"
```

---

### Manual File Edits

#### 1. `docs/SECURITY.md`

**Line 429** - Replace:
```markdown
Security incidents: **security@finsync.app**
```
With:
```markdown
Security incidents: **security@sheetlink.app**
```

**Line 539** - Replace:
```markdown
**Email**: security@finsync.app
```
With:
```markdown
**Email**: security@sheetlink.app
```

**Line 123** - Replace:
```markdown
**Self-Hosting Option**: For complete transparency, you can self-host the entire backend using our Docker deployment guide (coming soon).
```
With:
```markdown
**Self-Hosting Option**: For complete transparency, you can self-host the entire backend using our [Docker deployment guide](./docs/self-host.md).
```

---

#### 2. `docs/TEMPLATES.md`

**Lines 297-299** - Replace:
```markdown
- **Email**: support@finsync.app
- **Discord**: discord.gg/finsync (coming soon)
- **Documentation**: docs.finsync.app
```
With:
```markdown
- **Email**: support@sheetlink.app
- **Documentation**: [sheetlink.app/docs](https://sheetlink.app/docs)
```

*Note: Discord line removed entirely.*

---

#### 3. `docs/PRIVACY.md`

**Line 321** - Replace:
```markdown
- GitHub Issues: [https://github.com/rudymdc/plaid-sheets-extension/issues](https://github.com/rudymdc/plaid-sheets-extension/issues)
```
With:
```markdown
- GitHub Issues: [https://github.com/sheetlink/sheetlink-client/issues](https://github.com/sheetlink/sheetlink-client/issues)
```

---

#### 4. `landing/src/pages/privacy.tsx`

**Line 246** - Replace:
```typescript
Want complete control? Run your own SheetLink backend with Docker or cloud providers. Full self-hosting guide coming soon.
```
With:
```typescript
Want complete control? Run your own SheetLink backend with Docker or cloud providers. <a href="/docs/self-host" className="text-sheetlink-green-600 underline">Read the self-hosting guide</a>.
```

---

## Part 4: Additional Observations

### ✅ GOOD - No Critical Privacy/Security Misstatements

**Finding**: All privacy and security claims are **accurate** and match current architecture:
- ✅ "Transactions never stored" - Verified in code
- ✅ "Zero-storage architecture" - Verified in backend docs
- ✅ "Encrypted tokens only" - Verified in SECURITY.md
- ✅ "Sandbox-only mode" - Verified in config.js

**Recommendation**: No changes needed.

---

### ✅ GOOD - localhost References Are Appropriate

**Finding**: All `localhost` references are in:
- Development documentation (README.md)
- Self-hosting guides (self-host.md)
- Deployment examples (vercel-deployment-guide.md)

**Status**: These are appropriate for developer documentation.
**Recommendation**: Keep as-is.

---

### ✅ GOOD - No Backend Code References in Client Repo

**Finding**: All backend references correctly point to separate private repo.
**Status**: Clean separation maintained.
**Recommendation**: No changes needed.

---

## Part 5: Pre-Launch Verification Checklist

Before submitting to Plaid/Chrome:

### Branding
- [ ] All `finsync` references replaced with `sheetlink`
- [ ] All email addresses use `@sheetlink.app`
- [ ] All domain references use `sheetlink.app`
- [ ] GitHub repo URLs point to `sheetlink/sheetlink-client`

### Documentation
- [ ] Privacy policy reviewed and accurate
- [ ] Security policy reviewed and accurate
- [ ] Self-hosting guide linked correctly (not "coming soon")
- [ ] All external links work (no 404s)

### Extension
- [ ] Manifest version updated
- [ ] Backend URL points to production API
- [ ] Extension name/description matches branding
- [ ] All links in extension point to production URLs

### Compliance
- [ ] No misleading claims about data storage
- [ ] Sandbox-only status clearly communicated
- [ ] Privacy claims match actual behavior
- [ ] Security claims verifiable

---

## Conclusion

**Overall Assessment**: ⚠️ **FAILED** (4 critical issues, 1 high-risk issue)

**Required Actions**:
1. Fix all 4 critical branding issues (`finsync` → `sheetlink`)
2. Update GitHub repo URL in PRIVACY.md
3. Link to existing self-hosting guide (remove "coming soon")

**Estimated Time to Fix**: 15-30 minutes (simple find-replace)

**Re-Audit Recommended**: After fixes applied, run audit again to verify.

---

**Audit Complete**

*Generated by Claude Code - Automated Repository Audit*
*Report Version: 1.0*
*Next Audit: After fixes applied*
