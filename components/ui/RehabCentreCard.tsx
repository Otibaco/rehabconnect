'use client'
import React from 'react';
import { MapPin, Star, ShieldCheck, BedDouble, Check, ArrowUpRight } from 'lucide-react';
import { RehabCentre } from '@/lib/types';
import { useRouter } from 'next/navigation';

export const RehabCentreCard: React.FC<{ centre: RehabCentre }> = ({ centre }) => {
  const router = useRouter();

  return (
    <div className="group rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1">
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={centre.image}
          alt={centre.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {centre.verified && (
          <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-teal-400 text-[11px] font-semibold px-3 py-1 rounded-full border border-teal-500/30 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
            <span>Verified Partner</span>
          </div>
        )}

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
          <span className="flex items-center gap-1 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-slate-700/50">
            <MapPin className="w-3 h-3 text-teal-400" />
            {centre.location}
          </span>
          <span className="flex items-center gap-1 bg-amber-500/90 text-slate-950 font-bold px-2.5 py-1 rounded-full shadow-sm">
            <Star className="w-3 h-3 fill-slate-950" />
            {centre.rating} ({centre.reviewsCount})
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div>
          <h4 className="font-heading font-bold text-xl text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
            {centre.name}
          </h4>

          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
            <BedDouble className="w-4 h-4 text-slate-400" />
            <span>{centre.capacity}</span>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 line-clamp-3 leading-relaxed">
            {centre.description}
          </p>

          {/* Specialties tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {centre.specialties.map((spec) => (
              <span
                key={spec}
                className="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700/60"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Key Features list */}
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
            {centre.features.slice(0, 3).map((feat) => (
              <div key={feat} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                <Check className="w-3.5 h-3.5 text-teal-500 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action button */}
        <div className="pt-2">
          <button
            onClick={() => router.push('/assessment')}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 dark:hover:bg-teal-600 text-slate-800 dark:text-slate-200 hover:text-white dark:hover:text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all duration-200 group-hover:bg-teal-600 group-hover:text-white"
          >
            <span>Request Placement Referral</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
