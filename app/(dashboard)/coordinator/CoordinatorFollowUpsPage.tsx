"use client"
import React, { useState } from 'react';
import {
  ClipboardList,
  CheckCircle2,
  Clock,
  Calendar,
  PhoneCall,
  MessageSquare,
  Filter,
  User,
  Activity,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const CoordinatorFollowUpsPage: React.FC = () => {
  const { followUps, completeFollowUp } = useAuth();
  const router = useRouter();
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const filteredFollowUps = followUps.filter((f) => {
    if (filter === 'pending') return f.status === 'pending';
    if (filter === 'completed') return f.status === 'completed';
    return true;
  });

  return (
    <DashboardShell
      title="Clinical Follow-Up Board"
      description="Post-consultation follow-up tasks automatically created from consultation summaries. Mark completed as clinical checks occur."
      breadcrumbs={[
        { label: 'Doctor Suite', path: '/dashboard/coordinator' },
        { label: 'Follow-Ups' }
      ]}
    >
      <div className="space-y-6 max-w-5xl">
        {/* FILTER BAR */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-[var(--gold)] text-black font-bold'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              All Tasks ({followUps.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-amber-400 text-black font-bold'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              Pending ({followUps.filter((f) => f.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                filter === 'completed'
                  ? 'bg-emerald-400 text-black font-bold'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
              }`}
            >
              Completed ({followUps.filter((f) => f.status === 'completed').length})
            </button>
          </div>
        </div>

        {/* FOLLOW-UP TASK LIST */}
        <div className="space-y-3">
          {filteredFollowUps.map((flw) => {
            const isDone = flw.status === 'completed';

            return (
              <div
                key={flw.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isDone
                    ? 'bg-[var(--background-secondary)]/50 border-[var(--border-subtle)] opacity-70'
                    : 'bg-[var(--background-secondary)] border-[var(--border)] hover:border-[var(--gold)]/50'
                }`}
              >
                <div className="flex items-start gap-4">
                  <img
                    src={flw.patientAvatar}
                    alt={flw.patientName}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)] shrink-0"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-sm text-[var(--foreground)]">{flw.patientName}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                        {flw.journeyStage}
                      </span>
                      <span className="text-[10px] text-amber-400 font-semibold bg-amber-400/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <Clock className="w-3 h-3" /> Due: {flw.targetDate}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--foreground)] font-medium leading-snug">
                      {flw.reason}
                    </p>

                    {flw.notes && (
                      <p className="text-[11px] text-[var(--foreground-muted)]">
                        Prescription note: "{flw.notes}"
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => router.push('/dashboard/coordinator/messages')}
                    className="p-2.5 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-[var(--foreground)] text-xs flex items-center gap-1 transition-colors"
                    title="Message Patient/Family"
                  >
                    <MessageSquare className="w-4 h-4 text-[var(--gold)]" />
                  </button>

                  <button
                    onClick={() => completeFollowUp(flw.id)}
                    className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isDone
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black border-[var(--gold)] shadow-sm active:scale-95'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{isDone ? 'Task Completed' : 'Mark Completed'}</span>
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
