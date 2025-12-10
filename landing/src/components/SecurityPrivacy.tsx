'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building2, Ban, Lock, KeyRound } from 'lucide-react';

const securityFeatures = [
  {
    icon: Building2,
    title: 'Powered by Plaid',
    description: 'Battle-tested bank connectivity trusted by millions',
  },
  {
    icon: Ban,
    title: 'No Transaction Storage',
    description: 'We never store your transaction history',
  },
  {
    icon: Lock,
    title: 'Encrypted Tokens',
    description: 'Plaid access tokens encrypted at rest',
  },
  {
    icon: KeyRound,
    title: 'Google OAuth Only',
    description: 'We store your Google user ID + sheet IDs, not OAuth tokens or sheet contents',
  },
];

export default function SecurityPrivacy() {
  return (
    <section className="bg-gradient-to-b from-white to-sheetlink-bg px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">
            Security & Privacy
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Your financial data deserves the highest level of protection.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="rounded-xl border-2 border-gray-200 bg-white p-6 text-center transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-lg"
            >
              <div className="mb-3 flex justify-center">
                <feature.icon className="h-10 w-10 text-sheetlink-green-700 stroke-[1.5]" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-sheetlink-text">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Links to detailed docs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4 text-center"
        >
          <Link
            href="/privacy"
            className="inline-flex items-center gap-2 font-semibold text-sheetlink-green-700 transition-colors hover:text-sheetlink-green-900"
          >
            Privacy Policy
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <span className="text-gray-400">·</span>
          <Link
            href="/terms"
            className="inline-flex items-center gap-2 font-semibold text-sheetlink-green-700 transition-colors hover:text-sheetlink-green-900"
          >
            Terms of Service
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <span className="text-gray-400">·</span>
          <Link
            href="/security"
            className="inline-flex items-center gap-2 font-semibold text-sheetlink-green-700 transition-colors hover:text-sheetlink-green-900"
          >
            Security
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
