'use client';

import React, { useState, useEffect } from 'react';
import { HeartHandshake, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import type { Variants, Transition } from 'framer-motion';
import type { RoutePath } from '@/lib/types';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  path: RoutePath;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const primaryLinks: NavLink[] = [
  { label: 'Home', path: '/' as RoutePath },
  { label: 'For patients', path: '/for-patients' as RoutePath },
  { label: 'For families', path: '/for-families' as RoutePath },
  { label: 'About', path: '/about' as RoutePath },
  { label: 'Resources', path: '/resources' as RoutePath },
  { label: 'Contact', path: '/contact' as RoutePath },
];

// ---------------------------------------------------------------------------
// Animation Variants (explicitly typed, no dynamic factories in Variants)
// ---------------------------------------------------------------------------

const mobileMenuVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.35, ease: [0.25, 0.4, 0.25, 1] },
      opacity: { duration: 0.25, delay: 0.05 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.25, ease: [0.25, 0.4, 0.25, 1] },
      opacity: { duration: 0.15 },
    },
  },
};

// Individual item transition (reusable)
const itemTransition: Transition = {
  duration: 0.4,
  ease: [0.25, 0.4, 0.25, 1],
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const Navbar: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  return (
    <header
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2.5' : 'py-3.5'
      } border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-xl`}
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between">
          
          {/* ── Logo ── */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 rounded-lg"
            aria-label="RehabConnect — go to homepage"
          >
            {/* Icon mark */}
            <div className="w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)] group-hover:bg-[var(--color-accent)]/15 transition-colors duration-200">
              <HeartHandshake className="w-5 h-5" />
            </div>
            {/* Wordmark */}
            <span className="text-lg font-bold tracking-tight text-[var(--color-text)]">
              Rehab<span className="text-[var(--color-accent)]">Connect</span>
            </span>
          </button>

          {/* ── Desktop Navigation ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[var(--color-text)] bg-[var(--color-surface-muted)]'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface-muted)]/60'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-indicator"
                      className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-[var(--color-accent)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <button
              onClick={() => router.push('/assessment')}
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium theme-btn-primary transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              Start assessment
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="lg:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-surface-muted)] transition-colors duration-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lg:hidden overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 backdrop-blur-xl"
          >
            <div className="px-5 pt-3 pb-6 space-y-1">
              {primaryLinks.map((link, i) => {
                const isActive = currentPath === link.path;
                return (
                  <motion.button
                    key={link.path}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      ...itemTransition,
                      delay: 0.06 + i * 0.05,
                    }}
                    onClick={() => {
                      router.push(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-[var(--color-surface-muted)] text-[var(--color-text)]'
                        : 'text-[var(--color-text-muted)] hover:bg-[var(--color-surface-muted)]/60 hover:text-[var(--color-text)]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                    )}
                  </motion.button>
                );
              })}

              {/* Mobile CTA */}
              <motion.div
                className="pt-4 mt-3 border-t border-[var(--color-border)]"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ...itemTransition,
                  delay: 0.06 + primaryLinks.length * 0.05,
                }}
              >
                <button
                  onClick={() => {
                    router.push('/assessment');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold theme-btn-primary transition-all duration-200 active:scale-[0.98]"
                >
                  Start assessment
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    router.push('/contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mt-2 py-3 rounded-xl text-sm font-medium theme-btn-ghost transition-all duration-200 active:scale-[0.98]"
                >
                  Contact support
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;