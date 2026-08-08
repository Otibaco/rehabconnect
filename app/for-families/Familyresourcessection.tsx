"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function FamilyResourcesSection() {
  return (
    <section
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-soft)" }}
      aria-label="Resources for families"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-lg mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-[0.18em] theme-accent uppercase">
            Resources
          </span>
          <h2
            className="mt-4 text-3xl sm:text-4xl leading-[1.15] tracking-tight theme-text"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Guidance for wherever you are right now.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-6 gap-5 sm:gap-6">
          {/* Featured tile — spans wide, tall */}
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 0.4, 0.22, 1] }}
            className="group relative sm:col-span-4 h-[360px] sm:h-[460px] overflow-hidden rounded-2xl theme-shadow"
          >
            <Image
              src="https://images.unsplash.com/photo-1573497491208-6b1acb260507?auto=format&fit=crop&w=1200&q=85"
              alt="Two people having a calm, supportive conversation"
              fill
              className="object-cover theme-transition group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 66vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
            <div className="absolute left-6 right-6 bottom-6 sm:left-8 sm:right-8 sm:bottom-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-medium tracking-wide text-white/70 uppercase">
                  Guide
                </span>
                <p
                  className="mt-1 text-xl sm:text-2xl text-white leading-snug max-w-xs"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  Starting the conversation
                </p>
              </div>
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full glass-panel theme-transition group-hover:scale-105">
                <ArrowUpRight className="h-4 w-4 theme-text" aria-hidden="true" />
              </span>
            </div>
          </motion.a>

          {/* Two stacked tiles, right column */}
          <div className="sm:col-span-2 flex flex-col gap-5 sm:gap-6">
            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 0.4, 0.22, 1] }}
              className="group relative h-[168px] sm:h-[216px] overflow-hidden rounded-2xl theme-shadow"
            >
              <Image
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=85"
                alt="Person reviewing paperwork with a coordinator"
                fill
                className="object-cover theme-transition group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute left-4 right-4 bottom-4">
                <span className="text-[10px] font-medium tracking-wide text-white/70 uppercase">
                  Guide
                </span>
                <p className="mt-0.5 text-sm font-semibold text-white leading-snug">
                  Insurance &amp; cost guidance
                </p>
              </div>
            </motion.a>

            <motion.a
              href="/contact"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.16, ease: [0.22, 0.4, 0.22, 1] }}
              className="group relative h-[168px] sm:h-[216px] overflow-hidden rounded-2xl theme-shadow"
            >
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=85"
                alt="Family members gathered together in discussion"
                fill
                className="object-cover theme-transition group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
              <div className="absolute left-4 right-4 bottom-4">
                <span className="text-[10px] font-medium tracking-wide text-white/70 uppercase">
                  Support
                </span>
                <p className="mt-0.5 text-sm font-semibold text-white leading-snug">
                  Intervention planning
                </p>
              </div>
            </motion.a>
          </div>

          {/* Wide short tile, full row beneath */}
          <motion.a
            href="/contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 0.4, 0.22, 1] }}
            className="group relative sm:col-span-6 h-[200px] sm:h-[220px] overflow-hidden rounded-2xl theme-shadow"
          >
            <Image
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1400&q=85"
              alt="Family therapy session in a warm setting"
              fill
              className="object-cover theme-transition group-hover:scale-[1.03]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
            <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 max-w-sm">
              <span className="text-[11px] font-medium tracking-wide text-white/70 uppercase">
                Program
              </span>
              <p
                className="mt-1 text-xl sm:text-2xl text-white leading-snug"
                style={{ fontFamily: "var(--font-serif)" }}
              >
                Family therapy programs
              </p>
              <p className="mt-2 text-xs text-white/75 leading-relaxed max-w-xs">
                Centres that include family sessions as part of the recovery
                process.
              </p>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}