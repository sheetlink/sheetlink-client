import Head from 'next/head';
import Link from 'next/link';
import { Rocket, Book, Lock, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';

export default function Docs() {
  const seoTitle = `Documentation - ${BRAND.name}`;
  const seoDescription = 'Learn how to set up and use SheetLink to sync your bank data with Google Sheets.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 py-20 text-center">
          <h1 className="mb-4 text-5xl font-bold text-sheetlink-text md:text-6xl">
            Documentation
          </h1>
          <p className="text-xl text-gray-600">
            Everything you need to get started with SheetLink
          </p>
        </section>

        {/* Documentation Cards */}
        <section className="mx-auto max-w-5xl px-4 pb-20">
          <div className="grid gap-8 md:grid-cols-2">
            {/* First Sync Guide */}
            <Link
              href="/first-sync"
              className="group flex flex-col rounded-xl border-2 border-gray-200 bg-white p-8 transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-xl"
            >
              <div className="mb-4">
                <Rocket className="h-12 w-12 text-sheetlink-green-700 stroke-[1.5]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-sheetlink-text">
                First Sync Guide
              </h2>
              <p className="mb-4 flex-1 text-gray-600">
                Complete your first sync: connect your bank, link your Google Sheet, and start pulling transactions. Free forever for the last 7 days.
              </p>
              <div className="flex items-center text-sheetlink-green-700 font-semibold">
                Get started
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* User Guide */}
            <Link
              href="/user-guide"
              className="group flex flex-col rounded-xl border-2 border-gray-200 bg-white p-8 transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-xl"
            >
              <div className="mb-4">
                <Book className="h-12 w-12 text-sheetlink-green-700 stroke-[1.5]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-sheetlink-text">
                User Guide
              </h2>
              <p className="mb-4 flex-1 text-gray-600">
                Learn how to manage your connections, handle errors, and get the most out of SheetLink's features.
              </p>
              <div className="flex items-center text-sheetlink-green-700 font-semibold">
                Read guide
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* Privacy & Security */}
            <Link
              href="/privacy"
              className="group flex flex-col rounded-xl border-2 border-gray-200 bg-white p-8 transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-xl"
            >
              <div className="mb-4">
                <Lock className="h-12 w-12 text-sheetlink-green-700 stroke-[1.5]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-sheetlink-text">
                Privacy Policy
              </h2>
              <p className="mb-4 flex-1 text-gray-600">
                Understand what data we store, what we don't, and how SheetLink protects your financial information.
              </p>
              <div className="flex items-center text-sheetlink-green-700 font-semibold">
                Read policy
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* Security */}
            <Link
              href={URLS.security}
              className="group flex flex-col rounded-xl border-2 border-gray-200 bg-white p-8 transition-all duration-200 hover:border-sheetlink-green-700 hover:shadow-xl"
            >
              <div className="mb-4">
                <Shield className="h-12 w-12 text-sheetlink-green-700 stroke-[1.5]" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-sheetlink-text">
                Security
              </h2>
              <p className="mb-4 flex-1 text-gray-600">
                Learn about SheetLink's security architecture, data flow, encryption, and vulnerability reporting.
              </p>
              <div className="flex items-center text-sheetlink-green-700 font-semibold">
                Learn more
                <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </section>

        {/* Quick Links */}
        <section className="mx-auto max-w-5xl px-4 pb-20">
          <div className="rounded-xl border-2 border-gray-200 bg-white p-8">
            <h3 className="mb-6 text-xl font-bold text-sheetlink-text">Quick Links</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <a
                href={URLS.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-sheetlink-green-700 hover:bg-sheetlink-green-50"
              >
                <svg className="h-6 w-6 text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                <span className="font-medium text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700">View on GitHub</span>
              </a>

              <Link
                href="/beta"
                className="group flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-sheetlink-green-700 hover:bg-sheetlink-green-50"
              >
                <svg className="h-6 w-6 text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span className="font-medium text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700">Get Early Access</span>
              </Link>

              <Link
                href="/about"
                className="group flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-sheetlink-green-700 hover:bg-sheetlink-green-50"
              >
                <svg className="h-6 w-6 text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="font-medium text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700">About SheetLink</span>
              </Link>

              <a
                href="mailto:support@sheetlink.app"
                className="group flex items-center gap-3 rounded-lg border border-gray-200 p-4 transition-colors hover:border-sheetlink-green-700 hover:bg-sheetlink-green-50"
              >
                <svg className="h-6 w-6 text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="font-medium text-sheetlink-text transition-colors group-hover:text-sheetlink-green-700">Contact Support</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mx-auto max-w-4xl px-4 pb-20 text-center">
          <div className="rounded-xl border-2 border-sheetlink-green-700 bg-gradient-to-br from-sheetlink-green-50 to-white p-12">
            <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
              Ready to sync your bank data?
            </h2>
            <p className="mb-8 text-lg text-gray-600">
              Install SheetLink and connect your real bank accounts. The Free Tier is free forever.
            </p>
            <Link
              href="/first-sync"
              className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-xl"
            >
              Start Your First Sync
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
