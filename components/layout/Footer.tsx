import React from "react";
import {
  Shield,
  Phone,
  Mail,
  MessageSquare,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";

// Platform Brand Social Icons
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const TikTokIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.36 1.47-1.42 2.47-.09 1.25.47 2.48 1.46 3.17.99.69 2.33.8 3.48.28 1.07-.47 1.85-1.51 1.98-2.67.09-2.58.04-5.17.05-7.75z" />
  </svg>
);

const XIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

const ThreadsIcon = () => (
  <svg
    className="w-4 h-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M12.01 2C6.49 2 3 5.59 3 11.25c0 6.06 3.57 10.75 9.37 10.75 4.78 0 8.1-2.76 8.1-6.84 0-3.69-2.53-6.11-6.31-6.11-1.45 0-2.6.39-3.44 1.16-.14-1.76.59-2.76 2.25-2.76 1.13 0 1.94.48 2.49 1.45l2.12-1.08C16.58 5.03 14.99 4.1 12.84 4.1c-3.45 0-5.25 2.3-5.25 6.39 0 4.46 2.06 7.02 5.66 7.02 2.17 0 3.59-.97 4.16-2.75.42-1.3.02-2.54-1.08-3.37-.85-.64-2.02-.95-3.5-.95-1.24 0-2.17.29-2.77.86-.58.55-.77 1.31-.57 2.27.2.96.93 1.45 2.17 1.45 1.03 0 1.69-.38 1.99-1.15.09-.23.14-.5.14-.8 1.07.18 1.61.65 1.61 1.41 0 1.14-.91 1.72-2.71 1.72-2.14 0-3.31-1.51-3.31-4.25 0-2.56 1.17-3.89 3.42-3.89 2.18 0 3.66 1.23 4.42 3.66l2.27-.62C18.55 5.44 15.8 2 12.01 2Z" />
  </svg>
);

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border)] text-[var(--foreground-muted)] text-sm pt-20 pb-12 relative overflow-hidden">
      {/* Background Architectural Grid Pattern */}
      <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none"></div>

      {/* Decorative Gold Rule Header */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* TOP BRAND & EMERGENCY NOTICE GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-[var(--border)]">
          {/* BRAND IDENTITY COLUMN */}
          <div className="lg:col-span-5 space-y-6">
            <Link
              href="/"
              className="flex items-center gap-3 group inline-flex"
            >
              <div className="flex items-center justify-center w-11 h-11 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border-subtle)] group-hover:border-[var(--gold)] transition-colors shadow-lg">
                <Shield className="w-5 h-5 text-[var(--gold)]" />
              </div>
              <div>
                <span className="font-cinzel text-xl font-black tracking-wider text-[var(--foreground)] block">
                  REHAB NIGERIA
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-mono block">
                  {siteConfig.tagline}
                </span>
              </div>
            </Link>

            <p className="text-xs text-[var(--foreground-muted)] leading-relaxed max-w-md font-sans">
              Rehab Nigeria provides dignified, private online rehabilitation
              consultation and support for individuals and families affected by
              substance use across all states in Nigeria.
            </p>

            {/* CONSULTATION FEE BANNER & WHATSAPP CHAT BUTTON */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-3 p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-xs font-mono">
                <span className="text-[var(--gold)] font-bold">
                  1-ON-1 ONLINE FEE:
                </span>
                <span className="text-[var(--foreground)] font-bold">
                  ₦{siteConfig.consultationFee}
                </span>
              </div>

              <a
                href="https://wa.me/2340000000000?text=Hello%20Rehab%20Nigeria%2C%20I%20would%20like%20to%20inquire%20about%20a%20confidential%20consultation."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 p-3 bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/30 text-[#25D366] rounded-sm text-xs font-mono font-bold transition-all"
              >
                <WhatsAppIcon />
                <span>CONFIDENTIAL CHAT</span>
              </a>
            </div>
          </div>

          {/* EMERGENCY MEDICAL DISCLAIMER */}
          <div className="lg:col-span-7 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-sm p-6 sm:p-8 flex flex-col sm:flex-row gap-5 items-start relative group crosshair-corner shadow-xl">
            <div className="p-3 bg-[var(--gold)]/10 text-[var(--gold)] rounded-sm shrink-0 border border-[var(--gold)]/20">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="space-y-2 font-sans text-xs">
              <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase block tracking-wider">
                Emergency & Hospital Notice
              </span>
              <p className="text-[var(--foreground-muted)] leading-relaxed">
                Rehab Nigeria is a digital consultation and clinical guidance
                platform for elective addiction rehabilitation.{" "}
                <strong className="text-[var(--foreground)] font-bold">
                  It is NOT an acute hospital emergency room.
                </strong>{" "}
                If you or a family member are experiencing acute medical
                overdose, severe physical withdrawal symptoms, or immediate
                self-harm crisis, please go directly to the nearest hospital
                emergency department immediately.
              </p>
            </div>
          </div>
        </div>

        {/* NAVIGATION COLUMNS */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-16 border-b border-[var(--border)] font-sans text-xs">
          {/* ABOUT */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-[var(--gold)] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
              <span>ABOUT</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  About Rehab Nigeria
                </Link>
              </li>
              <li>
                <Link
                  href="/about#story"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Our Founding Story
                </Link>
              </li>
              <li>
                <Link
                  href="/about#values"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Institutional Values
                </Link>
              </li>
              <li>
                <Link
                  href="/professionals"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Our Clinical Team
                </Link>
              </li>
            </ul>
          </div>

          {/* CARE & SERVICES */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-[var(--gold)] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
              <span>SERVICES</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/services/online-consultation"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link
                  href="/services/substance-use-assessment"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Substance Use Intake
                </Link>
              </li>
              <li>
                <Link
                  href="/services/follow-up-support"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Follow-Up Sessions
                </Link>
              </li>
              <li>
                <Link
                  href="/services/family-support"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Family Guidance
                </Link>
              </li>
              <li>
                <Link
                  href="/services/recovery-guidance"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Recovery Pathway
                </Link>
              </li>
            </ul>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-[var(--gold)] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
              <span>JOURNEY</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/how-it-works"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/for-families"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  For Loved Ones
                </Link>
              </li>
              <li>
                <Link
                  href="/resources"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Educational Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/challenges"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Awareness Campaigns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Common Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="space-y-4">
            <h4 className="font-mono text-xs font-bold text-[var(--gold)] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
              <span>CONTACT</span>
            </h4>
            <ul className="space-y-3 text-[var(--foreground-muted)] font-mono text-[11px]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                <span>{siteConfig.phonePlaceholder}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                <span className="truncate">{siteConfig.emailPlaceholder}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                <span>WhatsApp Available</span>
              </li>
            </ul>
          </div>

          {/* LEGAL */}
          <div className="space-y-4 col-span-2 md:col-span-1">
            <h4 className="font-mono text-xs font-bold text-[var(--gold)] tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[var(--gold)] rounded-full"></span>
              <span>COMPLIANCE</span>
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/privacy-policy"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/cookie-policy"
                  className="hover:text-[var(--gold)] transition-colors"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM SOCIAL BAR & COPYRIGHT */}
        <div className="pt-10 flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-[var(--foreground-subtle)] font-mono">
          <div className="flex flex-wrap items-center gap-3">
            <span>© 2026 REHAB NIGERIA. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-[var(--border)]">•</span>
            <span className="text-[var(--foreground-subtle)]">
              DIGITAL HEALTHCARE INITIATIVE
            </span>
          </div>

          {/* BRANDED SOCIAL MEDIA ICONS WITH DISTINCT ACCENT HOVER COLORS */}
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-widest mr-1">
              CONNECT:
            </span>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/share/p/1CboahMkHM/`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rehab Nigeria on Facebook"
              className="p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground-muted)] hover:text-[#1877F2] hover:border-[#1877F2]/50 hover:bg-[#1877F2]/10 transition-all duration-300"
              title="Facebook"
            >
              <FacebookIcon />
            </a>

            {/* Instagram */}
            <a
              href={`https://www.instagram.com/rehab.nigeria?igsh=cnF6N3Bqdnd6dzk2`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rehab Nigeria on Instagram"
              className="p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground-muted)] hover:text-[#E4405F] hover:border-[#E4405F]/50 hover:bg-[#E4405F]/10 transition-all duration-300"
              title="Instagram"
            >
              <InstagramIcon />
            </a>

            {/* TikTok */}
            <a
              href={`https://www.tiktok.com/@rehab_nigeria?_r=1&_t=ZS-98wF1JuDuqY`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rehab Nigeria on TikTok"
              className="p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground-muted)] hover:text-[#25F4EE] hover:border-[#25F4EE]/50 hover:bg-[#25F4EE]/10 transition-all duration-300"
              title="TikTok"
            >
              <TikTokIcon />
            </a>

            {/* X (Twitter) */}
            <a
              href={`https://x.com/i/status/2088343473330258172`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rehab Nigeria on X"
              className="p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:border-[var(--foreground)]/50 hover:bg-[var(--foreground)]/10 transition-all duration-300"
              title="X (Twitter)"
            >
              <XIcon />
            </a>
            {/* Threads */}
            <Link
              href={`https://www.threads.com/@rehab.nigeria`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 p-3 bg-[var(--foreground)]/10 hover:bg-[var(--foreground)]/20 border border-[var(--foreground)]/30 text-[var(--foreground)] rounded-sm text-xs font-mono font-bold transition-all"
            >
              <ThreadsIcon />
            </Link>

            {/* WhatsApp */}
            <Link
              href="https://wa.me/2349040116529"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Rehab Nigeria on WhatsApp"
              className="p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground-muted)] hover:text-[#25D366] hover:border-[#25D366]/50 hover:bg-[#25D366]/10 transition-all duration-300"
              title="WhatsApp"
            >
              <WhatsAppIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
