import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, User, Phone, ArrowRight, CheckCircle2 } from 'lucide-react';
import { UserRole } from '@/types/dashboard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<UserRole>('patient');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // Move to onboarding — pass data via query params (router.push doesn't accept a 'state' option)
      const params = new URLSearchParams({ role, firstName, lastName, email, phone }).toString();
      router.push(`/onboarding?${params}`);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-sm bg-[var(--background-secondary)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] group-hover:border-[var(--gold)] transition-colors">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-left font-cinzel leading-tight">
            <span className="block text-lg font-extrabold text-[var(--foreground)] tracking-wider">REHAB NIGERIA</span>
            <span className="block text-[9px] font-mono text-[var(--gold)] tracking-widest uppercase">CREATE ACCOUNT</span>
          </div>
        </Link>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
          CREATE YOUR CONFIDENTIAL ACCOUNT
        </h1>

        <p className="font-sans text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">
          Start your secure journey. Choose the role that best describes your purpose.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] p-8 rounded-sm shadow-2xl space-y-6 crosshair-corner">
          
          {/* ROLE SELECTOR CARDS */}
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block">
              SELECT ACCOUNT TYPE:
            </label>
            <div className="grid grid-cols-3 gap-2 font-sans text-xs">
              <button
                type="button"
                onClick={() => setRole('patient')}
                className={`p-3 rounded-sm border text-left transition-all ${
                  role === 'patient'
                    ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold-light)] font-bold'
                    : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-muted)]'
                }`}
              >
                <div className="font-bold text-sm">PATIENT</div>
                <div className="text-[10px] opacity-75">Seeking support</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('family')}
                className={`p-3 rounded-sm border text-left transition-all ${
                  role === 'family'
                    ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold-light)] font-bold'
                    : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-muted)]'
                }`}
              >
                <div className="font-bold text-sm">FAMILY</div>
                <div className="text-[10px] opacity-75">Supporting loved one</div>
              </button>

              <button
                type="button"
                onClick={() => setRole('coordinator')}
                className={`p-3 rounded-sm border text-left transition-all ${
                  role === 'coordinator'
                    ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold-light)] font-bold'
                    : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-muted)]'
                }`}
              >
                <div className="font-bold text-sm">CONSULTANT</div>
                <div className="text-[10px] opacity-75">Licensed Clinician</div>
              </button>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4 font-sans text-xs">
            
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">First Name</label>
                <input
                  type="text"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Chinedu"
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Last Name</label>
                <input
                  type="text"
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="e.g. Okonkwo"
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="chinedu@example.com"
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+234 800 000 0000"
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer text-[var(--foreground-muted)] text-[11px] leading-snug">
                <input
                  type="checkbox"
                  required
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-0.5 rounded-sm border-[var(--border-subtle)] text-[var(--gold)] focus:ring-0 bg-[var(--background-tertiary)]"
                />
                <span>
                  I agree to the Rehab Nigeria{' '}
                  <Link href="/terms-of-use" target="_blank" className="text-[var(--gold)] hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy-policy" target="_blank" className="text-[var(--gold)] hover:underline">
                    Privacy Policy
                  </Link>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading || !acceptedTerms}
              className="w-full py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <span>CREATING ACCOUNT...</span>
              ) : (
                <>
                  <span>CREATE ACCOUNT & BEGIN ONBOARDING</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          <div className="pt-4 border-t border-[var(--border-subtle)] text-center font-sans text-xs text-[var(--foreground-muted)]">
            <span>Already have an account? </span>
            <Link href="/login" className="font-mono text-xs text-[var(--gold)] font-bold hover:underline">
              Sign In →
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
};
