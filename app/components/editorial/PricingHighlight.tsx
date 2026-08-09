import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowUpRight, Check } from 'lucide-react';
import { siteConfig } from '../../lib/config';
import { motion } from 'motion/react';

export const PricingHighlight: React.FC = () => {
  return (
    <section className="py-28 md:py-40 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none"></div>
      
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* LEFT: ARCHITECTURAL PHOTO COMPOSITION */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative group crosshair-corner">
              
              {/* Arched Photo Frame */}
              <div className="relative overflow-hidden arch-frame border border-[var(--border)] shadow-2xl h-[420px] sm:h-[480px]">
                <img
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
                  alt="Doctor consultation room"
                  className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-transparent opacity-80"></div>
              </div>

              {/* Offset Gold Geometry Frame */}
              <div className="absolute -inset-4 border border-[var(--gold)]/30 arch-frame pointer-events-none -z-10"></div>

              {/* Overlapping Badge */}
              <div className="absolute -bottom-6 -right-2 sm:-right-6 bg-[var(--background-tertiary)] border border-[var(--gold)] p-5 rounded-sm shadow-2xl space-y-1 max-w-[220px]">
                <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-widest block font-bold">INSTITUTIONAL FEE</span>
                <span className="font-cinzel text-xl font-bold text-[var(--foreground)]">FIXED & TRANSPARENT</span>
              </div>

            </div>
          </motion.div>

          {/* RIGHT: PRICING DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--gold)] uppercase tracking-widest rounded-sm">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>TRANSPARENT CARE FEE</span>
            </div>

            <div className="space-y-2">
              <span className="block text-xs font-mono text-[var(--foreground-subtle)] uppercase tracking-widest">
                1-ON-1 ONLINE REHABILITATION CONSULTATION
              </span>
              <div className="font-cinzel text-5xl sm:text-7xl lg:text-8xl font-black text-[var(--foreground)] tracking-tight">
                <span className="text-[var(--gold)]">₦</span>{siteConfig.consultationFee}
              </div>
            </div>

            <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed max-w-xl">
              One private online consultation with a qualified Rehab Nigeria professional. Includes confidential background review, clinical history intake, and personalized recovery guidance.
            </p>

            {/* CLINICAL INCLUSIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs text-[var(--foreground)] pt-2 border-t border-[var(--border-subtle)]">
              <div className="flex items-center gap-3 p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                <Check className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <span>100% Private Virtual Room</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                <Check className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <span>Confidential Onboarding Intake</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                <Check className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <span>Personalized Action Roadmap</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                <Check className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <span>Zero Physical Travel Required</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/how-it-works"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-2xl group"
              >
                <span>BOOK A CONSULTATION SESSION</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};

