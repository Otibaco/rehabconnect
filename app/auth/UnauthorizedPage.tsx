"use client"
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const UnauthorizedPage: React.FC = () => {
  const router  = useRouter();

  return (
    <AuthLayout
      title="Access Restricted"
      subtitle="You do not possess the required credentials to access this clinical dashboard."
      badgeText="Security Boundary"
    >
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-950/60 border border-rose-800/60 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-7 h-7" />
        </div>

        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
          This portal requires verified Care Coordinator or Platform Administrator security clearance. If you believe this is an error, contact your clinical administrator.
        </p>

        <button
          onClick={() => router.push('/patient/dashboard')}
          className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Patient Portal</span>
        </button>
      </div>
    </AuthLayout>
  );
};

