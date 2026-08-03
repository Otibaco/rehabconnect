'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Heart } from 'lucide-react';
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
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const childTransition = {
  duration: 0.55,
  ease: [0.25, 0.4, 0.25, 1] as const,
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: childTransition,
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const FamilyStoryBanner: React.FC = () => {
  const router = useRouter();

  return (
    <section
      className="relative py-20 sm:py-28"
      style={{ backgroundColor: 'var(--color-section-muted)' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        <motion.div
          className="relative overflow-hidden rounded-2xl min-h-[440px] sm:min-h-[480px] flex items-center theme-shadow"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {/* Background image */}
          <Image
            src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1600"
            alt="Family receiving supportive healthcare guidance"
            fill
            className="object-cover"
            priority
          />

          {/* Layered overlays — light, airy, branded */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-bg)]/95 via-[var(--color-bg)]/75 to-transparent" />
          <div className="absolute inset-0 bg-white/5" />

          {/* Content */}
          <div className="relative z-10 max-w-xl px-8 py-14 sm:px-14 sm:py-16 space-y-6">
            
            {/* Badge */}
            <motion.div variants={childVariants}>
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)] text-[var(--color-accent)] text-xs font-medium border border-[var(--color-border)]">
                <Heart className="w-3.5 h-3.5" />
                Family-centred compassion
              </span>
            </motion.div>

            {/* Quote headline */}
            <motion.h2
              variants={childVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text)] leading-tight"
            >
              &ldquo;When my brother needed help, RehabConnect gave us clarity when we had none.&rdquo;
            </motion.h2>

            {/* Body */}
            <motion.p
              variants={childVariants}
              className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-md"
            >
              Healthcare navigation shouldn&apos;t feel like a bureaucratic obstacle course.
              Our platform is built around real human care coordinators who treat your
              family with the dignity and empathy you deserve.
            </motion.p>

            {/* CTA */}
            <motion.div variants={childVariants}>
              <button
                onClick={() => router.push('/for-families')}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl theme-btn-primary text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <span>Read family support guide</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

          </div>

          {/* Subtle decorative element — right side accent line */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-24 rounded-l-full bg-[var(--color-accent)] opacity-30 hidden lg:block" />
        </motion.div>

      </div>
    </section>
  );
};

export default FamilyStoryBanner;