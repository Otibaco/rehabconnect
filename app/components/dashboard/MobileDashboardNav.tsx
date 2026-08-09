import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Compass,
  Video,
  MessageSquare,
  User,
  Users,
  BarChart3,
  UserCheck,
  Bell
} from 'lucide-react';
import { UserRole } from '../../types/dashboard';

interface TabItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: 'sky' | 'indigo' | 'sage' | 'terracotta' | 'amber';
  colorClass: string;
}

interface MobileDashboardNavProps {
  role: UserRole;
}

export const MobileDashboardNav: React.FC<MobileDashboardNavProps> = ({ role }) => {
  const patientTabs: TabItem[] = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, colorClass: 'text-[#D99B26]' },
    { label: 'Alerts', href: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'terracotta', colorClass: 'text-[#C96A4B]' },
    { label: 'Journey', href: '/dashboard/journey', icon: Compass, colorClass: 'text-[#81A684]' },
    { label: 'Consult', href: '/dashboard/consultations', icon: Video, badge: '1', badgeColor: 'sky', colorClass: 'text-sky-400' },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '1', badgeColor: 'indigo', colorClass: 'text-indigo-400' }
  ];

  const coordinatorTabs: TabItem[] = [
    { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, colorClass: 'text-[#D99B26]' },
    { label: 'Alerts', href: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'terracotta', colorClass: 'text-[#C96A4B]' },
    { label: 'Patients', href: '/dashboard/patients', icon: Users, badge: '3', badgeColor: 'sage', colorClass: 'text-[#81A684]' },
    { label: 'Room', href: '/dashboard/consultation-room/cns_101', icon: Video, colorClass: 'text-[#C96A4B]' },
    { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '1', badgeColor: 'indigo', colorClass: 'text-indigo-400' }
  ];

  const adminTabs: TabItem[] = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard, colorClass: 'text-[#D99B26]' },
    { label: 'Alerts', href: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'terracotta', colorClass: 'text-[#C96A4B]' },
    { label: 'Users', href: '/admin/users', icon: Users, colorClass: 'text-[#3B828E]' },
    { label: 'Verify', href: '/admin/verification', icon: UserCheck, badge: '2', badgeColor: 'terracotta', colorClass: 'text-[#C96A4B]' },
    { label: 'Reports', href: '/admin/reports', icon: BarChart3, colorClass: 'text-indigo-400' }
  ];

  const badgeStyles = {
    sky: 'bg-sky-500 text-slate-950 shadow-[0_0_8px_rgba(14,165,233,0.6)]',
    indigo: 'bg-indigo-500 text-white shadow-[0_0_8px_rgba(99,102,241,0.6)]',
    sage: 'bg-[#81A684] text-[#080907] shadow-[0_0_8px_rgba(129,166,132,0.6)]',
    terracotta: 'bg-[#C96A4B] text-white shadow-[0_0_8px_rgba(201,106,75,0.6)]',
    amber: 'bg-[#D99B26] text-[#080907] shadow-[0_0_8px_rgba(217,155,38,0.6)]'
  };

  const tabs = role === 'coordinator' ? coordinatorTabs : role === 'admin' ? adminTabs : patientTabs;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[var(--background-secondary)]/95 backdrop-blur-lg border-t border-[var(--border)] px-1 py-1.5 flex items-center justify-around font-mono text-[10px] shadow-[0_-4px_20px_rgba(0,0,0,0.6)]">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <NavLink
            key={tab.label}
            to={tab.href}
            end={tab.href === '/dashboard' || tab.href === '/admin'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[60px] min-h-[44px] px-2 py-1 rounded-sm transition-all duration-300 relative group ${
                isActive
                  ? 'bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] font-bold shadow-md'
                  : 'text-[var(--foreground-subtle)] hover:text-[var(--foreground)]'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Active Indicator Bar */}
                {isActive && (
                  <span className="absolute -top-1.5 left-2 right-2 h-0.5 bg-[var(--gold)] rounded-full shadow-[0_0_8px_var(--gold)]" />
                )}

                <div
                  className={`p-1 rounded-xs transition-transform duration-300 ${
                    isActive ? `${tab.colorClass} scale-110` : `${tab.colorClass} opacity-70 group-hover:opacity-100`
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>

                <span
                  className={`text-[9px] tracking-tight leading-none mt-0.5 ${
                    isActive ? 'text-[var(--foreground)] font-bold' : 'text-[var(--foreground-subtle)]'
                  }`}
                >
                  {tab.label}
                </span>

                {tab.badge && (
                  <span
                    className={`absolute -top-1 right-2 px-1 py-0.2 min-w-[14px] h-[14px] font-bold text-[8px] rounded-full flex items-center justify-center ${
                      badgeStyles[tab.badgeColor || 'amber']
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </>
            )}
          </NavLink>
        );
      })}
    </div>
  );
};
