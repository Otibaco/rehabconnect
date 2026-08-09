import React, { useState } from 'react';
import { ShieldCheck, Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-architectural-grid opacity-15 pointer-events-none"></div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 relative z-10 text-center">
        <Link href="/" className="inline-flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-[var(--background-secondary)] border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)]">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="text-left font-cinzel leading-tight">
            <span className="block text-lg font-extrabold text-[var(--foreground)] tracking-wider">REHAB NIGERIA</span>
            <span className="block text-[9px] font-mono text-[var(--gold)] tracking-widest uppercase">ACCOUNT RECOVERY</span>
          </div>
        </Link>

        <h1 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">RESET YOUR PASSWORD</h1>
        <p className="font-sans text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">
          Enter your registered email address and we'll send you secure password reset instructions.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] p-8 rounded-sm shadow-2xl space-y-6 crosshair-corner">
          
          {submitted ? (
            <div className="text-center space-y-4 font-sans text-xs">
              <div className="p-3 bg-[var(--green)]/20 text-[var(--green-light)] rounded-full w-fit mx-auto border border-[var(--green)]/40">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">RESET LINK SENT</h3>
              <p className="text-[var(--foreground-muted)] leading-relaxed">
                We have dispatched a password recovery link to <strong className="text-[var(--gold)]">{email}</strong>. Please check your inbox and follow the instructions.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors mt-2"
              >
                RETURN TO SIGN IN
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. user@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-colors shadow-xl"
              >
                SEND PASSWORD RESET LINK
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-[var(--border-subtle)] text-center font-mono text-xs">
            <Link href="/login" className="text-[var(--foreground-subtle)] hover:text-[var(--gold)] inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Login</span>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 relative z-10 text-center">
        <h1 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">CREATE NEW PASSWORD</h1>
        <p className="font-sans text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">
          Please enter your new secure password below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] p-8 rounded-sm shadow-2xl space-y-6">
          {done ? (
            <div className="text-center space-y-4 font-sans text-xs">
              <CheckCircle2 className="w-10 h-10 text-[var(--green-light)] mx-auto" />
              <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">PASSWORD UPDATED</h3>
              <p className="text-[var(--foreground-muted)]">Your password has been reset successfully.</p>
              <Link href="/login" className="inline-block px-6 py-3 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm">
                SIGN IN NOW
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">New Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                />
              </div>

              <button type="submit" className="w-full py-3.5 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm">
                UPDATE PASSWORD
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export const VerifyEmailPage: React.FC = () => {
  const [code, setCode] = useState('');
  const [verified, setVerified] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setVerified(true);
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md space-y-4 text-center">
        <h1 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">VERIFY YOUR EMAIL</h1>
        <p className="font-sans text-xs text-[var(--foreground-muted)] max-w-xs mx-auto">
          We sent a 6-digit verification code to your email. Enter it below to activate your portal.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] p-8 rounded-sm space-y-6">
          {verified ? (
            <div className="text-center space-y-4 font-sans text-xs">
              <CheckCircle2 className="w-10 h-10 text-[var(--green-light)] mx-auto" />
              <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">EMAIL VERIFIED</h3>
              <p className="text-[var(--foreground-muted)]">Your account is active. You can now access your dashboard.</p>
              <Link href="/dashboard" className="inline-block px-6 py-3 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm">
                CONTINUE TO DASHBOARD
              </Link>
            </div>
          ) : (
            <form onSubmit={handleVerify} className="space-y-4 font-sans text-xs">
              <div className="space-y-1 text-center">
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block">ENTER 6-DIGIT CODE</label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="1 2 3 4 5 6"
                  className="w-full text-center text-xl tracking-widest font-mono p-3.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                />
              </div>

              <button type="submit" className="w-full py-3.5 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm">
                CONFIRM CODE & ACTIVATE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
