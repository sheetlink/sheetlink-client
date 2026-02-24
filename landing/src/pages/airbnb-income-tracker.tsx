import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function AirbnbIncomeTracker() {
  const seoTitle = 'Airbnb Income Tracker - Track Income & Expenses in Google Sheets | SheetLink';
  const seoDescription = 'Automatically sync Airbnb rental income and expenses to Google Sheets. Track booking revenue, cleaning fees, platform fees, maintenance costs, and occupancy rates. Perfect for short-term rental hosts managing finances.';

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How do I track Airbnb income for tax purposes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Install SheetLink to sync your bank account where Airbnb deposits payments. SheetLink automatically captures booking revenue, cleaning fees, and all rental-related expenses. Tag transactions by property, categorize expenses (cleaning, maintenance, utilities), and calculate net rental income for Schedule E tax filing. Track year-to-date totals for accurate tax reporting."
        }
      },
      {
        "@type": "Question",
        "name": "What expenses can Airbnb hosts deduct on taxes?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Airbnb hosts can deduct cleaning services, maintenance and repairs, utilities (if host-paid), property insurance, HOA fees, mortgage interest, property taxes (prorated for rental days), Airbnb service fees, supplies (toiletries, linens), furniture and decor, and depreciation. SheetLink syncs these expenses from your bank to Google Sheets for easy categorization and tax prep."
        }
      },
      {
        "@type": "Question",
        "name": "How do I calculate Airbnb occupancy rate and revenue per night?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Track total nights booked divided by nights available. SheetLink syncs Airbnb deposits so you can count booking frequency. Calculate revenue per available night (RevPAN): Total Revenue ÷ Total Available Nights. This helps you optimize pricing and understand seasonal performance. Build formulas in Google Sheets to automatically calculate occupancy and RevPAN."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need QuickBooks for my Airbnb rental?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Not necessarily. For most Airbnb hosts with 1-3 properties, Google Sheets with SheetLink is simpler and cheaper. SheetLink costs $2/month vs QuickBooks $30+/month. You get automatic bank sync, expense tracking, and ROI calculations. Upgrade to QuickBooks only if you manage many properties or need full property management features."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="airbnb income tracker, short term rental accounting, vacation rental bookkeeping, airbnb profit calculator, vrbo income tracker, rental property finances" />

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
            Airbnb Income Tracker - Track Your Short-Term Rental Finances
          </h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              Airbnb hosting means tracking seasonal income, cleaning fees, platform fees, maintenance costs, and occupancy rates. <strong>SheetLink automatically syncs your bank account to Google Sheets</strong>, giving you real-time visibility into booking revenue, expenses, and true ROI—all in one spreadsheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why Airbnb Hosts Need Better Bookkeeping
            </h2>
            <p>
              Short-term rental finances are more complex than long-term rentals:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Variable income</strong> - Revenue fluctuates by season, events, and local demand</li>
              <li><strong>Multiple fee structures</strong> - Airbnb service fees (3%), guest fees, cleaning fees, taxes</li>
              <li><strong>Frequent expenses</strong> - Cleaning after every guest, maintenance, supplies replenishment</li>
              <li><strong>Occupancy tracking</strong> - Need to monitor booking rate and revenue per available night</li>
              <li><strong>Multi-platform hosting</strong> - Income from Airbnb, VRBO, Booking.com, direct bookings</li>
              <li><strong>Tax complexity</strong> - Prorated deductions, rental vs personal use, local lodging taxes</li>
            </ul>
            <p className="mt-4">
              <strong>SheetLink solves this</strong> by automatically syncing all bank transactions—Airbnb deposits, VRBO payouts, cleaning costs, and property expenses—to Google Sheets where you can track occupancy, revenue, and profit.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How SheetLink Helps Airbnb Hosts
            </h2>
            <p>
              Get automated rental property bookkeeping at a fraction of the cost of property management software:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Auto-sync booking revenue</strong> - Track deposits from Airbnb, VRBO, Booking.com</li>
              <li><strong>Track all expenses</strong> - Cleaning, maintenance, utilities, supplies, property costs</li>
              <li><strong>Calculate occupancy rate</strong> - Monitor nights booked vs available for pricing optimization</li>
              <li><strong>Revenue per available night</strong> - See true performance including vacant nights</li>
              <li><strong>Net income after expenses</strong> - Calculate actual profit after all costs</li>
              <li><strong>Affordable pricing</strong> - $2/month vs Properly ($19/month) or Hospitable ($25/month)</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What to Track for Your Short-Term Rental
            </h2>
            <p>
              SheetLink syncs all transactions so you can organize your Airbnb finances:
            </p>
            <div className="my-6 grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-sheetlink-text">Income Sources</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Airbnb booking revenue</li>
                  <li>VRBO/HomeAway payouts</li>
                  <li>Booking.com income</li>
                  <li>Direct booking payments</li>
                  <li>Cleaning fees (if kept by host)</li>
                  <li>Extra guest fees</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-sheetlink-text">Expense Categories</h3>
                <ul className="list-disc pl-6 space-y-1 text-sm">
                  <li>Cleaning services</li>
                  <li>Maintenance & repairs</li>
                  <li>Utilities (electric, gas, water, internet)</li>
                  <li>Property insurance</li>
                  <li>HOA/condo fees</li>
                  <li>Mortgage interest & property tax</li>
                  <li>Airbnb/VRBO service fees</li>
                  <li>Supplies (toiletries, linens, coffee)</li>
                  <li>Furniture & decor</li>
                  <li>Property management software</li>
                </ul>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Calculate Your True Airbnb Profit
            </h2>
            <p>
              Many hosts overestimate profit by ignoring all the costs. Here's how to calculate accurately:
            </p>
            <div className="my-6 rounded-lg border-2 border-gray-200 p-6 bg-gray-50">
              <h3 className="font-semibold text-sheetlink-text mb-4">Example: Monthly Airbnb Income (2-bedroom condo)</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Gross Booking Revenue (18 nights @ avg $150/night):</span>
                  <span className="font-semibold text-sheetlink-green-700">$2,700</span>
                </div>
                <div className="flex justify-between">
                  <span>Cleaning Fees Collected:</span>
                  <span className="font-semibold text-sheetlink-green-700">$540</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-semibold">
                  <span>Total Revenue:</span>
                  <span className="text-sheetlink-green-700">$3,240</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-red-600">
                  <span>- Airbnb Service Fee (3%):</span>
                  <span>-$81</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Cleaning Service (6 turnovers @ $90):</span>
                  <span>-$540</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Utilities (prorated for rental days):</span>
                  <span>-$85</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Internet & Cable:</span>
                  <span>-$100</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Supplies (toiletries, coffee, paper):</span>
                  <span>-$60</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Maintenance & Repairs:</span>
                  <span>-$150</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- Property Insurance (prorated):</span>
                  <span>-$120</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>- HOA Fees (prorated):</span>
                  <span>-$180</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold text-sheetlink-green-700 text-lg">
                  <span>Net Profit (before mortgage):</span>
                  <span>$1,924</span>
                </div>
                <div className="border-t-2 border-gray-300 my-2"></div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Occupancy Rate:</span>
                  <span>60% (18 nights / 30 days)</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Revenue per Available Night (RevPAN):</span>
                  <span>$108 ($3,240 / 30 nights)</span>
                </div>
              </div>
            </div>
            <p>
              With SheetLink, build formulas in Google Sheets to calculate this automatically each month. Track trends over time to optimize pricing and occupancy.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Key Metrics for Short-Term Rental Hosts
            </h2>
            <p>
              Build these metrics in your SheetLink spreadsheet to monitor rental performance:
            </p>
            <div className="my-6 rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
              <h3 className="font-semibold text-sheetlink-text mb-4">Essential Airbnb Metrics</h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <strong>Occupancy Rate:</strong> (Nights Booked ÷ Nights Available) × 100 (target: 60-80%)
                </li>
                <li>
                  <strong>Revenue per Available Night (RevPAN):</strong> Total Revenue ÷ Total Nights in Period
                </li>
                <li>
                  <strong>Average Daily Rate (ADR):</strong> Total Booking Revenue ÷ Nights Booked
                </li>
                <li>
                  <strong>Net Operating Income (NOI):</strong> Total Revenue - Operating Expenses (excludes mortgage)
                </li>
                <li>
                  <strong>ROI %:</strong> (Annual Net Profit ÷ Property Investment) × 100
                </li>
                <li>
                  <strong>Cleaning Cost per Booking:</strong> Total Cleaning Fees ÷ Number of Bookings
                </li>
                <li>
                  <strong>Revenue by Season:</strong> Track Q1-Q4 to identify peak seasons for pricing strategy
                </li>
              </ul>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Track Multiple Properties or Platforms
            </h2>
            <p>
              Many hosts manage multiple listings or list on multiple platforms. SheetLink handles it all:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Multi-property tracking</strong> - Tag transactions by property address or nickname</li>
              <li><strong>Airbnb income</strong> - Main platform for most short-term rentals</li>
              <li><strong>VRBO/HomeAway revenue</strong> - Additional exposure for vacation destinations</li>
              <li><strong>Booking.com income</strong> - International guests and business travelers</li>
              <li><strong>Direct bookings</strong> - Guest payments via Venmo, Zelle, or checks (save on platform fees)</li>
            </ul>
            <p className="mt-4">
              Add a "Property" and "Platform" column to separate income sources. See which platform generates the best revenue and which property is most profitable.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Seasonal Income & Cash Flow Management
            </h2>
            <p>
              Short-term rental income varies dramatically by season. SheetLink helps you plan ahead:
            </p>
            <div className="my-6 space-y-4">
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Peak Season (Summer, Holidays)</h3>
                <p className="text-sm mt-2">
                  High occupancy (80-90%), premium pricing, maximum revenue. Use peak earnings to cover slow season expenses and build cash reserves for maintenance.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Shoulder Season (Spring, Fall)</h3>
                <p className="text-sm mt-2">
                  Moderate occupancy (50-70%), standard pricing. Good time for property improvements and guest experience upgrades.
                </p>
              </div>
              <div className="rounded-lg border-2 border-gray-200 p-6">
                <h3 className="font-semibold text-sheetlink-text">Off Season (Winter, etc.)</h3>
                <p className="text-sm mt-2">
                  Low occupancy (20-40%), discounted pricing. Plan for negative cash flow months. Consider monthly rentals or long-term guests to maintain some income.
                </p>
              </div>
            </div>
            <p>
              Track year-over-year seasonality in your SheetLink spreadsheet. Build forecasts for next year based on historical patterns.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How to Set Up Your Airbnb Income Tracker
            </h2>
            <p>
              Get your short-term rental bookkeeping organized in under 10 minutes:
            </p>
            <ol className="list-decimal pl-6 space-y-3">
              <li>
                <strong>Install SheetLink Chrome Extension</strong> - Add from Chrome Web Store
              </li>
              <li>
                <strong>Connect Your Business Bank Account</strong> - Link the account where Airbnb/VRBO deposit payouts via Plaid
              </li>
              <li>
                <strong>Connect Your Business Credit Card</strong> (optional) - Track cleaning, maintenance, and supply purchases
              </li>
              <li>
                <strong>Create Your Rental Finance Sheet</strong> - Start with a blank Google Sheet or rental template
              </li>
              <li>
                <strong>Sync Transactions</strong> - SheetLink pulls in all income and expenses
              </li>
              <li>
                <strong>Add Custom Columns</strong> - Property, Platform, Booking ID, Nights, Guest Name (optional)
              </li>
              <li>
                <strong>Tag Expenses</strong> - Categorize costs by type (cleaning, maintenance, utilities, etc.)
              </li>
              <li>
                <strong>Build Performance Formulas</strong> - Calculate occupancy rate, RevPAN, net income
              </li>
            </ol>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tax Deductions for Airbnb Hosts
            </h2>
            <p>
              SheetLink helps you track all deductible expenses for Schedule E (rental property income):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Cleaning & maintenance</strong> - Professional cleaning, repairs, landscaping</li>
              <li><strong>Utilities</strong> - Electric, gas, water, sewer, trash, internet (prorated for rental days)</li>
              <li><strong>Insurance</strong> - Property, liability, umbrella policies (prorated)</li>
              <li><strong>Mortgage interest</strong> - Deduct portion attributable to rental use</li>
              <li><strong>Property taxes</strong> - Deduct portion based on rental vs personal use</li>
              <li><strong>Supplies</strong> - Toiletries, linens, towels, kitchen items, coffee, snacks</li>
              <li><strong>Platform fees</strong> - Airbnb, VRBO service fees</li>
              <li><strong>Software & tools</strong> - Property management software, smart locks, cameras</li>
              <li><strong>Depreciation</strong> - Deduct portion of property value and furniture over time</li>
            </ul>
            <p className="mt-4">
              <strong>Important:</strong> If you use the property personally for more than 14 days or 10% of rental days (whichever is greater), you must prorate expenses based on rental vs personal use. SheetLink helps you track rental days for accurate allocation.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              SheetLink vs. Airbnb Accounting Software
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
                    <td className="px-6 py-4">Solo hosts, 1-3 properties</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Properly</td>
                    <td className="px-6 py-4">$19-49/month</td>
                    <td className="px-6 py-4">STR tax prep, multi-property accounting</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Hospitable</td>
                    <td className="px-6 py-4">$25-75/month</td>
                    <td className="px-6 py-4">Automation + financial reports</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">QuickBooks</td>
                    <td className="px-6 py-4">$30-200/month</td>
                    <td className="px-6 py-4">Large portfolios, property managers</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Stessa</td>
                    <td className="px-6 py-4">Free (limited) or $15/month</td>
                    <td className="px-6 py-4">Long-term + short-term mix</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              <strong>SheetLink advantage:</strong> Automated bank sync with full spreadsheet control at a fraction of the cost. Perfect for solo hosts who want simple, affordable bookkeeping. Upgrade to Properly or QuickBooks only when managing 5+ properties.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Real Airbnb Host Use Cases
            </h2>

            <div className="my-6 space-y-6">
              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Rachel - Vacation Condo Owner</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Rachel couldn't figure out if her beachfront condo was actually profitable. Expenses felt high but she had no clear picture.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs all Airbnb deposits and expenses (cleaning, maintenance, HOA). Rachel tracks monthly net income and occupancy rate.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Discovered summer months were very profitable (70% margins) but winter was break-even. Increased winter pricing by 15% and added minimum stay requirements. Improved annual ROI from 4% to 9%.
                </p>
              </div>

              <div className="rounded-lg border-2 border-sheetlink-green-200 bg-sheetlink-green-50 p-6">
                <h3 className="font-semibold text-sheetlink-text mb-2">Mark - Urban Apartment Host</h3>
                <p className="text-sm">
                  <strong>Challenge:</strong> Mark hosted on Airbnb and VRBO but didn't know which platform was more profitable after fees.
                </p>
                <p className="text-sm mt-2">
                  <strong>Solution:</strong> SheetLink syncs deposits from both platforms. Mark tags each by source and calculates effective fee rate and net revenue per booking.
                </p>
                <p className="text-sm mt-2">
                  <strong>Result:</strong> Found Airbnb generated more bookings but VRBO had higher-value guests with lower fees. Optimized pricing differently on each platform, increased total revenue by 18%.
                </p>
              </div>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Pricing for Airbnb Hosts
            </h2>
            <p>
              SheetLink is designed to be affordable for short-term rental hosts:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Free Tier</strong> - Last 7 days of transactions (good for new hosts testing the waters)</li>
              <li><strong>Basic Plan</strong> - $2/month for 90 days of history (recommended for most hosts, covers quarterly analysis)</li>
              <li><strong>Pro Plan</strong> - $10/month for 24 months of history (best for established hosts, full year-over-year comparisons)</li>
            </ul>
            <p className="mt-4">
              <strong>Recommended tier:</strong> Basic ($2/month) for casual hosts. Pro ($10/month) for full-time hosts who need year-over-year seasonality data and complete tax records.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Get Started: Track Your Airbnb Income Today
            </h2>
            <p>
              Stop guessing at profitability and start tracking real numbers. Know your occupancy rate, revenue per night, and true ROI after all expenses.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Ready to track your Airbnb finances automatically?
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. Perfect for short-term rental hosts.
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
                Add to Chrome - Start Tracking Your Rental
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
