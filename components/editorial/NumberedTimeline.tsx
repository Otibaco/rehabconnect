import React from 'react';
import { SectionLabel } from './SectionLabel';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Step {
  number: string;
  title: string;
  description: string;
  detail?: string;
  image?: string;
}

interface NumberedTimelineProps {
  steps?: Step[];
  showCTA?: boolean;
}

const defaultSteps: Step[] = [
  {
    number: '01',
    title: 'CREATE YOUR CONFIDENTIAL PROFILE',
    description: 'Register securely with your preferred contact information in seconds.',
    detail: 'Complete user privacy protection and encrypted account security.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1000'
  },
  {
    number: '02',
    title: 'CONFIDENTIAL ONBOARDING INTAKE',
    description: 'Fill out a private background history form detailing your circumstances.',
    detail: 'Can be initiated by individuals or concerned family members.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=1000'
  },
  {
    number: '03',
    title: 'SCHEDULE YOUR VIRTUAL SESSION',
    description: 'Select an available date and time slot for your 1-on-1 online consultation.',
    detail: 'Transparent consultation fee: ₦10,000 per session.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=1000'
  },
  {
    number: '04',
    title: 'MEET YOUR CONSULTANT PRIVATELY',
    description: 'Join your private, encrypted virtual consultation room with a qualified doctor or clinical specialist.',
    detail: 'Comprehensive evaluation & immediate personalized next steps.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1000'
  },
  {
    number: '05',
    title: 'CONTINUED CARE & RECOVERY PATHWAY',
    description: 'Access follow-up counseling sessions, recovery guides, and ongoing professional guidance.',
    detail: 'Structured progress monitoring without geographical barriers.',
    image: 'https://images.unsplash.com/photo-1527613426441-4da17471b66d?auto=format&fit=crop&q=80&w=1000'
  }
];

export const NumberedTimeline: React.FC<NumberedTimelineProps> = ({
  steps = defaultSteps,
  showCTA = true
}) => {
  return (
    <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
      
      {/* Background Subtle Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="max-w-3xl mb-20 space-y-4">
          <SectionLabel number="03" text="THE RECOVERY PATHWAY" />
          <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
            HELP CAN START FROM WHERE YOU ARE.
          </h2>
          <p className="text-base sm:text-lg font-sans text-[var(--foreground-muted)] leading-relaxed">
            A clear 5-stage online pathway engineered to offer privacy, dignity, and clinical clarity from day one.
          </p>
        </div>

        {/* ASYMMETRIC STAGGERED EDITORIAL TIMELINE */}
        <div className="space-y-24 relative">
          
          {/* VERTICAL CONTINUOUS GOLD CONNECTOR LINE */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[var(--gold)]/40 via-[var(--border)] to-transparent pointer-events-none -translate-x-1/2"></div>

          {steps.map((step, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* GIANT STEP NUMBER WATERMARK */}
                <div className="absolute -top-12 left-0 lg:left-auto font-mono text-7xl sm:text-9xl font-black text-[var(--gold)]/10 select-none pointer-events-none z-0">
                  {step.number}
                </div>

                {/* TEXT CONTENT BLOCK */}
                <div className={`lg:col-span-6 space-y-6 z-10 ${isEven ? 'lg:pr-8' : 'lg:order-2 lg:pl-8'}`}>
                  
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[11px] font-mono font-bold text-[var(--gold)] uppercase tracking-widest rounded-sm">
                      STAGE {step.number}
                    </span>
                    <span className="h-[1px] w-12 bg-[var(--gold)]/30"></span>
                  </div>

                  <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)] leading-snug">
                    {step.title}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[var(--foreground-muted)] leading-relaxed">
                    {step.description}
                  </p>

                  {step.detail && (
                    <div className="p-4 bg-[var(--background-secondary)] border-l-2 border-[var(--gold)] text-xs font-mono text-[var(--foreground-subtle)]">
                      ✦ {step.detail}
                    </div>
                  )}

                </div>

                {/* PHOTOGRAPHY COMPOSITION BLOCK WITH ARCHITECTURAL GEOMETRY */}
                <div className={`lg:col-span-6 z-10 ${isEven ? '' : 'lg:order-1'}`}>
                  <div className="relative group crosshair-corner">
                    
                    {/* Image frame with alternating organic corner curves */}
                    <div className={`relative overflow-hidden border border-[var(--border)] shadow-2xl h-[300px] sm:h-[380px] ${
                      isEven ? 'rounded-t-[100px] rounded-b-sm' : 'rounded-b-[100px] rounded-t-sm'
                    }`}>
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover filter brightness-90 contrast-105 group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-60"></div>
                    </div>

                    {/* Offset gold geometric frame line */}
                    <div className={`absolute -inset-3 border border-[var(--gold)]/30 pointer-events-none -z-10 ${
                      isEven ? 'rounded-t-[110px] rounded-b-sm' : 'rounded-b-[110px] rounded-t-sm'
                    }`}></div>

                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

        {showCTA && (
          <div className="mt-24 text-center">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl group"
            >
              <span>EXPLORE FULL CONSULTATION JOURNEY</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
        )}

      </div>
    </section>
  );
};

