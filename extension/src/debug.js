// debug.js - Global debug logging utility
// Default to true in development, will be false in production builds
window.SHEETLINK_DEBUG = true;

// Global debug logging utility for all scripts
window.debug = function(...args) {
  if (window.SHEETLINK_DEBUG) {
    console.log(...args);
  }
};
