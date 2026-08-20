"use client"
import React from 'react';
import { CreditCard, CheckCircle2, Download, Receipt, Sparkles } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const FamilyPaymentsPage: React.FC = () => {
  const { payments } = useAuth();
  const router = useRouter();

  return (
    <DashboardShell
      title="Family Care Billing & Invoices"
      description="Transparent records of all telehealth consultations and care plans funded for Chief Emmanuel Okafor."
      breadcrumbs={[
        { label: 'Family Dashboard'},
        { label: 'Payments' }
      ]}

      
    >
      <div className="space-y-6 max-w-5xl">
        {/* Billing Overview Card */}
        <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Direct Care Payment Guarantee</h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              All transactions are secured via Paystack / Flutterwave integration with instant receipt generation.
            </p>
          </div>
          <button
            onClick={() => router.push('/patient/consultations/book')}
            className="px-4 py-2.5 rounded-xl bg-[var(--gold)] text-black text-xs font-bold shadow-md flex items-center gap-1.5 whitespace-nowrap"
          >
            <Sparkles className="w-4 h-4" />
            <span>Fund New Consultation</span>
          </button>
        </div>

        {/* Transactions Table */}
        <div className="rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] overflow-hidden">
          <div className="p-4 border-b border-[var(--border)]">
            <h4 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">Payment History</h4>
          </div>

          <div className="divide-y divide-[var(--border-subtle)]">
            {payments.map((pmt) => (
              <div key={pmt.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[var(--background-tertiary)]/50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/15 text-[var(--gold)] flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">{pmt.status}</h5>
                    <p className="text-[11px] text-[var(--foreground-subtle)]">{pmt.date} • {pmt.paymentMethod} • Ref: {pmt.reference}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <div className="text-right">
                    <span className="font-mono font-bold text-xs sm:text-sm text-[var(--gold)] block">
                      {pmt.currency} {pmt.amount.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 justify-end">
                      <CheckCircle2 className="w-3 h-3" /> Paid
                    </span>
                  </div>

                  <button
                    onClick={() => alert(`Receipt #${pmt.reference} downloaded.`)}
                    className="p-2 rounded-lg bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] transition-colors"
                    title="Download Receipt"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
