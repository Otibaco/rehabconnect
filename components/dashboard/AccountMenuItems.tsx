"use client";
import React from "react";
import { Settings, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { settingsPathByRole } from "./navConfig";
import { UserRole } from "@/types/type";

interface AccountMenuItemsProps {
  role: UserRole;
  onLogout?: () => void;
  onNavigate: () => void;
}

export const AccountMenuItems: React.FC<AccountMenuItemsProps> = ({ role, onLogout, onNavigate }) => {
  const router = useRouter();

  return (
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
};