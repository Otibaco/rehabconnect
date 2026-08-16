import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { User, Mail, Phone, Lock, Bell, Shield, Save, CheckCircle2 } from 'lucide-react';

export const PatientSettingsPage: React.FC = () => {
  const { currentUser } = useAuth();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState('+234 802 345 6789');
  const [emergencyName, setEmergencyName] = useState('Michael Johnson');
  const [emergencyPhone, setEmergencyPhone] = useState('+234 803 987 6543');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <DashboardShell
      title="Patient Profile & Settings"
      description="Manage your verified contact details, emergency guardian contacts, and clinical notifications."
      breadcrumbs={[{ label: 'Healthcare Portal', path: '/patient/dashboard' }, { label: 'Settings' }]}
    >
      <div className="max-w-3xl mx-auto space-y-6">
        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 shadow-xl">
          {saved && (
            <div className="p-4 rounded-2xl bg-[var(--green)]/20 border border-[var(--green)]/30 text-[var(--green)] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--green)]" />
              <span>Profile settings updated successfully.</span>
            </div>
          )}

          {/* Personal Info */}
          <div className="space-y-4">
            <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
              <User className="w-4 h-4 text-[var(--gold)]" />
              <span>Personal Details</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-semibold text-[var(--foreground-muted)]">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="space-y-4 pt-2">
            <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
              <Phone className="w-4 h-4 text-[var(--gold)]" />
              <span>Emergency Contact / Guardian</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Contact Name</label>
                <input
                  type="text"
                  value={emergencyName}
                  onChange={(e) => setEmergencyName(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Contact Phone</label>
                <input
                  type="text"
                  value={emergencyPhone}
                  onChange={(e) => setEmergencyPhone(e.target.value)}
                  className="w-full p-3 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4 pt-2">
            <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2 border-b border-[var(--border)] pb-2">
              <Bell className="w-4 h-4 text-[var(--gold)]" />
              <span>Notification Preferences</span>
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] cursor-pointer">
                <span className="font-medium text-[var(--foreground)]">Email Notifications for Appointments & Reports</span>
                <input
                  type="checkbox"
                  checked={emailAlerts}
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  className="accent-[var(--gold)] w-4 h-4"
                />
              </label>

              <label className="flex items-center justify-between p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] cursor-pointer">
                <span className="font-medium text-[var(--foreground)]">SMS Reminders before Live Consultation</span>
                <input
                  type="checkbox"
                  checked={smsAlerts}
                  onChange={(e) => setSmsAlerts(e.target.checked)}
                  className="accent-[var(--gold)] w-4 h-4"
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.01]"
          >
            <Save className="w-4 h-4 text-black" />
            <span>Save Profile Updates</span>
          </button>
        </form>
      </div>
    </DashboardShell>
  );
};
