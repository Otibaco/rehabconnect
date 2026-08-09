import React from 'react';
import { motion } from 'framer-motion';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { SectionLabel } from '@/components/editorial/SectionLabel';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { HeartHandshake, ShieldAlert, Lock, CheckCircle2, AlertTriangle, ArrowUpRight, Users, Sparkles, PhoneCall } from 'lucide-react';
import Link from 'next/link';

export const ForFamiliesPage: React.FC = () => {
  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="FAMILY & LOVED ONES PATHWAY"
        title="YOU CAN CARE FOR SOMEONE WITHOUT KNOWING WHAT TO SAY."
        subtitle="Dedicated guidance helping parents, spouses, siblings, and relatives support a loved one experiencing substance use."
        breadcrumb="For Families"
      />

      {/* INTRODUCTION & PRIVACY BOUNDARIES — 60/40 ASYMMETRICAL LAYOUT */}
      <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <SectionLabel number="02" text="THE FAMILY ROLE" />
              
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight">
                RECOGNIZING THE NEED FOR SUPPORT BEFORE THEY DO.
              </h2>
              
              <div className="space-y-4 font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                <p>
                  Family members and concerned relatives often recognize changes in mood, health, sleep, or daily routines long before the person affected is ready to ask for help.
                </p>
                <p>
                  Trying to address substance use without guidance can lead to heated arguments, defensive walls, or feelings of helplessness. Rehab Nigeria provides a calm, professional advisory environment where family members can consult privately with a healthcare professional.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl group"
                >
                  <span>BOOK A FAMILY CONSULTATION</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <div className="px-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--accent-terracotta)] font-bold rounded-sm">
                  ✦ CONFIDENTIAL FAMILY GUIDANCE
                </div>
              </div>
            </motion.div>

            {/* ASYMMETRIC PHOTOGRAPHY FRAME */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative group crosshair-corner">
                <div className="relative asymmetric-organic-frame overflow-hidden border border-[var(--border)] shadow-2xl h-[420px] sm:h-[480px]">
                  <img
                    src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200"
                    alt="Family support conversation"
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70"></div>
                </div>

                <div className="absolute -inset-4 border border-[var(--gold)]/30 asymmetric-organic-frame pointer-events-none -z-10"></div>
              </div>
            </motion.div>

          </div>

          {/* PRIVACY & ETHICAL BOUNDARIES BANNER */}
          <div className="p-8 sm:p-10 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-6 relative group crosshair-corner shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--background-tertiary)] text-[var(--gold)] border border-[var(--border-subtle)] rounded-sm">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-widest font-bold block">ETHICAL STANDARDS</span>
                <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[var(--foreground)]">
                  Important Privacy & Consent Notice
                </h3>
              </div>
            </div>

            <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
              While family members can initiate an onboarding inquiry or book a Family Advisory Consultation, Rehab Nigeria adheres strictly to ethical medical and legal guidelines:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs text-[var(--foreground-subtle)] pt-2 border-t border-[var(--border-subtle)]">
              <div className="p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-1">
                <span className="text-[var(--gold)] font-bold block">01 / VOLUNTARY CONSENT</span>
                <p className="font-sans text-xs text-[var(--foreground-muted)]">Family members cannot force involuntary clinical treatment.</p>
              </div>
              <div className="p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-1">
                <span className="text-[var(--gold)] font-bold block">02 / CONFIDENTIAL SESSION</span>
                <p className="font-sans text-xs text-[var(--foreground-muted)]">Patient medical consultations remain strictly private once engaged.</p>
              </div>
              <div className="p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-1">
                <span className="text-[var(--gold)] font-bold block">03 / CLINICAL PROTOCOLS</span>
                <p className="font-sans text-xs text-[var(--foreground-muted)]">Professional consent protocols apply in every session.</p>
              </div>
            </div>
          </div>

          {/* FAMILY PATHWAY STEPS */}
          <div className="space-y-10 pt-8 border-t border-[var(--border-subtle)]">
            <SectionLabel number="03" text="STEP-BY-STEP FAMILY PATHWAY" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-sans">
              
              <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--accent-terracotta)] rounded-sm space-y-4 transition-all group crosshair-corner shadow-xl">
                <span className="font-mono text-xs font-bold text-[var(--accent-terracotta)] block tracking-wider">
                  01 / INITIAL ONBOARDING
                </span>
                <h4 className="font-cinzel text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent-terracotta)] transition-colors">
                  Share Your Situation
                </h4>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Provide background details regarding your concerns, family dynamics, and observations to help our consultant prepare thoroughly.
                </p>
              </div>

              <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm space-y-4 transition-all group crosshair-corner shadow-xl">
                <span className="font-mono text-xs font-bold text-[var(--gold)] block tracking-wider">
                  02 / ADVISORY SESSION
                </span>
                <h4 className="font-cinzel text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                  Consult With A Specialist
                </h4>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Consult privately with a medical doctor or counsellor to learn effective communication strategies, boundary setting, and invitation methods.
                </p>
              </div>

              <div className="p-8 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--green-light)] rounded-sm space-y-4 transition-all group crosshair-corner shadow-xl">
                <span className="font-mono text-xs font-bold text-[var(--green-light)] block tracking-wider">
                  03 / PATIENT ENGAGEMENT
                </span>
                <h4 className="font-cinzel text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--green-light)] transition-colors">
                  Connecting Your Loved One
                </h4>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  Extend a respectful, stigma-free invitation for your loved one to join their private, individual consultation session when they feel ready.
                </p>
              </div>

            </div>
          </div>

          {/* ACUTE EMERGENCY NOTICE */}
          <div className="p-8 bg-[var(--background-tertiary)] border border-[var(--accent-terracotta)]/50 rounded-sm flex flex-col md:flex-row gap-6 items-start shadow-2xl">
            <div className="p-3 bg-[var(--accent-terracotta)]/20 text-[var(--accent-terracotta)] rounded-sm shrink-0">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2 font-sans">
              <h4 className="font-cinzel text-lg font-bold text-[var(--foreground)]">
                Recognizing Acute Physical Medical Emergencies
              </h4>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                If your loved one is currently experiencing severe respiratory depression, loss of consciousness due to overdose, severe physical seizures, acute psychosis, or immediate risk of violence/self-harm, <strong className="text-[var(--foreground)] font-bold">do not wait for an online appointment.</strong> Seek immediate physical hospital emergency care.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
