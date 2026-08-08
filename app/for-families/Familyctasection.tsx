"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, PhoneCall } from "lucide-react";

export default function FamilyCTASection() {
  return (
    <section className="relative w-full min-h-[60vh] overflow-hidden theme-bg" aria-label="Reach out on behalf of a loved one">
      <Image
        src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1800&q=85"
        alt="A quiet, hopeful moment between family members"
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/60" />

      <motion.div
        className="relative z-10 min-h-[60vh] max-w-3xl mx-auto px-6 sm:px-8 flex flex-col items-center justify-center text-center gap-6 py-20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 0.4, 0.22, 1] }}
      >
        <h2
          className="text-3xl sm:text-5xl leading-[1.15] text-white"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          You don&apos;t have to carry this alone.
        </h2>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-lg">
          Reach out today, even just to talk through what you&apos;re seeing.
          A coordinator can help you plan next steps — for them, and for you.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href="/contact"
            className="theme-btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl theme-transition"
          >
            Start a confidential chat
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <a
            href="tel:+18005550142"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl glass-panel text-white theme-transition"
          >
            <PhoneCall className="h-4 w-4" aria-hidden="true" />
            Call a coordinator now
          </a>
        </div>
      </motion.div>
    </section>
  );
}