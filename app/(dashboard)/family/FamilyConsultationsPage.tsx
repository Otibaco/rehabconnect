"use client"
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
  HeartHandshake
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { ConsultationSummary } from '@/types/type';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const FamilyConsultationsPage: React.FC = () => {
  const { appointments, summaries } = useAuth();
  const router = useRouter();
  const [selectedSummary, setSelectedSummary] = useState<ConsultationSummary | null>(null);

  const familySummaries = summaries.filter((s) => s.patientName.includes('Okafor'));
  const allSummaries = familySummaries.length > 0 ? familySummaries : summaries;

  return (
    <DashboardShell
      title="Family Telehealth Consultations"
      description="Manage scheduled joint video sessions and review clinical consultation summaries for Chief Emmanuel Okafor."
      breadcrumbs={[
        { label: 'Family Dashboard', path: '/dashboard/family' },
        { label: 'Consultations' }
      ]}
    >
      <div className="space-y-8 max-w-6xl">
        {/* ACTION BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          <div>
            <h3 className="font-bold text-sm text-[var(--foreground)]">Schedule Caregiver & Patient Consultation</h3>
            <p className="text-xs text-[var(--foreground-muted)]">3-way video session connecting you, your loved one, and Dr. Folake Adeyemi.</p>
          </div>
          <button
            onClick={() => router.push('/patient/consultations/book')}
            className="px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-transform active:scale-95 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span>Book Family Session</span>
          </button>
        </div>

        {/* UPCOMING JOINT SESSION */}
        <div className="space-y-4">
          <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[var(--gold)]" />
            <span>Upcoming Telehealth Consultations</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 hover:border-[var(--gold)]/40 transition-colors">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src="https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80"
                    alt="Dr. Folake Adeyemi"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)]"
                  />
                  <div>
                    <h4 className="font-bold text-sm text-[var(--foreground)]">Dr. Folake Adeyemi</h4>
                    <p className="text-xs text-[var(--gold)] font-medium">Family Telehealth Review</p>
                    <p className="text-[11px] text-[var(--foreground-subtle)]">Patient: Chief Emmanuel Okafor</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Confirmed
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-[var(--foreground)] font-medium">
                  <Calendar className="w-4 h-4 text-[var(--gold)]" />
                  <span>Tomorrow</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--foreground)] font-mono">
                  <Clock className="w-4 h-4 text-[var(--gold)]" />
                  <span>02:00 PM (WAT)</span>
                </div>
              </div>

              <button
                onClick={() => router.push('/consultation/live')}
                className="w-full py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-transform active:scale-95"
              >
                <Video className="w-4 h-4 text-black" />
                <span>Join Video Room Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* CLINICAL SUMMARIES ACCESSIBLE TO FAMILY */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--gold)]" />
              <span>Doctor Consultation Summaries & Recommendations</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allSummaries.map((sum) => (
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
                      Report for {sum.patientName}
                    </h4>
                    <p className="text-[11px] text-[var(--foreground-subtle)]">Doctor: {sum.coordinatorName} • {sum.date}</p>
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
                    <span className="font-semibold text-[var(--foreground-muted)] block text-[11px]">Doctor Findings:</span>
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
                    <span>View Complete Clinical Summary</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SUMMARY MODAL */}
        <AnimatePresence>
          {selectedSummary && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
              >
                <div className="p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--background-tertiary)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--foreground)] font-cinzel">Family Consultation Summary</h3>
                      <p className="text-[10px] text-[var(--foreground-muted)]">Rehab Nigeria Electronic Health Record</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedSummary(null)}
                    className="p-1.5 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto space-y-5 text-xs">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)]">
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Patient</span>
                      <span className="font-bold text-[var(--foreground)]">{selectedSummary.patientName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Lead Doctor</span>
                      <span className="font-bold text-[var(--foreground)]">{selectedSummary.coordinatorName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Date</span>
                      <span className="font-bold text-[var(--foreground)]">{selectedSummary.date}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider block">Type</span>
                      <span className="font-bold text-[var(--gold)]">{selectedSummary.discussionPoints}</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[var(--gold)] text-xs uppercase tracking-wider">
                      Clinical Findings & Evaluation
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] leading-relaxed">
                      {selectedSummary.clinicalObservations}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[var(--gold)] text-xs uppercase tracking-wider">
                      Caregiver & Family Recommendations
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

                  <div className="space-y-1.5">
                    <h4 className="font-bold text-[var(--gold)] text-xs uppercase tracking-wider">
                      Next Step
                    </h4>
                    <div className="p-3.5 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--foreground)]">
                      <p className="font-medium">{selectedSummary.nextStep}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border-t border-[var(--border)] bg-[var(--background-tertiary)] flex items-center justify-between">
                  <button
                    onClick={() => alert('PDF summary downloaded.')}
                    className="px-3.5 py-2 rounded-xl bg-[var(--background)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <button
                    onClick={() => setSelectedSummary(null)}
                    className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
};
