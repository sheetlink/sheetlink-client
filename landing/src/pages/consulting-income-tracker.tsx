import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function ConsultingIncomeTracker() {
  const seoTitle = 'Consulting Income Tracker - Track Income & Expenses in Google Sheets | SheetLink';
  const seoDescription = 'Automatically sync consulting income and expenses to Google Sheets. Track client payments, project revenue, billable hours, business expenses, and quarterly taxes. Perfect for independent consultants managing finances.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do consultants track income by client and project?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink to sync your business bank account. SheetLink automatically captures client payments from wire transfers, ACH, checks, and digital payments. Add custom columns to tag each payment by client name and project. Use pivot tables or filters to see revenue per client, monthly recurring revenue from retainers, and project profitability."
        }
      },
      {
        "@type": "Question",
        "name": "What business expenses can consultants deduct?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Consultants can deduct home office expenses (rent, utilities, internet), professional development (courses, conferences, certifications), business travel, client meals (50% deductible), software and subscriptions, professional services (lawyer, accountant), marketing and advertising, equipment (laptop, phone), and liability insurance. SheetLink syncs these expenses from your bank for easy categorization and tax prep."
        }
      },
      {
        "@type": "Question",
        "name": "How do consultants calculate effective hourly rate?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track total revenue and hours worked per project in Google Sheets. Effective Hourly Rate = Total Project Revenue ÷ Total Hours Worked. This includes all hours (meetings, admin, actual work), not just billable hours. Compare to your stated rate to see if projects are profitable. SheetLink syncs revenue automatically so you can focus on tracking time."
        }
      },
      {
        "@type": "Question",
        "name": "Do consultants need to pay quarterly estimated taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Independent consultants file Schedule C and must pay quarterly estimated taxes. Track gross income minus business expenses each quarter using SheetLink. Pay 25-30% of net profit as estimated taxes (April 15, June 15, Sept 15, Jan 15). Calculate self-employment tax (15.3%) plus income tax based on your bracket. Avoid penalties by paying on time."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="consulting business bookkeeping, freelance consultant finances, track consulting income, independent consultant accounting, project revenue tracker, billable hours tracking" />

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
            Consulting Income Tracker - Track Your Consulting Finances
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Independent consulting means managing multiple clients, project-based revenue, retainers, and business expenses. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into client payments, project profitability, and quarterly tax obligations—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Consultants Need Better Bookkeeping
            </h2>
            <p>
              Consulting finances are more nuanced than typical freelance work:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Mixed revenue models</strong> - Retainers, project-based, hourly, value-based pricing</li>
              <li><strong>Multi-client management</strong> - Need to track revenue and profitability per client relationship</li>
              <li><strong>Project profitability</strong> - Some projects are more profitable than others; need to analyze</li>
              <li><strong>Expense reimbursements</strong> - Client-reimbursable expenses vs business expenses</li>
              <li><strong>Variable income</strong> - Month-to-month revenue fluctuates; cash flow planning is critical</li>
              <li><strong>Professional development</strong> - Ongoing investment in skills, certifications, training</li>
            </ul>
            <p className="mt-4">
              <strong>SheetLink solves this</strong> by automatically syncing all bank transactions—client payments, expense reimbursements, business costs, and professional development—to Google Sheets where you can analyze profitability and plan for taxes.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How SheetLink Helps Consultants
            </h2>
            <p>
              Get automated consulting bookkeeping at a fraction of the cost of accounting software:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync client payments</strong> - Track wire transfers, ACH, checks, digital payments</li>
              <li><strong>Revenue by client</strong> - Tag payments to see which clients generate most revenue</li>
              <li><strong>Project profitability</strong> - Compare revenue to hours worked for effective hourly rate</li>
              <li><strong>Track retainer vs project income</strong> - Separate recurring revenue from one-time projects</li>
              <li><strong>Business expense tracking</strong> - Organize deductible expenses for tax time</li>
              <li><strong>Affordable pricing</strong> - $2/month vs QuickBooks Self-Employed ($20/month) or FreshBooks ($19/month)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What to Track for Your Consulting Business
            </h2>
            <p>
              SheetLink syncs all transactions so you can organize your consulting finances:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Income Sources</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Monthly retainer payments</li>
                  <li>Project-based fees</li>
                  <li>Hourly consulting fees</li>
                  <li>Workshop/training revenue</li>
                  <li>Speaking engagements</li>
                  <li>Advisory board fees</li>
                  <li>Expense reimbursements</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Expense Categories</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Home office (rent, utilities, internet)</li>
                  <li>Professional development (courses, certs)</li>
                  <li>Software subscriptions (Zoom, Slack, etc.)</li>
                  <li>Business travel (flights, hotels, rental cars)</li>
                  <li>Client meals (50% deductible)</li>
                  <li>Marketing & advertising</li>
                  <li>Professional services (CPA, lawyer)</li>
                  <li>Equipment (laptop, monitor, phone)</li>
                  <li>Insurance (liability, E&O)</li>
                  <li>Office supplies</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Revenue by Client & Project
            </h2>
            <p>
              Understanding which clients and projects are most profitable helps you focus your time:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: Monthly Consulting Revenue Breakdown</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between font-semibold border-b-2 border-gray-300 pb-2">
                  <span>Client A - Monthly Retainer</span>
                  <span className="text-sheetlink-green-700">$6,000</span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs pl-4">
                  <span>20 hours @ $300/hr effective rate</span>
                  <span>Retainer</span>
                </div>

                <div className="flex justify-between font-semibold border-b-2 border-gray-300 pb-2 pt-2">
                  <span>Client B - Strategy Project</span>
                  <span className="text-sheetlink-green-700">$12,000</span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs pl-4">
                  <span>35 hours @ $343/hr effective rate</span>
                  <span>One-time project</span>
                </div>

                <div className="flex justify-between font-semibold border-b-2 border-gray-300 pb-2 pt-2">
                  <span>Client C - Hourly Consulting</span>
                  <span className="text-sheetlink-green-700">$3,200</span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs pl-4">
                  <span>10 hours @ $320/hr billed rate</span>
                  <span>Hourly</span>
                </div>

                <div className="flex justify-between font-semibold border-b-2 border-gray-300 pb-2 pt-2">
                  <span>Workshop Revenue</span>
                  <span className="text-sheetlink-green-700">$2,500</span>
                </div>
                <div className="flex justify-between text-gray-600 text-xs pl-4">
                  <span>8 hours prep + delivery @ $312/hr effective</span>
                  <span>Training</span>
                </div>

                <div className="border-t-2 border-gray-300 my-3"></div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Monthly Revenue:</span>
                  <span className="text-sheetlink-green-700">$23,700</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Total Hours Worked:</span>
                  <span>73 hours</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Average Effective Rate:</span>
                  <span>$325/hour</span>
                </div>
              </div>
            </div>
            <p>
              With SheetLink, tag each client payment and add hours worked to calculate effective hourly rate automatically. Identify which client types and project structures are most profitable.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Retainer vs Project-Based Income
            </h2>
            <p>
              Different revenue models have different advantages. Track both in your SheetLink spreadsheet:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Monthly Retainers</h3>
                <p className="text-sm mt-2">
                  <strong>Pros:</strong> Predictable recurring revenue, stable cash flow, long-term client relationships
                </p>
                <p className="text-sm mt-2">
                  <strong>Cons:</strong> Can become underpriced if scope creeps, may limit ability to take on new projects
                </p>
                <p className="text-sm mt-2">
                  <strong>Track:</strong> Monthly payment date, hours included, overage billing, renewal date
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Project-Based Fees</h3>
                <p className="text-sm mt-2">
                  <strong>Pros:</strong> Upfront pricing, potential for high value/low hours, clear scope and deliverables
                </p>
                <p className="text-sm mt-2">
                  <strong>Cons:</strong> Variable cash flow, need to constantly source new projects, risk of scope creep
                </p>
                <p className="text-sm mt-2">
                  <strong>Track:</strong> Project start/end dates, milestone payments, hours worked, effective hourly rate
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Hourly Consulting</h3>
                <p className="text-sm mt-2">
                  <strong>Pros:</strong> Direct time-to-money correlation, easy to adjust for additional work
                </p>
                <p className="text-sm mt-2">
                  <strong>Cons:</strong> Income limited by hours available, incentivizes time spent vs results delivered
                </p>
                <p className="text-sm mt-2">
                  <strong>Track:</strong> Billable hours, hourly rate, invoicing frequency, payment terms
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Your Consulting Profit & Effective Rate
            </h2>
            <p>
              Understanding true profitability means accounting for all business expenses:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: Quarterly Consulting P&L</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Revenue (Q1):</span>
                  <span className="font-semibold text-sheetlink-green-700">$68,000</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- Home Office (prorated):</span>
                  <span>-$2,400</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Software Subscriptions:</span>
                  <span>-$900</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Professional Development (course):</span>
                  <span>-$2,000</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Business Travel:</span>
                  <span>-$3,200</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Client Meals (50% deductible):</span>
                  <span>-$600</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Professional Services (CPA, lawyer):</span>
                  <span>-$1,500</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Marketing & Advertising:</span>
                  <span>-$800</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Insurance (E&O, liability):</span>
                  <span>-$1,200</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Equipment & Supplies:</span>
                  <span>-$600</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Profit (before taxes):</span>
                  <span>$54,800</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total Hours Worked:</span>
                  <span>210 hours</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Effective Hourly Rate (after expenses):</span>
                  <span>$261/hour</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>Q1 Estimated Tax Payment (30%):</span>
                  <span>-$16,440</span>
                </div>
                <div className="flex justify-between font-bold text-sheetlink-text text-lg">
                  <span>Net Profit (after estimated taxes):</span>
                  <span>$38,360</span>
                </div>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Key Metrics for Consultants
            </h2>
            <p>
              Build these metrics in your SheetLink spreadsheet to monitor business performance:
            </p>
            <div className="my-6 rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
              <h3 className="font-semibold text-sheetlink-text mb-4">Essential Consulting Metrics</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong>Monthly Recurring Revenue (MRR):</strong> Total retainer income from ongoing clients
                </li>
                <li>
                  <strong>Revenue per Client:</strong> Total revenue from each client relationship over time
                </li>
                <li>
                  <strong>Client Concentration Risk:</strong> % of revenue from top client (ideally under 30%)
                </li>
                <li>
                  <strong>Effective Hourly Rate:</strong> Total Revenue ÷ Total Hours Worked (all hours, not just billable)
                </li>
                <li>
                  <strong>Project Profit Margin:</strong> (Project Revenue - Direct Costs) ÷ Revenue × 100
                </li>
                <li>
                  <strong>Operating Expense Ratio:</strong> Total Expenses ÷ Revenue × 100 (target: under 30%)
                </li>
                <li>
                  <strong>Quarterly Tax Reserve:</strong> 25-30% of net profit set aside for estimated taxes
                </li>
                <li>
                  <strong>Cash Runway:</strong> Months of expenses covered by current cash reserves
                </li>
              </ul>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Consulting Tracker
            </h2>
            <p>
              Get your consulting bookkeeping organized in under 10 minutes:
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
                <strong>Create Your Consulting Finance Sheet</strong> - Start with a blank Google Sheet
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all income and expenses
              </li>
              <li>
                <strong>Add Custom Columns</strong> - Client Name, Project ID, Revenue Type (retainer/project/hourly)
              </li>
              <li>
                <strong>Tag Income</strong> - Categorize each payment by client and project
              </li>
              <li>
                <strong>Tag Expenses</strong> - Categorize by Schedule C line items for tax prep
              </li>
              <li>
                <strong>Build Analytics</strong> - Calculate revenue per client, effective rate, quarterly taxes
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Deductible Business Expenses for Consultants
            </h2>
            <p>
              SheetLink helps you track all tax-deductible expenses for Schedule C:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Home office deduction</strong> - Portion of rent/mortgage, utilities, internet, insurance (simplified: $5/sq ft up to 300 sq ft)</li>
              <li><strong>Professional development</strong> - Courses, certifications, conferences, books, coaching</li>
              <li><strong>Software & subscriptions</strong> - Zoom, Slack, project management, CRM, design tools</li>
              <li><strong>Business travel</strong> - Flights, hotels, rental cars, parking for client meetings</li>
              <li><strong>Client meals</strong> - 50% deductible for business meals with clients or prospects</li>
              <li><strong>Marketing & advertising</strong> - Website, SEO, LinkedIn ads, content creation</li>
              <li><strong>Professional services</strong> - Accountant, lawyer, business coach, VA services</li>
              <li><strong>Equipment</strong> - Laptop, monitor, phone, desk, chair, camera, microphone</li>
              <li><strong>Insurance</strong> - Professional liability (E&O), general liability, cyber insurance</li>
              <li><strong>Retirement contributions</strong> - Solo 401k or SEP IRA (up to 20% of net earnings)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Quarterly Estimated Taxes for Consultants
            </h2>
            <p>
              Consultants must pay estimated taxes quarterly to avoid penalties:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Calculate Quarterly Profit</h3>
                <p className="text-sm mt-2">
                  Use SheetLink to sum revenue minus expenses for the quarter. This is your net profit subject to taxes.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Self-Employment Tax (15.3%)</h3>
                <p className="text-sm mt-2">
                  Covers Social Security (12.4%) and Medicare (2.9%). Applied to 92.35% of net profit. Calculate: Net Profit × 0.9235 × 0.153.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Income Tax (10-37%)</h3>
                <p className="text-sm mt-2">
                  Depends on your tax bracket. Safe estimate: 22-24% for most consultants. Calculate based on total income including consulting and any W-2 income.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Payment Schedule</h3>
                <p className="text-sm mt-2">
                  Q1: April 15 | Q2: June 15 | Q3: Sept 15 | Q4: Jan 15 (next year). Pay via IRS Form 1040-ES or EFTPS.gov.
                </p>
              </div>
            </div>
            <p className="mt-4">
              Build a formula in your SheetLink spreadsheet: <code>Net Profit × 0.30</code> as a safe quarterly tax estimate (covers both self-employment and income tax).
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Consulting Accounting Tools
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
                    <td className="px-6 py-4">Solo consultants, simple bookkeeping</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks Self-Employed</td>
                    <td className="px-6 py-4">$20/month</td>
                    <td className="px-6 py-4">Consultants needing invoicing + tracking</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">FreshBooks</td>
                    <td className="px-6 py-4">$19-60/month</td>
                    <td className="px-6 py-4">Time tracking + invoicing + expenses</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Wave</td>
                    <td className="px-6 py-4">Free (invoicing) + fees</td>
                    <td className="px-6 py-4">Very small consulting practices</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks Online</td>
                    <td className="px-6 py-4">$30-200/month</td>
                    <td className="px-6 py-4">Consulting firms with employees</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>SheetLink advantage:</strong> Automated bank sync with full spreadsheet control at 1/10th the cost. Perfect for solo consultants who handle invoicing separately (use Wave or Invoice Ninja for free). Upgrade to FreshBooks or QuickBooks only when you need integrated time tracking and invoicing.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Consultant Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Alex - Marketing Consultant</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Alex had 6 clients but couldn't figure out which were actually profitable. Some low-rate clients demanded excessive time.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs all client payments. Alex tracks hours per client and calculates effective hourly rate for each relationship.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Discovered one $3k/month retainer client averaged $75/hr effective rate due to scope creep. Renegotiated terms to $5k/month with clear boundaries. Raised overall average rate from $180/hr to $285/hr.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Priya - Strategy Consultant</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Priya earned $180k annually but was shocked by a $42k tax bill. Hadn't tracked quarterly profits or set aside tax reserves.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs all income and expenses. Priya built a quarterly tax calculator in Google Sheets, sets aside 30% of net profit automatically.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> No surprises at tax time. Paid $48k in quarterly taxes, received $2k refund. Also identified $8k in missed deductions from prior year (courses, travel, home office).
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Consultants
            </h2>
            <p>
              SheetLink is designed to be affordable for independent consultants:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (good for very new consultants)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (covers quarterly tax calculations)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (best for established consultants, full tax records)</li>
            </ul>
            <p className="mt-4">
              <strong>Recommended tier:</strong> Basic ($2/month) for new consultants or those with simple needs. Pro ($10/month) for established consultants who need year-over-year analysis, complete tax records, and multi-year client revenue tracking.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Consulting Income Today
            </h2>
            <p>
              Stop manually tracking payments and expenses. Know exactly which clients are profitable, what your effective hourly rate is, and how much you owe in quarterly taxes.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your consulting finances automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for independent consultants.
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
