import React, { useState, useEffect } from 'react';
import { ConsultationCard } from '../../components/dashboard/ui/ConsultationCard';
import { ConsultationCardSkeleton } from '../../components/dashboard/ui/Skeleton';
import { mockConsultations } from '../../lib/dashboardData';
import { Video, RefreshCw } from 'lucide-react';

export const PatientConsultationsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 400);
  };

  return (
    <div className="space-y-8 font-sans">
      
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2 crosshair-corner">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
            CLINICAL SESSIONS
          </span>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-2.5 py-1 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] font-mono text-[10px] font-bold rounded-xs flex items-center gap-1.5 transition-all"
            title="Refresh Consultations"
          >
            <RefreshCw className={`w-3 h-3 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'SYNCING...' : 'REFRESH'}</span>
          </button>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          YOUR VIRTUAL CONSULTATIONS
        </h1>
        <p className="text-xs text-[var(--foreground-muted)] max-w-xl">
          Schedule and access your 45-minute confidential sessions with assigned medical consultants.
        </p>
      </div>

      <div className="space-y-4">
        {loading ? (
          <>
            <ConsultationCardSkeleton />
            <ConsultationCardSkeleton />
          </>
        ) : (
          mockConsultations.map((c) => (
            <ConsultationCard key={c.id} consultation={c} />
          ))
        )}
      </div>

    </div>
  );
};

