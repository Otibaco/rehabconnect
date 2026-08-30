"use client"
import React from 'react';
import { BookOpen, Clock, ArrowRight, ShieldCheck, Download, ExternalLink } from 'lucide-react';
import { MOCK_FAMILY_RESOURCES } from '@/lib/data';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const FamilyResourcesPage: React.FC = () => {
  return (
    <DashboardShell
      title="Family Caregiver Knowledge Library"
      description="Clinical guidance, home safety tips, and emotional wellness resources curated for Nigerian families."
      breadcrumbs={[
        { label: 'Family Dashboard', path: '/family' },
        { label: 'Resources' }
      ]}
    >
      <div className="space-y-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_FAMILY_RESOURCES.map((res) => (
            <div
              key={res.id}
              className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 flex flex-col justify-between hover:border-[var(--gold)]/40 transition-colors"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-[var(--foreground-subtle)] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {res.readTime}
                  </span>
                </div>

                <h3 className="font-bold text-sm text-[var(--foreground)] leading-snug">
                  {res.title}
                </h3>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed line-clamp-3">
                  {res.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
                <span className="text-[10px] text-[var(--foreground-subtle)]">Doctor Approved</span>
                <button
                  onClick={() => alert(`Opening resource: "${res.title}"`)}
                  className="text-xs font-bold text-[var(--gold)] hover:underline flex items-center gap-1"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};
