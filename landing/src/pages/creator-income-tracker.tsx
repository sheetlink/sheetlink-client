import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Video, DollarSign, FileSpreadsheet, Zap, Check, AlertCircle, CreditCard, TrendingUp, Users } from 'lucide-react';
import { BRAND, URLS } from '@/lib/constants';

export default function CreatorIncomeTracker() {
  const seoTitle = 'Creator Income Tracker - Track YouTube, Course Sales & Sponsorships in Google Sheets';
  const seoDescription = 'Track YouTube AdSense, Patreon, course sales, and brand deals automatically. Built for content creators managing multiple revenue streams.';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do I track income from multiple creator platforms?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink automatically syncs transactions from your bank account into Google Sheets. This captures YouTube AdSense payouts, Patreon subscriptions, course platform deposits (Gumroad, Teachable, Kajabi), brand sponsorship payments, and affiliate income. All revenue streams appear in one spreadsheet.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can SheetLink help me separate business expenses from creator income?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. SheetLink syncs both income deposits and expense charges from your connected accounts. Add custom columns to categorize transactions as "Income" vs "Business Expense" and tag by revenue source (YouTube, courses, sponsors) or expense type (equipment, software, contractors).'
        }
      },
      {
        '@type': 'Question',
        'name': 'Is this useful for creators who need quarterly tax estimates?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely. Use SheetLink Recipes to generate quarterly income summaries and deductible expense reports. Your Google Sheet becomes your financial system of record for estimated tax payments and year-end filing.'
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://sheetlink.app/creator-income-tracker" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://sheetlink.app/creator-income-tracker" />
        <meta property="og:type" content="website" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <Header />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                <Video className="h-4 w-4" />
                Built for Content Creators
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
                Creator <span className="text-sheetlink-green-700">Income Tracker</span>
              </h1>

              <p className="mb-8 text-xl text-gray-600 md:text-2xl">
                Track YouTube AdSense, Patreon, course sales, brand deals, and creator expenses automatically in Google Sheets.
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
        </section>

        {/* The Creator Income Chaos */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              The Multi-Platform Income Scramble
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Revenue from 7 platforms, expenses on 3 cards, and quarterly taxes looming
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Revenue Stream Chaos
                </h3>
                <p className="text-gray-600">
                  YouTube AdSense deposit. Patreon subscription batch. Gumroad course sale. Brand sponsorship wire. Affiliate commission from Amazon. Which revenue source is growing? Which is declining?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Business Expense Mess
                </h3>
                <p className="text-gray-600">
                  Camera gear on one card. Adobe subscription on another. Freelance video editor via PayPal. Podcast hosting. Email marketing. Are these all deductible? Which card did I use?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Quarterly Tax Panic
                </h3>
                <p className="text-gray-600">
                  Q1 estimated taxes are due. How much did you make from YouTube? Patreon? Courses? What about deductible expenses? You need clean numbers, and you need them now.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What SheetLink Tracks */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Track All Your Creator Revenue & Expenses
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Every income stream and business expense, automatically categorized
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">💰</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Creator Revenue Streams
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Platform ad revenue:</strong> YouTube AdSense, TikTok Creator Fund, Twitch</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Memberships & subscriptions:</strong> Patreon, YouTube memberships, OnlyFans</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Course & digital product sales:</strong> Gumroad, Teachable, Kajabi, Thinkific</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Brand deals & sponsorships:</strong> Wire transfers, PayPal, direct deposits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Affiliate income:</strong> Amazon Associates, creator tool referrals</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">🎥</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Production Expenses
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Camera & audio equipment:</strong> Cameras, microphones, lighting, tripods</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Editing software:</strong> Adobe Premiere, Final Cut Pro, DaVinci Resolve</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Contractor payments:</strong> Video editors, thumbnail designers, VAs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Props & materials:</strong> Product samples, set design, wardrobe</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">🛠️</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Creator Tools & Services
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Hosting platforms:</strong> Podcast hosting, website hosting, email service</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Design & creative tools:</strong> Canva Pro, Adobe Creative Cloud</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Stock assets:</strong> Music licenses, stock footage, sound effects</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Marketing tools:</strong> TubeBuddy, vidIQ, social media schedulers</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">📚</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Business Development
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Education:</strong> Creator courses, business coaching, masterminds</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Conferences & events:</strong> VidCon, creator meetups, networking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Professional services:</strong> Accountant, lawyer, business insurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Office & workspace:</strong> Home office setup, coworking space</span>
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
              Set up once, track all revenue streams automatically
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Connect Your Bank & Business Accounts
                  </h3>
                  <p className="text-gray-600">
                    Link your bank account, business credit cards, and PayPal via Plaid. SheetLink supports 10,000+ financial institutions—all your creator income and expenses in one place.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Transactions Sync to Google Sheets
                  </h3>
                  <p className="text-gray-600">
                    Every YouTube payout, Patreon batch, course sale, brand deal, and business expense appears in your spreadsheet automatically. No manual tracking.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Tag by Revenue Source & Expense Type
                  </h3>
                  <p className="text-gray-600">
                    Add columns for "Revenue Source" (YouTube, Patreon, Courses, Sponsors), "Expense Category", or "Tax Deductible". Your spreadsheet, your system.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Run Recipes for Tax Reports
                  </h3>
                  <p className="text-gray-700">
                    Use <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to instantly generate quarterly income summaries, expense breakdowns by category, or year-end tax reports. One click turns raw transactions into accountant-ready documents.
                  </p>
                </div>
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
                For Accountants & Tax Professionals
              </span>
            </div>

            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Professional Creator Bookkeeping Workflow
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Streamline tax prep for your content creator clients
            </p>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-sheetlink-text">
                The 5-Step Process:
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">1</span>
                  <div>
                    <strong className="text-sheetlink-text">Creator connects accounts via Plaid</strong>
                    <p className="text-gray-600">Bank account, business cards, PayPal. No password sharing. Bank-level security.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">2</span>
                  <div>
                    <strong className="text-sheetlink-text">All transactions sync to shared Google Sheet</strong>
                    <p className="text-gray-600">Income and expenses appear automatically. Real-time updates across all accounts.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">3</span>
                  <div>
                    <strong className="text-sheetlink-text">Run SheetLink Recipes to auto-categorize</strong>
                    <p className="text-gray-600">Generate income summaries by revenue source and expense reports by category.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">4</span>
                  <div>
                    <strong className="text-sheetlink-text">Review and adjust categories</strong>
                    <p className="text-gray-600">Verify deductible expenses, separate personal vs business, flag unusual transactions.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">5</span>
                  <div>
                    <strong className="text-sheetlink-text">Export for quarterly estimates or year-end filing</strong>
                    <p className="text-gray-600">Generate Schedule C reports directly from the Sheet. No proprietary software lock-in.</p>
                  </div>
                </li>
              </ol>

              <div className="mt-8 rounded-lg bg-blue-50 p-6">
                <p className="text-gray-700">
                  <strong className="text-sheetlink-text">Your Google Sheet becomes the <span className="text-sheetlink-green-700">system of record</span></strong> for creator finances. You own the data. Your client owns the data. No exports, no lock-in, just clean spreadsheet bookkeeping for quarterly taxes and annual filings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-sheetlink-text md:text-5xl">
              Stop Scrambling at Tax Time
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Track YouTube, Patreon, course sales, and brand deals automatically. Free for 7 days of history.
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
      </main>

      <Footer />
    </>
  );
}
