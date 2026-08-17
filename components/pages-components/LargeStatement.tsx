import React from 'react';
import { motion } from 'framer-motion';

interface LargeStatementProps {
  words?: string[];
  subtext?: string;
}

export const LargeStatement: React.FC<LargeStatementProps> = ({
  words = ['PRIVATE.', 'PROFESSIONAL.', 'HUMAN.', 'ACCESSIBLE.'],
  subtext = 'Designed from the ground up for dignified, confidential online rehabilitation care across Nigeria.',
}) => {
  return (
    <section className="py-28 md:py-40 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
      
      {/* Background Architectural Grid & Subtle Image Texture */}
      <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none"></div>
      
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000"
          alt="Institutional texture"
          className="w-full h-full object-cover filter contrast-125 brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-[var(--background-secondary)]"></div>
      </div>

      {/* OVERSIZED WATERMARK TYPOGRAPHY */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-cinzel text-[10rem] sm:text-[18rem] font-black text-[var(--gold)]/5 tracking-widest leading-none">
          REHAB
        </span>
      </div>

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* TOP ASYMMETRIC GEOMETRIC MARKS */}
        <div className="flex items-center justify-between mb-16 opacity-60">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-[var(--gold)]"></span>
            <span className="font-mono text-[10px] text-[var(--gold)] tracking-widest uppercase">CORE VALUES & PHILOSOPHY</span>
          </div>
          <div className="hidden sm:block w-32 h-[1px] bg-gradient-to-r from-[var(--gold)] to-transparent"></div>
        </div>

        {/* STAGGERED EDITORIAL WORDS */}
        <div className="space-y-4 sm:space-y-6">
          {words.map((word, idx) => (
            <motion.div
              key={word}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className={`flex ${idx % 2 === 0 ? 'justify-start' : 'justify-end md:pr-12'}`}
            >
              <h2 className="font-cinzel text-4xl sm:text-7xl md:text-8xl font-black tracking-tight text-[var(--foreground)] hover:text-[var(--gold)] transition-colors duration-500">
                {word}
              </h2>
            </motion.div>
          ))}
        </div>

        {subtext && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 pt-8 border-t border-[var(--border-subtle)] max-w-2xl mx-auto text-center space-y-3"
          >
            <p className="text-base sm:text-lg font-sans text-[var(--foreground-muted)] leading-relaxed">
              {subtext}
            </p>
            <span className="font-mono text-xs text-[var(--gold)] block tracking-widest uppercase">
              ✦ REHAB NIGERIA DIGITAL HEALTH INITIATIVE
            </span>
          </motion.div>
        )}

      </div>
    </section>
  );
};

