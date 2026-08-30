"use client";

import React, { useState } from 'react';
import {
  Send,
  FileText,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: string;
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  participantName: string;
  participantAvatar: string;
  currentJourneyStage: string;
  latestCareUpdate: string;
  messages: Message[];
}

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const mockConversations: Conversation[] = [
  {
    id: 'conv_1',
    participantName: 'Adebimpe Okafor',
    participantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    currentJourneyStage: 'Stage 03',
    latestCareUpdate: 'Recovery plan in progress',
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_1',
        senderName: 'Adebimpe Okafor',
        senderRole: 'Patient',
        text: 'Good morning, I wanted to ask about my next session.',
        timestamp: '09:12 AM',
      },
      {
        id: 'msg_2',
        senderId: 'coord_1',
        senderName: 'Dr. Adeyemi',
        senderRole: 'Coordinator',
        text: 'Good morning! Your next session is scheduled for Friday at 10am. Let me know if you need to reschedule.',
        timestamp: '09:15 AM',
      },
      {
        id: 'msg_3',
        senderId: 'user_1',
        senderName: 'Adebimpe Okafor',
        senderRole: 'Patient',
        text: 'That works perfectly. Thank you!',
        timestamp: '09:18 AM',
      },
    ],
  },
  {
    id: 'conv_2',
    participantName: 'Tunde Bakare',
    participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    currentJourneyStage: 'Stage 02',
    latestCareUpdate: 'Awaiting family assessment',
    messages: [
      {
        id: 'msg_4',
        senderId: 'family_1',
        senderName: 'Mrs. Bakare',
        senderRole: 'Family',
        text: 'Hello, we completed the intake forms last night.',
        timestamp: 'Yesterday',
      },
      {
        id: 'msg_5',
        senderId: 'coord_1',
        senderName: 'Dr. Adeyemi',
        senderRole: 'Coordinator',
        text: 'Thank you. I will review them and get back to you within 24 hours.',
        timestamp: 'Yesterday',
      },
    ],
  },
  {
    id: 'conv_3',
    participantName: 'Ngozi Eze',
    participantAvatar: 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?auto=format&fit=crop&w=200&q=80',
    currentJourneyStage: 'Stage 04',
    latestCareUpdate: 'Active rehabilitation',
    messages: [
      {
        id: 'msg_6',
        senderId: 'user_3',
        senderName: 'Ngozi Eze',
        senderRole: 'Patient',
        text: 'I have been feeling much better this week.',
        timestamp: 'Mon',
      },
      {
        id: 'msg_7',
        senderId: 'coord_1',
        senderName: 'Dr. Adeyemi',
        senderRole: 'Coordinator',
        text: 'That is great to hear. Keep up the good work.',
        timestamp: 'Mon',
      },
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export const CoordinatorMessagesPage: React.FC = () => {
  const router = useRouter();
  const [selectedConvId, setSelectedConvId] = useState(mockConversations[0]?.id || 'conv_1');
  const [inputText, setInputText] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);

  const activeConv = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      senderId: 'coord_1',
      senderName: 'Dr. Adeyemi',
      senderRole: 'Coordinator',
      text: inputText,
      timestamp: 'Now',
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConv.id
          ? { ...c, messages: [...c.messages, newMessage] }
          : c
      )
    );
    setInputText('');
  };

  return (
    <DashboardShell
      title="Messages"
      description="Direct communications with patients and family caregivers."
      breadcrumbs={[
        { label: 'Doctor Suite', path: '/coordinator' as any },
        { label: 'Messages' },
      ]}
    >
      <div className="h-[calc(100vh-13rem)] min-h-[550px] grid grid-cols-1 lg:grid-cols-3 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] overflow-hidden">
        
        {/* ── Conversation List ── */}
        <div className="border-r border-[var(--color-border)] flex flex-col bg-[var(--color-surface-muted)]/50">
          <div className="p-4 border-b border-[var(--color-border)]">
            <h4 className="text-xs font-semibold text-[var(--color-text)] uppercase tracking-wider">
              Conversations ({conversations.length})
            </h4>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-[var(--color-border)]">
            {conversations.map((c) => {
              const isSelected = c.id === selectedConvId;
              const lastMsg = c.messages[c.messages.length - 1];

              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedConvId(c.id)}
                  className={`w-full p-4 text-left transition-colors ${
                    isSelected
                      ? 'bg-[var(--color-surface)] border-l-2 border-l-[var(--color-accent)]'
                      : 'hover:bg-[var(--color-surface)]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={c.participantAvatar}
                      alt={c.participantName}
                      className="w-10 h-10 rounded-full object-cover border border-[var(--color-accent)]/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <h5 className="text-xs font-semibold text-[var(--color-text)] truncate">
                          {c.participantName}
                        </h5>
                        <span className="text-[10px] text-[var(--color-text-muted)] shrink-0">
                          {lastMsg?.timestamp}
                        </span>
                      </div>
                      <p className="text-[10px] text-[var(--color-accent)] font-medium mt-0.5">
                        {c.currentJourneyStage}
                      </p>
                      <p className="text-xs text-[var(--color-text-muted)] truncate mt-0.5">
                        {lastMsg?.text}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Chat Area ── */}
        <div className="lg:col-span-2 flex flex-col">
          {/* Chat header */}
          <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={activeConv.participantAvatar}
                alt={activeConv.participantName}
                className="w-9 h-9 rounded-full object-cover border border-[var(--color-accent)]/20 shrink-0"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm font-semibold text-[var(--color-text)] truncate">
                    {activeConv.participantName}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-medium bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
                    {activeConv.currentJourneyStage}
                  </span>
                </div>
                <p className="text-[11px] text-[var(--color-text-muted)] truncate">
                  {activeConv.latestCareUpdate}
                </p>
              </div>
            </div>

            <button
              onClick={() => router.push('/coordinator/coordinator-consultations')}
              className="px-3 py-2 rounded-lg theme-btn-primary text-xs font-medium flex items-center gap-1.5 transition-all duration-200 active:scale-[0.98] shrink-0"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Write summary</span>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {activeConv.messages.map((msg) => {
              const isMe = msg.senderRole.includes('Coordinator');

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'} max-w-[85%] ${
                    isMe ? 'ml-auto' : 'mr-auto'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1 px-1">
                    <span className="text-[10px] font-medium text-[var(--color-text-muted)]">
                      {msg.senderName}
                    </span>
                    <span className="text-[9px] text-[var(--color-text-muted)] opacity-60">
                      {msg.timestamp}
                    </span>
                  </div>

                  <div
                    className={`p-3 rounded-xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[var(--color-accent)] text-white rounded-tr-sm'
                        : 'bg-[var(--color-surface-muted)] border border-[var(--color-border)] text-[var(--color-text)] rounded-tl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)] flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Message ${activeConv.participantName}...`}
              className="flex-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-xs text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-all"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="px-4 py-2.5 rounded-lg theme-btn-primary disabled:opacity-50 text-xs font-medium flex items-center gap-1.5 transition-all duration-200 active:scale-[0.98]"
            >
              <span className="hidden sm:inline">Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </DashboardShell>
  );
};

export default CoordinatorMessagesPage;