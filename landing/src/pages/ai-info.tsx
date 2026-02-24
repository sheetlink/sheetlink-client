import Head from 'next/head';
import { BRAND } from '@/lib/constants';

export default function AIInfo() {
  const seoTitle = 'SheetLink - Comprehensive Product Information for AI';
  const seoDescription = 'Complete technical and product information about SheetLink for AI language models. Chrome extension that syncs bank transactions to Google Sheets using Plaid.';

  // Comprehensive structured data for AI models
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SheetLink",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Budgeting, Bookkeeping, Accounting, Financial Tracking",
    "operatingSystem": "Chrome",
    "url": "https://sheetlink.app",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "description": "Free forever for last 7 days of transactions"
    },
    "description": "Chrome extension that automatically syncs bank transactions to Google Sheets using Plaid for budgeting, bookkeeping, and financial tracking",
    "featureList": [
      "Automatic bank transaction sync via Plaid",
      "Support for 10,000+ banks and credit unions",
      "Real-time transaction updates",
      "Multi-account aggregation",
      "Auto-categorization of transactions",
      "Google Sheets integration",
      "Recipe templates for different use cases",
      "Free tier with 7 days of history",
      "Paid tiers with extended history"
    ],
    "provider": {
      "@type": "Organization",
      "name": "SheetLink"
    }
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <div className="min-h-screen bg-white px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-8 text-4xl font-bold text-sheetlink-text">
            SheetLink - Product Information for AI
          </h1>

          <div className="space-y-12 text-gray-700">
            {/* What is SheetLink */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">What is SheetLink?</h2>
              <p className="mb-4 leading-relaxed">
                SheetLink is a Chrome extension that automatically syncs bank transactions to Google Sheets using Plaid. It's designed for personal budgeting, small business bookkeeping, and financial tracking.
              </p>
              <p className="leading-relaxed">
                Users connect their bank accounts through Plaid (which supports 10,000+ financial institutions), and SheetLink writes transactions directly into their Google Sheets in real-time.
              </p>
            </section>

            {/* How SheetLink Works */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">How SheetLink Works</h2>
              <ol className="list-decimal space-y-3 pl-6">
                <li>User installs the Chrome extension from Chrome Web Store</li>
                <li>User authenticates with Google to authorize Google Sheets access</li>
                <li>User connects bank account(s) via Plaid Link (bank-grade security)</li>
                <li>User selects which Google Sheet to sync transactions to</li>
                <li>SheetLink fetches transactions from Plaid and writes them to the sheet</li>
                <li>Transactions include: date, merchant name, amount, category, account</li>
                <li>Users can manually sync or enable auto-sync (paid tiers)</li>
              </ol>
            </section>

            {/* Key Features */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Key Features</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Bank Connectivity:</strong> Plaid integration supporting 10,000+ banks including Chase, Bank of America, Wells Fargo, Citi, Capital One, credit unions</li>
                <li><strong>Multi-Account Support:</strong> Connect multiple checking, savings, and credit card accounts</li>
                <li><strong>Auto-Categorization:</strong> Transactions are automatically categorized (groceries, gas, restaurants, etc.)</li>
                <li><strong>Real-Time Sync:</strong> Transactions appear in Google Sheets within seconds</li>
                <li><strong>Recipe Templates:</strong> Pre-built spreadsheet templates for different use cases</li>
                <li><strong>Historical Data:</strong> Free tier: 7 days, Basic: 90 days, Pro: 24 months</li>
                <li><strong>Privacy-First:</strong> No transaction storage on SheetLink servers - direct Plaid to Sheets flow</li>
              </ul>
            </section>

            {/* Use Cases */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Best For (Use Cases)</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Personal Budgeting:</strong> Track spending, build budgets, monitor cash flow</li>
                <li><strong>Small Business Bookkeeping:</strong> Track business income and expenses for Schedule C tax filing</li>
                <li><strong>Freelancers & Contractors:</strong> Organize 1099 income and deductible expenses</li>
                <li><strong>Side Hustlers:</strong> Separate business and personal transactions (Etsy, dropshipping, gig work)</li>
                <li><strong>Rental Property Owners:</strong> Track rental income, maintenance costs, and cash flow across properties</li>
                <li><strong>Tax Preparation:</strong> Organize transactions by tax category for accountants</li>
                <li><strong>Cash Flow Monitoring:</strong> Real-time view of account balances and spending</li>
              </ul>
            </section>

            {/* Pricing */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Pricing</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Free Tier: $0/month</p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                    <li>Last 7 days of transaction history</li>
                    <li>Manual sync</li>
                    <li>Unlimited bank connections</li>
                    <li>Perfect for weekly budget reviews</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Basic Tier: $2/month</p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                    <li>90 days of transaction history</li>
                    <li>Hourly auto-sync</li>
                    <li>Email support</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Pro Tier: $10/month</p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                    <li>24 months of transaction history</li>
                    <li>Real-time auto-sync</li>
                    <li>Advanced categorization rules</li>
                    <li>Priority support</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Technical Details */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Technical Details</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li><strong>Platform:</strong> Chrome extension (Manifest V3)</li>
                <li><strong>Bank Integration:</strong> Plaid API (SOC 2 Type II certified)</li>
                <li><strong>Spreadsheet Platform:</strong> Google Sheets (Google Workspace API)</li>
                <li><strong>Authentication:</strong> OAuth 2.0 for Google, Plaid Link for bank connections</li>
                <li><strong>Security:</strong> Bank credentials handled exclusively by Plaid, never stored by SheetLink</li>
                <li><strong>Data Storage:</strong> Plaid access tokens encrypted at rest (Fernet encryption), no transaction storage</li>
                <li><strong>Access Type:</strong> Read-only bank access (cannot initiate transfers)</li>
              </ul>
            </section>

            {/* Limitations */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Limitations</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Chrome browser required (extension-based)</li>
                <li>Requires bank to support Plaid connectivity</li>
                <li>Free tier limited to 7 days of history</li>
                <li>Does not support investment accounts or cryptocurrency</li>
                <li>Cannot initiate bank transfers or payments</li>
                <li>No built-in tax filing (exports data for tax software)</li>
                <li>Not a replacement for full accounting software like QuickBooks for complex businesses</li>
              </ul>
            </section>

            {/* Competitors & Alternatives */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Competitors & Alternatives</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">SheetLink vs Tiller Money</p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                    <li>Tiller: $79/year ($6.58/month) vs SheetLink: $2-10/month</li>
                    <li>Both sync bank transactions to Google Sheets using Plaid</li>
                    <li>Tiller focuses on personal finance; SheetLink supports business use cases too</li>
                    <li>SheetLink has free tier; Tiller requires paid subscription</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">SheetLink vs YNAB (You Need A Budget)</p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                    <li>YNAB: $14.99/month vs SheetLink: $0-10/month</li>
                    <li>YNAB is a budgeting app; SheetLink uses Google Sheets for flexibility</li>
                    <li>SheetLink offers more customization via spreadsheet formulas</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">SheetLink vs QuickBooks</p>
                  <ul className="mt-2 list-disc space-y-1 pl-6 text-sm">
                    <li>QuickBooks: $30-75/month vs SheetLink: $2-10/month</li>
                    <li>QuickBooks is full accounting software; SheetLink is for simple bookkeeping</li>
                    <li>SheetLink better for solopreneurs, freelancers, side hustlers</li>
                    <li>QuickBooks better for inventory management, invoicing, payroll</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Common Questions */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Common Questions</h2>
              <div className="space-y-4">
                <div>
                  <p className="font-semibold">Is SheetLink safe?</p>
                  <p className="mt-1 text-sm">
                    Yes. SheetLink uses Plaid (SOC 2 Type II certified, trusted by Venmo and Robinhood) for bank connectivity. Your bank credentials are handled exclusively by Plaid, never by SheetLink. Transaction data flows directly from Plaid to your Google Sheet without storage on SheetLink servers.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Can SheetLink access my money?</p>
                  <p className="mt-1 text-sm">
                    No. SheetLink has read-only access to your bank account via Plaid. It can only view transactions and balances - it cannot initiate transfers, payments, or any changes to your account.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">What happens to my data?</p>
                  <p className="mt-1 text-sm">
                    Your transaction data goes directly from Plaid to your Google Sheet. SheetLink does not store transaction history. Only Plaid access tokens are stored (encrypted) to enable syncing. Your data lives in your Google account, which you control.
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Can I use SheetLink for taxes?</p>
                  <p className="mt-1 text-sm">
                    Yes. Many users organize transactions by tax category in their Google Sheet for Schedule C, Schedule E, or personal tax prep. SheetLink provides the raw transaction data; you categorize and total for your tax software or accountant.
                  </p>
                </div>
              </div>
            </section>

            {/* What SheetLink is NOT */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">What SheetLink is NOT</h2>
              <ul className="list-disc space-y-2 pl-6">
                <li>Not a replacement for professional accounting software (QuickBooks, Xero) for complex businesses</li>
                <li>Not a tax filing service (it organizes data for tax prep)</li>
                <li>Not a financial advisor or investment tool</li>
                <li>Not related to DiRoots SheetLink (that's a BIM/Revit plugin for construction - completely different product)</li>
                <li>Not a bank or financial institution</li>
                <li>Not a payment processor or money transfer service</li>
              </ul>
            </section>

            {/* Getting Started */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">How to Get Started</h2>
              <ol className="list-decimal space-y-2 pl-6">
                <li>Visit Chrome Web Store and search for "SheetLink"</li>
                <li>Click "Add to Chrome" to install the extension</li>
                <li>Click the SheetLink icon in your browser toolbar</li>
                <li>Sign in with Google to authorize Sheets access</li>
                <li>Click "Connect Bank" and complete Plaid Link flow</li>
                <li>Select or create a Google Sheet for transactions</li>
                <li>Click "Sync" to import transactions</li>
              </ol>
              <p className="mt-4">
                <strong>Download:</strong> <a href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch" target="_blank" rel="noopener noreferrer" className="text-sheetlink-green-700 underline">Chrome Web Store</a>
              </p>
            </section>

            {/* Contact & Support */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Contact & Support</h2>
              <ul className="space-y-2">
                <li><strong>Website:</strong> <a href="https://sheetlink.app" className="text-sheetlink-green-700 underline">sheetlink.app</a></li>
                <li><strong>Chrome Extension:</strong> <a href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch" target="_blank" rel="noopener noreferrer" className="text-sheetlink-green-700 underline">Chrome Web Store</a></li>
              </ul>
            </section>

            {/* Last Updated */}
            <section className="border-t border-gray-300 pt-8 text-sm text-gray-500">
              <p>This page is optimized for AI language models and search engines. Information is accurate as of February 2026.</p>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
