"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function TestimonialSection() {
  return (
    <section className="relative w-full theme-surface py-20 sm:py-28" aria-label="A note from a patient">
      <div className="max-w-3xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 0.4, 0.22, 1] }}
          className="relative rounded-[32px] glass-panel theme-shadow px-7 py-10 sm:px-12 sm:py-12"
        >
          <span
            className="absolute -top-6 left-10 inline-flex h-12 w-12 items-center justify-center rounded-full theme-accent-soft theme-shadow"
            aria-hidden="true"
          >
            <Quote className="h-5 w-5 theme-accent" strokeWidth={1.75} />
          </span>

          <p className="text-lg sm:text-2xl font-medium theme-text leading-relaxed">
            They matched me with a program that actually understood my
            schedule. No pressure, no judgement, just someone who listened
            and helped me choose.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full theme-shadow">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=85"
                alt="Portrait of a patient who found care through RehabConnect"
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>
            <div>
              <p className="text-sm font-semibold theme-text">Outpatient program graduate</p>
              <p className="text-xs theme-text-subtle">Matched via RehabConnect</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}