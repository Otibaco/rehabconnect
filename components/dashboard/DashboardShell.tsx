"use client"
import React, { useState, useEffect, useRef } from 'react';
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  CreditCard,
  Bell,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Search,
  Users,
  UserCheck,
  BookOpen,
  PieChart,
  Sliders,
  Sparkles,
  ArrowRight,
  Stethoscope,
  ChevronDown,
  MessageSquare,
  Activity,
  HeartHandshake,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoutePath } from '@/types/type';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface SidebarItem {
  label: string;
  path: RoutePath;
  icon: React.ElementType;
  badge?: string;
}

interface SidebarGroup {
  groupName?: string;
  items: SidebarItem[];
}

interface DashboardShellProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  breadcrumbs?: { label: string; path?: RoutePath }[];
}

const TOPBAR_HEIGHT = 64; // px, matches h-16
const SIDEBAR_EXPANDED = 264;
const SIDEBAR_COLLAPSED = 78;

export const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  title,
  description,
  breadcrumbs = [],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;
  const { currentUser, role, logout, notifications, markNotificationRead } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Persist collapse preference across sessions
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem('rn-sidebar-collapsed') : null;
    if (saved) setCollapsed(saved === 'true');
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== 'undefined') window.localStorage.setItem('rn-sidebar-collapsed', String(next));
      return next;
    });
  };

  const patientGroups: SidebarGroup[] = [
    {
      groupName: 'My Care',
      items: [
        { label: 'Overview', path: '/patient', icon: LayoutDashboard },
        { label: 'My Journey', path: '/patient/patient-journey', icon: Activity, badge: 'Stage 02' },
        { label: 'Consultations', path: '/patient/patient-consultations', icon: Calendar },
        { label: 'Messages', path: '/patient/patient-messages', icon: MessageSquare, badge: '1 New' },
        { label: 'Resources', path: '/patient/patient-resources', icon: BookOpen },
      ],
    },
    {
      groupName: 'Account & Billing',
      items: [
        { label: 'Payments', path: '/patient/patient-payment', icon: CreditCard },
        { label: 'Notifications', path: '/patient/patient-notifications', icon: Bell, badge: unreadCount ? String(unreadCount) : undefined },
        { label: 'Settings', path: '/patient/patient-settings', icon: Settings },
      ],
    },
  ];

  const familyGroups: SidebarGroup[] = [
    {
      groupName: 'Loved One Care',
      items: [
        { label: 'Family Overview', path: '/family', icon: LayoutDashboard },
        { label: 'My Patient / Loved One', path: '/family/family-loved-one', icon: HeartHandshake, badge: 'In Treatment' },
        { label: 'Consultations', path: '/family/family-consultations', icon: Calendar },
        { label: 'Messages with Doctor', path: '/family/family-messages', icon: MessageSquare, badge: '2 New' },
        { label: 'Family Resources', path: '/family/family-resources', icon: BookOpen },
      ],
    },
    {
      groupName: 'Account',
      items: [
        { label: 'Payments', path: '/family/family-payments', icon: CreditCard },
        { label: 'Notifications', path: '/family', icon: Bell, badge: unreadCount ? String(unreadCount) : undefined },
        { label: 'Family Settings', path: '/family', icon: Settings },
      ],
    },
  ];

  const coordinatorGroups: SidebarGroup[] = [
    {
      groupName: 'Clinical Workspace',
      items: [
        { label: 'Overview', path: '/coordinator', icon: LayoutDashboard },
        { label: 'Patients Directory', path: '/coordinator/coordinator-patients', icon: Users, badge: '4 Active' },
        { label: 'Consultations', path: '/coordinator/coordinator-consultations', icon: Calendar, badge: '2 Today' },
        { label: 'Messages', path: '/coordinator/coordinator-messages', icon: MessageSquare, badge: '3 Unread' },
        { label: 'Follow-Ups', path: '/coordinator/coordinator-followups', icon: ClipboardList, badge: '3 Due' },
      ],
    },
    {
      groupName: 'Doctor Suite',
      items: [
        { label: 'Clinical Protocols', path: '/coordinator/coordinator-resources', icon: BookOpen },
        { label: 'Notifications', path: '/coordinator/coordinator-notifications', icon: Bell, badge: unreadCount ? String(unreadCount) : undefined },
        { label: 'Settings & License', path: '/coordinator/coordinator-settings', icon: Settings },
      ],
    },
  ];

  const adminGroups: SidebarGroup[] = [
    {
      groupName: 'Executive Control',
      items: [
        { label: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
        { label: 'User Directory', path: '/admin/admin-users', icon: Users },
        { label: 'Coordinator Verification', path: '/admin/admin-verification', icon: ShieldCheck, badge: '2 Pending' },
        { label: 'Platform Reports', path: '/admin/admin-reports', icon: PieChart },
        { label: 'Platform Settings', path: '/admin/admin-settings', icon: Sliders },
      ],
    },
  ];

  const navGroups =
    role === 'admin'
      ? adminGroups
      : role === 'coordinator'
      ? coordinatorGroups
      : role === 'family' || currentUser?.onboardingTarget === 'family'
      ? familyGroups
      : patientGroups;

  const roleBadgeText =
    role === 'admin'
      ? 'Platform Admin'
      : role === 'coordinator'
      ? 'Care Coordinator / Doctor'
      : role === 'family' || currentUser?.onboardingTarget === 'family'
      ? 'Family Member'
      : 'Patient';

  return (
    // ROOT SHELL — locked to the viewport height. Nothing here scrolls except <main>,
    // which is what keeps the sidebar from ever "running out" mid-scroll.
    <div className="h-screen w-full overflow-hidden flex flex-col bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--gold)] selection:text-black font-sans">
      {/* TOPBAR */}
      <header
        style={{ height: TOPBAR_HEIGHT }}
        className="shrink-0 w-full bg-[var(--background-secondary)] border-b border-[var(--border)] px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 sm:gap-4 z-40"
      >
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[var(--foreground)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2.5 group focus:outline-none text-left"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)] shadow-xs group-hover:border-[var(--gold)] transition-colors shrink-0">
              <span className="font-cinzel font-bold text-xs sm:text-sm">RN</span>
            </div>
            <div className="hidden xs:block sm:block">
              <span className="font-cinzel font-bold text-sm sm:text-base tracking-wider text-[var(--foreground)]">
                REHAB <span className="text-[var(--gold)]">NIGERIA</span>
              </span>
              <span className="text-[9px] tracking-widest uppercase text-[var(--foreground-subtle)] block hidden md:block">
                Clinical Telehealth Portal
              </span>
            </div>
          </button>

          <span className="hidden md:inline-block text-[var(--border)] font-light">|</span>
        </div>

        <div className="flex-1 max-w-md mx-2 hidden md:block">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search records, appointments, resources..."
              className="w-full pl-10 pr-4 py-1.5 sm:py-2 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors flex items-center justify-center min-w-[38px] min-h-[38px]"
            aria-label="Toggle search"
          >
            <Search className="w-4 h-4" />
          </button>

          <div className="relative" ref={notifRef}>
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors min-w-[38px] min-h-[38px] flex items-center justify-center"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--gold)] text-black text-[10px] font-bold flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-80 max-w-[calc(100vw-1.5rem)] bg-[var(--background-secondary)] rounded-2xl shadow-2xl border border-[var(--border)] p-3 z-50"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-[var(--border)]">
                    <span className="font-cinzel font-bold text-xs text-[var(--foreground)] tracking-wider">NOTIFICATIONS</span>
                    <span className="text-[11px] text-[var(--gold)] font-semibold">{unreadCount} unread</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="py-4 text-center text-xs text-[var(--foreground-muted)]">
                        No notifications yet.
                      </div>
                    ) : (
                      notifications.map((n) => (
                        <div
                          key={n.id}
                          onClick={() => {
                            markNotificationRead(n.id);
                            if (n.actionUrl) router.push(n.actionUrl);
                            setNotifOpen(false);
                          }}
                          className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors border ${
                            !n.read
                              ? 'bg-[var(--background-tertiary)] border-[var(--border-subtle)] text-[var(--foreground)]'
                              : 'bg-transparent border-transparent hover:bg-[var(--background-tertiary)] text-[var(--foreground-muted)]'
                          }`}
                        >
                          <div className="font-semibold text-[var(--foreground)] flex items-center justify-between">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-[var(--foreground-subtle)] font-normal">{n.timestamp}</span>
                          </div>
                          <p className="text-[var(--foreground-muted)] mt-1 leading-snug">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="pt-2 border-t border-[var(--border)] text-center">
                    <button
                      onClick={() => {
                        router.push(role === 'patient' ? '/patient/notifications' : role === 'admin' ? '/admin/notifications' : '/coordinator/dashboard');
                        setNotifOpen(false);
                      }}
                      className="text-xs font-semibold text-[var(--gold)] hover:underline"
                    >
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-1.5 p-1 rounded-full hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors min-h-[38px]"
              aria-label="User profile menu"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover ring-1 ring-[var(--gold)]/30"
              />
              <ChevronDown className="w-3 h-3 text-[var(--foreground-muted)] hidden sm:block mr-1" />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-56 max-w-[calc(100vw-2rem)] bg-[var(--background-secondary)] rounded-2xl shadow-2xl border border-[var(--border)] p-2 z-50 space-y-1"
                >
                  <div className="px-3 py-2 border-b border-[var(--border)]">
                    <p className="font-semibold text-xs text-[var(--foreground)] truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-[var(--foreground-subtle)] truncate">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      const settingsPath = role === 'patient' ? '/patient/settings' : role === 'coordinator' ? '/coordinator/settings' : '/admin/settings';
                      router.push(settingsPath as RoutePath);
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[var(--foreground)] hover:bg-[var(--background-tertiary)] flex items-center gap-2 transition-colors"
                  >
                    <Settings className="w-3.5 h-3.5 text-[var(--gold)]" />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      router.push('/login');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </header>

      {/* Mobile search banner */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden shrink-0 bg-[var(--background-secondary)] border-b border-[var(--border)] px-4 py-2.5 z-30 overflow-hidden"
          >
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-[var(--foreground-subtle)] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                autoFocus
                placeholder="Search records, consults..."
                className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-[var(--background-tertiary)] border border-[var(--border)] text-[var(--foreground)] placeholder-[var(--foreground-subtle)] focus:border-[var(--gold)] focus:outline-none"
              />
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="absolute right-2 p-1 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BODY ROW — this is the only region that owns layout below the topbar.
          It never scrolls itself (overflow-hidden + min-h-0), so the aside
          simply stretches to fill it via flex, with no sticky/vh math involved. */}
      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* DESKTOP SIDEBAR — a true <aside>, docked in-flow, full height of the body row.
            Same background token as the topbar so the corner where they meet blends
            seamlessly instead of showing a seam. */}
        <motion.aside
          animate={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          className="hidden lg:flex flex-col justify-between h-full shrink-0 bg-[var(--background-secondary)] border-r border-[var(--border)] relative overflow-hidden"
        >
          {/* faint gold hairline at the top edge — the one refined signature touch */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

          <div className="px-3 pt-4 pb-2 border-b border-[var(--border-subtle)]">
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} w-full`}>
              {!collapsed && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-subtle)] font-cinzel pl-2">
                  Navigation
                </span>
              )}
              <button
                onClick={toggleCollapsed}
                className={`p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-all flex items-center justify-center ${
                  collapsed ? 'w-10 h-10 shadow-xs' : 'w-8 h-8'
                }`}
                title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                {collapsed ? (
                  <ChevronRight className="w-4 h-4 text-[var(--gold)]" />
                ) : (
                  <ChevronLeft className="w-4 h-4 text-[var(--gold)]" />
                )}
              </button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-5 no-scrollbar">
            {navGroups.map((grp, idx) => (
              <div key={idx} className="space-y-1">
                {!collapsed && grp.groupName && (
                  <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-subtle)] font-cinzel">
                    {grp.groupName}
                  </h3>
                )}
                {grp.items.map((item) => {
                  const isActive = currentPath === item.path;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => router.push(item.path)}
                      title={collapsed ? item.label : undefined}
                      className={`w-full flex items-center ${collapsed ? 'justify-center px-2' : 'justify-between px-3'} py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-[var(--gold)] text-black font-bold shadow-md shadow-[var(--gold)]/20'
                          : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)] border border-transparent hover:border-[var(--border-subtle)]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-black' : 'text-[var(--foreground-subtle)]'}`} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </div>
                      {!collapsed && item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive
                              ? 'bg-black/20 text-black'
                              : 'bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)]'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>

          {(role === 'patient' || role === 'family') && !collapsed && (
            <div className="px-3 pb-3">
              <div className="p-3 rounded-2xl bg-[var(--background-tertiary)] text-[var(--foreground)] space-y-2 border border-[var(--border)] shadow-md">
                <div className="flex items-center justify-between text-[11px] font-semibold text-[var(--gold)]">
                  <span>Care Status</span>
                  <span className="w-2 h-2 rounded-full bg-[var(--green)] animate-ping"></span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-[var(--foreground-muted)]">
                    <span>Intake:</span>
                    <span className="font-bold text-[var(--foreground)]">
                      {currentUser.assessmentStatus === 'completed' ? '● Completed' : '● In Progress'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[var(--foreground-muted)]">
                    <span>Consultation:</span>
                    <span className="font-bold text-[var(--green)]">
                      {currentUser.hasActiveConsultation ? '● Booked' : '● Available'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/patient/assessment')}
                  className="w-full mt-1.5 py-1.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3 text-black" />
                </button>
              </div>
            </div>
          )}
        </motion.aside>

        {/* MOBILE DRAWER (fixed overlay — this one is genuinely meant to float, so it keeps position: fixed) */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] z-50 bg-[var(--background-secondary)] shadow-2xl p-4 flex flex-col justify-between overflow-y-auto border-r border-[var(--border)]"
              >
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[var(--border)]">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)] font-cinzel font-bold text-sm">
                        RN
                      </div>
                      <div>
                        <span className="font-cinzel font-bold text-base text-[var(--foreground)] block">
                          REHAB <span className="text-[var(--gold)]">NIGERIA</span>
                        </span>
                        <span className="text-[9px] text-[var(--gold)] font-semibold block">{roleBadgeText}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setMobileDrawerOpen(false)}
                      className="p-2 rounded-xl text-[var(--foreground-subtle)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                      aria-label="Close navigation"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {navGroups.map((grp, idx) => (
                    <div key={idx} className="space-y-1">
                      {grp.groupName && (
                        <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-subtle)] font-cinzel">
                          {grp.groupName}
                        </h3>
                      )}
                      {grp.items.map((item) => {
                        const isActive = currentPath === item.path;
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.path}
                            onClick={() => {
                              router.push(item.path);
                              setMobileDrawerOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[44px] ${
                              isActive
                                ? 'bg-[var(--gold)] text-black font-bold shadow-md shadow-[var(--gold)]/20'
                                : 'text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className={`w-4 h-4 ${isActive ? 'text-black' : 'text-[var(--foreground-subtle)]'}`} />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] font-bold">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--border)] space-y-2">
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[var(--foreground)] truncate">{currentUser.name}</p>
                      <p className="text-[10px] text-[var(--foreground-subtle)] truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      logout();
                      router.push('/login');
                      setMobileDrawerOpen(false);
                    }}
                    className="w-full py-2.5 rounded-xl bg-rose-950/30 text-rose-400 border border-rose-900/30 text-xs font-semibold flex items-center justify-center gap-2 min-h-[44px]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN CONTENT — the only scrollable region in the whole shell */}
        <main className="flex-1 min-w-0 overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
              <div className="space-y-1 min-w-0">
                {breadcrumbs.length > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)] mb-1 flex-wrap">
                    {breadcrumbs.map((b, i) => (
                      <React.Fragment key={i}>
                        {i > 0 && <span>/</span>}
                        {b.path ? (
                          <button onClick={() => router.push(b.path!)} className="hover:text-[var(--gold)] transition-colors">
                            {b.label}
                          </button>
                        ) : (
                          <span className="text-[var(--foreground-muted)] font-medium">{b.label}</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                )}
                <h1 className="font-cinzel font-bold text-xl sm:text-2xl lg:text-3xl text-[var(--foreground)] tracking-tight truncate">
                  {title}
                </h1>
                {description && (
                  <p className="text-xs sm:text-sm text-[var(--foreground-muted)] max-w-2xl leading-relaxed">
                    {description}
                  </p>
                )}
              </div>

              {role === 'patient' && (
                <button
                  onClick={() => router.push('/patient/consultations/book')}
                  className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap min-h-[40px]"
                >
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>Book Consultation</span>
                </button>
              )}

              {role === 'coordinator' && (
                <button
                  onClick={() => router.push('/coordinator/consultation-live')}
                  className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap min-h-[40px]"
                >
                  <Stethoscope className="w-4 h-4 text-black" />
                  <span>Start Next Session</span>
                </button>
              )}

              {role === 'admin' && (
                <button
                  onClick={() => router.push('/admin/rehab-centres')}
                  className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap min-h-[40px]"
                >
                  <UserCheck className="w-4 h-4 text-black" />
                  <span>Verify Centre</span>
                </button>
              )}
            </div>

            <div>{children}</div>
          </div>
        </main>
      </div>
    </div>
  );
};