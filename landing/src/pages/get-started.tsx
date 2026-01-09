'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function GetStarted() {
  const seoTitle = `Get Started - ${BRAND.name}`;
  const seoDescription = 'Install the SheetLink Chrome extension and start syncing your bank transactions to Google Sheets.';

  // Track page view on mount
  useEffect(() => {
    analytics.pageView('Get Started Guide', '/get-started');
  }, []);

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
              Install SheetLink
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mb-8 max-w-2xl text-xl leading-relaxed text-gray-700"
            >
              Install SheetLink from the Chrome Web Store and connect your real bank accounts to Google Sheets in minutes.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-gray-600"
            >
              Free forever for the last 7 days of transactions. No credit card required.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.downloadExtensionClick('hero')}
                className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                </svg>
                Add to Chrome
              </a>
            </motion.div>
          </div>
        </section>

        {/* Installation Steps */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              Quick Start Guide
            </h2>

            {/* Step 1: Install from Chrome Web Store */}
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
                  Install from Chrome Web Store
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Click the button above or visit the Chrome Web Store to add SheetLink to your browser with one click.
                </p>
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-green-900">
                    <strong>Now Live!</strong> SheetLink is officially available on the Chrome Web Store. Installation takes just seconds.
                  </p>
                </div>
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
                <h3 className="mb-4 text-2xl font-bold text-sheetlink-text">
                  Sign in with Google
                </h3>
                <p className="mb-4 text-lg text-gray-700">
                  Click the SheetLink extension icon in your toolbar, then click <strong>Continue with Google</strong>.
                </p>
                <p className="mb-4 text-lg text-gray-700">
                  This grants SheetLink permission to write data to your Google Sheets. We never read your spreadsheets - only write.
                </p>
                <div className="mb-4 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                  <p className="text-sm text-blue-900">
                    <strong>Privacy:</strong> SheetLink requests the minimum Google permissions needed to write to sheets you own. We never access sheets you haven't explicitly connected.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Complete Onboarding */}
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
                  Complete Onboarding
                </h3>
                <ol className="mb-4 list-inside space-y-3 text-lg text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">1.</span>
                    <span><strong>Connect Your Bank:</strong> Click "Add Bank" and search for your institution. Sign in with your real bank credentials through Plaid's secure flow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">2.</span>
                    <span><strong>Link Your Sheet:</strong> Paste a Google Sheets URL you own. SheetLink will verify you have edit access.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="flex-shrink-0 text-sheetlink-green-700">3.</span>
                    <span><strong>First Sync:</strong> Click "Sync Now" on the Home tab to fetch your last 7 days of transactions.</span>
                  </li>
                </ol>
                <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <p className="text-sm text-green-900">
                    <strong>Success!</strong> Your transactions are now syncing to your sheet. The Free Tier gives you the last 7 days of history, updated on-demand.
                  </p>
                </div>
                <div className="mt-4 rounded-lg border-2 border-gray-200 bg-gray-50 p-4">
                  <p className="text-sm text-gray-700">
                    <strong>Next Steps:</strong> Check out the <Link href="/user-guide" className="text-sheetlink-green-700 underline">User Guide</Link> to learn about the 4-tab navigation, manual sync, and best practices.
                  </p>
                </div>
              </div>
            </motion.div>
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
              onClick={() => analytics.feedbackEmailClick('/get-started')}
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
            <div className="grid gap-8 md:grid-cols-2">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Auto-Sync (Basic/Pro Tiers)</h3>
                <p className="text-gray-600">
                  Automatic transaction syncing on a schedule - no manual clicks required
                </p>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-accent text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Extended History (90 days / 2 years)</h3>
                <p className="text-gray-600">
                  Basic and Pro tiers will offer deeper transaction history for long-term analysis
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
