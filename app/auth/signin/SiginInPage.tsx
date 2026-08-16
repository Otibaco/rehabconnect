"use client";
import React, { useState } from "react";
import {
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  User,
  Users,
  Stethoscope,
  Shield,
  ArrowLeft,
  Award,
  ChevronLeft,
  ChevronRight,
  HeartHandshake,
} from "lucide-react";
import { motion } from "framer-motion";

// Import generated online telehealth rehab image
// import onlineTelehealthImg from '../../assets/images/online_telehealth_rehab_1786771351588.jpg';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { UserRole } from "@/types/type";

export const SignInPage: React.FC = () => {
  const router = useRouter();
  const { login, switchRole } = useAuth();
  const [email, setEmail] = useState("sarah.j@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);

  const sanctuarySlides = [
    {
      title: "100% Online Rehabilitation & Doctor Care",
      subtitle:
        "Nigeria’s premier virtual rehabilitation network connecting patients and families with licensed doctors from the comfort of home.",
      stat: "99.4% Patient Recovery Satisfaction",
      badge: "Virtual Telehealth Network",
    },
    {
      title: "Attending Telehealth Doctors & Clinical Leads",
      subtitle:
        "Personalized online recovery roadmaps for stroke, orthopedic rehabilitation, mental health, and neurological wellness.",
      stat: "24/7 Nationwide Access",
      badge: "Board-Certified Doctors",
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login(email || "sarah.j@example.com", "patient");
      setLoading(false);
      router.push("/patient/dashboard");
    }, 450);
  };

  const handleQuickDemo = (
    role: UserRole,
    target: "myself" | "family" = "myself",
  ) => {
    switchRole(role, target);
    if (role === "admin") router.push("/admin/dashboard");
    else if (role === "coordinator") router.push("/coordinator/dashboard");
    else if (role === "family" || target === "family")
      router.push("/dashboard/family");
    else router.push("/patient/dashboard");
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col justify-between selection:bg-[var(--gold)] selection:text-black py-6 sm:py-10 px-4 sm:px-6">
      {/* Top Header Bar */}
      <header className="max-w-6xl mx-auto w-full flex items-center justify-between pb-6">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-3 group text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)] shadow-sm group-hover:border-[var(--gold)] transition-colors">
            <span className="font-cinzel font-bold text-lg">RN</span>
          </div>
          <div>
            <span className="font-cinzel font-bold text-lg tracking-wider text-[var(--foreground)] block">
              REHAB <span className="text-[var(--gold)]">NIGERIA</span>
            </span>
            <span className="text-[10px] tracking-widest uppercase text-[var(--foreground-subtle)] block">
              Clinical Coordination Network
            </span>
          </div>
        </button>

        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Home</span>
        </button>
      </header>

      {/* Main Split Modern Card (Matching Reference Layout) */}
      <main className="max-w-6xl mx-auto w-full my-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-[var(--background-secondary)] rounded-[28px] sm:rounded-[32px] border border-[var(--border)] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 relative"
        >
          {/* Left Form Column */}
          <div className="lg:col-span-6 p-6 sm:p-10 xl:p-12 flex flex-col justify-between space-y-6">
            {/* Brand icon / subtle header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--background-tertiary)] text-[var(--gold)] text-xs font-medium border border-[var(--border-subtle)]">
                <HeartHandshake className="w-3.5 h-3.5" />
                <span>Recovery Portal Login</span>
              </div>

              <div className="space-y-1.5">
                <h1 className="font-cinzel font-bold text-3xl sm:text-4xl text-[var(--foreground)] tracking-tight">
                  Welcome Back!
                </h1>
                <p className="text-xs sm:text-sm text-[var(--foreground-muted)]">
                  Please Log in to your clinical recovery account.
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Input */}
              <div className="space-y-1.5">
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
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-semibold text-[var(--foreground)]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => router.push("/forgot-password")}
                    className="text-[11px] font-medium text-[var(--gold)] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-3" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none transition-all"
                  />
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between text-xs pt-0.5">
                <label className="flex items-center gap-2 text-[var(--foreground-muted)] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded bg-[var(--background-tertiary)] border-[var(--border)] text-[var(--gold)] focus:ring-[var(--gold)]"
                  />
                  <span>Remember me</span>
                </label>
              </div>

              {/* Action Buttons: Login + Create Account (Matching reference layout) */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:flex-1 py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <span>Login</span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => router.push("/register")}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--background-tertiary)]/80 text-[var(--foreground)] border border-[var(--border)] font-semibold text-xs transition-colors text-center whitespace-nowrap"
                >
                  Create account
                </button>
              </div>
            </form>

            {/* Quick Demo Switcher (Instant 1-click test for all 4 roles) */}
            <div className="pt-4 border-t border-[var(--border)] space-y-2.5">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[var(--gold)]">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Quick Dashboard Switcher
                </span>
                <span className="text-[10px] text-[var(--foreground-subtle)] lowercase font-normal">
                  (1-click testing)
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => handleQuickDemo("patient", "myself")}
                  className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--gold)] text-left transition-colors"
                >
                  <div className="flex items-center gap-1 text-[var(--gold)] font-bold text-[11px] mb-0.5">
                    <User className="w-3 h-3" /> Patient
                  </div>
                  <span className="text-[10px] text-[var(--foreground-muted)] block truncate">
                    Sarah (Post-Op)
                  </span>
                </button>

                <button
                  onClick={() => handleQuickDemo("family", "family")}
                  className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--green)] text-left transition-colors"
                >
                  <div className="flex items-center gap-1 text-[var(--green)] font-bold text-[11px] mb-0.5">
                    <Users className="w-3 h-3" /> Family
                  </div>
                  <span className="text-[10px] text-[var(--foreground-muted)] block truncate">
                    David (Caregiver)
                  </span>
                </button>

                <button
                  onClick={() => handleQuickDemo("coordinator")}
                  className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[#3B828E] text-left transition-colors"
                >
                  <div className="flex items-center gap-1 text-[#3B828E] font-bold text-[11px] mb-0.5">
                    <Stethoscope className="w-3 h-3" /> Doctor Lead
                  </div>
                  <span className="text-[10px] text-[var(--foreground-muted)] block truncate">
                    Dr. Amara, MD
                  </span>
                </button>

                <button
                  onClick={() => handleQuickDemo("admin")}
                  className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--gold-light)] text-left transition-colors"
                >
                  <div className="flex items-center gap-1 text-[var(--gold-light)] font-bold text-[11px] mb-0.5">
                    <Shield className="w-3 h-3" /> Admin
                  </div>
                  <span className="text-[10px] text-[var(--foreground-muted)] block truncate">
                    Victoria
                  </span>
                </button>
              </div>
            </div>

            {/* Terms & Privacy Policy Note */}
            <p className="text-[10px] text-[var(--foreground-subtle)] leading-relaxed text-center sm:text-left">
              By signing in, you agree to Rehab Nigeria's clinical telehealth
              terms and verify that you have reviewed our confidential NDPR
              health data policy.
            </p>
          </div>

          {/* Right Image Aside (Bigger Screen Match with Visual Sanctuary Artwork) */}
          <div className="lg:col-span-6 p-4 sm:p-5 hidden lg:flex flex-col relative">
            <div className="w-full h-full min-h-[560px] rounded-[24px] sm:rounded-[28px] overflow-hidden relative border border-[var(--border-subtle)] bg-[var(--background-tertiary)] flex flex-col justify-between p-8">
              {/* Background Online Telehealth Image with subtle zoom on hover */}
              <Image
                src="https://images.unsplash.com/photo-1758721735744-2b6f0e6c4e2d?auto=format&fit=crop&w=1200&q=80"
                alt="Rehab Nigeria Online Telehealth consultation"
                fill
                priority
                sizes="(max-width: 1024px) 0vw, 50vw"
                className="absolute inset-0 w-full h-full object-cover object-center scale-105 hover:scale-100 transition-transform duration-700 brightness-95"
                referrerPolicy="no-referrer"
              />

              {/* Gradient Vignettes for text legibility and rich atmosphere */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 pointer-events-none" />
              <div className="absolute inset-0 bg-black/20 pointer-events-none" />

              {/* Floating Decorative Gold Circle Accent (matching the reference design!) */}
              <div className="absolute top-1/2 -left-4 -translate-y-1/2 z-20 hidden lg:flex items-center justify-center w-9 h-9 rounded-full bg-[var(--gold)] text-black shadow-lg shadow-[var(--gold)]/30 border-2 border-[var(--background-secondary)] cursor-pointer hover:scale-110 transition-transform">
                <ArrowRight className="w-4 h-4" />
              </div>

              {/* Top Floating Badge on Image */}
              <div className="relative z-10 flex items-center justify-between">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md text-[var(--gold)] text-xs font-semibold border border-white/10 shadow-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--green)]" />
                  <span>{sanctuarySlides[activeSlide].badge}</span>
                </div>

                <div className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 text-[11px] font-mono border border-white/10">
                  100% Online • Nationwide & Global
                </div>
              </div>

              {/* Bottom Testimonial & Pagination Info Card */}
              <div className="relative z-10 space-y-4">
                <div className="p-5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-xl space-y-2">
                  <div className="flex items-center gap-2 text-[var(--gold)] text-xs font-bold">
                    <Award className="w-4 h-4" />
                    <span>{sanctuarySlides[activeSlide].stat}</span>
                  </div>
                  <h3 className="font-cinzel font-bold text-lg text-white leading-snug">
                    {sanctuarySlides[activeSlide].title}
                  </h3>
                  <p className="text-xs text-white/80 leading-relaxed">
                    {sanctuarySlides[activeSlide].subtitle}
                  </p>
                </div>

                {/* Bottom navigation arrows / indicator (matching reference image) */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === 0 ? "w-6 bg-[var(--gold)]" : "w-2 bg-white/40"}`}
                    />
                    <div
                      className={`h-1.5 rounded-full transition-all duration-300 ${activeSlide === 1 ? "w-6 bg-[var(--gold)]" : "w-2 bg-white/40"}`}
                    />
                  </div>

                  <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md p-1 rounded-xl border border-white/10">
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlide((prev) => (prev === 0 ? 1 : 0))
                      }
                      className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      title="Previous"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-[11px] font-mono font-bold text-[var(--gold)] px-1.5">
                      0{activeSlide + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setActiveSlide((prev) => (prev === 1 ? 0 : 1))
                      }
                      className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      title="Next"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer Info */}
      <footer className="max-w-6xl mx-auto w-full pt-6 text-center text-xs text-[var(--foreground-subtle)] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span>
          © {new Date().getFullYear()} Rehab Nigeria Healthcare Network.
          Confidential Patient Records.
        </span>
        <div className="flex items-center gap-4 text-xs">
          <button
            onClick={() => router.push("/privacy-policy")}
            className="hover:text-[var(--gold)] transition-colors"
          >
            Privacy
          </button>
          <button
            onClick={() => router.push("/terms-of-use")}
            className="hover:text-[var(--gold)] transition-colors"
          >
            Terms
          </button>
          <button
            onClick={() => router.push("/contact")}
            className="hover:text-[var(--gold)] transition-colors"
          >
            Support Desk
          </button>
        </div>
      </footer>
    </div>
  );
};
