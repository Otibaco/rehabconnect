"use client"
import React, { useState } from 'react';

import {
  Settings,
  User,
  Stethoscope,
  ShieldCheck,
  Video,
  Bell,
  Lock,
  CheckCircle2,
  Save,
  Clock,
  Sparkles
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const CoordinatorSettingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'telehealth' | 'security'>('profile');
  const [name, setName] = useState('Dr. Amara Okafor, MD');
  const [title, setTitle] = useState('Senior Clinical Care Lead & Neuro-Rehab Physician');
  const [licenseNumber, setLicenseNumber] = useState('MD-NG-784192');
  const [specialty, setSpecialty] = useState('Online Neurological Rehabilitation, Stroke Recovery');
  const [videoHD, setVideoHD] = useState(true);
  const [noiseCancellation, setNoiseCancellation] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <DashboardShell
      title="Doctor Clinical Profile & Settings"
      description="Manage medical licensing, online consultation configurations, and security credentials."
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Settings' }]}
    >
      <div className="space-y-6">
        {/* TABS HEADER */}
        <div className="flex items-center gap-2 border-b border-[var(--border)] pb-4">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'profile'
                ? 'bg-[var(--gold)] text-black shadow-sm'
                : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
            }`}
          >
            Medical Credentials & Profile
          </button>
          <button
            onClick={() => setActiveTab('telehealth')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'telehealth'
                ? 'bg-[var(--gold)] text-black shadow-sm'
                : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
            }`}
          >
            Telehealth Audio/Video Setup
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'security'
                ? 'bg-[var(--gold)] text-black shadow-sm'
                : 'bg-[var(--background-secondary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
            }`}
          >
            Security & Encryption
          </button>
        </div>

        {/* PROFILE SETTINGS */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSave} className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl">
            <div className="flex items-center gap-4 pb-6 border-b border-[var(--border)]">
              <img
                src="https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600"
                alt="Doctor Avatar"
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--gold)]/50 shadow-md"
              />
              <div className="space-y-1">
                <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)]">
                  {name}
                </h3>
                <span className="text-xs text-[var(--gold)] font-medium block">
                  Verified Telehealth Doctor • License #{licenseNumber}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  ✓ Active Board Certification
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--foreground)]">Full Name & Title</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[var(--foreground)]">Medical License ID</label>
                <input
                  type="text"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-[var(--foreground)]">Clinical Role</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-[var(--foreground)]">Clinical Specialties</label>
                <input
                  type="text"
                  value={specialty}
                  onChange={(e) => setSpecialty(e.target.value)}
                  className="w-full p-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
                />
              </div>
            </div>

            {saved && (
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Doctor clinical profile updated successfully!</span>
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] transition-all flex items-center gap-2 shadow-md"
            >
              <Save className="w-4 h-4" />
              <span>Save Clinical Profile</span>
            </button>
          </form>
        )}

        {/* TELEHEALTH SETTINGS */}
        {activeTab === 'telehealth' && (
          <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl">
            <div className="flex items-center gap-2 pb-4 border-b border-[var(--border)]">
              <Video className="w-5 h-5 text-[var(--gold)]" />
              <h3 className="font-cinzel font-bold text-base text-[var(--foreground)]">
                Telehealth Audio & Video Preferences
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                <div>
                  <h4 className="font-semibold text-xs text-[var(--foreground)]">
                    Ultra HD 1080p Telehealth Streaming
                  </h4>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    Enables high-definition movement analysis during physical therapy sessions.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={videoHD}
                  onChange={(e) => setVideoHD(e.target.checked)}
                  className="w-4 h-4 accent-[var(--gold)]"
                />
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                <div>
                  <h4 className="font-semibold text-xs text-[var(--foreground)]">
                    AI Clinical Noise Cancellation
                  </h4>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    Filters background sounds so speech is crystal clear for patients.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={noiseCancellation}
                  onChange={(e) => setNoiseCancellation(e.target.checked)}
                  className="w-4 h-4 accent-[var(--gold)]"
                />
              </div>
            </div>
          </div>
        )}

        {/* SECURITY SETTINGS */}
        {activeTab === 'security' && (
          <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-xl max-w-3xl">
            <div className="flex items-center gap-2 pb-4 border-b border-[var(--border)]">
              <ShieldCheck className="w-5 h-5 text-[var(--gold)]" />
              <h3 className="font-cinzel font-bold text-base text-[var(--foreground)]">
                Security & Data Protection
              </h3>
            </div>

            <div className="space-y-3 text-xs text-[var(--foreground-muted)]">
              <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-[var(--foreground)]">
                    Two-Factor Authentication (2FA)
                  </h4>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    Enabled for all doctor login sessions.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                  Active
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-[var(--foreground)]">
                    Clinical Data Encryption
                  </h4>
                  <p className="text-[11px] text-[var(--foreground-muted)]">
                    AES-256 Bit Encryption for medical charts and video sessions.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                  Verified
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
};
