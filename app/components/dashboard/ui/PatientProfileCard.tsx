import React from 'react';
import { Link } from 'react-router-dom';
import { User, Phone, MapPin, AlertCircle, FileText, ChevronRight } from 'lucide-react';
import { PatientRecord } from '../../../types/dashboard';
import { StatusBadge } from './StatusBadge';

interface PatientProfileCardProps {
  patient: PatientRecord;
}

export const PatientProfileCard: React.FC<PatientProfileCardProps> = ({ patient }) => {
  const riskColor =
    patient.riskLevel === 'High' ? 'border-l-[var(--accent-terracotta)]' :
    patient.riskLevel === 'Moderate' ? 'border-l-[var(--accent-amber)]' : 'border-l-[var(--green-light)]';

  return (
    <div className={`p-6 bg-[var(--background-secondary)] border border-[var(--border)] border-l-4 ${riskColor} rounded-sm space-y-4 shadow-xl`}>
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        <div>
          <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
            {patient.name}
          </h3>
          <div className="font-mono text-xs text-[var(--foreground-subtle)]">
            {patient.age} YRS • {patient.gender} • {patient.location}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Risk:</span>
          <span className={`font-mono text-xs font-bold ${patient.riskLevel === 'High' ? 'text-[var(--accent-terracotta)]' : 'text-[var(--gold)]'}`}>
            {patient.riskLevel.toUpperCase()}
          </span>
          <StatusBadge status={patient.status} />
        </div>
      </div>

      {/* SUBSTANCES & CONCERN */}
      <div className="space-y-2 font-sans text-xs">
        <div>
          <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block">Primary Concerns:</span>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {patient.substances.map((s) => (
              <span key={s} className="px-2.5 py-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] font-mono text-[10px] font-bold rounded-sm">
                {s}
              </span>
            ))}
          </div>
        </div>

        <p className="text-[var(--foreground-muted)] line-clamp-2 leading-relaxed">
          {patient.reasonForSupport}
        </p>
      </div>

      {/* FOOTER */}
      <div className="pt-3 border-t border-[var(--border-subtle)] flex items-center justify-between">
        <span className="font-mono text-[11px] text-[var(--foreground-subtle)]">
          Next Appointment: <strong className="text-[var(--foreground)]">{patient.nextAppointmentDate || 'None Scheduled'}</strong>
        </span>

        <Link
          to={`/dashboard/patients/${patient.id}`}
          className="px-4 py-2 bg-[var(--background-tertiary)] hover:bg-[var(--gold)] hover:text-[#080907] border border-[var(--border-subtle)] text-[var(--gold)] font-mono text-xs font-bold rounded-sm transition-colors flex items-center gap-1"
        >
          <span>VIEW CLINICAL RECORD</span>
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};
