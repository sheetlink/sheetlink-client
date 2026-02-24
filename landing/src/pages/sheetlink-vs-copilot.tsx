import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function SheetLinkVsCopilot() {
  const seoTitle = "SheetLink vs Copilot - Feature Comparison & Pricing 2026";
  const seoDescription = "Compare SheetLink vs Copilot Money: Copilot costs $14.99/month (iOS only) for beautiful budgeting. SheetLink costs $2-10/month and works on Chrome with spreadsheet flexibility. See which is right for you.";
  const seoUrl = 'https://sheetlink.app/sheetlink-vs-copilot';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the main difference between SheetLink and Copilot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copilot is a beautiful iOS-first budgeting app with a polished UI and simple workflows ($14.99/month). SheetLink syncs bank transactions to Google Sheets for DIY budgeting and analysis ($2-10/month). Copilot is iOS-only; SheetLink works on Chrome (cross-platform). Choose beautiful simplicity or spreadsheet power."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink cheaper than Copilot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, significantly. Copilot costs $14.99/month ($179.88/year). SheetLink costs $2-10/month ($24-120/year) with a free tier. For most users, SheetLink is 60-90% cheaper than Copilot, though Copilot offers a more polished budgeting experience."
        }
      },
      {
        "@type": "Question",
        "name": "Does SheetLink work on iPhone like Copilot?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink is a Chrome extension, so it works on any device with Chrome (Mac, Windows, Chromebook). You can access your data on iPhone through the Google Sheets mobile app. Copilot has a dedicated iOS app that's more polished for mobile budgeting, but is iPhone-only (no Android or web)."
        }
      },
      {
        "@type": "Question",
        "name": "Can SheetLink replace Copilot for budgeting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your needs. Copilot provides a beautiful, guided budgeting experience with native iOS apps. SheetLink gives you raw transaction data in Google Sheets - you build your own budgets. If you value UI/UX and mobile-first design, choose Copilot. If you want flexibility and lower cost, choose SheetLink."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="copilot money alternative, sheetlink vs copilot, copilot competitor, budgeting app, ios budgeting app, copilot pricing, cheap budgeting app" />

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
                SheetLink vs Copilot Money
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Copilot is a beautiful iOS budgeting app ($14.99/month). SheetLink syncs transactions to Google Sheets for DIY budgeting ($2-10/month). Choose beautiful simplicity or spreadsheet flexibility.
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
                      <span>You want to save 60-90% on cost</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You need cross-platform access (not just iOS)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want spreadsheet power for custom analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You use it for business bookkeeping, not just budgets</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 border-2 border-gray-300 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">Choose Copilot if...</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You're an iPhone user who values beautiful design</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want a polished, guided budgeting experience</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You prefer mobile-first budgeting workflows</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You value UI/UX over price and flexibility</span>
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
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Copilot</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">$0-10/month</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">$14.99/month</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Tier</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">7 days history</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">30-day trial</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Platform</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Chrome Extension + Google Sheets</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">iOS only (iPhone/iPad)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Android Support</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Via Chrome browser</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">iOS only</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Bank Sync</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">via Plaid</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">via Plaid</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Budgeting Approach</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">DIY in Google Sheets</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Guided, category-based budgets</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">User Interface</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Google Sheets interface</td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Beautiful native iOS app</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Spending Insights</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Build custom charts/pivots in Sheets</td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Pre-built visual insights</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Recurring Transaction Detection</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">DIY with formulas</td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Automatic detection</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Amazon Purchase Breakdown</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Shows item-level detail</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Investment Tracking</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="text-gray-600">Build custom tracking in Sheets</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Net worth tracking</div>
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
                        <div className="text-xs text-gray-600 mt-1">Export to CSV only</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Business Bookkeeping</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">Personal only</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Learning Curve</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Moderate (need Sheets knowledge)</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Low (intuitive UI)</td>
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
                    <p className="text-gray-600">Flexible per-institution pricing</p>
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
                      <span>Works on Chrome (Mac, Windows, Chromebook)</span>
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
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Copilot Money</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">$14.99<span className="text-xl text-gray-600">/month</span></div>
                    <p className="text-gray-600">Single pricing tier</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited accounts and budgets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Beautiful iOS app with all features</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>30-day free trial</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>iOS only (iPhone, iPad, Mac)</span>
                    </li>
                  </ul>
                  <a
                    href="https://copilot.money"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400"
                  >
                    Visit Copilot
                  </a>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Annual Cost Comparison:</h4>
                <p className="text-blue-800">
                  Copilot: $179.88/year ($14.99/month, no annual discount) |
                  SheetLink Basic: $24/year (2 banks) | SheetLink Pro: $120/year (1 bank) |
                  <strong>Savings: $60-156/year with SheetLink</strong>
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
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want Cross-Platform Access (Not Just iOS)</h3>
                  <p className="text-gray-700">
                    Copilot is iOS-only - no Android, no Windows, no web version. SheetLink works on any device with Chrome (Mac, Windows, Linux, Chromebook).
                    Your data lives in Google Sheets, accessible anywhere. Perfect if you switch between iPhone and Android, or need to share financial data with a partner on a different platform.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want Spreadsheet Power for Custom Analysis</h3>
                  <p className="text-gray-700">
                    Copilot has beautiful pre-built budgets and insights, but you're limited to their features. SheetLink gives you raw transaction data in Google Sheets.
                    Build custom P&L reports, forecasting models, tax categorization, or complex multi-year analyses. Unlimited flexibility vs Copilot's beautiful but rigid structure.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Need Business Bookkeeping, Not Just Budgets</h3>
                  <p className="text-gray-700">
                    Copilot is designed exclusively for personal budgeting. SheetLink works for both personal finance and small business bookkeeping.
                    Freelancers and solopreneurs use SheetLink to track business expenses, categorize transactions for taxes, and build simple P&L statements - all in Google Sheets.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want to Save $60-156/Year</h3>
                  <p className="text-gray-700">
                    Copilot costs $179.88/year with no annual discount. SheetLink costs $24-120/year depending on your plan, saving you 33-87% annually.
                    If you're budget-conscious and comfortable with spreadsheets, SheetLink offers dramatically better value. The free tier (7 days of history) works forever for weekly tracking.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* When to Choose Copilot */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                When to Choose Copilot
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You're an iPhone User Who Values Beautiful Design</h3>
                  <p className="text-gray-700">
                    Copilot is one of the most beautifully designed budgeting apps available. The native iOS app is polished, fast, and feels like it belongs on your iPhone.
                    If you live in the Apple ecosystem and appreciate thoughtful UI/UX, Copilot's design is worth the premium. SheetLink's interface is... Google Sheets.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Want Automatic Insights Without DIY Work</h3>
                  <p className="text-gray-700">
                    Copilot automatically detects recurring subscriptions, breaks down Amazon purchases into individual items, and provides spending insights out of the box.
                    SheetLink gives you transaction data - you build everything else. If you'd rather use a finished product than DIY in spreadsheets, Copilot saves significant setup time.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Prefer Mobile-First Budgeting</h3>
                  <p className="text-gray-700">
                    Copilot is designed for mobile budgeting: check spending on your phone, review budgets while shopping, get push notifications for large transactions.
                    SheetLink works through Google Sheets, which has mobile apps but isn't optimized for quick budgeting checks. If you budget primarily on your phone, Copilot's mobile experience is superior.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Don't Want to Learn Spreadsheets</h3>
                  <p className="text-gray-700">
                    SheetLink requires Google Sheets knowledge - formulas, filtering, charts. Copilot requires zero spreadsheet skills.
                    The app guides you through budgeting with an intuitive interface. If you're intimidated by spreadsheets or simply don't want to learn them, Copilot's simplicity is worth the higher price.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Migration Guide */}
          <section className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                How to Switch from Copilot to SheetLink
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Export Your Copilot Transaction History</h3>
                      <p className="text-gray-700">
                        In Copilot, export your transactions as CSV to preserve historical spending data. This gives you a backup of your categories and notes before switching.
                        Import this into Google Sheets to maintain continuity.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Install SheetLink and Start Free Tier</h3>
                      <p className="text-gray-700">
                        Add SheetLink from the Chrome Web Store. Use the free tier (7 days of transactions) to test it alongside Copilot before canceling your subscription.
                        Connect your banks via Plaid - the same service Copilot uses.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Recreate Your Budget in Google Sheets</h3>
                      <p className="text-gray-700">
                        Set up budget categories in Google Sheets using formulas like SUMIFS to track spending by category and month.
                        Check SheetLink's Recipes for pre-built budget templates. You'll lose Copilot's automatic recurring detection and Amazon breakdowns - these need manual setup.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Test for 30 Days, Then Cancel Copilot</h3>
                      <p className="text-gray-700">
                        Run both services in parallel for a few weeks to ensure SheetLink meets your needs. Once you're confident with your Google Sheets budget, cancel your Copilot subscription.
                        You'll save $155-180/year while maintaining the same Plaid-powered bank connectivity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Note on Features:</h4>
                <p className="text-yellow-800">
                  Copilot's polished features (automatic recurring detection, Amazon purchase breakdown, beautiful charts) won't transfer to SheetLink.
                  You'll need to rebuild these workflows manually in Google Sheets or accept that SheetLink is more bare-bones.
                  The trade-off is spreadsheet flexibility and 60-90% cost savings.
                </p>
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
                    What is the main difference between SheetLink and Copilot?
                  </h3>
                  <p className="text-gray-700">
                    Copilot is a beautiful iOS-first budgeting app with a polished UI and simple workflows ($14.99/month). SheetLink syncs bank transactions to Google Sheets for DIY budgeting and analysis ($2-10/month). Copilot is iOS-only; SheetLink works on Chrome (cross-platform). Choose beautiful simplicity or spreadsheet power.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Is SheetLink cheaper than Copilot?
                  </h3>
                  <p className="text-gray-700">
                    Yes, significantly. Copilot costs $14.99/month ($179.88/year). SheetLink costs $2-10/month ($24-120/year) with a free tier. For most users, SheetLink is 60-90% cheaper than Copilot, though Copilot offers a more polished budgeting experience.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Does SheetLink work on iPhone like Copilot?
                  </h3>
                  <p className="text-gray-700">
                    SheetLink is a Chrome extension, so it works on any device with Chrome (Mac, Windows, Chromebook). You can access your data on iPhone through the Google Sheets mobile app. Copilot has a dedicated iOS app that's more polished for mobile budgeting, but is iPhone-only (no Android or web).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Can SheetLink replace Copilot for budgeting?
                  </h3>
                  <p className="text-gray-700">
                    It depends on your needs. Copilot provides a beautiful, guided budgeting experience with native iOS apps. SheetLink gives you raw transaction data in Google Sheets - you build your own budgets. If you value UI/UX and mobile-first design, choose Copilot. If you want flexibility and lower cost, choose SheetLink.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="px-4 py-16 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Save $60-156/Year - Try SheetLink Free
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start with our free tier and see how Google Sheets can power your budgeting. No credit card required.
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
