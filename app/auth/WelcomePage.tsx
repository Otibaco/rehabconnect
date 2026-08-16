"use client"
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake, ShieldCheck } from 'lucide-react';

export const WelcomePage: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout
      title="Welcome to Rehab Nigeria"
      subtitle="Nigeria's premier recovery care network uniting clinical excellence, compassionate leads, and family collaboration."
      badgeText="Onboarding Complete"
    >
      <div className="space-y-6 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[var(--gold)] via-[var(--gold-light)] to-[var(--green)] text-black flex items-center justify-center mx-auto shadow-xl shadow-[var(--gold)]/20"
        >
          <HeartHandshake className="w-8 h-8" />
        </motion.div>

        <div className="space-y-2">
          <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
            We have prepared your personalized care space. You can now complete your rehabilitation assessment, schedule consultations with verified Nigerian Care Leads, and monitor recovery milestones.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold)]">
            <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
            <span>Next Recommended Step</span>
          </div>
          <p className="text-xs text-[var(--foreground-muted)]">
            Complete your confidential 5-minute Rehabilitation Assessment to help our clinical team match you with the ideal verified Care Coordinator in your region.
          </p>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => router.push('/patient/dashboard')}
            className="w-full py-3.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4" />
            <span>Enter Patient Dashboard</span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};

