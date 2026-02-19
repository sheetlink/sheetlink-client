'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';
import { analytics, trackEvent } from '@/lib/analytics';
import { Download, Zap, Sparkles, Shield, Github, Users, ExternalLink } from 'lucide-react';

const CHROME_STORE_URL =
  'https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch';
const RECIPES_GITHUB_URL = 'https://github.com/sheetlink/sheetlink-recipes';
const CONTRIBUTING_URL = 'https://github.com/sheetlink/sheetlink-recipes/blob/main/CONTRIBUTING.md';

interface Recipe {
  id: string;
  name: string;
  description: string;
  type: 'official' | 'community';
  githubUser?: string;
  tags: string[];
}

const RECIPES: Recipe[] = [
  {
    id: 'budget-tracker',
    name: 'Budget Tracker',
    description:
      'Track spending vs budget by category with multi-month trending. Automatically calculates actuals from your transaction data and shows variance.',
    type: 'official',
    tags: ['budgeting', 'spending', 'categories'],
  },
  {
    id: 'budget-by-account',
    name: 'Budget Tracker (by Account)',
    description:
      'Extended budget tracker that shows spending by category with a breakdown by account. See which accounts drive spending in each category.',
    type: 'official',
    tags: ['budgeting', 'accounts', 'categories'],
  },
  {
    id: 'recurring-analysis',
    name: 'Recurring Spend Detector',
    description:
      'Automatically detects subscriptions, memberships, and recurring bills. Shows frequency, average amount, total spent, and annualized cost.',
    type: 'official',
    tags: ['subscriptions', 'recurring', 'analysis'],
  },
  {
    id: 'cash-flow',
    name: 'Cash Flow Forecast',
    description:
      'See your cash flow week by week with income, expenses, net change, and projected ending balance. Configurable starting balance.',
    type: 'official',
    tags: ['cash-flow', 'forecasting', 'weekly'],
  },
  {
    id: 'financial-statements',
    name: 'Financial Statements Suite',
    description:
      'Professional-grade financial reporting: Chart of Accounts, General Ledger with debit/credit entries, Income Statement, Balance Sheet, and Cash Flow Statement.',
    type: 'community',
    githubUser: 'rudymdc',
    tags: ['financial-statements', 'accounting', 'business'],
  },
];

function RecipeCard({ recipe }: { recipe: Recipe }) {
  const folder = recipe.type === 'community' ? 'community' : 'official';
  const githubUrl = `${RECIPES_GITHUB_URL}/tree/main/recipes/${folder}/${recipe.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold leading-snug text-sheetlink-text">{recipe.name}</h3>
        {recipe.type === 'official' ? (
          <span className="flex-shrink-0 rounded-full bg-sheetlink-green-900 px-2.5 py-0.5 text-xs font-medium text-white">
            Official
          </span>
        ) : (
          <span className="flex-shrink-0 rounded-full bg-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-700">
            Community
          </span>
        )}
      </div>

      {recipe.type === 'community' && recipe.githubUser && (
        <p className="mb-2 text-xs text-gray-500">by @{recipe.githubUser}</p>
      )}

      <p className="mb-4 flex-1 text-sm leading-relaxed text-gray-600">{recipe.description}</p>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {recipe.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-gray-100 px-2 py-0.5 text-xs text-gray-500"
          >
            {tag}
          </span>
        ))}
      </div>

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent('recipe_view_code_click', { recipeId: recipe.id })}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-sheetlink-green-700 transition-colors hover:text-sheetlink-green-900"
      >
        <Github className="h-3.5 w-3.5" />
        View Code
        <ExternalLink className="h-3 w-3" />
      </a>
    </motion.div>
  );
}

export default function Recipes() {
  const seoTitle = `Recipe Marketplace — ${BRAND.name}`;
  const seoDescription =
    'Browse and install pre-built analysis recipes for Google Sheets. Monthly budgets, recurring spend detection, cash flow forecasts — one-click install via SheetLink.';

  useEffect(() => {
    analytics.pageView('Recipes', '/recipes');
  }, []);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta
          name="keywords"
          content="google sheets automation, google sheets budget template, google apps script recipes, subscription tracker sheets, cash flow google sheets, spending analysis"
        />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:url" content="https://sheetlink.app/recipes" />
        <link rel="canonical" href="https://sheetlink.app/recipes" />
      </Head>

      <Header />

      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-b from-sheetlink-bg to-white px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="mb-4 inline-block rounded-full border border-sheetlink-green-700 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-wide text-sheetlink-green-700">
                Now Available
              </span>
              <h1 className="mb-6 text-5xl font-bold text-sheetlink-text md:text-6xl">
                Automate your spreadsheet.
                <br />
                <span className="text-sheetlink-green-700">Install in one click.</span>
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-700">
                Recipes are pre-built analysis scripts that add menus, reports, and dashboards
                directly to your Google Sheet — no coding required.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
            >
              <a
                href="#recipes"
                onClick={() => trackEvent('recipes_cta_click', { location: 'hero' })}
                className="inline-flex items-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 text-base font-semibold text-white transition-all duration-200 hover:shadow-lg"
              >
                Browse Recipes
              </a>
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.ctaJoinBetaClick?.('recipes-hero')}
                className="inline-flex items-center rounded-lg border-2 border-sheetlink-green-700 px-8 py-3 text-base font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-bg"
              >
                Get the Extension
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-6 text-sm text-gray-500"
            >
              Open source · Auditable · Community-powered
            </motion.p>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">How Recipes Work</h2>
              <p className="text-lg text-gray-600">
                Three steps from the extension to your spreadsheet menu.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Download className="h-6 w-6 text-sheetlink-green-700" />,
                  step: '01',
                  title: 'Browse the marketplace',
                  description:
                    'Open the Recipe tab in the SheetLink extension popup. Browse official and community recipes.',
                },
                {
                  icon: <Zap className="h-6 w-6 text-sheetlink-green-700" />,
                  step: '02',
                  title: 'One-click install',
                  description:
                    'SheetLink injects the script into your spreadsheet\'s Apps Script project. No copy-paste, no setup.',
                },
                {
                  icon: <Sparkles className="h-6 w-6 text-sheetlink-green-700" />,
                  step: '03',
                  title: 'Run from your menu',
                  description:
                    'A new "SheetLink Recipes" menu appears in your Google Sheet. Click to run any installed recipe.',
                },
              ].map((item) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="relative rounded-xl border border-gray-200 bg-white p-8"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sheetlink-bg">
                      {item.icon}
                    </div>
                    <span className="text-2xl font-bold text-gray-200">{item.step}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-sheetlink-text">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mx-auto mt-8 max-w-2xl rounded-lg bg-gray-50 px-6 py-4 text-center text-sm leading-relaxed text-gray-600"
            >
              Recipes are Google Apps Script functions. They run entirely within your Google
              account — SheetLink never has access to your spreadsheet data outside of the sync
              process.
            </motion.p>
          </div>
        </section>

        {/* Recipe Grid */}
        <section id="recipes" className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">Available Recipes</h2>
              <p className="text-lg text-gray-600">
                {RECIPES.filter((r) => r.type === 'official').length} official recipes maintained
                by SheetLink, plus community contributions.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {RECIPES.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <div className="mb-4 flex justify-center">
                <Users className="h-10 w-10 text-sheetlink-green-700" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                Built by the community, for the community
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Anyone can contribute a recipe. All community code is public, auditable, and hosted
                on GitHub. Install counts are tracked anonymously — no personal data stored.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-lg border-2 border-sheetlink-green-700 bg-green-50 p-8"
            >
              <h3 className="mb-2 text-lg font-semibold text-sheetlink-text">
                Want to contribute a recipe?
              </h3>
              <p className="mb-6 text-gray-600">
                Submit a pull request to the{' '}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-sm">
                  sheetlink-recipes
                </code>{' '}
                repository. Each recipe is a{' '}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-sm">recipe.gs</code>{' '}
                file that uses the shared{' '}
                <code className="rounded bg-white px-1.5 py-0.5 font-mono text-sm">utils.gs</code>{' '}
                API — no boilerplate needed. Once merged, it appears in the marketplace automatically.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href={CONTRIBUTING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('recipes_contributing_guide_click')}
                  className="inline-flex items-center gap-2 rounded-lg bg-sheetlink-green-900 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-sheetlink-green-700"
                >
                  Contribution Guide
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a
                  href={RECIPES_GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('recipes_github_click')}
                  className="inline-flex items-center gap-2 rounded-lg border border-sheetlink-green-700 bg-white px-6 py-3 text-sm font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-green-50"
                >
                  <Github className="h-4 w-4" />
                  View Repository
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Security / Trust */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-10 text-center"
            >
              <div className="mb-4 flex justify-center">
                <Shield className="h-10 w-10 text-sheetlink-green-700" />
              </div>
              <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                Is it safe to install a recipe?
              </h2>
              <p className="mx-auto max-w-2xl text-lg text-gray-600">
                Yes. Here's exactly what happens — and what doesn't.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: 'All code is open source',
                  description:
                    'Every recipe is hosted on GitHub. You can read the entire script before installing — nothing is hidden or obfuscated.',
                },
                {
                  title: 'Runs in your Google account',
                  description:
                    'Recipes execute as Google Apps Script inside your own spreadsheet. SheetLink is not in the execution path once installed.',
                },
                {
                  title: 'Permission is on-demand',
                  description:
                    'The Apps Script permission is only requested when you choose to install a recipe — not on initial sign-in. Core sync works without it.',
                },
                {
                  title: 'You control uninstall',
                  description:
                    'Uninstall any recipe from the extension with one click, or delete the script directly from your Apps Script editor.',
                },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-xl border border-gray-200 bg-white p-6"
                >
                  <h3 className="mb-2 font-semibold text-sheetlink-text">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 text-center"
            >
              <Link
                href="/security"
                className="text-sm font-medium text-sheetlink-green-700 underline underline-offset-4 hover:text-sheetlink-green-900"
              >
                Read the full security architecture →
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-4 py-20 text-white">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-4xl font-bold">Ready to automate your spreadsheet?</h2>
              <p className="mb-8 text-lg text-green-100">
                Install SheetLink and open the Recipe Marketplace from the extension popup.
              </p>
              <a
                href={CHROME_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => analytics.ctaJoinBetaClick?.('recipes-bottom')}
                className="inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-base font-semibold text-sheetlink-green-900 transition-all duration-200 hover:shadow-xl"
              >
                Get SheetLink Free
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
              <p className="mt-4 text-sm text-green-200">
                Free forever for 7 days of history. No credit card required.
              </p>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
