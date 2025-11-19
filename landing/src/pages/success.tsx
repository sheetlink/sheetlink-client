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
              You've secured lifetime free access. We'll email you when SheetLink launches with full features.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <p className="text-lg font-semibold text-sheetlink-green-700">
                Ready to get started? Follow our step-by-step installation guide.
              </p>

              <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row">
                <Link
                  href="/get-started"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  Get Started →
                </Link>
                <a
                  href="https://github.com/sheetlink/sheetlink-client"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-sheetlink-green-700 px-6 py-3 font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-700 hover:text-white"
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  Follow on GitHub
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
                What happens next?
              </h2>
              <ul className="space-y-2 text-left text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">✓</span>
                  <span>Download and install the Chrome extension</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">✓</span>
                  <span>Connect to Plaid Sandbox with test data</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">✓</span>
                  <span>Sync transactions to your Google Sheets</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">✓</span>
                  <span>Provide feedback to help shape the product</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sheetlink-green-700">✓</span>
                  <span>Lifetime free access as a thank you for being an early supporter</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
