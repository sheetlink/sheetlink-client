'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BRAND, URLS } from '@/lib/constants';
import { analytics } from '@/lib/analytics';
import {
  Building2,
  Zap,
  Globe,
  Table2,
  Lock,
  User,
  ClipboardList,
  Tag,
  X,
  Check,
  Shield,
  AlertTriangle,
  Book,
} from 'lucide-react';

export default function Security() {
  const seoTitle = `Security - ${BRAND.name}`;
  const seoDescription = 'Learn how SheetLink protects your financial data with encryption, pass-through architecture, and minimal permissions.';

  useEffect(() => {
    analytics.pageView('Security', '/security');
  }, []);

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
              Security by Design
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto max-w-2xl text-xl text-gray-700"
            >
              SheetLink is built with security and privacy as core principles. Here's how we protect your financial data.
            </motion.p>
          </div>
        </section>

        {/* Pass-Through Architecture */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Pass-Through Architecture</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                Your transaction data never sits on our servers. Here's the complete data flow:
              </p>
              <div className="rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-bg p-8">
                <div className="flex flex-col items-center gap-4 text-center md:flex-row md:justify-between">
                  <div className="flex-1">
                    <div className="mb-2 flex justify-center">
                      <svg viewBox="0 0 48 48" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" aria-label="Plaid">
                        <rect width="48" height="48" rx="8" fill="#000000"/>
                        <g transform="translate(10, 10)" fill="#FFFFFF" fillRule="evenodd">
                          <path d="M25.7629 26.2628L28 17.5309L24.9691 14.5001L27.9999 11.4691L25.7628 2.73706L17.0309 0.5L14.0001 3.531L10.969 0.50014L2.23706 2.73734L0 11.4691L3.03128 14.4999L0.00014 17.531L2.2372 26.2629L10.9691 28.5L14.0001 25.469L17.031 28.4999L25.7629 26.2628ZM15.7321 23.7371L18.6186 20.8505L22.2912 24.5233L17.6956 25.7007L15.7321 23.7371ZM11.1136 9.88154L14.0003 6.99502L16.8868 9.8814L14.0001 12.7679L11.1136 9.88154ZM12.2682 14.5L9.38154 17.3865L6.49502 14.5L9.38154 11.6135L12.2682 14.5ZM18.6187 11.6133L21.5053 14.5L18.6186 17.3865L15.7321 14.5L18.6187 11.6133ZM16.8867 19.1186L14.0001 22.0051L11.1135 19.1185L14.0001 16.2319L16.8867 19.1186ZM10.3044 25.7007L5.70864 24.5233L9.38154 20.8504L12.2682 23.7371L10.3044 25.7007ZM4.76308 16.2319L7.6496 19.1185L3.9767 22.7914L2.7993 18.1957L4.76308 16.2319ZM3.9767 6.20836L7.64974 9.8814L4.76308 12.7681L2.7993 10.8041L3.9767 6.20836ZM12.2683 5.26294L9.38168 8.1496L5.70892 4.4767L10.3047 3.2993L12.2683 5.26294ZM17.6959 3.2993L22.2915 4.4767L18.6186 8.14946L15.7321 5.26294L17.6959 3.2993ZM23.2372 12.7681L20.3505 9.8814L24.0233 6.20878L25.2007 10.8046L23.2372 12.7681ZM24.0233 22.7914L20.3505 19.1186L23.2372 16.2321L25.2007 18.1957L24.0233 22.7914Z"/>
                        </g>
                      </svg>
                    </div>
                    <h3 className="mb-1 font-bold text-sheetlink-text">Your Bank</h3>
                    <p className="text-sm text-gray-600">Via Plaid</p>
                  </div>
                  <div className="text-2xl text-sheetlink-green-900">→</div>
                  <div className="flex-1">
                    <div className="mb-2 flex justify-center">
                      <svg viewBox="0 0 48 48" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" aria-label="SheetLink">
                        <rect width="48" height="48" rx="8" fill="#023820"/>
                        <g transform="translate(4.5, 4.5) scale(0.0391)" fill="#FFFFFF">
                          <path d="M627.2 276.5c-18 3.3-34.3 10.6-49.2 21.8-11 8.3-115.2 111.3-123.1 121.7-19.3 25.4-25.8 64.3-15.8 94.4 5.6 16.8 15.1 30.5 34.8 50 11 11 11 11 16 11 6.3 0 8.4-1.5 24.2-16.9 10.4-10.2 12.2-12.4 12.6-15.6.3-2.1.2-5-.1-6.5-.4-1.6-6.4-8.6-14.5-16.8-7.5-7.8-14.6-15.7-15.8-17.6-3.4-5.6-5.3-13.7-5.3-22.6 0-9.1 1.5-14.3 5.9-20.7 1.6-2.4 29.4-30.4 61.8-62.3 63.9-62.9 63.9-62.9 78-65.9 8.6-1.8 14-1.8 22.6 0 11.4 2.4 19.1 6.8 28.7 16.5 13 12.9 18 24.2 18 40.5 0 10.1-2 18-6.8 26.8-2.9 5.3-8.5 11.5-26.2 29.5-54.6 55.2-49.5 49-47.2 57.8 3 11.3 4.5 25.5 3.8 35.9-.9 12.8-3.5 27.3-5.7 32.4s-2.3 6.2-.6 6c2.1-.3 114.1-114 119.9-121.9 22.5-30.3 26.8-70.1 11.7-109.1-6.2-16.1-13.9-27.1-28.8-41.1-10.4-9.7-17.8-14.3-31.9-19.9-17.9-7-23.6-8.1-42.7-8.5-11.6-.2-19.3.1-24.3 1.1"/>
                          <path d="M538.6 449.1c-20.3 20.9-20.1 19.1-3.8 36.5 13.1 14 17.4 20.7 19.7 30.6 3.1 13.6 1 25.4-7 38.9-4.4 7.6-10.7 14.1-62.5 66-55.3 55.3-57.8 57.7-65 61.1-21.4 10.3-42.9 6.9-59.1-9.4-11.5-11.5-16.6-24.7-15.6-40.3.6-9.2 3-16.3 8.3-24.4 2-3.1 19.3-21.3 38.4-40.5 34.8-34.8 34.8-34.8 33-38-3.2-5.4-7.8-20.8-9.1-30.1-1.3-10.1-.6-31.1 1.2-36.3.6-1.8.9-3.5.7-3.8-.9-.8-105.5 104.3-110.4 110.8-18.4 25-24.4 59.1-16.4 93.4 5.7 24.4 27.3 54 48.8 66.8 18.7 11.1 35.5 15.1 60.7 14.3 26.6-.7 43.3-6.7 64.5-23 7.5-5.8 119.6-117.6 125.7-125.4 20.8-26.6 26.9-66.8 15.6-102.8-5.4-17-13.7-29.6-32.4-48.8-10.9-11.3-11.6-11.7-15.5-11.7-4.1 0-4.6.4-19.8 16.1"/>
                        </g>
                      </svg>
                    </div>
                    <h3 className="mb-1 font-bold text-sheetlink-text">SheetLink API</h3>
                    <p className="text-sm text-gray-600">In-memory (&lt;1 second)</p>
                  </div>
                  <div className="text-2xl text-sheetlink-green-900">→</div>
                  <div className="flex-1">
                    <div className="mb-2 flex justify-center">
                      <svg viewBox="0 0 48 48" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-label="Chrome">
                        <defs>
                          <linearGradient id="chrome-a" x1="3.2173" y1="15" x2="44.7812" y2="15" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#d93025"/>
                            <stop offset="1" stopColor="#ea4335"/>
                          </linearGradient>
                          <linearGradient id="chrome-b" x1="20.7219" y1="47.6791" x2="41.5039" y2="11.6837" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#fcc934"/>
                            <stop offset="1" stopColor="#fbbc04"/>
                          </linearGradient>
                          <linearGradient id="chrome-c" x1="26.5981" y1="46.5015" x2="5.8161" y2="10.506" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stopColor="#1e8e3e"/>
                            <stop offset="1" stopColor="#34a853"/>
                          </linearGradient>
                        </defs>
                        <rect width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2"/>
                        <g transform="translate(6, 6) scale(0.75)">
                          <circle cx="24" cy="23.9947" r="12" style={{fill:'#fff'}}/>
                          <path d="M3.2154,36A24,24,0,1,0,12,3.2154,24,24,0,0,0,3.2154,36ZM34.3923,18A12,12,0,1,1,18,13.6077,12,12,0,0,1,34.3923,18Z" style={{fill:'none'}}/>
                          <path d="M24,12H44.7812a23.9939,23.9939,0,0,0-41.5639.0029L13.6079,30l.0093-.0024A11.9852,11.9852,0,0,1,24,12Z" style={{fill:'url(#chrome-a)'}}/>
                          <circle cx="24" cy="24" r="9.5" style={{fill:'#1a73e8'}}/>
                          <path d="M34.3913,30.0029,24.0007,48A23.994,23.994,0,0,0,44.78,12.0031H23.9989l-.0025.0093A11.985,11.985,0,0,1,34.3913,30.0029Z" style={{fill:'url(#chrome-b)'}}/>
                          <path d="M13.6086,30.0031,3.218,12.006A23.994,23.994,0,0,0,24.0025,48L34.3931,30.0029l-.0067-.0068a11.9852,11.9852,0,0,1-20.7778.007Z" style={{fill:'url(#chrome-c)'}}/>
                        </g>
                      </svg>
                    </div>
                    <h3 className="mb-1 font-bold text-sheetlink-text">Your Browser</h3>
                    <p className="text-sm text-gray-600">Extension</p>
                  </div>
                  <div className="text-2xl text-sheetlink-green-900">→</div>
                  <div className="flex-1">
                    <div className="mb-2 flex justify-center">
                      <svg viewBox="0 0 48 48" className="h-10 w-10" xmlns="http://www.w3.org/2000/svg" aria-label="Google Sheets">
                        <rect width="48" height="48" rx="8" fill="#34A853"/>
                        <g transform="translate(12, 12)">
                          <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 8v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 8h-8v8H9v-8H5V9h4V5h2v4h8v2z" fill="#FFFFFF"/>
                        </g>
                      </svg>
                    </div>
                    <h3 className="mb-1 font-bold text-sheetlink-text">Your Sheet</h3>
                    <p className="text-sm text-gray-600">Google Sheets</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-4">
                <p className="text-sm text-blue-900">
                  <strong>What this means:</strong> Transaction data exists in our backend for less than 1 second during sync. No persistence, no storage, no logs of your financial activity.
                </p>
              </div>
            </motion.div>

            {/* What We Store */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">What We Store (Encrypted)</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3">
                    <Lock className="h-8 w-8 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Plaid Access Tokens</h3>
                  <p className="text-gray-700">
                    Encrypted using <strong>Fernet</strong> (AES-128-CBC + HMAC). Only decrypted during sync operations.
                  </p>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3">
                    <User className="h-8 w-8 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Google User ID</h3>
                  <p className="text-gray-700">
                    Your email or stable Google ID. Used to restore your Plaid Items across devices.
                  </p>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3">
                    <ClipboardList className="h-8 w-8 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Sheet Metadata</h3>
                  <p className="text-gray-700">
                    Sheet ID and title. Used to write transactions to the correct destination.
                  </p>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3">
                    <Tag className="h-8 w-8 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Plaid Metadata</h3>
                  <p className="text-gray-700">
                    Item IDs, institution IDs, sync cursors, and timestamps. No transaction content.
                  </p>
                </div>
                <div className="rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
                  <div className="mb-3">
                    <Shield className="h-8 w-8 text-blue-700 stroke-[1.5]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">JWT Tokens (Browser Only)</h3>
                  <p className="text-gray-700">
                    Stored in <strong>Chrome's secure storage</strong> (chrome.storage.sync). Tokens are never persisted on our servers. They expire after 60 minutes and are automatically deleted.
                  </p>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3">
                    <User className="h-8 w-8 text-sheetlink-green-700 stroke-[1.5]" />
                  </div>
                  <h3 className="mb-2 text-xl font-bold text-sheetlink-text">Subscription Tier</h3>
                  <p className="text-gray-700">
                    Your subscription tier (FREE/BASIC/PRO) to enforce feature limits and data retention policies. Not encrypted as it's not sensitive data.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* What We DON'T Store */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">What We DON'T Store</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <X className="mt-1 h-5 w-5 text-red-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-red-900">Transaction Line Items</h3>
                    <p className="text-sm text-red-800">No amounts, merchants, categories, or dates</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <X className="mt-1 h-5 w-5 text-red-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-red-900">Account Balances</h3>
                    <p className="text-sm text-red-800">Your current or historical balances are never stored</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <X className="mt-1 h-5 w-5 text-red-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-red-900">Bank Credentials</h3>
                    <p className="text-sm text-red-800">Handled exclusively by Plaid, never seen by SheetLink</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <X className="mt-1 h-5 w-5 text-red-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-red-900">Google OAuth Tokens</h3>
                    <p className="text-sm text-red-800">Remain in your browser, never sent to our servers</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border-2 border-red-200 bg-red-50 p-4">
                  <X className="mt-1 h-5 w-5 text-red-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-red-900">Sheet Contents</h3>
                    <p className="text-sm text-red-800">We write data but never read your spreadsheets</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* JWT Authentication & Authorization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">JWT Authentication & Authorization</h2>
              <p className="mb-6 text-lg leading-relaxed text-gray-700">
                SheetLink uses industry-standard JWT (JSON Web Token) authentication to securely identify users and enforce subscription tier limits.
              </p>

              <div className="mb-6 rounded-lg border-2 border-sheetlink-green-700 bg-sheetlink-bg p-6">
                <h3 className="mb-4 text-xl font-bold text-sheetlink-text">Authentication Flow:</h3>
                <ol className="space-y-2 text-gray-700">
                  <li><strong>1.</strong> User signs in with Google OAuth (trusted identity provider)</li>
                  <li><strong>2.</strong> Backend verifies Google ID token with Google's API</li>
                  <li><strong>3.</strong> Backend generates signed JWT token (60-minute expiry)</li>
                  <li><strong>4.</strong> Extension stores JWT in Chrome's secure storage</li>
                  <li><strong>5.</strong> All API requests include JWT in Authorization header</li>
                  <li><strong>6.</strong> Backend verifies JWT signature and enforces tier limits</li>
                </ol>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-3 text-lg font-bold text-sheetlink-text">Token Security</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>Cryptographic signatures:</strong> Tokens can't be tampered with</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>60-minute expiry:</strong> Limited validity window</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>HTTPS only:</strong> Encrypted transmission</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>Stateless design:</strong> No server-side session tracking</span>
                    </li>
                  </ul>
                </div>

                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <h3 className="mb-3 text-lg font-bold text-sheetlink-text">Identity Verification</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>Google OAuth:</strong> Trusted identity provider</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>ID token verification:</strong> Backend validates with Google</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>Prevents impersonation:</strong> Can't fake user identity</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-green-600">✓</span>
                      <span><strong>Re-auth on expiry:</strong> Continuous security validation</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 rounded-lg border-2 border-blue-200 bg-blue-50 p-6">
                <h3 className="mb-3 text-lg font-bold text-sheetlink-text">Protected API Endpoints:</h3>
                <p className="mb-3 text-sm text-gray-700">
                  The following endpoints require JWT authentication:
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li><code className="rounded bg-white px-2 py-1 font-mono">/tier/status</code> - Get subscription tier and features</li>
                  <li><code className="rounded bg-white px-2 py-1 font-mono">/plaid/sync</code> - Sync transactions with tier-based field filtering</li>
                  <li><code className="rounded bg-white px-2 py-1 font-mono">/plaid/backfill</code> - Fetch historical data within tier limits</li>
                </ul>
                <p className="mt-4 text-sm font-semibold text-blue-900">
                  Tier-Based Access Control: Backend enforces limits based on authenticated user's subscription tier. FREE users can't access PRO features even if they modify the extension code.
                </p>
              </div>
            </motion.div>

            {/* Extension Permissions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Minimal Extension Permissions</h2>
              <p className="mb-4 text-lg leading-relaxed text-gray-700">
                The Chrome extension requests only what's needed to function:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <Check className="mt-1 h-5 w-5 text-green-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-green-900">storage</h3>
                    <p className="text-sm text-green-800">Store user preferences and connection status</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <Check className="mt-1 h-5 w-5 text-green-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-green-900">identity</h3>
                    <p className="text-sm text-green-800">Google OAuth for Sheets access</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 rounded-lg border-2 border-green-200 bg-green-50 p-4">
                  <Check className="mt-1 h-5 w-5 text-green-600 stroke-[2]" />
                  <div>
                    <h3 className="font-bold text-green-900">tabs</h3>
                    <p className="text-sm text-green-800">Open Plaid Link flow in new tab</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-lg border-2 border-gray-200 bg-white p-4">
                <p className="text-sm text-gray-700">
                  <strong>We do NOT request:</strong> Browsing history, access to all websites, clipboard access, or any unnecessary permissions.
                </p>
              </div>
            </motion.div>

            {/* API Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">API Security</h2>
              <ul className="space-y-3 text-lg text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                  <span><strong>CORS restrictions:</strong> Only SheetLink domains and extension ID allowed</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                  <span><strong>Rate limiting:</strong> All endpoints protected against abuse</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                  <span><strong>Input validation:</strong> All user input sanitized and validated</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                  <span><strong>Privacy middleware:</strong> Sensitive data suppressed from logs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                  <span><strong>Sheet permission verification:</strong> Tests write access before connecting</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 flex-shrink-0 text-sheetlink-green-700">•</span>
                  <span><strong>HTTPS/TLS 1.2+:</strong> All communication encrypted in transit</span>
                </li>
              </ul>
            </motion.div>

            {/* Third-Party Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Third-Party Security</h2>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-bg">
                      <Building2 className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-bold text-sheetlink-text">Plaid</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Handles all bank authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>SOC 2 Type II certified</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Trusted by thousands of companies</span>
                    </li>
                  </ul>
                  <a
                    href="https://plaid.com/security/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-sheetlink-green-700 hover:underline"
                  >
                    Learn more about Plaid Security →
                  </a>
                </div>
                <div className="rounded-lg border-2 border-gray-200 bg-white p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sheetlink-bg">
                      <Table2 className="h-6 w-6 text-sheetlink-green-700 stroke-[1.5]" />
                    </div>
                    <h3 className="text-2xl font-bold text-sheetlink-text">Google</h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>OAuth 2.0 authentication</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Sheets API for write-only access</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600">✓</span>
                      <span>Industry-leading security standards</span>
                    </li>
                  </ul>
                  <a
                    href="https://safety.google/security/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm font-semibold text-sheetlink-green-700 hover:underline"
                  >
                    Learn more about Google Security →
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Reporting Vulnerabilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="mb-6 text-3xl font-bold text-sheetlink-text">Report a Vulnerability</h2>
              <div className="rounded-lg border-2 border-yellow-300 bg-yellow-50 p-6">
                <p className="mb-4 text-lg text-yellow-900">
                  We take security seriously. If you discover a vulnerability, please report it responsibly:
                </p>
                <div className="mb-4 space-y-2 text-sm text-yellow-900">
                  <p><strong>Email:</strong> <a href="mailto:security@sheetlink.app" className="underline">security@sheetlink.app</a></p>
                  <p><strong>Response time:</strong> Within 48 hours</p>
                  <p><strong>Disclosure:</strong> We'll coordinate responsible disclosure with you</p>
                </div>
                <p className="text-sm text-yellow-800">
                  Please do not publicly disclose the vulnerability before we've had time to patch it. We acknowledge security researchers in our release notes (with permission).
                </p>
              </div>
            </motion.div>

            {/* Open Source */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-xl border-2 border-sheetlink-green-700 bg-sheetlink-bg p-8">
                <div className="mb-4">
                  <Book className="h-10 w-10 text-sheetlink-green-700 stroke-[1.5]" />
                </div>
                <h2 className="mb-4 text-2xl font-bold text-sheetlink-text">Audit the Code Yourself</h2>
                <p className="mb-6 text-lg text-gray-700">
                  All client-side code (extension and landing site) is open source and available on GitHub. You can review every line before installing.
                </p>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={URLS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-sheetlink-green-900 to-sheetlink-green-700 px-6 py-3 font-semibold text-white transition-all duration-200 hover:shadow-lg"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                    View on GitHub
                  </a>
                  <Link
                    href={URLS.privacy}
                    className="inline-flex items-center justify-center rounded-lg border-2 border-sheetlink-green-700 bg-white px-6 py-3 font-semibold text-sheetlink-green-700 transition-all hover:bg-sheetlink-bg"
                  >
                    Read Privacy Policy
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
