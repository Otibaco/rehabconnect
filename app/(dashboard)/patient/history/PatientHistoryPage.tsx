"use client";
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import React, { useState } from 'react';
import { CreditCard, Calendar, Download, CheckCircle2, Search, Filter } from 'lucide-react';

export const PatientHistoryPage: React.FC = () => {
  const router = useRouter();
  const { payments, appointments } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'appointments' | 'payments'>('all');

  return (
    <DashboardShell
      title="History & Transactions"
      description="View past clinical consultations, scheduled sessions, and payment receipts."
      breadcrumbs={[{ label: 'Healthcare Portal', path: '/patient/dashboard' }, { label: 'History' }]}
    >
      <div className="space-y-6">
        {/* Controls Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex items-center gap-2 bg-[var(--background-secondary)] p-1.5 rounded-2xl border border-[var(--border)]">
            {(['all', 'appointments', 'payments'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-[var(--gold)] text-black shadow-md shadow-[var(--gold)]/20'
                    : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)]'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Full transaction history exported (.csv)')}
            className="px-4 py-2.5 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-xs font-bold text-[var(--gold)] hover:border-[var(--gold)] flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        {/* Payments Table */}
        {(activeTab === 'all' || activeTab === 'payments') && (
          <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
            <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[var(--gold)]" />
              <span>Payment Receipts</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--foreground-subtle)] font-semibold">
                    <th className="pb-3">Reference</th>
                    <th className="pb-3">Care Lead</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {payments.map((p) => (
                    <tr key={p.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                      <td className="py-3.5 font-mono font-bold text-[var(--gold)]">{p.reference}</td>
                      <td className="py-3.5 font-medium text-[var(--foreground)]">{p.coordinatorName}</td>
                      <td className="py-3.5 text-[var(--foreground-muted)]">{p.date}</td>
                      <td className="py-3.5 font-bold text-[var(--foreground)]">₦{p.amount.toLocaleString()}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30 text-[10px] font-bold capitalize">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => alert(`Receipt #${p.reference} downloaded`)}
                          className="text-[var(--gold)] hover:underline font-bold text-[11px]"
                        >
                          Receipt
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Appointments Table */}
        {(activeTab === 'all' || activeTab === 'appointments') && (
          <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
            <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--gold)]" />
              <span>Consultation History</span>
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--foreground-subtle)] font-semibold">
                    <th className="pb-3">Care Lead</th>
                    <th className="pb-3">Type</th>
                    <th className="pb-3">Date & Time</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {appointments.map((a) => (
                    <tr key={a.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                      <td className="py-3.5 font-bold text-[var(--foreground)] flex items-center gap-2.5">
                        <img src={a.coordinatorAvatar} alt="" className="w-7 h-7 rounded-xl object-cover border border-[var(--border-subtle)]" />
                        <span>{a.coordinatorName}</span>
                      </td>
                      <td className="py-3.5 capitalize font-medium text-[var(--foreground-muted)]">{a.type}</td>
                      <td className="py-3.5 text-[var(--foreground-muted)]">{a.date} at {a.timeSlot}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]/30 text-[10px] font-bold capitalize">
                          {a.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => router.push('/patient/consultation-summary')}
                          className="text-[var(--gold)] hover:underline font-bold text-[11px]"
                        >
                          View Summary
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};
