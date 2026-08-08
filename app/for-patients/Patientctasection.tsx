"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function PatientCTASection() {
  return (
    <section className="relative w-full theme-bg py-20 sm:py-28" aria-label="Get started today">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 0.4, 0.22, 1] }}
          className="relative overflow-hidden rounded-[36px] theme-shadow px-8 py-16 sm:px-16 sm:py-20 flex flex-col items-center text-center gap-6"
          style={{
            background:
              "radial-gradient(circle at 20% 15%, var(--color-accent-soft) 0%, transparent 55%), radial-gradient(circle at 85% 85%, var(--color-hero-glow-2) 0%, transparent 50%), var(--color-surface)",
          }}
        >
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight theme-text leading-[1.15] max-w-lg">
            Your first conversation can start today
          </h2>
          <p className="text-sm sm:text-base theme-text-muted leading-relaxed max-w-md">
            No forms to fill out, no commitment required. Just a real
            conversation with someone who wants to help you find the right
            next step.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href="/contact"
              className="theme-btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl theme-transition"
            >
              Start your consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href="tel:+18005550142"
              className="theme-btn-ghost inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl theme-transition"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Call a coordinator now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}