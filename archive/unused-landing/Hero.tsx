import { motion } from 'framer-motion';
import { BRAND, URLS } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-5xl font-bold text-sheetlink-text md:text-7xl"
        >
          Connect Your Bank to Google Sheets
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8 text-xl text-gray-600 md:text-2xl"
        >
          {BRAND.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4"
        >
          <a
            href={URLS.chromeStore}
            onClick={() => analytics.ctaInstallClick('hero')}
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
          >
            Add SheetLink to Chrome
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>
          <p className="text-sm text-gray-500">Free forever. 1 bank account. No credit card.</p>
        </motion.div>

        {/* Placeholder for animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-16 max-w-3xl"
        >
          <div className="rounded-lg border-2 border-sheetlink-green-700/20 bg-white p-8 shadow-lg">
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-sheetlink-green-900 text-white flex items-center justify-center text-2xl font-bold">
                  🏦
                </div>
                <p className="text-sm font-medium text-gray-600">Plaid</p>
              </div>
              <svg className="h-6 w-6 text-sheetlink-accent" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div className="text-center">
                <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-sheetlink-green-700 text-white flex items-center justify-center text-2xl font-bold">
                  SL
                </div>
                <p className="text-sm font-medium text-gray-600">SheetLink</p>
              </div>
              <svg className="h-6 w-6 text-sheetlink-accent" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
              <div className="text-center">
                <div className="mx-auto mb-2 h-16 w-16 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold">
                  📊
                </div>
                <p className="text-sm font-medium text-gray-600">Google Sheets</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
