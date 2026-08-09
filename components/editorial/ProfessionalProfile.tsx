import React from 'react';
import { Award, Calendar, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Professional } from '@/types/type';


interface ProfessionalProfileProps {
  professional: Professional;
}

export const ProfessionalProfile: React.FC<ProfessionalProfileProps> = ({ professional }) => {
  return (
    <div className="bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm p-8 transition-all duration-500 relative overflow-hidden group crosshair-corner">
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-architectural-grid opacity-10 pointer-events-none"></div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
        
        {/* PORTRAIT IMAGE WITH ASYMMETRIC MASK & GOLD FRAME */}
        <div className="lg:col-span-4 relative">
          <div className="relative rounded-t-[80px] rounded-b-sm overflow-hidden border border-[var(--border-subtle)] h-[320px] shadow-2xl">
            <img
              src={professional.image}
              alt={professional.name}
              className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-secondary)] via-transparent to-transparent opacity-80"></div>
            
            {professional.isFounder && (
              <span className="absolute top-4 left-4 bg-[var(--gold)] text-[#080907] px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-wider rounded-sm shadow-xl">
                FOUNDER & MEDICAL DIRECTOR
              </span>
            )}
          </div>

          <div className="absolute -inset-2 border border-[var(--gold)]/20 rounded-t-[86px] rounded-b-sm pointer-events-none -z-10"></div>
        </div>

        {/* DETAILS */}
        <div className="lg:col-span-8 space-y-5">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--gold)]">
              <Award className="w-4 h-4 shrink-0" />
              <span>{professional.credentials}</span>
            </div>

            <h3 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
              {professional.name}
            </h3>

            <p className="text-xs font-mono text-[var(--foreground-subtle)] uppercase tracking-widest">
              {professional.title}
            </p>
          </div>

          <p className="font-sans text-sm text-[var(--foreground-muted)] leading-relaxed">
            {professional.bio}
          </p>

          {/* EXPERTISE TAGS */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono text-[var(--gold)] uppercase tracking-widest block font-bold">
              Specialized Areas of Focus:
            </span>
            <div className="flex flex-wrap gap-2">
              {professional.expertise.map((exp) => (
                <span
                  key={exp}
                  className="px-3 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[11px] font-sans text-[var(--foreground)] rounded-sm"
                >
                  {exp}
                </span>
              ))}
            </div>
          </div>

          {/* CONSULTATION AVAILABILITY */}
          <div className="pt-6 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[var(--green-light)]">
              <CheckCircle2 className="w-4 h-4 text-[var(--green)] shrink-0" />
              <span>AVAILABLE FOR ONLINE CONSULTATION</span>
            </div>

            <Link
              href="/how-it-works"
              className="px-6 py-3 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] text-xs font-mono font-bold tracking-wider rounded-sm transition-colors flex items-center gap-2 shadow-xl"
            >
              <Calendar className="w-4 h-4" />
              <span>BOOK CONSULTATION</span>
            </Link>
          </div>

        </div>

      </div>

    </div>
  );
};

