'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Shield, Settings, BarChart3, Ban, Mail } from 'lucide-react';
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

const cookieTypes = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: 'Essential cookies',
    desc: 'Required for the platform to function properly. These enable core features like secure login, session management, and form submissions.',
    alwaysOn: true,
  },
  {
    icon: <BarChart3 className="w-5 h-5" />,
    title: 'Analytics cookies',
    desc: 'Help us understand how visitors interact with the platform so we can improve navigation, content, and overall experience.',
    alwaysOn: false,
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: 'Functional cookies',
    desc: 'Remember your preferences and choices to provide a more personalised experience during return visits.',
    alwaysOn: false,
  },
];

const sections = [
  {
    id: 'what-are-cookies',
    title: 'What are cookies?',
    content: [
      'Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently and provide information to the site owners.',
      'Cookies may be "session cookies" which are deleted when you close your browser, or "persistent cookies" which remain on your device for a set period or until you delete them.',
      'We also use similar technologies such as local storage and pixels for the same purposes described in this policy.',
    ],
  },
  {
    id: 'how-we-use',
    title: 'How we use cookies',
    content: [
      'To keep our platform secure and protect your data from unauthorised access.',
      'To remember your preferences and provide a smoother browsing experience.',
      'To understand how you interact with our platform so we can identify areas for improvement.',
      'To ensure our consultation forms and matching tools function correctly.',
    ],
  },
  {
    id: 'third-party',
    title: 'Third-party cookies',
    content: [
      'Some cookies on our platform are placed by trusted third-party services that we use for analytics and performance monitoring.',
      'These third parties have their own privacy and cookie policies. We encourage you to review them for complete information about their practices.',
      'We do not allow third-party advertising networks to place tracking cookies on our platform for behavioural advertising purposes.',
    ],
  },
  {
    id: 'managing',
    title: 'Managing your cookie preferences',
    content: [
      'Most web browsers allow you to control cookies through their settings. You can typically block, delete, or be notified when cookies are set.',
      'You can adjust your cookie preferences at any time through our cookie consent banner or your browser settings.',
      'Please note that disabling certain cookies may impact the functionality of our platform. Essential cookies cannot be disabled as they are required for the platform to operate.',
    ],
  },
  {
    id: 'specific-cookies',
    title: 'Cookies we use',
    content: [
      'Below is a summary of the main cookies used on our platform, their purpose, and how long they remain on your device.',
    ],
  },
  {
    id: 'updates',
    title: 'Updates to this policy',
    content: [
      'We may update this Cookie Policy from time to time to reflect changes in technology, regulation, or our practices.',
      'Any material changes will be communicated through our platform or via email where appropriate.',
      'We encourage you to review this policy periodically to stay informed about how we use cookies.',
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CookiePolicyPage() {
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
                <Cookie className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[var(--color-accent)] uppercase">
                Legal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[var(--color-text)] leading-[1.12]">
              Cookie policy
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed">
              This Cookie Policy explains how RehabConnect uses cookies and similar 
              technologies to recognise you when you visit our platform. It explains 
              what these technologies are, why we use them, and your rights to 
              control our use of them.
            </p>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed mt-4">
              We value your privacy and are committed to being transparent about 
              the technologies we use. If you have any questions, please contact 
              us at{' '}
              <a href="mailto:privacy@rehabconnect.ng" className="text-[var(--color-accent)] hover:underline font-medium">
                privacy@rehabconnect.ng
              </a>.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Cookie Types Grid ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {cookieTypes.map((item) => (
              <motion.div
                key={item.title}
                variants={childVariants}
                className="flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] relative overflow-hidden"
              >
                {item.alwaysOn && (
                  <span className="absolute top-3 right-3 text-[10px] font-semibold text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-2 py-0.5 rounded-full">
                    Always on
                  </span>
                )}
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

      {/* ── Cookie Table ── */}
      <section className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="overflow-hidden rounded-xl border border-[var(--color-border)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]">
                  <th className="px-4 py-3 font-semibold text-[var(--color-text)]">Cookie</th>
                  <th className="px-4 py-3 font-semibold text-[var(--color-text)]">Purpose</th>
                  <th className="px-4 py-3 font-semibold text-[var(--color-text)] hidden sm:table-cell">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-border)]">
                <tr>
                  <td className="px-4 py-3 text-[var(--color-text)] font-medium">rc_session</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">Manages your active session securely</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] hidden sm:table-cell">Session</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--color-text)] font-medium">rc_consent</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">Stores your cookie preferences</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] hidden sm:table-cell">12 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--color-text)] font-medium">rc_analytics</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">Tracks anonymous usage patterns</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] hidden sm:table-cell">24 months</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 text-[var(--color-text)] font-medium">rc_prefs</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)]">Remembers your display preferences</td>
                  <td className="px-4 py-3 text-[var(--color-text-muted)] hidden sm:table-cell">6 months</td>
                </tr>
              </tbody>
            </table>
          </motion.div>
          <p className="mt-3 text-[11px] text-[var(--color-text-muted)]">
            This table is representative and may not include all cookies currently in use. 
            Contact us for a complete and up-to-date list.
          </p>
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
              <Ban className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Want to manage your cookie preferences?
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              You can update your cookie settings at any time through your browser 
              or by clearing your cookies. For questions, our team is here to help.
            </p>
            <a
              href="mailto:privacy@rehabconnect.ng"
              className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              <Mail className="w-4 h-4" />
              privacy@rehabconnect.ng
            </a>
          </motion.div>
        </div>
      </section>

    </main>
  );
}