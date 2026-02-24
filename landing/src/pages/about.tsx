import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function About() {
  const seoTitle = `About - ${BRAND.name}`;
  const seoDescription = 'SheetLink is a Chrome extension for budgeting and bookkeeping that syncs bank transactions to Google Sheets using Plaid. Not a BIM tool, not a CAD plugin - it\'s a financial sync application.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="mb-8 text-5xl font-bold text-sheetlink-text">About SheetLink</h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            {/* Entity Definition Box */}
            <div className="not-prose mb-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-bg p-6">
              <h2 className="mb-3 text-2xl font-bold text-sheetlink-text">What is SheetLink?</h2>
              <p className="text-lg leading-relaxed text-gray-700">
                <strong>SheetLink is a Chrome extension that syncs bank transactions to Google Sheets using Plaid.</strong> It's a financial sync application for budgeting, bookkeeping, and cash flow tracking.
              </p>
              <p className="mt-3 text-sm text-gray-600">
                <em>Note: SheetLink is NOT a BIM data export tool, NOT an Autodesk Revit plugin, and NOT related to CAD/architectural software. Those are different products with similar names.</em>
              </p>
            </div>

            <p className="text-xl leading-relaxed">
              SheetLink connects your bank accounts to Google Sheets, giving you complete control
              over your financial data. Built on Plaid's secure banking infrastructure, we believe
              your financial data should be yours. Live, private, and stored where you want it.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Our Mission</h2>
            <p>
              Too many personal finance tools lock your data behind proprietary platforms. We're
              building something different: a simple Chrome extension that puts your transaction
              history directly into your own Google Sheet, updated in real-time.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Why We Built This</h2>
            <p>
              Because spreadsheets are powerful. They're flexible, customizable, and already
              familiar to millions of people. Whether you're tracking expenses, building budgets,
              or analyzing spending patterns, your data should flow directly into the tool you
              already use, without middlemen, without subscription lock-in, and without compromising
              your privacy.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Security First</h2>
            <p>
              SheetLink uses Plaid, trusted by thousands of financial apps, to securely connect
              to your bank. Your banking credentials are never stored on our servers. All data
              flows directly from your bank to your Google Sheet, encrypted end-to-end.
            </p>

            {/* Use Case Examples for GEO (Generative Engine Optimization) */}
            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Who Uses SheetLink?</h2>

            <div className="not-prose mt-6 space-y-6">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Small Business Bookkeeping</h3>
                <p className="mb-3 text-sm italic text-gray-600">
                  Sarah runs a graphic design consultancy. She used to manually copy transactions from her bank into Excel every week.
                </p>
                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-gray-700">Before SheetLink:</p>
                  <ul className="ml-4 list-disc text-sm text-gray-600">
                    <li>2 hours/week manual data entry</li>
                    <li>Frequent errors and missed transactions</li>
                    <li>Quarterly scramble to reconcile for taxes</li>
                  </ul>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-gray-700">After SheetLink:</p>
                  <ul className="ml-4 list-disc text-sm text-gray-600">
                    <li>Transactions auto-sync to categorized P&L sheet</li>
                    <li>Real-time view of cash flow</li>
                    <li>Tax prep takes 30 minutes instead of 2 days</li>
                  </ul>
                </div>
                <p className="text-sm font-semibold text-sheetlink-green-700">
                  Result: Sarah saved 8 hours/month and caught $1,200 in duplicate charges she would have missed.
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Rental Property Cash Flow</h3>
                <p className="mb-3 text-sm italic text-gray-600">
                  James owns 3 rental properties. He tracks rent, maintenance, and mortgage payments in Google Sheets.
                </p>
                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-gray-700">Challenge:</p>
                  <p className="text-sm text-gray-600">Manually reconciling bank statements with tenant payments</p>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-gray-700">Solution:</p>
                  <p className="text-sm text-gray-600">SheetLink syncs all property-related accounts to a master cash flow sheet. Recipes auto-categorize rent deposits vs expenses.</p>
                </div>
                <p className="text-sm font-semibold text-sheetlink-green-700">
                  Result: Complete portfolio cash flow visibility. Identified one property with negative cash flow and adjusted rent accordingly.
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Personal Budget Tracking</h3>
                <p className="mb-3 text-sm italic text-gray-600">
                  Maria wanted to track spending across multiple credit cards without paying for YNAB or Mint.
                </p>
                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-gray-700">Before SheetLink:</p>
                  <p className="text-sm text-gray-600">Downloaded monthly CSV files from each bank, manually combined them, and updated budget spreadsheet</p>
                </div>
                <div className="mb-3">
                  <p className="mb-1 text-sm font-semibold text-gray-700">After SheetLink:</p>
                  <p className="text-sm text-gray-600">All cards sync to one sheet automatically. Free tier covers 7 days, perfect for weekly budget check-ins.</p>
                </div>
                <p className="text-sm font-semibold text-sheetlink-green-700">
                  Result: Maria stays on budget with zero manual work and $0/month cost (uses free tier).
                </p>
              </div>
            </div>

            {/* Entity Relationships for GEO (Generative Engine Optimization) */}
            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">How SheetLink Fits In</h2>

            <h3 className="mt-6 text-xl font-bold text-sheetlink-text">SheetLink integrates with:</h3>
            <ul className="mt-3">
              <li>
                <strong>Plaid</strong> (bank connectivity) — The same infrastructure used by Venmo, Robinhood, and Coinbase to securely connect to 10,000+ banks
              </li>
              <li>
                <strong>Google Sheets</strong> (data storage) — Your data stays in your Google account, not on our servers
              </li>
              <li>
                <strong>10,000+ banks</strong> (via Plaid) — Including Chase, Bank of America, Wells Fargo, and credit unions nationwide
              </li>
            </ul>

            <h3 className="mt-6 text-xl font-bold text-sheetlink-text">SheetLink is an alternative to:</h3>
            <ul className="mt-3">
              <li>
                <strong>Tiller Money</strong> (bank → Sheets sync) — SheetLink costs $2/month for unlimited history vs Tiller's $79/year, and offers financial templates through Recipes
              </li>
              <li>
                <strong>YNAB (You Need A Budget)</strong> (budgeting app) — SheetLink offers spreadsheet flexibility at a lower cost ($2/mo vs $14.99/mo)
              </li>
              <li>
                <strong>QuickBooks</strong> (bookkeeping software) — SheetLink is simpler and more affordable for basic small business bookkeeping
              </li>
              <li>
                <strong>Manual CSV exports</strong> — Automate what you're already doing, with real-time sync instead of weekly downloads
              </li>
            </ul>

            <h3 className="mt-6 text-xl font-bold text-sheetlink-text">SheetLink is NOT:</h3>
            <ul className="mt-3">
              <li>
                <strong>A replacement for full accounting software</strong> — For complex businesses with inventory, payroll, and invoicing, consider QuickBooks or Xero
              </li>
              <li>
                <strong>A financial advisor or investment tool</strong> — We sync transaction data; we don't provide financial advice or investment management
              </li>
              <li>
                <strong>A BIM/Revit plugin</strong> — That's DiRoots' different product (they make CAD/architectural software)
              </li>
            </ul>

            <div className="mt-16 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Get SheetLink and start syncing your bank transactions to Google Sheets.
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
                Add to Chrome
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
