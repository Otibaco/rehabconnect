import React, { useState, useEffect } from 'react';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { TableSkeleton } from '../../components/dashboard/ui/Skeleton';
import { RefreshCw } from 'lucide-react';

export const AdminUsersPage: React.FC = () => {
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

  const allUsers = [
    { id: 'usr_pat_001', name: 'Chinedu Okonkwo', role: 'patient', email: 'chinedu.o@example.com', status: 'Active', joined: 'Jul 15, 2026' },
    { id: 'usr_fam_001', name: 'Amina Okonkwo', role: 'family', email: 'amina.o@example.com', status: 'Active', joined: 'Jul 16, 2026' },
    { id: 'usr_cns_001', name: 'Dr. Emeka Nwachukwu', role: 'coordinator', email: 'dr.emeka@rehabnigeria.org', status: 'Verified', joined: 'Jun 01, 2026' },
    { id: 'usr_cns_002', name: 'Dr. Folake Adebayo', role: 'coordinator', email: 'dr.folake@rehabnigeria.org', status: 'Under Review', joined: 'Aug 02, 2026' }
  ];

  return (
    <div className="space-y-8 font-sans">
      
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2 crosshair-corner">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
            USER MANAGEMENT DIRECTORY
          </span>

          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-2.5 py-1 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--foreground)] font-mono text-[10px] font-bold rounded-xs flex items-center gap-1.5 transition-all"
            title="Refresh Users Directory"
          >
            <RefreshCw className={`w-3 h-3 text-[#81A684] ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'FETCHING...' : 'REFRESH'}</span>
          </button>
        </div>

        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          ALL PLATFORM USERS
        </h1>
        <p className="text-xs text-[var(--foreground-muted)]">
          Manage accounts across Patient, Caregiver, Care Coordinator, and System Admin roles.
        </p>
      </div>

      {loading ? (
        <TableSkeleton rows={4} />
      ) : (
        <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm overflow-hidden shadow-xl">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background-tertiary)] font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider">
                <th className="p-4 font-bold">USER ID</th>
                <th className="p-4 font-bold">FULL NAME</th>
                <th className="p-4 font-bold">ROLE</th>
                <th className="p-4 font-bold">EMAIL ADDRESS</th>
                <th className="p-4 font-bold">JOINED DATE</th>
                <th className="p-4 font-bold">STATUS</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border-subtle)]">
              {allUsers.map((u) => (
                <tr key={u.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                  <td className="p-4 font-mono text-[11px] text-[var(--gold)] font-bold">
                    {u.id}
                  </td>
                  <td className="p-4 font-bold text-[var(--foreground)] font-cinzel">
                    {u.name}
                  </td>
                  <td className="p-4 capitalize font-mono text-[11px] text-[var(--foreground-muted)]">
                    {u.role === 'coordinator' ? 'Consultant' : u.role}
                  </td>
                  <td className="p-4 text-[var(--foreground-subtle)]">
                    {u.email}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[var(--foreground-subtle)]">
                    {u.joined}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={u.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};

