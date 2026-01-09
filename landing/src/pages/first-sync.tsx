'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function FirstSync() {
  const seoTitle = `First Sync Guide - ${BRAND.name}`;
  const seoDescription = 'Complete your first sync: connect your bank, link your Google Sheet, and start pulling transactions.';

  useEffect(() => {
    analytics.pageView('First Sync Guide', '/first-sync');
  }, []);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
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
              Your First Sync
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-700"
            >
              Connect your real bank accounts and sync the last 7 days of transactions to Google Sheets, free forever.
            </motion.p>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            {/* Step 1: Install */}
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
                <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Install SheetLink
                </h2>
                <p className="mb-4 text-lg text-gray-700">
                  Install the SheetLink Chrome extension from the Chrome Web Store. Once installed, pin it to your toolbar for easy access.
                </p>
                <a
                  href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                  </svg>
                  Add to Chrome
                </a>
              </div>
            </motion.div>

            {/* Step 2: Sign in with Google */}
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
                <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Sign In with Google
                </h2>
                <p className="mb-4 text-lg text-gray-700">
                  Click the SheetLink extension icon and sign in with your Google account. This allows SheetLink to:
                </p>
                <ul className="mb-4 list-inside space-y-2 text-lg text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span>Tie your Plaid Items to your Google user ID (for cross-device restoration)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span>Write transaction data to your Google Sheets</span>
                  </li>
                </ul>
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Privacy Note:</strong> SheetLink does not access your sheet contents beyond required write operations. We only store your Google user ID and linked sheet metadata (title, ID).
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Connect Your Bank */}
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
                <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Connect Your Bank in Production
                </h2>
                <p className="mb-4 text-lg text-gray-700">
                  Click <strong>"Add a Bank via Plaid"</strong> to open Plaid Link. Choose your real bank from the list and securely authenticate with your credentials.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  The Free Tier syncs the <strong>last 7 days</strong> of transaction history per institution. Your initial sync may take a few seconds depending on your transaction volume.
                </p>
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-green-900">
                    <strong>Security:</strong> SheetLink never sees or stores your bank credentials. Authentication happens directly between you and Plaid, which is trusted by millions of users.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 4: Link Your Google Sheet */}
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
                <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Link Your Google Sheet
                </h2>
                <p className="mb-4 text-lg text-gray-700">
                  Paste the URL of a Google Sheet you own. SheetLink will verify that you have edit access before connecting.
                </p>
                <div className="mb-4 rounded-lg border-2 border-yellow-300 bg-yellow-50 p-4">
                  <p className="text-sm text-yellow-900">
                    <strong>Important:</strong> You must have edit access to the sheet. SheetLink automatically verifies this by testing write permissions. If you see an error, make sure the sheet is owned by your Google account or shared with edit permissions.
                  </p>
                </div>
                <p className="text-lg text-gray-700">
                  Once connected, SheetLink will create two tabs in your sheet:
                </p>
                <ul className="mt-2 list-inside space-y-2 text-lg text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span><strong>Accounts:</strong> Lists your connected bank accounts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span><strong>Transactions:</strong> Contains all your transaction data</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            {/* Step 5: Sync Your First 7 Days */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-16 flex flex-col gap-8 md:flex-row"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                5
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Sync Your First 7 Days
                </h2>
                <p className="mb-4 text-lg text-gray-700">
                  Navigate to the <strong>Home</strong> tab in the extension and click <strong>"Sync Now"</strong>. You'll see status messages as SheetLink fetches and writes your transactions.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  Your transaction data will appear in the <strong>Transactions</strong> tab with these columns:
                </p>
                <div className="overflow-x-auto rounded-lg border-2 border-gray-200 bg-white p-4">
                  <code className="block whitespace-nowrap text-sm text-gray-800">
                    Date | Name | Amount | Category | Account | Institution | Transaction ID
                  </code>
                </div>
                <p className="mt-4 text-lg text-gray-700">
                  SheetLink uses <strong>append-only mode</strong>, meaning new transactions are added to the bottom of your sheet. Existing rows are never modified or deleted.
                </p>
              </div>
            </motion.div>

            {/* Step 6: Understanding Your Sheet Structure */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col gap-8 md:flex-row"
            >
              <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                6
              </div>
              <div className="flex-1">
                <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Understanding Your Sheet Structure
                </h2>
                <p className="mb-4 text-lg text-gray-700">
                  <strong>Accounts Tab:</strong>
                </p>
                <ul className="mb-4 list-inside space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span>Account Name, Type, Current Balance, Institution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span>Updated on every sync</span>
                  </li>
                </ul>
                <p className="mb-4 text-lg text-gray-700">
                  <strong>Transactions Tab:</strong>
                </p>
                <ul className="mb-4 list-inside space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span>Date, Name, Amount, Category, Account, Institution, Transaction ID</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span>Append-only (new rows added, existing rows never modified)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                    <span>Automatic deduplication using Transaction ID</span>
                  </li>
                </ul>
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Pro Tip:</strong> Use Google Sheets filters, pivot tables, and formulas to analyze your data. SheetLink gives you raw transaction data, and you control how it's presented.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">
              Next Steps
            </h2>
            <p className="mb-8 text-xl text-gray-700">
              Check out the User Guide to learn how to manage your connections and get the most out of SheetLink.
            </p>
            <Link
              href="/user-guide"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
            >
              Read the User Guide
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
