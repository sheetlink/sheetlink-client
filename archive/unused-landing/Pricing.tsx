import { motion } from 'framer-motion';
import { PRICING, URLS } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function Pricing() {
  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">Pricing</h2>
          <p className="text-lg text-gray-600">Simple. Transparent. No tricks.</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Free Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-lg border-2 border-gray-200 bg-white p-8"
          >
            <h3 className="mb-2 text-2xl font-bold text-sheetlink-text">{PRICING.free.name}</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold text-sheetlink-text">{PRICING.free.price}</span>
              <span className="ml-2 text-gray-600">/ {PRICING.free.period}</span>
            </div>
            <ul className="mb-8 space-y-3">
              {PRICING.free.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <svg
                    className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={URLS.chromeStore}
              onClick={() => analytics.ctaInstallClick('pricing-free')}
              className="block w-full rounded-lg border-2 border-sheetlink-green-900 bg-white px-6 py-3 text-center font-semibold text-sheetlink-green-900 transition-all hover:bg-sheetlink-green-900 hover:text-white"
            >
              Get Started
            </a>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-lg border-2 border-sheetlink-green-700 bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 p-8 text-white shadow-xl"
          >
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-2xl font-bold">{PRICING.pro.name}</h3>
              <span className="rounded-full bg-sheetlink-accent px-3 py-1 text-xs font-semibold text-sheetlink-text">
                POPULAR
              </span>
            </div>
            <div className="mb-6">
              <span className="text-5xl font-bold">{PRICING.pro.price}</span>
              <span className="ml-2 text-white/80">/ {PRICING.pro.period}</span>
            </div>
            <ul className="mb-8 space-y-3">
              {PRICING.pro.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <svg
                    className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a
              href={URLS.chromeStore}
              onClick={() => {
                analytics.ctaInstallClick('pricing-pro');
                analytics.pricingProClick();
              }}
              className="block w-full rounded-lg bg-white px-6 py-3 text-center font-semibold text-sheetlink-green-900 transition-all hover:bg-sheetlink-bg"
            >
              Upgrade to Pro
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
