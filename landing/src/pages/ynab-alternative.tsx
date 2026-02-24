import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, DollarSign, TrendingUp, Sparkles, BookOpen } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function YNABAlternative() {
  const seoTitle = 'Best YNAB Alternative - SheetLink for Google Sheets (2026)';
  const seoDescription = 'Looking for a cheaper YNAB alternative? SheetLink syncs bank transactions to Google Sheets with a free tier and Pro option in beta. Use YOUR budgeting method in spreadsheets. More affordable than YNAB.';
  const seoUrl = 'https://sheetlink.app/ynab-alternative';
  const seoImage = 'https://sheetlink.app/og-image.png';

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Why is YNAB so expensive?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'YNAB costs $14.99/month or $180/year because it\'s a full-featured budgeting platform with its own app, methodology, and support system. While YNAB is powerful, the price is high compared to alternatives like SheetLink which offers bank-to-spreadsheet syncing starting with a free tier (7 days) and Pro tier in beta.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What is the best cheaper alternative to YNAB?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink is one of the most affordable YNAB alternatives, starting at free forever (7 days of history) with Pro tier available for beta users. Unlike YNAB\'s prescriptive zero-based budgeting, SheetLink syncs transactions to Google Sheets so you can use ANY budgeting method you prefer - envelope system, 50/30/20 rule, zero-based, or your own custom approach.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can I use the YNAB method in Google Sheets?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes! SheetLink syncs your bank transactions to Google Sheets, and you can build your own YNAB-style zero-based budget using spreadsheet formulas. You\'ll have complete control over categories, goals, and reporting - without paying $180/year for YNAB\'s app. Many users create custom YNAB-inspired budgets in Sheets with SheetLink\'s transaction data.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How do I switch from YNAB to SheetLink?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Switching from YNAB to SheetLink: 1) Export your YNAB transaction history (YNAB supports CSV export). 2) Install SheetLink Chrome extension. 3) Create a Google Sheet budget - either build your own or replicate YNAB\'s methodology. 4) Import your historical YNAB data. 5) Connect your banks through Plaid in SheetLink to start syncing new transactions. 6) Cancel YNAB subscription to save on costs.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="ynab alternative, best alternative to ynab, cheaper than ynab, you need a budget alternative, ynab too expensive, affordable budgeting app, google sheets budgeting" />
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
              <div className="inline-flex items-center gap-2 rounded-full bg-sheetlink-green-700/10 px-4 py-2 text-sm font-semibold text-sheetlink-green-700">
                <DollarSign className="h-4 w-4" />
                More affordable than YNAB
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl"
            >
              Looking for a <span className="text-sheetlink-green-700">YNAB Alternative?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed text-gray-700"
            >
              YNAB costs $180/year. That's expensive for budgeting software. SheetLink syncs your bank transactions to Google Sheets with a free tier and Pro option - and you can use ANY budgeting method you want.
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

        {/* Why People Leave YNAB */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Why People Look for YNAB Alternatives
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-orange-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">$180/Year Is Steep</h3>
                <p className="text-gray-700">
                  $14.99/month adds up to $180/year. That's a lot of money for budget tracking. Many users question if it's worth the cost, especially when free/cheaper options exist.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border-2 border-orange-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <BookOpen className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Steep Learning Curve</h3>
                <p className="text-gray-700">
                  YNAB's zero-based budgeting methodology requires learning their specific rules and philosophy. Some users find it overwhelming or too prescriptive for their needs.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border-2 border-orange-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <Sparkles className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Limited Flexibility</h3>
                <p className="text-gray-700">
                  YNAB forces you into their methodology. If you want to use 50/30/20, envelope budgeting, or your own custom system, you're out of luck.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why SheetLink is Better */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Why SheetLink is a Great YNAB Alternative
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              More affordable, more flexible, build YOUR perfect budget
            </p>
            <div className="grid gap-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700/10">
                  <DollarSign className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Much More Affordable</h3>
                  <p className="text-gray-700">
                    Free forever for 7 days of history. Pro tier with extended history available for beta/early access users. Contact for pricing details. The free tier costs $0 forever.
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
                  <Sparkles className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Use ANY Budgeting Method</h3>
                  <p className="text-gray-700">
                    Zero-based budget like YNAB? Go ahead. 50/30/20 rule? Build it. Envelope method? Easy. SheetLink gives you raw transaction data in Sheets - budget however YOU want.
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
                  <TrendingUp className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Full Spreadsheet Power</h3>
                  <p className="text-gray-700">
                    Google Sheets gives you unlimited customization. Build custom reports, charts, pivot tables, formulas. YNAB limits you to their interface. Sheets has no limits.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">No Learning Curve</h3>
                  <p className="text-gray-700">
                    If you know spreadsheets, you already know how to use SheetLink. No methodology to learn. No rules to follow. Just your transactions in a sheet, ready to analyze.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Same Bank Coverage</h3>
                  <p className="text-gray-700">
                    SheetLink uses Plaid (same as YNAB) - 10,000+ banks supported. Chase, Bank of America, Wells Fargo, credit unions. All your accounts sync automatically.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Own Your Data Forever</h3>
                  <p className="text-gray-700">
                    Your transactions live in YOUR Google account. Export anytime. Build on them forever. YNAB keeps your data locked in their platform. SheetLink sets you free.
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
              SheetLink vs YNAB Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-200 bg-white shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">YNAB</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">SheetLink</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">$180/year</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">Free (7 days), Pro in beta</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Tier</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">34-day trial only</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">Free forever (7 days)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Budgeting Method</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Zero-based only</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">Any method you want</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Platform</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">YNAB app only</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Google Sheets</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Customization</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Limited</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Bank Connections</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Plaid Integration</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Reports & Charts</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Pre-built reports</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">Build any chart you want</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Data Ownership</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">Locked in YNAB</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Learning Curve</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">High (methodology)</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">Low (just spreadsheets)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Mobile App</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Google Sheets app</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Open Source</td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
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
              Pricing Comparison
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              SheetLink offers a more affordable option
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-gray-300 bg-white p-8"
              >
                <h3 className="mb-2 text-2xl font-bold text-gray-900">YNAB</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">$180</span>
                  <span className="text-lg text-gray-600">/year</span>
                </div>
                <p className="mb-4 text-sm text-gray-600">($14.99/month)</p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    34-day free trial
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Zero-based budgeting method
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Mobile & desktop apps
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Bank sync included
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-gray-400" />
                    Limited to YNAB methodology
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-sheetlink-green-700 bg-gradient-to-br from-sheetlink-green-700 to-sheetlink-green-900 p-8 text-white"
              >
                <h3 className="mb-2 text-2xl font-bold">SheetLink</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold">Free</span>
                  <span className="text-lg opacity-90"> Forever</span>
                </div>
                <p className="mb-4 text-sm opacity-90">(Pro tier in beta)</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <strong>Free tier:</strong> 7 days history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <strong>Pro tier:</strong> Extended history (beta/early access)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Pro pricing TBD - contact for early access
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Use ANY budgeting method
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Unlimited customization in Sheets
                  </li>
                </ul>
                <div className="mt-6 rounded-lg bg-white/20 px-4 py-3 text-center">
                  <p className="text-sm font-semibold">More affordable than YNAB</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center">
                <p className="text-lg font-semibold text-gray-900">
                  Start with the free tier and upgrade to Pro when you need extended history.
                </p>
                <p className="mt-2 text-sm text-gray-600">
                  Pro tier pricing available for beta users - contact for early access.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              How to Switch from YNAB to SheetLink
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Export Your YNAB Data</h3>
                  <p className="text-gray-700">
                    In YNAB, go to your budget and export all transactions as CSV. This gives you your historical data to import into Google Sheets for reference.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Install SheetLink Extension</h3>
                  <p className="text-gray-700">
                    Visit the Chrome Web Store and install SheetLink. It's a lightweight browser extension that connects to Google Sheets.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Design Your Budget System</h3>
                  <p className="text-gray-700">
                    Create a new Google Sheet. Want to replicate YNAB's zero-based approach? Build it. Want to try 50/30/20? Go for it. Want your own custom system? The sky's the limit.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Connect Your Banks via Plaid</h3>
                  <p className="text-gray-700">
                    Link the same bank accounts you had in YNAB. SheetLink uses Plaid (just like YNAB does), so all your banks are already supported.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Cancel YNAB & Start Saving</h3>
                  <p className="text-gray-700">
                    Once SheetLink is syncing successfully, cancel your YNAB subscription. You'll immediately stop paying $14.99/month ($180/year).
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
              Other YNAB Alternatives Considered
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Tiller Money</h3>
                <p className="mb-2 text-sm text-gray-700">
                  Also syncs to Google Sheets at $79/year. Cheaper than YNAB but more expensive than SheetLink. Includes pre-built templates.
                </p>
                <a href="/tiller-alternative" className="text-sm font-semibold text-sheetlink-green-700 hover:underline">
                  Learn more about Tiller alternatives →
                </a>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Mint (Shut Down)</h3>
                <p className="mb-2 text-sm text-gray-700">
                  Intuit shut down Mint in January 2024. Many Mint refugees tried YNAB but found it too expensive. SheetLink offers a middle ground - automated like Mint, affordable, and flexible.
                </p>
                <a href="/mint-alternative" className="text-sm font-semibold text-sheetlink-green-700 hover:underline">
                  Learn more about Mint alternatives →
                </a>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Monarch Money</h3>
                <p className="text-sm text-gray-700">
                  Modern budgeting app at $100/year. Still cheaper than YNAB but more expensive than SheetLink. Another closed platform - you don't own your data like you do with Sheets.
                </p>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">EveryDollar</h3>
                <p className="text-sm text-gray-700">
                  Dave Ramsey's zero-based budgeting app. Free version requires manual transaction entry. Premium is $80/year for bank sync - still more than SheetLink and less flexible than spreadsheets.
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
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">Why is YNAB so expensive?</h3>
                <p className="text-gray-700">
                  YNAB costs $14.99/month or $180/year because it's a full-featured budgeting platform with its own app, methodology, and support system. While YNAB is powerful, the price is high compared to alternatives like SheetLink which offers bank-to-spreadsheet syncing starting with a free tier (7 days) and Pro tier in beta.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">What is the best cheaper alternative to YNAB?</h3>
                <p className="text-gray-700">
                  SheetLink is one of the most affordable YNAB alternatives, starting at free forever (7 days of history) with Pro tier available for beta users. Unlike YNAB's prescriptive zero-based budgeting, SheetLink syncs transactions to Google Sheets so you can use ANY budgeting method you prefer - envelope system, 50/30/20 rule, zero-based, or your own custom approach.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">Can I use the YNAB method in Google Sheets?</h3>
                <p className="text-gray-700">
                  Yes! SheetLink syncs your bank transactions to Google Sheets, and you can build your own YNAB-style zero-based budget using spreadsheet formulas. You'll have complete control over categories, goals, and reporting - without paying $180/year for YNAB's app. Many users create custom YNAB-inspired budgets in Sheets with SheetLink's transaction data.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">How do I switch from YNAB to SheetLink?</h3>
                <p className="text-gray-700">
                  Switching from YNAB to SheetLink: 1) Export your YNAB transaction history (YNAB supports CSV export). 2) Install SheetLink Chrome extension. 3) Create a Google Sheet budget - either build your own or replicate YNAB's methodology. 4) Import your historical YNAB data. 5) Connect your banks through Plaid in SheetLink to start syncing new transactions. 6) Cancel YNAB subscription to save on costs.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready for a More Affordable Option?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Start with SheetLink's free tier or contact us about Pro access.
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
