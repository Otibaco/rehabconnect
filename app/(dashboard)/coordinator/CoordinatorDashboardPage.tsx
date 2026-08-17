"use client"
import React from 'react';
import {
  Stethoscope,
  Video,
  Users,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  Activity,
  Sparkles,
  MessageSquare,
  ClipboardList,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/context/AuthContext';

export const CoordinatorDashboardPage: React.FC = () => {
  const router = useRouter();
  const { currentUser, coordinatorPatients, followUps, completeFollowUp, appointments, summaries } = useAuth();

  const pendingFollowUps = followUps.filter((f) => f.status === 'pending');
  const todayAppointments = appointments.filter((a) => a.status === 'scheduled');

  return (
    <DashboardShell
      title={`Clinical Dashboard — Dr. Folake Adeyemi`}
      description="Lead Care Coordinator Workspace. Oversee patient care journeys, conduct telehealth sessions, and manage post-consultation follow-ups."
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Overview' }]}
    >
      <div className="space-y-6 max-w-6xl">
        {/* STATS OVERVIEW CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--foreground-muted)]">Active Patients</span>
              <Users className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="text-2xl font-bold font-cinzel text-[var(--foreground)]">{coordinatorPatients.length}</p>
            <p className="text-[11px] text-[var(--gold)]">Across 5 Care Stages</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--foreground-muted)]">Today's Sessions</span>
              <Calendar className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-bold font-cinzel text-[var(--foreground)]">{todayAppointments.length}</p>
            <p className="text-[11px] text-emerald-400">Telehealth Video Ready</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--foreground-muted)]">Pending Follow-Ups</span>
              <ClipboardList className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-bold font-cinzel text-[var(--foreground)]">{pendingFollowUps.length}</p>
            <p className="text-[11px] text-amber-400">Due for review today</p>
          </div>

          <div className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--foreground-muted)]">Published Summaries</span>
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
            <p className="text-2xl font-bold font-cinzel text-[var(--foreground)]">{summaries.length}</p>
            <p className="text-[11px] text-blue-400">EHR Synced</p>
          </div>
        </div>

        {/* 2-COLUMN MAIN CLINICAL WORKSPACE */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2 COLUMNS: TODAY'S TELEHEALTH CONSULTATIONS & PATIENTS DIRECTORY */}
          <div className="lg:col-span-2 space-y-6">
            {/* Today's Schedule Card */}
            <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-[var(--gold)]" />
                  <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Today's Consultation Queue</h3>
                </div>
                <button
                  onClick={() => router.push('/dashboard/coordinator/consultations')}
                  className="text-xs font-bold text-[var(--gold)] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Queue</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[var(--gold)]/40 transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-full bg-[var(--gold)]/20 text-[var(--gold)] flex items-center justify-center font-bold font-mono text-xs shrink-0">
                        {apt.timeSlot.split(' ')[0]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">
                            {apt.patientName || 'Sarah Jenkins'}
                          </h4>
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                            {apt.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--foreground-muted)]">{apt.date} • {apt.timeSlot}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push('/consultation/live')}
                        className="px-3.5 py-2 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold flex items-center gap-1.5 shadow-sm transition-transform active:scale-95 whitespace-nowrap"
                      >
                        <Video className="w-3.5 h-3.5 text-black" />
                        <span>Launch Session</span>
                      </button>
                      <button
                        onClick={() => router.push('/dashboard/coordinator/consultations')}
                        className="px-3 py-2 rounded-xl bg-[var(--background-secondary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs text-[var(--foreground)] whitespace-nowrap"
                      >
                        Write Summary
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Patients Directory Preview */}
            <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[var(--gold)]" />
                  <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Active Assigned Patients</h3>
                </div>
                <button
                  onClick={() => router.push('/dashboard/coordinator/patients')}
                  className="text-xs font-bold text-[var(--gold)] hover:underline flex items-center gap-1"
                >
                  <span>View All Directory</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-[var(--border-subtle)]">
                {coordinatorPatients.slice(0, 3).map((p) => (
                  <div key={p.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.avatar}
                        alt={p.name}
                        className="w-10 h-10 rounded-full object-cover border border-[var(--gold)]"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">{p.name}</h4>
                          <span className="px-2 py-0.2 rounded-full text-[10px] font-bold bg-[var(--gold)]/10 text-[var(--gold)]">
                            {p.journeyStage}
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--foreground-muted)]">{p.condition}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => router.push('/dashboard/coordinator/messages')}
                        className="p-2 rounded-lg bg-[var(--background-tertiary)] hover:bg-[var(--border)] text-[var(--foreground)] text-xs flex items-center gap-1 transition-colors"
                        title="Chat"
                      >
                        <MessageSquare className="w-4 h-4 text-[var(--gold)]" />
                      </button>
                      <button
                        onClick={() => router.push('/dashboard/coordinator/consultations')}
                        className="px-3 py-1.5 rounded-lg bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs text-[var(--foreground)] transition-colors"
                      >
                        Write Summary
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: DUE CLINICAL FOLLOW-UPS */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[var(--gold)]" />
                  <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">Follow-Up Action Items</h3>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">
                  {pendingFollowUps.length} Due
                </span>
              </div>

              <p className="text-xs text-[var(--foreground-muted)]">
                Automated clinical follow-up tasks generated from completed consultation summaries.
              </p>

              <div className="space-y-3">
                {followUps.map((flw) => {
                  const isDone = flw.status === 'completed';
                  return (
                    <div
                      key={flw.id}
                      className={`p-3.5 rounded-xl border space-y-2.5 transition-colors ${
                        isDone
                          ? 'bg-[var(--background-tertiary)]/40 border-[var(--border-subtle)] opacity-60'
                          : 'bg-[var(--background-tertiary)] border-[var(--border-subtle)]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <img
                            src={flw.patientAvatar}
                            alt={flw.patientName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <h5 className="font-bold text-xs text-[var(--foreground)]">{flw.patientName}</h5>
                            <span className="text-[10px] text-[var(--gold)]">{flw.targetDate}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => completeFollowUp(flw.id)}
                          className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
                            isDone
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : 'bg-[var(--background-secondary)] hover:bg-[var(--gold)] hover:text-black border-[var(--border)] text-[var(--foreground-muted)]'
                          }`}
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="text-[10px]">{isDone ? 'Done' : 'Mark Done'}</span>
                        </button>
                      </div>

                      <p className="text-xs text-[var(--foreground)] leading-snug">
                        {flw.reason}
                      </p>

                      {flw.notes && (
                        <div className="text-[10px] text-[var(--foreground-muted)] bg-[var(--background-secondary)] p-2 rounded-lg border border-[var(--border-subtle)]">
                          Note: "{flw.notes}"
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => router.push('/dashboard/coordinator/follow-ups')}
                className="w-full py-2 rounded-xl bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border)] text-xs font-semibold text-[var(--foreground)] transition-colors"
              >
                View Full Follow-Up Board
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
