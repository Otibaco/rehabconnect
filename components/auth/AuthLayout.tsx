'use client'
import React from 'react';
import { HeartHandshake, ShieldCheck, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  backPath?: string;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  title,
  subtitle,
  showBackButton = true,
  backPath = '/',
}) => {
  const router= useRouter();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between selection:bg-teal-500 selection:text-white transition-colors py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Header */}
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 rounded-lg"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal-600 via-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200">
            <HeartHandshake className="w-5 h-5" />
          </div>
          <span className="font-heading font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
            Rehab<span className="text-teal-600 dark:text-teal-400">Connect</span>
          </span>
        </button>

        <div className="flex items-center gap-3">
          {showBackButton && (
            <button
              onClick={() => router.push(backPath)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Site</span>
            </button>
          )}
          <ThemeToggle />
        </div>
      </div>

      {/* Main Form Container */}
      <div className="my-auto py-12 flex justify-center">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-800 p-8 sm:p-10 space-y-6 relative overflow-hidden"
        >
          {/* Subtle Accent Light Bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-teal-600 via-teal-400 to-emerald-400" />

          {/* Title Header */}
          <div className="text-center space-y-2">
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {children}

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400 dark:text-slate-500 flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
              <span>256-Bit Encrypted Healthcare Gateway</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Footer copyright */}
      <div className="max-w-7xl mx-auto w-full text-center text-xs text-slate-400 dark:text-slate-600">
        © {new Date().getFullYear()} RehabConnect Platform. All rights reserved.
      </div>
    </div>
  );
};
