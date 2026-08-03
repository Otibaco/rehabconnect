'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useScroll, useTransform, useInView, animate, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Sparkles } from 'lucide-react';

export interface BackgroundSlide {
  id: string;
  image: string;
  title?: string;
}

export const DEFAULT_SLIDES: BackgroundSlide[] = [
  { id: '1', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80', title: 'Advanced Physical Therapy Suite' },
  { id: '2', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80', title: 'Empathetic Clinical Consultations' },
  { id: '3', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1920&q=80', title: 'Holistic Neuro-Rehab & Recovery' },
  { id: '4', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1920&q=80', title: 'Serene Healing Environments' },
];

function parseStatValue(raw: string) {
  if (!raw) return { prefix: '', target: 0, decimals: 0, suffix: '' };
  const match = raw.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/);
  if (!match) return { prefix: '', target: 0, decimals: 0, suffix: raw };
  const [, prefix, numeric, suffix] = match;
  const decimalPart = numeric.split('.')[1];
  const targetNum = parseFloat(numeric.replace(/,/g, ''));
  return {
    prefix: prefix || '',
    target: isNaN(targetNum) ? 0 : targetNum,
    decimals: decimalPart ? decimalPart.length : 0,
    suffix: suffix || '',
  };
}

const AnimatedStat: React.FC<{ value: string; label: string; live?: boolean }> = ({ value, label, live }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const [display, setDisplay] = useState(0);
  const { prefix, target, decimals, suffix } = parseStatValue(value);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, target]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1.5 sm:items-center">
      <div className="flex items-center gap-1.5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] theme-text-muted">{label}</span>
        {live && <span className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-(--color-accent)" />}
      </div>
      <div className="font-heading text-2xl font-bold tabular-nums theme-text sm:text-3xl md:text-4xl">
        {prefix}
        {display.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}
        <span className="text-(--color-accent)">{suffix}</span>
      </div>
    </div>
  );
};

interface HeroParallaxMediaProps {
  badgeText?: string;
  title: React.ReactNode;
  subtitle: string;
  primaryCtaText?: string;
  onPrimaryCtaClick?: () => void;
  secondaryCtaText?: string;
  onSecondaryCtaClick?: () => void;
  mediaType?: 'auto' | 'video' | 'slideshow';
  videoSrc?: string;
  videoSrcWebm?: string;
  slides?: BackgroundSlide[];
  stats?: { value: string; label: string }[];
}

export const HeroParallaxMedia: React.FC<HeroParallaxMediaProps> = ({
  badgeText = 'Accredited Healthcare & Rehabilitation Network',
  title = (
    <>
      Finding the right path <br className="hidden sm:inline" />
      to recovery starts here.
    </>
  ),
  subtitle = 'RehabConnect helps individuals and families connect with professional rehabilitation support, compassionate Care Coordinators, and verified rehabilitation centres.',
  primaryCtaText = 'Start Confidential Assessment',
  onPrimaryCtaClick,
  secondaryCtaText = 'Explore Partner Facilities',
  onSecondaryCtaClick,
  mediaType = 'auto',
  videoSrc,
  videoSrcWebm,
  slides = DEFAULT_SLIDES,
  stats = [
    { value: '1,250+', label: 'Patients Placed' },
    { value: '98.4%', label: 'Family Satisfaction' },
    { value: '100%', label: 'Verified Centres' },
  ],
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileChecked, setMobileChecked] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    setMobileChecked(true);

    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const handleVideoError = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement>) => {
      const err = e.currentTarget.error;
      const reason = `code ${err?.code ?? '?'}${err?.message ? ` — ${err.message}` : ''} (src: ${videoSrc})`;
      console.error('[HeroParallaxMedia] video failed to load:', reason);
      setVideoError(reason);
    },
    [videoSrc]
  );

  const prefersVideo = mediaType === 'video';
  const prefersSlideshow = mediaType === 'slideshow';
  const hasVideoSource = Boolean(videoSrc);

  const showVideo =
    prefersVideo || (!prefersSlideshow && mobileChecked && !isMobile && !videoError && hasVideoSource);
  const showSlideshow =
    prefersSlideshow || (!prefersVideo && (!mobileChecked || isMobile || !!videoError || !hasVideoSource));

  useEffect(() => {
    if (!showSlideshow || slides.length < 2) return;
    const interval = setInterval(() => setCurrentSlide((p) => (p + 1) % slides.length), 3500);
    return () => clearInterval(interval);
  }, [showSlideshow, slides.length]);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end start'] });
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const transitionOverlay = useTransform(scrollYProgress, [0.3, 1], [0, 0.9]);

  return (
    <div ref={wrapperRef} className="relative overflow-hidden theme-bg theme-text theme-transition">
      <div className="relative flex min-h-svh w-full items-center overflow-hidden theme-bg theme-transition">
        <motion.div style={{ y: bgY, scale: bgScale }} className="absolute inset-0 z-0 h-full w-full">
          {showVideo && (
            <video
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onError={handleVideoError}
              className="h-full w-full object-cover object-center brightness-[0.6] contrast-[1.05]"
            >
              <source src={videoSrc} type="video/mp4" />
              {videoSrcWebm && <source src={videoSrcWebm} type="video/webm" />}
            </video>
          )}

          {showSlideshow && (
            <AnimatePresence mode="wait">
              {slides[currentSlide] && (
                <motion.img
                  key={slides[currentSlide].id}
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title || 'Rehabilitation center'}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 1.1, ease: 'easeInOut' }}
                  className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.6] contrast-[1.08]"
                />
              )}
            </AnimatePresence>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-(--color-bg) via-(--color-bg)/60 to-(--color-bg)/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-(--color-bg)/40 to-(--color-bg)/80" />
          <motion.div style={{ opacity: transitionOverlay }} className="absolute inset-0 bg-(--color-bg)" />
        </motion.div>

        {process.env.NODE_ENV === 'development' && videoError && (
          <div className="absolute left-4 top-24 z-30 max-w-md rounded-lg border border-red-500/40 bg-red-950/90 px-3 py-2 font-mono text-[11px] text-red-200">
            Hero video failed to load, showing carousel fallback — {videoError}
          </div>
        )}

        {showSlideshow && slides.length > 1 && (
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface-card)/70 px-3.5 py-1.5 backdrop-blur-md">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-6 bg-(--color-accent)' : 'w-2 bg-(--color-text-subtle) hover:bg-(--color-text-muted)'
                }`}
              />
            ))}
          </div>
        )}

        <motion.div
          style={{ opacity: contentOpacity }}
          className="relative z-10 mx-auto flex h-full w-full max-w-5xl items-center px-4 pt-28 pb-16 text-center sm:px-6 sm:pt-32 lg:px-8"
        >
          <div className="flex w-full flex-col items-center space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 rounded-full border border-(--color-accent)/30 bg-(--color-accent-soft) px-4 py-1.5 text-xs font-semibold text-(--color-accent) backdrop-blur-md sm:text-sm"
            >
              <ShieldCheck className="h-4 w-4 text-(--color-accent)" />
              <span>{badgeText}</span>
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-(--color-accent)" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-heading text-4xl font-extrabold leading-[1.08] tracking-tight theme-text sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl"
            >
              {title}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="max-w-2xl text-base font-light leading-relaxed theme-text-muted sm:text-lg md:text-xl"
            >
              {subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col items-stretch gap-3.5 pt-2 sm:flex-row sm:items-center sm:justify-center sm:gap-4"
            >
              {onPrimaryCtaClick && (
                <button
                  onClick={onPrimaryCtaClick}
                  className="group flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-(--color-accent) to-(--color-accent-strong) px-7 py-3.5 text-sm font-bold text-(--color-accent-contrast) shadow-xl transition-all hover:-translate-y-0.5 active:translate-y-0 sm:px-9 sm:py-4 sm:text-base"
                >
                  <Sparkles className="h-5 w-5 text-(--color-accent-contrast) transition-transform group-hover:rotate-12" />
                  <span>{primaryCtaText}</span>
                </button>
              )}
              {onSecondaryCtaClick && (
                <button
                  onClick={onSecondaryCtaClick}
                  className="flex items-center justify-center gap-2 rounded-full border border-(--color-border) bg-(--color-surface-card)/80 px-7 py-3.5 text-sm font-semibold theme-text backdrop-blur-md transition-all hover:bg-(--color-surface-muted) sm:px-8 sm:py-4 sm:text-base"
                >
                  <span>{secondaryCtaText}</span>
                </button>
              )}
            </motion.div>

            {stats.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="mt-6 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-6 border-t border-(--color-border) pt-8 sm:gap-x-12 sm:pt-10"
              >
                {stats.map((stat, i) => (
                  <React.Fragment key={i}>
                    {i > 0 && <div className="hidden h-10 w-px bg-(--color-border) sm:block" />}
                    <AnimatedStat value={stat.value} label={stat.label} live={stat.label.toLowerCase().includes('verified')} />
                  </React.Fragment>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};