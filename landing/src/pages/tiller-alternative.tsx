import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, DollarSign, Zap, Sparkles, Users } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function TillerAlternative() {
  const seoTitle = 'Best Tiller Alternative - SheetLink for Google Sheets (2026)';
  const seoDescription = 'Looking for a cheaper Tiller Money alternative? SheetLink syncs bank transactions to Google Sheets for $12-60/year (vs Tiller\'s $79/year). Free tier available. Same features, better price.';
  const seoUrl = 'https://sheetlink.app/tiller-alternative';
  const seoImage = 'https://sheetlink.app/og-image.png';

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Why choose SheetLink over Tiller Money?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink offers similar bank-to-Google-Sheets syncing at a much lower price point. Tiller costs $79/year with no free tier, while SheetLink is free forever for 7 days of history, or $12-60/year for extended history. Both use Plaid for bank connections and sync to Google Sheets, but SheetLink is more affordable and offers a generous free tier.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is SheetLink cheaper than Tiller Money?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Tiller Money costs $79/year with a 30-day free trial. SheetLink is free forever for 7 days of transaction history, with paid plans at $12/year (Basic - 90 days) or $60/year (Pro - 24 months). Even the Pro plan is $19/year cheaper than Tiller, and the free tier is available permanently.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How do I migrate from Tiller to SheetLink?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Migrating from Tiller to SheetLink is straightforward: 1) Keep your existing Google Sheets with Tiller data as historical reference. 2) Install the SheetLink Chrome extension. 3) Create a new Google Sheet or use a new tab. 4) Connect your bank accounts through Plaid in SheetLink. 5) Start syncing transactions to your new sheet. You can reference your old Tiller data while building new workflows in SheetLink.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Does SheetLink have the same features as Tiller?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink and Tiller both sync bank transactions to Google Sheets using Plaid (10,000+ banks). SheetLink focuses on the core sync functionality with a simpler onboarding process, while Tiller includes pre-built templates and a foundation spreadsheet. SheetLink gives you more flexibility to build your own system, and costs significantly less.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="tiller alternative, best alternative to tiller, cheaper than tiller, tiller money alternative, google sheets bank sync, affordable tiller, tiller competitor" />
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
                Save $19-67 per year vs Tiller
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl"
            >
              Looking for a <span className="text-sheetlink-green-700">Tiller Alternative?</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-8 max-w-3xl text-center text-xl leading-relaxed text-gray-700"
            >
              Tiller Money is great, but $79/year adds up. SheetLink gives you the same bank-to-Google-Sheets syncing for less - with a free tier and more affordable paid plans.
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

        {/* Why People Leave Tiller */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Why People Look for Tiller Alternatives
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">$79/Year Cost</h3>
                <p className="text-gray-700">
                  Tiller has no free tier and costs $79/year ($6.58/month). For simple transaction tracking, this can feel like overkill.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <Sparkles className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Complex Onboarding</h3>
                <p className="text-gray-700">
                  Tiller's Foundation template is powerful but overwhelming. Some users just want simple transaction sync without the bells and whistles.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-100">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Overkill for Simple Needs</h3>
                <p className="text-gray-700">
                  If you just need transaction data in Sheets and want to build your own budget, Tiller's pre-built templates can feel like too much structure.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why SheetLink is Better */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Why SheetLink is a Great Tiller Alternative
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Same core functionality, simpler setup, better price
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
                    Free forever for 7 days of history. Basic plan at $12/year (90 days). Pro plan at $60/year (24 months). Even Pro is $19 cheaper than Tiller.
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
                  <Zap className="h-6 w-6 text-sheetlink-green-700" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Simpler Onboarding</h3>
                  <p className="text-gray-700">
                    No complex foundation template. Connect your banks, pick a sheet, start syncing. Build your own budget system from scratch or use our recipes.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Free Tier Forever</h3>
                  <p className="text-gray-700">
                    Tiller requires payment after 30 days. SheetLink's free tier (7 days of history) is available forever - perfect for weekly budget tracking with zero cost.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Same Bank Coverage</h3>
                  <p className="text-gray-700">
                    Both SheetLink and Tiller use Plaid for bank connections - 10,000+ banks supported including Chase, Bank of America, Wells Fargo, and all major credit unions.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Build Your Own System</h3>
                  <p className="text-gray-700">
                    SheetLink doesn't force you into pre-built templates. Start with a blank sheet and design your perfect budget workflow. Maximum flexibility.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Open Source</h3>
                  <p className="text-gray-700">
                    SheetLink is fully open source on GitHub. Audit the code yourself. No black boxes. Tiller is proprietary software.
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
              SheetLink vs Tiller Comparison
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-200 bg-white shadow-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Tiller Money</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">SheetLink</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">$79/year</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">$0 - $60/year</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Tier</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">30-day trial only</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">Free forever (7 days)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Bank Connections</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Plaid Integration</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Google Sheets Sync</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-sheetlink-green-700" />
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Excel Support</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center">
                      <X className="mx-auto h-5 w-5 text-gray-400" />
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Pre-built Templates</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Coming soon (Recipes)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Transaction History</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">7 days - 24 months</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Auto-sync</td>
                    <td className="px-6 py-4 text-center">
                      <Check className="mx-auto h-5 w-5 text-green-600" />
                    </td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Paid plans</td>
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
                  <tr>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">Setup Complexity</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Medium (Foundation template)</td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700">Simple (blank sheet)</td>
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
              Pricing Comparison: Save $19-67/Year
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              SheetLink offers better value at every tier
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="rounded-xl border-2 border-gray-300 bg-white p-8"
              >
                <h3 className="mb-2 text-2xl font-bold text-gray-900">Tiller Money</h3>
                <div className="mb-4">
                  <span className="text-5xl font-bold text-gray-900">$79</span>
                  <span className="text-lg text-gray-600">/year</span>
                </div>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    30-day free trial
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Unlimited transaction history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Foundation template included
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-green-600" />
                    Google Sheets & Excel support
                  </li>
                  <li className="flex items-center gap-2">
                    <X className="h-4 w-4 text-gray-400" />
                    No free tier after trial
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
                  <span className="text-5xl font-bold">$0</span>
                  <span className="text-xl"> - $60</span>
                  <span className="text-lg opacity-90">/year</span>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <strong>Free forever:</strong> 7 days history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <strong>Basic $12/year:</strong> 90 days history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <strong>Pro $60/year:</strong> 24 months history
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Google Sheets (Excel coming soon)
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    Open source & independent
                  </li>
                </ul>
                <div className="mt-6 rounded-lg bg-white/20 px-4 py-3 text-center">
                  <p className="text-sm font-semibold">Save $19-67 per year vs Tiller</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center">
              <p className="text-lg font-semibold text-gray-900">
                Example: If you use SheetLink Pro ($60/year), you save <span className="text-sheetlink-green-700">$19/year</span> vs Tiller.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Over 5 years, that's $95 saved. Over 10 years? $190 saved.
              </p>
            </div>
          </div>
        </section>

        {/* Migration Guide */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              How to Switch from Tiller to SheetLink
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Keep Your Tiller Data as Reference</h3>
                  <p className="text-gray-700">
                    No need to delete your Tiller sheets. Keep them as historical reference. They'll stop updating when you cancel Tiller, but your data remains.
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
                    Visit the Chrome Web Store and install SheetLink. It's lightweight and runs entirely in your browser as an extension.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Create a New Google Sheet</h3>
                  <p className="text-gray-700">
                    Create a fresh Google Sheet for SheetLink, or add a new tab to your existing spreadsheet. SheetLink works with any sheet structure you design.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Connect Banks Through Plaid</h3>
                  <p className="text-gray-700">
                    Connect the same bank accounts you had in Tiller. SheetLink uses Plaid (just like Tiller), so all your banks are already supported.
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
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Start Syncing & Cancel Tiller</h3>
                  <p className="text-gray-700">
                    Once SheetLink is syncing properly, cancel your Tiller subscription to stop the $79/year charge. With SheetLink's free tier or Basic plan ($12/year), you'll start saving immediately.
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
              Other Tiller Alternatives Considered
            </h2>
            <div className="space-y-4">
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">YNAB (You Need A Budget)</h3>
                <p className="mb-2 text-sm text-gray-700">
                  Popular budgeting app at $180/year, but doesn't sync to Google Sheets. Forces you into their zero-based budgeting methodology. More expensive than Tiller.
                </p>
                <a href="/ynab-alternative" className="text-sm font-semibold text-sheetlink-green-700 hover:underline">
                  Learn more about YNAB alternatives →
                </a>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Mint (Shut Down)</h3>
                <p className="mb-2 text-sm text-gray-700">
                  Intuit killed Mint in January 2024. Many former Mint users moved to Tiller, but are now looking for more affordable options like SheetLink.
                </p>
                <a href="/mint-alternative" className="text-sm font-semibold text-sheetlink-green-700 hover:underline">
                  Learn more about Mint alternatives →
                </a>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-lg font-bold text-gray-900">Manual CSV Downloads</h3>
                <p className="text-sm text-gray-700">
                  Free but extremely time-consuming. Log into each bank, download CSV, import to Sheets. SheetLink automates all of this for less than $1/month.
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
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">Why choose SheetLink over Tiller Money?</h3>
                <p className="text-gray-700">
                  SheetLink offers similar bank-to-Google-Sheets syncing at a much lower price point. Tiller costs $79/year with no free tier, while SheetLink is free forever for 7 days of history, or $12-60/year for extended history. Both use Plaid for bank connections and sync to Google Sheets, but SheetLink is more affordable and offers a generous free tier.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">Is SheetLink cheaper than Tiller Money?</h3>
                <p className="text-gray-700">
                  Yes. Tiller Money costs $79/year with a 30-day free trial. SheetLink is free forever for 7 days of transaction history, with paid plans at $12/year (Basic - 90 days) or $60/year (Pro - 24 months). Even the Pro plan is $19/year cheaper than Tiller, and the free tier is available permanently.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">How do I migrate from Tiller to SheetLink?</h3>
                <p className="text-gray-700">
                  Migrating from Tiller to SheetLink is straightforward: 1) Keep your existing Google Sheets with Tiller data as historical reference. 2) Install the SheetLink Chrome extension. 3) Create a new Google Sheet or use a new tab. 4) Connect your bank accounts through Plaid in SheetLink. 5) Start syncing transactions to your new sheet. You can reference your old Tiller data while building new workflows in SheetLink.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">Does SheetLink have the same features as Tiller?</h3>
                <p className="text-gray-700">
                  SheetLink and Tiller both sync bank transactions to Google Sheets using Plaid (10,000+ banks). SheetLink focuses on the core sync functionality with a simpler onboarding process, while Tiller includes pre-built templates and a foundation spreadsheet. SheetLink gives you more flexibility to build your own system, and costs significantly less.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to Save $19-67/Year?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Start with SheetLink's free tier (7 days) or upgrade for less than Tiller costs.
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
