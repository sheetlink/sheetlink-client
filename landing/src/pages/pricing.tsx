import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { Check, Star, Gift } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, PRICING } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');

  const seoTitle = `Pricing - ${BRAND.name}`;
  const seoDescription = 'SheetLink pricing: Free forever for 7 days of transactions. Upgrade to Pro for full Plaid transaction history (2 years). Privacy-first manual sync — you control when data flows.';

  // Stripe Payment Links (Production)
  const paymentLinks = {
    monthly: 'https://buy.stripe.com/7sYaEWb7jgkc6Swcf0bjW00',
    annual: 'https://buy.stripe.com/bJe28q7V73xq1yc6UGbjW01'
  };

  useEffect(() => {
    analytics.pageView('Pricing', '/pricing');
  }, []);

  const handleSubscribe = () => {
    window.location.href = paymentLinks[billingCycle];
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-b from-sheetlink-bg to-white px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 text-5xl font-bold text-sheetlink-text md:text-6xl"
            >
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-gray-700"
            >
              Start free forever. Upgrade when you need full transaction history.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-8 flex items-center justify-center gap-4"
            >
              <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-sheetlink-text' : 'text-gray-500'}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-sheetlink-accent transition-colors"
                aria-label="Toggle billing cycle"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === 'annual' ? 'text-sheetlink-text' : 'text-gray-500'}`}>
                Annual
              </span>
              <span className="rounded-full bg-sheetlink-green-700 px-3 py-1 text-xs font-semibold text-white">
                Save 17%
              </span>
            </motion.div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="px-4 py-20">
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col rounded-xl border-2 border-gray-200 bg-white p-8 shadow-sm"
            >
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <Gift className="h-6 w-6 text-sheetlink-green-700" />
                  <h3 className="text-2xl font-bold text-sheetlink-text">Free</h3>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-sheetlink-text">$0</span>
                  <span className="text-gray-600">/forever</span>
                </div>
                <p className="text-sm text-gray-600">Perfect for getting started</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700"><strong>7 days</strong> of transaction history</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700"><strong>Unlimited</strong> manual syncs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700"><strong>Unlimited</strong> bank connections</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700">Auto-enriched account labels</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700">Direct-to-Google Sheets</span>
                </li>
              </ul>

              <a
                href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg border-2 border-sheetlink-green-700 bg-transparent px-6 py-3 font-semibold text-sheetlink-green-700 transition-all hover:bg-sheetlink-bg"
              >
                Get Started Free
              </a>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-col rounded-xl border-2 border-sheetlink-green-700 bg-white p-8 shadow-lg"
            >
              <div className="mb-2 inline-block self-start rounded-full bg-sheetlink-green-700 px-3 py-1 text-xs font-semibold text-white">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <div className="mb-2 flex items-center gap-2">
                  <Star className="h-6 w-6 text-sheetlink-green-700" />
                  <h3 className="text-2xl font-bold text-sheetlink-text">Pro</h3>
                </div>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-sheetlink-text">
                    ${billingCycle === 'annual' ? PRICING.pro.priceAnnualMonthly.replace('$', '') : PRICING.pro.priceMonthly.replace('$', '')}
                  </span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-sm text-gray-600">
                  {billingCycle === 'annual' ? `Billed annually (${PRICING.pro.priceAnnual}/year)` : 'Billed monthly'}
                </p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700"><strong>Everything in Free</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700"><strong>Full Plaid transaction history</strong> (2 years)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700"><strong>Historical backfill</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700"><strong>Priority email support</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700">Early access to new features</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-sheetlink-green-700" />
                  <span className="text-sm text-gray-700">Support independent development</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={handleSubscribe}
                className="inline-flex w-full items-center justify-center rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
              >
                Upgrade to Pro
              </button>
            </motion.div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              Compare Plans
            </h2>
            <div className="overflow-x-auto rounded-xl border-2 border-gray-200 bg-white">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Feature</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Free</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Pro</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Transaction history</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">7 days</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Full Plaid history (2 years)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Sync method</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Manual (you control)</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Manual (you control)</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Bank connections</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-700">Unlimited</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Historical backfill</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">—</td>
                    <td className="px-6 py-4 text-center"><Check className="mx-auto h-5 w-5 text-sheetlink-green-700" /></td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm text-gray-700">Priority support</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">—</td>
                    <td className="px-6 py-4 text-center"><Check className="mx-auto h-5 w-5 text-sheetlink-green-700" /></td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-700">Early access to features</td>
                    <td className="px-6 py-4 text-center text-sm text-gray-500">—</td>
                    <td className="px-6 py-4 text-center"><Check className="mx-auto h-5 w-5 text-sheetlink-green-700" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-sheetlink-text">Is the Free plan really free forever?</h3>
                <p className="text-sm text-gray-700">
                  Yes! The Free plan gives you 7 days of transaction history forever, with no credit card required. It's perfect for users who just need recent transactions.
                </p>
              </div>
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-sheetlink-text">Why manual sync instead of automatic?</h3>
                <p className="text-sm text-gray-700">
                  SheetLink only syncs when you click the button. We believe you should control when your bank data flows to your spreadsheet. Unlike competitors that access your accounts in the background, SheetLink requires your explicit action. This is a privacy feature, not a limitation.
                </p>
              </div>
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-sheetlink-text">How does billing work?</h3>
                <p className="text-sm text-gray-700">
                  Billing is securely handled through Stripe. When you upgrade to Pro, you'll be redirected to Stripe's secure checkout. You can manage your subscription, update payment methods, or view billing history anytime through your account settings.
                </p>
              </div>
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-sheetlink-text">Can I upgrade or downgrade anytime?</h3>
                <p className="text-sm text-gray-700">
                  Yes! You can upgrade, downgrade, or cancel anytime. When you downgrade, you'll retain access to your current plan until the end of your billing period.
                </p>
              </div>
              <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                <h3 className="mb-2 font-semibold text-sheetlink-text">Do you offer refunds?</h3>
                <p className="text-sm text-gray-700">
                  Yes. If you're not satisfied with a paid plan, contact us within 14 days of your purchase for a full refund.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold text-white">
              Ready to get started?
            </h2>
            <p className="mb-8 text-xl text-white/90">
              Start syncing your transactions today, free forever.
            </p>
            <a
              href="https://chromewebstore.google.com/detail/sheetlink-sync-bank-trans/niehncndbonfankgokhandgbaebdbpch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 text-lg font-semibold text-sheetlink-green-900 transition-all hover:bg-gray-100"
            >
              Add to Chrome
            </a>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
