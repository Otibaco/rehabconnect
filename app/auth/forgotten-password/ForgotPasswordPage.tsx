"use client"
import React, { useState } from 'react';
import { Mail, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const ForgotPasswordPage: React.FC = () => {
  const router  = useRouter();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 450);
  };

  return (
    <AuthLayout
      title="Reset Account Password"
      subtitle="Enter the email address registered with your Rehab Nigeria portal and we'll dispatch an instant reset link."
      badgeText="Identity Recovery"
    >
      {!sent ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">
              Registered Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? (
              <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span>Send Password Reset Link</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--gold)] flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </button>
          </div>
        </form>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-4 text-center">
          <div className="w-12 h-12 rounded-xl bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/40 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h2 className="font-cinzel font-bold text-lg text-[var(--foreground)]">Check Your Inbox</h2>
          <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
            We sent a secure password reset link to <span className="font-bold text-[var(--foreground)]">{email}</span>. Click the link in your email to choose a new password.
          </p>
          <button
            onClick={() => router.push('/reset-password')}
            className="w-full py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs shadow-md"
          >
            Demo: Go to Reset Password Screen
          </button>
        </motion.div>
      )}
    </AuthLayout>
  );
};

