'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  id: number;
  name: string;
  location: string;
  quote: string;
  rating: number;
  image: string;
}

// ---------------------------------------------------------------------------
// Data — RehabConnect voices (all Unsplash images)
// ---------------------------------------------------------------------------

const testimonials: Testimonial[] = [
  {
    id: 0,
    name: 'Adebimpe Okafor',
    location: 'Lagos, Nigeria',
    quote:
      'RehabConnect made an overwhelming process feel manageable. My care coordinator listened without judgement and found a centre that genuinely understood what I was going through. I’ll always be grateful.',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 1,
    name: 'Tunde Bakare',
    location: 'Abuja, Nigeria',
    quote:
      'I was searching for my brother and had no idea where to start. Within 48 hours, RehabConnect connected us with a verified facility and handled all the coordination. It took the weight off our family.',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Ngozi Eze',
    location: 'Enugu, Nigeria',
    quote:
      'The confidentiality gave me courage. I could speak openly, compare options, and make a decision without pressure. The follow-up after admission showed they genuinely care about outcomes.',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 3,
    name: 'Ibrahim Suleiman',
    location: 'Kano, Nigeria',
    quote:
      'What stood out was the coordinator’s knowledge. She asked the right questions and matched us with a centre that specialised in exactly what we needed. No guesswork, no wasted time.',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 4,
    name: 'Folake Adeyemi',
    location: 'Ibadan, Nigeria',
    quote:
      'After months of searching alone, RehabConnect gave us clarity in days. The centres they recommended were all pre-vetted, so we could focus on choosing the right fit rather than worrying about quality.',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 5,
    name: 'Chidi Nnamdi',
    location: 'Port Harcourt, Nigeria',
    quote:
      'I was sceptical at first, but the team earned my trust quickly. Transparent about costs, honest about timelines, and genuinely invested in my recovery journey. Can’t recommend them enough.',
    rating: 5,
    image:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
];

// ---------------------------------------------------------------------------
// Satellite positions — fixed around the central avatar orbit
// ---------------------------------------------------------------------------

const satellitePositions = [
  { top: '2%', left: '18%' },
  { top: '48%', left: '-8%' },
  { bottom: '2%', left: '18%' },
  { top: '12%', right: '2%' },
  { bottom: '12%', right: '2%' },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const contentVariants: Variants = {
  enter: { opacity: 0, x: 30 },
  center: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, ease: [0.25, 0.4, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: { duration: 0.3, ease: [0.25, 0.4, 0.25, 1] },
  },
};

// ---------------------------------------------------------------------------
// Star Rating
// ---------------------------------------------------------------------------

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < rating
            ? 'text-[var(--color-accent)] fill-current'
            : 'text-[var(--color-border)]'
        }
      />
    ))}
  </div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section
      className="relative py-16 sm:py-20 overflow-hidden"
      style={{ backgroundColor: 'var(--color-section-muted)' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <span className="text-sm font-medium tracking-wide text-[var(--color-accent)]">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
            Trusted by families across Nigeria
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
            Real stories from people who found the right rehabilitation centre through RehabConnect.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* LEFT: Avatar orbit */}
          <div className="lg:col-span-5 relative h-[480px] flex items-center justify-center lg:justify-end">
            
            {/* Dashed orbit rings */}
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] pointer-events-none opacity-15 hidden lg:block"
              viewBox="0 0 400 400"
            >
              <path
                d="M 50 200 Q 120 50 350 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="text-[var(--color-accent)]"
              />
              <path
                d="M 50 200 Q 120 350 350 350"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="text-[var(--color-accent)]"
              />
              <circle
                cx="200"
                cy="200"
                r="150"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.5"
                className="text-[var(--color-text-muted)]"
              />
            </svg>

            {/* Avatar cluster */}
            <div className="relative w-[340px] h-[340px]">
              {/* Central active image */}
              <div className="absolute inset-0 flex items-center justify-center z-20">
                <motion.div
                  key={activeTestimonial.id}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="relative w-44 h-44 sm:w-48 sm:h-48 rounded-full p-2 bg-white theme-shadow border-2 border-[var(--color-accent)]/20"
                >
                  <div className="relative w-full h-full rounded-full overflow-hidden border-[3px] border-white">
                    <Image
                      src={activeTestimonial.image}
                      alt={activeTestimonial.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 176px, 192px"
                    />
                  </div>
                  {/* Subtle pulse */}
                  <div className="absolute inset-0 rounded-full border border-[var(--color-accent)] opacity-20 animate-ping" />
                </motion.div>
              </div>

              {/* Satellite avatars */}
              {testimonials.map((t, idx) => {
                if (idx === activeIndex) return null;

                const visualIndex = idx < activeIndex ? idx : idx - 1;
                const pos = satellitePositions[visualIndex % satellitePositions.length];

                return (
                  <motion.button
                    key={t.id}
                    onClick={() => {
                      setActiveIndex(idx);
                      setIsAutoPlaying(false);
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.15 }}
                    transition={{ delay: visualIndex * 0.05 }}
                    className="absolute w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 border-white shadow-lg overflow-hidden z-10 cursor-pointer grayscale hover:grayscale-0 transition-all bg-gray-100"
                    style={pos}
                    aria-label={`View ${t.name}'s testimonial`}
                  >
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                    />
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* CENTRE: Vertical timeline dots */}
          <div className="lg:col-span-1 hidden lg:flex flex-col items-center h-[380px] justify-center relative">
            <div className="absolute h-full w-px border-l-2 border-dashed border-[var(--color-border)]" />
            <div className="flex flex-col gap-7 z-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsAutoPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    idx === activeIndex
                      ? 'bg-[var(--color-accent)] border-[var(--color-accent)] scale-150 shadow-[0_0_10px_var(--color-accent)]'
                      : 'bg-white border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-110'
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Content */}
          <div className="lg:col-span-6 lg:pl-8 text-center lg:text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                {/* Quote icon */}
                <div className="mb-5 inline-flex">
                  <Quote size={40} className="text-[var(--color-accent)] opacity-40" />
                </div>

                {/* Stars */}
                <div className="mb-5 flex justify-center lg:justify-start">
                  <StarRating rating={activeTestimonial.rating} />
                </div>

                {/* Quote text */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl font-medium text-[var(--color-text)] leading-relaxed mb-8 max-w-xl">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div>
                  <p className="text-base font-semibold text-[var(--color-text)]">
                    {activeTestimonial.name}
                  </p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    {activeTestimonial.location}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}