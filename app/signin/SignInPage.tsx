"use client";

import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
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
} from "lucide-react";

import { SectionLabel } from "@/components/editorial/SectionLabel";

type IdentifierType = "email" | "phone";

export const SigninPage: React.FC = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [touched, setTouched] = useState({
    identifier: false,
    password: false,
  });

  /**
   * Determine whether the user entered an email or phone number.
   */
  const identifierType: IdentifierType =
    identifier.includes("@") ? "email" : "phone";

  /**
   * Validation
   */
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

  const identifierError = touched.identifier
    ? validateIdentifier()
    : "";

  const passwordError = touched.password
    ? validatePassword()
    : "";

  const isFormValid =
    !validateIdentifier() &&
    !validatePassword();

  /**
   * Handle submit
   */
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTouched({
      identifier: true,
      password: true,
    });

    setError("");
    setSuccess("");

    if (!isFormValid) {
      return;
    }

    try {
      setIsLoading(true);

      /*
       * Replace this section with your actual authentication API.
       *
       * Example:
       *
       * const response = await fetch("/api/auth/login", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify({
       *     identifier,
       *     password,
       *     rememberMe,
       *   }),
       * });
       *
       * if (!response.ok) {
       *   throw new Error("Invalid login credentials.");
       * }
       */

      await new Promise((resolve) => setTimeout(resolve, 1200));

      setSuccess("Authentication successful. Redirecting...");

      // Replace with your preferred navigation logic.
      // router.push("/dashboard");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      {/* ============================================================
          BACKGROUND ARCHITECTURE
      ============================================================ */}

      <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none" />

      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none" />

      {/* ============================================================
          HEADER
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
          MAIN CONTENT
      ============================================================ */}

      <section className="relative z-10 min-h-[calc(100vh-80px)] flex items-center py-12 sm:py-16">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            {/* ======================================================
                LEFT — BRAND / CONTEXT
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-6 space-y-8"
            >
              <SectionLabel
                number="01"
                text="SECURE MEMBER ACCESS"
              />

              <div className="space-y-5">
                <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] gold-border-glow">
                  WELCOME
                  <br />
                  BACK.
                </h1>

                <p className="font-sans text-base sm:text-lg lg:text-xl text-[var(--foreground-muted)] max-w-xl leading-relaxed">
                  Continue your private rehabilitation journey with secure
                  access to your Rehab Nigeria account.
                </p>
              </div>

              {/* Security statement */}
              <div className="max-w-md border-t border-[var(--border-subtle)] pt-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 shrink-0 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex items-center justify-center text-[var(--gold)]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="font-cinzel text-sm font-bold text-[var(--foreground)]">
                      PRIVATE & CONFIDENTIAL
                    </h2>

                    <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
                      Your account and rehabilitation information are handled
                      with confidentiality and responsible data protection.
                    </p>
                  </div>
                </div>
              </div>

              {/* Registration CTA */}
              <div className="pt-2">
                <p className="font-mono text-[10px] text-[var(--foreground-subtle)] tracking-wider mb-2">
                  NEW TO REHAB NIGERIA?
                </p>

                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors group"
                >
                  <span>CREATE YOUR ACCOUNT</span>

                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </motion.div>

            {/* ======================================================
                RIGHT — SIGN IN FORM
            ====================================================== */}

            <motion.div
              initial={{ opacity: 0, x: 25, y: 10 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-6"
            >
              <div className="relative">
                {/* Gold offset frame */}
                <div className="absolute -inset-3 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />

                <div className="relative bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm shadow-2xl p-6 sm:p-8 lg:p-10">
                  
                  {/* Form header */}
                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-[var(--gold)] rounded-full" />

                      <span className="font-mono text-[10px] text-[var(--gold)] tracking-[0.2em] font-bold">
                        ACCOUNT LOGIN
                      </span>
                    </div>

                    <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                      SIGN IN
                    </h2>

                    <p className="font-sans text-sm text-[var(--foreground-muted)]">
                      Enter your account details to continue.
                    </p>
                  </div>

                  {/* ==================================================
                      ERROR MESSAGE
                  ================================================== */}

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-start gap-3 p-4 bg-red-950/20 border border-red-500/30 rounded-sm"
                      role="alert"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />

                      <p className="font-sans text-xs text-red-300 leading-relaxed">
                        {error}
                      </p>
                    </motion.div>
                  )}

                  {/* ==================================================
                      SUCCESS MESSAGE
                  ================================================== */}

                  {success && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6 flex items-start gap-3 p-4 bg-[var(--gold)]/5 border border-[var(--gold)]/30 rounded-sm"
                      role="status"
                    >
                      <CheckCircle2 className="w-5 h-5 text-[var(--gold)] shrink-0" />

                      <p className="font-sans text-xs text-[var(--foreground)] leading-relaxed">
                        {success}
                      </p>
                    </motion.div>
                  )}

                  {/* ==================================================
                      FORM
                  ================================================== */}

                  <form
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6"
                  >
                    {/* Identifier */}
                    <div className="space-y-2">
                      <label
                        htmlFor="identifier"
                        className="block font-mono text-[10px] font-bold tracking-widest text-[var(--foreground)] uppercase"
                      >
                        Email or Phone Number
                      </label>

                      <div className="relative">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] pointer-events-none">
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
                            setSuccess("");
                          }}
                          onBlur={() =>
                            setTouched((previous) => ({
                              ...previous,
                              identifier: true,
                            }))
                          }
                          autoComplete="username"
                          placeholder="Enter email or phone number"
                          aria-invalid={Boolean(identifierError)}
                          aria-describedby={
                            identifierError
                              ? "identifier-error"
                              : undefined
                          }
                          className={`w-full h-14 pl-11 pr-4 bg-[var(--background-tertiary)] border ${
                            identifierError
                              ? "border-red-500/70"
                              : "border-[var(--border-subtle)]"
                          } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                        />
                      </div>

                      {identifierError && (
                        <p
                          id="identifier-error"
                          className="font-mono text-[10px] text-red-400"
                        >
                          {identifierError}
                        </p>
                      )}
                    </div>

                    {/* Password */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-4">
                        <label
                          htmlFor="password"
                          className="block font-mono text-[10px] font-bold tracking-widest text-[var(--foreground)] uppercase"
                        >
                          Password
                        </label>

                        <Link
                          href="/forgot-password"
                          className="font-mono text-[10px] text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors focus:outline-none focus:underline"
                        >
                          FORGOT PASSWORD?
                        </Link>
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)] pointer-events-none" />

                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          value={password}
                          onChange={(event) => {
                            setPassword(event.target.value);
                            setError("");
                            setSuccess("");
                          }}
                          onBlur={() =>
                            setTouched((previous) => ({
                              ...previous,
                              password: true,
                            }))
                          }
                          autoComplete="current-password"
                          placeholder="Enter your password"
                          aria-invalid={Boolean(passwordError)}
                          aria-describedby={
                            passwordError
                              ? "password-error"
                              : undefined
                          }
                          className={`w-full h-14 pl-11 pr-12 bg-[var(--background-tertiary)] border ${
                            passwordError
                              ? "border-red-500/70"
                              : "border-[var(--border-subtle)]"
                          } rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none transition-all focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/30`}
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((previous) => !previous)
                          }
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[var(--foreground-subtle)] hover:text-[var(--gold)] transition-colors rounded-sm focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/40"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {passwordError && (
                        <p
                          id="password-error"
                          className="font-mono text-[10px] text-red-400"
                        >
                          {passwordError}
                        </p>
                      )}
                    </div>

                    {/* Remember Me */}
                    <div className="flex items-center">
                      <label className="inline-flex items-center gap-3 cursor-pointer select-none">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(event) =>
                            setRememberMe(event.target.checked)
                          }
                          className="peer sr-only"
                        />

                        <span className="w-4 h-4 border border-[var(--border)] bg-[var(--background-tertiary)] rounded-sm flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-[var(--gold)]/50 peer-checked:border-[var(--gold)] peer-checked:bg-[var(--gold)] transition-all">
                          {rememberMe && (
                            <CheckCircle2 className="w-3 h-3 text-[#080907]" />
                          )}
                        </span>

                        <span className="font-mono text-[10px] text-[var(--foreground-muted)]">
                          REMEMBER ME
                        </span>
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-14 px-6 bg-[var(--gold)] hover:bg-[var(--gold-light)] disabled:opacity-60 disabled:cursor-not-allowed text-[#080907] font-mono text-xs font-bold tracking-widest rounded-sm transition-all shadow-xl flex items-center justify-center gap-3 focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/60 focus:ring-offset-2 focus:ring-offset-[var(--background-secondary)]"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>AUTHENTICATING...</span>
                        </>
                      ) : (
                        <>
                          <span>SIGN IN SECURELY</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* ==================================================
                      REGISTER
                  ================================================== */}

                  <div className="mt-8 pt-6 border-t border-[var(--border-subtle)] text-center">
                    <p className="font-sans text-xs text-[var(--foreground-muted)]">
                      Do not have an account?{" "}
                      <Link
                        href="/signup"
                        className="font-mono font-bold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors"
                      >
                        CREATE ACCOUNT
                      </Link>
                    </p>
                  </div>

                  {/* Confidentiality notice */}
                  <div className="mt-6 flex items-center justify-center gap-2 text-[var(--foreground-subtle)]">
                    <Lock className="w-3 h-3" />

                    <span className="font-mono text-[9px] tracking-wider uppercase">
                      Private & Confidential Access
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ============================================================
          FOOTER MICRO-COPY
      ============================================================ */}

      <div className="relative z-10 border-t border-[var(--border-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[9px] text-[var(--foreground-subtle)] tracking-widest uppercase">
            REHAB NIGERIA • SECURE ACCESS
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
      </div>
    </main>
  );
};