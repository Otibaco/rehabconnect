'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardList,
  Stethoscope,
  UserCheck,
  Building2,
  Heart,
  ArrowRight,
} from 'lucide-react';
import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Step {
  step: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const steps: Step[] = [
  {
    step: '01',
    icon: <ClipboardList className="w-5 h-5" />,
    title: 'Tell us your need',
    desc: 'Complete a brief, confidential assessment online or by phone — it takes two minutes.',
  },
  {
    step: '02',
    icon: <Stethoscope className="w-5 h-5" />,
    title: 'Clinical review',
    desc: 'A dedicated care coordinator reviews your history and understands your placement goals.',
  },
  {
    step: '03',
    icon: <UserCheck className="w-5 h-5" />,
    title: 'Meet your coordinator',
    desc: 'Connect via encrypted video or telephone consultation with your personal care coordinator.',
  },
  {
    step: '04',
    icon: <Building2 className="w-5 h-5" />,
    title: 'Verified placement',
    desc: 'Receive tailored, transparent recommendations for accredited rehabilitation centres.',
  },
  {
    step: '05',
    icon: <Heart className="w-5 h-5" />,
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
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: cardTransition,
  },
};

const connectorTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.4, 0.25, 1],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const PathwaySection: React.FC = () => {
  return (
    <section className="relative w-full bg-[var(--color-section-muted)] pt-16 sm:pt-24 pb-0 overflow-hidden">
      
      {/* ── Decorative background elements ── */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] -translate-y-1/4 translate-x-1/4 rounded-full bg-[#31A8D3] opacity-[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[400px] h-[400px] translate-y-1/4 -translate-x-1/4 rounded-full bg-[#31A8D3] opacity-[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14 sm:mb-20"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-[#31A8D3]/20 text-[#31A8D3] text-xs font-semibold tracking-wide uppercase mb-4 backdrop-blur-sm">
            <Heart className="w-3.5 h-3.5" />
            How it works
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-[#162A45] sm:text-4xl">
            A clear path to the right care
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base max-w-lg mx-auto">
            A transparent, human-guided process designed to eliminate confusion
            and give you confidence at every step.
          </p>
        </motion.div>

        {/* ── Vertical Pathway (Desktop: horizontal flow with connectors) ── */}
        <motion.div
          className="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {steps.map((item, index) => (
            <motion.div
              key={item.step}
              variants={cardVariants}
              className="group relative flex flex-col rounded-2xl bg-white border border-slate-200/80 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-[#31A8D3]/40"
            >
              {/* Step number + icon */}
              <div className="flex items-center justify-between mb-5">
                <span className="text-3xl font-bold tracking-tight text-[#31A8D3] opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                  {item.step}
                </span>
                <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#31A8D3]/10 text-[#31A8D3] group-hover:bg-[#31A8D3] group-hover:text-white transition-all duration-300">
                  {item.icon}
                </span>
              </div>

              {/* Title */}
              <h3 className="text-base font-semibold tracking-tight text-[#162A45] mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-sm leading-relaxed text-slate-500 flex-1">
                {item.desc}
              </p>

              {/* Connecting arrow between cards (desktop only) */}
              {index < steps.length - 1 && (
                <div className="absolute -right-3 top-[4.5rem] hidden lg:flex items-center z-20">
                  <motion.div
                    className="flex items-center"
                    variants={{
                      hidden: { opacity: 0, x: -6 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          ...connectorTransition,
                          delay: 0.3 + index * 0.1,
                        },
                      },
                    }}
                  >
                    <div className="h-px w-3 bg-[#31A8D3]/25" />
                    <ArrowRight className="w-3.5 h-3.5 text-[#31A8D3]/40" />
                  </motion.div>
                </div>
              )}

              {/* Hover accent bar */}
              <div className="absolute top-0 left-5 right-5 h-0.5 rounded-b-full bg-[#31A8D3] opacity-0 scale-x-75 transition-all duration-300 group-hover:opacity-30 group-hover:scale-x-100" />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom assurance */}
        <motion.p
          className="mt-16 text-center text-xs font-medium text-slate-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          Confidential · Free initial consultation · No commitment required
        </motion.p>
      </div>

      {/* ── SVG Wavy Curve Bottom Divider ── */}
      {/* <div className="relative mt-20 sm:mt-24 w-full leading-none">
        <svg
          className="relative block w-full h-[50px] sm:h-[70px] md:h-[100px]"
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0,32 C280,120 420,0 720,64 C1020,128 1160,0 1440,32 L1440,120 L0,120 Z"
            className="fill-white dark:fill-slate-950"
          />
        </svg>
      </div> */}
    </section>
  );
};

export default PathwaySection;