import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Stat {
  value: number;
  suffix: string;
  label: string;
}

// ---------------------------------------------------------------------------
// Animated Counter Hook
// ---------------------------------------------------------------------------

function useAnimatedCounter(target: number, duration: number = 2000, shouldAnimate: boolean = true) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(target);
      return;
    }

    const startTime = performance.now();
    const startValue = 0;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(startValue + (target - startValue) * eased);

      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [target, duration, shouldAnimate]);

  return count;
}

// ---------------------------------------------------------------------------
// Stat Item Component
// ---------------------------------------------------------------------------

const StatItem = memo(function StatItem({ stat, isInView }: { stat: Stat; isInView: boolean }) {
  const animatedValue = useAnimatedCounter(stat.value, 2200, isInView);

  return (
    <motion.div
      className="flex flex-col items-center px-6 py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="text-2xl font-semibold tracking-tight text-[var(--color-text)] tabular-nums">
          {stat.suffix === '%' ? animatedValue.toFixed(1) : animatedValue.toLocaleString()}
        </span>
        <span className="text-lg font-medium text-[var(--color-accent)]">{stat.suffix}</span>
      </div>
      <p className="text-sm text-[var(--color-text-muted)] text-center leading-tight">
        {stat.label}
      </p>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const stats: Stat[] = [
  {
    value: 1250,
    suffix: '+',
    label: 'Patients helped',
  },
  {
    value: 98.4,
    suffix: '%',
    label: 'Success rate',
  },
  {
    value: 100,
    suffix: '%',
    label: 'Verified centres',
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childTransition: Transition = {
  duration: 0.65,
  ease: [0.22, 0.4, 0.22, 1],
};

const childVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: childTransition,
  },
};

// ---------------------------------------------------------------------------
// Main Hero Component
// ---------------------------------------------------------------------------

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Handle video load error
  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
  }, []);

  // Intersection Observer to trigger animations
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
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Parallax scroll effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.15]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-[var(--color-bg)]"
      aria-label="Hero"
    >
      {/* ----------------------------------- */}
      {/* Background Video Layer              */}
      {/* ----------------------------------- */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0"
          style={{ scale: prefersReducedMotion ? 1 : videoScale }}
        >
          {!videoFailed && (
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              onError={handleVideoError}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.55 }}
              aria-hidden="true"
            >
              <source src="/videos/rehabvid4.mp4" type="video/mp4" />
            </video>
          )}

          {videoFailed && (
            <img
              src="/hero-fallback.jpg"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 0.55 }}
              aria-hidden="true"
            />
          )}
        </motion.div>

        {/* Clean, layered white overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-[var(--color-bg)]/80" />
        <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]" />

        {/* Subtle, diffuse glow — no neon, just soft ambient light */}
        <div
          className="absolute -top-60 -left-60 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[120px]"
          style={{ background: 'var(--color-hero-glow)' }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-[0.08] blur-[120px]"
          style={{ background: 'var(--color-hero-glow-2)' }}
        />
      </div>

      {/* ----------------------------------- */}
      {/* Main Content                        */}
      {/* ----------------------------------- */}
      <motion.div
        className="relative z-10 w-full max-w-[660px] mx-auto px-6 sm:px-8 lg:px-0 flex flex-col items-center text-center"
        style={{
          opacity: prefersReducedMotion ? 1 : contentOpacity,
          y: prefersReducedMotion ? 0 : contentY,
        }}
      >
        <motion.div
          className="w-full flex flex-col items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {/* Label — clean pill, no icon */}
          {/* <motion.div variants={childVariants}>
            <span
              className="inline-block px-4 py-1.5 rounded-full glass-panel theme-border text-xs font-medium tracking-wide text-[var(--color-text-muted)] uppercase"
            >
              Trusted by leading rehabilitation centres
            </span>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            variants={childVariants}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-bold tracking-tight leading-[1.1] text-[var(--color-text)] max-w-[600px]"
          >
            Find the right
            <br />
            <span className="text-[var(--color-accent)]">rehabilitation centre</span>
            <br />
            for your recovery
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={childVariants}
            className="text-base sm:text-lg text-[var(--color-text-muted)] leading-relaxed max-w-[460px] mx-auto"
          >
            Speak with a care coordinator, compare verified facilities,
            and book a confidential consultation — all in one place.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={childVariants}
            className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
          >
            <button
              type="button"
              className="theme-btn-primary w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl"
            >
              Start consultation
            </button>
            <button
              type="button"
              className="theme-btn-ghost w-full sm:w-auto px-7 py-3 text-sm font-medium rounded-xl"
            >
              Explore centres
            </button>
          </motion.div>

          {/* Statistics — restrained glass card */}
          <motion.div
            variants={childVariants}
            className="mt-2 glass-panel theme-border w-full max-w-[500px] mx-auto"
            role="region"
            aria-label="Platform statistics"
          >
            <div className="grid grid-cols-3 divide-x divide-[var(--color-border)]">
              {stats.map((stat) => (
                <StatItem key={stat.label} stat={stat} isInView={isInView} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* ----------------------------------- */}
      {/* Bottom Fade                         */}
      {/* ----------------------------------- */}
      <div
        className="absolute bottom-0 left-0 right-0 z-[6] h-28 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, var(--color-bg), transparent)',
        }}
      />
    </section>
  );
}