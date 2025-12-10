'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import { Wrench, RefreshCw, Save } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function UserGuide() {
  const seoTitle = `User Guide - ${BRAND.name}`;
  const seoDescription = 'Learn how to use SheetLink to manage your bank connections, sync transactions, and get the most out of the Free Tier.';

  useEffect(() => {
    analytics.pageView('User Guide', '/user-guide');
  }, []);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-b from-sheetlink-bg to-white px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-5xl font-bold text-sheetlink-text md:text-6xl"
            >
              User Guide
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-gray-700"
            >
              Everything you need to know about using SheetLink on the Free Tier.
            </motion.p>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            {/* Manual Sync */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Manual Sync</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                The Free Tier uses <strong>manual sync</strong>, meaning you control when transactions are fetched and written to your sheet.
              </p>
              <div className="mb-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-3 text-xl font-bold text-sheetlink-text">How to Sync:</h3>
                <ol className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sheetlink-green-700">1.</span>
                    <span>Open the SheetLink extension (click the icon in your Chrome toolbar)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sheetlink-green-700">2.</span>
                    <span>Navigate to the <strong>Home</strong> tab</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sheetlink-green-700">3.</span>
                    <span>Click <strong>"Sync Now"</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="font-bold text-sheetlink-green-700">4.</span>
                    <span>Watch the status messages as SheetLink fetches and writes your data</span>
                  </li>
                </ol>
              </div>
              <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  <strong>Status Messages:</strong>
                </p>
                <ul className="mt-2 space-y-1 text-sm text-blue-800">
                  <li>• <strong>Loading</strong> (blue): Checking data from Plaid</li>
                  <li>• <strong>Success</strong> (green): Sync completed, auto-hides after 5 seconds</li>
                  <li>• <strong>Error</strong> (red): Something went wrong, auto-hides after 8 seconds</li>
                </ul>
              </div>
            </motion.div>

            {/* Extension Tabs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Tabs in the Extension</h2>
              <p className="mb-6 text-lg text-gray-700">
                SheetLink uses a modern 4-tab navigation system. Here's what each tab does:
              </p>

              <div className="space-y-6">
                {/* Home Tab */}
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-900 text-white">
                      🏠
                    </div>
                    <h3 className="text-2xl font-bold text-sheetlink-text">Home Tab</h3>
                  </div>
                  <p className="text-gray-700">
                    Your main sync control panel. Shows connection status for Google, Bank, and Sheet. Click "Sync Now" to fetch the latest 7 days of transactions.
                  </p>
                </div>

                {/* Bank Tab */}
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                      🏦
                    </div>
                    <h3 className="text-2xl font-bold text-sheetlink-text">Bank Tab</h3>
                  </div>
                  <p className="mb-3 text-gray-700">
                    View all connected institutions and their accounts. You can:
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• See account balances and types (checking, savings, credit card)</li>
                    <li>• Update bank connections (if your credentials change)</li>
                    <li>• Add new institutions (unlimited on Free Tier)</li>
                    <li>• Disconnect institutions</li>
                  </ul>
                </div>

                {/* Sheet Tab */}
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white">
                      📊
                    </div>
                    <h3 className="text-2xl font-bold text-sheetlink-text">Sheet Tab</h3>
                  </div>
                  <p className="mb-3 text-gray-700">
                    Manage your connected Google Sheet. Shows:
                  </p>
                  <ul className="space-y-1 text-gray-700">
                    <li>• Current sheet name</li>
                    <li>• Sheet owner</li>
                    <li>• Last write timestamp</li>
                    <li>• Options to change or disconnect sheet</li>
                  </ul>
                </div>

                {/* Settings Tab */}
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-600 text-white">
                      ⚙️
                    </div>
                    <h3 className="text-2xl font-bold text-sheetlink-text">Settings Tab</h3>
                  </div>
                  <p className="text-gray-700">
                    View your Google account info and manage advanced settings. Includes logout option and future Free Tier benefits display.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Free Tier Limits */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Free Tier Limits</h2>
              <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-bg p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div>
                    <div className="mb-2 text-3xl font-bold text-sheetlink-green-900">7 days</div>
                    <p className="text-sm text-gray-700">Transaction history per institution</p>
                  </div>
                  <div>
                    <div className="mb-2 text-3xl font-bold text-sheetlink-green-900">Unlimited</div>
                    <p className="text-sm text-gray-700">Connected institutions</p>
                  </div>
                  <div>
                    <div className="mb-2 text-3xl font-bold text-sheetlink-green-900">Manual</div>
                    <p className="text-sm text-gray-700">Sync only (no auto-sync yet)</p>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                Want more history or auto-sync? Upgrade tiers (Basic/Pro) are coming soon with 90 days or 24 months of history plus advanced features.
              </p>
            </motion.div>

            {/* Error Handling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Error Handling</h2>

              <div className="space-y-6">
                {/* Token Expired */}
                <div className="rounded-lg border-2 border-red-200 bg-red-50 p-6">
                  <h3 className="mb-3 text-xl font-bold text-red-900">Token Expired</h3>
                  <p className="mb-3 text-red-800">
                    If you see "Your session expired," your Google OAuth token needs to be refreshed.
                  </p>
                  <p className="text-sm text-red-800">
                    <strong>Fix:</strong> Click "Continue with Google" on the welcome page to re-authenticate. Then retry your sync.
                  </p>
                </div>

                {/* Sheet Permission Error */}
                <div className="rounded-lg border-2 border-orange-200 bg-orange-50 p-6">
                  <h3 className="mb-3 text-xl font-bold text-orange-900">Sheet Permission Error</h3>
                  <p className="mb-3 text-orange-800">
                    "You do not have edit access to this sheet."
                  </p>
                  <p className="text-sm text-orange-800">
                    <strong>Fix:</strong> Make sure the sheet is either owned by your Google account or shared with you with edit permissions. SheetLink verifies write access before connecting.
                  </p>
                </div>

                {/* Bank Connection Error */}
                <div className="rounded-lg border-2 border-yellow-200 bg-yellow-50 p-6">
                  <h3 className="mb-3 text-xl font-bold text-yellow-900">Bank Connection Error</h3>
                  <p className="mb-3 text-yellow-800">
                    If your bank sync fails, you may need to update your Plaid connection.
                  </p>
                  <p className="text-sm text-yellow-800">
                    <strong>Fix:</strong> Go to the Bank tab and click "Update Bank Connection" to re-authenticate with Plaid.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Best Practices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Best Practices</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="flex-shrink-0 text-2xl">📊</div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-sheetlink-text">One Sheet Per Use Case</h3>
                    <p className="text-gray-700">
                      Use one sheet for personal budgeting, another for business expenses, etc. This keeps your data organized and makes analysis easier.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="flex-shrink-0">
                    <Save className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Save Backups Periodically</h3>
                    <p className="text-gray-700">
                      Make a copy of your sheet periodically (File → Make a copy). SheetLink never deletes data, but backups are always a good idea.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="flex-shrink-0">
                    <Wrench className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Use Sheets Features, Not Extension Features</h3>
                    <p className="text-gray-700">
                      SheetLink gives you raw transaction data. Use Google Sheets filters, pivot tables, and formulas to analyze it. This gives you unlimited flexibility.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="flex-shrink-0">
                    <RefreshCw className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-bold text-sheetlink-text">Sync Regularly</h3>
                    <p className="text-gray-700">
                      The Free Tier only syncs the last 7 days. Sync at least once a week to keep your full transaction history.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Get Help */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">
              Need Help?
            </h2>
            <p className="mb-8 text-xl text-gray-700">
              If you're experiencing issues or have questions, we're here to help.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:support@sheetlink.app"
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Support
              </a>
              <Link
                href="/first-sync"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 font-semibold text-sheetlink-text transition-all duration-200 hover:border-sheetlink-green-700"
              >
                First Sync Guide
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
