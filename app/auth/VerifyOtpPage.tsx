"use client"
import React, { useState } from 'react'; 
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { ShieldCheck, RefreshCw, Clock } from 'lucide-react';

export const VerifyOtpPage: React.FC = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(['4', '9', '1', '8', '3', '7']);
  const [verifying, setVerifying] = useState(false);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      router.push('/welcome');
    }, 450);
  };

  return (
    <AuthLayout
      title="Enter Security Passcode"
      subtitle="Input the 6-digit one-time passcode (OTP) dispatched to your phone or verified email."
      badgeText="2-Factor Verification"
    >
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 text-[var(--gold)] flex items-center justify-center mx-auto">
          <ShieldCheck className="w-7 h-7" />
        </div>

        <div className="flex justify-center gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => {
                const newOtp = [...otp];
                newOtp[idx] = e.target.value;
                setOtp(newOtp);
              }}
              className="w-10 h-12 text-center text-lg font-bold rounded-xl bg-[var(--background-tertiary)] border-2 border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
            />
          ))}
        </div>

        <button
          onClick={handleVerify}
          disabled={verifying}
          className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {verifying ? (
            <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>Verify Passcode & Enter</span>
          )}
        </button>

        <div className="flex justify-between items-center text-xs text-[var(--foreground-muted)] pt-2 border-t border-[var(--border-subtle)]">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" /> Code expires in 04:59
          </span>
          <button onClick={() => alert('New OTP code generated')} className="text-[var(--gold)] font-semibold hover:underline flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> Resend
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

