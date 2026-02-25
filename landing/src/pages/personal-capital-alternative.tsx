import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, DollarSign, TrendingUp, AlertCircle, FileSpreadsheet } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';

export default function PersonalCapitalAlternative() {
  const seoTitle = 'Personal Capital Alternative - SheetLink for Google Sheets (2026)';
  const seoDescription = 'Looking for a Personal Capital (Empower) alternative? SheetLink syncs bank transactions to Google Sheets with full data ownership. Free for 7 days, no wealth management sales pitches.';
  const seoUrl = 'https://sheetlink.app/personal-capital-alternative';
  const seoImage = 'https://sheetlink.app/og-image.png';

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What happened to Personal Capital?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Personal Capital rebranded to Empower in 2020. While the app still offers free financial tracking, Empower is primarily a wealth management firm that pushes users toward paid advisory services. Many users report frequent calls from advisors and heavy marketing for $250k+ managed accounts. Users seeking simple expense tracking without sales pressure are looking for alternatives.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How is SheetLink different from Personal Capital/Empower?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink syncs your bank transactions directly to Google Sheets with no wealth management upsells. Your data lives in YOUR Google account forever, not in a company database designed to feed you into a sales funnel. SheetLink is pure expense tracking—no advisor calls, no $1M portfolio minimums, just your transactions in a spreadsheet you control.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can SheetLink track investments like Personal Capital does?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. SheetLink connects to brokerage accounts via Plaid, syncing investment account balances, dividends, and transfers. While Personal Capital offers portfolio analysis tools, SheetLink gives you raw transaction data in Google Sheets where you can build custom portfolio tracking with formulas, charts, and pivot tables—unlimited flexibility.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Will SheetLink try to sell me wealth management services?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'No. SheetLink is an independent, open-source Chrome extension with no wealth management arm. We sync your bank transactions to Google Sheets. No advisor calls. No sales pitches. No VC funding. Just simple bank-to-spreadsheet automation.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="personal capital alternative, empower alternative, personal capital replacement, best alternative to personal capital, free investment tracking, google sheets portfolio tracking, no sales calls" />
        <meta name="author" content={BRAND.name} />

        {/* FAQ Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* OpenGraph */}
        <meta property="og:url" content={seoUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:site_name" content={BRAND.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        <link rel="canonical" href={seoUrl} />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="px-4 pb-12 pt-28">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                <AlertCircle className="h-4 w-4" />
                No wealth management upsells
              </div>
            </motion.div>

            <h1 className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
              The <span className="text-sheetlink-green-700">Personal Capital Alternative</span> Without the Sales Calls
            </h1>

            <p className="mb-8 text-center text-xl text-gray-600 md:text-2xl">
              Track bank transactions and investments without wealth management upsells. Sync everything to Google Sheets. No advisor calls.
            </p>

            <div className="flex justify-center gap-4">
              <a
                href={URLS.chromeStore}
                className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
              >
                <FileSpreadsheet className="h-5 w-5" />
                Install Free Extension
              </a>
              <a
                href="/recipes"
                className="inline-flex items-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-sheetlink-text transition-all hover:border-sheetlink-green-700 hover:shadow-lg"
              >
                See Recipes →
              </a>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              No credit card required. No sales funnel. Just expense tracking.
            </p>
          </div>
        </section>

        {/* Why People Leave Personal Capital */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Why Personal Capital / Empower Users Switch to SheetLink
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Wealth Management Sales Pressure
                </h3>
                <p className="text-gray-600">
                  Empower (formerly Personal Capital) is primarily a wealth management firm. After you sign up, expect calls from advisors pushing you toward managed accounts with $250k+ minimums. Many users just want simple expense tracking.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <X className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Data Privacy Concerns
                </h3>
                <p className="text-gray-600">
                  Your financial data is stored in Empower's database. They use it to identify "qualified" clients for wealth management services. Some users are uncomfortable sharing detailed financial info with a sales-driven company.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Overly Complex for Simple Needs
                </h3>
                <p className="text-gray-600">
                  Personal Capital's dashboard is built for high-net-worth investors. If you just need basic transaction tracking, budgeting, and expense categorization, it's overwhelming. Too many features you'll never use.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SheetLink vs Personal Capital Comparison */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              SheetLink vs Personal Capital / Empower
            </h2>

            <div className="overflow-hidden rounded-lg border-2 border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-sheetlink-green-700">SheetLink</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Personal Capital</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Price</td>
                    <td className="px-6 py-4 text-center text-sheetlink-green-700">Free for 7 days, Pro in beta</td>
                    <td className="px-6 py-4 text-center text-gray-600">Free app</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Sales Calls</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">No advisors, no sales</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600">Advisor calls expected</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Data Ownership</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Your Google account</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600">Empower's database</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Investment Tracking</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Via Plaid, custom analysis</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Advanced portfolio tools</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Customization</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Full spreadsheet power</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600">Limited to Empower UI</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Business Model</td>
                    <td className="px-6 py-4 text-center text-gray-600">Open source extension</td>
                    <td className="px-6 py-4 text-center text-gray-600">Free app feeds advisory sales</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* What SheetLink Does */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Simple Transaction Tracking Without the Sales Funnel
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Automatic bank sync, investment tracking, and YOUR data in YOUR account
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Bank & Credit Card Sync</h3>
                  <p className="text-gray-600">
                    Connect your bank accounts, credit cards, and PayPal via Plaid. Transactions sync automatically into your Google Sheet. Track spending, categorize expenses, monitor cash flow.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Investment Account Tracking</h3>
                  <p className="text-gray-600">
                    Link brokerage accounts (Vanguard, Fidelity, Schwab, etc.). Track account balances, dividends, and transfers. Build custom portfolio analysis with Google Sheets formulas and charts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Net Worth Tracking</h3>
                  <p className="text-gray-600">
                    See all your account balances in one Google Sheet. Calculate net worth with simple formulas. Track assets, liabilities, and equity over time with custom charts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Expense Categorization</h3>
                  <p className="text-gray-600">
                    Add columns for categories, tags, or any custom labels. Use Google Sheets formulas to calculate spending by category, track budgets, and identify trends.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Reports & Analysis</h3>
                  <p className="text-gray-600">
                    Use <a href="/recipes" className="font-semibold text-sheetlink-green-700 underline">SheetLink Recipes</a> to generate spending reports, income summaries, or investment performance analysis. Build custom dashboards with pivot tables and charts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How to Migrate */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              How to Migrate from Personal Capital to SheetLink
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Switch in 4 simple steps
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Export Your Personal Capital Data (Optional)
                  </h3>
                  <p className="text-gray-600">
                    If you want historical transaction data, export from Personal Capital as CSV. You can import this into your Google Sheet for reference.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Install SheetLink Chrome Extension
                  </h3>
                  <p className="text-gray-600">
                    Get the SheetLink extension from the Chrome Web Store. Works on Chrome, Edge, Brave, and any Chromium-based browser.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Connect Your Accounts via Plaid
                  </h3>
                  <p className="text-gray-600">
                    Link your bank accounts, credit cards, and investment accounts. Plaid supports 10,000+ institutions including all major brokerages. Bank-level security, no advisor calls.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Start Syncing & Build Custom Analysis
                  </h3>
                  <p className="text-gray-700">
                    Transactions sync automatically into your Google Sheet. Track spending, analyze investments, calculate net worth. Use <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to generate reports with one click.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-lg bg-blue-50 p-8">
              <p className="text-gray-700">
                <strong className="text-sheetlink-text">Your Google Sheet becomes your <span className="text-sheetlink-green-700">system of record</span></strong> instead of Empower's sales database. You own the data. No wealth management upsells. No advisor calls. Just clean financial tracking.
              </p>
            </div>
          </div>
        </section>

        {/* No Sales Funnel Section */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              No Wealth Management. No Sales Calls. Just Data.
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              SheetLink is an independent, open-source project with no advisory arm
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-600">Personal Capital / Empower</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Wealth management firm first, app second</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Expect calls from advisors after signup</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Free app designed to identify qualified clients</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">$250k+ minimums for managed accounts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Your data used for sales targeting</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-700 bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-green-700">SheetLink</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Independent Chrome extension, no advisory services</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">No advisor calls, ever</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Open source, no VC funding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Your data stays in YOUR Google account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Simple bank-to-spreadsheet automation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-sheetlink-text md:text-5xl">
              Track Your Finances Without Sales Pressure
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Sync bank transactions and investments to Google Sheets. No wealth management upsells. No advisor calls.
            </p>
            <a
              href={URLS.chromeStore}
              className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
            >
              <FileSpreadsheet className="h-5 w-5" />
              Install Free Chrome Extension
            </a>
            <p className="mt-4 text-sm text-gray-500">
              Free for 7 days of history. No credit card required. Open source.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
