export const BRAND = {
  name: 'SheetLink',
  tagline: 'Forget dashboards. Feed your spreadsheet.',
  description:
    'Try SheetLink with Plaid Sandbox demo data. Test transaction syncing before connecting real accounts. Open beta launching soon.',
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
  github: process.env.NEXT_PUBLIC_GITHUB_URL || 'https://github.com/sheetlink/sheetlink',
  docs: 'https://docs.sheetlink.app',
  support: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'mailto:support@sheetlink.app',
  privacy: '/privacy',
  terms: '/terms',
} as const;

// PRICING: Future pricing model - not active during sandbox demo phase
// Kept for component compatibility, should not be displayed in sandbox-only UI
export const PRICING = {
  free: {
    name: 'Free',
    price: '$0',
    period: 'forever',
    banks: 1,
    features: ['1 bank account', 'Manual sync', 'All core features', 'Open source code'],
  },
  pro: {
    name: 'Pro',
    price: '$2',
    period: 'month',
    banks: 'unlimited',
    features: [
      'Unlimited banks',
      'Auto-sync (hourly)',
      'AI categorization',
      'Priority support',
    ],
  },
} as const;

export const STEPS = [
  {
    number: '01',
    title: 'Link Your Bank',
    description:
      'Connect via Plaid — 10,000+ banks supported. Your credentials never touch our servers.',
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

// WHY_SHEETLINK: Future marketing copy - references pricing not active during sandbox demo
// Kept for component compatibility, should not be displayed in sandbox-only UI
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
