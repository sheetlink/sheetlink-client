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
          <p className="mb-8 text-sm text-gray-500">Last updated: December 2025</p>

          <div className="prose prose-lg max-w-none text-gray-600">
            {/* Plain-English Summary */}
            <h3 className="text-2xl font-bold text-sheetlink-text">Plain-English Summary</h3>
            <p>
              These Terms explain what SheetLink is, how it works, and what responsibilities you agree to when using it. SheetLink is a Chrome extension that connects your real bank accounts to Google Sheets via Plaid. Here's what you need to know:
            </p>
            <ul className="space-y-2">
              <li>SheetLink offers three subscription tiers: FREE (7 days, 11 fields), BASIC (90 days, 11 fields), and PRO (730 days, 33 fields).</li>
              <li>The FREE Tier is free forever with access to the last 7 days of transaction history.</li>
              <li>SheetLink does not store your transactions or banking activity. Data flows directly to your Google Sheet.</li>
              <li>You are responsible for how you use any data in your Google Sheets.</li>
              <li>SheetLink is provided "as is" with no guaranteed uptime or SLA.</li>
            </ul>
            <p>
              The full legal terms below apply to all use of SheetLink and the Chrome extension.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Acceptance of Terms</h2>
            <p>
              By accessing or using SheetLink ("the Service"), you agree to be bound by these Terms
              of Service. If you don't agree to these terms, please don't use the Service.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Description of Service</h2>
            <p>
              SheetLink is a Chrome extension and API service that helps users sync banking transaction data from their real financial institutions into their own Google Sheets via Plaid. It is a pass-through utility. SheetLink does not store transaction data, balances, categories, or bank account details on its servers. Only encrypted Plaid access tokens, Google user identifiers, and minimal sync metadata are retained.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Subscription Tiers</h2>
            <p>
              SheetLink offers three subscription tiers with different levels of historical data access and transaction detail. All tiers use the same pass-through architecture (we never store your transaction data).
            </p>

            <h3 className="mt-8 text-2xl font-bold text-sheetlink-text">FREE Tier</h3>
            <ul className="space-y-2">
              <li><strong>Cost:</strong> Free forever</li>
              <li><strong>Transaction history:</strong> 7 days per connected institution</li>
              <li><strong>Transaction fields:</strong> 11 core fields (date, amount, description, merchant, category, etc.)</li>
              <li><strong>Bank connections:</strong> Unlimited institutions</li>
              <li><strong>Sync control:</strong> Manual sync (you control when transactions are fetched)</li>
              <li><strong>Google Sheets:</strong> Unlimited connected sheets</li>
            </ul>

            <h3 className="mt-8 text-2xl font-bold text-sheetlink-text">BASIC Tier</h3>
            <ul className="space-y-2">
              <li><strong>Cost:</strong> TBD (currently admin-provisioned only)</li>
              <li><strong>Transaction history:</strong> 90 days per connected institution (~3 months)</li>
              <li><strong>Transaction fields:</strong> 11 core fields (same as FREE)</li>
              <li><strong>Bank connections:</strong> Unlimited institutions</li>
              <li><strong>All FREE tier features included</strong></li>
            </ul>

            <h3 className="mt-8 text-2xl font-bold text-sheetlink-text">PRO Tier</h3>
            <ul className="space-y-2">
              <li><strong>Cost:</strong> TBD (currently admin-provisioned only)</li>
              <li><strong>Transaction history:</strong> 730 days per connected institution (2 years)</li>
              <li><strong>Transaction fields:</strong> 33 total fields including:
                <ul className="ml-6 mt-2 space-y-1">
                  <li>All 11 core fields from FREE/BASIC</li>
                  <li>Enhanced dates (authorized_date, datetime, authorized_datetime)</li>
                  <li>Merchant details (merchant_entity_id, website, logo_url)</li>
                  <li>Location data (address, city, region, postal code, lat/lon)</li>
                  <li>Transaction metadata (check_number, pending_transaction_id)</li>
                  <li>Personal finance categories (detailed categorization)</li>
                </ul>
              </li>
              <li><strong>Bank connections:</strong> Unlimited institutions</li>
              <li><strong>All BASIC tier features included</strong></li>
            </ul>

            <h3 className="mt-8 text-2xl font-bold text-sheetlink-text">Transaction Fields by Tier</h3>
            <p><strong>11 Core Fields (FREE & BASIC tiers):</strong></p>
            <ul className="space-y-1">
              <li>transaction_id, account_id, date, description_raw, merchant_name</li>
              <li>amount, iso_currency_code, pending, plaid_category</li>
              <li>payment_channel, transaction_code</li>
            </ul>

            <p className="mt-4"><strong>Additional 22 Fields (PRO tier only):</strong></p>
            <ul className="space-y-1">
              <li>authorized_date, datetime, authorized_datetime</li>
              <li>merchant_entity_id, unofficial_currency_code</li>
              <li>pending_transaction_id, check_number</li>
              <li>personal_finance_category (primary & detailed)</li>
              <li>transaction_type</li>
              <li>location (address, city, region, postal_code, country, lat, lon)</li>
              <li>website, logo_url</li>
            </ul>

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

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Tier Changes & Data Handling</h2>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Upgrading Tiers</h3>
            <p>When you upgrade from FREE to BASIC, or BASIC to PRO:</p>
            <ul className="space-y-2">
              <li>You immediately gain access to longer transaction history</li>
              <li>PRO users gain access to 33 transaction fields (vs 11 for FREE/BASIC)</li>
              <li>Your existing Google Sheets are not modified automatically</li>
              <li>Next sync will use your new tier limits and field access</li>
              <li>You can re-run backfill to get more historical data within new tier limits</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Downgrading Tiers</h3>
            <p>When you downgrade from PRO to BASIC/FREE, or BASIC to FREE:</p>
            <ul className="space-y-2">
              <li><strong>Column mismatch detection:</strong> Extension detects if your sheet has more columns than your new tier allows</li>
              <li><strong>Data clearing warning:</strong> You'll be warned before any data is removed from your sheet</li>
              <li><strong>Forced clearing:</strong> To sync with a downgraded tier, excess columns must be cleared from your sheet</li>
              <li><strong>Data not recovered:</strong> If you downgrade from PRO (33 fields) to FREE (11 fields), the extra 22 fields are permanently removed from your sheet</li>
              <li><strong>Re-upgrade option:</strong> If you upgrade again, you'll need to reconnect to restore full field access</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Data Retention Policies</h3>
            <p>
              <strong>Important:</strong> SheetLink uses a <em>pass-through architecture</em> and does not store your transaction data on our servers. Data retention refers to how much <strong>historical data you can fetch</strong> from your bank via Plaid:
            </p>
            <ul className="space-y-2">
              <li><strong>FREE:</strong> Can fetch transactions from the last 7 days</li>
              <li><strong>BASIC:</strong> Can fetch transactions from the last 90 days</li>
              <li><strong>PRO:</strong> Can fetch transactions from the last 730 days (2 years)</li>
            </ul>
            <p>
              Your Google Sheet stores the transactions indefinitely (we never delete data from your sheet). Tier limits only apply to how far back we can <em>fetch new data</em>.
            </p>

            <h2 className="mt-12 text-3xl font-bold text-sheetlink-text">Authentication & Session Management</h2>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Google OAuth Sign-In</h3>
            <p>SheetLink uses Google OAuth for authentication. When you sign in:</p>
            <ul className="space-y-2">
              <li>You authenticate directly with Google (we never see your Google password)</li>
              <li>Google provides us with your email address and user ID</li>
              <li>We create a user record with your email, Google user ID, and subscription tier</li>
              <li>We generate a JWT token for secure API authentication</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Session Expiry</h3>
            <p>
              For security, JWT authentication tokens expire after <strong>60 minutes</strong>. When your session expires:
            </p>
            <ul className="space-y-2">
              <li>You'll be prompted to sign in again with Google</li>
              <li>Re-authentication is usually one-click (Google remembers recent sign-ins)</li>
              <li>A new JWT token is issued with another 60-minute validity</li>
              <li>Your bank connections and sheet configurations are preserved</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Account Security</h3>
            <p>To protect your account:</p>
            <ul className="space-y-2">
              <li>JWT tokens are stored securely in Chrome's encrypted storage</li>
              <li>Tokens are never transmitted to third parties</li>
              <li>All API requests use HTTPS encryption</li>
              <li>Backend verifies every token's cryptographic signature</li>
              <li>Invalid or expired tokens are rejected immediately</li>
            </ul>

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
              <li>Use SheetLink for any unlawful purpose</li>
              <li>Attempt to bypass rate limits or usage restrictions</li>
              <li>Interfere with or probe the underlying services or infrastructure</li>
              <li>Misuse access tokens or attempt to extract data beyond intended use</li>
              <li>Resell, redistribute, or commercialize the extension without permission</li>
              <li>Create excessive numbers of Plaid Items to abuse the Free Tier</li>
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
              SheetLink is provided "as is" without warranties of any kind, either express or implied. We do not guarantee that the service will be uninterrupted, accurate, or error-free. The Free Tier does not include any service level agreement (SLA) or uptime guarantees.
            </p>
            <p>
              You agree that SheetLink is not responsible for any damage, loss, or issues that may arise from using the extension, the service, or any data written to your Google Sheets. SheetLink acts solely as a conduit for transaction data and is not a financial advisor or accounting service.
            </p>
            <p>
              If you are not comfortable with these limitations, please do not use SheetLink.
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
