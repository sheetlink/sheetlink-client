'use client';

import { motion } from 'framer-motion';

const GoogleIcon = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
    <rect width="48" height="48" rx="8" fill="#FFFFFF" stroke="#E5E7EB" strokeWidth="2"/>
    <g transform="translate(12, 12)">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      <path d="M1 1h22v22H1z" fill="none"/>
    </g>
  </svg>
);

const PlaidIcon = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" aria-label="Plaid">
    <rect width="48" height="48" rx="8" fill="#000000"/>
    <g transform="translate(10, 10)" fill="#FFFFFF" fillRule="evenodd">
      <path d="M25.7629 26.2628L28 17.5309L24.9691 14.5001L27.9999 11.4691L25.7628 2.73706L17.0309 0.5L14.0001 3.531L10.969 0.50014L2.23706 2.73734L0 11.4691L3.03128 14.4999L0.00014 17.531L2.2372 26.2629L10.9691 28.5L14.0001 25.469L17.031 28.4999L25.7629 26.2628ZM15.7321 23.7371L18.6186 20.8505L22.2912 24.5233L17.6956 25.7007L15.7321 23.7371ZM11.1136 9.88154L14.0003 6.99502L16.8868 9.8814L14.0001 12.7679L11.1136 9.88154ZM12.2682 14.5L9.38154 17.3865L6.49502 14.5L9.38154 11.6135L12.2682 14.5ZM18.6187 11.6133L21.5053 14.5L18.6186 17.3865L15.7321 14.5L18.6187 11.6133ZM16.8867 19.1186L14.0001 22.0051L11.1135 19.1185L14.0001 16.2319L16.8867 19.1186ZM10.3044 25.7007L5.70864 24.5233L9.38154 20.8504L12.2682 23.7371L10.3044 25.7007ZM4.76308 16.2319L7.6496 19.1185L3.9767 22.7914L2.7993 18.1957L4.76308 16.2319ZM3.9767 6.20836L7.64974 9.8814L4.76308 12.7681L2.7993 10.8041L3.9767 6.20836ZM12.2683 5.26294L9.38168 8.1496L5.70892 4.4767L10.3047 3.2993L12.2683 5.26294ZM17.6959 3.2993L22.2915 4.4767L18.6186 8.14946L15.7321 5.26294L17.6959 3.2993ZM23.2372 12.7681L20.3505 9.8814L24.0233 6.20878L25.2007 10.8046L23.2372 12.7681ZM24.0233 22.7914L20.3505 19.1186L23.2372 16.2321L25.2007 18.1957L24.0233 22.7914Z"/>
    </g>
  </svg>
);

const SheetsIcon = () => (
  <svg viewBox="0 0 48 48" className="h-12 w-12" xmlns="http://www.w3.org/2000/svg" aria-label="Google Sheets">
    <rect width="48" height="48" rx="8" fill="#34A853"/>
    <g transform="translate(12, 12)">
      <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 8v11c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 8h-8v8H9v-8H5V9h4V5h2v4h8v2z" fill="#FFFFFF"/>
    </g>
  </svg>
);

const steps = [
  {
    number: '01',
    title: 'Sign in with Google',
    description: 'Use your Google account to connect SheetLink and your Google Sheets.',
    icon: GoogleIcon,
  },
  {
    number: '02',
    title: 'Connect Your Bank',
    description: 'Securely connect your bank with Plaid. We never see or store your credentials.',
    icon: PlaidIcon,
  },
  {
    number: '03',
    title: 'Link Your Sheet & Sync',
    description: 'Paste a Google Sheet URL you own. SheetLink writes the last 7 days of transactions directly into your sheet.',
    icon: SheetsIcon,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gradient-to-b from-sheetlink-bg to-white px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">
            How it Works
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-gray-600">
            Get started in minutes with our simple 3-step process.
          </p>
        </motion.div>

        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col items-center gap-8 md:flex-row"
            >
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sheetlink-green-900 to-sheetlink-green-700 text-3xl font-bold text-white">
                {step.number}
              </div>
              <div className="flex flex-1 flex-col items-center rounded-xl border-2 border-gray-200 bg-white p-8 text-center md:flex-row md:text-left">
                <div className="mb-4 md:mb-0 md:mr-6">
                  <step.icon />
                </div>
                <div>
                  <h3 className="mb-2 text-2xl font-bold text-sheetlink-text">{step.title}</h3>
                  <p className="text-lg leading-relaxed text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Permission Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-lg border-2 border-blue-200 bg-blue-50 p-6 text-center"
        >
          <p className="text-sm font-medium text-blue-900">
            <span className="font-bold">Note:</span> You must have edit access to the sheet you link. SheetLink verifies this automatically.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
