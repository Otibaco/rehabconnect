import React from 'react';
import { ShieldCheck, ArrowLeft, Award, Sparkles, CheckCircle2, PhoneCall } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backPath?: string;
  badgeText?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  backPath = '/',
  badgeText = 'Clinical Rehabilitation Network',
}) => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between selection:bg-[var(--gold)] selection:text-black">
      {/* Top Header Bar */}
      <header className="border-b border-[var(--border)] bg-[var(--background-secondary)]/90 backdrop-blur-md px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)] shadow-sm group-hover:border-[var(--gold)] transition-colors">
              <span className="font-cinzel font-bold text-lg">RN</span>
            </div>
            <div>
              <span className="font-cinzel font-bold text-lg tracking-wider text-[var(--foreground)] block">
                REHAB <span className="text-[var(--gold)]">NIGERIA</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[var(--foreground-subtle)] block">
                Clinical Coordination Network
              </span>
            </div>
          </button>

          <div className="flex items-center gap-3">
            {showBackButton && (
              <button
                onClick={() => router.push(backPath)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Portal</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Asymmetric Split Layout Container */}
      <div className="max-w-7xl mx-auto w-full flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex flex-col lg:flex-row items-stretch gap-8 lg:gap-12">
        {/* Left Hero Story Panel (Editorial / Architectural) */}
        <div className="lg:w-5/12 hidden lg:flex flex-col justify-between p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] relative overflow-hidden bg-architectural-grid">
          {/* Subtle gold glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--background-tertiary)] text-[var(--gold)] text-xs font-medium border border-[var(--border-subtle)]">
              <Award className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>{badgeText}</span>
            </div>

            <div className="space-y-3">
              <h2 className="font-cinzel font-bold text-2xl xl:text-3xl text-[var(--foreground)] leading-tight">
                Compassionate Clinical Care for Every Nigerian Recovery.
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                Rehab Nigeria bridges individuals, families, and healthcare leaders to accredited rehabilitation centres across Lagos, Abuja, Port Harcourt, and Kano.
              </p>
            </div>

            {/* Credibility bullets */}
            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 text-xs text-[var(--foreground-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--foreground)]">Progressive Clinical Assessment:</strong> Complete at your pace with automated draft saving.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-[var(--foreground-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--foreground)]">Dedicated Telehealth Doctors:</strong> Personal licensed guidance for stroke, orthopedic & cognitive recovery.</span>
              </div>
              <div className="flex items-start gap-3 text-xs text-[var(--foreground-muted)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--green)] shrink-0 mt-0.5" />
                <span><strong className="text-[var(--foreground)]">100% Online Recovery Suites:</strong> HD encrypted video sessions and digital exercise protocols delivered straight to your home.</span>
              </div>
            </div>
          </div>

          {/* Bottom Testimonial / Emergency Card */}
          <div className="pt-6 border-t border-[var(--border)] relative z-10 space-y-3">
            <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
              <p className="text-xs italic text-[var(--foreground)] leading-relaxed">
                "Consulting a licensed tele-rehab doctor directly from our home in Abuja gave my father clear physical therapy exercises and weekly progress reviews."
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px] text-[var(--foreground-subtle)]">
                <span className="font-semibold text-[var(--gold)]">— David Okafor, Family Caregiver</span>
                <span>Verified Online Patient</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[var(--foreground-subtle)] px-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[var(--green)]" />
                <span>HIPAA & NDPR Compliant</span>
              </span>
              <span className="flex items-center gap-1">
                <PhoneCall className="w-3.5 h-3.5 text-[var(--gold)]" />
                <span>Emergency: 0800-REHAB-NG</span>
              </span>
            </div>
          </div>
        </div>

        {/* Right Form Card (High-Contrast Clean Surface) */}
        <div className="w-full lg:w-7/12 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full bg-[var(--background-secondary)] rounded-3xl border border-[var(--border)] p-6 sm:p-10 space-y-6 relative shadow-2xl"
          >
            {/* Form Top Header */}
            <div className="space-y-2 border-b border-[var(--border)] pb-5">
              <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Form Body */}
            <div>{children}</div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer info */}
      <footer className="border-t border-[var(--border)] bg-[var(--background-secondary)] py-4 text-center text-xs text-[var(--foreground-subtle)]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Rehab Nigeria Healthcare Network. All rights reserved.</span>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={() => router.push('/privacy-policy')} className="hover:text-[var(--gold)] transition-colors">Privacy Policy</button>
            <button onClick={() => router.push('/terms-of-use')} className="hover:text-[var(--gold)] transition-colors">Terms of Use</button>
            <button onClick={() => router.push('/contact')} className="hover:text-[var(--gold)] transition-colors">Help Desk</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

