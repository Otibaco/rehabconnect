"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex min-h-screen items-center justify-center overflow-hidden bg-[var(--background)] font-sans">
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/10 blur-3xl" />

      <div className="relative z-10 flex flex-col items-center space-y-6">

        {/* Animated Logo */}
        <div className="relative flex items-center justify-center">

          {/* Pulsing outer ring */}
          <motion.div
            className="absolute -inset-4 rounded-full border border-[var(--gold)]/30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Spinning ring */}
          <motion.div
            className="absolute -inset-2 rounded-full border-2 border-transparent border-t-[var(--gold)] border-r-[var(--green)]"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Logo with Image */}
          <motion.div
            className="relative z-10 flex h-20 w-20 items-center justify-center rounded-md bg-[var(--background-secondary)] shadow-2xl overflow-hidden"
            animate={{
              scale: [0.96, 1.04, 0.96],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Image
              src="/rehab-nigeria-logo.png"
              alt="Rehab Nigeria Logo"
              width={48}
              height={48}
              className="object-contain"
              priority
            />

            <span className="absolute -right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-[var(--green)] border-2 border-[var(--background)]" />
            <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-[var(--green)] border-2 border-[var(--background)]" />
          </motion.div>
        </div>

        {/* Brand */}
        <div className="space-y-1 text-center">
          <motion.h1
            className="font-cinzel text-xl font-extrabold tracking-wider text-[var(--foreground)] sm:text-2xl"
            animate={{
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            REHAB <span className="text-[var(--gold)]">NIGERIA</span>
          </motion.h1>

          <p className="font-mono text-[11px] uppercase tracking-widest text-[var(--foreground-muted)]">
            Loading...
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-[var(--gold)]"
              animate={{
                scale: [0.8, 1.4, 0.8],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>

      </div>
    </div>
  );
}