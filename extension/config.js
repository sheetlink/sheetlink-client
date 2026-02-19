/**
 * SheetLink Extension Configuration
 */

export const CONFIG = {
  // Environment (local dev - auto-set to production in build script)
  ENV: "production",

  // Debug logging (true for local dev - auto-set to false in build script)
  DEBUG: true,

  // Backend URL (production backend)
  BACKEND_URL: "https://api.sheetlink.app",

  // Google OAuth (Web Application client for dynamic extension IDs)
  GOOGLE_CLIENT_ID: "967710910027-qq2tuel7vsi2i06h4h096hbvok8kfmhk.apps.googleusercontent.com",
  GOOGLE_REDIRECT_URI: "http://localhost:3002/oauth/callback",
  GOOGLE_SCOPES: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/userinfo.email"
  ],
  GOOGLE_RECIPE_SCOPES: [
    "https://www.googleapis.com/auth/spreadsheets",
    "https://www.googleapis.com/auth/drive.file",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/script.projects"
  ]
};
