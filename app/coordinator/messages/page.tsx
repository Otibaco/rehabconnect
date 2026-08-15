import React, { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { useRouter } from '../../context/RouterContext';
import { MOCK_PATIENTS, MOCK_DIRECT_MESSAGES } from '../../data/mockData';
import { DirectMessage } from '../../types';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  Video,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Stethoscope,
  MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';

export const CoordinatorMessagesPage: React.FC = () => {
  const { navigate } = useRouter();
  const [activePatientId, setActivePatientId] = useState<string>(MOCK_PATIENTS[0].id);
  const [messages, setMessages] = useState<DirectMessage[]>(MOCK_DIRECT_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');

  const activePatient = MOCK_PATIENTS.find((p) => p.id === activePatientId) || MOCK_PATIENTS[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'coord-1',
      senderName: 'Dr. Amara Okafor, MD',
      senderRole: 'Doctor',
      receiverId: activePatient.id,
      text: inputText.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <DashboardShell
      title="Encrypted Telehealth Messages"
      description="Direct, confidential communication channel between Attending Doctor and Online Rehabilitation Patients."
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Messages' }]}
    >
      <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        {/* LEFT PATIENT CONVERSATION LIST (4 cols) */}
        <div className="lg:col-span-4 border-r border-[var(--border)] flex flex-col bg-[var(--background-secondary)]">
          {/* Header */}
          <div className="p-4 border-b border-[var(--border)] space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[var(--gold)]" />
                <h3 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                  Patient Conversations
                </h3>
              </div>
              <span className="text-[10px] font-bold text-[var(--gold)] bg-[var(--background-tertiary)] px-2 py-0.5 rounded-full border border-[var(--border-subtle)]">
                3 Active
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[var(--foreground-subtle)] absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search patient chat..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 divide-y divide-[var(--border)] overflow-y-auto">
            {MOCK_PATIENTS.map((patient) => {
              const isSelected = patient.id === activePatientId;
              return (
                <div
                  key={patient.id}
                  onClick={() => setActivePatientId(patient.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--background-tertiary)] border-l-4 border-l-[var(--gold)]'
                      : 'hover:bg-[var(--background-tertiary)]/50'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={patient.avatar}
                      alt={patient.name}
                      className="w-11 h-11 rounded-xl object-cover border border-[var(--border)]"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[var(--background)]" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-[var(--foreground)] truncate">
                        {patient.name}
                      </h4>
                      <span className="text-[9px] text-[var(--foreground-subtle)]">09:40 AM</span>
                    </div>
                    <p className="text-[11px] text-[var(--foreground-muted)] truncate">
                      {patient.id === 'pat_1'
                        ? 'Hi Dr. Okafor! The quad flexion felt much smoother...'
                        : 'Reviewing the prescribed exercise guide.'}
                    </p>
                    <span className="text-[9px] text-[var(--gold)] font-medium block truncate">
                      {patient.condition}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT CHAT AREA (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between bg-[var(--background)]">
          {/* Chat Header */}
          <div className="p-4 border-b border-[var(--border)] bg-[var(--background-secondary)] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={activePatient.avatar}
                alt={activePatient.name}
                className="w-10 h-10 rounded-xl object-cover border border-[var(--border)]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">
                    {activePatient.name}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <span className="text-[10px] text-[var(--foreground-muted)]">
                  {activePatient.condition} • {activePatient.matchedCentreName}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/coordinator/consultation-live')}
                className="px-3 py-1.5 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Video className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Start Video Call</span>
              </button>
              <button
                onClick={() => navigate('/coordinator/patients')}
                className="px-2.5 py-1.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-xs text-[var(--foreground-muted)] hover:text-[var(--gold)]"
                title="View Patient Chart"
              >
                Chart
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[460px]">
            <div className="text-center my-2">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-medium bg-[var(--background-tertiary)] text-[var(--foreground-subtle)] border border-[var(--border-subtle)]">
                <ShieldCheck className="w-3 h-3 text-[var(--gold)]" />
                End-to-End Encrypted Telehealth Clinical Channel
              </span>
            </div>

            {messages.map((msg) => {
              const isDoctor = msg.senderRole === 'Doctor';
              return (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${isDoctor ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs space-y-2 shadow-xs ${
                      isDoctor
                        ? 'bg-gradient-to-r from-[var(--gold)] to-[var(--gold-light)] text-black rounded-tr-none font-medium'
                        : 'bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)] rounded-tl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] opacity-75 font-semibold">
                      <span>{msg.senderName}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <p className="leading-relaxed">{msg.text}</p>

                    {msg.attachment && (
                      <div className="p-2 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-between gap-3 text-[11px] font-semibold border border-black/10">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-black dark:text-white" />
                          <span className="truncate">{msg.attachment.name}</span>
                        </div>
                        <span className="text-[9px] opacity-75">{msg.attachment.size}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Message Input Box */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--border)] bg-[var(--background-secondary)]">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors"
                title="Attach Clinical PDF or Protocol"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type clinical advice or follow-up instructions..."
                className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 py-2.5 rounded-xl bg-[var(--gold)] text-black font-bold text-xs hover:bg-[var(--gold-light)] disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
};
