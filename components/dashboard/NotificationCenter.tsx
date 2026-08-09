import React from 'react';
import { X, Bell, CheckCircle2, Calendar, CreditCard, MessageSquare, ShieldAlert } from 'lucide-react';
import { NotificationItem } from '../../types/dashboard';
import Link from 'next/link';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAllRead: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-md bg-[var(--background-secondary)] border-l border-[var(--border)] h-full p-6 space-y-6 flex flex-col justify-between shadow-2xl relative">
        
        {/* HEADER */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border)]">
          <div className="flex items-center gap-2 font-cinzel text-lg font-bold text-[var(--foreground)]">
            <div className="p-1.5 bg-[#C96A4B]/15 border border-[#C96A4B]/40 rounded-sm text-[#E58567]">
              <Bell className="w-4 h-4" />
            </div>
            <span>NOTIFICATIONS</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onMarkAllRead}
              className="font-mono text-[10px] text-[#9EC4A1] hover:underline font-bold"
            >
              Mark all read
            </button>
            <button
              onClick={onClose}
              className="p-1 text-[var(--foreground-subtle)] hover:text-[var(--foreground)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NOTIFICATION LIST */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1 font-sans text-xs custom-scrollbar">
          {notifications.map((n) => {
            const Icon =
              n.type === 'appointment' ? Calendar :
              n.type === 'payment' ? CreditCard :
              n.type === 'message' ? MessageSquare : ShieldAlert;

            const typeConfig = {
              appointment: {
                iconBg: 'bg-sky-500/15 text-sky-400 border-sky-500/40',
                border: n.read ? 'border-[var(--border-subtle)]' : 'border-sky-500/60 shadow-[0_0_12px_rgba(14,165,233,0.15)]',
                badge: 'APPOINTMENT',
                badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30',
                link: 'text-sky-400 hover:text-sky-300'
              },
              message: {
                iconBg: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/40',
                border: n.read ? 'border-[var(--border-subtle)]' : 'border-indigo-500/60 shadow-[0_0_12px_rgba(99,102,241,0.15)]',
                badge: 'MESSAGE',
                badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
                link: 'text-indigo-400 hover:text-indigo-300'
              },
              payment: {
                iconBg: 'bg-[#81A684]/15 text-[#9EC4A1] border-[#81A684]/40',
                border: n.read ? 'border-[var(--border-subtle)]' : 'border-[#81A684]/60 shadow-[0_0_12px_rgba(129,166,132,0.15)]',
                badge: 'PAYMENT',
                badgeClass: 'bg-[#81A684]/20 text-[#A3C9A6] border-[#81A684]/30',
                link: 'text-[#81A684] hover:text-[#A3C9A6]'
              },
              alert: {
                iconBg: 'bg-[#C96A4B]/15 text-[#E58567] border-[#C96A4B]/40',
                border: n.read ? 'border-[var(--border-subtle)]' : 'border-[#C96A4B]/60 shadow-[0_0_12px_rgba(201,106,75,0.15)]',
                badge: 'CLINICAL ALERT',
                badgeClass: 'bg-[#C96A4B]/20 text-[#F18D70] border-[#C96A4B]/30',
                link: 'text-[#C96A4B] hover:text-[#F18D70]'
              },
              system: {
                iconBg: 'bg-[#D99B26]/15 text-[#F5B842] border-[#D99B26]/40',
                border: n.read ? 'border-[var(--border-subtle)]' : 'border-[#D99B26]/60 shadow-[0_0_12px_rgba(217,155,38,0.15)]',
                badge: 'GOVERNANCE',
                badgeClass: 'bg-[#D99B26]/20 text-[#F5C252] border-[#D99B26]/30',
                link: 'text-[#D99B26] hover:text-[#F5C252]'
              }
            };

            const config = typeConfig[n.type as keyof typeof typeConfig] || typeConfig.system;

            return (
              <div
                key={n.id}
                className={`p-4 rounded-sm border transition-all ${
                  n.read
                    ? 'bg-[var(--background-tertiary)]/70 opacity-75'
                    : 'bg-[var(--background-secondary)]'
                } ${config.border}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-sm border shrink-0 mt-0.5 ${config.iconBg}`}>
                    <Icon className="w-4 h-4" />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-1.5 py-0.5 border font-mono text-[9px] font-bold rounded-xs ${config.badgeClass}`}>
                          {config.badge}
                        </span>
                        {!n.read && (
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                        )}
                      </div>
                      <span className="font-mono text-[9px] text-[var(--foreground-subtle)] shrink-0">{n.timestamp}</span>
                    </div>

                    <h4 className="font-bold text-[var(--foreground)] font-cinzel text-xs leading-snug">{n.title}</h4>
                    <p className="text-[var(--foreground-muted)] text-[11px] leading-relaxed">{n.message}</p>

                    {n.actionUrl && (
                      <Link
                        href={n.actionUrl}
                        onClick={onClose}
                        className={`inline-flex items-center gap-1 mt-1.5 font-mono text-[10px] font-bold transition-colors ${config.link}`}
                      >
                        <span>VIEW DETAILS</span>
                        <span>→</span>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FOOTER */}
        <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
          <Link
            href="/dashboard/notifications"
            onClick={onClose}
            className="w-full py-2.5 bg-[#81A684]/15 hover:bg-[#81A684]/25 border border-[#81A684]/40 text-[#9EC4A1] font-mono text-xs font-bold rounded-sm text-center flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <span>VIEW ALL NOTIFICATIONS PAGE</span>
            <span>→</span>
          </Link>

          <div className="font-mono text-[9px] text-[var(--foreground-subtle)] text-center">
            REHAB NIGERIA SECURE DISPATCH SYSTEM
          </div>
        </div>

      </div>
    </div>
  );
};
