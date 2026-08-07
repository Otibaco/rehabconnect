"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Program {
  title: string;
  description: string;
  duration: string;
  image: string;
  alt: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const programs: Program[] = [
  {
    title: "Inpatient care",
    description: "Round-the-clock support in a residential setting for intensive, structured recovery.",
    duration: "28 – 90 days",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=900&q=80",
    alt: "Bright, comfortable inpatient rehabilitation room",
  },
  {
    title: "Outpatient programs",
    description: "Structured therapy and check-ins while you continue living at home.",
    duration: "8 – 16 weeks",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80",
    alt: "One-on-one outpatient therapy session",
  },
  {
    title: "Detox & withdrawal support",
    description: "Medically supervised care to manage withdrawal safely and comfortably.",
    duration: "5 – 10 days",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80",
    alt: "Clinical team providing medically supervised detox support",
  },
  {
    title: "Dual diagnosis care",
    description: "Integrated treatment for co-occurring mental health and recovery needs.",
    duration: "Ongoing, tailored",
    image: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=900&q=80",
    alt: "Coordinator discussing a personalized care plan",
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
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ProgramsSection() {
  return (
    <section
      id="programs"
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-soft)" }}
      aria-label="Rehabilitation programs"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            Programs
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            Find the level of care that fits
          </h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {programs.map((program) => (
            <motion.li key={program.title} variants={cardVariants}>
              <a
                href="/contact"
                className="group relative flex flex-col overflow-hidden rounded-2xl glass-card theme-shadow theme-transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={program.image}
                    alt={program.alt}
                    fill
                    className="object-cover theme-transition group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0" />
                  <span className="absolute top-4 left-4 rounded-full glass-panel px-3 py-1 text-[11px] font-medium theme-text">
                    {program.duration}
                  </span>
                </div>
                <div className="flex items-start justify-between gap-4 px-6 py-6">
                  <div>
                    <p className="text-base font-semibold theme-text">{program.title}</p>
                    <p className="mt-2 text-xs theme-text-muted leading-relaxed max-w-xs">
                      {program.description}
                    </p>
                  </div>
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full theme-accent-soft theme-transition group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4 theme-accent" aria-hidden="true" />
                  </span>
                </div>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}