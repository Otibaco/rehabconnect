import React, { useState } from 'react';
import { OnboardingLayout } from '@/components/onboarding/OnboardingLayout';
import { OnboardingStep } from '@/components/onboarding/OnboardingStep';
import { UserRole } from '@/types/dashboard';
import { AlertTriangle, CheckCircle2, ArrowRight, ShieldCheck, Lock, Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const OnboardingPage: React.FC = () => {
  const router = useRouter();

  // Role from navigation state or default to patient
  const initialRole: UserRole =
    (typeof window !== 'undefined'
      ? (window.history.state as { role?: UserRole } | null)?.role
      : undefined) || 'patient';
  const [role] = useState<UserRole>(initialRole);
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    // Patient Fields
    dob: '1994-05-18',
    gender: 'Male',
    location: 'Lagos State',
    reasonForSupport: 'Seeking private medical consultation regarding alcohol and stress management.',
    substances: ['Alcohol', 'Prescription Sedatives'],
    duration: '1 - 2 Years',
    frequency: 'Daily in evening',
    priorSupport: 'No',
    medicalHistory: 'Mild hypertension. No drug allergies.',
    emergencyContactName: 'Amina Okonkwo',
    emergencyContactPhone: '+234 802 987 6543',
    emergencyRelation: 'Spouse',
    safetyAgreed: true,

    // Family Fields
    seekingFor: 'Someone I support',
    familyRelation: 'Spouse',
    lovedOneName: 'Chinedu Okonkwo',
    lovedOneAge: '32',
    familyPrivacyAgreed: true,

    // Consultant Fields
    title: 'Consultant Psychiatrist',
    qualifications: 'MBBS, FWACP (Psychiatry)',
    regNumber: 'MDCN/R/42190',
    yearsExp: '10+',
    bio: 'Experienced psychiatrist specializing in substance use recovery and mood disorders.',
    availability: 'Mondays and Wednesdays, 2:00 PM - 6:00 PM WAT'
  });

  const totalSteps = role === 'patient' ? 6 : role === 'family' ? 4 : 4;

  const updateField = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSubstance = (sub: string) => {
    const exists = formData.substances.includes(sub);
    if (exists) {
      updateField('substances', formData.substances.filter((s) => s !== sub));
    } else {
      updateField('substances', [...formData.substances, sub]);
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    router.push('/dashboard');
  };

  // SUBMITTED SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center p-4">
        <div className="max-w-xl w-full bg-[var(--background-secondary)] border border-[var(--border)] p-8 sm:p-12 rounded-sm shadow-2xl text-center space-y-6 crosshair-corner">
          <div className="w-16 h-16 bg-[var(--green)]/20 border border-[var(--green)]/40 text-[var(--green-light)] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
              INTAKE SUBMITTED SUCCESSFULLY
            </span>
            <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
              YOUR INFORMATION HAS BEEN RECEIVED
            </h1>
            <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
              {role === 'patient' && 'Your clinical intake form has been securely encrypted and stored. You are now ready to book your private virtual consultation.'}
              {role === 'family' && 'Your family onboarding details are saved. You can now access your support workspace and request advisory sessions.'}
              {role === 'coordinator' && 'Your credentials have been submitted for verification. You can view your workspace dashboard while our clinical team verifies your credentials.'}
            </p>
          </div>

          <button
            onClick={handleComplete}
            className="w-full py-4 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-colors shadow-xl"
          >
            ENTER YOUR DASHBOARD →
          </button>
        </div>
      </div>
    );
  }

  // ==========================================
  // PATIENT ONBOARDING STEPS
  // ==========================================
  if (role === 'patient') {
    return (
      <OnboardingLayout
        currentStep={step}
        totalSteps={totalSteps}
        stepTitle={
          step === 1 ? 'ABOUT YOU' :
          step === 2 ? 'WHAT BRINGS YOU HERE?' :
          step === 3 ? 'YOUR SITUATION' :
          step === 4 ? 'HEALTH & BACKGROUND' :
          step === 5 ? 'EMERGENCY & SAFETY' : 'REVIEW YOUR INTAKE'
        }
        stepSubtitle={
          step === 1 ? 'Please confirm your basic contact and demographic details.' :
          step === 2 ? 'Tell us in your own words what you hope to address.' :
          step === 3 ? 'Specific information about substances, frequency, and prior support.' :
          step === 4 ? 'Relevant medical or mental health context for your clinician.' :
          step === 5 ? 'Safety guidelines and emergency contact information.' : 'Review all details before final submission.'
        }
        onBack={handleBack}
        roleTitle="PATIENT INTAKE"
      >
        <OnboardingStep>
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Date of Birth</label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => updateField('dob', e.target.value)}
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => updateField('gender', e.target.value)}
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Prefer not to say</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">State of Residence</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="e.g. Lagos State, FCT Abuja, Rivers State..."
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">
                  Why are you seeking support at this time?
                </label>
                <textarea
                  rows={5}
                  value={formData.reasonForSupport}
                  onChange={(e) => updateField('reasonForSupport', e.target.value)}
                  placeholder="In a few sentences, describe what you are experiencing and what outcome you are hoping for..."
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                ></textarea>
              </div>

              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[11px] text-[var(--foreground-muted)] italic">
                ✦ Respectful care note: All responses are strictly confidential between you and your assigned medical consultant.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-2">
                  What substance or substances are involved? (Select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['Alcohol', 'Codeine / Cough Syrup', 'Tramadol / Opioids', 'Cannabis / Refined Herb', 'Prescription Sedatives', 'Cocaine / Stimulants', 'Nicotine / Vapes', 'Other'].map((sub) => {
                    const selected = formData.substances.includes(sub);
                    return (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleSubstance(sub)}
                        className={`p-2.5 rounded-sm border text-left font-mono text-[11px] transition-all ${
                          selected
                            ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold-light)] font-bold'
                            : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-muted)]'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '} {sub}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">How long has this been a concern?</label>
                  <select
                    value={formData.duration}
                    onChange={(e) => updateField('duration', e.target.value)}
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  >
                    <option>&lt; 6 Months</option>
                    <option>6 - 12 Months</option>
                    <option>1 - 2 Years</option>
                    <option>&gt; 2 Years</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Frequency of Occurrence</label>
                  <select
                    value={formData.frequency}
                    onChange={(e) => updateField('frequency', e.target.value)}
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  >
                    <option>Occasional / Weekend</option>
                    <option>Multiple times weekly</option>
                    <option>Daily in evening</option>
                    <option>Continuous throughout day</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div>
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">
                  Relevant Medical / Mental Health History
                </label>
                <textarea
                  rows={4}
                  value={formData.medicalHistory}
                  onChange={(e) => updateField('medicalHistory', e.target.value)}
                  placeholder="Note any existing medical diagnoses, prescriptions, allergies, or prior therapy..."
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                ></textarea>
              </div>

              <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[11px] text-[var(--foreground-muted)]">
                <span className="font-bold text-[var(--gold)] block mb-0.5 font-mono">WHY WE REQUEST THIS INFORMATION:</span>
                Medical history enables your consultant doctor to identify potential physiological interactions or risk factors before recommending recovery pathways.
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-4">
              
              {/* CRITICAL EMERGENCY NOTICE */}
              <div className="p-4 bg-[var(--accent-terracotta)]/15 border border-[var(--accent-terracotta)]/40 rounded-sm space-y-2">
                <div className="flex items-center gap-2 text-[var(--accent-terracotta)] font-mono font-bold text-xs">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>EMERGENCY DISCLAIMER</span>
                </div>
                <p className="text-[11px] text-[var(--foreground)] leading-relaxed">
                  <strong>Rehab Nigeria is a digital outpatient consultation service and NOT an emergency response facility.</strong> If you or someone you know is in immediate life-threatening physical danger, experiencing acute overdose, loss of consciousness, or violent psychosis, please proceed immediately to the nearest physical hospital emergency room.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Emergency Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContactName}
                    onChange={(e) => updateField('emergencyContactName', e.target.value)}
                    placeholder="e.g. Amina Okonkwo"
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  />
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Emergency Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyContactPhone}
                    onChange={(e) => updateField('emergencyContactPhone', e.target.value)}
                    placeholder="+234 800 000 0000"
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  />
                </div>
              </div>

              <div>
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Relationship to You</label>
                <input
                  type="text"
                  value={formData.emergencyRelation}
                  onChange={(e) => updateField('emergencyRelation', e.target.value)}
                  placeholder="e.g. Spouse, Sibling, Parent..."
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[var(--foreground-muted)]">
                  <input
                    type="checkbox"
                    checked={formData.safetyAgreed}
                    onChange={(e) => updateField('safetyAgreed', e.target.checked)}
                    className="mt-0.5 rounded-sm border-[var(--border-subtle)] text-[var(--gold)] focus:ring-0 bg-[var(--background-tertiary)]"
                  />
                  <span>I acknowledge that Rehab Nigeria is an outpatient service and agree to these safety guidelines.</span>
                </label>
              </div>

            </div>
          )}

          {step === 6 && (
            <div className="space-y-4">
              <div className="p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-3">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-mono text-[11px]">
                  <span className="font-bold text-[var(--gold)]">INTAKE SUMMARY</span>
                  <button onClick={() => setStep(1)} className="text-[var(--foreground-subtle)] hover:text-[var(--gold)] flex items-center gap-1">
                    <Edit3 className="w-3 h-3" /> Edit
                  </button>
                </div>

                <div className="space-y-2 text-[11px] text-[var(--foreground)] font-mono">
                  <div><span className="text-[var(--foreground-subtle)]">DOB / Gender:</span> {formData.dob} ({formData.gender})</div>
                  <div><span className="text-[var(--foreground-subtle)]">State:</span> {formData.location}</div>
                  <div><span className="text-[var(--foreground-subtle)]">Reason:</span> {formData.reasonForSupport}</div>
                  <div><span className="text-[var(--foreground-subtle)]">Substances:</span> {formData.substances.join(', ')}</div>
                  <div><span className="text-[var(--foreground-subtle)]">Duration & Frequency:</span> {formData.duration} ({formData.frequency})</div>
                  <div><span className="text-[var(--foreground-subtle)]">Emergency Contact:</span> {formData.emergencyContactName} ({formData.emergencyRelation} - {formData.emergencyContactPhone})</div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] font-mono text-xs font-bold rounded-sm"
              >
                PREVIOUS
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm transition-all shadow-xl flex items-center gap-2"
            >
              <span>{step === totalSteps ? 'SUBMIT INTAKE' : 'CONTINUE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </OnboardingStep>
      </OnboardingLayout>
    );
  }

  // ==========================================
  // FAMILY MEMBER ONBOARDING STEPS
  // ==========================================
  if (role === 'family') {
    return (
      <OnboardingLayout
        currentStep={step}
        totalSteps={totalSteps}
        stepTitle={
          step === 1 ? 'SUPPORT RECIPIENT' :
          step === 2 ? 'YOUR CAREGIVER DETAILS' :
          step === 3 ? 'PRIVACY & CONSENT BOUNDARY' : 'REVIEW FAMILY INTAKE'
        }
        stepSubtitle={
          step === 1 ? 'Indicate who you are seeking guidance for.' :
          step === 2 ? 'Tell us about your relationship and observations.' :
          step === 3 ? 'Important ethical boundaries regarding patient confidentiality.' : 'Review details before proceeding.'
        }
        onBack={handleBack}
        roleTitle="FAMILY ADVOCACY INTAKE"
      >
        <OnboardingStep>
          {step === 1 && (
            <div className="space-y-4">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block">
                I am seeking support for:
              </label>
              <div className="grid grid-cols-2 gap-3 font-sans">
                <button
                  type="button"
                  onClick={() => updateField('seekingFor', 'Myself')}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.seekingFor === 'Myself'
                      ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold-light)] font-bold'
                      : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-muted)]'
                  }`}
                >
                  <div className="text-sm font-bold">MYSELF</div>
                  <div className="text-[11px] opacity-75">I am looking for direct personal consultation</div>
                </button>

                <button
                  type="button"
                  onClick={() => updateField('seekingFor', 'Someone I support')}
                  className={`p-4 rounded-sm border text-left transition-all ${
                    formData.seekingFor === 'Someone I support'
                      ? 'bg-[var(--gold)]/10 border-[var(--gold)] text-[var(--gold-light)] font-bold'
                      : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground-muted)]'
                  }`}
                >
                  <div className="text-sm font-bold">SOMEONE I SUPPORT</div>
                  <div className="text-[11px] opacity-75">A relative, spouse, child, or family member</div>
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Your Relationship</label>
                  <select
                    value={formData.familyRelation}
                    onChange={(e) => updateField('familyRelation', e.target.value)}
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  >
                    <option>Spouse</option>
                    <option>Parent</option>
                    <option>Sibling</option>
                    <option>Child</option>
                    <option>Guardian / Relative</option>
                  </select>
                </div>

                <div>
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Loved One's Name (Optional)</label>
                  <input
                    type="text"
                    value={formData.lovedOneName}
                    onChange={(e) => updateField('lovedOneName', e.target.value)}
                    placeholder="e.g. Chinedu"
                    className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div className="p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-2 text-[11px] text-[var(--foreground-muted)] leading-relaxed">
                <span className="font-mono text-xs text-[var(--gold)] font-bold block uppercase">
                  ✦ PRIVACY & CONSENT BOUNDARY
                </span>
                <p>
                  At Rehab Nigeria, family members can book Family Advisory Consultations to learn effective communication strategies and guidance. However, <strong>direct patient medical consultations remain strictly private</strong> between the patient and their clinician unless explicit consent is granted by the patient.
                </p>
              </div>

              <label className="flex items-start gap-2 cursor-pointer text-[11px] text-[var(--foreground-muted)] pt-2">
                <input
                  type="checkbox"
                  checked={formData.familyPrivacyAgreed}
                  onChange={(e) => updateField('familyPrivacyAgreed', e.target.checked)}
                  className="mt-0.5 rounded-sm border-[var(--border-subtle)] text-[var(--gold)] focus:ring-0 bg-[var(--background-tertiary)]"
                />
                <span>I understand and respect these medical consent boundaries.</span>
              </label>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-2 text-[11px] font-mono">
                <div className="font-bold text-[var(--gold)]">FAMILY INTAKE SUMMARY</div>
                <div><span className="text-[var(--foreground-subtle)]">Seeking for:</span> {formData.seekingFor}</div>
                <div><span className="text-[var(--foreground-subtle)]">Relationship:</span> {formData.familyRelation}</div>
                <div><span className="text-[var(--foreground-subtle)]">Loved One:</span> {formData.lovedOneName}</div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="px-5 py-2.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] font-mono text-xs font-bold rounded-sm"
              >
                PREVIOUS
              </button>
            ) : <div />}

            <button
              type="button"
              onClick={handleNext}
              className="px-7 py-3 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm transition-all shadow-xl flex items-center gap-2"
            >
              <span>{step === totalSteps ? 'SUBMIT FAMILY INTAKE' : 'CONTINUE'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </OnboardingStep>
      </OnboardingLayout>
    );
  }

  // ==========================================
  // CARE COORDINATOR / CONSULTANT ONBOARDING STEPS
  // ==========================================
  return (
    <OnboardingLayout
      currentStep={step}
      totalSteps={totalSteps}
      stepTitle={
        step === 1 ? 'PROFESSIONAL TITLE & QUALIFICATIONS' :
        step === 2 ? 'SPECIALIZATION & REGISTRATION' :
        step === 3 ? 'BIO & AVAILABILITY' : 'VERIFICATION REVIEW TERMS'
      }
      stepSubtitle={
        step === 1 ? 'Provide your medical or clinical credentials.' :
        step === 2 ? 'Medical council registration details.' :
        step === 3 ? 'Your public consultant bio and consultation hours.' : 'Terms of professional engagement.'
      }
      onBack={handleBack}
      roleTitle="CONSULTANT ONBOARDING"
    >
      <OnboardingStep>
        {step === 1 && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Professional Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  placeholder="e.g. Consultant Psychiatrist"
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                />
              </div>

              <div>
                <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Qualifications</label>
                <input
                  type="text"
                  value={formData.qualifications}
                  onChange={(e) => updateField('qualifications', e.target.value)}
                  placeholder="e.g. MBBS, FWACP, M.Sc."
                  className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">
                Medical Council / Association Reg Number (e.g. MDCN/R/XXXXX)
              </label>
              <input
                type="text"
                value={formData.regNumber}
                onChange={(e) => updateField('regNumber', e.target.value)}
                placeholder="e.g. MDCN/R/42190"
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)] font-mono"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Consultant Bio</label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                placeholder="Brief summary of clinical experience..."
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
              ></textarea>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 font-mono text-[11px] text-[var(--foreground-muted)]">
            <div className="p-4 bg-[var(--background-tertiary)] border border-[var(--gold)]/40 rounded-sm space-y-2">
              <span className="font-bold text-[var(--gold)] block">VERIFICATION NOTICE</span>
              <p>Your account will remain in "Under Review" status until your medical credentials are verified by our clinical governance board.</p>
            </div>
          </div>
        )}

        <div className="pt-4 border-t border-[var(--border-subtle)] flex items-center justify-between">
          {step > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-2.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] font-mono text-xs font-bold rounded-sm"
            >
              PREVIOUS
            </button>
          ) : <div />}

          <button
            type="button"
            onClick={handleNext}
            className="px-7 py-3 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm transition-all shadow-xl flex items-center gap-2"
          >
            <span>{step === totalSteps ? 'SUBMIT FOR VERIFICATION' : 'CONTINUE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </OnboardingStep>
    </OnboardingLayout>
  );
};
