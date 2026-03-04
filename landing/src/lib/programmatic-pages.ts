// Centralized data for all programmatic SEO pages
// Add new pages here and they'll automatically appear in hub pages and related sections

export interface ProgrammaticPage {
  title: string;
  slug: string;
  description: string;
  category: 'pricing' | 'how-to' | 'integration';
  keywords?: string[];
}

export const programmaticPages: ProgrammaticPage[] = [
  // Pricing Guides
  {
    title: 'Tiller Money Pricing 2026',
    slug: '/tiller-money-pricing-2026',
    description: 'Complete pricing breakdown for Tiller Money, including plans, features, and cost comparison with SheetLink.',
    category: 'pricing',
    keywords: ['tiller pricing', 'tiller cost', 'tiller money price'],
  },
  {
    title: 'YNAB Pricing 2026',
    slug: '/ynab-pricing-2026',
    description: 'You Need A Budget (YNAB) pricing guide with monthly and annual plans, student discounts, and alternatives.',
    category: 'pricing',
    keywords: ['ynab pricing', 'ynab cost', 'you need a budget price'],
  },
  {
    title: 'Quicken Pricing 2026',
    slug: '/quicken-pricing-2026',
    description: 'Quicken pricing for all editions: Starter, Deluxe, Premier, and Home & Business.',
    category: 'pricing',
    keywords: ['quicken pricing', 'quicken cost', 'quicken price'],
  },
  {
    title: 'Mint Pricing 2026',
    slug: '/mint-pricing-2026',
    description: 'Mint pricing guide (now discontinued) and best alternatives for budget tracking.',
    category: 'pricing',
    keywords: ['mint pricing', 'mint cost', 'mint alternative'],
  },
  {
    title: 'PocketGuard Pricing 2026',
    slug: '/pocketguard-pricing-2026',
    description: 'PocketGuard pricing for free and premium plans. Compare costs and features with alternatives.',
    category: 'pricing',
    keywords: ['pocketguard pricing', 'pocketguard cost', 'pocketguard plus price'],
  },

  // How-To Guides
  {
    title: 'How to Track Dropshipping Expenses',
    slug: '/track-dropshipping-expenses',
    description: 'Complete guide to tracking dropshipping business expenses in Google Sheets with automated bank sync.',
    category: 'how-to',
    keywords: ['dropshipping accounting', 'track dropshipping expenses', 'dropshipping bookkeeping'],
  },
  {
    title: 'Amazon FBA Bookkeeping in Spreadsheets',
    slug: '/amazon-fba-bookkeeping-spreadsheet',
    description: 'How to set up Amazon FBA bookkeeping in Google Sheets with automated transaction imports.',
    category: 'how-to',
    keywords: ['amazon fba accounting', 'fba bookkeeping', 'amazon seller spreadsheet'],
  },

  // Integration Guides
  {
    title: 'Plaid to Google Sheets Integration',
    slug: '/plaid-google-sheets',
    description: 'Connect Plaid to Google Sheets for automated bank transaction syncing. Complete setup guide.',
    category: 'integration',
    keywords: ['plaid google sheets', 'plaid integration', 'plaid api sheets'],
  },
  {
    title: 'Does Tiller Use Plaid?',
    slug: '/does-tiller-use-plaid',
    description: 'Yes, Tiller Money uses Plaid for bank connections. Learn how it works and compare alternatives.',
    category: 'integration',
    keywords: ['tiller plaid', 'tiller bank connection', 'how tiller works'],
  },
];

// Helper functions
export const getPagesByCategory = (category: ProgrammaticPage['category']) => {
  return programmaticPages.filter((page) => page.category === category);
};

export const getRelatedPages = (currentSlug: string, limit: number = 4) => {
  const currentPage = programmaticPages.find((page) => page.slug === currentSlug);
  if (!currentPage) return [];

  // Get pages from same category, excluding current page
  const sameCategoryPages = programmaticPages
    .filter((page) => page.category === currentPage.category && page.slug !== currentSlug)
    .slice(0, limit);

  return sameCategoryPages;
};

export const categoryInfo = {
  pricing: {
    title: 'Pricing Guides',
    slug: '/pricing-guides',
    description: 'Compare pricing for popular personal finance and budgeting tools. All guides updated for 2026.',
    h1: 'Personal Finance Software Pricing Guides',
  },
  'how-to': {
    title: 'How-To Guides',
    slug: '/how-to-guides',
    description: 'Step-by-step guides for managing finances, tracking expenses, and automating bookkeeping in Google Sheets.',
    h1: 'Finance & Bookkeeping How-To Guides',
  },
  integration: {
    title: 'Integration Guides',
    slug: '/integration-guides',
    description: 'Learn how to connect banks to Google Sheets using Plaid and other financial data integrations.',
    h1: 'Bank & Financial Integration Guides',
  },
};
