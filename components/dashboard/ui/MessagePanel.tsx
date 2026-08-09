import React, { useState } from 'react';
import { Send, Paperclip, CheckCheck, User, Search, ShieldCheck } from 'lucide-react';
import { Conversation, Message } from '../../../types/dashboard';
import { mockConversations, mockMessages } from '../../../lib/dashboardData';

export const MessagePanel: React.FC = () => {
  const [conversations] = useState<Conversation[]>(mockConversations);
  const [activeConvId, setActiveConvId] = useState<string>('conv_1');
  const [messageText, setMessageText] = useState<string>('');
  const [messages, setMessages] = useState<Record<string, Message[]>>(mockMessages);

  const activeConv = conversations.find((c) => c.id === activeConvId) || conversations[0];
  const activeMessages = messages[activeConvId] || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim()) return;

    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      conversationId: activeConvId,
      senderId: 'usr_pat_001',
      senderName: 'You',
      senderRole: 'patient',
      recipientId: activeConv.participantId,
      content: messageText,
      timestamp: 'Just now',
      read: true
    };

    setMessages((prev) => ({
      ...prev,
      [activeConvId]: [...(prev[activeConvId] || []), newMsg]
    }));

    setMessageText('');
  };

  return (
    <div className="bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm shadow-2xl h-[650px] flex flex-col md:flex-row overflow-hidden crosshair-corner">
      
      {/* CONVERSATION LIST SIDEBAR */}
      <div className="w-full md:w-80 border-r border-[var(--border)] flex flex-col justify-between bg-[var(--background-secondary)]">
        
        <div className="p-4 border-b border-[var(--border-subtle)] space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">MESSAGES</h3>
            <span className="font-mono text-[10px] text-[var(--gold)] font-bold">SECURE CHANNEL</span>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full pl-9 pr-3 py-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm font-sans text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[var(--border-subtle)]">
          {conversations.map((c) => {
            const isActive = c.id === activeConvId;
            return (
              <div
                key={c.id}
                onClick={() => setActiveConvId(c.id)}
                className={`p-4 cursor-pointer transition-colors flex items-start gap-3 ${
                  isActive
                    ? 'bg-[var(--background-tertiary)] border-l-2 border-[var(--gold)]'
                    : 'hover:bg-[var(--background-tertiary)]/50'
                }`}
              >
                <div className="w-9 h-9 rounded-sm bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold-light)] font-mono text-xs font-bold flex items-center justify-center shrink-0">
                  {c.participantName[0]}
                </div>

                <div className="flex-1 space-y-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-xs text-[var(--foreground)] truncate font-cinzel">
                      {c.participantName}
                    </h4>
                    <span className="font-mono text-[9px] text-[var(--foreground-subtle)]">
                      {c.lastMessageTimestamp}
                    </span>
                  </div>

                  <p className="font-sans text-[11px] text-[var(--foreground-muted)] truncate">
                    {c.lastMessage}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 border-t border-[var(--border-subtle)] font-mono text-[10px] text-[var(--foreground-subtle)] text-center flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>END-TO-END CLINICAL ENCRYPTION</span>
        </div>

      </div>

      {/* CONVERSATION WINDOW */}
      <div className="flex-1 flex flex-col justify-between bg-[var(--background)]">
        
        {/* ACTIVE CONVERSATION HEADER */}
        <div className="p-4 bg-[var(--background-secondary)] border-b border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold-light)] font-mono text-xs font-bold flex items-center justify-center">
              {activeConv.participantName[0]}
            </div>
            <div>
              <h3 className="font-cinzel text-base font-bold text-[var(--foreground)]">
                {activeConv.participantName}
              </h3>
              <span className="font-mono text-[10px] text-[var(--gold)] block">
                {activeConv.category}
              </span>
            </div>
          </div>
        </div>

        {/* MESSAGE BUBBLE FEED */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 font-sans text-xs">
          {activeMessages.map((m) => {
            const isMe = m.senderName === 'You' || m.senderRole === 'patient';
            return (
              <div
                key={m.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-4 rounded-sm space-y-1 shadow-md ${
                    isMe
                      ? 'bg-[var(--gold)] text-[#080907] font-medium'
                      : 'bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] opacity-75 font-mono mb-1 gap-4">
                    <span>{m.senderName}</span>
                    <span>{m.timestamp}</span>
                  </div>
                  <p className="leading-relaxed">{m.content}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* COMPOSER INPUT */}
        <form onSubmit={handleSendMessage} className="p-3 bg-[var(--background-secondary)] border-t border-[var(--border)] flex items-center gap-2">
          <button
            type="button"
            className="p-2.5 text-[var(--foreground-subtle)] hover:text-[var(--gold)] rounded-sm transition-colors"
            title="Attach file"
          >
            <Paperclip className="w-4 h-4" />
          </button>

          <input
            type="text"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type your secure message..."
            className="flex-1 px-4 py-3 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm font-sans text-xs text-[var(--foreground)] focus:outline-none focus:border-[var(--gold)]"
          />

          <button
            type="submit"
            className="px-5 py-3 bg-[var(--gold)] hover:bg-[var(--gold-light)] text-[#080907] font-mono text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5 shrink-0 shadow-lg"
          >
            <Send className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">SEND</span>
          </button>
        </form>

      </div>

    </div>
  );
};
