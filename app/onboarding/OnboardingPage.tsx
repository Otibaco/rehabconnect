"use client";

import React, { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  HeartHandshake,
  Loader2,
  ShieldCheck,
  UserRound,
  UsersRound,
  BriefcaseMedical,
  AlertCircle,
  CalendarDays,
  MapPin,
  Phone,
  User,
} from "lucide-react";

import { SectionLabel } from "@/components/editorial/SectionLabel";

type Role = "patient" | "family" | "coordinator";

interface OnboardingData {
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  location: string;
  role: Role | "";
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  phone?: string;
  dateOfBirth?: string;
  location?: string;
  role?: string;
}

const TOTAL_STEPS = 3;

const roleOptions = [
  {
    id: "patient" as Role,
    title: "Patient",
    description:
      "I am seeking support for my own substance use or recovery journey.",
    icon: UserRound,
    number: "01",
  },
  {
    id: "family" as Role,
    title: "Family Member",
    description:
      "I am seeking guidance or support for someone I care about.",
    icon: UsersRound,
    number: "02",
  },
  {
    id: "coordinator" as Role,
    title: "Care Coordinator",
    description:
      "I coordinate rehabilitation, healthcare, or support services.",
    icon: BriefcaseMedical,
    number: "03",
  },
];

const stepContent = [
  {
    number: "01",
    label: "BASIC INFORMATION",
    title: "LET'S GET TO KNOW YOU.",
    description:
      "Start with a few basic details so we can create the right foundation for your Rehab Nigeria profile.",
  },
  {
    number: "02",
    label: "YOUR SUPPORT PATHWAY",
    title: "HOW CAN WE SUPPORT YOU?",
    description:
      "Select the option that best describes why you are joining Rehab Nigeria.",
  },
  {
    number: "03",
    label: "REVIEW & COMPLETE",
    title: "YOUR JOURNEY STARTS HERE.",
    description:
      "Review your information before completing your onboarding.",
  },
];

export const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<OnboardingData>({
    firstName: "",
    lastName: "",
    phone: "",
    dateOfBirth: "",
    location: "",
    role: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * ---------------------------------------------------------------
   * CURRENT STEP
   * ---------------------------------------------------------------
   */

  const currentStepContent = stepContent[currentStep - 1];

  /**
   * ---------------------------------------------------------------
   * VALIDATION
   * ---------------------------------------------------------------
   */

  const validateStepOne = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required.";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required.";
    } else {
      const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;

      if (!phoneRegex.test(formData.phone.trim())) {
        errors.phone = "Please enter a valid phone number.";
      }
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = "Date of birth is required.";
    }

    if (!formData.location.trim()) {
      errors.location = "Location is required.";
    }

    return errors;
  };

  const validateStepTwo = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.role) {
      errors.role = "Please select your support pathway.";
    }

    return errors;
  };

  const getStepErrors = (): FormErrors => {
    if (currentStep === 1) {
      return validateStepOne();
    }

    if (currentStep === 2) {
      return validateStepTwo();
    }

    return {};
  };

  const stepErrors = useMemo(
    () => getStepErrors(),
    [
      currentStep,
      formData.firstName,
      formData.lastName,
      formData.phone,
      formData.dateOfBirth,
      formData.location,
      formData.role,
    ]
  );

  /**
   * ---------------------------------------------------------------
   * HELPERS
   * ---------------------------------------------------------------
   */

  const updateField = (
    field: keyof OnboardingData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setError("");
    setSuccess("");
  };

  const markTouched = (field: keyof OnboardingData) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));
  };

  const showError = (field: keyof FormErrors) => {
    return touched[field] ? stepErrors[field] : undefined;
  };

  /**
   * ---------------------------------------------------------------
   * STEP NAVIGATION
   * ---------------------------------------------------------------
   */

  const handleNext = () => {
    setError("");

    const errors = getStepErrors();

    setTouched((previous) => ({
      ...previous,
      ...Object.keys(errors).reduce(
        (acc, key) => ({
          ...acc,
          [key]: true,
        }),
        {}
      ),
    }));

    if (Object.keys(errors).length > 0) {
      return;
    }

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep((previous) => previous + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleBack = () => {
    setError("");

    if (currentStep > 1) {
      setCurrentStep((previous) => previous - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  /**
   * ---------------------------------------------------------------
   * COMPLETE ONBOARDING
   * ---------------------------------------------------------------
   */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const errors = validateStepOne();

    if (Object.keys(errors).length > 0 || !formData.role) {
      setError(
        "Please review your information before completing onboarding."
      );

      return;
    }

    try {
      setIsLoading(true);

      /*
       * Replace this section with your actual onboarding API.
       *
       * Example:
       *
       * const response = await fetch("/api/onboarding", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify(formData),
       * });
       *
       * if (!response.ok) {
       *   const data = await response.json();
       *
       *   throw new Error(
       *     data.message || "Unable to complete onboarding."
       *   );
       * }
       *
       * router.push("/dashboard");
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 1400)
      );

      setSuccess(
        "Your onboarding has been completed successfully."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete onboarding. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none" />

      <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================
          HEADER
      ============================================================ */}

      <header className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[var(--foreground-subtle)] hover:text-[var(--gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 rounded-sm px-2 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          REHAB NIGERIA
        </Link>
      </header>

      {/* ============================================================
          MAIN
      ============================================================ */}

      <section className="relative z-10 py-10 sm:py-14 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* ========================================================
              PAGE HEADER
          ======================================================== */}

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="max-w-3xl mb-10"
          >
            <SectionLabel
              number="02"
              text="PRIVATE ONBOARDING"
            />

            <div className="mt-5 space-y-4">
              <h1 className="font-cinzel text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight gold-border-glow">
                A FEW DETAILS.
                <br />
                THE RIGHT SUPPORT.
              </h1>

              <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed max-w-2xl">
                Complete this short onboarding process so Rehab
                Nigeria can understand your needs and direct you
                toward the appropriate support pathway.
              </p>
            </div>
          </motion.div>

          {/* ========================================================
              PROGRESS
          ======================================================== */}

          <div className="mb-10">
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-widest">
                STEP 0{currentStep} OF 0{TOTAL_STEPS}
              </span>

              <span className="font-mono text-[10px] text-[var(--foreground-subtle)] tracking-widest">
                {Math.round(
                  (currentStep / TOTAL_STEPS) * 100
                )}
                % COMPLETE
              </span>
            </div>

            <div className="h-[2px] bg-[var(--border)] overflow-hidden">
              <motion.div
                className="h-full bg-[var(--gold)]"
                initial={{ width: "0%" }}
                animate={{
                  width: `${(currentStep / TOTAL_STEPS) * 100}%`,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {stepContent.map((step, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;
                const isCompleted =
                  stepNumber < currentStep;

                return (
                  <div
                    key={step.number}
                    className="flex items-center gap-2"
                  >
                    <div
                      className={`w-7 h-7 shrink-0 rounded-sm flex items-center justify-center border transition-all ${
                        isCompleted
                          ? "bg-[var(--gold)] border-[var(--gold)] text-[#080907]"
                          : isActive
                            ? "border-[var(--gold)] text-[var(--gold)] bg-[var(--background-secondary)]"
                            : "border-[var(--border)] text-[var(--foreground-subtle)] bg-[var(--background-secondary)]"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-3.5 h-3.5" />
                      ) : (
                        <span className="font-mono text-[9px] font-bold">
                          0{stepNumber}
                        </span>
                      )}
                    </div>

                    <span
                      className={`hidden sm:block font-mono text-[9px] tracking-wider ${
                        isActive || isCompleted
                          ? "text-[var(--foreground)]"
                          : "text-[var(--foreground-subtle)]"
                      }`}
                    >
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================
              CONTENT GRID
          ======================================================== */}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">

            {/* ======================================================
                LEFT CONTEXT
            ====================================================== */}

            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.1,
              }}
              className="lg:col-span-4 lg:sticky lg:top-8"
            >
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-widest">
                    {currentStepContent.number} / 03
                  </span>

                  <h2 className="font-cinzel text-2xl sm:text-3xl font-bold mt-3 leading-tight">
                    {currentStepContent.title}
                  </h2>

                  <p className="font-sans text-sm text-[var(--foreground-muted)] leading-relaxed mt-4">
                    {currentStepContent.description}
                  </p>
                </div>

                <div className="border-t border-[var(--border-subtle)] pt-6 space-y-5">
                  <div className="flex gap-3">
                    <ShieldCheck className="w-5 h-5 text-[var(--gold)] shrink-0" />

                    <div>
                      <h3 className="font-cinzel text-xs font-bold">
                        CONFIDENTIAL
                      </h3>

                      <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed mt-1">
                        Your onboarding information is handled
                        as private account information.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <HeartHandshake className="w-5 h-5 text-[var(--gold)] shrink-0" />

                    <div>
                      <h3 className="font-cinzel text-xs font-bold">
                        HUMAN-CENTRED CARE
                      </h3>

                      <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed mt-1">
                        Your selected pathway helps us understand
                        the type of support you are seeking.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>

            {/* ======================================================
                FORM CARD
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.15,
              }}
              className="lg:col-span-8"
            >
              <div className="relative">
                <div className="absolute -inset-3 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />

                <div className="relative bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm shadow-2xl p-6 sm:p-8 lg:p-10">

                  {/* ==================================================
                      GLOBAL ERROR
                  ================================================== */}

                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                        }}
                        className="mb-6 flex items-start gap-3 p-4 bg-red-950/20 border border-red-500/30 rounded-sm"
                        role="alert"
                      >
                        <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />

                        <p className="font-sans text-xs text-red-300 leading-relaxed">
                          {error}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ==================================================
                      SUCCESS
                  ================================================== */}

                  <AnimatePresence mode="wait">
                    {success && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                        }}
                        className="mb-6 flex items-start gap-3 p-4 bg-[var(--gold)]/5 border border-[var(--gold)]/30 rounded-sm"
                        role="status"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" />

                        <div>
                          <p className="font-sans text-xs text-[var(--foreground)] leading-relaxed">
                            {success}
                          </p>

                          <Link
                            href="/dashboard"
                            className="inline-flex items-center gap-2 mt-3 font-mono text-[10px] font-bold text-[var(--gold)] hover:text-[var(--gold-light)]"
                          >
                            CONTINUE TO DASHBOARD
                            <ArrowUpRight className="w-3 h-3" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form onSubmit={handleSubmit} noValidate>
                    <AnimatePresence mode="wait">

                      {/* ==================================================
                          STEP 1 — BASIC INFORMATION
                      ================================================== */}

                      {currentStep === 1 && (
                        <motion.div
                          key="step-one"
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: -20,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                          className="space-y-6"
                        >
                          <div className="mb-8">
                            <span className="font-mono text-[10px] text-[var(--gold)] tracking-widest font-bold">
                              STEP 01
                            </span>

                            <h3 className="font-cinzel text-2xl font-bold mt-2">
                              BASIC INFORMATION
                            </h3>
                          </div>

                          {/* NAME */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* FIRST NAME */}
                            <div className="space-y-2">
                              <label
                                htmlFor="firstName"
                                className="block font-mono text-[10px] font-bold tracking-widest uppercase"
                              >
                                First Name
                              </label>

                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                                <input
                                  id="firstName"
                                  type="text"
                                  value={formData.firstName}
                                  onChange={(event) =>
                                    updateField(
                                      "firstName",
                                      event.target.value
                                    )
                                  }
                                  onBlur={() =>
                                    markTouched("firstName")
                                  }
                                  autoComplete="given-name"
                                  placeholder="First name"
                                  aria-invalid={Boolean(
                                    showError("firstName")
                                  )}
                                  className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                                    showError("firstName")
                                      ? "border-red-500/70"
                                      : "border-[var(--border-subtle)]"
                                  } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                                />
                              </div>

                              {showError("firstName") && (
                                <p className="font-mono text-[10px] text-red-400">
                                  {showError("firstName")}
                                </p>
                              )}
                            </div>

                            {/* LAST NAME */}
                            <div className="space-y-2">
                              <label
                                htmlFor="lastName"
                                className="block font-mono text-[10px] font-bold tracking-widest uppercase"
                              >
                                Last Name
                              </label>

                              <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                                <input
                                  id="lastName"
                                  type="text"
                                  value={formData.lastName}
                                  onChange={(event) =>
                                    updateField(
                                      "lastName",
                                      event.target.value
                                    )
                                  }
                                  onBlur={() =>
                                    markTouched("lastName")
                                  }
                                  autoComplete="family-name"
                                  placeholder="Last name"
                                  aria-invalid={Boolean(
                                    showError("lastName")
                                  )}
                                  className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                                    showError("lastName")
                                      ? "border-red-500/70"
                                      : "border-[var(--border-subtle)]"
                                  } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                                />
                              </div>

                              {showError("lastName") && (
                                <p className="font-mono text-[10px] text-red-400">
                                  {showError("lastName")}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* PHONE */}
                          <div className="space-y-2">
                            <label
                              htmlFor="phone"
                              className="block font-mono text-[10px] font-bold tracking-widest uppercase"
                            >
                              Phone Number
                            </label>

                            <div className="relative">
                              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                              <input
                                id="phone"
                                type="tel"
                                value={formData.phone}
                                onChange={(event) =>
                                  updateField(
                                    "phone",
                                    event.target.value
                                  )
                                }
                                onBlur={() =>
                                  markTouched("phone")
                                }
                                autoComplete="tel"
                                placeholder="+234 800 000 0000"
                                aria-invalid={Boolean(
                                  showError("phone")
                                )}
                                className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                                  showError("phone")
                                    ? "border-red-500/70"
                                    : "border-[var(--border-subtle)]"
                                } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                              />
                            </div>

                            {showError("phone") && (
                              <p className="font-mono text-[10px] text-red-400">
                                {showError("phone")}
                              </p>
                            )}
                          </div>

                          {/* DOB + LOCATION */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            {/* DATE */}
                            <div className="space-y-2">
                              <label
                                htmlFor="dateOfBirth"
                                className="block font-mono text-[10px] font-bold tracking-widest uppercase"
                              >
                                Date of Birth
                              </label>

                              <div className="relative">
                                <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                                <input
                                  id="dateOfBirth"
                                  type="date"
                                  value={formData.dateOfBirth}
                                  onChange={(event) =>
                                    updateField(
                                      "dateOfBirth",
                                      event.target.value
                                    )
                                  }
                                  onBlur={() =>
                                    markTouched("dateOfBirth")
                                  }
                                  autoComplete="bday"
                                  aria-invalid={Boolean(
                                    showError("dateOfBirth")
                                  )}
                                  className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                                    showError("dateOfBirth")
                                      ? "border-red-500/70"
                                      : "border-[var(--border-subtle)]"
                                  } rounded-sm text-sm text-[var(--foreground)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                                />
                              </div>

                              {showError("dateOfBirth") && (
                                <p className="font-mono text-[10px] text-red-400">
                                  {showError("dateOfBirth")}
                                </p>
                              )}
                            </div>

                            {/* LOCATION */}
                            <div className="space-y-2">
                              <label
                                htmlFor="location"
                                className="block font-mono text-[10px] font-bold tracking-widest uppercase"
                              >
                                Location
                              </label>

                              <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                                <input
                                  id="location"
                                  type="text"
                                  value={formData.location}
                                  onChange={(event) =>
                                    updateField(
                                      "location",
                                      event.target.value
                                    )
                                  }
                                  onBlur={() =>
                                    markTouched("location")
                                  }
                                  autoComplete="address-level2"
                                  placeholder="City / State"
                                  aria-invalid={Boolean(
                                    showError("location")
                                  )}
                                  className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                                    showError("location")
                                      ? "border-red-500/70"
                                      : "border-[var(--border-subtle)]"
                                  } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                                />
                              </div>

                              {showError("location") && (
                                <p className="font-mono text-[10px] text-red-400">
                                  {showError("location")}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* NEXT */}
                          <div className="pt-4 flex justify-end">
                            <button
                              type="button"
                              onClick={handleNext}
                              className="inline-flex items-center justify-center gap-3 px-8 h-14 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-widest rounded-sm transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60"
                            >
                              CONTINUE
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* ==================================================
                          STEP 2 — ROLE
                      ================================================== */}

                      {currentStep === 2 && (
                        <motion.div
                          key="step-two"
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: -20,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                          className="space-y-6"
                        >
                          <div className="mb-8">
                            <span className="font-mono text-[10px] text-[var(--gold)] tracking-widest font-bold">
                              STEP 02
                            </span>

                            <h3 className="font-cinzel text-2xl font-bold mt-2">
                              SELECT YOUR PATHWAY
                            </h3>

                            <p className="font-sans text-sm text-[var(--foreground-muted)] mt-3 leading-relaxed">
                              Choose the option that best describes
                              your reason for using Rehab Nigeria.
                            </p>
                          </div>

                          <div
                            className="space-y-4"
                            role="radiogroup"
                            aria-label="Select your support pathway"
                          >
                            {roleOptions.map((role) => {
                              const Icon = role.icon;
                              const isSelected =
                                formData.role === role.id;

                              return (
                                <button
                                  key={role.id}
                                  type="button"
                                  role="radio"
                                  aria-checked={isSelected}
                                  onClick={() =>
                                    updateField(
                                      "role",
                                      role.id
                                    )
                                  }
                                  className={`w-full text-left p-5 sm:p-6 border rounded-sm transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 ${
                                    isSelected
                                      ? "border-[var(--gold)] bg-[var(--gold)]/5"
                                      : "border-[var(--border)] bg-[var(--background-tertiary)] hover:border-[var(--gold)]/50"
                                  }`}
                                >
                                  <div className="flex items-start gap-4">

                                    <div
                                      className={`w-12 h-12 shrink-0 rounded-sm border flex items-center justify-center transition-all ${
                                        isSelected
                                          ? "border-[var(--gold)] bg-[var(--gold)] text-[#080907]"
                                          : "border-[var(--border-subtle)] text-[var(--gold)] bg-[var(--background-secondary)]"
                                      }`}
                                    >
                                      <Icon className="w-5 h-5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between gap-4">
                                        <div>
                                          <span className="font-mono text-[9px] text-[var(--gold)] tracking-widest">
                                            {role.number}
                                          </span>

                                          <h4 className="font-cinzel text-lg font-bold mt-1">
                                            {role.title}
                                          </h4>
                                        </div>

                                        <div
                                          className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                                            isSelected
                                              ? "border-[var(--gold)] bg-[var(--gold)]"
                                              : "border-[var(--border)]"
                                          }`}
                                        >
                                          {isSelected && (
                                            <Check className="w-3 h-3 text-[#080907]" />
                                          )}
                                        </div>
                                      </div>

                                      <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed mt-3 max-w-xl">
                                        {role.description}
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              );
                            })}
                          </div>

                          {touched.role && stepErrors.role && (
                            <p className="font-mono text-[10px] text-red-400">
                              {stepErrors.role}
                            </p>
                          )}

                          <div className="pt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                            <button
                              type="button"
                              onClick={handleBack}
                              className="inline-flex items-center justify-center gap-2 px-6 h-12 border border-[var(--border)] hover:border-[var(--gold)] text-[var(--foreground-muted)] hover:text-[var(--gold)] font-mono text-[10px] font-bold tracking-widest rounded-sm transition-all"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              BACK
                            </button>

                            <button
                              type="button"
                              onClick={handleNext}
                              className="inline-flex items-center justify-center gap-3 px-8 h-12 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold tracking-widest rounded-sm transition-all shadow-xl"
                            >
                              REVIEW DETAILS
                              <ArrowRight className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}

                      {/* ==================================================
                          STEP 3 — REVIEW
                      ================================================== */}

                      {currentStep === 3 && (
                        <motion.div
                          key="step-three"
                          initial={{
                            opacity: 0,
                            x: 20,
                          }}
                          animate={{
                            opacity: 1,
                            x: 0,
                          }}
                          exit={{
                            opacity: 0,
                            x: -20,
                          }}
                          transition={{
                            duration: 0.35,
                          }}
                          className="space-y-6"
                        >
                          <div className="mb-8">
                            <span className="font-mono text-[10px] text-[var(--gold)] tracking-widest font-bold">
                              STEP 03
                            </span>

                            <h3 className="font-cinzel text-2xl font-bold mt-2">
                              REVIEW YOUR DETAILS
                            </h3>

                            <p className="font-sans text-sm text-[var(--foreground-muted)] mt-3 leading-relaxed">
                              Please confirm that the information
                              below is correct before completing
                              your onboarding.
                            </p>
                          </div>

                          {/* PERSONAL DETAILS */}
                          <div className="border border-[var(--border)] bg-[var(--background-tertiary)] rounded-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                              <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-widest">
                                PERSONAL INFORMATION
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  setCurrentStep(1)
                                }
                                className="font-mono text-[9px] text-[var(--foreground-subtle)] hover:text-[var(--gold)] tracking-wider"
                              >
                                EDIT
                              </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2">
                              <ReviewItem
                                label="FULL NAME"
                                value={`${formData.firstName} ${formData.lastName}`}
                              />

                              <ReviewItem
                                label="PHONE"
                                value={formData.phone}
                              />

                              <ReviewItem
                                label="DATE OF BIRTH"
                                value={formData.dateOfBirth}
                              />

                              <ReviewItem
                                label="LOCATION"
                                value={formData.location}
                              />
                            </div>
                          </div>

                          {/* ROLE */}
                          <div className="border border-[var(--border)] bg-[var(--background-tertiary)] rounded-sm overflow-hidden">
                            <div className="px-5 py-4 border-b border-[var(--border-subtle)] flex items-center justify-between">
                              <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-widest">
                                SUPPORT PATHWAY
                              </span>

                              <button
                                type="button"
                                onClick={() =>
                                  setCurrentStep(2)
                                }
                                className="font-mono text-[9px] text-[var(--foreground-subtle)] hover:text-[var(--gold)] tracking-wider"
                              >
                                EDIT
                              </button>
                            </div>

                            <div className="p-5">
                              {(() => {
                                const selectedRole =
                                  roleOptions.find(
                                    (role) =>
                                      role.id === formData.role
                                  );

                                if (!selectedRole) {
                                  return null;
                                }

                                const Icon =
                                  selectedRole.icon;

                                return (
                                  <div className="flex items-center gap-4">
                                    <div className="w-11 h-11 bg-[var(--gold)] text-[#080907] rounded-sm flex items-center justify-center">
                                      <Icon className="w-5 h-5" />
                                    </div>

                                    <div>
                                      <span className="font-mono text-[9px] text-[var(--gold)] tracking-widest">
                                        SELECTED PATHWAY
                                      </span>

                                      <h4 className="font-cinzel text-lg font-bold mt-1">
                                        {selectedRole.title}
                                      </h4>
                                    </div>
                                  </div>
                                );
                              })()}
                            </div>
                          </div>

                          {/* PRIVACY NOTICE */}
                          <div className="flex items-start gap-3 p-4 border border-[var(--border-subtle)] bg-[var(--background)] rounded-sm">
                            <ShieldCheck className="w-5 h-5 text-[var(--gold)] shrink-0" />

                            <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
                              By completing onboarding, you are
                              providing the information needed to
                              establish your Rehab Nigeria profile.
                              Please review your details carefully
                              before continuing.
                            </p>
                          </div>

                          {/* ACTIONS */}
                          <div className="pt-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
                            <button
                              type="button"
                              onClick={handleBack}
                              disabled={isLoading}
                              className="inline-flex items-center justify-center gap-2 px-6 h-12 border border-[var(--border)] hover:border-[var(--gold)] text-[var(--foreground-muted)] hover:text-[var(--gold)] disabled:opacity-50 font-mono text-[10px] font-bold tracking-widest rounded-sm transition-all"
                            >
                              <ArrowLeft className="w-4 h-4" />
                              BACK
                            </button>

                            <button
                              type="submit"
                              disabled={isLoading || Boolean(success)}
                              className="inline-flex items-center justify-center gap-3 px-8 h-14 bg-[var(--gold)] hover:bg-[var(--gold-light)] disabled:opacity-60 disabled:cursor-not-allowed text-[#080907] font-mono text-xs font-bold tracking-widest rounded-sm transition-all shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60"
                            >
                              {isLoading ? (
                                <>
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                  COMPLETING ONBOARDING...
                                </>
                              ) : (
                                <>
                                  COMPLETE ONBOARDING
                                  <ArrowUpRight className="w-4 h-4" />
                                </>
                              )}
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </form>

                  {/* ==================================================
                      SECURITY FOOTER
                  ================================================== */}

                  <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-[var(--foreground-subtle)]">
                      <LockIcon />

                      <span className="font-mono text-[9px] tracking-wider uppercase">
                        Private & Confidential
                      </span>
                    </div>

                    <span className="font-mono text-[9px] text-[var(--foreground-subtle)] tracking-wider">
                      REHAB NIGERIA • ONBOARDING
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
};

/**
 * ---------------------------------------------------------------
 * REVIEW ITEM
 * ---------------------------------------------------------------
 */

interface ReviewItemProps {
  label: string;
  value: string;
}

const ReviewItem: React.FC<ReviewItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="p-5 border-b sm:border-r border-[var(--border-subtle)] last:border-b-0">
      <span className="block font-mono text-[9px] text-[var(--foreground-subtle)] tracking-widest">
        {label}
      </span>

      <span className="block font-sans text-sm text-[var(--foreground)] mt-2 break-words">
        {value || "Not provided"}
      </span>
    </div>
  );
};

/**
 * Small reusable lock icon component.
 */
const LockIcon: React.FC = () => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect
        width="18"
        height="11"
        x="3"
        y="11"
        rx="2"
        ry="2"
      />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
};