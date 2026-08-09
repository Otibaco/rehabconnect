'use client'
import React, { useState } from 'react';
import { ShieldCheck, Lock, Mail, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { UserRole } from '@/types/dashboard';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LoginPageProps {
  onLoginSuccess?: (role: UserRole) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('patient');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(selectedRole);
      }
      router.push('/dashboard');
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Background Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 relative z-10 text-center">
        
        {/* BRAND EMBLEM */}
        <Link href="/" className="inline-flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-sm bg-[var(--background-secondary)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] group-hover:border-[var(--gold)] transition-colors">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-left font-cinzel leading-tight">
            <span className="block text-lg font-extrabold text-[var(--foreground)] tracking-wider">REHAB NIGERIA</span>
            <span className="block text-[9px] font-mono text-[var(--gold)] tracking-widest uppercase">AUTHENTICATED PORTAL</span>
          </div>
        </Link>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
          SIGN IN TO YOUR PORTAL
        </h1>

        <p className="font-sans text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">
          Confidential healthcare access for patients, family caregivers, coordinators, and administrators.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] p-8 rounded-sm shadow-2xl space-y-6 crosshair-corner">
          
          {/* DEMO ROLE SWITCHER FOR TESTING */}
          <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-2">
            <span className="font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider block font-bold">
              ⚡ DEMO PREVIEW: SELECT ROLE TO TEST
            </span>
            <div className="grid grid-cols-4 gap-1.5 font-mono text-[11px]">
              {(['patient', 'family', 'coordinator', 'admin'] as UserRole[]).map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`py-1.5 px-2 rounded-sm capitalize transition-all ${
                    selectedRole === role
                      ? 'bg-[var(--gold)] text-[#080907] font-bold shadow-md'
                      : 'bg-[var(--background)] hover:bg-[var(--border-subtle)] text-[var(--foreground-subtle)] border border-[var(--border-subtle)]'
                  }`}
                >
                  {role === 'coordinator' ? 'Consultant' : role}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4 font-sans text-xs">
            
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    selectedRole === 'patient' ? 'chinedu.o@example.com' :
                    selectedRole === 'family' ? 'amina.o@example.com' :
                    selectedRole === 'coordinator' ? 'dr.emeka@rehabnigeria.org' : 'admin.grace@rehabnigeria.org'
                  }
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)] placeholder-[var(--foreground-subtle)]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Password</label>
                <Link href="/forgot-password" className="font-mono text-[10px] text-[var(--gold)] hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 font-mono text-[11px]">
              <label className="flex items-center gap-2 cursor-pointer text-[var(--foreground-muted)]">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded-sm border-[var(--border-subtle)] text-[var(--gold)] focus:ring-0 bg-[var(--background-tertiary)]"
                />
                <span>Keep me logged in on this device</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all flex items-center justify-center gap-2 shadow-xl disabled:opacity-50"
            >
              {loading ? (
                <span>AUTHENTICATING...</span>
              ) : (
                <>
                  <span>SIGN IN TO {selectedRole.toUpperCase()} PORTAL</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

          </form>

          <div className="pt-4 border-t border-[var(--border-subtle)] text-center font-sans text-xs text-[var(--foreground-muted)]">
            <span>Don't have an account yet? </span>
            <Link href="/register" className="font-mono text-xs text-[var(--gold)] font-bold hover:underline">
              Register Here →
            </Link>
          </div>

        </div>

        {/* SECURITY FOOTNOTE */}
        <div className="mt-6 text-center font-mono text-[10px] text-[var(--foreground-subtle)] flex items-center justify-center gap-2">
          <Lock className="w-3 h-3 text-[var(--gold)]" />
          <span>256-BIT ENCRYPTED HEALTHCARE PLATFORM</span>
        </div>
      </div>

    </div>
  );
};
