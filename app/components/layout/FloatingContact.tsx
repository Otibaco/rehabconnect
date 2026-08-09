import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Phone, Mail, ArrowUpRight, X, Shield } from 'lucide-react';
import { siteConfig } from '../../lib/config';

export const FloatingContact: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {/* EXPANDABLE QUICK ACTIONS PANEL */}
      {isOpen && (
        <div className="mb-4 w-72 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm p-4 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)] mb-3">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-[var(--gold)]" />
              <span className="font-cinzel text-xs font-bold text-[var(--foreground)] tracking-wide">
                REHAB NIGERIA
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[var(--foreground-muted)] hover:text-[var(--gold)]"
              aria-label="Close widget"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-[var(--foreground-muted)] font-sans mb-3">
            Looking for professional support or general enquiries? Choose a quick contact option below:
          </p>

          <div className="space-y-2 font-mono text-xs">
            <a
              href={`https://wa.me/?text=Hello%20Rehab%20Nigeria`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-2 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-[var(--green)]" />
                <span>WhatsApp Enquiry</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
            </a>

            <a
              href={`tel:${siteConfig.phonePlaceholder}`}
              className="flex items-center justify-between p-2 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[var(--gold)]" />
                <span>Call Information</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
            </a>

            <Link
              to="/contact"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-between p-2 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[var(--gold)]" />
                <span>Send Enquiry Form</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
            </Link>

            <Link
              to="/how-it-works"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold rounded-sm transition-colors mt-2"
            >
              START YOUR JOURNEY →
            </Link>
          </div>
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 px-4 py-3 bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--gold)] rounded-full shadow-2xl text-xs font-mono tracking-wider text-[var(--foreground)] transition-all"
        aria-label="Contact options"
      >
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-4 h-4 text-[var(--gold)] group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[var(--green)] animate-pulse"></span>
        </div>
        <span className="hidden sm:inline font-bold">CONTACT & SUPPORT</span>
      </button>
    </div>
  );
};
