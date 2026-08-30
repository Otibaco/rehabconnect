"use client"
import React from 'react';
import {
  Calendar,
  Video,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

// ── Local types ──────────────────────────────────────────────────────────
interface ConfirmedAppointment {
  id: string;
  coordinatorName: string;
  coordinatorTitle: string;
  coordinatorAvatar: string;
  type: string;
  date: string;
  timeSlot: string;
}

// ── Mock data — replace with real fetches/session data ──────────────────
const MOCK_APPOINTMENT: ConfirmedAppointment = {
  id: 'apt_1',
  coordinatorName: 'Dr. Amara Okafor',
  coordinatorTitle: 'Senior Neurological & Physical Care Lead',
  coordinatorAvatar: 'https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&w=400&q=80',
  type: 'video',
  date: 'Wed, Aug 5',
  timeSlot: '10:30 AM',
};

export const PatientAppointmentConfirmationPage: React.FC = () => {
  const router = useRouter();

  // Swap this for the real appointment (e.g. from the just-created booking
  // or a fetch by ID) once the backend is ready — nothing below this point
  // needs to change.
  const appointment = MOCK_APPOINTMENT;

  return (
    <DashboardShell
      title="Appointment Confirmed"
      description="Your upcoming clinical consultation details and live session link."
      breadcrumbs={[
        { label: 'Healthcare Portal', path: '/patient' },
        { label: 'Confirmed Appointment' },
      ]}
      role="patient"
    >
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 text-center shadow-2xl relative overflow-hidden"
        >
          {/* Accent top gradient bar */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[var(--gold)] via-[var(--gold-light)] to-[var(--gold-dark)]" />

          <div className="w-16 h-16 rounded-full bg-[var(--green)]/20 text-[var(--green)] flex items-center justify-center mx-auto shadow-md border border-[var(--green)]/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h2 className="font-cinzel font-bold text-2xl text-[var(--foreground)]">
              Consultation Confirmed
            </h2>
            <p className="text-xs text-[var(--gold)] font-bold uppercase tracking-wider">
              Starts in 2 Days • {appointment.date} at {appointment.timeSlot}
            </p>
          </div>

          {/* Details Card */}
          <div className="p-5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] text-left space-y-4 text-xs">
            <div className="flex items-center gap-4 pb-3 border-b border-[var(--border)]">
              <img
                src={appointment.coordinatorAvatar}
                alt={appointment.coordinatorName}
                className="w-14 h-14 rounded-2xl object-cover border border-[var(--border-subtle)]"
              />
              <div>
                <h3 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                  {appointment.coordinatorName}
                </h3>
                <p className="text-[var(--foreground-muted)]">{appointment.coordinatorTitle}</p>
                <span className="inline-block px-2.5 py-0.5 mt-1 rounded-full bg-[var(--gold)]/10 border border-[var(--border-subtle)] text-[var(--gold)] text-[10px] font-bold capitalize">
                  {appointment.type} Session • 45 Mins
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-[var(--foreground)]">
              <div>
                <span className="text-[var(--foreground-subtle)] block text-[10px] font-bold uppercase">Date</span>
                <span className="font-bold">{appointment.date}</span>
              </div>
              <div>
                <span className="text-[var(--foreground-subtle)] block text-[10px] font-bold uppercase">Time Slot</span>
                <span className="font-bold">{appointment.timeSlot}</span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => router.push('/patient/consultation-live')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs shadow-md shadow-[var(--gold)]/20 flex items-center justify-center gap-2 transition-all hover:scale-105"
            >
              <Video className="w-4 h-4 text-black" />
              <span>Launch Live Session Portal</span>
            </button>

            <button
              onClick={() => alert('Calendar event (.ics) exported')}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] font-bold text-xs hover:border-[var(--gold)] flex items-center justify-center gap-2 transition-colors"
            >
              <Calendar className="w-4 h-4 text-[var(--gold)]" />
              <span>Add to Calendar</span>
            </button>
          </div>
        </motion.div>
      </div>
    </DashboardShell>
  );
};