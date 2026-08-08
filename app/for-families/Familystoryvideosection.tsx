"use client";

import React, { useCallback, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause } from "lucide-react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const VIDEO_SRC = "/videos/family-story.mp4";
const POSTER_SRC =
  "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1800&q=85";
const CAPTIONS_SRC = "/captions/family-story.vtt";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FamilyStoryVideoSection() {
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
    <section className="relative w-full min-h-[80vh] overflow-hidden theme-bg" aria-label="A family's story">
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
          aria-label="A family member shares their experience supporting a loved one"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
          <track kind="captions" src={CAPTIONS_SRC} srcLang="en" label="English" default />
        </video>
      ) : (
        <img
          src={POSTER_SRC}
          alt="A family member shares their experience supporting a loved one"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" />

      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label="Play family story video"
          className="absolute inset-0 flex items-center justify-center theme-transition"
        >
          <span className="inline-flex h-20 w-20 items-center justify-center rounded-full glass-panel theme-shadow theme-transition hover:scale-105">
            <Play className="h-7 w-7 text-white ml-0.5" aria-hidden="true" fill="currentColor" />
          </span>
        </button>
      )}

      {isPlaying && (
        <button
          type="button"
          onClick={togglePlayback}
          aria-label="Pause family story video"
          className="absolute top-6 right-6 inline-flex h-10 w-10 items-center justify-center rounded-full glass-panel theme-transition hover:scale-105"
        >
          <Pause className="h-4 w-4 text-white" aria-hidden="true" />
        </button>
      )}

      <motion.div
        initial={{ opacity: 0, y: 26 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: [0.22, 0.4, 0.22, 1] }}
        className="pointer-events-none absolute left-6 right-6 bottom-10 sm:left-12 sm:bottom-14 sm:right-auto max-w-xl"
      >
        <span className="text-[11px] font-medium tracking-[0.18em] text-white/70 uppercase">
          In their words
        </span>
        <p
          className="mt-3 text-2xl sm:text-4xl leading-[1.2] text-white"
          style={{ fontFamily: "var(--font-serif)" }}
        >
          &ldquo;I didn&apos;t know how to bring it up. A coordinator helped
          me find the words.&rdquo;
        </p>
        <p className="mt-4 text-xs font-medium text-white/70">
          A mother, on approaching her son about treatment
        </p>
      </motion.div>
    </section>
  );
}