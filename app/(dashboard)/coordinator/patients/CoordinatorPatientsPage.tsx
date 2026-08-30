"use client";

import React, { useState } from 'react';
import {
  Users,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  FileText,
  HeartHandshake,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PatientRecord {
  id: string;
  name: string;
  avatar: string;
  condition: string;
  journeyStage: string;
  lastConsultation: string;
  nextConsultation: string;
  primaryContactType: 'self' | 'family';
  familyContactName?: string;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const mockPatients: PatientRecord[] = [
  {
    id: '1',
    name: 'Adebimpe Okafor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    condition: 'Substance Use Disorder',
    journeyStage: 'Stage 03',
    lastConsultation: 'Feb 24, 2025',
    nextConsultation: 'Mar 02, 2025',
    primaryContactType: 'self',
  },
  {
    id: '2',
    name: 'Tunde Bakare',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    condition: 'Alcohol Dependency',
    journeyStage: 'Stage 02',
    lastConsultation: 'Feb 22, 2025',
    nextConsultation: 'Feb 28, 2025',
    primaryContactType: 'family',
    familyContactName: 'Mrs. Bakare',
  },
  {
    id: '3',
    name: 'Ngozi Eze',
    avatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80',
    condition: 'Depression & Anxiety',
    journeyStage: 'Stage 04',
    lastConsultation: 'Feb 20, 2025',
    nextConsultation: 'Feb 27, 2025',
    primaryContactType: 'self',
  },
  {
    id: '4',
    name: 'Ibrahim Suleiman',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    condition: 'Opioid Dependency',
    journeyStage: 'Stage 01',
    lastConsultation: 'Feb 18, 2025',
    nextConsultation: 'Feb 25, 2025',
    primaryContactType: 'family',
    familyContactName: 'Mr. Suleiman Sr.',
  },
  {
    id: '5',
    name: 'Folake Adeyemi',
    avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80',
    condition: 'Post-Traumatic Stress',
    journeyStage: 'Stage 05',
    lastConsultation: 'Feb 15, 2025',
    nextConsultation: 'Mar 05, 2025',
    primaryContactType: 'self',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const CoordinatorPatientsPage: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [stageFilter, setStageFilter] = useState('all');
  const [patients] = useState<PatientRecord[]>(mockPatients);

  const filteredPatients = patients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.condition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStage =
      stageFilter === 'all' || p.journeyStage.includes(stageFilter);
    return matchesSearch && matchesStage;
  });

  return (
    <DashboardShell
      title="Assigned patients"
      description="Monitor active patient recovery pathways, clinical conditions, and consultation milestones."
      breadcrumbs={[
        { label: 'Doctor Suite', path: '/coordinator' as any },
        { label: 'Patients' },
      ]}
    >
      <div className="space-y-6">
        
        {/* ── Search & Filters ── */}
        <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[var(--color-text-muted)] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or condition..."
              className="w-full bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-lg pl-9 pr-4 py-2 text-xs text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-[var(--color-text-muted)]" />
            <select
              value={stageFilter}
              onChange={(e) => setStageFilter(e.target.value)}
              className="bg-[var(--color-surface-muted)] border border-[var(--color-border)] rounded-lg px-3 py-2 text-xs text-[var(--color-text)] focus:outline-none focus:border-[var(--color-accent)]"
            >
              <option value="all">All stages</option>
              <option value="01">Stage 01 — Intake</option>
              <option value="02">Stage 02 — Assessment</option>
              <option value="03">Stage 03 — Recovery Plan</option>
              <option value="04">Stage 04 — Active Rehab</option>
              <option value="05">Stage 05 — Discharge</option>
            </select>
          </div>
        </div>

        {/* ── Patients Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredPatients.map((p) => {
            const isFamily = p.primaryContactType === 'family';

            return (
              <div
                key={p.id}
                className="p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4 hover:border-[var(--color-accent)]/30 hover:shadow-sm transition-all duration-200"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={p.avatar}
                      alt={p.name}
                      className="w-11 h-11 rounded-full object-cover border-2 border-[var(--color-accent)]/20"
                    />
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-semibold text-[var(--color-text)]">{p.name}</h4>
                        {isFamily && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                            Family account
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--color-accent)] font-medium mt-0.5">{p.condition}</p>
                      {p.familyContactName && (
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">
                          Contact: {p.familyContactName}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)] whitespace-nowrap">
                    {p.journeyStage}
                  </span>
                </div>

                {/* Details */}
                <div className="p-3 rounded-lg bg-[var(--color-surface-muted)] border border-[var(--color-border)] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Last consultation</span>
                    <span className="text-[var(--color-text)] font-medium">{p.lastConsultation}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-muted)]">Next scheduled</span>
                    <span className="text-[var(--color-accent)] font-medium">{p.nextConsultation}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t border-[var(--color-border)]">
                  <button
                    onClick={() => router.push('/coordinator/coordinator-messages')}
                    className="flex-1 py-2 rounded-lg bg-[var(--color-surface-muted)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-xs font-medium text-[var(--color-text)] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-[var(--color-accent)]" />
                    Message
                  </button>
                  <button
                    onClick={() => router.push('/coordinator/coordinator-consultations')}
                    className="flex-1 py-2 rounded-lg theme-btn-primary text-xs font-medium flex items-center justify-center gap-1.5 transition-all duration-200 active:scale-[0.98]"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Write summary
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] mb-4">
              <Users className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[var(--color-text)]">No patients found</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default CoordinatorPatientsPage;