import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { RefreshCw, FlaskConical } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function Sandbox() {
  const seoTitle = `Sandbox Setup Guide - ${BRAND.name}`;
  const seoDescription = 'Connect to the Plaid Sandbox with SheetLink in under two minutes.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          {/* Hero */}
          <div className="mb-12">
            <h1 className="mb-4 text-5xl font-bold text-sheetlink-text md:text-6xl">
              Sandbox Setup Guide
            </h1>
            <p className="text-xl leading-relaxed text-gray-600">
              Connect to the Plaid Sandbox in under two minutes.
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-600">
            {/* Step-by-Step Walkthrough */}
            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Step-by-Step Walkthrough
            </h2>

            <div className="not-prose my-8 space-y-6">
              <div className="flex gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Install the Extension
                  </h3>
                  <p className="text-gray-600">
                    Add the SheetLink Chrome extension from the Chrome Web Store. Click the
                    SheetLink icon in your browser toolbar to open the popup.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Click "Connect to Sandbox"
                  </h3>
                  <p className="text-gray-600">
                    In the extension popup, click "Connect to Sandbox". This will open
                    Plaid Link in a new window.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Select Any Institution
                  </h3>
                  <p className="mb-3 text-gray-600">
                    When Plaid opens, select any institution (for example, Chase or Bank of America).
                    <strong className="block mt-2 text-sheetlink-green-700">You're in Sandbox mode. All data is simulated.</strong>
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Enter Sandbox Credentials
                  </h3>
                  <p className="mb-3 text-gray-600">
                    When prompted for credentials, use:
                  </p>
                  <div className="rounded-lg bg-sheetlink-bg p-4 font-mono text-sm">
                    <div className="mb-2">
                      <strong className="text-sheetlink-text">Username:</strong>{' '}
                      <code className="text-sheetlink-green-700">user_good</code>
                    </div>
                    <div className="mb-2">
                      <strong className="text-sheetlink-text">Password:</strong>{' '}
                      <code className="text-sheetlink-green-700">pass_good</code>
                    </div>
                    <div className="mb-2">
                      <strong className="text-sheetlink-text">Phone:</strong>{' '}
                      <code className="text-sheetlink-green-700">(415) 555-0123</code>
                    </div>
                    <div>
                      <strong className="text-sheetlink-text">Verification Code:</strong>{' '}
                      <code className="text-sheetlink-green-700">123456</code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-bg p-6">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                    Sync Sample Data
                  </h3>
                  <p className="text-gray-600">
                    Once connected, click "Sync Sample Data" to populate your Sheet. You can reset
                    anytime from the options page.
                  </p>
                </div>
              </div>
            </div>

            {/* Screenshot */}
            <motion.div
              className="not-prose my-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2 text-xs text-slate-500">
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-yellow-400" />
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
                  <span className="ml-3">SheetLink Sandbox in Google Sheets</span>
                </div>
                <div className="relative aspect-[16/9] w-full bg-slate-50">
                  <Image
                    src="/screenshots/sandbox-setup.png"
                    alt="SheetLink connected to Plaid Sandbox and syncing transactions into Google Sheets"
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 960px, 100vw"
                    priority
                  />
                </div>
              </div>
              <p className="mt-2 text-sm text-slate-500">
                Real sandbox data flowing from Plaid into Google Sheets with SheetLink. No dashboards, just your spreadsheet.
              </p>
            </motion.div>

            {/* Notes */}
            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Important Notes</h2>
            <div className="not-prose my-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-xl">💡</span>
                  <p className="text-sm text-gray-700">
                    <strong className="text-sheetlink-text">Fake Data:</strong> All transactions in
                    sandbox mode are fake test data from Plaid Sandbox. No real banking information
                    is involved.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <RefreshCw className="h-5 w-5 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-sheetlink-text">Reset Anytime:</strong> You can reset
                    sandbox connections from the extension options page by clicking "Disconnect" and
                    reconnecting.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <FlaskConical className="h-5 w-5 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <p className="text-sm text-gray-700">
                    <strong className="text-sheetlink-text">Testing Only:</strong> Sandbox mode is
                    for testing SheetLink's features before connecting real bank accounts in
                    production.
                  </p>
                </li>
              </ul>
            </div>

            {/* Troubleshooting */}
            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Troubleshooting</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-sheetlink-text">
                  Sandbox toggle not visible?
                </h3>
                <p>
                  Make sure you're using the latest version of the extension. Check the Chrome Web Store for updates.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-sheetlink-text">
                  Plaid Link not opening?
                </h3>
                <p>
                  Make sure you have the latest version of the extension installed. Try reopening the
                  popup and clicking "Connect Account" again. If the issue persists, check the
                  browser console for errors (right-click the extension popup → Inspect).
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-sheetlink-text">
                  Transactions not syncing?
                </h3>
                <p>
                  Ensure you've selected a Google Sheet and granted the extension permission to write
                  to it. Check the extension options page to verify your Sheet ID is set correctly.
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="not-prose mt-16 rounded-xl border-2 border-sheetlink-green-700 bg-sheetlink-bg p-8">
              <div className="text-center">
                <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Ready to Connect Real Banks?
                </h2>
                <p className="mb-6 text-gray-700">
                  Get SheetLink and sync your real bank accounts to Google Sheets. Free forever for the last 7 days of transactions.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <Link
                    href="/beta"
                    className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                  >
                    Get Early Access
                  </Link>
                  <Link
                    href="/privacy"
                    className="inline-flex items-center justify-center rounded-lg border-2 border-sheetlink-green-700 bg-white px-8 py-3 font-semibold text-sheetlink-green-700 transition-all hover:bg-sheetlink-bg"
                  >
                    Read Privacy Policy
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
