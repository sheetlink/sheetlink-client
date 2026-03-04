// Centralized data for all programmatic SEO pages
// Add new pages here and they'll automatically appear in hub pages and related sections

export interface ProgrammaticPage {
  title: string;
  slug: string;
  description: string;
  category: 'pricing' | 'how-to' | 'integration' | 'comparison';
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
  {
    title: 'Sync Bank to Google Sheets',
    slug: '/sync-bank-to-google-sheets',
    description: 'Privacy-first guide to syncing bank transactions to Google Sheets. Manual sync gives you control over your financial data.',
    category: 'how-to',
    keywords: ['sync bank to google sheets', 'bank transactions google sheets', 'plaid google sheets integration'],
  },
  {
    title: 'Google Sheets Bookkeeping Guide',
    slug: '/google-sheets-bookkeeping',
    description: 'Automate small business bookkeeping in Google Sheets with privacy-first bank sync. Track income, expenses, and cash flow.',
    category: 'how-to',
    keywords: ['google sheets bookkeeping', 'sheets accounting', 'small business bookkeeping'],
  },
  {
    title: 'Google Sheets Budgeting Guide',
    slug: '/google-sheets-budgeting',
    description: 'Build automated budgets in Google Sheets. Track spending by category, monitor cash flow, and stay on budget with manual sync.',
    category: 'how-to',
    keywords: ['google sheets budgeting', 'budget template google sheets', 'track spending sheets'],
  },
  {
    title: 'Excel Budgeting Tool Alternative',
    slug: '/excel-budgeting-tool',
    description: 'Excel-style budgeting in Google Sheets with automated bank sync. All the power of Excel with privacy-first manual sync control.',
    category: 'how-to',
    keywords: ['excel budgeting', 'google sheets budget', 'automated excel budget'],
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

  // Comparison & Alternative Pages
  {
    title: 'Tiller Money Alternative',
    slug: '/tiller-alternative',
    description: 'SheetLink is a more affordable alternative to Tiller Money. Compare pricing, features, and bank sync capabilities.',
    category: 'comparison',
    keywords: ['tiller alternative', 'tiller money alternative', 'cheaper than tiller', 'tiller competitor'],
  },
  {
    title: 'YNAB Alternative',
    slug: '/ynab-alternative',
    description: 'Looking for a YNAB alternative? SheetLink offers flexible budgeting in Google Sheets at a fraction of the cost.',
    category: 'comparison',
    keywords: ['ynab alternative', 'you need a budget alternative', 'cheaper than ynab', 'ynab competitor'],
  },
  {
    title: 'PocketGuard Alternative',
    slug: '/pocketguard-alternative',
    description: 'SheetLink is a powerful PocketGuard alternative with manual sync control and Google Sheets flexibility.',
    category: 'comparison',
    keywords: ['pocketguard alternative', 'pocketguard competitor', 'better than pocketguard'],
  },
  {
    title: 'Quicken Alternative',
    slug: '/quicken-alternative',
    description: 'Modern Quicken alternative for Google Sheets. SheetLink syncs bank transactions at a lower cost.',
    category: 'comparison',
    keywords: ['quicken alternative', 'quicken competitor', 'cheaper than quicken', 'quicken replacement'],
  },
  {
    title: 'Mint Alternative',
    slug: '/mint-alternative',
    description: 'Mint shut down in 2024. SheetLink is the best Mint alternative for Google Sheets budgeting.',
    category: 'comparison',
    keywords: ['mint alternative', 'mint replacement', 'mint shutdown', 'what replaced mint'],
  },
  {
    title: 'Personal Capital Alternative',
    slug: '/personal-capital-alternative',
    description: 'SheetLink offers a simpler Personal Capital alternative focused on transaction tracking in Google Sheets.',
    category: 'comparison',
    keywords: ['personal capital alternative', 'personal capital competitor', 'empower alternative'],
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

// Smart related pages: uses keyword matching + category diversity for better internal linking
export const getSmartRelatedPages = (currentSlug: string, limit: number = 4) => {
  const currentPage = programmaticPages.find((page) => page.slug === currentSlug);
  if (!currentPage) return [];

  // Score each page based on keyword overlap and category diversity
  const scoredPages = programmaticPages
    .filter((page) => page.slug !== currentSlug)
    .map((page) => {
      let score = 0;

      // Keyword overlap scoring (highest priority)
      if (currentPage.keywords && page.keywords) {
        const currentKeywords = currentPage.keywords.map(k => k.toLowerCase());
        const pageKeywords = page.keywords.map(k => k.toLowerCase());

        // Count matching keywords
        const matches = currentKeywords.filter(k =>
          pageKeywords.some(pk => pk.includes(k) || k.includes(pk))
        ).length;

        score += matches * 10; // 10 points per keyword match
      }

      // Slug-based keyword matching (e.g., "tiller" in both slugs)
      const currentSlugWords = currentSlug.split(/[-\/]/).filter(w => w.length > 3);
      const pageSlugWords = page.slug.split(/[-\/]/).filter(w => w.length > 3);
      const slugMatches = currentSlugWords.filter(w =>
        pageSlugWords.includes(w)
      ).length;
      score += slugMatches * 5; // 5 points per slug word match

      // Category diversity bonus - prefer different categories for broader context
      if (page.category !== currentPage.category) {
        score += 3; // 3 point bonus for cross-category links
      }

      // Same category bonus - still valuable
      if (page.category === currentPage.category) {
        score += 2; // 2 points for same category
      }

      return { ...page, score };
    })
    .filter((page) => page.score > 0) // Only include pages with some relevance
    .sort((a, b) => b.score - a.score) // Sort by score descending
    .slice(0, limit);

  return scoredPages;
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
