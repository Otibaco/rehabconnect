"use client"
import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Users,
  Activity,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

interface OnlineProgram {
  id: string;
  title: string;
  category: string;
  leadDoctor: string;
  format: string;
  duration: string;
  activePatients: number;
  protocols: string[];
  status: 'Active' | 'Paused';
}

const INITIAL_PROGRAMS: OnlineProgram[] = [
  {
    id: 'prg-1',
    title: 'Virtual Stroke & Neuro Recovery Suite',
    category: 'Neurological Rehabilitation',
    leadDoctor: 'Dr. Amara Okafor, MD',
    format: '100% Online HD Video + Daily Vitals Log',
    duration: '12 Weeks',
    activePatients: 142,
    protocols: ['Upper/Lower Motor Retraining', 'Speech Tele-Therapy', 'Cognitive Focus Worksheets'],
    status: 'Active',
  },
  {
    id: 'prg-2',
    title: 'Substance & Addiction Online Intensive',
    category: 'Behavioral & Addiction Wellness',
    leadDoctor: 'Dr. David Adeleke, MD',
    format: '100% Online Confidential Tele-Therapy',
    duration: '16 Weeks',
    activePatients: 218,
    protocols: ['CBT Tele-Counseling', 'Daily Sobriety Check-In', 'Relapse Prevention Roadmaps'],
    status: 'Active',
  },
  {
    id: 'prg-3',
    title: 'Orthopedic & Post-Surgical Tele-Therapy',
    category: 'Physical & Musculoskeletal',
    leadDoctor: 'Dr. Sarah Jenkins, MD',
    format: '100% Online Biomechanical Video Analysis',
    duration: '8 Weeks',
    activePatients: 95,
    protocols: ['Joint Flexion Routines', 'Guided Isometric Drills', 'Remote Pain Scaling'],
    status: 'Active',
  },
  {
    id: 'prg-4',
    title: 'Trauma & Mental Health Virtual Program',
    category: 'Psychological Wellness',
    leadDoctor: 'Dr. Chioma Eze, PsyD',
    format: '100% Encrypted Video + Family Tele-Conferences',
    duration: '10 Weeks',
    activePatients: 180,
    protocols: ['Trauma-Informed CBT', 'Somatic Breathwork Protocols', 'Caregiver Coaching'],
    status: 'Active',
  },
  {
    id: 'prg-5',
    title: 'Spinal & Chronic Pain Virtual Protocol',
    category: 'Spinal & Ergonomic Health',
    leadDoctor: 'Dr. Michael Bello, MD',
    format: '100% Online Tele-Physiotherapy',
    duration: '12 Weeks',
    activePatients: 88,
    protocols: ['Core Stabilization Routines', 'Lumbar Flexion Guidance', 'Ergonomic Home Audits'],
    status: 'Active',
  },
  {
    id: 'prg-6',
    title: 'Pediatric & Developmental Virtual Suite',
    category: 'Pediatric Care',
    leadDoctor: 'Dr. Fatima Abubakar, MD',
    format: '100% Online Parent-Guided Video Therapy',
    duration: '14 Weeks',
    activePatients: 64,
    protocols: ['Sensory Motor Drills', 'Speech Development Exercises', 'Caregiver Milestones Log'],
    status: 'Active',
  },
];

export const AdminRehabCentresPage: React.FC = () => {
  const [programs, setPrograms] = useState<OnlineProgram[]>(INITIAL_PROGRAMS);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Neurological Rehabilitation');
  const [newDoctor, setNewDoctor] = useState('Dr. Amara Okafor, MD');
  const [newDuration, setNewDuration] = useState('8 Weeks');

  const toggleStatus = (id: string) => {
    setPrograms((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' } : p
      )
    );
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;
    const newProg: OnlineProgram = {
      id: `prg-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      leadDoctor: newDoctor,
      format: '100% Online Tele-Rehab',
      duration: newDuration,
      activePatients: 0,
      protocols: ['Initial Clinical Tele-Assessment', 'Custom Digital Movement Protocol'],
      status: 'Active',
    };
    setPrograms([newProg, ...programs]);
    setIsAdding(false);
    setNewTitle('');
  };

  return (
    <DashboardShell
      title="Online Programs & Digital Clinical Protocols"
      description="Manage 100% virtual rehabilitation programs, clinical specialty suites, evidence-based recovery protocols, and attending doctors."
      breadcrumbs={[{ label: 'Admin Portal', path: '/admin' }, { label: 'Online Programs' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="font-cinzel font-bold text-base sm:text-lg text-[var(--foreground)] flex items-center gap-2">
              <Layers className="w-5 h-5 text-[var(--gold)]" />
              <span>Virtual Tele-Rehabilitation Suites</span>
            </h3>
            <p className="text-xs text-[var(--foreground-muted)]">
              All programs are conducted 100% online through encrypted HD video consultations and digital patient portals.
            </p>
          </div>

          <button
            onClick={() => setIsAdding(!isAdding)}
            className="px-4 py-2 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[var(--gold)]/20 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>{isAdding ? 'Close Form' : 'Create Online Program'}</span>
          </button>
        </div>

        {/* CREATE PROGRAM FORM */}
        {isAdding && (
          <form onSubmit={handleAddProgram} className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--gold)]/40 space-y-4 shadow-xl">
            <h4 className="font-cinzel font-bold text-sm text-[var(--gold)]">
              Add New Virtual Rehabilitation Program
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Program Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Cardiac Tele-Rehabilitation Suite"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Clinical Category</label>
                <input
                  type="text"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Lead Attending Physician</label>
                <input
                  type="text"
                  value={newDoctor}
                  onChange={(e) => setNewDoctor(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="font-semibold text-[var(--foreground-muted)]">Standard Duration</label>
                <input
                  type="text"
                  value={newDuration}
                  onChange={(e) => setNewDuration(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] focus:border-[var(--gold)] outline-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[var(--gold)] text-black font-bold text-xs hover:bg-[var(--gold-light)] shadow-sm"
              >
                Publish Program
              </button>
            </div>
          </form>
        )}

        {/* PROGRAM CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {programs.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl hover:border-[var(--gold)]/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-[var(--gold)] uppercase tracking-wider">
                      {p.category}
                    </span>
                    <h4 className="font-cinzel font-bold text-base text-[var(--foreground)] mt-0.5">
                      {p.title}
                    </h4>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      p.status === 'Active'
                        ? 'bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30'
                        : 'bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-[var(--background-tertiary)] border border-[var(--border)] space-y-1.5 text-xs">
                  <div className="flex justify-between text-[var(--foreground-muted)]">
                    <span>Attending Lead:</span>
                    <span className="font-semibold text-[var(--foreground)]">{p.leadDoctor}</span>
                  </div>
                  <div className="flex justify-between text-[var(--foreground-muted)]">
                    <span>Program Format:</span>
                    <span className="font-semibold text-[var(--gold)]">{p.format}</span>
                  </div>
                  <div className="flex justify-between text-[var(--foreground-muted)]">
                    <span>Duration:</span>
                    <span className="font-semibold text-[var(--foreground)]">{p.duration}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-[var(--foreground-subtle)] text-[10px] uppercase">
                    Core Digital Protocols
                  </span>
                  <ul className="space-y-1">
                    {p.protocols.map((pr, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[var(--foreground-muted)]">
                        <Activity className="w-3 h-3 text-[var(--gold)] shrink-0" />
                        <span>{pr}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center pt-3 border-t border-[var(--border)] text-xs">
                <div className="flex items-center gap-1.5 text-[var(--foreground-muted)]">
                  <Users className="w-3.5 h-3.5 text-[var(--gold)]" />
                  <span className="font-semibold text-[var(--foreground)]">{p.activePatients}</span> active
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleStatus(p.id)}
                    className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                      p.status === 'Active'
                        ? 'bg-rose-950/40 text-rose-400 border border-rose-900/30 hover:bg-rose-900/50'
                        : 'bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30 hover:bg-[var(--green)]/30'
                    }`}
                  >
                    {p.status === 'Active' ? 'Pause' : 'Activate'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};
