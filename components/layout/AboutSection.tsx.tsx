'use client';

import React from 'react';
import Image from 'next/image';

interface AboutSectionProps {
  onOurProgramsClick?: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOurProgramsClick }) => {
  return (
    <section className="relative w-full overflow-hidden bg-white py-16 transition-colors duration-300 sm:py-24 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start lg:col-span-6">
            
            {/* Tagline */}
            <span className="text-xs font-bold uppercase tracking-wider text-[#31A8D3] dark:text-[#42c5f5]">
              ABOUT US
            </span>

            {/* Heading */}
            <h2 className="font-heading mt-2 text-3xl font-extrabold tracking-tight text-[#162A45] sm:text-4xl lg:text-[2.65rem] lg:leading-[1.2] dark:text-slate-100">
              Welcome to <br />
              Synapse Services
            </h2>

            {/* Paragraph Content */}
            <div className="mt-6 space-y-4 text-sm font-normal leading-relaxed text-slate-600 sm:text-base dark:text-slate-300">
              <p className="font-medium text-slate-700 dark:text-slate-200">
                ...some of life’s toughest challenges are our speciality.
              </p>
              <p>
                Synapse Services has provided well over a decade of high-quality specialist mental health care services in Nigeria. It is the largest private mental health care provider in West Africa, with a combined bed of over 110 beds. It is an outcome-driven service.
              </p>
              <p>
                When life is more than you can bear mentally, rest assured you will find hope, support, and treatment at Synapse Services. We provide exceptional care for people of all ages. Everyone is on a journey and deserves to be understood and supported. We don’t see you as a patient but as an individual functioning within a family unit that relates to your environment and community. You have a past, present, and future that forms components of your recovery journey. If you let us into your space, we will support you and walk your journey with you by providing professional support to you.
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={onOurProgramsClick}
              className="mt-8 inline-flex items-center justify-center rounded bg-[#2ba8d6] px-7 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#2292bc] active:scale-95 dark:bg-[#31a8d3] dark:hover:bg-[#2597c0]"
            >
              Our Programs
            </button>
          </div>

          {/* RIGHT COLUMN: Asymmetric Image Collage */}
          <div className="relative mt-8 lg:col-span-6 lg:mt-0">
            <div className="relative mx-auto min-h-[480px] w-full max-w-lg lg:max-w-none">
              
              {/* Top-Right Dotted Pattern Accent */}
              <div className="absolute -top-6 right-4 z-0 h-28 w-28 text-[#31A8D3]/30 sm:right-12">
                <svg width="100%" height="100%" fill="none">
                  <pattern id="dot-pattern-top" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="2.5" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dot-pattern-top)" />
                </svg>
              </div>

              {/* Bottom-Left Dotted Pattern Accent */}
              <div className="absolute -bottom-6 left-2 z-0 h-32 w-32 text-[#31A8D3]/30 sm:left-12">
                <svg width="100%" height="100%" fill="none">
                  <pattern id="dot-pattern-bottom" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse">
                    <circle cx="3" cy="3" r="2.5" fill="currentColor" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#dot-pattern-bottom)" />
                </svg>
              </div>

              {/* IMAGE 1: Top-Left Overlay Card (Patient sitting with doctor blur foreground) */}
              <div className="absolute left-0 top-0 z-20 w-[62%] overflow-hidden rounded-md shadow-lg transition-transform hover:scale-[1.01]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80"
                    alt="Clinical Consultation"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 60vw, 30vw"
                  />
                </div>
              </div>

              {/* IMAGE 2: Bottom-Left Overlay Card (Medical staff meeting) */}
              <div className="absolute bottom-4 left-6 z-20 w-[48%] overflow-hidden rounded-md shadow-lg transition-transform hover:scale-[1.01]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80"
                    alt="Medical team planning"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 45vw, 25vw"
                  />
                </div>
              </div>

              {/* IMAGE 3: Right Tall Main Card (People talking on couch with laptops) */}
              <div className="absolute right-0 top-12 z-10 w-[55%] overflow-hidden rounded-md shadow-xl transition-transform hover:scale-[1.01]">
                <div className="relative aspect-[3/4] w-full">
                  <Image
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Group therapy and discussion"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 55vw, 28vw"
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