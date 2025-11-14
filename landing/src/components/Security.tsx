import { motion } from 'framer-motion';

const SECURITY_POINTS = [
  {
    title: 'Powered by Plaid',
    description:
      'Bank connections through Plaid. Trusted by Venmo, Robinhood, and thousands of apps. Your credentials never touch our servers.',
  },
  {
    title: 'Read-Only Access',
    description:
      'SheetLink only writes to your Sheets. We never read your spreadsheet data. Zero-knowledge architecture.',
  },
  {
    title: 'Encrypted at Rest',
    description:
      'Bank tokens encrypted with AES-256. Open-source code auditable on GitHub. No hidden tracking.',
  },
  {
    title: 'You Control Everything',
    description:
      'Your data lives in your Google Sheet. Disconnect anytime. Export freely. No vendor lock-in.',
  },
];

export default function Security() {
  return (
    <section className="bg-sheetlink-bg px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">
            Security & Privacy
          </h2>
          <p className="text-lg text-gray-600">
            Your data. Your spreadsheet. Your control.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {SECURITY_POINTS.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <h3 className="mb-3 text-xl font-semibold text-sheetlink-text">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-lg border-2 border-sheetlink-green-700/20 bg-white p-8 text-center"
        >
          <p className="mb-4 text-lg font-medium text-sheetlink-text">
            Questions about security?
          </p>
          <p className="text-gray-600">
            Read our{' '}
            <a href="/privacy" className="text-sheetlink-green-700 hover:underline">
              Privacy Policy
            </a>{' '}
            or{' '}
            <a href="/terms" className="text-sheetlink-green-700 hover:underline">
              Terms of Service
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
