import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BRAND } from '@/lib/constants';

export default function Comparisons() {
  const seoTitle = 'SheetLink vs Competitors - Compare Financial Tools';
  const seoDescription = 'Compare SheetLink with Tiller Money, YNAB, QuickBooks, Mint, and Copilot. Find the best bank sync and budgeting solution for your needs.';

  const comparisons = [
    {
      title: 'SheetLink vs Tiller Money',
      slug: '/sheetlink-vs-tiller',
      description: 'Both sync bank transactions to Google Sheets using Plaid. Compare pricing, features, and ideal use cases.',
      competitor: 'Tiller Money',
      icon: '📊',
      highlight: 'Direct competitor - both sync to Sheets'
    },
    {
      title: 'SheetLink vs YNAB',
      slug: '/sheetlink-vs-ynab',
      description: 'YNAB is a budgeting app with zero-based methodology. SheetLink uses spreadsheet flexibility.',
      competitor: 'YNAB',
      icon: '💰',
      highlight: 'Spreadsheet flexibility vs structured budgeting'
    },
    {
      title: 'SheetLink vs QuickBooks',
      slug: '/sheetlink-vs-quickbooks',
      description: 'QuickBooks is full accounting software. SheetLink is simple bookkeeping for freelancers and small businesses.',
      competitor: 'QuickBooks',
      icon: '📗',
      highlight: 'Simple bookkeeping vs professional accounting'
    },
    {
      title: 'SheetLink vs Mint',
      slug: '/sheetlink-vs-mint',
      description: 'Mint shut down in January 2024. SheetLink offers a spreadsheet-based alternative with data ownership.',
      competitor: 'Mint (Discontinued)',
      icon: '🏦',
      highlight: 'Mint shut down - need replacement'
    },
    {
      title: 'SheetLink vs Copilot',
      slug: '/sheetlink-vs-copilot',
      description: 'Copilot is iOS-only with beautiful UI. SheetLink is cross-platform with spreadsheet power.',
      competitor: 'Copilot',
      icon: '📱',
      highlight: 'Cross-platform vs iOS-only'
    }
  ];

  const alternatives = [
    {
      title: 'Mint Alternative',
      slug: '/mint-alternative',
      description: 'Mint shut down in January 2024. Discover why SheetLink is the best spreadsheet-based replacement.',
      badge: 'URGENT',
      icon: '🚨'
    },
    {
      title: 'Tiller Alternative',
      slug: '/tiller-alternative',
      description: 'Looking for a more affordable alternative to Tiller Money? Compare features and pricing.',
      badge: 'POPULAR',
      icon: '⭐'
    },
    {
      title: 'YNAB Alternative',
      slug: '/ynab-alternative',
      description: 'Need a less expensive budgeting solution? SheetLink offers spreadsheet flexibility at a fraction of the cost.',
      badge: 'SAVE $$',
      icon: '💸'
    }
  ];

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold text-sheetlink-text">
              SheetLink vs Competitors
            </h1>
            <p className="mx-auto max-w-3xl text-xl text-gray-600">
              Compare SheetLink with popular budgeting and bookkeeping tools. Find the right solution for your financial tracking needs.
            </p>
          </div>

          {/* Direct Comparisons */}
          <div className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-sheetlink-text">Direct Comparisons</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {comparisons.map((comparison) => (
                <Link
                  key={comparison.slug}
                  href={comparison.slug}
                  className="group rounded-lg border-2 border-gray-200 bg-white p-6 transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-lg"
                >
                  <div className="mb-4 text-4xl">{comparison.icon}</div>
                  <h3 className="mb-3 text-xl font-bold text-sheetlink-text group-hover:text-sheetlink-green-700">
                    {comparison.title}
                  </h3>
                  <p className="mb-4 text-gray-600">
                    {comparison.description}
                  </p>
                  <p className="text-sm font-semibold text-sheetlink-green-700">
                    {comparison.highlight}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Alternative Pages */}
          <div className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-sheetlink-text">Looking for Alternatives?</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {alternatives.map((alt) => (
                <Link
                  key={alt.slug}
                  href={alt.slug}
                  className="group rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-4xl">{alt.icon}</div>
                    <span className="rounded-full bg-sheetlink-green-700 px-3 py-1 text-xs font-bold text-white">
                      {alt.badge}
                    </span>
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-sheetlink-text group-hover:text-sheetlink-green-700">
                    {alt.title}
                  </h3>
                  <p className="text-gray-600">
                    {alt.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>

          {/* Comparison Summary Table */}
          <div className="mb-16">
            <h2 className="mb-8 text-3xl font-bold text-sheetlink-text">Quick Comparison</h2>
            <div className="overflow-x-auto rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">SheetLink</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Tiller</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">YNAB</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">QuickBooks</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Platform</td>
                    <td className="px-6 py-4">Google Sheets</td>
                    <td className="px-6 py-4">Google Sheets / Excel</td>
                    <td className="px-6 py-4">Web & Mobile App</td>
                    <td className="px-6 py-4">Web & Desktop</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Free Tier</td>
                    <td className="px-6 py-4">✅ 7 days</td>
                    <td className="px-6 py-4">❌ None</td>
                    <td className="px-6 py-4">❌ None</td>
                    <td className="px-6 py-4">❌ None</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Best For</td>
                    <td className="px-6 py-4">Freelancers, Side Hustles</td>
                    <td className="px-6 py-4">Personal Finance</td>
                    <td className="px-6 py-4">Zero-Based Budgeting</td>
                    <td className="px-6 py-4">Professional Accounting</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Customization</td>
                    <td className="px-6 py-4">✅ Full spreadsheet power</td>
                    <td className="px-6 py-4">✅ Full spreadsheet power</td>
                    <td className="px-6 py-4">⚠️ Limited to app features</td>
                    <td className="px-6 py-4">⚠️ Limited to app features</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
            <p className="text-lg font-semibold text-sheetlink-text">
              Ready to try SheetLink?
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Free forever for the last 7 days of transactions. No credit card required.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
            >
              Add to Chrome - Start Free
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
