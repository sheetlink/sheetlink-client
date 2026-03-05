import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedPages from '@/components/RelatedPages';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartRelatedPages from '@/components/SmartRelatedPages';

export default function AmazonFBABookkeepingSpreadsheet() {
  const seoTitle = 'Amazon FBA Bookkeeping Spreadsheet Guide (2026) - Google Sheets Setup';
  const seoDescription = 'Complete guide to setting up Amazon FBA bookkeeping in Google Sheets. Track sales, COGS, Amazon fees, advertising, and calculate true profit margins.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="amazon fba bookkeeping, fba spreadsheet, amazon seller accounting, fba profit tracking" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <Breadcrumbs category="how-to" pageTitle="Amazon FBA Bookkeeping in Spreadsheets" />

          <h1 className="mb-6 text-5xl font-bold text-sheetlink-text">
            Amazon FBA Bookkeeping in Google Sheets
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              Proper bookkeeping is essential for Amazon FBA sellers to track true profitability after all fees,
              costs, and expenses. This guide shows you how to set up a complete Amazon FBA bookkeeping system
              in Google Sheets with automated transaction imports.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Amazon FBA Needs Specialized Bookkeeping
            </h2>
            <p>
              Amazon FBA has unique expenses that generic bookkeeping systems miss:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Amazon Referral Fees</strong> - 15% commission on most categories (varies by category)
              </li>
              <li>
                <strong>FBA Fulfillment Fees</strong> - Storage, picking, packing, and shipping costs
              </li>
              <li>
                <strong>Long-Term Storage Fees</strong> - Charges for inventory in Amazon warehouses over 365 days
              </li>
              <li>
                <strong>Advertising Costs</strong> - Amazon PPC (Sponsored Products, Brands, Display)
              </li>
              <li>
                <strong>Product Costs (COGS)</strong> - Supplier costs, shipping to Amazon, prep services
              </li>
              <li>
                <strong>Returns & Reimbursements</strong> - Lost or damaged inventory claims
              </li>
            </ul>

            <div className="my-8 rounded-lg border-2 border-yellow-300 bg-yellow-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                Hidden Costs Add Up
              </h3>
              <p className="text-gray-700">
                Many FBA sellers think they're profitable until they add up all fees. Amazon fees typically
                range from 30-45% of your selling price. Your spreadsheet needs to track every fee to
                calculate true net profit.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Essential Sheets for Your FBA Bookkeeping System
            </h2>
            <p>
              Set up these tabs in your Google Sheets workbook:
            </p>

            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-300 p-4">
                <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                  1. Sales & Revenue Sheet
                </h3>
                <p className="mb-2 text-gray-700">
                  Track every order with: Order ID, Date, Product, Units Sold, Selling Price, Total Revenue
                </p>
                <p className="text-sm text-gray-600">
                  Import from Amazon Seller Central settlement reports or sync bank deposits via SheetLink
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-300 p-4">
                <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                  2. COGS & Inventory Sheet
                </h3>
                <p className="mb-2 text-gray-700">
                  Track: Product, Supplier, Unit Cost, Quantity Purchased, Shipping to Amazon, Total COGS
                </p>
                <p className="text-sm text-gray-600">
                  Link to supplier invoices stored in Google Drive
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-300 p-4">
                <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                  3. Amazon Fees Sheet
                </h3>
                <p className="mb-2 text-gray-700">
                  Track: Date, Fee Type (Referral/FBA/Storage), Amount, Related Order/Product
                </p>
                <p className="text-sm text-gray-600">
                  Download from Amazon Seller Central Transaction View or sync bank charges
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-300 p-4">
                <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                  4. Operating Expenses Sheet
                </h3>
                <p className="mb-2 text-gray-700">
                  Track: Date, Category, Description, Amount (PPC, software, VA, shipping supplies, etc.)
                </p>
                <p className="text-sm text-gray-600">
                  Auto-import business bank/credit card transactions with SheetLink
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-300 p-4">
                <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                  5. Profit & Loss Dashboard
                </h3>
                <p className="mb-2 text-gray-700">
                  Summary sheet calculating: Gross Revenue, COGS, Amazon Fees, Operating Expenses, Net Profit
                </p>
                <p className="text-sm text-gray-600">
                  Uses formulas to pull from other sheets and calculate margins
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculating True Amazon FBA Profit
            </h2>
            <p>
              Here's the correct profit calculation formula:
            </p>

            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300 bg-gray-50">
              <div className="p-6">
                <h3 className="mb-4 text-lg font-bold text-sheetlink-text">FBA Profit Calculation</h3>
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">Gross Sales</td>
                      <td className="py-2 text-right"></td>
                      <td className="py-2 text-right">$50,000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- Amazon Referral Fees (15%)</td>
                      <td className="py-2 text-right">=Gross Sales * 0.15</td>
                      <td className="py-2 text-right">-$7,500</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- FBA Fulfillment Fees</td>
                      <td className="py-2 text-right">=SUM(FBA Fees)</td>
                      <td className="py-2 text-right">-$8,000</td>
                    </tr>
                    <tr className="border-b-2 border-gray-600">
                      <td className="py-2 font-bold">= Net Revenue</td>
                      <td className="py-2 text-right"></td>
                      <td className="py-2 text-right font-bold">$34,500</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- Cost of Goods Sold</td>
                      <td className="py-2 text-right">=SUM(COGS)</td>
                      <td className="py-2 text-right">-$15,000</td>
                    </tr>
                    <tr className="border-b-2 border-gray-600">
                      <td className="py-2 font-bold">= Gross Profit</td>
                      <td className="py-2 text-right"></td>
                      <td className="py-2 text-right font-bold">$19,500</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- Amazon PPC Ads</td>
                      <td className="py-2 text-right">=SUMIF(Category,"PPC")</td>
                      <td className="py-2 text-right">-$6,000</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- Storage Fees</td>
                      <td className="py-2 text-right">=SUMIF(Fee Type,"Storage")</td>
                      <td className="py-2 text-right">-$500</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-2 font-semibold">- Other Expenses</td>
                      <td className="py-2 text-right">=SUM(Other)</td>
                      <td className="py-2 text-right">-$2,000</td>
                    </tr>
                    <tr className="border-b-2 border-gray-600">
                      <td className="py-2 font-bold text-sheetlink-green-700">= Net Profit</td>
                      <td className="py-2 text-right"></td>
                      <td className="py-2 text-right font-bold text-sheetlink-green-700">$11,000</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-bold">Net Margin</td>
                      <td className="py-2 text-right">=Net Profit / Gross Sales</td>
                      <td className="py-2 text-right font-bold">22%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Automating Transaction Imports with SheetLink
            </h2>
            <p>
              Manual data entry from Amazon Seller Central is time-consuming and error-prone. Use SheetLink
              to automatically sync business expenses:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Connect your business bank account</strong> - Link the account where Amazon deposits
                your payouts
              </li>
              <li>
                <strong>Connect business credit cards</strong> - Link cards used for supplier payments,
                PPC ads, and business expenses
              </li>
              <li>
                <strong>Sync to your Operating Expenses sheet</strong> - All business transactions automatically
                appear in your bookkeeping sheet
              </li>
              <li>
                <strong>Categorize transactions</strong> - Tag expenses as COGS, PPC, Software, etc.
              </li>
            </ol>

            <div className="my-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                What About Amazon Fees?
              </h3>
              <p className="text-gray-700">
                Amazon fees are deducted before your payout, so they won't appear in your bank transactions.
                Download monthly settlement reports from Seller Central and manually import those fees into
                your Amazon Fees sheet, or use accounting software like A2X that automatically syncs Amazon data.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Key Metrics to Track
            </h2>
            <p>
              Monitor these metrics monthly in your P&L Dashboard:
            </p>

            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Metric</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Formula</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Good Target</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Gross Margin</td>
                    <td className="px-6 py-4">(Revenue - COGS - Amazon Fees) / Revenue</td>
                    <td className="px-6 py-4">40-50%</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Net Margin</td>
                    <td className="px-6 py-4">Net Profit / Revenue</td>
                    <td className="px-6 py-4">15-25%</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">ACoS</td>
                    <td className="px-6 py-4">Ad Spend / Ad Sales</td>
                    <td className="px-6 py-4">&lt;25%</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">TACoS</td>
                    <td className="px-6 py-4">Ad Spend / Total Sales</td>
                    <td className="px-6 py-4">&lt;10%</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Inventory Turnover</td>
                    <td className="px-6 py-4">COGS / Average Inventory Value</td>
                    <td className="px-6 py-4">6-8x per year</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Preparation for FBA Sellers
            </h2>
            <p>
              Proper bookkeeping makes tax time much easier:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Separate business and personal</strong> - Use dedicated business accounts
              </li>
              <li>
                <strong>Track quarterly estimated taxes</strong> - Set aside 25-30% of profit for taxes
              </li>
              <li>
                <strong>Deductible expenses</strong> - COGS, Amazon fees, PPC ads, software, home office,
                shipping supplies, mileage
              </li>
              <li>
                <strong>Sales tax nexus</strong> - Amazon collects sales tax, but you may need to file returns
                in multiple states
              </li>
              <li>
                <strong>Inventory accounting method</strong> - Choose FIFO, LIFO, or weighted average (consult CPA)
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              When to Upgrade from Spreadsheets
            </h2>
            <p>
              Google Sheets works well for most FBA sellers, but consider dedicated FBA accounting software when:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You're doing over $500K/year in revenue</li>
              <li>You have 50+ SKUs to track</li>
              <li>You sell on multiple marketplaces (Amazon.com, Amazon.ca, eBay, Shopify)</li>
              <li>You need real-time P&L by product</li>
            </ul>
            <p className="mt-4">
              Popular FBA accounting tools: A2X (Amazon to QuickBooks/Xero), Link My Books, Finale Inventory
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">
                Automate Your FBA Expense Tracking
              </h2>
              <p className="mb-4 text-gray-600">
                SheetLink automatically syncs business bank accounts and credit cards to Google Sheets.
                Perfect for tracking supplier payments, PPC charges, and operating expenses. $39.99/year.
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

            <RelatedPages currentSlug="/amazon-fba-bookkeeping-spreadsheet" />
            <SmartRelatedPages currentSlug="/amazon-fba-bookkeeping-spreadsheet" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
