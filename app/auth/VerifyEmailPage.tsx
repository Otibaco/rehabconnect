"use client"
import React from 'react';
import { Mail, RefreshCw, ArrowRight } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
export const VerifyEmailPage: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout
      title="Verify Your Email"
      subtitle="We sent a secure verification link to your registered email address."
      badgeText="Identity Verification"
    >
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] flex items-center justify-center mx-auto">
          <Mail className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
            Please check your email inbox and click the verification link to activate your full patient or care coordinator portal.
          </p>
          <p className="text-xs font-bold text-[var(--foreground)] font-mono">
            adewale.o@example.ng
          </p>
        </div>

        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => router.push('/verify-otp')}
            className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Enter OTP Code Manually</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => alert('Verification email resent!')}
            className="w-full py-2.5 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
            <span>Resend Verification Email</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

