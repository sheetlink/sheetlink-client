import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function SheetLinkVsMint() {
  const seoTitle = "SheetLink vs Mint - Feature Comparison & Pricing 2026";
  const seoDescription = "Mint was shut down by Intuit in January 2024. SheetLink is the perfect replacement: sync bank transactions to Google Sheets with a free tier (7 days) and paid plans starting at $2/month. Own your financial data.";
  const seoUrl = 'https://sheetlink.app/sheetlink-vs-mint';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What happened to Mint?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Intuit shut down Mint.com in January 2024 and forced users to migrate to Credit Karma. Many users were unhappy with the forced migration and lack of features in Credit Karma compared to Mint. SheetLink offers a direct replacement for users who want to own their financial data in Google Sheets."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink a good replacement for Mint?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink syncs bank transactions to Google Sheets just like Mint synced to its platform. SheetLink has a free tier (7 days of history) and paid plans ($2-10/month). You get more control and flexibility with Google Sheets, plus your data isn't locked in a platform that could shut down."
        }
      },
      {
        "@type": "Question",
        "name": "Does SheetLink cost money like Mint was free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink has a free tier (7 days of transaction history, unlimited banks) that works forever. For more history, paid plans start at $2/month. Mint was 'free' but monetized through ads and selling your data to financial institutions. SheetLink is privacy-first with no ads or data selling."
        }
      },
      {
        "@type": "Question",
        "name": "Can I import my Mint data into SheetLink?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Since Mint shut down, you can't export new data from Mint. If you exported your Mint transaction history before the shutdown (as CSV), you can import that into Google Sheets manually. SheetLink will then sync new transactions going forward, continuing where Mint left off."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="mint alternative, mint replacement, mint shut down, mint.com alternative, free budgeting app, mint migration, credit karma alternative" />

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
              <div className="inline-block mb-6 px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm font-semibold">
                Mint.com shut down January 2024
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-sheetlink-text mb-6">
                SheetLink: The Best Mint Alternative
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Mint is gone. Intuit forced users to Credit Karma with limited features. SheetLink gives you a better option: bank transactions in Google Sheets you own. Free tier + paid plans from $2/month.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-xl"
                >
                  Replace Mint with SheetLink
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

          {/* What Happened to Mint */}
          <section className="px-4 py-16 bg-red-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-6">
                What Happened to Mint?
              </h2>
              <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-red-200">
                <p className="text-gray-700 mb-4">
                  On November 2, 2023, Intuit announced it was shutting down Mint.com after 17 years. The service officially closed on <strong>January 1, 2024</strong>.
                  Users were forced to migrate to Credit Karma (also owned by Intuit) or find alternatives.
                </p>
                <p className="text-gray-700 mb-4">
                  Many longtime Mint users were frustrated by:
                </p>
                <ul className="space-y-2 text-gray-700 ml-6">
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span><strong>Loss of features:</strong> Credit Karma lacks many budgeting features Mint had</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span><strong>Forced migration:</strong> No choice but to move to Credit Karma or lose data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span><strong>Loss of historical data:</strong> Years of transaction history gone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-red-600 font-bold mt-1">•</span>
                    <span><strong>Platform risk:</strong> Reminder that free services can disappear anytime</span>
                  </li>
                </ul>
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
                      <span>You want to own your financial data (not rent it)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You were frustrated by Mint shutting down</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want spreadsheet power for custom budgets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You value privacy (no ads, no data selling)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 border-2 border-gray-300 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">What Mint Had</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Free (ad-supported, sold your data)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Bank sync with automatic categorization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Simple budgeting and bill tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span><strong>SHUT DOWN January 2024</strong></span>
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
                Feature Comparison: SheetLink vs Mint (when it existed)
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-lg shadow-sm">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">Feature</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-sheetlink-green-700 bg-sheetlink-green-700/5">SheetLink</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-red-600">Mint (Discontinued)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Status</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-semibold">Active</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full font-semibold">Shut Down Jan 2024</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">$0-10/month</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Free (ad-supported)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Tier</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">7 days history</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="text-gray-400">Fully free</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Ads / Data Selling</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✗</span>
                        <div className="text-xs text-gray-600 mt-1">No ads, no tracking</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Ads + sold data to partners</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Data Ownership</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">You own the Google Sheet</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-red-500 text-white">✗</span>
                        <div className="text-xs text-gray-600 mt-1">Locked in Mint platform</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Platform Risk</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="text-gray-700">Low - data in Google Sheets</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="text-red-700 font-semibold">High - service shut down</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Bank Connectivity</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Plaid (10,000+ banks)</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Plaid (10,000+ banks)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Automatic Categorization</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="text-gray-600">AI categorization (Pro plan)</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Built-in</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Budgeting</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Build your own in Sheets</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Pre-built budgets</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Spreadsheet Flexibility</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Full Google Sheets power</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">Export only</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Mobile App</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Google Sheets app</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Native iOS/Android (was)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Business Use Cases</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">Personal only</div>
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
                Pricing: SheetLink vs Mint (Before Shutdown)
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="border-2 border-sheetlink-green-700 rounded-lg p-8 bg-sheetlink-green-700/5">
                  <h3 className="text-2xl font-bold text-sheetlink-green-700 mb-2">SheetLink</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">$0 - $10<span className="text-xl text-gray-600">/month</span></div>
                    <p className="text-gray-600">Free tier + paid plans, no ads</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Free:</strong> 7 days of history, unlimited banks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Basic:</strong> $2/mo per institution, 90 days</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Pro:</strong> $10/mo per institution, 24 months</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Privacy-first: No ads, no tracking, no data selling</span>
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

                <div className="border-2 border-red-300 rounded-lg p-8 bg-red-50">
                  <h3 className="text-2xl font-bold text-red-700 mb-2">Mint (Discontinued)</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">$0<span className="text-xl text-gray-600">/month</span></div>
                    <p className="text-gray-600">Ad-supported, sold your data</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Completely free to use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Monetized through ads on dashboard</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span>Sold anonymized data to financial partners</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span><strong className="text-red-700">SHUT DOWN January 2024</strong></span>
                    </li>
                  </ul>
                  <div className="block text-center rounded-lg border-2 border-red-300 bg-red-100 px-6 py-3 font-semibold text-red-700">
                    Service Discontinued
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">The Real Cost of "Free":</h4>
                <p className="text-blue-800">
                  Mint was free, but you paid with your privacy and data. Intuit monetized through ads and by selling your transaction data to banks and credit card companies.
                  When they shut it down, you lost access to years of financial history. SheetLink costs $2-10/month (or $0 with free tier), but YOUR data stays in YOUR Google Sheet forever.
                </p>
              </div>
            </div>
          </section>

          {/* Why SheetLink is Better */}
          <section className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                Why SheetLink is Better Than Mint Ever Was
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Own Your Data</h3>
                  <p className="text-gray-700">
                    With SheetLink, your financial data lives in YOUR Google Sheet. You control it, you can export it anytime, and no one can shut down your access.
                    Mint locked your data in their platform - when they shut down, that data was gone unless you exported it beforehand. SheetLink eliminates platform risk.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">Privacy-First, No Ads, No Data Selling</h3>
                  <p className="text-gray-700">
                    Mint was "free" because they sold your transaction data to banks, credit card companies, and financial partners. Their dashboard was filled with targeted ads.
                    SheetLink charges a small fee ($2-10/month) instead of selling your data. No ads, no tracking, no data selling. Your financial privacy is protected.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">Spreadsheet Power for Custom Analysis</h3>
                  <p className="text-gray-700">
                    Mint had pre-built budgets and reports, but you were limited to their features. SheetLink gives you raw transaction data in Google Sheets.
                    Build custom budgets, create pivot tables, analyze spending patterns, forecast cash flow - anything spreadsheets can do. Unlimited flexibility vs Mint's rigid structure.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">Works for Business Bookkeeping, Not Just Personal Finance</h3>
                  <p className="text-gray-700">
                    Mint was personal finance only. SheetLink works for freelancers, contractors, and small businesses who need to track business expenses.
                    Categorize transactions, build P&L statements, track business vs personal spending - all in Google Sheets. A better Mint for both personal and business use.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Migration Guide */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                How to Replace Mint with SheetLink
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Install SheetLink Chrome Extension</h3>
                      <p className="text-gray-700">
                        Add SheetLink to Chrome from the Chrome Web Store. The extension is free to install and includes a free tier (7 days of transaction history) so you can test it before committing to paid plans.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Connect Your Banks via Plaid</h3>
                      <p className="text-gray-700">
                        SheetLink uses Plaid for bank connectivity - the same service Mint used. Connect your checking accounts, savings accounts, and credit cards.
                        If your banks worked with Mint, they'll work with SheetLink (10,000+ institutions supported).
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Import Historical Mint Data (If You Have It)</h3>
                      <p className="text-gray-700">
                        If you exported your Mint transaction history before the shutdown (as CSV), you can import that into Google Sheets to preserve historical data.
                        SheetLink will then sync new transactions going forward, continuing where Mint left off.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Build Your Budget in Google Sheets</h3>
                      <p className="text-gray-700">
                        Recreate your Mint budget categories in Google Sheets. Use formulas like SUMIFS to categorize spending by month/category.
                        Check SheetLink's Recipes for pre-built budget templates. You'll have more flexibility than Mint ever offered.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      5
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Enjoy True Data Ownership</h3>
                      <p className="text-gray-700">
                        Your transaction data now lives in YOUR Google Sheet. No platform risk - Google Sheets isn't going anywhere, and even if SheetLink shuts down, your data stays in your Sheet.
                        You'll never experience a "Mint shutdown" again.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-center text-sheetlink-text mb-12">
                Frequently Asked Questions
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    What happened to Mint?
                  </h3>
                  <p className="text-gray-700">
                    Intuit shut down Mint.com in January 2024 and forced users to migrate to Credit Karma. Many users were unhappy with the forced migration and lack of features in Credit Karma compared to Mint. SheetLink offers a direct replacement for users who want to own their financial data in Google Sheets.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Is SheetLink a good replacement for Mint?
                  </h3>
                  <p className="text-gray-700">
                    Yes. SheetLink syncs bank transactions to Google Sheets just like Mint synced to its platform. SheetLink has a free tier (7 days of history) and paid plans ($2-10/month). You get more control and flexibility with Google Sheets, plus your data isn't locked in a platform that could shut down.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Does SheetLink cost money like Mint was free?
                  </h3>
                  <p className="text-gray-700">
                    SheetLink has a free tier (7 days of transaction history, unlimited banks) that works forever. For more history, paid plans start at $2/month. Mint was "free" but monetized through ads and selling your data to financial institutions. SheetLink is privacy-first with no ads or data selling.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Can I import my Mint data into SheetLink?
                  </h3>
                  <p className="text-gray-700">
                    Since Mint shut down, you can't export new data from Mint. If you exported your Mint transaction history before the shutdown (as CSV), you can import that into Google Sheets manually. SheetLink will then sync new transactions going forward, continuing where Mint left off.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="px-4 py-16 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Replace Mint with SheetLink Today
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Own your financial data. No ads. No tracking. No shutdowns. Start with our free tier - no credit card required.
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
