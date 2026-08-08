'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, Scale, Mail } from 'lucide-react';
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

const principles = [
  {
    icon: <Lock className="w-5 h-5" />,
    title: 'Data encryption',
    desc: 'All personal and medical information is encrypted in transit and at rest using industry-standard protocols.',
  },
  {
    icon: <Eye className="w-5 h-5" />,
    title: 'Transparency',
    desc: 'We clearly explain what data we collect, why we need it, and how it will be used — before you share anything.',
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: 'Your control',
    desc: 'You have the right to access, correct, or request deletion of your personal data at any time.',
  },
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'No third-party sales',
    desc: 'We never sell, rent, or trade your personal information to third parties for marketing purposes.',
  },
];

const sections = [
  {
    id: 'information-we-collect',
    title: 'Information we collect',
    content: [
      'Personal identification details such as your name, email address, and phone number when you fill out our consultation form or create an account.',
      'Health-related information that you voluntarily provide during assessments, including medical history, current concerns, and placement preferences.',
      'Usage data such as pages visited, time spent on the platform, and interaction patterns — collected through cookies and analytics tools to improve our service.',
      'Communication records including messages exchanged with care coordinators, consultation notes, and follow-up correspondence.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use your information',
    content: [
      'To match you with verified rehabilitation centres that align with your clinical needs, location preferences, and personal circumstances.',
      'To enable care coordinators to provide personalised guidance and support throughout your placement journey.',
      'To improve our platform, services, and user experience based on aggregated, anonymised usage data.',
      'To comply with legal obligations and respond to lawful requests from regulatory authorities.',
    ],
  },
  {
    id: 'sharing',
    title: 'Information sharing',
    content: [
      'With rehabilitation centres: We share only the information necessary to evaluate your suitability for admission, and only with your explicit consent.',
      'With service providers: Trusted third parties who assist us in operating our platform, subject to strict confidentiality agreements.',
      'Legal requirements: We may disclose information when required by law, court order, or to protect the rights and safety of our users and the public.',
    ],
  },
  {
    id: 'data-security',
    title: 'Data security',
    content: [
      'We implement administrative, technical, and physical safeguards designed to protect your personal information against unauthorised access, alteration, or destruction.',
      'All communications between you and our care coordinators are encrypted end-to-end.',
      'We regularly review and update our security practices to address emerging threats and vulnerabilities.',
    ],
  },
  {
    id: 'cookies',
    title: 'Cookies & tracking',
    content: [
      'We use essential cookies to ensure the proper functioning of our platform, including session management and security features.',
      'Analytics cookies help us understand how visitors interact with our site so we can improve navigation and content.',
      'You can control cookie preferences through your browser settings. Disabling certain cookies may affect platform functionality.',
    ],
  },
  {
    id: 'your-rights',
    title: 'Your rights',
    content: [
      'Access: You may request a copy of the personal data we hold about you.',
      'Correction: You may ask us to update or correct inaccurate information.',
      'Deletion: You may request that we delete your personal data, subject to legal retention requirements.',
      'Objection: You may object to certain processing activities, including direct marketing.',
      'Portability: You may request your data in a structured, machine-readable format.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PrivacyPolicyPage() {
  return (
    <main className="bg-[var(--color-bg)]">
      
      {/* ── Page Header ── */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]" style={{ background: 'var(--color-hero-glow)' }} />
        
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <FileText className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[var(--color-accent)] uppercase">
                Legal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[var(--color-text)] leading-[1.12]">
              Privacy policy
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-xl">
              Last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Introduction ── */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="prose-custom"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              At RehabConnect, your privacy is fundamental to the trust you place in us. 
              This policy explains how we collect, use, protect, and respect your personal 
              information when you use our platform. We are committed to transparency and 
              giving you control over your data at every step.
            </p>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mt-4">
              By using RehabConnect, you agree to the practices described in this policy. 
              If you have any questions, please contact us at{' '}
              <a href="mailto:privacy@rehabconnect.ng" className="text-[var(--color-accent)] hover:underline font-medium">
                privacy@rehabconnect.ng
              </a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Principles Grid ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {principles.map((item) => (
              <motion.div
                key={item.title}
                variants={childVariants}
                className="flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  {item.icon}
                </span>
                <h3 className="text-sm font-semibold text-[var(--color-text)]">{item.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Detailed Sections ── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="space-y-16"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {sections.map((section) => (
              <motion.div key={section.id} variants={childVariants} className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-1 h-5 rounded-full bg-[var(--color-accent)]" />
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
                    {section.title}
                  </h2>
                </div>
                <ul className="space-y-3 pl-4">
                  {section.content.map((item, idx) => (
                    <li key={idx} className="text-sm text-[var(--color-text-muted)] leading-relaxed flex gap-3">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)]/40 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Contact CTA ── */}
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
              <Mail className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Questions about your privacy?
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              Our team is here to help. Reach out anytime and we'll respond within 48 hours.
            </p>
            <a
              href="mailto:privacy@rehabconnect.ng"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              privacy@rehabconnect.ng
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}