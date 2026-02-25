import Head from 'next/head';
import { motion } from 'framer-motion';
import { Check, X, Zap, FileSpreadsheet, TrendingUp, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';

export default function ExcelBudgetingTool() {
  const seoTitle = 'Excel Budgeting Tool - Automated Bank Sync for Google Sheets (2026)';
  const seoDescription = 'Stop manually entering transactions into Excel. SheetLink automatically syncs bank transactions to Google Sheets. All the power of Excel budgeting with zero manual data entry.';
  const seoUrl = 'https://sheetlink.app/excel-budgeting-tool';
  const seoImage = 'https://sheetlink.app/og-image.png';

  // FAQ Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'Can I use Excel instead of Google Sheets for budgeting?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'SheetLink currently syncs to Google Sheets, not Excel. However, Google Sheets offers similar functionality to Excel—formulas, pivot tables, charts, and conditional formatting all work. You can export to Excel format anytime. Most Excel budget templates can be recreated in Google Sheets with SheetLink\'s automatic transaction sync.',
        },
      },
      {
        '@type': 'Question',
        'name': 'How is SheetLink different from manual Excel budgeting?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Manual Excel budgeting requires downloading bank CSVs, copying transactions, and manually categorizing everything. SheetLink automatically syncs bank transactions to Google Sheets via Plaid—no downloads, no manual entry. You get all the spreadsheet power of Excel with zero data entry work.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Can I still use my own budget formulas and categories?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Absolutely. SheetLink just handles the transaction sync—you control everything else. Use your own formulas, budget categories, conditional formatting, charts, and macros (via Google Apps Script). SheetLink provides the raw transaction data; you build the budget however you want.',
        },
      },
      {
        '@type': 'Question',
        'name': 'Is Google Sheets as powerful as Excel for budgeting?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'For most personal finance use cases, yes. Google Sheets supports formulas (SUMIF, VLOOKUP, pivot tables), conditional formatting, charts, and scripting via Apps Script. The main advantage: Google Sheets works in any browser and syncs across devices. You can access your budget from anywhere without desktop software.',
        },
      },
    ],
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="excel budgeting, google sheets budget, automated excel budget, bank sync for excel, best excel budget template, spreadsheet budget tool, automatic transaction import" />
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
                <Zap className="h-4 w-4" />
                Automated Excel-style budgeting
              </div>
            </motion.div>

            <h1 className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-6xl">
              <span className="text-sheetlink-green-700">Excel Budgeting</span> With Automatic Bank Sync
            </h1>

            <p className="mb-8 text-center text-xl text-gray-600 md:text-2xl">
              Stop manually entering transactions into spreadsheets. SheetLink syncs your bank transactions to Google Sheets automatically. All the power of Excel, zero data entry.
            </p>

            <div className="flex justify-center gap-4">
              <a
                href={URLS.chromeStore}
                className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
              >
                <FileSpreadsheet className="h-5 w-5" />
                Start Automatic Budgeting
              </a>
              <a
                href="/recipes"
                className="inline-flex items-center rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-sheetlink-text transition-all hover:border-sheetlink-green-700 hover:shadow-lg"
              >
                See Recipes →
              </a>
            </div>

            <p className="mt-6 text-center text-sm text-gray-500">
              No credit card required. Free for 7 days of transaction history.
            </p>
          </div>
        </section>

        {/* The Manual Excel Problem */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              The Manual Excel Budgeting Nightmare
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Manual CSV Downloads
                </h3>
                <p className="text-gray-600">
                  Log into your bank. Find the "Export" button. Download CSV. Open in Excel. Copy and paste. Repeat for every account. Every week. Every month. Forever.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-100">
                  <X className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Manual Transaction Entry
                </h3>
                <p className="text-gray-600">
                  Type in each transaction manually. Check for duplicates. Make sure amounts match. Forgot to log that coffee purchase last week? Your budget is wrong.
                </p>
              </div>

              <div className="rounded-lg bg-white p-8 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                  Manual Categorization
                </h3>
                <p className="text-gray-600">
                  Go through 100 transactions. Assign each one to a category. "Was Starbucks groceries or dining out?" Your budget is only as good as your manual effort.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Manual Excel vs SheetLink */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-12 text-center text-4xl font-bold text-sheetlink-text">
              Manual Excel Budgeting vs SheetLink
            </h2>

            <div className="overflow-hidden rounded-lg border-2 border-gray-200">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-6 py-4 text-left font-semibold text-sheetlink-text">Task</th>
                    <th className="px-6 py-4 text-center font-semibold text-sheetlink-green-700">SheetLink</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Manual Excel</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Get bank transactions</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Automatic sync</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600">Manual CSV download</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Add new transactions</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Automatic, real-time</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600">Manual copy/paste or typing</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Check for duplicates</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Handled automatically</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600">Manual review required</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Formulas & customization</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Full spreadsheet power</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Full Excel power</p>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Access from anywhere</td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <Check className="h-5 w-5 text-sheetlink-green-700" />
                      </div>
                      <p className="text-sm text-gray-600">Browser-based, syncs across devices</p>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        <X className="h-5 w-5 text-red-500" />
                      </div>
                      <p className="text-sm text-gray-600">Desktop software required</p>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 font-medium text-sheetlink-text">Time per week</td>
                    <td className="px-6 py-4 text-center text-sheetlink-green-700 font-semibold">~5 minutes (categorization only)</td>
                    <td className="px-6 py-4 text-center text-gray-600 font-semibold">~1-2 hours (downloads, entry, categorization)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* All the Power of Excel */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              All the Power of Excel Budgeting, Fully Automated
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Keep your custom formulas, pivot tables, and charts—just skip the data entry
            </p>

            <div className="space-y-6">
              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Use Any Budget Template</h3>
                  <p className="text-gray-600">
                    Already have an Excel budget template? Recreate it in Google Sheets. SheetLink syncs transactions automatically—you just add your budget formulas, categories, and formatting. SUMIF, VLOOKUP, pivot tables, conditional formatting—everything works.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Custom Categories & Tags</h3>
                  <p className="text-gray-600">
                    Add columns for your budget categories, subcategories, tags, or notes. Use formulas to calculate spending by category. Build the exact budget structure you need—no preset limitations.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Pivot Tables & Charts</h3>
                  <p className="text-gray-600">
                    Google Sheets supports pivot tables and charts just like Excel. Analyze spending trends, visualize budget vs actual, track monthly comparisons. All the analysis tools you're used to.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Conditional Formatting & Rules</h3>
                  <p className="text-gray-600">
                    Highlight overspending in red, budget wins in green. Set up custom rules to flag large transactions, identify trends, or alert you to budget overruns. All standard spreadsheet features work.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Scripts & Automation</h3>
                  <p className="text-gray-600">
                    Use Google Apps Script (similar to Excel VBA) to build custom automation. Or use <a href="/recipes" className="font-semibold text-sheetlink-green-700 underline">SheetLink Recipes</a> to generate budget reports, expense summaries, and tax categorization with one click.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              How SheetLink Works
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Set up once, track automatically forever
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  1
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
                  2
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Connect Your Bank Accounts via Plaid
                  </h3>
                  <p className="text-gray-600">
                    Link your bank accounts, credit cards, and PayPal. Plaid supports 10,000+ financial institutions with bank-level security. No more manual CSV downloads.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  3
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Transactions Sync Automatically
                  </h3>
                  <p className="text-gray-600">
                    Every transaction appears in your Google Sheet automatically. No manual entry. No copy/paste. Real-time updates as you spend.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-xl font-bold text-white">
                  4
                </div>
                <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-green-700">
                    Build Your Custom Budget
                  </h3>
                  <p className="text-gray-700">
                    Add columns for categories, budgets, and tags. Use your own formulas, pivot tables, and charts. Run <a href="/recipes" className="font-semibold underline hover:text-sheetlink-green-800">SheetLink Recipes</a> to generate reports instantly. You control everything—SheetLink just handles the data sync.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 rounded-lg bg-blue-50 p-8">
              <p className="text-gray-700">
                <strong className="text-sheetlink-text">Your Google Sheet becomes your <span className="text-sheetlink-green-700">system of record</span></strong>—just like Excel, but with automatic bank sync. All the spreadsheet power you need, zero manual data entry.
              </p>
            </div>
          </div>
        </section>

        {/* Why Google Sheets Instead of Excel */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-4 text-center text-4xl font-bold text-sheetlink-text">
              Why Google Sheets Instead of Excel?
            </h2>
            <p className="mb-12 text-center text-xl text-gray-600">
              Same power, better access
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Works Anywhere</h3>
                  <p className="text-gray-600">
                    Access your budget from any browser—Mac, Windows, Linux, Chromebook, or phone. No desktop software required.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Auto-Saves & Syncs</h3>
                  <p className="text-gray-600">
                    Google Sheets saves automatically and syncs across all your devices. Never lose your budget to a crashed laptop.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Easy Sharing</h3>
                  <p className="text-gray-600">
                    Share your budget with your spouse, accountant, or financial advisor with a simple link. Collaborate in real-time.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg bg-white p-6 shadow-sm">
                <Check className="h-6 w-6 flex-shrink-0 text-sheetlink-green-700" />
                <div>
                  <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Export to Excel Anytime</h3>
                  <p className="text-gray-600">
                    Download as Excel (.xlsx) anytime. Google Sheets is compatible with Excel—formulas and formatting transfer seamlessly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-sheetlink-text md:text-5xl">
              Stop Manually Entering Transactions
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Get all the power of Excel budgeting with automatic bank sync. Free for 7 days of transaction history.
            </p>
            <a
              href={URLS.chromeStore}
              className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-sheetlink-green-800 hover:shadow-lg"
            >
              <FileSpreadsheet className="h-5 w-5" />
              Install Free Chrome Extension
            </a>
            <p className="mt-4 text-sm text-gray-500">
              No credit card required. Open source. Independent.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
