'use client';

import { motion } from 'framer-motion';

export default function UpgradesTeaser() {
  return (
    <section className="bg-white px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border-2 border-gray-300 bg-gradient-to-br from-gray-50 to-sheetlink-bg p-12 text-center"
        >
          <div className="mb-6 flex justify-center">
            <div className="inline-flex rounded-full bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700">
              Coming Soon
            </div>
          </div>

          <h2 className="mb-4 text-3xl font-bold text-sheetlink-text md:text-4xl">
            Want more history?
          </h2>

          <p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-gray-600">
            Upgrade tiers will unlock <strong>90 days</strong> (Basic) or <strong>24 months</strong> (Pro) of history,
            plus auto-sync and advanced features like rules and AI categorization.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-lg border-2 border-gray-300 bg-gray-100 px-6 py-3 font-semibold text-gray-400 opacity-60"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Upgrades Coming Soon
            </button>
          </div>

          <p className="mt-6 text-sm text-gray-500">
            The Free Tier will always be free. Paid tiers are in development and will be announced soon.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
