import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function RentalPropertyCashFlow() {
  const seoTitle = 'Rental Property Cash Flow Tracker - Sync Bank to Google Sheets | SheetLink';
  const seoDescription = 'Automatically sync rental property finances to Google Sheets. Track rent deposits, maintenance costs, mortgage payments, and cash flow across multiple properties. Perfect for landlords. Free for 7 days.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do landlords track rental property cash flow?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink Chrome extension and connect the bank account(s) used for rental properties via Plaid. SheetLink automatically syncs rent deposits, maintenance expenses, mortgage payments, property taxes, insurance, and utilities to Google Sheets. Tag transactions by property to track cash flow per unit or across your entire portfolio."
        }
      },
      {
        "@type": "Question",
        "name": "Can I track multiple rental properties in one spreadsheet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink syncs all bank accounts and credit cards into a single Google Sheet. Add a 'Property' column to tag each transaction (e.g., '123 Main St', 'Oak Ave Duplex'). Use filters or pivot tables to calculate cash flow, expenses, and ROI per property or view portfolio-wide performance."
        }
      },
      {
        "@type": "Question",
        "name": "What expenses should rental property owners track?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track all property-related costs: mortgage payments (principal & interest), property taxes, insurance, HOA fees, maintenance and repairs, utilities (if paid by landlord), property management fees, advertising/vacancy costs, and capital improvements. SheetLink syncs these automatically from your bank and credit card accounts."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink better than property management software for landlords?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink excels at financial tracking ($2/month) but doesn't handle tenant communication, lease management, or maintenance requests like full property management software ($50-150/month). For landlords who just need cash flow tracking and tax records, SheetLink is more affordable. Combine with free tenant portals if needed."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="rental property cash flow, landlord bookkeeping, rental income tracker, property management spreadsheet, track rental expenses" />

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
            Rental Property Cash Flow Tracker for Landlords
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Managing rental properties means tracking rent deposits, maintenance costs, mortgages, and taxes across multiple units. <strong>SheetLink automatically syncs your bank accounts to Google Sheets</strong>, giving you real-time visibility into cash flow, expenses, and ROI—all in one master spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Landlords Choose SheetLink
            </h2>
            <p>
              Most landlords juggle bank statements, receipts, and manual spreadsheets. SheetLink automates the busywork:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync rent deposits</strong> - Track tenant payments automatically</li>
              <li><strong>Expense tracking</strong> - Maintenance, repairs, utilities, property taxes, insurance</li>
              <li><strong>Multi-property support</strong> - Manage multiple units in one spreadsheet</li>
              <li><strong>Cash flow analysis</strong> - See which properties are profitable and which need attention</li>
              <li><strong>Tax-ready records</strong> - Organized for Schedule E tax filing</li>
              <li><strong>Affordable</strong> - $2/month vs property management software at $50-150/month</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Rental Property Tracker
            </h2>
            <p>
              Get your rental finances organized in under 10 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Property Bank Accounts</strong> - Link accounts where rent is deposited via Plaid
              </li>
              <li>
                <strong>Connect Business Credit Cards</strong> - Track maintenance and repair expenses
              </li>
              <li>
                <strong>Create Your Property Finance Sheet</strong> - Start with a blank sheet or rental property template
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all rent deposits and expenses
              </li>
              <li>
                <strong>Tag by Property</strong> - Add a "Property" column and tag each transaction by address
              </li>
              <li>
                <strong>Calculate Cash Flow</strong> - Use formulas to track income minus expenses per property
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What Rental Property Expenses to Track
            </h2>
            <p>
              SheetLink syncs all property-related transactions so you can track every cost:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Operating Expenses</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Property taxes</li>
                  <li>Insurance premiums</li>
                  <li>HOA fees</li>
                  <li>Utilities (if landlord-paid)</li>
                  <li>Property management fees</li>
                  <li>Advertising/vacancy costs</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Maintenance & Debt Service</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Repairs & maintenance</li>
                  <li>Landscaping/snow removal</li>
                  <li>Pest control</li>
                  <li>Appliance replacement</li>
                  <li>Mortgage payments</li>
                  <li>Capital improvements</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Cash Flow Per Property
            </h2>
            <p>
              The key metric for rental properties is net cash flow: income minus all expenses. Here's an example:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: 123 Main St (Single-Family Rental)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Monthly Rent Income:</span>
                  <span className="font-semibold text-sheetlink-green-700">$2,500</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- Mortgage Payment (P&I):</span>
                  <span>-$1,200</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Property Taxes:</span>
                  <span>-$300</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Insurance:</span>
                  <span>-$150</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Maintenance (avg):</span>
                  <span>-$200</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Property Management (10%):</span>
                  <span>-$250</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Cash Flow:</span>
                  <span>$400/month ($4,800/year)</span>
                </div>
                <div className="flex justify-between font-bold text-sheetlink-text">
                  <span>Cash-on-Cash ROI (20% down):</span>
                  <span>8.0%</span>
                </div>
              </div>
            </div>
            <p>
              With SheetLink, these calculations happen automatically using Google Sheets formulas.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Multiple Properties in One Spreadsheet
            </h2>
            <p>
              If you own multiple rental units, SheetLink consolidates finances across all properties:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 1: Tag Transactions by Property</h3>
                <p className="text-sm mt-2">
                  Add a "Property" column. When rent comes in or expenses go out, tag the transaction with the property address (e.g., "123 Main St", "Oak Ave Duplex Unit A").
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 2: Use Filters to View Individual Properties</h3>
                <p className="text-sm mt-2">
                  Filter your Google Sheet by property to see income and expenses for a single unit. Calculate net cash flow with a simple SUM formula.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 3: Build a Portfolio Dashboard</h3>
                <p className="text-sm mt-2">
                  Create a summary tab with total portfolio income, total expenses, and overall cash flow. Use SUMIF formulas to aggregate by property.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Step 4: Identify Problem Properties</h3>
                <p className="text-sm mt-2">
                  Quickly spot properties with negative cash flow, high maintenance costs, or frequent vacancies. Make data-driven decisions on rent adjustments or sales.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Handle Common Landlord Scenarios
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Vacancy Tracking</h3>
                <p className="text-sm">
                  When a unit is vacant, you still have expenses (mortgage, taxes, insurance) but no rent income. Tag the period as "Vacant - 123 Main St" to track vacancy costs and lost income.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Security Deposits</h3>
                <p className="text-sm">
                  Security deposits are not income—they're a liability. Tag deposit receipts separately so they don't inflate your income calculations. Track refunds and deductions for damages.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Late Rent & Evictions</h3>
                <p className="text-sm">
                  Track expected rent vs actual rent received. If a tenant pays late or you need to evict, note the lost cash flow. This helps forecast future income more accurately.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Capital Improvements vs Repairs</h3>
                <p className="text-sm">
                  Repairs (fixing a broken pipe) are expensed immediately. Capital improvements (new roof, HVAC) must be depreciated over time for taxes. Tag transactions accordingly.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Rental Property Tax Prep with SheetLink
            </h2>
            <p>
              Landlords file Schedule E (Supplemental Income and Loss) for rental properties. SheetLink organizes data for tax filing:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gross rental income</strong> - All rent deposits synced automatically</li>
              <li><strong>Deductible expenses</strong> - Mortgage interest, property taxes, insurance, repairs, management fees</li>
              <li><strong>Depreciation tracking</strong> - Note capital improvements for depreciation schedules</li>
              <li><strong>Passive loss rules</strong> - Calculate if you qualify for rental loss deductions</li>
              <li><strong>1099 reporting</strong> - Track contractor payments over $600 (plumbers, handymen)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Property Management Software
            </h2>
            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">SheetLink</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Property Software</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Bank sync & cash flow</td>
                    <td className="px-6 py-4">✅ Yes</td>
                    <td className="px-6 py-4">✅ Yes</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Tenant communication</td>
                    <td className="px-6 py-4">❌ No</td>
                    <td className="px-6 py-4">✅ Yes</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Lease management</td>
                    <td className="px-6 py-4">❌ No</td>
                    <td className="px-6 py-4">✅ Yes</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Pricing</td>
                    <td className="px-6 py-4">$2/month</td>
                    <td className="px-6 py-4">$50-150/month</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>Best use case for SheetLink:</strong> Landlords with 1-10 properties who handle tenant relationships directly and just need financial tracking. Combine with free tenant portals (Zillow Rental Manager, Cozy) if needed.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Landlord Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">James - 3 Single-Family Rentals</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> James manually reconciled bank statements to track which property had which expenses. Took hours every month.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink auto-syncs all transactions. James added a "Property" column and tags each transaction. Built a dashboard showing cash flow per property.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> James discovered one property had negative cash flow due to high maintenance. He raised rent and turned it profitable.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Lisa - 12-Unit Apartment Building</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Lisa needed to track cash flow across 12 units but couldn't afford $150/month property management software.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs her business checking account and credit card. She tags transactions by unit number (1A, 1B, 2A, etc.).
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Lisa built a pivot table showing revenue and expenses per unit. Identified 3 units with frequent maintenance issues and adjusted rent accordingly.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Landlords
            </h2>
            <p>
              SheetLink is designed to be affordable for small landlords:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (weekly cash flow checks)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (quarterly analysis)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (full tax records)</li>
            </ul>
            <p className="mt-4">
              Compare to property management software: Buildium ($50-150/month), AppFolio ($280/month), TenantCloud ($18-60/month). SheetLink focuses on what landlords need most—financial tracking—at a fraction of the cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Rental Property Cash Flow Today
            </h2>
            <p>
              Stop manually reconciling bank statements and start automating your rental property bookkeeping. See exactly which properties are profitable and which need attention.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your rental property cash flow automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for landlords.
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
