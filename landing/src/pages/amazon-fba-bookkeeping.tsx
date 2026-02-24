import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function AmazonFBABookkeeping() {
  const seoTitle = 'Amazon FBA Bookkeeping - Track Income & Expenses in Google Sheets | SheetLink';
  const seoDescription = 'Automatically sync Amazon FBA income and expenses to Google Sheets. Track product sales by ASIN, Amazon fees, PPC spend, inventory costs, and true profit. Perfect for FBA sellers managing complex bookkeeping.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I track Amazon FBA profit by product?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink to sync your bank account where Amazon deposits payments. Tag each deposit by ASIN or product SKU. Track inventory costs, Amazon fees (referral, FBA, storage), PPC spend, and returns. Calculate true profit per ASIN using formulas: Revenue - COGS - Amazon Fees - PPC - Returns = Net Profit per Product."
        }
      },
      {
        "@type": "Question",
        "name": "What Amazon fees should FBA sellers track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "FBA sellers face multiple fees: Referral fees (8-15% of sale price), FBA fulfillment fees (based on size/weight), monthly storage fees, long-term storage fees (items 365+ days), removal/disposal fees, return processing fees, and Amazon advertising (PPC) costs. SheetLink syncs these charges from your bank account so you can calculate true profit after all fees."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate Amazon FBA COGS and inventory costs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track product sourcing costs (wholesale, manufacturer, or private label), shipping to Amazon warehouse, prep services, packaging materials, and labeling. SheetLink syncs these expenses from your business account. Divide total costs by units to get COGS per unit. Track inventory value by multiplying units in stock by COGS per unit."
        }
      },
      {
        "@type": "Question",
        "name": "Can SheetLink help with Amazon FBA tax preparation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink automatically syncs Amazon deposits and business expenses to Google Sheets. Categorize transactions for Schedule C: inventory purchases (COGS), Amazon fees, advertising, shipping, software subscriptions. Track quarterly profit to calculate estimated taxes. Generate year-end totals for your accountant or tax software."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="amazon fba profit tracker, fba bookkeeping spreadsheet, track amazon fees, amazon seller accounting, fba inventory tracker, amazon ppc tracker" />

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
            Amazon FBA Bookkeeping - Track Your Seller Profit
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Amazon FBA selling means complex bookkeeping: tracking COGS, multiple Amazon fees, PPC spend, inventory costs, and returns. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into deposits, expenses, and true profit per ASIN—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why FBA Sellers Struggle with Bookkeeping
            </h2>
            <p>
              Amazon FBA bookkeeping is uniquely challenging compared to other ecommerce:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Complex fee structure</strong> - Referral fees, FBA fees, storage fees, long-term storage, removal fees</li>
              <li><strong>Inventory tracking</strong> - COGS varies by supplier, shipment, and product</li>
              <li><strong>PPC advertising costs</strong> - Campaign spend must be allocated to specific ASINs</li>
              <li><strong>Returns and refunds</strong> - Revenue adjustments affect true profit calculations</li>
              <li><strong>Multiple payment schedules</strong> - Amazon deposits every 2 weeks, but fees are deducted daily</li>
              <li><strong>Tax complexity</strong> - Nexus requirements, sales tax, quarterly estimates, COGS accounting</li>
            </ul>
            <p className="mt-4">
              <strong>SheetLink solves this</strong> by automatically syncing all bank transactions—Amazon deposits, inventory purchases, PPC charges, and business expenses—to Google Sheets where you can build custom tracking for your FBA business.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How SheetLink Helps Amazon FBA Sellers
            </h2>
            <p>
              Get automated bookkeeping at a fraction of the cost of FBA-specific accounting software:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync Amazon deposits</strong> - Track bi-weekly payments to your bank account</li>
              <li><strong>Track inventory costs</strong> - Sync supplier payments, shipping to FBA, prep services</li>
              <li><strong>Monitor Amazon fees</strong> - Capture referral fees, FBA fees, storage charges</li>
              <li><strong>Track PPC spend</strong> - Sync advertising charges and allocate to ASINs</li>
              <li><strong>Calculate profit by ASIN</strong> - See which products are actually profitable</li>
              <li><strong>Affordable pricing</strong> - $2/month vs A2X ($19/month) or Taxomate ($29/month)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What to Track for Your FBA Business
            </h2>
            <p>
              SheetLink syncs all transactions so you can organize your FBA finances:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Income Sources</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Amazon bi-weekly deposits</li>
                  <li>Product sales by ASIN</li>
                  <li>FBA reimbursements (damaged/lost)</li>
                  <li>Promotional credits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Expense Categories</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Inventory/COGS (supplier costs)</li>
                  <li>Amazon fees (referral, FBA, storage)</li>
                  <li>PPC advertising spend</li>
                  <li>Shipping to Amazon warehouse</li>
                  <li>Prep services & labeling</li>
                  <li>Returns & refunds</li>
                  <li>Software subscriptions (Helium 10, Jungle Scout)</li>
                  <li>Product photography & listings</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate True Profit Per ASIN
            </h2>
            <p>
              Many FBA sellers overestimate profit by ignoring all the fees. Here's how to calculate accurately:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: $45 Product Sale</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sale Price:</span>
                  <span className="font-semibold text-sheetlink-green-700">$45.00</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- Amazon Referral Fee (15%):</span>
                  <span>-$6.75</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- FBA Fulfillment Fee:</span>
                  <span>-$5.30</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Monthly Storage Fee (prorated):</span>
                  <span>-$0.45</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Product Cost (COGS):</span>
                  <span>-$12.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Shipping to FBA (per unit):</span>
                  <span>-$2.50</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- PPC Cost (allocated):</span>
                  <span>-$4.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Packaging/Prep:</span>
                  <span>-$1.00</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>True Profit:</span>
                  <span>$13.00 (29% margin)</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>ACOS (Advertising Cost of Sale):</span>
                  <span>8.9% ($4 ad spend / $45 revenue)</span>
                </div>
              </div>
            </div>
            <p>
              With SheetLink, build formulas in Google Sheets to calculate this automatically for each ASIN. Track which products have the best margins and focus your inventory investment accordingly.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Amazon Fees Breakdown
            </h2>
            <p>
              Understanding Amazon's fee structure is critical for profitability:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Referral Fees (8-15% of sale price)</h3>
                <p className="text-sm mt-2">
                  Category-dependent fee Amazon charges on every sale. Most products: 15%. Media (books): 15%. Apparel: 17%. Sync from Amazon Seller Central settlement reports or bank statements.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">FBA Fulfillment Fees (size/weight-based)</h3>
                <p className="text-sm mt-2">
                  Amazon charges for picking, packing, and shipping. Small standard: $3.22+. Large standard: $5.45+. Increases during Q4 peak season. Track fees per ASIN to see impact on margins.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Storage Fees (monthly & long-term)</h3>
                <p className="text-sm mt-2">
                  Monthly storage: $0.75-$2.40 per cubic foot depending on season. Long-term storage: $6.90/cubic foot for items stored 271-365 days, $0.15/unit for 365+ days. Minimize slow movers.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Other Fees (returns, removals, prep)</h3>
                <p className="text-sm mt-2">
                  Return processing fees, removal orders ($0.50-$0.60/unit), disposal fees ($0.15-$0.30/unit), FBA prep service fees ($0.30-$2.00/unit). Track these hidden costs.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Manage Inventory & COGS Tracking
            </h2>
            <p>
              Accurate COGS tracking is essential for tax deductions and profitability analysis:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Track Supplier Payments</strong> - SheetLink syncs all payments to manufacturers, wholesalers, or Alibaba suppliers
              </li>
              <li>
                <strong>Include Shipping to FBA</strong> - Add freight forwarding, customs, duties to your COGS per unit
              </li>
              <li>
                <strong>Add Prep & Packaging</strong> - Include poly bags, labeling, prep center fees in total COGS
              </li>
              <li>
                <strong>Calculate Per-Unit Cost</strong> - Divide total shipment cost by units to get COGS per ASIN
              </li>
              <li>
                <strong>Track Inventory Value</strong> - Multiply units in FBA by COGS to see total capital tied up in inventory
              </li>
            </ol>
            <p className="mt-4">
              Add columns in your SheetLink spreadsheet for: ASIN, Supplier, Units, Total Cost, COGS per Unit, Units in Stock, Inventory Value.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Amazon PPC & Advertising Tracking
            </h2>
            <p>
              PPC spend directly impacts profitability. Track advertising costs to calculate true ACOS and TACOS:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>ACOS (Advertising Cost of Sale)</strong> - PPC Spend ÷ PPC Revenue × 100 (target: under 20% for established products)</li>
              <li><strong>TACOS (Total Advertising Cost of Sale)</strong> - PPC Spend ÷ Total Revenue × 100 (includes organic sales)</li>
              <li><strong>PPC by ASIN</strong> - Allocate campaign spend to specific products to see which are profitable</li>
              <li><strong>Break-even ACOS</strong> - Calculate your maximum allowable ACOS based on margins</li>
            </ul>
            <p className="mt-4">
              SheetLink syncs Amazon advertising charges from your bank. Tag charges by campaign or ASIN to track PPC ROI.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Key Metrics for FBA Sellers
            </h2>
            <p>
              Build these metrics in your SheetLink spreadsheet to monitor business health:
            </p>
            <div className="my-6 rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
              <h3 className="font-semibold text-sheetlink-text mb-4">Essential FBA Metrics</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong>Profit per ASIN:</strong> Revenue - COGS - Amazon Fees - PPC - Returns
                </li>
                <li>
                  <strong>Profit Margin %:</strong> (Net Profit ÷ Revenue) × 100 (target: 20-30%)
                </li>
                <li>
                  <strong>ACOS:</strong> PPC Spend ÷ PPC Revenue × 100 (target: under 20%)
                </li>
                <li>
                  <strong>Inventory Turnover:</strong> Units Sold ÷ Average Units in Stock (target: 3-6x per year)
                </li>
                <li>
                  <strong>Days of Inventory:</strong> Current Units ÷ Daily Sales Rate (avoid stockouts and excess)
                </li>
                <li>
                  <strong>Return Rate %:</strong> Returns ÷ Total Sales × 100 (monitor for quality issues)
                </li>
                <li>
                  <strong>Effective Fee Rate:</strong> Total Amazon Fees ÷ Gross Revenue × 100 (benchmark: 25-35%)
                </li>
              </ul>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Amazon FBA Tracker
            </h2>
            <p>
              Get your FBA bookkeeping organized in under 15 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Business Bank Account</strong> - Link the account where Amazon deposits payments via Plaid
              </li>
              <li>
                <strong>Connect Your Business Credit Card</strong> - Track inventory purchases, PPC charges, and expenses
              </li>
              <li>
                <strong>Create Your FBA Finance Sheet</strong> - Start with a blank Google Sheet
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all deposits and expenses
              </li>
              <li>
                <strong>Add Custom Columns</strong> - ASIN, Product Name, Fee Type, PPC Campaign, COGS
              </li>
              <li>
                <strong>Tag Transactions</strong> - Categorize each transaction by type (revenue, COGS, fees, PPC)
              </li>
              <li>
                <strong>Build Profit Formulas</strong> - Calculate profit per ASIN and overall business profit
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. FBA Accounting Software
            </h2>
            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Tool</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Cost</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Best For</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">SheetLink</td>
                    <td className="px-6 py-4">$2/month</td>
                    <td className="px-6 py-4">Solo FBA sellers, small catalogs</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">A2X</td>
                    <td className="px-6 py-4">$19-149/month</td>
                    <td className="px-6 py-4">QuickBooks/Xero integration, accrual accounting</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Taxomate</td>
                    <td className="px-6 py-4">$29-59/month</td>
                    <td className="px-6 py-4">Multi-channel sellers, tax reporting</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Link My Books</td>
                    <td className="px-6 py-4">$12-59/month</td>
                    <td className="px-6 py-4">QuickBooks automation for FBA</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks Online</td>
                    <td className="px-6 py-4">$30-200/month</td>
                    <td className="px-6 py-4">Large businesses, multi-entity accounting</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>SheetLink advantage:</strong> Automated bank sync with full spreadsheet flexibility at a fraction of the cost. Combine with Amazon Seller Central reports for complete FBA tracking. Upgrade to A2X or QuickBooks only when you need accrual accounting or CPA integration.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Season for Amazon FBA Sellers
            </h2>
            <p>
              FBA sellers face complex tax requirements. SheetLink helps you stay organized:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Schedule C filing</strong> - Track gross receipts, COGS, business expenses for profit/loss calculation</li>
              <li><strong>Quarterly estimated taxes</strong> - Calculate net profit each quarter (revenue minus all costs and fees)</li>
              <li><strong>COGS deductions</strong> - Properly account for inventory purchases and COGS sold during tax year</li>
              <li><strong>State sales tax nexus</strong> - Track where Amazon collects sales tax on your behalf (economic nexus)</li>
              <li><strong>1099-K reporting</strong> - Amazon sends 1099-K if you make over $5,000; verify with your SheetLink records</li>
              <li><strong>Inventory valuation</strong> - Year-end inventory value affects COGS calculation for taxes</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real FBA Seller Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Jason - Private Label Kitchen Products</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Jason sold 15 ASINs but didn't track profit per product. Couldn't tell which were winners vs losers.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs bank transactions. Jason tags each Amazon deposit by ASIN, tracks COGS from supplier invoices, and allocates PPC spend per product.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Discovered 5 products had negative profit after all fees. Discontinued losers, doubled down on top 3 products. Increased overall profit margin from 18% to 32%.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Linda - Wholesale Arbitrage Seller</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Linda sourced from 20+ wholesalers with varying costs. Couldn't track which suppliers were most profitable.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink auto-syncs all supplier payments. Linda tags each inventory purchase by supplier and product, calculates COGS per unit.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Identified 3 suppliers with consistently better margins. Focused 70% of buying power on best suppliers, improved average margin by 9%.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Amazon FBA Sellers
            </h2>
            <p>
              SheetLink is designed to scale with your FBA business:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (great for testing or very small sellers)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (recommended for most FBA sellers, covers quarterly analysis)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (best for established sellers, full tax year + prior year records)</li>
            </ul>
            <p className="mt-4">
              <strong>Recommended tier:</strong> Basic ($2/month) for sellers doing under $10k/month. Pro ($10/month) for sellers doing $10k+ monthly revenue who need year-over-year comparisons and full tax records.
            </p>
            <p className="mt-4">
              Compare to A2X ($19/month minimum) or Taxomate ($29/month). SheetLink gives you automated bank sync at a fraction of the cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your FBA Profit Today
            </h2>
            <p>
              Stop guessing at profit margins and start tracking real numbers. Know exactly which ASINs are profitable, what your true ACOS is, and how much you owe in taxes each quarter.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your Amazon FBA finances automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for FBA sellers.
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
                Add to Chrome - Start Tracking Your FBA Business
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
