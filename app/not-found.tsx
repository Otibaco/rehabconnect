// app/not-found.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Search, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const childTransition = {
  duration: 0.55,
  ease: [0.25, 0.4, 0.25, 1] as const,
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: childTransition,
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NotFound() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[var(--color-bg)]">
      
      {/* ── Decorative background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: 'var(--color-hero-glow)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[120px]"
          style={{ background: 'var(--color-hero-glow-2)' }}
        />
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 max-w-lg mx-auto px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Large 404 */}
        <motion.div variants={childVariants} className="mb-6">
          <span className="text-[8rem] sm:text-[10rem] font-bold tracking-tight leading-none text-[var(--color-accent)] opacity-20 select-none">
            404
          </span>
        </motion.div>

        {/* Badge */}
        <motion.div variants={childVariants}>
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-[var(--color-accent)] text-xs font-medium mb-6">
            <Search className="w-3.5 h-3.5" />
            Page not found
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={childVariants}
          className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)] mb-3"
        >
          This page doesn&apos;t exist
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={childVariants}
          className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mb-10 max-w-sm mx-auto"
        >
          The page you&apos;re looking for may have been moved, renamed, or is
          temporarily unavailable. Let us help you find the right path.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={childVariants}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto justify-center"
        >
          <button
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 theme-btn-primary px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
          >
            <Home className="w-4 h-4" />
            Back to home
          </button>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 theme-btn-ghost px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98]"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </button>
        </motion.div>
      </motion.div>

    </section>
  );
}