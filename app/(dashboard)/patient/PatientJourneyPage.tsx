"use client";
import React from 'react';

import {
  Activity,
  CheckCircle2,
  Clock,
  Calendar,
  ShieldCheck,
  Stethoscope,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const PatientJourneyPage: React.FC = () => {
  const { patientJourney, currentUser } = useAuth();
  const router = useRouter();

  return (
    <DashboardShell
      title="My Rehabilitation Journey"
      description="Track your 5-stage personalized recovery pathway, milestones, and doctor recommendations."
      breadcrumbs={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'My Journey' }
      ]}
    >
      <div className="space-y-6 max-w-6xl">
        {/* Journey Header Card */}
        <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30">
                  Current Status: Stage 0{patientJourney.currentStage} of 05
                </span>
                <span className="text-xs text-[var(--foreground-muted)] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Updated: {patientJourney.latestUpdateDate}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[var(--foreground)]">
                {patientJourney.overallStatus}
              </h2>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                {patientJourney.latestUpdate}
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => router.push('/dashboard/consultations')}
                className="px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Calendar className="w-4 h-4" />
                <span>View Consultations</span>
              </button>
              <button
                onClick={() => router.push('/dashboard/messages')}
                className="px-4 py-2.5 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-[var(--foreground)] text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Stethoscope className="w-4 h-4 text-[var(--gold)]" />
                <span>Message Doctor</span>
              </button>
            </div>
          </div>

          {/* Quick Progress Bar */}
          <div className="mt-6 pt-6 border-t border-[var(--border)] space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-[var(--foreground-muted)]">Recovery Pathway Progress</span>
              <span className="text-[var(--gold)] font-mono">{((patientJourney.currentStage / 5) * 100).toFixed(0)}% Completed</span>
            </div>
            <div className="w-full h-2 rounded-full bg-[var(--background-tertiary)] overflow-hidden border border-[var(--border-subtle)]">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(patientJourney.currentStage / 5) * 100}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] rounded-full"
              />
            </div>
          </div>
        </div>

        {/* 5-STAGE TIMELINE CARDS */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] tracking-wide flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--gold)]" />
            <span>Clinical Milestone Pathway</span>
          </h3>

          <div className="grid grid-cols-1 gap-4">
            {patientJourney.stages.map((stage) => {
              const isCompleted = stage.status === 'completed';
              const isCurrent = stage.status === 'in_progress';
              const isPending = stage.status === 'pending';

              return (
                <motion.div
                  key={stage.stageNumber}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
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
                      {/* Stage indicator badge */}
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
                          {isPending && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] text-[var(--foreground-subtle)] bg-[var(--background-tertiary)]">
                              Upcoming
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                          {stage.status === 'pending' ? 'This stage is scheduled to begin soon.' : stage.status === 'in_progress' ? 'This stage is currently in progress. Follow the recommended actions below.' : stage.status === 'completed' ? `This stage was completed on ${stage.completedDate}.` : ''}
                        </p>
                      </div>
                    </div>

                    {/* Coordinator note / Action */}
                    {stage.coordinatorNote && (
                      <div className="md:w-72 shrink-0 p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-xs space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-[var(--gold)]">
                          <Stethoscope className="w-3.5 h-3.5" />
                          <span>Doctor Clinical Note</span>
                        </div>
                        <p className="text-[var(--foreground-muted)] text-[11px] leading-snug">
                          "{stage.coordinatorNote}"
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Assigned Lead Doctor Card */}
        <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80"
                alt="Dr. Folake Adeyemi"
                className="w-14 h-14 rounded-full object-cover border-2 border-[var(--gold)]"
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[var(--background-secondary)]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-sm text-[var(--foreground)]">{patientJourney.assignedCoordinatorName}</h4>
                <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
              </div>
              <p className="text-xs text-[var(--foreground-muted)]">{patientJourney.assignedCoordinatorName}</p>
              <p className="text-[11px] text-[var(--foreground-subtle)]">MDCN Reg: 74921-NG • Lagos State University Teaching Hospital Partner</p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => router.push('/dashboard/messages')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors"
            >
              Send Message
            </button>
            <button
              onClick={() => router.push('/dashboard/consultations')}
              className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold transition-all"
            >
              Book Session
            </button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
