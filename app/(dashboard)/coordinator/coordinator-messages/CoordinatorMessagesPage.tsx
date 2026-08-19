"use client"
import React, { useState } from 'react';
import {
  Send,
  User,
  HeartHandshake,
  Stethoscope,
  Activity,
  FileText,
  Calendar,
  CheckCircle2,
  Paperclip,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const CoordinatorMessagesPage: React.FC = () => {
  const { conversations, sendMessage, currentUser } = useAuth();
  const router = useRouter();
  const [selectedConvId, setSelectedConvId] = useState(conversations[0]?.id || 'conv_1');
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeConv.id, inputText);
    setInputText('');
  };

  return (
    <DashboardShell
      title="Clinical Telehealth Messages"
      description="Direct communications with patients and family caregivers, with live EHR context alongside every conversation."
      breadcrumbs={[
        { label: 'Doctor Suite', path: '/dashboard/coordinator' },
        { label: 'Messages' }
      ]}
    >
      <div className="max-w-6xl h-[calc(100vh-13rem)] min-h-[550px] grid grid-cols-1 lg:grid-cols-3 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] overflow-hidden">
        {/* LEFT COLUMN: CONVERSATION THREADS LIST */}
        <div className="border-r border-[var(--border)] flex flex-col bg-[var(--background-tertiary)]/50">
          <div className="p-3.5 border-b border-[var(--border)]">
            <h4 className="font-bold text-xs text-[var(--foreground)] uppercase tracking-wider">
              Patient & Family Inboxes ({conversations.length})
            </h4>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[var(--border-subtle)]">
            {conversations.map((c) => {
              const isSelected = c.id === selectedConvId;
              const lastMsg = c.messages[c.messages.length - 1];

              return (
                <div
                  key={c.id}
                  onClick={() => setSelectedConvId(c.id)}
                  className={`p-3.5 cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-[var(--background-secondary)] border-l-2 border-l-[var(--gold)] text-[var(--foreground)]'
                      : 'hover:bg-[var(--background-tertiary)] text-[var(--foreground-muted)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={c.participantAvatar}
                      alt={c.participantName}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--gold)] shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h5 className="font-bold text-xs text-[var(--foreground)] truncate">{c.participantName}</h5>
                        <span className="text-[9px] text-[var(--foreground-subtle)]">{lastMsg?.timestamp}</span>
                      </div>
                      <p className="text-[10px] text-[var(--gold)] font-medium">{c.currentJourneyStage}</p>
                      <p className="text-xs text-[var(--foreground-muted)] truncate mt-0.5">{lastMsg?.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* MIDDLE & RIGHT: CHAT FEED + PATIENT EHR CLINICAL CONTEXT PANEL */}
        <div className="lg:col-span-2 flex flex-col bg-[var(--background-secondary)]">
          {/* Chat Topbar */}
          <div className="p-3.5 border-b border-[var(--border)] bg-[var(--background-tertiary)] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeConv.participantAvatar}
                alt={activeConv.participantName}
                className="w-9 h-9 rounded-full object-cover border border-[var(--gold)]"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">{activeConv.participantName}</h4>
                  <span className="px-2 py-0.2 rounded-full text-[9px] font-bold bg-[var(--gold)]/10 text-[var(--gold)] border border-[var(--gold)]/20">
                    {activeConv.currentJourneyStage}
                  </span>
                </div>
                <p className="text-[10px] text-[var(--foreground-muted)]">{activeConv.latestCareUpdate}</p>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard/coordinator/consultations')}
              className="px-3 py-1.5 rounded-xl bg-[var(--gold)] text-black text-xs font-bold shadow-xs hover:bg-[var(--gold-light)] flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Write Summary</span>
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
            {activeConv.messages.map((msg) => {
              const isMe = msg.senderId === currentUser.id || msg.senderRole.includes('Coordinator');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                    isMe ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-bold text-[var(--foreground-subtle)]">
                      {msg.senderName} ({msg.senderRole})
                    </span>
                    <span className="text-[9px] text-[var(--foreground-subtle)]">{msg.timestamp}</span>
                  </div>

                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[var(--gold)] text-black font-medium rounded-tr-xs shadow-sm'
                        : 'bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] rounded-tl-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-[var(--border)] bg-[var(--background-tertiary)] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Type clinical response to ${activeConv.participantName}...`}
              className="flex-1 bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-xs text-[var(--foreground)] placeholder:text-[var(--foreground-subtle)] focus:outline-none focus:border-[var(--gold)]"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] disabled:opacity-50 text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
};
