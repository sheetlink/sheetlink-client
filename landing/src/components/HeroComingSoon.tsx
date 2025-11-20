'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { analytics } from '@/lib/analytics';

export default function HeroComingSoon() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
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
      const response = await fetch(`${apiBaseUrl}/beta/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'web',
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit signup');
      }

      const data = await response.json();

      if (data.status === 'ok') {
        analytics.betaSignupSuccess(email.trim());
        router.push('/success');
      } else {
        throw new Error('Unexpected response');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
      console.error('Beta signup error:', error);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center px-4 py-20">
      <div className="mx-auto max-w-4xl text-center">
        {/* PRD v0.2 section start: Coming Soon Hero */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-5xl font-bold text-sheetlink-text md:text-7xl"
        >
          Your bank. Your sheet.{' '}
          <span className="text-sheetlink-green-700">Coming soon.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12 text-xl text-gray-600 md:text-2xl"
        >
          SheetLink connects your bank to Google Sheets. Live, private, and yours forever.
        </motion.p>

        {/* Beta Email Capture Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto max-w-md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                className="flex-1 rounded-lg border-2 border-gray-200 px-4 py-3 text-sheetlink-text focus:border-sheetlink-green-700 focus:outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
                placeholder="your@email.com"
                required
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-8 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'loading' ? 'Joining...' : 'Join Beta'}
              </button>
            </div>

            {status === 'error' && (
              <div className="rounded-md border border-red-400 bg-red-50 p-2 text-sm text-red-700">
                {errorMessage}
              </div>
            )}

            <p className="text-sm text-gray-600">
              Lifetime free access for early testers.
            </p>
          </form>
        </motion.div>
        {/* PRD v0.2 section end: Coming Soon Hero */}

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mt-16 max-w-2xl"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sheetlink-green-900 text-xs font-bold text-white">
                🏦
              </div>
              <span className="text-sm font-medium text-gray-600">Plaid</span>
            </div>
            <span className="text-gray-400">+</span>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
                📊
              </div>
              <span className="text-sm font-medium text-gray-600">Google Sheets</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
