"use client"
import React from 'react';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { SectionLabel } from '@/components/editorial/SectionLabel';
import { ProfessionalProfile } from '@/components/editorial/ProfessionalProfile';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { professionalsData } from '@/lib/data';
import { ShieldCheck, UserPlus, Award, Stethoscope, HeartHandshake } from 'lucide-react';
import Link from 'next/link';

export const ProfessionalsPage: React.FC = () => {
  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="CLINICAL NETWORK DIRECTORY"
        title="THE PEOPLE BEHIND THE CARE."
        subtitle="Rehab Nigeria is building a nationwide professional network dedicated to supporting individuals and families affected by substance use."
        breadcrumb="Professionals"
      />

      {/* INTRODUCTION & NETWORK OVERVIEW */}
      <section className="py-20 md:py-28 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Architectural Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel number="02" text="QUALIFIED CLINICAL NETWORK" />
              
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight">
                COMPASSIONATE CLINICAL GOVERNANCE.
              </h2>
              
              <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                Our platform connects patients directly with licensed healthcare professionals across Nigeria. From initial history intake to specialized therapy and ongoing follow-up care, our team brings empathetic, evidence-based care straight to your device.
              </p>

              <div className="flex flex-wrap gap-3 font-mono text-xs pt-2">
                <span className="px-3.5 py-1.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] font-bold rounded-sm">✦ Medical Doctors</span>
                <span className="px-3.5 py-1.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--accent-terracotta)] font-bold rounded-sm">✦ Clinical Psychologists</span>
                <span className="px-3.5 py-1.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--accent-amber)] font-bold rounded-sm">✦ Certified Addiction Counsellors</span>
                <span className="px-3.5 py-1.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--green-light)] font-bold rounded-sm">✦ Mental Health Specialists</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 bg-[var(--background)] border border-[var(--border)] rounded-sm space-y-4 relative group crosshair-corner shadow-2xl">
              <div className="w-12 h-12 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
                Credential Verification Guarantee
              </h3>
              <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
                All consultants registered on the Rehab Nigeria platform undergo strict verification of medical licenses, clinical certifications, and ethical compliance before conducting patient consultations.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* PROFESSIONALS DIRECTORY LIST */}
      <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="space-y-4 max-w-2xl">
            <SectionLabel number="03" text="ACTIVE CONSULTANT DIRECTORY" />
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
              MEET OUR CONSULTANTS
            </h2>
          </div>

          <div className="space-y-12">
            {professionalsData.map((prof) => (
              <ProfessionalProfile key={prof.id} professional={prof} />
            ))}
          </div>

          {/* JOIN THE NETWORK CTA FOR PROFESSIONALS */}
          <div className="p-8 sm:p-12 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex flex-col md:flex-row items-center justify-between gap-8 relative group crosshair-corner shadow-2xl">
            <div className="space-y-3 text-center md:text-left">
              <span className="font-mono text-xs text-[var(--gold)] font-bold tracking-widest uppercase block">
                ARE YOU A LICENSED HEALTHCARE PROFESSIONAL?
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                Join The Rehab Nigeria Clinical Network
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] max-w-xl leading-relaxed">
                We are actively expanding our clinical team across all 36 Nigerian states. If you are a licensed medical doctor, psychiatrist, psychologist, or certified counsellor, get in touch to discuss consulting opportunities.
              </p>
            </div>

            <Link
              href="/contact"
              className="px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl shrink-0 flex items-center gap-2 group"
            >
              <UserPlus className="w-4 h-4" />
              <span>APPLY TO JOIN NETWORK</span>
            </Link>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
