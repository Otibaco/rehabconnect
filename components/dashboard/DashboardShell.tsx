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
  PanelLeftClose,
  PanelLeftOpen,
  Menu,
  X,
  Search,
  Users,
  UserCheck,
  Layers,
  BookOpen,
  PieChart,
  Sliders,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  ChevronDown,
  Shield,
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

export const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  title,
  description,
  breadcrumbs = [],
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;
  const { currentUser, role, switchRole, logout, notifications, markNotificationRead } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const roleSwitcherRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setNotifOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (roleSwitcherRef.current && !roleSwitcherRef.current.contains(event.target as Node)) {
        setRoleSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Role-specific Sidebar configuration
  const patientGroups: SidebarGroup[] = [
    {
      groupName: 'My Care',
      items: [
        { label: 'Overview', path: '/dashboard', icon: LayoutDashboard },
        { label: 'My Journey', path: '/dashboard/journey', icon: Activity, badge: 'Stage 02' },
        { label: 'Consultations', path: '/dashboard/consultations', icon: Calendar },
        { label: 'Messages', path: '/dashboard/messages', icon: MessageSquare, badge: '1 New' },
        { label: 'Resources', path: '/dashboard/resources', icon: BookOpen },
      ],
    },
    {
      groupName: 'Account & Billing',
      items: [
        { label: 'Payments', path: '/dashboard/payments', icon: CreditCard },
        { label: 'Notifications', path: '/dashboard/notifications', icon: Bell, badge: unreadCount ? String(unreadCount) : undefined },
        { label: 'Settings', path: '/dashboard/settings', icon: Settings },
      ],
    },
  ];

  const familyGroups: SidebarGroup[] = [
    {
      groupName: 'Loved One Care',
      items: [
        { label: 'Family Overview', path: '/dashboard/family', icon: LayoutDashboard },
        { label: 'My Patient / Loved One', path: '/dashboard/family/patient', icon: HeartHandshake, badge: 'In Treatment' },
        { label: 'Consultations', path: '/dashboard/family/consultations', icon: Calendar },
        { label: 'Messages with Doctor', path: '/dashboard/family/messages', icon: MessageSquare, badge: '2 New' },
        { label: 'Family Resources', path: '/dashboard/family/resources', icon: BookOpen },
      ],
    },
    {
      groupName: 'Account',
      items: [
        { label: 'Payments', path: '/dashboard/family/payments', icon: CreditCard },
        { label: 'Notifications', path: '/dashboard/family/notifications', icon: Bell, badge: unreadCount ? String(unreadCount) : undefined },
        { label: 'Family Settings', path: '/dashboard/family/settings', icon: Settings },
      ],
    },
  ];

  const coordinatorGroups: SidebarGroup[] = [
    {
      groupName: 'Clinical Workspace',
      items: [
        { label: 'Overview', path: '/dashboard/coordinator', icon: LayoutDashboard },
        { label: 'Patients Directory', path: '/dashboard/coordinator/patients', icon: Users, badge: '4 Active' },
        { label: 'Consultations', path: '/dashboard/coordinator/consultations', icon: Calendar, badge: '2 Today' },
        { label: 'Messages', path: '/dashboard/coordinator/messages', icon: MessageSquare, badge: '3 Unread' },
        { label: 'Follow-Ups', path: '/dashboard/coordinator/follow-ups', icon: ClipboardList, badge: '3 Due' },
      ],
    },
    {
      groupName: 'Doctor Suite',
      items: [
        { label: 'Clinical Protocols', path: '/dashboard/coordinator/resources', icon: BookOpen },
        { label: 'Notifications', path: '/dashboard/coordinator/notifications', icon: Bell, badge: unreadCount ? String(unreadCount) : undefined },
        { label: 'Settings & License', path: '/dashboard/coordinator/settings', icon: Settings },
      ],
    },
  ];

  const adminGroups: SidebarGroup[] = [
    {
      groupName: 'Executive Control',
      items: [
        { label: 'Admin Overview', path: '/admin', icon: LayoutDashboard },
        { label: 'User Directory', path: '/admin/users', icon: Users },
        { label: 'Coordinator Verification', path: '/admin/verification', icon: ShieldCheck, badge: '2 Pending' },
        { label: 'Platform Reports', path: '/admin/reports', icon: PieChart },
        { label: 'Platform Settings', path: '/admin/settings', icon: Sliders },
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] flex flex-col selection:bg-[var(--gold)] selection:text-black transition-colors font-sans">
      {/* 1. TOPBAR - FULL WIDTH ACROSS THE TOP (RESPONSIVE MOBILE-FIRST) */}
      <header className="sticky top-0 z-40 w-full h-16 bg-[var(--background-secondary)]/95 backdrop-blur-md border-b border-[var(--border)] px-3 sm:px-5 lg:px-6 flex items-center justify-between gap-2 sm:gap-4 transition-colors">
        {/* Left Side: Mobile Menu Button, Desktop Sidebar Toggle, Brand Logo & Role Badge */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Mobile Drawer Trigger (Mobile-first < lg) */}
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl text-[var(--foreground)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors flex items-center justify-center min-w-[40px] min-h-[40px]"
            aria-label="Open mobile navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Sidebar Collapse / Expand Icon Button on Topbar for direct high-accessibility toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors items-center justify-center min-w-[38px] min-h-[38px]"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-[var(--gold)]" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-[var(--gold)]" />
            )}
          </button>

          {/* Brand Logo */}
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

          {/* Role badge */}
          <span className="hidden sm:inline-flex px-2.5 sm:px-3 py-1 rounded-full bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] text-[10px] sm:text-[11px] font-semibold items-center gap-1.5 shadow-xs whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--gold)] animate-pulse"></span>
            {roleBadgeText}
          </span>
        </div>

        {/* Center / Search bar (Responsive: Inline on tablet/desktop, popup trigger on mobile) */}
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

        {/* Right Controls: Mobile Search Toggle, Role Switcher, Notifications, Theme, User Avatar */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Mobile Search Button (< md) */}
          <button
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-colors flex items-center justify-center min-w-[38px] min-h-[38px]"
            aria-label="Toggle search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Demo Role Switcher Dropdown */}
          <div className="relative" ref={roleSwitcherRef}>
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="px-2.5 sm:px-3 py-1.5 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/30 text-[var(--gold)] text-xs font-semibold hover:bg-[var(--gold)]/20 transition-colors flex items-center gap-1 sm:gap-1.5 shadow-xs min-h-[36px]"
              aria-label="Switch User Role"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] shrink-0" />
              <span className="hidden sm:inline text-[11px]">Role:</span>
              <span className="capitalize font-bold text-xs max-w-[70px] sm:max-w-none truncate">{role}</span>
              <ChevronDown className="w-3 h-3 text-[var(--gold)] shrink-0" />
            </button>

            <AnimatePresence>
              {roleSwitcherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-64 max-w-[calc(100vw-2rem)] bg-[var(--background-secondary)] rounded-2xl shadow-2xl border border-[var(--border)] p-2 z-50 text-xs space-y-1"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--gold)]">
                    Switch Prototype Role
                  </div>
                  <button
                    onClick={() => {
                      switchRole('patient', 'myself');
                      router.push('/dashboard');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      role === 'patient' && currentUser.onboardingTarget === 'myself'
                        ? 'bg-[var(--gold)]/15 text-[var(--gold)] font-bold border border-[var(--gold)]/30'
                        : 'text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[var(--gold)]" /> Patient (Personal)
                    </span>
                    {role === 'patient' && currentUser.onboardingTarget === 'myself' && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold)]" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('family', 'family');
                      router.push('/dashboard/family');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      role === 'family' || (role === 'patient' && currentUser.onboardingTarget === 'family')
                        ? 'bg-[var(--green)]/15 text-[var(--green)] font-bold border border-[var(--green)]/30'
                        : 'text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Users className="w-3.5 h-3.5 text-[var(--green)]" /> Family (Caregiver)
                    </span>
                    {(role === 'family' || currentUser.onboardingTarget === 'family') && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--green)]" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('coordinator');
                      router.push('/dashboard/coordinator');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      role === 'coordinator'
                        ? 'bg-[#3B828E]/15 text-[#3B828E] font-bold border border-[#3B828E]/30'
                        : 'text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Stethoscope className="w-3.5 h-3.5 text-[#3B828E]" /> Care Coordinator / Doctor
                    </span>
                    {role === 'coordinator' && <CheckCircle2 className="w-3.5 h-3.5 text-[#3B828E]" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      router.push('/admin');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between transition-colors ${
                      role === 'admin'
                        ? 'bg-[var(--gold-light)]/15 text-[var(--gold-light)] font-bold border border-[var(--gold-light)]/30'
                        : 'text-[var(--foreground)] hover:bg-[var(--background-tertiary)]'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Shield className="w-3.5 h-3.5 text-[var(--gold-light)]" /> Platform Admin
                    </span>
                    {role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--gold-light)]" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Dropdown */}
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

          {/* Theme Toggle */}
          {/* <div className="shrink-0">
            <ThemeToggle />
          </div> */}

          {/* User Profile Dropdown */}
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
                      const settingsPath: RoutePath = role === 'patient' ? '/patient/settings' : role === 'coordinator' ? '/coordinator/settings' : '/admin/settings';
                      router.push(settingsPath);
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

      {/* Mobile Search Input Banner (Expands smoothly when tapped on mobile) */}
      <AnimatePresence>
        {mobileSearchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-[var(--background-secondary)] border-b border-[var(--border)] px-4 py-2.5 z-30 overflow-hidden"
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

      {/* 2. BODY LAYOUT: SIDEBAR (STARTS DIRECTLY UNDER TOPBAR) + MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* DESKTOP SIDEBAR - STARTS FLUSH UNDER TOPBAR WITH TOP POSITIONED COLLAPSE ICON */}
        <motion.aside
          animate={{ width: collapsed ? 76 : 260 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="hidden lg:flex flex-col justify-between bg-[var(--background-secondary)] border-r border-[var(--border)] sticky top-16 h-[calc(100vh-4rem)] z-30 shrink-0 transition-colors"
        >
          {/* Top of Sidebar: Header with Collapse/Expand Toggle Icon */}
          <div className="px-3 pt-3 pb-2 border-b border-[var(--border-subtle)]">
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-between'} w-full`}>
              {!collapsed && (
                <div className="flex items-center gap-2 pl-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--foreground-subtle)] font-cinzel">
                    Navigation
                  </span>
                </div>
              )}

              {/* Collapse / Expand Icon Button at the TOP of the sidebar */}
              <button
                onClick={() => setCollapsed(!collapsed)}
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

          {/* Nav Groups list */}
          <div className="flex-1 overflow-y-auto px-3 py-3 space-y-5 no-scrollbar">
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
          </div>

          {/* Bottom Card for Patient / Family Role */}
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

        {/* MOBILE DRAWER OVERLAY (< lg) */}
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

        {/* 3. MAIN CONTENT CANVAS */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 bg-[var(--background)] min-w-0">
          {/* Header Banner */}
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

            {/* Quick action button depending on role */}
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

          {/* Children Content */}
          <div>{children}</div>
        </main>
      </div>
    </div>
  );
};
