/**
 * state-manager.js - Centralized state management for SheetLink Extension
 *
 * Phase 3.13.0: State Management Optimization
 *
 * Responsibilities:
 * - Initialize state from chrome.storage on extension load
 * - Provide instant in-memory access to state
 * - Persist changes to storage automatically
 * - Notify subscribers of state changes
 * - Manage cache invalidation and refresh strategies
 */

// Use global debug function from popup.html

class StateManager {
  constructor() {
    this.state = {
      // Auth State
      googleAuthenticated: false,
      googleEmail: null,
      googleUserId: null,
      googlePicture: null,
      googleAccessToken: null,
      googleTokenExpiry: null,

      // Bank State
      institutions: [],  // Phase 3.14.0: Array of connected institutions
      itemId: null,
      institutionName: null,
      institutionId: null,
      accounts: null,  // Cached from backend
      accountsLastFetched: null,  // Timestamp

      // Sheet State
      sheetId: null,
      sheetUrl: null,
      sheetName: null,
      sheetOwner: null,
      sheetLastWrite: null,

      // Sync State
      lastSync: null,

      // Onboarding State
      hasSeenWelcome: false,
      hasSeenConnectStep: false,
      hasProgressedToSheetSetup: false,
      hasCompletedInitialOnboarding: false,

      // UI State
      isReAuthenticating: false,  // Phase 3.13.1: Moved from global variable

      // Metadata
      isInitialized: false,
      _initPromise: null
    };

    this.listeners = new Map();

    // Cache TTL configuration (milliseconds)
    this.CACHE_TTL = {
      accounts: 5 * 60 * 1000,  // 5 minutes
      auth: 60 * 60 * 1000       // 1 hour
    };

    // Write batching to avoid rate limits
    this._pendingWrites = {};
    this._writeTimeout = null;
    this._writeBatchDelay = 100; // 100ms debounce
  }

  /**
   * Initialize state from chrome.storage
   * Call this once on extension load
   * Returns promise that resolves when initialization is complete
   */
  async init() {
    // Prevent multiple initializations
    if (this._initPromise) {
      return this._initPromise;
    }

    this._initPromise = (async () => {
      try {
        debug('[StateManager] Initializing from storage...');

        const keys = [
          'googleAuthenticated', 'googleEmail', 'googleUserId', 'googlePicture',
          'googleAccessToken', 'googleTokenExpiry',
          'institutions', 'itemId', 'institutionName', 'institutionId',
          'sheetId', 'sheetUrl', 'sheetName', 'sheetOwner', 'sheetLastWrite',
          'lastSync',
          'hasSeenWelcome', 'hasSeenConnectStep', 'hasProgressedToSheetSetup',
          'hasCompletedInitialOnboarding'
        ];

        const data = await chrome.storage.sync.get(keys);

        // Merge storage data into state
        this.state = { ...this.state, ...data, isInitialized: true };

        debug('[StateManager] Initialized:', {
          authenticated: this.state.googleAuthenticated,
          institutions: (this.state.institutions || []).length,
          hasBank: !!this.state.itemId,
          hasSheet: !!this.state.sheetId,
          email: this.state.googleEmail
        });

        return this.state;
      } catch (error) {
        console.error('[StateManager] Initialization failed:', error);
        this.state.isInitialized = false;
        throw error;
      }
    })();

    return this._initPromise;
  }

  /**
   * Get state value(s) from memory (instant, no async)
   * @param {string|string[]|undefined} keys - Key, array of keys, or undefined for all state
   * @returns {any} State value(s)
   */
  get(keys) {
    if (!this.state.isInitialized) {
      console.warn('[StateManager] get() called before init() completed');
    }

    // Return all state if no keys specified
    if (!keys) {
      return { ...this.state };
    }

    // Return multiple keys as object
    if (Array.isArray(keys)) {
      return keys.reduce((acc, key) => {
        acc[key] = this.state[key];
        return acc;
      }, {});
    }

    // Return single key value
    return this.state[keys];
  }

  /**
   * Update state and persist to storage (batched to avoid rate limits)
   * @param {Object} updates - Key-value pairs to update
   * @param {boolean} immediate - If true, write immediately without batching
   * @returns {Promise<void>} Resolves when write is complete (immediate) or scheduled (batched)
   */
  async set(updates, immediate = false) {
    debug('[StateManager] Setting:', Object.keys(updates));

    // Store old state for notifications
    const oldState = { ...this.state };

    // Update memory state immediately
    this.state = { ...this.state, ...updates };

    // Add to pending writes
    this._pendingWrites = { ...this._pendingWrites, ...updates };

    // Notify subscribers immediately (don't wait for storage)
    this.notify(updates, oldState);

    // Batch writes to avoid rate limits, or write immediately if requested
    if (immediate) {
      return this._flushWrites();
    } else {
      // Phase 3.13.1: Return promise that resolves when flush completes
      // This ensures await stateManager.set() waits for persistence
      return new Promise((resolve, reject) => {
        clearTimeout(this._writeTimeout);
        this._writeTimeout = setTimeout(async () => {
          try {
            await this._flushWrites();
            resolve();
          } catch (error) {
            reject(error);
          }
        }, this._writeBatchDelay);
      });
    }
  }

  /**
   * Flush pending writes to storage
   * @private
   */
  async _flushWrites() {
    if (Object.keys(this._pendingWrites).length === 0) {
      return;
    }

    const toWrite = { ...this._pendingWrites };
    this._pendingWrites = {};

    try {
      debug('[StateManager] Flushing writes to storage:', Object.keys(toWrite));
      await chrome.storage.sync.set(toWrite);
    } catch (error) {
      console.error('[StateManager] Failed to persist state:', error);
      // Don't rollback memory state - notifications already sent
      // Just log the error
      throw error;
    }
  }

  /**
   * Subscribe to state changes
   * @param {string[]} keys - Keys to watch for changes
   * @param {Function} callback - Called when watched keys change (updates, oldState)
   * @returns {Function} Unsubscribe function
   */
  subscribe(keys, callback) {
    const id = `${Date.now()}-${Math.random()}`;
    this.listeners.set(id, { keys, callback });

    debug('[StateManager] Subscriber added:', id, keys);

    // Return unsubscribe function
    return () => {
      debug('[StateManager] Subscriber removed:', id);
      this.listeners.delete(id);
    };
  }

  /**
   * Notify subscribers of state changes
   * @private
   */
  notify(updates, oldState) {
    const changedKeys = Object.keys(updates);

    this.listeners.forEach(({ keys, callback }, id) => {
      // Check if any watched keys changed
      const hasChanges = keys.some(key => changedKeys.includes(key));

      if (hasChanges) {
        try {
          callback(updates, oldState);
        } catch (error) {
          console.error('[StateManager] Subscriber callback error:', id, error);
        }
      }
    });
  }

  /**
   * Check if cached data is stale
   * @param {string} dataType - Type of cached data (e.g., 'accounts')
   * @returns {boolean} True if cache is stale or missing
   */
  isCacheStale(dataType) {
    const lastFetched = this.state[`${dataType}LastFetched`];

    if (!lastFetched) {
      return true;  // No timestamp = stale
    }

    const ttl = this.CACHE_TTL[dataType] || 5 * 60 * 1000;  // Default 5 minutes
    const age = Date.now() - lastFetched;

    return age > ttl;
  }

  /**
   * Clear all state (for logout)
   * @param {boolean} preserveOnboarding - Whether to keep onboarding flag (default: true)
   */
  async clear(preserveOnboarding = true) {
    debug('[StateManager] Clearing state...');

    // Flush any pending writes first
    await this._flushWrites();

    const onboardingFlag = preserveOnboarding ? this.state.hasCompletedInitialOnboarding : false;

    // Phase 3.25.0: Preserve recipesEnabled flag before clearing
    const localData = await chrome.storage.local.get('recipesEnabled');
    const recipesEnabled = localData.recipesEnabled;

    // Reset memory state
    this.state = {
      hasCompletedInitialOnboarding: onboardingFlag,
      isInitialized: true,
      _initPromise: this._initPromise  // Keep init promise
    };

    // Clear pending writes
    this._pendingWrites = {};
    clearTimeout(this._writeTimeout);

    // Clear storage
    await chrome.storage.sync.clear();
    await chrome.storage.local.clear();

    // Restore onboarding flag if needed
    if (onboardingFlag) {
      await chrome.storage.sync.set({ hasCompletedInitialOnboarding: true });
    }

    // Phase 3.25.0: Restore recipesEnabled flag if it existed
    if (recipesEnabled) {
      await chrome.storage.local.set({ recipesEnabled: true });
      debug('[StateManager] Preserved recipesEnabled flag');
    }

    // Notify all subscribers of clear
    this.notify({ _cleared: true }, {});

    debug('[StateManager] State cleared, onboarding preserved:', onboardingFlag);
  }

  /**
   * Phase 3.14.0: Multi-Institution Support Methods
   */

  /**
   * Get all institutions
   * @returns {Array} Array of institution objects
   */
  getInstitutions() {
    return this.state.institutions || [];
  }

  /**
   * Add new institution (append to array)
   * @param {string} itemId - Plaid item ID
   * @param {Object} institutionData - Institution metadata (name, id, accounts, etc.)
   */
  async addInstitution(itemId, institutionData) {
    const institutions = this.getInstitutions();

    // Check if already exists
    const existingIndex = institutions.findIndex(i => i.itemId === itemId);
    if (existingIndex >= 0) {
      // Update existing
      institutions[existingIndex] = {
        ...institutions[existingIndex],
        ...institutionData,
        itemId
      };
    } else {
      // Add new
      institutions.push({
        itemId,
        ...institutionData,
        connected_at: Date.now()
      });
    }

    await this.set({ institutions });

    // Backward compatibility: Set first institution as legacy itemId
    if (institutions.length > 0) {
      await this.set({
        itemId: institutions[0].itemId,
        institutionName: institutions[0].institutionName,
        institutionId: institutions[0].institutionId
      });
    }

    debug('[StateManager] Institution added:', institutionData.institutionName);
  }

  /**
   * Remove institution by itemId
   * @param {string} itemId - Plaid item ID to remove
   */
  async removeInstitution(itemId) {
    const institutions = this.getInstitutions();
    const filtered = institutions.filter(i => i.itemId !== itemId);
    await this.set({ institutions: filtered });

    // Update legacy fields if we removed the first institution
    if (filtered.length > 0) {
      await this.set({
        itemId: filtered[0].itemId,
        institutionName: filtered[0].institutionName,
        institutionId: filtered[0].institutionId
      });
    } else {
      // No institutions left, clear legacy fields
      await this.set({
        itemId: null,
        institutionName: null,
        institutionId: null
      });
    }

    debug('[StateManager] Institution removed:', itemId);
  }

  /**
   * Get institution by itemId
   * @param {string} itemId - Plaid item ID
   * @returns {Object|undefined} Institution object or undefined
   */
  getInstitution(itemId) {
    const institutions = this.getInstitutions();
    return institutions.find(i => i.itemId === itemId);
  }

  /**
   * Update institution cache
   * @param {string} itemId - Plaid item ID
   * @param {Array} accounts - Account data
   * @param {Object} metadata - Additional metadata (institutionName, institutionId)
   */
  async updateInstitutionCache(itemId, accounts, metadata = {}) {
    const institutions = this.getInstitutions();
    const index = institutions.findIndex(i => i.itemId === itemId);

    if (index >= 0) {
      institutions[index] = {
        ...institutions[index],
        accounts,
        accounts_cached_at: Date.now(),
        ...metadata
      };
      await this.set({ institutions });
      debug('[StateManager] Institution cache updated:', itemId);
    }
  }

  /**
   * Check if any institution cache is stale
   * @returns {boolean} True if any institution has stale cache
   */
  isAnyCacheStale() {
    const institutions = this.getInstitutions();
    const now = Date.now();
    const staleThreshold = 5 * 60 * 1000; // 5 minutes

    return institutions.some(inst => {
      const cacheAge = now - (inst.accounts_cached_at || 0);
      return cacheAge > staleThreshold;
    });
  }

  /**
   * Utility: Check if user is fully connected (bank + sheet)
   * @returns {boolean}
   */
  isFullyConnected() {
    const hasInstitutions = (this.state.institutions || []).length > 0;
    const hasLegacyItemId = !!this.state.itemId;
    return !!(( hasInstitutions || hasLegacyItemId) && this.state.sheetId);
  }

  /**
   * Utility: Check if user is authenticated with Google
   * @returns {boolean}
   */
  isAuthenticated() {
    return !!this.state.googleAuthenticated;
  }

  /**
   * Utility: Get cached accounts if available
   * @returns {Array|null}
   */
  getCachedAccounts() {
    return this.state.accounts;
  }

  /**
   * Utility: Update cached accounts with timestamp
   * @param {Array} accounts - Account data from backend
   * @param {Object} metadata - Additional metadata (institutionName, institutionId)
   */
  async setCachedAccounts(accounts, metadata = {}) {
    await this.set({
      accounts,
      accountsLastFetched: Date.now(),
      ...metadata
    });
  }

  /**
   * Debug: Log current state
   */
  debug() {
    debug('[StateManager] Current State:', {
      initialized: this.state.isInitialized,
      authenticated: this.state.googleAuthenticated,
      email: this.state.googleEmail,
      institutions: (this.state.institutions || []).length,
      hasBank: !!this.state.itemId,
      institution: this.state.institutionName,
      hasSheet: !!this.state.sheetId,
      accountsCached: !!this.state.accounts,
      accountsAge: this.state.accountsLastFetched
        ? Math.round((Date.now() - this.state.accountsLastFetched) / 1000) + 's'
        : 'never',
      onboardingComplete: this.state.hasCompletedInitialOnboarding,
      listeners: this.listeners.size
    });
  }
}

// Create singleton instance
const stateManager = new StateManager();

// Export for ES6 modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = stateManager;
}

// Expose globally for non-module scripts
if (typeof window !== 'undefined') {
  window.StateManager = stateManager;
}
