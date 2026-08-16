"use client"
import React, { useState, useEffect } from 'react';

import {
  User,
  Users,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Mail,
  Lock,
  Sparkles,
  ShieldCheck,
  RefreshCw,
  Clock,
  MapPin,
  ClipboardList,
  Activity,
  KeyRound
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { OnboardingTarget } from '@/types/type';
import { AuthLayout } from '@/components/auth/AuthLayout';

export const SignUpOnboardingPage: React.FC = () => {
  const router = useRouter();
  const { switchRole, setOnboardingData, updateAssessmentProgress } = useAuth();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1); // 1: Target, 2: Clinical Details, 3: Account Credentials, 4: OTP Verification, 5: Complete & Progress Choice
  const [target, setTarget] = useState<OnboardingTarget>('myself');
  const [relationship, setRelationship] = useState('Parent');
  const [supportType, setSupportType] = useState('Neurological Rehabilitation (Stroke / TBI)');
  const [currentSituation, setCurrentSituation] = useState('Actively seeking residential or outpatient care');
  const [urgency, setUrgency] = useState('Immediate (Next 24-48 Hours)');
  const [locationPreference, setLocationPreference] = useState('Lagos State (Island / Mainland)');

  // Registration Form State (Phone number removed per user request)
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(true);

  // OTP State
  const [otp, setOtp] = useState(['4', '9', '1', '7', '8', '2']);
  const [timer, setTimer] = useState(59);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (currentStep === 4 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [currentStep, timer]);

  const handleNextStep1 = (selectedTarget: OnboardingTarget) => {
    setTarget(selectedTarget);
    setCurrentStep(2);
  };

  const handleNextStep2 = () => {
    setCurrentStep(3);
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const finalEmail = email.trim() || (target === 'family' ? 'david.okafor@example.com' : 'sarah.jenkins@example.com');
    const finalName = fullName.trim() || (target === 'family' ? 'David Okafor' : 'Sarah Jenkins');

    setOnboardingData({
      target,
      relationship,
      supportType,
      currentSituation,
      urgency,
      preferredCareFormat: locationPreference,
      fullName: finalName,
      email: finalEmail,
      password: password || 'SecurePass123!',
    });
    
    setTimer(59);
    setCurrentStep(4); // Move to OTP verification step
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, '');
    const newOtp = [...otp];
    newOtp[index] = cleanValue.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input if filled
    if (cleanValue && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  const handleVerifyOtp = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      // Registration sets the baseline assessment draft progress at 35%
      updateAssessmentProgress(35);
      if (target === 'family') {
        switchRole('family', 'family');
      } else {
        switchRole('patient', 'myself');
      }
      setCurrentStep(5); // Move to Success screen with choice
    }, 450);
  };

  const handleStartFullAssessment = () => {
    if (target === 'family') {
      router.push('/assessment/family');
    } else {
      router.push('/assessment');
    }
  };

  const handleGoToDashboard = () => {
    if (target === 'family') {
      router.push('/dashboard/family');
    } else {
      router.push('/dashboard');
    }
  };

  return (
    <AuthLayout
      title={
        currentStep === 1
          ? 'Begin Your Care Pathway'
          : currentStep === 2
          ? 'Clinical Needs Assessment'
          : currentStep === 3
          ? 'Create Confidential Account'
          : currentStep === 4
          ? 'Verify Email Address (OTP)'
          : 'Account Activated'
      }
      subtitle={
        currentStep === 1
          ? 'Select who needs rehabilitation support so we can tailor the right clinical protocol.'
          : currentStep === 2
          ? 'Provide clinical focus and regional preferences across Nigeria.'
          : currentStep === 3
          ? 'Set up your secure, HIPAA/NDPR-compliant healthcare portal credentials.'
          : currentStep === 4
          ? `We sent a 6-digit verification code to ${email || 'your registered email'}. Enter it below to activate your account.`
          : 'Your account baseline is ready. You can complete the full clinical assessment now or jump directly into your recovery dashboard.'
      }
      badgeText="Accredited Intake"
      showBackButton={currentStep > 1 && currentStep < 5}
    >
      {/* Step Progress Tracker */}
      {currentStep <= 3 && (
        <div className="space-y-2 pb-2">
          <div className="flex justify-between items-center text-xs font-semibold text-[var(--foreground-muted)]">
            <span className="font-cinzel tracking-wider text-[var(--foreground)]">STEP {currentStep} OF 3</span>
            <span className="text-[var(--gold)]">
              {currentStep === 1 ? 'Care Recipient' : currentStep === 2 ? 'Clinical Scope' : 'Portal Account'}
            </span>
          </div>
          <div className="w-full bg-[var(--background-tertiary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
            <div
              className="bg-[var(--gold)] h-full transition-all duration-300 rounded-full"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: WHO IS CARE FOR */}
      {currentStep === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <div className="text-xs font-semibold text-[var(--foreground)] uppercase tracking-wider">
            Select Care Recipient
          </div>

          <div className="space-y-3">
            {/* Myself */}
            <div
              onClick={() => handleNextStep1('myself')}
              className="p-5 rounded-2xl border border-[var(--border)] hover:border-[var(--gold)] bg-[var(--background-tertiary)] hover:bg-[var(--background-tertiary)]/80 cursor-pointer transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--background-secondary)] text-[var(--gold)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <User className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel font-bold text-sm sm:text-base text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                      For Myself
                    </h3>
                    <ArrowRight className="w-4 h-4 text-[var(--foreground-subtle)] group-hover:text-[var(--gold)] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    I am seeking personal rehabilitation, stroke/orthopedic recovery, addiction treatment, or psychological care.
                  </p>
                </div>
              </div>
            </div>

            {/* Family Member */}
            <div
              onClick={() => handleNextStep1('family')}
              className="p-5 rounded-2xl border border-[var(--border)] hover:border-[var(--green)] bg-[var(--background-tertiary)] hover:bg-[var(--background-tertiary)]/80 cursor-pointer transition-all group"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[var(--background-secondary)] text-[var(--green)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  <Users className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-cinzel font-bold text-sm sm:text-base text-[var(--foreground)] group-hover:text-[var(--green)] transition-colors">
                      For a Loved One / Family Member
                    </h3>
                    <ArrowRight className="w-4 h-4 text-[var(--foreground-subtle)] group-hover:text-[var(--green)] group-hover:translate-x-1 transition-all" />
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    I am acting as a caregiver, parent, spouse, or child organizing verified care and specialist consultations for a loved one.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-center">
            <span className="text-xs text-[var(--foreground-subtle)]">Already registered? </span>
            <button
              onClick={() => router.push('/login')}
              className="text-xs font-semibold text-[var(--gold)] hover:underline"
            >
              Sign In to your account
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 2: CLINICAL NEEDS & REGIONAL PREFERENCES */}
      {currentStep === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          {target === 'family' && (
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                Your Relationship to the Patient
              </label>
              <select
                value={relationship}
                onChange={(e) => setRelationship(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
              >
                <option value="Parent">Parent (Mother / Father)</option>
                <option value="Child">Adult Child (Son / Daughter)</option>
                <option value="Spouse">Spouse / Partner</option>
                <option value="Sibling">Sibling (Brother / Sister)</option>
                <option value="Guardian">Legal Guardian / Sponsor</option>
              </select>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">
              Primary Area of Care Required
            </label>
            <select
              value={supportType}
              onChange={(e) => setSupportType(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
            >
              <option value="Neurological Rehabilitation (Stroke / TBI)">Neurological Rehabilitation (Stroke / TBI)</option>
              <option value="Substance Dependency & Addiction Recovery">Substance Dependency & Addiction Recovery</option>
              <option value="Orthopedic & Musculoskeletal Therapy">Orthopedic & Musculoskeletal Post-Surgical Care</option>
              <option value="Geriatric Mobility & Memory Care">Geriatric Mobility & Memory Care</option>
              <option value="Mental Health & Clinical Psychotherapy">Mental Health & Clinical Psychotherapy</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">
              Preferred Online Tele-Rehab Format
            </label>
            <div className="relative">
              <Activity className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-3" />
              <select
                value={locationPreference}
                onChange={(e) => setLocationPreference(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
              >
                <option value="100% Online HD Video Telehealth">100% Online HD Video Telehealth & Remote Therapy</option>
                <option value="Virtual Intensive Rehabilitation (3x / week)">Virtual Intensive Rehabilitation (3x / week)</option>
                <option value="Direct Doctor Tele-Consultation & Daily Vitals Tracking">Direct Doctor Tele-Consultation & Daily Vitals Tracking</option>
                <option value="Executive Tele-Wellness & Flexible Evening Sessions">Executive Tele-Wellness & Flexible Evening Sessions</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-[var(--foreground)]">
              Urgency of Placement / Consultation
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {['Immediate (Next 24-48 Hours)', 'Within 1-2 Weeks', 'Planning Ahead', 'General Inquiry'].map((urg) => (
                <button
                  key={urg}
                  type="button"
                  onClick={() => setUrgency(urg)}
                  className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                    urgency === urg
                      ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]'
                      : 'border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:border-[var(--border-strong)]'
                  }`}
                >
                  {urg}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--foreground)] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              type="button"
              onClick={handleNextStep2}
              className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs flex items-center gap-2"
            >
              <span>Continue to Credentials</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 3: ACCOUNT REGISTRATION (Phone number removed per instructions) */}
      {currentStep === 3 && (
        <motion.form
          initial={{ opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleCreateAccount}
          className="space-y-3.5"
        >
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--foreground)]">
              Full Legal Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-3" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder={target === 'family' ? 'David Okafor' : 'Sarah Jenkins'}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-[var(--foreground)]">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-3" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[var(--foreground)]">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3 top-3" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2 text-[11px] text-[var(--foreground-muted)] cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              required
              className="mt-0.5 rounded bg-[var(--background-tertiary)] border-[var(--border)] text-[var(--gold)] focus:ring-[var(--gold)]"
            />
            <span>
              I agree to Rehab Nigeria's Clinical Intake Protocols and NDPR Data Privacy Policy. All consultations are 100% confidential.
            </span>
          </label>

          <div className="flex justify-between items-center pt-3 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={() => setCurrentStep(2)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--foreground)] flex items-center gap-1"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-semibold text-xs flex items-center gap-2 shadow-md hover:scale-[1.02] transition-transform"
            >
              <span>Submit & Verify Email</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.form>
      )}

      {/* STEP 4: VERIFICATION CODE (OTP UI) */}
      {currentStep === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6 text-center"
        >
          <div className="w-14 h-14 rounded-2xl bg-[var(--background-tertiary)] text-[var(--gold)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto shadow-md">
            <KeyRound className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)]">
              Verify Your Email Address
            </h3>
            <p className="text-xs text-[var(--foreground-muted)] max-w-sm mx-auto leading-relaxed">
              We dispatched a 6-digit one-time passcode to{' '}
              <span className="font-semibold text-[var(--gold)]">{email || 'your email address'}</span>. Please enter the passcode below to activate your healthcare portal.
            </p>
          </div>

          {/* 6-Digit OTP Inputs */}
          <div className="flex justify-center gap-2 sm:gap-3 py-1">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                id={`otp-input-${idx}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(idx, e.target.value)}
                onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                className="w-11 h-14 text-center text-xl font-bold rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--gold)] focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/20 focus:outline-none transition-all shadow-inner"
              />
            ))}
          </div>

          <button
            onClick={handleVerifyOtp}
            disabled={verifying}
            className="w-full py-3.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-lg shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {verifying ? (
              <span className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <ShieldCheck className="w-4 h-4 text-black" />
                <span>Verify Passcode & Enter Portal</span>
              </>
            )}
          </button>

          <div className="flex justify-between items-center text-xs text-[var(--foreground-subtle)] pt-1 px-1">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[var(--foreground-muted)]" />
              {timer > 0 ? `Resend in ${timer}s` : 'Code expired'}
            </span>
            <button
              type="button"
              disabled={timer > 0}
              onClick={() => setTimer(59)}
              className={`font-semibold flex items-center gap-1 transition-colors ${
                timer === 0 ? 'text-[var(--gold)] hover:underline cursor-pointer' : 'text-[var(--foreground-subtle)] cursor-not-allowed opacity-50'
              }`}
            >
              <RefreshCw className="w-3.5 h-3.5" /> Resend Passcode
            </button>
          </div>
        </motion.div>
      )}

      {/* STEP 5: ONBOARDING SUCCESS & ASSESSMENT CHOICE */}
      {currentStep === 5 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          <div className="text-center space-y-2">
            <div className="w-14 h-14 rounded-2xl bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20 flex items-center justify-center mx-auto shadow-md">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h3 className="font-cinzel font-bold text-xl text-[var(--foreground)]">
              Welcome to Rehab Nigeria
            </h3>
            <p className="text-xs text-[var(--foreground-muted)] leading-relaxed max-w-sm mx-auto">
              Your account has been verified and registered with Nigeria's accredited clinical network.
            </p>
          </div>

          {/* Assessment Progress Card */}
          <div className="p-5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-[var(--gold)]" />
                <span className="text-xs font-bold text-[var(--foreground)] uppercase tracking-wider">
                  Baseline Clinical Intake
                </span>
              </div>
              <span className="text-xs font-mono font-bold text-[var(--gold)] px-2 py-0.5 rounded-full bg-[var(--gold)]/10">
                35% Draft Saved
              </span>
            </div>

            <div className="w-full bg-[var(--background-secondary)] h-2 rounded-full overflow-hidden border border-[var(--border-subtle)]">
              <div className="bg-gradient-to-r from-[var(--gold)] to-[var(--green)] h-full w-[35%] rounded-full" />
            </div>

            <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
              We have saved your intake preferences. You can complete the full medical questionnaire now for immediate specialist matching, or proceed directly to your recovery portal.
            </p>
          </div>

          {/* Dual CTAs */}
          <div className="space-y-2.5">
            <button
              onClick={handleStartFullAssessment}
              className="w-full py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
            >
              <Activity className="w-4 h-4" />
              <span>Complete Full Clinical Assessment (+65%)</span>
            </button>

            <button
              onClick={handleGoToDashboard}
              className="w-full py-3 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--background-tertiary)]/80 text-[var(--foreground)] border border-[var(--border)] font-semibold text-xs transition-colors flex items-center justify-center gap-2"
            >
              <span>Go Directly to Recovery Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AuthLayout>
  );
};
