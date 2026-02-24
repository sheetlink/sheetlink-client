import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function SheetLinkVsTiller() {
  const seoTitle = "SheetLink vs Tiller Money - Feature Comparison & Pricing 2026";
  const seoDescription = "Compare SheetLink vs Tiller Money: SheetLink starts at $2/month with a free tier, while Tiller costs $79/year. Both sync bank transactions to Google Sheets, but SheetLink offers better pricing and business use cases.";
  const seoUrl = 'https://sheetlink.app/sheetlink-vs-tiller';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the main difference between SheetLink and Tiller Money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The main differences are pricing and flexibility. SheetLink costs $2-10/month with a free tier (7 days of history), while Tiller costs $79/year ($6.58/month) with no free option. SheetLink is better for business bookkeeping use cases, while Tiller focuses primarily on personal finance with pre-built templates."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink cheaper than Tiller?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink's Basic plan costs $1.99/month ($0.99/month annual) for 90 days of history, compared to Tiller's $79/year ($6.58/month). SheetLink also has a free tier that Tiller doesn't offer. For most users, SheetLink is 3-7x cheaper than Tiller."
        }
      },
      {
        "@type": "Question",
        "name": "Does SheetLink work with Excel like Tiller?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SheetLink currently only works with Google Sheets, while Tiller supports both Google Sheets and Microsoft Excel. If you need Excel support, Tiller is the better choice. However, SheetLink's Google Sheets-only approach allows for better integration and features specific to Sheets."
        }
      },
      {
        "@type": "Question",
        "name": "Can I migrate from Tiller to SheetLink?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Both services use Plaid for bank connectivity, so you can easily switch. Export your historical data from Tiller, connect your banks to SheetLink, and your transaction syncing will continue in your Google Sheets. SheetLink's free tier lets you test the service before canceling Tiller."
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="tiller money alternative, sheetlink vs tiller, tiller competitor, bank sync google sheets, tiller money pricing, sheetlink pricing" />

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
                SheetLink vs Tiller Money
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Both sync bank transactions to Google Sheets. SheetLink is 3-7x cheaper with a free tier and better business features. Tiller offers Excel support and mature templates.
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
                      <span>You want the cheapest option ($2-10/month)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You need a free tier to test before paying</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You're using it for business bookkeeping</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You only use Google Sheets (not Excel)</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 border-2 border-gray-300 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">Choose Tiller if...</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You need Microsoft Excel support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want pre-built personal finance templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You prefer a more established product (8+ years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You value curated templates over price</span>
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
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">Tiller Money</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Starting Price</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">$0 (Free tier)</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">$79/year ($6.58/mo)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Paid Plan Price</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">$2-10/month</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">$79/year</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Tier</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Google Sheets Support</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Microsoft Excel Support</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Bank Connectivity</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Plaid (10,000+ banks)</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Plaid (10,000+ banks)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Auto-Sync Frequency</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Hourly (Pro plan)</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Daily</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Transaction History</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">7 days (Free) to 24 months (Pro)</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Pre-built Templates</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Recipes (growing library)</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Extensive template library</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Business Use Cases</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="text-gray-500">Personal focus</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Open Source</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Platform</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Chrome Extension</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Web-based service</td>
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
                      <span><strong>Basic:</strong> $1.99/mo ($0.99 annual) per institution, 90 days history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span><strong>Pro:</strong> $9.99/mo ($4.99 annual) per institution, 24 months history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Hourly auto-sync on Pro</span>
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
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">Tiller Money</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">$79<span className="text-xl text-gray-600">/year</span></div>
                    <p className="text-gray-600">Single annual plan ($6.58/month)</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited transaction history</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Unlimited banks and accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Daily auto-sync</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>30-day free trial</span>
                    </li>
                  </ul>
                  <a
                    href="https://www.tillerhq.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400"
                  >
                    Visit Tiller
                  </a>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Cost Example:</h4>
                <p className="text-blue-800">
                  For someone with 2 bank accounts: SheetLink costs $2-4/month ($24-48/year) on Basic vs Tiller at $79/year.
                  However, Tiller includes unlimited history while SheetLink Basic caps at 90 days.
                  For full 24-month history, SheetLink Pro would be $20/month ($240/year), making Tiller more economical for users needing extensive history.
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
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want the Cheapest Option</h3>
                  <p className="text-gray-700">
                    SheetLink's free tier (7 days of history) is perfect for weekly budget tracking. Even the paid plans start at just $2/month for Basic, making it 3x cheaper than Tiller for most users. If you only need recent transactions and don't require years of history, SheetLink offers unbeatable value.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">Business Bookkeeping Use Cases</h3>
                  <p className="text-gray-700">
                    SheetLink is designed for both personal and business use. Freelancers, solopreneurs, and small business owners use SheetLink to track business expenses, categorize transactions, and build P&L statements in Google Sheets. It's a simpler, more affordable alternative to QuickBooks for basic bookkeeping.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Value Privacy and Open Source</h3>
                  <p className="text-gray-700">
                    SheetLink is open source - you can audit the code yourself on GitHub. The extension doesn't track you or sell your data. Your transaction data goes directly from Plaid to your Google Sheet, with no intermediate storage on SheetLink servers. Built by developers who care about privacy, not venture capital growth targets.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want to Test Before Committing</h3>
                  <p className="text-gray-700">
                    The free tier lets you test SheetLink with real bank data before spending a dime. Connect your banks, sync the last 7 days of transactions, and see if it meets your needs. No credit card required, no time limits on the free tier.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* When to Choose Tiller */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                When to Choose Tiller Money
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Need Microsoft Excel Support</h3>
                  <p className="text-gray-700">
                    If you live in Excel and can't switch to Google Sheets, Tiller is your only option. SheetLink currently only supports Google Sheets. Tiller works with both Google Sheets and Excel, giving you flexibility in your spreadsheet platform.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Want Mature, Pre-Built Templates</h3>
                  <p className="text-gray-700">
                    Tiller has been around since 2014 and offers an extensive library of professionally designed templates for budgeting, net worth tracking, debt payoff, and more. Their Tiller Money Feeds and Foundation Template are polished and well-documented. SheetLink's Recipes library is growing but not as comprehensive yet.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Need Unlimited Transaction History</h3>
                  <p className="text-gray-700">
                    Tiller includes unlimited transaction history in their $79/year plan. If you need to analyze years of spending patterns or do year-over-year comparisons, Tiller's unlimited history is more cost-effective than SheetLink Pro (which caps at 24 months and costs more for multiple accounts).
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Prefer an Established Service</h3>
                  <p className="text-gray-700">
                    Tiller has been operating for 8+ years with a proven track record, active community forums, and established customer support. SheetLink is newer and still building out features. If you value stability and a mature product over cutting-edge pricing, Tiller is the safer bet.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Migration Guide */}
          <section className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                How to Switch from Tiller to SheetLink
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Export Your Historical Data from Tiller</h3>
                      <p className="text-gray-700">
                        Download your transaction history from Tiller as a CSV or copy the data from your Tiller Google Sheet. This preserves your historical transactions for analysis or tax purposes.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Install SheetLink Chrome Extension</h3>
                      <p className="text-gray-700">
                        Add SheetLink to Chrome from the Chrome Web Store. The extension is free to install and includes the free tier (7 days of history) so you can test it alongside Tiller before fully switching.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Connect Your Banks via Plaid</h3>
                      <p className="text-gray-700">
                        Both Tiller and SheetLink use Plaid, so your banks are already compatible. Use SheetLink to reconnect your bank accounts. You'll go through Plaid's secure authentication flow again (this is normal - credentials can't be transferred between services).
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Set Up Your Google Sheet</h3>
                      <p className="text-gray-700">
                        Create a new Google Sheet or use your existing Tiller sheet. SheetLink will write transactions to tabs you specify. You can import your historical Tiller data into the same sheet and combine it with new SheetLink transactions.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Test for 30 Days, Then Cancel Tiller</h3>
                      <p className="text-gray-700">
                        Run both services in parallel for a few weeks to ensure SheetLink meets your needs. Once you're confident, cancel your Tiller subscription. You'll save $60+/year while keeping the same Plaid-powered bank connectivity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Note on Templates:</h4>
                <p className="text-yellow-800">
                  Tiller's templates won't automatically work with SheetLink because they reference Tiller-specific sheet names and formulas.
                  You'll need to adapt your formulas to point to SheetLink's transaction tabs, or explore SheetLink's Recipes for pre-built templates.
                  This is the biggest friction point when switching.
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
                    What is the main difference between SheetLink and Tiller Money?
                  </h3>
                  <p className="text-gray-700">
                    The main differences are pricing and flexibility. SheetLink costs $2-10/month with a free tier (7 days of history), while Tiller costs $79/year ($6.58/month) with no free option. SheetLink is better for business bookkeeping use cases, while Tiller focuses primarily on personal finance with pre-built templates.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Is SheetLink cheaper than Tiller?
                  </h3>
                  <p className="text-gray-700">
                    Yes. SheetLink's Basic plan costs $1.99/month ($0.99/month annual) for 90 days of history, compared to Tiller's $79/year ($6.58/month). SheetLink also has a free tier that Tiller doesn't offer. For most users, SheetLink is 3-7x cheaper than Tiller.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Does SheetLink work with Excel like Tiller?
                  </h3>
                  <p className="text-gray-700">
                    No. SheetLink currently only works with Google Sheets, while Tiller supports both Google Sheets and Microsoft Excel. If you need Excel support, Tiller is the better choice. However, SheetLink's Google Sheets-only approach allows for better integration and features specific to Sheets.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Can I migrate from Tiller to SheetLink?
                  </h3>
                  <p className="text-gray-700">
                    Yes. Both services use Plaid for bank connectivity, so you can easily switch. Export your historical data from Tiller, connect your banks to SheetLink, and your transaction syncing will continue in your Google Sheets. SheetLink's free tier lets you test the service before canceling Tiller.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="px-4 py-16 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Try SheetLink Free Today
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Start with our free tier - no credit card required. Sync the last 7 days of transactions and see if SheetLink is right for you.
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
