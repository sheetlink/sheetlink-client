import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import RelatedPages from '@/components/RelatedPages';
import Breadcrumbs from '@/components/Breadcrumbs';
import SmartRelatedPages from '@/components/SmartRelatedPages';

export default function DoesTillerUsePlaid() {
  const seoTitle = 'Does Tiller Use Plaid? Yes - How Tiller Connects to Banks in 2026';
  const seoDescription = 'Yes, Tiller Money uses Plaid to connect to 10,000+ banks for automated transaction syncing. Learn how it works and compare alternatives.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="does tiller use plaid, tiller bank connection, tiller plaid integration, how tiller works" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <Breadcrumbs category="integration" pageTitle="Does Tiller Use Plaid?" />

          <h1 className="mb-6 text-5xl font-bold text-sheetlink-text">
            Does Tiller Use Plaid?
          </h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 leading-relaxed">
              <strong>Yes, Tiller Money uses Plaid</strong> to connect to banks and financial institutions.
              Plaid provides the secure bank connection infrastructure that allows Tiller to automatically
              sync transactions from 10,000+ banks to your Google Sheets or Excel spreadsheets.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              How Tiller's Plaid Integration Works
            </h2>
            <p>
              When you connect a bank account to Tiller, here's what happens:
            </p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>
                <strong>You enter bank credentials</strong> - Tiller opens Plaid's secure connection flow where you
                log in to your bank
              </li>
              <li>
                <strong>Plaid authenticates with your bank</strong> - Your credentials are sent directly to your
                bank through Plaid's encrypted connection
              </li>
              <li>
                <strong>Plaid retrieves transaction data</strong> - Once authenticated, Plaid pulls your transaction
                history (up to 2 years, depending on the bank)
              </li>
              <li>
                <strong>Tiller syncs to your spreadsheet</strong> - Tiller takes the data from Plaid and writes it
                to your Google Sheets or Excel file daily
              </li>
            </ol>

            <div className="my-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                Why Plaid?
              </h3>
              <p className="text-gray-700">
                Plaid is the industry-standard financial data platform used by Venmo, Cash App, and thousands
                of fintech apps. It provides secure, reliable bank connections without storing your credentials.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Tiller vs SheetLink: Both Use Plaid
            </h2>
            <p>
              Both Tiller Money and SheetLink use Plaid for bank connections, but they differ in how they sync data:
            </p>

            <div className="my-6 overflow-hidden rounded-lg border-2 border-gray-300">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Feature</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">Tiller Money</th>
                    <th className="px-6 py-3 text-left font-semibold text-sheetlink-text">SheetLink</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Bank Connection</td>
                    <td className="px-6 py-4">Plaid (stored credentials)</td>
                    <td className="px-6 py-4">Plaid (no stored credentials)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Sync Method</td>
                    <td className="px-6 py-4">Automatic (daily)</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Manual click (privacy-first)</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Credential Storage</td>
                    <td className="px-6 py-4">Stored on Tiller servers</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Never stored</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Platform</td>
                    <td className="px-6 py-4">Google Sheets + Excel</td>
                    <td className="px-6 py-4">Google Sheets only</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Annual Price</td>
                    <td className="px-6 py-4">$79/year</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">$39.99/year</td>
                  </tr>
                  <tr className="border-t border-gray-300">
                    <td className="px-6 py-4">Free Tier</td>
                    <td className="px-6 py-4">30-day trial only</td>
                    <td className="px-6 py-4 font-semibold text-sheetlink-green-700">Last 7 days forever</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Is Plaid Safe?
            </h2>
            <p>
              Yes, Plaid is safe and trusted by major financial apps. Security features include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Bank-level encryption</strong> - All data is encrypted in transit and at rest</li>
              <li><strong>No credential storage</strong> - Plaid doesn't store your bank username/password</li>
              <li><strong>OAuth support</strong> - Many banks use OAuth instead of credentials</li>
              <li><strong>Read-only access</strong> - Plaid can only read data, never move money</li>
              <li><strong>SOC 2 Type II certified</strong> - Independently audited security standards</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Why SheetLink's Approach is More Private
            </h2>
            <p>
              While both Tiller and SheetLink use Plaid, SheetLink takes a more privacy-focused approach:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>No stored credentials</strong> - SheetLink never stores your Plaid access tokens.
                You connect fresh each time you sync.
              </li>
              <li>
                <strong>Manual sync</strong> - You control when to sync by clicking a button. No automatic
                background connections.
              </li>
              <li>
                <strong>Browser-based</strong> - All syncing happens in your browser via a Chrome extension.
                No server-side credential storage.
              </li>
              <li>
                <strong>Transparent</strong> - SheetLink is open-source. You can see exactly how it works.
              </li>
            </ul>

            <div className="my-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">
                Trade-off: Convenience vs Privacy
              </h3>
              <p className="text-gray-700">
                Tiller's automatic syncing is convenient but requires storing access credentials on their servers.
                SheetLink's manual approach requires one click to sync but never stores your credentials anywhere.
              </p>
            </div>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Other Bank Connection Methods
            </h2>
            <p>
              Besides Plaid, some services use alternative bank connection providers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Yodlee/Envestnet</strong> - Used by Mint, Personal Capital, QuickBooks</li>
              <li><strong>Finicity</strong> - Used by Credit Karma, Rocket Mortgage</li>
              <li><strong>MX</strong> - Used by various credit unions and regional banks</li>
              <li><strong>Akoya</strong> - Newer bank data network owned by major banks</li>
            </ul>
            <p className="mt-4">
              Plaid is the most widely supported and developer-friendly option, which is why most modern
              financial apps (including Tiller and SheetLink) choose it.
            </p>

            <div className="mt-12 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8">
              <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">
                Try Privacy-First Plaid Syncing with SheetLink
              </h2>
              <p className="mb-4 text-gray-600">
                Get the same Plaid-powered bank connections with a privacy-first approach. Manual sync,
                no stored credentials, $39.99/year.
              </p>
              <div className="flex gap-4">
                <a
                  href="/how-it-works"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  See How SheetLink Works
                </a>
                <a
                  href="/sheetlink-vs-tiller"
                  className="inline-flex items-center rounded-lg border-2 border-sheetlink-green-700 px-6 py-3 font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-50"
                >
                  Compare SheetLink vs Tiller
                </a>
              </div>
            </div>

            <RelatedPages currentSlug="/does-tiller-use-plaid" />
            <SmartRelatedPages currentSlug="/does-tiller-use-plaid" />
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
