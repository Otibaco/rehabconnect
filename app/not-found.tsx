"use client"
import React from 'react';
import { Home, ArrowLeft, Compass, Phone } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center px-4 sm:px-6 py-20 text-center font-sans relative overflow-hidden">
      
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        
        {/* Large 404 Display */}
        <div className="space-y-2">
          <span className="font-mono text-xs text-[var(--gold)] font-bold tracking-widest uppercase block">
            ERROR 404
          </span>
          <h1 className="font-cinzel text-7xl sm:text-8xl font-extrabold text-[var(--foreground)] tracking-tight">
            40<span className="text-[var(--gold)]">4</span>
          </h1>
        </div>

        {/* Description */}
        <div className="space-y-3">
          <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[var(--foreground)]">
            PAGE NOT FOUND
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[var(--foreground-muted)] leading-relaxed">
            The requested page could not be located or may have been moved.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => router.back()}
            className="w-full sm:w-auto px-5 py-3 bg-[var(--background-secondary)] hover:bg-[var(--background-tertiary)] text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--gold)] font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>GO BACK</span>
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 bg-[var(--gold)] hover:bg-[#c49f2c] text-black font-mono text-xs font-bold uppercase tracking-wider rounded-sm transition-all shadow-md flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            <span>RETURN HOME</span>
          </Link>
        </div>

        {/* Need Help footer note */}
        <div className="pt-8 border-t border-[var(--border-subtle)] flex items-center justify-center gap-2 text-xs text-[var(--foreground-subtle)]">
          <Phone className="w-3.5 h-3.5 text-[var(--accent-sage)]" />
          <span>24/7 Helpline:</span>
          <Link
            href={`tel:${siteConfig.phonePlaceholder.replace(/\s+/g, '')}`}
            className="text-[var(--gold)] font-mono font-bold hover:underline"
          >
            {siteConfig.phonePlaceholder}
          </Link>
        </div>

      </div>
    </div>
  );
};
