import React, { useState } from 'react';
import {
  HeartHandshake,
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
  ShieldCheck,
  Search,
  Users,
  UserCheck,
  FileText,
  Activity,
  Layers,
  BookOpen,
  PieChart,
  Sliders,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  Stethoscope,
  ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoutePath } from '@/lib/types';
import { useRouter as useNextRouter, usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from '../ui/ThemeToggle';
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
  const  router = useRouter();
  const currentPath = usePathname();
  const { currentUser, role, switchRole, logout, notifications, markNotificationRead } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  // Role-specific Sidebar configuration
  const patientGroups: SidebarGroup[] = [
    {
      groupName: 'Care Navigation',
      items: [
        { label: 'Dashboard', path: '/patient/dashboard', icon: LayoutDashboard },
        { label: 'Rehab Assessment', path: '/patient/assessment', icon: ClipboardList, badge: currentUser.assessmentStatus === 'completed' ? 'Done' : 'Action' },
        { label: 'Book Consultation', path: '/patient/consultations/book', icon: Sparkles },
        { label: 'Appointments', path: '/patient/appointment-confirmation', icon: Calendar },
      ],
    },
    {
      groupName: 'Account & Records',
      items: [
        { label: 'Payments & History', path: '/patient/history', icon: CreditCard },
        { label: 'Notifications', path: '/patient/notifications', icon: Bell, badge: unreadCount ? String(unreadCount) : undefined },
        { label: 'Profile & Settings', path: '/patient/settings', icon: Settings },
      ],
    },
  ];

  const coordinatorGroups: SidebarGroup[] = [
    {
      groupName: 'Clinical Overview',
      items: [
        { label: 'Coordinator Dashboard', path: '/coordinator/dashboard', icon: LayoutDashboard },
        { label: 'Assigned Patients', path: '/coordinator/patients', icon: Users, badge: '3 Active' },
        { label: 'Patient Assessments', path: '/coordinator/assessments', icon: ClipboardList, badge: '5 Pending' },
      ],
    },
    {
      groupName: 'Referrals & Care',
      items: [
        { label: 'Outbound Referrals', path: '/coordinator/referrals', icon: Activity, badge: '12 Sent' },
        { label: 'Consultations Roster', path: '/coordinator/consultations', icon: Calendar },
        { label: 'Live Telehealth Call', path: '/coordinator/consultation-live', icon: Stethoscope },
      ],
    },
  ];

  const adminGroups: SidebarGroup[] = [
    {
      groupName: 'Executive Control',
      items: [
        { label: 'Executive Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
        { label: 'Analytics & Reports', path: '/admin/reports', icon: PieChart },
      ],
    },
    {
      groupName: 'Management & Network',
      items: [
        { label: 'User Directory', path: '/admin/users', icon: Users },
        { label: 'Rehab Facilities', path: '/admin/rehab-centres', icon: UserCheck, badge: '72 Verified' },
        { label: 'Global Referral Logs', path: '/admin/referrals', icon: Activity },
        { label: 'Commission Ledger', path: '/admin/commissions', icon: CreditCard, badge: 'Payouts' },
      ],
    },
    {
      groupName: 'CMS & Security',
      items: [
        { label: 'Website CMS', path: '/admin/cms', icon: Layers },
        { label: 'System Settings', path: '/admin/settings', icon: Sliders },
      ],
    },
  ];

  const navGroups = role === 'admin' ? adminGroups : role === 'coordinator' ? coordinatorGroups : patientGroups;

  const roleBadgeText = role === 'admin' ? 'Enterprise Admin' : role === 'coordinator' ? 'Licensed Care Lead' : 'Patient Account';

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col selection:bg-teal-500 selection:text-white transition-colors">
      {/* TOP HEADER BAR */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button & Logo & Breadcrumbs */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileDrawerOpen(true)}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={() => router.push('/')}
            className="flex items-center gap-2 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-600 to-emerald-400 flex items-center justify-center text-white shadow-xs">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <span className="font-heading font-extrabold text-lg text-slate-900 dark:text-white hidden sm:inline">
              Rehab<span className="text-teal-600 dark:text-teal-400">Connect</span>
            </span>
          </button>

          <span className="hidden sm:inline-block text-slate-300 dark:text-slate-700 font-light">|</span>

          {/* Role badge */}
          <span className="px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/70 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-[11px] font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
            {roleBadgeText}
          </span>
        </div>

        {/* Center / Search bar on larger screens */}
        <div className="hidden md:flex items-center relative w-64 lg:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3" />
          <input
            type="text"
            placeholder="Search records, appointments..."
            className="w-full pl-9 pr-4 py-1.5 rounded-full text-xs bg-slate-100 dark:bg-slate-800/80 border border-transparent focus:border-teal-500 dark:focus:border-teal-400 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all"
          />
        </div>

        {/* Right Controls: Role Switcher, Notifications, Theme, User Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Demo Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 dark:text-amber-400 text-xs font-semibold hover:bg-amber-500/20 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span className="hidden sm:inline">Demo Role:</span>
              <span className="capitalize font-bold">{role}</span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <AnimatePresence>
              {roleSwitcherOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 text-xs space-y-1"
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Switch Prototype View
                  </div>
                  <button
                    onClick={() => {
                      switchRole('patient', 'myself');
                      router.push('/patient/dashboard');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                      role === 'patient' && currentUser.onboardingTarget === 'myself'
                        ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Patient (For Myself)</span>
                    {role === 'patient' && currentUser.onboardingTarget === 'myself' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('patient', 'family');
                      router.push('/patient/dashboard');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                      role === 'patient' && currentUser.onboardingTarget === 'family'
                        ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Patient (For Family)</span>
                    {role === 'patient' && currentUser.onboardingTarget === 'family' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('coordinator');
                      router.push('/coordinator/dashboard');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                      role === 'coordinator'
                        ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Care Coordinator</span>
                    {role === 'coordinator' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />}
                  </button>

                  <button
                    onClick={() => {
                      switchRole('admin');
                      router.push('/admin/dashboard');
                      setRoleSwitcherOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between ${
                      role === 'admin'
                        ? 'bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 font-semibold'
                        : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span>Platform Admin</span>
                    {role === 'admin' && <CheckCircle2 className="w-3.5 h-3.5 text-teal-500" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-teal-500 text-white text-[10px] font-bold flex items-center justify-center">
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
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-3 z-50"
                >
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-heading font-bold text-sm">Notifications</span>
                    <span className="text-xs text-teal-600 dark:text-teal-400 font-semibold">{unreadCount} unread</span>
                  </div>

                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => {
                          if (n.id) {
                            markNotificationRead(n.id);
                          }
                          if (n.actionUrl) {
                            router.push(n.actionUrl);
                          }
                          setNotifOpen(false);
                        }}
                        className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                          !n.read ? 'bg-teal-50/60 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                      >
                        <div className="font-semibold text-slate-900 dark:text-white flex items-center justify-between">
                          <span>{n.title}</span>
                          <span className="text-[10px] text-slate-400 font-normal">{n.timestamp}</span>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-1 leading-snug">{n.message}</p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-center">
                    <button
                      onClick={() => {
                        router.push(role === 'patient' ? '/patient/notifications' : role === 'admin' ? '/admin/notifications' : '/coordinator/dashboard');
                        setNotifOpen(false);
                      }}
                      className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
                    >
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700"
              />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-2 z-50 space-y-1"
                >
                  <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                    <p className="font-semibold text-xs text-slate-900 dark:text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{currentUser.email}</p>
                  </div>

                  <button
                    onClick={() => {
                      const settingsPath: RoutePath = role === 'patient' ? '/patient/settings' : role === 'coordinator' ? '/coordinator/profile' : '/admin/settings';
                      router.push(settingsPath);
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Account Settings</span>
                  </button>

                  <button
                    onClick={() => {
                      logout();
                      router.push('/login');
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center gap-2"
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

      {/* BODY LAYOUT: SIDEBAR + MAIN CONTENT */}
      <div className="flex-1 flex overflow-hidden">
        {/* DESKTOP SIDEBAR */}
        <motion.aside
          animate={{ width: collapsed ? 80 : 260 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="hidden lg:flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200/80 dark:border-slate-800 sticky top-14 h-[calc(100vh-3.5rem)] py-4 z-30"
        >
          {/* Nav Groups */}
          <div className="flex-1 overflow-y-auto px-3 space-y-6">
            {navGroups.map((grp, idx) => (
              <div key={idx} className="space-y-1">
                {!collapsed && grp.groupName && (
                  <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
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
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                        isActive
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}`} />
                        {!collapsed && <span className="truncate">{item.label}</span>}
                      </div>
                      {!collapsed && item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300'
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

          {/* Bottom Card for Patient Role */}
          {role === 'patient' && !collapsed && (
            <div className="px-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-gradient-to-br from-teal-900 via-slate-900 to-slate-950 text-white space-y-2 border border-teal-700/50 shadow-md">
                <div className="flex items-center justify-between text-[11px] font-semibold text-teal-300">
                  <span>Recovery Journey</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Assessment:</span>
                    <span className="font-bold text-white">
                      {currentUser.assessmentStatus === 'completed' ? '● Completed' : '● Action Needed'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Consultation:</span>
                    <span className="font-bold text-emerald-400">
                      {currentUser.hasActiveConsultation ? '● Booked' : '● Scheduled Soon'}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => router.push('/patient/assessment')}
                  className="w-full mt-2 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-[11px] flex items-center justify-center gap-1 transition-colors"
                >
                  <span>View Status</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Collapse Toggle Button */}
          <div className="px-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
              {!collapsed && <span>Collapse Sidebar</span>}
            </button>
          </div>
        </motion.aside>

        {/* MOBILE DRAWER OVERLAY */}
        <AnimatePresence>
          {mobileDrawerOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileDrawerOpen(false)}
                className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs lg:hidden"
              />
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 bottom-0 left-0 w-72 z-50 bg-white dark:bg-slate-900 shadow-2xl p-4 flex flex-col justify-between overflow-y-auto"
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center text-white">
                        <HeartHandshake className="w-4 h-4" />
                      </div>
                      <span className="font-heading font-extrabold text-base text-slate-900 dark:text-white">
                        Rehab<span className="text-teal-600">Connect</span>
                      </span>
                    </div>
                    <button onClick={() => setMobileDrawerOpen(false)} className="p-2 text-slate-400 hover:text-slate-600">
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {navGroups.map((grp, idx) => (
                    <div key={idx} className="space-y-1">
                      {grp.groupName && (
                        <h3 className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
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
                            className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all ${
                              isActive
                                ? 'bg-teal-600 text-white'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Icon className="w-4 h-4" />
                              <span>{item.label}</span>
                            </div>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    onClick={() => {
                      logout();
                      router.push('/login');
                      setMobileDrawerOpen(false);
                    }}
                    className="w-full py-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center justify-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* MAIN CONTENT CANVAS */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200/60 dark:border-slate-800">
            <div className="space-y-1">
              {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mb-1">
                  {breadcrumbs.map((b, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span>/</span>}
                      {b.path ? (
                        <button onClick={() => router.push(b.path!)} className="hover:text-teal-500">
                          {b.label}
                        </button>
                      ) : (
                        <span className="text-slate-600 dark:text-slate-300 font-medium">{b.label}</span>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              )}
              <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white tracking-tight">
                {title}
              </h1>
              {description && (
                <p className="text-sm text-slate-600 dark:text-slate-400 max-w-2xl">
                  {description}
                </p>
              )}
            </div>

            {/* Quick action button depending on role */}
            {role === 'patient' && (
              <button
                onClick={() => router.push('/patient/consultations/book')}
                className="self-start sm:self-auto px-4 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md shadow-teal-600/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <Sparkles className="w-4 h-4" />
                <span>Book Consultation</span>
              </button>
            )}

            {role === 'coordinator' && (
              <button
                onClick={() => router.push('/coordinator/consultation-live')}
                className="self-start sm:self-auto px-4 py-2.5 rounded-full bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold shadow-md shadow-teal-600/20 flex items-center gap-2 transition-transform active:scale-95"
              >
                <Stethoscope className="w-4 h-4" />
                <span>Start Next Session</span>
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
