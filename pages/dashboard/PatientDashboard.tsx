import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatBlock } from '../../components/dashboard/ui/StatBlock';
import { ConsultationCard } from '../../components/dashboard/ui/ConsultationCard';
import { JourneyTimeline } from '../../components/dashboard/ui/JourneyTimeline';
import {
  StatBlockSkeleton,
  ConsultationCardSkeleton,
  JourneyTimelineSkeleton
} from '../../components/dashboard/ui/Skeleton';
import { mockConsultations, mockUsers } from '../../lib/dashboardData';
import { Calendar, Compass, MessageSquare, Video, ShieldCheck, ArrowUpRight, RefreshCw } from 'lucide-react';

export const PatientDashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const user = mockUsers.patient;
  const nextAppt = mockConsultations[0];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* WELCOME BANNER */}
      <div className="p-6 sm:p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-3 relative overflow-hidden crosshair-corner shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--gold)] font-bold uppercase">
            <ShieldCheck className="w-4 h-4" />
            <span>CONFIDENTIAL PATIENT PORTAL</span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-2.5 py-1 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] font-mono text-[10px] font-bold rounded-xs flex items-center gap-1.5 transition-all"
            title="Simulate Data Refresh"
          >
            <RefreshCw className={`w-3 h-3 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'SYNCING...' : 'REFRESH DATA'}</span>
          </button>
        </div>

        <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
          GOOD MORNING, {user.firstName.toUpperCase()}.
        </h1>

        <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
          Your recovery journey continues one step at a time. All clinical communications are end-to-end encrypted and managed by licensed medical consultants.
        </p>

        <div className="pt-2 flex flex-wrap gap-3 font-mono text-xs">
          <Link
            to="/dashboard/consultations"
            className="px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-bold rounded-sm transition-colors flex items-center gap-2 shadow-lg"
          >
            <Video className="w-4 h-4" />
            <span>JOIN CONSULTATION</span>
          </Link>

          <Link
            to="/dashboard/messages"
            className="px-5 py-2.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] border border-[var(--border-subtle)] font-bold rounded-sm transition-colors flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[var(--gold)]" />
            <span>VIEW MESSAGES (1)</span>
          </Link>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {loading ? (
          <>
            <StatBlockSkeleton />
            <StatBlockSkeleton />
            <StatBlockSkeleton />
            <StatBlockSkeleton />
          </>
        ) : (
          <>
            <StatBlock
              label="Next Appointment"
              value="Today, 2:00 PM"
              subtext="Dr. Emeka Nwachukwu"
              icon={Calendar}
              accent="sky"
            />

            <StatBlock
              label="Journey Stage"
              value="Step 3 of 5"
              subtext="Initial Consultation"
              icon={Compass}
              accent="sage"
            />

            <StatBlock
              label="Unread Messages"
              value="1 New"
              subtext="From Care Team"
              icon={MessageSquare}
              accent="indigo"
            />

            <StatBlock
              label="Payment Status"
              value="₦10,000"
              subtext="Pre-paid • Ref: #9481"
              icon={ShieldCheck}
              accent="teal"
            />
          </>
        )}
      </div>

      {/* NEXT CONSULTATION WIDGET */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
            UPCOMING CONSULTATION
          </h2>
          <Link to="/dashboard/consultations" className="font-mono text-xs text-[var(--gold)] hover:underline flex items-center gap-1">
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <ConsultationCardSkeleton />
        ) : (
          <ConsultationCard consultation={nextAppt} />
        )}
      </div>

      {/* RECOVERY JOURNEY PREVIEW */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
            RECOVERY JOURNEY PROGRESS
          </h2>
          <Link to="/dashboard/journey" className="font-mono text-xs text-[var(--gold)] hover:underline flex items-center gap-1">
            <span>View Detailed Timeline</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <JourneyTimelineSkeleton />
        ) : (
          <JourneyTimeline />
        )}
      </div>

    </div>
  );
};

