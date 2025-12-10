import Image from 'next/image';
import { BRAND, URLS } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
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
                  href={URLS.firstSync}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  First Sync Guide
                </a>
              </li>
              <li>
                <a
                  href={URLS.userGuide}
                  className="text-gray-600 transition-colors hover:text-sheetlink-green-700"
                >
                  User Guide
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

          {/* Company */}
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
