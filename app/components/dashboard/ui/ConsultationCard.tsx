import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Video, User, FileText } from 'lucide-react';
import { Consultation } from '../../../types/dashboard';
import { StatusBadge } from './StatusBadge';

interface ConsultationCardProps {
  consultation: Consultation;
  isCoordinator?: boolean;
}

export const ConsultationCard: React.FC<ConsultationCardProps> = ({
  consultation,
  isCoordinator = false
}) => {
  return (
    <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm space-y-4 transition-all shadow-xl relative crosshair-corner">
      
      {/* HEADER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-subtle)] pb-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] font-mono text-[10px] text-[var(--gold)] font-bold uppercase rounded-sm">
            {consultation.type}
          </span>
          <span className="font-mono text-xs text-[var(--foreground-subtle)]">
            ID: #{consultation.id}
          </span>
        </div>
        <StatusBadge status={consultation.status} />
      </div>

      {/* DETAILS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1">
          <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase block">
            {isCoordinator ? 'Patient Name:' : 'Consultant:'}
          </span>
          <div className="font-cinzel text-lg font-bold text-[var(--foreground)]">
            {isCoordinator ? consultation.patientName : consultation.consultantName}
          </div>
          {!isCoordinator && (
            <div className="font-sans text-xs text-[var(--foreground-muted)]">
              {consultation.consultantTitle}
            </div>
          )}
        </div>

        <div className="space-y-1 font-mono text-xs">
          <div className="flex items-center gap-2 text-[var(--foreground)]">
            <Calendar className="w-4 h-4 text-[var(--gold)] shrink-0" />
            <span>{consultation.date}</span>
          </div>
          <div className="flex items-center gap-2 text-[var(--foreground-muted)]">
            <Clock className="w-4 h-4 text-[var(--gold)] shrink-0" />
            <span>{consultation.time} ({consultation.durationMinutes} mins)</span>
          </div>
        </div>
      </div>

      {/* NOTES IF ANY */}
      {consultation.notes && (
        <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm font-sans text-xs text-[var(--foreground-muted)] italic">
          <span className="font-mono font-bold not-italic text-[var(--gold)] text-[10px] uppercase block mb-0.5">
            CLINICAL NOTES:
          </span>
          {consultation.notes}
        </div>
      )}

      {/* FOOTER ACTIONS */}
      <div className="pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3">
        <span className="font-mono text-xs text-[var(--foreground-subtle)]">
          Fee: <strong className="text-[var(--gold)]">{consultation.fee}</strong>
        </span>

        {consultation.status === 'Upcoming' || consultation.status === 'In Progress' ? (
          <Link
            to={consultation.meetingLink || `/dashboard/consultation-room/${consultation.id}`}
            className="px-5 py-2.5 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm transition-colors flex items-center gap-2 shadow-lg"
          >
            <Video className="w-4 h-4" />
            <span>JOIN VIRTUAL ROOM</span>
          </Link>
        ) : (
          <button disabled className="px-4 py-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] font-mono text-xs text-[var(--foreground-subtle)] rounded-sm">
            SESSION COMPLETED
          </button>
        )}
      </div>

    </div>
  );
};
