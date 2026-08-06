"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { HeartHandshake, Eye, BadgeCheck, Users, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const values: ValueItem[] = [
  {
    icon: HeartHandshake,
    title: "Compassion first",
    description: "Every conversation starts with listening, not a sales pitch.",
  },
  {
    icon: Eye,
    title: "Radical transparency",
    description: "Clear pricing, honest reviews, and no hidden referral fees.",
  },
  {
    icon: BadgeCheck,
    title: "Verified, always",
    description: "Every centre is independently reviewed before it joins the network.",
  },
  {
    icon: Users,
    title: "Real people, not bots",
    description: "A trained care coordinator is behind every recommendation you get.",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MissionValuesSection() {
  return (
    <section
      id="our-values"
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-soft)" }}
      aria-label="Our mission and values"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            Our mission
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text leading-[1.15]">
            Make the hardest search of someone&apos;s life a little easier
          </h2>
          <p className="mt-5 text-sm sm:text-base theme-text-muted leading-relaxed">
            We built RehabConnect after watching families spend weeks piecing
            together information that should have taken an afternoon. Our
            mission is simple: replace guesswork with verified facts, and
            cold outreach with a coordinator who actually picks up the phone.
          </p>
        </motion.div>

        <motion.ul
          className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <motion.li key={value.title} variants={cardVariants}>
                <div className="group h-full flex flex-col justify-between rounded-2xl glass-card theme-shadow px-6 py-7 theme-transition hover:-translate-y-1 hover:shadow-lg">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl theme-accent-soft theme-transition group-hover:scale-105">
                    <Icon className="h-5 w-5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div className="mt-6">
                    <p className="text-sm font-semibold theme-text">{value.title}</p>
                    <p className="mt-2 text-xs theme-text-muted leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}