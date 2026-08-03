'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, ShieldCheck, Star, HeartHandshake } from 'lucide-react';
import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PartnerLogo {
  name: string;
  logoUrl: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const partners: PartnerLogo[] = [
  {
    name: 'Primly Services',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Green Ribbon',
    logoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'OlivePrime',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'The Oleaster',
    logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'Wellness Hub',
    logoUrl: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'CareBridge',
    logoUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'HealFirst',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&q=80',
  },
  {
    name: 'RecoverWell',
    logoUrl: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&w=300&q=80',
  },
];

// ---------------------------------------------------------------------------
// Auto-scrolling Logo Row (infinite marquee)
// ---------------------------------------------------------------------------

const LogoMarquee: React.FC<{ items: PartnerLogo[]; direction?: 'left' | 'right' }> = ({
  items,
  direction = 'left',
}) => {
  const baseVelocity = direction === 'left' ? -0.6 : 0.6;
  const baseX = useMotionValue(0);
  const smoothX = useSpring(baseX, { stiffness: 50, damping: 40, mass: 0.3 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      setContentWidth(containerRef.current.scrollWidth / 2);
    }
  }, [items]);

  useAnimationFrame((_, delta) => {
    if (!contentWidth) return;
    let newX = baseX.get() + baseVelocity * (delta / 16);

    // Wrap around seamlessly
    if (direction === 'left' && newX <= -contentWidth) {
      newX += contentWidth;
    } else if (direction === 'right' && newX >= contentWidth) {
      newX -= contentWidth;
    }

    baseX.set(newX);
  });

  return (
    <div className="overflow-hidden relative">
      <motion.div
        ref={containerRef}
        className="flex gap-10"
        style={{ x: smoothX }}
      >
        {/* Duplicate items for seamless loop */}
        {[...items, ...items].map((partner, idx) => (
          <div
            key={`${partner.name}-${idx}`}
            className="flex-shrink-0 flex items-center justify-center h-20 w-36 group cursor-default"
          >
            <div className="relative h-12 w-28 opacity-50 grayscale transition-all duration-500 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110">
              <Image
                src={partner.logoUrl}
                alt={partner.name}
                fill
                className="object-contain"
                sizes="112px"
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[var(--color-bg)] to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[var(--color-bg)] to-transparent pointer-events-none z-10" />
    </div>
  );
};

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const statTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.4, 0.25, 1],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const PartnersWithBanner: React.FC = () => {
  return (
    <section className="relative w-full bg-[var(--color-bg)] pt-20 sm:pt-28 pb-0 overflow-hidden">
      
      {/* ── Decorative background ── */}
      <div className="pointer-events-none absolute top-0 left-0 w-[450px] h-[450px] -translate-x-1/3 -translate-y-1/3 rounded-full bg-[var(--color-hero-glow)] opacity-[0.04] blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[400px] h-[400px] translate-x-1/4 translate-y-1/3 rounded-full bg-[var(--color-hero-glow-2)] opacity-[0.04] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* ── Header ── */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-[var(--color-accent)] text-xs font-medium">
            <HeartHandshake className="w-3.5 h-3.5" />
            Trusted network
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Our partner centres
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            RehabConnect works with carefully vetted rehabilitation centres, 
            healthcare organisations, and support networks across Nigeria.
          </p>
        </motion.div>

        {/* ── Logo Marquee (Row 1 — left) ── */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <LogoMarquee items={partners.slice(0, 4)} direction="left" />
        </motion.div>

        {/* ── Logo Marquee (Row 2 — right, offset) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <LogoMarquee items={partners.slice(4)} direction="right" />
        </motion.div>

        {/* ── Trust Stats ── */}
        {/* <motion.div
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.2 },
            },
          }}
        >
          {[
            { icon: <ShieldCheck className="w-5 h-5" />, label: '100% verified centres', value: 'Rigorous vetting' },
            { icon: <Star className="w-5 h-5" />, label: '98.4% success rate', value: 'Proven outcomes' },
            { icon: <HeartHandshake className="w-5 h-5" />, label: '1,250+ patients helped', value: 'Real impact' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center text-center p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: statTransition,
                },
              }}
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-3">
                {stat.icon}
              </span>
              <p className="text-sm font-semibold text-[var(--color-text)]">{stat.label}</p>
              <p className="text-xs text-[var(--color-text-muted)] mt-1">{stat.value}</p>
            </motion.div>
          ))}
        </motion.div> */}

        {/* ── CTA Card ── */}
        <motion.div
          className="relative z-20 mt-16"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <div className="relative overflow-hidden rounded-2xl bg-[var(--color-section-soft)] border border-[var(--color-border)] shadow-lg px-8 py-10 sm:px-12 sm:py-14">
            
            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-[0.06] blur-[80px]" style={{ background: 'var(--color-hero-glow)' }} />
            <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full opacity-[0.04] blur-[80px]" style={{ background: 'var(--color-hero-glow-2)' }} />

            <div className="relative z-10 flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left lg:justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                  Ready to take the first step?
                </span>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-[var(--color-text)] sm:text-3xl">
                  Speak with a care coordinator today
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-lg">
                  Free, confidential, and no commitment required. We&apos;re here to 
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
        </motion.div>

      </div>
    </section>
  );
};

export default PartnersWithBanner;