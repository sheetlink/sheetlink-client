'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { URLS } from '@/lib/constants';
import { trackHeaderNavClick, trackCtaClick } from '@/lib/analytics';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center transition-opacity hover:opacity-80">
          <Image
            src="/sheetlink-logo.svg"
            alt="SheetLink"
            width={160}
            height={40}
            priority
          />
        </a>

        {/* Navigation & CTA */}
        <div className="flex items-center gap-8">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/recipes"
              onClick={() => trackHeaderNavClick('recipes')}
              className="inline-flex items-center gap-1 rounded-full bg-sheetlink-green-700/10 px-3 py-1 text-sm font-semibold text-sheetlink-green-700 transition-colors hover:bg-sheetlink-green-700/20"
            >
              Recipes
              <span className="rounded-full bg-sheetlink-green-700 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">NEW</span>
            </Link>
            <Link
              href="/pricing"
              onClick={() => trackHeaderNavClick('pricing')}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-sheetlink-green-700"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              onClick={() => trackHeaderNavClick('docs')}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-sheetlink-green-700"
            >
              Docs
            </Link>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                onMouseEnter={() => setResourcesOpen(true)}
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 transition-colors hover:text-sheetlink-green-700"
              >
                Resources
                <svg className={`h-4 w-4 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {resourcesOpen && (
                <div
                  onMouseLeave={() => setResourcesOpen(false)}
                  className="absolute right-0 top-full mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg"
                >
                  <div className="p-2">
                    <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Guides
                    </div>
                    <Link
                      href="/pricing-guides"
                      onClick={() => {
                        trackHeaderNavClick('pricing-guides');
                        setResourcesOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
                    >
                      Pricing Guides
                    </Link>
                    <Link
                      href="/how-to-guides"
                      onClick={() => {
                        trackHeaderNavClick('how-to-guides');
                        setResourcesOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
                    >
                      How-To Guides
                    </Link>
                    <Link
                      href="/integration-guides"
                      onClick={() => {
                        trackHeaderNavClick('integration-guides');
                        setResourcesOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
                    >
                      Integration Guides
                    </Link>

                    <div className="my-2 border-t border-gray-200"></div>

                    <div className="mb-2 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                      Popular
                    </div>
                    <Link
                      href="/tiller-alternative"
                      onClick={() => {
                        trackHeaderNavClick('tiller-alternative');
                        setResourcesOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
                    >
                      Tiller Alternative
                    </Link>
                    <Link
                      href="/ynab-alternative"
                      onClick={() => {
                        trackHeaderNavClick('ynab-alternative');
                        setResourcesOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
                    >
                      YNAB Alternative
                    </Link>
                    <Link
                      href="/amazon-fba-bookkeeping-spreadsheet"
                      onClick={() => {
                        trackHeaderNavClick('amazon-fba-bookkeeping');
                        setResourcesOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
                    >
                      Amazon FBA Bookkeeping
                    </Link>
                    <Link
                      href="/track-dropshipping-expenses"
                      onClick={() => {
                        trackHeaderNavClick('dropshipping-expenses');
                        setResourcesOpen(false);
                      }}
                      className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
                    >
                      Dropshipping Expenses
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCtaClick('header')}
            className="hidden md:inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
          >
            Add to Chrome
            <svg
              className="ml-2 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </a>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-sheetlink-green-700 md:hidden"
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">
          <div className="space-y-1 px-4 pb-3 pt-2">
            <Link
              href="/recipes"
              onClick={() => {
                trackHeaderNavClick('recipes');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-sheetlink-green-700 hover:bg-gray-50"
            >
              Recipes
              <span className="rounded-full bg-sheetlink-green-700 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">NEW</span>
            </Link>
            <Link
              href="/pricing"
              onClick={() => {
                trackHeaderNavClick('pricing');
                setMobileMenuOpen(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-sheetlink-green-700"
            >
              Pricing
            </Link>
            <Link
              href="/docs"
              onClick={() => {
                trackHeaderNavClick('docs');
                setMobileMenuOpen(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-sheetlink-green-700"
            >
              Docs
            </Link>

            {/* Resources Section */}
            <div className="mt-4">
              <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Guides
              </div>
              <Link
                href="/pricing-guides"
                onClick={() => {
                  trackHeaderNavClick('pricing-guides');
                  setMobileMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
              >
                Pricing Guides
              </Link>
              <Link
                href="/how-to-guides"
                onClick={() => {
                  trackHeaderNavClick('how-to-guides');
                  setMobileMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
              >
                How-To Guides
              </Link>
              <Link
                href="/integration-guides"
                onClick={() => {
                  trackHeaderNavClick('integration-guides');
                  setMobileMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
              >
                Integration Guides
              </Link>
              <div className="mb-2 mt-4 px-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
                Popular
              </div>
              <Link
                href="/tiller-alternative"
                onClick={() => {
                  trackHeaderNavClick('tiller-alternative');
                  setMobileMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
              >
                Tiller Alternative
              </Link>
              <Link
                href="/ynab-alternative"
                onClick={() => {
                  trackHeaderNavClick('ynab-alternative');
                  setMobileMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
              >
                YNAB Alternative
              </Link>
              <Link
                href="/amazon-fba-bookkeeping-spreadsheet"
                onClick={() => {
                  trackHeaderNavClick('amazon-fba-bookkeeping');
                  setMobileMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
              >
                Amazon FBA Bookkeeping
              </Link>
              <Link
                href="/track-dropshipping-expenses"
                onClick={() => {
                  trackHeaderNavClick('dropshipping-expenses');
                  setMobileMenuOpen(false);
                }}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-sheetlink-green-700"
              >
                Dropshipping Expenses
              </Link>
            </div>

            <a
              href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackCtaClick('header');
                setMobileMenuOpen(false);
              }}
              className="mt-4 flex items-center justify-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:shadow-lg"
            >
              Add to Chrome
              <svg
                className="ml-2 h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
