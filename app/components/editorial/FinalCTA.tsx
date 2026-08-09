import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, PhoneCall } from 'lucide-react';
import { motion } from 'motion/react';

export const FinalCTA: React.FC = () => {
  return (
    <section className="relative py-32 md:py-44 bg-[var(--background-secondary)] border-b border-[var(--border)] overflow-hidden">
      
      {/* Background Photography Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=2000"
          alt="Rehab Nigeria visual background"
          className="w-full h-full object-cover filter contrast-110 brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-[var(--background-secondary)]/85 to-[var(--background-secondary)]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background-secondary)] via-transparent to-[var(--background-secondary)]"></div>
      </div>

      {/* OVERSIZED WATERMARK BRANDING */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span className="font-cinzel text-[10rem] sm:text-[18rem] font-black text-[var(--gold)]/5 tracking-widest leading-none">
          RECOVERY
        </span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-8">
        
        {/* GOLD ACCENT MARK */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="w-16 h-[2px] bg-[var(--gold)] mx-auto"
        ></motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-cinzel text-3xl sm:text-5xl lg:text-7xl font-black text-[var(--foreground)] tracking-tight leading-tight"
        >
          THE FIRST STEP CAN START ONLINE.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-base sm:text-xl font-sans text-[var(--foreground-muted)] max-w-2xl mx-auto leading-relaxed"
        >
          You do not have to navigate the first step alone. Connect with a qualified professional in a private, compassionate environment.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 font-mono text-xs"
        >
          <Link
            to="/how-it-works"
            className="w-full sm:w-auto px-10 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold tracking-wider rounded-sm transition-all shadow-2xl flex items-center justify-center gap-2 group"
          >
            <span>START YOUR JOURNEY</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            to="/contact"
            className="w-full sm:w-auto px-10 py-4 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border-subtle)] font-bold tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
          >
            <PhoneCall className="w-4 h-4 text-[var(--gold)]" />
            <span>CONTACT REHAB NIGERIA</span>
          </Link>
        </motion.div>

        {/* INSTITUTIONAL FOOTNOTE */}
        <div className="pt-8 text-[11px] font-mono text-[var(--foreground-subtle)] tracking-wider">
          ✦ REHAB NIGERIA • CONFIDENTIAL DIGITAL REHABILITATION PLATFORM
        </div>

      </div>
    </section>
  );
};

