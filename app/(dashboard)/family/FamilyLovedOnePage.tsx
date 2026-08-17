"use client"
import React from 'react';

import {
  HeartHandshake,
  User,
  Activity,
  CheckCircle2,
  Clock,
  Calendar,
  FileText,
  Stethoscope,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const FamilyLovedOnePage: React.FC = () => {
  const { familyJourney } = useAuth();
  const router = useRouter();

  return (
    <DashboardShell
      title="Loved One Care Journey"
      description="Detailed rehabilitation roadmap, clinical milestones, and doctor notes for Chief Emmanuel Okafor."
      breadcrumbs={[
        { label: 'Family Dashboard', path: '/dashboard/family' },
        { label: 'My Patient' }
      ]}
    >
      <div className="space-y-6 max-w-6xl">
        {/* Loved One Profile Header Card */}
        <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[var(--gold)]/15 border border-[var(--gold)]/30 flex items-center justify-center text-[var(--gold)] shrink-0 font-cinzel font-bold text-xl">
                EO
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold font-cinzel text-[var(--foreground)]">
                    Chief Emmanuel Okafor
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    Active Rehabilitation
                  </span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)]">
                  Age: 68 • Gender: Male • Location: Lekki Phase 1, Lagos
                </p>
                <p className="text-xs text-[var(--gold)] font-medium">
                  Primary Condition: {familyJourney.overallStatus}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard/family/consultations')}
                className="px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Joint Session</span>
              </button>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 pt-5 border-t border-[var(--border)] space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[var(--foreground-muted)]">Rehabilitation Pathway: Stage 0{familyJourney.currentStage} of 05</span>
              <span className="text-[var(--gold)] font-mono">{((familyJourney.currentStage / 5) * 100).toFixed(0)}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--background-tertiary)] overflow-hidden">
              <div
                style={{ width: `${(familyJourney.currentStage / 5) * 100}%` }}
                className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* 5-STAGE MILESTONE TIMELINE */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--gold)]" />
            <span>Caregiver Recovery Timeline</span>
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {familyJourney.stages.map((stage) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'in_progress';
              const isPending = stage.status === 'pending';

              return (
                <div
                  key={stage.stageNumber}
                  className={`p-5 rounded-2xl border transition-all ${
                    isCurrent
                      ? 'bg-[var(--background-secondary)] border-[var(--gold)]/60 shadow-lg shadow-[var(--gold)]/5'
                      : isCompleted
                      ? 'bg-[var(--background-secondary)]/70 border-[var(--border)]'
                      : 'bg-[var(--background-secondary)]/40 border-[var(--border-subtle)] opacity-75'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl shrink-0 flex items-center justify-center font-bold font-mono text-sm border ${
                          isCompleted
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            : isCurrent
                            ? 'bg-[var(--gold)] text-black border-[var(--gold)] shadow-md shadow-[var(--gold)]/20'
                            : 'bg-[var(--background-tertiary)] text-[var(--foreground-subtle)] border-[var(--border-subtle)]'
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `0${stage.stageNumber}`}
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-base font-bold text-[var(--foreground)]">{stage.title}</h4>
                          {isCurrent && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30 animate-pulse">
                              Active Stage
                            </span>
                          )}
                          {isCompleted && (
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              Completed {stage.completedDate}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                          {stage.status === 'pending' && 'This stage is upcoming. Please follow the care plan and await guidance from your assigned doctor.'}
                        </p>
                      </div>
                    </div>

                    {stage.coordinatorNote && (
                      <div className="md:w-80 shrink-0 p-3.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[var(--gold)]">
                          <Stethoscope className="w-3.5 h-3.5" />
                          <span>Doctor Guidance for Family</span>
                        </div>
                        <p className="text-[var(--foreground-muted)] text-[11px] leading-snug">
                          "{stage.coordinatorNote}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Assigned Doctor Card */}
        <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80"
              alt="Dr. Folake Adeyemi"
              className="w-14 h-14 rounded-full object-cover border-2 border-[var(--gold)]"
            />
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-[var(--foreground)]">{familyJourney.assignedCoordinatorName}</h4>
                <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
              </div>
              <p className="text-xs text-[var(--foreground-muted)]">{familyJourney.assignedCoordinatorName}</p>
              <p className="text-[11px] text-[var(--foreground-subtle)]">Specialist in Stroke Recovery & Senior Home Neuro-Rehab</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => router.push('/dashboard/family/messages')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors"
            >
              Ask Question
            </button>
            <button
              onClick={() => router.push('/dashboard/family/consultations')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold"
            >
              Schedule Review
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
