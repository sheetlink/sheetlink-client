import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function SyncBankToGoogleSheets() {
  const seoTitle = 'Sync Bank to Google Sheets - Automatically Import Transactions with Plaid';
  const seoDescription = 'Sync your bank account to Google Sheets automatically. SheetLink uses Plaid to import transactions from 10,000+ banks directly into your spreadsheet. Free for 7 days of history.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I sync my bank account to Google Sheets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension, connect your bank account through Plaid (supports 10,000+ banks), and select your Google Sheet. Transactions will sync automatically with date, merchant, amount, and category. Plaid handles bank authentication securely - SheetLink never sees your bank credentials. Free for the last 7 days of transactions."
        }
      },
      {
        "@type": "Question",
        "name": "Is it safe to sync my bank to Google Sheets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink uses Plaid, the same bank connectivity trusted by Venmo, Robinhood, and thousands of financial apps. Your bank credentials are handled exclusively by Plaid (SOC 2 Type II certified). SheetLink never stores transaction history - data flows directly from Plaid to your Google Sheet in under 1 second. Plaid access tokens are encrypted at rest."
        }
      },
      {
        "@type": "Question",
        "name": "What banks can I sync to Google Sheets with SheetLink?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink supports 10,000+ banks via Plaid, including Chase, Bank of America, Wells Fargo, Citi, Capital One, US Bank, PNC, and virtually all credit unions. If your bank offers online banking, it likely works with Plaid. You can connect checking accounts, savings accounts, and credit cards."
        }
      },
      {
        "@type": "Question",
        "name": "How much does it cost to sync bank transactions to Google Sheets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink is free forever for the last 7 days of transactions (perfect for weekly budget tracking). For unlimited transaction history and real-time auto-sync, it's $2/month. This is significantly cheaper than alternatives like Tiller Money ($79/year) or YNAB ($14.99/month)."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="sync bank to google sheets, bank transactions google sheets, plaid google sheets, import bank data to sheets, automatic bank sync" />

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
            Sync Bank Transactions to Google Sheets
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Looking to <strong>sync your bank account to Google Sheets</strong>? SheetLink makes it easy
              to automatically import bank transactions into your spreadsheet using Plaid's secure API.
              No manual CSV downloads, no copy-paste—just real-time transaction data flowing directly
              into your Google Sheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Sync Bank Transactions to Google Sheets
            </h2>
            <p>
              SheetLink connects to your bank via <strong>Plaid</strong>, the same infrastructure used
              by Venmo, Robinhood, and thousands of financial apps. Here's how it works:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add the extension from the Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Bank via Plaid</strong> - Securely link your checking or savings account (10,000+ banks supported)
              </li>
              <li>
                <strong>Choose Your Google Sheet</strong> - Point SheetLink to any spreadsheet you own
              </li>
              <li>
                <strong>Sync Transactions</strong> - Hit sync and watch your transactions populate in real-time
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Sync Bank Data to Google Sheets?
            </h2>
            <p>
              Google Sheets is the most flexible tool for managing your finances. When you sync bank
              transactions to Sheets, you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Build custom budgets</strong> with formulas that match your exact needs</li>
              <li><strong>Analyze spending patterns</strong> with pivot tables and charts</li>
              <li><strong>Share financial reports</strong> with your accountant or partner</li>
              <li><strong>Automate bookkeeping</strong> by categorizing transactions automatically</li>
              <li><strong>Track cash flow</strong> across multiple accounts in one dashboard</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Manual CSV Exports
            </h2>
            <p>
              Most people sync bank data to Google Sheets by downloading CSV files from their bank
              and manually importing them. This works, but it's tedious and error-prone.
            </p>
            <p>
              <strong>SheetLink automates the entire process:</strong>
            </p>
            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Manual CSV</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">SheetLink</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Log into bank website</td>
                    <td className="px-6 py-4">One-click sync from Chrome</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Download CSV file</td>
                    <td className="px-6 py-4">Direct API connection</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Open Sheets, import CSV</td>
                    <td className="px-6 py-4">Auto-writes to your Sheet</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Repeat weekly</td>
                    <td className="px-6 py-4">Auto-sync (paid tiers)</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Supported Banks for Google Sheets Sync
            </h2>
            <p>
              SheetLink uses Plaid to connect to <strong>over 10,000 banks and credit unions</strong>, including:
            </p>
            <ul className="list-disc pl-6 grid grid-cols-2 gap-2">
              <li>Chase</li>
              <li>Bank of America</li>
              <li>Wells Fargo</li>
              <li>Citibank</li>
              <li>Capital One</li>
              <li>US Bank</li>
              <li>PNC Bank</li>
              <li>TD Bank</li>
              <li>American Express</li>
              <li>Discover</li>
              <li>Credit unions</li>
              <li>Regional banks</li>
            </ul>
            <p className="mt-4">
              If your bank supports online banking, it's likely supported by Plaid and SheetLink.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Security & Privacy
            </h2>
            <p>
              Syncing bank data to Google Sheets requires trust. Here's how SheetLink protects your information:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Plaid handles authentication</strong> - Your bank credentials never touch SheetLink servers</li>
              <li><strong>Read-only access</strong> - SheetLink can only view transactions, not initiate transfers</li>
              <li><strong>Encrypted connections</strong> - All data flows over HTTPS with TLS 1.3</li>
              <li><strong>Pass-through architecture</strong> - Transaction data doesn't sit on our servers</li>
              <li><strong>You control the sheet</strong> - Your data lives in your Google account, not ours</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing: Free Forever Tier
            </h2>
            <p>
              <strong>SheetLink is free forever for the last 7 days of transactions.</strong> Perfect for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Weekly budget reviews</li>
              <li>Tracking recent spending</li>
              <li>Testing the sync before upgrading</li>
              <li>Light personal finance tracking</li>
            </ul>
            <p>
              Need more history? Upgrade to Basic ($1.99/month for 90 days) or Pro ($9.99/month for 24 months)
              with hourly auto-sync, AI categorization, and advanced rules.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Sync Your Bank to Google Sheets Today
            </h2>
            <p>
              Stop manually downloading CSVs and start automating your financial data pipeline.
              Install SheetLink and sync your first bank transaction in under 2 minutes.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to sync your bank to Google Sheets?
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
                Add to Chrome - Start Syncing
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
