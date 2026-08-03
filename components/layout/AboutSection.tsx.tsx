'use client';

import React from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  onOurProgramsClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOurProgramsClick }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[var(--color-bg)] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-12">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start lg:col-span-6">
            
            {/* Subtle label — no uppercase shouting */}
            <span className="inline-block text-sm font-medium tracking-wide text-[var(--color-accent)]">
              About RehabConnect
            </span>

            {/* Heading */}
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--color-text)] sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
              Your partner in
              <br />
              <span className="text-[var(--color-accent)]">recovery and renewal</span>
            </h2>

            {/* Body copy — restrained, confident, warm */}
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[var(--color-text-muted)] sm:text-base">
              <p>
                Finding the right rehabilitation centre shouldn't feel overwhelming.
                RehabConnect brings clarity, compassion, and confidence to your search —
                matching you with verified facilities that truly understand your needs.
              </p>
              <p>
                We work with a carefully vetted network of rehabilitation centres across
                the country. Every facility in our platform meets rigorous standards for
                clinical excellence, safety, and patient-centred care. Whether you're
                seeking support for yourself or someone you love, our care coordinators
                are here to guide you — confidentially and without judgement.
              </p>
              <p>
                Recovery is personal. It takes time, trust, and the right environment.
                RehabConnect helps you compare options, ask the right questions, and
                take that first step with confidence. You're not alone in this — we'll
                help you find the place where healing begins.
              </p>
            </div>

            {/* CTA */}
            <button
              onClick={onOurProgramsClick}
              className="mt-8 inline-flex items-center justify-center rounded-xl px-7 py-3 text-sm font-medium theme-btn-primary transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            >
              Explore our approach
            </button>
          </div>

          {/* RIGHT COLUMN: Refined Image Collage */}
          <div className="relative mt-8 lg:col-span-6 lg:mt-0">
            <div className="relative mx-auto min-h-[480px] w-full max-w-lg lg:max-w-none">
              
              {/* Top-right dot accent — softer */}
              <div className="absolute -top-6 right-6 z-0 h-24 w-24 text-[var(--color-accent)] opacity-20 sm:right-16">
                <svg width="100%" height="100%" fill="none">
                  <pattern id="dot-pattern-top-about" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2.5" cy="2.5" r="2" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dot-pattern-top-about)" />
                </svg>
              </div>

              {/* Bottom-left dot accent — softer */}
              <div className="absolute -bottom-6 left-4 z-0 h-28 w-28 text-[var(--color-accent)] opacity-20 sm:left-16">
                <svg width="100%" height="100%" fill="none">
                  <pattern id="dot-pattern-bottom-about" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <circle cx="2.5" cy="2.5" r="2" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dot-pattern-bottom-about)" />
                </svg>
              </div>

              {/* IMAGE 1: Top-left — intimate, calm */}
              <div className="absolute left-0 top-0 z-20 w-[58%] overflow-hidden rounded-xl theme-shadow transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                    alt="Compassionate consultation with a care coordinator"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 55vw, 28vw"
                  />
                </div>
              </div>

              {/* IMAGE 2: Bottom-left — human, grounded */}
              <div className="absolute bottom-6 left-8 z-20 w-[45%] overflow-hidden rounded-xl theme-shadow transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                    alt="Supportive group session"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 42vw, 22vw"
                  />
                </div>
              </div>

              {/* IMAGE 3: Right — confident, forward-looking */}
              <div className="absolute right-0 top-14 z-10 w-[52%] overflow-hidden rounded-xl theme-shadow transition-transform duration-300 hover:scale-[1.02]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="One-on-one therapy discussion"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;