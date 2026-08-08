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
      "Your coordinator shortlists verified centres with real pricing, availability, and reviews.",
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

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
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
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">How it works</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            Three steps, at your pace
          </h2>
        </motion.div>

        <div className="relative">
          {/* Dashed connecting path, desktop only */}
          <svg
            aria-hidden="true"
            className="hidden lg:block absolute top-7 left-[16%] right-[16%] w-[68%] h-4"
            viewBox="0 0 100 4"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="2"
              x2="100"
              y2="2"
              stroke="var(--color-border-strong)"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              strokeLinecap="round"
            />
          </svg>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  variants={stepVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex flex-col gap-5"
                >
                  <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-full theme-surface theme-shadow theme-border" style={{ borderWidth: 1 }}>
                    <Icon className="h-5 w-5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="text-xs font-mono font-medium theme-text-subtle mb-1">
                      Step {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="text-base font-semibold theme-text">{step.title}</p>
                    <p className="mt-2 text-sm theme-text-muted leading-relaxed max-w-sm">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}