import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, DollarSign, TrendingUp, Lock, FileSpreadsheet } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';

export default function QuickenAlternative() {
  const seoTitle = 'Quicken Alternative - SheetLink for Google Sheets (2026)';
  const seoDescription = 'Looking for a cheaper Quicken alternative? SheetLink syncs bank transactions to Google Sheets for free (7 days). No desktop software, no $100/year subscription. Own your financial data.';
  const seoUrl = 'https://sheetlink.app/quicken-alternative';
  const seoImage = 'https://sheetlink.app/og-image.png';

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Why look for a Quicken alternative?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Quicken costs $50-180/year depending on the tier, requires desktop software installation, and locks your data in a proprietary format. Many users are looking for more affordable, cloud-based alternatives that give them ownership of their financial data in standard formats like Google Sheets.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How is SheetLink different from Quicken?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink syncs bank transactions directly to Google Sheets instead of proprietary desktop software. Your data lives in YOUR Google account, not locked in Quicken\'s format. SheetLink is free for 7 days of transaction history (perfect for budgeting), works in any browser, and has Pro tier for extended history. No $100+/year subscription required.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can SheetLink handle all my accounts like Quicken does?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. SheetLink connects to 10,000+ banks, credit unions, and credit cards via Plaid (the same technology Quicken uses). Connect multiple checking accounts, savings accounts, credit cards, and PayPal. All transactions sync into one Google Sheet automatically.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How much cheaper is SheetLink than Quicken?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Quicken ranges from $50/year (Simplifi) to $180/year (Home & Business). SheetLink is free forever for 7 days of transaction history with no ads. Pro tier with extended history is available in beta/early access. Even the Pro tier is significantly more affordable than Quicken.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="quicken alternative, cheaper than quicken, quicken replacement, best alternative to quicken, free quicken alternative, google sheets budgeting, quicken simplifi alternative" />
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
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <DollarSign className="h-4 w-4" />
                More affordable than Quicken
              </div>
            </motion.div>

            <h1 className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
              The <span className="text-sheetlink-green-700">Quicken Alternative</span> That Gives You Your Data Back
            </h1>

            <p className="mb-8 text-center text-xl text-gray-600 md:text-2xl">
              Stop paying $50-180/year for desktop software. Sync your bank transactions to Google Sheets automatically. Free for 7 days of history.
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
              No credit card required. No desktop software. Works on Mac, Windows, Linux, and Chromebook.
            </p>
          </div>
        </section>

        {/* Why People Leave Quicken */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Why Quicken Users Switch to SheetLink
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Expensive Annual Subscriptions
                </h3>
                <p className="text-gray-600">
                  Quicken Simplifi: $50/year. Quicken Deluxe: $60/year. Premier: $90/year. Home & Business: $180/year. Every year. Forever.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Lock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Data Lock-In
                </h3>
                <p className="text-gray-600">
                  Your financial data is trapped in Quicken's proprietary format. Want to switch? Export to QIF/CSV and pray it works. Your data should be YOURS.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <X className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Desktop Software Required
                </h3>
                <p className="text-gray-600">
                  Install Quicken on Windows or Mac. Update it regularly. Can't access your finances from a Chromebook or friend's computer. It's 2026—why desktop software?
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SheetLink vs Quicken Comparison */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              SheetLink vs Quicken
            </h2>

            <div className="overflow-hidden rounded-lg border-2 border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-sheetlink-green-700">SheetLink</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Quicken</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Price</td>
                    <td className="px-6 py-4 text-center text-sheetlink-green-700">Free for 7 days, Pro in beta</td>
                    <td className="px-6 py-4 text-center text-gray-600">$50-180/year</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
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
                      <p className="text-sm text-gray-600">Proprietary format</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Platform</td>
                    <td className="px-6 py-4 text-center text-gray-600">Any browser (Mac, Windows, Linux, Chromebook)</td>
                    <td className="px-6 py-4 text-center text-gray-600">Desktop only (Mac, Windows)</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Bank Sync</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">10,000+ banks via Plaid</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">14,000+ banks</p>
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
                      <p className="text-sm text-gray-600">Limited to Quicken UI</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Share with Accountant</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Share Google Sheet link</p>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">Export QIF/CSV</td>
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
              Everything You Need from Quicken, In Google Sheets
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Automatic bank sync, unlimited customization, and YOUR data in YOUR account
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Automatic Bank Sync</h3>
                  <p className="text-gray-600">
                    Connect your bank, credit cards, and PayPal via Plaid. Transactions sync automatically into your Google Sheet. No manual CSV downloads.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Category Tracking & Custom Tags</h3>
                  <p className="text-gray-600">
                    Add columns for categories, tags, notes, or anything you need. Use Google Sheets formulas, pivot tables, and charts. No proprietary limitations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Budget Tracking</h3>
                  <p className="text-gray-600">
                    Create your own budgets using Google Sheets formulas. Track spending by category, set alerts, visualize with charts. You have full control.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Investment Tracking</h3>
                  <p className="text-gray-600">
                    Connect your brokerage accounts. Track investment account values, dividends, and transfers alongside your bank accounts.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Tax Prep & Accountant Sharing</h3>
                  <p className="text-gray-600">
                    Share your Google Sheet with your accountant. Run <a href="/recipes" className="font-semibold text-sheetlink-green-700 underline">SheetLink Recipes</a> to generate expense summaries and income reports instantly.
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
              How to Migrate from Quicken to SheetLink
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
                    Export Your Quicken Data (Optional)
                  </h3>
                  <p className="text-gray-600">
                    If you want historical data, export your transactions from Quicken as a CSV file. You can import this into your Google Sheet later.
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
                    Link your bank accounts, credit cards, and investment accounts. Plaid supports 10,000+ institutions with bank-level security.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Start Syncing & Run Recipes
                  </h3>
                  <p className="text-gray-700">
                    Transactions sync automatically into your Google Sheet. Use <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to generate budgets, expense summaries, and tax reports with one click.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-lg bg-blue-50 p-8">
              <p className="text-gray-700">
                <strong className="text-sheetlink-text">Your Google Sheet becomes your <span className="text-sheetlink-green-700">system of record</span></strong> instead of Quicken's proprietary database. You own the data. You control the format. No more vendor lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Stop Paying Quicken's Annual Subscription
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              SheetLink is more affordable and gives you full data ownership
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-600">Quicken Pricing</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Simplifi: <strong>$50/year</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Deluxe: <strong>$60/year</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Premier: <strong>$90/year</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Home & Business: <strong>$180/year</strong></span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Desktop software required</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-700 bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-green-700">SheetLink Pricing</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Free tier:</strong> 7 days of history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Pro tier:</strong> Extended history (beta/early access)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Pro pricing TBD - contact for early access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Works in any browser (no software)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Data stays in YOUR Google account</span>
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
              Ready to Own Your Financial Data?
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Stop paying Quicken's annual subscription. Sync your bank transactions to Google Sheets for free.
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
