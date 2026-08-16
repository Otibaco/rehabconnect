"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { EditorialHero } from '@/components/pages-components/EditorialHero';
import { SectionLabel } from '@/components/pages-components/SectionLabel';
import { FinalCTA } from '@/components/pages-components/FinalCTA';
import { Share2, Award, ShieldCheck, ArrowUpRight, MessageCircle, Sparkles } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { socialChallengesData } from '@/lib/data';

export const ChallengesPage: React.FC = () => {
  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="COMMUNITY AWARENESS MOVEMENT"
        title="START THE CONVERSATION. CHANGE THE CONVERSATION."
        subtitle="Public awareness campaigns driving open dialogue around substance use, levels of dependency, and recovery support across Nigeria."
        breadcrumb="Challenges & Events"
      />

      {/* WHY THE CHALLENGE EXISTS — 60/40 COMPOSITION */}
      <section className="py-24 md:py-36 bg-[var(--background)] border-b border-[var(--border)] relative overflow-hidden">
        
        {/* Architectural Grid */}
        <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <SectionLabel number="02" text="CAMPAIGN PURPOSE" />
              <h2 className="font-cinzel text-3xl sm:text-5xl font-bold text-[var(--foreground)] leading-tight">
                BREAKING COMMUNITY SILENCE & STIGMA.
              </h2>
              
              <div className="space-y-4 font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed">
                <p>
                  Silence breeds stigma, and stigma prevents recovery. Our social media awareness challenges bring educational discussions, medical facts, and empathetic support straight to public social platforms.
                </p>
                <p>
                  By encouraging students, families, healthcare advocates, and young adults to participate in structured educational discussions, we help normalize seeking professional help for substance use disorder across Nigeria.
                </p>
              </div>
            </div>

            {/* OFFICIAL SOCIAL HANDLES BOX */}
            <div className="lg:col-span-5 bg-[var(--background-secondary)] border border-[var(--border)] p-8 rounded-sm space-y-6 relative group crosshair-corner shadow-2xl">
              <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5 text-[var(--gold)]" />
                <span className="font-mono text-xs font-bold text-[var(--gold)] uppercase tracking-widest block">
                  Official Social Handles:
                </span>
              </div>

              <ul className="space-y-4 font-mono text-xs text-[var(--foreground)]">
                <li className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
                  <span className="text-[var(--foreground-subtle)]">Facebook:</span>
                  <a href={`https://facebook.com/${siteConfig.socialLinks.facebook.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-[var(--brand-facebook)] hover:underline font-bold">
                    {siteConfig.socialLinks.facebook}
                  </a>
                </li>
                <li className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
                  <span className="text-[var(--foreground-subtle)]">Instagram:</span>
                  <a href={`https://instagram.com/${siteConfig.socialLinks.instagram.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-[var(--brand-instagram)] hover:underline font-bold">
                    {siteConfig.socialLinks.instagram}
                  </a>
                </li>
                <li className="flex justify-between items-center border-b border-[var(--border-subtle)] pb-3">
                  <span className="text-[var(--foreground-subtle)]">TikTok:</span>
                  <a href={`https://tiktok.com/${siteConfig.socialLinks.tiktok}`} target="_blank" rel="noreferrer" className="text-[var(--brand-tiktok)] hover:underline font-bold">
                    {siteConfig.socialLinks.tiktok}
                  </a>
                </li>
                <li className="flex justify-between items-center">
                  <span className="text-[var(--foreground-subtle)]">X (Twitter):</span>
                  <a href={`https://x.com/${siteConfig.socialLinks.x.replace('@', '')}`} target="_blank" rel="noreferrer" className="text-[var(--brand-x)] hover:underline font-bold">
                    {siteConfig.socialLinks.x}
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* INDIVIDUAL PLATFORM CHALLENGES */}
          <div className="space-y-12 pt-8 border-t border-[var(--border-subtle)]">
            <SectionLabel number="03" text="PLATFORM CAMPAIGNS" />

            <div className="space-y-10">
              {socialChallengesData.map((campaign, idx) => (
                <motion.div
                  key={campaign.platform}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="p-8 sm:p-10 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm space-y-6 transition-all duration-300 relative group crosshair-corner shadow-2xl"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl font-bold text-[var(--gold)]">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="px-3.5 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] font-mono text-xs font-bold text-[var(--foreground)] uppercase rounded-sm">
                        {campaign.platform} CAMPAIGN
                      </span>
                    </div>
                    <span className="font-mono text-xs text-[var(--gold-light)] font-bold">
                      {campaign.hashtag}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-cinzel text-xl sm:text-2xl font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                      {campaign.tagline}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed mt-2">
                      {campaign.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-sans text-xs">
                    
                    {/* HOW TO PARTICIPATE */}
                    <div className="p-5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-3">
                      <span className="font-mono text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider block">
                        How To Participate:
                      </span>
                      <ul className="space-y-2 text-[var(--foreground-muted)]">
                        {campaign.howToParticipate.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="text-[var(--gold)] shrink-0">✦</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* RULES & RECOGNITION */}
                    <div className="p-5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-3">
                      <div>
                        <span className="font-mono text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider block mb-1">
                          Campaign Guidelines:
                        </span>
                        <ul className="space-y-1.5 text-[var(--foreground-muted)]">
                          {campaign.rules.map((rule, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-2">
                              <span className="text-[var(--green-light)] shrink-0">✓</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {campaign.prizes && (
                        <div className="pt-3 border-t border-[var(--border-subtle)]">
                          <span className="font-mono text-[10px] text-[var(--gold)] font-bold uppercase tracking-wider block mb-0.5">
                            Recognition & Spotlight:
                          </span>
                          <p className="text-[var(--foreground)] font-bold">{campaign.prizes}</p>
                        </div>
                      )}
                    </div>

                  </div>

                </motion.div>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
