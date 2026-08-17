import React, { useState } from 'react';

import {
  ClipboardList,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  ArrowLeft,
  FileText,
  Lock,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const PatientAssessmentPage: React.FC = () => {
  const router = useRouter();
  const { submitAssessment } = useAuth();

  const [step, setStep] = useState(1); // 1-8
  const [submitted, setSubmitted] = useState(false);

  // Form Fields
  const [supportCategory, setSupportCategory] = useState('Physical Rehabilitation');
  const [primaryCondition, setPrimaryCondition] = useState('Post-Surgical Joint Reconstruction');
  const [onsetDuration, setOnsetDuration] = useState('1-3 months');
  const [previousTreatments, setPreviousTreatments] = useState<string[]>(['Outpatient Physical Therapy']);
  const [mobilityLevel, setMobilityLevel] = useState('Requires crutches or cane');
  const [rehabGoals, setRehabGoals] = useState<string[]>(['Pain Reduction', 'Restore Walking Mobility']);
  const [preferredLocation, setPreferredLocation] = useState('Lagos Island / Lekki');
  const [budgetOrInsurance, setBudgetOrInsurance] = useState('Private Health Insurance');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const handleToggleTreatment = (t: string) => {
    setPreviousTreatments((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const handleToggleGoal = (g: string) => {
    setRehabGoals((prev) =>
      prev.includes(g) ? prev.filter((item) => item !== g) : [...prev, g]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAssessment({
      supportCategory,
      primaryCondition,
      onsetDuration,
      previousTreatments,
      mobilityLevel,
      rehabGoals,
      preferredLocation,
      budgetOrInsurance,
      additionalNotes,
    });
    setSubmitted(true);
  };

  return (
    <DashboardShell
      title="Clinical Rehabilitation Intake"
      description="Provide clinical background so our accredited Care Leads can match and recommend the ideal rehabilitation sanctuaries across Nigeria."
      breadcrumbs={[{ label: 'Healthcare Portal', path: '/patient/dashboard' }, { label: 'Clinical Assessment' }]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Confidentiality Notice */}
        <div className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-xs text-[var(--foreground-muted)] flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-[var(--gold)] shrink-0" />
          <span>
            Your clinical data is strictly confidential and protected by national medical privacy standards. It is reviewed exclusively by licensed Rehab Nigeria Care Leads.
          </span>
        </div>

        {!submitted ? (
          <div className="p-6 sm:p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 shadow-xl">
            {/* Step Header */}
            <div className="flex justify-between items-center pb-4 border-b border-[var(--border)]">
              <div className="space-y-1">
                <span className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider font-cinzel">
                  SECTION {step} OF 8
                </span>
                <h2 className="font-cinzel font-bold text-lg sm:text-xl text-[var(--foreground)]">
                  {step === 1 && '1. Primary Rehabilitation Focus'}
                  {step === 2 && '2. Support Specialty & Condition'}
                  {step === 3 && '3. Onset & Clinical Duration'}
                  {step === 4 && '4. Previous Treatment History'}
                  {step === 5 && '5. Mobility & Daily Functioning'}
                  {step === 6 && '6. Recovery Goals'}
                  {step === 7 && '7. Facility Location & Insurance'}
                  {step === 8 && '8. Review & Confirm Submission'}
                </h2>
              </div>
              <div className="w-28 bg-[var(--background-tertiary)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
                <div
                  className="bg-[var(--gold)] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 8) * 100}%` }}
                />
              </div>
            </div>

            {/* STEP 1: Focus */}
            {step === 1 && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[var(--foreground-muted)]">
                  Select the primary rehabilitation category required:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    'Substance Use & Addiction Recovery',
                    'Physical & Orthopedic Rehabilitation',
                    'Neurological & Post-Stroke Care',
                    'Mental Health & Psychological Therapy',
                    'Post-Surgical Trauma Rehabilitation',
                    'Geriatric & Mobility Care',
                  ].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSupportCategory(cat)}
                      className={`p-4 rounded-2xl border text-left font-semibold transition-all ${
                        supportCategory === cat
                          ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] shadow-md shadow-[var(--gold)]/10'
                          : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)] hover:border-[var(--gold)]/50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 2: Primary Condition */}
            {step === 2 && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[var(--foreground-muted)]">
                  Describe the primary condition or diagnosis:
                </label>
                <input
                  type="text"
                  value={primaryCondition}
                  onChange={(e) => setPrimaryCondition(e.target.value)}
                  placeholder="e.g. Post-Knee Reconstruction, Stroke Hemiparesis, Alcohol Dependency"
                  className="w-full p-3.5 rounded-2xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                />
              </div>
            )}

            {/* STEP 3: Onset Duration */}
            {step === 3 && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[var(--foreground-muted)]">
                  How long has this condition or symptom set persisted?
                </label>
                <div className="space-y-2 text-xs">
                  {['Less than 1 month', '1-3 months', '3-6 months', '6-12 months', 'More than 1 year'].map((d) => (
                    <label
                      key={d}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        onsetDuration === d
                          ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-bold'
                          : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="duration"
                        checked={onsetDuration === d}
                        onChange={() => setOnsetDuration(d)}
                        className="accent-[var(--gold)]"
                      />
                      <span>{d}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 4: Previous Treatments */}
            {step === 4 && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[var(--foreground-muted)]">
                  Select previous medical interventions undergone (check all that apply):
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    'Outpatient Physical Therapy',
                    'Inpatient Hospital Care',
                    'Medication & Pain Management',
                    'Psychological Counseling',
                    'Detoxification Services',
                    'Home Care Nursing',
                    'None / First Time Seeking Treatment',
                  ].map((t) => {
                    const checked = previousTreatments.includes(t);
                    return (
                      <label
                        key={t}
                        className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          checked
                            ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-bold'
                            : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleToggleTreatment(t)}
                          className="accent-[var(--gold)]"
                        />
                        <span>{t}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 5: Mobility */}
            {step === 5 && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[var(--foreground-muted)]">
                  Current mobility or functional assistance required:
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    'Fully independent mobility',
                    'Requires crutches, walker, or cane',
                    'Requires wheelchair assistance',
                    'Bedridden / Continuous nursing assistance needed',
                  ].map((m) => (
                    <label
                      key={m}
                      className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        mobilityLevel === m
                          ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-bold'
                          : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="mobility"
                        checked={mobilityLevel === m}
                        onChange={() => setMobilityLevel(m)}
                        className="accent-[var(--gold)]"
                      />
                      <span>{m}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 6: Goals */}
            {step === 6 && (
              <div className="space-y-4">
                <label className="text-xs font-semibold text-[var(--foreground-muted)]">
                  Key recovery milestones desired:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {[
                    'Pain Reduction',
                    'Restore Walking Mobility',
                    'Long-term Sobriety',
                    'Emotional & Anxiety Stabilization',
                    'Post-Stroke Speech Improvement',
                    'Independent Living Skills',
                  ].map((g) => {
                    const checked = rehabGoals.includes(g);
                    return (
                      <label
                        key={g}
                        className={`flex items-center gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                          checked
                            ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)] font-bold'
                            : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground)]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => handleToggleGoal(g)}
                          className="accent-[var(--gold)]"
                        />
                        <span>{g}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 7: Location & Insurance */}
            {step === 7 && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--foreground-muted)]">
                    Preferred Location / State
                  </label>
                  <input
                    type="text"
                    value={preferredLocation}
                    onChange={(e) => setPreferredLocation(e.target.value)}
                    placeholder="e.g. Lagos Island, Victoria Island, Ikeja GRA, Abuja"
                    className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--foreground-muted)]">
                    Payment / Health Insurance Provider
                  </label>
                  <select
                    value={budgetOrInsurance}
                    onChange={(e) => setBudgetOrInsurance(e.target.value)}
                    className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                  >
                    <option className="bg-[var(--background-secondary)] text-[var(--foreground)]">Private Health Insurance</option>
                    <option className="bg-[var(--background-secondary)] text-[var(--foreground)]">Out-of-Pocket / Self Funded</option>
                    <option className="bg-[var(--background-secondary)] text-[var(--foreground)]">Corporate Health Coverage</option>
                    <option className="bg-[var(--background-secondary)] text-[var(--foreground)]">Family Sponsorship</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[var(--foreground-muted)]">
                    Additional Clinical Notes (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    placeholder="Mention any allergies, previous hospital stays, or specialized requirements..."
                    className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                  />
                </div>
              </div>
            )}

            {/* STEP 8: REVIEW & SUBMIT */}
            {step === 8 && (
              <div className="space-y-5 text-xs">
                <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-3">
                  <h3 className="font-cinzel font-bold text-sm text-[var(--foreground)] border-b border-[var(--border)] pb-2">
                    Review Clinical Assessment Summary
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-[var(--foreground)]">
                    <div>
                      <span className="text-[var(--foreground-subtle)] block text-[10px] uppercase font-bold">Category</span>
                      <span className="font-semibold">{supportCategory}</span>
                    </div>
                    <div>
                      <span className="text-[var(--foreground-subtle)] block text-[10px] uppercase font-bold">Condition</span>
                      <span className="font-semibold">{primaryCondition}</span>
                    </div>
                    <div>
                      <span className="text-[var(--foreground-subtle)] block text-[10px] uppercase font-bold">Onset</span>
                      <span className="font-semibold">{onsetDuration}</span>
                    </div>
                    <div>
                      <span className="text-[var(--foreground-subtle)] block text-[10px] uppercase font-bold">Mobility</span>
                      <span className="font-semibold">{mobilityLevel}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  className="w-full py-3.5 rounded-2xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-sm shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Submit Clinical Assessment</span>
                </button>
              </div>
            )}

            {/* Navigation Buttons */}
            {step < 8 && (
              <div className="flex justify-between items-center pt-4 border-t border-[var(--border)]">
                <button
                  type="button"
                  disabled={step === 1}
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] disabled:opacity-30 flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous Section
                </button>
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            )}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[var(--green)]/20 text-[var(--green)] flex items-center justify-center mx-auto shadow-md border border-[var(--green)]/30">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h2 className="font-cinzel font-bold text-2xl text-[var(--foreground)]">
              Assessment Submitted Successfully
            </h2>
            <p className="text-xs text-[var(--foreground-muted)] leading-relaxed max-w-md mx-auto">
              Your clinical profile has been securely received by the Rehab Nigeria medical coordination team. A licensed Care Lead will review your records before your scheduled session.
            </p>
            <button
              onClick={() => router.push('/patient/dashboard')}
              className="px-6 py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 transition-all hover:scale-105"
            >
              Return to Patient Portal
            </button>
          </motion.div>
        )}
      </div>
    </DashboardShell>
  );
};
