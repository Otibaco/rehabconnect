"use client";

import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

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
      className="flex flex-col items-start px-0 sm:px-8 py-6 sm:py-0"
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <div className="flex items-baseline gap-1">
        <span className="text-4xl sm:text-5xl font-bold tracking-tight theme-text tabular-nums">
          {animatedValue.toLocaleString()}
        </span>
        <span className="text-xl sm:text-2xl font-semibold theme-accent">{stat.suffix}</span>
      </div>
      <p className="mt-2 text-xs sm:text-sm theme-text-muted">{stat.label}</p>
    </motion.div>
  );
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const stats: Stat[] = [
  { value: 1250, suffix: "+", label: "People helped" },
  { value: 100, suffix: "%", label: "Licensed specialists" },
  { value: 24, suffix: "", label: "States served virtually" },
  { value: 2, suffix: "h", label: "Avg. response time" },
];

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
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: [0.22, 0.4, 0.22, 1] }}
          className="max-w-xl mb-14"
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">A network you can trust</span>
          <h2 className="mt-3 text-2xl sm:text-4xl font-bold tracking-tight theme-text">
            Growing, and every specialist still earns their place
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 sm:divide-x theme-border">
          {stats.map((stat) => (
            <StatItem key={stat.label} stat={stat} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}