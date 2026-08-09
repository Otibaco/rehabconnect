"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { SectionLabel } from '@/components/editorial/SectionLabel';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { siteConfig } from '@/lib/config';
import { ShieldCheck, CheckCircle2, ArrowUpRight, Lock, CreditCard, Video, Calendar, Sparkles, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export const HowItWorksPage: React.FC = () => {
  const journeyStages = [
    {
      number: '01',
      title: 'DISCOVER',
      subtitle: 'Learn about Rehab Nigeria and our digital care model',
      description: 'Explore our platform to understand our non-stigmatizing digital consultation model, evidence-based services, and strict privacy safeguards.',
      badge: 'EXPLORATION',
      icon: ShieldCheck
    },
    {
      number: '02',
      title: 'REGISTER',
      subtitle: 'Create your confidential user account',
      description: 'Register securely with your preferred contact email or phone. Individual patient and family member account options are available.',
      badge: 'SECURE ACCOUNT',
      icon: Lock
    },
    {
      number: '03',
      title: 'ONBOARD',
      subtitle: 'Provide background and medical history context',
      description: 'Complete a private online background intake form detailing relevant history, challenges, and goals to help your assigned consultant prepare thoroughly.',
      badge: 'CLINICAL INTAKE',
      icon: CheckCircle2
    },
    {
      number: '04',
      title: 'BOOK',
      subtitle: 'Select an appointment slot that suits your schedule',
      description: 'Choose a convenient date and time for your private virtual video consultation with a qualified medical or psychological professional.',
      badge: 'FLEXIBLE SCHEDULE',
      icon: Calendar
    },
    {
      number: '05',
      title: 'PAY',
      subtitle: 'Complete secure consultation fee payment',
      description: `Pay the standard ₦${siteConfig.consultationFee} consultation fee via encrypted Nigerian card, bank transfer, or USSD gateway.`,
      badge: 'ENCRYPTED PAYMENT',
      icon: CreditCard
    },
    {
      number: '06',
      title: 'CONSULT',
      subtitle: 'Attend your private 1-on-1 video session',
      description: 'Join your assigned healthcare consultant in a private, encrypted virtual video room. Receive an empathetic assessment and a personalized recovery roadmap.',
      badge: '1-ON-1 VIRTUAL CARE',
      icon: Video
    },
    {
      number: '07',
      title: 'FOLLOW UP',
      subtitle: 'Sustain your momentum with ongoing care',
      description: 'Schedule recommended follow-up counseling sessions, access lifestyle planning guides, and track long-term progress with continuous professional support.',
      badge: 'SUSTAINED RECOVERY',
      icon: ArrowUpRight
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="THE COMPLETE PATIENT JOURNEY"
        title="HOW REHAB NIGERIA WORKS."
        subtitle="A clear, confidential 7-stage pathway designed to give you dignified professional care from the comfort of your home."
        breadcrumb="How It Works"
      />

      {/* CONSULTATION FEE BANNER */}
      <section className="py-8 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] rounded-sm">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[var(--foreground-muted)] block text-[10px] uppercase">STANDARD ONLINE CONSULTATION FEE:</span>
              <span className="text-[var(--foreground)] font-bold text-sm sm:text-base">₦{siteConfig.consultationFee} PER SESSION</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[var(--green-light)] font-bold">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Includes Pre-Consultation History Review + 1-on-1 Virtual Video Call</span>
          </div>
        </div>
      </section>

      {/* 7-STAGE EDITORIAL TIMELINE */}
      <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
          
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <SectionLabel number="02" text="STEP-BY-STEP PATIENT PATHWAY" />
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
              SEVEN STEPS TO DIGNIFIED CARE.
            </h2>
          </div>

          {/* TIMELINE SPINES */}
          <div className="space-y-8 relative">
            
            {/* Vertical spine line */}
            <div className="hidden md:block absolute left-12 top-8 bottom-8 w-[1px] bg-[var(--border-subtle)] z-0"></div>

            {journeyStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.6, delay: idx * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 p-8 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm transition-all duration-300 relative z-10 group crosshair-corner shadow-xl"
                >
                  <div className="md:col-span-3 flex items-center gap-4">
                    <span className="font-mono text-4xl font-extrabold text-[var(--gold)] group-hover:scale-110 transition-transform">
                      {stage.number}
                    </span>
                    <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] rounded-sm group-hover:border-[var(--gold)] transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="md:col-span-9 space-y-2">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                        {stage.title}
                      </h3>
                      <span className="px-2.5 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[10px] font-mono text-[var(--gold-light)] font-bold uppercase tracking-wider rounded-sm">
                        {stage.badge}
                      </span>
                    </div>

                    <p className="font-mono text-xs text-[var(--foreground-subtle)] uppercase tracking-wider">
                      ✦ {stage.subtitle}
                    </p>

                    <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed pt-1">
                      {stage.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

          </div>

          {/* NEED HELP / FAQ HIGHLIGHT */}
          <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--background-tertiary)] text-[var(--gold)] rounded-sm border border-[var(--border-subtle)]">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-cinzel text-lg font-bold text-[var(--foreground)]">Have Questions About the Process?</h4>
                <p className="font-sans text-xs text-[var(--foreground-muted)]">Read our frequently asked questions or reach out to our team directly.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
              <Link
                href="/faq"
                className="px-5 py-3 bg-[var(--background-tertiary)] hover:bg-[var(--gold)] text-[var(--foreground)] hover:text-[#080907] border border-[var(--border-subtle)] font-bold rounded-sm transition-colors"
              >
                READ FAQ
              </Link>
              <Link
                href="/contact"
                className="px-5 py-3 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold rounded-sm transition-colors"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
