'use client';

import { motion } from 'framer-motion';
import { URLS } from '@/lib/constants';

export default function HeroFreeTier() {
  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-5xl">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex justify-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border-2 border-sheetlink-green-700 bg-sheetlink-bg px-4 py-2 text-sm font-semibold text-sheetlink-green-900">
            <span className="flex h-2 w-2 rounded-full bg-sheetlink-green-700"></span>
            Now Live · Free Forever
          </div>
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-7xl"
        >
          Your bank data,{' '}
          <span className="text-sheetlink-green-700">straight into Google Sheets.</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-12 max-w-3xl text-center text-xl leading-relaxed text-gray-600 md:text-2xl"
        >
          SheetLink connects your real bank accounts to Google Sheets. Free forever for the last 7 days of transactions.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <a
            href="https://chromewebstore.google.com/detail/sheetlink-%E2%80%94-connect-your/niehncndbonfankgokhandgbaebdbpch"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-xl"
          >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
            </svg>
            Add to Chrome
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-sheetlink-text transition-all duration-200 hover:border-sheetlink-green-700 hover:text-sheetlink-green-700"
          >
            How it Works
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mx-auto mt-16 flex max-w-2xl items-center justify-center gap-8"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center">
              {/* Plaid Logo */}
              <svg viewBox="0 0 48 48" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" aria-label="Plaid">
                <rect width="48" height="48" rx="8" fill="#000000"/>
                <g transform="translate(10, 10)" fill="#FFFFFF" fillRule="evenodd">
                  <path d="M25.7629 26.2628L28 17.5309L24.9691 14.5001L27.9999 11.4691L25.7628 2.73706L17.0309 0.5L14.0001 3.531L10.969 0.50014L2.23706 2.73734L0 11.4691L3.03128 14.4999L0.00014 17.531L2.2372 26.2629L10.9691 28.5L14.0001 25.469L17.031 28.4999L25.7629 26.2628ZM15.7321 23.7371L18.6186 20.8505L22.2912 24.5233L17.6956 25.7007L15.7321 23.7371ZM11.1136 9.88154L14.0003 6.99502L16.8868 9.8814L14.0001 12.7679L11.1136 9.88154ZM12.2682 14.5L9.38154 17.3865L6.49502 14.5L9.38154 11.6135L12.2682 14.5ZM18.6187 11.6133L21.5053 14.5L18.6186 17.3865L15.7321 14.5L18.6187 11.6133ZM16.8867 19.1186L14.0001 22.0051L11.1135 19.1185L14.0001 16.2319L16.8867 19.1186ZM10.3044 25.7007L5.70864 24.5233L9.38154 20.8504L12.2682 23.7371L10.3044 25.7007ZM4.76308 16.2319L7.6496 19.1185L3.9767 22.7914L2.7993 18.1957L4.76308 16.2319ZM3.9767 6.20836L7.64974 9.8814L4.76308 12.7681L2.7993 10.8041L3.9767 6.20836ZM12.2683 5.26294L9.38168 8.1496L5.70892 4.4767L10.3047 3.2993L12.2683 5.26294ZM17.6959 3.2993L22.2915 4.4767L18.6186 8.14946L15.7321 5.26294L17.6959 3.2993ZM23.2372 12.7681L20.3505 9.8814L24.0233 6.20878L25.2007 10.8046L23.2372 12.7681ZM24.0233 22.7914L20.3505 19.1186L23.2372 16.2321L25.2007 18.1957L24.0233 22.7914Z"></path>
                </g>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-sheetlink-text">Powered by</p>
              <p className="text-lg font-bold text-sheetlink-text">Plaid</p>
            </div>
          </div>
          <span className="text-2xl text-gray-400">+</span>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center">
              {/* Google Sheets Logo */}
              <svg viewBox="0 0 48 48" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" aria-label="Google Sheets">
                <rect width="48" height="48" rx="8" fill="#34A853"/>
                <g transform="translate(12, 12)">
                  <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 8v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 8h-8v8H9v-8H5V9h4V5h2v4h8v2z" fill="#FFFFFF"/>
                </g>
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-sheetlink-text">Built on</p>
              <p className="text-lg font-bold text-sheetlink-text">Google Sheets</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
