import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Briefcase, DollarSign, FileSpreadsheet, Zap, Check, AlertCircle, CreditCard, TrendingUp, Users } from 'lucide-react';
import { BRAND, URLS } from '@/lib/constants';

export default function IndependentConsultantBookkeeping() {
  const seoTitle = 'Independent Consultant Bookkeeping - Track Consulting Income & Expenses in Google Sheets';
  const seoDescription = 'Track client invoices, project expenses, travel costs, and consulting overhead automatically. Built for independent consultants managing multiple client engagements.';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do I track income from multiple consulting clients?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink automatically syncs all bank deposits into Google Sheets. Add a "Client" column to tag which payments came from which client, then use SheetLink Recipes to generate client-specific income reports. Perfect for tracking retainers, milestone payments, and one-off projects.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can SheetLink help me separate client reimbursable expenses from overhead?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Create custom columns to categorize transactions as "Client Reimbursable" (travel, meals with clients, project-specific software) vs "Business Overhead" (general software, office expenses, insurance). Use filters to generate client invoices and track true profitability.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Does this work for consultants who need quarterly tax estimates?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely. Use SheetLink Recipes to generate quarterly income summaries and deductible expense reports. Your Google Sheet becomes your financial system of record for estimated tax payments and year-end Schedule C filing.'
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
        <link rel="canonical" href="https://sheetlink.app/independent-consultant-bookkeeping" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://sheetlink.app/independent-consultant-bookkeeping" />
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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
                <Briefcase className="h-4 w-4" />
                Built for Independent Consultants
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
                Independent Consultant <span className="text-sheetlink-green-700">Bookkeeping</span>
              </h1>

              <p className="mb-8 text-xl text-gray-600 md:text-2xl">
                Track client payments, project expenses, travel costs, and consulting overhead automatically in Google Sheets.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={URLS.chromeStore}
                  className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  Start Tracking Finances
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

        {/* The Consultant Finance Chaos */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              The Multi-Client Accounting Nightmare
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Managing finances across 5+ clients with mixed payment terms
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Payment Tracking Chaos
                </h3>
                <p className="text-gray-600">
                  Client A pays monthly retainer. Client B pays per milestone. Client C is 30 days late. Which invoice just hit your account? Was that the $10k from the strategy project or the $8k retainer?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Expense Categorization Hell
                </h3>
                <p className="text-gray-600">
                  Flight to Client A's headquarters—reimbursable. Dinner with Client B—billable expense. Your laptop upgrade—business overhead. LinkedIn Premium—split across all clients?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Quarterly Tax Scramble
                </h3>
                <p className="text-gray-600">
                  Estimated taxes are due. How much did you actually make after expenses? Which business expenses are deductible? Your accountant needs clean numbers, and you need them now.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What SheetLink Tracks */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Track All Your Consulting Income & Expenses
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Every client payment and business expense, automatically in Google Sheets
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">💰</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Client Revenue
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Retainer payments:</strong> Monthly recurring revenue from ongoing clients</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Project milestones:</strong> Fixed-price deliverable payments</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Hourly billing:</strong> Time-based consulting fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Success fees:</strong> Performance-based bonuses and revenue share</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">✈️</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Client Reimbursable Expenses
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Travel expenses:</strong> Flights, hotels, rental cars for client visits</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Client meals:</strong> Dinners, lunches, coffee meetings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Project-specific software:</strong> Tools purchased for specific engagements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Materials & supplies:</strong> Research reports, data purchases</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">🛠️</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Business Overhead
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Software subscriptions:</strong> Slack, Zoom, project management tools</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Professional development:</strong> Courses, certifications, conferences</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Marketing & sales:</strong> Website hosting, LinkedIn Premium, CRM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Office expenses:</strong> Coworking space, home office equipment</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">📋</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Professional Services
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Accounting & bookkeeping:</strong> CPA fees, tax prep services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Legal services:</strong> Contract review, incorporation, compliance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Insurance:</strong> Professional liability, business insurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Subcontractors:</strong> Specialized expertise for client projects</span>
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
              Set up once, track all consulting finances automatically
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Connect Your Business Accounts
                  </h3>
                  <p className="text-gray-600">
                    Link your business bank account and credit cards via Plaid. SheetLink supports 10,000+ financial institutions with bank-level security.
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
                    Every client payment, expense, and transaction appears in your spreadsheet with merchant name, amount, date, and account. No manual entry.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Tag by Client & Expense Type
                  </h3>
                  <p className="text-gray-600">
                    Add columns for "Client Name", "Expense Type" (Reimbursable, Overhead, Deductible), "Project", or any custom categories your practice needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Run Recipes for Client & Tax Reports
                  </h3>
                  <p className="text-gray-700">
                    Use <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to instantly generate client-specific income reports, reimbursable expense summaries, or quarterly tax estimates. One click turns raw transactions into professional reports.
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
                For Accountants & Bookkeepers
              </span>
            </div>

            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Professional Consultant Bookkeeping Workflow
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Streamline financial management for your independent consultant clients
            </p>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-sheetlink-text">
                The 5-Step Process:
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">1</span>
                  <div>
                    <strong className="text-sheetlink-text">Consultant connects accounts via Plaid</strong>
                    <p className="text-gray-600">Business bank account and credit cards. Secure bank-level authorization, no password sharing.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">2</span>
                  <div>
                    <strong className="text-sheetlink-text">Transactions sync into a shared Google Sheet</strong>
                    <p className="text-gray-600">All income and expenses appear automatically. Real-time updates across all accounts.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">3</span>
                  <div>
                    <strong className="text-sheetlink-text">Run SheetLink Recipes to auto-categorize</strong>
                    <p className="text-gray-600">Generate income summaries by client and expense reports by category.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">4</span>
                  <div>
                    <strong className="text-sheetlink-text">Review and adjust client allocations</strong>
                    <p className="text-gray-600">Verify reimbursable expenses, separate overhead from billable costs, match payments to invoices.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">5</span>
                  <div>
                    <strong className="text-sheetlink-text">Export reports for invoicing and tax filing</strong>
                    <p className="text-gray-600">Generate client invoices and quarterly tax estimates directly from the Sheet.</p>
                  </div>
                </li>
              </ol>

              <div className="mt-8 rounded-lg bg-blue-50 p-6">
                <p className="text-gray-700">
                  <strong className="text-sheetlink-text">Your Google Sheet becomes the <span className="text-sheetlink-green-700">system of record</span></strong> for consultant finances. You own the data. Your client owns the data. No exports, no lock-in, just clean multi-client bookkeeping in a spreadsheet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-sheetlink-text md:text-5xl">
              Stop Chasing Client Payments
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Track retainers, project payments, and business expenses automatically. Free for 7 days of history.
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
