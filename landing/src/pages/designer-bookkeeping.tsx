import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartRelatedPages from '@/components/SmartRelatedPages';
import { motion } from 'framer-motion';
import { Palette, DollarSign, FileSpreadsheet, Zap, Check, AlertCircle, CreditCard, TrendingUp, Users } from 'lucide-react';
import { BRAND, URLS } from '@/lib/constants';

export default function DesignerBookkeeping() {
  const seoTitle = 'Designer Bookkeeping - Track Freelance Design Income in Google Sheets';
  const seoDescription = 'Privacy-first designer bookkeeping. Sync Upwork, Fiverr, and PayPal payments to Google Sheets when YOU choose. Track Adobe subscriptions, design tool expenses, and client invoices. Manual sync gives you control.';
  const slug = '/designer-bookkeeping';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do I track freelance design income from multiple platforms?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink syncs transactions when you click sync (manual control for privacy), capturing income from Upwork, Fiverr, direct client payments, and any other source that deposits into your accounts. Perfect for weekly or monthly financial reviews. All income appears in one spreadsheet for easy tracking and tax prep.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can SheetLink help me track design tool subscriptions?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. SheetLink syncs all your bank and credit card transactions, including recurring subscriptions like Adobe Creative Cloud, Figma, Canva Pro, font licenses, stock photo sites, and other design tools. You can categorize these as business expenses and track total subscription costs monthly.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is this useful for designers who work with accountants?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely. Your accountant can access the Google Sheet directly to review categorized transactions. Use SheetLink Recipes to generate expense summaries and income reports instantly. Your spreadsheet becomes the system of record instead of requiring exports from proprietary software.'
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`https://sheetlink.app${slug}`}
      />

      <StructuredData
        type="article"
        headline={seoTitle}
        description={seoDescription}
        url={`https://sheetlink.app${slug}`}
        datePublished="2026-03-05T00:00:00Z"
      />

      <StructuredData
        type="breadcrumb"
        items={[
          { name: 'Home', url: 'https://sheetlink.app' },
          { name: 'How-To Guides', url: 'https://sheetlink.app/how-to-guides' },
          { name: 'Designer Bookkeeping', url: `https://sheetlink.app${slug}` }
        ]}
      />

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <Breadcrumbs category="how-to" pageTitle="Designer Bookkeeping" />

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-purple-100 px-4 py-2 text-sm font-semibold text-purple-700">
                  <Palette className="h-4 w-4" />
                  Built for Freelance Designers
                </div>

                <h1 className="mb-6 text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
                  Designer <span className="text-sheetlink-green-700">Bookkeeping</span>
                </h1>

              <p className="mb-8 text-xl text-gray-600 md:text-2xl">
                Track Upwork payouts, Fiverr payments, PayPal transfers, and Adobe subscriptions in Google Sheets. Manual sync gives you complete control.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={URLS.chromeStore}
                  className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  Start Tracking Income
                </a>
                <a
                  href="/recipes"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-sheetlink-text transition-all hover:border-sheetlink-green-700 hover:shadow-lg"
                >
                  See Recipes →
                </a>
              </div>

              <p className="mt-6 text-sm text-gray-500">
                Free for 7 days of transaction history. No credit card required.
              </p>
            </motion.div>
          </div>
          </div>
        </section>

        {/* The Designer Payment Chaos */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              The Freelance Designer Payment Chaos
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Income from everywhere, expenses on multiple cards, and tax season panic
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Payment Platform Hell
                </h3>
                <p className="text-gray-600">
                  Upwork deposits. Fiverr transfers. PayPal invoices. Direct bank payments. Venmo from small clients. Which payment was for which project?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Subscription Overload
                </h3>
                <p className="text-gray-600">
                  Adobe Creative Cloud. Figma Pro. Canva. Font licenses. Stock photos. Design assets. Icon sets. Are you still using that $19/month tool you signed up for last year?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Tax Season Scramble
                </h3>
                <p className="text-gray-600">
                  Download Upwork CSV. Export Fiverr statement. Log into PayPal. Find that one client payment. Match expenses to projects. Your accountant needs this by Friday.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What SheetLink Tracks */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Track All Your Designer Income & Expenses
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Every transaction syncs when you click, organized in Google Sheets
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">💰</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Income Tracking
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Platform payments:</strong> Upwork, Fiverr, 99designs, Dribbble</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Payment processors:</strong> PayPal, Stripe, Square, Venmo</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Direct deposits:</strong> Client wire transfers and ACH payments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Passive income:</strong> Template sales, font royalties, design assets</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">🎨</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Design Tools & Software
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Adobe Suite:</strong> Creative Cloud, individual app subscriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Design platforms:</strong> Figma, Sketch, Canva Pro, Affinity Designer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Assets & resources:</strong> Font licenses, stock photos, icon sets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Productivity tools:</strong> Project management, time tracking, invoicing</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">💻</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Hardware & Equipment
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Primary equipment:</strong> MacBook, iPad Pro, Wacom tablet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Display setup:</strong> 4K monitors, color calibration tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Photography gear:</strong> Camera, lenses for product mockups</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Workspace:</strong> Desk, chair, lighting for studio setup</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">📚</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Professional Development
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Education:</strong> Skillshare, Domestika, design courses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Conferences:</strong> Design conferences, networking events</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Books & resources:</strong> Design books, typography guides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Memberships:</strong> AIGA, design communities, portfolios</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              How It Works
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Set up once, sync when you choose
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Connect Your Bank & PayPal
                  </h3>
                  <p className="text-gray-600">
                    Link your bank account, credit cards, and PayPal via Plaid (bank-level security). SheetLink supports 10,000+ financial institutions.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Transactions Sync When You Click
                  </h3>
                  <p className="text-gray-600">
                    Every Upwork payout, Fiverr payment, PayPal transfer, and subscription charge appears in your spreadsheet when you click sync. Manual control for privacy. Perfect for weekly or monthly reviews. No CSV downloads.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Categorize & Tag
                  </h3>
                  <p className="text-gray-600">
                    Add columns for project names, client tags, expense categories, or tax deductions. Your spreadsheet, your system.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Run Recipes for Instant Reports
                  </h3>
                  <p className="text-gray-700">
                    Use <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to instantly generate expense summaries, income reports by client, or tax categorization. One click turns raw transactions into professional reports for your accountant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Manual Sync Works */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Why Manual Sync Works for Designers
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Control when your financial data updates
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Privacy First
                </h3>
                <p className="text-gray-600">
                  You decide when to sync your transactions. No background processes constantly monitoring your accounts. Manual sync gives you complete control over your financial data.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Fits Your Workflow
                </h3>
                <p className="text-gray-600">
                  Most designers review finances weekly or monthly. Click sync during your financial review, categorize transactions, and you're done. No need for constant real-time updates.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Intentional Review
                </h3>
                <p className="text-gray-600">
                  Manual sync encourages you to actually look at your finances. Review income, spot unusual expenses, and stay on top of your design business health.
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-sm">
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Lower Cost
                </h3>
                <p className="text-gray-600">
                  Privacy-first manual sync means lower infrastructure costs. SheetLink is $3.99/month vs competitors at $10-30/month for auto-sync features you might not need.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Workflow */}
        <section className="bg-blue-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <div className="mb-4 flex items-center justify-center gap-2">
              <Users className="h-6 w-6 text-blue-600" />
              <span className="text-sm font-semibold uppercase tracking-wide text-blue-600">
                For Accountants & Bookkeepers
              </span>
            </div>

            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Professional Review Workflow
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Streamline bookkeeping for your freelance designer clients
            </p>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-sheetlink-text">
                The 5-Step Process:
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">1</span>
                  <div>
                    <strong className="text-sheetlink-text">Client connects their accounts via Plaid</strong>
                    <p className="text-gray-600">Designer authorizes bank, credit cards, and PayPal. No password sharing required.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">2</span>
                  <div>
                    <strong className="text-sheetlink-text">Transactions sync into a shared Google Sheet</strong>
                    <p className="text-gray-600">All income and expenses appear when you click sync (manual control for privacy). Perfect for weekly or monthly reviews.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">3</span>
                  <div>
                    <strong className="text-sheetlink-text">Run a SheetLink Recipe to auto-categorize</strong>
                    <p className="text-gray-600">One click generates expense summaries and income breakdowns.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">4</span>
                  <div>
                    <strong className="text-sheetlink-text">Review and adjust categories</strong>
                    <p className="text-gray-600">Fix misclassifications, add notes, match expenses to projects.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">5</span>
                  <div>
                    <strong className="text-sheetlink-text">Export final summary for tax filing</strong>
                    <p className="text-gray-600">Generate reports directly from the Sheet. No proprietary software lock-in.</p>
                  </div>
                </li>
              </ol>

              <div className="mt-8 rounded-lg bg-blue-50 p-6">
                <p className="text-gray-700">
                  <strong className="text-sheetlink-text">Your Google Sheet becomes the <span className="text-sheetlink-green-700">system of record</span></strong> instead of a proprietary dashboard. You own the data. Your client owns the data. No exports, no lock-in, just clean spreadsheet bookkeeping.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-sheetlink-text md:text-5xl">
              Stop Chasing Payments Across Platforms
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Track every Upwork payout, Fiverr payment, and design tool subscription when you sync. Manual control, maximum privacy. Free for 7 days of history.
            </p>
            <a
              href={URLS.chromeStore}
              className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
            >
              <FileSpreadsheet className="h-5 w-5" />
              Install Free Chrome Extension
            </a>
            <p className="mt-4 text-sm text-gray-500">
              Open source. Independent. No VC funding.
            </p>
          </div>
        </section>

        <div className="mx-auto max-w-4xl px-4 py-8">
          <SmartRelatedPages currentSlug="/designer-bookkeeping" />
        </div>
      </main>

      <Footer />
    </>
  );
}
