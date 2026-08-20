import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Calendar,
  ArrowUpRight,
} from "lucide-react";
import { siteConfig } from "@/lib/config";

// Platform Brand Social Icons with Real Colors
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
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.01 2C6.49 2 3 5.59 3 11.25c0 6.06 3.57 10.75 9.37 10.75 4.78 0 8.1-2.76 8.1-6.84 0-3.69-2.53-6.11-6.31-6.11-1.45 0-2.6.39-3.44 1.16-.14-1.76.59-2.76 2.25-2.76 1.13 0 1.94.48 2.49 1.45l2.12-1.08C16.58 5.03 14.99 4.1 12.84 4.1c-3.45 0-5.25 2.3-5.25 6.39 0 4.46 2.06 7.02 5.66 7.02 2.17 0 3.59-.97 4.16-2.75.42-1.3.02-2.54-1.08-3.37-.85-.64-2.02-.95-3.5-.95-1.24 0-2.17.29-2.77.86-.58.55-.77 1.31-.57 2.27.2.96.93 1.45 2.17 1.45 1.03 0 1.69-.38 1.99-1.15.09-.23.14-.5.14-.8 1.07.18 1.61.65 1.61 1.41 0 1.14-.91 1.72-2.71 1.72-2.14 0-3.31-1.51-3.31-4.25 0-2.56 1.17-3.89 3.42-3.89 2.18 0 3.66 1.23 4.42 3.66l2.27-.62C18.55 5.44 15.8 2 12.01 2Z" />
  </svg>
);

// Social Media Links Configuration
const socialLinks = [
  {
    name: "Facebook",
    icon: FacebookIcon,
    url: "https://www.facebook.com/share/p/1CboahMkHM/",
    color: "#1877F2",
  },
  {
    name: "Instagram",
    icon: InstagramIcon,
    url: "https://www.instagram.com/rehab.nigeria?igsh=cnF6N3Bqdnd6dzk2",
    color: "#E4405F",
  },
  {
    name: "TikTok",
    icon: TikTokIcon,
    url: "https://www.tiktok.com/@rehab_nigeria?_r=1&_t=ZS-98wF1JuDuqY",
    color: "#25F4EE",
  },
  {
    name: "X",
    icon: XIcon,
    url: "https://x.com/i/status/2088343473330258172",
    color: "#F5F1E8",
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
    url: "https://wa.me/2349040116529",
    color: "#25D366",
  },
  {
    name: "Threads",
    icon: ThreadsIcon,
    url: "https://www.threads.com/@rehab.nigeria",
    color: "#F5F1E8",
  },
];

// Articles Data with Images
const articles = [
  {
    title: "Mental Health: Living a healthy life",
    date: "15 Mar, 2026",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=100&q=80",
    href: "/resources/mental-health-living-healthy",
  },
  {
    title: "Together... providing mental health care & support",
    date: "21 Apr, 2026",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=100&q=80",
    href: "/resources/together-mental-health-care",
  },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--background-secondary)] border-t border-[var(--border)] text-[var(--foreground-muted)] pt-16 pb-8 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--gold)]/5 to-transparent pointer-events-none" />

      {/* Decorative Gold Rule Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* MAIN GRID - OlivePrime Style */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-[var(--border)]">
          
          {/* LEFT COLUMN - Brand + Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-5"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative flex h-12 w-12 items-center justify-center rounded-sm overflow-hidden  transition-all duration-300 group-hover:border-[var(--gold)] group-hover:shadow-[0_0_30px_rgba(200,164,93,0.08)] bg-[var(--background-secondary)]">
                <Image
                  src="/rehab-nigeria-logo.png"
                  alt="Rehab Nigeria Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold tracking-wider text-[var(--foreground)] block group-hover:text-[var(--gold-light)] transition-colors">
                  REHAB NIGERIA
                </span>
                <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--gold)] font-mono block">
                  {siteConfig.tagline || "Confidential Healthcare"}
                </span>
              </div>
            </Link>

            <p className="text-sm text-[var(--foreground-muted)] leading-relaxed max-w-md font-sans">
              We are committed to providing individuals with a flexible pathway towards full recovery by providing hours, days and weeks of structured support as well as psychoeducation about substance use and mental disorders.
            </p>
          </motion.div>

          {/* MIDDLE COLUMN - Quick Links + Articles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase mb-3">
                QUICK LINKS
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                <Link href="/services/online-consultation" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Online Consultation
                </Link>
                <Link href="/services/substance-use-assessment" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Substance Use Intake
                </Link>
                <Link href="/services/follow-up-support" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Follow-Up Sessions
                </Link>
                <Link href="/services/family-support" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Family Guidance
                </Link>
                <Link href="/services/recovery-guidance" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Recovery Pathway
                </Link>
              </div>
            </div>

            {/* Current Articles with Images */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase mb-3">
                CURRENT ARTICLES
              </h4>
              <div className="space-y-3">
                {articles.map((article, idx) => (
                  <Link 
                    key={idx} 
                    href={article.href}
                    className="group flex items-start gap-3 p-2 rounded-sm hover:bg-[var(--background-tertiary)] transition-all duration-300 hover:border-[var(--gold)] border border-transparent"
                  >
                    {/* Article Image */}
                    <div className="relative w-12 h-12 rounded-sm overflow-hidden flex-shrink-0 border border-[var(--border-subtle)] group-hover:border-[var(--gold)] transition-all duration-300">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    
                    {/* Article Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors duration-300 leading-snug line-clamp-2">
                        {article.title}
                      </p>
                      <span className="text-[10px] font-mono text-[var(--foreground-subtle)] flex items-center gap-1 mt-0.5">
                        <Calendar className="w-3 h-3" />
                        {article.date}
                      </span>
                    </div>
                    
                    <ArrowUpRight className="w-3.5 h-3.5 text-[var(--foreground-subtle)] opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Social + Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            {/* Our Social Media */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase mb-3">
                OUR SOCIAL MEDIA
              </h4>
              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed mb-3">
                Join our social media platforms today!
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Rehab Nigeria on ${social.name}`}
                    className="p-2 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] transition-all duration-300 hover:scale-110 hover:shadow-lg hover:bg-[var(--gold)] hover:text-[var(--background)] hover:border-[var(--gold)] group"
                    title={social.name}
                  >
                    <social.icon />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase mb-3">
                CONTACT
              </h4>
              <div className="space-y-1.5">
                <a
                  href="tel:+2348012345678"
                  className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300"
                >
                  <Phone className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>{siteConfig.phonePlaceholder || "+234 801 234 5678"}</span>
                </a>
                <a
                  href="mailto:hello@rehabnigeria.org"
                  className="flex items-center gap-2 text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300"
                >
                  <Mail className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>{siteConfig.emailPlaceholder || "hello@rehabnigeria.org"}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM SECTION - Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-[var(--border)]">
          {/* ABOUT */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase">
              ABOUT
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  About Rehab Nigeria
                </Link>
              </li>
              <li>
                <Link href="/about#story" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Our Founding Story
                </Link>
              </li>
              <li>
                <Link href="/about#values" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Institutional Values
                </Link>
              </li>
              <li>
                <Link href="/professionals" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Our Clinical Team
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase">
              SERVICES
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/services/online-consultation" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Online Consultation
                </Link>
              </li>
              <li>
                <Link href="/services/substance-use-assessment" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Substance Use Intake
                </Link>
              </li>
              <li>
                <Link href="/services/follow-up-support" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Follow-Up Sessions
                </Link>
              </li>
              <li>
                <Link href="/services/family-support" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Family Guidance
                </Link>
              </li>
              <li>
                <Link href="/services/recovery-guidance" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Recovery Pathway
                </Link>
              </li>
            </ul>
          </div>

          {/* JOURNEY */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase">
              JOURNEY
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/how-it-works" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/for-families" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  For Loved Ones
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Educational Articles
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Awareness Campaigns
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Common Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPLIANCE */}
          <div className="space-y-3">
            <h4 className="font-mono text-[10px] font-bold text-[var(--gold)] tracking-widest uppercase">
              COMPLIANCE
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-use" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors duration-300">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono text-[var(--foreground-subtle)]">
            <span>© {currentYear} REHAB NIGERIA. ALL RIGHTS RESERVED.</span>
            <span className="hidden sm:inline text-[var(--border)]">•</span>
            <span>DIGITAL HEALTHCARE INITIATIVE</span>
          </div>

          {/* Social Icons Small */}
          <div className="flex items-center gap-2">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Rehab Nigeria on ${social.name}`}
                className="p-1.5 text-[var(--foreground-subtle)] hover:text-[var(--gold)] transition-colors duration-300 hover:scale-110"
                title={social.name}
              >
                <social.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Decorative Gold Line */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent" />
      </div>
    </footer>
  );
};