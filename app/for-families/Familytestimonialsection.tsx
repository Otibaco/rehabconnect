"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function FamilyTestimonialSection() {
  return (
    <section className="relative w-full theme-surface py-24 sm:py-32 overflow-hidden" aria-label="Family testimonial">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-6 items-center">
          {/* ── Offset portrait collage ── */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.22, 0.4, 0.22, 1] }}
            className="lg:col-span-4 relative h-[280px] sm:h-[340px] mx-auto w-full max-w-sm"
          >
            <div className="absolute left-0 top-0 w-[72%] h-[85%] overflow-hidden rounded-2xl theme-shadow">
              <Image
                src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=600&q=85"
                alt="Portrait of a parent who used RehabConnect to support a loved one"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 300px"
              />
            </div>
            <div
              aria-hidden="true"
              className="absolute right-0 bottom-0 w-[55%] h-[55%] rounded-2xl theme-shadow"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, var(--color-hero-glow) 0%, transparent 60%), var(--color-accent-soft)",
              }}
            />
          </motion.div>

          {/* ── Bleeding quote ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 0.4, 0.22, 1] }}
            className="lg:col-span-8 relative"
          >
            <span
              aria-hidden="true"
              className="absolute -top-16 -left-2 sm:-left-6 text-[9rem] sm:text-[11rem] leading-none select-none theme-accent opacity-[0.14]"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              &ldquo;
            </span>
            <p
              className="relative text-2xl sm:text-4xl leading-[1.25] theme-text max-w-2xl"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              I called not knowing what to expect. She never rushed me, and
              she helped me plan a conversation I&apos;d been avoiding for
              months.
            </p>
            <p className="relative mt-6 text-xs font-medium theme-text-subtle tracking-wide uppercase">
              Parent of a patient &mdash; matched via RehabConnect
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}