import { motion } from 'framer-motion';
import { WHY_SHEETLINK } from '@/lib/constants';

export default function WhySheetLink() {
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
            Why SheetLink?
          </h2>
          <p className="text-lg text-gray-600">
            No dashboards. No lock-in. Just your data, your way.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {WHY_SHEETLINK.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="rounded-lg bg-white p-6 shadow-sm"
            >
              <div className="mb-3 text-4xl">{item.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-sheetlink-text">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
