"use client"
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { Clock, LogIn } from 'lucide-react';

export const SessionExpiredPage: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout
      title="Session Expired"
      subtitle="For patient confidentiality and NDPR clinical data compliance, your session timed out after a period of inactivity."
      badgeText="Session Timeout"
    >
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-800/60 text-amber-400 flex items-center justify-center mx-auto">
          <Clock className="w-7 h-7" />
        </div>

        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
          Please re-authenticate to continue accessing your rehabilitation records and active care coordinator notes.
        </p>

        <button
          onClick={() => router.push('/login')}
          className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <LogIn className="w-4 h-4" />
          <span>Sign In Again</span>
        </button>
      </div>
    </AuthLayout>
  );
};

