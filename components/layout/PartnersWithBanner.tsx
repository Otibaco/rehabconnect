'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import type { Variants } from 'framer-motion';

interface PartnerLogo {
  name: string;
  logoUrl: string;
}

const partners: PartnerLogo[] = [
  {
    name: 'Partner One',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Partner Two',
    logoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Partner Three',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Partner Four',
    logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Partner Five',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80',
  },
];

const logoVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

export const PartnersWithBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[var(--color-surface)] pt-20 sm:pt-28 pb-0">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="text-sm font-medium tracking-wide text-[var(--color-accent)]">
            Trusted network
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Our partner centres
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            RehabConnect works with carefully vetted rehabilitation centres, 
            healthcare organisations, and support networks to provide the best 
            care options possible. Every partner meets our standards for clinical 
            excellence and compassionate treatment.
          </p>
        </motion.div>

        {/* Logo Grid */}
        <div className="mt-14 grid grid-cols-2 items-center justify-items-center gap-x-8 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.name}
              className="flex h-16 w-full items-center justify-center opacity-50 grayscale transition-all duration-300 hover:opacity-80 hover:grayscale-0"
              custom={index}
              variants={logoVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="relative h-10 w-32">
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner — clean, light, anchored at bottom */}
        <div className="relative z-20 mt-20 -mb-0">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)] theme-border theme-shadow px-8 py-10 sm:px-12 sm:py-12">
            
            {/* Subtle gradient glow behind content */}
            <div
              className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-[0.08] blur-[80px]"
              style={{ background: 'var(--color-hero-glow)' }}
            />

            <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left lg:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  Ready to take the first step?
                </span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
                  Speak with a care coordinator today
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-lg">
                  Free, confidential, and no commitment required. We're here to 
                  listen and help you find the right path forward.
                </p>
              </div>

              <a
                href="#contact"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl theme-btn-primary px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Book a consultation
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default PartnersWithBanner;