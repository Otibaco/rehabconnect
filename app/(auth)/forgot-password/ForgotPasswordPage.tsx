"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
} from "lucide-react";

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    setLoading(true);

    // TODO:
    // Connect this to your password reset API.
    // Example:
    // await fetch("/api/auth/forgot-password", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email }),
    // });

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] relative overflow-hidden">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      {/* Architectural Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-20 pointer-events-none" />

      {/* Ambient Gold Glow */}
      <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] bg-[var(--gold-dark)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[var(--gold-dark)]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Oversized Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-cinzel text-[8rem] sm:text-[14rem] lg:text-[18rem] font-black text-[var(--gold)]/[0.025] tracking-widest whitespace-nowrap">
          RECOVER
        </span>
      </div>

      {/* =========================================================
          PAGE CONTENT
      ========================================================== */}

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* HEADER */}
        <header className="w-full border-b border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link
              href="/"
              className="font-cinzel font-bold text-lg sm:text-xl tracking-wide text-[var(--foreground)] hover:text-[var(--gold)] transition-colors"
            >
              REHAB <span className="text-[var(--gold)]">NIGERIA</span>
            </Link>

            <Link
              href="/signin"
              className="inline-flex items-center gap-2 font-mono text-[10px] sm:text-xs text-[var(--gold)] hover:text-[var(--gold-light)] font-bold tracking-wider uppercase"
            >
              <span>BACK TO SIGN IN</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        {/* MAIN */}
        <section className="flex-1 flex items-center py-16 sm:py-20 lg:py-24">
          <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
              
              {/* =================================================
                  LEFT — INFORMATION
              ================================================== */}

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-5 space-y-8"
              >
                {/* Section Label */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-[0.25em]">
                    01
                  </span>

                  <div className="h-px w-8 bg-[var(--gold)]/50" />

                  <span className="font-mono text-[10px] text-[var(--foreground-subtle)] font-bold tracking-[0.2em]">
                    ACCOUNT RECOVERY
                  </span>
                </div>

                {/* Heading */}
                <div className="space-y-5">
                  <h1 className="font-cinzel text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight">
                    FORGOT YOUR
                    <span className="block text-[var(--gold)]">
                      PASSWORD?
                    </span>
                  </h1>

                  <p className="font-sans text-base sm:text-lg text-[var(--foreground-muted)] leading-relaxed max-w-xl">
                    It happens. Enter the email address associated with your
                    Rehab Nigeria account and we&apos;ll help you regain
                    secure access.
                  </p>
                </div>

                {/* Trust Information */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-4 p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm">
                    <div className="w-10 h-10 shrink-0 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-center">
                      <Lock className="w-4 h-4 text-[var(--gold)]" />
                    </div>

                    <div>
                      <span className="block font-mono text-[10px] text-[var(--gold)] font-bold tracking-wider">
                        SECURE RECOVERY
                      </span>

                      <span className="block font-sans text-xs text-[var(--foreground-muted)] mt-1">
                        Your account recovery request is handled securely.
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm">
                    <div className="w-10 h-10 shrink-0 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-center">
                      <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
                    </div>

                    <div>
                      <span className="block font-mono text-[10px] text-[var(--gold)] font-bold tracking-wider">
                        PRIVATE & CONFIDENTIAL
                      </span>

                      <span className="block font-sans text-xs text-[var(--foreground-muted)] mt-1">
                        We respect the privacy of every person seeking support.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Support */}
                <div className="pt-2">
                  <p className="font-mono text-[10px] text-[var(--foreground-subtle)] leading-relaxed">
                    NEED ADDITIONAL HELP?
                  </p>

                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 mt-2 font-mono text-xs text-[var(--gold)] hover:text-[var(--gold-light)] font-bold tracking-wider uppercase group"
                  >
                    <span>CONTACT SUPPORT</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </motion.div>

              {/* =================================================
                  RIGHT — FORM
              ================================================== */}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="lg:col-span-7"
              >
                <div className="max-w-xl lg:ml-auto">
                  <div className="relative bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm shadow-2xl p-6 sm:p-10">
                    
                    {/* Gold Corner Frame */}
                    <div className="absolute -inset-3 border border-[var(--gold)]/20 rounded-sm pointer-events-none" />

                    {/* Crosshair Corners */}
                    <div className="absolute -top-px -left-px w-6 h-6 border-l border-t border-[var(--gold)]" />
                    <div className="absolute -top-px -right-px w-6 h-6 border-r border-t border-[var(--gold)]" />
                    <div className="absolute -bottom-px -left-px w-6 h-6 border-l border-b border-[var(--gold)]" />
                    <div className="absolute -bottom-px -right-px w-6 h-6 border-r border-b border-[var(--gold)]" />

                    {!submitted ? (
                      <>
                        {/* Form Header */}
                        <div className="space-y-4 mb-8">
                          <div className="w-12 h-12 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-center">
                            <KeyRound className="w-5 h-5 text-[var(--gold)]" />
                          </div>

                          <div>
                            <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-[0.2em]">
                              RESET PASSWORD
                            </span>

                            <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)] mt-2">
                              Recover Your Account
                            </h2>

                            <p className="font-sans text-sm text-[var(--foreground-muted)] mt-3 leading-relaxed">
                              Enter your registered email address. If an
                              account exists, you&apos;ll receive instructions
                              to create a new password.
                            </p>
                          </div>
                        </div>

                        {/* FORM */}
                        <form
                          onSubmit={handleSubmit}
                          className="space-y-6"
                        >
                          {/* Email */}
                          <div className="space-y-2">
                            <label
                              htmlFor="email"
                              className="font-mono text-[10px] text-[var(--foreground)] font-bold tracking-wider uppercase"
                            >
                              EMAIL ADDRESS
                            </label>

                            <div className="relative">
                              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />

                              <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full h-14 pl-12 pr-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-sm text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] outline-none focus:border-[var(--gold)] transition-colors"
                              />
                            </div>

                            <p className="font-mono text-[9px] text-[var(--foreground-subtle)]">
                              USE THE EMAIL ASSOCIATED WITH YOUR ACCOUNT
                            </p>
                          </div>

                          {/* Submit */}
                          <button
                            type="submit"
                            disabled={loading}
                            className="w-full h-14 px-6 bg-[var(--gold)] hover:bg-[var(--gold-light)] disabled:opacity-60 disabled:cursor-not-allowed text-[#080907] font-mono text-xs font-bold tracking-wider rounded-sm transition-all shadow-xl flex items-center justify-center gap-2 group"
                          >
                            {loading ? (
                              <>
                                <span className="w-4 h-4 border-2 border-[#080907]/30 border-t-[#080907] rounded-full animate-spin" />
                                <span>SENDING REQUEST...</span>
                              </>
                            ) : (
                              <>
                                <span>SEND RESET INSTRUCTIONS</span>
                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                              </>
                            )}
                          </button>
                        </form>

                        {/* Back to Sign In */}
                        <div className="pt-7 mt-7 border-t border-[var(--border-subtle)] text-center">
                          <Link
                            href="/signin"
                            className="inline-flex items-center gap-2 font-mono text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors"
                          >
                            <ArrowLeft className="w-4 h-4" />
                            <span>RETURN TO SIGN IN</span>
                          </Link>
                        </div>
                      </>
                    ) : (
                      /* =================================================
                         SUCCESS STATE
                      ================================================== */

                      <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="py-8 sm:py-12 text-center space-y-7"
                      >
                        <div className="mx-auto w-16 h-16 rounded-sm bg-[var(--background-tertiary)] border border-[var(--gold)]/40 flex items-center justify-center">
                          <CheckCircle2 className="w-7 h-7 text-[var(--gold)]" />
                        </div>

                        <div className="space-y-3">
                          <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-[0.2em]">
                            REQUEST RECEIVED
                          </span>

                          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
                            CHECK YOUR EMAIL
                          </h2>

                          <p className="font-sans text-sm text-[var(--foreground-muted)] leading-relaxed max-w-md mx-auto">
                            If an account is associated with{" "}
                            <span className="text-[var(--foreground)] font-medium">
                              {email}
                            </span>
                            , password reset instructions have been sent.
                          </p>
                        </div>

                        {/* Security Notice */}
                        <div className="text-left p-5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-3">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />

                            <span className="font-mono text-[10px] text-[var(--gold)] font-bold tracking-wider">
                              SECURITY NOTICE
                            </span>
                          </div>

                          <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
                            For security reasons, the recovery message will
                            only contain instructions for resetting your
                            password. If you do not receive it shortly, check
                            your spam folder or verify that you entered the
                            correct email address.
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-2">
                          <Link
                            href="/signin"
                            className="flex-1 h-12 px-5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-[10px] font-bold tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
                          >
                            <span>RETURN TO SIGN IN</span>
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>

                          <button
                            type="button"
                            onClick={() => setSubmitted(false)}
                            className="flex-1 h-12 px-5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border-subtle)] font-mono text-[10px] font-bold tracking-wider rounded-sm transition-colors"
                          >
                            USE ANOTHER EMAIL
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom Security Indicator */}
                  <div className="flex items-center justify-center gap-3 pt-8">
                    <Lock className="w-3.5 h-3.5 text-[var(--gold)]" />

                    <span className="font-mono text-[9px] text-[var(--foreground-subtle)] tracking-wider uppercase">
                      Secure & Confidential Account Recovery
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-[var(--border)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="font-mono text-[9px] text-[var(--foreground-subtle)] tracking-wider">
              © {new Date().getFullYear()} REHAB NIGERIA
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
      </div>
    </main>
  );
};

export default ForgotPasswordPage;