import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function SheetLinkVsQuickBooks() {
  const seoTitle = "SheetLink vs QuickBooks - Feature Comparison & Pricing 2026";
  const seoDescription = "Compare SheetLink vs QuickBooks: SheetLink costs $2-10/month for simple bank syncing to Google Sheets, while QuickBooks costs $30-75/month for full accounting software. Perfect for freelancers and solopreneurs who don't need enterprise features.";
  const seoUrl = 'https://sheetlink.app/sheetlink-vs-quickbooks';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the main difference between SheetLink and QuickBooks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "QuickBooks is full accounting software with invoicing, payroll, inventory, and tax features ($30-75/month). SheetLink simply syncs bank transactions to Google Sheets for basic bookkeeping ($2-10/month). QuickBooks is for serious businesses with accounting needs. SheetLink is for freelancers and solopreneurs who need basic expense tracking."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink cheaper than QuickBooks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, dramatically cheaper. QuickBooks costs $30-75/month ($360-900/year). SheetLink costs $2-10/month ($24-120/year) - saving you $336-876/year. However, QuickBooks includes full accounting features that SheetLink doesn't offer."
        }
      },
      {
        "@type": "Question",
        "name": "Can SheetLink replace QuickBooks for my business?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Only if you have simple bookkeeping needs. SheetLink works for freelancers, contractors, and solopreneurs who just need to track income/expenses and categorize transactions. If you need invoicing, payroll, inventory, multi-user access, or tax integration, you need QuickBooks or similar accounting software."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use SheetLink alongside QuickBooks?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Some businesses use SheetLink for quick daily transaction monitoring in Google Sheets, while maintaining QuickBooks for official accounting and tax filing. SheetLink can complement QuickBooks for real-time expense visibility without logging into full accounting software."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="quickbooks alternative, sheetlink vs quickbooks, simple bookkeeping, freelancer accounting, quickbooks too expensive, cheap accounting software" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content={seoUrl} />
        <meta property="og:type" content="article" />

        <link rel="canonical" href={seoUrl} />
      </Head>

      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="px-4 py-16 bg-gradient-to-b from-sheetlink-green-700/5 to-white">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-sheetlink-text mb-6">
                SheetLink vs QuickBooks
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                QuickBooks is full accounting software ($30-75/month). SheetLink syncs transactions to Google Sheets for basic bookkeeping ($2-10/month). Choose enterprise features or simplicity.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-xl"
                >
                  Try SheetLink Free
                </a>
                <a
                  href="#comparison"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-sheetlink-text transition-all duration-200 hover:border-sheetlink-green-700"
                >
                  See Comparison
                </a>
              </div>
            </div>
          </section>

          {/* Quick Summary */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-5xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="p-6 border-2 border-sheetlink-green-700 rounded-lg bg-sheetlink-green-700/5">
                  <h3 className="text-2xl font-bold text-sheetlink-green-700 mb-4">Choose SheetLink if...</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You're a freelancer or solopreneur</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You only need basic expense tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>QuickBooks feels like overkill (and is too expensive)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want to save $300-850/year</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 border-2 border-gray-300 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">Choose QuickBooks if...</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You need to send invoices to clients</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You have employees and need payroll</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You need professional accounting features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Your accountant requires QuickBooks files</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Comparison Table */}
          <section id="comparison" className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center text-sheetlink-text mb-12">
                Feature Comparison
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700 bg-sheetlink-green-700/5">SheetLink</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">QuickBooks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Starting Price</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">$0 (Free tier)</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">$30/month</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Full Price Range</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">$2-10/month</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">$30-75/month</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Bank Transaction Sync</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Invoicing</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Expense Categorization</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">DIY in Sheets</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Automatic rules</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Payroll</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">$45+ add-on</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Inventory Management</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Plus/Advanced</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Tax Integration</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">TurboTax integration</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">P&L / Balance Sheet</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="text-gray-600">Build your own in Sheets</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Automatic reports</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Multi-User Access</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="text-gray-600">Via Google Sheets sharing</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Role-based permissions</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Accountant Access</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="text-gray-600">Share Google Sheet</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Free accountant login</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Spreadsheet Flexibility</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Full Google Sheets power</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">Export to Excel only</div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Pricing Comparison */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl font-bold text-center text-sheetlink-text mb-12">
                Pricing Comparison
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-sheetlink-green-700 rounded-lg p-8 bg-sheetlink-green-700/5">
                  <h3 className="text-2xl font-bold text-sheetlink-green-700 mb-2">SheetLink</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">$0 - $10<span className="text-xl text-gray-600">/month</span></div>
                    <p className="text-gray-600">Simple transaction syncing</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Free:</strong> 7 days of history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Basic:</strong> $2/mo, 90 days history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Pro:</strong> $10/mo, 24 months history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>No invoicing, payroll, or tax features</span>
                    </li>
                  </ul>
                  <a
                    href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                  >
                    Try Free
                  </a>
                </div>

                <div className="border-2 border-gray-300 rounded-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">QuickBooks Online</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">$30 - $75<span className="text-xl text-gray-600">/month</span></div>
                    <p className="text-gray-600">Full accounting software</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Simple Start:</strong> $30/mo (1 user)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Essentials:</strong> $55/mo (3 users)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Plus:</strong> $75/mo (5 users, inventory)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Payroll: $45+/mo additional</span>
                    </li>
                  </ul>
                  <a
                    href="https://quickbooks.intuit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400"
                  >
                    Visit QuickBooks
                  </a>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Annual Cost Comparison:</h4>
                <p className="text-blue-800">
                  QuickBooks Simple Start: $360/year | QuickBooks Plus: $900/year |
                  SheetLink Basic: $24/year | SheetLink Pro: $120/year |
                  <strong>Savings: $240-780/year with SheetLink</strong> (but you lose invoicing, payroll, and professional accounting features)
                </p>
              </div>
            </div>
          </section>

          {/* When to Choose SheetLink */}
          <section className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                When to Choose SheetLink
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You're a Freelancer or Solopreneur with Simple Needs</h3>
                  <p className="text-gray-700">
                    If you're a contractor, consultant, or freelancer who just needs to track business expenses and categorize transactions for tax time, SheetLink is perfect. You don't need payroll, you don't need inventory management, and you probably send invoices through other tools. SheetLink gives you the basics for $24-120/year vs QuickBooks at $360-900/year.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">QuickBooks Feels Like Overkill</h3>
                  <p className="text-gray-700">
                    QuickBooks has hundreds of features most small businesses never use. The interface is complex, the learning curve is steep, and you're paying for invoicing/payroll/inventory features you don't need. SheetLink is intentionally simple: bank transactions sync to Google Sheets. That's it. Perfect for people who find QuickBooks overwhelming.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want Spreadsheet Flexibility</h3>
                  <p className="text-gray-700">
                    With SheetLink, your financial data lives in Google Sheets - giving you complete control. Build custom P&L reports, create forecasting models, use pivot tables for analysis, or integrate with other Sheets-based workflows. QuickBooks locks your data in their system with limited export options.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Just Started Your Business</h3>
                  <p className="text-gray-700">
                    In the early days, every dollar counts. Start with SheetLink's free tier (7 days of transactions) to track initial expenses. Upgrade to Basic ($2/mo) as your business grows. You can always switch to QuickBooks later when you need professional accounting features - but many freelancers never need to.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* When to Choose QuickBooks */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                When to Choose QuickBooks
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Need to Send Professional Invoices</h3>
                  <p className="text-gray-700">
                    QuickBooks excels at invoicing: create professional invoices, track payment status, send automatic reminders, and accept online payments. SheetLink doesn't do invoicing at all. If you bill clients regularly, you'll need QuickBooks or a dedicated invoicing tool (like FreshBooks or Wave) alongside SheetLink.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Have Employees and Need Payroll</h3>
                  <p className="text-gray-700">
                    The moment you hire employees, you need payroll software that handles tax withholdings, W-2s, direct deposit, and compliance. QuickBooks Payroll (starting at $45/month) integrates seamlessly with QuickBooks accounting. SheetLink has no payroll features - you'd need a separate payroll service.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">Your Accountant Requires QuickBooks Files</h3>
                  <p className="text-gray-700">
                    Many accountants prefer (or require) QuickBooks files for year-end tax preparation. They're trained on QuickBooks, have workflows built around it, and can work more efficiently with QB files than Google Sheets exports. If your CPA requires QuickBooks, that makes the decision easy.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Need Inventory Management or Multi-User Access</h3>
                  <p className="text-gray-700">
                    If you sell physical products and need to track inventory levels, QuickBooks Plus ($75/month) includes robust inventory management. It also supports role-based permissions for multiple users (bookkeeper, accountant, business partner). SheetLink has no inventory features and multi-user access is limited to Google Sheets sharing.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Migration Guide */}
          <section className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                Using SheetLink Alongside QuickBooks
              </h2>
              <p className="text-gray-600 mb-8">
                You don't have to choose one or the other. Some businesses use both: SheetLink for quick daily expense monitoring in Google Sheets, QuickBooks for official accounting and tax filing.
              </p>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Use SheetLink for Real-Time Expense Visibility</h3>
                      <p className="text-gray-700">
                        Connect your business bank accounts to SheetLink for instant transaction visibility in Google Sheets. Check spending throughout the month without logging into QuickBooks. Great for quick checks and cash flow monitoring.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Use QuickBooks for Invoicing and Official Books</h3>
                      <p className="text-gray-700">
                        Send invoices, track accounts receivable, run payroll, and maintain official books in QuickBooks. Your accountant gets clean QuickBooks files at year-end. Both systems connect to the same banks via Plaid, so transactions appear in both places.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Build Custom Reports in Sheets</h3>
                      <p className="text-gray-700">
                        Use SheetLink data to build custom reports, forecasts, or analyses that QuickBooks doesn't support. Export QB reports to Sheets and combine with SheetLink transaction data for more advanced financial modeling.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center text-sheetlink-text mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    What is the main difference between SheetLink and QuickBooks?
                  </h3>
                  <p className="text-gray-700">
                    QuickBooks is full accounting software with invoicing, payroll, inventory, and tax features ($30-75/month). SheetLink simply syncs bank transactions to Google Sheets for basic bookkeeping ($2-10/month). QuickBooks is for serious businesses with accounting needs. SheetLink is for freelancers and solopreneurs who need basic expense tracking.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Is SheetLink cheaper than QuickBooks?
                  </h3>
                  <p className="text-gray-700">
                    Yes, dramatically cheaper. QuickBooks costs $30-75/month ($360-900/year). SheetLink costs $2-10/month ($24-120/year) - saving you $336-876/year. However, QuickBooks includes full accounting features that SheetLink doesn't offer.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Can SheetLink replace QuickBooks for my business?
                  </h3>
                  <p className="text-gray-700">
                    Only if you have simple bookkeeping needs. SheetLink works for freelancers, contractors, and solopreneurs who just need to track income/expenses and categorize transactions. If you need invoicing, payroll, inventory, multi-user access, or tax integration, you need QuickBooks or similar accounting software.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Can I use SheetLink alongside QuickBooks?
                  </h3>
                  <p className="text-gray-700">
                    Yes. Some businesses use SheetLink for quick daily transaction monitoring in Google Sheets, while maintaining QuickBooks for official accounting and tax filing. SheetLink can complement QuickBooks for real-time expense visibility without logging into full accounting software.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="px-4 py-16 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Save $300-850/Year vs QuickBooks
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Perfect for freelancers and solopreneurs who don't need full accounting software. Start free, upgrade only if needed.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-lg font-semibold text-sheetlink-green-700 transition-all duration-200 hover:shadow-xl"
              >
                Add to Chrome - It's Free
              </a>
            </div>
          </section>
        </main>

        <Footer />

        {/* Last Updated */}
        <div className="text-center py-4 text-sm text-gray-500 bg-gray-50">
          Last updated: February 2026
        </div>
      </div>
    </>
  );
}
