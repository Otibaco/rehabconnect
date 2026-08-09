import React, { useState, useEffect } from 'react';
import { mockCoordinators } from '../../lib/dashboardData';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { VerificationCardSkeleton } from '../../components/dashboard/ui/Skeleton';
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';

export const AdminVerificationPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [coordinators, setCoordinators] = useState(mockCoordinators);

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

  const handleAction = (id: string, newStatus: 'Verified' | 'Under Review' | 'Rejected') => {
    setCoordinators((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  return (
    <div className="space-y-8 font-sans">
      
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2 crosshair-corner">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
            CLINICAL GOVERNANCE BOARD
          </span>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-2.5 py-1 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] font-mono text-[10px] font-bold rounded-xs flex items-center gap-1.5 transition-all"
            title="Refresh Verification Queue"
          >
            <RefreshCw className={`w-3 h-3 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'FETCHING...' : 'REFRESH'}</span>
          </button>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          MEDICAL CONSULTANT CREDENTIAL VERIFICATION
        </h1>
        <p className="text-xs text-[var(--foreground-muted)] max-w-xl">
          Review Medical and Dental Council of Nigeria (MDCN) registration credentials before enabling virtual consultation permissions.
        </p>
      </div>

      <div className="space-y-6">
        {loading ? (
          <>
            <VerificationCardSkeleton />
            <VerificationCardSkeleton />
          </>
        ) : (
          coordinators.map((c) => (
            <div
              key={c.id}
              className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 shadow-xl crosshair-corner"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
                    {c.name}
                  </h3>
                  <div className="font-mono text-xs text-[var(--gold)] font-bold">
                    {c.professionalTitle} • {c.qualifications}
                  </div>
                </div>

                <StatusBadge status={c.status} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs bg-[var(--background-tertiary)] p-4 border border-[var(--border-subtle)] rounded-sm">
                <div>
                  <span className="text-[var(--foreground-subtle)] text-[10px] block">MDCN REGISTRATION NUMBER:</span>
                  <span className="text-[var(--gold)] font-bold text-sm">{c.registrationNumber}</span>
                </div>

                <div>
                  <span className="text-[var(--foreground-subtle)] text-[10px] block">EXPERIENCE:</span>
                  <span className="text-[var(--foreground)] font-bold">{c.yearsOfExperience} Years Clinical Practice</span>
                </div>

                <div className="sm:col-span-2 pt-2 border-t border-[var(--border-subtle)] font-sans">
                  <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Specializations:</span>
                  <p className="text-[var(--foreground-muted)] text-xs">{c.specialization.join(' • ')}</p>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => handleAction(c.id, 'Verified')}
                  className="px-5 py-2.5 bg-[var(--green)] hover:bg-emerald-600 text-white font-mono text-xs font-bold rounded-sm flex items-center gap-2 shadow-lg"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>APPROVE CREDENTIALS</span>
                </button>

                <button
                  onClick={() => handleAction(c.id, 'Under Review')}
                  className="px-5 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] hover:border-[var(--gold)] font-mono text-xs font-bold rounded-sm flex items-center gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-[var(--gold)]" />
                  <span>REQUEST DOCUMENTS</span>
                </button>

                <button
                  onClick={() => handleAction(c.id, 'Rejected')}
                  className="px-5 py-2.5 bg-[var(--accent-terracotta)]/20 border border-[var(--accent-terracotta)] text-[var(--accent-terracotta)] font-mono text-xs font-bold rounded-sm hover:bg-[var(--accent-terracotta)] hover:text-white transition-colors flex items-center gap-2"
                >
                  <XCircle className="w-4 h-4" />
                  <span>REJECT APPLICATION</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

