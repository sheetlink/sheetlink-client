import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND } from '@/lib/constants';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Beta() {
  const router = useRouter();
  const seoTitle = `Join the Beta | ${BRAND.name}`;
  const seoDescription = 'Be among the first to connect your bank directly to Google Sheets. Live, private, and under your control.';

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      setErrorMessage('Email is required');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';
      const response = await fetch(`${apiBaseUrl}/api/beta-signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || undefined,
          source: 'web',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit signup');
      }

      const data = await response.json();

      if (data.status === 'ok') {
        setStatus('success');
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again later.');
      console.error('Beta signup error:', error);
    }
  };

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
      </Head>

      <Header />
      <main className="min-h-screen bg-[#F6F7F5] pt-16">
        <section className="mx-auto max-w-[640px] px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero */}
            <div className="mb-12 text-center">
              <h1 className="mb-4 bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 bg-clip-text text-5xl font-bold text-transparent md:text-5xl">
                Join the SheetLink Beta
              </h1>
              <p className="mb-8 text-lg leading-relaxed text-gray-700 md:text-xl">
                Be among the first to connect your bank directly to Google Sheets. Live, private, and under your control.
              </p>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 text-sm font-semibold text-white shadow-md">
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                <span>Lifetime free access for sandbox testers</span>
              </div>
              <Link href="/privacy" className="flex items-center justify-center gap-2 text-sm text-gray-600">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span>Privacy-first by design</span>
              </Link>
            </div>

            {/* Form Card */}
            <div className="rounded-lg border border-[#E4EAE5] bg-white p-8 shadow-sm">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-md bg-[#E9F4EC] p-6 text-center"
                >
                  <div className="mb-3 flex justify-center">
                    <svg className="h-12 w-12 text-[#023820]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h2 className="mb-2 text-xl font-semibold text-[#023820]">You're on the list</h2>
                  <p className="mb-4 text-sm text-[#023820]">
                    We'll reach out soon with early access details.
                  </p>
                  <p className="text-xs text-gray-600">
                    (No marketing, no spam, just an invite when it's ready.)
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-sheetlink-text">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === 'loading'}
                      className="block w-full rounded-md border border-[#C6E2CC] px-3 py-2 text-sheetlink-text focus:outline-none focus:ring-1 focus:ring-[#0B703A] disabled:cursor-not-allowed disabled:bg-gray-100"
                      placeholder="you@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-sheetlink-text">
                      Name <span className="text-gray-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === 'loading'}
                      className="block w-full rounded-md border border-[#C6E2CC] px-3 py-2 text-sheetlink-text focus:outline-none focus:ring-1 focus:ring-[#0B703A] disabled:cursor-not-allowed disabled:bg-gray-100"
                      placeholder="Your name"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="rounded-md border border-red-400 bg-red-50 p-3 text-sm text-red-700">
                      ⚠️ {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full rounded-md bg-[#023820] px-6 py-2.5 font-semibold text-white transition hover:bg-[#0B703A] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {status === 'loading' ? 'Requesting...' : 'Join the Beta'}
                  </button>

                  <p className="text-center text-xs text-gray-600">
                    🔒 We'll only use your email for early access updates.<br />
                    You can remove yourself anytime.
                  </p>
                </form>
              )}
            </div>

            {/* Privacy Links */}
            <div className="mt-6 text-center text-xs text-gray-500">
              <Link href="/privacy" className="underline hover:text-gray-700">
                Privacy Policy
              </Link>
              {' · '}
              <Link href="/terms" className="underline hover:text-gray-700">
                Terms of Service
              </Link>
            </div>
          </motion.div>


          {/* Info Card */}
          <div className="mt-12 rounded-xl border-2 border-sheetlink-green-700/20 bg-sheetlink-bg p-8">
            <h2 className="mb-6 text-2xl font-bold text-sheetlink-text">What to Expect</h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-900 text-sm font-bold text-white">
                  1
                </span>
                <div>
                  <strong className="text-sheetlink-text">Test with Plaid Sandbox</strong>
                  <p className="mt-1 text-sm text-gray-600">
                    Connect fake bank accounts using Plaid's sandbox environment. No real banking
                    credentials required.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-green-700 text-sm font-bold text-white">
                  2
                </span>
                <div>
                  <strong className="text-sheetlink-text">Provide Feedback</strong>
                  <p className="mt-1 text-sm text-gray-600">
                    We'll send short surveys to understand what's working and what needs improvement.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-sheetlink-accent text-sm font-bold text-white">
                  3
                </span>
                <div>
                  <strong className="text-sheetlink-text">Keep Lifetime Free Access</strong>
                  <p className="mt-1 text-sm text-gray-600">
                    Beta testers get permanent free access when we launch. No credit card. No
                    expiration.
                  </p>
                </div>
              </li>
            </ul>
          </div>


          {/* CTAs */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/sandbox"
              className="rounded-lg border-2 border-sheetlink-green-700 bg-white px-6 py-3 text-center font-semibold text-sheetlink-green-700 transition-all hover:bg-sheetlink-bg"
            >
              View Sandbox Setup Guide →
            </Link>
            <Link
              href="/privacy"
              className="rounded-lg border-2 border-gray-200 bg-white px-6 py-3 text-center font-semibold text-gray-700 transition-all hover:bg-gray-50"
            >
              Read Privacy Policy
            </Link>
          </div>


        </section>

        <Footer />
      </main>
    </>
  );
}
