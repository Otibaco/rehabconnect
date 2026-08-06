"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import {
  Building2,
  Clock3,
  Timer,
  HeartHandshake,
  Handshake,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FactItem {
  icon: LucideIcon;
  label: string;
  value: string;
}

interface SupportCategory {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const facts: FactItem[] = [
  {
    icon: Building2,
    label: "Headquarters",
    value: "148 Harbourview Drive, Suite 400, Port Harcourt",
  },
  {
    icon: Clock3,
    label: "Office hours",
    value: "Monday – Saturday, 7am – 9pm WAT",
  },
  {
    icon: Timer,
    label: "Expected response",
    value: "Under 2 hours during office hours",
  },
];

const supportCategories: SupportCategory[] = [
  {
    icon: HeartHandshake,
    title: "Care Coordinator Support",
    description:
      "Get matched with a verified centre and walked through your options one on one.",
    contact: "care@rehabpath.com",
  },
  {
    icon: Handshake,
    title: "Business Partnerships",
    description:
      "List your centre on the platform or explore a referral partnership with our team.",
    contact: "partners@rehabpath.com",
  },
  {
    icon: LifeBuoy,
    title: "Technical Support",
    description:
      "Trouble with your account, bookings, or the platform itself? We'll sort it quickly.",
    contact: "support@rehabpath.com",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const listVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OfficeSupportSection() {
  return (
    <section
      id="office-support"
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-light)" }}
      aria-label="Office and support information"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-14 lg:gap-16">
          {/* ── Left: HQ facts + map placeholder ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
            className="flex flex-col gap-8"
          >
            <div>
              <span className="text-xs font-medium tracking-wide theme-accent uppercase">
                Our office
              </span>
              <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text leading-[1.15]">
                Where to find us
              </h2>
            </div>

            <dl className="flex flex-col divide-y theme-border">
              {facts.map((fact) => {
                const Icon = fact.icon;
                return (
                  <div key={fact.label} className="flex items-start gap-4 py-4 first:pt-0">
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg theme-accent-soft">
                      <Icon className="h-4.5 w-4.5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <div>
                      <dt className="text-xs font-medium theme-text-subtle uppercase tracking-wide">
                        {fact.label}
                      </dt>
                      <dd className="mt-0.5 text-sm theme-text leading-relaxed">{fact.value}</dd>
                    </div>
                  </div>
                );
              })}
            </dl>

            <div
              role="img"
              aria-label="Map showing our office location in Port Harcourt"
              className="h-56 sm:h-64 rounded-2xl theme-border overflow-hidden relative"
              style={{
                border: "1px solid var(--color-border)",
                background:
                  "radial-gradient(circle at 25% 30%, var(--color-hero-glow) 0%, transparent 55%), radial-gradient(circle at 75% 70%, var(--color-hero-glow-2) 0%, transparent 55%), var(--color-surface-muted)",
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full glass-panel px-4 py-2 text-xs font-medium theme-text-muted">
                  <Building2 className="h-3.5 w-3.5 theme-accent" aria-hidden="true" />
                  Map preview
                </span>
              </div>
            </div>
          </motion.div>

          {/* ── Right: support categories ── */}
          <motion.div
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            <span className="text-xs font-medium tracking-wide theme-accent uppercase">
              Support
            </span>
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight theme-text -mt-2">
              Route your question to the right team
            </h3>

            <ul className="flex flex-col gap-4">
              {supportCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <motion.li key={category.title} variants={itemVariants}>
                    <a
                      href={`mailto:${category.contact}`}
                      className="group flex items-start gap-4 rounded-2xl glass-card theme-shadow px-5 py-5 theme-transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl theme-accent-soft theme-transition group-hover:scale-105">
                        <Icon className="h-5 w-5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold theme-text">{category.title}</p>
                        <p className="mt-1 text-xs theme-text-muted leading-relaxed">
                          {category.description}
                        </p>
                        <p className="mt-2 text-xs font-medium theme-accent">{category.contact}</p>
                      </div>
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}