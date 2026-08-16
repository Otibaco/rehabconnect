"use client"
import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { useRouter } from 'next/navigation';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
export const SuccessPage: React.FC = () => {
  const router = useRouter();

  return (
    <AuthLayout
      title="Action Completed!"
      subtitle="Your request has been successfully recorded in the RehabConnect system."
    >
      <div className="space-y-6 text-center">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-500 flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/20"
        >
          <CheckCircle2 className="w-10 h-10" />
        </motion.div>

        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
          Your changes have been saved securely. All assigned Care Leads have been notified automatically.
        </p>

        <button
          onClick={() => router.push('/patient/dashboard')}
          className="w-full py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs shadow-md shadow-teal-600/20 flex items-center justify-center gap-2"
        >
          <span>Return to Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </AuthLayout>
  );
};
