"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Eye, EyeOff, Lock, Mail, ShieldCheck, HeartHandshake, Sparkles, Users } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

const CAROUSEL_ITEMS = [
  {
    title: "100% Online Rehabilitation & Doctor Care",
    description: "Nigeria's premier virtual rehabilitation network connecting patients and families with licensed doctors from the comfort of home.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=1200",
    icon: <ShieldCheck className="w-8 h-8" />,
    stat: "99.4% Patient Recovery Satisfaction",
  },
  {
    title: "Attending Telehealth Doctors & Clinical Leads",
    description: "Personalized online recovery roadmaps for stroke, orthopedic rehabilitation, mental health, and neurological wellness.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
    icon: <Users className="w-8 h-8" />,
    stat: "24/7 Nationwide Access",
  },
  {
    title: "Compassionate Care, Anywhere",
    description: "Connecting individuals and families to professional rehabilitation support with dignity, privacy, and clinical guidance.",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1200",
    icon: <HeartHandshake className="w-8 h-8" />,
    stat: "Board-Certified Doctors",
  },
]

export default function SigninPage() {
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev === CAROUSEL_ITEMS.length - 1 ? 0 : prev + 1))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const onSubmit = async (values: FormData) => {
    setIsPending(true)
      toast.success("Signed in successfully")
      router.push("/")
      router.refresh()
    
  }

  return (
    <section className="min-h-screen flex bg-[var(--background)] font-sans overflow-hidden">
      {/* LEFT - Login Form */}
      <div className="w-full lg:w-[48%] bg-[var(--background)] flex flex-col min-h-screen overflow-y-auto px-6 py-8 lg:px-16 lg:py-10">
        <div className="max-w-md w-full mx-auto my-auto">
          {/* Mobile Logo */}
          <Link href="/" className="lg:hidden mb-10 w-fit flex items-center gap-3 select-none">
            <div className="w-10 h-10 rounded-sm bg-[var(--background-secondary)] border border-[var(--border-subtle)] flex items-center justify-center">
              <span className="font-cinzel font-bold text-[var(--gold)] text-lg">RN</span>
            </div>
            <div className="flex flex-col leading-none">
              <h3 className="text-xl font-cinzel font-bold text-[var(--foreground)] tracking-wider">
                REHAB <span className="text-[var(--gold)]">NIGERIA</span>
              </h3>
              <span className="text-[9px] uppercase tracking-[0.15em] text-[var(--foreground-subtle)] font-mono">
                Clinical Coordination Network
              </span>
            </div>
          </Link>

          {/* Header */}
          <div className="space-y-3 mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--background-tertiary)] text-[var(--gold)] text-xs font-mono border border-[var(--border-subtle)]">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>RECOVERY PORTAL LOGIN</span>
            </div>
            <h1 className="font-cinzel text-4xl font-bold text-[var(--foreground)] tracking-tight">
              Welcome Back!
            </h1>
            <p className="text-[var(--foreground-muted)] leading-relaxed text-base font-sans">
              Sign in to continue to your RehabConnect account and access confidential rehabilitation care.
            </p>
          </div>

          <form className="space-y-6">
            <InputField 
              label="Email Address" 
              placeholder="you@example.com" 
              icon={<Mail className="w-4 h-4" />} 
            />
            <InputField 
              label="Password" 
              placeholder="••••••••" 
              type={showPassword ? "text" : "password"} 
              icon={<Lock className="w-4 h-4" />} 
              isPassword 
              showPassword={showPassword} 
              togglePassword={() => setShowPassword(!showPassword)} 
            />

            <div className="flex items-center justify-between gap-4">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" className="w-4 h-4 rounded-sm border-[var(--border)] text-[var(--gold)] focus:ring-[var(--gold)] bg-[var(--background-secondary)]" />
                <span className="text-sm font-mono text-[var(--foreground-muted)]">Remember me</span>
              </label>

              <Link href="/forgot-password" className="text-sm font-mono font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button 
              type="submit" 
              disabled={isPending} 
              className="w-full h-14 rounded-sm bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[var(--background)] font-mono font-bold text-base tracking-wider shadow-[0_4px_20px_rgba(200,164,93,0.15)] hover:shadow-[0_4px_30px_rgba(200,164,93,0.25)] transition-all duration-300"
            >
              {isPending ? "SIGNING IN..." : "SIGN IN"}
              {!isPending && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-sm font-mono text-[var(--foreground-muted)]">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] transition-colors">
                Create one
              </Link>
            </p>
          </div>

          {/* Terms */}
          <div className="mt-6 text-center">
            <p className="text-[10px] font-mono text-[var(--foreground-subtle)] leading-relaxed">
              By signing in, you agree to Rehab Nigeria's clinical telehealth terms and verify that you have reviewed our confidential NDPR health data policy.
            </p>
          </div>
        </div>
      </div>

      {/* =========================================================
          RIGHT SIDE — IMAGE CAROUSEL
      ========================================================= */}
      <div className="hidden lg:block lg:w-[52%] relative overflow-hidden bg-[var(--background-secondary)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={carouselIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <motion.div
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 6, ease: "easeOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${CAROUSEL_ITEMS[carouselIndex].image})` }}
            />

            {/* Overlay - Rehab Nigeria style */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)]/90 via-[var(--background)]/60 to-[var(--background)]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(200,164,93,0.15),transparent_40%)]" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-14">
              {/* Brand */}
              <div className="flex items-center gap-3 select-none">
                <Link href="/" className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-sm bg-[var(--background)]/60 backdrop-blur-sm border border-[var(--border-subtle)] flex items-center justify-center">
                    <span className="font-cinzel font-bold text-[var(--gold)] text-xl">RN</span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <h1 className="font-cinzel text-2xl font-bold tracking-wider text-[var(--foreground)]">
                      REHAB <span className="text-[var(--gold)]">NIGERIA</span>
                    </h1>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--foreground-subtle)] font-mono">
                      Clinical Coordination Network
                    </span>
                  </div>
                </Link>
              </div>

              {/* Carousel Content */}
              <div className="relative z-10 max-w-xl">
                <motion.div 
                  initial={{ opacity: 0, y: 30 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.2, duration: 0.6 }} 
                  className="space-y-8"
                >
                  <div className="w-20 h-20 rounded-sm bg-[var(--background)]/60 backdrop-blur-xl border border-[var(--gold)]/20 flex items-center justify-center text-[var(--gold)] shadow-2xl">
                    {CAROUSEL_ITEMS[carouselIndex].icon}
                  </div>
                  <div className="space-y-5">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[var(--gold)]/10 border border-[var(--gold)]/20 text-[var(--gold)] text-xs font-mono tracking-wider">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{CAROUSEL_ITEMS[carouselIndex].stat}</span>
                    </div>
                    <h2 className="font-cinzel text-4xl font-bold tracking-tight leading-tight text-[var(--foreground)]">
                      {CAROUSEL_ITEMS[carouselIndex].title}
                    </h2>
                    <p className="text-lg leading-relaxed text-[var(--foreground-muted)] font-sans max-w-lg">
                      {CAROUSEL_ITEMS[carouselIndex].description}
                    </p>
                  </div>
                  
                  {/* Carousel Indicators */}
                  <div className="flex items-center gap-3 pt-2">
                    {CAROUSEL_ITEMS.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCarouselIndex(i)}
                        className={cn(
                          "h-1.5 rounded-full transition-all duration-500",
                          i === carouselIndex 
                            ? "w-10 bg-[var(--gold)]" 
                            : "w-2 bg-[var(--foreground-subtle)]/30 hover:bg-[var(--foreground-subtle)]/50"
                        )}
                      />
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Bottom decor */}
              <div className="flex items-center gap-4 text-[10px] font-mono text-[var(--foreground-subtle)]">
                <span>✦ Confidential & Secure</span>
                <span className="w-px h-4 bg-[var(--border-subtle)]" />
                <span>✦ 256-Bit Encrypted</span>
                <span className="w-px h-4 bg-[var(--border-subtle)]" />
                <span>✦ NDPR Compliant</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ============================================================
// INPUT FIELD COMPONENT
// ============================================================
function InputField({ 
  label, 
  placeholder, 
  icon, 
  error, 
  type = "text", 
  // registration, 
  isPassword, 
  showPassword, 
  togglePassword 
}: InputFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs font-mono font-semibold text-[var(--foreground)] tracking-wider ml-1">
        {label}
      </Label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)]">
          {icon}
        </div>
        <Input 
          // {...registration} 
          type={type} 
          placeholder={placeholder} 
          className={cn(
            "h-12 pl-11 pr-12 rounded-sm bg-[var(--background-secondary)] border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/20 transition-all duration-300",
            error && "border-red-500 focus:ring-red-500/20"
          )} 
        />
        {isPassword && (
          <button 
            type="button" 
            onClick={togglePassword} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        )}
      </div>
      {error && <p className="text-xs font-medium text-red-500 ml-1">{error}</p>}
    </div>
  )
}

interface InputFieldProps {
  label: string
  placeholder: string
  icon: React.ReactNode
  error?: string
  type?: string
  // registration: UseFormRegisterReturn
  isPassword?: boolean
  showPassword?: boolean
  togglePassword?: () => void
}