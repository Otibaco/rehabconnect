"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { EditorialHero } from '@/components/pages-components/EditorialHero';
import { SectionLabel } from '@/components/pages-components/SectionLabel';
import { FinalCTA } from '@/components/pages-components/FinalCTA';
import { Share2 } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { socialChallengesData } from '@/lib/data';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Footer } from '@/components/layout/Footer';

// Custom Social Media Icons
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.36 1.47-1.42 2.47-.09 1.25.47 2.48 1.46 3.17.99.69 2.33.8 3.48.28 1.07-.47 1.85-1.51 1.98-2.67.09-2.58.04-5.17.05-7.75z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.01 2C6.49 2 3 5.59 3 11.25c0 6.06 3.57 10.75 9.37 10.75 4.78 0 8.1-2.76 8.1-6.84 0-3.69-2.53-6.11-6.31-6.11-1.45 0-2.6.39-3.44 1.16-.14-1.76.59-2.76 2.25-2.76 1.13 0 1.94.48 2.49 1.45l2.12-1.08C16.58 5.03 14.99 4.1 12.84 4.1c-3.45 0-5.25 2.3-5.25 6.39 0 4.46 2.06 7.02 5.66 7.02 2.17 0 3.59-.97 4.16-2.75.42-1.3.02-2.54-1.08-3.37-.85-.64-2.02-.95-3.5-.95-1.24 0-2.17.29-2.77.86-.58.55-.77 1.31-.57 2.27.2.96.93 1.45 2.17 1.45 1.03 0 1.69-.38 1.99-1.15.09-.23.14-.5.14-.8 1.07.18 1.61.65 1.61 1.41 0 1.14-.91 1.72-2.71 1.72-2.14 0-3.31-1.51-3.31-4.25 0-2.56 1.17-3.89 3.42-3.89 2.18 0 3.66 1.23 4.42 3.66l2.27-.62C18.55 5.44 15.8 2 12.01 2Z" />
  </svg>
);

export const ChallengesPage: React.FC = () => {
  return (
    <div className="space-y-0">

      <SiteHeader />

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

            {/* OFFICIAL SOCIAL CHANNELS */}
            <div className="lg:col-span-5 bg-gradient-to-br from-[var(--background-secondary)] to-[var(--background-tertiary)] border border-[var(--border)] p-8 rounded-sm space-y-6 relative group crosshair-corner shadow-2xl">
              {/* Header */}
              <div className="space-y-2 pb-4 border-b border-[var(--border-subtle)]">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-[var(--gold)]/10 rounded-lg">
                    <Share2 className="w-5 h-5 text-[var(--gold)]" />
                  </div>
                  <div>
                    <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">
                      Connect With Us
                    </h3>
                    <p className="font-sans text-xs text-[var(--foreground-muted)]">
                      Follow our official channels for updates & awareness content
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <a
                  href="https://www.facebook.com/share/p/1CboahMkHM/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Facebook"
                  className="group/social p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] hover:bg-[#1877F2]/10 hover:border-[#1877F2] transition-all duration-300 flex flex-col items-center gap-2.5 hover:shadow-lg hover:shadow-[#1877F2]/20"
                >
                  <FacebookIcon />
                  <span className="font-sans text-xs font-semibold text-[var(--foreground)] group-hover/social:text-[#1877F2] transition-colors">
                    Facebook
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/rehab.nigeria?igsh=cnF6N3Bqdnd6dzk2"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Instagram"
                  className="group/social p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] hover:bg-[#E4405F]/10 hover:border-[#E4405F] transition-all duration-300 flex flex-col items-center gap-2.5 hover:shadow-lg hover:shadow-[#E4405F]/20"
                >
                  <InstagramIcon />
                  <span className="font-sans text-xs font-semibold text-[var(--foreground)] group-hover/social:text-[#E4405F] transition-colors">
                    Instagram
                  </span>
                </a>

                <a
                  href="https://www.tiktok.com/@rehab_nigeria?_r=1&_t=ZS-98wF1JuDuqY"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on TikTok"
                  className="group/social p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] hover:bg-[#25F4EE]/10 hover:border-[#25F4EE] transition-all duration-300 flex flex-col items-center gap-2.5 hover:shadow-lg hover:shadow-[#25F4EE]/20"
                >
                  <TikTokIcon />
                  <span className="font-sans text-xs font-semibold text-[var(--foreground)] group-hover/social:text-[#25F4EE] transition-colors">
                    TikTok
                  </span>
                </a>

                <a
                  href="https://x.com/i/status/2088343473330258172"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on X"
                  className="group/social p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] hover:bg-white/5 hover:border-white/20 transition-all duration-300 flex flex-col items-center gap-2.5 hover:shadow-lg"
                >
                  <XIcon />
                  <span className="font-sans text-xs font-semibold text-[var(--foreground)] group-hover/social:text-white transition-colors">
                    X
                  </span>
                </a>

                <a
                  href="https://www.threads.com/@rehab.nigeria"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Follow us on Threads"
                  className="group/social p-4 rounded-lg bg-[var(--background-secondary)] border border-[var(--border-subtle)] hover:bg-black/5 hover:border-black/20 transition-all duration-300 flex flex-col items-center gap-2.5 hover:shadow-lg"
                >
                  <ThreadsIcon />
                  <span className="font-sans text-xs font-semibold text-[var(--foreground)] group-hover/social:text-black dark:group-hover/social:text-white transition-colors">
                    Threads
                  </span>
                </a>
              </div>

              {/* Footer Badge */}
              <div className="pt-2 border-t border-[var(--border-subtle)]">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[var(--gold)]/10 rounded-full">
                  <span className="w-2 h-2 bg-[var(--gold)] rounded-full"></span>
                  <span className="font-mono text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider">
                    Verified Official Channels
                  </span>
                </div>
              </div>
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
      <Footer />

    </div>
  );
};