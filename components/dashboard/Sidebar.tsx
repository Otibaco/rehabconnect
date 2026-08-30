"use client";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { ShellUser, UserRole } from "@/types/type";
import { getNavGroups, getRoleBadgeText } from "./navConfig";
import { AccountMenuItems } from "./AccountMenuItems";

const SIDEBAR_EXPANDED = 264;
const SIDEBAR_COLLAPSED = 78;

interface SidebarProps {
  role: UserRole;
  user: ShellUser;
  unreadCount: number;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ role, user, unreadCount, onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("rn-sidebar-collapsed") : null;
    if (saved) setCollapsed(saved === "true");
  }, []);

  const toggleCollapsed = () => {
    setCollapsed((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") window.localStorage.setItem("rn-sidebar-collapsed", String(next));
      return next;
    });
  };

  const navGroups = getNavGroups(role, unreadCount);
  const roleBadgeText = getRoleBadgeText(role);

  return (
    <motion.aside
      animate={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="hidden lg:flex flex-col h-full shrink-0 bg-[var(--background-secondary)] border-r border-[var(--border)] relative overflow-hidden"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      {/* Brand — collapsed: clicking the logo expands the sidebar.
          Expanded: clicking the logo navigates home, and the separate
          chevron button collapses it. */}
      <div className={`px-3 pt-4 pb-3 border-b border-[var(--border-subtle)] flex items-center ${collapsed ? "justify-center" : "justify-between"} gap-2`}>
        <button
          onClick={() => (collapsed ? toggleCollapsed() : router.push("/"))}
          className={`flex items-center gap-2.5 group focus:outline-none text-left ${collapsed ? "" : "flex-1 min-w-0"}`}
          title={collapsed ? "Expand sidebar" : undefined}
          aria-label={collapsed ? "Expand sidebar" : "Go to home"}
        >
          <div className="w-9 h-9 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)] flex items-center justify-center shadow-xs group-hover:border-[var(--gold)] transition-colors shrink-0 overflow-hidden">
            <img src="/rehab-nigeria-logo.png" alt="Rehab Nigeria" className="w-6 h-6 object-contain" />
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
              const isActive = pathname === item.path;
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
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-black" : "text-[var(--foreground-subtle)]"}`} />
                    {!collapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!collapsed && item.badge && (
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive ? "bg-black/20 text-black" : "bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)]"
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

      {/* ACCOUNT CARD — click to expand a menu (Account Settings, Sign Out) */}
      <div className="relative border-t border-[var(--border-subtle)] p-3" ref={userMenuRef}>
        <button
          onClick={() => setUserMenuOpen((v) => !v)}
          className={`w-full flex items-center gap-2.5 p-2 rounded-xl hover:bg-[var(--background-tertiary)] transition-colors ${collapsed ? "justify-center" : ""}`}
          aria-label="Account menu"
        >
          <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover ring-2 ring-[var(--gold)]/30 shrink-0" />
          {!collapsed && (
            <>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-xs font-semibold text-[var(--foreground)] truncate">{user.name}</p>
                <p className="text-[10px] text-[var(--foreground-subtle)] truncate">{user.email}</p>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[var(--foreground-muted)] shrink-0 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
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
                  <p className="font-semibold text-xs text-[var(--foreground)] truncate">{user.name}</p>
                  <p className="text-[11px] text-[var(--foreground-subtle)] truncate">{user.email}</p>
                </div>
              )}
              <AccountMenuItems role={role} onLogout={onLogout} onNavigate={() => setUserMenuOpen(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};