"use client"
import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Activity,
  Calendar,
  MessageSquare,
  FileText,
  ChevronRight,
  HeartHandshake,
  CheckCircle2,
  Clock,
  Sparkles
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CoordinatorPatientRecord } from '@/types/type';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const CoordinatorPatientsPage: React.FC = () => {
  const { coordinatorPatients, updateCareJourneyStage } = useAuth();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [selectedPatient, setSelectedPatient] = useState<CoordinatorPatientRecord | null>(null);

  const filteredPatients = coordinatorPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage =
      stageFilter === 'all' || String(p.journeyStage).includes(stageFilter);
    return matchesSearch && matchesStage;
  });

  return (
    <DashboardShell
      title="Assigned Patients Directory"
      description="Monitor active patient recovery pathways, primary clinical conditions, and recent consultation milestones."
      breadcrumbs={[
        { label: 'Doctor Suite', path: '/dashboard/coordinator' },
        { label: 'Patients' }
      ]}
    >
      <div className="space-y-6 max-w-6xl">
        {/* SEARCH & FILTERS BAR */}
        <div className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by patient name, condition..."
              className="w-full bg-[var(--background-tertiary)] border border-[var(--border)] rounded-xl pl-9 pr-4 py-2 text-xs text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-xs text-[var(--foreground-muted)] whitespace-nowrap">Filter Stage:</span>
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-[var(--background-tertiary)] border border-[var(--border)] rounded-xl px-3 py-2 text-xs text-[var(--foreground)] focus:outline-none"
            >
              <option value="all">All Stages (01 - 05)</option>
              <option value="01">Stage 01 — Intake</option>
              <option value="02">Stage 02 — Assessment</option>
              <option value="03">Stage 03 — Recovery Plan</option>
              <option value="04">Stage 04 — Active Rehab</option>
              <option value="05">Stage 05 — Discharge</option>
            </select>
          </div>
        </div>

        {/* PATIENTS DIRECTORY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((p) => {
            const isFamily = p.primaryContactType === 'family';

            return (
              <div
                key={p.id}
                className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 hover:border-[var(--gold)]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-sm text-[var(--foreground)]">{p.name}</h4>
                        {isFamily && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-semibold bg-blue-500/15 text-blue-400 border border-blue-500/20">
                            Family Account
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--gold)] font-medium">{p.condition}</p>
                      {p.familyContactName && (
                        <p className="text-[10px] text-[var(--foreground-subtle)]">Contact: {p.familyContactName}</p>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20 whitespace-nowrap">
                    {p.journeyStage}
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-1 text-xs">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--foreground-subtle)]">Last Consultation:</span>
                    <span className="text-[var(--foreground)] font-medium">{p.lastConsultation}</span>
                  </div>
                  <div className="flex justify-between text-[11px]">
                    <span className="text-[var(--foreground-subtle)]">Next Scheduled Step:</span>
                    <span className="text-[var(--gold)] font-medium">{p.nextConsultation}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => router.push('/dashboard/coordinator/messages')}
                    className="flex-1 py-2 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[var(--gold)]" />
                    <span>Message</span>
                  </button>
                  <button
                    onClick={() => router.push('/dashboard/coordinator/consultations')}
                    className="flex-1 py-2 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold flex items-center justify-center gap-1.5 transition-transform active:scale-95"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Write Summary</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
};
