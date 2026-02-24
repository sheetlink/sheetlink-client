import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function ResellerProfitTracker() {
  const seoTitle = 'Reseller Profit Tracker - Track Income & Expenses in Google Sheets | SheetLink';
  const seoDescription = 'Automatically sync reseller income and expenses to Google Sheets. Track eBay, Poshmark, Mercari sales, platform fees, shipping costs, and sourcing expenses. Perfect for resellers managing inventory and profit margins.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do resellers track profit per item?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink to sync your bank account where platforms deposit sales. Tag each deposit by item SKU or listing. Track sourcing cost (thrift/wholesale price), platform fees (eBay, Poshmark, Mercari), shipping costs, and supplies. Calculate profit: Sale Price - Sourcing Cost - Platform Fees - Shipping - Supplies = Net Profit per Item."
        }
      },
      {
        "@type": "Question",
        "name": "What fees do eBay and Poshmark resellers pay?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "eBay charges final value fees (12.9% + $0.30 for most items), insertion fees for listings over free limit, promoted listings fees (2-20%), and payment processing fees. Poshmark takes 20% on sales over $15, $2.95 on sales under $15. Mercari charges 10% + payment processing (2.9% + $0.30). SheetLink syncs net deposits after fees so you can track total fee impact."
        }
      },
      {
        "@type": "Question",
        "name": "How do resellers calculate inventory value and sell-through rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track total spent on unsold inventory using SheetLink to sync sourcing purchases. Inventory Value = Total Sourcing Costs for Unsold Items. Sell-Through Rate = (Items Sold ÷ Total Items Listed) × 100. Target 70%+ sell-through. Calculate inventory turnover: Items Sold ÷ Average Inventory to optimize cash flow and avoid dead stock."
        }
      },
      {
        "@type": "Question",
        "name": "Do resellers need to track quarterly taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Resellers file Schedule C (self-employment income) and pay quarterly estimated taxes. Track gross sales, COGS (inventory purchases), platform fees, shipping, supplies in SheetLink. Calculate net profit quarterly and pay 25-30% in estimated taxes. Platforms send 1099-K if you make over $5,000 annually—verify with your SheetLink records."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="ebay reseller bookkeeping, poshmark profit tracker, reseller accounting spreadsheet, mercari seller finances, resale business tracker, thrift flip profit" />

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
            Reseller Profit Tracker - Track Your Resale Business Finances
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Reselling on eBay, Poshmark, and Mercari means tracking sourcing costs, platform fees, shipping expenses, and inventory. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into sales, costs, and profit per item—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Resellers Need Better Bookkeeping
            </h2>
            <p>
              Reselling is more complex than it looks—profitability depends on tight cost tracking:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Item-level tracking</strong> - Need to know profit on each individual item, not just monthly totals</li>
              <li><strong>Variable platform fees</strong> - eBay (12.9%), Poshmark (20%), Mercari (10%), Facebook Marketplace (free)</li>
              <li><strong>Shipping costs</strong> - Varies by carrier, package size, and buyer location</li>
              <li><strong>Sourcing channels</strong> - Thrift stores, garage sales, wholesale, clearance, online arbitrage</li>
              <li><strong>Inventory management</strong> - Track what's sold vs sitting, calculate inventory value</li>
              <li><strong>Multi-platform selling</strong> - Cross-posting means sales come from different platforms</li>
            </ul>
            <p className="mt-4">
              <strong>SheetLink solves this</strong> by automatically syncing all bank transactions—platform deposits, sourcing purchases, shipping costs, and supplies—to Google Sheets where you can track profit per item and overall business metrics.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How SheetLink Helps Resellers
            </h2>
            <p>
              Get automated resale bookkeeping at a fraction of the cost of inventory management software:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync platform deposits</strong> - Track sales from eBay, Poshmark, Mercari, Depop, Vinted</li>
              <li><strong>Track sourcing costs</strong> - Sync thrift store, yard sale, and wholesale purchases</li>
              <li><strong>Monitor platform fees</strong> - See how much each marketplace takes from your sales</li>
              <li><strong>Track shipping expenses</strong> - USPS, UPS, FedEx charges and supplies (boxes, tape, labels)</li>
              <li><strong>Calculate profit per item</strong> - Know which categories and sourcing channels are most profitable</li>
              <li><strong>Affordable pricing</strong> - $2/month vs List Perfectly ($30/month) or Vendoo ($40/month)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What to Track for Your Resale Business
            </h2>
            <p>
              SheetLink syncs all transactions so you can organize your reseller finances:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Income Sources</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>eBay sales deposits</li>
                  <li>Poshmark payouts</li>
                  <li>Mercari payments</li>
                  <li>Depop sales</li>
                  <li>Facebook Marketplace (Venmo/Zelle)</li>
                  <li>Local sales (cash app deposits)</li>
                  <li>Wholesale/bulk sales</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Expense Categories</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Inventory purchases (COGS)</li>
                  <li>Platform fees (eBay, Poshmark, Mercari)</li>
                  <li>Shipping costs (postage, carriers)</li>
                  <li>Packaging supplies (boxes, mailers, tape)</li>
                  <li>Listing fees & promoted listings</li>
                  <li>Labels & printer ink</li>
                  <li>Software subscriptions (crossposting tools)</li>
                  <li>Storage (shelves, bins, climate control)</li>
                  <li>Mileage (sourcing trips)</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Profit Per Item
            </h2>
            <p>
              Successful resellers track every item's profitability. Here's how to calculate accurately:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: Thrift Store Clothing Flip</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sale Price (Poshmark):</span>
                  <span className="font-semibold text-sheetlink-green-700">$48.00</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- Poshmark Fee (20%):</span>
                  <span>-$9.60</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Item Cost (thrift store):</span>
                  <span>-$6.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Shipping Label (Poshmark prepaid):</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Packaging (poly mailer, tissue):</span>
                  <span>-$0.50</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Profit:</span>
                  <span>$31.90 (67% margin)</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>ROI:</span>
                  <span>532% ($31.90 profit / $6 cost)</span>
                </div>
              </div>
            </div>

            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: eBay Electronics Flip</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sale Price (eBay):</span>
                  <span className="font-semibold text-sheetlink-green-700">$125.00</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- eBay Final Value Fee (12.9% + $0.30):</span>
                  <span>-$16.43</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Item Cost (yard sale):</span>
                  <span>-$25.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Shipping Cost (USPS Priority):</span>
                  <span>-$12.50</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Packaging (box, bubble wrap):</span>
                  <span>-$2.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Promoted Listing (5% ad fee):</span>
                  <span>-$6.25</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Profit:</span>
                  <span>$62.82 (50% margin)</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>ROI:</span>
                  <span>251% ($62.82 profit / $25 cost)</span>
                </div>
              </div>
            </div>

            <p>
              With SheetLink, build formulas in Google Sheets to calculate this automatically for each sale. Track which categories (clothing, electronics, vintage) have the best margins.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Platform Fees Breakdown
            </h2>
            <p>
              Understanding platform fees is critical for pricing and profitability:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">eBay: 12.9% + $0.30 Final Value Fee</h3>
                <p className="text-sm mt-2">
                  eBay charges 12.9% + $0.30 on most categories. Some categories differ: guitars (3.5%), trading cards (12.35%). Add 250 free listings/month, then $0.35/listing. Promoted listings: 2-20% ad fee optional.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Poshmark: 20% on $15+, $2.95 on under $15</h3>
                <p className="text-sm mt-2">
                  Poshmark takes 20% commission on sales $15 and above, flat $2.95 on sales under $15. Shipping labels provided at flat rate ($7.97 for up to 5 lbs). No listing fees. Best for clothing, accessories.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Mercari: 10% + Payment Processing</h3>
                <p className="text-sm mt-2">
                  Mercari charges 10% selling fee + payment processing (2.9% + $0.30). Lower fees than competitors. Prepaid shipping labels available. Good for general merchandise, collectibles, electronics.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Facebook Marketplace: Free (0% fees)</h3>
                <p className="text-sm mt-2">
                  Facebook Marketplace has no selling fees for local pickup. Shipping option charges 5% or $0.40 minimum. Best for large items, furniture, local sales. Use Venmo/Zelle for payment.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Inventory & Sourcing ROI
            </h2>
            <p>
              Smart resellers track which sourcing channels give the best ROI:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Thrift stores (Goodwill, Value Village)</strong> - High margin potential (400-1000% ROI) but time-intensive</li>
              <li><strong>Yard/garage sales</strong> - Best prices but inconsistent inventory, seasonal</li>
              <li><strong>Estate sales</strong> - Quality items, vintage finds, but competitive with other resellers</li>
              <li><strong>Retail arbitrage</strong> - Clearance racks at Target, Walmart, TJ Maxx (lower margins, 30-50%)</li>
              <li><strong>Online arbitrage</strong> - Amazon clearance, eBay lots (easier to scale, requires research)</li>
              <li><strong>Wholesale</strong> - Buy in bulk from distributors (lower per-unit margins but volume)</li>
            </ul>
            <p className="mt-4">
              Tag each inventory purchase in SheetLink by sourcing channel. Calculate average ROI per channel to focus your time on highest-return sources.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Key Metrics for Resellers
            </h2>
            <p>
              Build these metrics in your SheetLink spreadsheet to monitor business health:
            </p>
            <div className="my-6 rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
              <h3 className="font-semibold text-sheetlink-text mb-4">Essential Reseller Metrics</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong>Profit Margin %:</strong> (Net Profit ÷ Sale Price) × 100 (target: 40-60%)
                </li>
                <li>
                  <strong>Average ROI:</strong> (Total Profit ÷ Total COGS) × 100 (target: 200-500%)
                </li>
                <li>
                  <strong>Inventory Value:</strong> Total $ tied up in unsold items (minimize to improve cash flow)
                </li>
                <li>
                  <strong>Sell-Through Rate:</strong> (Items Sold ÷ Items Listed) × 100 (target: 70%+)
                </li>
                <li>
                  <strong>Average Days to Sell:</strong> How long items sit before selling (lower is better)
                </li>
                <li>
                  <strong>Inventory Turnover:</strong> Items Sold ÷ Average Inventory (target: 6-12x per year)
                </li>
                <li>
                  <strong>ROI by Category:</strong> Which item types (clothing, electronics, vintage) are most profitable
                </li>
                <li>
                  <strong>ROI by Sourcing Channel:</strong> Which sourcing method gives best returns
                </li>
              </ul>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Reseller Tracker
            </h2>
            <p>
              Get your resale business bookkeeping organized in under 15 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Business Bank Account</strong> - Link the account where platforms deposit sales via Plaid
              </li>
              <li>
                <strong>Connect Your Business Credit Card</strong> - Track sourcing purchases, shipping, and supplies
              </li>
              <li>
                <strong>Create Your Reseller Finance Sheet</strong> - Start with a blank Google Sheet
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all sales deposits and expenses
              </li>
              <li>
                <strong>Add Custom Columns</strong> - Item SKU, Platform, Category, Source Channel, Sale Date
              </li>
              <li>
                <strong>Tag Transactions</strong> - Mark each sale with item details and each purchase with sourcing info
              </li>
              <li>
                <strong>Build Profit Formulas</strong> - Calculate profit per item, average margin, ROI by category
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Manage Dead Stock & Slow Movers
            </h2>
            <p>
              Not every item sells quickly. Track aging inventory to minimize cash tied up:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">30-60 Days Listed</h3>
                <p className="text-sm mt-2">
                  Normal timeframe for most items. Monitor interest (views, likes, watchers). Consider small price drop or promotion if no traction.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">60-90 Days Listed</h3>
                <p className="text-sm mt-2">
                  Slow-moving inventory. Reduce price by 10-20%, improve photos/description, relist with better keywords, or bundle with other items.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">90+ Days Listed (Dead Stock)</h3>
                <p className="text-sm mt-2">
                  Consider deep discount (30-50% off), donate for tax write-off, or source to wholesale buyers. Accept break-even or small loss to free up cash for better inventory.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Reseller Software
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
                    <td className="px-6 py-4">Solo resellers, simple bookkeeping</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">List Perfectly</td>
                    <td className="px-6 py-4">$30-70/month</td>
                    <td className="px-6 py-4">Crossposting + profit tracking</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Vendoo</td>
                    <td className="px-6 py-4">$40-80/month</td>
                    <td className="px-6 py-4">Multi-platform automation</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks</td>
                    <td className="px-6 py-4">$30-75/month</td>
                    <td className="px-6 py-4">Full-time resellers with employees</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Manual spreadsheet</td>
                    <td className="px-6 py-4">Free (time cost)</td>
                    <td className="px-6 py-4">Beginners, very small scale</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>SheetLink advantage:</strong> Automated bank sync with full spreadsheet control at a fraction of the cost. Perfect for resellers who want profit tracking without expensive crossposting features. Combine with free listing tools for complete workflow.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Season for Resellers
            </h2>
            <p>
              Resellers file Schedule C (self-employment income) and track COGS carefully:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gross receipts</strong> - Total sales from all platforms (tracked automatically by SheetLink)</li>
              <li><strong>COGS deduction</strong> - Inventory purchases are deductible when items sell, not when purchased</li>
              <li><strong>Year-end inventory</strong> - Calculate value of unsold items; affects COGS calculation</li>
              <li><strong>Business expenses</strong> - Shipping, platform fees, supplies, mileage, storage</li>
              <li><strong>Quarterly estimated taxes</strong> - Pay 25-30% of net profit each quarter to avoid penalties</li>
              <li><strong>1099-K reporting</strong> - Platforms send 1099-K if you make $5,000+; verify with SheetLink records</li>
              <li><strong>Mileage deduction</strong> - Track sourcing trips at $0.67/mile (2024 rate)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Reseller Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Jessica - Clothing Reseller</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Jessica thrifted 50+ items per week but couldn't track which brands were most profitable. Wasted time on low-margin items.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs all Poshmark and eBay sales. Jessica tags each sale by brand and category, calculates profit per item.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Discovered designer jeans had 800% ROI while fast fashion averaged 200%. Focused sourcing on high-end brands, doubled monthly profit from $2,000 to $4,200.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Tom - Electronics Flipper</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Tom sourced from yard sales and online marketplaces but had $3,000 in dead stock not selling on eBay.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink tracks all purchases and sales. Tom calculated days-to-sell for each category and identified slow-moving items.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Liquidated dead stock at break-even, reinvested in faster-selling categories (gaming consoles, Apple products). Reduced inventory from $8,000 to $4,500 while maintaining same revenue. Improved cash flow by 45%.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Resellers
            </h2>
            <p>
              SheetLink is designed to scale with your resale business:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (good for new resellers testing viability)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (recommended for part-time resellers)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (best for full-time resellers, tax records)</li>
            </ul>
            <p className="mt-4">
              <strong>Recommended tier:</strong> Basic ($2/month) for side hustle resellers making under $3k/month. Pro ($10/month) for full-time resellers doing $3k+ monthly revenue who need complete tax records and year-over-year comparisons.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Reseller Profit Today
            </h2>
            <p>
              Stop guessing at profitability and start tracking real numbers. Know which items are winners, which sourcing channels work best, and exactly what you owe in taxes.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your reseller finances automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for resellers.
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
                Add to Chrome - Start Tracking Your Business
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
