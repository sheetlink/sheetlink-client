'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export default function ProductDemo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    // Progressive video loading after page becomes interactive
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.load();
        }
      }, 500);
    }
  }, []);

  const handleVideoCanPlay = () => {
    setVideoLoaded(true);
  };

  return (
    <section id="demo" className="bg-gradient-to-b from-white to-sheetlink-bg px-4 py-20">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-sheetlink-text md:text-5xl">
            Build your P&L and cash flow in seconds
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Sync transactions instantly. Choose a financial template with our new Recipes feature. Get real-time insights without the spreadsheet work.
          </p>
        </motion.div>

        {/* Demo Video with Progressive Loading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mx-auto max-w-5xl"
        >
          {/* Video Container with Poster */}
          <div className="relative overflow-hidden rounded-xl shadow-2xl">
            {/* Poster Image - Loads immediately */}
            <img
              src="/demo-poster.webp"
              alt="SheetLink Demo"
              className="w-full rounded-xl"
              width="1200"
              height="750"
              loading="eager"
              style={{ display: videoLoaded ? 'none' : 'block' }}
            />

            {/* Video - Loads progressively */}
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/demo-poster.webp"
              onCanPlay={handleVideoCanPlay}
              className={`w-full rounded-xl transition-opacity duration-400 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{ display: videoLoaded ? 'block' : 'none' }}
            >
              <source src="/demo-video.webm" type="video/webm" />
              <source src="/demo-video.mp4" type="video/mp4" />
            </video>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
