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
            {/* Plain-English Summary */}
            <h3 className="text-2xl font-bold text-sheetlink-text">Plain-English Summary</h3>
            <p>
              These Terms explain what SheetLink is, how the sandbox demo works, and what responsibilities you agree to when using it. SheetLink is an early-stage product that helps you connect Plaid's Sandbox to Google Sheets. During this phase:
            </p>
            <ul className="space-y-2">
              <li>You can only use fake sandbox data.</li>
              <li>SheetLink does not store your transactions or banking activity.</li>
              <li>You are responsible for how you use any data pulled into your own Google Sheets.</li>
              <li>SheetLink is provided "as is" while we continue to build and improve the service.</li>
            </ul>
            <p>
              The full legal terms below apply to all use of the SheetLink sandbox and Chrome extension.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Acceptance of Terms</h2>
            <p>
              By accessing or using SheetLink ("the Service"), you agree to be bound by these Terms
              of Service. If you don't agree to these terms, please don't use the Service.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Description of Service</h2>
            <p>
              SheetLink is a browser extension and optional API service that helps users sync banking data from Plaid Sandbox into their own Google Sheets. It is a pass-through utility - SheetLink does not store transaction data, balances, categories, or bank account details on its servers. Only encrypted access tokens and minimal sync metadata are retained.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Sandbox-Only Environment</h2>
            <p>
              SheetLink currently operates entirely in a sandbox environment. This means:
            </p>
            <ul className="space-y-2">
              <li>You may only connect to Plaid's Sandbox test institutions.</li>
              <li>All data returned is fake, for testing and demonstration purposes.</li>
              <li>No real financial information can be accessed through SheetLink at this stage.</li>
            </ul>
            <p>
              Any attempt to use real banking credentials is prohibited.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">No Storage of Financial Data</h2>
            <p>
              SheetLink does not store, log, or archive any transaction data, balances, categories, or account details. All financial data flows directly:
            </p>
            <p>
              Plaid → Your browser → Your Google Sheet.
            </p>
            <p>
              Our servers only handle encrypted tokens needed for Plaid Link to function. You are solely responsible for any data once it enters your Google Sheet.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Chrome Extension Permissions</h2>
            <p>
              The SheetLink extension requests the minimum permissions required to function:
            </p>
            <ul className="space-y-2">
              <li>Access to Google Sheets and Drive APIs</li>
              <li>Ability to open Plaid Link in a secure window</li>
              <li>Access to your Sheet URL for writing data</li>
            </ul>
            <p>
              The extension does not track your browsing behavior, does not monitor web activity, and does not inject scripts into other websites.
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

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Acceptable Use</h2>
            <p>You agree not to:</p>
            <ul className="space-y-2">
              <li>Use the sandbox for any unlawful purpose</li>
              <li>Attempt to connect real financial institutions</li>
              <li>Interfere with or probe the underlying services</li>
              <li>Misuse access tokens or attempt to extract real data</li>
              <li>Resell or redistribute the extension without permission</li>
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
              Limitations of Liability
            </h2>
            <p>
              SheetLink is provided as an early-stage beta product. We do not guarantee that the service will be uninterrupted, accurate, or error-free. You agree that SheetLink is not responsible for any damage, loss, or issues that may arise from using the sandbox, the extension, or any data written to your Google Sheets.
            </p>
            <p>
              If you are not comfortable using an early product, please do not use SheetLink.
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
              If you have questions about these Terms or need help with the sandbox, contact us at:
            </p>
            <p>
              <a href="mailto:support@sheetlink.app" className="text-sheetlink-green-700 underline">
                support@sheetlink.app
              </a>
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
