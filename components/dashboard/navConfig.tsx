import {
  LayoutDashboard,
  ClipboardList,
  Calendar,
  CreditCard,
  Bell,
  Settings,
  Users,
  BookOpen,
  PieChart,
  Sliders,
  MessageSquare,
  Activity,
  HeartHandshake,
  ShieldCheck,
} from "lucide-react";
import { RoutePath } from "@/types/type";
import { SidebarGroup, UserRole } from "@/types/type";

export function getNavGroups(role: UserRole, unreadCount: number): SidebarGroup[] {
  const badge = unreadCount ? String(unreadCount) : undefined;

  const patientGroups: SidebarGroup[] = [
    {
      groupName: "My Care",
      items: [
        { label: "Overview", path: "/patient", icon: LayoutDashboard },
        { label: "My Journey", path: "/patient/journey", icon: Activity, badge: "Stage 02" },
        { label: "Consultations", path: "/patient/consultations", icon: Calendar },
      ],
    },
    {
      groupName: "Account & Billing",
      items: [
        { label: "Payments", path: "/patient/payment", icon: CreditCard },
        { label: "Notifications", path: "/patient/notifications", icon: Bell, badge },
      ],
    },
  ];

  const familyGroups: SidebarGroup[] = [
    {
      groupName: "Loved One Care",
      items: [
        { label: "Family Overview", path: "/family", icon: LayoutDashboard },
        { label: "My Patient / Loved One", path: "/family/loved-one", icon: HeartHandshake },
        { label: "Consultations", path: "/family/consultations", icon: Calendar },
        // { label: "Messages with Doctor", path: "/family/messages", icon: MessageSquare, badge: "2 New" },
        { label: "Family Resources", path: "/family/resources", icon: BookOpen },
      ],
    },
    {
      groupName: "Account",
      items: [
        { label: "Payments", path: "/family/payments", icon: CreditCard },
        { label: "Notifications", path: "/family/notifications", icon: Bell, badge },
        // { label: "Family Settings", path: "/family", icon: Settings },
      ],
    },
  ];

  const coordinatorGroups: SidebarGroup[] = [
    {
      groupName: "Clinical Workspace",
      items: [
        { label: "Overview", path: "/coordinator", icon: LayoutDashboard },
        { label: "Patients Directory", path: "/coordinator/patients", icon: Users, badge: "4 Active" },
        { label: "Consultations", path: "/coordinator/consultations", icon: Calendar, badge: "2 Today" },
        { label: "Messages", path: "/coordinator/messages", icon: MessageSquare, badge: "3 Unread" },
        { label: "Follow-Ups", path: "/coordinator/followups", icon: ClipboardList, badge: "3 Due" },
      ],
    },
    {
      groupName: "Doctor Suite",
      items: [
        { label: "Clinical Protocols", path: "/coordinator/resources", icon: BookOpen },
        { label: "Notifications", path: "/coordinator/notifications", icon: Bell, badge },
        { label: "Settings & License", path: "/coordinator/settings", icon: Settings },
      ],
    },
  ];

  const adminGroups: SidebarGroup[] = [
    {
      groupName: "Executive Control",
      items: [
        { label: "Admin Overview", path: "/admin", icon: LayoutDashboard },
        { label: "User Directory", path: "/admin/users", icon: Users },
        { label: "Coordinator Verification", path: "/admin/verification", icon: ShieldCheck, badge: "2 Pending" },
        { label: "Platform Reports", path: "/admin/reports", icon: PieChart },
        { label: "Platform Settings", path: "/admin/settings", icon: Sliders },
      ],
    },
  ];

  return role === "admin"
    ? adminGroups
    : role === "coordinator"
      ? coordinatorGroups
      : role === "family"
        ? familyGroups
        : patientGroups;
}

export function getRoleBadgeText(role: UserRole): string {
  return role === "admin"
    ? "Platform Admin"
    : role === "coordinator"
      ? "Care Coordinator / Doctor"
      : role === "family"
        ? "Family Member"
        : "Patient";
}

export const settingsPathByRole: Record<UserRole, RoutePath> = {
  patient: "/patient/settings",
  family: "/family/payments",
  coordinator: "/coordinator/settings",
  admin: "/admin/settings",
} as Record<UserRole, RoutePath>;