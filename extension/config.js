/**
 * SheetLink Extension Configuration
 *
 * Toggle between sandbox and production modes
 */

export const CONFIG = {
  // Environment: "sandbox" or "production"
  ENV: "sandbox",

  // Backend URL (sandbox backend deployed on Railway with custom domain)
  BACKEND_URL: "https://api-sandbox.sheetlink.app",

  // Sandbox Mode Labels
  SANDBOX_LABEL: "🧪 Sandbox Mode",
  SANDBOX_TAGLINE: "Demo Data Only",

  // Plaid Configuration
  DEMO_INSTITUTION: "ins_109508", // First Platypus Bank
  DEMO_INSTITUTION_NAME: "First Platypus Bank",

  // Demo Data
  DEMO_TRANSACTIONS_PATH: "assets/demo/transactions.json",

  // Copy Variants
  COPY: {
    sandbox: {
      welcomeTitle: "Welcome to SheetLink",
      welcomeSubtitle: "Sandbox Preview",
      welcomeDescription: "This demo uses Plaid's sandbox environment. You'll connect to sample institutions and see mock data — not your real bank.",
      connectButton: "Connect to Sandbox",
      connectedInstitution: (name) => `${name} (Sandbox)`,
      syncButton: "Sync Sample Data",
      resetButton: "Reset Sandbox",
      modeLabel: "🧪 Sandbox",
      disclaimer: "Sandbox mode uses test data. Real banks coming soon."
    },
    production: {
      welcomeTitle: "Welcome to SheetLink",
      welcomeSubtitle: "Connect Your Bank",
      welcomeDescription: "SheetLink connects your bank to Google Sheets via Plaid. Your credentials are encrypted and never stored.",
      connectButton: "Connect Bank via Plaid",
      connectedInstitution: (name) => name,
      syncButton: "Sync Now",
      resetButton: "Disconnect Bank",
      modeLabel: "🔒 Live Mode",
      disclaimer: "Your data is encrypted and secure."
    }
  },

  // Get current environment copy
  get currentCopy() {
    return this.COPY[this.ENV];
  },

  // Check if in sandbox mode
  get isSandbox() {
    return this.ENV === "sandbox";
  }
};
