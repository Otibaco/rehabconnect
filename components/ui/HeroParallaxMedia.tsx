'use client'
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles, Activity, CheckCircle2 } from 'lucide-react';

export interface BackgroundSlide {
  id: string;
  image: string;
  title: string;
  location?: string;
  tag?: string;
}

export const DEFAULT_SLIDES: BackgroundSlide[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80',
    title: 'Advanced Physical Therapy Suite',
    location: 'Lagos Care Sanctuary',
    tag: 'Accredited Facility',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80',
    title: 'Empathetic Clinical Consultations',
    location: 'Abuja Medical Centre',
    tag: 'Certified Care Leads',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1920&q=80',
    title: 'Holistic Neuro-Rehab & Recovery',
    location: 'Victoria Island Campus',
    tag: 'Full Spectrum Care',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80',
    title: 'Serene Healing Environments',
    location: 'Port Harcourt Retreat',
    tag: 'Private & Confidential',
  },
];

interface HeroParallaxMediaProps {
  badgeText?: string;
  title: React.ReactNode;
  subtitle: string;
  primaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  slides?: BackgroundSlide[];
  videoUrl?: string;
  mediaType?: 'video' | 'slideshow';
  floatingCard?: React.ReactNode;
  stats?: { value: string; label: string }[];
}

export const HeroParallaxMedia: React.FC<HeroParallaxMediaProps> = ({
  badgeText = 'Verified Healthcare & Rehabilitation Network',
  title,
  subtitle,
  primaryCtaText = 'Start Confidential Assessment',
  onPrimaryCtaClick,
  secondaryCtaText = 'Explore Partner Facilities',
  onSecondaryCtaClick,
  slides = DEFAULT_SLIDES,
  videoUrl = 'https://assets.mixkit.co/videos/preview/mixkit-doctor-checking-a-patients-arm-42934-large.mp4',
  mediaType = 'slideshow',
  floatingCard,
  stats = [
    { value: '1,250+', label: 'Patients Placed' },
    { value: '98.4%', label: 'Family Satisfaction' },
    { value: '100%', label: 'Verified Centres' },
  ],
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoError, setVideoError] = useState(false);

  // Parallax Scroll calculations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  // Slideshow auto-advance every 3.5 seconds (3500ms)
  useEffect(() => {
    if (mediaType !== 'slideshow' || !slides || slides.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [mediaType, slides]);

  return (
    <div
      ref={containerRef}
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-950 pt-28 pb-16"
    >
      {/* Background Parallax Layer */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[120%] -top-[10%] z-0">
        {mediaType === 'video' && !videoError ? (
          <div className="relative w-full h-full">
            <video
              autoPlay
              loop
              muted
              playsInline
              onError={() => setVideoError(true)}
              className="w-full h-full object-cover object-center scale-105 filter brightness-[0.7] contrast-[1.05]"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
            {/* Dark overlay gradients for contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/50 to-transparent" />
          </div>
        ) : (
          <div className="relative w-full h-full">
            <AnimatePresence mode="wait">
              {slides[currentSlide] && (
                <motion.img
                  key={slides[currentSlide].id || currentSlide}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title || 'Rehabilitation center slide'}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                  className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.08]"
                />
              )}
            </AnimatePresence>
            {/* Multi-layered lighting overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-950/45" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/40 to-slate-950/75" />
          </div>
        )}
      </motion.div>

      {/* Hero Content Overlay */}
      <motion.div
        style={{ y: contentY, opacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Copy Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-semibold backdrop-blur-md"
            >
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>{badgeText}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
            </motion.div>

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]"
            >
              {title}
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-slate-200/90 max-w-2xl font-light leading-relaxed"
            >
              {subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              {onPrimaryCtaClick && (
                <button
                  onClick={onPrimaryCtaClick}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 group"
                >
                  <Sparkles className="w-5 h-5 text-teal-100 group-hover:rotate-12 transition-transform" />
                  <span>{primaryCtaText}</span>
                </button>
              )}

              {onSecondaryCtaClick && (
                <button
                  onClick={onSecondaryCtaClick}
                  className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm sm:text-base border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2"
                >
                  <span>{secondaryCtaText}</span>
                </button>
              )}
            </motion.div>

            {/* Live Stats */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg"
              >
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-0.5">
                    <div className="font-heading font-extrabold text-xl sm:text-2xl text-teal-300">
                      {stat.value}
                    </div>
                    <div className="text-[11px] sm:text-xs text-slate-300 font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Right Floating Visual Card */}
          <div className="lg:col-span-5 relative">
            {floatingCard || (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="rounded-3xl bg-slate-900/80 border border-slate-700/60 p-6 sm:p-7 backdrop-blur-xl shadow-2xl space-y-5 text-white"
              >
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center border border-teal-500/30">
                      <Activity className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-sm text-white">Live Referral Pathway</h4>
                      <p className="text-xs text-slate-400">Step-by-step verified care flow</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider">
                    Active System
                  </span>
                </div>

                <div className="space-y-3">
                  {[
                    { step: '01', title: 'Free Confidential Assessment', desc: 'Patient or family shares clinical goals & timeline' },
                    { step: '02', title: 'Consultation & Review', desc: 'Assigned Care Coordinator evaluates rehab center matches' },
                    { step: '03', title: 'Digital Referral Code', desc: 'Unique tracking ID (REF-XXXX) sent to chosen facility' },
                    { step: '04', title: 'Verified Admission & Care', desc: 'Facility verifies code upon patient arrival' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-2.5 rounded-xl bg-slate-800/40 border border-slate-800 hover:border-teal-500/30 transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                          {item.title}
                          {idx < 2 && <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />}
                        </div>
                        <div className="text-[11px] text-slate-400 leading-snug">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                  <span>Guaranteed 24-hour response time</span>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Minimalist Slide Indicators (Only shown for image slideshow mode) */}
      {mediaType === 'slideshow' && slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-700/50">
          {slides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              onClick={() => setCurrentSlide(idx)}
              title={`Go to slide ${idx + 1}: ${slide.title || ''}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx ? 'w-6 bg-teal-400' : 'w-2 bg-slate-500 hover:bg-slate-300'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
