import React, { useState } from 'react';
import { Bell, Search, User, Shield, LogOut, ChevronDown, Sparkles, Sliders } from 'lucide-react';
import { UserRole, UserProfile } from '../../types/dashboard';
import { mockUsers } from '../../lib/dashboardData';

interface DashboardHeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onOpenNotifications: () => void;
  unreadCount?: number;
  onLogout?: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  currentRole,
  onRoleChange,
  onOpenNotifications,
  unreadCount = 1,
  onLogout
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const user = mockUsers[currentRole] || mockUsers.patient;

  return (
    <header className="sticky top-0 z-20 bg-[var(--background-secondary)]/95 backdrop-blur-md border-b border-[var(--border)] px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4">
      
      {/* LEFT: BREADCRUMB / PORTAL IDENTITY */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-[var(--foreground-subtle)]">
          <span className="text-[var(--gold)] font-bold uppercase">{currentRole.toUpperCase()} PORTAL</span>
          <span>/</span>
          <span className="text-[var(--foreground)]">REHAB NIGERIA</span>
        </div>
      </div>

      {/* CENTER/RIGHT: CONTROLS */}
      <div className="flex items-center gap-3 ml-auto">
        
        {/* ROLE SWITCHER PILL (FOR EASY PREVIEW TESTING) */}
        <div className="flex items-center gap-1.5 p-1 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] rounded-sm font-mono text-[10px]">
          <span className="text-[var(--gold)] font-bold px-1.5 hidden md:inline">TEST ROLE:</span>
          {(['patient', 'family', 'coordinator', 'admin'] as UserRole[]).map((r) => {
            const roleBtnColors = {
              patient: 'bg-[#81A684] text-[#080907] font-extrabold shadow-sm',
              family: 'bg-sky-500 text-slate-950 font-extrabold shadow-sm',
              coordinator: 'bg-[#D99B26] text-[#080907] font-extrabold shadow-sm',
              admin: 'bg-indigo-500 text-white font-extrabold shadow-sm'
            };

            return (
              <button
                key={r}
                onClick={() => onRoleChange(r)}
                className={`px-2 py-1 rounded-sm capitalize transition-all ${
                  currentRole === r
                    ? roleBtnColors[r]
                    : 'text-[var(--foreground-subtle)] hover:text-[var(--foreground)]'
                }`}
              >
                {r === 'coordinator' ? 'Consultant' : r}
              </button>
            );
          })}
        </div>

        {/* NOTIFICATION BELL */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] hover:border-amber-500/50 rounded-sm text-[var(--foreground)] transition-all duration-200 group shadow-sm"
          title="Notifications"
        >
          <Bell className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform duration-200" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C96A4B] text-white font-mono text-[9px] font-extrabold rounded-full flex items-center justify-center shadow-[0_0_8px_rgba(201,106,75,0.8)] animate-pulse">
              {unreadCount}
            </span>
          )}
        </button>

        {/* USER PROFILE DROPDOWN */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 p-1.5 bg-[var(--background-tertiary)] hover:bg-[var(--border)] border border-[var(--border-subtle)] rounded-sm transition-colors text-left"
          >
            <div className="w-7 h-7 rounded-sm bg-[var(--gold)]/20 border border-[var(--gold)] text-[var(--gold-light)] font-mono text-xs font-bold flex items-center justify-center">
              {user.firstName[0]}
            </div>
            <div className="hidden sm:block font-sans text-xs leading-none">
              <span className="block font-bold text-[var(--foreground)]">{user.firstName} {user.lastName}</span>
              <span className="block font-mono text-[9px] text-[var(--foreground-subtle)] capitalize mt-0.5">{user.role}</span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[var(--foreground-subtle)]" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm shadow-2xl p-2 font-mono text-xs space-y-1 z-50">
              <div className="p-2 border-b border-[var(--border-subtle)] text-[11px]">
                <div className="font-bold text-[var(--foreground)]">{user.firstName} {user.lastName}</div>
                <div className="text-[10px] text-[var(--foreground-subtle)] truncate">{user.email}</div>
              </div>

              <a href="/dashboard/settings" className="block px-3 py-2 text-[var(--foreground-muted)] hover:bg-[var(--background-tertiary)] hover:text-[var(--gold)] rounded-sm">
                Profile & Security
              </a>

              {onLogout && (
                <button
                  onClick={onLogout}
                  className="w-full text-left px-3 py-2 text-[var(--accent-terracotta)] hover:bg-[var(--accent-terracotta)]/10 rounded-sm flex items-center gap-2 mt-1 pt-2 border-t border-[var(--border-subtle)]"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          )}
        </div>

      </div>

    </header>
  );
};
