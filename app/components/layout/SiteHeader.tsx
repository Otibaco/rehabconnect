import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Shield, ArrowUpRight, ChevronDown } from 'lucide-react';
import { siteConfig } from '../../lib/config';

interface SiteHeaderProps {
  onOpenMobileMenu: () => void;
}

export const SiteHeader: React.FC<SiteHeaderProps> = ({ onOpenMobileMenu }) => {
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', path: '/about' },
    { 
      label: 'CARE & SERVICES', 
      path: '/services',
      hasDropdown: true,
      dropdownItems: [
        { label: 'All Services', path: '/services' },
        { label: 'Online Consultation', path: '/services/online-consultation' },
        { label: 'Substance Use Assessment', path: '/services/substance-use-assessment' },
        { label: 'Follow-Up Support', path: '/services/follow-up-support' },
        { label: 'Family Support', path: '/services/family-support' },
        { label: 'Recovery Guidance', path: '/services/recovery-guidance' },
      ]
    },
    { label: 'HOW IT WORKS', path: '/how-it-works' },
    { label: 'FOR FAMILIES', path: '/for-families' },
    { label: 'PROFESSIONALS', path: '/professionals' },
    { label: 'RESOURCES', path: '/resources' },
    { label: 'CHALLENGES', path: '/challenges' },
    { label: 'CONTACT', path: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--background)]/95 backdrop-blur-md border-b border-[var(--border)] py-3 shadow-2xl'
          : 'bg-gradient-to-b from-[var(--background)] to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="group flex items-center gap-3">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-sm bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background)] border border-[var(--border-subtle)] group-hover:border-[var(--gold)] transition-colors">
            {/* Minimal Gold Emblem */}
            <Shield className="w-5 h-5 text-[var(--gold)] group-hover:scale-105 transition-transform" />
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[var(--green)]"></div>
          </div>
          <div>
            <span className="font-cinzel text-lg sm:text-xl font-bold tracking-wider text-[var(--foreground)] group-hover:text-[var(--gold-light)] transition-colors block">
              REHAB NIGERIA
            </span>
            <span className="text-[9px] uppercase tracking-widest text-[var(--foreground-subtle)] font-mono hidden sm:block">
              {siteConfig.tagline}
            </span>
          </div>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            if (item.hasDropdown) {
              return (
                <div 
                  key={item.label}
                  className="relative group/dropdown"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`px-3 py-2 text-xs font-mono tracking-wider transition-colors flex items-center gap-1 ${
                      isActive 
                        ? 'text-[var(--gold)] font-bold' 
                        : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                    }`}
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3 text-[var(--gold)] group-hover/dropdown:rotate-180 transition-transform" />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 w-64 pt-2 transition-all duration-200 ${
                    servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}>
                    <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm p-2 shadow-2xl backdrop-blur-xl">
                      {item.dropdownItems?.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          className="block px-3 py-2 text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] rounded-sm transition-colors font-sans"
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
                to={item.path}
                className={`px-3 py-2 text-xs font-mono tracking-wider transition-colors relative ${
                  isActive 
                    ? 'text-[var(--gold)] font-bold' 
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[var(--gold)]"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ACTIONS: LOGIN & GET STARTED */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-xs font-mono tracking-wider text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors border border-transparent hover:border-[var(--border)] rounded-sm"
          >
            LOGIN
          </Link>

          <Link
            to="/how-it-works"
            className="group relative inline-flex items-center justify-center px-5 py-2.5 text-xs font-mono font-semibold tracking-wider text-[#080907] bg-[var(--gold)] hover:bg-[var(--gold-light)] transition-colors rounded-sm shadow-md"
          >
            <span>GET STARTED</span>
            <ArrowUpRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            to="/how-it-works"
            className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-wider text-[#080907] bg-[var(--gold)] rounded-sm sm:hidden"
          >
            GET STARTED
          </Link>

          <button
            onClick={onOpenMobileMenu}
            className="p-2 text-[var(--foreground)] hover:text-[var(--gold)] bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm focus:outline-none"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

      </div>
    </header>
  );
};
