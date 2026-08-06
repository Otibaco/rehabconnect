"use client";

import React from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Clock, type LucideIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContactOption {
  icon: LucideIcon;
  title: string;
  value: string;
  description: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const contactOptions: ContactOption[] = [
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (800) 555-0142",
    description: "Speak directly with a coordinator",
    href: "tel:+18005550142",
  },
  {
    icon: Mail,
    title: "Email",
    value: "care@rehabpath.com",
    description: "Replies within one business day",
    href: "mailto:care@rehabpath.com",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "+1 (800) 555-0187",
    description: "Message us in confidence",
    href: "https://wa.me/18005550187",
  },
  {
    icon: MapPin,
    title: "Office",
    value: "148 Harbourview Drive, Suite 400",
    description: "Port Harcourt, Rivers State",
    href: "#office-support",
  },
  {
    icon: Clock,
    title: "Working hours",
    value: "Mon – Sat, 7am – 9pm",
    description: "Emergency line available 24/7",
    href: "#office-support",
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.4, 0.22, 1] },
  },
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
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            Get in touch
          </span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            However you reach out, a real person answers
          </h2>
        </motion.div>

        <motion.ul
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {contactOptions.map((option) => {
            const Icon = option.icon;
            return (
              <motion.li key={option.title} variants={cardVariants} className="lg:col-span-1 sm:[&:nth-child(5)]:col-span-2 lg:[&:nth-child(5)]:col-span-1">
                <a
                  href={option.href}
                  className="group flex flex-col justify-between h-full min-h-[168px] rounded-2xl glass-card theme-shadow px-5 py-6 theme-transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                  style={{ outlineColor: "var(--color-accent-strong)" }}
                >
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl theme-accent-soft theme-transition group-hover:scale-105"
                  >
                    <Icon className="h-5 w-5 theme-accent" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <div className="mt-5">
                    <p className="text-xs font-medium theme-text-subtle uppercase tracking-wide">
                      {option.title}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold theme-text leading-snug">
                      {option.value}
                    </p>
                    <p className="mt-1 text-xs theme-text-muted leading-relaxed">
                      {option.description}
                    </p>
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