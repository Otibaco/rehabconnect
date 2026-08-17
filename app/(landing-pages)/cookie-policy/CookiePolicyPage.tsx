"use client"
import React from 'react';
import { EditorialHero } from '@/components/pages-components/EditorialHero';
import { FinalCTA } from '@/components/pages-components/FinalCTA';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Footer } from '@/components/layout/Footer';

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="space-y-0">

      <SiteHeader />
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="TECHNICAL DISCLOSURE"
        title="COOKIE POLICY."
        subtitle="How Rehab Nigeria uses cookies and local browser storage to secure and enhance website functionality."
        breadcrumb="Cookie Policy"
      />

      <section className="py-20 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
          
          <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">What Are Cookies?</h3>
            <p>
              Cookies are small text files stored on your device when you visit websites. They help remember session preferences, keep your session secure, and allow us to understand how visitors interact with our platform.
            </p>
          </div>

          <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">Categories of Cookies We Use</h3>
            
            <div className="space-y-3 font-mono text-xs">
              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                <strong className="text-[var(--gold)] block mb-1">1. Essential Cookies (Always Active)</strong>
                <span className="font-sans text-xs">Required for core page routing, encrypted session storage, and security authentication.</span>
              </div>

              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                <strong className="text-[var(--gold)] block mb-1">2. Analytics Cookies (Optional)</strong>
                <span className="font-sans text-xs">Help us aggregate anonymous traffic metrics to improve platform speed and usability.</span>
              </div>

              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm">
                <strong className="text-[var(--gold)] block mb-1">3. Campaign Cookies (Optional)</strong>
                <span className="font-sans text-xs">Used to measure the reach of public educational campaigns across social platforms.</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">Managing Your Preferences</h3>
            <p>
              You can adjust or revoke your cookie consent at any time using the Cookie Settings button in our website footer or by configuring your browser settings to block third-party cookies.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

      <Footer />

    </div>
  );
};
