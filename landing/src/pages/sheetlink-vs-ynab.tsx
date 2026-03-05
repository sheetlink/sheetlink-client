import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartRelatedPages from '@/components/SmartRelatedPages';
import { BRAND } from '@/lib/constants';

export default function SheetLinkVsYNAB() {
  const seoTitle = "SheetLink vs YNAB - Feature Comparison & Pricing 2026";
  const seoDescription = "Compare SheetLink vs YNAB (You Need A Budget): SheetLink offers privacy-first manual sync with free tier and Pro at $3.99/mo, while YNAB is $14.99/mo with automatic sync and dedicated budgeting methodology.";
  const slug = '/sheetlink-vs-ynab';
  const seoUrl = 'https://sheetlink.app/sheetlink-vs-ynab';

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is the main difference between SheetLink and YNAB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "YNAB is a full-featured budgeting app with automatic sync, mobile apps, and guided Zero-Based Budgeting methodology. SheetLink syncs bank transactions to Google Sheets with manual sync (you control when)—a privacy feature. YNAB costs $14.99/month with automatic sync, while SheetLink offers a free tier and Pro at $3.99/month with manual sync."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink cheaper than YNAB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, significantly. YNAB costs $14.99/month or $109/year. SheetLink offers a free tier (7 days) and Pro at $3.99/month or $39.99/year—almost 4x cheaper monthly and 2.7x cheaper annually than YNAB."
        }
      },
      {
        "@type": "Question",
        "name": "Can SheetLink replace YNAB for budgeting?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "It depends on your needs. YNAB provides a structured budgeting methodology, mobile apps, and pre-built workflows. SheetLink gives you raw transaction data in Google Sheets - you build your own budgets using formulas and spreadsheet features. If you want structure and guidance, choose YNAB. If you want flexibility and lower cost, choose SheetLink."
        }
      },
      {
        "@type": "Question",
        "name": "Does SheetLink have mobile apps like YNAB?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. SheetLink is a Chrome extension that syncs bank data to Google Sheets. You access your data through Google Sheets (which has mobile apps). YNAB has dedicated iOS and Android apps with budgeting features built in. If mobile-first budgeting is important, YNAB is better suited."
        }
      }
    ]
  };

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`https://sheetlink.app${slug}`}
        keywords="ynab alternative, sheetlink vs ynab, you need a budget alternative, ynab competitor, budget app google sheets, ynab pricing"
      />

      <StructuredData
        type="article"
        headline={seoTitle}
        description={seoDescription}
        url={`https://sheetlink.app${slug}`}
        datePublished="2026-03-05T00:00:00Z"
      />

      <StructuredData
        type="breadcrumb"
        items={[
          { name: 'Home', url: 'https://sheetlink.app' },
          { name: 'Comparisons', url: 'https://sheetlink.app/' },
          { name: 'SheetLink vs YNAB (You Need A Budget)', url: `https://sheetlink.app${slug}` }
        ]}
      />

      <div className="min-h-screen bg-white">
        <Header />

        <main className="pt-24 pb-16">
          {/* Hero Section */}
          <section className="px-4 py-16 bg-gradient-to-b from-sheetlink-green-700/5 to-white">
            <div className="mx-auto max-w-4xl">
              <Breadcrumbs category="comparison" pageTitle="SheetLink vs YNAB" />

              <div className="text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-sheetlink-text mb-6">
                  SheetLink vs YNAB (You Need A Budget)
                </h1>
              <p className="text-xl text-gray-600 mb-8">
                YNAB is a full budgeting app with automatic sync, methodology, and mobile apps ($14.99/month). SheetLink offers manual sync (privacy-first) to Google Sheets ($3.99/month Pro). Choose structure or flexibility.
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
                      <span>You want manual sync for privacy (you control when)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want maximum flexibility with spreadsheets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You prefer to save 70% on cost ($3.99 vs $14.99/mo)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You need business bookkeeping, not just budgets</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You're comfortable building your own formulas</span>
                    </li>
                  </ul>
                </div>

                <div className="p-6 border-2 border-gray-300 rounded-lg">
                  <h3 className="text-2xl font-bold text-gray-700 mb-4">Choose YNAB if...</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You prefer automatic daily sync (background access)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want a guided budgeting methodology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You need native mobile apps (iOS/Android)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You prefer a polished, dedicated budgeting UI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>You want goal tracking and reports built-in</span>
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
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">YNAB</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Price</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">Free or $3.99/mo ($39.99/year)</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">$14.99/month or $109/year</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Sync Method</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5"><strong className="text-sheetlink-green-700">Manual (you control)</strong></td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Automatic (daily)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Free Tier</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">7 days history</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">34-day trial</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Platform</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Chrome Extension + Google Sheets</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Web + iOS + Android</td>
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
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Budgeting Methodology</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">DIY in Google Sheets</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Zero-based budgeting (4 rules)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Mobile Apps</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="text-gray-600">Google Sheets app</span>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Native iOS/Android</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Goal Tracking</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Build your own with formulas</td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Built-in goals</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Reports & Analytics</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Build custom charts/pivots in Sheets</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Pre-built spending reports</td>
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
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Spreadsheet Flexibility</td>
                      <td className="px-6 py-4 text-center text-sm bg-sheetlink-green-700/5">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sheetlink-green-700 text-white">✓</span>
                        <div className="text-xs text-gray-600 mt-1">Full control</div>
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-300 text-gray-600">✗</span>
                        <div className="text-xs text-gray-600 mt-1">App-only</div>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Learning Curve</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Moderate (need Sheets knowledge)</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Low (guided workflow)</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">Customer Support</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 bg-sheetlink-green-700/5">Email support</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700">Email + extensive docs + community</td>
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
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">Free<span className="text-xl text-gray-600"> + $3.99/mo</span></div>
                    <p className="text-gray-600">Start free, upgrade for extended history</p>
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
                      <span><strong>Pro:</strong> $3.99/mo or $39.99/year</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Manual sync (you control when)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-sheetlink-green-700 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Privacy-first: no background access</span>
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
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">YNAB</h3>
                  <div className="mb-6">
                    <div className="text-4xl font-bold text-sheetlink-text mb-2">$14.99<span className="text-xl text-gray-600">/month</span></div>
                    <p className="text-gray-600">Or $109/year ($9.08/month)</p>
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
                      <span>Full mobile and web access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>34-day free trial (no credit card)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="w-6 h-6 text-gray-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Free for college students (1 year)</span>
                    </li>
                  </ul>
                  <a
                    href="https://www.ynab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-center rounded-lg border-2 border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition-all duration-200 hover:border-gray-400"
                  >
                    Visit YNAB
                  </a>
                </div>
              </div>

              <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">Why Manual Sync?</h4>
                <p className="text-blue-800">
                  SheetLink's manual sync is a privacy feature, not a limitation. You click "Sync" when you want to update transactions—no background access to your accounts. Perfect for users who review finances weekly or monthly and value control over convenience. YNAB's automatic sync is convenient but requires persistent account access.
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
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want Spreadsheet Power and Flexibility</h3>
                  <p className="text-gray-700">
                    With SheetLink, your financial data lives in Google Sheets - giving you unlimited flexibility. Build custom charts, pivot tables, forecasting models, or complex analyses that no budgeting app can match. Perfect for power users, data analysts, or anyone who wants complete control over their financial tracking.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Need Business Bookkeeping, Not Just Budgets</h3>
                  <p className="text-gray-700">
                    YNAB is designed exclusively for personal budgeting. SheetLink works for both personal finance and business use cases. Freelancers, contractors, and small business owners use SheetLink to track business expenses, build P&L statements, and categorize transactions for tax time - all in Google Sheets.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Want Manual Sync for Privacy</h3>
                  <p className="text-gray-700">
                    SheetLink syncs only when YOU click sync—no background access to your accounts. This privacy-first approach is perfect for users who review finances weekly or monthly and don't need daily automatic updates. You control when your financial data is accessed. SheetLink also costs 70% less: $3.99/mo vs YNAB's $14.99/mo.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h3 className="text-xl font-semibold text-sheetlink-green-700 mb-3">You Already Know Google Sheets</h3>
                  <p className="text-gray-700">
                    If you're comfortable with spreadsheets, SheetLink feels natural. You already know how to sort, filter, create formulas, and build charts. No need to learn a new budgeting app's interface or methodology - just use the spreadsheet skills you already have.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* When to Choose YNAB */}
          <section className="px-4 py-16">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                When to Choose YNAB
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Want a Structured Budgeting System</h3>
                  <p className="text-gray-700">
                    YNAB's "Four Rules" methodology is powerful for people who struggle with budgeting. The app guides you through zero-based budgeting, age of money tracking, and goal-based savings. If you need structure and accountability, YNAB's opinionated approach is better than SheetLink's blank-slate flexibility.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Prefer Automatic Daily Sync</h3>
                  <p className="text-gray-700">
                    YNAB syncs transactions automatically every day without you clicking anything. If you want transactions updated in the background and don't mind granting ongoing access to your accounts, YNAB's automatic sync is convenient. SheetLink requires manual sync for privacy—you click to update.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Need Mobile Apps with Real-Time Updates</h3>
                  <p className="text-gray-700">
                    YNAB has excellent iOS and Android apps that sync in real-time. Enter transactions on your phone while shopping, check budget categories at the register, and see your budget update instantly across devices. While Google Sheets has mobile apps, YNAB's are purpose-built for budgeting and offer a superior mobile experience.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Don't Want to Build Your Own Budget</h3>
                  <p className="text-gray-700">
                    SheetLink gives you transaction data - you build everything else. YNAB gives you a complete budgeting system out of the box: pre-built category structures, automatic rollover between months, goal tracking, and spending reports. If you'd rather use a finished product than DIY in spreadsheets, YNAB saves setup time.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border-2 border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-700 mb-3">You Want World-Class Support and Community</h3>
                  <p className="text-gray-700">
                    YNAB has extensive documentation, video tutorials, workshops, and an active user community. Their customer support is highly rated. YNAB also offers free workshops to help you master their methodology. SheetLink is newer with smaller community and support resources.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Migration Guide */}
          <section className="px-4 py-16 bg-gray-50">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl font-bold text-sheetlink-text mb-8">
                How to Switch from YNAB to SheetLink
              </h2>
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-sheetlink-green-700 text-white rounded-full flex items-center justify-center font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Export Your YNAB Transaction History</h3>
                      <p className="text-gray-700">
                        In YNAB, go to your budget and export transactions as CSV. This preserves your historical spending data, categories, and memos. You can import this into Google Sheets to maintain historical continuity.
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
                        Add SheetLink from the Chrome Web Store. Use the free tier (7 days of transactions) to test it alongside YNAB before canceling your subscription. Connect your banks via Plaid - the same service YNAB uses.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Build Your Budget in Google Sheets</h3>
                      <p className="text-gray-700">
                        Create a Google Sheet with your budget categories. SheetLink syncs transaction data to dedicated tabs. Use formulas like SUMIFS to categorize spending, pivot tables for reports, and charts for visualization. Check SheetLink's Recipes for pre-built templates.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Recreate Your YNAB Workflow</h3>
                      <p className="text-gray-700">
                        Manually recreate your budget categories and spending limits in Sheets. You'll lose YNAB's automatic rollover, goal tracking, and age-of-money features - these need to be rebuilt with formulas. This is the biggest friction point when switching.
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
                      <h3 className="text-lg font-semibold text-sheetlink-text mb-2">Cancel YNAB and Save $100+/Year</h3>
                      <p className="text-gray-700">
                        Once your SheetLink budget is working, cancel your YNAB subscription. You'll save $85-100+/year depending on your plan. Keep your YNAB export for reference, but your new transactions will flow through SheetLink.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-lg border border-yellow-200">
                <h4 className="font-semibold text-yellow-900 mb-2">Important Note:</h4>
                <p className="text-yellow-800">
                  YNAB's methodology (Four Rules, goal tracking, age of money) won't transfer to SheetLink. You'll need to rebuild these workflows manually in Google Sheets using formulas.
                  If you heavily rely on YNAB's structured approach, the transition will require significant setup work.
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
                    What is the main difference between SheetLink and YNAB?
                  </h3>
                  <p className="text-gray-700">
                    YNAB is a full-featured budgeting app with its own methodology, mobile apps, and guided approach. SheetLink syncs bank transactions to Google Sheets, giving you spreadsheet flexibility to build your own budgets and analyses. YNAB costs $14.99/month, while SheetLink has a free tier or $3.99/month for Pro.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Is SheetLink cheaper than YNAB?
                  </h3>
                  <p className="text-gray-700">
                    Yes, significantly. YNAB costs $14.99/month or $109/year. SheetLink has a free tier (7 days history) or $3.99/month ($39.99/year) for unlimited history. For most users, SheetLink is 73-100% cheaper than YNAB.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Can SheetLink replace YNAB for budgeting?
                  </h3>
                  <p className="text-gray-700">
                    It depends on your needs. YNAB provides a structured budgeting methodology, mobile apps, and pre-built workflows. SheetLink gives you raw transaction data in Google Sheets - you build your own budgets using formulas and spreadsheet features. If you want structure and guidance, choose YNAB. If you want flexibility and lower cost, choose SheetLink.
                  </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="text-lg font-semibold text-sheetlink-text mb-3">
                    Does SheetLink have mobile apps like YNAB?
                  </h3>
                  <p className="text-gray-700">
                    No. SheetLink is a Chrome extension that syncs bank data to Google Sheets. You access your data through Google Sheets (which has mobile apps). YNAB has dedicated iOS and Android apps with budgeting features built in. If mobile-first budgeting is important, YNAB is better suited.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Final CTA */}
          <section className="px-4 py-16 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Save $100+/Year - Try SheetLink Free
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

          <div className="mx-auto max-w-4xl px-4 py-8">
            <SmartRelatedPages currentSlug="/sheetlink-vs-ynab" />
          </div>
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
