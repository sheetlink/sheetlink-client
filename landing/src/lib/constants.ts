export const BRAND = {
  name: 'SheetLink',
  tagline: 'Your bank data, straight into Google Sheets.',
  description:
    'SheetLink connects your real bank accounts to Google Sheets. Free forever for the last 7 days of transactions.',
  colors: {
    green900: '#023820',
    green700: '#0B703A',
    bg: '#F6F7F5',
    accent: '#00C474',
    text: '#1A1A1A',
  },
} as const;

export const URLS = {
  chromeStore: process.env.NEXT_PUBLIC_CHROME_STORE_URL || '#',
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/sheetlink/sheetlink-client',
  docs: '/docs',
  pricing: '/pricing',
  firstSync: '/first-sync',
  userGuide: '/user-guide',
  support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'mailto:support@sheetlink.app',
  privacy: '/privacy',
  terms: '/terms',
  security: '/security',
} as const;

// PRICING: Future pricing model - Coming Soon
export const PRICING = {
  free: {
    name: 'Free',
    price: '$0',
    period: 'forever',
    banks: 'unlimited',
    historyDays: 7,
    features: ['Unlimited banks', 'Last 7 days of transactions', 'Manual sync', 'Google Sheets integration'],
  },
  basic: {
    name: 'Basic',
    priceMonthly: '$1.99',
    priceAnnual: '$0.99',
    period: 'month',
    banks: 'unlimited',
    historyDays: 90,
    features: ['Everything in Free', '90 days of history', 'Auto-sync every 24 hours', 'Per institution pricing'],
  },
  pro: {
    name: 'Pro',
    priceMonthly: '$9.99',
    priceAnnual: '$4.99',
    period: 'month',
    banks: 'unlimited',
    historyDays: 730,
    features: [
      'Everything in Basic',
      '24 months of history',
      'Auto-sync hourly',
      'AI categorization',
      'Rules engine',
      'Split transactions',
      'Multi-institution dashboards',
      'Priority support',
    ],
  },
} as const;

export const STEPS = [
  {
    number: '01',
    title: 'Link Your Bank',
    description:
      'Connect via Plaid. Over 10,000 banks supported. Your credentials never touch our servers.',
  },
  {
    number: '02',
    title: 'Choose Your Sheet',
    description: 'Point to any Google Sheet. SheetLink writes to tabs you control.',
  },
  {
    number: '03',
    title: 'Sync Rows',
    description: 'Hit sync. Transactions flow into your spreadsheet. Build your own dashboards.',
  },
] as const;

// WHY_SHEETLINK: Marketing copy explaining SheetLink's value proposition
// Can be used on landing pages and marketing materials
export const WHY_SHEETLINK = [
  {
    icon: '💸',
    title: '$2/month',
    description: 'Intentionally cheap. No venture capital. No growth-at-all-costs.',
  },
  {
    icon: '🔒',
    title: 'Privacy-First',
    description: 'No tracking. No analytics. Your data stays in your Sheet.',
  },
  {
    icon: '📖',
    title: 'Open Source',
    description: 'Audit the code yourself. Nothing hidden. Nothing sketchy.',
  },
  {
    icon: '👀',
    title: 'Read-Only Access',
    description: 'SheetLink only writes data. We never read your spreadsheets.',
  },
] as const;
