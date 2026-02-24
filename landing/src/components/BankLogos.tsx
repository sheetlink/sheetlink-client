'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BankLogos() {
  const banks = [
    { name: 'Wells Fargo', logo: '/bank-logos/ins_127991.svg' },
    { name: 'Chase', logo: '/bank-logos/ins_56.svg' },
    { name: 'Bank of America', logo: '/bank-logos/ins_127989.svg' },
    { name: 'Citibank', logo: '/bank-logos/ins_5.svg' },
    { name: 'US Bank', logo: '/bank-logos/ins_127990.svg' },
    { name: 'TD Bank', logo: '/bank-logos/ins_14.svg' },
    { name: 'American Express', logo: '/bank-logos/ins_10.svg' },
    { name: 'Navy Federal Credit Union', logo: '/bank-logos/ins_15.svg' },
    { name: 'Capital One', logo: '/bank-logos/ins_128026.svg' },
    { name: 'Ally Bank', logo: '/bank-logos/ins_25.svg' },
    { name: 'Marcus by Goldman Sachs', logo: '/bank-logos/ins_52.svg' },
    { name: 'Discover Bank', logo: '/bank-logos/ins_33.svg' }
  ];

  return (
    <section className="overflow-hidden bg-gray-50 py-8">
      <div className="mx-auto max-w-7xl px-4">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wide text-gray-500">
          Trusted by 10,000+ Banks via Plaid
        </p>

        {/* Scrolling container */}
        <div className="relative">
          <div className="flex gap-12 overflow-hidden">
            <motion.div
              className="flex min-w-max gap-12 items-center"
              animate={{
                x: [0, -1800],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
            >
              {[...banks, ...banks, ...banks].map((bank, index) => (
                <div
                  key={`${bank.name}-${index}`}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={bank.logo}
                    alt={`${bank.name} logo`}
                    width={140}
                    height={60}
                    className="object-contain opacity-70 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Fade overlays */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-gray-50 to-transparent"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-gray-50 to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
