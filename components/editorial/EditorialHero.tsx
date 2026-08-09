"use client"
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { SectionLabel } from './SectionLabel';

interface EditorialHeroProps {
  number?: string;
  sectionLabel: string;
  title: string;
  subtitle?: string;
  breadcrumb?: string;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  number,
  sectionLabel,
  title,
  subtitle,
  breadcrumb = 'Home',
}) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-[var(--background)] border-b border-[var(--border)] overflow-hidden">
      {/* Background Image & Vignette */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=2000"
          alt="Clinical background texture"
          className="w-full h-full object-cover filter contrast-110 brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/70 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/90 via-[var(--background)]/60 to-transparent"></div>
      </div>

      {/* Grid Pattern and Ambient Glow */}
      <div className="absolute inset-0 bg-grid-subtle opacity-30 pointer-events-none"></div>
      <div className="absolute -top-20 right-10 w-96 h-96 bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* BREADCRUMB */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 text-xs font-mono text-[var(--foreground-subtle)] mb-8"
        >
          <Link href="/" className="hover:text-[var(--gold)] transition-colors">HOME</Link>
          <span>/</span>
          <span className="text-[var(--gold)]">{breadcrumb.toUpperCase()}</span>
        </motion.div>

        <div className="max-w-4xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <SectionLabel number={number} text={sectionLabel} />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[var(--foreground)] tracking-tight leading-[1.15]"
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-[var(--foreground-muted)] font-sans leading-relaxed max-w-2xl"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

      </div>
    </section>
  );
};
