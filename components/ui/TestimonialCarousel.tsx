'use client'
import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Building2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '@/lib/data/mockData';

export const TestimonialCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white rounded-3xl p-8 md:p-12 overflow-hidden shadow-2xl border border-slate-800">
      {/* Background glow */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold border border-teal-500/30">
            <Quote className="w-3.5 h-3.5" />
            <span>Human Recovery Stories</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              aria-label="Previous story"
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-slate-400">
              {currentIndex + 1} / {TESTIMONIALS.length}
            </span>
            <button
              onClick={handleNext}
              aria-label="Next story"
              className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
          >
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-1 text-amber-400">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {current.storyTitle && (
                <h4 className="font-heading font-bold text-2xl md:text-3xl text-white tracking-tight">
                  "{current.storyTitle}"
                </h4>
              )}

              <blockquote className="text-base md:text-xl text-slate-200 leading-relaxed font-serif italic">
                "{current.quote}"
              </blockquote>

              <div className="pt-2 flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.author}
                  className="w-14 h-14 rounded-full object-cover ring-4 ring-teal-500/30 shadow-md"
                />
                <div>
                  <h5 className="font-heading font-bold text-lg text-white">{current.author}</h5>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-teal-300 font-semibold">
                      {current.role}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      {current.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {current.centreName && (
              <div className="lg:col-span-4 bg-slate-800/80 rounded-2xl p-6 border border-slate-700/80 space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-400">
                  <Building2 className="w-4 h-4" />
                  <span>Placed Facility</span>
                </div>
                <h6 className="font-heading font-bold text-lg text-white">{current.centreName}</h6>
                <p className="text-xs text-slate-400">
                  Verified inpatient rehabilitation facility operating under strict Ministry & CARF medical standards.
                </p>
                <div className="pt-2">
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active Verified Partner
                  </span>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Carousel indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-teal-400' : 'w-2 bg-slate-700 hover:bg-slate-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
