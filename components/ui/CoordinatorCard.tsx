'use client'
import React from 'react';
import { Star, ShieldCheck, MapPin, Award, CheckCircle2, ArrowRight } from 'lucide-react';
import { CareCoordinator } from '@/lib/types';
import { useRouter } from 'next/navigation';

export const CoordinatorCard: React.FC<{ coordinator: CareCoordinator }> = ({ coordinator }) => {
  const router = useRouter();

  return (
    <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group transform hover:-translate-y-1">
      <div>
        <div className="flex items-start gap-4">
          <div className="relative shrink-0">
            <img
              src={coordinator.avatar}
              alt={coordinator.name}
              className="w-16 h-16 rounded-2xl object-cover ring-2 ring-teal-500/30 group-hover:scale-105 transition-transform"
            />
            {coordinator.verified && (
              <div className="absolute -bottom-1 -right-1 bg-teal-500 text-white rounded-full p-0.5 shadow-sm">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200/60 dark:border-teal-800/60">
                Verified Coordinator
              </span>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{coordinator.rating}</span>
              </div>
            </div>

            <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white mt-1 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors truncate">
              {coordinator.name}
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">
              {coordinator.title}
            </p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
            {coordinator.bio}
          </p>

          <div className="flex flex-wrap gap-1.5">
            {coordinator.specialty.map((spec) => (
              <span
                key={spec}
                className="text-[10px] font-medium px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
              >
                {spec}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-500 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{coordinator.experienceYears} Years</div>
                <div className="text-[10px] text-slate-500">Clinical Practice</div>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-teal-500 shrink-0" />
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{coordinator.casesHandled}+</div>
                <div className="text-[10px] text-slate-500">Cases Guided</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 pt-3">
        <button
          onClick={() => router.push('/assessment')}
          className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
        >
          <span>Book Consultation with {coordinator.name.split(' ')[0]}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
