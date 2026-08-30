"use client";
import { DashboardShell } from '@/components/dashboard/DashboardShell';
import React, { useState } from 'react';

// ── Local types ──────────────────────────────────────────────────────────
interface AppNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

// ── Mock data — replace with real fetches/session data ──────────────────
const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n-1',
    title: 'Consultation Confirmed',
    message: 'Your follow-up consultation with Dr. Ifeoma Chukwu has been confirmed for Thu, 4 Sep at 10:30 AM.',
    timestamp: '2h ago',
    read: false,
  },
  {
    id: 'n-2',
    title: 'New Clinical Summary Available',
    message: 'Dr. Ifeoma Chukwu has published a consultation summary from your last session.',
    timestamp: '1d ago',
    read: false,
  },
  {
    id: 'n-3',
    title: 'Payment Received',
    message: 'Your payment of ₦10,000 for the video consultation was successfully processed.',
    timestamp: '3d ago',
    read: true,
  },
];

export const PatientNotificationsPage: React.FC = () => {
  // Swap this for a real fetch/session-driven list once the backend is ready —
  // nothing below this point needs to change.
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    // TODO: call your API to persist this once the backend is ready
    // (e.g. PATCH /api/notifications/:id).
  };

  return (
    <DashboardShell
      title="Notifications & Clinical Alerts"
      description="Stay updated with consultation schedules, clinical recommendations, and care pathway messages."
      breadcrumbs={[{ label: 'Healthcare Portal', path: '/patient' }, { label: 'Notifications' }]}
      role="patient"
    >
      <div className="max-w-3xl mx-auto space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id}
            onClick={() => markNotificationRead(n.id)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer space-y-2 shadow-md ${
              n.read
                ? 'bg-[var(--background-secondary)] border border-[var(--border)]'
                : 'bg-[var(--background-secondary)] border border-[var(--border-subtle)] shadow-[var(--gold)]/5'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${n.read ? 'bg-[var(--border)]' : 'bg-[var(--gold)]'}`} />
                <h4 className="font-cinzel font-bold text-sm text-[var(--foreground)]">
                  {n.title}
                </h4>
              </div>
              <span className="text-[10px] font-medium text-[var(--foreground-subtle)]">{n.timestamp}</span>
            </div>

            <p className="text-xs text-[var(--foreground-muted)] leading-relaxed pl-4">
              {n.message}
            </p>
          </div>
        ))}
      </div>
    </DashboardShell>
  );
};