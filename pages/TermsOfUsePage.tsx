import React from 'react';
import { EditorialHero } from '@/components/editorial/EditorialHero';
import { FinalCTA } from '@/components/editorial/FinalCTA';
import { siteConfig } from '@/lib/config';

export const TermsOfUsePage: React.FC = () => {
  const terms = [
    { title: '1. Acceptance of Terms', content: 'By accessing or using the Rehab Nigeria website and consultation booking services, you agree to be bound by these Terms of Use and our Privacy Policy.' },
    { title: '2. Legal Notice & Professional Review', content: 'These Terms of Use represent public platform terms and are subject to final legal and clinical compliance review prior to official enterprise publication.' },
    { title: '3. Platform Scope & Emergency Limitations', content: 'Rehab Nigeria is a digital consultation platform for elective rehabilitation counseling and health guidance. IT IS NOT AN EMERGENCY MEDICAL SERVICE. In acute medical crises, severe overdose, or self-harm emergencies, users must seek immediate hospital emergency care.' },
    { title: '4. User Eligibility', content: 'You must be at least 18 years of age to register an account directly, or be a parent/legal guardian acting on behalf of a relative where legally permissible.' },
    { title: '5. Account Responsibilities', content: 'Users are responsible for maintaining the confidentiality of account credentials and for all activities conducted under their account.' },
    { title: '6. Onboarding Background Accuracy', content: 'Users agree to provide honest, accurate information during pre-consultation onboarding to ensure assigned clinical professionals can conduct informed assessments.' },
    { title: '7. Online Consultations', content: 'Online consultations connect patients with qualified medical doctors, psychologists, or addiction counsellors in private virtual rooms. Clinical decisions remain the sole professional responsibility of the assigned practitioner.' },
    { title: '8. Consultation Fees & Payments', content: 'The standard online consultation fee is currently ₦10,000 per session. All fees must be paid in advance via approved payment channels prior to appointment confirmation.' },
    { title: '9. Appointment Scheduling & Rescheduling', content: 'Users may reschedule appointments up to 24 hours prior to the scheduled session time without penalty.' },
    { title: '10. Cancellation & Refund Policy', content: 'Cancellation requests made at least 24 hours prior to consultation time are eligible for session credits or refunds according to platform billing terms.' },
    { title: '11. Family Registration Boundaries', content: 'Family members initiating registration on behalf of a relative acknowledge that clinical consultations and medical disclosures require individual patient consent and privacy compliance.' },
    { title: '12. Intellectual Property', content: 'All logo assets, visual designs, brand copy, and editorial materials published on Rehab Nigeria are owned by Rehab Nigeria and protected by applicable copyright laws.' },
    { title: '13. Platform Availability', content: 'While we strive for continuous platform availability, Rehab Nigeria is not liable for temporary service interruptions due to system maintenance or telecom network outages.' },
    { title: '14. Account Termination', content: 'We reserve the right to suspend or terminate accounts that violate community standards, engage in abusive behavior, or attempt unauthorized platform access.' },
    { title: '15. Contact Information', content: 'For questions regarding these Terms, contact us at: ' + siteConfig.emailPlaceholder }
  ];

  return (
    <div className="space-y-0">
      
      {/* HERO */}
      <EditorialHero
        number="01"
        sectionLabel="PLATFORM GOVERNANCE"
        title="TERMS OF USE."
        subtitle="Terms and conditions governing the use of the Rehab Nigeria website and online consultation services."
        breadcrumb="Terms of Use"
      />

      {/* TERMS SECTIONS */}
      <section className="py-20 bg-[var(--background)] border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
          
          <div className="p-4 bg-[var(--background-secondary)] border border-[var(--border-subtle)] rounded-sm font-mono text-xs text-[var(--gold)]">
            ✦ LAST REVISED: AUGUST 2026 • REHAB NIGERIA TERMS OF SERVICE
          </div>

          <div className="space-y-8">
            {terms.map((term) => (
              <div key={term.title} className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2">
                <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">
                  {term.title}
                </h3>
                <p>{term.content}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

    </div>
  );
};
