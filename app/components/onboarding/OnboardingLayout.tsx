import React from 'react';
import { ShieldCheck, ArrowLeft, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface OnboardingLayoutProps {
  currentStep: number;
  totalSteps: number;
  stepTitle: string;
  stepSubtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  roleTitle?: string;
}

export const OnboardingLayout: React.FC<OnboardingLayoutProps> = ({
  currentStep,
  totalSteps,
  stepTitle,
  stepSubtitle,
  children,
  onBack,
  roleTitle = 'PATIENT INTAKE'
}) => {
  const progressPercent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 relative">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

      {/* HEADER */}
      <header className="max-w-3xl w-full mx-auto flex items-center justify-between pb-6 border-b border-[var(--border-subtle)] relative z-10">
        <div className="flex items-center gap-3">
          {onBack && currentStep > 1 && (
            <button
              onClick={onBack}
              className="p-2 bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] rounded-sm transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-sm bg-[var(--background-secondary)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="font-cinzel text-sm font-bold text-[var(--foreground)] tracking-wide">
              REHAB NIGERIA
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--gold)] font-bold">
          <Lock className="w-3.5 h-3.5" />
          <span>CONFIDENTIAL {roleTitle.toUpperCase()}</span>
        </div>
      </header>

      {/* MAIN WIZARD BODY */}
      <main className="max-w-2xl w-full mx-auto my-8 relative z-10 space-y-6">
        
        {/* PROGRESS INDICATOR */}
        <div className="space-y-2">
          <div className="flex items-center justify-between font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">
            <span>STEP {currentStep} OF {totalSteps}</span>
            <span className="text-[var(--gold)] font-bold">{progressPercent}% COMPLETED</span>
          </div>
          <div className="w-full h-1 bg-[var(--background-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--gold)] transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* STEP TITLE BLOCK */}
        <div className="space-y-1">
          <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
            {stepTitle}
          </h1>
          {stepSubtitle && (
            <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
              {stepSubtitle}
            </p>
          )}
        </div>

        {/* STEP FORM CONTAINER */}
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] p-6 sm:p-8 rounded-sm shadow-2xl space-y-6 crosshair-corner">
          {children}
        </div>

      </main>

      {/* FOOTER */}
      <footer className="max-w-3xl w-full mx-auto pt-6 border-t border-[var(--border-subtle)] text-center font-mono text-[10px] text-[var(--foreground-subtle)] relative z-10 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>© REHAB NIGERIA • ALL MEDICAL DATA IS ENCRYPTED</span>
        <span>NEED HELP? HELP@REHABNIGERIA.ORG</span>
      </footer>

    </div>
  );
};
