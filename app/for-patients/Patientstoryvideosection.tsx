"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Play, Pause, ShieldCheck } from "lucide-react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VIDEO_SRC = "/videos/patient-story.mp4";
const POSTER_SRC =
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80";
const CAPTIONS_SRC = "/captions/patient-story.vtt";

const trustPoints = [
  "Shared with permission, identity protected on request",
  "Captions available in the player",
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 0.4, 0.22, 1] } },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PatientStoryVideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <section
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-light)" }}
      aria-label="A patient's story"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 lg:gap-16 items-center">
        {/* ── Video ── */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-[24px] theme-shadow theme-border">
            {!videoFailed ? (
              <video
                ref={videoRef}
                poster={POSTER_SRC}
                controls={isPlaying}
                playsInline
                preload="metadata"
                onError={() => setVideoFailed(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                className="absolute inset-0 h-full w-full object-cover"
                aria-label="A patient shares their recovery story"
              >
                <source src={VIDEO_SRC} type="video/mp4" />
                <track kind="captions" src={CAPTIONS_SRC} srcLang="en" label="English" default />
              </video>
            ) : (
              <img
                src={POSTER_SRC}
                alt="A patient shares their recovery story"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlayback}
                aria-label="Play patient story video"
                className="absolute inset-0 flex items-center justify-center bg-black/20 theme-transition hover:bg-black/30"
              >
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full glass-panel theme-shadow theme-transition hover:scale-105">
                  <Play className="h-6 w-6 theme-text ml-0.5" aria-hidden="true" fill="currentColor" />
                </span>
              </button>
            )}

            {isPlaying && (
              <button
                type="button"
                onClick={togglePlayback}
                aria-label="Pause patient story video"
                className="absolute top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full glass-panel theme-transition hover:scale-105"
              >
                <Pause className="h-4 w-4 theme-text" aria-hidden="true" />
              </button>
            )}
          </div>
        </motion.div>

        {/* ── Text ── */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          className="flex flex-col gap-6"
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            In their words
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight theme-text leading-[1.15]">
            &ldquo;I didn&apos;t know where to start. My coordinator did.&rdquo;
          </h2>
          <p className="text-sm sm:text-base theme-text-muted leading-relaxed">
            Hear directly from someone who used RehabConnect to find outpatient
            care close to home — and what the first two weeks actually felt
            like.
          </p>

          <ul className="flex flex-col gap-2.5">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-xs theme-text-muted">
                <ShieldCheck className="h-4 w-4 theme-accent shrink-0" aria-hidden="true" strokeWidth={1.75} />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}