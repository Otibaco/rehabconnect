"use client"
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

export const AdminUsersPage: React.FC = () => {
  const [roleFilter, setRoleFilter] = useState<'all' | 'patient' | 'coordinator' | 'admin'>('all');

  const users = [
    { id: 'u1', name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'patient', status: 'Active', joined: '2026-07-12' },
    { id: 'u2', name: 'Dr. Amara Okafor', email: 'amara.o@rehabconnect.org', role: 'coordinator', status: 'Verified', joined: '2026-05-01' },
    { id: 'u3', name: 'Dr. David Adeleke', email: 'david.a@rehabconnect.org', role: 'coordinator', status: 'Verified', joined: '2026-06-15' },
    { id: 'u4', name: 'System Admin', email: 'admin@rehabconnect.org', role: 'admin', status: 'Active', joined: '2026-01-01' },
  ];

  const filteredUsers = users.filter((u) => roleFilter === 'all' || u.role === roleFilter);

  return (
    <DashboardShell
      title="User Management & Role Security"
      description="Manage accounts, verify clinical credentials, and control access levels across RehabConnect."
      breadcrumbs={[{ label: 'Admin Portal', path: '/admin/dashboard' }, { label: 'Users' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex gap-2">
            {(['all', 'patient', 'coordinator', 'admin'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRoleFilter(r)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
                  roleFilter === r ? 'bg-[var(--gold)] text-black shadow-sm' : 'bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground-muted)] hover:border-[var(--gold)]/50'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <button
            onClick={() => alert('Add User Modal')}
            className="px-4 py-2 rounded-xl bg-[var(--gold)] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[var(--gold-light)] transition-all hover:scale-105 shadow-md shadow-[var(--gold)]/20"
          >
            <Plus className="w-4 h-4 text-black" />
            <span>Create New User</span>
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--foreground-subtle)] font-semibold">
                  <th className="pb-3">User Name</th>
                  <th className="pb-3">Email Address</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Joined Date</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {filteredUsers.map((u) => (
                  <tr key={u.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                    <td className="py-3.5 font-bold text-[var(--foreground)]">{u.name}</td>
                    <td className="py-3.5 text-[var(--foreground-muted)]">{u.email}</td>
                    <td className="py-3.5 capitalize font-semibold text-[var(--gold)]">{u.role}</td>
                    <td className="py-3.5 text-[var(--foreground-subtle)]">{u.joined}</td>
                    <td className="py-3.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-[var(--green)]/20 text-[var(--green)] border border-[var(--green)]/30 text-[10px] font-bold">
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3.5 text-right space-x-2">
                      <button onClick={() => alert(`Edit ${u.name}`)} className="text-[var(--gold)] font-bold hover:underline">
                        Edit
                      </button>
                      <button onClick={() => alert(`Suspend ${u.name}`)} className="text-rose-400 font-bold hover:underline">
                        Suspend
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
