"use client";
import React from "react";
import { Sparkles, Stethoscope, UserCheck } from "lucide-react";
import { RoutePath } from "@/types/type";
import { useRouter } from "next/navigation";
import { ShellNotification, ShellUser, UserRole, DEFAULT_USER } from "@/types/type";
import { Sidebar } from "./Sidebar";
import { MobileNavDrawer } from "./MobileNavDrawer";

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
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    // ROOT SHELL — no topbar. Sidebar + main sit side by side, both locked to
    // the full viewport height, and only <main> scrolls.
    <div className="h-screen w-full overflow-hidden flex bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--gold)] selection:text-black font-sans">
      <Sidebar role={role} user={user} unreadCount={unreadCount} onLogout={onLogout} />
      <MobileNavDrawer role={role} user={user} unreadCount={unreadCount} onLogout={onLogout} />

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