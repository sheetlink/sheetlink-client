'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { URLS } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              onClick={() => analytics.headerNavClick('recipes')}
              className="inline-flex items-center gap-1 rounded-full bg-sheetlink-green-700/10 px-3 py-1 text-sm font-semibold text-sheetlink-green-700 transition-colors hover:bg-sheetlink-green-700/20"
            >
              Recipes
              <span className="rounded-full bg-sheetlink-green-700 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">NEW</span>
            </Link>
            <Link
              href="/docs"
              onClick={() => analytics.headerNavClick('docs')}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-sheetlink-green-700"
            >
              Docs
            </Link>
            <Link
              href="/beta"
              onClick={() => analytics.headerNavClick('beta')}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-sheetlink-green-700"
            >
              Beta
            </Link>
            <Link
              href={URLS.github}
              onClick={() => analytics.githubClick('header')}
              className="text-sm font-medium text-gray-600 transition-colors hover:text-sheetlink-green-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </nav>

          {/* Desktop CTA */}
          <a
            href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => analytics.ctaJoinBetaClick('header')}
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
                analytics.headerNavClick('recipes');
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 rounded-md px-3 py-2 text-base font-semibold text-sheetlink-green-700 hover:bg-gray-50"
            >
              Recipes
              <span className="rounded-full bg-sheetlink-green-700 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">NEW</span>
            </Link>
            <Link
              href="/docs"
              onClick={() => {
                analytics.headerNavClick('docs');
                setMobileMenuOpen(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-sheetlink-green-700"
            >
              Docs
            </Link>
            <Link
              href="/beta"
              onClick={() => {
                analytics.headerNavClick('beta');
                setMobileMenuOpen(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-sheetlink-green-700"
            >
              Beta
            </Link>
            <a
              href={URLS.github}
              onClick={() => {
                analytics.githubClick('header');
                setMobileMenuOpen(false);
              }}
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-50 hover:text-sheetlink-green-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <a
              href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                analytics.ctaJoinBetaClick('header');
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
