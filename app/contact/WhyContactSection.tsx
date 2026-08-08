"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Lock, Zap, BadgeCheck, ShieldCheck, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface WhyItem {
  icon: LucideIcon;
  title: string;
  description: string;
  featured?: boolean;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const whyItems: WhyItem[] = [
  {
    icon: Lock,
    title: "Confidential communication",
    description:
      "Every call, message, and form is private by default. Nothing is shared with a centre until you say so.",
    featured: true,
  },
  {
    icon: Zap,
    title: "Fast response",
    description: "Most messages get a personal reply in under two hours during office hours.",
  },
  {
    icon: BadgeCheck,
    title: "Qualified coordinators",
    description: "Every coordinator is trained to listen first and guide without pressure.",
  },
  {
    icon: ShieldCheck,
    title: "Verified network",
    description: "Every centre on the platform is independently reviewed before it's listed.",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function WhyContactSection() {
  return (
    <section
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-muted)" }}
      aria-label="Why contact us"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">Why reach out</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            Talking to us costs nothing but a few minutes
          </h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {whyItems.map((item) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.title}
                variants={cardVariants}
                className={item.featured ? "sm:col-span-2 lg:col-span-2" : "lg:col-span-1"}
              >
                <div
                  className={`group h-full flex flex-col justify-between rounded-2xl theme-shadow theme-transition hover:-translate-y-1 hover:shadow-lg ${
                    item.featured ? "glass-panel px-7 py-8 sm:py-10" : "glass-card px-6 py-7"
                  }`}
                  style={item.featured ? { borderColor: "var(--color-border-strong)" } : undefined}
                >
                  <span
                    className={`inline-flex items-center justify-center rounded-xl theme-accent-soft theme-transition group-hover:scale-105 ${
                      item.featured ? "h-12 w-12" : "h-10 w-10"
                    }`}
                  >
                    <Icon
                      className={item.featured ? "h-6 w-6 theme-accent" : "h-5 w-5 theme-accent"}
                      aria-hidden="true"
                      strokeWidth={1.75}
                    />
                  </span>
                  <div className="mt-6">
                    <p className={`font-semibold theme-text ${item.featured ? "text-lg" : "text-sm"}`}>
                      {item.title}
                    </p>
                    <p
                      className={`mt-2 theme-text-muted leading-relaxed ${
                        item.featured ? "text-sm max-w-sm" : "text-xs"
                      }`}
                    >
                      {item.description}
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