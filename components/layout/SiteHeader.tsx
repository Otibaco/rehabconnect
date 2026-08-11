"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Shield, ArrowUpRight, ChevronDown } from "lucide-react";

import { siteConfig } from "@/lib/config";
import { MobileNavigation } from "./MobileNavigation";

interface NavItem {
  label: string;
  path: string;
  hasDropdown?: boolean;
  dropdownItems?: {
    label: string;
    path: string;
  }[];
}

export const SiteHeader: React.FC = () => {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

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

  const navItems: NavItem[] = [
    {
      label: "HOME",
      path: "/",
    },
    {
      label: "ABOUT",
      path: "/about",
    },
    {
      label: "CARE & SERVICES",
      path: "/services",
      hasDropdown: true,
      dropdownItems: [
        {
          label: "All Services",
          path: "/services",
        },
        {
          label: "Online Consultation",
          path: "/services/online-consultation",
        },
        {
          label: "Substance Use Assessment",
          path: "/services/substance-use-assessment",
        },
        {
          label: "Follow-Up Support",
          path: "/services/follow-up-support",
        },
        {
          label: "Family Support",
          path: "/services/family-support",
        },
        {
          label: "Recovery Guidance",
          path: "/services/recovery-guidance",
        },
      ],
    },
    {
      label: "HOW IT WORKS",
      path: "/how-it-works",
    },
    {
      label: "FOR FAMILIES",
      path: "/for-families",
    },
    {
      label: "PROFESSIONALS",
      path: "/professionals",
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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--background)]/95 py-3 shadow-2xl backdrop-blur-xl border-b border-[var(--border)]"
            : "bg-gradient-to-b from-[var(--background)] to-transparent py-5"
        }`}
      >
        <div className="mx-auto flex h-full w-full max-w-[1600px] items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* LOGO */}
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Rehab Nigeria home"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-sm bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background)] border border-[var(--border-subtle)] transition-colors group-hover:border-[var(--gold)]">
              <Shield className="h-5 w-5 text-[var(--gold)] transition-transform group-hover:scale-105" />

              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-[var(--green)]" />
            </div>

            <div>
              <span className="block font-cinzel text-lg font-bold tracking-wider text-[var(--foreground)] transition-colors group-hover:text-[var(--gold-light)] sm:text-xl">
                REHAB NIGERIA
              </span>

              <span className="hidden text-[9px] font-mono uppercase tracking-widest text-[var(--foreground-subtle)] sm:block">
                {siteConfig.tagline}
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            className="hidden items-center gap-1 lg:flex xl:gap-2"
            aria-label="Main navigation"
          >
            {navItems.map((item) => {
              const active = isActive(item.path);

              if (item.hasDropdown) {
                return (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <Link
                      href={item.path}
                      className={`flex items-center gap-1 px-3 py-2 text-xs font-mono tracking-wider transition-colors ${
                        active
                          ? "font-bold text-[var(--gold)]"
                          : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                      }`}
                      aria-expanded={servicesOpen}
                    >
                      {item.label}

                      <ChevronDown
                        className={`h-3 w-3 text-[var(--gold)] transition-transform duration-300 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </Link>

                    {/* SERVICES DROPDOWN */}
                    <div
                      className={`absolute left-0 top-full w-64 pt-3 transition-all duration-200 ${
                        servicesOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none translate-y-2 opacity-0"
                      }`}
                    >
                      <div className="overflow-hidden bg-[var(--background-secondary)] p-2 shadow-2xl backdrop-blur-xl">
                        {item.dropdownItems?.map((sub) => (
                          <Link
                            key={sub.path}
                            href={sub.path}
                            className="block px-3 py-2.5 font-sans text-xs text-[var(--foreground-muted)] transition-colors hover:bg-[var(--background-tertiary)] hover:text-[var(--gold)]"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`relative px-3 py-2 text-xs font-mono tracking-wider transition-colors ${
                    active
                      ? "font-bold text-[var(--gold)]"
                      : "text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-px bg-[var(--gold)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="hidden items-center gap-3 sm:flex">
            {/* <Link
              href="/signin"
              className="px-4 py-2 text-xs font-mono tracking-wider text-[var(--foreground-muted)] transition-colors hover:text-[var(--gold)]"
            >
              LOGIN
            </Link> */}

            <Link
              href="/signin"
              className="group inline-flex items-center justify-center bg-[var(--gold)] px-5 py-2.5 text-xs font-mono font-semibold tracking-wider text-[var(--background)] transition-colors hover:bg-[var(--gold-light)]"
            >
              GET STARTED
              <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* MOBILE ACTIONS */}
          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href="/signin"
              className="hidden bg-[var(--gold)] px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-[var(--background)] sm:block"
            >
              GET STARTED
            </Link>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="flex h-10 w-10 items-center justify-center bg-[var(--background-secondary)] text-[var(--foreground)] transition-colors hover:text-[var(--gold)]"
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
