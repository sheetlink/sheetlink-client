import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, Code, DollarSign, FileText, Zap } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function SoftwareDeveloperExpenseTracker() {
  const seoTitle = 'Software Developer Expense Tracker - Track 1099 Contractor Expenses in Google Sheets';
  const seoDescription = 'Track freelance developer expenses, Stripe payouts, SaaS subscriptions, and hardware purchases in Google Sheets. Built for 1099 software engineers and technical contractors.';
  const seoUrl = 'https://sheetlink.app/software-developer-expense-tracker';
  const seoImage = 'https://sheetlink.app/og-image.png';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do software developers track business expenses?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink syncs your bank and credit card transactions to Google Sheets automatically. Track Stripe payouts, SaaS subscriptions (GitHub, AWS, hosting), hardware purchases, home office expenses, and client payments. Categorize transactions for tax deductions and generate expense reports for your accountant.',
        },
      },
      {
        '@type': 'Question',
        'name': 'What expenses can freelance developers deduct?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Common deductible expenses for 1099 contractors include: software subscriptions (IDEs, cloud services, design tools), home office expenses, internet and phone, computer hardware, courses and training, business travel, coworking spaces, and accounting/legal fees. SheetLink helps you track all these in one spreadsheet.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is SheetLink good for 1099 contractors?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. SheetLink is designed for freelancers and contractors who need simple bookkeeping without QuickBooks complexity. Track income from multiple clients, categorize business expenses, and prepare for quarterly taxes. Your data lives in Google Sheets where you can customize reports for your accountant.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="software developer expense tracker, freelance developer bookkeeping, 1099 contractor expenses, track developer income, software engineer taxes, contractor bookkeeping" />
        <meta name="author" content={BRAND.name} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <meta property="og:url" content={seoUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        <link rel="canonical" href={seoUrl} />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero */}
        <section className="px-4 pb-12 pt-28">
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <Code className="h-4 w-4" />
                Built for 1099 Contractors
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl"
            >
              Software Developer <span className="text-sheetlink-green-700">Expense Tracker</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-8 max-w-3xl text-center text-xl text-gray-700"
            >
              Track Stripe payouts, SaaS subscriptions, hardware purchases, and client income in Google Sheets. Built for freelance developers and 1099 contractors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex justify-center"
            >
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:shadow-xl"
              >
                Start Tracking Expenses Free
              </a>
            </motion.div>
          </div>
        </section>

        {/* The Developer Expense Chaos */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Stop Losing Track of Business Expenses
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 text-4xl">💳</div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Multiple Cards</h3>
                <p className="text-gray-700">
                  Business card for AWS, personal card for GitHub, PayPal for courses. Transactions scattered everywhere.
                </p>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 text-4xl">📊</div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Subscription Hell</h3>
                <p className="text-gray-700">
                  Netlify, Vercel, Railway, OpenAI, Figma, Notion, Linear. $30/mo here, $50/mo there. What's the total?
                </p>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 text-4xl">😰</div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Tax Season Panic</h3>
                <p className="text-gray-700">
                  Quarterly taxes due. Need to categorize 6 months of transactions. Export from 3 different banks manually.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What SheetLink Tracks */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Track All Your Developer Expenses
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Every transaction flows into one spreadsheet. Categorize, analyze, export for taxes.
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                <h3 className="mb-4 text-xl font-bold text-sheetlink-text">💰 Income Tracking</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" />
                    <span>Stripe payouts and transfers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" />
                    <span>Client invoice payments (ACH, wire, check deposits)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" />
                    <span>Upwork, Toptal, Freelancer.com withdrawals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" />
                    <span>PayPal transfers</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-sheetlink-text">💻 SaaS & Subscriptions</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>GitHub, GitLab, Bitbucket</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>AWS, GCP, Azure, DigitalOcean</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Vercel, Netlify, Railway, Render</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>JetBrains, VS Code extensions, Raycast Pro</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-sheetlink-text">🖥️ Hardware & Equipment</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Laptop purchases (MacBook, ThinkPad)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Monitors, keyboards, mice, desk setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Webcam, microphone for client calls</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Phone, internet, home office expenses</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-xl font-bold text-sheetlink-text">📚 Professional Development</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Udemy, Frontend Masters, Egghead courses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Conference tickets and travel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Technical books and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="mt-1 h-4 w-4 flex-shrink-0 text-gray-400" />
                    <span>Coworking space memberships</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              From Chaos to Organized in Minutes
            </h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  1
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Connect Your Accounts</h3>
                  <p className="text-gray-700">
                    Link your business bank account, credit cards, and PayPal via Plaid. Same security infrastructure Stripe and Venmo use.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  2
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Transactions Sync to Sheets</h3>
                  <p className="text-gray-700">
                    Every purchase, client payment, and subscription charge flows into your Google Sheet automatically. Date, merchant, amount, category.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  3
                </div>
                <div className="flex-1 rounded-xl border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Categorize & Analyze</h3>
                  <p className="text-gray-700">
                    Use spreadsheet formulas to group by category, calculate totals, track income vs expenses. Build custom dashboards for your business.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  4
                </div>
                <div className="flex-1 rounded-xl border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Run Recipes for Reports</h3>
                  <p className="text-gray-700">
                    Use <a href="/recipes" className="font-semibold text-sheetlink-green-700 hover:underline">SheetLink Recipes</a> to instantly generate expense summaries, income reports, and tax categorization. One click turns raw transactions into clean reports for your accountant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Professional Workflow */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              For Accountants & Bookkeepers
            </h2>
            <p className="mb-8 text-center text-xl text-gray-600">
              SheetLink becomes the input layer for professional review
            </p>
            <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-8">
              <h3 className="mb-4 text-xl font-bold text-sheetlink-text">Professional Review Workflow:</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">1.</span>
                  <span>Client connects their bank account via Plaid (bank-grade security)</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">2.</span>
                  <span>Transactions sync into a shared Google Sheet you both can access</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">3.</span>
                  <span>Run a SheetLink Recipe to auto-categorize and summarize expenses</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">4.</span>
                  <span>Review uncategorized transactions and edge cases together</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-blue-700">5.</span>
                  <span>Export final summary for tax filing or QuickBooks import</span>
                </li>
              </ol>
              <p className="mt-6 text-sm text-gray-600">
                In this workflow, your Google Sheet becomes the <strong>system of record</strong> instead of a proprietary dashboard. You own the data, customize the reports, and share access with your CPA seamlessly.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Stop Scrambling at Tax Time
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Track every business expense automatically. Free for 7 days of history.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-sheetlink-green-900 transition-all hover:bg-gray-100"
            >
              Add to Chrome - Start Free
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
