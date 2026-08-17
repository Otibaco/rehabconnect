"use client";
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  Paperclip,
  Video,
  FileText,
  ShieldCheck,
  Stethoscope
} from 'lucide-react';
import { motion } from 'framer-motion';
import { DirectMessage } from '@/types/type';
import { MOCK_DIRECT_MESSAGES } from '@/lib/data';

export const PatientMessagesPage: React.FC = () => {
  const router = useRouter();
  const [messages, setMessages] = useState<DirectMessage[]>(MOCK_DIRECT_MESSAGES);
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg: DirectMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'pat_1',
      senderName: 'Sarah Jenkins',
      senderRole: 'Patient',
      receiverId: 'coord-1',
      text: inputText.trim(),
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputText('');
  };

  return (
    <DashboardShell
      title="Doctor Direct Messages"
      description="Confidential messaging channel with your assigned attending doctor."
      breadcrumbs={[{ label: 'Patient Portal' }, { label: 'Messages' }]}
    >
      <div className="rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] shadow-xl overflow-hidden flex flex-col min-h-[580px]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[var(--border)] bg-[var(--background-secondary)] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1594824813566-88855ce7890b?auto=format&fit=crop&q=80&w=600"
              alt="Doctor"
              className="w-12 h-12 rounded-2xl object-cover border-2 border-[var(--gold)]/40 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-cinzel font-bold text-sm sm:text-base text-[var(--foreground)]">
                  Dr. Amara Okafor, MD
                </h3>
                <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online
                </span>
              </div>
              <span className="text-xs text-[var(--foreground-muted)]">
                Senior Telehealth Clinical Care Lead & Neuro-Rehab Physician
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push('/patient/consultation-live')}
            className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black text-xs font-bold hover:bg-[var(--gold-light)] flex items-center gap-1.5 shadow-xs transition-all"
          >
            <Video className="w-4 h-4" />
            <span className="hidden sm:inline">Join Video Call</span>
          </button>
        </div>

        {/* Message feed */}
        <div className="flex-1 p-4 sm:p-6 space-y-4 overflow-y-auto max-h-[440px] bg-[var(--background)]">
          <div className="text-center my-2">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-medium bg-[var(--background-tertiary)] text-[var(--foreground-subtle)] border border-[var(--border-subtle)]">
              <ShieldCheck className="w-3 h-3 text-[var(--gold)]" />
              100% Confidential Doctor-Patient Encrypted Channel
            </span>
          </div>

          {messages.map((msg) => {
            const isPatient = msg.senderRole === 'Patient';
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${isPatient ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-3.5 rounded-2xl text-xs space-y-2 shadow-xs ${
                    isPatient
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

        {/* Input Form */}
        <form onSubmit={handleSend} className="p-4 border-t border-[var(--border)] bg-[var(--background-secondary)]">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className="p-2.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:text-[var(--gold)] transition-colors"
              title="Attach File"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask your doctor a question or share recovery update..."
              className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
            />

            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-[var(--gold)] text-black font-bold text-xs hover:bg-[var(--gold-light)] disabled:opacity-40 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
};
