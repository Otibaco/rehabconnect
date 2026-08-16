"use client"
import React from 'react';
import { EditorialHero } from '@/components/pages-components/EditorialHero';
import { FinalCTA } from '@/components/pages-components/FinalCTA';
import { siteConfig } from '@/lib/config';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { Footer } from '@/components/layout/Footer';

export const PrivacyPolicyPage: React.FC = () => {
  const sections = [
    { title: '1. Introduction', content: 'Rehab Nigeria ("we", "our", "us") respects your privacy and is committed to protecting personal data. This Privacy Policy informs you about how we collect, process, and safeguard your information when you visit our website or interact with our digital rehabilitation platform.' },
    { title: '2. Legal Notice & Review Requirement', content: 'This policy serves as a public website UI and structural disclosure. This document is subject to ongoing review and modification by legal and clinical compliance advisors prior to final operational deployment.' },
    { title: '3. Information We Collect', content: 'We collect information you provide directly to us, including account creation details, communication preferences, and voluntary background context provided during pre-consultation onboarding.' },
    { title: '4. Registration Information', content: 'When registering an account as an individual or family member, we collect name, contact number, email address, and encrypted credential information.' },
    { title: '5. Patient Onboarding Information', content: 'To enable clinical consultants to provide informed care, users may voluntarily complete background history questionnaires covering substance use patterns, physical health factors, and emotional goals.' },
    { title: '6. Consultation Information', content: 'Information generated during private video consultations or clinical notes remains strictly accessible only to authorized healthcare professionals assigned to your care.' },
    { title: '7. How We Use Information', content: 'We use your information solely to facilitate account setup, match you with appropriate medical consultants, schedule appointments, process payments, and improve platform service accessibility.' },
    { title: '8. Data Sharing Restrictions', content: 'We DO NOT sell, rent, or trade personal or health information to third-party advertisers. Data is shared only with assigned clinical personnel or authorized service providers directly necessary for platform operations.' },
    { title: '9. Professional Access Controls', content: 'Medical records and intake histories are secured with role-based access controls ensuring consultants can access only the relevant patient information required for active care.' },
    { title: '10. Payment Information', content: 'All financial transactions (such as the ₦10,000 consultation fee) are processed through PCI-DSS compliant Nigerian payment gateways. We do not store full payment card details on our servers.' },
    { title: '11. Security Standards', content: 'We implement technical, physical, and administrative safeguards designed to protect personal information against unauthorized access, loss, or alteration.' },
    { title: '12. Data Retention', content: 'We retain personal and clinical information only as long as necessary to fulfill the purposes for which it was collected or to comply with medical record keeping standards.' },
    { title: '13. Third-Party Services', content: 'Our platform may contain links to external educational resources or social media campaign channels. We are not responsible for the privacy practices of third-party external sites.' },
    { title: '14. Cookies & Tracking', content: 'We use essential cookies for core website security and navigation. Optional analytics cookies are managed via our Cookie Consent UI.' },
    { title: '15. User Rights', content: 'Users have the right to request access to, correction of, or deletion of their account information, subject to applicable clinical retention regulations.' },
    { title: '16. Children & Minors', content: 'Our platform is intended for individuals aged 18 and above, or for parents/legal guardians registering on behalf of dependent family members.' },
    { title: '17. Changes & Contact Information', content: 'We may update this Privacy Policy periodically. For questions regarding privacy, contact us at: ' + siteConfig.emailPlaceholder }
  ];

  return (
    <div className="space-y-0">
      <SiteHeader />
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="INSTITUTIONAL GOVERNANCE"
        title="PRIVACY POLICY."
        subtitle="Our commitment to confidential, responsible handling of personal and health information."
        breadcrumb="Privacy Policy"
      />

      {/* POLICY SECTIONS */}
      <section className="py-20 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
          
          <div className="p-4 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-sm font-mono text-xs text-[var(--gold)]">
            ✦ LAST UPDATED: AUGUST 2026 • REHAB NIGERIA LEGAL GOVERNANCE
          </div>

          <div className="space-y-8">
            {sections.map((sec) => (
              <div key={sec.title} className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2">
                <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">
                  {sec.title}
                </h3>
                <p>{sec.content}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />
      <Footer />
    </div>
  );
};
