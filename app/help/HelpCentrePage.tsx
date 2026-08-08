'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  MessageCircle,
  Phone,
  Mail,
  ArrowRight,
  BookOpen,
  Shield,
  UserCheck,
  Building2,
  CreditCard,
  Clock,
  FileText,
  ChevronRight,
  HelpCircle,
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

const quickLinks = [
  {
    icon: <UserCheck className="w-5 h-5" />,
    title: 'Getting started',
    description: 'New to RehabConnect? Learn how the platform works and what to expect.',
    href: '#',
  },
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: 'Guides & tutorials',
    description: 'Step-by-step walkthroughs for assessments, consultations, and placement.',
    href: '#',
  },
  {
    icon: <Building2 className="w-5 h-5" />,
    title: 'Finding a centre',
    description: 'How we match you with verified rehabilitation centres.',
    href: '#',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Privacy & security',
    description: 'How we protect your information and maintain confidentiality.',
    href: '#',
  },
  {
    icon: <CreditCard className="w-5 h-5" />,
    title: 'Pricing & payments',
    description: 'Understanding costs, insurance, and payment options.',
    href: '#',
  },
  {
    icon: <FileText className="w-5 h-5" />,
    title: 'Policies & terms',
    description: 'Our terms of use, privacy policy, and cookie policy.',
    href: '#',
  },
];

const popularQuestions = [
  {
    question: 'How does RehabConnect match me with a centre?',
    answer:
      'After you complete a confidential assessment, a care coordinator reviews your needs and provides a shortlist of verified centres that match your clinical requirements, location, and preferences.',
    category: 'Getting started',
  },
  {
    question: 'Is my information kept confidential?',
    answer:
      'Absolutely. All information is encrypted and never shared without your explicit consent. We adhere to strict data protection standards.',
    category: 'Privacy & security',
  },
  {
    question: 'What does the service cost?',
    answer:
      'RehabConnect\'s coordination and matching service is completely free for individuals and families. You only pay the rehabilitation centre directly for their services.',
    category: 'Pricing & payments',
  },
  {
    question: 'How quickly can I be placed in a centre?',
    answer:
      'Most people receive verified recommendations within 48 hours. In urgent situations, we can often expedite the process significantly.',
    category: 'Finding a centre',
  },
  {
    question: 'Can I use RehabConnect for a family member?',
    answer:
      'Yes. Many people reach out on behalf of loved ones. Our coordinators are experienced in guiding families through the process sensitively.',
    category: 'Getting started',
  },
];

const contactOptions = [
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Live chat',
    description: 'Chat with a support team member in real time.',
    action: 'Start chat',
    href: '#',
    available: true,
  },
  {
    icon: <Mail className="w-5 h-5" />,
    title: 'Email support',
    description: 'Send us a message and we\'ll respond within 24 hours.',
    action: 'Send email',
    href: 'mailto:support@rehabconnect.ng',
    available: true,
  },
  {
    icon: <Phone className="w-5 h-5" />,
    title: 'Phone support',
    description: 'Speak directly with a care coordinator.',
    action: 'Call +234 800 000 0000',
    href: 'tel:+2348000000000',
    available: true,
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HelpCentrePage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <main className="bg-[var(--color-bg)]">
      
      {/* ── Hero Search Section ── */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]" style={{ background: 'var(--color-hero-glow)' }} />
        <div className="pointer-events-none absolute -bottom-20 -left-20 w-[300px] h-[300px] rounded-full opacity-[0.04] blur-[100px]" style={{ background: 'var(--color-hero-glow-2)' }} />
        
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="space-y-6 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <HelpCircle className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[var(--color-accent)] uppercase">
                Help centre
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[var(--color-text)] leading-[1.12]">
              How can we help you?
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-lg mx-auto">
              Search our knowledge base or browse topics below to find answers to common questions.
            </p>

            {/* Search bar */}
            <div className="relative max-w-md mx-auto mt-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-text-muted)]" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Quick Link Cards ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {quickLinks.map((link) => (
              <motion.a
                key={link.title}
                href={link.href}
                variants={childVariants}
                className="group flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:shadow-md hover:border-[var(--color-accent)]/30 transition-all duration-300"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  {link.icon}
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {link.title}
                  </h3>
                  <p className="mt-1 text-xs text-[var(--color-text-muted)] leading-relaxed">
                    {link.description}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-[11px] font-medium text-[var(--color-accent)] mt-auto">
                  Learn more
                  <ChevronRight className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Popular Questions ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Questions */}
            <div className="lg:col-span-8">
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
                  Popular questions
                </h2>
              </motion.div>

              <motion.div
                className="space-y-2"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
              >
                {popularQuestions.map((item) => (
                  <motion.div
                    key={item.question}
                    variants={childVariants}
                    className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] font-medium text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full">
                          {item.category}
                        </span>
                        <h3 className="mt-2 text-sm font-semibold text-[var(--color-text)]">
                          {item.question}
                        </h3>
                        <p className="mt-2 text-xs text-[var(--color-text-muted)] leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="mt-6 text-center"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <a
                  href="/faq"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
                >
                  View all FAQs
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </motion.div>
            </div>

            {/* Contact sidebar */}
            <div className="lg:col-span-4">
              <motion.div
                className="sticky top-24 rounded-2xl bg-[var(--color-section-soft)] border border-[var(--color-border)] p-6 sm:p-8 space-y-6"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: 0.2, duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <div>
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-3">
                    <MessageCircle className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold tracking-tight text-[var(--color-text)]">
                    Still need help?
                  </h3>
                  <p className="mt-1 text-sm text-[var(--color-text-muted)] leading-relaxed">
                    Our support team is available to assist you. Choose the option that works best.
                  </p>
                </div>

                <div className="space-y-3">
                  {contactOptions.map((option) => (
                    <a
                      key={option.title}
                      href={option.href}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)]/30 transition-all duration-200 group"
                    >
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)] shrink-0">
                        {option.icon}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-[var(--color-text)]">{option.title}</p>
                        <p className="text-[11px] text-[var(--color-text-muted)] truncate">{option.description}</p>
                      </div>
                      <span className="text-[11px] font-medium text-[var(--color-accent)] group-hover:underline shrink-0">
                        {option.action}
                      </span>
                    </a>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-2 text-xs text-[var(--color-text-muted)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    <span>Available Monday–Friday, 8am–6pm WAT</span>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
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
              <Phone className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Prefer to speak with someone directly?
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              Our care coordinators are ready to answer your questions and guide you through the process.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <a
                href="tel:+2348000000000"
                className="inline-flex items-center gap-2 theme-btn-primary px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                Call +234 800 000 0000
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 theme-btn-ghost px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Contact us
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}