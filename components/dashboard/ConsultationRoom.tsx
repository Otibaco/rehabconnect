import React, { useState } from 'react';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  MessageSquare,
  FileText,
  ShieldCheck,
  User,
  Clock,
  Sparkles,
  Send,
  Maximize2
} from 'lucide-react';
import { UserRole } from '../../types/dashboard';
import { mockConsultations, mockPatients } from '../../lib/dashboardData';

interface ConsultationRoomProps {
  consultationId?: string;
  role?: UserRole;
}

export const ConsultationRoom: React.FC<ConsultationRoomProps> = ({
  consultationId = 'cns_101',
  role = 'patient'
}) => {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(role === 'coordinator');
  const [consultationEnded, setConsultationEnded] = useState(false);

  const [clinicalNotes, setClinicalNotes] = useState(
    'Baseline intake reviewed. Patient reports alcohol cravings in the evenings. Recomended cognitive behavioral coping mechanisms.'
  );

  const consultation = mockConsultations[0];
  const patient = mockPatients[0];

  if (consultationEnded) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[var(--background-secondary)] border border-[var(--border)] p-8 rounded-sm text-center space-y-4 shadow-2xl crosshair-corner">
          <div className="w-12 h-12 bg-[var(--green)]/20 border border-[var(--green)]/40 text-[var(--green-light)] rounded-full flex items-center justify-center mx-auto">
            <ShieldCheck className="w-6 h-6" />
          </div>

          <h2 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">
            CONSULTATION CONCLUDED
          </h2>

          <p className="font-sans text-xs text-[var(--foreground-muted)] leading-relaxed">
            Thank you. Your encrypted virtual session with {consultation.consultantName} has safely concluded. Clinical notes and next appointment options have been updated.
          </p>

          <a
            href="/dashboard"
            className="inline-block w-full py-3 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors"
          >
            RETURN TO DASHBOARD
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 font-sans">
      
      {/* HEADER BAR */}
      <div className="p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--gold)] font-bold uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--green-light)] animate-pulse"></span>
            <span>LIVE ENCRYPTED CONSULTATION ROOM</span>
          </div>
          <h1 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
            {role === 'coordinator' ? `Session with ${consultation.patientName}` : `Consultation with ${consultation.consultantName}`}
          </h1>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs">
          <div className="p-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] rounded-sm flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--gold)]" />
            <span>ELAPSED: 18:24 / 45:00</span>
          </div>

          {role === 'coordinator' && (
            <button
              onClick={() => setNotesOpen(!notesOpen)}
              className={`px-3 py-2 border rounded-sm font-bold transition-all ${
                notesOpen
                  ? 'bg-[var(--gold)] text-[#080907] border-[var(--gold)]'
                  : 'bg-[var(--background-tertiary)] text-[var(--foreground)] border-[var(--border-subtle)]'
              }`}
            >
              Clinical Notes
            </button>
          )}

          <button
            onClick={() => setChatOpen(!chatOpen)}
            className={`px-3 py-2 border rounded-sm font-bold transition-all ${
              chatOpen
                ? 'bg-[var(--gold)] text-[#080907] border-[var(--gold)]'
                : 'bg-[var(--background-tertiary)] text-[var(--foreground)] border-[var(--border-subtle)]'
            }`}
          >
            Session Chat
          </button>
        </div>
      </div>

      {/* MAIN VIDEO & WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* VIDEO DISPLAY AREA */}
        <div className={`${notesOpen || chatOpen ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-4`}>
          
          <div className="relative bg-[#050604] border border-[var(--border)] rounded-sm h-[480px] flex items-center justify-center overflow-hidden shadow-2xl">
            
            {/* MAIN PARTICIPANT VIEW */}
            {cameraOn ? (
              <div className="relative w-full h-full bg-gradient-to-br from-[#0c0d0a] to-[#12140f] flex flex-col items-center justify-center p-8 text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-[var(--gold)]/20 border-2 border-[var(--gold)] text-[var(--gold-light)] font-cinzel text-3xl font-bold flex items-center justify-center shadow-2xl">
                  {role === 'coordinator' ? 'CO' : 'DR'}
                </div>
                <div>
                  <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">
                    {role === 'coordinator' ? consultation.patientName : consultation.consultantName}
                  </h3>
                  <span className="font-mono text-xs text-[var(--gold)] uppercase">
                    {role === 'coordinator' ? 'PATIENT' : consultation.consultantTitle}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center font-mono text-xs text-[var(--foreground-subtle)] space-y-2">
                <VideoOff className="w-10 h-10 mx-auto text-[var(--gold)]" />
                <span>CAMERA TURNED OFF</span>
              </div>
            )}

            {/* SELF PREVIEW PICTURE-IN-PICTURE */}
            <div className="absolute bottom-4 right-4 w-40 h-28 bg-[var(--background-secondary)] border border-[var(--gold)]/60 rounded-sm p-2 flex flex-col items-center justify-center text-center space-y-1 shadow-2xl">
              <span className="font-mono text-[9px] text-[var(--gold)] uppercase font-bold">YOU (SELF)</span>
              <div className="w-8 h-8 rounded-full bg-[var(--gold)] text-[#080907] font-bold text-xs flex items-center justify-center font-mono">
                {role === 'coordinator' ? 'DR' : 'CH'}
              </div>
            </div>

            {/* WATERMARK */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-[var(--foreground-subtle)] flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-sm backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>REHAB NIGERIA WEBRTC CORE</span>
            </div>

          </div>

          {/* CONTROL BAR */}
          <div className="p-4 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm flex items-center justify-center gap-4">
            
            <button
              onClick={() => setMicOn(!micOn)}
              className={`p-3.5 rounded-sm border transition-all ${
                micOn
                  ? 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground)] hover:border-[var(--gold)]'
                  : 'bg-[var(--accent-terracotta)]/20 border-[var(--accent-terracotta)] text-[var(--accent-terracotta)]'
              }`}
              title={micOn ? 'Mute Microphone' : 'Unmute Microphone'}
            >
              {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setCameraOn(!cameraOn)}
              className={`p-3.5 rounded-sm border transition-all ${
                cameraOn
                  ? 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground)] hover:border-[var(--gold)]'
                  : 'bg-[var(--accent-terracotta)]/20 border-[var(--accent-terracotta)] text-[var(--accent-terracotta)]'
              }`}
              title={cameraOn ? 'Turn Off Camera' : 'Turn On Camera'}
            >
              {cameraOn ? <VideoIcon className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setConsultationEnded(true)}
              className="px-6 py-3.5 bg-[var(--accent-terracotta)] hover:bg-red-700 text-white font-mono text-xs font-bold rounded-sm transition-colors flex items-center gap-2 shadow-xl"
            >
              <PhoneOff className="w-4 h-4" />
              <span>END CONSULTATION</span>
            </button>

          </div>

        </div>

        {/* SIDE PANELS (CLINICAL NOTES OR SESSION CHAT) */}
        {(notesOpen || chatOpen) && (
          <div className="lg:col-span-4 bg-[var(--background-secondary)] border border-[var(--border)] p-6 rounded-sm space-y-6 shadow-2xl h-[560px] flex flex-col justify-between">
            
            {notesOpen && role === 'coordinator' ? (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-mono text-xs">
                  <span className="font-bold text-[var(--gold)]">CLINICAL NOTES WORKSPACE</span>
                  <button onClick={() => setNotesOpen(false)} className="text-[var(--foreground-subtle)] hover:text-[var(--foreground)]">✕</button>
                </div>

                <div className="p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm space-y-1 font-mono text-[10px]">
                  <div className="text-[var(--gold)] font-bold">PATIENT SUMMARY:</div>
                  <div className="text-[var(--foreground)]">{patient.name} ({patient.age} yrs)</div>
                  <div className="text-[var(--foreground-subtle)]">Substances: {patient.substances.join(', ')}</div>
                </div>

                <div className="flex-1 space-y-1">
                  <label className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase">Session Observations & Plan</label>
                  <textarea
                    rows={10}
                    value={clinicalNotes}
                    onChange={(e) => setClinicalNotes(e.target.value)}
                    placeholder="Record clinical observations during session..."
                    className="w-full h-[280px] p-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm font-sans text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
                  ></textarea>
                </div>

                <button className="w-full py-2.5 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm hover:bg-[var(--gold-light)]">
                  SAVE CLINICAL RECORD
                </button>
              </div>
            ) : (
              <div className="space-y-4 flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-2 font-mono text-xs">
                  <span className="font-bold text-[var(--gold)] font-cinzel">IN-SESSION LIVE CHAT</span>
                  <button onClick={() => setChatOpen(false)} className="text-[var(--foreground-subtle)] hover:text-[var(--foreground)]">✕</button>
                </div>

                <div className="flex-1 bg-[var(--background-tertiary)] p-3 rounded-sm space-y-2 font-sans text-xs overflow-y-auto">
                  <div className="p-2 bg-[var(--background)] rounded-sm border border-[var(--border-subtle)]">
                    <span className="font-mono text-[9px] text-[var(--gold)] block">SYSTEM:</span>
                    <span>Encrypted audio/video connection initialized.</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type in chat..."
                    className="flex-1 p-2.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm text-xs font-sans text-[var(--foreground)]"
                  />
                  <button className="px-4 py-2.5 bg-[var(--gold)] text-[#080907] font-mono font-bold text-xs rounded-sm">
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

    </div>
  );
};
