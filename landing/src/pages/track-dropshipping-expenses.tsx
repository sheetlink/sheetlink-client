import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedPages from '@/components/RelatedPages';

export default function TrackDropshippingExpenses() {
  const seoTitle = 'How to Track Dropshipping Expenses in Google Sheets (2026 Guide)';
  const seoDescription = 'Complete guide to tracking dropshipping business expenses in Google Sheets with automated bank sync. Track COGS, ads, software, and calculate profit margins.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="track dropshipping expenses, dropshipping accounting, dropshipping bookkeeping, dropshipping spreadsheet" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <nav className="mb-6 text-sm text-gray-600">
            <a href="/how-to-guides" className="hover:text-sheetlink-green-700">How-To Guides</a>
            <span className="mx-2">›</span>
            <span>Track Dropshipping Expenses</span>
          </nav>

          <h1 className="mb-6 text-5xl font-bold text-sheetlink-text">
            How to Track Dropshipping Expenses in Google Sheets
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              Tracking expenses is critical for dropshipping profitability. This guide shows you how to
              set up a complete expense tracking system in Google Sheets with automated bank sync,
              category tracking, and profit margin calculations.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Key Dropshipping Expense Categories
            </h2>
            <p>
              A profitable dropshipping business tracks these expense categories:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Cost of Goods Sold (COGS)</strong> - Product costs from suppliers (AliExpress, Alibaba, etc.)
              </li>
              <li>
                <strong>Advertising Costs</strong> - Facebook Ads, Google Ads, TikTok Ads, influencer marketing
              </li>
              <li>
                <strong>Platform Fees</strong> - Shopify subscription, payment processing fees (Stripe, PayPal)
              </li>
              <li>
                <strong>Software & Tools</strong> - Oberlo, DSers, email marketing, analytics tools
              </li>
              <li>
                <strong>Shipping Costs</strong> - Any shipping fees not covered by customer charges
              </li>
              <li>
                <strong>Returns & Refunds</strong> - Product returns, customer refunds, chargebacks
              </li>
              <li>
                <strong>Other Business Expenses</strong> - Virtual assistant, graphic design, domain registration
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Step 1: Set Up Your Expense Tracking Sheet
            </h2>
            <p>
              Create a Google Sheet with these columns:
            </p>

            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Column</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Purpose</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Example</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Date</td>
                    <td className="px-6 py-4">Transaction date</td>
                    <td className="px-6 py-4">2026-03-01</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Description</td>
                    <td className="px-6 py-4">Merchant/expense name</td>
                    <td className="px-6 py-4">Facebook Ads</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Category</td>
                    <td className="px-6 py-4">Expense type</td>
                    <td className="px-6 py-4">Advertising</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Amount</td>
                    <td className="px-6 py-4">Cost</td>
                    <td className="px-6 py-4">-$250.00</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Order ID</td>
                    <td className="px-6 py-4">Link to specific orders (optional)</td>
                    <td className="px-6 py-4">#1001</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Notes</td>
                    <td className="px-6 py-4">Additional context</td>
                    <td className="px-6 py-4">Testing new ad campaign</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Step 2: Automate Transaction Imports with SheetLink
            </h2>
            <p>
              Instead of manually entering every transaction, use SheetLink to automatically sync bank
              and credit card transactions to your Google Sheet:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink</strong> - Add the Chrome extension from the Chrome Web Store
              </li>
              <li>
                <strong>Connect your bank accounts</strong> - Use Plaid to securely connect business checking,
                credit cards, and PayPal
              </li>
              <li>
                <strong>Choose your expense tracking sheet</strong> - SheetLink will write transactions
                directly to your Google Sheet
              </li>
              <li>
                <strong>Click sync</strong> - All business expenses automatically appear in your sheet
              </li>
            </ol>

            <div className="my-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                Why Automate?
              </h3>
              <p className="text-gray-700">
                Manual expense entry takes hours each month and leads to missed transactions. Automated
                sync ensures every business expense is captured without manual data entry.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Step 3: Categorize Your Expenses
            </h2>
            <p>
              After transactions are imported, categorize them for tax purposes and profitability analysis:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Use data validation</strong> - Create a dropdown list in the Category column with
                your standard categories (COGS, Advertising, Platform Fees, etc.)
              </li>
              <li>
                <strong>Set up auto-categorization</strong> - Use simple formulas to automatically categorize
                common vendors:
                <pre className="mt-2 bg-gray-100 p-3 rounded text-sm overflow-x-auto">
{`=IF(ISNUMBER(SEARCH("Facebook", B2)), "Advertising",
IF(ISNUMBER(SEARCH("Shopify", B2)), "Platform Fees", "Other"))`}
                </pre>
              </li>
              <li>
                <strong>Review monthly</strong> - Spot-check auto-categorized transactions to ensure accuracy
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Step 4: Calculate Profit Margins
            </h2>
            <p>
              The real power comes from calculating your true profit margins. Create a summary section:
            </p>

            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-50">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-bold text-sheetlink-text">Monthly Profit & Loss Formula</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">Total Revenue</td>
                      <td className="py-2 text-right">=SUM(Revenue)</td>
                      <td className="py-2 text-right">$10,000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- COGS</td>
                      <td className="py-2 text-right">=SUMIF(Category,"COGS",Amount)</td>
                      <td className="py-2 text-right">-$4,000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">= Gross Profit</td>
                      <td className="py-2 text-right"></td>
                      <td className="py-2 text-right">$6,000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- Advertising</td>
                      <td className="py-2 text-right">=SUMIF(Category,"Advertising",Amount)</td>
                      <td className="py-2 text-right">-$3,000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- Operating Expenses</td>
                      <td className="py-2 text-right">=SUM(Other Categories)</td>
                      <td className="py-2 text-right">-$800</td>
                    </tr>
                    <tr className="border-b-2 border-gray-600">
                      <td className="py-2 font-bold">= Net Profit</td>
                      <td className="py-2 text-right"></td>
                      <td className="py-2 text-right font-bold">$2,200</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold text-sheetlink-green-700">Net Margin</td>
                      <td className="py-2 text-right">=Net Profit / Revenue</td>
                      <td className="py-2 text-right font-bold text-sheetlink-green-700">22%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Step 5: Track Key Metrics
            </h2>
            <p>
              Beyond basic expense tracking, monitor these critical dropshipping metrics:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Customer Acquisition Cost (CAC)</strong> - Ad spend ÷ Number of customers
              </li>
              <li>
                <strong>Return on Ad Spend (ROAS)</strong> - Revenue ÷ Ad spend (target 2.5x or higher)
              </li>
              <li>
                <strong>Average Order Value (AOV)</strong> - Total revenue ÷ Number of orders
              </li>
              <li>
                <strong>Profit per Order</strong> - (Revenue - COGS - Ads - Fees) ÷ Number of orders
              </li>
              <li>
                <strong>Operating Expense Ratio</strong> - Operating expenses ÷ Revenue (keep under 20%)
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Preparation Tips
            </h2>
            <p>
              Proper expense tracking makes tax season painless:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Separate business and personal</strong> - Use dedicated business bank accounts
                and credit cards
              </li>
              <li>
                <strong>Keep receipts</strong> - Store digital copies in Google Drive, linked to transactions
              </li>
              <li>
                <strong>Track quarterly</strong> - Review P&L each quarter to estimate tax liability
              </li>
              <li>
                <strong>Work with an accountant</strong> - Share your expense sheet directly with your CPA
              </li>
              <li>
                <strong>Understand deductions</strong> - Most dropshipping expenses are deductible (home
                office, software, ads, etc.)
              </li>
            </ul>

            <div className="my-8 rounded-lg border-2 border-yellow-300 bg-yellow-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                Common Mistake: Mixing Personal & Business
              </h3>
              <p className="text-gray-700">
                The #1 bookkeeping mistake dropshippers make is using personal accounts for business expenses.
                Open a dedicated business checking account and credit card to keep everything separate.
              </p>
            </div>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">
                Automate Your Dropshipping Expense Tracking
              </h2>
              <p className="mb-4 text-gray-600">
                SheetLink automatically syncs all business expenses from your bank accounts and credit cards
                to Google Sheets. $39.99/year or free for the last 7 days.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  Add to Chrome - Start Tracking
                </a>
                <a
                  href="/how-it-works"
                  className="inline-flex items-center rounded-lg border-2 border-sheetlink-green-700 px-6 py-3 font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-50"
                >
                  See How It Works
                </a>
              </div>
            </div>

            <RelatedPages currentSlug="/track-dropshipping-expenses" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
