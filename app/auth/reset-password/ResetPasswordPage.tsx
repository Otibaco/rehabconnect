"use client"
import React, { useState } from 'react';

import { Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const getPasswordStrength = () => {
    if (!password) return { text: 'None', width: '0%', color: 'bg-zinc-800' };
    if (password.length < 6) return { text: 'Weak', width: '33%', color: 'bg-rose-500' };
    if (password.length < 10) return { text: 'Medium', width: '66%', color: 'bg-amber-500' };
    return { text: 'Strong', width: '100%', color: 'bg-[var(--green)]' };
  };

  const strength = getPasswordStrength();

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setResetSuccess(true);
  };

  return (
    <AuthLayout
      title="Create New Password"
      subtitle="Ensure your new password contains at least 8 characters with numbers or symbols."
      badgeText="Security Gate"
    >
      {!resetSuccess ? (
        <form onSubmit={handleReset} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
            {password && (
              <div className="space-y-1 pt-1">
                <div className="flex justify-between text-[10px] font-semibold text-[var(--foreground-muted)]">
                  <span>Password strength:</span>
                  <span>{strength.text}</span>
                </div>
                <div className="w-full bg-[var(--background-tertiary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                  <div className={`h-full ${strength.color} transition-all duration-300`} style={{ width: strength.width }} />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">Confirm New Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-3" />
              <input
                type="password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span>Update Password & Return to Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="font-cinzel font-bold text-lg text-[var(--foreground)]">Password Updated Successfully!</h2>
          <p className="text-xs text-[var(--foreground-muted)]">
            Your portal credentials have been securely updated. You can now sign in to your dashboard.
          </p>
          <button
            onClick={() => router.push('/login')}
            className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md"
          >
            Sign In Now
          </button>
        </motion.div>
      )}
    </AuthLayout>
  );
};

