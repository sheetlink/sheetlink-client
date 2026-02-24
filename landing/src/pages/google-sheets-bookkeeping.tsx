import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function GoogleSheetsBookkeeping() {
  const seoTitle = 'Google Sheets Bookkeeping - Automate Your Accounting with Bank Sync';
  const seoDescription = 'Use Google Sheets for bookkeeping with automatic bank transaction sync. Track income, expenses, and cash flow in real-time. Free bookkeeping template with SheetLink.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Can I use Google Sheets for small business bookkeeping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Google Sheets is excellent for small business bookkeeping. With SheetLink, you can automatically sync bank transactions to Google Sheets using Plaid, giving you real-time income and expense tracking. It's flexible, free, and powerful enough for small businesses that don't need complex features like inventory management or payroll."
        }
      },
      {
        "@type": "Question",
        "name": "How do I automatically sync bank transactions to Google Sheets for bookkeeping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension, connect your bank account through Plaid (trusted by Venmo and Robinhood), and choose your Google Sheet. Transactions will sync automatically with date, merchant, amount, and category. Free for 7 days of history, or $2/month for unlimited transactions."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink a good alternative to QuickBooks for bookkeeping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink is a simpler, more affordable alternative to QuickBooks for basic bookkeeping. If you need automatic bank sync, expense categorization, and P&L statements in Google Sheets, SheetLink costs $2/month vs QuickBooks' $30-75/month. However, for complex needs like inventory, payroll, or invoicing, QuickBooks is better suited."
        }
      },
      {
        "@type": "Question",
        "name": "What bookkeeping data does SheetLink sync to Google Sheets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink syncs: transaction date, merchant/payee description, amount (debit/credit), category (auto-categorized by Plaid), account name, and pending status. You can add custom columns for business vs personal tags, tax deductions, project codes, reconciliation checks, and notes."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="google sheets bookkeeping, sheets accounting, bookkeeping template google sheets, track expenses google sheets, small business accounting" />

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
            Google Sheets Bookkeeping: Automate Your Accounting
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Google Sheets is one of the best tools for <strong>bookkeeping</strong>—it's flexible,
              free, and powerful enough to handle everything from personal expense tracking to small
              business accounting. The only problem? Manually entering transaction data is tedious.
            </p>
            <p className="text-xl leading-relaxed">
              <strong>SheetLink solves this</strong> by automatically syncing your bank transactions
              to Google Sheets using Plaid, turning your spreadsheet into a real-time bookkeeping system.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Use Google Sheets for Bookkeeping?
            </h2>
            <p>
              Professional accounting software like QuickBooks costs $30-75/month and locks your data
              behind proprietary interfaces. Google Sheets gives you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Complete control</strong> - Build bookkeeping systems that match your exact workflow</li>
              <li><strong>Zero cost</strong> - Google Sheets is free (SheetLink has a free tier too)</li>
              <li><strong>Transparency</strong> - See every formula, every calculation, no black boxes</li>
              <li><strong>Flexibility</strong> - Custom categories, tags, reports, dashboards</li>
              <li><strong>Easy sharing</strong> - Send reports to your accountant or tax preparer instantly</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How SheetLink Automates Google Sheets Bookkeeping
            </h2>
            <p>
              Instead of logging into your bank, downloading CSVs, and manually importing transactions,
              SheetLink does it all for you:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink</strong> - Add the Chrome extension
              </li>
              <li>
                <strong>Connect Your Bank</strong> - Link checking, savings, or credit card accounts via Plaid
              </li>
              <li>
                <strong>Choose Your Bookkeeping Sheet</strong> - Point to your existing template or create a new one
              </li>
              <li>
                <strong>Auto-Sync Transactions</strong> - SheetLink writes each transaction as a row with date, amount, merchant, category
              </li>
              <li>
                <strong>Categorize & Reconcile</strong> - Use formulas to categorize expenses, track income, reconcile accounts
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What Data Does SheetLink Sync for Bookkeeping?
            </h2>
            <p>
              Each bank transaction includes the fields you need for proper bookkeeping:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Date</strong> - Transaction date (important for cash vs. accrual accounting)</li>
              <li><strong>Description</strong> - Merchant name or payee</li>
              <li><strong>Amount</strong> - Debit or credit (negative = expense, positive = income)</li>
              <li><strong>Category</strong> - Auto-categorized by Plaid (customize with rules)</li>
              <li><strong>Account</strong> - Which bank account the transaction came from</li>
              <li><strong>Pending Status</strong> - Know if a transaction has cleared yet</li>
            </ul>
            <p>
              From there, you can add your own columns for:
            </p>
            <ul className="list-disc pl-6">
              <li>Business vs. Personal</li>
              <li>Tax deductible tags</li>
              <li>Project or client codes</li>
              <li>Reconciliation checkmarks</li>
              <li>Notes or receipts links</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Google Sheets Bookkeeping Template
            </h2>
            <p>
              A simple bookkeeping system in Google Sheets needs three tabs:
            </p>
            <div className="my-6">
              <h3 className="text-xl font-bold text-sheetlink-text">1. Transactions (Raw Data)</h3>
              <p>
                This is where SheetLink writes your bank data. Columns: Date, Description, Amount, Category, Account.
              </p>

              <h3 className="mt-6 text-xl font-bold text-sheetlink-text">2. Income & Expense Summary</h3>
              <p>
                Use SUMIF formulas to total income and expenses by category. Example:
              </p>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
                =SUMIF(Transactions!D:D, "Food & Drink", Transactions!C:C)
              </pre>

              <h3 className="mt-6 text-xl font-bold text-sheetlink-text">3. Cash Flow Report</h3>
              <p>
                Track net cash flow over time with pivot tables or time-series charts. Monitor account balances,
                burn rate, or profit margins.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Small Business Bookkeeping in Google Sheets
            </h2>
            <p>
              If you run a small business, freelance operation, or side hustle, Google Sheets + SheetLink
              can handle your bookkeeping needs:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Track business expenses</strong> - Separate business transactions from personal</li>
              <li><strong>Categorize for taxes</strong> - Tag deductible expenses (office supplies, travel, software)</li>
              <li><strong>Generate P&L statements</strong> - Use formulas to calculate profit and loss by month/quarter</li>
              <li><strong>Reconcile accounts</strong> - Match bank balances to your Sheet balances monthly</li>
              <li><strong>Share with your accountant</strong> - Export to CSV or give view access for tax prep</li>
            </ul>
            <p>
              <strong>When to upgrade to QuickBooks:</strong> If you need invoicing, payroll, inventory tracking,
              or multi-user collaboration, consider dedicated accounting software. But for expense tracking,
              cash flow monitoring, and basic P&L reports, Google Sheets is more than enough.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Is Google Sheets Secure for Bookkeeping?
            </h2>
            <p>
              Google Sheets is as secure as your Google account. To protect your bookkeeping data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Enable 2-factor authentication</strong> on your Google account</li>
              <li><strong>Don't share sheets publicly</strong> - Keep financial data private or share only with specific people</li>
              <li><strong>Use SheetLink's read-only sync</strong> - SheetLink never reads your Sheet, only writes transaction data</li>
              <li><strong>Regularly back up important sheets</strong> - Download copies as Excel or PDF</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing: Free Bookkeeping for 7 Days of History
            </h2>
            <p>
              <strong>SheetLink is free forever for the last 7 days of transactions.</strong> This works well for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Personal expense tracking</li>
              <li>Weekly bookkeeping reviews</li>
              <li>Cash flow monitoring</li>
            </ul>
            <p>
              Need longer history for annual tax prep or monthly reconciliation? Upgrade to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Basic ($1.99/month)</strong> - 90 days of history, auto-sync every 24 hours</li>
              <li><strong>Pro ($9.99/month)</strong> - 24 months of history, hourly sync, AI categorization, rules engine</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started with Google Sheets Bookkeeping
            </h2>
            <p>
              Stop manually entering transactions and start automating your bookkeeping. Install SheetLink
              and sync your first bank account in under 2 minutes.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to automate your Google Sheets bookkeeping?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for 7 days of transaction history. No credit card required.
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
                Add to Chrome - Start Bookkeeping
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
