import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function FreelanceIncomeTracker() {
  const seoTitle = 'Freelance Income Tracker - Sync Bank to Google Sheets | SheetLink';
  const seoDescription = 'Automatically sync freelance income and expenses to Google Sheets. Track 1099 income from multiple clients, organize deductible expenses, and prepare for quarterly taxes. Perfect for freelancers and contractors.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do freelancers track income from multiple clients?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension and connect your business bank account via Plaid. SheetLink automatically syncs all client payments, invoices, and deposits to Google Sheets. Add a 'Client' column to tag each income transaction, making it easy to see revenue per client, track payment timing, and identify your most profitable relationships."
        }
      },
      {
        "@type": "Question",
        "name": "What expenses can freelancers deduct on taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Freelancers can deduct home office expenses (rent, utilities, internet), equipment (computers, software, cameras), professional services (accountant, lawyer), business meals (50% deductible), travel expenses, education and training, health insurance premiums, and retirement contributions. SheetLink syncs these expenses from your bank and credit cards to Google Sheets for easy categorization and tax prep."
        }
      },
      {
        "@type": "Question",
        "name": "How do freelancers calculate quarterly estimated taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track gross income minus business expenses in Google Sheets with SheetLink. Your net profit is subject to both income tax (10-37%) and self-employment tax (15.3%). Quarterly estimated taxes are due April 15, June 15, Sept 15, and Jan 15. Calculate 25-30% of your net profit per quarter and pay via IRS Form 1040-ES to avoid penalties."
        }
      },
      {
        "@type": "Question",
        "name": "Can SheetLink help with Schedule C tax preparation?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink automatically syncs all business income and expenses to Google Sheets. Categorize transactions by Schedule C categories (income, advertising, office expenses, travel, etc.). At tax time, generate totals for each category and transfer to Schedule C (Form 1040). SheetLink gives you organized, audit-ready records for your tax preparer or DIY filing."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="freelance income tracker, 1099 income tracking, freelance bookkeeping, track client payments, freelance expense tracker, quarterly tax calculator" />

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
            Freelance Income Tracker - Track Client Payments & Expenses
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Freelancing means juggling multiple clients, tracking 1099 income, and managing business expenses. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into client payments, deductible expenses, and quarterly tax obligations—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Freelancers Choose SheetLink
            </h2>
            <p>
              Most freelancers struggle with manual spreadsheets or pay for expensive accounting software. SheetLink gives you automated bookkeeping at a fraction of the cost:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync client payments</strong> - Track deposits from Venmo, PayPal, direct deposit, and checks</li>
              <li><strong>Track income by client</strong> - Tag transactions to see revenue per client relationship</li>
              <li><strong>Organize deductible expenses</strong> - Home office, software, equipment, meals, travel</li>
              <li><strong>Quarterly tax estimates</strong> - Calculate what you owe for estimated taxes</li>
              <li><strong>Schedule C preparation</strong> - Categorize expenses for easy tax filing</li>
              <li><strong>Affordable pricing</strong> - $2/month vs QuickBooks Self-Employed at $20/month</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Freelance Income Tracker
            </h2>
            <p>
              Get your freelance finances organized in under 10 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Business Bank Account</strong> - Link the account where clients pay you via Plaid
              </li>
              <li>
                <strong>Connect Your Business Credit Card</strong> - Track business expenses automatically
              </li>
              <li>
                <strong>Create Your Freelance Finance Sheet</strong> - Start with a blank sheet or freelancer template
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all income and expenses
              </li>
              <li>
                <strong>Add Custom Columns</strong> - Tag transactions by client, project, or expense category
              </li>
              <li>
                <strong>Calculate Net Income</strong> - Use formulas to track gross income minus expenses
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Income from Multiple Clients
            </h2>
            <p>
              SheetLink syncs payments from all sources so you can see which clients are most profitable:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Payment Sources</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Direct deposit / ACH</li>
                  <li>PayPal transfers</li>
                  <li>Venmo payments</li>
                  <li>Zelle deposits</li>
                  <li>Check deposits</li>
                  <li>Wire transfers</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">What to Track</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Client name</li>
                  <li>Project/invoice number</li>
                  <li>Payment date</li>
                  <li>Amount (gross)</li>
                  <li>Payment method</li>
                  <li>Invoice due date</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              Add a "Client" column to tag each income transaction. Use filters or pivot tables to see total revenue per client and identify payment patterns.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What Business Expenses Can Freelancers Deduct?
            </h2>
            <p>
              SheetLink syncs all business transactions so you can track every deductible expense:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Home Office Expenses</h3>
                <p className="text-sm mt-2">
                  Deduct a portion of rent/mortgage, utilities, internet, and renters/homeowners insurance based on square footage used exclusively for business. Simplified method: $5/sq ft up to 300 sq ft.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Equipment & Software</h3>
                <p className="text-sm mt-2">
                  Computers, cameras, microphones, desks, chairs, Adobe Creative Cloud, hosting, project management tools, CRM software. Items over $2,500 may need to be depreciated.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Professional Services</h3>
                <p className="text-sm mt-2">
                  Accountant fees, lawyer fees, business coaching, contract platforms (Upwork fees), payment processing fees (PayPal, Stripe), bank fees.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Travel & Meals</h3>
                <p className="text-sm mt-2">
                  Business travel (flights, hotels, rental cars), client meetings (50% of meals deductible), mileage for business errands (67 cents/mile for 2024).
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Education & Marketing</h3>
                <p className="text-sm mt-2">
                  Online courses, conferences, books, certifications, website costs, advertising (Google Ads, Facebook), business cards, portfolio site.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Your Freelance Profit & Tax Liability
            </h2>
            <p>
              Understanding your true profit is essential for pricing, cash flow, and tax planning:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: Freelance Designer (Q1 2024)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Income (3 clients):</span>
                  <span className="font-semibold text-sheetlink-green-700">$25,000</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- Home Office:</span>
                  <span>-$1,500</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Software Subscriptions:</span>
                  <span>-$600</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Equipment (laptop, monitor):</span>
                  <span>-$2,000</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Marketing & Advertising:</span>
                  <span>-$800</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Professional Services:</span>
                  <span>-$400</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Business Meals & Travel:</span>
                  <span>-$700</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Profit:</span>
                  <span>$19,000</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>Self-Employment Tax (15.3%):</span>
                  <span>-$2,907</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Income Tax (22% bracket, estimated):</span>
                  <span>-$4,180</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-text text-lg">
                  <span>Q1 Estimated Tax Payment:</span>
                  <span>$7,087</span>
                </div>
              </div>
            </div>
            <p>
              With SheetLink, you can build formulas in Google Sheets to calculate this automatically each quarter.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Quarterly Estimated Taxes for Freelancers
            </h2>
            <p>
              Freelancers must pay estimated taxes quarterly to avoid penalties. Here's how to stay on track:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q1: April 15 Deadline</h3>
                <p className="text-sm mt-2">
                  Calculate net profit for Jan-Mar. Multiply by 30% (safe estimate for taxes). Pay via IRS Form 1040-ES or EFTPS.gov.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q2: June 15 Deadline</h3>
                <p className="text-sm mt-2">
                  Calculate net profit for Apr-May. Adjust payment if Q2 income was higher or lower than Q1.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q3: September 15 Deadline</h3>
                <p className="text-sm mt-2">
                  Calculate net profit for Jun-Aug. Summer months often differ for freelancers—adjust accordingly.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q4: January 15 Deadline (next year)</h3>
                <p className="text-sm mt-2">
                  Calculate net profit for Sep-Dec. If you overpaid during the year, you can reduce Q4 or skip it and get a refund at tax time.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Prepare Schedule C with SheetLink
            </h2>
            <p>
              Freelancers file Schedule C (Profit or Loss from Business) with their 1040 tax return. SheetLink organizes data for easy Schedule C completion:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Part I - Income</strong>: Total gross receipts (all client payments synced by SheetLink)</li>
              <li><strong>Part II - Expenses</strong>: Advertising, car/truck, commissions/fees, depreciation, insurance, legal/professional, office, supplies, travel, meals (50%), utilities</li>
              <li><strong>Part III - Cost of Goods Sold</strong>: Not applicable for most service-based freelancers</li>
              <li><strong>Part IV - Info on Vehicle</strong>: Track mileage separately or use standard mileage rate</li>
              <li><strong>Part V - Other Expenses</strong>: Software, online services, education, memberships</li>
            </ul>
            <p className="mt-4">
              Tag each transaction in your SheetLink spreadsheet with its Schedule C category. At tax time, use SUM formulas to generate totals for each line item.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Multiple Income Streams
            </h2>
            <p>
              Many freelancers have diverse income sources. SheetLink handles it all:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Client project work</strong> - Main freelance income from contracts and invoices</li>
              <li><strong>Retainer clients</strong> - Recurring monthly payments for ongoing services</li>
              <li><strong>Digital product sales</strong> - Templates, courses, ebooks sold online</li>
              <li><strong>Affiliate commissions</strong> - Revenue from affiliate programs</li>
              <li><strong>Speaking/consulting fees</strong> - One-time engagements and workshops</li>
            </ul>
            <p className="mt-4">
              Tag transactions by income type to see which streams are growing and which need attention.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Freelance Accounting Tools
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
                    <td className="px-6 py-4">Solo freelancers, 1099 contractors</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks Self-Employed</td>
                    <td className="px-6 py-4">$20/month</td>
                    <td className="px-6 py-4">Freelancers needing invoicing + tracking</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">FreshBooks</td>
                    <td className="px-6 py-4">$19-60/month</td>
                    <td className="px-6 py-4">Service businesses with many clients</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Wave</td>
                    <td className="px-6 py-4">Free (paid features extra)</td>
                    <td className="px-6 py-4">Very small freelancers, hobby income</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>SheetLink advantage:</strong> Automated bank sync with full spreadsheet flexibility at 1/10th the cost of alternatives. Combine with free invoicing tools (Wave, Invoice Ninja) if needed.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Freelancer Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Maria - Freelance Writer</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Maria worked with 8 clients but lost track of who paid on time. Missed following up on late invoices.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs all payments to Google Sheets. Maria tags each payment by client and invoice number. Built a dashboard showing payment timing.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Identified 2 clients who consistently paid 30+ days late. Adjusted payment terms and improved cash flow by 25%.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">David - Freelance Developer</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> David wasn't tracking business expenses properly and overpaid taxes by $4,000 last year.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink auto-syncs all business credit card charges. David categorizes expenses by Schedule C line items throughout the year.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Identified $12,000 in deductible expenses he previously missed (software, equipment, home office). Reduced tax bill by $3,600.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Freelancers
            </h2>
            <p>
              SheetLink is designed to be affordable for independent contractors and freelancers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (great for weekly income tracking)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (covers quarterly tax prep)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (full tax year + prior year records)</li>
            </ul>
            <p className="mt-4">
              Compare to QuickBooks Self-Employed ($20/month) or FreshBooks ($19-60/month). SheetLink gives you automated bank sync and full spreadsheet control at a fraction of the cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Freelance Income Today
            </h2>
            <p>
              Stop manually entering transactions and start automating your freelance bookkeeping. Know exactly what you earn, what you owe in taxes, and which clients are most profitable.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your freelance income automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for freelancers and 1099 contractors.
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
