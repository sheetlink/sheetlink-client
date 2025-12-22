'use client';

import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function Success() {
  const seoTitle = `Success - ${BRAND.name}`;
  const seoDescription = 'You\'re on the waitlist! Get ready to connect your bank to Google Sheets.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="robots" content="noindex" />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-5xl"
            >
              🎉
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 text-5xl font-bold text-sheetlink-text md:text-6xl"
            >
              You're in!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-8 text-xl text-gray-600"
            >
              Download the extension below and start syncing your real bank transactions to Google Sheets. It's free forever for the last 7 days of transactions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4 text-sm text-green-900 mb-6">
                <strong>🎉 Now Available on Chrome Web Store!</strong> Install SheetLink with one click directly from the Chrome Web Store.
              </div>

              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a
                  href="https://chromewebstore.google.com/detail/sheetlink-%E2%80%94-connect-your/niehncndbonfankgokhandgbaebdbpch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add to Chrome
                </a>
                <a
                  href="https://github.com/sheetlink/sheetlink-client/releases/download/v0.4.2/sheetlink-extension-v0.4.2.zip"
                  download
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-sheetlink-green-700 px-6 py-3 font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-700 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Manual Download
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 p-6"
            >
              <h2 className="mb-3 text-lg font-semibold text-sheetlink-text">
                Quick Start Guide
              </h2>
              <ul className="space-y-2 text-left text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">1.</span>
                  <span><strong>Download & Install:</strong> Download the .zip file above and load it in Chrome (Developer Mode → Load unpacked)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">2.</span>
                  <span><strong>Sign in with Google:</strong> Grant SheetLink write-only access to your Google Sheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">3.</span>
                  <span><strong>Connect Your Bank:</strong> Use Plaid to securely connect your real bank account (10,000+ institutions supported)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">4.</span>
                  <span><strong>Link Your Sheet:</strong> Paste any Google Sheets URL you own</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">5.</span>
                  <span><strong>Sync:</strong> Click "Sync Now" to pull your last 7 days of transactions</span>
                </li>
              </ul>
              <div className="mt-4 text-sm text-gray-600">
                <strong>Need help?</strong> Check out the <Link href="/user-guide" className="text-sheetlink-green-700 underline">User Guide</Link> or email <a href="mailto:support@sheetlink.app" className="text-sheetlink-green-700 underline">support@sheetlink.app</a>
              </div>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
