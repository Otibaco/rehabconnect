"use client";
import React from 'react';
import {
  CheckCircle2,
  Sparkles,
  Calendar,
  ArrowRight,
  Video,
  MessageSquare,
  Activity,
  ChevronRight,
  FileText,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export const PatientDashboardPage: React.FC = () => {
  const router = useRouter();
  const { currentUser, appointments, patientJourney, summaries } = useAuth();

  const nextAppointment = appointments.find((a) => a.status === 'scheduled') || appointments[0];
  const latestSummary = summaries[0];

  return (
    <DashboardShell
      title={`Welcome back, ${currentUser.name}`}
      description="Track your personalized recovery pathway, upcoming doctor consultations, and post-session clinical notes."
      breadcrumbs={[{ label: 'Patient Portal' }, { label: 'Overview' }]}
    >
      <div className="space-y-6 max-w-6xl">
        {/* CARE JOURNEY BANNER CARD */}
        <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30">
                  Current Stage: 0{patientJourney.currentStage} of 05 — {patientJourney.stages[patientJourney.currentStage - 1]?.title}
                </span>
                <span className="text-xs text-[var(--foreground-muted)]">
                  {patientJourney.overallStatus}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-cinzel text-[var(--foreground)]">
                {patientJourney.latestUpdate}
              </h2>
              <p className="text-xs text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                Doctor note: "{patientJourney.stages[patientJourney.currentStage - 1]?.coordinatorNote || 'Active recovery plan underway.'}"
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => router.push('/dashboard/journey')}
                className="px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
              >
                <span>View Full Journey</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5-Stage Step Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-[var(--border)]">
            {patientJourney.stages.map((stage) => {
              const isDone = stage.status === 'completed';
              const isCurrent = stage.status === 'in_progress';
              return (
                <div
                  key={stage.stageNumber}
                  onClick={() => router.push('/dashboard/journey')}
                  className={`p-3 rounded-xl border text-center space-y-1 cursor-pointer transition-all ${
                    isCurrent
                      ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold)] shadow-md shadow-[var(--gold)]/10'
                      : isDone
                      ? 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground)] hover:border-[var(--gold)]/40'
                      : 'bg-[var(--background-tertiary)]/40 border-[var(--border)] text-[var(--foreground-subtle)] opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-center">
                    {isDone ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-4 h-4 rounded-full bg-[var(--gold)] text-black text-[10px] font-bold flex items-center justify-center animate-pulse">
                        {stage.stageNumber}
                      </span>
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-[var(--border)] text-[10px] flex items-center justify-center">
                        {stage.stageNumber}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-bold truncate">{stage.title}</p>
                  <p className="text-[9px] opacity-75">{isDone ? 'Completed' : isCurrent ? 'Active Now' : 'Upcoming'}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2-COLUMN MAIN SECTION: NEXT CONSULTATION + RECENT CLINICAL SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Next Scheduled Video Consultation */}
          <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Next Doctor Consultation</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                {nextAppointment ? 'Confirmed' : 'None Scheduled'}
              </span>
            </div>

            {nextAppointment ? (
              <div className="p-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={nextAppointment.coordinatorAvatar || "https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80"}
                      alt={nextAppointment.coordinatorName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)]"
                    />
                    <div>
                      <h4 className="font-bold text-sm text-[var(--foreground)]">{nextAppointment.coordinatorName}</h4>
                      <p className="text-xs text-[var(--gold)] font-medium">{nextAppointment.type}</p>
                      <p className="text-[11px] text-[var(--foreground-muted)]">{nextAppointment.date} at {nextAppointment.timeSlot}</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)]">
                    Telehealth Live
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => router.push('/consultation/live')}
                    className="flex-1 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                  >
                    <Video className="w-4 h-4 text-black" />
                    <span>Join Video Room</span>
                  </button>
                  <button
                    onClick={() => router.push('/dashboard/consultations')}
                    className="px-3 py-2.5 rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs text-[var(--foreground)] transition-colors"
                  >
                    Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[var(--background-tertiary)] text-center space-y-3">
                <p className="text-xs text-[var(--foreground-muted)]">You have no upcoming consultations scheduled.</p>
                <button
                  onClick={() => router.push('/patient/consultations/book')}
                  className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold"
                >
                  Book New Consultation
                </button>
              </div>
            )}

            <div className="flex items-center justify-between text-xs text-[var(--foreground-muted)] pt-1">
              <span>Need to reschedule?</span>
              <button
                onClick={() => router.push('/dashboard/messages')}
                className="text-[var(--gold)] hover:underline font-medium"
              >
                Message Care Coordinator
              </button>
            </div>
          </div>

          {/* 2. Latest Post-Consultation Summary */}
          <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Latest Clinical Summary</h3>
              </div>
              {latestSummary && (
                <span className="text-[10px] text-[var(--foreground-muted)]">
                  {latestSummary.date}
                </span>
              )}
            </div>

            {latestSummary ? (
              <div className="p-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[var(--foreground)]">
                    {latestSummary.discussionPoints}
                  </span>
                  <span className="text-[10px] font-semibold text-[var(--gold)]">
                    {latestSummary.coordinatorName}
                  </span>
                </div>

                <p className="text-xs text-[var(--foreground-muted)] line-clamp-3 leading-relaxed">
                  "{latestSummary.clinicalObservations}"
                </p>

                <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1.5">
                  <span className="text-[11px] font-bold text-[var(--foreground)] block">Prescribed Next Step:</span>
                  <p className="text-xs text-[var(--gold)] font-medium leading-snug">
                    {latestSummary.nextStep}
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => router.push('/dashboard/consultations')}
                    className="w-full py-2 rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Read Full Consultation Summary</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-[var(--background-tertiary)] text-center space-y-2">
                <p className="text-xs text-[var(--foreground-muted)]">No clinical consultation summaries recorded yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* QUICK ACTIONS & SUPPORT FOOTER */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/patient/consultations/book')}
            className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)]/50 transition-all text-left flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                Book Consultation
              </h4>
              <p className="text-[11px] text-[var(--foreground-muted)]">Schedule telehealth video</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/dashboard/messages')}
            className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)]/50 transition-all text-left flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-blue-400 transition-colors">
                Doctor Messaging
              </h4>
              <p className="text-[11px] text-[var(--foreground-muted)]">Direct chat with care team</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/dashboard/resources')}
            className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)]/50 transition-all text-left flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-emerald-400 transition-colors">
                Recovery Guides
              </h4>
              <p className="text-[11px] text-[var(--foreground-muted)]">Exercises & wellness library</p>
            </div>
          </button>
        </div>
      </div>
    </DashboardShell>
  );
};
