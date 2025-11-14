# Session Context: Domain Deployment & Content Issues

**Date:** November 11, 2025
**Status:** CRITICAL - Website reverted to old version after git checkout

## Problem Summary

After running `git checkout src/` to revert subdomain URL changes, the entire landing site reverted to an OLD version from commit `ede6edb` (Coming Soon transformation). The current deployed site has:

❌ **Wrong Issues:**
- Old navigation structure
- Old copy with em dashes (—) instead of hyphens (-)
- Old docs page (simple text instead of card-based layout)
- Old privacy page (simple version instead of redesigned version)
- Missing or broken beta/sandbox pages

✅ **What Should Be There:**
- Modern card-based docs hub
- Redesigned privacy page with "Privacy isn't a feature" hero
- Beta signup page with "What to Expect" section
- Comprehensive sandbox guide with screenshots
- All pages using relative URLs for SEO

## Root Cause

When we ran `git checkout src/` to remove `docs.sheetlink.app` URLs, it reverted ALL src files to the last committed state, which was the old "Coming Soon" site. The newer content (beta.tsx, sandbox.tsx, redesigned docs.tsx, redesigned privacy.tsx) were NEVER committed to git - they only existed as untracked local files.

## Git Status

**Current commit:** c42e0ec "Add beta signup, sandbox guide, and updated docs pages with SEO-optimized single domain structure"

**Files that exist locally but may need restoration:**
- `src/pages/beta.tsx` - Beta signup page (committed in c42e0ec)
- `src/pages/sandbox.tsx` - Sandbox guide (committed in c42e0ec)
- `src/pages/docs.tsx` - NEEDS UPDATE (still has old simple version)
- `src/pages/privacy.tsx` - NEEDS UPDATE (still has old simple version)
- `src/pages/index.tsx` - NEEDS UPDATE (has em dash in title)
- `src/components/Header.tsx` - NEEDS UPDATE (old nav structure)
- `src/components/HeroComingSoon.tsx` - May need update

## What Needs to Be Done

### 1. Restore Correct Content

You need to find and restore the NEWER versions of these files that had:

**docs.tsx should have:**
- Card-based layout with icons (🧪 Sandbox, 🔒 Privacy)
- "Coming Soon" cards for Quick Start Guide and Self-Hosting
- Quick Links section with GitHub, Beta, About, Support
- Modern styling with hover effects

**privacy.tsx should have:**
- Hero section: "Privacy isn't a feature. It's the foundation."
- "What We Store" section (green box)
- "What We DON'T Store" section (red box)
- "How Your Data Flows" diagram
- Modern visual design with colored sections

**index.tsx should have:**
- Title without em dash: `${BRAND.name} - Connect Your Bank to Google Sheets`
- Modern copy

**Header.tsx should have:**
- Navigation: About, Docs (not just Docs)
- Correct link structure

### 2. Check These Locations for Backup Content

1. **Browser cache/devtools** - If you had the pages open, they might be cached
2. **Vercel deployment history** - Check previous successful deployments
3. **Git reflog** - Check if there are unstaged changes
4. **Local backup** - Check if you have any backups
5. **Previous Claude Code sessions** - Check conversation history for the actual content

### 3. Vercel Deployment Info

**Current deployment:** landing-elg0sihne-rudys-projects-084896fb.vercel.app
**Domain:** sheetlink.app
**Build ID:** OeHBOW1awI1be3fwEzdIB

**Verified working (but wrong content):**
- https://sheetlink.app/beta - Returns 200 (but has old content)
- https://sheetlink.app/sandbox - Returns 200 (but has old content)
- https://sheetlink.app/privacy - Returns 200 (but has old content)
- https://sheetlink.app/docs - Returns 200 (but has old content)

### 4. Domain Configuration (THIS IS CORRECT - DON'T CHANGE)

✅ **Correct setup:**
- `sheetlink.app` - main domain
- `www.sheetlink.app` - redirects to main (301)
- NO `docs.sheetlink.app` subdomain (removed for SEO)

✅ **vercel.json is correct:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "redirects": [
    {
      "source": "/",
      "has": [{"type": "host", "value": "www.sheetlink.app"}],
      "destination": "https://sheetlink.app",
      "permanent": true
    }
  ],
  "headers": [...]
}
```

## Recovery Steps

### Option 1: Check Vercel Deployment History

1. Go to https://vercel.com/rudys-projects-084896fb/landing/deployments
2. Find a deployment from BEFORE the `git checkout` command
3. Look at the source code or redeploy that version
4. Compare files to see what changed

### Option 2: Git Reflog

```bash
cd /Users/rudy/projects/sheetlink/landing
git reflog
# Look for commits before c42e0ec
# Check if there are any stashes
git stash list
```

### Option 3: Vercel Inspect Previous Build

```bash
# Find a good deployment
vercel ls

# Inspect a specific deployment to see source
vercel inspect [deployment-url]
```

### Option 4: Recreate From Memory/Docs

If you have PRD documents or previous session notes that describe what the pages should look like, recreate them based on:

**Known good content snippets:**

**docs.tsx (Card layout):**
- Should have `<a href="https://docs.sheetlink.app/sandbox">` cards
- Icons: 🧪, 🔒, ⚡, 🏠
- "Coming Soon" badges on Quick Start and Self-Hosting

**privacy.tsx (Redesigned):**
- Hero: "Privacy isn't a feature. It's the foundation."
- Bullet sections with green/red boxes
- Data flow steps (1, 2, 3, 4)

## Files Changed in This Session

```
Modified: landing/vercel.json (removed docs subdomain rewrites)
Added: landing/src/pages/beta.tsx (Beta signup)
Added: landing/src/pages/sandbox.tsx (Sandbox guide)
Added: landing/public/screenshots/sandbox-setup.png
Committed in: c42e0ec
```

## Commands Run

```bash
# What caused the problem:
git checkout src/  # This reverted everything to old versions

# Attempted fixes:
git add src/pages/beta.tsx src/pages/sandbox.tsx src/pages/docs.tsx src/pages/privacy.tsx vercel.json public/screenshots/
git commit -m "Add beta signup, sandbox guide, and updated docs pages..."
vercel --prod
vercel --prod --force  # Still building when session ended
```

## Next Steps for New Session

1. **DO NOT run `git checkout` without backing up first**
2. Check Vercel deployment history for good version
3. Compare current src files with what they should be
4. Restore correct content to docs.tsx, privacy.tsx, index.tsx, Header.tsx
5. Commit changes properly
6. Deploy with `vercel --prod`
7. Verify all pages have correct modern content

## Key Insight

The newer, redesigned pages were never in git history. They only existed as local untracked files. When `git checkout src/` was run, it overwrote them with the old committed versions from `ede6edb`.

**The lesson:** Always commit significant changes before running git checkout commands.

## Contact Info

- Vercel Project: rudys-projects-084896fb/landing
- Domain: sheetlink.app
- Working directory: /Users/rudy/projects/sheetlink/landing
- Git branch: main

---

**Priority:** HIGH - Site is live with wrong content. Need to restore correct modern design ASAP.
