"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { SectionLabel } from '@/components/editorial/SectionLabel';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { ShieldCheck, Heart, Lock, Users, Award, RefreshCw, ArrowUpRight, Compass, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const AboutPage: React.FC = () => {
  const values = [
    {
      title: 'DIGNITY',
      icon: Heart,
      badge: 'HUMAN-CENTERED',
      accentColor: 'border-[var(--accent-terracotta)]/40 hover:border-[var(--accent-terracotta)] text-[var(--accent-terracotta)]',
      bgHover: 'hover:bg-[var(--accent-terracotta)]/5',
      description: 'Every individual experiencing substance use deserves respectful, non-judgmental human care at every stage.'
    },
    {
      title: 'PRIVACY',
      icon: Lock,
      badge: 'CONFIDENTIALITY',
      accentColor: 'border-[var(--gold)]/40 hover:border-[var(--gold)] text-[var(--gold)]',
      bgHover: 'hover:bg-[var(--gold)]/5',
      description: 'Discreet, confidential digital architecture designed to protect user identity and medical history.'
    },
    {
      title: 'COMPASSION',
      icon: Users,
      badge: 'EMPATHY FIRST',
      accentColor: 'border-[var(--accent-amber)]/40 hover:border-[var(--accent-amber)] text-[var(--accent-amber)]',
      bgHover: 'hover:bg-[var(--accent-amber)]/5',
      description: 'Understanding the physical, emotional, and social complexities affecting individuals and their families.'
    },
    {
      title: 'PROFESSIONALISM',
      icon: Award,
      badge: 'CLINICAL EXCELLENCE',
      accentColor: 'border-[var(--green)]/40 hover:border-[var(--green)] text-[var(--green-light)]',
      bgHover: 'hover:bg-[var(--green)]/5',
      description: 'Clinical care delivered by qualified medical doctors, clinical psychologists, and certified addiction counsellors.'
    },
    {
      title: 'ACCESSIBILITY',
      icon: ShieldCheck,
      badge: 'NATIONWIDE REACH',
      accentColor: 'border-[var(--accent-teal)]/40 hover:border-[var(--accent-teal)] text-[var(--accent-teal)]',
      bgHover: 'hover:bg-[var(--accent-teal)]/5',
      description: 'Breaking geographical and financial barriers by bringing expert consultations online across Nigeria.'
    },
    {
      title: 'CONTINUITY',
      icon: RefreshCw,
      badge: 'LONG-TERM CARE',
      accentColor: 'border-[var(--accent-slate)]/40 hover:border-[var(--accent-slate)] text-[var(--foreground)]',
      bgHover: 'hover:bg-[var(--accent-slate)]/5',
      description: 'Supporting long-term recovery momentum through structured follow-up sessions and community reinforcement.'
    }
  ];

  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="INSTITUTIONAL OVERVIEW"
        title="ABOUT REHAB NIGERIA"
        subtitle="Connecting people to recovery through accessible, professional and private online rehabilitation support across all states."
        breadcrumb="About"
      />

      {/* OUR STORY & THE PROBLEM — 60/40 ASYMMETRIC COMPOSITION */}
      <section id="story" className="py-28 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Subtle Background Architectural Grid */}
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
              <SectionLabel number="02" text="OUR FOUNDING STORY" />
              
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight">
                BRIDGING THE GAP IN NIGERIAN REHABILITATION CARE.
              </h2>
              
              <div className="space-y-4 font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                <p>
                  Rehab Nigeria was founded by a Nigerian medical doctor who witnessed first-hand the devastating impacts of substance use disorder—and the overwhelming social barriers that keep people from seeking help.
                </p>
                <p>
                  Across Nigeria, thousands of individuals and families suffer in silence. Traditional physical rehabilitation centres, while valuable, often carry immense social stigma, fear of public exposure, prohibitive travel distances, or overwhelming costs.
                </p>
                <p>
                  Rehab Nigeria was created to pioneer a modern, digital-first rehabilitation institution—offering a discreet, dignified starting point where anyone can consult privately with a medical professional from their phone or computer.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-6 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl group"
                >
                  <span>SEE PATIENT JOURNEY</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>

                <div className="px-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--gold)] font-bold rounded-sm">
                  ✦ FOUNDED BY MEDICAL PROFESSIONALS
                </div>
              </div>
            </motion.div>

            {/* ASYMMETRIC OFFSET PHOTO FRAME WITH OVERLAPPING BADGE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative"
            >
              <div className="relative group crosshair-corner">
                
                {/* Arch Frame */}
                <div className="relative overflow-hidden arch-frame border border-[var(--border)] shadow-2xl h-[420px] sm:h-[500px]">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200"
                    alt="Rehab Nigeria clinical setting"
                    className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-80"></div>
                </div>

                {/* Offset Decorative Frame */}
                <div className="absolute -inset-4 border border-[var(--gold)]/30 arch-frame pointer-events-none -z-10"></div>

                {/* Overlapping Institutional Quote Badge */}
                <div className="absolute -bottom-6 -left-4 sm:-left-8 bg-[var(--background-secondary)] border border-[var(--border)] p-5 rounded-sm shadow-2xl space-y-2 max-w-[280px]">
                  <div className="flex items-center gap-2 text-[var(--accent-terracotta)] font-mono text-[10px] font-bold uppercase tracking-widest">
                    <Compass className="w-3.5 h-3.5" />
                    <span>FOUNDATIONAL MANDATE</span>
                  </div>
                  <p className="font-sans text-xs text-[var(--foreground)] italic leading-relaxed">
                    "Every Nigerian deserves access to dignified, non-judgmental rehabilitation guidance without fear or shame."
                  </p>
                </div>

              </div>
            </motion.div>

          </div>

          {/* THE PROBLEM BREAKDOWN — GRID WITH SECONDARY ACCENT STYLING */}
          <div className="p-8 sm:p-12 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-10 relative group crosshair-corner shadow-2xl">
            
            <div className="max-w-2xl space-y-3">
              <SectionLabel number="03" text="CORE CHALLENGES WE ADDRESS" />
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                THE BARRIERS TO TRADITIONAL REHABILITATION CARE
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 font-sans text-xs">
              
              <div className="p-6 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-terracotta)] rounded-sm space-y-3 transition-colors group">
                <span className="font-mono text-xs font-bold text-[var(--accent-terracotta)] block tracking-wider">
                  01 / STIGMA & SHAME
                </span>
                <p className="text-[var(--foreground-muted)] leading-relaxed">
                  Fear of social judgment or family disgrace prevents many affected individuals from visiting physical clinics in person.
                </p>
              </div>

              <div className="p-6 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--gold)] rounded-sm space-y-3 transition-colors group">
                <span className="font-mono text-xs font-bold text-[var(--gold)] block tracking-wider">
                  02 / GEOGRAPHICAL DISTANCE
                </span>
                <p className="text-[var(--foreground-muted)] leading-relaxed">
                  Quality rehabilitation specialists are concentrated in major urban centers, leaving regional states underserved.
                </p>
              </div>

              <div className="p-6 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--accent-amber)] rounded-sm space-y-3 transition-colors group">
                <span className="font-mono text-xs font-bold text-[var(--accent-amber)] block tracking-wider">
                  03 / CONFIDENTIALITY FEARS
                </span>
                <p className="text-[var(--foreground-muted)] leading-relaxed">
                  Concerns over privacy leakages or public waiting rooms deter high-profile or privacy-conscious individuals.
                </p>
              </div>

              <div className="p-6 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--green-light)] rounded-sm space-y-3 transition-colors group">
                <span className="font-mono text-xs font-bold text-[var(--green-light)] block tracking-wider">
                  04 / FAMILY HELPLESSNESS
                </span>
                <p className="text-[var(--foreground-muted)] leading-relaxed">
                  Concerned relatives often lack a structured, compassionate pathway to initiate professional support for loved ones.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* OUR VALUES — DISTINCT CARD ACCENTS */}
      <section id="values" className="py-28 md:py-36 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          
          <div className="max-w-3xl space-y-4">
            <SectionLabel number="04" text="INSTITUTIONAL PILLARS" />
            <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[var(--foreground)]">
              OUR VALUES.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
              Every decision, consultation, and feature built on the Rehab Nigeria platform is grounded in these core ethical principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((val) => {
              const Icon = val.icon;
              return (
                <div
                  key={val.title}
                  className={`p-8 bg-[var(--background-tertiary)] border ${val.accentColor} ${val.bgHover} rounded-sm space-y-5 transition-all duration-300 relative group flex flex-col justify-between`}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[var(--background)] border border-[var(--border-subtle)] text-[var(--foreground)] rounded-sm">
                        <Icon className="w-5 h-5 text-[var(--gold)]" />
                      </div>
                      <span className="font-mono text-[10px] tracking-widest font-bold uppercase opacity-75">
                        {val.badge}
                      </span>
                    </div>

                    <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)] tracking-wide">
                      {val.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                      {val.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center gap-2 text-[10px] font-mono text-[var(--gold)]">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>EMBEDDED IN CLINICAL PRACTICE</span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* VISION & MISSION — EDITORIAL BANNER */}
      <section className="py-28 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* OVERSIZED WATERMARK */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="font-cinzel text-[10rem] sm:text-[18rem] font-black text-[var(--gold)]/5 tracking-widest leading-none">
            PURPOSE
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <div className="p-10 sm:p-12 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-6 relative group crosshair-corner shadow-2xl">
              <SectionLabel number="05" text="LONG-TERM VISION" />
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                OUR VISION
              </h3>
              <p className="font-sans text-base text-[var(--foreground-muted)] leading-relaxed italic">
                "To make professional, compassionate rehabilitation support easier to access for individuals and families across Nigeria, setting a new benchmark for digital health dignity."
              </p>
              <div className="pt-2 font-mono text-xs text-[var(--gold)] font-bold">
                ✦ BORDERLESS NIGERIAN CARE
              </div>
            </div>

            <div className="p-10 sm:p-12 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-6 relative group crosshair-corner shadow-2xl">
              <SectionLabel number="06" text="OUR DAILY PURPOSE" />
              <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                OUR MISSION
              </h3>
              <p className="font-sans text-base text-[var(--foreground-muted)] leading-relaxed italic">
                "To provide a trusted, confidential digital pathway that connects people seeking recovery with qualified medical and psychological professionals, changing lives through human connection."
              </p>
              <div className="pt-2 font-mono text-xs text-[var(--green-light)] font-bold">
                ✦ COMPASSION IN PRACTICE
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
