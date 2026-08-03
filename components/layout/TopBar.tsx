'use client';

import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TopBarProps {
  email?: string;
  phoneNumbers?: string[];
  whatsappNumber?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const TopBar: React.FC<TopBarProps> = ({
  email = 'hello@rehabconnect.ng',
  phoneNumbers = ['+234 800 000 0000', '+234 800 000 0001'],
  whatsappNumber = '2348000000000',
  facebookUrl = 'https://facebook.com',
  instagramUrl = 'https://instagram.com',
  twitterUrl = 'https://twitter.com',
}) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative w-full border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] overflow-hidden"
        >
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-5 py-2 text-xs sm:px-8 lg:px-12">
            
            {/* ── Left: Contact Info ── */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
              {/* Email */}
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200"
              >
                <Mail className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                <span className="font-medium">{email}</span>
              </a>

              {/* Divider */}
              <span className="hidden sm:block w-px h-3.5 bg-[var(--color-border)]" aria-hidden />

              {/* Phone */}
              <div className="inline-flex items-center gap-1.5 text-[var(--color-text-muted)]">
                <Phone className="h-3.5 w-3.5 shrink-0 text-[var(--color-accent)]" />
                <div className="flex flex-wrap items-center gap-x-1.5">
                  {phoneNumbers.map((phone, idx) => (
                    <React.Fragment key={phone}>
                      <a
                        href={`tel:${phone.replace(/\s+/g, '')}`}
                        className="font-medium hover:text-[var(--color-accent)] transition-colors duration-200"
                      >
                        {phone}
                      </a>
                      {idx < phoneNumbers.length - 1 && (
                        <span className="text-[var(--color-border)]">·</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Right: Social + Close ── */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* WhatsApp */}
              {whatsappNumber && (
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat on WhatsApp"
                  className="p-1 rounded-md text-emerald-500 hover:bg-emerald-50 transition-all duration-200"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                </a>
              )}

              {/* Facebook */}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="p-1 rounded-md text-blue-600 hover:bg-blue-50 transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}

              {/* Instagram */}
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="p-1 rounded-md text-pink-500 hover:bg-pink-50 transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
              )}

              {/* Twitter / X */}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X (Twitter)"
                  className="p-1 rounded-md text-neutral-800 hover:bg-neutral-100 transition-all duration-200"
                >
                  <svg className="h-3.5 w-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}

              {/* Divider */}
              {/* <span className="w-px h-3.5 bg-[var(--color-border)]" aria-hidden /> */}

              {/* Close button */}
              {/* <button
                onClick={() => setIsVisible(false)}
                aria-label="Close top bar"
                className="p-1 rounded-md text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-surface)] transition-all duration-200"
              >
                <X className="h-3.5 w-3.5" />
              </button> */}
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopBar;