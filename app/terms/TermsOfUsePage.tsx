'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, Scale, Clock, Mail } from 'lucide-react';
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

const highlights = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Confidentiality commitment',
    desc: 'We treat all information you share with the strictest confidence, in accordance with our privacy policy and applicable laws.',
  },
  {
    icon: <Scale className="w-5 h-5" />,
    title: 'Fair use',
    desc: 'Our platform is designed to connect you with care. We expect all users to engage honestly and respectfully.',
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    title: 'Medical disclaimer',
    desc: 'RehabConnect provides coordination and referral services, not medical advice. Always consult qualified professionals for clinical decisions.',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Updates to terms',
    desc: 'We may revise these terms from time to time. Continued use of the platform constitutes acceptance of any changes.',
  },
];

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of terms',
    content: [
      'By accessing or using the RehabConnect platform, you agree to be bound by these Terms of Use and all applicable laws and regulations.',
      'If you do not agree with any of these terms, you are prohibited from using or accessing this platform.',
      'These terms apply to all visitors, users, and others who access or use the service.',
    ],
  },
  {
    id: 'services',
    title: 'Description of services',
    content: [
      'RehabConnect is a digital platform that connects individuals seeking rehabilitation services with certified care coordinators and verified rehabilitation centres.',
      'We provide coordination, referral guidance, and educational resources. We do not provide medical treatment, diagnosis, or clinical advice.',
      'The matching recommendations we provide are based on the information you share with us and the availability of partner centres at the time of your request.',
    ],
  },
  {
    id: 'user-responsibilities',
    title: 'User responsibilities',
    content: [
      'You agree to provide accurate, current, and complete information during the assessment and consultation process.',
      'You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.',
      'You agree not to misuse the platform, including attempting to gain unauthorised access, transmitting malicious code, or interfering with the proper functioning of the service.',
      'You must be at least 18 years of age to use this platform independently. Users under 18 require parental or guardian consent.',
    ],
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual property',
    content: [
      'All content, branding, design, and functionality on the RehabConnect platform are the exclusive property of RehabConnect and are protected by applicable intellectual property laws.',
      'You may not reproduce, distribute, modify, or create derivative works of any content without our express written permission.',
      'RehabConnect, the RehabConnect logo, and all related names and marks are trademarks of RehabConnect and may not be used without prior written consent.',
    ],
  },
  {
    id: 'limitation',
    title: 'Limitation of liability',
    content: [
      'RehabConnect acts solely as a coordination and referral platform. We do not guarantee the availability, quality, or suitability of any rehabilitation centre or care coordinator.',
      'We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the platform or your interactions with partner centres.',
      'Any disputes or issues arising between you and a rehabilitation centre must be resolved directly with that centre. RehabConnect is not a party to any agreement between you and a partner facility.',
    ],
  },
  {
    id: 'termination',
    title: 'Termination',
    content: [
      'We reserve the right to suspend or terminate your access to the platform at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.',
      'Upon termination, your right to use the platform will immediately cease. All provisions of these terms that by their nature should survive termination shall survive.',
    ],
  },
  {
    id: 'governing-law',
    title: 'Governing law',
    content: [
      'These terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria.',
      'Any disputes arising out of or relating to these terms shall be subject to the exclusive jurisdiction of the courts of Nigeria.',
    ],
  },
  {
    id: 'contact',
    title: 'Contact information',
    content: [
      'If you have any questions about these Terms of Use, please contact us at:',
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TermsOfUsePage() {
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
              Terms of use
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-xl">
              Effective date: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Introduction ── */}
      <section className="pb-12 sm:pb-16">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              Welcome to RehabConnect. These Terms of Use govern your access to and use of 
              our platform, including any content, functionality, and services offered. 
              Please read these terms carefully before using the platform.
            </p>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mt-4">
              By using RehabConnect, you acknowledge that you have read, understood, and 
              agree to be bound by these terms. If you do not agree, please discontinue 
              use of the platform immediately.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Highlights Grid ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {highlights.map((item) => (
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
                
                {section.id === 'contact' ? (
                  <div className="pl-4">
                    <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-3">
                      {section.content[0]}
                    </p>
                    <a
                      href="mailto:legal@rehabconnect.ng"
                      className="inline-flex items-center gap-2 text-sm font-medium text-[var(--color-accent)] hover:underline"
                    >
                      <Mail className="w-4 h-4" />
                      legal@rehabconnect.ng
                    </a>
                  </div>
                ) : (
                  <ul className="space-y-3 pl-4">
                    {section.content.map((item, idx) => (
                      <li key={idx} className="text-sm text-[var(--color-text-muted)] leading-relaxed flex gap-3">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[var(--color-accent)]/40 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
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
              <Scale className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Questions about these terms?
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              We're here to clarify. Reach out to our legal team and we'll respond within 48 hours.
            </p>
            <a
              href="mailto:legal@rehabconnect.ng"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              <Mail className="w-4 h-4" />
              legal@rehabconnect.ng
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}