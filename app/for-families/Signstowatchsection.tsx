"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Variants } from "framer-motion";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Sign {
  index: string;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const signs: Sign[] = [
  {
    index: "01",
    title: "Recognize the signs",
    description:
      "Withdrawal, secrecy, or changes that don't fit the person you know. A coordinator can help you make sense of what you're seeing.",
  },
  {
    index: "02",
    title: "Plan the conversation",
    description:
      "Get guidance on how to approach your loved one with honesty and without judgement — before you say a word.",
  },
  {
    index: "03",
    title: "Explore options together",
    description:
      "Review verified programs side by side, at a pace that respects everyone involved, not just the calendar.",
  },
  {
    index: "04",
    title: "Stay involved, safely",
    description:
      "Learn how to support treatment without losing yourself in the process. This is a marathon, not one phone call.",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SignsToWatchSection() {
  return (
    <section id="signs" className="relative w-full theme-surface" aria-label="How to help a loved one">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
        {/* ── Sticky image ── */}
        <div className="relative h-[42vh] lg:h-auto">
          <div className="lg:sticky lg:top-0 lg:h-screen relative h-full overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=85"
              alt="A coordinator listening attentively to a worried family member"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
          </div>
        </div>

        {/* ── Editorial list ── */}
        <div className="px-6 sm:px-10 lg:px-16 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
            className="max-w-lg mb-14"
          >
            <span className="text-xs font-medium tracking-[0.18em] theme-accent uppercase">
              How to help
            </span>
            <h2
              className="mt-4 text-3xl sm:text-4xl leading-[1.15] tracking-tight theme-text"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              You can start this before they&apos;re ready.
            </h2>
          </motion.div>

          <div className="flex flex-col max-w-xl">
            {signs.map((sign, i) => (
              <motion.div
                key={sign.index}
                variants={rowVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-6 sm:gap-8 py-8 border-t theme-border last:border-b"
              >
                <span
                  className="shrink-0 text-3xl sm:text-4xl leading-none theme-accent"
                  style={{ fontFamily: "var(--font-serif)" }}
                  aria-hidden="true"
                >
                  {sign.index}
                </span>
                <div>
                  <p className="text-base sm:text-lg font-semibold theme-text">{sign.title}</p>
                  <p className="mt-2 text-sm theme-text-muted leading-relaxed max-w-md">
                    {sign.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}