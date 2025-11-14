import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function Terms() {
  const seoTitle = `Terms of Service - ${BRAND.name}`;
  const seoDescription = 'SheetLink Terms of Service: Terms and conditions for using our service.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        <section className="mx-auto max-w-4xl px-4 py-20">
          <h1 className="mb-4 text-5xl font-bold text-sheetlink-text">Terms of Service</h1>
          <p className="mb-8 text-sm text-gray-500">Last updated: November 2025</p>

          <div className="prose prose-lg max-w-none text-gray-600">
            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Acceptance of Terms</h2>
            <p>
              By accessing or using SheetLink ("the Service"), you agree to be bound by these Terms
              of Service. If you don't agree to these terms, please don't use the Service.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Description of Service</h2>
            <p>
              SheetLink is a Chrome extension that connects your bank accounts to Google Sheets via
              Plaid's secure banking infrastructure. The Service allows you to automatically sync
              transaction data from your financial institutions to your personal Google Sheets.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Beta Access</h2>
            <p>
              Early beta testers receive lifetime free access to SheetLink's core features. This
              offer is subject to fair use policies and may be modified for future users after the
              beta period ends.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">User Responsibilities</h2>
            <p>You agree to:</p>
            <ul className="space-y-2">
              <li>Provide accurate information when setting up your account</li>
              <li>Keep your Google account and bank credentials secure</li>
              <li>Use the Service only for lawful purposes</li>
              <li>Not attempt to reverse engineer, modify, or distribute the Service</li>
              <li>Not use the Service to violate any applicable laws or regulations</li>
            </ul>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Third-Party Services</h2>
            <h3 className="text-xl font-semibold text-sheetlink-text">Plaid</h3>
            <p>
              SheetLink uses Plaid to connect to your financial institutions. Your use of Plaid is
              subject to Plaid's own terms and privacy policy. By using SheetLink, you authorize
              us to access your financial data through Plaid on your behalf.
            </p>
            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Google Sheets</h3>
            <p>
              SheetLink requires access to your Google Sheets to write transaction data. Your use
              of Google services is subject to Google's terms of service.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">
              Limitation of Liability
            </h2>
            <p>
              SheetLink is provided "as is" without warranties of any kind. We strive for accuracy
              and reliability, but we cannot guarantee that:
            </p>
            <ul className="space-y-2">
              <li>The Service will be uninterrupted or error-free</li>
              <li>All transaction data will be 100% accurate</li>
              <li>Third-party services (Plaid, Google) will always be available</li>
            </ul>
            <p className="mt-4">
              To the fullest extent permitted by law, SheetLink is not liable for any indirect,
              incidental, or consequential damages arising from your use of the Service.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Data Accuracy</h2>
            <p>
              While we strive to provide accurate transaction data, you should verify important
              financial information directly with your bank. SheetLink is a tool to help you
              organize your finances, not a replacement for your bank's official records.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Account Termination</h2>
            <p>
              You may delete your SheetLink account at any time. We reserve the right to suspend
              or terminate accounts that violate these terms or engage in abusive behavior.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Changes to Terms</h2>
            <p>
              We may update these terms from time to time. If we make material changes, we'll
              notify you via email or through the extension. Continued use of the Service after
              changes constitutes acceptance of the new terms.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Governing Law</h2>
            <p>
              These terms are governed by the laws of the United States. Any disputes will be
              resolved in accordance with US law.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Contact</h2>
            <p>
              Questions about these terms? Contact us at{' '}
              <a href="mailto:legal@sheetlink.app" className="text-sheetlink-green-700 underline">
                legal@sheetlink.app
              </a>
              .
            </p>

            <div className="mt-16 rounded-lg border-2 border-gray-200 bg-gray-50 p-6 text-sm">
              <p>
                By using SheetLink, you acknowledge that you have read, understood, and agree to
                these Terms of Service and our Privacy Policy.
              </p>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
