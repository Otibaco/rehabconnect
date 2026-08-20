"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  ArrowUpRight, 
  ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { siteConfig } from "@/lib/config";
import { MobileNavigation } from "./MobileNavigation";

interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    label: string;
    path: string;
    description?: string;
  }[];
}

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Handle dropdown hover with delay
  const handleDropdownEnter = (label: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const navItems: NavItem[] = [
    {
      label: "HOME",
      path: "/",
    },
    {
      label: "SERVICES",
      path: "/services",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Online Consultation",
          path: "/services/online-consultation",
          description: "Private virtual sessions with qualified professionals",
        },
        {
          label: "Substance Use Assessment",
          path: "/services/substance-use-assessment",
          description: "Comprehensive clinical evaluation and screening",
        },
        {
          label: "Follow-Up Support",
          path: "/services/follow-up-support",
          description: "Continuous care and recovery monitoring",
        },
        {
          label: "Family Support",
          path: "/services/family-support",
          description: "Guidance for loved ones and caregivers",
        },
        {
          label: "Recovery Guidance",
          path: "/services/recovery-guidance",
          description: "Evidence-based recovery planning",
        },
      ],
    },
    {
      label: "ABOUT",
      path: "/about",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "Our Mission",
          path: "/about",
          description: "Our commitment to compassionate care",
        },
        {
          label: "For Families",
          path: "/for-families",
          description: "Supporting your loved ones' journey",
        },
        {
          label: "Professionals",
          path: "/professionals",
          description: "Meet our clinical team",
        },
        {
          label: "How It Works",
          path: "/how-it-works",
          description: "Understanding our process",
        },
      ],
    },
    {
      label: "CHALLENGES",
      path: "/challenges",
    },
    {
      label: "CONTACT",
      path: "/contact",
    },
  ];

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === "/") {
      return pathname === "/";
    }
    return pathname === path || pathname.startsWith(`${path}/`);
  };

  const isDropdownActive = (items?: { path: string }[]) => {
    if (!items) return false;
    return items.some(item => isActive(item.path));
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--background)]/92 py-2 shadow-2xl backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-gradient-to-b from-[var(--background)] via-[var(--background)]/80 to-transparent py-4"
        }`}
      >
        {/* Subtle Gold Glow Line */}
        <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/20 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`} />

        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* LOGO - With Image */}
          <Link
            href="/"
            className="group flex items-center gap-3 relative"
            aria-label="Rehab Nigeria home"
          >
            
              <Image
                src="/rehab-nigeria-logo.png"
                alt="Rehab Nigeria Logo"
                width={50}
                height={50}
                className="object-contain"
                priority
              />
              

            <div className="leading-tight">
              <span className="block font-cinzel text-base sm:text-lg font-bold tracking-wider text-[var(--foreground)] transition-colors group-hover:text-[var(--gold-light)]">
                REHAB NIGERIA
              </span>
              <span className="hidden text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--foreground-subtle)] sm:block">
                {siteConfig.tagline || "Confidential Healthcare"}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const active = isActive(item.path);
              const dropdownActive = isDropdownActive(item.dropdownItems);
              const isOpen = openDropdown === item.label;

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    ref={dropdownRef}
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-1 px-3.5 py-2.5 text-xs font-mono tracking-wider transition-all duration-300 rounded-sm relative ${
                        active || dropdownActive
                          ? "font-bold text-[var(--gold)]"
                          : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]/50"
                      }`}
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-3 w-3 text-[var(--gold)] transition-all duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                      
                      {/* Active indicator */}
                      {(active || dropdownActive) && (
                        <motion.span 
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
                          layoutId="navIndicator"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                    </Link>

                    {/* DROPDOWN - Modern Mega Menu Style */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute left-0 top-full pt-3 min-w-[320px]"
                        >
                          <div className="overflow-hidden bg-[var(--background-secondary)] border border-[var(--border)] shadow-2xl rounded-sm">
                            {/* Decorative gold top line */}
                            <div className="h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />
                            
                            <div className="p-2 space-y-0.5">
                              {item.dropdownItems?.map((sub, idx) => (
                                <motion.div
                                  key={sub.path}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: idx * 0.05 }}
                                >
                                  <Link
                                    href={sub.path}
                                    className={`group flex items-start gap-3 px-3.5 py-3 rounded-sm transition-all duration-200 ${
                                      isActive(sub.path)
                                        ? "bg-[var(--background-tertiary)] text-[var(--gold)]"
                                        : "text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--foreground)]"
                                    }`}
                                  >
                                    <div className="flex-1 min-w-0">
                                      <div className="font-sans text-xs font-bold tracking-wide">
                                        {sub.label}
                                      </div>
                                      {sub.description && (
                                        <div className="font-sans text-[10px] text-[var(--foreground-subtle)] mt-0.5 leading-relaxed line-clamp-2">
                                          {sub.description}
                                        </div>
                                      )}
                                    </div>
                                    {isActive(sub.path) && (
                                      <ArrowUpRight className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
                                    )}
                                  </Link>
                                </motion.div>
                              ))}
                            </div>

                            {/* Bottom CTA */}
                            <div className="border-t border-[var(--border-subtle)] p-3 bg-[var(--background-tertiary)]/30">
                              <Link
                                href={item.path}
                                className="flex items-center justify-between text-xs font-mono text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors group"
                              >
                                <span className="font-bold tracking-wider">VIEW ALL {item.label}</span>
                                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`relative px-3.5 py-2.5 text-xs font-mono tracking-wider transition-all duration-300 rounded-sm ${
                    active
                      ? "font-bold text-[var(--gold)] bg-[var(--background-tertiary)]/30"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]/30"
                  }`}
                >
                  {item.label}
                  
                  {active && (
                    <motion.span 
                      className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)]"
                      layoutId="navIndicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP ACTIONS - Enhanced */}
          <div className="hidden items-center gap-3 sm:flex">
            <Link
              href="/auth/signin"
              className="px-4 py-2 text-xs font-mono tracking-wider text-[var(--foreground-muted)] transition-all duration-300 hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)]/50 rounded-sm"
            >
              SIGN IN
            </Link>

            <Link
              href="/auth/signup"
              className="group relative inline-flex items-center justify-center overflow-hidden bg-[var(--gold)] px-6 py-2.5 text-xs font-mono font-bold tracking-wider text-[var(--background)] transition-all duration-300 hover:bg-[var(--gold-light)] shadow-[0_4px_20px_rgba(200,164,93,0.15)] hover:shadow-[0_4px_30px_rgba(200,164,93,0.25)]"
            >
              <span className="relative z-10 flex items-center">
                GET STARTED
                <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
              {/* Subtle shimmer effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/auth/signin"
              className="hidden sm:flex items-center gap-1.5 bg-[var(--background-tertiary)] px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-[var(--foreground)] border border-[var(--border-subtle)] hover:border-[var(--gold)] transition-all duration-300"
            >
              SIGN IN
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-[var(--foreground)] transition-all duration-300 hover:border-[var(--gold)] hover:text-[var(--gold)] hover:shadow-[0_0_30px_rgba(200,164,93,0.05)]"
              aria-label="Open navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION */}
      <MobileNavigation
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
    </>
  );
};