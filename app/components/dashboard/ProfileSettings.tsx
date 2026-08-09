import React, { useState } from 'react';
import { User, Lock, Bell, ShieldCheck, CheckCircle2, Save } from 'lucide-react';
import { UserRole } from '../../types/dashboard';
import { mockUsers } from '../../lib/dashboardData';

interface ProfileSettingsProps {
  role?: UserRole;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({ role = 'patient' }) => {
  const user = mockUsers[role] || mockUsers.patient;
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    emailNotifs: true,
    smsNotifs: false,
    whatsappNotifs: true,
    currentPass: '',
    newPass: ''
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-1 crosshair-corner">
        <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
          ACCOUNT MANAGEMENT
        </span>
        <h2 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">
          PROFILE & PRIVACY SETTINGS
        </h2>
        <p className="text-xs text-[var(--foreground-muted)]">
          Manage your account credentials, communication preferences, and security options.
        </p>
      </div>

      {saved && (
        <div className="p-4 bg-[var(--green)]/20 border border-[var(--green)]/50 rounded-sm text-[var(--green-light)] font-mono text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Profile changes saved successfully.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* PERSONAL DETAILS */}
        <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
            <User className="w-4 h-4 text-[var(--gold)]" />
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">PERSONAL INFORMATION</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
            <div className="space-y-1">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-[var(--foreground)]"
              />
            </div>
          </div>
        </div>

        {/* NOTIFICATIONS */}
        <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-[var(--border-subtle)] pb-3">
            <Bell className="w-4 h-4 text-[var(--gold)]" />
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">NOTIFICATION PREFERENCES</h3>
          </div>

          <div className="space-y-3 font-sans text-xs">
            <label className="flex items-center justify-between p-3 bg-[var(--background-tertiary)] rounded-sm border border-[var(--border-subtle)] cursor-pointer">
              <span>Email Consultation Reminders</span>
              <input
                type="checkbox"
                checked={formData.emailNotifs}
                onChange={(e) => setFormData({ ...formData, emailNotifs: e.target.checked })}
                className="rounded-sm border-[var(--border-subtle)] text-[var(--gold)] focus:ring-0"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-[var(--background-tertiary)] rounded-sm border border-[var(--border-subtle)] cursor-pointer">
              <span>WhatsApp Consultation Reminders</span>
              <input
                type="checkbox"
                checked={formData.whatsappNotifs}
                onChange={(e) => setFormData({ ...formData, whatsappNotifs: e.target.checked })}
                className="rounded-sm border-[var(--border-subtle)] text-[var(--gold)] focus:ring-0"
              />
            </label>
          </div>
        </div>

        {/* SAVE BUTTON */}
        <button
          type="submit"
          className="px-8 py-3.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm transition-colors shadow-xl flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          <span>SAVE PROFILE CHANGES</span>
        </button>

      </form>

    </div>
  );
};
