'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';

interface Step {
  step: string;
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    step: '01',
    title: 'Tell us your need',
    desc: 'Complete a brief, confidential assessment online or by phone — it takes two minutes.',
  },
  {
    step: '02',
    title: 'Clinical review',
    desc: 'A dedicated care coordinator reviews your history and understands your placement goals.',
  },
  {
    step: '03',
    title: 'Meet your coordinator',
    desc: 'Connect via encrypted video or telephone consultation with your personal care coordinator.',
  },
  {
    step: '04',
    title: 'Verified placement',
    desc: 'Receive tailored, transparent recommendations for accredited rehabilitation centres.',
  },
  {
    step: '05',
    title: 'Recovery & aftercare',
    desc: 'Begin admission with continuous advocacy and support throughout your recovery journey.',
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const sectionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const cardTransition: Transition = {
  duration: 0.55,
  ease: [0.25, 0.4, 0.25, 1],
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: cardTransition,
  },
};

const lineTransition: Transition = {
  duration: 0.6,
  ease: [0.25, 0.4, 0.25, 1],
};

const lineVariants: Variants = {
  hidden: {
    scaleX: 0,
    opacity: 0,
  },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: lineTransition,
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const PathwaySection: React.FC = () => {
  return (
    <section className="relative w-full bg-[var(--color-section-accent)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="inline-block text-sm font-medium tracking-wide text-[var(--color-accent)] mb-3">
            How it works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            A clear path to the right care
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            A transparent, human-guided process designed to eliminate confusion
            and give you confidence at every step.
          </p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl bg-[var(--color-surface)] theme-border p-6 transition-all duration-300 hover:shadow-lg"
            >
              {/* Step number — large, subtle, becomes accent on hover */}
              <div className="mb-4 text-4xl font-bold tracking-tight text-[var(--color-accent)] opacity-25 transition-opacity duration-300 group-hover:opacity-50">
                {item.step}
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold tracking-tight text-[var(--color-text)]">
                {item.title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
                {item.desc}
              </p>

              {/* Connecting line — visible between cards on desktop */}
              {index < steps.length - 1 && (
                <>
                  {/* Horizontal line for lg+ */}
                  <div className="absolute -right-2 top-12 hidden w-4 lg:block">
                    <motion.div
                      className="h-px w-full origin-left bg-[var(--color-border)]"
                      variants={lineVariants}
                    />
                  </div>
                  {/* Vertical line for sm-md */}
                  <div className="absolute -bottom-2 left-12 h-4 lg:hidden">
                    <motion.div
                      className="w-px h-full origin-top bg-[var(--color-border)]"
                      variants={{
                        hidden: { scaleY: 0, opacity: 0 },
                        visible: {
                          scaleY: 1,
                          opacity: 1,
                          transition: lineTransition,
                        },
                      }}
                    />
                  </div>
                </>
              )}

              {/* Subtle hover accent bar at top */}
              <div className="absolute top-0 left-4 right-4 h-0.5 rounded-b-full bg-[var(--color-accent)] opacity-0 scale-x-75 transition-all duration-300 group-hover:opacity-30 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom assurance line */}
        <motion.p
          className="mt-12 text-center text-xs text-[var(--color-text-muted)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Confidential · Free initial consultation · No commitment required
        </motion.p>
      </div>
    </section>
  );
};

export default PathwaySection;