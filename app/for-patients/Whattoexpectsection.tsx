"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { PhoneCall, ClipboardList, DoorOpen, HeartPulse, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const steps: Step[] = [
  {
    icon: PhoneCall,
    title: "Confidential intake call",
    description: "A short, judgement-free conversation about your situation and what you need.",
  },
  {
    icon: ClipboardList,
    title: "Personalized program match",
    description: "Your coordinator shortlists verified centres that actually fit — clinically and practically.",
  },
  {
    icon: DoorOpen,
    title: "Admission support",
    description: "Help with paperwork, insurance questions, and getting settled before day one.",
  },
  {
    icon: HeartPulse,
    title: "Ongoing check-ins",
    description: "We stay reachable through treatment, not just until you sign up.",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WhatToExpectSection() {
  return (
    <section className="relative w-full theme-surface py-20 sm:py-28" aria-label="What to expect">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            What to expect
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            From first call to first day, and beyond
          </h2>
        </motion.div>

        <motion.ol
          className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-[12.5%] right-[12.5%] h-px"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.li key={step.title} variants={stepVariants} className="relative flex flex-col gap-5">
                <div className="relative z-10 flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl theme-accent-soft">
                    <Icon className="h-5 w-5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <span className="text-xs font-mono font-medium theme-text-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold theme-text">{step.title}</p>
                  <p className="mt-2 text-xs theme-text-muted leading-relaxed">{step.description}</p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}