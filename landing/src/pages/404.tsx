import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found - {BRAND.name}</title>
        <meta name="robots" content="noindex" />
      </Head>

      <Header />
      <main className="pt-16">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
          <div className="text-center">
            <h1 className="mb-2 text-8xl font-bold text-sheetlink-green-700">404</h1>
            <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
              Oops. This page got lost in the grid.
            </h2>
            <p className="mb-8 text-xl text-gray-600">
              Looks like this page doesn't exist. Maybe it was deleted, or the URL is wrong.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/"
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                Back to Home
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center rounded-lg border-2 border-sheetlink-green-700 px-6 py-3 font-semibold text-sheetlink-green-700 transition-all hover:bg-sheetlink-green-700 hover:text-white"
              >
                View Docs
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}
