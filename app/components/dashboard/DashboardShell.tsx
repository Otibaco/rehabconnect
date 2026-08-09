import React, { useState } from 'react';
import { DashboardSidebar } from './DashboardSidebar';
import { DashboardHeader } from './DashboardHeader';
import { MobileDashboardNav } from './MobileDashboardNav';
import { NotificationCenter } from './NotificationCenter';
import { UserRole } from '../../types/dashboard';
import { mockNotifications } from '../../lib/dashboardData';

interface DashboardShellProps {
  role?: UserRole;
  onRoleChange?: (role: UserRole) => void;
  onLogout?: () => void;
  children: React.ReactNode;
}

export const DashboardShell: React.FC<DashboardShellProps> = ({
  role = 'patient',
  onRoleChange,
  onLogout,
  children
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  const [currentRole, setCurrentRole] = useState<UserRole>(role);

  const handleRoleSelect = (r: UserRole) => {
    setCurrentRole(r);
    if (onRoleChange) {
      onRoleChange(r);
    }
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans flex flex-col relative selection:bg-[var(--gold)]/30">
      
      {/* DESKTOP COLLAPSIBLE SIDEBAR */}
      <DashboardSidebar
        role={currentRole}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed(!collapsed)}
        onLogout={onLogout}
      />

      {/* MAIN CONTAINER WRAPPER */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          collapsed ? 'lg:pl-20' : 'lg:pl-64'
        }`}
      >
        
        {/* DASHBOARD HEADER */}
        <DashboardHeader
          currentRole={currentRole}
          onRoleChange={handleRoleSelect}
          onOpenNotifications={() => setNotificationsOpen(true)}
          unreadCount={unreadCount}
          onLogout={onLogout}
        />

        {/* MAIN CONTENT AREA */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto pb-24 lg:pb-12">
          {children}
        </main>

      </div>

      {/* MOBILE NAVIGATION BAR */}
      <MobileDashboardNav role={currentRole} />

      {/* NOTIFICATIONS DRAWER */}
      <NotificationCenter
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
        notifications={notifications}
        onMarkAllRead={handleMarkAllRead}
      />

    </div>
  );
};
