import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatBlock } from '../../components/dashboard/ui/StatBlock';
import { PatientProfileCard } from '../../components/dashboard/ui/PatientProfileCard';
import { ConsultationCard } from '../../components/dashboard/ui/ConsultationCard';
import {
  StatBlockSkeleton,
  ConsultationCardSkeleton,
  PatientProfileCardSkeleton
} from '../../components/dashboard/ui/Skeleton';
import { mockPatients, mockConsultations, mockUsers } from '../../lib/dashboardData';
import { Users, Calendar, Video, ShieldCheck, ArrowUpRight, CheckCircle2, RefreshCw } from 'lucide-react';

export const CoordinatorDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const coordinator = mockUsers.coordinator;
  const patients = mockPatients;
  const todayConsultations = mockConsultations;

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
      
      {/* WELCOME HEADER */}
      <div className="p-6 sm:p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-3 relative overflow-hidden crosshair-corner shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-mono text-xs text-[var(--gold)] font-bold uppercase">
            <ShieldCheck className="w-4 h-4 text-[#81A684]" />
            <span>VERIFIED CLINICAL CONSULTANT WORKSPACE</span>
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

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-cinzel text-3xl sm:text-4xl font-bold text-[var(--foreground)] leading-tight">
              WELCOME, DR. {coordinator.lastName.toUpperCase()}.
            </h1>
            <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-xl leading-relaxed mt-1">
              Consultant Psychiatrist • MDCN Reg: <strong className="text-[var(--gold)]">MDCN/R/42190</strong>
            </p>
          </div>

          <div className="px-4 py-2 bg-[var(--green)]/20 border border-[var(--green)]/50 rounded-sm text-[var(--green-light)] font-mono text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>CLINICALLY VERIFIED</span>
          </div>
        </div>
      </div>

      {/* STATS ROW */}
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
              label="Active Patients"
              value="14 Patients"
              subtext="Under active care"
              icon={Users}
              accent="sage"
            />

            <StatBlock
              label="Today's Sessions"
              value="3 Consultations"
              subtext="First at 2:00 PM WAT"
              icon={Video}
              accent="sky"
            />

            <StatBlock
              label="Pending Follow-ups"
              value="2 Action Items"
              subtext="Notes require update"
              icon={Calendar}
              accent="terracotta"
            />

            <StatBlock
              label="Verification Status"
              value="Verified"
              subtext="Medical Council Approved"
              icon={ShieldCheck}
              accent="sage"
            />
          </>
        )}
      </div>

      {/* TODAY'S CONSULTATIONS */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
            TODAY'S SCHEDULED CONSULTATIONS
          </h2>
          <Link
            to="/dashboard/consultation-room/cns_101"
            className="font-mono text-xs text-[var(--gold)] hover:underline flex items-center gap-1 font-bold"
          >
            <span>ENTER VIRTUAL ROOM</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 gap-4">
            <ConsultationCardSkeleton />
            <ConsultationCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {todayConsultations.map((c) => (
              <ConsultationCard key={c.id} consultation={c} isCoordinator={true} />
            ))}
          </div>
        )}
      </div>

      {/* RECENT PATIENT CASE FILES */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
            ASSIGNED PATIENT CASE FILES
          </h2>
          <Link to="/dashboard/patients" className="font-mono text-xs text-[var(--gold)] hover:underline flex items-center gap-1">
            <span>View Full Directory ({patients.length})</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PatientProfileCardSkeleton />
            <PatientProfileCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patients.map((p) => (
              <PatientProfileCard key={p.id} patient={p} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

