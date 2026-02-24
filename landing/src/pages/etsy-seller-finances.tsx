import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function EtsySellerFinances() {
  const seoTitle = 'Etsy Seller Profit Tracker - Sync Bank to Google Sheets | SheetLink';
  const seoDescription = 'Automatically sync Etsy shop finances to Google Sheets. Track revenue, fees, shipping costs, and profit margins in real-time. Perfect for Etsy sellers managing bookkeeping. Free for 7 days.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I track Etsy shop finances in Google Sheets?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension and connect your bank account (where Etsy deposits payments) via Plaid. SheetLink automatically syncs deposits from Etsy along with business expenses like supplies, shipping, and fees. You can then categorize transactions, calculate profit margins, and track cash flow in Google Sheets."
        }
      },
      {
        "@type": "Question",
        "name": "Can SheetLink track Etsy fees and shipping costs?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink syncs all bank transactions including Etsy fee deductions and shipping cost charges. You can add custom columns to tag Etsy-specific costs: listing fees, transaction fees, payment processing fees, and shipping expenses. This helps you calculate true profit per sale."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need QuickBooks for my Etsy shop?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not necessarily. For most Etsy sellers, Google Sheets with SheetLink is simpler and cheaper than QuickBooks. SheetLink costs $2/month vs QuickBooks' $30-75/month. You get automatic bank sync, expense tracking, and profit calculations without the complexity of full accounting software. Upgrade to QuickBooks only if you need advanced inventory management or multi-channel selling."
        }
      },
      {
        "@type": "Question",
        "name": "How do Etsy sellers calculate profit margins?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track revenue (Etsy deposits), subtract costs of goods sold (materials, supplies), Etsy fees (listing, transaction, payment processing), shipping costs, and other expenses (packaging, marketing). SheetLink syncs these transactions to Google Sheets where you can use formulas to calculate profit per product, profit per month, and overall margins. Formula: (Revenue - Total Costs) / Revenue × 100 = Profit Margin %."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="etsy seller finances, etsy profit tracker, etsy bookkeeping, track etsy sales, etsy expense tracker, etsy shop finances spreadsheet" />

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
            Etsy Seller Profit Tracker - Track Your Shop Finances
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Running an Etsy shop means juggling revenue, fees, materials costs, and shipping expenses. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into Etsy deposits, business expenses, and profit margins—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Etsy Sellers Choose SheetLink
            </h2>
            <p>
              Most Etsy sellers use manual spreadsheets or expensive accounting software. SheetLink bridges the gap:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync Etsy deposits</strong> - Track revenue as Etsy pays out to your bank account</li>
              <li><strong>Track business expenses</strong> - Materials, shipping supplies, packaging, marketing costs</li>
              <li><strong>Calculate real profit</strong> - Subtract fees and costs to see actual profit per sale</li>
              <li><strong>Monitor cash flow</strong> - Know how much money is in your business account at all times</li>
              <li><strong>Tax-ready records</strong> - Organized transactions for Schedule C tax filing</li>
              <li><strong>Affordable pricing</strong> - $2/month vs QuickBooks' $30-75/month</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Etsy Shop Finance Tracker
            </h2>
            <p>
              Get your Etsy bookkeeping organized in under 10 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Business Bank Account</strong> - Link the account where Etsy deposits payments via Plaid
              </li>
              <li>
                <strong>Connect Your Business Credit Card</strong> (optional) - Track supply purchases and shipping costs
              </li>
              <li>
                <strong>Create Your Etsy Finance Sheet</strong> - Start with a blank sheet or Etsy seller template
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all deposits and expenses
              </li>
              <li>
                <strong>Add Custom Columns</strong> - Tag transactions as revenue, COGS, fees, shipping, or marketing
              </li>
              <li>
                <strong>Calculate Profit</strong> - Use formulas to track profit per product or per month
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What Expenses Should Etsy Sellers Track?
            </h2>
            <p>
              SheetLink syncs all business transactions so you can track every cost that affects your profit:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Cost of Goods Sold (COGS)</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Raw materials & supplies</li>
                  <li>Wholesale inventory</li>
                  <li>Packaging materials</li>
                  <li>Printing costs</li>
                  <li>Product labels</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Operating Expenses</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Etsy listing fees</li>
                  <li>Etsy transaction fees (6.5%)</li>
                  <li>Payment processing fees (3% + $0.25)</li>
                  <li>Shipping costs</li>
                  <li>Marketing & ads</li>
                  <li>Software subscriptions</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Your True Profit Per Sale
            </h2>
            <p>
              Many Etsy sellers don't realize how fees eat into profit. Here's how to calculate accurately:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: $50 Handmade Jewelry Sale</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Sale Price:</span>
                  <span className="font-semibold">$50.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Etsy Transaction Fee (6.5%):</span>
                  <span>-$3.25</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Payment Processing (3% + $0.25):</span>
                  <span>-$1.75</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Shipping Cost:</span>
                  <span>-$5.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Materials Cost (COGS):</span>
                  <span>-$15.00</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Packaging:</span>
                  <span>-$2.00</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>True Profit:</span>
                  <span>$23.00 (46% margin)</span>
                </div>
              </div>
            </div>
            <p>
              With SheetLink, you can build formulas in Google Sheets to calculate this automatically for every sale.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Multiple Revenue Streams
            </h2>
            <p>
              Many Etsy sellers also sell on other platforms. SheetLink can sync multiple bank accounts to track:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Etsy shop revenue</strong> - Main income stream from Etsy deposits</li>
              <li><strong>Shopify or custom website</strong> - Additional sales channels</li>
              <li><strong>Craft fair sales</strong> - Cash or card reader deposits</li>
              <li><strong>Wholesale orders</strong> - B2B sales to retailers</li>
              <li><strong>Custom commissions</strong> - One-off custom work</li>
            </ul>
            <p className="mt-4">
              Separate transactions by source in your sheet to see which channels are most profitable.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Manage Inventory Costs with SheetLink
            </h2>
            <p>
              Track material purchases and correlate them with product sales:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 1: Sync Supply Purchases</h3>
                <p className="text-sm mt-2">
                  SheetLink captures all charges to your business credit card for materials from suppliers like Amazon, Michaels, or wholesale vendors.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 2: Tag by Product Line</h3>
                <p className="text-sm mt-2">
                  Add a "Product" column in your sheet. Tag material costs by which product they're used for (e.g., "Earrings", "Necklaces", "Bracelets").
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 3: Calculate Cost Per Unit</h3>
                <p className="text-sm mt-2">
                  Divide total material costs by units produced. Example: $100 in beads makes 20 necklaces = $5 COGS per necklace.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 4: Track Profit by Product</h3>
                <p className="text-sm mt-2">
                  See which products have the highest margins. Focus your Etsy shop on best-sellers with strong profit.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Etsy Accounting Tools
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
                    <td className="px-6 py-4">Solo Etsy sellers, side hustlers</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks</td>
                    <td className="px-6 py-4">$30-75/month</td>
                    <td className="px-6 py-4">Multi-channel sellers, inventory tracking</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Manual CSV</td>
                    <td className="px-6 py-4">Free (time cost)</td>
                    <td className="px-6 py-4">Very small sellers, hobby shops</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">GoDaddy Bookkeeping</td>
                    <td className="px-6 py-4">$5-15/month</td>
                    <td className="px-6 py-4">Etsy + ecommerce integration</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Season for Etsy Sellers
            </h2>
            <p>
              Etsy sellers file Schedule C (self-employment income) on their tax return. SheetLink helps you stay organized:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Track gross income</strong> - All Etsy deposits synced automatically</li>
              <li><strong>Categorize deductions</strong> - COGS, shipping, fees, marketing, home office</li>
              <li><strong>Quarterly estimated taxes</strong> - Monitor profit to calculate quarterly tax payments</li>
              <li><strong>Year-end tax prep</strong> - Generate income and expense totals for your accountant or tax software</li>
              <li><strong>1099-K reporting</strong> - If you make over $5,000, Etsy sends 1099-K; verify with your SheetLink records</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Etsy Seller Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Sarah - Handmade Jewelry Shop</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Sarah was manually tracking sales in a spreadsheet but couldn't keep up with daily orders.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink auto-syncs Etsy deposits and material purchases from her business card. She tags each transaction by product line.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Sarah discovered her earrings have 60% margins while necklaces only have 30%. She shifted focus to earrings and increased profit by 40%.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Mike - Printable Digital Downloads</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Mike had no COGS but wasn't tracking Etsy fees, resulting in overestimated profit.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs bank deposits showing net revenue after Etsy deducts fees. Mike added a formula to calculate effective fee rate.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Mike realized fees were 10% of revenue (not 6.5%) due to payment processing. He adjusted pricing to maintain margins.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Etsy Sellers
            </h2>
            <p>
              SheetLink is designed to be affordable for side hustlers and small Etsy shops:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (great for weekly profit checks)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (covers quarterly tax prep)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (full business records)</li>
            </ul>
            <p className="mt-4">
              Compare to QuickBooks Self-Employed ($20/month) or QuickBooks Simple Start ($30/month). SheetLink gives you bank sync at a fraction of the cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Etsy Shop Finances Today
            </h2>
            <p>
              Stop manually entering transactions and start automating your Etsy bookkeeping. Know your real profit margins and make data-driven decisions for your shop.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your Etsy shop finances automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for Etsy sellers.
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
