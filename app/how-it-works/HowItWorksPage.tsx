'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import {
  ClipboardList,
  Stethoscope,
  UserCheck,
  Building2,
  Heart,
  ArrowRight,
  Shield,
  Clock,
  MessageCircle,
  Phone,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import type { Variants, Transition } from 'framer-motion';

// ---------------------------------------------------------------------------
// Animation Variants
// ---------------------------------------------------------------------------

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const childTransition: Transition = {
  duration: 0.5,
  ease: [0.25, 0.4, 0.25, 1],
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: childTransition },
};

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const steps = [
  {
    number: '01',
    icon: <ClipboardList className="w-6 h-6" />,
    title: 'Tell us your need',
    description:
      'Complete a brief, confidential assessment online or by phone. It takes about two minutes and helps us understand your situation.',
    details: [
      'Share as much or as little as you\'re comfortable with',
      'Available 24/7 — complete it on your own time',
      'No commitment required at this stage',
    ],
    images: [
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80',
    ],
    alt: 'Person completing a confidential online assessment',
  },
  {
    number: '02',
    icon: <Stethoscope className="w-6 h-6" />,
    title: 'Clinical review',
    description:
      'A dedicated care coordinator reviews your history, preferences, and goals to understand exactly what kind of support you need.',
    details: [
      'Personalised review by a trained professional',
      'We consider clinical needs, location, and budget',
      'You\'ll have a clear picture within 48 hours',
    ],
    images: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80',
    ],
    alt: 'Care coordinator reviewing clinical information',
  },
  {
    number: '03',
    icon: <UserCheck className="w-6 h-6" />,
    title: 'Meet your coordinator',
    description:
      'Connect via encrypted video call or telephone with your personal care coordinator to discuss options and ask questions.',
    details: [
      'Confidential, one-on-one conversation',
      'Ask anything — no question is too small',
      'Available during business hours and some evenings',
    ],
    images: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=1200&q=80',
    ],
    alt: 'Video consultation with a care coordinator',
  },
  {
    number: '04',
    icon: <Building2 className="w-6 h-6" />,
    title: 'Verified placement',
    description:
      'Receive tailored recommendations for accredited rehabilitation centres that match your specific needs and preferences.',
    details: [
      'All centres are pre-vetted and regularly reviewed',
      'Compare options side by side',
      'We handle the coordination and paperwork',
    ],
    images: [
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    ],
    alt: 'Modern rehabilitation centre facility',
  },
  {
    number: '05',
    icon: <Heart className="w-6 h-6" />,
    title: 'Recovery & aftercare',
    description:
      'Begin your programme with confidence. Your coordinator remains available for advocacy and support throughout your journey.',
    details: [
      'Continuous support during admission',
      'Regular check-ins to ensure everything is on track',
      'Aftercare planning for long-term success',
    ],
    images: [
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80',
    ],
    alt: 'Supportive recovery and aftercare session',
  },
];

const features = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: '100% confidential',
    description: 'Everything you share is encrypted and never disclosed without your consent.',
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: 'Fast matching',
    description: 'Most people receive verified recommendations within 48 hours.',
  },
  {
    icon: <MessageCircle className="w-5 h-5" />,
    title: 'Human-guided',
    description: 'Real care coordinators, not algorithms — empathy at every step.',
  },
  {
    icon: <Star className="w-5 h-5" />,
    title: 'No cost to you',
    description: 'Our coordination service is completely free for individuals and families.',
  },
];

const testimonials = [
  {
    quote: 'I had no idea where to start. Within two days, RehabConnect gave me clarity and connected us with a centre that felt right.',
    name: 'Adebimpe O.',
    location: 'Lagos',
  },
  {
    quote: 'The coordinator listened without judgement. She understood exactly what my brother needed and made the process feel human.',
    name: 'Tunde B.',
    location: 'Abuja',
  },
];

// ---------------------------------------------------------------------------
// Image Carousel Component
// ---------------------------------------------------------------------------

const ImageCarousel: React.FC<{ images: string[]; alt: string }> = ({ images, alt }) => {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [images.length]);

  const goTo = (index: number) => {
    setCurrent(index);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
  };

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  return (
    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[var(--color-surface-muted)] group">
      {/* Images */}
      {images.map((src, idx) => (
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: idx === current ? 1 : 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
        >
          <Image
            src={src}
            alt={`${alt} — image ${idx + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </motion.div>
      ))}

      {/* Subtle overlay for text readability if needed */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />

      {/* Navigation arrows */}
      <button
        onClick={goPrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 flex items-center justify-center text-[var(--color-text)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm hover:bg-white"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={goNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm border border-white/40 flex items-center justify-center text-[var(--color-text)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm hover:bg-white"
        aria-label="Next image"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to image ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? 'w-5 h-1.5 bg-white shadow-sm'
                : 'w-1.5 h-1.5 bg-white/60 hover:bg-white/90'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Step Card Component
// ---------------------------------------------------------------------------

const StepCard: React.FC<{ step: typeof steps[0]; index: number }> = ({ step, index }) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      variants={childVariants}
      className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
        !isEven ? 'lg:grid-flow-dense' : ''
      }`}
    >
      {/* Content */}
      <div className={`lg:col-span-5 ${!isEven ? 'lg:col-start-8' : ''}`}>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[var(--color-accent)] opacity-25">
              {step.number}
            </span>
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
              {step.icon}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
            {step.title}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
            {step.description}
          </p>
          <ul className="space-y-2">
            {step.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-[var(--color-text-muted)]">
                <span className="mt-1 w-1 h-1 rounded-full bg-[var(--color-accent)]/50 shrink-0" />
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Image Carousel */}
      <div className={`lg:col-span-6 ${!isEven ? 'lg:col-start-1' : 'lg:col-start-7'}`}>
        <ImageCarousel images={step.images} alt={step.alt} />
      </div>
    </motion.div>
  );
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function HowItWorksPage() {
  return (
    <main className="bg-[var(--color-bg)]">
      
      {/* ── Page Header ── */}
      <section className="relative pt-20 pb-12 sm:pt-28 sm:pb-16 overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -right-32 w-[400px] h-[400px] rounded-full opacity-[0.05] blur-[120px]" style={{ background: 'var(--color-hero-glow)' }} />
        
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="space-y-4 text-center"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex items-center justify-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                <ClipboardList className="w-4 h-4" />
              </span>
              <span className="text-xs font-medium tracking-wide text-[var(--color-accent)] uppercase">
                How it works
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-bold tracking-tight text-[var(--color-text)] leading-[1.12]">
              A clear path to
              <br />
              <span className="text-[var(--color-accent)]">the right care</span>
            </h1>
            <p className="text-sm sm:text-base text-[var(--color-text-muted)] leading-relaxed max-w-lg mx-auto">
              Five simple steps from where you are now to a verified rehabilitation 
              centre that fits your needs. Guided by real people, every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Steps ── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="space-y-24 lg:space-y-32"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {steps.map((step, index) => (
              <StepCard key={step.number} step={step} index={index} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features Grid ── */}
      <section className="pb-20 sm:pb-28 bg-[var(--color-section-soft)]">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20 sm:py-28">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
              Why people trust RehabConnect
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {features.map((feature) => (
              <motion.div
                key={feature.title}
                variants={childVariants}
                className="flex flex-col gap-3 p-5 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]"
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                  {feature.icon}
                </span>
                <h3 className="text-sm font-semibold text-[var(--color-text)]">{feature.title}</h3>
                <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--color-text)]">
              Voices of people we&apos;ve helped
            </h2>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.name}
                variants={childVariants}
                className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] space-y-4"
              >
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 text-[var(--color-accent)] fill-current" />
                  ))}
                </div>
                <p className="text-sm text-[var(--color-text)] leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text)]">{t.name}</p>
                  <p className="text-[11px] text-[var(--color-text-muted)]">{t.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-3xl px-6 sm:px-8 lg:px-12">
          <motion.div
            className="rounded-2xl bg-[var(--color-section-soft)] border border-[var(--color-border)] p-8 sm:p-10 text-center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.55, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
              <Phone className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-[var(--color-text)]">
              Ready to get started?
            </h2>
            <p className="mt-2 text-sm text-[var(--color-text-muted)] max-w-md mx-auto">
              Take the first step today. It&apos;s free, confidential, and takes just two minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6">
              <a
                href="/assessment"
                className="inline-flex items-center gap-2 theme-btn-primary px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
              >
                Start your assessment
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 theme-btn-ghost px-6 py-3 text-sm font-medium rounded-xl transition-all duration-200 active:scale-[0.98]"
              >
                Talk to a coordinator
              </a>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}