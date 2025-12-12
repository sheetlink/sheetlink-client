import Head from 'next/head';
import { Lock } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function Privacy() {
  const seoTitle = `Privacy Policy | ${BRAND.name}`;
  const seoDescription = 'Learn how SheetLink protects your data by design. We never store your transactions, only encrypted tokens.';

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="mx-auto max-w-4xl px-4 pb-8 pt-20">
          <div className="mb-0 text-center">
            <h1 className="mb-6 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 bg-clip-text text-5xl font-bold text-transparent md:text-6xl">
              Privacy isn't a feature.
              <br />
              It's the foundation.
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-600">
              SheetLink never stores your financial data. Transactions flow from Plaid to your
              spreadsheet, nowhere else. Available now on the Free Tier. Connect real bank accounts for free.
            </p>
          </div>
        </section>

        {/* TL;DR Summary */}
        <section className="mx-auto max-w-4xl px-4 py-8">
          <div className="prose prose-lg max-w-none">
            <h3 className="text-2xl font-bold text-sheetlink-text">In plain language (TL;DR)</h3>

            <p className="text-gray-700">
              SheetLink never sees, stores, or sells your banking data.
            </p>

            <p className="text-gray-700">
              All sensitive data flows directly between Plaid, your browser, and your Google Sheet. Our servers only handle short-lived, encrypted token exchanges so the extension can communicate securely with your bank. Transaction data never touches our database.
            </p>

            <p className="text-gray-700">We:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li><strong>Do store</strong>: encrypted Plaid access tokens, Google user ID, email address (for authenticated users), subscription tier (FREE/BASIC/PRO), linked sheet metadata (ID and title), institution names, and minimal sync metadata.</li>
              <li><strong>Do store (in browser only)</strong>: JWT authentication tokens with 60-minute expiry, stored locally in Chrome's secure storage.</li>
              <li><strong>Do not store</strong>: transactions, balances, categories, or anything about your banking activity. We also never store your Google OAuth tokens or sheet contents.</li>
              <li><strong>Do not sell</strong> or share any data, ever.</li>
            </ul>

            <p className="text-gray-700">
              You can delete all your data at any time.
            </p>
          </div>
        </section>

        {/* Data Flow */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">How your data flows</h2>
          <p className="mb-8 text-gray-600 prose prose-lg">SheetLink is designed to be a transparent data pipe, not a data vault.</p>

          <div className="mb-8 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  1
                </div>
                <div>
                  <div className="mb-1 font-semibold text-sheetlink-text">Plaid → SheetLink API</div>
                  <div className="text-sm text-gray-700">Token exchange only (no transaction data)</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  2
                </div>
                <div>
                  <div className="mb-1 font-semibold text-sheetlink-text">SheetLink API → Plaid</div>
                  <div className="text-sm text-gray-700">Fetch transactions using encrypted token</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  3
                </div>
                <div>
                  <div className="mb-1 font-semibold text-sheetlink-text">SheetLink API → Your Browser</div>
                  <div className="text-sm text-gray-700">Returns JSON (deleted immediately after)</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-lg font-bold text-white">
                  4
                </div>
                <div>
                  <div className="mb-1 font-semibold text-sheetlink-text">Your Browser → Your Google Sheet</div>
                  <div className="text-sm text-gray-700">Data written directly by the extension</div>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-md bg-white p-4 text-center">
              <p className="font-semibold text-sheetlink-text">✅ SheetLink never stores your transaction history.</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border-2 border-sheetlink-accent bg-green-50 p-6">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <Lock className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
              </div>
              <div>
                <strong className="text-lg text-sheetlink-text">Privacy Guarantee:</strong>
                <p className="mt-2 text-gray-700">
                  SheetLink is a pass-through integration, not a data warehouse. When you sync, transaction data flows through our servers for less than a second, just long enough to fetch from Plaid and return to your browser. Nothing is cached or logged.
                </p>
              </div>
            </div>
          </div>          

          {/* <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              SheetLink is a pass-through integration, not a data warehouse. When you sync, transaction data flows through our servers for less than a second, just long enough to fetch from Plaid and return to your browser. Nothing is cached or logged.
            </p>
          </div> */}
        </section>
        {/* PRD v0.4.0 section end: Data Flow */}

        {/* PRD v0.7.4 section start: What we store vs don't store */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-8 text-3xl font-bold text-sheetlink-text">
            What we store vs. what we don't
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            {/* What we store */}
            <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-green-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-sheetlink-text">What We Store</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Encrypted Plaid access tokens</li>
                <li>✓ Google user identifier (email or stable Google ID)</li>
                <li>✓ Linked sheet metadata (sheet ID, title)</li>
                <li>✓ Plaid metadata: <code className="text-sm">item_id</code>, <code className="text-sm">institution_id</code>, <code className="text-sm">cursor</code>, timestamps</li>
                <li>✓ Minimal operational logs (non-PII)</li>
              </ul>
              <p className="mt-4 text-sm text-gray-700">
                We use <strong>Fernet encryption</strong> (AES-128-CBC + HMAC) to store Plaid tokens at rest. Only encrypted values are stored in our database.
              </p>
            </div>

            {/* What we don't store */}
            <div className="rounded-lg border-2 border-gray-300 bg-gray-50 p-6">
              <h3 className="mb-4 text-xl font-bold text-sheetlink-text">What We Don't Store</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✗ Transaction line items (amounts, merchants, categories, dates)</li>
                <li>✗ Account balances or transaction history</li>
                <li>✗ Bank usernames or passwords (handled exclusively by Plaid)</li>
                <li>✗ Google OAuth tokens (these remain in your browser)</li>
                <li>✗ Contents of your Google Sheets</li>
              </ul>
              <p className="mt-4 text-sm text-gray-700">
                <strong className="text-red-500">Explicitly:</strong> We do NOT store your transaction details, balances, or any identifiable financial activity. Transaction data flows through our servers for less than a second during sync, then is immediately discarded.
              </p>
            </div>
          </div>
        </section>
        {/* PRD v0.7.4 section end: What we store vs don't store */}

        {/* Google OAuth Flow */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Google OAuth & Callback Page</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              When you authorize Google Sheets access, SheetLink uses a <strong>client-side OAuth flow</strong> that keeps your token completely private:
            </p>

            <ol className="list-decimal pl-6 space-y-2">
              <li>Extension opens Google OAuth in a popup window</li>
              <li>You authorize Google Sheets access via Google's secure page</li>
              <li>Google redirects to <code className="text-sm bg-gray-100 px-2 py-1 rounded">https://sheetlink.app/oauth/callback</code> with access token</li>
              <li>Callback page sends token to extension via local Chrome messaging</li>
              <li>Extension stores token locally for subsequent syncs</li>
            </ol>

            <div className="mt-6 rounded-lg border-2 border-sheetlink-accent bg-green-50 p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Lock className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                </div>
                <div>
                  <strong className="text-lg text-sheetlink-text">OAuth Privacy Guarantee:</strong>
                  <p className="mt-2 text-gray-700">
                    The OAuth callback page at <code className="text-sm">sheetlink.app/oauth/callback</code> <strong>never sends your token to any server</strong>. It runs entirely client-side (JavaScript in your browser), extracts the token from the URL, and passes it directly to the extension using Chrome's local messaging API. No analytics, no logging, no server processing.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-4">
              Your Google OAuth token is stored only in the extension's local storage (encrypted by Chrome) and never leaves your device.
            </p>
          </div>
        </section>

        {/* JWT Authentication & Session Management */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">
            JWT Authentication & Session Management
          </h2>

          <div className="prose prose-lg max-w-none text-gray-600">
            <h3 className="text-xl font-semibold text-sheetlink-text">What Are JWT Tokens?</h3>
            <p>
              JWT (JSON Web Tokens) are secure tokens that prove you're authenticated.
              After you sign in with Google, our backend generates a JWT token that the
              extension stores locally in your browser.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">How They Work:</h3>
            <ol className="list-decimal pl-6 space-y-2">
              <li>You sign in with Google OAuth (one-time)</li>
              <li>Backend verifies your Google identity and creates a JWT token</li>
              <li>Extension stores JWT token in Chrome's secure storage</li>
              <li>Extension sends JWT with each API request (Authorization header)</li>
              <li>Backend uses JWT to identify you and apply your subscription tier</li>
            </ol>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">What Tokens Contain:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your user ID (UUID)</li>
              <li>Your email address</li>
              <li>Token expiration timestamp (60 minutes)</li>
              <li>Cryptographic signature (prevents tampering)</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">What Tokens DON'T Contain:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your Google OAuth token</li>
              <li>Your bank data or transactions</li>
              <li>Your Google Sheets information</li>
              <li>Any personally identifiable financial data</li>
            </ul>

            <div className="mt-6 rounded-lg border-2 border-sheetlink-accent bg-green-50 p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Lock className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                </div>
                <div>
                  <strong className="text-lg text-sheetlink-text">Session Expiry:</strong>
                  <p className="mt-2 text-gray-700">
                    JWT tokens expire after <strong>60 minutes</strong> for security. When your
                    session expires, you'll be prompted to sign in again with Google. This quick
                    re-authentication (usually one click) ensures your account stays secure.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Subscription Tiers & Data Access */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">
            Subscription Tiers & Data Access
          </h2>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              SheetLink offers three subscription tiers with different historical data access:
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-3">
              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">FREE Tier</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>7 days</strong> of transaction history</li>
                  <li><strong>11 core fields</strong> per transaction</li>
                  <li>Unlimited bank connections</li>
                  <li>Manual sync control</li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">BASIC Tier</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>90 days</strong> of transaction history</li>
                  <li><strong>11 core fields</strong> per transaction</li>
                  <li>All FREE features</li>
                  <li>Extended history access</li>
                </ul>
              </div>

              <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">PRO Tier</h3>
                <ul className="space-y-2 text-sm">
                  <li><strong>730 days</strong> (2 years) of history</li>
                  <li><strong>33 total fields</strong> per transaction</li>
                  <li>All BASIC features</li>
                  <li>Enhanced details (location, merchant IDs)</li>
                </ul>
              </div>
            </div>

            <h3 className="mt-8 text-xl font-semibold text-sheetlink-text">What We Store:</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Subscription tier</strong>: Your current tier (FREE/BASIC/PRO)</li>
              <li><strong>Tier history</strong>: When you change tiers (for data integrity)</li>
              <li><strong>Feature usage</strong>: Which features you've accessed (not usage frequency)</li>
            </ul>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Tier Changes & Data:</h3>
            <p>
              When you change subscription tiers:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Upgrade</strong>: Access more history and fields immediately</li>
              <li><strong>Downgrade</strong>: Extension may clear extra data from your sheet to match new tier limits</li>
              <li><strong>Data safety</strong>: We warn you before clearing any data from your sheets</li>
              <li><strong>Your control</strong>: You can always reconnect to restore data within tier limits</li>
            </ul>

            <div className="mt-6 rounded-lg border-2 border-sheetlink-accent bg-green-50 p-6">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <Lock className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                </div>
                <div>
                  <strong className="text-lg text-sheetlink-text">Pass-Through Architecture:</strong>
                  <p className="mt-2 text-gray-700">
                    SheetLink does not store your transaction data on our servers. Data retention
                    refers to how much <strong>historical data you can fetch</strong> from your bank
                    via Plaid. Your Google Sheet stores transactions indefinitely. Tier limits only
                    apply to how far back we can fetch new data.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Security Measures</h2>
          <div className="space-y-3 text-gray-600">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 flex-shrink-0 text-sheetlink-green-900 mt-0.5 stroke-[1.5]" />
              <p>All API communication over HTTPS (TLS/SSL)</p>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 flex-shrink-0 text-sheetlink-green-900 mt-0.5 stroke-[1.5]" />
              <p>Plaid tokens encrypted at rest with Fernet (AES-256)</p>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 flex-shrink-0 text-sheetlink-green-900 mt-0.5 stroke-[1.5]" />
              <p>Google OAuth tokens never sent to servers (client-side only)</p>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 flex-shrink-0 text-sheetlink-green-900 mt-0.5 stroke-[1.5]" />
              <p>CORS restricted to SheetLink domains and Chrome extension only</p>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 flex-shrink-0 text-sheetlink-green-900 mt-0.5 stroke-[1.5]" />
              <p>Privacy middleware suppresses sensitive logs</p>
            </div>
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 flex-shrink-0 text-sheetlink-green-900 mt-0.5 stroke-[1.5]" />
              <p>Client-side transaction processing (rules engine runs in your browser)</p>
            </div>
          </div>
        </section> 

        {/* Technical Privacy section start: Encryption & Transparency */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Built for builders, auditable by design</h2>

          <div className="prose prose-lg max-w-none text-gray-600">
            <h3 className="text-xl font-semibold text-sheetlink-text">Encryption details</h3>
            <p>
              We use <strong>Fernet encryption</strong> (AES-128-CBC + HMAC) to protect Plaid access tokens at rest. The encryption key is stored securely in environment variables and tokens are only decrypted during sync operations. This means even if someone gained access to our database, they couldn't read your tokens without the encryption key.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Open source transparency</h3>
            <p>
              SheetLink's <strong>browser extension and client code</strong> is fully open source and available for audit on{' '}
              <a
                href="https://github.com/sheetlink/sheetlink-client"
                className="text-sheetlink-green-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>. You can inspect exactly how your data flows through the extension, verify what permissions it uses, and review all client-side logic. The backend API is private for business and security reasons, but its architecture is fully documented in the public repository.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Privacy middleware</h3>
            <p>
              Our backend includes privacy middleware that automatically suppresses detailed logging for all Plaid-related endpoints. Only high-level request metadata is logged (like "POST /plaid/sync"), never request bodies or transaction data. This ensures your financial data never appears in server logs, even accidentally.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Why the backend is private</h3>
            <p>
              SheetLink's client code (browser extension, landing site) is <strong>fully open source</strong>. The backend API is in a <strong>private repository</strong> for these reasons:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Intellectual Property</strong>: Protects business logic and future subscription features</li>
              <li><strong>Security</strong>: Prevents exposure of internal security patterns and infrastructure details</li>
              <li><strong>Chrome Store & Plaid Compliance</strong>: Simplifies review processes by separating public-facing code from internal services</li>
              <li><strong>Prevents Clones</strong>: Protects against direct commercial copying while maintaining user trust through client transparency</li>
            </ul>
            <p className="mt-4">
              <strong>Transparency commitment</strong>: While the backend code is private, its minimal architecture is fully documented in the public repository. You can see exactly what endpoints exist, what data they handle, and how your information flows. All backend operations are limited to token storage (encrypted), transaction pass-through (never stored), and Google Sheets writes. For maximum privacy, you can still self-host the entire backend using our Docker deployment guide.
            </p>
          </div>
        </section>
        {/* Technical Privacy section end: Encryption & Transparency */}       

        {/* PRD v0.7.4 section start: Your rights & options */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Your rights and options</h2>

          <div className="prose prose-lg max-w-none text-gray-600">
            <h3 className="text-xl font-semibold text-sheetlink-text">Disconnect Anytime</h3>
            <p>
              Remove your bank connection from the extension. This deletes the encrypted token from our database immediately.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Delete Your Sheet</h3>
            <p>
              Your Google Sheet is yours. Delete it whenever you want. SheetLink has no copy.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Self-Host Your Backend</h3>
            <p>
              Want complete control? Run your own SheetLink backend with Docker or cloud providers. Full self-hosting guide coming soon.
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">
              Audit the Code
            </h3>
            <p>
              SheetLink's client code is open source. Inspect the extension logic, data flow, and architecture documentation yourself on{' '}
              <a
                href="https://github.com/sheetlink/sheetlink-client"
                className="text-sheetlink-green-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>.
            </p>
          </div>
        </section>
        {/* PRD v0.7.4 section end: Your rights & options */}

        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Third-party services</h2>

          <div className="prose prose-lg max-w-none text-gray-600">
            <h3 className="text-xl font-semibold text-sheetlink-text">Plaid</h3>
            <p>
              Plaid securely connects to your bank and retrieves transaction data. Your banking credentials are handled exclusively by Plaid, never by SheetLink.{' '}
              <a
                href="https://plaid.com/legal/#privacy-policy"
                className="text-sheetlink-green-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Plaid Privacy Policy
              </a>
            </p>

            <h3 className="mt-6 text-xl font-semibold text-sheetlink-text">Google Sheets</h3>
            <p>
              We write data to your Google Sheet via the Sheets API. You control who can access your Sheet.{' '}
              <a
                href="https://policies.google.com/privacy"
                className="text-sheetlink-green-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Privacy Policy
              </a>
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Contact Us</h2>
          <div className="prose prose-lg max-w-none text-gray-600">
            <p>
              Questions or concerns about our privacy practices? Email us at{' '}
              <a
                href="mailto:privacy@sheetlink.app"
                className="text-sheetlink-green-700 underline"
              >
                privacy@sheetlink.app
              </a>
              .
            </p>            
          </div>
        </section>

        {/* Chrome Extension Disclosure */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="prose prose-lg max-w-none text-gray-600">
            <h3 className="text-xl font-semibold text-sheetlink-text">Chrome Extension Disclosure</h3>
            <p>
              The SheetLink Chrome extension does not collect browsing activity or track which websites you visit.
            </p>
            <p>
              It does not inject scripts into web pages.
            </p>
            <p>
              All data processing occurs locally in your browser and only uses permissions required for Google Sheets access and Plaid Link connectivity.
            </p>
          </div>
        </section>

        {/* PRD v0.7.4 section start: Contact */}
        <section className="mx-auto max-w-4xl px-4 py-12">
          <div className="rounded-lg border-2 border-gray-200 bg-gray-50 p-6">
            <p className="mb-4 text-sm text-gray-500">Last updated: December 2025</p>
            <p className="text-gray-600">
              This privacy policy may be updated from time to time. Material changes will be
                communicated via email or through the extension. Continued use of SheetLink after
                updates constitutes acceptance of the revised policy.
            </p>
          </div>
        </section>
        {/* PRD v0.7.4 section end: Contact */}

        <Footer />
      </main>
    </>
  );
}
