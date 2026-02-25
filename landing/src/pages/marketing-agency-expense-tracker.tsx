import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, FileSpreadsheet, Zap, Check, AlertCircle, CreditCard, Users, Receipt } from 'lucide-react';
import { BRAND, URLS } from '@/lib/constants';

export default function MarketingAgencyExpenseTracker() {
  const seoTitle = 'Marketing Agency Expense Tracker - Track Client Reimbursable Expenses in Google Sheets';
  const seoDescription = 'Track ad spend, client reimbursable expenses, team subscriptions, and agency overhead automatically. Built for digital marketing agencies managing multiple client budgets.';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How do I track client reimbursable expenses for my agency?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink syncs all bank and credit card transactions into Google Sheets. Add a "Client" column to tag which expenses are reimbursable, then use SheetLink Recipes to generate client-specific expense reports. Perfect for tracking ad spend, software costs, and other billable expenses across multiple clients.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can SheetLink help separate agency overhead from client expenses?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes. Create custom columns in your Google Sheet to categorize transactions as "Agency Overhead" vs "Client Reimbursable" vs "Direct Ad Spend". Use filters and pivot tables to analyze profitability by client or campaign. SheetLink gives you the raw transaction data—you control the categorization.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Does this work for agencies managing multiple client credit cards?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely. Connect multiple bank accounts and credit cards via Plaid. Each card\'s transactions appear in your master Google Sheet with the account name, making it easy to track which expenses belong to which client or campaign.'
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
        <link rel="canonical" href="https://sheetlink.app/marketing-agency-expense-tracker" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://sheetlink.app/marketing-agency-expense-tracker" />
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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                <TrendingUp className="h-4 w-4" />
                Built for Marketing Agencies
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
                Marketing Agency <span className="text-sheetlink-green-700">Expense Tracker</span>
              </h1>

              <p className="mb-8 text-xl text-gray-600 md:text-2xl">
                Track ad spend, client reimbursable expenses, and team subscriptions across multiple clients and campaigns in Google Sheets.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href={URLS.chromeStore}
                  className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
                >
                  <FileSpreadsheet className="h-5 w-5" />
                  Start Tracking Expenses
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

        {/* The Agency Expense Chaos */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              The Multi-Client Expense Nightmare
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Tracking what's billable vs overhead across 10+ clients
            </p>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <CreditCard className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Ad Spend Chaos
                </h3>
                <p className="text-gray-600">
                  Facebook Ads for Client A. Google Ads for Client B. LinkedIn campaigns for Client C. Which credit card? Which campaign? Is this reimbursable or included in retainer?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <Receipt className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Reimbursable Expense Hell
                </h3>
                <p className="text-gray-600">
                  Stock photos for Client D's campaign. Canva template for Client E. Domain renewal for Client F. You need to invoice these, but where's the receipt? Which card was it on?
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <AlertCircle className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Overhead vs Client Costs
                </h3>
                <p className="text-gray-600">
                  SEMrush subscription—split across 3 clients. Slack workspace—agency overhead. Zapier—half client, half internal. Your bookkeeper needs clean categorization by Friday.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What SheetLink Tracks */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Track Every Agency Expense
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              From ad spend to team tools, automatically in Google Sheets
            </p>

            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">📊</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Client Ad Spend
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Paid social:</strong> Facebook Ads, Instagram Ads, TikTok Ads, LinkedIn Ads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Search advertising:</strong> Google Ads, Microsoft Advertising, Amazon Ads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Display & programmatic:</strong> Display campaigns, retargeting, native ads</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Influencer payments:</strong> Creator partnerships, sponsored posts</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">💳</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Client Reimbursable Expenses
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Creative assets:</strong> Stock photos, icons, fonts, video footage</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Domain & hosting:</strong> Client website domains, landing page hosting</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Software licenses:</strong> Client-specific tool subscriptions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Contractor payments:</strong> Freelance writers, designers, videographers</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">🛠️</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Agency Tools & Software
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Marketing platforms:</strong> HubSpot, Mailchimp, ActiveCampaign</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Analytics & SEO:</strong> SEMrush, Ahrefs, Moz, Google Analytics 360</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Design & collaboration:</strong> Canva, Figma, Adobe Creative Cloud</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Project management:</strong> Asana, ClickUp, Monday.com, Slack</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-lg bg-white p-8">
                <div className="mb-4 text-4xl">🏢</div>
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Agency Overhead
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Office expenses:</strong> Coworking space, utilities, internet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Payroll & benefits:</strong> Team salaries, health insurance, retirement</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Professional development:</strong> Conferences, training, certifications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                    <span className="text-gray-700"><strong>Business services:</strong> Accounting, legal, insurance</span>
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
              Connect once, track everything automatically
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  1
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Connect All Agency Accounts
                  </h3>
                  <p className="text-gray-600">
                    Link your agency bank account, business credit cards, and any client-specific cards via Plaid. SheetLink supports 10,000+ financial institutions.
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
                    Every ad charge, subscription payment, and expense appears in your spreadsheet with merchant name, amount, date, and account. No manual CSV downloads.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Tag by Client & Category
                  </h3>
                  <p className="text-gray-600">
                    Add columns for "Client Name", "Expense Type" (Ad Spend, Reimbursable, Overhead), "Campaign", or any custom tags your agency needs.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Run Recipes for Client Reports
                  </h3>
                  <p className="text-gray-700">
                    Use <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to instantly generate client-specific expense summaries, reimbursable cost reports, or agency overhead breakdowns. One click turns raw transactions into billable reports.
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
              Professional Agency Bookkeeping Workflow
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Streamline multi-client expense tracking for marketing agencies
            </p>

            <div className="rounded-lg bg-white p-8 shadow-sm">
              <h3 className="mb-6 text-2xl font-bold text-sheetlink-text">
                The 5-Step Process:
              </h3>
              <ol className="space-y-4">
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">1</span>
                  <div>
                    <strong className="text-sheetlink-text">Agency connects all accounts via Plaid</strong>
                    <p className="text-gray-600">Business bank account, corporate cards, and client-specific cards. Secure bank-level authorization.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">2</span>
                  <div>
                    <strong className="text-sheetlink-text">Transactions sync into a shared Google Sheet</strong>
                    <p className="text-gray-600">All expenses across all accounts appear in one master spreadsheet. Real-time updates.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">3</span>
                  <div>
                    <strong className="text-sheetlink-text">Run SheetLink Recipes to auto-categorize</strong>
                    <p className="text-gray-600">Generate expense summaries by client, separate reimbursable costs from overhead.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">4</span>
                  <div>
                    <strong className="text-sheetlink-text">Review and adjust client tags</strong>
                    <p className="text-gray-600">Verify expense allocation, match to specific campaigns or retainers.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">5</span>
                  <div>
                    <strong className="text-sheetlink-text">Export reports for client billing</strong>
                    <p className="text-gray-600">Generate invoices directly from the Sheet. No proprietary software lock-in.</p>
                  </div>
                </li>
              </ol>

              <div className="mt-8 rounded-lg bg-blue-50 p-6">
                <p className="text-gray-700">
                  <strong className="text-sheetlink-text">Your Google Sheet becomes the <span className="text-sheetlink-green-700">system of record</span></strong> for agency expense tracking. You own the data. Clients can access their specific expenses. No exports, no lock-in, just clean multi-client bookkeeping in a spreadsheet.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-sheetlink-text md:text-5xl">
              Stop Hunting for Client Expenses
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Track ad spend, reimbursable costs, and agency overhead across all clients automatically. Free for 7 days of history.
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
