"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ShieldCheck, Send, CheckCircle2 } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormValues {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const fieldBaseClasses =
  "w-full rounded-xl glass-panel theme-border px-4 py-3 text-sm theme-text placeholder:theme-text-subtle theme-transition outline-none focus:border-[var(--color-accent-strong)] focus:ring-2 focus:ring-[var(--color-accent-soft)]";

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 0.4, 0.22, 1] },
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContactFormSection() {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (field: keyof FormValues) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) nextErrors.name = "Enter your full name.";
    if (!values.email.trim()) {
      nextErrors.email = "Enter your email address.";
    } else if (!EMAIL_PATTERN.test(values.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!values.subject.trim()) nextErrors.subject = "Let us know what this is about.";
    if (!values.message.trim() || values.message.trim().length < 10) {
      nextErrors.message = "Add a few details so a coordinator can help.";
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setValues(INITIAL_VALUES);
  };

  return (
    <section
      id="contact-form"
      className="relative w-full theme-transition py-20 sm:py-28"
      style={{ backgroundColor: "var(--color-section-soft)" }}
      aria-label="Send us a message"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1fr] gap-12 lg:gap-16 items-start">
        {/* ── Left: context ── */}
        <motion.div
          className="lg:sticky lg:top-24 flex flex-col gap-6"
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="text-xs font-medium tracking-wide theme-accent uppercase">
            Send a message
          </span>
          <h2 className="text-2xl sm:text-4xl font-bold tracking-tight theme-text leading-[1.15]">
            Tell us what you&apos;re looking for
          </h2>
          <p className="text-sm sm:text-base theme-text-muted leading-relaxed max-w-md">
            Share a little about your situation and a care coordinator will
            follow up personally — usually the same day. There&apos;s no
            commitment, and everything you share stays confidential.
          </p>

          <div className="flex items-start gap-3 rounded-2xl glass-card theme-shadow px-5 py-4 max-w-md">
            <ShieldCheck className="h-5 w-5 theme-accent shrink-0 mt-0.5" aria-hidden="true" strokeWidth={1.75} />
            <p className="text-xs theme-text-muted leading-relaxed">
              Every conversation is private. We never share your details with
              a centre until you decide you&apos;re ready.
            </p>
          </div>

          <div
            aria-hidden="true"
            className="hidden lg:block mt-4 h-40 rounded-2xl theme-border"
            style={{
              border: "1px solid var(--color-border)",
              background:
                "radial-gradient(circle at 30% 20%, var(--color-hero-glow) 0%, transparent 60%), radial-gradient(circle at 80% 80%, var(--color-hero-glow-2) 0%, transparent 55%), var(--color-surface)",
            }}
          />
        </motion.div>

        {/* ── Right: form ── */}
        <motion.div
          variants={columnVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="rounded-[28px] glass-panel theme-shadow p-6 sm:p-9"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center text-center gap-4 py-10">
              <CheckCircle2 className="h-10 w-10 theme-accent" aria-hidden="true" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold theme-text">Message sent</h3>
              <p className="text-sm theme-text-muted max-w-xs">
                A care coordinator will reach out shortly. Thank you for
                trusting us with the first step.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="theme-btn-ghost mt-2 px-6 py-2.5 text-sm font-medium rounded-xl theme-transition"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium theme-text-muted">
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange("name")}
                  placeholder="Jordan Adeyemi"
                  className={fieldBaseClasses}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-xs text-red-500">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium theme-text-muted">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={handleChange("email")}
                  placeholder="you@example.com"
                  className={fieldBaseClasses}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-medium theme-text-muted">
                  Phone <span className="theme-text-subtle">(optional)</span>
                </label>
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={handleChange("phone")}
                  placeholder="+1 (555) 000-0000"
                  className={fieldBaseClasses}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-medium theme-text-muted">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={values.subject}
                  onChange={handleChange("subject")}
                  placeholder="Finding a centre near me"
                  className={fieldBaseClasses}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-xs text-red-500">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label htmlFor="message" className="text-xs font-medium theme-text-muted">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={values.message}
                  onChange={handleChange("message")}
                  placeholder="Share what you're looking for and any details that would help a coordinator assist you."
                  className={`${fieldBaseClasses} resize-none`}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-2">
                <p className="text-xs theme-text-subtle">
                  By submitting, you agree to be contacted by a coordinator.
                </p>
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="theme-btn-primary inline-flex items-center justify-center gap-2 px-7 py-3 text-sm font-medium rounded-xl theme-transition disabled:opacity-60 shrink-0"
                >
                  {status === "submitting" ? "Sending…" : "Send message"}
                  {status !== "submitting" && <Send className="h-4 w-4" aria-hidden="true" />}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}