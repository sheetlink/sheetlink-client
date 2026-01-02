/**
 * SheetLink Extension Configuration
 */

export const CONFIG = {
  // Environment (production only)
  ENV: "production",

  // Debug logging (set to false for production to reduce console noise)
  DEBUG: false,

  // Backend URL (production backend)
  BACKEND_URL: "https://api.sheetlink.app",

  // Google OAuth (Web Application client for dynamic extension IDs)
  GOOGLE_CLIENT_ID: "967710910027-qq2tuel7vsi2i06h4h096hbvok8kfmhk.apps.googleusercontent.com",
  GOOGLE_REDIRECT_URI: "https://sheetlink.app/oauth/callback",
  GOOGLE_SCOPES: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/userinfo.email"
  ]
};
