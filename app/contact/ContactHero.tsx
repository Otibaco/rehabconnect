'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PhoneCall, ArrowRight } from 'lucide-react';
import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SlideImage {
  url: string;
  alt: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const COORDINATOR_PHONE = '+234 800 000 0000';
const COORDINATOR_PHONE_HREF = 'tel:+2348000000000';
const SLIDE_DURATION_MS = 6000;

const heroImages: SlideImage[] = [
  {
    url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1600&q=80',
    alt: 'Care coordinator speaking warmly with a family member',
  },
  {
    url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1600&q=80',
    alt: 'Healthcare professional listening attentively during a consultation',
  },
  {
    url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1600&q=80',
    alt: 'Patient receiving guidance in a modern rehabilitation clinic',
  },
  {
    url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80',
    alt: 'Physical therapist supporting a patient through recovery',
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const childTransition: Transition = {
  duration: 0.65,
  ease: [0.22, 0.4, 0.22, 1],
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: childTransition },
};

const slideVariants: Variants = {
  enter: { opacity: 0 },
  center: {
    opacity: 1,
    transition: { duration: 1.2, ease: [0.25, 0.4, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.8, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % heroImages.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden bg-[var(--color-bg)]"
      aria-label="Contact hero"
    >
      {/* ── Background Layer ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <Image
              src={heroImages[slideIndex].url}
              alt={heroImages[slideIndex].alt}
              fill
              className="object-cover"
              style={{ opacity: 0.4 }}
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-[var(--color-bg)]/80" />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

        {/* Glow */}
        <div
          className="absolute -top-60 -right-60 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full opacity-[0.1] blur-[120px]"
          style={{ background: 'var(--color-hero-glow)' }}
        />
        <div
          className="absolute -bottom-40 -left-40 w-[250px] sm:w-[500px] h-[250px] sm:h-[500px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: 'var(--color-hero-glow-2)' }}
        />
      </div>

      {/* ── Slide indicators ── */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setSlideIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-500 ${
              idx === slideIndex
                ? 'w-5 h-1.5 bg-[var(--color-accent)]'
                : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
            }`}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <motion.div
        className="relative z-10 w-full max-w-[660px] mx-auto px-6 sm:px-8 flex flex-col items-center text-center"
        style={{
          opacity: prefersReducedMotion ? 1 : contentOpacity,
          y: prefersReducedMotion ? 0 : contentY,
        }}
      >
        <motion.div
          className="w-full flex flex-col items-center gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Status badge */}
          <motion.div variants={childVariants}>
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--color-surface)]/80 border border-[var(--color-border)] backdrop-blur-sm text-[var(--color-accent)] text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Care coordinators are online now
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={childVariants}
            className="text-3xl sm:text-5xl lg:text-[3.2rem] font-bold tracking-tight leading-[1.1] text-[var(--color-text)] max-w-[580px]"
          >
            Let&apos;s talk about
            <br />
            <span className="text-[var(--color-accent)]">the right next step</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={childVariants}
            className="text-sm sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-[480px] mx-auto"
          >
            Reach a real care coordinator, ask questions in confidence, and get
            matched with a verified rehabilitation centre — no pressure, no
            obligation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto pt-1"
          >
            <a
              href="#contact-form"
              className="theme-btn-primary inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              Start your consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <a
              href={COORDINATOR_PHONE_HREF}
              className="theme-btn-ghost inline-flex items-center justify-center gap-2 w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98]"
            >
              <PhoneCall className="h-4 w-4" aria-hidden="true" />
              Call {COORDINATOR_PHONE}
            </a>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ── Bottom Fade ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[6] h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to top, var(--color-bg), transparent)' }}
      />
    </section>
  );
}