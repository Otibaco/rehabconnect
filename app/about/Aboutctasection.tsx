"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function AboutCTASection() {
  return (
    <section
      className="relative w-full overflow-hidden theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-accent)" }}
      aria-label="Get started with RehabConnect"
    >
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[420px] sm:w-[640px] h-[420px] sm:h-[640px] rounded-full opacity-[0.1] blur-[130px]"
        style={{ background: "var(--color-hero-glow)" }}
      />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center gap-6"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.65, ease: [0.22, 0.4, 0.22, 1] }}
      >
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight theme-text leading-[1.15]">
          Ready to take the first step?
        </h2>
        <p className="text-sm sm:text-base theme-text-muted leading-relaxed max-w-lg">
          Whether you&apos;re exploring options for yourself or someone you
          love, a care coordinator is ready to listen — no forms, no
          pressure, no obligation.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href="/centres"
            className="theme-btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl theme-transition"
          >
            Explore verified centres
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="/contact"
            className="theme-btn-ghost inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl theme-transition"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Talk to a coordinator
          </a>
        </div>
      </motion.div>
    </section>
  );
}