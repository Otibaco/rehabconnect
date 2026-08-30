"use client";

import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  MessageSquare,
  AlertCircle,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FollowUp {
  id: string;
  patientName: string;
  patientAvatar: string;
  journeyStage: string;
  reason: string;
  targetDate: string;
  status: 'pending' | 'completed';
  notes?: string;
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const mockFollowUps: FollowUp[] = [
  {
    id: 'fu_1',
    patientName: 'Adebimpe Okafor',
    patientAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    journeyStage: 'Stage 03',
    reason: 'Post-consultation medication review and tolerance check',
    targetDate: 'Mar 01, 2025',
    status: 'pending',
    notes: 'Patient reported mild nausea in first week. Monitor and adjust if persists.',
  },
  {
    id: 'fu_2',
    patientName: 'Tunde Bakare',
    patientAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    journeyStage: 'Stage 02',
    reason: 'Family assessment follow-up and care plan discussion',
    targetDate: 'Feb 28, 2025',
    status: 'pending',
  },
  {
    id: 'fu_3',
    patientName: 'Ngozi Eze',
    patientAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80',
    journeyStage: 'Stage 04',
    reason: 'Weekly therapy progress evaluation',
    targetDate: 'Feb 25, 2025',
    status: 'completed',
    notes: 'Significant improvement in mood and engagement.',
  },
  {
    id: 'fu_4',
    patientName: 'Ibrahim Suleiman',
    patientAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    journeyStage: 'Stage 01',
    reason: 'Initial intake verification and consent documentation',
    targetDate: 'Feb 26, 2025',
    status: 'pending',
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const CoordinatorFollowUpsPage: React.FC = () => {
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [followUps, setFollowUps] = useState<FollowUp[]>(mockFollowUps);

  const filteredFollowUps = followUps.filter((f) => {
    if (filter === 'pending') return f.status === 'pending';
    if (filter === 'completed') return f.status === 'completed';
    return true;
  });

  const handleComplete = (id: string) => {
    setFollowUps((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, status: 'completed' } : f
      )
    );
  };

  const pendingCount = followUps.filter((f) => f.status === 'pending').length;
  const completedCount = followUps.filter((f) => f.status === 'completed').length;

  return (
    <DashboardShell
      title="Follow-ups"
      description="Post-consultation tasks created automatically from clinical summaries."
      breadcrumbs={[
        { label: 'Doctor Suite', path: '/coordinator' as any },
        { label: 'Follow-ups' },
      ]}
    >
      <div className="space-y-6">
        
        {/* ── Filter Tabs ── */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              filter === 'all'
                ? 'theme-btn-primary'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            All ({followUps.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              filter === 'pending'
                ? 'bg-amber-500 text-white'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Pending ({pendingCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
              filter === 'completed'
                ? 'bg-emerald-500 text-white'
                : 'bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-muted)] hover:text-[var(--color-text)]'
            }`}
          >
            Completed ({completedCount})
          </button>
        </div>

        {/* ── Task List ── */}
        <div className="space-y-3">
          {filteredFollowUps.map((flw) => {
            const isDone = flw.status === 'completed';

            return (
              <div
                key={flw.id}
                className={`p-5 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-[var(--color-surface)]/50 border-[var(--color-border)] opacity-70'
                    : 'bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-accent)]/30 hover:shadow-sm'
                }`}
              >
                <div className="flex items-start gap-4 min-w-0">
                  <img
                    src={flw.patientAvatar}
                    alt={flw.patientName}
                    className="w-11 h-11 rounded-full object-cover border border-[var(--color-accent)]/20 shrink-0"
                  />
                  <div className="space-y-1.5 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="text-sm font-semibold text-[var(--color-text)]">
                        {flw.patientName}
                      </h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                        {flw.journeyStage}
                      </span>
                      <span className="text-[10px] text-amber-600 font-medium bg-amber-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Due: {flw.targetDate}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--color-text)] leading-snug">
                      {flw.reason}
                    </p>

                    {flw.notes && (
                      <p className="text-[11px] text-[var(--color-text-muted)] italic">
                        &ldquo;{flw.notes}&rdquo;
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => router.push('/coordinator/coordinator-messages')}
                    className="p-2 rounded-lg bg-[var(--color-surface-muted)] hover:bg-[var(--color-surface-elevated)] border border-[var(--color-border)] text-[var(--color-text)] transition-colors"
                    title="Message patient"
                  >
                    <MessageSquare className="w-4 h-4 text-[var(--color-accent)]" />
                  </button>

                  <button
                    onClick={() => handleComplete(flw.id)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                      isDone
                        ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                        : 'theme-btn-primary active:scale-[0.98]'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Completed' : 'Mark complete'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredFollowUps.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-surface-muted)] text-[var(--color-text-muted)] mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <p className="text-sm font-medium text-[var(--color-text)]">No tasks found</p>
            <p className="text-xs text-[var(--color-text-muted)] mt-1">
              No follow-ups match the selected filter.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};

export default CoordinatorFollowUpsPage;