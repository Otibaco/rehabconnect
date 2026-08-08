"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Clock, ArrowUpRight, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const tileVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactOptions() {
  return (
    <section className="relative w-full theme-surface py-20 sm:py-28" aria-label="Ways to reach us">
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          className="max-w-xl mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">Get in touch</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            However you reach out, a real person answers
          </h2>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-6 gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Featured: Phone */}
          <FeaturedTile
            icon={Phone}
            label="Phone"
            value="+1 (800) 555-0142"
            description="Speak directly with a coordinator, no menus or hold music."
            href="tel:+18005550142"
            className="lg:col-span-3"
          />

          {/* Featured: Email */}
          <FeaturedTile
            icon={Mail}
            label="Email"
            value="care@rehabpath.com"
            description="Written to be shared at your own pace — replies within one business day."
            href="mailto:care@rehabpath.com"
            className="lg:col-span-3"
          />

          {/* Compact tiles */}
          <CompactTile
            icon={MessageCircle}
            label="WhatsApp"
            value="+1 (800) 555-0187"
            href="https://wa.me/18005550187"
            className="lg:col-span-2"
          />
          <CompactTile
            icon={Clock}
            label="Working hours"
            value="Mon – Sat, 7am – 9pm"
            href="#office-map"
            className="lg:col-span-2"
          />
          <CompactTile
            icon={MapPin}
            label="Headquarters"
            value="Port Harcourt, Rivers State"
            href="#office-map"
            className="lg:col-span-2"
          />
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Tile Components
// ---------------------------------------------------------------------------

interface TileProps {
  icon: LucideIcon;
  label: string;
  value: string;
  href: string;
  className?: string;
}

function FeaturedTile({
  icon: Icon,
  label,
  value,
  description,
  href,
  className = "",
}: TileProps & { description: string }) {
  return (
    <motion.a
      variants={tileVariants}
      href={href}
      className={`group relative flex flex-col justify-between rounded-2xl theme-shadow theme-transition hover:-translate-y-1 hover:shadow-lg overflow-hidden px-7 py-8 ${className}`}
      style={{
        background:
          "linear-gradient(135deg, var(--color-accent-soft) 0%, var(--color-surface) 65%)",
        border: "1px solid var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl theme-surface theme-shadow theme-transition group-hover:scale-105">
          <Icon className="h-5 w-5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
        </span>
        <ArrowUpRight
          className="h-4 w-4 theme-text-subtle theme-transition group-hover:theme-accent group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          aria-hidden="true"
        />
      </div>
      <div className="mt-8">
        <p className="text-xs font-medium theme-text-subtle uppercase tracking-wide">{label}</p>
        <p className="mt-1.5 text-xl font-semibold theme-text">{value}</p>
        <p className="mt-2 text-sm theme-text-muted leading-relaxed max-w-xs">{description}</p>
      </div>
    </motion.a>
  );
}

function CompactTile({ icon: Icon, label, value, href, className = "" }: TileProps) {
  return (
    <motion.a
      variants={tileVariants}
      href={href}
      className={`group flex items-center gap-4 rounded-2xl glass-card theme-shadow px-5 py-5 theme-transition hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl theme-accent-soft theme-transition group-hover:scale-105">
        <Icon className="h-4.5 w-4.5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[11px] font-medium theme-text-subtle uppercase tracking-wide">{label}</p>
        <p className="text-sm font-semibold theme-text truncate">{value}</p>
      </div>
    </motion.a>
  );
}