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
        console.log('[StateManager] Initializing from storage...');

        const keys = [
          'googleAuthenticated', 'googleEmail', 'googleUserId', 'googlePicture',
          'googleAccessToken', 'googleTokenExpiry',
          'itemId', 'institutionName', 'institutionId',
          'sheetId', 'sheetUrl', 'sheetName', 'sheetOwner', 'sheetLastWrite',
          'lastSync',
          'hasSeenWelcome', 'hasSeenConnectStep', 'hasProgressedToSheetSetup',
          'hasCompletedInitialOnboarding'
        ];

        const data = await chrome.storage.sync.get(keys);

        // Merge storage data into state
        this.state = { ...this.state, ...data, isInitialized: true };

        console.log('[StateManager] Initialized:', {
          authenticated: this.state.googleAuthenticated,
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
   * @returns {Promise<void>}
   */
  async set(updates, immediate = false) {
    console.log('[StateManager] Setting:', Object.keys(updates));

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
      // Debounce: wait 100ms for more writes before flushing
      clearTimeout(this._writeTimeout);
      this._writeTimeout = setTimeout(() => this._flushWrites(), this._writeBatchDelay);
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
      console.log('[StateManager] Flushing writes to storage:', Object.keys(toWrite));
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

    console.log('[StateManager] Subscriber added:', id, keys);

    // Return unsubscribe function
    return () => {
      console.log('[StateManager] Subscriber removed:', id);
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
    console.log('[StateManager] Clearing state...');

    // Flush any pending writes first
    await this._flushWrites();

    const onboardingFlag = preserveOnboarding ? this.state.hasCompletedInitialOnboarding : false;

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

    // Notify all subscribers of clear
    this.notify({ _cleared: true }, {});

    console.log('[StateManager] State cleared, onboarding preserved:', onboardingFlag);
  }

  /**
   * Utility: Check if user is fully connected (bank + sheet)
   * @returns {boolean}
   */
  isFullyConnected() {
    return !!(this.state.itemId && this.state.sheetId);
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
    console.log('[StateManager] Current State:', {
      initialized: this.state.isInitialized,
      authenticated: this.state.googleAuthenticated,
      email: this.state.googleEmail,
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
