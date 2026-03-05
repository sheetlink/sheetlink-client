import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedPages from '@/components/RelatedPages';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartRelatedPages from '@/components/SmartRelatedPages';

export default function PocketGuardPricing2026() {
  const seoTitle = 'PocketGuard Pricing 2026: Free or $12.99/Month for Plus Features';
  const seoDescription = 'Complete PocketGuard pricing breakdown for 2026. Free plan available, PocketGuard Plus at $12.99/month or $74.99/year. Compare with SheetLink\'s $39.99/year alternative.';
  const slug = '/pocketguard-pricing-2026';

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={`https://sheetlink.app${slug}`}
        keywords="pocketguard pricing, pocketguard cost 2026, pocketguard plus price, pocketguard subscription"
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
          { name: 'Pricing', url: 'https://sheetlink.app/pricing' },
          { name: 'PocketGuard Pricing 2026', url: `https://sheetlink.app${slug}` }
        ]}
      />

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <Breadcrumbs category="pricing" pageTitle="PocketGuard Pricing 2026" />

          <h1 className="mb-6 text-5xl font-bold text-sheetlink-text">
            PocketGuard Pricing 2026
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              PocketGuard offers a <strong>free plan</strong> with basic budgeting features, and <strong>PocketGuard Plus</strong> at
              <strong> $12.99/month</strong> or <strong>$74.99/year</strong> ($6.25/month) for advanced features
              like unlimited custom categories and debt payoff tools.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              PocketGuard Pricing Breakdown
            </h2>

            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Plan</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Price</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Features</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Free</td>
                    <td className="px-6 py-4">$0</td>
                    <td className="px-6 py-4">Basic budgeting, 2 custom categories, bill tracking</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Plus (Monthly)</td>
                    <td className="px-6 py-4">$12.99/month</td>
                    <td className="px-6 py-4">All features, unlimited categories</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Plus (Annual)</td>
                    <td className="px-6 py-4">$74.99/year ($6.25/mo)</td>
                    <td className="px-6 py-4">Best value - 4 months free</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What's Included in PocketGuard Free?
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Bank Account Sync</strong> - Connect up to 3 accounts via Plaid</li>
              <li><strong>"In My Pocket" View</strong> - Shows spending money after bills and savings</li>
              <li><strong>Bill Tracking</strong> - Alerts for upcoming bills</li>
              <li><strong>2 Custom Categories</strong> - Limited categorization</li>
              <li><strong>Spending Insights</strong> - Basic reports and trends</li>
            </ul>

            <div className="my-8 rounded-lg border-2 border-yellow-300 bg-yellow-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                Free Plan Limitations
              </h3>
              <p className="text-gray-700">
                The free plan only allows 3 connected accounts and 2 custom spending categories. If you have
                multiple bank accounts, credit cards, or want detailed categorization, you'll need Plus.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What's Included in PocketGuard Plus?
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Unlimited Accounts</strong> - Connect all your banks, credit cards, and investments</li>
              <li><strong>Unlimited Custom Categories</strong> - Create as many spending categories as you need</li>
              <li><strong>Debt Payoff Plan</strong> - Track loans and create payoff strategies</li>
              <li><strong>Export Data</strong> - Download transactions as CSV for tax prep</li>
              <li><strong>Cashback Finder</strong> - Identify recurring subscriptions and find savings</li>
              <li><strong>Priority Support</strong> - Faster customer service response</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              PocketGuard vs SheetLink Pricing
            </h2>
            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">PocketGuard</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">SheetLink</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Annual Price (Paid)</td>
                    <td className="px-6 py-4">$74.99/year</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">$39.99/year</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Free Tier</td>
                    <td className="px-6 py-4">3 accounts, 2 categories</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Last 7 days, unlimited accounts</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Bank Sync</td>
                    <td className="px-6 py-4">Automatic (daily)</td>
                    <td className="px-6 py-4">Manual click (privacy-first)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Platform</td>
                    <td className="px-6 py-4">Mobile app (iOS/Android)</td>
                    <td className="px-6 py-4">Google Sheets (desktop/mobile)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Customization</td>
                    <td className="px-6 py-4">Pre-set categories</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Fully customizable sheets</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Data Export</td>
                    <td className="px-6 py-4">CSV (Plus only)</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Native in Sheets</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Is PocketGuard Plus Worth $74.99/Year?
            </h2>
            <p>
              PocketGuard Plus is worth it if you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Want a simple mobile-first budgeting app</li>
              <li>Like the "In My Pocket" spending concept</li>
              <li>Need built-in debt payoff tracking</li>
              <li>Have more than 3 accounts to track</li>
              <li>Prefer automatic daily syncing</li>
            </ul>

            <p className="mt-6">
              <strong>SheetLink is a better choice if you:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Want to save 47% ($39.99/year vs $74.99/year)</li>
              <li>Prefer working in Google Sheets with full flexibility</li>
              <li>Already have your own budgeting system</li>
              <li>Need a free tier with unlimited accounts (last 7 days)</li>
              <li>Value privacy-first manual sync over automatic connections</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              PocketGuard Limitations to Consider
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Mobile-only focus</strong> - Limited desktop web experience
              </li>
              <li>
                <strong>No joint accounts</strong> - Each person needs their own account
              </li>
              <li>
                <strong>Limited historical data</strong> - Only syncs recent transactions
              </li>
              <li>
                <strong>Account limits on free</strong> - Only 3 connected accounts on free tier
              </li>
              <li>
                <strong>No spreadsheet export on free</strong> - CSV export requires Plus
              </li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              PocketGuard Alternatives
            </h2>
            <p>
              If PocketGuard doesn't fit your needs, consider:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>SheetLink</strong> - $39.99/year, Google Sheets-based, privacy-first
              </li>
              <li>
                <strong>YNAB</strong> - $109/year, zero-based budgeting methodology
              </li>
              <li>
                <strong>Monarch Money</strong> - $99/year, family-friendly with investment tracking
              </li>
              <li>
                <strong>Copilot</strong> - $72/year (iOS only), beautiful design
              </li>
              <li>
                <strong>Simplifi by Quicken</strong> - $47.88/year, simpler than full Quicken
              </li>
            </ul>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">
                Save 47% with SheetLink
              </h2>
              <p className="mb-4 text-gray-600">
                Get Plaid-powered bank sync to Google Sheets for $39.99/year - nearly half the cost of
                PocketGuard Plus. Free forever for the last 7 days of transactions.
              </p>
              <div className="flex gap-4">
                <a
                  href="/pricing"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  View SheetLink Pricing
                </a>
                <a
                  href="/pocketguard-alternative"
                  className="inline-flex items-center rounded-lg border-2 border-sheetlink-green-700 px-6 py-3 font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-50"
                >
                  PocketGuard Alternative
                </a>
              </div>
            </div>

            <RelatedPages currentSlug="/pocketguard-pricing-2026" />
            <SmartRelatedPages currentSlug="/pocketguard-pricing-2026" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
