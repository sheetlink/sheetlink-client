import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, AlertCircle, TrendingDown, Lock, Gift } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function MintAlternative() {
  const seoTitle = 'Best Mint Alternative - SheetLink for Google Sheets (2026)';
  const seoDescription = 'Looking for a Mint alternative after the shutdown? SheetLink syncs your bank transactions to Google Sheets. Free forever, no ads, YOUR data in YOUR account. Best replacement for Mint in 2026.';
  const seoUrl = 'https://sheetlink.app/mint-alternative';
  const seoImage = 'https://sheetlink.app/og-image.png';

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'What happened to Mint?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Intuit shut down Mint in January 2024, forcing millions of users to find alternatives. Intuit tried to migrate users to Credit Karma, but many users were unhappy with the transition. Mint users are now actively searching for better budgeting and expense tracking alternatives.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Why is SheetLink a good Mint alternative?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink syncs your bank transactions to Google Sheets, giving you full control over your financial data. Unlike Mint, your data stays in YOUR Google account forever. SheetLink has no ads, won\'t shut down on you, and offers a free tier with 7 days of transaction history. It\'s perfect for users who want flexibility and data ownership.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How do I migrate from Mint to SheetLink?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Migrating from Mint to SheetLink is simple: 1) Download your transaction history from Mint as CSV before it shuts down completely. 2) Install the SheetLink Chrome extension from the Chrome Web Store. 3) Connect your bank accounts through Plaid (10,000+ banks supported). 4) Import your historical Mint CSV data into your Google Sheet. 5) Start syncing new transactions automatically. SheetLink will handle all future transactions.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is SheetLink cheaper than Mint was?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Mint was free but ad-supported and shut down by Intuit. SheetLink is free forever for the last 7 days of transactions with no ads. For extended history, SheetLink costs just $12-60/year, which is significantly cheaper than Credit Karma\'s paid features or other Mint alternatives like YNAB ($180/year) or Tiller ($79/year).',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="mint alternative, best alternative to mint, mint shutdown, mint replacement, mint discontinued, cheaper than mint, free budgeting app, google sheets budgeting" />
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
              <div className="inline-flex items-center gap-2 rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-700">
                <AlertCircle className="h-4 w-4" />
                Mint shut down in January 2024
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl"
            >
              Looking for a <span className="text-sheetlink-green-700">Mint Alternative?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed text-gray-700"
            >
              Mint is gone. But your financial life goes on. SheetLink syncs your bank transactions to Google Sheets - giving you the flexibility Mint never could, with YOUR data in YOUR account.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-xl"
              >
                Try SheetLink Free
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </motion.div>
          </div>
        </section>

        {/* Why People Left Mint */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Why People Left Mint
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-red-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <X className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Shut Down Forever</h3>
                <p className="text-gray-700">
                  Intuit killed Mint in January 2024, forcing millions to scramble for alternatives. Your budgets, history, and workflows - gone.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border-2 border-red-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Forced Migration</h3>
                <p className="text-gray-700">
                  Intuit pushed users to Credit Karma, which many found inferior. Missing features, different interface, broken workflows.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border-2 border-red-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">No Data Control</h3>
                <p className="text-gray-700">
                  Your financial data was trapped in Mint's system. Export was clunky. Once it shut down, your history was at risk.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why SheetLink is Better */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Why SheetLink is a Great Mint Alternative
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Own your data. Control your budgets. Never worry about shutdowns again.
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700/10">
                  <Lock className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Your Data, Your Account</h3>
                  <p className="text-gray-700">
                    Transactions sync directly to YOUR Google Sheet in YOUR Google account. No company can shut it down or take it away. You own it forever.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700/10">
                  <Gift className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Free Forever Tier</h3>
                  <p className="text-gray-700">
                    7 days of transaction history, free forever. No credit card. No ads. No bait-and-switch. If you need more history, it's just $12-60/year.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700/10">
                  <Check className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Unlimited Flexibility</h3>
                  <p className="text-gray-700">
                    Build ANY budget system in Google Sheets. Zero-based, envelope method, 50/30/20 - whatever works for you. Mint forced you into their system. SheetLink adapts to yours.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700/10">
                  <Check className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">No Ads, Ever</h3>
                  <p className="text-gray-700">
                    Mint was "free" but bombarded you with credit card offers and ads. SheetLink has no ads. We make money from subscriptions, not selling your attention.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700/10">
                  <Check className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Same Bank Connections</h3>
                  <p className="text-gray-700">
                    SheetLink uses Plaid (just like Mint did) - 10,000+ banks supported. Chase, Bank of America, Wells Fargo, credit unions. If it worked with Mint, it works with SheetLink.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700/10">
                  <Check className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Open Source & Independent</h3>
                  <p className="text-gray-700">
                    No VC funding. No corporate overlord. SheetLink is open source and built by people who were frustrated with Mint's shutdown. We're not going anywhere.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              SheetLink vs Mint Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-200 bg-white shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Mint</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">SheetLink</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Status</td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        <X className="h-3 w-3" />
                        Shut Down
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        <Check className="h-3 w-3" />
                        Active
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Free (with ads)</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Free tier, $12-60/year for more</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Data Ownership</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-red-500" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Customizable Budgets</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Limited</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Ads</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-red-500" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Bank Connections</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">10,000+ (Plaid)</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">10,000+ (Plaid)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Export Data</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">CSV only</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Full Google Sheets</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Risk of Shutdown</td>
                    <td className="px-6 py-4 text-center text-sm text-red-600 font-semibold">Already happened</td>
                    <td className="px-6 py-4 text-center text-sm text-green-700 font-semibold">Your data, can't shut down</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Pricing Comparison */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Pricing: SheetLink vs Other Mint Alternatives
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              SheetLink is significantly more affordable than other options
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-sheetlink-green-700 bg-gradient-to-br from-sheetlink-green-700 to-sheetlink-green-900 p-8 text-white"
              >
                <h3 className="mb-2 text-2xl font-bold">SheetLink</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-xl"> - $60</span>
                  <span className="text-lg opacity-90">/year</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Free: 7 days of history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Basic: $12/year (90 days)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Pro: $60/year (24 months)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    YOUR data in YOUR Sheets
                  </li>
                </ul>
              </motion.div>

              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="rounded-xl border-2 border-gray-200 bg-white p-6"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-lg font-bold text-gray-900">YNAB</h4>
                    <span className="text-2xl font-bold text-gray-900">$180/year</span>
                  </div>
                  <p className="text-sm text-gray-600">3x more expensive than SheetLink Pro</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="rounded-xl border-2 border-gray-200 bg-white p-6"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-lg font-bold text-gray-900">Tiller Money</h4>
                    <span className="text-2xl font-bold text-gray-900">$79/year</span>
                  </div>
                  <p className="text-sm text-gray-600">Still more than SheetLink Pro</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="rounded-xl border-2 border-gray-200 bg-white p-6"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <h4 className="text-lg font-bold text-gray-900">Monarch Money</h4>
                    <span className="text-2xl font-bold text-gray-900">$100/year</span>
                  </div>
                  <p className="text-sm text-gray-600">Limited customization vs Sheets</p>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              How to Switch from Mint to SheetLink
            </h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  1
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Export Your Mint Data (If You Still Can)</h3>
                  <p className="text-gray-700">
                    If you have any Mint data left, export your transaction history as CSV. You can import this into your Google Sheet later for historical reference.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  2
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Install SheetLink Chrome Extension</h3>
                  <p className="text-gray-700">
                    Visit the Chrome Web Store and install SheetLink. It's a small, lightweight extension that connects to your Google Sheets.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  3
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Connect Your Banks Through Plaid</h3>
                  <p className="text-gray-700">
                    Link your bank accounts using Plaid - the same secure system Mint used. All your banks are already supported (10,000+ institutions).
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  4
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Set Up Your Google Sheet Budget</h3>
                  <p className="text-gray-700">
                    Create a new Google Sheet or use one of our budget templates. Import your Mint CSV history if you want. SheetLink will start syncing new transactions automatically.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="flex gap-4"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  5
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Build Your Custom Budget</h3>
                  <p className="text-gray-700">
                    Now you have the power of Google Sheets. Build ANY budget system you want - formulas, charts, categories, goals. Your data, your way.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Other Alternatives */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Other Mint Alternatives We Considered
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">YNAB (You Need A Budget)</h3>
                <p className="mb-2 text-sm text-gray-700">
                  Great budgeting methodology, but expensive at $180/year. Steeper learning curve. Less flexibility than spreadsheets.
                </p>
                <a href="/ynab-alternative" className="text-sm font-semibold text-sheetlink-green-700 hover:underline">
                  Learn more about YNAB alternatives →
                </a>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Tiller Money</h3>
                <p className="mb-2 text-sm text-gray-700">
                  Also syncs to Google Sheets, but costs $79/year with no free tier. Good product, but SheetLink is more affordable with similar features.
                </p>
                <a href="/tiller-alternative" className="text-sm font-semibold text-sheetlink-green-700 hover:underline">
                  Learn more about Tiller alternatives →
                </a>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Monarch Money</h3>
                <p className="text-sm text-gray-700">
                  Modern interface and good features at $100/year. But it's another closed platform - you don't own your data like you do with SheetLink.
                </p>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Credit Karma (Intuit's Choice)</h3>
                <p className="text-sm text-gray-700">
                  Intuit tried to migrate Mint users here, but it's missing many features. More focused on credit monitoring and upselling financial products.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">What happened to Mint?</h3>
                <p className="text-gray-700">
                  Intuit shut down Mint in January 2024, forcing millions of users to find alternatives. Intuit tried to migrate users to Credit Karma, but many users were unhappy with the transition. Mint users are now actively searching for better budgeting and expense tracking alternatives.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">Why is SheetLink a good Mint alternative?</h3>
                <p className="text-gray-700">
                  SheetLink syncs your bank transactions to Google Sheets, giving you full control over your financial data. Unlike Mint, your data stays in YOUR Google account forever. SheetLink has no ads, won't shut down on you, and offers a free tier with 7 days of transaction history. It's perfect for users who want flexibility and data ownership.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">How do I migrate from Mint to SheetLink?</h3>
                <p className="text-gray-700">
                  Migrating from Mint to SheetLink is simple: 1) Download your transaction history from Mint as CSV before it shuts down completely. 2) Install the SheetLink Chrome extension from the Chrome Web Store. 3) Connect your bank accounts through Plaid (10,000+ banks supported). 4) Import your historical Mint CSV data into your Google Sheet. 5) Start syncing new transactions automatically. SheetLink will handle all future transactions.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">Is SheetLink cheaper than Mint was?</h3>
                <p className="text-gray-700">
                  Mint was free but ad-supported and shut down by Intuit. SheetLink is free forever for the last 7 days of transactions with no ads. For extended history, SheetLink costs just $12-60/year, which is significantly cheaper than Credit Karma's paid features or other Mint alternatives like YNAB ($180/year) or Tiller ($79/year).
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Leave Mint Behind?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Start syncing your bank transactions to Google Sheets today. Free forever for 7 days of history.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-sheetlink-green-900 transition-all hover:bg-gray-100"
            >
              Try SheetLink Free
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
