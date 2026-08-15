import React, { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { useRouter } from '../../context/RouterContext';
import {
  Calendar,
  Clock,
  Video,
  Stethoscope,
  Users,
  Search,
  Filter,
  CheckCircle2,
  ChevronRight,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Plus
} from 'lucide-react';
import { motion } from 'motion/react';

export const CoordinatorConsultationsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [tab, setTab] = useState<'upcoming' | 'completed' | 'schedule'>('upcoming');
  const [search, setSearch] = useState('');

  const appointments = [
    {
      id: 'apt-1',
      patientName: 'Sarah Jenkins',
      age: 34,
      condition: 'Post-Surgical Knee & Spinal Tele-Therapy',
      date: 'Today, August 15',
      time: '10:30 AM - 11:15 AM',
      type: 'HD Video Consultation',
      status: 'upcoming' as const,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      reason: 'Review Week 2 range of motion and adjust resistance protocols.',
    },
    {
      id: 'apt-2',
      patientName: 'David Okafor (Family: Chidi)',
      age: 68,
      condition: 'Post-Stroke Hemiparesis Motor Rehabilitation',
      date: 'Today, August 15',
      time: '02:00 PM - 02:45 PM',
      type: 'Family Tele-Conference & Video Check',
      status: 'upcoming' as const,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      reason: 'Evaluate arm elevation progress and address caregiver home questions.',
    },
    {
      id: 'apt-3',
      patientName: 'Emmanuel Nwachukwu',
      age: 42,
      condition: 'Executive Burnout & Behavioral Wellness',
      date: 'Today, August 15',
      time: '04:15 PM - 05:00 PM',
      type: '1-on-1 Doctor Video Counseling',
      status: 'upcoming' as const,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      reason: 'Cognitive behavioral craving mapping and sleep hygiene review.',
    },
    {
      id: 'apt-4',
      patientName: 'Folake Adeleke',
      age: 29,
      condition: 'Repetitive Strain Injury & Ergonomic Rehab',
      date: 'Yesterday, August 14',
      time: '11:00 AM - 11:30 AM',
      type: 'HD Video Follow-up',
      status: 'completed' as const,
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      reason: 'Tendon glide routine assigned; symptoms resolving steadily.',
    },
  ];

  const filteredAppointments = appointments.filter((apt) => {
    const matchSearch = apt.patientName.toLowerCase().includes(search.toLowerCase()) ||
      apt.condition.toLowerCase().includes(search.toLowerCase());
    const matchTab = tab === 'upcoming' ? apt.status === 'upcoming' : apt.status === 'completed';
    return matchSearch && (tab === 'schedule' ? true : matchTab);
  });

  return (
    <DashboardShell
      title="Telehealth Consultations"
      description="Manage virtual clinical appointments, launch encrypted video calls, and set your availability."
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Consultations' }]}
    >
      <div className="space-y-6">
        {/* HEADER TOOLBAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          {/* Tabs */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('upcoming')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === 'upcoming'
                  ? 'bg-[var(--gold)] text-black shadow-md'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
              }`}
            >
              Upcoming Video Calls (3)
            </button>
            <button
              onClick={() => setTab('completed')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === 'completed'
                  ? 'bg-[var(--gold)] text-black shadow-md'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
              }`}
            >
              Completed History
            </button>
            <button
              onClick={() => setTab('schedule')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                tab === 'schedule'
                  ? 'bg-[var(--gold)] text-black shadow-md'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--foreground)] border border-[var(--border)]'
              }`}
            >
              Doctor Availability Hours
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient, date..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none w-48 sm:w-56"
              />
            </div>

            <button
              onClick={() => navigate('/coordinator/consultation-live')}
              className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] flex items-center gap-1.5 transition-all shadow-xs"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Instant Room</span>
            </button>
          </div>
        </div>

        {/* TAB CONTENTS */}
        {tab === 'schedule' ? (
          /* Availability Schedule Editor */
          <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--border)]">
              <Clock className="w-5 h-5 text-[var(--gold)]" />
              <div>
                <h3 className="font-cinzel font-bold text-lg text-[var(--foreground)]">
                  Online Telehealth Availability Window
                </h3>
                <span className="text-xs text-[var(--foreground-muted)]">
                  Define when online rehabilitation patients and family caregivers can book video visits.
                </span>
              </div>
            </div>

            <div className="space-y-4 max-w-2xl">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
                <div
                  key={day}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]"
                >
                  <span className="font-semibold text-xs text-[var(--foreground)] w-28">{day}</span>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)]">
                      09:00 AM
                    </span>
                    <span className="text-[var(--foreground-subtle)]">to</span>
                    <span className="px-2.5 py-1 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)]">
                      05:00 PM
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                    Active
                  </span>
                </div>
              ))}

              <div className="pt-4 flex items-center justify-between">
                <span className="text-xs text-[var(--foreground-muted)]">
                  Timezone: West Africa Time (GMT+1) • Nationwide Telehealth
                </span>
                <button className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] transition-all">
                  Save Availability
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Consultations List */
          <div className="space-y-4">
            {filteredAppointments.map((apt) => (
              <div
                key={apt.id}
                className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] shadow-md hover:border-[var(--gold)]/40 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={apt.avatar}
                    alt={apt.patientName}
                    className="w-14 h-14 rounded-2xl object-cover border-2 border-[var(--gold)]/30 flex-shrink-0"
                  />
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                        {apt.patientName}
                      </h3>
                      <span className="text-xs text-[var(--foreground-muted)] font-normal">
                        ({apt.age} years)
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          apt.status === 'upcoming'
                            ? 'bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {apt.date} • {apt.time}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--foreground-muted)] font-medium">
                      Condition: <span className="text-[var(--foreground)]">{apt.condition}</span>
                    </p>

                    <p className="text-[11px] text-[var(--foreground-subtle)] leading-relaxed">
                      Session Objective: {apt.reason}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[10px] text-emerald-400 font-medium">
                      <span className="flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        {apt.type}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-[var(--foreground-subtle)]">
                        <ShieldCheck className="w-3 h-3 text-[var(--gold)]" />
                        AES-256 Encrypted Tele-Room
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 sm:self-center">
                  {apt.status === 'upcoming' ? (
                    <>
                      <button
                        onClick={() => navigate('/coordinator/consultation-live')}
                        className="px-4 py-2.5 rounded-xl bg-[var(--gold)] text-black font-bold text-xs hover:bg-[var(--gold-light)] flex items-center gap-1.5 shadow-md transition-all"
                      >
                        <Video className="w-4 h-4" />
                        <span>Launch Call</span>
                      </button>
                      <button
                        onClick={() => navigate('/coordinator/messages')}
                        className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                        title="Send Message"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => navigate('/coordinator/patients')}
                      className="px-4 py-2 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-xs text-[var(--gold)] font-semibold hover:bg-[var(--gold)] hover:text-black transition-all"
                    >
                      View Chart & Notes
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardShell>
  );
};
