"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import type { Variants } from "framer-motion";
import { BedDouble, Users, Stethoscope, Brain, ArrowUpRight, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Program {
  icon: LucideIcon;
  title: string;
  description: string;
  duration: string;
  image: string;
  alt: string;
  span: "wide" | "narrow";
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const programs: Program[] = [
  {
    icon: BedDouble,
    title: "Inpatient care",
    description: "Round-the-clock support in a residential setting for intensive, structured recovery.",
    duration: "28 – 90 days",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=85",
    alt: "Bright, comfortable inpatient rehabilitation room",
    span: "wide",
  },
  {
    icon: Users,
    title: "Outpatient programs",
    description: "Structured therapy while you keep living at home.",
    duration: "8 – 16 weeks",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=85",
    alt: "One-on-one outpatient therapy session",
    span: "narrow",
  },
  {
    icon: Stethoscope,
    title: "Detox & withdrawal",
    description: "Medically supervised care to manage withdrawal safely.",
    duration: "5 – 10 days",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=700&q=85",
    alt: "Clinical team providing medically supervised detox support",
    span: "narrow",
  },
  {
    icon: Brain,
    title: "Dual diagnosis care",
    description: "Integrated treatment for co-occurring mental health and recovery needs, tailored to you.",
    duration: "Ongoing, tailored",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=85",
    alt: "Coordinator discussing a personalized care plan",
    span: "wide",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const tileVariants: Variants = {
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
          className="max-w-lg mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">Programs</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            Find the level of care that fits
          </h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {programs.map((program) => {
            const Icon = program.icon;
            return (
              <motion.li
                key={program.title}
                variants={tileVariants}
                className={program.span === "wide" ? "sm:col-span-2" : "sm:col-span-1"}
              >
                <a href="/contact" className="group block">
                  <div
                    className={`relative overflow-hidden rounded-[32px] theme-shadow ${
                      program.span === "wide" ? "aspect-[16/10]" : "aspect-[4/5]"
                    }`}
                  >
                    <Image
                      src={program.image}
                      alt={program.alt}
                      fill
                      className="object-cover theme-transition group-hover:scale-105"
                      sizes={program.span === "wide" ? "(max-width: 640px) 100vw, 66vw" : "(max-width: 640px) 100vw, 33vw"}
                    />

                    {/* Floating icon badge */}
                    <span className="absolute top-4 left-4 inline-flex h-11 w-11 items-center justify-center rounded-full glass-panel theme-shadow">
                      <Icon className="h-5 w-5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                    </span>

                    {/* Floating duration pill */}
                    <span className="absolute bottom-4 right-4 inline-flex items-center rounded-full glass-panel theme-shadow px-3.5 py-1.5 text-[11px] font-medium theme-text">
                      {program.duration}
                    </span>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-base font-semibold theme-text">{program.title}</p>
                      <p className="mt-1.5 text-xs theme-text-muted leading-relaxed max-w-xs">
                        {program.description}
                      </p>
                    </div>
                    <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full theme-accent-soft theme-transition group-hover:scale-105">
                      <ArrowUpRight className="h-3.5 w-3.5 theme-accent" aria-hidden="true" />
                    </span>
                  </div>
                </a>
              </motion.li>
            );
          })}
        </motion.ul>
      </div>
    </section>
  );
}