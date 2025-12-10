'use client';

import { motion } from 'framer-motion';
import { Zap, Building2, Table2, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Instant Sync',
    description: 'Connect your bank with Plaid and sync the last 7 days of real transactions into your sheet.',
  },
  {
    icon: Building2,
    title: 'Unlimited Banks',
    description: 'Link as many institutions as you want. Each connection gets 7 days of history.',
  },
  {
    icon: Table2,
    title: 'Spreadsheet-Native',
    description: 'Your data goes straight into your Google Sheet. SheetLink never stores your transaction history.',
  },
  {
    icon: Shield,
    title: 'Secure by Design',
    description: 'Powered by Plaid, encrypted tokens, and a privacy-first architecture. No ad trackers, no third-party analytics.',
  },
];

export default function FreeTierFeatures() {
  return (
    <section id="features" className="bg-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">
            What you get on the Free Tier
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Everything you need to track your finances in Google Sheets, free forever.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border-2 border-gray-200 bg-sheetlink-bg p-8 transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-lg"
            >
              <div className="mb-4">
                <feature.icon className="h-12 w-12 text-sheetlink-green-700 stroke-[1.5]" />
              </div>
              <h3 className="mb-3 text-2xl font-bold text-sheetlink-text">{feature.title}</h3>
              <p className="leading-relaxed text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
