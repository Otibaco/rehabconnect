"use client";
import React, { useState } from 'react';

import {
  Calendar,
  Video,
  Clock,
  FileText,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Download,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { ConsultationSummary } from '@/types/type';

// ── Local types ──────────────────────────────────────────────────────────
// Mirrors what this page needs from the backend. Fetch these shapes (or map
// your API response to them) once real data is ready.
interface Appointment {
  id: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  coordinatorName: string;
  coordinatorAvatar?: string;
  type: string;
  date: string;
  timeSlot: string;
}

// ── Mock data — replace with real fetches/session data ──────────────────
const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'apt-1',
    status: 'scheduled',
    coordinatorName: 'Dr. Ifeoma Chukwu',
    coordinatorAvatar: 'https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80',
    type: 'Follow-up Consultation',
    date: 'Thu, 4 Sep',
    timeSlot: '10:30 AM',
  },
  {
    id: 'apt-2',
    status: 'completed',
    coordinatorName: 'Dr. Ifeoma Chukwu',
    coordinatorAvatar: 'https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80',
    type: 'Initial Assessment',
    date: '18 Aug',
    timeSlot: '9:00 AM',
  },
];

const MOCK_SUMMARIES: (ConsultationSummary & { prescribedExercises?: string[] })[] = [
  {
    id: 'sum-1',
    patientName: 'Amaka Nwosu',
    coordinatorName: 'Dr. Ifeoma Chukwu',
    date: '28 Aug',
    discussionPoints: 'Progress review & medication check-in',
    clinicalObservations: 'Patient reports improved sleep and reduced anxiety symptoms since last session. Mobility range has increased noticeably over the past two weeks.',
    recommendations: [
      'Continue current medication dosage',
      'Increase daily walking duration to 20 minutes',
      'Schedule a follow-up in two weeks',
    ],
    nextStep: 'Continue current plan; reassess in 2 weeks.',
    followUpRequired: true,
    followUpDate: '11 Sep',
    prescribedExercises: ['Shoulder flexion stretch — 3x10 reps', 'Assisted walking — 15 min daily'],
  } as unknown as ConsultationSummary & { prescribedExercises?: string[] },
];

export const PatientConsultationsPage: React.FC = () => {
  const router = useRouter();

  // Swap these for real data once fetching/session is wired up — nothing
  // below this point needs to change.
  const appointments = MOCK_APPOINTMENTS;
  const summaries = MOCK_SUMMARIES;

  const [selectedSummary, setSelectedSummary] = useState<ConsultationSummary | null>(null);
  const selectedExercises = selectedSummary && 'prescribedExercises' in selectedSummary
    ? ((selectedSummary as ConsultationSummary & { prescribedExercises?: string[] }).prescribedExercises ?? [])
    : [];

  const upcomingApts = appointments.filter((a) => a.status === 'scheduled');
  const pastApts = appointments.filter((a) => a.status === 'completed');

  return (
    <DashboardShell
      title="Telehealth Consultations & Summaries"
      description="Manage your video consultations, join live clinical sessions, and access official doctor consultation summaries."
      breadcrumbs={[
        { label: 'Dashboard', path: '/dashboard' },
        { label: 'Consultations' }
      ]}
      role="patient"
    >
      <div className="space-y-8 max-w-6xl">
        {/* ACTION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          <div>
            <h3 className="font-bold text-sm text-[var(--foreground)]">Schedule Telehealth Consultation</h3>
            <p className="text-xs text-[var(--foreground-muted)]">Connect directly with licensed Nigerian rehabilitation specialists and care coordinators.</p>
          </div>
          <button
            onClick={() => router.push('/patient/book-consultation')}
            className="px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Book New Consultation</span>
          </button>
        </div>

        {/* UPCOMING CONSULTATIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--gold)]" />
              <span>Upcoming Consultations ({upcomingApts.length})</span>
            </h3>
          </div>

          {upcomingApts.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] text-center space-y-3">
              <Clock className="w-8 h-8 text-[var(--foreground-subtle)] mx-auto opacity-60" />
              <p className="text-xs text-[var(--foreground-muted)]">No upcoming consultations booked.</p>
              <button
                onClick={() => router.push('/patient/book-consultation')}
                className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold"
              >
                Book Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingApts.map((apt) => (
                <div
                  key={apt.id}
                  className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 hover:border-[var(--gold)]/40 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={apt.coordinatorAvatar || "https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80"}
                        alt={apt.coordinatorName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)]"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[var(--foreground)]">{apt.coordinatorName}</h4>
                        <p className="text-xs text-[var(--gold)] font-medium">{apt.type}</p>
                        <p className="text-[11px] text-[var(--foreground-subtle)]">MDCN Reg: 74921-NG</p>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      Confirmed
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-[var(--foreground)] font-medium">
                      <Calendar className="w-4 h-4 text-[var(--gold)]" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--foreground)] font-mono">
                      <Clock className="w-4 h-4 text-[var(--gold)]" />
                      <span>{apt.timeSlot}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => router.push('/patient/consultation-live')}
                    className="w-full py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
                  >
                    <Video className="w-4 h-4 text-black" />
                    <span>Join Video Room Now</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CLINICAL CONSULTATION SUMMARIES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--gold)]" />
              <span>Doctor Consultation Summaries ({summaries.length})</span>
            </h3>
            <span className="text-xs text-[var(--foreground-muted)]">Official clinical documentation</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaries.map((sum) => (
              <div
                key={sum.id}
                className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 hover:border-[var(--gold)]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                      {sum.discussionPoints}
                    </span>
                    <h4 className="font-bold text-sm text-[var(--foreground)] mt-2">
                      Session with {sum.coordinatorName}
                    </h4>
                    <p className="text-[11px] text-[var(--foreground-subtle)]">Conducted on {sum.date}</p>
                  </div>
                  <button
                    onClick={() => setSelectedSummary(sum)}
                    className="p-2 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] text-xs flex items-center gap-1 transition-colors"
                    title="View Full Report"
                  >
                    <FileText className="w-4 h-4 text-[var(--gold)]" />
                  </button>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="font-semibold text-[var(--foreground-muted)] block text-[11px]">Clinical Findings:</span>
                    <p className="text-[var(--foreground)] line-clamp-2 leading-relaxed mt-0.5">
                      {sum.clinicalObservations}
                    </p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                    <span className="font-bold text-[var(--gold)] text-[11px] block">Prescribed Action:</span>
                    <p className="text-[var(--foreground)] text-xs mt-0.5 font-medium leading-snug">
                      {sum.nextStep}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                  <button
                    onClick={() => setSelectedSummary(sum)}
                    className="flex-1 py-2 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>View Full Clinical Report</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FULL CLINICAL SUMMARY MODAL */}
        <AnimatePresence>
          {selectedSummary && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--background-tertiary)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--foreground)] font-cinzel">Clinical Consultation Summary</h3>
                      <p className="text-[10px] text-[var(--foreground-muted)]">Rehab Nigeria Electronic Health Record</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSummary(null)}
                    className="p-1.5 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background)] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6 overflow-y-auto space-y-5 text-xs">
                  {/* Doctor & Patient Info Bar */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)]">
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Patient</span>
                      <span className="font-bold text-[var(--foreground)]">{selectedSummary.patientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Doctor / Lead</span>
                      <span className="font-bold text-[var(--foreground)]">{selectedSummary.coordinatorName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Date</span>
                      <span className="font-bold text-[var(--foreground)]">{selectedSummary.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Session Type</span>
                      <span className="font-bold text-[var(--gold)]">{selectedSummary.discussionPoints}</span>
                    </div>
                  </div>

                  {/* Clinical Findings */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[var(--foreground)] text-xs uppercase tracking-wider text-[var(--gold)]">
                      1. Clinical Evaluation & Observations
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] leading-relaxed">
                      {selectedSummary.clinicalObservations}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[var(--foreground)] text-xs uppercase tracking-wider text-[var(--gold)]">
                      2. Prescribed Therapy Recommendations
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-2">
                      {selectedSummary.recommendations.map((rec, i) => (
                        <div key={i} className="flex items-start gap-2 text-[var(--foreground)]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span className="leading-snug">{rec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Prescribed Exercises & Regimen */}
                  {selectedExercises.length > 0 && (
                    <div className="space-y-1.5">
                      <h4 className="font-bold text-[var(--foreground)] text-xs uppercase tracking-wider text-[var(--gold)]">
                        3. Home Exercise Protocol
                      </h4>
                      <div className="p-3.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-1.5">
                        {selectedExercises.map((ex, i) => (
                          <div key={i} className="flex items-center gap-2 text-[var(--foreground)]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                            <span>{ex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prescribed Next Steps */}
                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[var(--foreground)] text-xs uppercase tracking-wider text-[var(--gold)]">
                      4. Next Care Milestone
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--foreground)] leading-relaxed">
                      <p className="font-medium">{selectedSummary.nextStep}</p>
                      {selectedSummary.followUpRequired && selectedSummary.followUpDate && (
                        <p className="text-[11px] text-[var(--gold)] mt-1 font-semibold">
                          Follow-up Scheduled Date: {selectedSummary.followUpDate}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-[var(--border)] bg-[var(--background-tertiary)] flex items-center justify-between">
                  <span className="text-[10px] text-[var(--foreground-subtle)]">Digitally signed by {selectedSummary.coordinatorName}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => alert('Official Consultation Summary downloaded in PDF format.')}
                      className="px-3.5 py-2 rounded-xl bg-[var(--background)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </button>
                    <button
                      onClick={() => setSelectedSummary(null)}
                      className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold"
                    >
                      Done
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
};