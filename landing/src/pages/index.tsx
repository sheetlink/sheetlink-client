import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductDemo from '@/components/ProductDemo';
import Testimonials from '@/components/Testimonials';
import BankLogos from '@/components/BankLogos';
import HowItWorks from '@/components/HowItWorks';
import SecurityPrivacy from '@/components/SecurityPrivacy';
import { motion } from 'framer-motion';
import { BRAND } from '@/lib/constants';

export default function Home() {
  const seoTitle = `${BRAND.name} - Sync Bank Transactions to Google Sheets for Budgeting & Bookkeeping`;
  const seoDescription = `SheetLink is a Chrome extension that syncs your bank transactions to Google Sheets using Plaid. Track spending, build budgets, and manage your finances in real-time. Free forever for 7 days of history.`;
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
      "Sync bank transactions to Google Sheets",
      "Real-time transaction updates",
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
          "text": "SheetLink is a Chrome extension that automatically syncs bank transactions to Google Sheets using Plaid. It's designed for budgeting, bookkeeping, and financial tracking. Connect your bank accounts securely through Plaid, and transactions sync in real-time to your spreadsheet. Free forever for the last 7 days of transactions."
        }
      },
      {
        "@type": "Question",
        "name": "How much does SheetLink cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "SheetLink is free forever for the last 7 days of transactions - perfect for weekly budget tracking. For unlimited transaction history and real-time auto-sync, it costs $2/month. This is significantly more affordable than alternatives like Tiller Money ($79/year) or YNAB ($14.99/month)."
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
          "text": "SheetLink costs $2/month for unlimited history vs Tiller's $79/year ($6.58/month). SheetLink offers financial templates through Recipes and supports both personal budgeting and small business bookkeeping use cases. Tiller focuses primarily on personal finance. Both sync bank transactions to Google Sheets using Plaid. SheetLink has a free tier (7 days of history) that Tiller doesn't offer."
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

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content="sync bank to google sheets, bank transaction sync, google sheets budgeting, google sheets bookkeeping, personal finance, plaid google sheets, spreadsheet accounting, chrome extension" />
        <meta name="author" content={BRAND.name} />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* FAQ Schema for AI Answer Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />

        {/* OpenGraph */}
        <meta property="og:url" content={seoUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:site_name" content={BRAND.name} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@sheetlink" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />

        <link rel="canonical" href={seoUrl} />
      </Head>

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

        {/* How It Works */}
        <HowItWorks />

        {/* Security & Privacy */}
        <SecurityPrivacy />

        <Footer />
      </div>
    </>
  );
}
