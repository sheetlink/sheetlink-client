import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function DropshippingFinanceTracker() {
  const seoTitle = 'Dropshipping Finance Tracker - Sync Shopify & Amazon to Sheets | SheetLink';
  const seoDescription = 'Automatically sync dropshipping finances to Google Sheets. Track Shopify/Amazon revenue, supplier costs (COGS), shipping, ad spend, and profit margins. Perfect for ecommerce sellers and dropshippers.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do dropshippers track profit and expenses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension and connect your business bank account (where Shopify/Amazon deposits payouts) via Plaid. SheetLink automatically syncs revenue deposits and expense charges (supplier payments, ad spend, shipping costs) to Google Sheets. Tag transactions as revenue, COGS, ads, or fees to calculate true profit margins per product or overall."
        }
      },
      {
        "@type": "Question",
        "name": "What is COGS and how do dropshippers calculate it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "COGS (Cost of Goods Sold) is what you pay suppliers for products. For dropshippers, COGS includes product cost from AliExpress/supplier + shipping from supplier to customer. Track supplier payments in SheetLink and divide by units sold to get COGS per unit. Formula: Profit = Revenue - COGS - Platform Fees - Ad Spend - Other Expenses."
        }
      },
      {
        "@type": "Question",
        "name": "How do dropshippers handle refunds and chargebacks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink syncs refunds as negative transactions (money leaving your account). Tag refunds separately to track refund rate. Chargebacks appear as deductions from your Shopify/Amazon payout. Monitor refund rate closely—high rates indicate product quality or shipping issues. Aim for <2% refund rate. Factor average refund rate into profit calculations."
        }
      },
      {
        "@type": "Question",
        "name": "Do dropshippers need to track sales tax?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, if you have sales tax nexus in a state. Shopify and Amazon can auto-collect sales tax, but you're responsible for remitting it to states. SheetLink tracks total revenue including sales tax collected. Separate tax collected from actual revenue in your sheet. File and pay sales tax monthly or quarterly depending on state requirements. Consider TaxJar or Avalara for multi-state compliance."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="dropshipping finance tracker, ecommerce bookkeeping spreadsheet, shopify profit tracker, amazon seller finances, track COGS, dropshipping expenses" />

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
            Dropshipping Finance Tracker - Track Shopify, Amazon & Ecommerce Profit
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Running a dropshipping or ecommerce business means tracking revenue, supplier costs, shipping, ad spend, and fees across multiple platforms. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into Shopify/Amazon payouts, COGS, expenses, and true profit margins—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Dropshippers Choose SheetLink
            </h2>
            <p>
              Most dropshippers track sales in Shopify/Amazon but lose visibility once money hits the bank. SheetLink connects the dots:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync platform payouts</strong> - Track Shopify, Amazon, eBay deposits automatically</li>
              <li><strong>Track supplier costs (COGS)</strong> - Monitor payments to AliExpress, Alibaba, CJ Dropshipping</li>
              <li><strong>Monitor ad spend</strong> - Track Facebook Ads, Google Ads, TikTok Ads charges</li>
              <li><strong>Calculate real profit</strong> - Revenue minus COGS, fees, ads, shipping, refunds</li>
              <li><strong>Handle refunds & chargebacks</strong> - Track returns to see true net revenue</li>
              <li><strong>Tax-ready records</strong> - Organized for Schedule C tax filing</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Dropshipping Finance Tracker
            </h2>
            <p>
              Get your ecommerce finances organized in under 10 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Business Bank Account</strong> - Link the account where Shopify/Amazon deposits payouts via Plaid
              </li>
              <li>
                <strong>Connect Your Business Credit Card</strong> - Track supplier payments, ad spend, and software subscriptions
              </li>
              <li>
                <strong>Create Your Dropshipping Finance Sheet</strong> - Start with a blank sheet or ecommerce template
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all revenue and expenses
              </li>
              <li>
                <strong>Add Custom Columns</strong> - Tag transactions as Revenue, COGS, Ads, Shipping, Fees, Refunds
              </li>
              <li>
                <strong>Calculate Profit Margins</strong> - Use formulas to track profit per product or per month
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Revenue from Multiple Sales Channels
            </h2>
            <p>
              SheetLink syncs payouts from all ecommerce platforms so you can see total revenue:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Ecommerce Platforms</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Shopify (daily/weekly payouts)</li>
                  <li>Amazon Seller Central</li>
                  <li>eBay</li>
                  <li>WooCommerce</li>
                  <li>BigCommerce</li>
                  <li>Etsy</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Payment Processors</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Shopify Payments</li>
                  <li>PayPal</li>
                  <li>Stripe</li>
                  <li>Square</li>
                  <li>Amazon Pay</li>
                  <li>Klarna (BNPL fees)</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              Add a "Platform" column to tag each payout. See which channel has the best margins and focus marketing there.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate True COGS (Cost of Goods Sold)
            </h2>
            <p>
              COGS is the single biggest expense for dropshippers. SheetLink helps you track it accurately:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 1: Sync Supplier Payments</h3>
                <p className="text-sm mt-2">
                  SheetLink captures credit card charges to AliExpress, Alibaba, CJ Dropshipping, Spocket, or direct supplier invoices. Every product purchase is automatically logged.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 2: Include Shipping to Customer</h3>
                <p className="text-sm mt-2">
                  If supplier charges shipping separately, include it in COGS. Example: $15 product + $8 shipping = $23 COGS per unit.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 3: Tag by Product or SKU</h3>
                <p className="text-sm mt-2">
                  Add a "Product" or "SKU" column. Tag each supplier payment to see COGS per product. Identify which products have the best margins.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 4: Calculate COGS Percentage</h3>
                <p className="text-sm mt-2">
                  Divide total COGS by total revenue. Aim for 20-40% COGS for healthy margins. If COGS is over 50%, your profit is squeezed by ads and fees.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track All Dropshipping Expenses
            </h2>
            <p>
              SheetLink syncs every business expense so nothing falls through the cracks:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Platform Fees</h3>
                <p className="text-sm mt-2">
                  Shopify subscription ($29-299/month), Shopify transaction fees (2% if not using Shopify Payments), Amazon referral fees (8-15%), PayPal/Stripe fees (2.9% + $0.30), eBay fees.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Advertising Spend</h3>
                <p className="text-sm mt-2">
                  Facebook Ads, Instagram Ads, Google Ads, TikTok Ads, Pinterest Ads, influencer payments. Track daily ad spend to calculate ROAS (Return on Ad Spend). Formula: Revenue ÷ Ad Spend = ROAS. Aim for 3:1 or better.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Software & Tools</h3>
                <p className="text-sm mt-2">
                  Oberlo, Spocket, CJ Dropshipping fees, email marketing (Klaviyo, Mailchimp), inventory management, product research tools (Jungle Scout, Helium 10), design tools (Canva Pro).
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Refunds & Chargebacks</h3>
                <p className="text-sm mt-2">
                  Customer refunds (reduce revenue), chargeback fees ($15-25 per chargeback), return shipping (if you cover it). High refund rate kills profit—aim for under 2%.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Other Expenses</h3>
                <p className="text-sm mt-2">
                  Business bank account fees, accountant/bookkeeper, LLC registration, business insurance, product photography, virtual assistant.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Dropshipping Profit Margins
            </h2>
            <p>
              Understanding true profit is essential for scaling your store. Here's a real example:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: Shopify Dropshipping Store (Monthly)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Revenue (500 orders × $50 avg):</span>
                  <span className="font-semibold text-sheetlink-green-700">$25,000</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- COGS (product + shipping to customer):</span>
                  <span>-$7,500 (30%)</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Payment Processing Fees (2.9% + $0.30):</span>
                  <span>-$875</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Facebook Ads:</span>
                  <span>-$8,000</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Shopify Subscription + Apps:</span>
                  <span>-$150</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Refunds (3% rate):</span>
                  <span>-$750</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Other Software (email, tools):</span>
                  <span>-$200</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Profit:</span>
                  <span>$7,525 (30% margin)</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-semibold text-sheetlink-text">
                  <span>ROAS (Return on Ad Spend):</span>
                  <span>3.1:1 ($25,000 ÷ $8,000)</span>
                </div>
              </div>
            </div>
            <p>
              With SheetLink, you can build formulas to calculate this automatically and track month-over-month changes.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Monitor Key Dropshipping Metrics
            </h2>
            <p>
              Use SheetLink data to calculate critical ecommerce KPIs:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gross Profit Margin</strong>: (Revenue - COGS) ÷ Revenue × 100. Aim for 60-80%.</li>
              <li><strong>Net Profit Margin</strong>: Net Profit ÷ Revenue × 100. Aim for 20-30%.</li>
              <li><strong>ROAS (Return on Ad Spend)</strong>: Revenue ÷ Ad Spend. Aim for 3:1 minimum.</li>
              <li><strong>Average Order Value (AOV)</strong>: Total Revenue ÷ Number of Orders.</li>
              <li><strong>Customer Acquisition Cost (CAC)</strong>: Total Ad Spend ÷ New Customers.</li>
              <li><strong>Refund Rate</strong>: Refund Amount ÷ Total Revenue × 100. Keep under 2-3%.</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Handle Refunds and Chargebacks
            </h2>
            <p>
              Refunds and chargebacks are reality in ecommerce. SheetLink helps you track them:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Track Refunds</h3>
                <p className="text-sm mt-2">
                  Refunds appear as negative transactions (money leaving your account). Tag them separately to calculate refund rate. High refund rate indicates product quality issues or misleading product descriptions.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Monitor Chargebacks</h3>
                <p className="text-sm mt-2">
                  Chargebacks are deducted from payouts plus a fee ($15-25). High chargeback rate can get your Shopify/Amazon account suspended. Keep under 1%. Common causes: long shipping times, item not as described.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Calculate Net Revenue</h3>
                <p className="text-sm mt-2">
                  Net Revenue = Gross Revenue - Refunds - Chargebacks. Use net revenue for all profit calculations, not gross.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Sales Tax for Dropshippers
            </h2>
            <p>
              If you have sales tax nexus (physical presence or economic nexus in a state), you must collect and remit sales tax:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Economic nexus</strong>: Most states require collection after $100k-200k in sales or 200+ transactions</li>
              <li><strong>Shopify auto-collects</strong>: Set up tax collection in Shopify for states where you have nexus</li>
              <li><strong>Separate tax collected from revenue</strong>: Sales tax is not your income—it's a liability you owe states</li>
              <li><strong>File and remit</strong>: Most states require monthly or quarterly filing. Use TaxJar or Avalara for multi-state compliance</li>
              <li><strong>Track in SheetLink</strong>: Create separate column for sales tax collected vs actual revenue</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Preparation for Dropshipping Business
            </h2>
            <p>
              Dropshippers file Schedule C (sole proprietor) or corporate tax returns. SheetLink organizes data for tax season:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gross receipts</strong>: Total sales revenue (before refunds and fees)</li>
              <li><strong>Returns and allowances</strong>: Total refunds issued</li>
              <li><strong>COGS</strong>: Cost of inventory purchased from suppliers</li>
              <li><strong>Advertising</strong>: Facebook Ads, Google Ads, influencer payments</li>
              <li><strong>Office expenses</strong>: Software subscriptions, tools, email marketing</li>
              <li><strong>Home office deduction</strong>: If you work from home, deduct portion of rent/utilities</li>
              <li><strong>Quarterly estimated taxes</strong>: Pay 25-30% of net profit quarterly to avoid penalties</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Ecommerce Accounting Tools
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
                    <td className="px-6 py-4">Solo dropshippers, small ecommerce stores</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks Online</td>
                    <td className="px-6 py-4">$30-200/month</td>
                    <td className="px-6 py-4">Businesses with inventory, multi-channel sellers</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">A2X</td>
                    <td className="px-6 py-4">$19-199/month</td>
                    <td className="px-6 py-4">Amazon/Shopify accounting integration</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Link My Books</td>
                    <td className="px-6 py-4">$15-49/month</td>
                    <td className="px-6 py-4">Shopify to QuickBooks sync</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>SheetLink advantage:</strong> Track actual bank activity (not just Shopify/Amazon data). See when money hits your account, track ad spend and supplier payments, all in one view at 1/10th the cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Dropshipper Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Alex - Shopify Print-on-Demand Store</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Alex's Shopify dashboard showed $30k revenue but only $5k actually hit the bank. Couldn't figure out where the money went.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink synced bank deposits and expenses. Alex discovered 20% went to refunds, 10% to Printful COGS, 5% to fees, and 40% to ads.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Reduced refund rate from 20% to 5% by improving product descriptions. Net profit increased from $5k to $12k/month.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Rachel - Multi-Channel Ecommerce Seller</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Rachel sold on Shopify, Amazon, and eBay but couldn't see which channel was most profitable.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs payouts from all platforms. Rachel tagged each deposit by platform and tracked COGS and ad spend per channel.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Discovered Amazon had 15% margins vs Shopify's 30% margins. Shifted focus to Shopify and increased overall profit by 60%.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Dropshippers
            </h2>
            <p>
              SheetLink is designed to be affordable for ecommerce entrepreneurs:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (great for daily profit checks)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (covers quarterly analysis)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (full tax year + prior year)</li>
            </ul>
            <p className="mt-4">
              Compare to QuickBooks ($30-200/month) or A2X ($19-199/month). SheetLink gives you automated bank sync and full spreadsheet control at a fraction of the cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Dropshipping Finances Today
            </h2>
            <p>
              Stop guessing at profit margins. Track every dollar from Shopify/Amazon payouts to supplier payments to ad spend. Know your true profit and scale with confidence.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your dropshipping finances automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for Shopify, Amazon, and ecommerce sellers.
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
