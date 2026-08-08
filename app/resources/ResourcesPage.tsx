'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  BookOpen,
  FileText,
  Video,
  Headphones,
  Download,
  ExternalLink,
  ArrowRight,
  Heart,
  Shield,
  Users,
  Brain,
  Lightbulb,
  ChevronRight,
} from 'lucide-react';
import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const childTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.4, 0.25, 1],
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: childTransition },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const featuredResources = [
  {
    icon: <FileText className="w-5 h-5" />,
    type: 'Guide',
    title: 'Understanding rehabilitation options',
    description: 'A comprehensive overview of inpatient, outpatient, and community-based programmes available across Nigeria.',
    link: '#',
    readTime: '8 min read',
  },
  {
    icon: <Video className="w-5 h-5" />,
    type: 'Video',
    title: 'How care coordination works',
    description: 'Watch how our coordinators match individuals with the right centres — from first contact to admission.',
    link: '#',
    readTime: '4 min watch',
  },
  {
    icon: <Headphones className="w-5 h-5" />,
    type: 'Podcast',
    title: 'Voices of recovery: Real stories',
    description: 'Listen to individuals and families share their experiences navigating rehabilitation in Nigeria.',
    link: '#',
    readTime: '22 min listen',
  },
  {
    icon: <Download className="w-5 h-5" />,
    type: 'Download',
    title: 'Preparing for a consultation',
    description: 'A checklist of questions to ask and information to gather before speaking with a care coordinator.',
    link: '#',
    readTime: 'PDF · 3 pages',
  },
];

const categories = [
  {
    icon: <Heart className="w-4 h-4" />,
    title: 'For patients',
    count: 12,
    href: '#',
  },
  {
    icon: <Users className="w-4 h-4" />,
    title: 'For families',
    count: 8,
    href: '#',
  },
  {
    icon: <Brain className="w-4 h-4" />,
    title: 'Mental health',
    count: 10,
    href: '#',
  },
  {
    icon: <Shield className="w-4 h-4" />,
    title: 'Addiction recovery',
    count: 9,
    href: '#',
  },
  {
    icon: <Lightbulb className="w-4 h-4" />,
    title: 'Self-help tools',
    count: 6,
    href: '#',
  },
];

const recentArticles = [
  {
    title: 'What to expect during your first week of inpatient rehabilitation',
    category: 'For patients',
    readTime: '6 min read',
    href: '#',
  },
  {
    title: 'How to talk to a loved one about seeking help',
    category: 'For families',
    readTime: '5 min read',
    href: '#',
  },
  {
    title: 'Understanding dual diagnosis: Mental health and substance use',
    category: 'Mental health',
    readTime: '7 min read',
    href: '#',
  },
  {
    title: 'The role of aftercare in long-term recovery',
    category: 'Addiction recovery',
    readTime: '4 min read',
    href: '#',
  },
  {
    title: 'Building a support system during outpatient treatment',
    category: 'For patients',
    readTime: '5 min read',
    href: '#',
  },
  {
    title: 'Signs your family member may need professional help',
    category: 'For families',
    readTime: '6 min read',
    href: '#',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ResourcesPage() {
  return (
    <main className="bg-[var(--color-bg)]">
      
      {/* ── Page Header ── */}
      <section className="relative pt-20 pb-10 sm:pt-28 sm:pb-14 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]" style={{ background: 'var(--color-hero-glow)' }} />
        
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <BookOpen className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[var(--color-accent)] uppercase">
                Resources & guides
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[var(--color-text)] leading-[1.12]">
              Everything you need
              <br />
              <span className="text-[var(--color-accent)]">to make informed decisions</span>
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-xl">
              Guides, videos, and tools to help you understand your options and feel confident about the next step.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Featured Resources ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {featuredResources.map((item) => (
              <motion.a
                key={item.title}
                href={item.link}
                variants={childVariants}
                className="group flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-medium text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] px-2 py-0.5 rounded-full">
                    {item.type}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed flex-1">
                  {item.description}
                </p>
                <div className="flex items-center justify-between pt-2 border-t border-[var(--color-border)]">
                  <span className="text-[11px] text-[var(--color-text-muted)]">{item.readTime}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all" />
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Browse by Category ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Browse by category
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {categories.map((category) => (
              <motion.a
                key={category.title}
                href={category.href}
                variants={childVariants}
                className="group flex items-center gap-3 p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:shadow-sm transition-all duration-300"
              >
                <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] shrink-0">
                  {category.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[var(--color-text)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                    {category.title}
                  </p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">{category.count} resources</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Recent Articles ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Articles list */}
            <div className="lg:col-span-8">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
                  Recent articles
                </h2>
              </motion.div>

              <motion.div
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {recentArticles.map((article) => (
                  <motion.a
                    key={article.title}
                    href={article.href}
                    variants={childVariants}
                    className="group flex items-center justify-between gap-4 p-4 rounded-xl hover:bg-[var(--color-surface-muted)] transition-colors duration-200"
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[var(--color-accent)] font-medium mb-0.5">{article.category}</p>
                      <h3 className="text-sm font-medium text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors truncate">
                        {article.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-[11px] text-[var(--color-text-muted)] hidden sm:block">{article.readTime}</span>
                      <ChevronRight className="w-4 h-4 text-[var(--color-text-muted)] group-hover:text-[var(--color-accent)] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Sidebar CTA */}
            <div className="lg:col-span-4">
              <motion.div
                className="sticky top-24 rounded-2xl bg-[var(--color-section-soft)] border border-[var(--color-border)] p-6 sm:p-8"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.3, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
                  <ExternalLink className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-bold tracking-tight text-[var(--color-text)]">
                  Need personalised guidance?
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                  Speak with a care coordinator who can help you navigate your options 
                  based on your specific situation.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-5 text-sm font-medium theme-btn-primary px-5 py-2.5 rounded-xl transition-all duration-200 hover:opacity-90"
                >
                  Talk to a coordinator
                  <ArrowRight className="w-4 h-4" />
                </a>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="rounded-2xl bg-[var(--color-section-soft)] border border-[var(--color-border)] p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Stay informed with our latest resources
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              New guides, articles, and tools added regularly to support your journey.
              Check back or bookmark this page.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              Get in touch for more information
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}