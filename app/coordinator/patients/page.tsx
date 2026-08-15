import React, { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { useRouter } from '../../context/RouterContext';
import { MOCK_PATIENTS, MOCK_CLINICAL_RESOURCES } from '../../data/mockData';
import {
  Users,
  Search,
  Filter,
  Stethoscope,
  Video,
  MessageSquare,
  FileText,
  Activity,
  Sparkles,
  ChevronRight,
  HeartPulse,
  Clock,
  CheckCircle2,
  Calendar,
  BookOpen,
  PlusCircle,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CoordinatorPatientsPage: React.FC = () => {
  const { navigate } = useRouter();
  const [selectedPatientId, setSelectedPatientId] = useState<string>(MOCK_PATIENTS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [showPrescribeModal, setShowPrescribeModal] = useState(false);
  const [prescribedSuccess, setPrescribedSuccess] = useState(false);

  const filteredPatients = MOCK_PATIENTS.filter((pat) => {
    const matchSearch = pat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pat.condition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchSeverity = filterSeverity === 'all' || pat.severity === filterSeverity;
    return matchSearch && matchSeverity;
  });

  const selectedPatient = MOCK_PATIENTS.find((p) => p.id === selectedPatientId) || MOCK_PATIENTS[0];

  const handlePrescribeResource = (resTitle: string) => {
    setPrescribedSuccess(true);
    setTimeout(() => {
      setPrescribedSuccess(false);
      setShowPrescribeModal(false);
    }, 1500);
  };

  return (
    <DashboardShell
      title="Online Patient Roster"
      description="Supervise remote rehabilitation trajectories, review clinical history, and coordinate care."
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Patients' }]}
    >
      <div className="space-y-6">
        {/* HEADER TOOLBAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel font-bold text-lg text-[var(--foreground)]">
                Assigned Telehealth Patients ({MOCK_PATIENTS.length})
              </h2>
              <span className="text-xs text-[var(--foreground-muted)]">
                100% Online Supervised Rehabilitation Pathways
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient name, condition..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-4 py-2 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none w-56 sm:w-64"
              />
            </div>

            {/* Severity Filter */}
            <select
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
              className="py-2 px-3 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] focus:outline-none"
            >
              <option value="all">All Triage Levels</option>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
        </div>

        {/* 2-COLUMN PATIENT SELECTOR & CLINICAL CHART */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Patient List (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            {filteredPatients.map((patient) => {
              const isSelected = patient.id === selectedPatientId;
              return (
                <div
                  key={patient.id}
                  onClick={() => setSelectedPatientId(patient.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[var(--background-tertiary)] border-[var(--gold)] shadow-lg shadow-[var(--gold)]/5'
                      : 'bg-[var(--background-secondary)] border-[var(--border)] hover:border-[var(--gold)]/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-12 h-12 rounded-xl object-cover border border-[var(--border)] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-xs sm:text-sm text-[var(--foreground)] truncate">
                          {patient.name}
                        </h4>
                        <span
                          className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            patient.severity === 'severe'
                              ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                              : patient.severity === 'moderate'
                              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          }`}
                        >
                          {patient.severity}
                        </span>
                      </div>
                      <p className="text-[11px] text-[var(--foreground-muted)] line-clamp-1">
                        {patient.condition}
                      </p>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] text-[var(--gold)] font-medium truncate">
                          {patient.matchedCentreName}
                        </span>
                        <span className="text-[10px] text-[var(--foreground-subtle)]">
                          {patient.assignedDate}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Patient Clinical Chart (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] p-6 sm:p-8 space-y-6 shadow-xl relative overflow-hidden">
              {/* Top Patient Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border)]">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedPatient.avatar}
                    alt={selectedPatient.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[var(--gold)]/40 shadow-md"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-cinzel font-bold text-xl text-[var(--foreground)]">
                        {selectedPatient.name}
                      </h3>
                      <span className="text-xs text-[var(--foreground-muted)]">
                        ({selectedPatient.age} yrs, {selectedPatient.gender})
                      </span>
                    </div>
                    <p className="text-xs text-[var(--foreground-muted)] font-medium">
                      Primary Diagnosis: <span className="text-[var(--gold)]">{selectedPatient.condition}</span>
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-[var(--foreground-subtle)]">
                      <span>Online Program: {selectedPatient.matchedCentreName}</span>
                      <span>•</span>
                      <span>Enrolled: {selectedPatient.assignedDate}</span>
                    </div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate('/coordinator/consultation-live')}
                    className="px-3.5 py-2 rounded-xl bg-[var(--gold)] text-black font-bold text-xs hover:bg-[var(--gold-light)] flex items-center gap-1.5 transition-all shadow-xs"
                  >
                    <Video className="w-3.5 h-3.5" />
                    <span>Start Video Session</span>
                  </button>
                  <button
                    onClick={() => navigate('/coordinator/messages')}
                    className="px-3 py-2 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] hover:text-[var(--gold)] hover:border-[var(--gold)] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </button>
                </div>
              </div>

              {/* Vitals & Tele-Rehab Progress Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-subtle)] font-medium block">
                    Recovery Score
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-lg font-bold font-cinzel text-[var(--gold)]">82%</span>
                    <span className="text-[9px] text-emerald-400 font-medium">+12%</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-subtle)] font-medium block">
                    Mobility Range
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-lg font-bold font-cinzel text-[var(--foreground)]">115°</span>
                    <span className="text-[9px] text-emerald-400 font-medium">Flexion</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-subtle)] font-medium block">
                    Completed Sessions
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-lg font-bold font-cinzel text-[var(--foreground)]">8 / 12</span>
                    <span className="text-[9px] text-teal-400 font-medium">Virtual</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--foreground-subtle)] font-medium block">
                    Pain Index
                  </span>
                  <div className="flex items-baseline gap-1.5 mt-1">
                    <span className="text-lg font-bold font-cinzel text-emerald-400">2 / 10</span>
                    <span className="text-[9px] text-emerald-400 font-medium">Reduced</span>
                  </div>
                </div>
              </div>

              {/* Attending Doctor's Clinical Treatment Plan */}
              <div className="space-y-3 p-4 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[var(--gold)]" />
                    <h4 className="font-cinzel font-bold text-xs sm:text-sm text-[var(--foreground)]">
                      Attending Doctor Clinical Observations & Plan
                    </h4>
                  </div>
                  <span className="text-[10px] text-[var(--foreground-subtle)]">
                    Updated Today by Dr. Amara Okafor, MD
                  </span>
                </div>
                <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                  {selectedPatient.notes} Patient is demonstrating consistent adherence to home video exercises. Video gait review shows steady biomechanical alignment with minimal compensation.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--gold)]">
                    ✓ Hydrotherapy Video Routine
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--gold)]">
                    ✓ Weekly Telehealth Progress Check-in
                  </span>
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--gold)]">
                    ✓ Daily Digital Mobility Log
                  </span>
                </div>
              </div>

              {/* Prescribed Clinical Resources Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[var(--gold)]" />
                    <h4 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                      Prescribed Tele-Rehab Protocols
                    </h4>
                  </div>
                  <button
                    onClick={() => setShowPrescribeModal(true)}
                    className="text-xs text-[var(--gold)] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Prescribe New Protocol</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {MOCK_CLINICAL_RESOURCES.slice(0, 2).map((res) => (
                    <div
                      key={res.id}
                      className="p-3.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[var(--gold)]">{res.category}</span>
                        <span className="text-[var(--foreground-subtle)]">{res.format}</span>
                      </div>
                      <h5 className="font-semibold text-xs text-[var(--foreground)]">{res.title}</h5>
                      <p className="text-[10px] text-[var(--foreground-muted)] line-clamp-2">
                        {res.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRESCRIBE PROTOCOL MODAL */}
      <AnimatePresence>
        {showPrescribeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[var(--background-secondary)] rounded-3xl border border-[var(--border)] p-6 max-w-lg w-full space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--gold)]" />
                  <h3 className="font-cinzel font-bold text-base text-[var(--foreground)]">
                    Prescribe Tele-Rehab Protocol
                  </h3>
                </div>
                <button
                  onClick={() => setShowPrescribeModal(false)}
                  className="text-xs text-[var(--foreground-muted)] hover:text-white"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-[var(--foreground-muted)]">
                Select a digital clinical resource to add to {selectedPatient.name}'s recovery portal:
              </p>

              {prescribedSuccess ? (
                <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <h4 className="font-bold text-sm text-emerald-400">Protocol Prescribed!</h4>
                  <p className="text-xs text-[var(--foreground-muted)]">
                    Digital guide has been dispatched to the patient's portal and logged to their clinical chart.
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {MOCK_CLINICAL_RESOURCES.map((res) => (
                    <div
                      key={res.id}
                      onClick={() => handlePrescribeResource(res.title)}
                      className="p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] hover:border-[var(--gold)] cursor-pointer transition-colors space-y-1"
                    >
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="font-bold text-[var(--gold)]">{res.category}</span>
                        <span className="text-[var(--foreground-subtle)]">{res.format}</span>
                      </div>
                      <h5 className="font-semibold text-xs text-[var(--foreground)]">{res.title}</h5>
                      <p className="text-[10px] text-[var(--foreground-muted)]">{res.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </DashboardShell>
  );
};
