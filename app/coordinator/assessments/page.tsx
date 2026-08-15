import React from 'react';
import { DashboardShell } from '../../components/dashboard/DashboardShell';
import { MOCK_PATIENTS } from '../../data/mockData';
import { ClipboardList, CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export const CoordinatorAssessmentsPage: React.FC = () => {
  return (
    <DashboardShell
      title="Assessment Triage Queue"
      description="Review submitted patient rehabilitation questionnaires and assign matched facilities."
      breadcrumbs={[{ label: 'Care Portal', path: '/coordinator/dashboard' }, { label: 'Assessments' }]}
    >
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 shadow-xl">
          <h3 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-[var(--gold)]" />
            <span>Pending Clinical Intake Submissions</span>
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[var(--border)] text-[var(--foreground-subtle)] font-semibold">
                  <th className="pb-3">Patient</th>
                  <th className="pb-3">Condition</th>
                  <th className="pb-3">Severity</th>
                  <th className="pb-3">Assigned Date</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border)]">
                {MOCK_PATIENTS.map((p) => (
                  <tr key={p.id} className="hover:bg-[var(--background-tertiary)]/50 transition-colors">
                    <td className="py-3.5 font-bold text-[var(--foreground)] flex items-center gap-2.5">
                      <img src={p.avatar} alt="" className="w-7 h-7 rounded-xl object-cover border border-[var(--border-subtle)]" />
                      <span>{p.name}</span>
                    </td>
                    <td className="py-3.5 text-[var(--foreground-muted)]">{p.condition}</td>
                    <td className="py-3.5 font-bold capitalize text-[var(--gold)]">{p.severity}</td>
                    <td className="py-3.5 text-[var(--foreground-subtle)]">{p.assignedDate}</td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => alert(`Reviewing intake form for ${p.name}`)}
                        className="px-3.5 py-1.5 rounded-xl bg-[var(--gold)] text-black font-bold text-[11px] hover:bg-[var(--gold-light)] transition-all hover:scale-105 shadow-sm"
                      >
                        Review Form
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
