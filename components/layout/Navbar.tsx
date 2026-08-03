'use client'
import React, { useState, useEffect } from 'react';

import { HeartHandshake, Menu, X, ShieldCheck, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';
import { RoutePath } from '@/lib/types';

export const Navbar: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; path: RoutePath }[] = [
    { label: 'Home', path: '/' },
    // { label: 'How It Works', path: '/how-it-works' },
    { label: 'For Patients', path: '/for-patients' },
    { label: 'For Families', path: '/for-families' },
    // { label: 'Care Coordinators', path: '/care-coordinators' },
    // { label: 'Rehab Centres', path: '/rehabilitation-centres' },
    // { label: 'Referral Verification', path: '/referral-portal' },
    // { label: 'System Architecture', path: '/portal-dashboard' },
    { label: 'About Us', path: '/about' },
    { label: 'Resources', path: '/resources' },
    { label: 'Contact Us', path: '/contact'},
    // { label: 'Help Center', path: '/help-center' },
    // { label: 'FAQ', path: '/faq' },
  ];

  // const secondaryLinks: { label: string; path: RoutePath; desc: string }[] = [
  //   { label: 'Partner Portal Inquiry', path: '/rehabilitation-centres', desc: 'Join as a verified center' },
  //   { label: 'Care Lead Directory', path: '/care-coordinators', desc: 'Meet our clinical leaders' },
  // ];

  return (
    <header
      className={`w-full sticky top-0 z-60 transition-all duration-300 ${
        isScrolled ? 'py-3' : 'py-4'
      } border-b backdrop-blur-xl theme-surface theme-text theme-border theme-shadow theme-transition`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-accent) rounded-lg"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-(--color-accent) via-(--color-accent-strong) to-(--color-accent-soft) flex items-center justify-center text-(--color-accent-contrast) shadow-md group-hover:scale-105 transition-transform duration-200">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading font-extrabold text-xl tracking-tight theme-text flex items-center gap-1">
                Rehab<span className="theme-accent">Connect</span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-(--color-accent) animate-pulse"></span>
              </span>
              <span className="text-[10px] font-medium uppercase tracking-widest theme-text-muted -mt-0.5">
                Healthcare Network
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 p-1 rounded-full theme-nav-shell theme-transition">
            {navLinks.slice(0, 6).map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => router.push(link.path)}
                  className={`relative px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 theme-transition ${
                    isActive
                      ? 'theme-nav-pill-active'
                      : 'theme-text-muted hover:text-(--color-text) hover:bg-(--color-surface-muted)'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-(--color-surface-elevated) -z-10 shadow-xs"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2.5">
            {/* <ThemeToggle /> */}

            <button
              onClick={() => router.push('/register')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 theme-btn-primary theme-transition"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Start Assessment</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-full transition-colors theme-text theme-transition hover:bg-(--color-surface-muted)"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="lg:hidden backdrop-blur-xl border-b overflow-hidden theme-surface theme-border theme-transition"
          >
            <div className="px-4 pt-3 pb-6 space-y-2 max-h-[85vh] overflow-y-auto">
              <div className="flex items-center justify-between px-3 py-2 text-xs font-semibold uppercase tracking-wider theme-text-muted">
                <span>Navigation Menu</span>
                <span className="flex items-center gap-1 theme-accent">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Platform
                </span>
              </div>

              {navLinks.map((link) => {
                const isActive = currentPath === link.path;
                return (
                  <button
                    key={link.path}
                    onClick={() => {
                      router.push(link.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-medium transition-all theme-transition ${
                      isActive
                        ? 'theme-accent-soft theme-accent font-semibold shadow-xs'
                        : 'theme-text hover:bg-(--color-surface-muted)'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && <div className="w-2 h-2 rounded-full bg-(--color-accent)"></div>}
                  </button>
                );
              })}

              <div className="pt-4 border-t theme-border space-y-2">
                <button
                  onClick={() => {
                    router.push('/register');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-semibold text-sm shadow-md active:scale-[0.98] transition-transform theme-btn-primary theme-transition"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Start Recovery Consultation</span>
                </button>

                <button
                  onClick={() => {
                    router.push('/contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 rounded-2xl text-center text-sm font-medium transition-colors theme-btn-ghost theme-transition"
                >
                  Contact General Support
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
