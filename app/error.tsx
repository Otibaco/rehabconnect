"use client"
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function Error() {
  const router = useRouter();

  return (
    <AuthLayout
      title="System Notice (500)"
      subtitle="An unexpected error occurred while processing your clinical request."
      badgeText="Server Status"
    >
      <div className="space-y-6 text-center">
        <div className="w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-800/60 text-amber-400 flex items-center justify-center mx-auto">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
          Our engineering monitors have logged this occurrence. Your records remain safe and encrypted. Try refreshing the page.
        </p>

        <div className="space-y-2.5">
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reload Portal</span>
          </button>

          <button
            onClick={() => router.push('/')}
            className="w-full py-2.5 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)] font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Home className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
            <span>Return to Homepage</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

