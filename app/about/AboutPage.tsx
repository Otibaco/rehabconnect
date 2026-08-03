'use client'
import React, { useState } from 'react';

import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  Target,
  Eye,
  Heart,
  Users,
  Award,
  ArrowRight,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { HeroParallaxMedia } from '@/components/ui/HeroParallaxMedia';
import { FadeIn } from '@/components/animations/FadeIn';
import { StaggerContainer } from '@/components/animations/StaggerContainer';

const ABOUT_SLIDES = [
  { id: '1', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1920&q=80', title: 'Clinical Compassion' },
  { id: '2', image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1920&q=80', title: 'Family Advocacy' },
  { id: '3', image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1920&q=80', title: 'State-of-the-Art Care' },
  { id: '4', image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1920&q=80', title: 'Holistic Patient Recovery' },
];

export const AboutPage: React.FC = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedModal, setSelectedModal] = useState<string | null>(null);

  function openModal(type: string): void {
    setSelectedModal(type);
    setIsModalOpen(true);
  }

  return (
    <div className="space-y-24 pb-20">
      {/* 1. Hero Section with Auto-Advancing Image Slideshow */}
      <HeroParallaxMedia
        mediaType="slideshow"
        slides={ABOUT_SLIDES}
        badgeText="Our Story, Mission & Values"
        title={
          <span>
            Bridging human compassion with <br />
            <span className="text-teal-400">clinical excellence.</span>
          </span>
        }
        subtitle="RehabConnect was founded to solve a fundamental problem in healthcare: the overwhelming difficulty individuals and families experience when searching for trustworthy, accredited rehabilitation care."
        primaryCtaText="Start Assessment"
        onPrimaryCtaClick={() => openModal('assessment')}
        secondaryCtaText="Explore Facilities"
        onSecondaryCtaClick={() => router.push('/rehabilitation-centres')}
      />
      

      {/* 2. Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FadeIn direction="right">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 md:p-10 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">Our Mission</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                To simplify the rehabilitation journey by empowering patients and families with independent, accredited clinical care coordination, transparent guidance, and verified network partners.
              </p>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 md:p-10 shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Eye className="w-6 h-6" />
              </div>
              <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">Our Vision</h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                A world where every individual facing neurological, physical, or psychological trauma receives timely, compassionate, and accredited rehabilitation support without administrative friction or uncertainty.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. Core Brand Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
            Our Foundational Values
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The principles that guide every coordinator interaction and facility audit.
          </p>
        </div>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { title: 'Human Compassion', desc: 'Every case is treated with empathy, dignity, and absolute personal respect.', icon: Heart },
            { title: 'Clinical Rigor', desc: 'We only partner with facilities meeting strict Ministry of Health & international standards.', icon: ShieldCheck },
            { title: 'Total Transparency', desc: 'No hidden fees, no commercial bias, and clear upfront cost expectations.', icon: Sparkles },
            { title: 'Patient Advocacy', desc: 'Our care leads remain your personal advocate from intake through full aftercare.', icon: Users },
          ].map((val, i) => {
            const IconComp = val.icon;
            return (
              <div key={i} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <IconComp className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">{val.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{val.desc}</p>
              </div>
            );
          })}
        </StaggerContainer>
      </section>

      {/* 4. Leadership & Healthcare Team */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="font-heading font-extrabold text-3xl text-slate-900 dark:text-white">
            Leadership & Clinical Advisory Board
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Guided by senior medical directors, physical therapy leads, and digital health architects.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: 'Dr. Amara Okafor',
              role: 'Chief Medical Officer & Clinical Lead',
              img: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600',
              bio: 'Former head of neurological rehabilitation with 14+ years managing acute post-stroke and traumatic care pathways.',
            },
            {
              name: 'Sarah Jenkins, RN',
              role: 'Director of Patient Advocacy & Family Care',
              img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600',
              bio: 'Specialist in addiction recovery and family crisis management with 11+ years leading regional health interventions.',
            },
            {
              name: 'David Vance, M.Sc.',
              role: 'Head of Facility Accreditation & Auditing',
              img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=600',
              bio: 'Biomechanics and physical therapy researcher dedicated to verifying residential rehab equipment quality.',
            },
          ].map((leader, i) => (
            <div key={i} className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-md text-center space-y-3">
              <img
                src={leader.img}
                alt={leader.name}
                className="w-24 h-24 rounded-2xl object-cover mx-auto ring-4 ring-teal-500/20"
              />
              <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">{leader.name}</h3>
              <p className="text-xs font-semibold text-teal-600 dark:text-teal-400">{leader.role}</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{leader.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn direction="up">
          <div className="rounded-3xl bg-slate-900 text-white p-10 md:p-14 text-center space-y-6 shadow-2xl border border-slate-800">
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl max-w-xl mx-auto">
              Join us in transforming rehabilitation healthcare access.
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => openModal('assessment')}
                className="px-8 py-4 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-bold text-sm shadow-xl transition-all"
              >
                Start Recovery Consultation
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
          <div className="w-full max-w-md rounded-3xl border border-slate-200/80 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-600 dark:text-teal-400">
                  Recovery Consultation
                </p>
                <h3 className="font-heading text-2xl font-bold text-slate-900 dark:text-white">
                  {selectedModal === 'assessment' ? 'Start your assessment' : 'Let’s talk'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {selectedModal === 'assessment'
                ? 'A care coordinator will contact you shortly to discuss your recovery goals, care needs, and the most suitable accredited facilities.'
                : 'Thanks for your interest. We’ll help you explore the right rehabilitation path.'}
            </p>

            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-full bg-teal-500 px-6 py-3 text-sm font-bold text-white transition hover:bg-teal-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
