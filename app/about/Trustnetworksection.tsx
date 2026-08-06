"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ShieldCheck } from "lucide-react";

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

function useAnimatedCounter(target: number, duration = 2000, shouldAnimate = true) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    if (!shouldAnimate) {
      setCount(target);
      return;
    }
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(target * eased);
      if (current !== countRef.current) {
        countRef.current = current;
        setCount(current);
      }
      if (progress < 1) frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [target, duration, shouldAnimate]);

  return count;
}

// ---------------------------------------------------------------------------
// Stat Item
// ---------------------------------------------------------------------------

const StatItem = memo(function StatItem({ stat, isInView }: { stat: Stat; isInView: boolean }) {
  const animatedValue = useAnimatedCounter(stat.value, 2200, isInView);

  return (
    <motion.div
      className="flex flex-col items-center px-4 sm:px-6 py-4"
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="flex items-baseline gap-0.5 mb-1">
        <span className="text-2xl sm:text-3xl font-semibold tracking-tight theme-text tabular-nums">
          {animatedValue.toLocaleString()}
        </span>
        <span className="text-lg font-medium theme-accent">{stat.suffix}</span>
      </div>
      <p className="text-xs sm:text-sm theme-text-muted text-center leading-tight">{stat.label}</p>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const stats: Stat[] = [
  { value: 1250, suffix: "+", label: "Patients helped" },
  { value: 100, suffix: "%", label: "Verified centres" },
  { value: 24, suffix: "", label: "States covered" },
  { value: 2, suffix: "h", label: "Avg. response time" },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TrustNetworkSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-light)" }}
      aria-label="Our network in numbers"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-8 flex flex-col items-center text-center">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="inline-flex items-center gap-2 rounded-full theme-nav-shell px-4 py-1.5"
        >
          <ShieldCheck className="h-3.5 w-3.5 theme-accent" aria-hidden="true" strokeWidth={2} />
          <span className="text-xs font-medium tracking-wide theme-text-muted">A network you can trust</span>
        </motion.div>

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="mt-5 text-2xl sm:text-4xl font-bold tracking-tight theme-text max-w-xl"
        >
          Growing, and every centre still earns its place
        </motion.h2>

        <div className="mt-12 glass-panel theme-border theme-shadow w-full max-w-3xl rounded-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 theme-border">
            {stats.map((stat) => (
              <StatItem key={stat.label} stat={stat} isInView={isInView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}