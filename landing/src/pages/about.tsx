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
                Join our beta and get lifetime free access.
              </p>
              <a
                href="/"
                className="mt-4 inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                Sign Up for Beta
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
