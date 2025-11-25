# Known Issues

This document tracks known bugs and issues to be addressed in future releases.

---

## Chrome Fullscreen OAuth Window Bug

**Status:** 🐛 Open
**Severity:** Low (UX annoyance)
**Affected:** Chrome extension in fullscreen mode
**Discovered:** 2025-11-22 during Phase 1 sandbox regression testing

### Description

When using the extension in Chrome fullscreen mode, the Google OAuth flow causes unexpected window behavior:

1. User is in Chrome fullscreen mode
2. User clicks to save/link Google Sheet
3. Google OAuth page opens in fullscreen mode (expected)
4. After OAuth completes, user returns to Chrome fullscreen
5. Extension popup auto-opens in the fullscreen window (expected)
6. **BUG:** Extension also opens a duplicate popup window outside of fullscreen

### Expected Behavior

After OAuth completion, only the extension popup in fullscreen should open. No additional window should be created.

### Actual Behavior

Two instances of the extension popup open:
1. Extension popup in fullscreen (correct)
2. Separate popup window outside fullscreen (unwanted)

### Reproduction Steps

1. Enter Chrome fullscreen mode (F11 or Cmd+Shift+F on Mac)
2. Open SheetLink extension
3. Sign in with Google
4. Connect to Plaid (sandbox or production)
5. Click "Link Google Sheet" or save to new sheet
6. Complete Google OAuth flow
7. Observe duplicate popup windows

### Potential Cause

Likely related to OAuth redirect handling in `extension/src/drive.js` or `extension/src/service_worker.js`. The extension may be using both:
- `chrome.action.openPopup()` (opens in fullscreen)
- Window creation API (creates separate window)

### Suggested Fix

Review OAuth redirect handling code to ensure only one popup instance is created. Check for:
- Duplicate event listeners responding to OAuth callback
- Multiple popup open calls in redirect handling
- Fullscreen state detection before opening popup

### Workaround

None required - user can simply close the duplicate window. Core functionality works correctly.

### Priority

**P3 - Low Priority**
Does not affect core functionality. Can be addressed in future UX improvement pass.

---

## Future Issues

Add new issues below as they are discovered.
