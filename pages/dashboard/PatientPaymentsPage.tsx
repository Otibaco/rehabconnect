import React, { useState, useEffect } from 'react';
import { PaymentHistory } from '../../components/dashboard/PaymentHistory';
import { TableSkeleton } from '../../components/dashboard/ui/Skeleton';
import { RefreshCw } from 'lucide-react';

export const PatientPaymentsPage: React.FC = () => {
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
    <div className="space-y-6">
      <div className="flex justify-end">
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-3 py-1.5 bg-[var(--background-secondary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] font-mono text-xs font-bold rounded-xs flex items-center gap-1.5 transition-all"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'AUDITING LEDGER...' : 'REFRESH PAYMENTS'}</span>
        </button>
      </div>

      {loading ? <TableSkeleton rows={4} /> : <PaymentHistory />}
    </div>
  );
};

