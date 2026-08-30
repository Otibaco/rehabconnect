"use client";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { getNavGroups, getRoleBadgeText } from "./navConfig";
import { AccountMenuItems } from "./AccountMenuItems";
import { ShellUser, UserRole } from "@/types/type";

interface MobileNavDrawerProps {
  role: UserRole;
  user: ShellUser;
  unreadCount: number;
  onLogout?: () => void;
}

export const MobileNavDrawer: React.FC<MobileNavDrawerProps> = ({ role, user, unreadCount, onLogout }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navGroups = getNavGroups(role, unreadCount);
  const roleBadgeText = getRoleBadgeText(role);

  return (
    <>
      {/* Floating trigger — no topbar to anchor a hamburger to */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-40 p-3 rounded-2xl bg-[var(--background-secondary)] text-[var(--foreground)] border border-[var(--border)] shadow-lg backdrop-blur-md flex items-center justify-center"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
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
                    <span className="text-[9px] text-[var(--gold)] font-semibold block">{roleBadgeText}</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
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
                      const isActive = pathname === item.path;
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => {
                            router.push(item.path);
                            setOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[44px] ${
                            isActive
                              ? "bg-[var(--gold)] text-black font-bold shadow-md shadow-[var(--gold)]/20"
                              : "text-[var(--foreground-muted)] hover:text-[var(--foreground)] hover:bg-[var(--background-tertiary)]"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <Icon className={`w-4 h-4 ${isActive ? "text-black" : "text-[var(--foreground-subtle)]"}`} />
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

              {/* Account block — always expanded on mobile (drawer is already full-width, no need for a popover) */}
              <div className="p-4 border-t border-[var(--border)] space-y-2">
                <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[var(--background-tertiary)] border border-[var(--border-subtle)]">
                  <img src={user.avatar} alt={user.name} className="w-9 h-9 rounded-full object-cover" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-[var(--foreground)] truncate">{user.name}</p>
                    <p className="text-[10px] text-[var(--foreground-subtle)] truncate">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <AccountMenuItems role={role} onLogout={onLogout} onNavigate={() => setOpen(false)} />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};