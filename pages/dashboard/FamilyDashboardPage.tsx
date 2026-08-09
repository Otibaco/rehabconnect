import React from 'react';
import { StatBlock } from '../../components/dashboard/ui/StatBlock';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { mockFamilyLinks } from '../../lib/dashboardData';
import { Users, Lock, HeartHandshake, ShieldCheck, Calendar, ArrowUpRight, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export const FamilyDashboardPage: React.FC = () => {
  return (
    <div className="space-y-8 font-sans">
      
      {/* WELCOME BANNER */}
      <div className="p-6 sm:p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-3 relative overflow-hidden crosshair-corner shadow-2xl">
        <div className="flex items-center gap-2 font-mono text-xs text-[var(--gold)] font-bold uppercase">
          <HeartHandshake className="w-4 h-4" />
          <span>FAMILY CAREGIVER PORTAL</span>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
          SUPPORTING WITH EMPATHY & RESPECT.
        </h1>

        <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
          Welcome Amina. This portal provides guidance and advisory support for family members assisting loved ones on their recovery pathway.
        </p>
      </div>

      {/* PRIVACY BOUNDARY NOTICE */}
      <div className="p-5 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex items-start gap-3 text-xs font-sans">
        <Lock className="w-5 h-5 text-[var(--gold)] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[var(--gold)] font-bold uppercase block">
            MEDICAL CONSENT & PRIVACY BOUNDARY
          </span>
          <p className="text-[var(--foreground-muted)] leading-relaxed">
            Rehab Nigeria strictly enforces patient doctor-patient confidentiality. Detailed medical logs are shared with family members only when formal written consent is granted by the patient.
          </p>
        </div>
      </div>

      {/* PEOPLE YOU SUPPORT SECTION */}
      <div className="space-y-4">
        <h2 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
          PEOPLE YOU SUPPORT
        </h2>

        <div className="space-y-4">
          {mockFamilyLinks.map((link) => (
            <div
              key={link.id}
              className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm space-y-4 shadow-xl crosshair-corner"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
                    {link.patientName}
                  </h3>
                  <span className="font-mono text-xs text-[var(--foreground-subtle)]">
                    Relationship: <strong className="text-[var(--foreground)]">{link.relationship}</strong>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Consent Status:</span>
                  <StatusBadge status={link.consentStatus} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div>
                  <span className="text-[var(--foreground-subtle)] block text-[10px]">UPCOMING APPOINTMENT:</span>
                  <span className="text-[var(--gold)] font-bold">{link.nextAppointment || 'None Scheduled'}</span>
                </div>

                <div>
                  <span className="text-[var(--foreground-subtle)] block text-[10px]">LAST UPDATED:</span>
                  <span className="text-[var(--foreground-muted)]">{link.lastUpdated}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
                <Link
                  to="/dashboard/messages"
                  className="px-4 py-2 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground)] font-mono text-xs font-bold rounded-sm flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span>Message Care Advisor</span>
                </Link>

                <button
                  onClick={() => alert(`Consent status for ${link.patientName} is currently ${link.consentStatus}.`)}
                  className="px-4 py-2 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm"
                >
                  REQUEST CONSENT ACCESS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
