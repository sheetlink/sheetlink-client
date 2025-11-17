# Removed Logs and Comments (by File)

PRD v1.1 - Safe Cleanup of Console Logs & TODO Comments

## service_worker.js

Removed 37 lines total (29 console statements + 2 TODO comments + 6 commented code lines)

**Console statements:**
- console.log and console.error statements throughout error handling
- console.log for debugging OAuth flow, Plaid connection, popup opening
- console.warn for unknown message types

**TODO comments:**
- Line 283: `// TODO: Show notification or badge`
- Line 296: `// TODO: Add alarm for periodic sync (post-MVP)`

**Commented code:**
- Lines 297-302: Commented alarm code for periodic sync (6 lines)

## popup.js

Removed 18 lines total (16 console statements + 2 TODO comments)

**Console statements:**
- console.error in various catch blocks (loading state, connecting bank, saving sheet, syncing, etc.)
- console.log for modal display events and item deletion
- console.warn for failed analytics recording

**TODO comments:**
- Line 385: `// TODO: Call backend to delete tokens`
- Line 856: `// TODO: Add user ID from storage`

## options.js

Removed 5 lines total (5 console statements)

**Console statements:**
- console.error for settings operations (resetting walkthrough, resetting sandbox, loading/saving/resetting settings)

## plaid_link.js

Removed 11 lines total (11 console statements)

**Console statements:**
- console.log for connection attempts, SDK loading, Plaid Link success/events
- console.error for exchange errors and Plaid Link errors

## drive.js

Removed 7 lines total (5 console statements + 2 commented code lines)

**Console statements:**
- console.error for Drive API operations (copying sheet, installing template, listing sheets, creating sheet)
- console.log for template installation success

**Commented code:**
- Lines 53-54: Optional folder specification comments

## rules.js

Removed 9 lines total (9 console statements)

**Console statements:**
- console.error for rules operations (reading rules, matching rules, applying rules, checking/creating rules tab, applying ML suggestions)
- console.warn for ML suggestions unavailability
- console.log for ML model status

## sheets.js

No changes - file was already clean (no console statements, TODO comments, or commented code)

---

## Summary

**Total items removed: 87 lines across 6 files**

- **Console statements**: 74 removed
  - console.log: ~40
  - console.error: ~30
  - console.warn: ~4
- **TODO comments**: 4 removed
- **Commented code lines**: 9 removed (alarm code + folder specification)

**Files modified:**
1. service_worker.js (37 lines removed)
2. popup.js (18 lines removed)
3. options.js (5 lines removed)
4. plaid_link.js (11 lines removed)
5. drive.js (7 lines removed)
6. rules.js (9 lines removed)
7. sheets.js (no changes)

**Safety verified:**
- No chrome.runtime.lastError checks were removed
- No JSDoc documentation was touched
- No functional code was modified
- All removals were logging/debugging code only

**Diffs available:**
- service_worker.js.diff
- popup.js.diff
- options.js.diff
- plaid_link.js.diff
- drive.js.diff
- rules.js.diff

All diffs are available in this archive directory for reference and recovery if needed.
