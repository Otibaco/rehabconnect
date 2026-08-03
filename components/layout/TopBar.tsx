'use client';

import React from 'react';
import { Mail, Phone, MessageCircle } from 'lucide-react';

interface TopBarProps {
  email?: string;
  phoneNumbers?: string[];
  whatsappNumber?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
}

export const TopBar: React.FC<TopBarProps> = ({
  email = 'info@synapseservices.org',
  phoneNumbers = ['08139954314', '08111695982', '08111695906'],
  whatsappNumber = '2348139954314',
  facebookUrl = 'https://facebook.com',
  instagramUrl = 'https://instagram.com',
  twitterUrl = 'https://twitter.com',
}) => {
  return (
    // Light mode: Slate 100 bg, Slate 800 text
    // Dark mode: Deep Slate 900 bg, White text
    <header className="w-full border-b border-slate-200/60 bg-slate-100 text-slate-800 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-2.5 text-xs sm:text-sm lg:px-8">
        
        {/* Contact Info */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          {/* Email */}
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 font-medium transition-colors hover:text-teal-600 dark:hover:text-teal-400"
          >
            <Mail className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
            <span>{email}</span>
          </a>

          {/* Divider */}
          <div className="hidden h-4 w-px bg-slate-300 dark:bg-slate-700 sm:block" aria-hidden />

          {/* Phone Numbers */}
          <div className="flex items-center gap-2 font-medium">
            <Phone className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400" />
            <div className="flex flex-wrap items-center gap-1">
              {phoneNumbers.map((phone, idx) => (
                <React.Fragment key={phone}>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="transition-colors hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    {phone}
                  </a>
                  {idx < phoneNumbers.length - 1 && <span className="font-normal text-slate-400 dark:text-slate-500">;</span>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-2 flex items-center gap-4 text-slate-600 dark:text-slate-300 sm:mt-0">
          {whatsappNumber && (
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="transition-transform hover:scale-110 hover:text-emerald-500 dark:hover:text-emerald-400"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          )}
          {facebookUrl && (
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="transition-transform hover:scale-110 hover:text-blue-600 dark:hover:text-blue-400"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          )}
          {instagramUrl && (
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="transition-transform hover:scale-110 hover:text-pink-500 dark:hover:text-pink-400"
            >
              <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>
          )}
          {twitterUrl && (
            <a
              href={twitterUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              className="transition-transform hover:scale-110 hover:text-sky-500 dark:hover:text-sky-400"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          )}
        </div>

      </div>
    </header>
  );
};

export default TopBar;