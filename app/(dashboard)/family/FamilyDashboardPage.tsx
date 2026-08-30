"use client"
import React from 'react';
import {
  HeartHandshake,
  Calendar,
  Video,
  FileText,
  Activity,
  ChevronRight,
  CheckCircle2,
  BookOpen,
  MessageSquare
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

// ── Local types ──────────────────────────────────────────────────────────
// Mirrors what this page needs from the backend. Fetch these shapes (or map
// your API response to them) once real data is ready.
interface JourneyStage {
  stageNumber: number;
  title: string;
  status: 'completed' | 'in_progress' | 'upcoming';
  coordinatorNote?: string;
}

interface FamilyJourney {
  currentStage: number;
  overallStatus: string;
  stages: JourneyStage[];
}

interface Appointment {
  id: string;
  type: string;
  date: string;
  timeSlot: string;
}

interface ConsultationSummary {
  id: string;
  date: string;
  patientName: string;
  coordinatorName: string;
  discussionPoints: string;
  clinicalObservations: string;
  nextStep: string;
}

// ── Mock data — replace with real fetches/session data ──────────────────
const MOCK_FAMILY_MEMBER_NAME = 'Ngozi Okafor';
const MOCK_LOVED_ONE_NAME = 'Chief Emmanuel Okafor';
const MOCK_LOVED_ONE_AGE = 68;

const MOCK_FAMILY_JOURNEY: FamilyJourney = {
  currentStage: 3,
  overallStatus: 'Steady progress across this week\u2019s sessions.',
  stages: [
    { stageNumber: 1, title: 'Intake', status: 'completed' },
    { stageNumber: 2, title: 'Assessment', status: 'completed' },
    { stageNumber: 3, title: 'Treatment', status: 'in_progress', coordinatorNote: 'Patient is showing positive motor response to home exercises.' },
    { stageNumber: 4, title: 'Review', status: 'upcoming' },
    { stageNumber: 5, title: 'Discharge', status: 'upcoming' },
  ],
};

const MOCK_APPOINTMENTS: Appointment[] = [
  { id: 'apt-2', type: 'Family Tele-Rehab Guidance', date: 'Tomorrow', timeSlot: '02:00 PM' },
];

const MOCK_SUMMARIES: ConsultationSummary[] = [
  {
    id: 'sum-1',
    date: '27 Aug',
    patientName: 'Chief Emmanuel Okafor',
    coordinatorName: 'Dr. Folake Adeyemi',
    discussionPoints: 'Mobility progress & home exercise adherence',
    clinicalObservations: 'Steady improvement in gait stability; mild fatigue reported after longer sessions.',
    nextStep: 'Continue assisted walking exercises twice daily; monitor fatigue levels.',
  },
];

export const FamilyDashboardPage: React.FC = () => {
  const router = useRouter();

  // Swap these for real data once fetching/session is wired up — nothing
  // below this point needs to change.
  const familyJourney = MOCK_FAMILY_JOURNEY;
  const appointments = MOCK_APPOINTMENTS;
  const summaries = MOCK_SUMMARIES;

  const familyApt = appointments[0];
  const latestSummary = summaries[0];

  return (
    <DashboardShell
      title={`Welcome, ${MOCK_FAMILY_MEMBER_NAME}`}
      description={`You are managing accredited rehabilitation care for your father, ${MOCK_LOVED_ONE_NAME} (${MOCK_LOVED_ONE_AGE} yrs).`}
      breadcrumbs={[{ label: 'Family Caregiver Portal' }, { label: 'Overview' }]}
      role="family"
    >
      <div className="space-y-6 max-w-6xl">
        {/* PATIENT CARE STATUS HERO CARD */}
        <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <HeartHandshake className="w-3.5 h-3.5" />
                  Loved One: {MOCK_LOVED_ONE_NAME}
                </span>
                <span className="text-xs text-[var(--gold)] font-bold">
                  Stage 0{familyJourney.currentStage} of 05 — {familyJourney.stages[familyJourney.currentStage - 1]?.title}
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold font-cinzel text-[var(--foreground)]">
                {familyJourney.overallStatus}
              </h2>
              <p className="text-xs text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                Doctor note: "{familyJourney.stages[familyJourney.currentStage - 1]?.coordinatorNote || 'Patient is showing positive motor response to home exercises.'}"
              </p>
            </div>

            <div className="shrink-0 flex items-center gap-3">
              <button
                onClick={() => router.push('/family/loved-one')}
                className="px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
              >
                <span>Track Care Pathway</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5 Stage Pathway Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-6 pt-5 border-t border-[var(--border)]">
            {familyJourney.stages.map((stage) => {
              const isDone = stage.status === 'completed';
              const isCurrent = stage.status === 'in_progress';
              return (
                <div
                  key={stage.stageNumber}
                  onClick={() => router.push('/family/loved-one')}
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

        {/* 2-COLUMN SECTION: NEXT JOINT CONSULTATION + CLINICAL SUMMARY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Next Consultation Card */}
          <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Next Family Telehealth Session</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                Confirmed
              </span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80"
                    alt="Dr. Folake Adeyemi"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--foreground)]">Dr. Folake Adeyemi</h4>
                    <p className="text-xs text-[var(--gold)] font-medium">Family Tele-Rehab Guidance</p>
                    <p className="text-[11px] text-[var(--foreground-muted)]">{familyApt?.date || 'Tomorrow'} at {familyApt?.timeSlot || '02:00 PM'}</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded-md text-[10px] font-bold bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)]">
                  3-Way Video
                </span>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                <button
                  onClick={() => router.push('/family/consultation-live')}
                  className="flex-1 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-transform active:scale-95"
                >
                  <Video className="w-4 h-4 text-black" />
                  <span>Join Video Consultation</span>
                </button>
                <button
                  onClick={() => router.push('/dashboard/family/consultations')}
                  className="px-3 py-2.5 rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs text-[var(--foreground)] transition-colors"
                >
                  Details
                </button>
              </div>
            </div>

            <p className="text-xs text-[var(--foreground-muted)]">
              Joint family sessions allow you and your loved one to connect directly with the lead neurologist and physical therapist together.
            </p>
          </div>

          {/* Latest Summary & Caregiver Note */}
          <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Caregiver Guidance & Summary</h3>
              </div>
              <span className="text-[10px] text-[var(--foreground-muted)]">{latestSummary?.date}</span>
            </div>

            <div className="p-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--foreground)]">
                  {latestSummary?.discussionPoints}
                </span>
                <span className="text-[10px] font-semibold text-[var(--gold)]">
                  {latestSummary?.coordinatorName}
                </span>
              </div>

              <p className="text-xs text-[var(--foreground-muted)] line-clamp-3 leading-relaxed">
                "{latestSummary?.clinicalObservations}"
              </p>

              <div className="pt-2 border-t border-[var(--border-subtle)] space-y-1.5">
                <span className="text-[11px] font-bold text-[var(--foreground)] block">Caregiver Instructions:</span>
                <p className="text-xs text-[var(--gold)] font-medium leading-snug">
                  {latestSummary?.nextStep}
                </p>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => router.push('/dashboard/family/consultations')}
                  className="w-full py-2 rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Full Family Consultation Summary</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* QUICK SHORTCUTS FOR FAMILIES */}
        {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <button
            onClick={() => router.push('/dashboard/family/patient')}
            className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)]/50 transition-all text-left flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                Loved One Records
              </h4>
              <p className="text-[11px] text-[var(--foreground-muted)]">Stage progress & milestones</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/dashboard/family/messages')}
            className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)]/50 transition-all text-left flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-blue-400 transition-colors">
                Doctor Messaging
              </h4>
              <p className="text-[11px] text-[var(--foreground-muted)]">Ask caregiver questions</p>
            </div>
          </button>

          <button
            onClick={() => router.push('/dashboard/family/resources')}
            className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)]/50 transition-all text-left flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-[var(--foreground)] group-hover:text-emerald-400 transition-colors">
                Family Resources
              </h4>
              <p className="text-[11px] text-[var(--foreground-muted)]">Caregiver support guides</p>
            </div>
          </button>
        </div> */}
      </div>
    </DashboardShell>
  );
};