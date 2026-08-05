'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { HeartHandshake, ArrowUpRight } from 'lucide-react';
import type { Variants, Transition } from 'framer-motion';
import type { RoutePath } from '@/lib/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterGroup {
  title: string;
  links: { label: string; path: RoutePath }[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const footerGroups: FooterGroup[] = [
  {
    title: 'Care pathways',
    links: [
      { label: 'For patients', path: '/for-patients' as RoutePath },
      { label: 'For families', path: '/for-families' as RoutePath },
      { label: 'How it works', path: '/how-it-works' as RoutePath },
      { label: 'Explore centres', path: '/portal-dashboard' as RoutePath },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help centre', path: '/help-center' as RoutePath },
      { label: 'FAQ', path: '/faq' as RoutePath },
      { label: 'Contact us', path: '/contact' as RoutePath },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', path: '/about' as RoutePath },
      { label: 'Resources', path: '/resources' as RoutePath },
      { label: 'Careers', path: '/careers' as RoutePath },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy policy', path: '/privacy' as RoutePath },
      { label: 'Terms of use', path: '/terms' as RoutePath },
      { label: 'Cookie policy', path: '/cookies' as RoutePath },
    ],
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerTransition: Transition = {
  staggerChildren: 0.06,
  delayChildren: 0.1,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: containerTransition,
  },
};

const fadeTransition: Transition = {
  duration: 0.45,
  ease: [0.25, 0.4, 0.25, 1],
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: fadeTransition,
  },
};

const bottomBar: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.45,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Footer: React.FC = () => {
  const router = useRouter();

  return (
    <footer
      className="relative border-t border-[var(--color-border)]"
      style={{ backgroundColor: 'var(--color-section-soft)' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-20 pb-10">
        
        <motion.div
          className="grid grid-cols-1 gap-12 lg:grid-cols-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          
          {/* ── Brand Column ── */}
          <motion.div variants={fadeUp} className="lg:col-span-4 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--color-text)]">
                Rehab<span className="text-[var(--color-accent)]">Connect</span>
              </span>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs">
              Connecting people with verified rehabilitation centres and compassionate care coordinators across Nigeria.
            </p>

            <a
              href="mailto:hello@rehabconnect.ng"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              hello@rehabconnect.ng
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </motion.div>

          {/* ── Link Groups ── */}
          {footerGroups.map((group) => (
            <motion.div key={group.title} variants={fadeUp} className="lg:col-span-2 space-y-4">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text)] opacity-60">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => router.push(link.path)}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors duration-200 text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom Bar ── */}
        <motion.div
          className="mt-16 pt-6 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3"
          variants={bottomBar}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-xs text-[var(--color-text-muted)] opacity-60">
            © {new Date().getFullYear()} RehabConnect. All rights reserved.
          </p>
          <p className="text-[11px] text-[var(--color-text-muted)] opacity-50 text-center sm:text-right max-w-md">
            Medical disclaimer: In an emergency, please contact emergency services immediately.
          </p>
        </motion.div>

      </div>
    </footer>
  );
};

export default Footer;