import React, { useState } from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { useRouter } from '../../context/RouterContext';
import { useAuth } from '../../context/AuthContext';
import {
  Bell,
  CheckCircle2,
  Clock,
  Video,
  MessageSquare,
  ClipboardList,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  Trash2
} from 'lucide-react';
import { motion } from 'motion/react';

export const CoordinatorNotificationsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { notifications, markNotificationRead } = useAuth();
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const doctorNotifications = [
    {
      id: 'notif-doc-1',
      title: 'Upcoming Video Telehealth Session in 30 Mins',
      message: 'Sarah Jenkins is queued for her Post-Surgical Knee & Spinal Tele-Therapy consultation at 10:30 AM.',
      time: '20 mins ago',
      type: 'video' as const,
      read: false,
      actionUrl: '/coordinator/consultation-live' as const,
    },
    {
      id: 'notif-doc-2',
      title: 'Patient Sent a Direct Message & Vitals Update',
      message: 'Sarah Jenkins reported pain decreased to 2/10 and submitted her Week 2 movement log.',
      time: '1 hour ago',
      type: 'message' as const,
      read: false,
      actionUrl: '/coordinator/messages' as const,
    },
    {
      id: 'notif-doc-3',
      title: 'New Online Rehabilitation Assessment Submitted',
      message: 'David Okafor (Family: Chidi) submitted comprehensive stroke recovery history for doctor review.',
      time: '3 hours ago',
      type: 'assessment' as const,
      read: true,
      actionUrl: '/coordinator/patients' as const,
    },
    {
      id: 'notif-doc-4',
      title: 'Clinical Protocol Completed by Patient',
      message: 'Emmanuel Nwachukwu completed the Cognitive Behavioral Craving Prevention worksheet.',
      time: 'Yesterday',
      type: 'protocol' as const,
      read: true,
      actionUrl: '/coordinator/resources' as const,
    },
  ];

  return (
    <DashboardShell
      title="Clinical Notifications & Patient Alerts"
      description="Real-time telehealth appointment alerts, patient vitals updates, and intake submissions."
      breadcrumbs={[{ label: 'Doctor Suite' }, { label: 'Notifications' }]}
    >
      <div className="space-y-6">
        {/* HEADER BAR */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-cinzel font-bold text-base sm:text-lg text-[var(--foreground)]">
                Doctor Notification Center
              </h2>
              <span className="text-xs text-[var(--foreground-muted)]">
                2 Unread Urgent Patient Alerts
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setFilter(filter === 'all' ? 'unread' : 'all')}
              className="px-3.5 py-1.5 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border)] text-xs text-[var(--foreground)] hover:text-[var(--gold)] font-medium transition-colors"
            >
              {filter === 'all' ? 'Show Unread Only' : 'Show All Alerts'}
            </button>
          </div>
        </div>

        {/* NOTIFICATIONS LIST */}
        <div className="space-y-3">
          {doctorNotifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => navigate(notif.actionUrl)}
              className={`p-4 sm:p-5 rounded-3xl border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 group ${
                !notif.read
                  ? 'bg-[var(--background-secondary)] border-[var(--gold)]/60 shadow-lg shadow-[var(--gold)]/5'
                  : 'bg-[var(--background-secondary)] border-[var(--border)] opacity-80 hover:opacity-100 hover:border-[var(--gold)]/40'
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    notif.type === 'video'
                      ? 'bg-[var(--gold)]/15 text-[var(--gold)] border border-[var(--gold)]/30'
                      : notif.type === 'message'
                      ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30'
                      : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                  }`}
                >
                  {notif.type === 'video' ? (
                    <Video className="w-5 h-5" />
                  ) : notif.type === 'message' ? (
                    <MessageSquare className="w-5 h-5" />
                  ) : (
                    <ClipboardList className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-xs sm:text-sm text-[var(--foreground)] group-hover:text-[var(--gold)] transition-colors">
                      {notif.title}
                    </h4>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-[var(--foreground-subtle)] block">
                    {notif.time}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:self-center">
                <span className="text-xs text-[var(--gold)] font-semibold group-hover:underline flex items-center gap-1">
                  <span>Take Action</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};
