import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function TaxPrepSpreadsheet() {
  const seoTitle = 'Tax Prep Spreadsheet - Organize Bank Transactions for Tax Season | SheetLink';
  const seoDescription = 'Automatically sync bank transactions to Google Sheets for tax preparation. Track income, categorize deductible expenses, and organize receipts for tax season. Free for 7 days of history.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I organize bank transactions for taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension, connect your bank account via Plaid, and sync transactions to Google Sheets. SheetLink auto-categorizes transactions so you can easily identify deductible expenses, track income, and organize receipts for tax filing. Perfect for freelancers, contractors, and small business owners preparing for tax season."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use Google Sheets to track expenses for taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Google Sheets is excellent for tax prep. With SheetLink, you can automatically sync bank transactions, categorize business expenses, track 1099 income, and generate reports for your accountant. SheetLink supports multiple accounts so you can separate personal and business transactions."
        }
      },
      {
        "@type": "Question",
        "name": "What transactions should I track for tax deductions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track all business-related expenses: home office costs, equipment purchases, software subscriptions, travel expenses, meals, vehicle expenses, and professional services. SheetLink automatically syncs these from your bank and credit cards to Google Sheets, where you can categorize and tag them for tax deductions."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink safe for tracking tax information?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink uses Plaid (SOC 2 Type II certified) for bank connectivity - the same infrastructure trusted by major financial apps. Your bank credentials never touch SheetLink servers. Transaction data flows directly from Plaid to your Google Sheet. All data stays in your Google account where you control access."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="tax prep spreadsheet, organize transactions for taxes, track expenses for taxes, 1099 income tracking, business expense tracker, tax deduction spreadsheet" />

        {/* FAQ Schema for AI Answer Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="mb-8 text-5xl font-bold text-sheetlink-text">
            Tax Prep Spreadsheet - Organize Transactions for Tax Season
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Stop scrambling through bank statements at tax time. <strong>SheetLink automatically syncs your bank transactions to Google Sheets</strong>, making tax prep simple. Track income, categorize deductible expenses, and generate reports for your accountant—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Use a Spreadsheet for Tax Prep?
            </h2>
            <p>
              Tax software is expensive and inflexible. Spreadsheets give you complete control over how you organize and categorize your financial data for taxes. With SheetLink, you get:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Automatic transaction import</strong> - No manual CSV downloads or data entry</li>
              <li><strong>Custom categorization</strong> - Tag expenses by tax category (meals, travel, equipment, etc.)</li>
              <li><strong>Multi-account tracking</strong> - Combine business checking, credit cards, and personal accounts</li>
              <li><strong>Year-round organization</strong> - Track expenses as they happen, not just at tax time</li>
              <li><strong>Shareable with accountant</strong> - Give your CPA view access to your organized data</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Build Your Tax Prep Spreadsheet
            </h2>
            <p>
              Setting up SheetLink for tax preparation takes less than 5 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Bank Accounts</strong> - Link business and personal accounts via Plaid (10,000+ banks supported)
              </li>
              <li>
                <strong>Create Your Google Sheet</strong> - Start with a blank sheet or use a tax prep template
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all transactions with date, merchant, amount, and category
              </li>
              <li>
                <strong>Categorize for Taxes</strong> - Add columns for tax categories, notes, and receipt links
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What Expenses Can I Track for Tax Deductions?
            </h2>
            <p>
              SheetLink syncs all transaction types so you can track every deductible expense:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Business Expenses</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Software subscriptions</li>
                  <li>Office supplies</li>
                  <li>Equipment purchases</li>
                  <li>Professional services</li>
                  <li>Marketing & advertising</li>
                  <li>Website & hosting</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Deductible Costs</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Business meals (50%)</li>
                  <li>Travel expenses</li>
                  <li>Vehicle mileage</li>
                  <li>Home office costs</li>
                  <li>Education & training</li>
                  <li>Insurance premiums</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Perfect for Freelancers, Contractors, and Small Business Owners
            </h2>
            <p>
              If you receive 1099 income or run a small business, you need organized records for tax filing. SheetLink is designed for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Freelancers & Contractors</strong> - Track income from multiple clients and deductible business expenses</li>
              <li><strong>Side Hustlers</strong> - Separate business and personal transactions for accurate tax reporting</li>
              <li><strong>Gig Workers</strong> - Organize Uber, DoorDash, or Etsy income and expenses</li>
              <li><strong>Small Business Owners</strong> - Maintain clean books for Schedule C or corporate tax returns</li>
              <li><strong>Rental Property Owners</strong> - Track rental income, maintenance costs, and depreciation</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Season Workflow with SheetLink
            </h2>
            <p>
              Here's how to use your SheetLink spreadsheet at tax time:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 1: Review All Transactions</h3>
                <p className="text-sm mt-2">
                  Filter your sheet to show the tax year. Review each transaction and ensure proper categorization.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 2: Calculate Totals by Category</h3>
                <p className="text-sm mt-2">
                  Use SUM formulas to total expenses by tax category (e.g., total business meals, total travel).
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 3: Generate Reports for Your Accountant</h3>
                <p className="text-sm mt-2">
                  Create a summary sheet with income and expense totals. Share view access with your CPA or download as PDF.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 4: File with Confidence</h3>
                <p className="text-sm mt-2">
                  Your organized records make tax filing accurate and audit-proof. Keep your sheet for 7 years as required by IRS.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Manual Tax Prep
            </h2>
            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Manual Tracking</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">SheetLink</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Download CSVs from each bank</td>
                    <td className="px-6 py-4">Auto-sync from all accounts</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Manually categorize each expense</td>
                    <td className="px-6 py-4">AI auto-categorization</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Search for receipts at tax time</td>
                    <td className="px-6 py-4">Tag and link receipts year-round</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Risk missing deductions</td>
                    <td className="px-6 py-4">Complete transaction history</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Security & Privacy for Tax Data
            </h2>
            <p>
              Tax records contain sensitive financial information. SheetLink protects your data with:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Bank-grade encryption</strong> - All data transfers use TLS 1.3 encryption</li>
              <li><strong>Plaid-powered connectivity</strong> - Your bank credentials are handled by SOC 2 certified Plaid, not SheetLink</li>
              <li><strong>Zero server storage</strong> - Transactions flow directly from Plaid to your Google Sheet</li>
              <li><strong>You control access</strong> - Your data lives in your Google account with your permissions</li>
              <li><strong>Read-only access</strong> - SheetLink can only read transactions, never initiate transfers</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing: Free for Tax Season Prep
            </h2>
            <p>
              <strong>SheetLink is free forever for the last 7 days of transactions.</strong> For full tax year history:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (great for weekly expense tracking)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (covers quarterly tax prep)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (full tax records + prior year)</li>
            </ul>
            <p className="mt-4">
              Much more affordable than tax software subscriptions ($50-200/year) or bookkeeping services ($200-500/month).
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Build Your Tax Prep Spreadsheet Today
            </h2>
            <p>
              Don't wait until April 15th to organize your taxes. Start syncing your transactions now and stay prepared year-round.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to organize your taxes in Google Sheets?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. No credit card required.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                </svg>
                Add to Chrome - Start Tracking
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
