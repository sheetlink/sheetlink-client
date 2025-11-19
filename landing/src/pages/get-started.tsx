'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function GetStarted() {
  const seoTitle = `Get Started - ${BRAND.name}`;
  const seoDescription = 'Install the SheetLink Chrome extension and start syncing your bank transactions to Google Sheets.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="noindex" />
      </Head>

      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-sheetlink-bg to-white px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-5xl font-bold text-sheetlink-text md:text-6xl"
            >
              Welcome to the SheetLink Beta
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-700"
            >
              You're early — thanks for helping shape the future of personal finance.
              This beta lets you sync Plaid Sandbox data directly into Google Sheets using our unreleased Chrome extension.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-gray-600"
            >
              Before we launch publicly, we want your feedback on ease-of-use and functionality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="https://github.com/sheetlink/sheetlink-client/releases/download/v0.3.0-beta/sheetlink-extension-v0.3.0-beta.zip"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Beta Extension (v0.3.0)
              </a>
            </motion.div>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              Installation Guide
            </h2>

            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 flex flex-col gap-8 md:flex-row"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                1
              </div>
              <div className="flex-1">
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Download the Extension
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Download the ZIP file and unzip it to your computer. You'll get a folder called <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">sheetlink-extension-v0.3.0-beta</code>.
                </p>
                <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-600">
                    <strong className="text-sheetlink-text">Note:</strong> This is a manual installation because SheetLink isn't on the Chrome Web Store yet. We're working on getting it listed soon!
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16 flex flex-col gap-8 md:flex-row"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                2
              </div>
              <div className="flex-1">
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Load It in Chrome
                </h3>
                <ol className="mb-4 list-inside space-y-3 text-lg text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">1.</span>
                    <span>Open Chrome and go to <code className="rounded bg-gray-100 px-2 py-1 font-mono text-sm">chrome://extensions</code></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">2.</span>
                    <span>Toggle <strong>Developer Mode</strong> on (top right corner)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">3.</span>
                    <span>Click <strong>Load unpacked</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">4.</span>
                    <span>Select the unzipped folder</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">5.</span>
                    <span>You should now see SheetLink in your extension list!</span>
                  </li>
                </ol>
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Tip:</strong> Pin the SheetLink extension to your toolbar for easy access. Click the puzzle piece icon in Chrome and pin SheetLink.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16 flex flex-col gap-8 md:flex-row"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                3
              </div>
              <div className="flex-1">
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Connect to Plaid Sandbox
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Click the SheetLink extension icon in your toolbar, then click <strong>Connect Bank</strong>.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  When Plaid Link opens, choose any <strong>Sandbox Institution</strong> and use these test credentials:
                </p>
                <div className="mb-4 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-bg p-6">
                  <div className="mb-3 grid grid-cols-2 gap-4">
                    <div>
                      <p className="mb-1 text-sm font-semibold text-gray-600">Username</p>
                      <code className="block rounded bg-white px-3 py-2 font-mono text-lg">user_good</code>
                    </div>
                    <div>
                      <p className="mb-1 text-sm font-semibold text-gray-600">Password</p>
                      <code className="block rounded bg-white px-3 py-2 font-mono text-lg">pass_good</code>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600">
                    <strong>Note:</strong> This is test data from Plaid's Sandbox environment. No real banking credentials are used.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 4 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-16 flex flex-col gap-8 md:flex-row"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                4
              </div>
              <div className="flex-1">
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Sync to Google Sheets
                </h3>
                <ol className="mb-4 list-inside space-y-3 text-lg text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">1.</span>
                    <span>Open a new Google Sheet (or use an existing one)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">2.</span>
                    <span>Click the SheetLink extension icon</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">3.</span>
                    <span>Choose <strong>Sync Transactions</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">4.</span>
                    <span>Your transactions will populate automatically!</span>
                  </li>
                </ol>
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-green-900">
                    <strong>Success!</strong> You're now syncing transactions to your sheet. Try adding more accounts or exploring the data.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Beta Status Notice */}
        <section className="bg-blue-50 px-4 py-12">
          <div className="mx-auto max-w-4xl">
            <div className="rounded-lg border-2 border-blue-300 bg-white p-8">
              <div className="mb-4 flex items-center gap-3">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-2xl font-bold text-blue-900">Beta Status</h3>
              </div>
              <p className="mb-3 text-lg text-blue-900">
                SheetLink is currently in a <strong>private beta</strong>.
              </p>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Production bank connections via Plaid are pending approval</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Currently only Sandbox test data is available</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600">•</span>
                  <span>Expect active updates over the next few weeks</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">
              Your Feedback Matters
            </h2>
            <p className="mb-8 text-xl text-gray-700">
              Tell us what's working, what's confusing, and what features you want.
              <br />
              Email us anytime.
            </p>
            <a
              href="mailto:support@sheetlink.app?subject=Beta Feedback"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-700 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Feedback
            </a>
          </div>
        </section>

        {/* Roadmap Preview */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              Coming Soon
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-green-900 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Chrome Web Store</h3>
                <p className="text-gray-600">
                  One-click installation from the official Chrome Web Store
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Real Bank Support</h3>
                <p className="text-gray-600">
                  Connect your actual bank accounts with Plaid Production
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-accent text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Smart Categories</h3>
                <p className="text-gray-600">
                  Automated transaction categorization and custom rules
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
