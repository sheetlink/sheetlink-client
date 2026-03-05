import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedPages from '@/components/RelatedPages';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartRelatedPages from '@/components/SmartRelatedPages';

export default function YNABPricing2026() {
  const seoTitle = 'YNAB Pricing 2026: $14.99/Month or $109/Year for Budget Software';
  const seoDescription = 'Complete YNAB (You Need A Budget) pricing guide for 2026. $14.99/month or $109/year. Student discount and 34-day trial. Compare with SheetLink\'s $39.99/year alternative.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="ynab pricing, ynab cost 2026, you need a budget price, ynab subscription, ynab annual cost" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <Breadcrumbs category="pricing" pageTitle="YNAB Pricing 2026" />

          <h1 className="mb-6 text-5xl font-bold text-sheetlink-text">
            YNAB Pricing 2026
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              YNAB (You Need A Budget) costs <strong>$14.99/month</strong> or <strong>$109/year</strong> for their budgeting software.
              They offer a 34-day free trial and a student discount ($4.99/month for 1 year).
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              YNAB Pricing Breakdown
            </h2>

            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Plan</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Price</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Free Trial</td>
                    <td className="px-6 py-4">$0 for 34 days</td>
                    <td className="px-6 py-4">Full access, no credit card required</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Monthly Plan</td>
                    <td className="px-6 py-4">$14.99/month</td>
                    <td className="px-6 py-4">Cancel anytime</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Annual Plan</td>
                    <td className="px-6 py-4">$109/year ($9.08/mo)</td>
                    <td className="px-6 py-4">Best value - 2 months free</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4 font-semibold">Student Discount</td>
                    <td className="px-6 py-4">$4.99/month for 1 year</td>
                    <td className="px-6 py-4">College students with .edu email</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              What's Included in YNAB?
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Zero-Based Budgeting</strong> - Assign every dollar a job before you spend it</li>
              <li><strong>Automated Bank Sync</strong> - Direct import from 12,000+ banks via Plaid</li>
              <li><strong>Mobile Apps</strong> - iOS and Android apps with real-time sync</li>
              <li><strong>Goal Tracking</strong> - Set and track savings goals with progress visualization</li>
              <li><strong>Reports & Analytics</strong> - Spending reports, income vs expense trends, net worth</li>
              <li><strong>Multi-Device Sync</strong> - Access your budget from web, mobile, or desktop</li>
              <li><strong>Free Workshops</strong> - Live online classes on budgeting methodology</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              YNAB vs SheetLink Pricing
            </h2>
            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">YNAB</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">SheetLink</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Annual Price</td>
                    <td className="px-6 py-4">$109/year</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">$39.99/year</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Free Tier</td>
                    <td className="px-6 py-4">34-day trial only</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Last 7 days forever</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Bank Sync</td>
                    <td className="px-6 py-4">Automatic (daily)</td>
                    <td className="px-6 py-4">Manual click (privacy-first)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Platform</td>
                    <td className="px-6 py-4">Custom app + mobile</td>
                    <td className="px-6 py-4">Google Sheets (flexible)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Budgeting Method</td>
                    <td className="px-6 py-4">Zero-based (enforced)</td>
                    <td className="px-6 py-4">Your own method</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Customization</td>
                    <td className="px-6 py-4">Limited</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Fully customizable sheets</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Is YNAB Worth $109/Year?
            </h2>
            <p>
              YNAB is worth it if you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Want a structured zero-based budgeting system with guided methodology</li>
              <li>Prefer a polished mobile app with real-time sync</li>
              <li>Need built-in goal tracking and savings features</li>
              <li>Value live workshops and educational content</li>
              <li>Don't mind paying $109/year for budgeting software</li>
            </ul>

            <p className="mt-6">
              <strong>SheetLink is a better choice if you:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Want to save 63% ($39.99/year vs $109/year)</li>
              <li>Already have your own budgeting system or prefer flexibility</li>
              <li>Like working in Google Sheets with full customization</li>
              <li>Need a free tier for basic tracking (last 7 days)</li>
              <li>Prefer privacy-first manual sync over automatic connections</li>
            </ul>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">
                Save 63% with SheetLink
              </h2>
              <p className="mb-4 text-gray-600">
                Get Plaid-powered bank sync to Google Sheets for $39.99/year - less than half the cost of YNAB.
                Free forever for the last 7 days of transactions.
              </p>
              <div className="flex gap-4">
                <a
                  href="/pricing"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  View SheetLink Pricing
                </a>
                <a
                  href="/sheetlink-vs-ynab"
                  className="inline-flex items-center rounded-lg border-2 border-sheetlink-green-700 px-6 py-3 font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-50"
                >
                  Compare SheetLink vs YNAB
                </a>
              </div>
            </div>

            <RelatedPages currentSlug="/ynab-pricing-2026" />
            <SmartRelatedPages currentSlug="/ynab-pricing-2026" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
