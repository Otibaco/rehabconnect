'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  HeartHandshake,
  ShieldCheck,
  Mail,
  CheckCircle2,
  ArrowRight,
  Lock,
  Globe,
  Phone,
  MapPin,
} from 'lucide-react';
import type { Variants } from 'framer-motion';
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
      { label: 'Referral portal', path: '/referral-portal' as RoutePath },
      { label: 'Explore centres', path: '/portal-dashboard' as RoutePath },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help centre', path: '/help-center' as RoutePath },
      { label: 'Support desk', path: '/support' as RoutePath },
      { label: 'FAQ', path: '/faq' as RoutePath },
      { label: 'Careers', path: '/careers' as RoutePath },
      { label: 'Contact us', path: '/contact' as RoutePath },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About RehabConnect', path: '/about' as RoutePath },
      { label: 'Resources & guides', path: '/resources' as RoutePath },
      { label: 'Privacy policy', path: '/privacy' as RoutePath },
      { label: 'Terms & conditions', path: '/terms' as RoutePath },
      { label: 'Cookie policy', path: '/cookies' as RoutePath },
    ],
  },
];

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Footer: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <footer
      className="relative border-t border-[var(--color-border)]"
      style={{ backgroundColor: 'var(--color-section-soft)' }}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 pt-16 pb-10">
        
        {/* ── Upper CTA Card ── */}
        <motion.div
          className="relative overflow-hidden rounded-2xl bg-[var(--color-surface)] theme-border theme-shadow p-8 sm:p-10 mb-14"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
        >
          {/* Ambient glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full opacity-[0.06] blur-[80px]" style={{ background: 'var(--color-hero-glow)' }} />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-surface-muted)] text-[var(--color-accent)] text-xs font-medium mb-4 border border-[var(--color-border)]">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Confidential healthcare referral</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
                Your recovery journey doesn&apos;t have to start alone
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-muted)] leading-relaxed max-w-lg">
                Connect with an empathetic care coordinator today to review clinical options tailored for you or your loved one.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <button
                onClick={() => router.push('/assessment')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl theme-btn-primary text-sm font-medium transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                <span>Take the first step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl theme-btn-ghost text-sm font-medium transition-all duration-200 active:scale-[0.98]"
              >
                <span>Talk to an advisor</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--color-border)]">
          
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[var(--color-accent)]/15 flex items-center justify-center text-[var(--color-accent)]">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-[var(--color-text)]">
                Rehab<span className="text-[var(--color-accent)]">Connect</span>
              </span>
            </div>

            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-sm">
              RehabConnect bridges people seeking rehabilitation support with certified care coordinators and verified rehabilitation centres — confidentially and compassionately.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                <Lock className="w-3 h-3 text-[var(--color-accent)]" />
                Encrypted consultations
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-muted)] bg-[var(--color-surface-muted)] px-3 py-1.5 rounded-lg border border-[var(--color-border)]">
                <Globe className="w-3 h-3 text-[var(--color-accent)]" />
                Nationwide access
              </span>
            </div>

            {/* Contact info */}
            <div className="space-y-2 pt-2">
              <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                +234 800 000 0000
              </p>
              <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                hello@rehabconnect.ng
              </p>
              <p className="text-xs text-[var(--color-text-muted)] flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                Lagos, Nigeria
              </p>
            </div>
          </div>

          {/* Link groups */}
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="text-xs font-semibold tracking-wider uppercase text-[var(--color-text)]">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => router.push(link.path)}
                      className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-left w-full"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar: Newsletter + Copyright ── */}
        <div className="pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          
          {/* Newsletter */}
          <div className="w-full lg:w-auto">
            <h5 className="text-xs font-semibold text-[var(--color-text)] tracking-wide mb-2">
              Subscribe to insights
            </h5>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] focus:ring-1 focus:ring-[var(--color-accent)]/30 transition-all"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl theme-btn-primary text-sm font-medium transition-all duration-200 whitespace-nowrap active:scale-[0.98]"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-[var(--color-accent)] flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing!
              </p>
            )}
          </div>

          {/* Copyright */}
          <div className="text-xs text-[var(--color-text-muted)] space-y-1 text-left lg:text-right">
            <p>© {new Date().getFullYear()} RehabConnect. All rights reserved.</p>
            <p className="max-w-md text-[11px] opacity-70">
              Medical disclaimer: RehabConnect provides digital care coordination and referral guidance. In an emergency, please contact emergency medical services immediately.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;