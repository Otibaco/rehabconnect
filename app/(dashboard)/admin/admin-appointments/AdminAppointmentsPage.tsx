"use client"
import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Video,
  Users,
  Search,
  CheckCircle2,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const AdminAppointmentsPage: React.FC = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const appointments = [
    {
      id: 'apt-adm-1',
      patientName: 'Sarah Jenkins',
      doctorName: 'Dr. Amara Okafor, MD',
      condition: 'Post-Surgical Knee & Spinal Tele-Therapy',
      date: 'Today, 10:30 AM',
      type: 'HD Video Consultation',
      status: 'Confirmed' as const,
      paymentStatus: 'Paid',
    },
    {
      id: 'apt-adm-2',
      patientName: 'David Okafor (Father)',
      doctorName: 'Dr. Amara Okafor, MD',
      condition: 'Ischemic Stroke Motor Rehabilitation',
      date: 'Today, 02:00 PM',
      type: 'Family Tele-Conference',
      status: 'Confirmed' as const,
      paymentStatus: 'Paid',
    },
    {
      id: 'apt-adm-3',
      patientName: 'Emmanuel Nwachukwu',
      doctorName: 'Dr. Sarah Jenkins, MD',
      condition: 'Executive Burnout & Behavioral Wellness',
      date: 'Today, 04:15 PM',
      type: 'Doctor Video Counseling',
      status: 'Confirmed' as const,
      paymentStatus: 'Paid',
    },
  ];

  return (
    <DashboardShell
      title="Telehealth Consultations Administration"
      description="Monitor all online doctor consultations, tele-session traffic, and live connections across the platform."
      breadcrumbs={[{ label: 'Admin Portal' }, { label: 'Telehealth Sessions' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel font-bold text-base sm:text-lg text-[var(--foreground)]">
                Global Telehealth Sessions Ledger
              </h2>
              <span className="text-xs text-[var(--foreground-muted)]">
                All Tele-Rehab Video Calls are End-to-End Encrypted
              </span>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search patient, doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none w-56"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[var(--background-tertiary)] border-b border-[var(--border)] text-[var(--foreground-subtle)] uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-4">Patient</th>
                <th className="p-4">Attending Doctor</th>
                <th className="p-4">Tele-Session Type</th>
                <th className="p-4">Scheduled Time</th>
                <th className="p-4">Status</th>
                <th className="p-4">Payment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)] text-[var(--foreground)]">
              {appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                  <td className="p-4 font-semibold">{apt.patientName}</td>
                  <td className="p-4 text-[var(--gold)] font-medium">{apt.doctorName}</td>
                  <td className="p-4 text-[var(--foreground-muted)]">{apt.type}</td>
                  <td className="p-4">{apt.date}</td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {apt.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                      {apt.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardShell>
  );
};
