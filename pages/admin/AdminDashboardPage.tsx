import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { StatBlock } from '../../components/dashboard/ui/StatBlock';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import {
  StatBlockSkeleton,
  TableSkeleton
} from '../../components/dashboard/ui/Skeleton';
import { mockCoordinators } from '../../lib/dashboardData';
import { Users, ShieldCheck, UserCheck, CreditCard, ArrowUpRight, RefreshCw } from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const [loading, setLoading] = useState(true);

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
            <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
            <span>REHAB NIGERIA SYSTEM ADMINISTRATION</span>
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
          GOVERNANCE & PLATFORM OVERVIEW
        </h1>

        <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-xl leading-relaxed">
          Monitor system metrics, review consultant MDCN credential verifications, manage clinical users, and inspect security audit logs.
        </p>
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
              label="Total Registered Users"
              value="1,240 Users"
              subtext="Patients, Families & Clinicians"
              icon={Users}
              accent="indigo"
            />

            <StatBlock
              label="Pending Verifications"
              value="2 Coordinators"
              subtext="MDCN Credentials Review"
              icon={UserCheck}
              accent="terracotta"
            />

            <StatBlock
              label="Active Consultations"
              value="18 Today"
              subtext="Virtual rooms running"
              icon={ShieldCheck}
              accent="sky"
            />

            <StatBlock
              label="Monthly Revenue"
              value="₦2.4M"
              subtext="Consultation fees processed"
              icon={CreditCard}
              accent="teal"
            />
          </>
        )}
      </div>

      {/* PENDING VERIFICATIONS QUEUE */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
            CONSULTANT VERIFICATION QUEUE
          </h2>
          <Link to="/admin/verification" className="font-mono text-xs text-[var(--gold)] hover:underline flex items-center gap-1">
            <span>View Full Verification Queue</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <TableSkeleton rows={3} />
        ) : (
          <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm overflow-hidden shadow-xl">
            <table className="w-full text-left font-sans text-xs border-collapse">
              <thead>
                <tr className="border-b border-[var(--border)] bg-[var(--background-tertiary)] font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider">
                  <th className="p-4 font-bold">CONSULTANT NAME</th>
                  <th className="p-4 font-bold">TITLE & QUALIFICATIONS</th>
                  <th className="p-4 font-bold">REGISTRATION NO.</th>
                  <th className="p-4 font-bold">STATUS</th>
                  <th className="p-4 font-bold text-right">ACTION</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[var(--border-subtle)]">
                {mockCoordinators.map((c) => (
                  <tr key={c.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                    <td className="p-4 font-bold text-[var(--foreground)] font-cinzel">
                      {c.name}
                    </td>
                    <td className="p-4 text-[var(--foreground-muted)]">
                      {c.professionalTitle} ({c.qualifications})
                    </td>
                    <td className="p-4 font-mono text-[11px] text-[var(--gold)] font-bold">
                      {c.registrationNumber}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        to="/admin/verification"
                        className="px-3 py-1.5 bg-[var(--gold)] text-[#080907] font-mono text-[10px] font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors"
                      >
                        REVIEW CREDENTIALS
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

