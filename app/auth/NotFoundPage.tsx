"use client"
import React from 'react';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { FileQuestion, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NotFoundPage: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout
      title="Page Not Found (404)"
      subtitle="The page or clinical resource you requested does not exist or has been moved."
      badgeText="404 Error"
    >
      <div className="space-y-6 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--gold)] flex items-center justify-center mx-auto">
          <FileQuestion className="w-8 h-8" />
        </div>

        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
          Double check the URL or use the button below to return to the Rehab Nigeria homepage or your active portal dashboard.
        </p>

        <button
          onClick={() => router.push('/')}
          className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
        >
          <Home className="w-4 h-4" />
          <span>Return to Homepage</span>
        </button>
      </div>
    </AuthLayout>
  );
};

