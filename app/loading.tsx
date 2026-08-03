// app/loading.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartHandshake } from 'lucide-react';

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  // Minimum display time to avoid flash
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[var(--color-bg)]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.25, 0.4, 0.25, 1] }}
        >
          {/* ── Decorative background ── */}
          <div className="pointer-events-none absolute inset-0">
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full opacity-[0.06] blur-[100px]"
              style={{ background: 'var(--color-hero-glow)' }}
            />
          </div>

          {/* ── Content ── */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo mark with pulse */}
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-[var(--color-accent)]/20"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-[var(--color-accent)]/10"
                animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.05, 0.2] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: 0.3,
                }}
              />

              {/* Icon */}
              <div className="relative w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <HeartHandshake className="w-7 h-7" />
                </motion.div>
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <span className="text-lg font-bold tracking-tight text-[var(--color-text)]">
                Rehab<span className="text-[var(--color-accent)]">Connect</span>
              </span>
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-32 h-0.5 rounded-full bg-[var(--color-surface-muted)] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              <motion.div
                className="h-full rounded-full bg-[var(--color-accent)]"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{
                  duration: 1.8,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}