"use client";
import React, { useState } from 'react';

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Send,
  Clock,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { MOCK_COORDINATOR_PATIENTS } from '@/lib/data';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const FamilyConsultationLivePage: React.FC = () => {
  const router = useRouter();
  const coordinator = MOCK_COORDINATOR_PATIENTS[0];

  const [micOn, setMicOn] = useState(true);
  const [videoOn, setVideoOn] = useState(true);
  const [messages, setMessages] = useState([
    { sender: coordinator.name, text: 'Hello Sarah, welcome! How are you feeling today?', time: '10:30 AM' },
    { sender: 'You', text: 'Hi Dr. Amara, I am ready for our rehabilitation planning session.', time: '10:31 AM' },
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    setMessages([...messages, { sender: 'You', text: inputMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputMsg('');
  };

  const handleEndCall = () => {
    if (confirm('End consultation session and view clinical recommendation summary?')) {
      router.push('/family/consultation-summary');
    }
  };

  return (
    <DashboardShell
      title="Live Clinical Consultation"
      description="Confidential encrypted telehealth room with Dr. Amara Okafor."
      breadcrumbs={[
        { label: 'Healthcare Portal', path: '/family' },
        { label: 'Live Consultation' },
      ]}
    >
      <div className="space-y-4">
        {/* Main Telehealth Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[560px]">
          {/* Video Feed Area (3 cols) */}
          <div className="lg:col-span-3 bg-[var(--background-secondary)] rounded-3xl relative overflow-hidden flex flex-col justify-between p-4 border border-[var(--border)] shadow-2xl">
            {/* Top Bar Overlay */}
            <div className="flex justify-between items-center z-10 bg-[var(--background)]/85 backdrop-blur-md p-3 rounded-2xl border border-[var(--border)] text-[var(--foreground)]">
              <div className="flex items-center gap-3">
                <img
                  src={coordinator.avatar}
                  alt={coordinator.name}
                  className="w-10 h-10 rounded-xl object-cover border border-[var(--border-subtle)]"
                />
                <div>
                  <h4 className="font-cinzel font-bold text-xs text-[var(--foreground)]">{coordinator.name}</h4>
                  <p className="text-[10px] text-[var(--gold)] font-medium">Rehabilitation Care Lead</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono bg-[var(--background-secondary)] border border-[var(--border-subtle)] text-[var(--gold)] px-3 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 animate-pulse text-[var(--gold)]" />
                <span>00:14:32</span>
              </div>
            </div>

            {/* Video Main Stream Simulation */}
            <div className="absolute inset-0 flex items-center justify-center">
              {videoOn ? (
                <img
                  src={coordinator.avatar}
                  alt="Video Stream"
                  className="w-full h-full object-cover opacity-85 filter brightness-90"
                />
              ) : (
                <div className="text-center text-[var(--foreground-subtle)] space-y-2">
                  <VideoOff className="w-12 h-12 mx-auto text-[var(--foreground-subtle)]" />
                  <p className="text-xs font-semibold">Camera is currently muted</p>
                </div>
              )}
            </div>

            {/* PIP Self Feed */}
            <div className="absolute bottom-20 right-4 w-36 h-28 bg-[var(--background)] rounded-2xl border-2 border-[var(--gold)]/50 shadow-2xl overflow-hidden z-10">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                alt="Self"
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-1.5 left-2 text-[9px] font-bold text-white bg-black/70 px-1.5 py-0.5 rounded">
                You
              </span>
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-center items-center gap-4 z-10 pt-2">
              <button
                onClick={() => setMicOn(!micOn)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  micOn ? 'bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--gold)]' : 'bg-rose-900/60 border border-rose-700 text-rose-300'
                }`}
              >
                {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setVideoOn(!videoOn)}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                  videoOn ? 'bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] hover:border-[var(--gold)]' : 'bg-rose-900/60 border border-rose-700 text-rose-300'
                }`}
              >
                {videoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
              </button>

              <button
                onClick={handleEndCall}
                className="px-6 py-3 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-rose-950 transition-all hover:scale-105"
              >
                <PhoneOff className="w-4 h-4" />
                <span>End Consultation</span>
              </button>
            </div>
          </div>

          {/* Right Column (1 Col): Live Chat Room */}
          <div className="bg-[var(--background-secondary)] rounded-3xl border border-[var(--border)] p-4 flex flex-col justify-between space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border)]">
              <h4 className="font-cinzel font-bold text-xs text-[var(--foreground)] flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-[var(--gold)]" />
                <span>Encrypted Chat</span>
              </h4>
              <span className="text-[10px] text-[var(--green)] font-semibold">Live</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 text-xs pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`space-y-1 ${m.sender === 'You' ? 'text-right' : 'text-left'}`}
                >
                  <span className="text-[10px] text-[var(--foreground-subtle)] font-medium">{m.sender} • {m.time}</span>
                  <div
                    className={`p-3 rounded-2xl max-w-[85%] inline-block leading-relaxed ${
                      m.sender === 'You'
                        ? 'bg-[var(--gold)] text-black text-left font-medium'
                        : 'bg-[var(--background-tertiary)] text-[var(--foreground)] border border-[var(--border)]'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} className="relative pt-2">
              <input
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type a clinical message..."
                className="w-full pl-3.5 pr-10 py-2.5 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] outline-none focus:border-[var(--gold)]"
              />
              <button
                type="submit"
                className="absolute right-3 top-4 text-[var(--gold)] hover:text-[var(--gold-light)]"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
