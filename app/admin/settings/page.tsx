import React from 'react';
import { DashboardShell } from '@/app/dashboard/DashboardShell';
import { ShieldCheck, Lock, Bell, Sliders } from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  return (
    <DashboardShell
      title="Platform Security & Global Configuration"
      description="Manage enterprise access policies, Paystack gateway credentials, and automated notification webhooks."
      breadcrumbs={[{ label: 'Admin Portal', path: '/admin/dashboard' }, { label: 'Settings' }]}
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 shadow-xl">
          <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
            <ShieldCheck className="w-5 h-5 text-[var(--gold)]" />
            <span>Platform Integration Config</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-1">
              <span className="font-bold text-[var(--foreground)]">Paystack API Gateway Status</span>
              <p className="text-[var(--gold)] font-mono">Live test key active (pk_live_rehabnigeria_9823...)</p>
            </div>

            <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-1">
              <span className="font-bold text-[var(--foreground)]">Medical Data Privacy Encryption</span>
              <p className="text-[var(--green)]">AES-256 Bit storage active on Firestore cloud instances.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
