import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, HeartHandshake, Lock, Sparkles, ChevronDown } from 'lucide-react';
import { SectionLabel } from '@/components/editorial/SectionLabel';
import { LargeStatement } from '@/components/editorial/LargeStatement';
import { NumberedTimeline } from '@/components/editorial/NumberedTimeline';
import { PricingHighlight } from '@/components/editorial/PricingHighlight';
import { FAQAccordion } from '@/components/editorial/FAQAccordion';
import { ResourceList } from '@/components/editorial/ResourceList';
import { ProfessionalProfile } from '@/components/editorial/ProfessionalProfile';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { HeroBackgroundSlider } from '@/components/editorial/HeroBackgroundSlider';
import { servicesData, professionalsData, faqsData, resourceArticles, socialChallengesData } from '@/lib/data';
import { siteConfig } from '@/lib/config';
import Link from 'next/link';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      
      {/* SECTION 01 — HERO */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex items-center pt-28 pb-20 bg-[var(--background)] border-b border-[var(--border)] overflow-hidden">
        
        {/* Full-width smooth crossfade background image slider */}
        <HeroBackgroundSlider />

        {/* Ambient Subtle Gold Glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-4xl space-y-8">
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionLabel number="01" text="DIGITAL REHABILITATION PLATFORM" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="font-cinzel text-4xl sm:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] tracking-tight leading-[1.1] gold-border-glow"
            >
              RECOVERY STARTS WITH A CONVERSATION.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-lg sm:text-2xl font-sans text-[var(--foreground-muted)] font-normal max-w-2xl leading-relaxed"
            >
              Private online rehabilitation consultation for individuals and families affected by substance use.
            </motion.p>

            {/* CTAS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 font-mono text-xs"
            >
              <Link
                href="/how-it-works"
                className="px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold tracking-wider rounded-sm transition-all shadow-2xl flex items-center justify-center gap-2 group"
              >
                <span>START YOUR JOURNEY</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/how-it-works"
                className="px-8 py-4 bg-[var(--background-tertiary)]/80 backdrop-blur-md hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border-subtle)] font-bold tracking-wider rounded-sm transition-colors text-center"
              >
                HOW IT WORKS
              </Link>
            </motion.div>

            {/* QUICK HIGHLIGHTS */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-8 border-t border-[var(--border-subtle)] grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs font-mono text-[var(--foreground-subtle)]"
            >
              <div>
                <span className="text-[var(--gold)] font-bold block">100% PRIVATE</span>
                <span>Discreet virtual access</span>
              </div>
              <div>
                <span className="text-[var(--gold)] font-bold block">QUALIFIED CARE</span>
                <span>Medical professionals</span>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <span className="text-[var(--gold)] font-bold block">CONSULTATION</span>
                <span>₦{siteConfig.consultationFee} per session</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* SCROLL INDICATOR — Smooth Subtle Pulse */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[10px] font-mono text-[var(--foreground-subtle)] opacity-80">
          <span className="tracking-widest uppercase">SCROLL</span>
          <ChevronDown className="w-4 h-4 text-[var(--gold)] animate-pulse" />
        </div>

      </section>

      {/* SECTION 02 — INTRODUCTION */}
      <section className="py-28 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Background Subtle Architectural Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 space-y-6"
            >
              <SectionLabel number="01" text="WHY REHAB NIGERIA" />

              <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
                Sometimes the hardest step is asking for help.
              </h2>

              <div className="space-y-4 font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                <p>
                  Substance use can affect individuals, families and communities in ways that are difficult to talk about. Fear of judgement, stigma, distance and the difficulty of approaching a physical centre can prevent people from seeking support.
                </p>
                <p>
                  Rehab Nigeria creates a private online starting point where individuals and families can begin a conversation with a qualified professional.
                </p>
              </div>

              <div className="pt-4 flex items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--gold)] hover:text-[var(--gold-light)] font-bold tracking-wider uppercase group"
                >
                  <span>LEARN MORE ABOUT OUR MISSION</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* ARCHITECTURAL ARCHED IMAGE COMPOSITION */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 relative"
            >
              <div className="relative group crosshair-corner">
                
                {/* Arched Photo Frame */}
                <div className="relative overflow-hidden arch-frame border border-[var(--border)] shadow-2xl h-[400px] sm:h-[480px]">
                  <img
                    src="https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200"
                    alt="Thoughtful individual in quiet environment"
                    className="w-full h-full object-cover filter contrast-105 brightness-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent opacity-70"></div>
                </div>

                {/* Gold Frame Lines Offset */}
                <div className="absolute -inset-4 border border-[var(--gold)]/30 arch-frame pointer-events-none -z-10"></div>

                {/* Overlapping Institutional Quote */}
                <div className="absolute -bottom-6 -left-2 sm:-left-6 bg-[var(--background-secondary)] border border-[var(--gold)] p-5 rounded-sm shadow-2xl space-y-1 max-w-[280px]">
                  <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-widest block font-bold">STIGMA-FREE ACCESS</span>
                  <p className="font-sans text-xs text-[var(--foreground)] italic">
                    "Dignity, privacy, and clinical guidance without geographical boundaries."
                  </p>
                </div>

              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 03 — BRAND STATEMENT */}
      <LargeStatement />

      {/* SECTION 04 — HOW IT WORKS PREVIEW */}
      <NumberedTimeline showCTA={true} />

      {/* SECTION 05 — ONLINE CONSULTATION */}
      <section className="py-28 md:py-36 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Architectural Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 space-y-8"
            >
              <SectionLabel number="04" text="ONLINE CONSULTATION" />

              <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
                A PRIVATE SPACE FOR THE CONVERSATION THAT MATTERS.
              </h2>

              <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                Connect with a qualified consultant through a secure virtual consultation designed to give you complete privacy and peace of mind.
              </p>

              <div className="space-y-4 font-mono text-xs text-[var(--foreground)] pt-2">
                <div className="flex items-center gap-3 p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                  <Lock className="w-5 h-5 text-[var(--gold)] shrink-0" />
                  <span>Secure Account Access & Confidential Profile</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                  <ShieldCheck className="w-5 h-5 text-[var(--gold)] shrink-0" />
                  <span>Comprehensive Onboarding Background Intake</span>
                </div>
                <div className="flex items-center gap-3 p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                  <Sparkles className="w-5 h-5 text-[var(--gold)] shrink-0" />
                  <span>1-on-1 Virtual Video Consultation Room</span>
                </div>
              </div>

              <div className="pt-4">
                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl group"
                >
                  <span>BOOK A CONSULTATION SESSION</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* ASYMMETRIC PHOTOGRAPHY OVERLAP */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative group crosshair-corner">
                <div className="relative rounded-t-sm rounded-b-[100px] overflow-hidden border border-[var(--border)] shadow-2xl h-[420px] sm:h-[480px]">
                  <img
                    src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200"
                    alt="Doctor patient online consultation"
                    className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-transparent opacity-70"></div>
                </div>

                <div className="absolute -inset-4 border border-[var(--gold)]/30 rounded-t-sm rounded-b-[110px] pointer-events-none -z-10"></div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SECTION 06 — FOR FAMILIES */}
      <section className="py-28 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 lg:order-2 space-y-6"
            >
              <SectionLabel number="05" text="SUPPORT FOR LOVED ONES" />

              <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
                WHAT IF THEY AREN'T READY TO ASK FOR HELP?
              </h2>

              <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                Families and concerned loved ones may sometimes recognize the need for support before the person affected is ready to seek it themselves.
              </p>

              <p className="font-sans text-sm text-[var(--foreground-muted)] leading-relaxed">
                Rehab Nigeria allows a family member to initiate an onboarding conversation with a qualified professional to receive family guidance and learn how to navigate consent, privacy, and supportive next steps respectfully.
              </p>

              <div className="pt-4">
                <Link
                  href="/for-families"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--background-tertiary)] hover:bg-[var(--gold)] text-[var(--foreground)] hover:text-[#080907] border border-[var(--border-subtle)] font-mono text-xs font-bold tracking-wider rounded-sm transition-all group"
                >
                  <span>SUPPORTING A LOVED ONE</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* ORGANIC ASYMMETRIC PHOTOGRAPHY FRAME */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-6 lg:order-1 relative"
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
        </div>
      </section>

      {/* SECTION 07 — PROFESSIONALS */}
      <section className="py-24 md:py-32 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <SectionLabel number="06" text="OUR CLINICAL TEAM" />
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)]">
              THE PEOPLE BEHIND THE CARE.
            </h2>
            <p className="font-sans text-base text-[var(--foreground-muted)] leading-relaxed">
              Rehab Nigeria is building a nationwide professional network of medical doctors, clinical psychologists, counsellors, and addiction specialists dedicated to compassionate care.
            </p>
          </div>

          <div className="space-y-6">
            {professionalsData.map((prof) => (
              <ProfessionalProfile key={prof.id} professional={prof} />
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/professionals"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--gold)] hover:text-[var(--gold-light)] font-bold tracking-wider uppercase"
            >
              <span>MEET ALL OUR PROFESSIONALS</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 08 — CONSULTATION PRICE */}
      <PricingHighlight />

      {/* SECTION 09 — PRIVACY & TRUST */}
      <section className="py-28 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* OVERSIZED WATERMARK TYPOGRAPHY */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
          <span className="font-cinzel text-[10rem] sm:text-[16rem] font-black text-[var(--gold)]/5 tracking-widest leading-none">
            CONFIDENTIAL
          </span>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <SectionLabel number="07" text="CONFIDENTIALITY GUARANTEE" />

              <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
                YOUR STORY DESERVES PRIVACY.
              </h2>

              <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                Rehabilitation involves deeply personal information. Rehab Nigeria is engineered with stringent data encryption and responsible handling of user information in mind at every stage.
              </p>

              <div className="flex items-center gap-8 font-mono text-xs text-[var(--gold)] pt-4">
                <Link href="/privacy-policy" className="hover:underline flex items-center gap-1.5 font-bold">
                  <span>PRIVACY POLICY</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link href="/terms-of-use" className="hover:underline flex items-center gap-1.5 font-bold">
                  <span>TERMS OF USE</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-[var(--background-secondary)] border border-[var(--border)] p-8 sm:p-10 rounded-sm space-y-6 relative group crosshair-corner shadow-2xl">
              <div className="w-12 h-12 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">
                Institutional Data Security & Clinical Privacy
              </h3>
              <p className="font-sans text-sm text-[var(--foreground-muted)] leading-relaxed">
                Patient onboarding data and consultation records are restricted strictly to assigned healthcare consultants. We maintain institutional data protection standards designed to safeguard user privacy across Nigeria.
              </p>
              <div className="pt-2 text-xs font-mono text-[var(--gold)]">
                ✦ ENCRYPTED END-TO-END DATA HANDLING
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 10 — CHALLENGES & EVENTS */}
      <section className="py-28 md:py-36 bg-[var(--background-secondary)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          <div className="max-w-3xl space-y-4">
            <SectionLabel number="08" text="SOCIAL AWARENESS CAMPAIGNS" />
            <h2 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-bold text-[var(--foreground)] leading-tight">
              START THE CONVERSATION. CHANGE THE CONVERSATION.
            </h2>
            <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
              Rehab Nigeria actively drives community awareness campaigns across social media to promote understanding around substance use, levels of dependency, and recovery support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 font-sans">
            {socialChallengesData.map((campaign, idx) => (
              <motion.div
                key={campaign.platform}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="p-8 bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm space-y-5 transition-all duration-300 relative group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 bg-[var(--background)] border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--gold)] font-bold uppercase rounded-sm">
                      {campaign.platform}
                    </span>
                    <span className="font-mono text-xs text-[var(--foreground-subtle)]">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                    {campaign.tagline}
                  </h3>

                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {campaign.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <span className="font-mono text-xs text-[var(--gold-light)] block font-bold">
                    {campaign.hashtag}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl group"
            >
              <span>VIEW FULL CHALLENGES & CAMPAIGNS</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 11 — RESOURCES */}
      <section className="py-24 md:py-32 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="max-w-3xl space-y-4">
            <SectionLabel number="09" text="RECOVERY KNOWLEDGE BASE" />
            <h2 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--foreground)]">
              RESOURCE LIBRARY.
            </h2>
            <p className="font-sans text-base text-[var(--foreground-muted)] leading-relaxed">
              Educational guides and evidence-based articles helping individuals and families understand substance use and recovery.
            </p>
          </div>

          <ResourceList articles={resourceArticles} />

          <div className="text-center pt-4">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--gold)] hover:text-[var(--gold-light)] font-bold tracking-wider uppercase"
            >
              <span>EXPLORE ALL RESOURCES</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 12 — FAQ */}
      <section className="py-24 md:py-32 bg-[var(--background-secondary)] border-b border-[var(--border)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <SectionLabel number="10" text="QUESTIONS & ANSWERS" />
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)]">
              FREQUENTLY ASKED QUESTIONS.
            </h2>
          </div>

          <FAQAccordion items={faqsData} />

          <div className="text-center pt-4">
            <Link
              href="/faq"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--gold)] hover:text-[var(--gold-light)] font-bold tracking-wider uppercase"
            >
              <span>VIEW COMPLETE FAQ PAGE</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </section>

      {/* SECTION 13 — FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
