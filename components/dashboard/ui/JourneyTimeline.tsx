import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export interface JourneyStep {
  number: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  notes?: string;
}

export const JourneyTimeline: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      number: '01',
      title: 'ACCOUNT CREATED',
      description: 'Confidential account established on Rehab Nigeria encrypted platform.',
      status: 'completed',
      date: 'Jul 15, 2026'
    },
    {
      number: '02',
      title: 'CLINICAL INTAKE COMPLETED',
      description: 'Substance involvement, baseline history, and medical background recorded.',
      status: 'completed',
      date: 'Jul 18, 2026'
    },
    {
      number: '03',
      title: 'INITIAL CLINICAL CONSULTATION',
      description: '45-minute virtual consultation with Dr. Emeka Nwachukwu scheduled for baseline evaluation.',
      status: 'current',
      date: 'Today, 2:00 PM WAT'
    },
    {
      number: '04',
      title: 'PSYCHOLOGICAL COUNSELING & FOLLOW-UP',
      description: 'Structured follow-up session with Clinical Psychologist Dr. Folake Adebayo.',
      status: 'upcoming',
      date: 'Aug 14, 2026'
    },
    {
      number: '05',
      title: 'ONGOING RECOVERY SUPPORT',
      description: 'Continued monthly follow-ups and community peer support integration.',
      status: 'upcoming'
    }
  ];

  return (
    <div className="space-y-8 font-sans">
      
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2 crosshair-corner">
        <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
          RECOVERY PATHWAY TRACKER
        </span>
        <h2 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">
          YOUR PERSONAL RECOVERY JOURNEY
        </h2>
        <p className="text-xs text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
          Every person’s recovery trajectory is individual. This clean timeline provides milestone clarity on your care plan from initial registration through ongoing follow-ups.
        </p>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-8 border-l-2 border-[var(--border-subtle)] ml-3 sm:ml-4">
        {steps.map((s) => (
          <div key={s.number} className="relative group">
            
            {/* TIMELINE NODE DOT */}
            <div
              className={`absolute -left-[31px] sm:-left-[39px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                s.status === 'completed'
                  ? 'bg-[var(--gold)] border-[var(--gold)] text-[#080907]'
                  : s.status === 'current'
                  ? 'bg-[var(--background)] border-[var(--gold)] text-[var(--gold)] animate-pulse'
                  : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-subtle)]'
              }`}
            >
              {s.status === 'completed' ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : s.status === 'current' ? (
                <div className="w-2 h-2 rounded-full bg-[var(--gold)]"></div>
              ) : (
                <Circle className="w-3 h-3" />
              )}
            </div>

            {/* CONTENT BOX */}
            <div
              className={`p-6 rounded-sm border transition-all ${
                s.status === 'current'
                  ? 'bg-[var(--background-secondary)] border-[var(--gold)] shadow-2xl crosshair-corner'
                  : 'bg-[var(--background-secondary)]/60 border-[var(--border-subtle)]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xl font-bold text-[var(--gold)]">{s.number}</span>
                  <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">{s.title}</h3>
                </div>

                {s.date && (
                  <span className="font-mono text-xs text-[var(--gold-light)] font-bold">{s.date}</span>
                )}
              </div>

              <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">{s.description}</p>

              {s.status === 'current' && (
                <div className="mt-4 pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between font-mono text-xs">
                  <span className="text-[var(--gold)] font-bold">NEXT ACTION REQUIRED:</span>
                  <a
                    href="/dashboard/consultations"
                    className="px-4 py-2 bg-[var(--gold)] text-[#080907] font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors flex items-center gap-1.5"
                  >
                    <span>JOIN CONSULTATION</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
