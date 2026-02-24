import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function HowItWorks() {
  const seoTitle = `How It Works - ${BRAND.name}`;
  const seoDescription = 'Learn how SheetLink syncs bank transactions to Google Sheets using Plaid. Technical overview of the Chrome extension, data flow, and security architecture.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="mb-8 text-5xl font-bold text-sheetlink-text">How It Works</h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              SheetLink is a Chrome extension that syncs your bank transactions to Google Sheets.
              Here's how the entire process works, from installation to transaction sync.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">1. Install the Chrome Extension</h2>
            <p>
              SheetLink runs as a browser extension, which means it operates entirely in your Chrome browser.
              There's no desktop app to download, no mobile app required—just add it to Chrome from the
              Chrome Web Store and you're ready to go.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">2. Connect Your Bank via Plaid</h2>
            <p>
              When you link a bank account, SheetLink uses <strong>Plaid</strong>—the same infrastructure
              trusted by Venmo, Robinhood, and thousands of financial apps. Plaid securely connects to over
              10,000 banks and credit unions.
            </p>
            <p>
              <strong>Important security note:</strong> Your banking credentials are never stored on our servers.
              Plaid handles the authentication directly with your bank, and we only receive read-only transaction data.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">3. Choose Your Google Sheet</h2>
            <p>
              After connecting your bank, you point SheetLink to any Google Sheet you own. You control
              exactly where the data goes—whether it's a new sheet or an existing budgeting template you've
              been using for years.
            </p>
            <p>
              SheetLink writes to specific tabs you configure, and it never reads your spreadsheet content.
              Your formulas, charts, and other data remain completely private.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">4. Sync Your Transactions</h2>
            <p>
              Once everything is configured, hit the "Sync" button. SheetLink fetches your latest transactions
              from Plaid and writes them to your Google Sheet as rows. Each transaction includes:
            </p>
            <ul className="list-disc pl-6">
              <li><strong>Date</strong> - When the transaction occurred</li>
              <li><strong>Description</strong> - Merchant name or transaction details</li>
              <li><strong>Amount</strong> - Transaction amount (negative for spending, positive for income)</li>
              <li><strong>Category</strong> - Auto-categorized by Plaid (Food, Shopping, Travel, etc.)</li>
              <li><strong>Account</strong> - Which bank account the transaction is from</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">5. Build Your Own System</h2>
            <p>
              This is where SheetLink differs from other budgeting apps. Your data is now in Google Sheets,
              which means you can:
            </p>
            <ul className="list-disc pl-6">
              <li>Create custom budget categories with formulas</li>
              <li>Build pivot tables to analyze spending patterns</li>
              <li>Design charts and dashboards exactly how you want them</li>
              <li>Share reports with your accountant or financial advisor</li>
              <li>Export to CSV or PDF for record-keeping</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Data Flow Architecture</h2>
            <p>
              Here's the complete technical flow:
            </p>
            <div className="my-8 rounded-lg border-2 border-gray-300 bg-gray-50 p-6 font-mono text-sm">
              <p>Your Bank (via Plaid) → SheetLink API → Chrome Extension → Google Sheets</p>
            </div>
            <p>
              Your transaction data never permanently sits on SheetLink servers. We use a
              pass-through architecture where data flows from Plaid through our API (for authentication
              and formatting) directly into your Google Sheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Free Tier vs. Paid Tiers</h2>
            <p>
              <strong>Free Forever:</strong> Get the last 7 days of transaction history, synced manually whenever you want.
              Perfect for tracking weekly spending and building basic budgets.
            </p>
            <p>
              <strong>Paid Tiers:</strong> Unlock longer history (90 days or 24 months), auto-sync every hour or every 24 hours,
              and advanced features like AI categorization and rules engine.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Why Google Sheets?</h2>
            <p>
              Spreadsheets are the most powerful personal finance tool ever created. They're flexible,
              transparent, and already familiar to millions of people. SheetLink doesn't lock your data
              behind a proprietary interface—you get raw transaction data in a format you can customize
              however you want.
            </p>
            <p>
              Whether you're budgeting for a family, tracking business expenses, or just trying to understand
              where your money goes each month, Google Sheets gives you complete control.
            </p>

            <div className="mt-16 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to sync your bank transactions to Google Sheets?
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
