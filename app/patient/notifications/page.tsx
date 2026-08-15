import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { Bell, CheckCircle2, Calendar, FileText, AlertCircle } from 'lucide-react';

export const PatientNotificationsPage: React.FC = () => {
  const { notifications, markNotificationRead } = useAuth();

  return (
    <DashboardShell
      title="Notifications & Clinical Alerts"
      description="Stay updated with consultation schedules, clinical recommendations, and care pathway messages."
      breadcrumbs={[{ label: 'Healthcare Portal', path: '/patient/dashboard' }, { label: 'Notifications' }]}
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
