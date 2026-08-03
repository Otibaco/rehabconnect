"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface FeatureCard {
  id: number;
  imageSrc: string;
  imageAlt: string;
  title: string;
  description: string;
}

const features: FeatureCard[] = [
  {
    id: 1,
    imageSrc:
      "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Medical professional at workstation",
    title: "Vetted professionals",
    description:
      "Every centre in our network is staffed by highly trained, qualified mental health and addiction specialists committed to evidence-based care and ongoing support.",
  },
  {
    id: 2,
    imageSrc:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Advanced treatment technology",
    title: "Modern treatment methods",
    description:
      "Our partner facilities use proven, up-to-date therapeutic approaches—from CBT and group therapy to medically assisted treatment—tailored to each individual.",
  },
  {
    id: 3,
    imageSrc:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Warm, welcoming recovery environment",
    title: "Safe, supportive environments",
    description:
      "Recovery happens best in spaces that feel secure and respectful. We only list centres that prioritise dignity, comfort, and emotional safety.",
  },
  {
    id: 4,
    imageSrc:
      "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Family-inclusive support session",
    title: "Ongoing support & aftercare",
    description:
      "Recovery doesn't end at discharge. Our partners provide follow-up care, family communication, and one-on-one review sessions for lasting results.",
  },
  {
    id: 5,
    imageSrc:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Personalised clinical evaluation",
    title: "Personalised treatment plans",
    description:
      "Every person receives a thorough clinical assessment. Treatment plans are individually designed, blending therapy, medication management, and holistic care.",
  },
];

export const WhyChooseCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % features.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, handleNext]);

  const visibleFeatures = [
    features[currentIndex],
    features[(currentIndex + 1) % features.length],
    features[(currentIndex + 2) % features.length],
  ];

  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-section-muted)] py-16 sm:py-20">
      {/* Subtle background texture — clean, not distracting */}
      <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 -translate-y-12 translate-x-12 opacity-[0.06]">
        <svg
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          <ellipse
            cx="120"
            cy="80"
            rx="90"
            ry="60"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(-20 120 80)"
            className="text-[var(--color-accent)]"
          />
          <ellipse
            cx="120"
            cy="80"
            rx="70"
            ry="46"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(-20 120 80)"
            className="text-[var(--color-accent)]"
          />
          <ellipse
            cx="120"
            cy="80"
            rx="50"
            ry="32"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(-20 120 80)"
            className="text-[var(--color-accent)]"
          />
          <ellipse
            cx="120"
            cy="80"
            rx="30"
            ry="18"
            stroke="currentColor"
            strokeWidth="1.2"
            transform="rotate(-20 120 80)"
            className="text-[var(--color-accent)]"
          />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <span className="text-sm font-medium tracking-wide text-[var(--color-accent)]">
              Why RehabConnect
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl">
              What sets our partner centres apart
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              We only work with facilities that meet the highest standards of
              care, professionalism, and compassion — so you can focus on what
              matters: recovery.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 self-end">
            <button
              onClick={handlePrev}
              aria-label="Previous features"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface)] text-[var(--color-text)] shadow-sm transition-all duration-200 hover:bg-[var(--color-surface-elevated)] active:scale-95"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next features"
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
              initial={{ opacity: 0, x: direction === "next" ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -50 : 50 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {visibleFeatures.map((feature) => (
                <div
                  key={feature.id}
                  className="group flex flex-col overflow-hidden rounded-xl bg-[var(--color-surface)] theme-border theme-shadow transition-all duration-300 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-[var(--color-surface-muted)]">
                    <Image
                      src={feature.imageSrc}
                      alt={feature.imageAlt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold tracking-tight text-[var(--color-text)]">
                      {feature.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--color-text-muted)]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress indicator — understated */}
        <div className="mt-8 flex items-center justify-center gap-3">
          {features.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? "next" : "prev");
                setCurrentIndex(idx);
              }}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "w-6 bg-[var(--color-accent)]"
                  : "w-1.5 bg-[var(--color-border)] hover:bg-[var(--color-text-muted)]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCarousel;
