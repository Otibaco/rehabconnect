import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockPatients, mockConsultations } from '../../lib/dashboardData';
import { StatusBadge } from '../../components/dashboard/ui/StatusBadge';
import { User, Phone, MapPin, AlertTriangle, FileText, Calendar, Plus, ChevronLeft, ShieldCheck, Video } from 'lucide-react';

export const CoordinatorPatientDetailPage: React.FC = () => {
  const { id } = useParams();
  const patient = mockPatients.find((p) => p.id === id) || mockPatients[0];
  const [noteText, setNoteText] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    'Initial clinical intake completed. Patient exhibits strong motivation for recovery.'
  ]);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setNotesList([noteText, ...notesList]);
    setNoteText('');
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* BREADCRUMB & HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <Link
          to="/dashboard/patients"
          className="font-mono text-xs text-[var(--gold)] hover:underline flex items-center gap-1 font-bold"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>BACK TO PATIENT DIRECTORY</span>
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to={`/dashboard/consultation-room/cns_101`}
            className="px-4 py-2 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors flex items-center gap-1.5 shadow-lg"
          >
            <Video className="w-3.5 h-3.5" />
            <span>LAUNCH CONSULTATION ROOM</span>
          </Link>
        </div>
      </div>

      {/* PATIENT OVERVIEW HEADER CARD */}
      <div className="p-6 sm:p-8 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 shadow-2xl crosshair-corner">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--gold)] font-bold uppercase mb-1">
              <span>PATIENT CASE FILE ID: #{patient.id}</span>
            </div>
            <h1 className="font-cinzel text-3xl font-bold text-[var(--foreground)]">
              {patient.name}
            </h1>
            <div className="font-mono text-xs text-[var(--foreground-subtle)] mt-1">
              {patient.age} YRS • {patient.gender} • {patient.location}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[var(--foreground-subtle)]">Risk Assessment:</span>
            <span className={`px-3 py-1 font-mono text-xs font-bold rounded-sm uppercase ${
              patient.riskLevel === 'High' ? 'bg-[var(--accent-terracotta)]/20 text-[var(--accent-terracotta)] border border-[var(--accent-terracotta)]' : 'bg-[var(--gold)]/20 text-[var(--gold)] border border-[var(--gold)]'
            }`}>
              {patient.riskLevel} RISK
            </span>
            <StatusBadge status={patient.status} />
          </div>
        </div>
      </div>

      {/* DEMOGRAPHICS & CLINICAL INTAKE DETAILS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <div className="lg:col-span-2 space-y-6">
          
          {/* SUBSTANCE INVOLVEMENT */}
          <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-3">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-subtle)] pb-2">
              SUBSTANCE INVOLVEMENT & HISTORY
            </h3>

            <div className="space-y-3 text-xs font-sans">
              <div>
                <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block">Identified Substances:</span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {patient.substances.map((s) => (
                    <span key={s} className="px-3 py-1 bg-[var(--gold)]/15 border border-[var(--gold)] text-[var(--gold-light)] font-mono text-xs font-bold rounded-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 font-mono text-xs pt-2">
                <div>
                  <span className="text-[var(--foreground-subtle)] text-[10px] block">DURATION:</span>
                  <span className="text-[var(--foreground)] font-bold">{patient.durationOfConcern}</span>
                </div>
                <div>
                  <span className="text-[var(--foreground-subtle)] text-[10px] block">FREQUENCY:</span>
                  <span className="text-[var(--foreground)] font-bold">{patient.frequency}</span>
                </div>
              </div>

              <div className="pt-2">
                <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block mb-1">Reason For Support:</span>
                <p className="text-[var(--foreground-muted)] leading-relaxed bg-[var(--background-tertiary)] p-3 border border-[var(--border-subtle)] rounded-sm">
                  {patient.reasonForSupport}
                </p>
              </div>
            </div>
          </div>

          {/* CLINICAL PROGRESS NOTES WORKSPACE */}
          <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-subtle)] pb-2">
              CLINICAL PROGRESS NOTES
            </h3>

            <form onSubmit={handleAddNote} className="space-y-3">
              <textarea
                rows={3}
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                placeholder="Add clinical observation, consultation summary, or medication adjustment..."
                className="w-full p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm font-sans text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
              ></textarea>

              <button
                type="submit"
                className="px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>ADD PROGRESS NOTE</span>
              </button>
            </form>

            <div className="space-y-3 pt-2">
              {notesList.map((n, idx) => (
                <div key={idx} className="p-4 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-xs font-sans text-[var(--foreground-muted)] space-y-1">
                  <div className="flex items-center justify-between font-mono text-[10px] text-[var(--gold)]">
                    <span>CLINICAL NOTE #{notesList.length - idx}</span>
                    <span>TODAY</span>
                  </div>
                  <p className="leading-relaxed text-[var(--foreground)]">{n}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* SIDEBAR: CONTACTS & FAMILY ADVOCACY LINK */}
        <div className="space-y-6">
          
          <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 font-sans text-xs">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-subtle)] pb-2">
              EMERGENCY CONTACT
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <div><span className="text-[var(--foreground-subtle)] text-[10px] block">NAME:</span> <strong className="text-[var(--foreground)]">{patient.emergencyContactName}</strong></div>
              <div><span className="text-[var(--foreground-subtle)] text-[10px] block">RELATION:</span> {patient.emergencyContactRelation}</div>
              <div><span className="text-[var(--foreground-subtle)] text-[10px] block">PHONE:</span> {patient.emergencyContactPhone}</div>
            </div>
          </div>

          <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-4 font-sans text-xs">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)] border-b border-[var(--border-subtle)] pb-2">
              FAMILY ADVOCACY LINK
            </h3>

            <div className="space-y-2 font-mono text-xs">
              <div><span className="text-[var(--foreground-subtle)] text-[10px] block">FAMILY ADVOCATE:</span> Amina Okonkwo (Spouse)</div>
              <div><span className="text-[var(--foreground-subtle)] text-[10px] block">CONSENT STATUS:</span> <span className="text-[var(--green-light)] font-bold">GRANTED</span></div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
