'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItem {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const servicesList: ServiceItem[] = [
  {
    id: 1,
    imageSrc: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Art therapy session',
    title: 'Art Therapy',
    description:
      'Expressive therapy that uses the creative process to support emotional healing and personal growth during recovery.',
  },
  {
    id: 2,
    imageSrc: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Mental and behavioural health counselling',
    title: 'Mental & behavioural health',
    description:
      'Professional support and evidence-based interventions to promote lasting mental well-being.',
  },
  {
    id: 3,
    imageSrc: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Substance detoxification and medical treatments',
    title: 'Detoxification & treatment',
    description:
      'Medically supervised detox to safely remove substances from the body and prepare for therapy.',
  },
  {
    id: 4,
    imageSrc: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Inpatient and outpatient recovery services',
    title: 'Inpatient & outpatient care',
    description:
      'Structured clinical programmes for substance use disorder and mental health conditions, with daily support.',
  },
  {
    id: 5,
    imageSrc: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    imageAlt: 'Family support and counselling sessions',
    title: 'Family support services',
    description:
      'Education, group sessions, and guidance to support loved ones through every phase of recovery.',
  },
];

export const OurServicesCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection('next');
    setCurrentIndex((prev) => (prev + 1) % servicesList.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection('prev');
    setCurrentIndex((prev) => (prev === 0 ? servicesList.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const visibleServices = [
    servicesList[currentIndex],
    servicesList[(currentIndex + 1) % servicesList.length],
    servicesList[(currentIndex + 2) % servicesList.length],
  ];

  return (
    <section className="relative w-full bg-[var(--color-section-light)] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          
          <div className="max-w-2xl">
            <span className="text-sm font-medium tracking-wide text-[var(--color-accent)]">
              What we offer
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
              Programmes designed for lasting recovery
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              RehabConnect partners with centres that offer evidence-based, 
              outcome-driven care — from outpatient support to residential treatment. 
              Every programme is designed around the individual, not the condition.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex shrink-0 items-center gap-2 self-end md:self-end">
            <button
              onClick={handlePrev}
              aria-label="Previous services"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm transition-all duration-200 hover:bg-[var(--color-surface-elevated)] active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next services"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm transition-all duration-200 hover:bg-[var(--color-surface-elevated)] active:scale-95"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="relative min-h-[420px] overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: direction === 'next' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === 'next' ? -50 : 50 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleServices.map((service) => (
                <div
                  key={service.id}
                  className="group flex flex-col overflow-hidden rounded-xl bg-[var(--color-surface)] theme-border theme-shadow transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface-muted)]">
                    <Image
                      src={service.imageSrc}
                      alt={service.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {service.description}
                    </p>
                    <div className="mt-6 h-px w-12 bg-[var(--color-border)]" />
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide count indicator — subtle text, not dots */}
        <div className="mt-8 text-center text-xs font-medium text-[var(--color-text-muted)]">
          {currentIndex + 1}–{Math.min(currentIndex + 3, servicesList.length)} of {servicesList.length}
        </div>

      </div>
    </section>
  );
};

export default OurServicesCarousel;