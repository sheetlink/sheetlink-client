import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function GigWorkerBookkeeping() {
  const seoTitle = 'Gig Worker Bookkeeping - Track Uber, DoorDash & Delivery Income | SheetLink';
  const seoDescription = 'Automatically sync gig economy income to Google Sheets. Track Uber, DoorDash, Instacart earnings, mileage deductions, and vehicle expenses. Perfect for gig workers and delivery drivers.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do Uber and DoorDash drivers track income and expenses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension and connect your bank account where Uber, DoorDash, or Instacart deposits payments via Plaid. SheetLink automatically syncs all weekly deposits to Google Sheets. Track vehicle expenses (gas, maintenance, insurance) on your business credit card, and SheetLink syncs those too. Add mileage tracking to calculate the standard mileage deduction (67 cents/mile for 2024)."
        }
      },
      {
        "@type": "Question",
        "name": "What expenses can gig workers deduct on taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gig workers can deduct vehicle expenses using either actual expense method (gas, insurance, maintenance, depreciation) or standard mileage rate (67 cents/mile for 2024). Also deductible: phone bills (business portion), parking fees, tolls, car washes, roadside assistance, and supplies (insulated bags for food delivery). SheetLink syncs these expenses from your bank and credit cards for easy tax prep."
        }
      },
      {
        "@type": "Question",
        "name": "How do I track mileage for Uber, DoorDash, or Instacart?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use mileage tracking apps like Stride, MileIQ, or Everlance to automatically log business miles driven. Export monthly mileage totals and add to your SheetLink Google Sheet. For 2024, multiply business miles by $0.67 to calculate your standard mileage deduction. This is often more valuable than deducting actual vehicle expenses, especially for high-mileage drivers."
        }
      },
      {
        "@type": "Question",
        "name": "Do gig workers need to pay quarterly estimated taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Uber, DoorDash, Instacart, and other gig platforms don't withhold taxes. You're responsible for income tax and self-employment tax (15.3%). Track net profit in SheetLink (income minus mileage and expenses) and pay 25-30% quarterly via IRS Form 1040-ES. Quarterly deadlines: April 15, June 15, Sept 15, and Jan 15. Failure to pay quarterly results in penalties."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="uber driver bookkeeping, gig worker expenses, doordash profit tracker, instacart income tracking, delivery driver taxes, gig economy bookkeeping" />

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
            Gig Worker Bookkeeping - Track Uber, DoorDash & Delivery Income
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Driving for Uber, DoorDash, Instacart, or other gig platforms means tracking income, mileage, and vehicle expenses for taxes. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into gig earnings, deductible expenses, and quarterly tax obligations—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Gig Workers Choose SheetLink
            </h2>
            <p>
              Most gig workers track earnings manually or don't track expenses at all, resulting in overpaid taxes. SheetLink automates the busywork:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync gig income</strong> - Track Uber, DoorDash, Instacart deposits automatically</li>
              <li><strong>Track vehicle expenses</strong> - Gas, maintenance, insurance, car washes</li>
              <li><strong>Calculate mileage deductions</strong> - Import mileage data and calculate 67 cents/mile deduction</li>
              <li><strong>Quarterly tax estimates</strong> - Know what you owe before tax season</li>
              <li><strong>Schedule C preparation</strong> - Organized records for tax filing</li>
              <li><strong>Affordable pricing</strong> - $2/month vs Hurdlr at $10/month</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Gig Worker Finance Tracker
            </h2>
            <p>
              Get your gig finances organized in under 10 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Bank Account</strong> - Link the account where Uber/DoorDash deposits earnings via Plaid
              </li>
              <li>
                <strong>Connect Your Credit/Debit Card</strong> - Track gas and vehicle expenses automatically
              </li>
              <li>
                <strong>Create Your Gig Worker Sheet</strong> - Start with a blank sheet or gig worker template
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all deposits and expenses
              </li>
              <li>
                <strong>Add Mileage Tracking</strong> - Import weekly mileage from Stride or MileIQ
              </li>
              <li>
                <strong>Calculate Net Profit</strong> - Use formulas to track income minus mileage and expenses
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Income from Multiple Gig Platforms
            </h2>
            <p>
              SheetLink syncs deposits from all gig platforms so you can see your total earnings:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Rideshare Platforms</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Uber (rideshare)</li>
                  <li>Lyft</li>
                  <li>Uber Black</li>
                  <li>Local taxi companies</li>
                  <li>Medical transport (MTM, Veyo)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Delivery Platforms</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>DoorDash</li>
                  <li>Uber Eats</li>
                  <li>Grubhub</li>
                  <li>Instacart</li>
                  <li>Amazon Flex</li>
                  <li>Shipt</li>
                </ul>
              </div>
            </div>
            <p className="mt-4">
              Add a "Platform" column to tag each deposit. See which platform pays best per hour and focus your time accordingly.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Maximize Your Mileage Deduction
            </h2>
            <p>
              The standard mileage deduction is the biggest tax benefit for gig workers. Here's how to track it:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 1: Track Every Business Mile</h3>
                <p className="text-sm mt-2">
                  Use apps like Stride, MileIQ, Everlance, or Gridwise to automatically track mileage while you drive. Log miles from the moment you turn on the app until you turn it off (includes miles between deliveries/rides).
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 2: Export Monthly Mileage</h3>
                <p className="text-sm mt-2">
                  Most mileage apps let you export CSV or PDF reports. Add monthly totals to your SheetLink spreadsheet.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 3: Calculate Deduction</h3>
                <p className="text-sm mt-2">
                  Multiply business miles by standard rate ($0.67/mile for 2024). Example: 20,000 miles × $0.67 = $13,400 deduction.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 4: Compare to Actual Expenses</h3>
                <p className="text-sm mt-2">
                  SheetLink tracks actual vehicle costs (gas, insurance, maintenance). Compare total actual expenses vs standard mileage deduction. Use whichever is higher (but you must pick one method per vehicle per year).
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What Vehicle Expenses Can Gig Workers Deduct?
            </h2>
            <p>
              SheetLink syncs all vehicle-related transactions from your bank and credit cards:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Actual Expense Method</h3>
                <p className="text-sm mt-2">
                  Gas, oil changes, repairs, tires, car washes, insurance, registration fees, lease payments, depreciation. Deduct business-use percentage only (e.g., if 80% of miles are business, deduct 80% of expenses).
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Standard Mileage Method (Recommended)</h3>
                <p className="text-sm mt-2">
                  67 cents/mile for 2024 (covers gas, depreciation, maintenance). Simpler and often results in larger deduction for high-mileage drivers. Can still deduct parking, tolls, and interest on car loan separately.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-4">
                <h3 className="font-semibold text-sheetlink-text">Other Deductible Costs</h3>
                <p className="text-sm mt-2">
                  Cell phone bill (business portion), phone mount/charger, dash cam, insulated delivery bags, hand sanitizer, parking fees, tolls, roadside assistance (AAA), car cleaning supplies.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Your Gig Worker Profit & Taxes
            </h2>
            <p>
              Understanding your true profit after expenses is critical for financial planning:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: DoorDash Driver (Annual)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Earnings (DoorDash + tips):</span>
                  <span className="font-semibold text-sheetlink-green-700">$45,000</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- Standard Mileage (18,000 mi × $0.67):</span>
                  <span>-$12,060</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Cell Phone (business portion):</span>
                  <span>-$600</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Parking & Tolls:</span>
                  <span>-$300</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Delivery Supplies (bags, etc):</span>
                  <span>-$200</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Profit (Schedule C):</span>
                  <span>$31,840</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>Self-Employment Tax (15.3% × 92.35%):</span>
                  <span>-$4,492</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>Income Tax (12% bracket, estimated):</span>
                  <span>-$3,820</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-text text-lg">
                  <span>Total Tax Liability:</span>
                  <span>$8,312</span>
                </div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>After-Tax Income:</span>
                  <span>$23,528 ($1,961/month)</span>
                </div>
              </div>
            </div>
            <p>
              Without tracking mileage, you'd pay tax on the full $45,000 and owe $12,000+ in taxes. Proper tracking saves $4,000+/year.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Quarterly Estimated Taxes for Gig Workers
            </h2>
            <p>
              Gig platforms don't withhold taxes, so you must pay quarterly. Here's your schedule:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q1: April 15 Deadline</h3>
                <p className="text-sm mt-2">
                  Calculate Jan-Mar income minus expenses/mileage. Pay 25-30% of net profit via IRS Form 1040-ES or irs.gov/payments.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q2: June 15 Deadline</h3>
                <p className="text-sm mt-2">
                  Calculate Apr-May income. Adjust if you drove more or less than Q1.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q3: September 15 Deadline</h3>
                <p className="text-sm mt-2">
                  Calculate Jun-Aug income. Summer is often busy for delivery drivers—plan accordingly.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Q4: January 15 Deadline (next year)</h3>
                <p className="text-sm mt-2">
                  Calculate Sep-Dec income. Holiday season is peak for delivery apps. Don't get caught short.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Prepare Schedule C for Gig Work
            </h2>
            <p>
              Gig workers file Schedule C (Profit or Loss from Business) with their 1040. SheetLink organizes your data:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Part I - Income</strong>: Gross receipts from all platforms (Uber, DoorDash, etc)</li>
              <li><strong>Part II - Expenses</strong>: Car and truck expenses (standard mileage or actual), commissions/fees (platform fees if applicable), supplies (delivery bags), other (phone, parking)</li>
              <li><strong>Part IV - Vehicle Info</strong>: Date placed in service, business miles, commuting miles, total miles, yes/no questions about vehicle availability</li>
              <li><strong>Line 9: Car and truck expenses</strong>: Either enter mileage deduction OR actual expenses (not both)</li>
            </ul>
            <p className="mt-4">
              SheetLink gives you organized transaction history plus mileage totals, making Schedule C completion fast and accurate.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Multi-Platform Strategy with SheetLink
            </h2>
            <p>
              Many gig workers use multiple apps to maximize earnings. SheetLink tracks them all:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Stack platforms</strong> - Run Uber Eats and DoorDash simultaneously to minimize wait time</li>
              <li><strong>Track earnings per platform</strong> - See which pays best in your market</li>
              <li><strong>Identify peak times</strong> - Filter SheetLink data by date/time to find highest-earning hours</li>
              <li><strong>Calculate effective hourly rate</strong> - Income per hour after expenses (don't forget to subtract mileage cost)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Gig Worker Finance Apps
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
                    <td className="px-6 py-4">Gig workers who want bank sync + spreadsheet flexibility</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Stride</td>
                    <td className="px-6 py-4">Free (basic), $8/month (tax filing)</td>
                    <td className="px-6 py-4">Mileage tracking + basic expense tracking</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Hurdlr</td>
                    <td className="px-6 py-4">$10/month</td>
                    <td className="px-6 py-4">Gig workers needing real-time profit tracking</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Everlance</td>
                    <td className="px-6 py-4">$8/month</td>
                    <td className="px-6 py-4">Mileage + expense tracking with reporting</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Best approach:</strong> Use Stride (free) for automatic mileage tracking, then sync your bank transactions to SheetLink for complete financial picture at the lowest cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Gig Worker Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Carlos - Full-Time Uber Driver</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Carlos drove 30+ hours/week but didn't track mileage. Paid tax on gross income and got a $9,000 tax bill.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> Started using Stride for mileage (free) and SheetLink for income/expense tracking. Logged 25,000 business miles = $16,750 deduction.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Reduced taxable income from $55,000 to $38,250. Tax bill dropped to $5,400. Saved $3,600/year.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Jessica - Multi-App Delivery Driver</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Jessica ran DoorDash, Uber Eats, and Instacart but couldn't figure out which paid best.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs deposits from all platforms. Jessica tags each deposit by app and calculates earnings per hour driven.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Discovered Instacart paid $4/hour more in her market. Shifted focus to Instacart and increased monthly income by $600.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Gig Workers
            </h2>
            <p>
              SheetLink is designed to be affordable for gig economy workers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (great for weekly income checks)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (covers quarterly tax prep)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (full tax year + prior year)</li>
            </ul>
            <p className="mt-4">
              Compare to Hurdlr ($10/month) or Everlance ($8/month). SheetLink gives you automated bank sync with full spreadsheet control at the lowest price.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Gig Income Today
            </h2>
            <p>
              Stop leaving money on the table. Track your income, maximize your mileage deduction, and keep more of what you earn.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your gig income automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for Uber, DoorDash, and delivery drivers.
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
