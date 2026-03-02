import Image from 'next/image';
import { BRAND, URLS } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div>
            <a href="/" className="mb-4 inline-block transition-opacity hover:opacity-80">
              <Image
                src="/sheetlink-logo.svg"
                alt="SheetLink"
                width={140}
                height={35}
              />
            </a>
            <p className="mb-4 text-sm text-gray-600">{BRAND.tagline}</p>
            <p className="text-xs text-gray-500">
              Open-source Chrome extension for syncing bank data to Google Sheets via Plaid.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="mb-3 font-semibold text-sheetlink-text">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/how-it-works"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/recipes"
                  onClick={() => analytics.footerLinkClick('recipes')}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Recipes
                </a>
              </li>
              <li>
                <a
                  href={URLS.docs}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href={URLS.github}
                  onClick={() => analytics.githubClick('footer')}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Use Cases */}
          <div>
            <h4 className="mb-3 font-semibold text-sheetlink-text">Use Cases</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/use-cases"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  All Use Cases
                </a>
              </li>
              <li>
                <a
                  href="/freelance-income-tracker"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Freelancers
                </a>
              </li>
              <li>
                <a
                  href="/software-developer-expense-tracker"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Developers
                </a>
              </li>
              <li>
                <a
                  href="/tax-prep-spreadsheet"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Tax Prep
                </a>
              </li>
              <li>
                <a
                  href="/rental-property-cash-flow"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Real Estate
                </a>
              </li>
            </ul>
          </div>

          {/* Compare */}
          <div>
            <h4 className="mb-3 font-semibold text-sheetlink-text">Compare</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/comparisons"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  All Comparisons
                </a>
              </li>
              <li>
                <a
                  href="/tiller-alternative"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  vs Tiller Money
                </a>
              </li>
              <li>
                <a
                  href="/quicken-alternative"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  vs Quicken
                </a>
              </li>
              <li>
                <a
                  href="/ynab-alternative"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  vs YNAB
                </a>
              </li>
              <li>
                <a
                  href="/mint-alternative"
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  vs Mint
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-3 font-semibold text-sheetlink-text">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={URLS.privacy}
                  onClick={() => analytics.footerLinkClick('privacy')}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href={URLS.terms}
                  onClick={() => analytics.footerLinkClick('terms')}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href={URLS.security}
                  onClick={() => analytics.footerLinkClick('security')}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Security
                </a>
              </li>
              <li>
                <a
                  href={URLS.support}
                  onClick={() => analytics.footerLinkClick('support')}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-500">
          <p>
            &copy; {currentYear} {BRAND.name}. Open source. Independent. No VC funding.
          </p>
        </div>
      </div>
    </footer>
  );
}
