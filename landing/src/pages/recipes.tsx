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

        {/* Getting Started */}
        <section className="bg-white px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">Getting Started</h2>
              <p className="text-lg text-gray-600">
                First-time setup takes about 2 minutes. This is a one-time requirement from Google.
              </p>
            </motion.div>

            {/* Step 1: Prerequisites */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 rounded-xl border-2 border-gray-200 bg-white p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  1
                </span>
                <h3 className="text-xl font-semibold text-sheetlink-text">
                  Enable Google Apps Script API
                </h3>
                <span className="ml-auto rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700">
                  ONE-TIME SETUP
                </span>
              </div>
              <p className="mb-4 text-gray-600">
                Google requires you to enable the Apps Script API in your account settings before
                recipes can be installed. This is a security feature to prevent unauthorized script
                modifications.
              </p>
              <div className="rounded-lg bg-gray-50 p-4">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                    <span>
                      Visit{' '}
                      <a
                        href="https://script.google.com/home/usersettings"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-sheetlink-green-700 underline hover:text-sheetlink-green-900"
                      >
                        script.google.com/home/usersettings
                      </a>
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                    <span>Toggle on &quot;Google Apps Script API&quot;</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                    <span className="font-medium">
                      Wait 2-3 minutes for Google&apos;s systems to propagate the change
                    </span>
                  </li>
                </ol>
              </div>
            </motion.div>

            {/* Step 2: Install Recipe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8 rounded-xl border-2 border-gray-200 bg-white p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  2
                </span>
                <h3 className="text-xl font-semibold text-sheetlink-text">
                  Install Your First Recipe
                </h3>
              </div>
              <p className="mb-4 text-gray-600">
                Once the API is enabled, you can install recipes directly from the SheetLink
                extension.
              </p>
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                      <span>Open the SheetLink extension popup and click the &quot;Recipes&quot; tab</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                      <span>Click &quot;Install&quot; on any recipe</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                      <span>You&apos;ll be prompted to authorize Apps Script permissions</span>
                    </li>
                  </ol>
                </div>

                {/* OAuth Warning Callout */}
                <div className="rounded-lg border-2 border-amber-200 bg-amber-50 p-5">
                  <div className="mb-2 flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <div>
                      <h4 className="mb-1 font-semibold text-amber-900">
                        You will see a &quot;Google hasn&apos;t verified this app&quot; warning
                      </h4>
                      <p className="mb-3 text-sm leading-relaxed text-amber-800">
                        <strong>This is expected and safe.</strong> The &quot;app&quot; is your own Apps
                        Script project — you are both the developer and the user. Google shows this
                        warning for all container-bound scripts that haven&apos;t gone through their
                        app verification process (which isn&apos;t applicable here since you own the
                        script).
                      </p>
                      <p className="text-sm font-medium text-amber-900">
                        Click &quot;Advanced&quot; → &quot;Go to SheetLink Recipes (unsafe)&quot; to proceed. You&apos;re
                        authorizing your own script to modify your own spreadsheet.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 3: Run Recipe */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border-2 border-gray-200 bg-white p-8"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-lg font-bold text-white">
                  3
                </span>
                <h3 className="text-xl font-semibold text-sheetlink-text">Run from Your Menu</h3>
              </div>
              <p className="mb-4 text-gray-600">
                After installation, a new &quot;SheetLink Recipes&quot; menu appears in your Google Sheet.
              </p>
              <div className="rounded-lg bg-gray-50 p-4">
                <ol className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                    <span>Open your synced Google Sheet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                    <span>Look for the &quot;SheetLink Recipes&quot; menu in the top menu bar</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-0.5 flex-shrink-0 text-sheetlink-green-700">▸</span>
                    <span>Click any installed recipe to run it</span>
                  </li>
                </ol>
              </div>
              <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                <p className="text-sm text-green-800">
                  <strong>Future installs are instant.</strong> Once you&apos;ve completed the
                  authorization flow once, installing additional recipes requires no further setup.
                </p>
              </div>
            </motion.div>

            {/* Troubleshooting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 rounded-lg bg-gray-50 p-6"
            >
              <h4 className="mb-3 font-semibold text-sheetlink-text">
                Troubleshooting Common Issues
              </h4>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">
                    Error: &quot;Apps Script API is disabled&quot;
                  </dt>
                  <dd className="mt-1 text-gray-600">
                    Make sure you&apos;ve enabled the API at{' '}
                    <a
                      href="https://script.google.com/home/usersettings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-sheetlink-green-700 underline"
                    >
                      script.google.com/home/usersettings
                    </a>{' '}
                    and waited 2-3 minutes.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">
                    Error: &quot;Requested entity was not found&quot; (404)
                  </dt>
                  <dd className="mt-1 text-gray-600">
                    If you just enabled the API, wait a few more minutes. Google&apos;s systems take
                    time to propagate. If this is your first recipe install on a new spreadsheet,
                    open Extensions → Apps Script once to initialize the project, then retry.
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Menu doesn&apos;t appear after install</dt>
                  <dd className="mt-1 text-gray-600">
                    Refresh your Google Sheet. The menu is added when the spreadsheet reloads.
                  </dd>
                </div>
              </dl>
            </motion.div>
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
