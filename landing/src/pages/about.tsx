import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function About() {
  const seoTitle = `About - ${BRAND.name}`;
  const seoDescription = 'Learn about SheetLink and our mission to make personal finance transparent and accessible.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="mb-8 text-5xl font-bold text-sheetlink-text">About SheetLink</h1>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="text-xl leading-relaxed">
              SheetLink connects your bank accounts to Google Sheets, giving you complete control
              over your financial data. Built on Plaid's secure banking infrastructure, we believe
              your financial data should be yours. Live, private, and stored where you want it.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Our Mission</h2>
            <p>
              Too many personal finance tools lock your data behind proprietary platforms. We're
              building something different: a simple Chrome extension that puts your transaction
              history directly into your own Google Sheet, updated in real-time.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Why We Built This</h2>
            <p>
              Because spreadsheets are powerful. They're flexible, customizable, and already
              familiar to millions of people. Whether you're tracking expenses, building budgets,
              or analyzing spending patterns, your data should flow directly into the tool you
              already use, without middlemen, without subscription lock-in, and without compromising
              your privacy.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Security First</h2>
            <p>
              SheetLink uses Plaid, trusted by thousands of financial apps, to securely connect
              to your bank. Your banking credentials are never stored on our servers. All data
              flows directly from your bank to your Google Sheet, encrypted end-to-end.
            </p>

            <div className="mt-16 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8 text-center">
              <p className="text-lg font-semibold text-sheetlink-text">
                Get SheetLink and start syncing your bank transactions to Google Sheets.
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Free forever for the last 7 days of transactions. No credit card required.
              </p>
              <a
                href="https://chromewebstore.google.com/detail/sheetlink-%E2%80%94-connect-your/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                </svg>
                Add to Chrome
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
