import React from 'react';
import { motion } from 'framer-motion';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { PricingHighlight } from '@/components/editorial/PricingHighlight';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { servicesData } from '@/lib/data';
import { ArrowUpRight, CheckCircle2, ShieldCheck, Clock, CreditCard, Sparkles } from 'lucide-react';
import Link from 'next/link';

export const ServicesPage: React.FC = () => {
  // Service category accent themes
  const categoryAccents = [
    { badge: 'PRIMARY CARE', border: 'hover:border-[var(--gold)]', color: 'text-[var(--gold)]', bg: 'bg-[var(--gold)]/10' },
    { badge: 'CLINICAL EVALUATION', border: 'hover:border-[var(--accent-terracotta)]', color: 'text-[var(--accent-terracotta)]', bg: 'bg-[var(--accent-terracotta)]/10' },
    { badge: 'CONTINUOUS RECOVERY', border: 'hover:border-[var(--accent-amber)]', color: 'text-[var(--accent-amber)]', bg: 'bg-[var(--accent-amber)]/10' },
    { badge: 'FAMILY ADVOCACY', border: 'hover:border-[var(--green-light)]', color: 'text-[var(--green-light)]', bg: 'bg-[var(--green)]/10' },
  ];

  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="CLINICAL SERVICES OVERVIEW"
        title="CARE DESIGNED AROUND THE PERSON."
        subtitle="Comprehensive digital rehabilitation consultation, clinical assessment, family guidance, and sustained recovery support."
        breadcrumb="Services"
      />

      {/* SERVICES LIST — EDITORIAL ASYMMETRICAL 60/40 COMPOSITION */}
      <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-28 relative z-10">
          
          {servicesData.map((service, index) => {
            const isEven = index % 2 === 0;
            const accent = categoryAccents[index % categoryAccents.length];

            return (
              <motion.div
                key={service.id}
                id={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center border-b border-[var(--border-subtle)] pb-24 last:border-0 last:pb-0`}
              >
                
                {/* TEXT CONTENT — 60/40 ASYMMETRICAL COLUMN */}
                <div className={`lg:col-span-7 space-y-6 ${isEven ? '' : 'lg:order-2'}`}>
                  
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-4xl font-extrabold text-[var(--gold)]">
                      {service.number}
                    </span>
                    <span className={`px-3 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] font-mono text-[10px] font-bold uppercase tracking-wider rounded-sm ${accent.color}`}>
                      ✦ {accent.badge}
                    </span>
                  </div>

                  <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)] leading-tight">
                    {service.title}
                  </h2>

                  <p className="font-mono text-xs text-[var(--gold-light)] uppercase tracking-wider">
                    {service.subtitle}
                  </p>

                  <p className="font-sans text-sm sm:text-base text-[var(--foreground-muted)] leading-relaxed">
                    {service.fullDescription}
                  </p>

                  {/* KEY HIGHLIGHTS & BENEFITS */}
                  <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-3 font-sans text-xs">
                    <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-widest font-bold block mb-1">
                      CLINICAL HIGHLIGHTS & OUTCOMES:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--foreground)]">
                      {service.benefits.slice(0, 4).map((benefit, bIdx) => (
                        <div key={bIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                          <span className="leading-tight">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTION BUTTONS & FEE */}
                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl group"
                    >
                      <span>READ COMPLETE SERVICE GUIDE</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </Link>

                    {service.fee && (
                      <div className="px-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--foreground)] rounded-sm flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[var(--gold)]" />
                        <span>Fee: <strong className="text-[var(--gold-light)]">{service.fee}</strong></span>
                      </div>
                    )}
                  </div>

                </div>

                {/* PHOTOGRAPHY FRAME — ASYMMETRIC MASK */}
                <div className={`lg:col-span-5 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="relative group crosshair-corner">
                    
                    <div className={`relative overflow-hidden ${isEven ? 'arch-frame' : 'asymmetric-organic-frame'} border border-[var(--border)] shadow-2xl h-[400px] sm:h-[480px]`}>
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70"></div>
                    </div>

                    {/* Gold Geometric Frame Outline */}
                    <div className={`absolute -inset-4 border border-[var(--gold)]/30 ${isEven ? 'arch-frame' : 'asymmetric-organic-frame'} pointer-events-none -z-10`}></div>

                    {/* Target Audience Tag */}
                    <div className="absolute -bottom-4 left-4 right-4 bg-[var(--background-secondary)]/95 backdrop-blur-md border border-[var(--gold)] p-4 rounded-sm shadow-xl font-sans text-xs">
                      <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider block font-bold mb-1">RECOMMENDED FOR:</span>
                      <p className="text-[var(--foreground-muted)] line-clamp-2">{service.targetAudience}</p>
                    </div>

                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>
      </section>

      {/* PRICING HIGHLIGHT */}
      <PricingHighlight />

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
