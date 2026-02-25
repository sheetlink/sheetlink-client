import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, DollarSign, TrendingUp, Lock, FileSpreadsheet } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';

export default function PocketGuardAlternative() {
  const seoTitle = 'PocketGuard Alternative - SheetLink for Google Sheets (2026)';
  const seoDescription = 'Looking for a PocketGuard alternative? SheetLink syncs bank transactions to Google Sheets with full data ownership. Free for 7 days, no $100/year subscription required.';
  const seoUrl = 'https://sheetlink.app/pocketguard-alternative';
  const seoImage = 'https://sheetlink.app/og-image.png';

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Why look for a PocketGuard alternative?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'PocketGuard Plus costs $99.99/year or $12.99/month. Many users want more affordable options with better data ownership. PocketGuard locks your financial data in their app—if you stop paying, you lose access to your transaction history. Users are seeking alternatives that let them own their data in standard formats like Google Sheets.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How is SheetLink different from PocketGuard?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink syncs your bank transactions directly to Google Sheets instead of a proprietary app. Your data lives in YOUR Google account forever, not locked in PocketGuard\'s database. SheetLink is free for 7 days of transaction history (perfect for budgeting) with Pro tier available in beta. You own your financial data—no vendor lock-in.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can SheetLink track my spending like PocketGuard does?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. SheetLink syncs all your bank and credit card transactions into Google Sheets automatically. Add custom columns for categories, budgets, and spending limits. Use Google Sheets formulas, pivot tables, and charts to analyze spending however you want—unlimited customization vs PocketGuard\'s fixed interface.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is SheetLink cheaper than PocketGuard Plus?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. PocketGuard Plus costs $99.99/year. SheetLink is free forever for 7 days of transaction history with no ads. Pro tier with extended history is available in beta/early access at a more affordable price point. Even the Pro tier is significantly cheaper than PocketGuard Plus.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="pocketguard alternative, cheaper than pocketguard, pocketguard replacement, best alternative to pocketguard, free budgeting app, google sheets budgeting, pocketguard plus alternative" />
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
              <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                <DollarSign className="h-4 w-4" />
                More affordable than PocketGuard Plus
              </div>
            </motion.div>

            <h1 className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
              The <span className="text-sheetlink-green-700">PocketGuard Alternative</span> That Lets You Own Your Data
            </h1>

            <p className="mb-8 text-center text-xl text-gray-600 md:text-2xl">
              Stop paying $99.99/year for budget tracking. Sync your bank transactions to Google Sheets automatically. Free for 7 days of history.
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
              No credit card required. Works on Mac, Windows, Linux, and Chromebook.
            </p>
          </div>
        </section>

        {/* Why People Leave PocketGuard */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Why PocketGuard Users Switch to SheetLink
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Expensive Plus Subscription
                </h3>
                <p className="text-gray-600">
                  PocketGuard Plus costs $99.99/year or $12.99/month. The free version is heavily limited—only 2 accounts, basic budgets, no export. Most features require Plus.
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
                  Your transaction history is trapped in PocketGuard's app. Stop paying? You lose access to your financial history. Export is limited. Your data should be YOURS.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <X className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Limited Customization
                </h3>
                <p className="text-gray-600">
                  PocketGuard's budget categories and spending analysis are preset. Can't add custom fields, advanced formulas, or build your own reports. You're stuck with their interface.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SheetLink vs PocketGuard Comparison */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              SheetLink vs PocketGuard
            </h2>

            <div className="overflow-hidden rounded-lg border-2 border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-sheetlink-green-700">SheetLink</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">PocketGuard</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Price</td>
                    <td className="px-6 py-4 text-center text-sheetlink-green-700">Free for 7 days, Pro in beta</td>
                    <td className="px-6 py-4 text-center text-gray-600">$99.99/year Plus</td>
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
                      <p className="text-sm text-gray-600">Locked in app</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Account Limits</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Unlimited accounts</p>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">Free: 2 accounts, Plus: Unlimited</td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
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
                      <p className="text-sm text-gray-600">Preset categories only</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Export Data</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Already in Google Sheets</p>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">Limited CSV export (Plus only)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Share with Accountant</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Share Google Sheet link</p>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">Export CSV manually</td>
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
              Everything You Need from PocketGuard, In Google Sheets
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Automatic bank sync, unlimited customization, and YOUR data in YOUR account
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Automatic Transaction Sync</h3>
                  <p className="text-gray-600">
                    Connect unlimited bank accounts, credit cards, and PayPal via Plaid. Transactions sync automatically into your Google Sheet. No manual entry.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Custom Budgets & Categories</h3>
                  <p className="text-gray-600">
                    Create any budget categories you want. Add custom columns, formulas, conditional formatting. Use pivot tables and charts. No preset limitations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Spending Analysis</h3>
                  <p className="text-gray-600">
                    Track spending by category, merchant, or any custom tag. Use Google Sheets formulas to calculate "In My Pocket" money or any other metric you need.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Debt Tracking</h3>
                  <p className="text-gray-600">
                    Track credit card balances, loan payments, and debt payoff progress. Create custom debt payoff calculators with Google Sheets formulas.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Reports & Insights</h3>
                  <p className="text-gray-600">
                    Use <a href="/recipes" className="font-semibold text-sheetlink-green-700 underline">SheetLink Recipes</a> to generate spending reports, budget summaries, or tax categorization with one click. Build your own custom reports with unlimited flexibility.
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
              How to Migrate from PocketGuard to SheetLink
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
                    Export Your PocketGuard Data (Optional)
                  </h3>
                  <p className="text-gray-600">
                    If you have PocketGuard Plus, export your transaction history as a CSV file. You can import this into your Google Sheet for historical reference.
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
                    Connect Unlimited Accounts via Plaid
                  </h3>
                  <p className="text-gray-600">
                    Link all your bank accounts, credit cards, and PayPal. Unlike PocketGuard's 2-account limit on the free tier, SheetLink supports unlimited connections from day one.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Start Syncing & Customize Your Budget
                  </h3>
                  <p className="text-gray-700">
                    Transactions sync automatically into your Google Sheet. Create custom budget categories, spending limits, and formulas. Use <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to generate reports with one click.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-lg bg-blue-50 p-8">
              <p className="text-gray-700">
                <strong className="text-sheetlink-text">Your Google Sheet becomes your <span className="text-sheetlink-green-700">system of record</span></strong> instead of PocketGuard's proprietary app. You own the data. You control the format. Cancel anytime and keep everything.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Stop Paying PocketGuard's Annual Subscription
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              SheetLink is more affordable and gives you full data ownership
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-8">
                <h3 className="mb-4 text-2xl font-bold text-gray-600">PocketGuard Pricing</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">Free: <strong>2 accounts max</strong>, basic budgets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Plus: <strong>$99.99/year</strong> or $12.99/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Data locked in app</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Limited export (Plus only)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-red-500" />
                    <span className="text-gray-700">Preset budget categories</span>
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
                    <span className="text-gray-700">Unlimited accounts from day one</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Data in YOUR Google account</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-sheetlink-green-700" />
                    <span className="text-gray-700">Unlimited customization</span>
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
              Stop paying $99.99/year for PocketGuard Plus. Sync your bank transactions to Google Sheets for free.
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
