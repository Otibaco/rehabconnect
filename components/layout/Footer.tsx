'use client'
import React, { useState } from 'react';

import { HeartHandshake, ShieldCheck, Mail, CheckCircle2, ArrowRight, Phone, Lock, Globe } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RoutePath } from '@/lib/types';

export const Footer: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 5000);
    }
  };

  const footerGroups: { title: string; links: { label: string; path: RoutePath }[] }[] = [
    {
      title: 'Care Pathways',
      links: [
        { label: 'For Patients', path: '/for-patients' },
        { label: 'For Families', path: '/for-families' },
        { label: 'How It Works', path: '/how-it-works' },
        { label: 'Referral Code Portal', path: '/referral-portal' },
        { label: 'System Architecture', path: '/portal-dashboard' },
      ],
    },
    {
      title: 'Support & Help',
      links: [
        { label: 'Help Center', path: '/help-center' },
        { label: 'Support Desk', path: '/support' },
        { label: 'Frequently Asked Questions', path: '/faq' },
        { label: 'Careers & Hiring', path: '/careers' },
        { label: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Legal & Company',
      links: [
        { label: 'About RehabConnect', path: '/about' },
        { label: 'Resources & Guides', path: '/resources' },
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms & Conditions', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 dark:bg-slate-950 border-t border-slate-800 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper CTA Banner */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-900/60 via-slate-800 to-emerald-950/60 p-8 md:p-12 mb-16 border border-teal-500/20 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-teal-500/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold mb-4 border border-teal-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% Confidential Healthcare Referral</span>
              </div>
              <h3 className="font-heading font-bold text-2xl md:text-3xl text-white tracking-tight">
                Your recovery journey doesn’t have to start alone.
              </h3>
              <p className="mt-2 text-sm md:text-base text-slate-300">
                Connect with an empathetic Care Coordinator today to review clinical options tailored for you or your loved one.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
              <button
                onClick={() => router.push('/assessment')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold text-sm shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
              >
                <span>Take the First Step</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => router.push('/contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm border border-slate-700 transition-colors"
              >
                <span>Talk to Advisor</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-teal-500/20">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <span className="font-heading font-extrabold text-2xl tracking-tight text-white">
                Rehab<span className="text-teal-400">Connect</span>
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              RehabConnect is a modern digital rehabilitation consultation and referral platform that bridges people seeking rehabilitation support with certified Care Coordinators and verified rehabilitation centres.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-slate-400">
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Lock className="w-3.5 h-3.5 text-teal-400" />
                <span>Encrypted Consultations</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700">
                <Globe className="w-3.5 h-3.5 text-teal-400" />
                <span>Global & Local Access</span>
              </div>
            </div>
          </div>

          {/* Nav Groups */}
          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h4 className="font-heading font-bold text-sm text-white tracking-wider uppercase">
                {group.title}
              </h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => router.push(link.path)}
                      className="text-xs text-slate-400 hover:text-teal-400 transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="w-full md:w-auto">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
              Subscribe to Healthcare Insights
            </h5>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
              <div className="relative flex-1">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-teal-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-white font-semibold text-xs transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing!
              </p>
            )}
          </div>

          <div className="flex flex-col md:items-end text-xs text-slate-500 space-y-1">
            <p>© {new Date().getFullYear()} RehabConnect Platform. All rights reserved.</p>
            <p className="text-[11px] text-slate-600">
              Medical disclaimer: RehabConnect provides digital care coordination and referral guidance. In emergency medical situations, please contact emergency medical services immediately.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
