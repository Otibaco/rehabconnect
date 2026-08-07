"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Quote } from "lucide-react";

export default function TestimonialSection() {
  return (
    <section className="relative w-full theme-surface py-20 sm:py-28" aria-label="Patient testimonial">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: [0.22, 0.4, 0.22, 1] }}
          className="relative flex flex-col sm:flex-row items-center gap-8 sm:gap-10 rounded-[28px] glass-panel theme-shadow px-6 py-10 sm:px-12 sm:py-12"
        >
          <div className="relative h-24 w-24 sm:h-32 sm:w-32 shrink-0 overflow-hidden rounded-2xl theme-shadow">
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80"
              alt="Portrait of a patient who found care through RehabConnect"
              fill
              className="object-cover"
              sizes="128px"
            />
          </div>

          <div className="flex flex-col gap-4 text-center sm:text-left">
            <Quote className="h-7 w-7 theme-accent mx-auto sm:mx-0" aria-hidden="true" strokeWidth={1.5} />
            <p className="text-lg sm:text-2xl font-medium theme-text leading-relaxed max-w-2xl">
              They matched me with a program that actually understood my
              schedule. No pressure, no judgement, just someone who listened
              and helped me choose.
            </p>
            <p className="text-xs font-medium theme-text-subtle">
              Outpatient program graduate, matched via RehabConnect
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}