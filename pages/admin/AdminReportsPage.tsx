import React, { useState, useEffect } from 'react';
import { StatBlock } from '../../components/dashboard/ui/StatBlock';
import {
  StatBlockSkeleton,
  WidgetSkeleton
} from '../../components/dashboard/ui/Skeleton';
import { BarChart3, ShieldCheck, RefreshCw, Calendar } from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
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
            SYSTEM AUDIT & REPORTING
          </span>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-2.5 py-1 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] font-mono text-[10px] font-bold rounded-xs flex items-center gap-1.5 transition-all"
            title="Refresh System Reports"
          >
            <RefreshCw className={`w-3 h-3 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'COMPILING...' : 'REFRESH'}</span>
          </button>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          PLATFORM AUDIT LOGS & ANALYTICS
        </h1>
        <p className="text-xs text-[var(--foreground-muted)]">
          System telemetry and clinical activity compliance reports.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {loading ? (
          <>
            <StatBlockSkeleton />
            <StatBlockSkeleton />
            <StatBlockSkeleton />
          </>
        ) : (
          <>
            <StatBlock label="Monthly Completed Sessions" value="142" subtext="98.4% Completion rate" icon={BarChart3} accent="sage" />
            <StatBlock label="Average Consultation Time" value="41 Mins" subtext="Target: 45 Mins" icon={Calendar} accent="gold" />
            <StatBlock label="Security Audits" value="0 Breaches" subtext="256-bit AES Compliance" icon={ShieldCheck} accent="sage" />
          </>
        )}
      </div>

      {loading ? (
        <WidgetSkeleton heightClass="h-40" />
      ) : (
        <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 shadow-xl">
          <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-subtle)] pb-2">
            SECURITY AUDIT LOGS
          </h3>

          <div className="space-y-2 font-mono text-xs text-[var(--foreground-muted)]">
            {[
              { time: '10:42 AM WAT', event: 'Dr. Emeka Nwachukwu launched WebRTC consultation room #cns_101', type: 'INFO' },
              { time: '09:15 AM WAT', event: 'Patient Chinedu Okonkwo pre-paid ₦10,000 consultation fee', type: 'PAYMENT' },
              { time: '08:30 AM WAT', event: 'Admin approved MDCN verification for Dr. Emeka Nwachukwu', type: 'GOVERNANCE' }
            ].map((log, i) => (
              <div key={i} className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm flex items-center justify-between">
                <span className="text-[var(--gold)]">{log.time}</span>
                <span className="text-[var(--foreground)]">{log.event}</span>
                <span className="px-2 py-0.5 bg-[var(--gold)]/20 text-[var(--gold)] font-bold rounded-sm text-[9px]">{log.type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

