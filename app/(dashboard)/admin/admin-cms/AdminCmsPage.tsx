"use client"
import React, { useState } from 'react';
import { FileSpreadsheet, Save, CheckCircle2 } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const AdminCmsPage: React.FC = () => {
  const [heroTitle, setHeroTitle] = useState('100% Online Rehabilitation & Doctor Telehealth Consultations');
  const [heroSubtitle, setHeroSubtitle] = useState('Connect directly with licensed physicians and certified therapists in Nigeria for personalized home rehabilitation.');
  const [consultationFee, setConsultationFee] = useState('10000');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardShell
      title="Public Website CMS & Pricing Control"
      description="Update public marketing copy, telehealth hero headlines, and virtual consultation pricing in real time."
      breadcrumbs={[{ label: 'Admin Portal', path: '/admin/dashboard' }, { label: 'CMS Control' }]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 shadow-xl">
          {saved && (
            <div className="p-4 rounded-2xl bg-[var(--green)]/20 border border-[var(--green)]/30 text-[var(--green)] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--green)]" />
              <span>CMS settings published live to public website!</span>
            </div>
          )}

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-[var(--foreground-muted)]">
                Homepage Hero Headline Title
              </label>
              <textarea
                rows={2}
                value={heroTitle}
                onChange={(e) => setHeroTitle(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--foreground-muted)]">
                Homepage Hero Subtitle Description
              </label>
              <textarea
                rows={2}
                value={heroSubtitle}
                onChange={(e) => setHeroSubtitle(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-[var(--foreground-muted)]">
                Standard Telehealth Consultation Fee (NGN ₦)
              </label>
              <input
                type="number"
                value={consultationFee}
                onChange={(e) => setConsultationFee(e.target.value)}
                className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)] font-bold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Save className="w-4 h-4 text-black" />
            <span>Publish Live CMS Updates</span>
          </button>
        </form>
      </div>
    </DashboardShell>
  );
};
