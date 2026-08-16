"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { MOCK_CLINICAL_RESOURCES } from '@/lib/data';
import {
  Download,
  CheckCircle2,
  Stethoscope,
  Eye
} from 'lucide-react';

export const PatientResourcesPage: React.FC = () => {
  const router = useRouter();

  return (
    <DashboardShell
      title="My Prescribed Clinical Protocols"
      description="Digital rehabilitation roadmaps, exercise routines, and guides prescribed by your doctor."
      breadcrumbs={[{ label: 'Patient Portal' }, { label: 'Care Resources' }]}
    >
      <div className="space-y-6">
        <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--background-tertiary)] text-[var(--gold)] border border-[var(--border-subtle)] text-xs font-semibold">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Prescribed by Dr. Amara Okafor, MD</span>
          </div>
          <h2 className="font-cinzel font-bold text-xl text-[var(--foreground)]">
            Personalized Home Rehabilitation Materials
          </h2>
          <p className="text-xs text-[var(--foreground-muted)] max-w-2xl">
            Access your doctor-approved exercise regimens, video demonstrations, and symptom recovery worksheets. Practice these daily for optimal therapeutic progress.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CLINICAL_RESOURCES.map((res) => (
            <div
              key={res.id}
              className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] shadow-md hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider bg-[var(--background-tertiary)] px-2.5 py-1 rounded-full border border-[var(--border-subtle)]">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-[var(--foreground-subtle)] font-medium">
                    {res.format}
                  </span>
                </div>

                <h3 className="font-cinzel font-bold text-base text-[var(--foreground)]">
                  {res.title}
                </h3>

                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  {res.description}
                </p>

                <div className="pt-2 text-[11px] text-[var(--foreground-subtle)] border-t border-[var(--border)] flex items-center justify-between">
                  <span>{res.durationOrPages}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    Prescribed
                  </span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button className="flex-1 py-2.5 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] flex items-center justify-center gap-1.5 shadow-sm transition-all">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Open Protocol</span>
                </button>
                <button
                  className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors"
                  title="Download Offline Copy"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};
