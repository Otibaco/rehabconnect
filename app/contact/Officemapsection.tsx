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

// Replace with your real HQ address — the embed URL below is a plain
// Google Maps search embed and requires no API key.
const HQ_ADDRESS = "148 Harbourview Drive, Port Harcourt, Rivers State, Nigeria";
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(HQ_ADDRESS)}&output=embed`;

const facts: FactItem[] = [
  { icon: Building2, label: "Headquarters", value: HQ_ADDRESS },
  { icon: Clock3, label: "Office hours", value: "Monday – Saturday, 7am – 9pm WAT" },
  { icon: Timer, label: "Expected response", value: "Under 2 hours during office hours" },
];

const supportCategories: SupportCategory[] = [
  {
    icon: HeartHandshake,
    title: "Care Coordinator Support",
    description: "Get matched with a verified centre and walked through your options one on one.",
    contact: "care@rehabpath.com",
  },
  {
    icon: Handshake,
    title: "Business Partnerships",
    description: "List your centre on the platform or explore a referral partnership with our team.",
    contact: "partners@rehabpath.com",
  },
  {
    icon: LifeBuoy,
    title: "Technical Support",
    description: "Trouble with your account, bookings, or the platform itself? We'll sort it quickly.",
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
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function OfficeMapSection() {
  return (
    <section
      id="office-map"
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-light)" }}
      aria-label="Our headquarters"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">Our office</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">Where to find us</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-10">
          {/* ── HQ facts ── */}
          <motion.dl
            className="flex flex-col divide-y theme-border rounded-2xl glass-card theme-shadow px-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
          >
            {facts.map((fact) => {
              const Icon = fact.icon;
              return (
                <div key={fact.label} className="flex items-start gap-4 py-5">
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
          </motion.dl>

          {/* ── Real embedded Google Map ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 0.4, 0.22, 1] }}
            className="relative h-72 lg:h-auto min-h-[280px] overflow-hidden rounded-2xl theme-shadow theme-border"
          >
            <iframe
              title="RehabConnect headquarters location"
              src={MAP_EMBED_SRC}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>

        {/* ── Support routing ── */}
        <div className="mt-16">
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.22, 0.4, 0.22, 1] }}
            className="text-lg font-semibold theme-text mb-2"
          >
            Route your question to the right team
          </motion.h3>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col"
          >
            {supportCategories.map((category) => {
              const Icon = category.icon;
              return (
                <motion.li key={category.title} variants={itemVariants} className="border-t theme-border last:border-b">
                  <a
                    href={`mailto:${category.contact}`}
                    className="group flex items-center gap-5 py-5 theme-transition"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl theme-accent-soft theme-transition group-hover:scale-105">
                      <Icon className="h-4.5 w-4.5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold theme-text">{category.title}</p>
                      <p className="mt-0.5 text-xs theme-text-muted leading-relaxed">{category.description}</p>
                    </div>
                    <span className="hidden sm:inline text-xs font-medium theme-accent shrink-0">
                      {category.contact}
                    </span>
                  </a>
                </motion.li>
              );
            })}
          </motion.ul>
        </div>
      </div>
    </section>
  );
}