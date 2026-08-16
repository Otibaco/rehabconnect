"use client"
import React, { useState } from 'react';
import {
  Users,
  Video,
  FileCheck2,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  Search,
  Activity,
  Sliders,
  FileSpreadsheet,
  Clock,
  ArrowRight
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const AdminDashboardPage: React.FC = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'programs' | 'sessions' | 'plans'>('programs');

  const [programs, setPrograms] = useState([
    {
      id: 'prg-1',
      title: 'Virtual Stroke & Neuro Recovery Suite',
      leadDoctor: 'Dr. Amara Okafor, MD',
      specialties: ['Motor Tele-Rehab', 'Speech Therapy', 'Cognitive Protocols'],
      activePatients: 142,
      format: '100% Online HD Video',
      status: 'Active',
    },
    {
      id: 'prg-2',
      title: 'Substance & Addiction Online Intensive',
      leadDoctor: 'Dr. David Adeleke, MD',
      specialties: ['Relapse Prevention', 'CBT Tele-Counseling', 'Daily Recovery Logs'],
      activePatients: 218,
      format: '100% Online Virtual Care',
      status: 'Active',
    },
    {
      id: 'prg-3',
      title: 'Orthopedic & Post-Surgical Tele-Therapy',
      leadDoctor: 'Dr. Sarah Jenkins, MD',
      specialties: ['Biomechanical Assessment', 'Range of Motion', 'Pain Management'],
      activePatients: 95,
      format: '100% Online Guided Video',
      status: 'Active',
    },
    {
      id: 'prg-4',
      title: 'Trauma & Mental Health Tele-Counseling',
      leadDoctor: 'Dr. Chioma Eze, PsyD',
      specialties: ['Clinical Psychology', 'PTSD Tele-Therapy', 'Family Tele-Conferences'],
      activePatients: 180,
      format: '100% Confidential Telehealth',
      status: 'Active',
    },
    {
      id: 'prg-5',
      title: 'Spinal & Chronic Pain Virtual Protocol',
      leadDoctor: 'Dr. Michael Bello, MD',
      specialties: ['Postural Ergonomics', 'Neuropathic Exercises', 'Virtual Physio'],
      activePatients: 88,
      format: '100% Digital Protocols',
      status: 'Active',
    },
  ]);

  const sessions = [
    {
      id: 'ses-1',
      patient: 'Sarah Johnson',
      doctor: 'Dr. Amara Okafor, MD',
      program: 'Post-Surgical Knee Tele-Therapy',
      scheduled: 'Today, 10:30 AM',
      type: 'HD Video Call',
      status: 'In Progress',
      payment: 'Paid (₦10,000)',
    },
    {
      id: 'ses-2',
      patient: 'David Okafor (Caregiver)',
      doctor: 'Dr. Amara Okafor, MD',
      program: 'Stroke Recovery Family Tele-Conference',
      scheduled: 'Today, 02:00 PM',
      type: 'Family Video Call',
      status: 'Confirmed',
      payment: 'Paid (₦10,000)',
    },
    {
      id: 'ses-3',
      patient: 'Emmanuel Nwachukwu',
      doctor: 'Dr. David Adeleke, MD',
      program: 'Executive Burnout & Wellness',
      scheduled: 'Today, 04:15 PM',
      type: 'Doctor Video Counseling',
      status: 'Confirmed',
      payment: 'Paid (₦10,000)',
    },
    {
      id: 'ses-4',
      patient: 'Folake Adebayo',
      doctor: 'Dr. Chioma Eze, PsyD',
      program: 'Trauma Tele-Counseling',
      scheduled: 'Tomorrow, 11:00 AM',
      type: '1-on-1 HD Video',
      status: 'Confirmed',
      payment: 'Paid (₦10,000)',
    },
  ];

  const activePlans = [
    {
      id: 'pln-1',
      patient: 'Sarah Johnson',
      doctor: 'Dr. Amara Okafor, MD',
      planName: 'Phase II Quadriceps & Joint Flexion',
      adherence: '94%',
      week: 'Week 4 of 8',
      status: 'On Track',
    },
    {
      id: 'pln-2',
      patient: 'David Okafor (Father)',
      doctor: 'Dr. Amara Okafor, MD',
      planName: 'Upper Extremity Neuro-Motor Protocol',
      adherence: '88%',
      week: 'Week 6 of 12',
      status: 'On Track',
    },
    {
      id: 'pln-3',
      patient: 'Emmanuel Nwachukwu',
      doctor: 'Dr. David Adeleke, MD',
      planName: 'Daily Cognitive Journaling & Stress Management',
      adherence: '92%',
      week: 'Week 3 of 6',
      status: 'Excellent',
    },
  ];

  const toggleProgramStatus = (id: string) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' } : p
      )
    );
  };

  return (
    <DashboardShell
      title="Telehealth Executive Console"
      description="Monitor nationwide online rehabilitation programs, licensed telehealth doctors, live video sessions, and digital patient recovery trajectories."
      breadcrumbs={[{ label: 'Admin Portal' }, { label: 'Executive Console' }]}
    >
      <div className="space-y-6">
        {/* EXECUTIVE KPI GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-md">
            <div className="flex items-center justify-between text-[var(--foreground-muted)]">
              <span className="text-xs font-semibold">Virtual Patients</span>
              <Users className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="font-cinzel font-bold text-2xl text-[var(--foreground)]">3,420</p>
            <span className="text-[10px] text-[var(--green)] font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)]"></span> +14% active this month
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-md">
            <div className="flex items-center justify-between text-[var(--foreground-muted)]">
              <span className="text-xs font-semibold">Telehealth Doctors</span>
              <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="font-cinzel font-bold text-2xl text-[var(--foreground)]">48</p>
            <span className="text-[10px] text-[var(--gold)] font-semibold">100% Licensed & Verified</span>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-md">
            <div className="flex items-center justify-between text-[var(--foreground-muted)]">
              <span className="text-xs font-semibold">Online Programs</span>
              <Layers className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="font-cinzel font-bold text-2xl text-[var(--foreground)]">36</p>
            <span className="text-[10px] text-[var(--green)] font-semibold">Digital Recovery Suites</span>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-md">
            <div className="flex items-center justify-between text-[var(--foreground-muted)]">
              <span className="text-xs font-semibold">HD Video Sessions</span>
              <Video className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="font-cinzel font-bold text-2xl text-[var(--foreground)]">4,890</p>
            <span className="text-[10px] text-[var(--green)] font-semibold">98.4% Completion Rate</span>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] space-y-2 shadow-lg">
            <div className="flex items-center justify-between text-[var(--gold)]">
              <span className="text-xs font-semibold">Telehealth Revenue</span>
              <DollarSign className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="font-cinzel font-bold text-2xl text-[var(--gold)]">₦48.5M</p>
            <span className="text-[10px] text-[var(--foreground-muted)] font-medium">100% Online Consultations</span>
          </div>
        </div>

        {/* FUNNEL PERFORMANCE & QUICK MANAGEMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Online Care Funnel (2 Cols) */}
          <div className="lg:col-span-2 p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[var(--gold)]" />
                <span>Virtual Rehabilitation Care Trajectory</span>
              </h3>
              <span className="text-xs text-[var(--foreground-subtle)] font-medium">30 Day Real-Time Flow</span>
            </div>

            <div className="space-y-3.5 pt-2">
              {[
                { stage: '1. Online Intake Assessment Completed', count: '1,420', percent: '100%', color: 'bg-[var(--gold)]' },
                { stage: '2. Doctor HD Video Consultation Held', count: '1,310', percent: '92%', color: 'bg-[var(--gold-light)]' },
                { stage: '3. Digital Recovery Protocol Prescribed', count: '1,220', percent: '86%', color: 'bg-[var(--green)]' },
                { stage: '4. Active Weekly Tele-Rehab Sessions Ongoing', count: '1,080', percent: '76%', color: 'bg-[#3B828E]' },
              ].map((f, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold text-[var(--foreground)]">
                    <span>{f.stage}</span>
                    <span className="text-[var(--gold)] font-mono">{f.count} ({f.percent})</span>
                  </div>
                  <div className="w-full bg-[var(--background-tertiary)] h-2 rounded-full overflow-hidden border border-[var(--border)]">
                    <div className={`h-full ${f.color} transition-all duration-500 rounded-full`} style={{ width: f.percent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Administrative Controls */}
          <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
            <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-[var(--gold)]" />
              <span>Administrative Controls</span>
            </h3>

            <div className="space-y-2.5">
              <button
                onClick={() => router.push('/admin/rehab-centres')}
                className="w-full p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--gold)] text-left text-xs font-semibold text-[var(--foreground)] flex justify-between items-center transition-colors"
              >
                <span>Online Programs & Protocols</span>
                <Layers className="w-4 h-4 text-[var(--gold)]" />
              </button>

              <button
                onClick={() => router.push('/admin/appointments')}
                className="w-full p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--gold)] text-left text-xs font-semibold text-[var(--foreground)] flex justify-between items-center transition-colors"
              >
                <span>Monitor Live Telehealth Sessions</span>
                <Video className="w-4 h-4 text-[var(--green)]" />
              </button>

              <button
                onClick={() => router.push('/admin/users')}
                className="w-full p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--gold)] text-left text-xs font-semibold text-[var(--foreground)] flex justify-between items-center transition-colors"
              >
                <span>Doctors & Patients Directory</span>
                <Users className="w-4 h-4 text-[var(--gold-light)]" />
              </button>

              <button
                onClick={() => router.push('/admin/cms')}
                className="w-full p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] hover:border-[var(--gold)] text-left text-xs font-semibold text-[var(--foreground)] flex justify-between items-center transition-colors"
              >
                <span>Public Portal CMS Management</span>
                <FileSpreadsheet className="w-4 h-4 text-[var(--gold)]" />
              </button>
            </div>
          </div>
        </div>

        {/* MANAGEMENT TABLES */}
        <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--border)] pb-3">
            <div className="flex items-center gap-2 flex-wrap">
              {(['programs', 'sessions', 'plans'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                    activeTab === t
                      ? 'bg-[var(--gold)] text-black font-bold shadow-md shadow-[var(--gold)]/20'
                      : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] bg-[var(--background-tertiary)] border border-[var(--border)]'
                  }`}
                >
                  {t === 'programs'
                    ? 'Virtual Programs & Protocols'
                    : t === 'sessions'
                    ? 'Live Telehealth Sessions'
                    : 'Prescribed Recovery Plans'}
                </button>
              ))}
            </div>

            <button
              onClick={() => alert('Full admin audit log exported (.xlsx)')}
              className="text-xs text-[var(--gold)] font-bold hover:underline"
            >
              Export Audit Trail
            </button>
          </div>

          {/* TAB 1: ONLINE PROGRAMS */}
          {activeTab === 'programs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--foreground-subtle)] font-semibold">
                    <th className="pb-3">Virtual Program</th>
                    <th className="pb-3">Attending Lead Doctor</th>
                    <th className="pb-3">Clinical Specialties</th>
                    <th className="pb-3">Active Patients</th>
                    <th className="pb-3">Format</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {programs.map((p) => (
                    <tr key={p.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                      <td className="py-3.5 font-bold text-[var(--foreground)]">{p.title}</td>
                      <td className="py-3.5 text-[var(--gold)] font-semibold">{p.leadDoctor}</td>
                      <td className="py-3.5 text-[var(--foreground-muted)]">{p.specialties.join(', ')}</td>
                      <td className="py-3.5 font-mono font-bold text-[var(--foreground)]">{p.activePatients}</td>
                      <td className="py-3.5 text-[var(--foreground-muted)]">{p.format}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'Active'
                            ? 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30'
                            : 'bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => toggleProgramStatus(p.id)}
                          className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                            p.status === 'Active'
                              ? 'bg-rose-950/40 text-rose-400 border border-rose-900/30 hover:bg-rose-900/50'
                              : 'bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30 hover:bg-[var(--green)]/30'
                          }`}
                        >
                          {p.status === 'Active' ? 'Pause Program' : 'Activate'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: LIVE SESSIONS */}
          {activeTab === 'sessions' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--foreground-subtle)] font-semibold">
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Attending Doctor</th>
                    <th className="pb-3">Program / Focus</th>
                    <th className="pb-3">Scheduled Time</th>
                    <th className="pb-3">Session Type</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3 text-right">Payment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {sessions.map((s) => (
                    <tr key={s.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                      <td className="py-3.5 font-bold text-[var(--foreground)]">{s.patient}</td>
                      <td className="py-3.5 text-[var(--gold)] font-semibold">{s.doctor}</td>
                      <td className="py-3.5 text-[var(--foreground-muted)]">{s.program}</td>
                      <td className="py-3.5 font-mono text-[var(--foreground)]">{s.scheduled}</td>
                      <td className="py-3.5 text-[var(--foreground-muted)]">{s.type}</td>
                      <td className="py-3.5">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          s.status === 'In Progress'
                            ? 'bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30 animate-pulse'
                            : 'bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30'
                        }`}>
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right font-semibold text-[var(--green)]">
                        {s.payment}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: PRESCRIBED RECOVERY PLANS */}
          {activeTab === 'plans' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[var(--border)] text-[var(--foreground-subtle)] font-semibold">
                    <th className="pb-3">Patient</th>
                    <th className="pb-3">Attending Physician</th>
                    <th className="pb-3">Digital Care Protocol</th>
                    <th className="pb-3">Protocol Adherence</th>
                    <th className="pb-3">Timeline</th>
                    <th className="pb-3 text-right">Trajectory</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  {activePlans.map((pln) => (
                    <tr key={pln.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                      <td className="py-3.5 font-bold text-[var(--foreground)]">{pln.patient}</td>
                      <td className="py-3.5 text-[var(--gold)] font-semibold">{pln.doctor}</td>
                      <td className="py-3.5 font-semibold text-[var(--foreground)]">{pln.planName}</td>
                      <td className="py-3.5 font-mono text-[var(--green)] font-bold">{pln.adherence}</td>
                      <td className="py-3.5 text-[var(--foreground-muted)]">{pln.week}</td>
                      <td className="py-3.5 text-right">
                        <span className="px-2.5 py-0.5 rounded-full bg-[var(--green)]/15 text-[var(--green)] border border-[var(--green)]/30 text-[10px] font-bold">
                          {pln.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
};
