"use client"
import React, { useState } from 'react';
import {
  Calendar,
  Video,
  Clock,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Plus,
  X,
  Stethoscope,
  ChevronRight,
  ShieldCheck,
  Activity,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Appointment } from '@/types/type';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const CoordinatorConsultationsPage: React.FC = () => {
  const { appointments, summaries, saveConsultationSummaryAndComplete, coordinatorPatients } = useAuth();
  const router = useRouter();

  const [activeModalAppt, setActiveModalAppt] = useState<Appointment | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form State for Post-Consultation Summary
  const [patientName, setPatientName] = useState('Sarah Jenkins');
  const [consultationType, setConsultationType] = useState('HD Video Tele-Rehab');
  const [clinicalFindings, setClinicalFindings] = useState(
    'Patient demonstrates improved 90° knee flexion with minimal quadriceps guarding. Mild lateral tightness noted during weight bearing.'
  );
  const [recommendations, setRecommendations] = useState<string[]>([
    'Progress to active quad strengthening drills (3x daily)',
    'Apply cryotherapy protocol post-exercise for 15 minutes',
    'Begin light gait training with single-point cane'
  ]);
  const [newRecInput, setNewRecInput] = useState('');
  const [prescribedExercises, setPrescribedExercises] = useState<string[]>([
    'Seated Quad Extensions (3 sets of 10)',
    'Standing Heel-to-Toe Balance Drills (5 mins)'
  ]);
  const [newExInput, setNewExInput] = useState('');
  const [journeyStage, setJourneyStage] = useState<number>(3);
  const [nextStep, setNextStep] = useState('Transition to independent home exercise regimen and schedule 14-day review.');
  const [followUpRequired, setFollowUpRequired] = useState(true);
  const [followUpDate, setFollowUpDate] = useState('In 14 days');

  const handleOpenSummaryModal = (apt: Appointment) => {
    setActiveModalAppt(apt);
    setPatientName(apt.patientName || 'Sarah Jenkins');
    setConsultationType(apt.type || 'HD Video Tele-Rehab');
  };

  const handleAddRec = () => {
    if (newRecInput.trim()) {
      setRecommendations([...recommendations, newRecInput.trim()]);
      setNewRecInput('');
    }
  };

  const handleRemoveRec = (idx: number) => {
    setRecommendations(recommendations.filter((_, i) => i !== idx));
  };

  const handleAddEx = () => {
    if (newExInput.trim()) {
      setPrescribedExercises([...prescribedExercises, newExInput.trim()]);
      setNewExInput('');
    }
  };

  const handleRemoveEx = (idx: number) => {
    setPrescribedExercises(prescribedExercises.filter((_, i) => i !== idx));
  };

  const handleSubmitSummary = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeModalAppt) return;

    saveConsultationSummaryAndComplete({
      appointmentId: activeModalAppt.id,
      patientId: activeModalAppt.id.includes('2') ? 'usr_patient_2' : 'usr_patient_1',
      patientName: patientName,
      coordinatorName: 'Dr. Folake Adeyemi',
      date: 'Today, ' + new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: followUpRequired ? 'followup_required' : 'completed',
      mainConcerns: consultationType,
      findingsAndAssessment: clinicalFindings,
      recommendations: recommendations,
      nextStep: nextStep,
      clientFacingSummary: `${consultationType}: ${clinicalFindings}`,
      journeyStageUpdatedTo: journeyStage,
      followUpRequired: followUpRequired,
      followUpDate: followUpRequired ? followUpDate : undefined,
      discussionPoints: [consultationType, clinicalFindings],
      recommendedResources: prescribedExercises,
      recommendedFacilities: [],
    });

    setActiveModalAppt(null);
    setSuccessToast(`Consultation summary successfully saved! Care Journey updated to Stage 0${journeyStage} and follow-up scheduled.`);
    setTimeout(() => setSuccessToast(null), 5000);
  };

  return (
    <DashboardShell
      title="Telehealth Consultations & EHR Summaries"
      description="Conduct live video appointments and complete 1-click clinical consultation summaries with synchronized care journey updates."
      breadcrumbs={[
        { label: 'Doctor Suite', path: '/dashboard/coordinator' },
        { label: 'Consultations' }
      ]}
    >
      <div className="space-y-8 max-w-6xl">
        {/* SUCCESS NOTIFICATION TOAST */}
        <AnimatePresence>
          {successToast && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="font-semibold">{successToast}</span>
              </div>
              <button onClick={() => setSuccessToast(null)} className="hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ACTIVE & UPCOMING SESSIONS */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] flex items-center gap-2">
              <Video className="w-4 h-4 text-[var(--gold)]" />
              <span>Upcoming & Scheduled Consultations</span>
            </h3>
            <span className="text-xs text-[var(--foreground-muted)]">Live Video Queue</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {appointments.map((apt) => {
              const isDone = apt.status === 'completed';
              return (
                <div
                  key={apt.id}
                  className={`p-5 rounded-2xl border space-y-4 transition-all ${
                    isDone
                      ? 'bg-[var(--background-secondary)]/50 border-[var(--border-subtle)] opacity-75'
                      : 'bg-[var(--background-secondary)] border-[var(--border)] hover:border-[var(--gold)]/50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          apt.patientName?.includes('David') || apt.patientName?.includes('Okafor')
                            ? 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
                            : 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                        }
                        alt={apt.patientName}
                        className="w-12 h-12 rounded-full object-cover border-2 border-[var(--gold)]"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-[var(--foreground)]">{apt.patientName || 'Sarah Jenkins'}</h4>
                        <span className="text-xs text-[var(--gold)] font-medium block">{apt.type}</span>
                        <p className="text-[11px] text-[var(--foreground-muted)]">{apt.date} • {apt.timeSlot}</p>
                      </div>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                        isDone
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : 'bg-[var(--gold)]/10 text-[var(--gold)] border-[var(--gold)]/30 animate-pulse'
                      }`}
                    >
                      {isDone ? 'Completed' : 'Scheduled'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]">
                    {!isDone ? (
                      <>
                        <button
                          onClick={() => router.push('/consultation/live')}
                          className="flex-1 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-transform active:scale-95"
                        >
                          <Video className="w-4 h-4 text-black" />
                          <span>Join Video Room</span>
                        </button>
                        <button
                          onClick={() => handleOpenSummaryModal(apt)}
                          className="px-4 py-2.5 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors flex items-center gap-1.5 whitespace-nowrap"
                        >
                          <FileText className="w-3.5 h-3.5 text-[var(--gold)]" />
                          <span>Complete & Write Summary</span>
                        </button>
                      </>
                    ) : (
                      <div className="w-full flex items-center justify-between text-xs text-[var(--foreground-muted)]">
                        <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Summary Published & Synced
                        </span>
                        <button
                          onClick={() => handleOpenSummaryModal(apt)}
                          className="text-[var(--gold)] hover:underline font-semibold"
                        >
                          Edit Summary
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* PREVIOUSLY PUBLISHED SUMMARIES */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-base font-bold text-[var(--foreground)] flex items-center gap-2">
              <FileText className="w-4 h-4 text-[var(--gold)]" />
              <span>Published Consultation Summaries ({summaries.length})</span>
            </h3>
            <span className="text-xs text-[var(--foreground-muted)]">Electronic Health Records</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {summaries.map((sum) => (
              <div
                key={sum.id}
                className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                      {sum.mainConcerns}
                    </span>
                    <h4 className="font-bold text-sm text-[var(--foreground)] mt-1">
                      {sum.patientName}
                    </h4>
                    <p className="text-[11px] text-[var(--foreground-subtle)]">{sum.date}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    EHR Synced
                  </span>
                </div>

                <p className="text-xs text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
                  "{sum.findingsAndAssessment || sum.clientFacingSummary || 'No clinical findings recorded.'}"
                </p>

                <div className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-xs">
                  <span className="text-[11px] font-bold text-[var(--gold)] block">Prescribed Next Step:</span>
                  <span className="text-[var(--foreground)]">{sum.nextStep}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 1-CLICK POST-CONSULTATION SUMMARY BUILDER MODAL */}
        <AnimatePresence>
          {activeModalAppt && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden my-auto"
              >
                {/* Modal Header */}
                <div className="p-5 border-b border-[var(--border)] flex items-center justify-between bg-[var(--background-tertiary)]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center">
                      <Stethoscope className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[var(--foreground)] font-cinzel">Complete Consultation Summary</h3>
                      <p className="text-[10px] text-[var(--foreground-muted)]">
                        Submitting will automatically mark session completed, update the patient's Care Journey, and schedule follow-up.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveModalAppt(null)}
                    className="p-1.5 rounded-lg text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Modal Form Body */}
                <form onSubmit={handleSubmitSummary} className="p-6 overflow-y-auto space-y-5 text-xs">
                  {/* Patient & Session Quick Bar */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3.5 rounded-xl bg-[var(--background)] border border-[var(--border-subtle)]">
                    <div>
                      <label className="text-[10px] font-bold text-[var(--foreground-subtle)] uppercase">Patient Name</label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        className="w-full mt-1 bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs text-[var(--foreground)] font-semibold"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-[var(--foreground-subtle)] uppercase">Session Format</label>
                      <input
                        type="text"
                        value={consultationType}
                        onChange={(e) => setConsultationType(e.target.value)}
                        className="w-full mt-1 bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg px-3 py-1.5 text-xs text-[var(--foreground)] font-semibold"
                        required
                      />
                    </div>
                  </div>

                  {/* 1. Clinical Findings */}
                  <div className="space-y-1.5">
                    <label className="font-bold text-xs text-[var(--gold)] uppercase tracking-wider block">
                      1. Clinical Evaluation & Key Findings
                    </label>
                    <textarea
                      rows={3}
                      value={clinicalFindings}
                      onChange={(e) => setClinicalFindings(e.target.value)}
                      placeholder="Document motor assessment, joint range of motion, pain score, or neurological response..."
                      className="w-full bg-[var(--background-tertiary)] border border-[var(--border)] rounded-xl p-3 text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)] leading-relaxed"
                      required
                    />
                  </div>

                  {/* 2. Prescribed Recommendations */}
                  <div className="space-y-2">
                    <label className="font-bold text-xs text-[var(--gold)] uppercase tracking-wider block">
                      2. Clinical Recommendations & Therapy Adjustments
                    </label>
                    <div className="space-y-1.5">
                      {recommendations.map((rec, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                          <span className="text-[var(--foreground)]">{rec}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveRec(idx)}
                            className="text-[var(--foreground-subtle)] hover:text-rose-400 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newRecInput}
                        onChange={(e) => setNewRecInput(e.target.value)}
                        placeholder="Add specific recommendation..."
                        className="flex-1 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--foreground)]"
                      />
                      <button
                        type="button"
                        onClick={handleAddRec}
                        className="px-3 py-2 rounded-lg bg-[var(--background)] hover:bg-[var(--border)] border border-[var(--border)] text-xs text-[var(--foreground)] font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* 3. Prescribed Home Exercises */}
                  <div className="space-y-2">
                    <label className="font-bold text-xs text-[var(--gold)] uppercase tracking-wider block">
                      3. Prescribed Home Exercises
                    </label>
                    <div className="space-y-1.5">
                      {prescribedExercises.map((ex, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                          <span className="text-[var(--foreground)]">{ex}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveEx(idx)}
                            className="text-[var(--foreground-subtle)] hover:text-rose-400 p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newExInput}
                        onChange={(e) => setNewExInput(e.target.value)}
                        placeholder="Add exercise regimen..."
                        className="flex-1 bg-[var(--background-tertiary)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--foreground)]"
                      />
                      <button
                        type="button"
                        onClick={handleAddEx}
                        className="px-3 py-2 rounded-lg bg-[var(--background)] hover:bg-[var(--border)] border border-[var(--border)] text-xs text-[var(--foreground)] font-semibold"
                      >
                        Add
                      </button>
                    </div>
                  </div>

                  {/* 4. Care Journey Stage Update (One-click sync) */}
                  <div className="p-4 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/30 space-y-3">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[var(--gold)]" />
                      <label className="font-bold text-xs text-[var(--gold)] uppercase tracking-wider">
                        4. Advance Patient Care Journey
                      </label>
                    </div>
                    <p className="text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                      Select new stage to automatically advance the patient or family care roadmap:
                    </p>
                    <select
                      value={journeyStage}
                      onChange={(e) => setJourneyStage(Number(e.target.value))}
                      className="w-full bg-[var(--background-secondary)] border border-[var(--gold)]/40 rounded-xl px-3 py-2.5 text-xs text-[var(--foreground)] font-bold focus:outline-none"
                    >
                      <option value={1}>Stage 01 — Initial Clinical Assessment & Intake</option>
                      <option value={2}>Stage 02 — Comprehensive Assessment & Diagnostic Review</option>
                      <option value={3}>Stage 03 — Recovery Planning & Targeted Home Protocol</option>
                      <option value={4}>Stage 04 — Active Rehabilitation & Milestone Check</option>
                      <option value={5}>Stage 05 — Long-term Maintenance & Graduated Discharge</option>
                    </select>

                    <div>
                      <label className="text-[10px] font-bold text-[var(--foreground-subtle)] uppercase block mb-1">
                        Prescribed Next Step / Milestone Directive
                      </label>
                      <input
                        type="text"
                        value={nextStep}
                        onChange={(e) => setNextStep(e.target.value)}
                        className="w-full bg-[var(--background-secondary)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--foreground)]"
                        required
                      />
                    </div>
                  </div>

                  {/* 5. Automatic Follow-Up Scheduler */}
                  <div className="p-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[var(--gold)]" />
                        <label className="font-bold text-xs text-[var(--foreground)]">Schedule Automatic Follow-Up Task</label>
                      </div>
                      <input
                        type="checkbox"
                        checked={followUpRequired}
                        onChange={(e) => setFollowUpRequired(e.target.checked)}
                        className="w-4 h-4 accent-[var(--gold)] cursor-pointer"
                      />
                    </div>

                    {followUpRequired && (
                      <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
                        <label className="text-[10px] font-bold text-[var(--foreground-subtle)] uppercase block">
                          Follow-up Date / Timeline
                        </label>
                        <input
                          type="text"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                          placeholder="e.g. In 7 days, In 14 days, Next Monday"
                          className="w-full bg-[var(--background)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs text-[var(--foreground)]"
                        />
                      </div>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3 border-t border-[var(--border)] flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModalAppt(null)}
                      className="px-4 py-2.5 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95"
                    >
                      <CheckCircle2 className="w-4 h-4 text-black" />
                      <span>Save & Complete Everything in 1-Click</span>
                    </button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </DashboardShell>
  );
};
