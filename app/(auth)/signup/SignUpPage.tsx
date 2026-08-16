"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Loader2,
  AlertCircle,
  CheckCircle2,
  User,
} from "lucide-react";

import { SectionLabel } from "@/components/editorial/SectionLabel";

type IdentifierType = "email" | "phone";

interface FormErrors {
  name?: string;
  identifier?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

export const SignupPage: React.FC = () => {
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [acceptTerms, setAcceptTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [touched, setTouched] = useState({
    name: false,
    identifier: false,
    password: false,
    confirmPassword: false,
    terms: false,
  });

  /**
   * Determine whether the identifier is an email
   * or phone number.
   */
  const identifierType: IdentifierType =
    identifier.includes("@") ? "email" : "phone";

  /**
   * ---------------------------------------------------------------
   * VALIDATION
   * ---------------------------------------------------------------
   */

  const validateName = (): string => {
    if (!name.trim()) {
      return "Full name is required.";
    }

    if (name.trim().length < 2) {
      return "Please enter your full name.";
    }

    return "";
  };

  const validateIdentifier = (): string => {
    if (!identifier.trim()) {
      return "Email address or phone number is required.";
    }

    if (identifierType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(identifier.trim())) {
        return "Please enter a valid email address.";
      }
    } else {
      const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;

      if (!phoneRegex.test(identifier.trim())) {
        return "Please enter a valid phone number.";
      }
    }

    return "";
  };

  const validatePassword = (): string => {
    if (!password) {
      return "Password is required.";
    }

    if (password.length < 8) {
      return "Password must contain at least 8 characters.";
    }

    return "";
  };

  const validateConfirmPassword = (): string => {
    if (!confirmPassword) {
      return "Please confirm your password.";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }

    return "";
  };

  const validateTerms = (): string => {
    if (!acceptTerms) {
      return "You must accept the terms before creating an account.";
    }

    return "";
  };

  const errors: FormErrors = {
    name: touched.name ? validateName() : "",
    identifier: touched.identifier
      ? validateIdentifier()
      : "",
    password: touched.password
      ? validatePassword()
      : "",
    confirmPassword: touched.confirmPassword
      ? validateConfirmPassword()
      : "",
    terms: touched.terms ? validateTerms() : "",
  };

  const isFormValid =
    !validateName() &&
    !validateIdentifier() &&
    !validatePassword() &&
    !validateConfirmPassword() &&
    !validateTerms();

  /**
   * ---------------------------------------------------------------
   * SUBMIT
   * ---------------------------------------------------------------
   */

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setTouched({
      name: true,
      identifier: true,
      password: true,
      confirmPassword: true,
      terms: true,
    });

    setError("");
    setSuccess("");

    if (!isFormValid) {
      return;
    }

    try {
      setIsLoading(true);

      /*
       * Replace this simulated request with your actual
       * registration API.
       *
       * Example:
       *
       * const response = await fetch("/api/auth/register", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     name,
       *     identifier,
       *     password,
       *   }),
       * });
       *
       * if (!response.ok) {
       *   const data = await response.json();
       *   throw new Error(
       *     data.message || "Unable to create account."
       *   );
       * }
       *
       * router.push("/onboarding");
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 1200)
      );

      setSuccess(
        "Account created successfully. Preparing your onboarding..."
      );

      /*
       * After successful registration, redirect to:
       *
       * router.push("/onboarding");
       */
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * ---------------------------------------------------------------
   * FIELD HELPERS
   * ---------------------------------------------------------------
   */

  const markTouched = (
    field:
      | "name"
      | "identifier"
      | "password"
      | "confirmPassword"
      | "terms"
  ) => {
    setTouched((previous) => ({
      ...previous,
      [field]: true,
    }));
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      {/* ============================================================
          BACKGROUND
      ============================================================ */}

      <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none" />

      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================
          TOP NAVIGATION
      ============================================================ */}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[var(--foreground-subtle)] hover:text-[var(--gold)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50 rounded-sm px-2 py-2"
        >
          <ArrowLeft className="w-4 h-4" />
          BACK TO REHAB NIGERIA
        </Link>
      </div>

      {/* ============================================================
          MAIN
      ============================================================ */}

      <section className="relative z-10 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">

            {/* ======================================================
                LEFT — INTRODUCTION
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-5 lg:sticky lg:top-10 space-y-8"
            >
              <SectionLabel
                number="01"
                text="CREATE YOUR ACCOUNT"
              />

              <div className="space-y-5">
                <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] gold-border-glow">
                  BEGIN
                  <br />
                  YOUR JOURNEY.
                </h1>

                <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed max-w-xl">
                  Create a private Rehab Nigeria account to begin
                  your rehabilitation support journey and access
                  secure professional care.
                </p>
              </div>

              {/* ==================================================
                  PROCESS PREVIEW
              ================================================== */}

              <div className="border-t border-[var(--border-subtle)] pt-7 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-sm border border-[var(--gold)]/40 bg-[var(--background-secondary)] flex items-center justify-center font-mono text-[10px] text-[var(--gold)]">
                    01
                  </div>

                  <div>
                    <h2 className="font-cinzel text-sm font-bold">
                      CREATE ACCOUNT
                    </h2>

                    <p className="font-sans text-xs text-[var(--foreground-muted)] mt-1">
                      Provide your basic account details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-sm border border-[var(--border)] bg-[var(--background-secondary)] flex items-center justify-center font-mono text-[10px] text-[var(--foreground-subtle)]">
                    02
                  </div>

                  <div>
                    <h2 className="font-cinzel text-sm font-bold">
                      COMPLETE ONBOARDING
                    </h2>

                    <p className="font-sans text-xs text-[var(--foreground-muted)] mt-1">
                      Tell us a little about your situation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 shrink-0 rounded-sm border border-[var(--border)] bg-[var(--background-secondary)] flex items-center justify-center font-mono text-[10px] text-[var(--foreground-subtle)]">
                    03
                  </div>

                  <div>
                    <h2 className="font-cinzel text-sm font-bold">
                      CONNECT WITH CARE
                    </h2>

                    <p className="font-sans text-xs text-[var(--foreground-muted)] mt-1">
                      Continue toward the appropriate support pathway.
                    </p>
                  </div>
                </div>
              </div>

              {/* ==================================================
                  SECURITY
              ================================================== */}

              <div className="p-5 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm">
                <div className="flex gap-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--gold)] shrink-0" />

                  <div className="space-y-1">
                    <h3 className="font-cinzel text-xs font-bold">
                      PRIVATE & CONFIDENTIAL
                    </h3>

                    <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
                      Your information is handled with confidentiality
                      and responsible data protection throughout the
                      registration process.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* ======================================================
                RIGHT — REGISTRATION FORM
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0, x: 25, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-7"
            >
              <div className="relative">
                {/* Gold offset frame */}
                <div className="absolute -inset-3 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />

                <div className="relative bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm shadow-2xl p-6 sm:p-8 lg:p-10">

                  {/* ==================================================
                      FORM HEADER
                  ================================================== */}

                  <div className="mb-8 space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--gold)] rounded-full" />

                      <span className="font-mono text-[10px] text-[var(--gold)] tracking-[0.2em] font-bold">
                        NEW MEMBER REGISTRATION
                      </span>
                    </div>

                    <h2 className="font-cinzel text-2xl sm:text-3xl font-bold">
                      CREATE ACCOUNT
                    </h2>

                    <p className="font-sans text-sm text-[var(--foreground-muted)]">
                      Enter your details below to create your
                      secure account.
                    </p>
                  </div>

                  {/* ==================================================
                      ERROR
                  ================================================== */}

                  <AnimatePresence mode="wait">
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
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
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="mb-6 flex items-start gap-3 p-4 bg-[var(--gold)]/5 border border-[var(--gold)]/30 rounded-sm"
                        role="status"
                      >
                        <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" />

                        <p className="font-sans text-xs text-[var(--foreground)] leading-relaxed">
                          {success}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* ==================================================
                      FORM
                  ================================================== */}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    {/* ==================================================
                        FULL NAME
                    ================================================== */}

                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="block font-mono text-[10px] font-bold tracking-widest text-[var(--foreground)] uppercase"
                      >
                        Full Name
                      </label>

                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={name}
                          onChange={(event) => {
                            setName(event.target.value);
                            setError("");
                          }}
                          onBlur={() => markTouched("name")}
                          autoComplete="name"
                          placeholder="Enter your full name"
                          aria-invalid={Boolean(errors.name)}
                          aria-describedby={
                            errors.name
                              ? "name-error"
                              : undefined
                          }
                          className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                            errors.name
                              ? "border-red-500/70"
                              : "border-[var(--border-subtle)]"
                          } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                        />
                      </div>

                      {errors.name && (
                        <p
                          id="name-error"
                          className="font-mono text-[10px] text-red-400"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* ==================================================
                        EMAIL / PHONE
                    ================================================== */}

                    <div className="space-y-2">
                      <label
                        htmlFor="identifier"
                        className="block font-mono text-[10px] font-bold tracking-widest text-[var(--foreground)] uppercase"
                      >
                        Email or Phone Number
                      </label>

                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-[var(--foreground-subtle)]">
                          {identifierType === "email" ? (
                            <Mail className="w-4 h-4" />
                          ) : (
                            <Phone className="w-4 h-4" />
                          )}
                        </div>

                        <input
                          id="identifier"
                          name="identifier"
                          type="text"
                          value={identifier}
                          onChange={(event) => {
                            setIdentifier(event.target.value);
                            setError("");
                          }}
                          onBlur={() =>
                            markTouched("identifier")
                          }
                          autoComplete="username"
                          placeholder="Enter email or phone number"
                          aria-invalid={Boolean(
                            errors.identifier
                          )}
                          aria-describedby={
                            errors.identifier
                              ? "identifier-error"
                              : undefined
                          }
                          className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                            errors.identifier
                              ? "border-red-500/70"
                              : "border-[var(--border-subtle)]"
                          } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                        />
                      </div>

                      {errors.identifier && (
                        <p
                          id="identifier-error"
                          className="font-mono text-[10px] text-red-400"
                        >
                          {errors.identifier}
                        </p>
                      )}
                    </div>

                    {/* ==================================================
                        PASSWORD GRID
                    ================================================== */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                      {/* PASSWORD */}
                      <div className="space-y-2">
                        <label
                          htmlFor="password"
                          className="block font-mono text-[10px] font-bold tracking-widest text-[var(--foreground)] uppercase"
                        >
                          Password
                        </label>

                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                          <input
                            id="password"
                            name="password"
                            type={
                              showPassword
                                ? "text"
                                : "password"
                            }
                            value={password}
                            onChange={(event) => {
                              setPassword(event.target.value);
                              setError("");
                            }}
                            onBlur={() =>
                              markTouched("password")
                            }
                            autoComplete="new-password"
                            placeholder="Create password"
                            aria-invalid={Boolean(
                              errors.password
                            )}
                            aria-describedby={
                              errors.password
                                ? "password-error"
                                : "password-hint"
                            }
                            className={`w-full h-14 pl-11 pr-12 bg-[var(--background-tertiary)] border ${
                              errors.password
                                ? "border-red-500/70"
                                : "border-[var(--border-subtle)]"
                            } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowPassword(
                                (previous) => !previous
                              )
                            }
                            aria-label={
                              showPassword
                                ? "Hide password"
                                : "Show password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[var(--foreground-subtle)] hover:text-[var(--gold)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
                          >
                            {showPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {errors.password ? (
                          <p
                            id="password-error"
                            className="font-mono text-[10px] text-red-400"
                          >
                            {errors.password}
                          </p>
                        ) : (
                          <p
                            id="password-hint"
                            className="font-mono text-[9px] text-[var(--foreground-subtle)]"
                          >
                            Minimum 8 characters.
                          </p>
                        )}
                      </div>

                      {/* CONFIRM PASSWORD */}
                      <div className="space-y-2">
                        <label
                          htmlFor="confirmPassword"
                          className="block font-mono text-[10px] font-bold tracking-widest text-[var(--foreground)] uppercase"
                        >
                          Confirm Password
                        </label>

                        <div className="relative">
                          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                          <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={
                              showConfirmPassword
                                ? "text"
                                : "password"
                            }
                            value={confirmPassword}
                            onChange={(event) => {
                              setConfirmPassword(
                                event.target.value
                              );
                              setError("");
                            }}
                            onBlur={() =>
                              markTouched(
                                "confirmPassword"
                              )
                            }
                            autoComplete="new-password"
                            placeholder="Confirm password"
                            aria-invalid={Boolean(
                              errors.confirmPassword
                            )}
                            aria-describedby={
                              errors.confirmPassword
                                ? "confirm-password-error"
                                : undefined
                            }
                            className={`w-full h-14 pl-11 pr-12 bg-[var(--background-tertiary)] border ${
                              errors.confirmPassword
                                ? "border-red-500/70"
                                : "border-[var(--border-subtle)]"
                            } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                          />

                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(
                                (previous) => !previous
                              )
                            }
                            aria-label={
                              showConfirmPassword
                                ? "Hide confirmed password"
                                : "Show confirmed password"
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[var(--foreground-subtle)] hover:text-[var(--gold)] rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="w-4 h-4" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                        </div>

                        {errors.confirmPassword && (
                          <p
                            id="confirm-password-error"
                            className="font-mono text-[10px] text-red-400"
                          >
                            {errors.confirmPassword}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* ==================================================
                        TERMS
                    ================================================== */}

                    <div className="pt-2">
                      <label className="flex items-start gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={acceptTerms}
                          onChange={(event) => {
                            setAcceptTerms(
                              event.target.checked
                            );
                            setTouched((previous) => ({
                              ...previous,
                              terms: true,
                            }));
                          }}
                          className="peer sr-only"
                        />

                        <span className="w-5 h-5 shrink-0 mt-0.5 border border-[var(--border)] bg-[var(--background-tertiary)] rounded-sm flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)]/50 peer-checked:border-[var(--gold)] peer-checked:bg-[var(--gold)] transition-all">
                          {acceptTerms && (
                            <CheckCircle2 className="w-3 h-3 text-[#080907]" />
                          )}
                        </span>

                        <span className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
                          I agree to the{" "}
                          <Link
                            href="/terms-of-use"
                            className="text-[var(--gold)] hover:text-[var(--gold-light)] underline underline-offset-2"
                            target="_blank"
                          >
                            Terms of Use
                          </Link>{" "}
                          and acknowledge the{" "}
                          <Link
                            href="/privacy-policy"
                            className="text-[var(--gold)] hover:text-[var(--gold-light)] underline underline-offset-2"
                            target="_blank"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </span>
                      </label>

                      {errors.terms && (
                        <p className="font-mono text-[10px] text-red-400 mt-2 ml-8">
                          {errors.terms}
                        </p>
                      )}
                    </div>

                    {/* ==================================================
                        SUBMIT
                    ================================================== */}

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 px-6 bg-[var(--gold)] hover:bg-[var(--gold-light)] disabled:opacity-60 disabled:cursor-not-allowed text-[#080907] font-mono text-xs font-bold tracking-widest rounded-sm transition-all shadow-xl flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60 focus:ring-offset-2 focus:ring-offset-[var(--background-secondary)]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>CREATING ACCOUNT...</span>
                        </>
                      ) : (
                        <>
                          <span>CREATE ACCOUNT</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* ==================================================
                      EXISTING ACCOUNT
                  ================================================== */}

                  <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] text-center">
                    <p className="font-sans text-xs text-[var(--foreground-muted)]">
                      Already have an account?{" "}
                      <Link
                        href="/signin"
                        className="font-mono font-bold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                      >
                        SIGN IN
                      </Link>
                    </p>
                  </div>

                  {/* Confidentiality */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-[var(--foreground-subtle)]">
                    <Lock className="w-3 h-3" />

                    <span className="font-mono text-[9px] tracking-wider uppercase">
                      Private & Confidential Registration
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER
      ============================================================ */}

      <footer className="relative z-10 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[9px] text-[var(--foreground-subtle)] tracking-widest uppercase">
            REHAB NIGERIA • SECURE REGISTRATION
          </span>

          <div className="flex items-center gap-5 font-mono text-[9px]">
            <Link
              href="/privacy-policy"
              className="text-[var(--foreground-subtle)] hover:text-[var(--gold)] transition-colors"
            >
              PRIVACY
            </Link>

            <Link
              href="/terms-of-use"
              className="text-[var(--foreground-subtle)] hover:text-[var(--gold)] transition-colors"
            >
              TERMS
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
};