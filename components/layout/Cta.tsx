'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CTAProps {
  /** Main heading line */
  headline?: string;
  /** Accent-coloured word/phrase within the headline */
  accentWord?: string;
  /** Supporting paragraph below the headline */
  description?: string;
  /** Primary button text */
  primaryButtonText?: string;
  /** Primary button href */
  primaryHref?: string;
  /** Secondary button text — rendered as a ghost/outline style */
  secondaryButtonText?: string;
  /** Secondary button href */
  secondaryHref?: string;
  /** Optional callback when primary button is clicked (overrides href) */
  onPrimaryClick?: () => void;
  /** Optional callback when secondary button is clicked (overrides href) */
  onSecondaryClick?: () => void;
  /** Background colour variable — defaults to --color-surface */
  bgVariable?: string;
  /** If true, renders a slightly elevated card rather than a full-width banner */
  variant?: 'banner' | 'card';
  /** Optional className for additional overrides */
  className?: string;
}

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const childTransition = {
  duration: 0.55,
  ease: [0.25, 0.4, 0.25, 1] as const,
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: childTransition,
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const CTA: React.FC<CTAProps> = ({
  headline = 'Ready to take the first step?',
  accentWord = 'here to help',
  description = 'Speak with a care coordinator today. Free, confidential, and no commitment required.',
  primaryButtonText = 'Start consultation',
  primaryHref = '#contact',
  secondaryButtonText = 'Call us',
  secondaryHref = 'tel:+2348000000000',
  onPrimaryClick,
  onSecondaryClick,
  bgVariable = 'var(--color-surface)',
  variant = 'banner',
  className = '',
}) => {
  // Build headline with accent word
  const renderHeadline = () => {
    if (!accentWord) {
      return headline;
    }

    const parts = headline.split(accentWord);
    if (parts.length === 1) return headline;

    return (
      <>
        {parts[0]}
        <span className="text-[var(--color-accent)]">{accentWord}</span>
        {parts[1]}
      </>
    );
  };

  const isCard = variant === 'card';

  return (
    <section
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor: bgVariable }}
    >
      <div className={isCard ? 'mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28' : ''}>
        
        {/* Card variant wrapper */}
        <div
          className={
            isCard
              ? 'relative overflow-hidden rounded-2xl bg-[var(--color-section-soft)] theme-border theme-shadow px-8 py-12 sm:px-12 sm:py-14'
              : 'relative overflow-hidden px-6 py-20 sm:px-8 sm:py-28 lg:px-12'
          }
        >
          {/* Subtle ambient glow behind content */}
          <div
            className="pointer-events-none absolute -top-32 -right-32 h-72 w-72 rounded-full opacity-[0.07] blur-[100px]"
            style={{ background: 'var(--color-hero-glow)' }}
          />
          <div
            className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full opacity-[0.05] blur-[100px]"
            style={{ background: 'var(--color-hero-glow-2)' }}
          />

          {/* Content */}
          <motion.div
            className="relative z-10 flex flex-col items-center text-center gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {/* Headline */}
            <motion.h2
              variants={childVariants}
              className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.5rem] max-w-2xl"
            >
              {renderHeadline()}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={childVariants}
              className="text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base max-w-xl"
            >
              {description}
            </motion.p>

            {/* Buttons */}
            <motion.div
              variants={childVariants}
              className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
            >
              {/* Primary */}
              {onPrimaryClick ? (
                <button
                  type="button"
                  onClick={onPrimaryClick}
                  className="inline-flex items-center gap-2 theme-btn-primary px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98] w-full sm:w-auto justify-center"
                >
                  {primaryButtonText}
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <a
                  href={primaryHref}
                  className="inline-flex items-center gap-2 theme-btn-primary px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98] w-full sm:w-auto justify-center"
                >
                  {primaryButtonText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              )}

              {/* Secondary */}
              {onSecondaryClick ? (
                <button
                  type="button"
                  onClick={onSecondaryClick}
                  className="inline-flex items-center gap-2 theme-btn-ghost px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98] w-full sm:w-auto justify-center"
                >
                  {secondaryButtonIcon(secondaryButtonText)}
                  {secondaryButtonText}
                </button>
              ) : (
                <a
                  href={secondaryHref}
                  className="inline-flex items-center gap-2 theme-btn-ghost px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98] w-full sm:w-auto justify-center"
                >
                  {secondaryButtonIcon(secondaryButtonText)}
                  {secondaryButtonText}
                </a>
              )}
            </motion.div>

            {/* Trust line */}
            <motion.p
              variants={childVariants}
              className="text-xs text-[var(--color-text-muted)]"
            >
              Confidential · Free initial consultation · No commitment required
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Helper — choose icon based on button text
// ---------------------------------------------------------------------------

function secondaryButtonIcon(text: string): React.ReactNode {
  const lower = text.toLowerCase();
  if (lower.includes('call') || lower.includes('phone')) {
    return <Phone className="h-4 w-4" />;
  }
  if (lower.includes('chat') || lower.includes('message')) {
    return <MessageCircle className="h-4 w-4" />;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Pre-configured variants for quick usage
// ---------------------------------------------------------------------------

export const CTADefault: React.FC<Partial<CTAProps>> = (props) => (
  <CTA
    headline="Ready to take the first step?"
    accentWord="here to help"
    description="Speak with a care coordinator today. Free, confidential, and no commitment required."
    primaryButtonText="Start consultation"
    secondaryButtonText="Call us"
    bgVariable="var(--color-surface)"
    variant="banner"
    {...props}
  />
);

export const CTACard: React.FC<Partial<CTAProps>> = (props) => (
  <CTA
    headline="Not sure where to start?"
    accentWord="guide you"
    description="Our care coordinators can help you understand your options and find the right fit — at no cost."
    primaryButtonText="Talk to a coordinator"
    secondaryButtonText="Chat with us"
    bgVariable="var(--color-bg)"
    variant="card"
    {...props}
  />
);

export default CTA;