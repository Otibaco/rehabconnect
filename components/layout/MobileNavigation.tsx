import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight, Phone, Mail, Shield } from 'lucide-react';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNavigation: React.FC<MobileNavigationProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    {label: 'ABOUT', path: '/about' },
    {label: 'CARE & SERVICES', path: '/services' },
    {label: 'HOW IT WORKS', path: '/how-it-works' },
    {label: 'FOR FAMILIES', path: '/for-families' },
    {label: 'PROFESSIONALS', path: '/professionals' },
    {label: 'RESOURCES', path: '/resources' },
    {label: 'CHALLENGES', path: '/challenges' },
    {label: 'FAQ', path: '/faq' },
    {label: 'CONTACT', path: '/contact' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-[#080907] flex flex-col justify-between overflow-y-auto"
        >
          {/* Subtle Background Decorative Shapes */}
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-[var(--green-dark)]/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-10 left-0 w-80 h-80 bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* TOP BAR */}
          <div className="p-6 flex items-center justify-between border-b border-[var(--border)] relative z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-9 h-9 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                <Shield className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <div>
                <span className="font-cinzel text-lg font-bold text-[var(--foreground)] tracking-wider">
                  REHAB NIGERIA
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-[var(--foreground-subtle)] font-mono">
                  {siteConfig.tagline}
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 text-[var(--foreground)] hover:text-[var(--gold)] bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* MENU ITEMS */}
          <div className="px-6 py-8 relative z-10 flex-1 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full space-y-3">
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04 + 0.1, duration: 0.3 }}
                >
                  <Link
                    href={item.path}
                    onClick={onClose}
                    className="group flex items-center justify-between py-2.5 border-b border-[var(--border-subtle)] hover:border-[var(--gold)] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      {/* <span className="font-mono text-xs text-[var(--gold)] font-bold">{item.number}</span> */}
                      <span className="font-cinzel text-xl sm:text-2xl font-semibold text-[var(--foreground)] group-hover:text-[var(--gold-light)] transition-colors tracking-wide">
                        {item.label}
                      </span>
                    </div>
                    <ArrowUpRight className="w-5 h-5 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* BOTTOM ACTIONS & CONTACT FOOTER */}
          <div className="p-6 border-t border-[var(--border)] bg-[var(--background-secondary)] relative z-10">
            <div className="max-w-md mx-auto w-full space-y-4">
              
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href="/auth/signin"
                  onClick={onClose}
                  className="w-full text-center py-3 text-xs font-mono tracking-wider text-[var(--foreground)] bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] rounded-sm transition-colors"
                >
                  LOGIN
                </Link>

                <Link
                  href="/how-it-works"
                  onClick={onClose}
                  className="w-full text-center py-3 text-xs font-mono font-bold tracking-wider text-[#080907] bg-[var(--gold)] hover:bg-[var(--gold-light)] rounded-sm transition-colors"
                >
                  GET STARTED
                </Link>
              </div>

              <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[var(--foreground-muted)]">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>{siteConfig.phonePlaceholder}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>{siteConfig.emailPlaceholder}</span>
                </div>
              </div>

            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};
