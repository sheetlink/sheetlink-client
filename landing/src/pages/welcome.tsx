'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

export default function Welcome() {
  const [confettiFired, setConfettiFired] = useState(false);

  const seoTitle = `Welcome to ${BRAND.name}`;
  const seoDescription = 'Get started with SheetLink. Connect your bank to Google Sheets in minutes.';

  useEffect(() => {
    // Guard against SSR
    if (typeof window === 'undefined') return;

    // Check if confetti has already been shown
    const hasSeenConfetti = localStorage.getItem('sheetlink_welcome_confetti_shown');

    if (!hasSeenConfetti && !confettiFired) {
      // Dynamically import confetti to avoid SSR issues
      import('canvas-confetti').then((confetti) => {
        const myConfetti = confetti.default;

        // Fire confetti burst with wider spread
        const count = 200;
        const defaults = {
          origin: { y: 0.7 },
          colors: ['#FFC700', '#FF0080', '#00D9FF', '#7928CA', '#FF4785', '#1FB6FF'],
          disableForReducedMotion: true,
        };

        function fire(particleRatio: number, opts: any) {
          myConfetti({
            ...defaults,
            ...opts,
            particleCount: Math.floor(count * particleRatio),
          });
        }

        // Multiple bursts for wider spread
        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });

        fire(0.2, {
          spread: 60,
        });

        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2,
        });

        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });

        // Set flag in localStorage
        localStorage.setItem('sheetlink_welcome_confetti_shown', 'true');
        setConfettiFired(true);
      });
    }
  }, [confettiFired]);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden px-4 py-20"
          style={{
            background: 'linear-gradient(180deg, #F6F7F5 0%, #ffffff 100%)',
          }}
        >
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, type: 'spring' }}
              className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-5xl"
            >
              🎉
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 bg-clip-text text-5xl font-bold text-transparent md:text-6xl"
            >
              You’re minutes away from spreadsheet magic.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto max-w-2xl text-xl leading-relaxed text-gray-700 md:text-2xl"
            >
              Start in sandbox mode and explore how SheetLink syncs banking data straight into Google Sheets.
            </motion.p>
          </div>
        </section>

        {/* Onboarding Steps */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Step 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-xl border-2 border-sheetlink-green-700/20 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 text-xl font-bold text-white">
                1
              </div>
              <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                Pin the extension
              </h3>
              <p className="text-gray-600">
                You're all set up. SheetLink is now in your toolbar.
              </p>
            </motion.div>

            {/* Step 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-xl border-2 border-sheetlink-green-700/20 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 text-xl font-bold text-white">
                2
              </div>
              <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                Connect to Sandbox
              </h3>
              <p className="text-gray-600">
                Try SheetLink's demo flow with Plaid's test accounts.
              </p>
            </motion.div>

            {/* Step 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-xl border-2 border-sheetlink-green-700/20 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 text-xl font-bold text-white">
                3
              </div>
              <h3 className="mb-3 text-xl font-bold text-sheetlink-text">
                Sync sample data
              </h3>
              <p className="text-gray-600">
                Your transactions flow straight into your Google Sheet.
              </p>
            </motion.div>
          </div>
        </section>

        {/* CTAs */}
        <section className="mx-auto max-w-3xl px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="flex flex-col gap-4 sm:flex-row sm:justify-center"
          >
            <Link
              href="/sandbox"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
            >
              <span className="relative z-10">Try the Sandbox</span>
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center rounded-lg border-2 border-sheetlink-green-700 bg-white px-8 py-4 text-lg font-semibold text-sheetlink-green-700 transition-all hover:bg-sheetlink-bg"
            >
              View Docs
            </Link>
          </motion.div>

          {/* Privacy Note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-8 text-center"
          >
            <p className="text-sm text-gray-600">
              <strong>Privacy first:</strong> Your bank data stays yours. SheetLink passes data
              through to your browser and Google Sheet, not our servers.
            </p>
          </motion.div>
        </section>

        {/* Additional Info Card */}
        <section className="mx-auto max-w-3xl px-4 pb-20">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="rounded-xl border-2 border-sheetlink-green-700/20 bg-sheetlink-bg p-8"
          >
            <h2 className="mb-6 text-2xl font-bold text-sheetlink-text">What's Next?</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <strong className="text-sheetlink-text">Try the Sandbox</strong>
                  <p className="mt-1 text-sm text-gray-600">
                    Connect fake bank accounts using Plaid's sandbox environment. No real banking
                    credentials required.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <strong className="text-sheetlink-text">Read the Docs</strong>
                  <p className="mt-1 text-sm text-gray-600">
                    Learn how to set up your first connection, customize your Sheet, and use
                    advanced features.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🧪</span>
                <div>
                  <strong className="text-sheetlink-text">Join the Beta</strong>
                  <p className="mt-1 text-sm text-gray-600">
                    Get lifetime free access by helping test SheetLink. Share feedback and shape
                    the product.{' '}
                    <Link href="/beta" className="text-sheetlink-green-700 underline">
                      Sign up here
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <Footer />
      </main>
    </>
  );
}
