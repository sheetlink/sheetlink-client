'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';
import { analytics } from '@/lib/analytics';

export default function Beta() {
  const seoTitle = `Beta Program - ${BRAND.name}`;
  const seoDescription = 'Join the first 50 Beta Members and get 2 years of transaction history, free forever. Shape the future of SheetLink.';

  // TODO: Update this counter manually as slots fill up
  const slotsFilledCount = 0;
  const totalSlots = 50;
  const slotsRemaining = totalSlots - slotsFilledCount;

  // TODO: Replace with actual Discord invite link
  const discordInviteLink = 'https://discord.gg/PLACEHOLDER';

  useEffect(() => {
    analytics.pageView('Beta Program', '/beta');
  }, []);

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-sheetlink-bg to-white px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-sheetlink-green-700 bg-sheetlink-green-50 px-6 py-2 text-sm font-semibold text-sheetlink-green-900"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Limited to First 50 Members
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-5xl font-bold text-sheetlink-text md:text-6xl"
            >
              Join the Beta Program
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mb-4 max-w-2xl text-2xl font-semibold text-sheetlink-green-900"
            >
              Get 2 years of transaction history.
              <br />
              <span className="text-sheetlink-text">Free. Forever.</span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mx-auto mb-8 max-w-2xl text-lg text-gray-700"
            >
              Be part of an exclusive community shaping the future of SheetLink. Get early access to new features, influence the roadmap, and enjoy premium benefits.
            </motion.p>

            {/* Slots Counter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <div className="mx-auto mb-2 max-w-md rounded-full bg-gray-200">
                <div
                  className="rounded-full bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 py-2 text-center text-sm font-semibold text-white transition-all duration-500"
                  style={{ width: `${(slotsFilledCount / totalSlots) * 100}%`, minWidth: '20%' }}
                >
                  {slotsFilledCount}/{totalSlots} Slots Filled
                </div>
              </div>
              <p className="text-lg font-semibold text-sheetlink-green-900">
                {slotsRemaining > 0 ? (
                  <>Only {slotsRemaining} spots remaining!</>
                ) : (
                  <>All slots filled - Join waitlist</>
                )}
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {slotsRemaining > 0 ? (
                <a
                  href={discordInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.ctaJoinBetaClick('Beta Hero')}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord & Claim Your Spot
                </a>
              ) : (
                <a
                  href={discordInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-700 hover:text-white"
                >
                  Join Waitlist
                </a>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-4 text-sm text-gray-600"
            >
              Already have SheetLink? Join Discord and verify your email to claim your spot.
            </motion.p>
          </div>
        </section>

        {/* What You Get */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              What Beta Members Get
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* 2-Year History */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-xl border-2 border-sheetlink-green-200 bg-gradient-to-br from-sheetlink-green-50 to-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                  2-Year Transaction History
                </h3>
                <p className="mb-2 text-gray-700">
                  Get up to 2 years of transaction data synced to your Google Sheets.
                </p>
                <p className="font-semibold text-sheetlink-green-900">
                  Free. Forever. No catch.
                </p>
              </motion.div>

              {/* Early Access */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                  Early Feature Access
                </h3>
                <p className="text-gray-700">
                  Test new features before public release and shape how they work.
                </p>
              </motion.div>

              {/* Roadmap Influence */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-accent text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                  Influence the Roadmap
                </h3>
                <p className="text-gray-700">
                  Vote on features, share ideas, and directly impact SheetLink's future.
                </p>
              </motion.div>

              {/* Beta Insider Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                  Beta Member Badge
                </h3>
                <p className="text-gray-700">
                  Exclusive Discord role showing you're one of the first 50 members.
                </p>
              </motion.div>

              {/* Direct Access */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                  Direct Line to Founder
                </h3>
                <p className="text-gray-700">
                  Ask questions, share feedback, and get responses directly from the founder.
                </p>
              </motion.div>

              {/* Community */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="rounded-xl border-2 border-gray-200 bg-white p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-white">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-bold text-sheetlink-text">
                  Exclusive Community
                </h3>
                <p className="text-gray-700">
                  Connect with other power users, share tips, and learn advanced workflows.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What We Ask */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center text-3xl font-bold text-sheetlink-text">
              What We Ask From You
            </h2>
            <p className="mb-12 text-center text-lg text-gray-700">
              Light commitments to help us build the best product:
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-sheetlink-text">Join Discord</h3>
                  <p className="text-gray-700">Stay active in our Discord community and engage with other members.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-sheetlink-text">Share Feedback</h3>
                  <p className="text-gray-700">Respond to quick polls and surveys when new features launch.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-sheetlink-text">Report Bugs</h3>
                  <p className="text-gray-700">Let us know if you encounter any issues or unexpected behavior.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex gap-4"
              >
                <div className="flex-shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sheetlink-green-700 text-white">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="mb-2 font-semibold text-sheetlink-text">Share Your Use Case</h3>
                  <p className="text-gray-700">Tell us how you're using SheetLink to help us build better features.</p>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 rounded-lg border-2 border-blue-200 bg-blue-50 p-6 text-center">
              <p className="text-blue-900">
                <strong>That's it!</strong> No daily time commitments. No mandatory meetings. Just lightweight feedback when it makes sense.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              How to Join
            </h2>
            <div className="space-y-12">
              {/* Step 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex flex-col gap-6 md:flex-row"
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-2xl font-bold text-sheetlink-text">
                    Install SheetLink
                  </h3>
                  <p className="mb-4 text-lg text-gray-700">
                    Download SheetLink from the Chrome Web Store if you haven't already.
                  </p>
                  <a
                    href="https://chromewebstore.google.com/detail/sheetlink-%E2%80%94-connect-your/niehncndbonfankgokhandgbaebdbpch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sheetlink-green-700 hover:underline"
                  >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-5.344 9.257c.206.01.413.016.621.016 6.627 0 12-5.373 12-12 0-1.54-.29-3.011-.818-4.364zM12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
                    </svg>
                    Add to Chrome
                  </a>
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex flex-col gap-6 md:flex-row"
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-2xl font-bold text-sheetlink-text">
                    Join Discord
                  </h3>
                  <p className="mb-4 text-lg text-gray-700">
                    Click the button below to join our Discord server and introduce yourself in the #introductions channel.
                  </p>
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-6 md:flex-row"
              >
                <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-2xl font-bold text-white">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="mb-2 text-2xl font-bold text-sheetlink-text">
                    Verify Your Email
                  </h3>
                  <p className="mb-4 text-lg text-gray-700">
                    Follow the verification instructions in Discord. Once verified, we'll manually upgrade your account to Beta Member status with 2-year history access.
                  </p>
                  <div className="rounded-lg border-2 border-green-200 bg-green-50 p-4">
                    <p className="text-sm text-green-900">
                      <strong>You're done!</strong> We'll upgrade your account within 24 hours and notify you in Discord. Start syncing 2 years of transaction history immediately.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-sheetlink-bg px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-sheetlink-text">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <details className="group rounded-lg border-2 border-gray-200 bg-white p-6">
                <summary className="cursor-pointer text-lg font-semibold text-sheetlink-text">
                  Is this really free forever?
                </summary>
                <p className="mt-4 text-gray-700">
                  Yes! Beta Members get 2-year transaction history free forever, even after we launch paid Pro and Basic tiers. This is our thank you for helping us build SheetLink.
                </p>
              </details>

              <details className="group rounded-lg border-2 border-gray-200 bg-white p-6">
                <summary className="cursor-pointer text-lg font-semibold text-sheetlink-text">
                  What happens after 50 slots are filled?
                </summary>
                <p className="mt-4 text-gray-700">
                  Once we reach 50 Beta Members, the program closes. You can still join the Discord waitlist, and we may open additional spots in the future based on how the program goes.
                </p>
              </details>

              <details className="group rounded-lg border-2 border-gray-200 bg-white p-6">
                <summary className="cursor-pointer text-lg font-semibold text-sheetlink-text">
                  Can I lose my Beta Member status?
                </summary>
                <p className="mt-4 text-gray-700">
                  Only if you completely stop engaging (no Discord activity for 6+ months). We're very lenient - just stay in the community and provide occasional feedback.
                </p>
              </details>

              <details className="group rounded-lg border-2 border-gray-200 bg-white p-6">
                <summary className="cursor-pointer text-lg font-semibold text-sheetlink-text">
                  What if I don't have SheetLink yet?
                </summary>
                <p className="mt-4 text-gray-700">
                  No problem! Install SheetLink from the Chrome Web Store (link above), then join Discord. We'll upgrade your account once you verify your email.
                </p>
              </details>

              <details className="group rounded-lg border-2 border-gray-200 bg-white p-6">
                <summary className="cursor-pointer text-lg font-semibold text-sheetlink-text">
                  How much time does this require?
                </summary>
                <p className="mt-4 text-gray-700">
                  Very little! Maybe 5-10 minutes a month to respond to a quick poll or share feedback on a new feature. No mandatory meetings or daily commitments.
                </p>
              </details>

              <details className="group rounded-lg border-2 border-gray-200 bg-white p-6">
                <summary className="cursor-pointer text-lg font-semibold text-sheetlink-text">
                  What about the Free Tier (7 days)?
                </summary>
                <p className="mt-4 text-gray-700">
                  The Free Tier (7 days) will remain free forever for all users. Beta Members simply get upgraded to 2-year history at no cost while others will need to subscribe to Basic or Pro tiers when they launch.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-xl border-2 border-sheetlink-green-700 bg-gradient-to-br from-sheetlink-green-50 to-white p-12"
            >
              <h2 className="mb-4 text-3xl font-bold text-sheetlink-text">
                Ready to Join?
              </h2>
              <p className="mb-8 text-lg text-gray-700">
                Become one of the first 50 Beta Members and get 2 years of transaction history, free forever.
              </p>

              {/* Counter */}
              <div className="mb-8">
                <div className="mx-auto mb-2 max-w-md rounded-full bg-gray-200">
                  <div
                    className="rounded-full bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 py-2 text-center text-sm font-semibold text-white transition-all duration-500"
                    style={{ width: `${(slotsFilledCount / totalSlots) * 100}%`, minWidth: '20%' }}
                  >
                    {slotsFilledCount}/{totalSlots} Slots Filled
                  </div>
                </div>
                <p className="text-lg font-semibold text-sheetlink-green-900">
                  {slotsRemaining > 0 ? (
                    <>Only {slotsRemaining} spots remaining!</>
                  ) : (
                    <>All slots filled</>
                  )}
                </p>
              </div>

              {slotsRemaining > 0 ? (
                <a
                  href={discordInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => analytics.ctaJoinBetaClick('Beta Footer')}
                  className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-white transition-all duration-200 hover:shadow-lg"
                >
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                  Join Discord & Claim Your Spot
                </a>
              ) : (
                <a
                  href={discordInviteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border-2 border-sheetlink-green-700 px-8 py-4 text-lg font-semibold text-sheetlink-green-700 transition-all duration-200 hover:bg-sheetlink-green-700 hover:text-white"
                >
                  Join Waitlist
                </a>
              )}
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
