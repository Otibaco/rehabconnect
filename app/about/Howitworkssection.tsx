"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { MessageSquareText, ListChecks, CalendarCheck2, type LucideIcon } from "lucide-react";

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
    icon: MessageSquareText,
    title: "Tell us what you need",
    description:
      "A short, confidential conversation about the situation, location, and care that matters to you.",
  },
  {
    icon: ListChecks,
    title: "We match you, transparently",
    description:
      "Your coordinator shortlists verified centres with real pricing, availability, and reviews — no black box.",
  },
  {
    icon: CalendarCheck2,
    title: "You choose, with confidence",
    description:
      "Compare options at your own pace and book a consultation only when you're ready.",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HowItWorksSection() {
  return (
    <section className="relative w-full theme-surface py-20 sm:py-28" aria-label="How RehabConnect works">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-xl mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            How it works
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            Three steps, at your pace
          </h2>
        </motion.div>

        <motion.ol
          className="relative grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Connecting line, desktop only */}
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-6 left-[16.5%] right-[16.5%] h-px"
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
                    Step {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold theme-text">{step.title}</p>
                  <p className="mt-2 text-sm theme-text-muted leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </motion.ol>
      </div>
    </section>
  );
}