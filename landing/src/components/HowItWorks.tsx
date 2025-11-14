import { motion } from 'framer-motion';
import { STEPS } from '@/lib/constants';

export default function HowItWorks() {
  return (
    <section className="bg-white px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">Three steps. No complexity.</p>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="mb-4 text-6xl font-bold text-sheetlink-green-900/10">
                {step.number}
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-sheetlink-text">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
