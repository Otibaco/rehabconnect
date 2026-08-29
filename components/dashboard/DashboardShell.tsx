"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  CreditCard,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Users,
  UserCheck,
  BookOpen,
  PieChart,
  Sliders,
  Sparkles,
  Stethoscope,
  ChevronDown,
  MessageSquare,
  Activity,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RoutePath } from "@/types/type";
import { useRouter, usePathname } from "next/navigation";

// ── Types ──────────────────────────────────────────────────────────────────
// This is the whole surface you'll need to fill from session data later.
export type UserRole = "patient" | "family" | "coordinator" | "admin";

export interface ShellUser {
  name: string;
  email: string;
  avatar: string;
  assessmentStatus?: "completed" | "in_progress";
  hasActiveConsultation?: boolean;
}

export interface ShellNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: RoutePath;
}

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

  // ── Everything below is what used to come from AuthContext.
  // Pass real values once session/role-checking is wired up;
  // until then it quietly falls back to sane placeholders.
  role?: UserRole;
  user?: ShellUser;
  notifications?: ShellNotification[];
  onLogout?: () => void;
}

const SIDEBAR_EXPANDED = 264;
const SIDEBAR_COLLAPSED = 78;

const DEFAULT_USER: ShellUser = {
  name: "Guest User",
  email: "guest@rehabnigeria.com",
  avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RN",
  assessmentStatus: "in_progress",
  hasActiveConsultation: false,
};

export const DashboardShell: React.FC<DashboardShellProps> = ({
  children,
  title,
  description,
  breadcrumbs = [],
  role = "patient",
  user = DEFAULT_USER,
  notifications = [],
  onLogout,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentPath = pathname;

  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  // Local, UI-only copy so notification badges can update without needing
  // a real backend yet. Swap for context/query-driven state later.
  const [localNotifications, setLocalNotifications] = useState(notifications);
  useEffect(
    () => setLocalNotifications(notifications),
    [JSON.stringify(notifications)],
  );

  const userMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = localNotifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? window.localStorage.getItem("rn-sidebar-collapsed")
        : null;
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined")
        window.localStorage.setItem("rn-sidebar-collapsed", String(next));
      return next;
    });
  };

  // ── Nav config per role ──────────────────────────────────────────────────
  const patientGroups: SidebarGroup[] = [
    {
      groupName: "My Care",
      items: [
        { label: "Overview", path: "/patient", icon: LayoutDashboard },
        {
          label: "My Journey",
          path: "/patient/journey",
          icon: Activity,
          badge: "Stage 02",
        },
        {
          label: "Consultations",
          path: "/patient/consultations",
          icon: Calendar,
        },
      ],
    },
    {
      groupName: "Account & Billing",
      items: [
        { label: "Payments", path: "/patient/payment", icon: CreditCard },
        {
          label: "Notifications",
          path: "/patient/notifications",
          icon: Bell,
          badge: unreadCount ? String(unreadCount) : undefined,
        },
        // { label: 'Settings', path: '/patient/settings', icon: Settings },
      ],
    },
  ];

  const familyGroups: SidebarGroup[] = [
    {
      groupName: "Loved One Care",
      items: [
        { label: "Family Overview", path: "/family", icon: LayoutDashboard },
        {
          label: "My Patient / Loved One",
          path: "/family/family-loved-one",
          icon: HeartHandshake,
          badge: "In Treatment",
        },
        {
          label: "Consultations",
          path: "/family/family-consultations",
          icon: Calendar,
        },
        {
          label: "Messages with Doctor",
          path: "/family/family-messages",
          icon: MessageSquare,
          badge: "2 New",
        },
        {
          label: "Family Resources",
          path: "/family/family-resources",
          icon: BookOpen,
        },
      ],
    },
    {
      groupName: "Account",
      items: [
        {
          label: "Payments",
          path: "/family/family-payments",
          icon: CreditCard,
        },
        {
          label: "Notifications",
          path: "/family",
          icon: Bell,
          badge: unreadCount ? String(unreadCount) : undefined,
        },
        { label: "Family Settings", path: "/family", icon: Settings },
      ],
    },
  ];

  const coordinatorGroups: SidebarGroup[] = [
    {
      groupName: "Clinical Workspace",
      items: [
        { label: "Overview", path: "/coordinator", icon: LayoutDashboard },
        {
          label: "Patients Directory",
          path: "/coordinator/coordinator-patients",
          icon: Users,
          badge: "4 Active",
        },
        {
          label: "Consultations",
          path: "/coordinator/coordinator-consultations",
          icon: Calendar,
          badge: "2 Today",
        },
        {
          label: "Messages",
          path: "/coordinator/coordinator-messages",
          icon: MessageSquare,
          badge: "3 Unread",
        },
        {
          label: "Follow-Ups",
          path: "/coordinator/coordinator-followups",
          icon: ClipboardList,
          badge: "3 Due",
        },
      ],
    },
    {
      groupName: "Doctor Suite",
      items: [
        {
          label: "Clinical Protocols",
          path: "/coordinator/coordinator-resources",
          icon: BookOpen,
        },
        {
          label: "Notifications",
          path: "/coordinator/coordinator-notifications",
          icon: Bell,
          badge: unreadCount ? String(unreadCount) : undefined,
        },
        {
          label: "Settings & License",
          path: "/coordinator/coordinator-settings",
          icon: Settings,
        },
      ],
    },
  ];

  const adminGroups: SidebarGroup[] = [
    {
      groupName: "Executive Control",
      items: [
        { label: "Admin Overview", path: "/admin", icon: LayoutDashboard },
        { label: "User Directory", path: "/admin/admin-users", icon: Users },
        {
          label: "Coordinator Verification",
          path: "/admin/admin-verification",
          icon: ShieldCheck,
          badge: "2 Pending",
        },
        {
          label: "Platform Reports",
          path: "/admin/admin-reports",
          icon: PieChart,
        },
        {
          label: "Platform Settings",
          path: "/admin/admin-settings",
          icon: Sliders,
        },
      ],
    },
  ];

  // Single switch, driven entirely by the `role` prop.
  // When session/auth lands, just pass the resolved role in from a parent
  // layout (e.g. <DashboardShell role={session.user.role} ...>) — nothing
  // here needs to change.
  const navGroups: SidebarGroup[] =
    role === "admin"
      ? adminGroups
      : role === "coordinator"
        ? coordinatorGroups
        : role === "family"
          ? familyGroups
          : patientGroups;

  const roleBadgeText: string =
    role === "admin"
      ? "Platform Admin"
      : role === "coordinator"
        ? "Care Coordinator / Doctor"
        : role === "family"
          ? "Family Member"
          : "Patient";

  const settingsPathByRole: Record<UserRole, RoutePath> = {
    patient: "/patient/patient-settings",
    family: "/family/family-payments",
    coordinator: "/coordinator/coordinator-settings",
    admin: "/admin/admin-settings",
  } as Record<UserRole, RoutePath>;

  // ── Reusable account menu content, shared by desktop sidebar + mobile drawer ──
  const AccountMenuItems = ({ onNavigate }: { onNavigate: () => void }) => (
    <>
      <button
        onClick={() => {
          router.push(settingsPathByRole[role]);
          onNavigate();
        }}
        className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--foreground)] hover:bg-[var(--background-tertiary)] flex items-center gap-2.5 transition-colors"
      >
        <Settings className="w-4 h-4 text-[var(--gold)]" />
        <span>Account Settings</span>
      </button>
      {/* <button
        onClick={() => {
          router.push(role === 'patient' ? '/patient/notifications' : role === 'admin' ? '/admin/notifications' : role === 'family' ? '/family' : '/coordinator/coordinator-notifications');
          onNavigate();
        }}
        className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-[var(--foreground)] hover:bg-[var(--background-tertiary)] flex items-center justify-between gap-2.5 transition-colors"
      >
        <span className="flex items-center gap-2.5">
          <Bell className="w-4 h-4 text-[var(--gold)]" />
          <span>Notifications</span>
        </span>
        {unreadCount > 0 && (
          <span className="w-4 h-4 rounded-full bg-[var(--gold)] text-black text-[10px] font-bold flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button> */}
      <div className="h-px bg-[var(--border)] my-1" />
      <button
        onClick={() => {
          onLogout?.();
          router.push("/auth/signin");
          onNavigate();
        }}
        className="w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-950/30 flex items-center gap-2.5 transition-colors"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>
    </>
  );

  return (
    // ROOT SHELL — no topbar. Sidebar + main sit side by side, both locked to
    // the full viewport height, and only <main> scrolls.
    <div className="h-screen w-full overflow-hidden flex bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--gold)] selection:text-black font-sans">
      {/* DESKTOP SIDEBAR — a true <aside>, full height, brand + nav + account stacked */}
      <motion.aside
        animate={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
        transition={{ type: "spring", stiffness: 320, damping: 32 }}
        className="hidden lg:flex flex-col h-full shrink-0 bg-[var(--background-secondary)] border-r border-[var(--border)] relative overflow-hidden"
      >
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

        {/* Brand */}
        <div
          className={`px-3 pt-4 pb-3 border-b border-[var(--border-subtle)] flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-2`}
        >
          <button
            onClick={() => router.push("/")}
            className={`flex items-center gap-2.5 group focus:outline-none text-left ${collapsed ? "" : "flex-1 min-w-0"}`}
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center shadow-xs group-hover:border-[var(--gold)] transition-colors shrink-0 overflow-hidden">
              <img
                src="/rehab-nigeria-logo.png"
                alt="Rehab Nigeria"
                className="w-6 h-6 object-contain"
              />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <span className="font-cinzel font-bold text-sm tracking-wider text-[var(--foreground)] block truncate">
                  REHAB <span className="text-[var(--gold)]">NIGERIA</span>
                </span>
                <span className="text-[9px] tracking-widest uppercase text-[var(--foreground-subtle)] block truncate">
                  {roleBadgeText}
                </span>
              </div>
            )}
          </button>

          {!collapsed && (
            <button
              onClick={toggleCollapsed}
              className="p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-all flex items-center justify-center w-8 h-8 shrink-0"
              title="Collapse sidebar"
              aria-label="Collapse sidebar"
            >
              <ChevronLeft className="w-4 h-4 text-[var(--gold)]" />
            </button>
          )}
        </div>

        {collapsed && (
          <div className="px-3 py-2 flex justify-center border-b border-[var(--border-subtle)]">
            <button
              onClick={toggleCollapsed}
              className="p-2 rounded-xl text-[var(--foreground-muted)] hover:text-[var(--gold)] hover:bg-[var(--background-tertiary)] border border-[var(--border)] transition-all flex items-center justify-center w-10 h-10 shadow-xs"
              title="Expand sidebar"
              aria-label="Expand sidebar"
            >
              <ChevronRight className="w-4 h-4 text-[var(--gold)]" />
            </button>
          </div>
        )}

        {/* Nav */}
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
                    className={`w-full flex items-center ${collapsed ? "justify-center px-2" : "justify-between px-3"} py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? "bg-[var(--gold)] text-black font-bold shadow-md shadow-[var(--gold)]/20"
                        : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)] border border-transparent hover:border-[var(--border-subtle)]"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        className={`w-4 h-4 shrink-0 ${isActive ? "text-black" : "text-[var(--foreground-subtle)]"}`}
                      />
                      {!collapsed && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>
                    {!collapsed && item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          isActive
                            ? "bg-black/20 text-black"
                            : "bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)]"
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

        {/* ACCOUNT CARD — click to expand a menu (Account Settings, Notifications, Sign Out) */}
        <div
          className="relative border-t border-[var(--border-subtle)] p-3"
          ref={userMenuRef}
        >
          <button
            onClick={() => setUserMenuOpen((v) => !v)}
            className={`w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--background-tertiary)] transition-colors ${collapsed ? "justify-center" : ""}`}
            aria-label="Account menu"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--gold)]/30 shrink-0"
            />
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-xs font-semibold text-[var(--foreground)] truncate">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-[var(--foreground-subtle)] truncate">
                    {user.email}
                  </p>
                </div>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-[var(--foreground-muted)] shrink-0 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </>
            )}
          </button>

          <AnimatePresence>
            {userMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={`absolute bottom-full mb-2 bg-[var(--background-secondary)] border border-[var(--border)] rounded-2xl shadow-2xl p-2 z-50 space-y-0.5 ${
                  collapsed ? "left-full ml-2 w-60" : "left-3 right-3"
                }`}
              >
                {!collapsed && (
                  <div className="px-3 py-2 border-b border-[var(--border)] mb-1">
                    <p className="font-semibold text-xs text-[var(--foreground)] truncate">
                      {user.name}
                    </p>
                    <p className="text-[11px] text-[var(--foreground-subtle)] truncate">
                      {user.email}
                    </p>
                  </div>
                )}
                <AccountMenuItems onNavigate={() => setUserMenuOpen(false)} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.aside>

      {/* MOBILE FLOATING MENU TRIGGER — no topbar to host it, so it floats */}
      <button
        onClick={() => setMobileDrawerOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-3 rounded-2xl bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)] shadow-lg backdrop-blur-md flex items-center justify-center"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* MOBILE DRAWER (fixed overlay — meant to float, so it keeps position: fixed) */}
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
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 bottom-0 left-0 w-72 max-w-[85vw] z-50 bg-[var(--background-secondary)] shadow-2xl flex flex-col border-r border-[var(--border)]"
            >
              {/* Brand */}
              <div className="p-4 flex items-center justify-between border-b border-[var(--border)]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--gold)] font-cinzel font-bold text-sm">
                    RN
                  </div>
                  <div>
                    <span className="font-cinzel font-bold text-base text-[var(--foreground)] block">
                      REHAB <span className="text-[var(--gold)]">NIGERIA</span>
                    </span>
                    <span className="text-[9px] text-[var(--gold)] font-semibold block">
                      {roleBadgeText}
                    </span>
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

              {/* Nav */}
              <div className="flex-1 overflow-y-auto p-4 space-y-5">
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
                              ? "bg-[var(--gold)] text-black font-bold shadow-md shadow-[var(--gold)]/20"
                              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              className={`w-4 h-4 ${isActive ? "text-black" : "text-[var(--foreground-subtle)]"}`}
                            />
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

              {/* Account block — same menu items, always expanded on mobile (no need for a popover on a full-width drawer) */}
              <div className="p-4 border-t border-[var(--border)] space-y-2">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--foreground)] truncate">
                      {user.name}
                    </p>
                    <p className="text-[10px] text-[var(--foreground-subtle)] truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <AccountMenuItems
                    onNavigate={() => setMobileDrawerOpen(false)}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT — the only scrollable region in the whole shell */}
      <main className="flex-1 min-w-0 overflow-y-auto">
        <div className="p-4 pt-20 lg:pt-8 sm:p-6 lg:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[var(--border)]">
            <div className="space-y-1 min-w-0">
              {breadcrumbs.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-subtle)] mb-1 flex-wrap">
                  {breadcrumbs.map((b, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <span>/</span>}
                      {b.path ? (
                        <button
                          onClick={() => router.push(b.path!)}
                          className="hover:text-[var(--gold)] transition-colors"
                        >
                          {b.label}
                        </button>
                      ) : (
                        <span className="text-[var(--foreground-muted)] font-medium">
                          {b.label}
                        </span>
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

            {role === "patient" && (
              <button
                onClick={() => router.push("/patient/book-consultation")}
                className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap min-h-[40px]"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Book Consultation</span>
              </button>
            )}

            {role === "coordinator" && (
              <button
                onClick={() => router.push("/coordinator/consultation-live")}
                className="self-start sm:self-auto px-4 py-2.5 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-md shadow-[var(--gold)]/20 flex items-center gap-2 transition-transform active:scale-95 whitespace-nowrap min-h-[40px]"
              >
                <Stethoscope className="w-4 h-4 text-black" />
                <span>Start Next Session</span>
              </button>
            )}

            {role === "admin" && (
              <button
                onClick={() => router.push("/admin/rehab-centres")}
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
  );
};
