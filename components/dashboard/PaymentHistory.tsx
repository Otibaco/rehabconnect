import React from 'react';
import { CreditCard, Download, CheckCircle2, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { mockPayments } from '../../lib/dashboardData';
import { StatusBadge } from './ui/StatusBadge';

export const PaymentHistory: React.FC = () => {
  return (
    <div className="space-y-8 font-sans">
      
      {/* SUMMARY BANNER */}
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl crosshair-corner">
        <div className="space-y-2 text-center md:text-left">
          <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
            CLINICAL FEE STRUCTURE
          </span>
          <h2 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">
            STANDARD CONSULTATION: ₦10,000 / SESSION
          </h2>
          <p className="text-xs text-[var(--foreground-muted)] max-w-xl leading-relaxed">
            All virtual consultations include pre-session clinical intake review, 45 minutes direct video session, and encrypted follow-up notes.
          </p>
        </div>

        <button className="px-6 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm transition-colors shadow-xl shrink-0 flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          <span>PRE-PAY CONSULTATION FEE</span>
        </button>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="space-y-4">
        <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
          TRANSACTION HISTORY
        </h3>

        <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm overflow-hidden shadow-xl">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--background-tertiary)] font-mono text-[10px] text-[var(--gold)] uppercase tracking-wider">
                <th className="p-4 font-bold">REFERENCE</th>
                <th className="p-4 font-bold">SERVICE</th>
                <th className="p-4 font-bold">DATE</th>
                <th className="p-4 font-bold">AMOUNT</th>
                <th className="p-4 font-bold">METHOD</th>
                <th className="p-4 font-bold">STATUS</th>
                <th className="p-4 font-bold text-right">RECEIPT</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[var(--border-subtle)]">
              {mockPayments.map((p) => (
                <tr key={p.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                  <td className="p-4 font-mono text-[11px] font-bold text-[var(--foreground)]">
                    {p.transactionRef}
                  </td>
                  <td className="p-4 text-[var(--foreground-muted)] font-medium">
                    {p.serviceName}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[var(--foreground-subtle)]">
                    {p.date}
                  </td>
                  <td className="p-4 font-mono text-xs font-bold text-[var(--gold)]">
                    {p.amount}
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[var(--foreground-subtle)]">
                    {p.paymentMethod}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={p.status} />
                  </td>
                  <td className="p-4 text-right">
                    <button
                      className="p-2 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] rounded-sm text-[var(--gold)] transition-colors inline-flex items-center gap-1 font-mono text-[10px]"
                      title="Download PDF Receipt"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
