import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function RealEstateInvestmentTracker() {
  const seoTitle = 'Real Estate Investment Tracker - Track ROI for Multiple Properties';
  const seoDescription = 'Track rental property ROI, cash-on-cash returns, and cap rates across multiple investment properties. Real estate spreadsheet with automatic expense tracking for fix-and-flip and BRRRR strategies.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do real estate investors track property performance across multiple properties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Professional real estate investors track key performance metrics across all properties in a centralized dashboard. The best approach uses a Google Sheets tracker with columns for each property including: monthly rental income, operating expenses (property taxes, insurance, maintenance), mortgage payments, cash flow, ROI calculations, and property appreciation. SheetLink automates this by syncing all property-related expenses from your business accounts, so you have real-time data on cash flow, profitability, and performance trends across your entire portfolio."
        }
      },
      {
        "@type": "Question",
        "name": "How do you calculate ROI and cash-on-cash return for rental properties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Cash-on-Cash Return measures annual cash profit against cash invested: (Annual Cash Flow / Initial Cash Investment) × 100. For example, if you invested $50,000 down payment and the property generates $6,000 annual cash flow, that's 12% cash-on-cash return. Cap Rate (capitalization rate) is calculated as: (Net Operating Income / Property Value) × 100. A property with $15,000 NOI and worth $250,000 has a 6% cap rate. For fix-and-flip projects, track all acquisition costs, renovation expenses, holding costs, and sale price to calculate total ROI. Google Sheets formulas make these calculations automatic across all properties."
        }
      },
      {
        "@type": "Question",
        "name": "What's the best way to track expenses across multiple rental properties?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Use a master property spreadsheet with tabs for each investment property, plus a summary sheet. Each property tab should track: rental income, mortgage payments (principal and interest separated), property taxes, insurance, HOA fees, maintenance and repairs, vacancies, and utilities (if landlord-paid). Create a separate 'Expenses by Property' sheet that sums expenses by category across all properties. SheetLink automatically syncs property-related business expenses from your bank accounts, so expenses are categorized correctly and in real-time. This eliminates manual data entry and ensures you never miss deductible expenses."
        }
      },
      {
        "@type": "Question",
        "name": "What tax deductions can real estate investors claim?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Real estate investors can deduct: mortgage interest (not principal), property taxes, insurance premiums, repairs and maintenance, HOA fees, utilities, advertising for tenants, property management fees, travel for property management, depreciation, capital improvements, and home office expenses (if managing properties yourself). Key distinction: repairs (deductible) vs. capital improvements (depreciated over time). Track all deductible expenses in your Google Sheets tracker with a 'Tax Category' column so your accountant can easily identify deductible items at tax time. SheetLink's auto-categorization and custom rules help ensure every deductible expense is properly tagged."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="real estate investment tracker, track rental property roi, real estate spreadsheet, rental property tracker, fix and flip calculator, brrrr strategy tracker, real estate analysis spreadsheet" />

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
            Real Estate Investment Tracker: Track ROI Across All Your Properties
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Managing multiple investment properties means juggling dozens of spreadsheets—income from five
              rental properties, acquisition costs from three fix-and-flip projects, monthly expenses, mortgage
              payments, and tax deductions. Professional real estate investors need <strong>one centralized
              system</strong> to track cash flow, ROI, and performance across their entire portfolio.
            </p>
            <p className="text-xl leading-relaxed">
              <strong>SheetLink solves this</strong> by automatically syncing all your property-related expenses
              and income to Google Sheets, turning your spreadsheet into a real-time real estate investment
              dashboard that calculates ROI, cap rates, and cash-on-cash returns for every property.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Real Estate Investors Need a Dedicated Tracker
            </h2>
            <p>
              Unlike traditional businesses with a single revenue stream, real estate investors manage:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Multiple properties</strong> - Each with different purchase prices, loan terms, and cash flows</li>
              <li><strong>Complex expense categories</strong> - Mortgage interest, property taxes, repairs, depreciation, capital improvements</li>
              <li><strong>Tax optimization</strong> - Tracking deductible expenses, 1031 exchanges, depreciation schedules</li>
              <li><strong>Performance analysis</strong> - Calculating ROI, cap rates, cash-on-cash returns, comparing properties</li>
              <li><strong>Strategy tracking</strong> - BRRRR properties, fix-and-flip timelines, rental vs. flip decision-making</li>
            </ul>
            <p>
              Real estate accounting software like AppFolio or Landlord Studio charges $50-300/month and locks
              you into their interface. Google Sheets + SheetLink gives you complete control—plus automatic
              transaction syncing—for a fraction of the cost.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tracking Multiple Rental Properties in Google Sheets
            </h2>
            <p>
              The key to managing multiple properties is <strong>separation with aggregation</strong>—each
              property gets its own detailed tracking sheet, plus summary sheets that compare performance across
              all properties.
            </p>
            <div className="my-6">
              <h3 className="text-xl font-bold text-sheetlink-text">Recommended Structure</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Property Summary Tab</strong> - Quick view of all properties with purchase price, current value,
                  cash flow, ROI, and performance ranking
                </li>
                <li>
                  <strong>Individual Property Tabs</strong> - One sheet per property tracking monthly income and expenses
                </li>
                <li>
                  <strong>Income Tab</strong> - Master view of all rental income across properties (by month, by property)
                </li>
                <li>
                  <strong>Expenses Tab</strong> - All operating expenses, grouped by property and category
                </li>
                <li>
                  <strong>ROI Calculations Tab</strong> - Cash-on-cash return, cap rate, IRR, and appreciation tracking
                </li>
                <li>
                  <strong>Tax Deductions Tab</strong> - Pre-filtered for accountant (all deductible expenses by category)
                </li>
              </ul>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              ROI Calculations for Real Estate: Cash-on-Cash, Cap Rate, and IRR
            </h2>
            <p>
              Real estate investors use three main metrics to evaluate property performance:
            </p>
            <div className="my-6">
              <h3 className="text-xl font-bold text-sheetlink-text">1. Cash-on-Cash Return</h3>
              <p>
                Measures annual cash profit against your cash invested. This is your <strong>real return on the
                cash you put into the deal</strong>.
              </p>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Annual Cash Flow = Rental Income - Operating Expenses - Debt Service
Cash-on-Cash Return = (Annual Cash Flow / Initial Cash Investment) × 100
              </pre>
              <p className="mt-3 text-sm">
                <strong>Example:</strong> Property purchased for $250,000, you put down $50,000 cash.
                It generates $600/month rental income ($7,200/year) minus $3,000 expenses = $4,200 annual cash flow.
                Cash-on-Cash Return: ($4,200 / $50,000) × 100 = <strong>8.4%</strong>
              </p>

              <h3 className="mt-8 text-xl font-bold text-sheetlink-text">2. Cap Rate (Capitalization Rate)</h3>
              <p>
                Measures annual income as a percentage of property value. Higher cap rates indicate better
                returns (but may indicate higher risk or lower-priced markets).
              </p>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Net Operating Income (NOI) = Gross Rental Income - Operating Expenses
Cap Rate = (NOI / Property Value) × 100
              </pre>
              <p className="mt-3 text-sm">
                <strong>Example:</strong> Property worth $300,000 generates $7,200 rental income minus $3,000
                expenses = $4,200 NOI. Cap Rate: ($4,200 / $300,000) × 100 = <strong>1.4%</strong> (this property
                relies on appreciation and mortgage paydown, not cash flow)
              </p>

              <h3 className="mt-8 text-xl font-bold text-sheetlink-text">3. Internal Rate of Return (IRR)</h3>
              <p>
                Captures the total return including cash flow, mortgage paydown, and appreciation. This is the
                most complete measure of your real return.
              </p>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
=IRR(array of annual cash flows including final sale proceeds)
              </pre>
              <p className="mt-3 text-sm">
                <strong>Example:</strong> For a 10-year hold with $5,000 annual cash flow and property appreciation
                of $100,000, IRR might be 12-15% annually depending on initial investment and timing.
              </p>
            </div>
            <p>
              <strong>SheetLink tip:</strong> Build these calculations into your Google Sheet once, then update
              them automatically with synced expense data. You'll always know your portfolio's true performance.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Fix-and-Flip Expense Tracking
            </h2>
            <p>
              Fix-and-flip projects are all about margin—you need to track every acquisition cost, every renovation
              expense, and every holding cost to know your true profit.
            </p>
            <div className="my-6">
              <h3 className="text-xl font-bold text-sheetlink-text">Core Fix-and-Flip Expenses to Track</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Acquisition</strong> - Purchase price, inspection, appraisal, title, closing costs</li>
                <li><strong>Renovation</strong> - Labor, materials, permits, contractor costs (broken down by trade)</li>
                <li><strong>Carrying Costs</strong> - Mortgage payments, property taxes, insurance, utilities (while holding)</li>
                <li><strong>Soft Costs</strong> - Project management, design, permits, insurance premiums</li>
                <li><strong>Exit Costs</strong> - Real estate commission (6%), closing costs, title insurance</li>
              </ul>
            </div>
            <p>
              Create a dedicated "Flip Projects" spreadsheet with tabs for each active project. Use a master tab
              to track:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Project | Purchase Price | Renovation Budget | Actual Renovation | Carrying Costs |
Exit Price | Total Profit | ROI | Timeline (Days)
            </pre>
            <p className="mt-3">
              <strong>SheetLink integration:</strong> Sync all flip-related expenses from your business account
              (contractor payments, materials, holding costs). Tag each transaction with the project name, so you
              can SUMIF all expenses by project. This gives you real-time profit tracking as the project progresses.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              BRRRR Strategy Tracking (Buy, Rehab, Rent, Refinance, Repeat)
            </h2>
            <p>
              BRRRR investors need to track each phase of the strategy to ensure projects are profitable:
            </p>
            <div className="my-6">
              <h3 className="text-xl font-bold text-sheetlink-text">BRRRR Phases & Key Metrics</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Buy:</strong> Purchase price, down payment (cash invested), inspection costs, funding source
                </li>
                <li>
                  <strong>Rehab:</strong> Renovation budget vs. actual spend, timeline, contractor management
                </li>
                <li>
                  <strong>Rent:</strong> Market rent (found comps), operating expenses, cash flow projection
                </li>
                <li>
                  <strong>Refinance:</strong> New appraised value, new loan amount, cash pulled out, cash-on-cash return
                  after refi
                </li>
                <li>
                  <strong>Repeat:</strong> Initial capital recovered for next deal, cash flow for ongoing management
                </li>
              </ul>
            </div>
            <p>
              Track BRRRR deals in a dedicated sheet with columns for each property showing:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Property | Status | Buy Price | Rehab Budget | Rehab Actual | Refi Value |
New Loan | Cash Out | Monthly Rent | Monthly Expenses | Cash Flow |
Cash-on-Cash (post-refi)
            </pre>
            <p className="mt-3">
              The goal of BRRRR is to recover your initial cash investment through refinancing, then repeat with
              new properties while those refi'd properties generate positive cash flow. Your spreadsheet should show
              cash recovered vs. cash deployed for the repeat cycle.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Monthly & Annual Expense Tracking
            </h2>
            <p>
              Rental property expenses come in three varieties—monthly recurring, annual, and variable. Organize
              them accordingly:
            </p>
            <div className="my-6">
              <h3 className="text-xl font-bold text-sheetlink-text">Monthly Recurring Expenses</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Mortgage payments</strong> (separate principal and interest for tax purposes)</li>
                <li><strong>Property taxes</strong> (monthly escrow or paid annually)</li>
                <li><strong>Insurance</strong> (homeowner's or landlord's policy)</li>
                <li><strong>HOA fees</strong> (if applicable)</li>
                <li><strong>Utilities</strong> (if landlord-paid)</li>
                <li><strong>Property management fees</strong> (if using a manager)</li>
              </ul>
              <h3 className="mt-6 text-xl font-bold text-sheetlink-text">Annual Expenses</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Inspections and maintenance</li>
                <li>Roof, HVAC, or major system replacements</li>
                <li>Legal and accounting fees</li>
              </ul>
              <h3 className="mt-6 text-xl font-bold text-sheetlink-text">Variable Expenses</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Repairs and maintenance (emergency fixes)</li>
                <li>Tenant turnover costs (cleaning, minor repairs)</li>
                <li>Vacancy losses</li>
                <li>Eviction and legal costs</li>
              </ul>
            </div>
            <p>
              Use a matrix to track all expenses by month and property:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Expense | Property A Jan | Property A Feb | Property B Jan | Property B Feb | ...
Mortgage Interest | $1,500 | $1,495 | $2,000 | $1,998
Property Tax | $300 | $300 | $400 | $400
Insurance | $120 | $120 | $140 | $140
            </pre>
            <p className="mt-3">
              <strong>SheetLink advantage:</strong> Expenses from your business accounts sync automatically,
              categorized and tagged by property. You see real-time cash flow trends without manual data entry.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Rental Income vs. Expenses Analysis
            </h2>
            <p>
              The core metric for rental properties is <strong>monthly cash flow</strong> = Rental Income - Operating
              Expenses. This should be your spreadsheet's centerpiece.
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Monthly Cash Flow Summary:
Rental Income         $3,500
- Mortgage Interest     ($1,200)
- Mortgage Principal    ($200)
- Property Tax          ($300)
- Insurance             ($140)
- Maintenance Reserve   ($300) [set aside for repairs]
= Net Cash Flow         $1,360
            </pre>
            <p className="mt-3">
              Create separate rows for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Gross Rental Income</strong> - Actual rent collected</li>
              <li><strong>Vacancy Loss</strong> - Expected vacancy rate (e.g., 5%) deducted</li>
              <li><strong>Operating Expenses</strong> - Everything except mortgage</li>
              <li><strong>Net Operating Income (NOI)</strong> - Gross minus operating expenses, used for cap rate</li>
              <li><strong>Debt Service</strong> - Principal + interest</li>
              <li><strong>Cash Flow</strong> - NOI minus debt service, what you pocket each month</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Depreciation and Capital Improvements
            </h2>
            <p>
              Two critical tax concepts for real estate investors:
            </p>
            <div className="my-6">
              <h3 className="text-xl font-bold text-sheetlink-text">Depreciation</h3>
              <p>
                The IRS allows you to deduct the cost of the building (not land) over 27.5 years. This is a
                non-cash deduction that reduces your taxable income.
              </p>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Annual Depreciation = (Property Cost - Land Value) / 27.5 years
              </pre>
              <p className="mt-3">
                <strong>Example:</strong> Property purchased for $300,000, land value = $75,000. Building value =
                $225,000. Annual depreciation = $225,000 / 27.5 = $8,181/year.
              </p>
              <p className="mt-3">
                Track depreciation in your spreadsheet—it reduces taxable income while you get cash flow from the
                property.
              </p>

              <h3 className="mt-8 text-xl font-bold text-sheetlink-text">Capital Improvements vs. Repairs</h3>
              <p>
                <strong>Repairs</strong> (deductible immediately) fix existing systems to their original condition.
                <strong>Capital Improvements</strong> (depreciated over time) upgrade or add value to the property.
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-3">
                <li><strong>Repair:</strong> Fixing a leaky roof | <strong>Improvement:</strong> Replacing entire roof</li>
                <li><strong>Repair:</strong> Fixing broken window | <strong>Improvement:</strong> Upgrading to energy-efficient windows</li>
                <li><strong>Repair:</strong> Painting worn walls | <strong>Improvement:</strong> Adding square footage</li>
              </ul>
              <p className="mt-3">
                Tag all expenses in your spreadsheet as "Repair" or "Capital Improvement" so your accountant can
                properly categorize for taxes.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              1031 Exchange Preparation
            </h2>
            <p>
              A 1031 exchange allows you to defer capital gains taxes by reinvesting sale proceeds into a similar
              property. Your spreadsheet should track:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Property Cost Basis</strong> - Original purchase price plus improvements</li>
              <li><strong>Accumulated Depreciation</strong> - Total depreciation deductions taken</li>
              <li><strong>Sale Proceeds</strong> - Sale price minus closing costs and commissions</li>
              <li><strong>Capital Gain</strong> - Sale proceeds minus cost basis (this gets deferred with 1031)</li>
              <li><strong>Replacement Property</strong> - Must be equal or greater in value within 180 days</li>
            </ul>
            <p>
              Create a dedicated "1031 Exchange" tab that tracks:
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-x-auto">
Relinquished Property | Sale Date | Closing Proceeds | Identification Deadline |
Exchange Deadline | Replacement Property | Purchase Price | Deferred Tax Gain
              </pre>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Example #1: Investor with 5 Rental Properties
            </h2>
            <p>
              Meet Jennifer, an investor with 5 single-family rentals across different states:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Property A (Ohio) - $150k value, $800/month cash flow</li>
              <li>Property B (Kentucky) - $180k value, $1,100/month cash flow</li>
              <li>Property C (Tennessee) - $200k value, $600/month cash flow (newer acquisition, not optimized)</li>
              <li>Property D (Georgia) - $165k value, $950/month cash flow</li>
              <li>Property E (North Carolina) - $190k value, $400/month cash flow (high-appreciation area)</li>
            </ul>
            <p className="mt-3">
              <strong>Her Spreadsheet:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Summary sheet ranking properties by cash flow, cap rate, and 1-year appreciation</li>
              <li>Individual sheets for each property with monthly income and expense tracking</li>
              <li>Master expense sheet showing where she's spending money (property taxes highest in Ohio,
              insurance highest in Georgia)</li>
              <li>Tax deductions sheet pre-filtered for her accountant (separated deductible vs. non-deductible)</li>
              <li>1031 Exchange tracker showing Property C is underperforming and might be replaced</li>
            </ul>
            <p className="mt-3">
              <strong>SheetLink integration:</strong> Jennifer's business checking account syncs all 5 properties'
              expenses automatically. She can see month-to-month trends and spot underperforming properties
              instantly. She discovered Property C has a management problem (renter issues) causing lower cash flow
              than expected—she's now evaluating replacement properties through 1031 exchange.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Example #2: House Flipper with 3 Active Projects
            </h2>
            <p>
              Meet Marcus, a professional flipper managing 3 simultaneous projects:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Project A - Acquisition phase (just closed, starting renovations)</li>
              <li>Project B - Mid-renovation (2 months in, 4 months remaining)</li>
              <li>Project C - Ready to list (renovations complete, getting appraised)</li>
            </ul>
            <p className="mt-3">
              <strong>His Spreadsheet:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Master flip tracker with all 3 projects showing purchase price, rehab budget vs. actual,
              projected exit price, and estimated profit</li>
              <li>Individual project sheets tracking daily/weekly expenses by trade (plumbing, electrical,
              general labor, materials)</li>
              <li>Budget variance analysis (is Project B over budget? By how much?)</li>
              <li>Hold-time projection (when will cash be available for next deal?)</li>
              <li>Profit-to-date dashboard showing total capital invested vs. forecast return</li>
            </ul>
            <p className="mt-3">
              <strong>SheetLink integration:</strong> Marcus's business account syncs all contractor payments,
              material purchases, and holding costs. He's notified instantly if expenses exceed budget (Project B
              was tracking 5% over budget on labor costs—he caught it early and adjusted). His accountant gets
              auto-updated tax deduction sheets monthly.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Comparing SheetLink vs. Real Estate-Specific Software
            </h2>
            <table className="min-w-full border-collapse border border-gray-300 mt-6">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">SheetLink + Google Sheets</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">AppFolio / Landlord Studio</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Custom Spreadsheet</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Cost</strong></td>
                  <td className="border border-gray-300 px-4 py-2">$2-10/month</td>
                  <td className="border border-gray-300 px-4 py-2">$50-300/month</td>
                  <td className="border border-gray-300 px-4 py-2">Free (your time)</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Auto-Sync Expenses</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Yes (via SheetLink)</td>
                  <td className="border border-gray-300 px-4 py-2">Limited/manual</td>
                  <td className="border border-gray-300 px-4 py-2">No</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Complete Control</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Yes</td>
                  <td className="border border-gray-300 px-4 py-2">No (locked interface)</td>
                  <td className="border border-gray-300 px-4 py-2">Yes</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Custom Reports</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                  <td className="border border-gray-300 px-4 py-2">Pre-built only</td>
                  <td className="border border-gray-300 px-4 py-2">Unlimited</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>Tenant Management</strong></td>
                  <td className="border border-gray-300 px-4 py-2">No</td>
                  <td className="border border-gray-300 px-4 py-2">Yes</td>
                  <td className="border border-gray-300 px-4 py-2">No</td>
                </tr>
                <tr>
                  <td className="border border-gray-300 px-4 py-2"><strong>For Accountants</strong></td>
                  <td className="border border-gray-300 px-4 py-2">Easy sharing, pre-filtered</td>
                  <td className="border border-gray-300 px-4 py-2">Limited export</td>
                  <td className="border border-gray-300 px-4 py-2">Easy sharing, flexible</td>
                </tr>
              </tbody>
            </table>
            <p className="mt-6">
              <strong>Verdict:</strong> If you're investing in 1-10 properties and want to own your data with
              low cost and high customization, SheetLink + Google Sheets wins. If you need tenant management and
              rent collection, AppFolio adds value. For most investors, Google Sheets is the perfect balance.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Getting Started with Your Real Estate Investment Tracker
            </h2>
            <p>
              Here's how to build your system in 3 steps:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Create Your Google Sheet</strong> - Use our real estate template or build from scratch
                with tabs for each property, summary, income, expenses, and ROI calculations
              </li>
              <li>
                <strong>Connect SheetLink</strong> - Install the Chrome extension and sync your business
                checking account(s). Expenses now flow in automatically.
              </li>
              <li>
                <strong>Tag and Categorize</strong> - Use custom rules in SheetLink to auto-tag expenses by
                property name and category (mortgage, repairs, taxes, etc.)
              </li>
            </ol>
            <p className="mt-6">
              Within days, you'll have real-time visibility into cash flow, expenses, and ROI across all
              properties. Within weeks, you'll identify optimization opportunities (underperforming properties,
              over-budget projects, tax deduction gaps).
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing: Unlimited Property Tracking
            </h2>
            <p>
              <strong>SheetLink is free forever for 7 days of transaction history.</strong> For real estate
              investors tracking multiple properties, we recommend:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Basic ($1.99/month)</strong> - 90 days of history, perfect for small portfolios (1-3 properties)</li>
              <li><strong>Pro ($9.99/month)</strong> - 24 months of history, auto-categorization rules, perfect for active
              flippers or growing portfolios</li>
            </ul>
            <p className="mt-3">
              The Pro plan includes AI categorization (property A vs. property B expense tags) and rules engine,
              so you spend less time organizing data and more time analyzing performance.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Take Control of Your Real Estate Investments
            </h2>
            <p>
              Stop manually tracking expenses across multiple spreadsheets. Stop losing track of which property
              is outperforming. Stop being surprised by how much you're spending on each investment.
            </p>
            <p>
              With SheetLink, your real estate dashboard updates in real-time. You'll know your cash flow, ROI,
              and performance trends instantly. Your accountant gets clean, categorized expense data. And you get
              complete control over your tracking system.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your real estate investments like a pro?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for 7 days of transaction history. No credit card required.
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
