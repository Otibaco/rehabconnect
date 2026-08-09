import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  ShieldCheck,
  LayoutDashboard,
  Compass,
  Video,
  MessageSquare,
  BookOpen,
  CreditCard,
  User,
  Users,
  Calendar,
  UserCheck,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Activity,
  Sparkles,
  Lock,
  Bell
} from 'lucide-react';
import { UserRole } from '../../types/dashboard';

interface DashboardSidebarProps {
  role: UserRole;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onLogout?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
  badgeColor?: 'sky' | 'indigo' | 'sage' | 'amber' | 'terracotta' | 'teal' | 'slate';
  iconColor: string;
}

export const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  role,
  collapsed,
  onToggleCollapse,
  onLogout
}) => {
  // Navigation config by role with secondary color accents (#81A684 Sage, #5C6B73 Slate, #C96A4B Terracotta, #3B828E Teal, #D99B26 Amber)
  const navByRole: Record<UserRole, NavItem[]> = {
    patient: [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, iconColor: 'text-[#D99B26] group-hover:text-amber-300' },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'terracotta', iconColor: 'text-[#C96A4B] group-hover:text-rose-300' },
      { label: 'My Journey', href: '/dashboard/journey', icon: Compass, iconColor: 'text-[#81A684] group-hover:text-emerald-300' },
      { label: 'Consultations', href: '/dashboard/consultations', icon: Video, badge: '1', badgeColor: 'sky', iconColor: 'text-sky-400 group-hover:text-sky-300' },
      { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '1', badgeColor: 'indigo', iconColor: 'text-indigo-400 group-hover:text-indigo-300' },
      { label: 'Resources', href: '/dashboard/resources', icon: BookOpen, iconColor: 'text-[#3B828E] group-hover:text-teal-300' },
      { label: 'Payments', href: '/dashboard/payments', icon: CreditCard, iconColor: 'text-[#C96A4B] group-hover:text-rose-300' },
      { label: 'Profile & Settings', href: '/dashboard/settings', icon: User, iconColor: 'text-[#5C6B73] group-hover:text-slate-200' }
    ],
    family: [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, iconColor: 'text-[#D99B26] group-hover:text-amber-300' },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'terracotta', iconColor: 'text-[#C96A4B] group-hover:text-rose-300' },
      { label: 'People I Support', href: '/dashboard/family', icon: Users, badge: '1', badgeColor: 'sage', iconColor: 'text-[#81A684] group-hover:text-emerald-300' },
      { label: 'Consultations', href: '/dashboard/consultations', icon: Video, iconColor: 'text-sky-400 group-hover:text-sky-300' },
      { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, iconColor: 'text-indigo-400 group-hover:text-indigo-300' },
      { label: 'Resources', href: '/dashboard/resources', icon: BookOpen, iconColor: 'text-[#3B828E] group-hover:text-teal-300' },
      { label: 'Profile & Settings', href: '/dashboard/settings', icon: User, iconColor: 'text-[#5C6B73] group-hover:text-slate-200' }
    ],
    coordinator: [
      { label: 'Overview', href: '/dashboard', icon: LayoutDashboard, iconColor: 'text-[#D99B26] group-hover:text-amber-300' },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'terracotta', iconColor: 'text-[#C96A4B] group-hover:text-rose-300' },
      { label: 'My Patients', href: '/dashboard/patients', icon: Users, badge: '3', badgeColor: 'sage', iconColor: 'text-[#81A684] group-hover:text-emerald-300' },
      { label: 'Appointments', href: '/dashboard/consultations', icon: Calendar, badge: '2', badgeColor: 'sky', iconColor: 'text-sky-400 group-hover:text-sky-300' },
      { label: 'Consultation Room', href: '/dashboard/consultation-room/cns_101', icon: Video, iconColor: 'text-[#C96A4B] group-hover:text-rose-300' },
      { label: 'Messages', href: '/dashboard/messages', icon: MessageSquare, badge: '1', badgeColor: 'indigo', iconColor: 'text-indigo-400 group-hover:text-indigo-300' },
      { label: 'Resources', href: '/dashboard/resources', icon: BookOpen, iconColor: 'text-[#3B828E] group-hover:text-teal-300' },
      { label: 'Profile & Settings', href: '/dashboard/settings', icon: User, iconColor: 'text-[#5C6B73] group-hover:text-slate-200' }
    ],
    admin: [
      { label: 'Overview', href: '/admin', icon: LayoutDashboard, iconColor: 'text-[#D99B26] group-hover:text-amber-300' },
      { label: 'Notifications', href: '/dashboard/notifications', icon: Bell, badge: '2', badgeColor: 'terracotta', iconColor: 'text-[#C96A4B] group-hover:text-rose-300' },
      { label: 'User Directory', href: '/admin/users', icon: Users, iconColor: 'text-[#3B828E] group-hover:text-teal-300' },
      { label: 'Verification Queue', href: '/admin/verification', icon: UserCheck, badge: '2', badgeColor: 'terracotta', iconColor: 'text-[#C96A4B] group-hover:text-rose-300' },
      { label: 'Consultations', href: '/dashboard/consultations', icon: Video, iconColor: 'text-sky-400 group-hover:text-sky-300' },
      { label: 'Payments', href: '/dashboard/payments', icon: CreditCard, iconColor: 'text-[#81A684] group-hover:text-emerald-300' },
      { label: 'Platform Reports', href: '/admin/reports', icon: BarChart3, iconColor: 'text-indigo-400 group-hover:text-indigo-300' },
      { label: 'System Settings', href: '/admin/settings', icon: Settings, iconColor: 'text-[#5C6B73] group-hover:text-slate-200' }
    ]
  };

  const roleStyles = {
    patient: {
      tag: 'PATIENT',
      badgeClass: 'bg-[#81A684]/20 text-[#A3C9A6] border-[#81A684]/40'
    },
    family: {
      tag: 'FAMILY CAREGIVER',
      badgeClass: 'bg-sky-500/20 text-sky-300 border-sky-500/30'
    },
    coordinator: {
      tag: 'MDCN CONSULTANT',
      badgeClass: 'bg-[#D99B26]/20 text-[#F5C252] border-[#D99B26]/40'
    },
    admin: {
      tag: 'GOVERNANCE ADMIN',
      badgeClass: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30'
    }
  };

  const badgeColorClasses = {
    sky: 'bg-sky-500 text-slate-950 shadow-[0_0_8px_rgba(14,165,233,0.5)]',
    indigo: 'bg-indigo-500 text-white shadow-[0_0_8px_rgba(99,102,241,0.5)]',
    sage: 'bg-[#81A684] text-[#080907] shadow-[0_0_8px_rgba(129,166,132,0.5)]',
    amber: 'bg-[#D99B26] text-[#080907] shadow-[0_0_8px_rgba(217,155,38,0.5)]',
    terracotta: 'bg-[#C96A4B] text-white shadow-[0_0_8px_rgba(201,106,75,0.5)]',
    teal: 'bg-[#3B828E] text-white shadow-[0_0_8px_rgba(59,130,142,0.5)]',
    slate: 'bg-[#5C6B73] text-white shadow-[0_0_8px_rgba(92,107,115,0.5)]'
  };

  const currentNav = navByRole[role] || navByRole.patient;
  const currentRoleStyle = roleStyles[role] || roleStyles.patient;

  return (
    <aside
      className={`fixed top-0 left-0 bottom-0 z-30 bg-[var(--background-secondary)]/95 backdrop-blur-md border-r border-[var(--border)] transition-all duration-300 ease-in-out overflow-x-hidden hidden lg:flex flex-col justify-between shadow-2xl ${
        collapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* TOP BRAND & TOGGLE HEADER */}
      <div className="p-4 border-b border-[var(--border-subtle)] flex items-center justify-between gap-2 overflow-hidden">
        <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden group">
          <div className="w-10 h-10 rounded-sm bg-gradient-to-br from-[var(--background-tertiary)] to-[var(--background)] border border-[var(--gold)]/60 flex items-center justify-center text-[var(--gold)] shrink-0 shadow-lg group-hover:border-[var(--gold)] transition-colors">
            <ShieldCheck className="w-5 h-5 text-[var(--gold)]" />
          </div>

          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap ${
              collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-xs'
            }`}
          >
            <div className="font-cinzel leading-none">
              <span className="block text-sm font-extrabold text-[var(--foreground)] tracking-wide bg-gradient-to-r from-white via-[var(--foreground)] to-slate-300 bg-clip-text text-transparent">
                REHAB NIGERIA
              </span>
              <span
                className={`inline-block px-1.5 py-0.5 mt-1 border text-[9px] font-mono font-bold rounded-xs tracking-wider uppercase ${currentRoleStyle.badgeClass}`}
              >
                {currentRoleStyle.tag}
              </span>
            </div>
          </div>
        </Link>

        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-sm bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground-subtle)] hover:text-[var(--gold)] hover:border-[var(--gold)] hover:bg-[var(--background-secondary)] transition-all duration-200 shrink-0 shadow-sm"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 transition-transform duration-300" />
          ) : (
            <ChevronLeft className="w-4 h-4 transition-transform duration-300" />
          )}
        </button>
      </div>

      {/* NAVIGATION ITEMS */}
      <div className="flex-1 py-4 px-2.5 space-y-1.5 overflow-y-auto font-sans text-xs custom-scrollbar">
        {currentNav.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.label}
              to={item.href}
              end={item.href === '/dashboard' || item.href === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-3 py-3 rounded-sm transition-all duration-300 ease-in-out group relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-[var(--gold)]/20 via-[var(--gold)]/8 to-transparent border-y border-r border-[var(--gold)]/25 text-[var(--gold-light)] font-bold shadow-md'
                    : 'text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)]/80 hover:text-[var(--foreground)] border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Subtle active state indicator in Rehab Nigeria gold */}
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-1 bg-[var(--gold)] rounded-r-md shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                  )}

                  {/* Icon with high-contrast color & active glow */}
                  <div
                    className={`shrink-0 p-1 rounded-xs transition-all duration-300 ${
                      isActive
                        ? 'bg-[var(--gold)]/20 text-[var(--gold)] shadow-[0_0_10px_rgba(212,175,55,0.4)] scale-110'
                        : `${item.iconColor} group-hover:scale-110`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>

                  {/* Label with smooth collapse transition */}
                  <span
                    className={`font-mono text-xs transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                      collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-[160px] flex-1'
                    }`}
                  >
                    {item.label}
                  </span>

                  {/* Badge with smooth collapse transition */}
                  {item.badge && (
                    <span
                      className={`px-1.5 py-0.5 font-mono text-[10px] font-extrabold rounded-xs transition-all duration-300 ease-in-out whitespace-nowrap ${
                        collapsed
                          ? 'opacity-0 max-w-0 p-0 overflow-hidden scale-0'
                          : 'opacity-100 max-w-[60px] scale-100'
                      } ${badgeColorClasses[item.badgeColor || 'amber']}`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {/* Badge dot when collapsed */}
                  {item.badge && (
                    <span
                      className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse shadow-[0_0_6px_var(--gold)] transition-all duration-300 ${
                        collapsed ? 'opacity-100 scale-100' : 'opacity-0 scale-0 pointer-events-none'
                      }`}
                    />
                  )}

                  {/* Hover Tooltip when Collapsed */}
                  {collapsed && (
                    <div className="absolute left-full ml-3 px-3 py-1.5 bg-[#0D0E0B] border border-[var(--gold)]/40 text-[var(--foreground)] font-mono text-xs rounded-sm whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-all duration-200 z-50 shadow-2xl flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className={`px-1 py-0.2 font-extrabold text-[9px] rounded-xs ${badgeColorClasses[item.badgeColor || 'amber']}`}>
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* FOOTER BLOCK WITH LIVE STATUS & ACTIONS */}
      <div className="p-3 border-t border-[var(--border-subtle)] space-y-2 bg-[var(--background-tertiary)]/40 overflow-hidden">
        
        {/* LIVE SYSTEM ENCRYPTION INDICATOR WITH SMOOTH FADE */}
        <div
          className={`p-2 bg-[var(--background)]/80 border border-[var(--border-subtle)] rounded-sm flex items-center justify-between font-mono text-[10px] text-[var(--foreground-muted)] overflow-hidden transition-all duration-300 ease-in-out ${
            collapsed ? 'justify-center' : ''
          }`}
          title="MDCN Secure 256-Bit Encrypted Channel"
        >
          <div className="flex items-center gap-2 shrink-0">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_#10B981]" />
            </span>
            <span
              className={`text-emerald-400 font-bold uppercase tracking-wider transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-xs'
              }`}
            >
              MDCN SECURE
            </span>
          </div>

          <div
            className={`flex items-center gap-1 text-[var(--gold)] transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
              collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-xs'
            }`}
          >
            <Lock className="w-3 h-3" />
            <span>256-BIT</span>
          </div>
        </div>

        <Link
          to="/"
          className={`flex items-center gap-3 px-3 py-2 text-[var(--foreground-subtle)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] font-mono text-[11px] rounded-sm transition-all duration-300 ease-in-out group overflow-hidden ${
            collapsed ? 'justify-center' : ''
          }`}
          title="Return to Public Website"
        >
          <Compass className="w-4 h-4 shrink-0 text-cyan-400 group-hover:rotate-45 transition-transform duration-300" />
          <span
            className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
              collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-xs'
            }`}
          >
            Public Website
          </span>
        </Link>

        {onLogout && (
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 text-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta)]/15 font-mono text-[11px] rounded-sm transition-all duration-300 ease-in-out group overflow-hidden ${
              collapsed ? 'justify-center' : ''
            }`}
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span
              className={`transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
                collapsed ? 'opacity-0 max-w-0' : 'opacity-100 max-w-xs'
              }`}
            >
              Sign Out
            </span>
          </button>
        )}
      </div>
    </aside>
  );
};

