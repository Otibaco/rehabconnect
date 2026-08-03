'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle, ShieldCheck } from 'lucide-react';
import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CTAProps {
  headline?: string;
  accentWord?: string;
  description?: string;
  primaryButtonText?: string;
  primaryHref?: string;
  secondaryButtonText?: string;
  secondaryHref?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  bgVariable?: string;
  variant?: 'banner' | 'card' | 'split';
  className?: string;
  showTrustBadges?: boolean;
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
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: childTransition,
  },
};

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function secondaryButtonIcon(text: string): React.ReactNode {
  const lower = text.toLowerCase();
  if (lower.includes('call') || lower.includes('phone')) return <Phone className="h-4 w-4" />;
  if (lower.includes('chat') || lower.includes('message')) return <MessageCircle className="h-4 w-4" />;
  return null;
}

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
  showTrustBadges = true,
}) => {
  const renderHeadline = () => {
    if (!accentWord) return headline;
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
  const isSplit = variant === 'split';

  // ── Banner variant ──
  if (!isCard && !isSplit) {
    return (
      <section
        className={`relative w-full overflow-hidden ${className}`}
        style={{ backgroundColor: bgVariable }}
      >
        <div className="relative overflow-hidden px-6 py-20 sm:px-8 sm:py-28 lg:px-12">
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-40 -right-40 h-80 w-80 rounded-full opacity-[0.06] blur-[120px]" style={{ background: 'var(--color-hero-glow)' }} />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-72 w-72 rounded-full opacity-[0.04] blur-[120px]" style={{ background: 'var(--color-hero-glow-2)' }} />

          <motion.div
            className="relative z-10 flex flex-col items-center text-center gap-8 max-w-2xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.h2 variants={childVariants} className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.5rem]">
              {renderHeadline()}
            </motion.h2>

            <motion.p variants={childVariants} className="text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base max-w-xl">
              {description}
            </motion.p>

            <motion.div variants={childVariants} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <PrimaryButton text={primaryButtonText} href={primaryHref} onClick={onPrimaryClick} />
              <SecondaryButton text={secondaryButtonText} href={secondaryHref} onClick={onSecondaryClick} />
            </motion.div>

            {showTrustBadges && (
              <motion.div variants={childVariants} className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                  Confidential
                </span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="text-xs text-[var(--color-text-muted)]">Free initial consultation</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-border)]" />
                <span className="text-xs text-[var(--color-text-muted)]">No commitment required</span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    );
  }

  // ── Card variant ──
  if (isCard) {
    return (
      <section className={`relative w-full overflow-hidden ${className}`} style={{ backgroundColor: bgVariable }}>
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-2xl bg-[var(--color-section-soft)] theme-border theme-shadow px-8 py-12 sm:px-14 sm:py-16">
            <div className="pointer-events-none absolute -top-20 -right-20 h-56 w-56 rounded-full opacity-[0.05] blur-[80px]" style={{ background: 'var(--color-hero-glow)' }} />

            <motion.div
              className="relative z-10 flex flex-col items-center text-center gap-8 max-w-xl mx-auto"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              <motion.h2 variants={childVariants} className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[var(--color-text)]">
                {renderHeadline()}
              </motion.h2>

              <motion.p variants={childVariants} className="text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
                {description}
              </motion.p>

              <motion.div variants={childVariants} className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                <PrimaryButton text={primaryButtonText} href={primaryHref} onClick={onPrimaryClick} />
                <SecondaryButton text={secondaryButtonText} href={secondaryHref} onClick={onSecondaryClick} />
              </motion.div>

              {showTrustBadges && (
                <motion.p variants={childVariants} className="text-xs text-[var(--color-text-muted)]">
                  Confidential · Free initial consultation · No commitment required
                </motion.p>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // ── Split variant ──
  return (
    <section className={`relative w-full overflow-hidden ${className}`} style={{ backgroundColor: bgVariable }}>
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          
          {/* Left: Text */}
          <motion.div
            className="space-y-6 text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.h2 variants={childVariants} className="text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.5rem]">
              {renderHeadline()}
            </motion.h2>
            <motion.p variants={childVariants} className="text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base max-w-md lg:max-w-none">
              {description}
            </motion.p>
            <motion.div variants={childVariants} className="flex flex-col sm:flex-row items-center lg:items-start gap-3 pt-2">
              <PrimaryButton text={primaryButtonText} href={primaryHref} onClick={onPrimaryClick} />
              <SecondaryButton text={secondaryButtonText} href={secondaryHref} onClick={onSecondaryClick} />
            </motion.div>
            {showTrustBadges && (
              <motion.p variants={childVariants} className="text-xs text-[var(--color-text-muted)] pt-2">
                Confidential · Free initial consultation · No commitment required
              </motion.p>
            )}
          </motion.div>

          {/* Right: Visual accent */}
          <motion.div
            className="hidden lg:flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="relative w-72 h-72">
              {/* Concentric decorative rings */}
              <div className="absolute inset-0 rounded-full border border-[var(--color-accent)]/10" />
              <div className="absolute inset-4 rounded-full border border-[var(--color-accent)]/15" />
              <div className="absolute inset-10 rounded-full border border-[var(--color-accent)]/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                  <ShieldCheck className="w-10 h-10" />
                </div>
              </div>
              {/* Floating dots */}
              <div className="absolute top-6 right-8 w-2.5 h-2.5 rounded-full bg-[var(--color-accent)]/30" />
              <div className="absolute bottom-10 left-6 w-2 h-2 rounded-full bg-[var(--color-accent)]/25" />
              <div className="absolute top-20 left-3 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]/35" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// ---------------------------------------------------------------------------
// Button Sub-components
// ---------------------------------------------------------------------------

const PrimaryButton: React.FC<{
  text: string;
  href: string;
  onClick?: () => void;
}> = ({ text, href, onClick }) => {
  const className =
    'inline-flex items-center gap-2 theme-btn-primary px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98] w-full sm:w-auto justify-center';

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {text}
        <ArrowRight className="h-4 w-4" />
      </button>
    );
  }

  return (
    <a href={href} className={className}>
      {text}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
};

const SecondaryButton: React.FC<{
  text: string;
  href: string;
  onClick?: () => void;
}> = ({ text, href, onClick }) => {
  const className =
    'inline-flex items-center gap-2 theme-btn-ghost px-7 py-3.5 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98] w-full sm:w-auto justify-center';

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={className}>
        {secondaryButtonIcon(text)}
        {text}
      </button>
    );
  }

  return (
    <a href={href} className={className}>
      {secondaryButtonIcon(text)}
      {text}
    </a>
  );
};

// ---------------------------------------------------------------------------
// Pre-configured variants
// ---------------------------------------------------------------------------

export const CTABanner: React.FC<Partial<CTAProps>> = (props) => (
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

export const CTASplit: React.FC<Partial<CTAProps>> = (props) => (
  <CTA
    headline="Let's find the right path"
    accentWord="together"
    description="Recovery isn't meant to be navigated alone. Our team is ready to listen, guide, and support you — starting with a free, confidential conversation."
    primaryButtonText="Book a consultation"
    secondaryButtonText="Call now"
    bgVariable="var(--color-section-soft)"
    variant="split"
    {...props}
  />
);

export default CTA;