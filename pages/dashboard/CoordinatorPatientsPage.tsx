import React, { useState, useEffect } from 'react';
import { mockPatients } from '../../lib/dashboardData';
import { PatientProfileCard } from '../../components/dashboard/ui/PatientProfileCard';
import { PatientProfileCardSkeleton } from '../../components/dashboard/ui/Skeleton';
import { Search, Filter, RefreshCw } from 'lucide-react';

export const CoordinatorPatientsPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<string>('All');

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

  const filteredPatients = mockPatients.filter((p) => {
    const matchesQuery = p.name.toLowerCase().includes(query.toLowerCase()) || p.substances.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    const matchesRisk = riskFilter === 'All' || p.riskLevel === riskFilter;
    return matchesQuery && matchesRisk;
  });

  return (
    <div className="space-y-8 font-sans">
      
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2 crosshair-corner">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
            CLINICAL CASE DIRECTORY
          </span>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-2.5 py-1 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] font-mono text-[10px] font-bold rounded-xs flex items-center gap-1.5 transition-all"
            title="Refresh Directory"
          >
            <RefreshCw className={`w-3 h-3 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'FETCHING...' : 'REFRESH'}</span>
          </button>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          ASSIGNED PATIENT RECORDS
        </h1>
        <p className="text-xs text-[var(--foreground-muted)] max-w-xl">
          Comprehensive medical case files for active patients under your care supervision.
        </p>
      </div>

      {/* SEARCH AND FILTERS */}
      <div className="p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground-subtle)]" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search patients by name or substance..."
            className="w-full pl-10 pr-4 py-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-xs font-sans text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
          />
        </div>

        <div className="flex items-center gap-2 font-mono text-xs w-full sm:w-auto justify-end">
          <Filter className="w-4 h-4 text-[var(--gold)]" />
          <span className="text-[var(--foreground-subtle)] uppercase text-[10px]">RISK FILTER:</span>
          {['All', 'High', 'Moderate', 'Low'].map((r) => (
            <button
              key={r}
              onClick={() => setRiskFilter(r)}
              className={`px-3 py-1.5 rounded-sm border transition-all ${
                riskFilter === r
                  ? 'bg-[var(--gold)] text-[#080907] border-[var(--gold)] font-bold'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] border-[var(--border-subtle)]'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* PATIENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading ? (
          <>
            <PatientProfileCardSkeleton />
            <PatientProfileCardSkeleton />
          </>
        ) : (
          filteredPatients.map((p) => (
            <PatientProfileCard key={p.id} patient={p} />
          ))
        )}
      </div>

    </div>
  );
};

