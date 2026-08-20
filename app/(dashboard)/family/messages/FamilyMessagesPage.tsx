"use client"
import React, { useState } from 'react';

import {
  Send,
  Stethoscope,
  ShieldCheck,
  Paperclip,
  CheckCircle2,
  Clock,
  HeartHandshake
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import { useAuth } from '@/context/AuthContext';

export const FamilyMessagesPage: React.FC = () => {
  const { conversations, sendMessage, currentUser } = useAuth();
  const [inputText, setInputText] = useState('');

  const familyConv = conversations.find((c) => c.participantName?.includes('Okafor')) ?? conversations[0];

  if (!familyConv) {
    return null;
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(familyConv.id, inputText);
    setInputText('');
  };

  return (
    <DashboardShell
      title="Messages with Care Coordinator"
      description="Direct clinical communication with Dr. Folake Adeyemi regarding Chief Emmanuel Okafor's progress."
      breadcrumbs={[
        { label: 'Family Dashboard', path: '/dashboard/family' },
        { label: 'Messages' }
      ]}
    >
      <div className="max-w-4xl h-[calc(100vh-14rem)] min-h-[500px] flex flex-col rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] overflow-hidden">
        {/* Chat Header with Coordinator Context */}
        <div className="p-4 border-b border-[var(--border)] bg-[var(--background-tertiary)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80"
                alt="Dr. Folake Adeyemi"
                className="w-10 h-10 rounded-full object-cover border border-[var(--gold)]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-[var(--background-secondary)]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="font-bold text-xs sm:text-sm text-[var(--foreground)]">Dr. Folake Adeyemi</h4>
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
              </div>
              <p className="text-[10px] text-[var(--gold)]">Care Coordinator • Patient: Chief Emmanuel Okafor (Stage 03)</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active Caregiver Chat
          </span>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          <div className="text-center">
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold bg-[var(--background-tertiary)] text-[var(--foreground-muted)] border border-[var(--border-subtle)]">
              Secure Caregiver Channel Encrypted
            </span>
          </div>

          {familyConv.messages.map((msg) => {
            const isMe = msg.senderId === currentUser.id || msg.senderRole.includes('Family');

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
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed ${
                    isMe
                      ? 'bg-[var(--gold)] text-black font-medium rounded-tr-xs shadow-md shadow-[var(--gold)]/10'
                      : 'bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] rounded-tl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-[var(--border)] bg-[var(--background-tertiary)] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your question or caregiver update for Dr. Adeyemi..."
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
    </DashboardShell>
  );
};
