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

const rowVariants = (fromRight: boolean): Variants => ({
  hidden: { opacity: 0, x: fromRight ? 24 : -24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 0.4, 0.22, 1] } },
});

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WhatToExpectSection() {
  return (
    <section className="relative w-full theme-surface py-20 sm:py-28" aria-label="What to expect">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          className="mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">What to expect</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            From first call to first day, and beyond
          </h2>
        </motion.div>

        <div className="relative">
          {/* Continuous vertical line */}
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-2 bottom-2 w-px -translate-x-1/2 hidden sm:block"
            style={{ backgroundColor: "var(--color-border)" }}
          />
          <div
            aria-hidden="true"
            className="absolute left-6 top-2 bottom-2 w-px sm:hidden"
            style={{ backgroundColor: "var(--color-border)" }}
          />

          <div className="flex flex-col gap-14 sm:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isRight = index % 2 === 1;
              return (
                <motion.div
                  key={step.title}
                  variants={rowVariants(isRight)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  className={`relative sm:grid sm:grid-cols-2 sm:gap-10 items-center ${
                    isRight ? "" : ""
                  }`}
                >
                  {/* Node */}
                  <span
                    className="absolute left-6 sm:left-1/2 top-1 sm:top-1/2 -translate-x-1/2 sm:-translate-y-1/2 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full theme-surface theme-shadow theme-border"
                    style={{ borderWidth: 1 }}
                  >
                    <Icon className="h-4.5 w-4.5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                  </span>

                  {isRight ? (
                    <>
                      <div className="hidden sm:block" />
                      <div className="pl-16 sm:pl-14 sm:pr-0">
                        <p className="text-base font-semibold theme-text">{step.title}</p>
                        <p className="mt-2 text-sm theme-text-muted leading-relaxed max-w-sm">
                          {step.description}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="pl-16 sm:pl-0 sm:pr-14 sm:text-right">
                        <p className="text-base font-semibold theme-text">{step.title}</p>
                        <p className="mt-2 text-sm theme-text-muted leading-relaxed max-w-sm sm:ml-auto">
                          {step.description}
                        </p>
                      </div>
                      <div className="hidden sm:block" />
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}