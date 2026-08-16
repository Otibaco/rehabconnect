"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Lock,
  Shield,
  Eye,
  EyeOff,
  HeartHandshake,
  Users,
  MapPin,
  Clock,
  Activity,
  ClipboardList,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  KeyRound,
  RefreshCw,
  Phone,
} from "lucide-react";


import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isPending, setIsPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(59);
  const [verifying, setVerifying] = useState(false);
  const [showOTPStep, setShowOTPStep] = useState(false);

  // Form state
  const [role, setRole] = useState<"patient" | "family">("patient");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [relationship, setRelationship] = useState("");
  const [supportType, setSupportType] = useState("");
  const [urgency, setUrgency] = useState("");
  const [locationPreference, setLocationPreference] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showOTPStep && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showOTPStep, timer]);

  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!role) newErrors.role = "Please select who needs care";
    }

    if (stepNumber === 2) {
      if (!firstName.trim()) newErrors.firstName = "First name is required";
      if (!lastName.trim()) newErrors.lastName = "Last name is required";
      if (!email.trim()) newErrors.email = "Email is required";
      else if (!email.includes("@")) newErrors.email = "Invalid email address";
      if (!password) newErrors.password = "Password is required";
      else if (password.length < 8)
        newErrors.password = "Password must be at least 8 characters";
      if (!confirmPassword)
        newErrors.confirmPassword = "Please confirm your password";
      else if (password !== confirmPassword)
        newErrors.confirmPassword = "Passwords do not match";
    }

    if (stepNumber === 3) {
      if (role === "family" && !relationship)
        newErrors.relationship = "Please select your relationship";
      if (!supportType) newErrors.supportType = "Please select a care type";
      if (!urgency) newErrors.urgency = "Please select urgency";
      if (!locationPreference)
        newErrors.locationPreference = "Please select a location";
      if (!agreedToTerms)
        newErrors.agreedToTerms = "You must agree to the terms";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    const fieldsToValidate = step === 1 ? 1 : step === 2 ? 2 : 3;
    if (validateStep(fieldsToValidate)) {
      if (step === 3) {
        setShowOTPStep(true);
        setTimer(59);
        setStep(4);
      } else {
        setStep((s) => Math.min(s + 1, 4));
      }
    }
  };

  const prevStep = () => {
    if (step === 4) {
      setShowOTPStep(false);
    }
    setStep((s) => Math.max(s - 1, 1));
  };

  const handleOtpChange = (index: number, value: string) => {
    const cleanValue = value.replace(/[^0-9]/g, "");
    const newOtp = [...otp];
    newOtp[index] = cleanValue.slice(-1);
    setOtp(newOtp);

    if (cleanValue && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleOtpKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
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
      setStep(5);
      toast.success("Account verified successfully!");
    }, 450);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(3)) {
      setIsPending(true);
      setTimeout(() => {
        setIsPending(false);
        setShowOTPStep(true);
        setTimer(59);
        setStep(4);
        toast.success("Verification code sent to your email");
      }, 600);
    }
  };

  return (
    <section className="min-h-screen flex bg-[var(--background)] font-sans overflow-hidden">
      {/* LEFT SIDE - Visual Section */}
      <div className="hidden lg:flex lg:w-[45%] bg-[var(--background-secondary)] p-12 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background-secondary)] to-[var(--gold-dark)]/20" />
        <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none" />
        <div className="relative z-10 w-full max-w-md">
          <div className="space-y-8">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/30 flex items-center justify-center">
                <span className="font-cinzel font-bold text-[var(--gold)] text-xl">
                  RN
                </span>
              </div>
              <div>
                <span className="font-cinzel text-xl font-bold text-[var(--foreground)] tracking-wider block">
                  REHAB <span className="text-[var(--gold)]">NIGERIA</span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-[0.15em] text-[var(--foreground-subtle)]">
                  Clinical Coordination Network
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="font-cinzel text-3xl font-bold text-[var(--foreground)] leading-tight">
                {role === "patient"
                  ? "Begin your recovery journey with confidential clinical support."
                  : "Support your loved one's rehabilitation with professional guidance."}
              </h2>
              <p className="text-sm text-[var(--foreground-muted)] leading-relaxed">
                {role === "patient"
                  ? "Connect with licensed healthcare professionals through Nigeria's premier virtual rehabilitation network."
                  : "Access family-centered care coordination and professional consultation for your loved one."}
              </p>
              <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--foreground-subtle)]">
                <span className="flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-[var(--gold)]" />
                  <span>Confidential & Secure</span>
                </span>
                <span className="w-px h-4 bg-[var(--border-subtle)]" />
                <span className="flex items-center gap-1.5">
                  <HeartHandshake className="w-3 h-3 text-[var(--gold)]" />
                  <span>Compassionate Care</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Form */}
      <div className="w-full lg:w-[55%] p-6 sm:p-8 lg:p-16 flex flex-col min-h-screen overflow-y-auto bg-[var(--background)]">
        <div className="max-w-md mx-auto w-full my-auto py-4">
          {/* Mobile Logo */}
          <Link
            href="/"
            className="mb-6 w-fit mx-auto lg:hidden flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-sm bg-[var(--background-secondary)] border border-[var(--border-subtle)] flex items-center justify-center">
              <span className="font-cinzel font-bold text-[var(--gold)] text-lg">
                RN
              </span>
            </div>
            <div>
              <span className="font-cinzel text-sm font-bold text-[var(--foreground)] tracking-wider block">
                REHAB <span className="text-[var(--gold)]">NIGERIA</span>
              </span>
              <span className="text-[8px] font-mono uppercase tracking-[0.15em] text-[var(--foreground-subtle)]">
                Clinical Coordination Network
              </span>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8 text-center lg:text-left">
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)] mb-2">
              {step === 1 && "I am looking to..."}
              {step === 2 && "Create your confidential account"}
              {step === 3 && "Clinical needs & preferences"}
              {step === 4 && "Verify your email"}
              {step === 5 && "Account activated!"}
            </h1>
            <p className="text-sm text-[var(--foreground-muted)]">
              {step === 1 &&
                "Select who needs rehabilitation support so we can tailor the right clinical protocol."}
              {step === 2 &&
                "Set up your secure, NDPR-compliant healthcare portal credentials."}
              {step === 3 &&
                "Provide clinical focus and regional preferences across Nigeria."}
              {step === 4 &&
                `We sent a 6-digit verification code to ${email || "your email"}`}
              {step === 5 &&
                "Your account baseline is ready. Start your recovery journey."}
            </p>
          </div>

          {/* Step Progress */}
          {step <= 3 && (
            <div className="space-y-2 pb-4">
              <div className="flex justify-between items-center text-xs font-mono text-[var(--foreground-muted)]">
                <span className="text-[var(--foreground)]">
                  STEP {step} OF 3
                </span>
                <span className="text-[var(--gold)]">
                  {step === 1
                    ? "Care Recipient"
                    : step === 2
                      ? "Credentials"
                      : "Clinical Scope"}
                </span>
              </div>
              <div className="w-full bg-[var(--background-tertiary)] h-1.5 rounded-full overflow-hidden border border-[var(--border-subtle)]">
                <div
                  className="bg-[var(--gold)] h-full transition-all duration-300 rounded-full"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="space-y-5"
              >
                {/* STEP 1: ROLE SELECTION */}
                {step === 1 && (
                  <div className="space-y-4">
                    <RoleCard
                      active={role === "patient"}
                      onClick={() => setRole("patient")}
                      title="For Myself"
                      description="I am seeking personal rehabilitation, stroke/orthopedic recovery, addiction treatment, or psychological care."
                      icon={<User className="w-5 h-5" />}
                      gold
                    />
                    <RoleCard
                      active={role === "family"}
                      onClick={() => setRole("family")}
                      title="For a Loved One"
                      description="I am acting as a caregiver, parent, spouse, or child organizing verified care and specialist consultations for a loved one."
                      icon={<Users className="w-5 h-5" />}
                      green
                    />
                    {errors.role && (
                      <p className="text-red-500 text-xs">{errors.role}</p>
                    )}
                  </div>
                )}

                {/* STEP 2: ACCOUNT CREDENTIALS */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                          First Name
                        </Label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-4 top-1/2 -translate-y-1/2" />
                          <Input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="John"
                            className={cn(
                              "pl-11 h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                              errors.firstName && "border-red-500",
                            )}
                          />
                        </div>
                        {errors.firstName && (
                          <p className="text-red-500 text-xs">
                            {errors.firstName}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                          Last Name
                        </Label>
                        <div className="relative">
                          <User className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-4 top-1/2 -translate-y-1/2" />
                          <Input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Doe"
                            className={cn(
                              "pl-11 h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                              errors.lastName && "border-red-500",
                            )}
                          />
                        </div>
                        {errors.lastName && (
                          <p className="text-red-500 text-xs">
                            {errors.lastName}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-4 top-1/2 -translate-y-1/2" />
                        <Input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className={cn(
                            "pl-11 h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                            errors.email && "border-red-500",
                          )}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-red-500 text-xs">{errors.email}</p>
                      )}
                    </div>

                    {/* <div className="space-y-1.5">
                      <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">Phone Number</Label>
                      <div className={cn(
                        "flex items-center rounded-sm border bg-[var(--background-secondary)] px-3 focus-within:border-[var(--gold)] focus-within:ring-1 focus-within:ring-[var(--gold)]/20",
                        errors.phone && "border-red-500"
                      )}>
                        <Phone className="w-4 h-4 text-[var(--foreground-subtle)] mr-2" />
                        <PhoneInput
                          international
                          defaultCountry="NG"
                          value={phone}
                          onChange={(value) => setPhone(value || '')}
                          className="w-full py-3 outline-none text-[var(--foreground)] bg-transparent [&_input]:bg-transparent [&_input]:text-[var(--foreground)] [&_input]:placeholder:text-[var(--foreground-subtle)] [&_input]:outline-none"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                    </div> */}

                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-4 top-1/2 -translate-y-1/2" />
                          <Input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className={cn(
                              "pl-11 pr-11 h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                              errors.password && "border-red-500",
                            )}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] hover:text-[var(--foreground)]"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <p className="text-red-500 text-xs">
                            {errors.password}
                          </p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                          Confirm Password
                        </Label>
                        <div className="relative">
                          <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-4 top-1/2 -translate-y-1/2" />
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                            className={cn(
                              "pl-11 pr-11 h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                              errors.confirmPassword && "border-red-500",
                            )}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] hover:text-[var(--foreground)]"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        {errors.confirmPassword && (
                          <p className="text-red-500 text-xs">
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 3: CLINICAL NEEDS */}
                {step === 3 && (
                  <div className="space-y-4">
                    {role === "family" && (
                      <div className="space-y-1.5">
                        <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                          Your Relationship to the Patient
                        </Label>
                        <Select
                          value={relationship}
                          onValueChange={(value) =>
                            setRelationship(value ?? "")
                          }
                        >
                          <SelectTrigger
                            className={cn(
                              "h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                              errors.relationship && "border-red-500",
                            )}
                          >
                            <SelectValue placeholder="Select your relationship" />
                          </SelectTrigger>
                          <SelectContent className="bg-[var(--background-secondary)] border-[var(--border)]">
                            <SelectItem value="Parent">
                              Parent (Mother / Father)
                            </SelectItem>
                            <SelectItem value="Child">
                              Adult Child (Son / Daughter)
                            </SelectItem>
                            <SelectItem value="Spouse">
                              Spouse / Partner
                            </SelectItem>
                            <SelectItem value="Sibling">
                              Sibling (Brother / Sister)
                            </SelectItem>
                            <SelectItem value="Guardian">
                              Legal Guardian / Sponsor
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        {errors.relationship && (
                          <p className="text-red-500 text-xs">
                            {errors.relationship}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                        Primary Area of Care Required
                      </Label>
                      <Select
                        value={supportType}
                        onValueChange={(value) => setSupportType(value ?? "")}
                      >
                        <SelectTrigger
                          className={cn(
                            "h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                            errors.supportType && "border-red-500",
                          )}
                        >
                          <SelectValue placeholder="Select care type" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--background-secondary)] border-[var(--border)]">
                          <SelectItem value="Neurological Rehabilitation (Stroke / TBI)">
                            Neurological Rehabilitation (Stroke / TBI)
                          </SelectItem>
                          <SelectItem value="Substance Dependency & Addiction Recovery">
                            Substance Dependency & Addiction Recovery
                          </SelectItem>
                          <SelectItem value="Orthopedic & Musculoskeletal Therapy">
                            Orthopedic & Musculoskeletal Therapy
                          </SelectItem>
                          <SelectItem value="Geriatric Mobility & Memory Care">
                            Geriatric Mobility & Memory Care
                          </SelectItem>
                          <SelectItem value="Mental Health & Clinical Psychotherapy">
                            Mental Health & Clinical Psychotherapy
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.supportType && (
                        <p className="text-red-500 text-xs">
                          {errors.supportType}
                        </p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                        Urgency of Consultation
                      </Label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Immediate (Next 24-48 Hours)",
                          "Within 1-2 Weeks",
                          "Planning Ahead",
                          "General Inquiry",
                        ].map((urg) => (
                          <button
                            key={urg}
                            type="button"
                            onClick={() => setUrgency(urg)}
                            className={cn(
                              "p-2.5 rounded-sm border text-left text-xs font-medium transition-all duration-300",
                              urgency === urg
                                ? "border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--gold)]"
                                : "border-[var(--border)] bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/30",
                            )}
                          >
                            {urg}
                          </button>
                        ))}
                      </div>
                      {errors.urgency && (
                        <p className="text-red-500 text-xs">{errors.urgency}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider">
                        Preferred Care Location
                      </Label>
                      <Select
                        value={locationPreference}
                        onValueChange={(value) =>
                          setLocationPreference(value ?? "")
                        }
                      >
                        <SelectTrigger
                          className={cn(
                            "h-11 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20",
                            errors.locationPreference && "border-red-500",
                          )}
                        >
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent className="bg-[var(--background-secondary)] border-[var(--border)]">
                          <SelectItem value="Lagos State (Island / Mainland)">
                            Lagos State (Island / Mainland)
                          </SelectItem>
                          <SelectItem value="Abuja FCT">Abuja FCT</SelectItem>
                          <SelectItem value="Port Harcourt, Rivers State">
                            Port Harcourt, Rivers State
                          </SelectItem>
                          <SelectItem value="Ibadan, Oyo State">
                            Ibadan, Oyo State
                          </SelectItem>
                          <SelectItem value="Kano, Kano State">
                            Kano, Kano State
                          </SelectItem>
                          <SelectItem value="100% Online Telehealth (Any Location)">
                            100% Online Telehealth (Any Location)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.locationPreference && (
                        <p className="text-red-500 text-xs">
                          {errors.locationPreference}
                        </p>
                      )}
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="w-4 h-4 mt-0.5 rounded-sm border-[var(--border)] text-[var(--gold)] focus:ring-[var(--gold)] bg-[var(--background-secondary)] cursor-pointer"
                      />
                      <label
                        htmlFor="terms"
                        className="text-xs text-[var(--foreground-muted)] cursor-pointer leading-relaxed"
                      >
                        I agree to Rehab Nigeria's Clinical Intake Protocols and
                        NDPR Data Privacy Policy. All consultations are 100%
                        confidential.
                      </label>
                    </div>
                    {errors.agreedToTerms && (
                      <p className="text-red-500 text-xs">
                        {errors.agreedToTerms}
                      </p>
                    )}
                  </div>
                )}

                {/* STEP 4: OTP VERIFICATION */}
                {step === 4 && (
                  <div className="space-y-6 text-center">
                    <div className="w-14 h-14 rounded-sm bg-[var(--background-tertiary)] text-[var(--gold)] border border-[var(--border-subtle)] flex items-center justify-center mx-auto">
                      <KeyRound className="w-7 h-7" />
                    </div>

                    <div className="space-y-1.5">
                      <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)]">
                        Verify Your Email
                      </h3>
                      <p className="text-xs text-[var(--foreground-muted)] max-w-sm mx-auto leading-relaxed">
                        Enter the 6-digit verification code sent to{" "}
                        <span className="font-semibold text-[var(--gold)]">
                          {email}
                        </span>
                      </p>
                    </div>

                    <div className="flex justify-center gap-2 sm:gap-3 py-2">
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
                          className="w-11 h-14 text-center text-xl font-bold rounded-sm bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--gold)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20 focus:outline-none transition-all"
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyOtp}
                      disabled={verifying}
                      className="w-full py-3.5 rounded-sm bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--background)] font-mono font-bold text-xs tracking-wider shadow-[0_4px_20px_rgba(200,164,93,0.15)] flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] disabled:opacity-50"
                    >
                      {verifying ? (
                        <span className="w-4 h-4 border-2 border-[var(--background)] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Shield className="w-4 h-4" />
                          <span>VERIFY & ACTIVATE</span>
                        </>
                      )}
                    </button>

                    <div className="flex justify-between items-center text-xs text-[var(--foreground-subtle)] pt-1">
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {timer > 0 ? `Resend in ${timer}s` : "Code expired"}
                      </span>
                      <button
                        type="button"
                        disabled={timer > 0}
                        onClick={() => setTimer(59)}
                        className={`font-semibold flex items-center gap-1 transition-colors ${
                          timer === 0
                            ? "text-[var(--gold)] hover:text-[var(--gold-light)] cursor-pointer"
                            : "text-[var(--foreground-subtle)] cursor-not-allowed opacity-50"
                        }`}
                      >
                        <RefreshCw className="w-3.5 h-3.5" /> Resend
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 5: SUCCESS */}
                {step === 5 && (
                  <div className="space-y-6 text-center">
                    <div className="w-14 h-14 rounded-sm bg-[var(--green)]/10 text-[var(--green)] border border-[var(--green)]/20 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-cinzel font-bold text-xl text-[var(--foreground)]">
                        Welcome to Rehab Nigeria
                      </h3>
                      <p className="text-xs text-[var(--foreground-muted)] leading-relaxed max-w-sm mx-auto">
                        Your account has been verified and registered with
                        Nigeria's accredited clinical network.
                      </p>
                    </div>

                    <div className="p-5 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border)] space-y-3 text-left">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <ClipboardList className="w-4 h-4 text-[var(--gold)]" />
                          <span className="text-xs font-mono font-bold text-[var(--foreground)] tracking-wider uppercase">
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
                        We have saved your intake preferences. You can complete
                        the full medical questionnaire now, or proceed directly
                        to your recovery portal.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      <button
                        type="button"
                        onClick={() => router.push("/patient-assessment")}
                        className="w-full py-3.5 rounded-sm bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--background)] font-mono font-bold text-xs tracking-wider shadow-[0_4px_20px_rgba(200,164,93,0.15)] flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98]"
                      >
                        <Activity className="w-4 h-4" />
                        <span>Complete Full Assessment (+65%)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => router.push("/patient")}
                        className="w-full py-3.5 rounded-sm bg-[var(--background-tertiary)] hover:bg-[var(--background-tertiary)]/80 text-[var(--foreground)] border border-[var(--border)] font-mono font-semibold text-xs tracking-wider transition-colors flex items-center justify-center gap-2"
                      >
                        <span>Go to Recovery Dashboard</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="flex flex-col gap-3 pt-4">
                {step < 3 && (
                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full h-12 rounded-sm bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--background)] font-mono font-bold text-xs tracking-wider shadow-[0_4px_20px_rgba(200,164,93,0.15)]"
                  >
                    Continue
                  </Button>
                )}
                {step === 3 && (
                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full h-12 rounded-sm bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--background)] font-mono font-bold text-xs tracking-wider shadow-[0_4px_20px_rgba(200,164,93,0.15)] disabled:opacity-50"
                  >
                    {isPending ? "Processing..." : "Submit & Verify Email"}
                  </Button>
                )}
                {step > 1 && step < 4 && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={prevStep}
                    className="w-full h-10 text-[var(--foreground-muted)] hover:text-[var(--foreground)] font-mono text-xs"
                  >
                    Go Back
                  </Button>
                )}
              </div>
            )}
          </form>

          {/* Sign In Link */}
          {step < 4 && (
            <div className="mt-6 text-center">
              <p className="text-xs font-mono text-[var(--foreground-muted)]">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                >
                  Sign In
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   ROLE CARD COMPONENT
========================================================= */
interface RoleCardProps {
  active: boolean;
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ReactNode;
  gold?: boolean;
  green?: boolean;
}

function RoleCard({
  active,
  onClick,
  title,
  description,
  icon,
  gold,
  green,
}: RoleCardProps) {
  const accentColor = gold
    ? "var(--gold)"
    : green
      ? "var(--green)"
      : "var(--foreground)";
  const bgColor = active
    ? gold
      ? "bg-[var(--gold)]/10"
      : green
        ? "bg-[var(--green)]/10"
        : "bg-[var(--background-tertiary)]"
    : "bg-[var(--background-tertiary)]";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full p-5 text-left flex justify-between gap-5 border-2 rounded-sm transition-all duration-300 group",
        active
          ? `border-[${accentColor}] ${bgColor}`
          : "border-[var(--border)] hover:border-[var(--gold)]/30",
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-11 h-11 rounded-sm border flex items-center justify-center shrink-0 transition-all duration-300",
            active
              ? `border-[${accentColor}] text-[${accentColor}]`
              : "border-[var(--border-subtle)] text-[var(--foreground-subtle)] group-hover:scale-105",
          )}
        >
          {icon}
        </div>
        <div>
          <h4
            className={cn(
              "font-cinzel font-bold text-sm transition-colors duration-300",
              active
                ? `text-[${accentColor}]`
                : "text-[var(--foreground)] group-hover:text-[var(--foreground)]",
            )}
          >
            {title}
          </h4>
          <p className="text-xs text-[var(--foreground-muted)] leading-relaxed mt-0.5">
            {description}
          </p>
        </div>
      </div>
      <div
        className={cn(
          "w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-300 mt-1",
          active
            ? `border-[${accentColor}] bg-[${accentColor}]`
            : "border-[var(--border)]",
        )}
      >
        {active && (
          <CheckCircle2 className="w-4 h-4 text-[var(--background)]" />
        )}
      </div>
    </button>
  );
}
