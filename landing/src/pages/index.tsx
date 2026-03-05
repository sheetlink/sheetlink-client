import SEOHead from '@/components/SEOHead';
import StructuredData from '@/components/StructuredData';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDemo from '@/components/ProductDemo';
import Testimonials from '@/components/Testimonials';
import BankLogos from '@/components/BankLogos';
import HowItWorks from '@/components/HowItWorks';
import SecurityPrivacy from '@/components/SecurityPrivacy';
import { motion, useInView } from 'framer-motion';
import { BRAND } from '@/lib/constants';
import React from 'react';

// Helper component for counting animation that triggers on viewport
function CountUpNumber({ target, prefix = '', suffix = '', inView }: { target: number; prefix?: string; suffix?: string; inView: boolean }) {
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return; // Only animate when in view

    const duration = 1500;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span>
      {prefix}
      {count.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      {suffix}
    </span>
  );
}

// Coordinate grid overlay for testing cursor positions
// To use: Add <CoordinateGrid show={true} /> inside the card container
function CoordinateGrid({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50">
      {/* Vertical grid lines every 50px */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`v-${i}`}
          className="absolute h-full w-px bg-red-300 opacity-40"
          style={{ left: `${i * 50}px` }}
        >
          <span className="absolute top-0 text-xs text-red-600">{i * 50}</span>
        </div>
      ))}
      {/* Horizontal grid lines every 50px */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={`h-${i}`}
          className="absolute w-full h-px bg-red-300 opacity-40"
          style={{ top: `${i * 50}px` }}
        >
          <span className="absolute left-0 text-xs text-red-600">{i * 50}</span>
        </div>
      ))}
    </div>
  );
}

// Budget Sheet Card component with viewport-triggered number counting
function BudgetSheetCard() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="w-full max-w-[360px] overflow-hidden rounded-2xl border-2 border-gray-200 bg-white shadow-xl">
      <div className="border-b border-gray-200 bg-green-600 px-6 py-3">
        <div className="flex items-center gap-2">
          <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14H7v-2h5v2zm5-4H7v-2h10v2zm0-4H7V7h10v2z"/>
          </svg>
          <span className="text-sm font-medium text-white">My Budget Sheet</span>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-6 text-center">
          <div className="mb-2 text-3xl font-bold text-sheetlink-green-700">
            <CountUpNumber target={4287.42} prefix="$" inView={isInView} />
          </div>
          <div className="text-sm text-gray-600">Net Income</div>
        </div>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span className="text-gray-700">Income</span>
            <span className="font-semibold text-green-600">
              <CountUpNumber target={5200.00} prefix="+$" inView={isInView} />
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <span className="text-gray-700">Expenses</span>
            <span className="font-semibold text-red-600">
              <CountUpNumber target={912.58} prefix="-$" inView={isInView} />
            </span>
          </div>
          <div className="rounded-lg bg-sheetlink-green-50 p-4 text-center">
            <div className="text-xs font-medium text-sheetlink-green-700">
              ✓ Full privacy. Full control. It's that simple.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Animated checkbox that checks/unchecks based on viewport visibility
function AnimatedCheckbox({ checkDelay = 2300 }: { checkDelay?: number }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false }); // Set to false so it resets when scrolling away
  const [checked, setChecked] = React.useState(false);

  React.useEffect(() => {
    if (isInView) {
      // When card comes into view, start the timer to check the box
      const timer = setTimeout(() => setChecked(true), checkDelay);
      return () => clearTimeout(timer);
    } else {
      // When card leaves view, reset to unchecked
      setChecked(false);
    }
  }, [isInView, checkDelay]);

  return (
    <input
      ref={ref}
      type="checkbox"
      readOnly
      className="h-5 w-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-0 focus:ring-offset-0 checked:bg-blue-600 checked:border-blue-600"
      style={{
        accentColor: '#2563eb'
      }}
      checked={checked}
    />
  );
}

export default function Home() {
  const [billingCycle, setBillingCycle] = React.useState<'monthly' | 'annual'>('annual');

  const seoTitle = `${BRAND.name} - Free Enterprise-Grade Bank Feeds to Google Sheets | Privacy-First Manual Sync`;
  const seoDescription = `Enterprise-grade bank feeds to Google Sheets—free for 7 days, $4/month for full history. Privacy-first alternative to Tiller ($79/yr), YNAB ($109/yr), and Mint. Manual sync gives you control. Powered by Plaid (11,000+ banks).`;
  const seoUrl = 'https://sheetlink.app';
  const seoImage = `${seoUrl}/og-image.png`;

  // JSON-LD structured data for Google entity classification
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "SheetLink",
    "applicationCategory": "FinanceApplication",
    "applicationSubCategory": "Budgeting, Bookkeeping, Accounting",
    "operatingSystem": "Chrome",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": seoDescription,
    "url": seoUrl,
    "image": seoImage,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "ratingCount": "12"
    },
    "featureList": [
      "Privacy-first manual sync to Google Sheets",
      "You control when transactions sync",
      "Plaid integration for 10,000+ banks",
      "Budget tracking and expense categorization",
      "Bookkeeping and accounting automation",
      "Free tier with 7 days of transaction history"
    ]
  };

  // FAQ Schema for AEO (Answer Engine Optimization)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is SheetLink?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink is a Chrome extension that syncs bank transactions to Google Sheets using Plaid - but only when YOU click sync. It's privacy-first, designed for budgeting, bookkeeping, and financial tracking. You control when your bank data flows to your spreadsheet. Free forever for the last 7 days of transactions."
        }
      },
      {
        "@type": "Question",
        "name": "How much does SheetLink cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink is free forever for the last 7 days of transactions - perfect for weekly budget tracking. Pro tier costs $3.99/month ($39.99/year) for unlimited history and is currently in beta. This is 73% cheaper than YNAB ($14.99/month) and 40% cheaper than Tiller Money ($6.58/month)."
        }
      },
      {
        "@type": "Question",
        "name": "Why manual sync instead of automatic?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink only syncs when you click the button. We believe you should control when your bank data flows to your spreadsheet. Unlike competitors that access your accounts in the background, SheetLink requires your explicit action. This is a privacy feature, not a limitation. Manual sync fits the workflow of freelancers, contractors, and small businesses who review finances weekly or monthly, not daily."
        }
      },
      {
        "@type": "Question",
        "name": "What banks work with SheetLink?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink supports 10,000+ banks through Plaid, including Chase, Bank of America, Wells Fargo, Citi, Capital One, US Bank, PNC, and virtually all credit unions. You can connect checking accounts, savings accounts, and credit cards. If your bank offers online banking, it likely works with Plaid."
        }
      },
      {
        "@type": "Question",
        "name": "Is SheetLink safe and secure?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink uses Plaid, the same bank connectivity infrastructure trusted by Venmo, Robinhood, and thousands of financial apps. Your bank credentials are handled exclusively by Plaid (SOC 2 Type II certified). SheetLink never stores your transaction history - data flows directly from Plaid to your Google Sheet. Plaid access tokens are encrypted at rest using Fernet encryption (AES-128-CBC + HMAC)."
        }
      },
      {
        "@type": "Question",
        "name": "What's the difference between SheetLink and Tiller Money?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink offers a free tier (7 days of history) and Pro tier ($3.99/month), while Tiller costs $6.58/month ($79/year) with no free tier. SheetLink uses manual sync (you control when data flows), while Tiller syncs automatically in the background. SheetLink offers financial templates through Recipes and supports both personal budgeting and small business bookkeeping use cases. Both sync bank transactions to Google Sheets using Plaid."
        }
      },
      {
        "@type": "Question",
        "name": "Can I use SheetLink for business bookkeeping?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. SheetLink works for both personal finance and small business bookkeeping. Many small business owners and freelancers use SheetLink to track business expenses, categorize transactions, and build P&L statements in Google Sheets. It's a simpler, more affordable alternative to QuickBooks for basic bookkeeping needs."
        }
      }
    ]
  };

  // Organization Schema for brand name display in search results
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "SheetLink",
    "url": "https://sheetlink.app",
    "logo": "https://sheetlink.app/sheetlink-logo.svg",
    "sameAs": [
      "https://github.com/sheetlink/sheetlink-client"
    ],
    "description": "Open-source Chrome extension for syncing bank transactions to Google Sheets using Plaid."
  };

  return (
    <>
      <SEOHead
        title="SheetLink - Sync Bank Transactions to Google Sheets"
        description="Privacy-first bank transaction sync for Google Sheets. Connect 10,000+ banks via Plaid. Free for last 7 days, $39.99/year for unlimited history. Your data stays in YOUR Google account."
        canonical="https://sheetlink.app"
        keywords="bank sync google sheets, plaid google sheets, financial tracking, budget spreadsheet, transaction sync"
        ogType="website"
      />

      <StructuredData
        type="article"
        headline="SheetLink - Sync Bank Transactions to Google Sheets"
        description="Privacy-first bank transaction sync for Google Sheets. Connect 10,000+ banks via Plaid. Free for last 7 days, $39.99/year for unlimited history. Your data stays in YOUR Google account."
        url="https://sheetlink.app"
        datePublished="2026-03-05T00:00:00Z"
      />

      <div className="min-h-screen bg-white">
        <Header />

        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center px-4 pb-8 pt-20">
          <div className="mx-auto max-w-5xl">
            {/* Badge with Trust Signals */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex justify-center"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-sheetlink-green-700/10 px-4 py-2 text-sm font-semibold text-sheetlink-green-700">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Bank-grade encryption</span>
              </div>
            </motion.div>

            {/* Hero Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-center text-5xl font-bold leading-tight text-sheetlink-text md:text-7xl"
            >
              Track your spending,{' '}
              <span className="text-sheetlink-green-700">build budgets, take control.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-gray-600"
            >
              SheetLink syncs your bank transactions to Google Sheets in real-time. Perfect for budgeting, bookkeeping, and cash flow tracking. Free forever for 7 days of history.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
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
                href="#demo"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-8 py-4 text-lg font-semibold text-sheetlink-text transition-all duration-200 hover:border-sheetlink-green-700 hover:text-sheetlink-green-700"
              >
                How it Works
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </motion.div>

            {/* Powered By Section - Below CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mx-auto mt-16"
            >
              <div className="mb-6 flex items-center justify-center gap-8">
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
              </div>
            </motion.div>
          </div>
        </section>

        {/* Bank Logos */}
        <BankLogos />

        {/* Product Demo */}
        <ProductDemo />

        {/* Testimonials */}
        <Testimonials />

        {/* Privacy & Control Section - Vexly-inspired */}
        <section id="privacy" className="bg-gradient-to-b from-white to-gray-50 py-24">
          <div className="mx-auto max-w-7xl px-4">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-20 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">
                Privacy-first by design.
              </h2>
              <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                <span className="text-sheetlink-green-700">You control when your data flows.</span>
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                No background monitoring. No stored transactions. Just simple, secure syncs when you need them.
              </p>
            </motion.div>

            {/* Subsection 1: Plaid Security */}
            <div className="mb-24 grid items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Backed by the security and privacy of Plaid
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Connect to over 10,000 banks using Plaid's bank-grade encryption and security infrastructure. Your credentials are never stored by SheetLink—Plaid handles the secure connection.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">256-bit encryption for all connections</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Never store your banking credentials</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Trusted by millions of users worldwide</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex justify-center"
              >
                {/* Animated Plaid Bank Selection - Purple Gradient Background */}
                <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-2xl p-8 shadow-2xl" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                  {/* Add coordinate grid for testing - set show={true} to enable */}
                  <CoordinateGrid show={false} />

                  {/* Animated Cursor - Cursor placement adjustable via x and y arrays below */}
                  {/* Current path: hidden -> fades in (no movement) -> waits -> moves to Chase checkbox -> clicks -> moves to Confirm -> clicks -> disappears */}
                  {/* To adjust: modify x values (horizontal) and y values (vertical) in the arrays */}
                  {/* Fade-in duration is controlled by first two times values (0.1 = 10% of total duration) */}
                  <motion.div
                    initial={{ opacity: 0, x: 100, y: 140 }}
                    whileInView={{
                      opacity: [0, 1, 1, 1, 1, 1, 1, 0],
                      x: [100, 100, 130, 130, 130, 70, 70, 70],
                      y: [-100, -100, -20, -20, -20, 150, 150, 150]
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 5,
                      delay: 1,
                      times: [0, 0.1, 0.25, 0.45, 0.55, 0.75, 0.9, 1]
                    }}
                    className="pointer-events-none absolute z-10"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" strokeWidth="1.5"/>
                    </svg>
                  </motion.div>

                  <div className="flex h-full w-full items-center justify-center">
                    <div className="w-full max-w-[360px] overflow-hidden rounded-xl bg-white shadow-xl">
                      {/* Plaid Header */}
                      <div className="border-b border-gray-200 bg-white p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <svg viewBox="0 0 48 48" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" aria-label="Plaid">
                              <rect width="48" height="48" rx="8" fill="#000000"></rect>
                              <g transform="translate(10, 10)" fill="#FFFFFF" fillRule="evenodd">
                                <path d="M25.7629 26.2628L28 17.5309L24.9691 14.5001L27.9999 11.4691L25.7628 2.73706L17.0309 0.5L14.0001 3.531L10.969 0.50014L2.23706 2.73734L0 11.4691L3.03128 14.4999L0.00014 17.531L2.2372 26.2629L10.9691 28.5L14.0001 25.469L17.031 28.4999L25.7629 26.2628ZM15.7321 23.7371L18.6186 20.8505L22.2912 24.5233L17.6956 25.7007L15.7321 23.7371ZM11.1136 9.88154L14.0003 6.99502L16.8868 9.8814L14.0001 12.7679L11.1136 9.88154ZM12.2682 14.5L9.38154 17.3865L6.49502 14.5L9.38154 11.6135L12.2682 14.5ZM18.6187 11.6133L21.5053 14.5L18.6186 17.3865L15.7321 14.5L18.6187 11.6133ZM16.8867 19.1186L14.0001 22.0051L11.1135 19.1185L14.0001 16.2319L16.8867 19.1186ZM10.3044 25.7007L5.70864 24.5233L9.38154 20.8504L12.2682 23.7371L10.3044 25.7007ZM4.76308 16.2319L7.6496 19.1185L3.9767 22.7914L2.7993 18.1957L4.76308 16.2319ZM3.9767 6.20836L7.64974 9.8814L4.76308 12.7681L2.7993 10.8041L3.9767 6.20836ZM12.2683 5.26294L9.38168 8.1496L5.70892 4.4767L10.3047 3.2993L12.2683 5.26294ZM17.6959 3.2993L22.2915 4.4767L18.6186 8.14946L15.7321 5.26294L17.6959 3.2993ZM23.2372 12.7681L20.3505 9.8814L24.0233 6.20878L25.2007 10.8046L23.2372 12.7681ZM24.0233 22.7914L20.3505 19.1186L23.2372 16.2321L25.2007 18.1957L24.0233 22.7914Z"></path>
                              </g>
                            </svg>
                            <span className="text-base font-semibold tracking-wide">Plaid</span>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600">✕</button>
                        </div>
                      </div>

                      {/* Select Accounts Content */}
                      <div className="p-6">
                        <h3 className="mb-6 text-xl font-bold text-gray-900">Select accounts</h3>

                        {/* Bank Account List - Chase & Bank of America */}
                        <div className="space-y-3">
                          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                              <Image src="/bank-logos/ins_56.svg" alt="Chase" width={40} height={40} className="h-full w-full object-cover" />
                            </div>
                            <span className="flex-grow text-sm font-medium text-gray-900">Chase</span>
                            <AnimatedCheckbox checkDelay={2600} />
                          </div>

                          <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4">
                            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-white">
                              <Image src="/bank-logos/ins_127989.svg" alt="Bank of America" width={40} height={40} className="h-full w-full object-cover" />
                            </div>
                            <span className="flex-grow text-sm font-medium text-gray-900">Bank of America</span>
                            <input type="checkbox" readOnly className="h-5 w-5 rounded border-gray-300 text-blue-600" />
                          </div>
                        </div>

                        {/* Confirm Button */}
                        <motion.button
                          initial={{ scale: 1 }}
                          whileInView={{ scale: [1, 1, 1, 1, 1, 0.95, 1] }}
                          viewport={{ once: true }}
                          transition={{
                            scale: { duration: 0.3, delay: 4.8, times: [0, 0.3, 0.5, 0.7, 0.8, 0.9, 1] }
                          }}
                          className="mt-6 w-full rounded-lg bg-gray-700 py-3 text-sm font-semibold text-white hover:bg-gray-800"
                        >
                          Confirm
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Subsection 2: Manual Sync */}
            <div className="mb-24 grid items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-2 md:order-1 flex justify-center"
              >
                {/* Extension UI with Gradient Background */}
                <div className="relative aspect-square w-full max-w-lg overflow-hidden rounded-2xl p-8 shadow-2xl" style={{ background: 'linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)' }}>
                  {/* Add coordinate grid for testing - set show={true} to enable */}
                  <CoordinateGrid show={false} />

                  {/* Animated Cursor - Cursor placement adjustable via x and y arrays below */}
                  {/* To adjust: modify x values (horizontal) and y values (vertical) in the arrays */}
                  <motion.div
                    initial={{ opacity: 0, x: -20, y: -20 }}
                    whileInView={{
                      opacity: [0, 1, 1, 1, 1, 0],
                      x: [100, 100, 70, 70, 70, 70],
                      y: [100, 100, 0, 0, 0, 0]
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 4,
                      delay: 1.5,
                      times: [0, 0.25, 0.6, 0.8, 0.95, 1]
                    }}
                    className="pointer-events-none absolute z-10"
                    style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" fill="white" stroke="black" strokeWidth="1.5"/>
                    </svg>
                  </motion.div>

                  {/* Extension Popup - Centered */}
                  <div className="relative flex h-full items-center justify-center">
                    <div className="w-full max-w-[360px] overflow-hidden rounded-lg bg-white shadow-xl">
                      {/* Green Header */}
                      <div className="bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/30 bg-white/20">
                              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-sm text-white/90">sheetlinkapp@gmail.com</div>
                              <div className="flex items-center gap-2">
                                <span className="rounded-full border-2 border-white/60 px-2.5 py-0.5 text-xs font-bold text-white">PRO ★</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button className="text-white/80 hover:text-white">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>
                            <button className="text-white/80 hover:text-white">
                              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Dashboard Content */}
                      <div className="bg-white px-6 pb-6 pt-4">
                        <h2 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h2>

                        {/* Sync Now Button */}
                        <motion.button
                          initial={{ scale: 1 }}
                          whileInView={{ scale: [1, 1, 1, 1, 0.95, 1] }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.4,
                            delay: 4,
                            times: [0, 0.3, 0.5, 0.7, 0.85, 1]
                          }}
                          className="mb-6 flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 py-4 text-lg font-semibold text-white shadow-md"
                        >
                          Sync Now
                        </motion.button>

                        {/* Status Indicators */}
                        <div className="mb-4 space-y-2">
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-700">Plaid connection active</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            <span className="text-gray-700">Sheet linked</span>
                          </div>
                        </div>

                        {/* Last Sync & Plan Info */}
                        <div className="text-sm text-gray-600">
                          <div>Last sync: 1 day ago</div>
                          <div className="mt-1">
                            Plan: <span className="font-semibold text-blue-600">Pro (730 days)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="order-1 md:order-2"
              >
                <h3 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  Manual sync for ultimate security and privacy
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  Unlike other tools, SheetLink never runs in the background. You click "Sync Now" when you want to update your data. No surprises, no automatic access to your accounts.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Zero background access to your accounts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">You decide exactly when data syncs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Complete transparency and control</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* Subsection 3: Simplicity */}
            <div className="grid items-center gap-12 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="mb-4 text-3xl font-bold text-sheetlink-text">
                  That's it! You're in full control.
                </h3>
                <p className="mb-6 text-lg leading-relaxed text-gray-600">
                  No server monitoring your accounts. No data stored in our databases. Just a simple sync when you need it. Your data stays in your Google Sheet, analyzed with open-source Apps Script templates you control.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Never store your transaction data</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">No background monitoring or tracking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Open-source templates for analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Simplicity is the product</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative flex justify-center"
              >
                {/* Animated Sheet Preview - Square Container */}
                <div className="flex aspect-square w-full max-w-lg items-center justify-center overflow-hidden rounded-2xl p-8 shadow-2xl" style={{ background: 'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)' }}>
                  {/* Add coordinate grid for testing - set show={true} to enable */}
                  <CoordinateGrid show={false} />

                  <BudgetSheetCard />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Recipes Section */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                <span className="text-sheetlink-text">SheetLink Recipes</span>
                <br />
                <span className="text-sheetlink-green-700">Open-source financial templates</span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Install community-built Apps Script templates from simple budgets to full 3-statement models. All recipes are open-source and fully customizable.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {/* Personal Budgeting */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-sheetlink-green-100">
                  <svg className="h-8 w-8 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-sheetlink-text">Personal Budgeting</h3>
                <p className="mb-4 text-gray-600">
                  Track spending by category, set budget limits, and visualize where your money goes each month.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Auto-categorize transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Monthly budget tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Spending charts & insights</span>
                  </li>
                </ul>
              </motion.div>

              {/* Cash Flow & P&L */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-100">
                  <svg className="h-8 w-8 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-sheetlink-text">Cash Flow & P&L</h3>
                <p className="mb-4 text-gray-600">
                  Generate profit & loss statements and track cash flow for freelancers and small businesses.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Income vs. expenses breakdown</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Monthly P&L statements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cash flow projections</span>
                  </li>
                </ul>
              </motion.div>

              {/* Full Financial Statements */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-purple-100">
                  <svg className="h-8 w-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="mb-3 text-2xl font-bold text-sheetlink-text">Full Financial Statements</h3>
                <p className="mb-4 text-gray-600">
                  Complete 3-statement models with balance sheet, income statement, and cash flow statement.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Balance sheet generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Integrated 3-statement model</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Financial ratio analysis</span>
                  </li>
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <a
                href="/recipes"
                className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-700 px-6 py-3 text-lg font-semibold text-white transition-all duration-200 hover:bg-sheetlink-green-900"
              >
                Browse All Recipes
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <p className="mt-6 text-gray-600">
                All recipes are{' '}
                <a
                  href="https://github.com/sheetlink/sheetlink-recipes"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sheetlink-green-700 underline hover:text-sheetlink-green-900"
                >
                  open-source on GitHub
                </a>
                {' '}— built by the community, for the community.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-24">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                <span className="text-sheetlink-text">Extend your history.</span>
                <br />
                <span className="text-sheetlink-green-700">Powered by Stripe.</span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Start free forever with 7 days of history. Upgrade to Pro for full transaction history and unlock the complete power of SheetLink.
              </p>
            </motion.div>

            {/* Billing Cycle Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-12 flex items-center justify-center gap-4"
            >
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-sheetlink-text' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-sheetlink-accent transition-colors"
                aria-label="Toggle billing cycle"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-sheetlink-text' : 'text-gray-500'}`}>
                Annual
              </span>
              <span className="rounded-full bg-sheetlink-green-700 px-3 py-1 text-xs font-semibold text-white">
                Save 17%
              </span>
            </motion.div>

            {/* Pricing Cards */}
            <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
              {/* Free Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-lg"
              >
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-sheetlink-text">Free</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-sheetlink-text">$0</span>
                    <span className="text-gray-600">/forever</span>
                  </div>
                  <p className="text-sm text-gray-600">Perfect for getting started</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>7 days</strong> of transaction history</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Unlimited</strong> manual syncs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Unlimited</strong> bank connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Direct-to-Google Sheets</span>
                  </li>
                </ul>

                <a
                  href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-sheetlink-green-700 bg-transparent px-6 py-3 font-semibold text-sheetlink-green-700 transition-all hover:bg-sheetlink-green-50"
                >
                  Get Started Free
                </a>
              </motion.div>

              {/* Pro Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col rounded-2xl border-2 border-sheetlink-green-700 bg-gradient-to-br from-white to-sheetlink-green-50/30 p-8 shadow-xl"
              >
                <div className="mb-2 inline-block self-start rounded-full bg-sheetlink-green-700 px-3 py-1 text-xs font-semibold text-white">
                  MOST POPULAR
                </div>
                <div className="mb-6">
                  <h3 className="mb-2 text-2xl font-bold text-sheetlink-text">Pro</h3>
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-sheetlink-text">
                      ${billingCycle === 'annual' ? '3.33' : '3.99'}
                    </span>
                    <span className="text-gray-600">/month</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {billingCycle === 'annual' ? 'Billed annually ($39.99/year)' : 'Billed monthly'}
                  </p>
                </div>

                <ul className="mb-8 flex-1 space-y-3">
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Everything in Free</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Full Plaid transaction history</strong> (2 years)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Historical backfill</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700"><strong>Priority email support</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">Early access to new features</span>
                  </li>
                </ul>

                <a
                  href={billingCycle === 'annual' ? 'https://buy.stripe.com/bJe28q7V73xq1yc6UGbjW01' : 'https://buy.stripe.com/7sYaEWb7jgkc6Swcf0bjW00'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
                >
                  Upgrade to Pro
                </a>
              </motion.div>
            </div>

            {/* Trust Signal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center"
            >
              <p className="text-sm text-gray-600">
                Secure billing powered by{' '}
                <a
                  href="https://stripe.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-sheetlink-green-700 underline hover:text-sheetlink-green-900"
                >
                  Stripe
                </a>
                {' '}• Cancel anytime • 14-day money-back guarantee
              </p>
            </motion.div>
          </div>
        </section>

        {/* How It Works */}
        <HowItWorks />

        {/* Security & Privacy */}
        <SecurityPrivacy />

        <Footer />
      </div>
    </>
  );
}
