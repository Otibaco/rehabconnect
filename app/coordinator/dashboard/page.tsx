import React, { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import { MOCK_PATIENTS, CARE_COORDINATORS, MOCK_CLINICAL_RESOURCES } from '../../data/mockData';
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
  BookOpen,
  ChevronRight,
  PhoneCall,
  UserCheck,
  TrendingUp,
  HeartPulse,
  Send,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { motion } from 'motion/react';

export const CoordinatorDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { currentUser } = useAuth();
  const [quickNote, setQuickNote] = useState('');
  const [noteSent, setNoteSent] = useState(false);

  const todaySessions = [
    {
      id: 'sess-1',
      patientName: 'Sarah Jenkins',
      condition: 'Post-Surgical Knee & Spinal Tele-Therapy',
      time: '10:30 AM',
      status: 'upcoming' as const,
      type: 'HD Video Tele-Rehab',
      duration: '45 mins',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'sess-2',
      patientName: 'David Okafor (Family: Chidi)',
      condition: 'Ischemic Stroke Motor Rehabilitation Follow-up',
      time: '02:00 PM',
      status: 'confirmed' as const,
      type: 'Clinical Progress Evaluation',
      duration: '30 mins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    },
    {
      id: 'sess-3',
      patientName: 'Emmanuel Nwachukwu',
      condition: 'Burnout & Emotional Wellness Video Check-in',
      time: '04:15 PM',
      status: 'confirmed' as const,
      type: '1-on-1 Doctor Counseling',
      duration: '45 mins',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
  ];

  const handlePostNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickNote.trim()) return;
    setNoteSent(true);
    setTimeout(() => {
      setQuickNote('');
      setNoteSent(false);
    }, 2000);
  };

  return (
    <DashboardShell
      title="Doctor Clinical Overview"
      description="100% Online Rehabilitation Clinical Suite & Telehealth Command Center"
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Overview' }]}
    >
      <div className="space-y-6">
        {/* TOP DOCTOR WELCOME BANNER (Black & Gold luxury) */}
        <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 sm:p-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--background-tertiary)] text-[var(--gold)] border border-[var(--border-subtle)] text-xs font-semibold">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Attending Telehealth Physician • Dr. Amara Okafor, MD</span>
              </div>
              <h1 className="font-cinzel font-bold text-2xl sm:text-3xl text-[var(--foreground)] tracking-tight">
                Clinical Overview & Active Tele-Rehab Cases
              </h1>
              <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-2xl">
                Managing remote rehabilitation trajectories, conducting high-definition telehealth video visits, and monitoring patient recovery vitals across Nigeria and globally.
              </p>
            </div>

            {/* Quick Action Launch Telehealth Room */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigate('/coordinator/consultation-live')}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-black font-bold text-xs shadow-lg shadow-[var(--gold)]/20 hover:opacity-90 flex items-center gap-2 transition-transform transform active:scale-95"
              >
                <Video className="w-4 h-4" />
                <span>Launch Video Telehealth Room</span>
              </button>

              <button
                onClick={() => navigate('/coordinator/patients')}
                className="px-4 py-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] hover:text-[var(--gold)] hover:border-[var(--gold)] text-xs font-semibold transition-colors flex items-center gap-2"
              >
                <Users className="w-4 h-4 text-[var(--gold)]" />
                <span>Patient Roster</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6 pt-6 border-t border-[var(--border)]">
            <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
              <span className="text-[10px] tracking-wider uppercase text-[var(--foreground-subtle)] font-medium block">
                Active Tele-Patients
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-cinzel text-[var(--foreground)]">28</span>
                <span className="text-[10px] text-[var(--gold)] font-medium">100% Online</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
              <span className="text-[10px] tracking-wider uppercase text-[var(--foreground-subtle)] font-medium block">
                Today's Video Sessions
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-cinzel text-[var(--gold)]">3 Visits</span>
                <span className="text-[10px] text-emerald-400 font-medium">Next at 10:30 AM</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
              <span className="text-[10px] tracking-wider uppercase text-[var(--foreground-subtle)] font-medium block">
                Prescribed Resources
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-cinzel text-[var(--foreground)]">45</span>
                <span className="text-[10px] text-teal-400 font-medium">Digital Guides</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
              <span className="text-[10px] tracking-wider uppercase text-[var(--foreground-subtle)] font-medium block">
                Recovery Adherence
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-xl font-bold font-cinzel text-[var(--gold)]">96.8%</span>
                <span className="text-[10px] text-emerald-400 font-medium">+4.2% this mo</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2-COLUMN MAIN CONTENT: TODAY'S TELEHEALTH ROSTER + ACTIVE PATIENTS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column (8 cols): Today's Schedule & Telehealth Room */}
          <div className="lg:col-span-8 space-y-6">
            {/* Today's Video Consultations */}
            <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-cinzel font-bold text-base text-[var(--foreground)]">
                      Today's Scheduled Consultations
                    </h2>
                    <span className="text-[11px] text-[var(--foreground-muted)]">
                      3 Telehealth Video Sessions Confirmed
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/coordinator/consultations')}
                  className="text-xs text-[var(--gold)] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>View All Schedule</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Consultation Cards */}
              <div className="space-y-3">
                {todaySessions.map((session, idx) => (
                  <div
                    key={session.id}
                    className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--gold)]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-3.5">
                      <img
                        src={session.avatar}
                        alt={session.patientName}
                        className="w-12 h-12 rounded-2xl object-cover border border-[var(--border)]"
                      />
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-sm text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                            {session.patientName}
                          </h4>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30">
                            {session.time}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--foreground-muted)]">
                          {session.condition}
                        </p>
                        <div className="flex items-center gap-2 text-[10px] text-[var(--foreground-subtle)]">
                          <span className="inline-flex items-center gap-1 text-emerald-400">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            {session.type}
                          </span>
                          <span>•</span>
                          <span>{session.duration}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:self-center">
                      <button
                        onClick={() => navigate('/coordinator/consultation-live')}
                        className="px-3.5 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] flex items-center gap-1.5 transition-all shadow-xs"
                      >
                        <Video className="w-3.5 h-3.5" />
                        <span>Join Call</span>
                      </button>
                      <button
                        onClick={() => navigate('/coordinator/messages')}
                        className="p-2 rounded-xl bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:border-[var(--gold)] transition-colors"
                        title="Direct Message"
                      >
                        <MessageSquare className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Tele-Rehab Patient Roster Preview */}
            <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
                    <Users className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="font-cinzel font-bold text-base text-[var(--foreground)]">
                      Active Online Rehabilitation Patients
                    </h2>
                    <span className="text-[11px] text-[var(--foreground-muted)]">
                      Under direct online medical supervision
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate('/coordinator/patients')}
                  className="text-xs text-[var(--gold)] hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Open Full Patient Roster</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {MOCK_PATIENTS.map((patient) => (
                  <div key={patient.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={patient.avatar}
                        alt={patient.name}
                        className="w-10 h-10 rounded-xl object-cover border border-[var(--border)]"
                      />
                      <div>
                        <h4 className="font-semibold text-xs text-[var(--foreground)]">
                          {patient.name} ({patient.age}y, {patient.gender})
                        </h4>
                        <p className="text-[11px] text-[var(--foreground-muted)]">
                          {patient.condition}
                        </p>
                        <span className="text-[10px] text-[var(--gold)] font-medium">
                          Program: {patient.matchedCentreName}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="hidden sm:inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        Active Tele-Care
                      </span>
                      <button
                        onClick={() => navigate('/coordinator/patients')}
                        className="p-1.5 rounded-lg bg-[var(--background-tertiary)] text-[var(--foreground-muted)] hover:text-[var(--gold)] border border-[var(--border)]"
                        title="View Patient Chart"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (4 cols): Quick Clinical Tools & Notes */}
          <div className="lg:col-span-4 space-y-6">
            {/* Prescribed Clinical Resources Quick Launch */}
            <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--gold)]" />
                  <h3 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                    Clinical Care Resources
                  </h3>
                </div>
                <button
                  onClick={() => navigate('/coordinator/resources')}
                  className="text-[11px] text-[var(--gold)] hover:underline font-semibold"
                >
                  Manage
                </button>
              </div>

              <p className="text-xs text-[var(--foreground-muted)]">
                Digital exercise guides and protocols ready to prescribe during video calls.
              </p>

              <div className="space-y-2.5">
                {MOCK_CLINICAL_RESOURCES.slice(0, 3).map((res) => (
                  <div
                    key={res.id}
                    className="p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-1 hover:border-[var(--gold)]/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider">
                        {res.category}
                      </span>
                      <span className="text-[9px] text-[var(--foreground-subtle)]">{res.format}</span>
                    </div>
                    <h5 className="font-semibold text-xs text-[var(--foreground)] line-clamp-1">
                      {res.title}
                    </h5>
                    <p className="text-[10px] text-[var(--foreground-muted)] line-clamp-2">
                      {res.description}
                    </p>
                  </div>
                ))}
              </div>

              <button
                onClick={() => navigate('/coordinator/resources')}
                className="w-full py-2 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-xs font-semibold text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black transition-all flex items-center justify-center gap-1.5"
              >
                <span>Browse All 15+ Clinical Protocols</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            {/* Quick Telehealth Clinical Note Pad */}
            <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                  Doctor Clinical Scratchpad
                </h3>
              </div>
              <p className="text-[11px] text-[var(--foreground-muted)]">
                Draft quick clinical observations or prescription reminders to save to your records.
              </p>

              <form onSubmit={handlePostNote} className="space-y-2.5">
                <textarea
                  rows={3}
                  value={quickNote}
                  onChange={(e) => setQuickNote(e.target.value)}
                  placeholder="e.g., Sarah's knee extension improved to 110 degrees; prescribe Level 2 resistance exercises..."
                  className="w-full p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-xs text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none resize-none"
                />
                
                {noteSent && (
                  <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Observation saved to patient chart!</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!quickNote.trim()}
                  className="w-full py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold disabled:opacity-40 hover:bg-[var(--gold-light)] transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Send className="w-3 h-3" />
                  <span>Save Clinical Note</span>
                </button>
              </form>
            </div>

            {/* Telehealth Room Status */}
            <div className="p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--foreground-muted)]">Telehealth Audio/Video:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Online & Encrypted
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="font-medium text-[var(--foreground-muted)]">License Verification:</span>
                <span className="text-[var(--gold)] font-bold">MD-NG-784192 (Active)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
