import React from 'react';
import { DashboardShell } from '@/app/dashboard/DashboardShell';
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  Video,
  Activity,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const AdminReportsPage: React.FC = () => {
  return (
    <DashboardShell
      title="Telehealth Analytics & Clinical Outcomes"
      description="Analytical reports on online rehabilitation adherence, HD video consultation metrics, and nationwide patient trajectories."
      breadcrumbs={[{ label: 'Admin Portal', path: '/admin/dashboard' }, { label: 'Reports' }]}
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="font-cinzel font-bold text-base sm:text-lg text-[var(--foreground)] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[var(--gold)]" />
            <span>Telehealth Clinical Metrics & Outcome Analytics</span>
          </h3>

          <button
            onClick={() => alert('Executive Telehealth Outcome Report downloaded (.pdf)')}
            className="px-4 py-2 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black font-bold text-xs flex items-center gap-1.5 shadow-md shadow-[var(--gold)]/20 transition-all hover:scale-105"
          >
            <Download className="w-4 h-4 text-black" />
            <span>Download Analytics PDF</span>
          </button>
        </div>

        {/* METRICS ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-xl">
            <span className="text-[10px] text-[var(--foreground-subtle)] font-bold uppercase tracking-wider">
              Doctor Video Completion
            </span>
            <p className="font-cinzel font-bold text-3xl text-[var(--gold)]">98.4%</p>
            <p className="text-xs text-[var(--foreground-muted)]">Completed on-time encrypted video consultations.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-xl">
            <span className="text-[10px] text-[var(--foreground-subtle)] font-bold uppercase tracking-wider">
              Digital Protocol Adherence
            </span>
            <p className="font-cinzel font-bold text-3xl text-[var(--green)]">89.2%</p>
            <p className="text-xs text-[var(--foreground-muted)]">Patients logging daily exercises and vitals.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-xl">
            <span className="text-[10px] text-[var(--foreground-subtle)] font-bold uppercase tracking-wider">
              Patient Satisfaction Score
            </span>
            <p className="font-cinzel font-bold text-3xl text-[var(--gold-light)]">4.9 / 5.0</p>
            <p className="text-xs text-[var(--foreground-muted)]">Average clinical telehealth review score.</p>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-2 shadow-xl">
            <span className="text-[10px] text-[var(--foreground-subtle)] font-bold uppercase tracking-wider">
              Nationwide Virtual Coverage
            </span>
            <p className="font-cinzel font-bold text-3xl text-[var(--foreground)]">36 States + FCT</p>
            <p className="text-xs text-[var(--foreground-muted)]">Instant remote care delivery across Nigeria.</p>
          </div>
        </div>

        {/* CLINICAL SPECIALTIES DISTRIBUTION */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-6 shadow-xl">
          <h4 className="font-cinzel font-bold text-base text-[var(--foreground)] flex items-center gap-2">
            <Activity className="w-5 h-5 text-[var(--gold)]" />
            <span>Virtual Care Program Distribution by Clinical Specialty</span>
          </h4>

          <div className="space-y-4 text-xs">
            {[
              { label: 'Stroke & Neurological Tele-Rehabilitation', share: '38%', count: '1,300 Patients', color: 'bg-[var(--gold)]' },
              { label: 'Substance & Addiction Virtual Care', share: '28%', count: '958 Patients', color: 'bg-[var(--gold-light)]' },
              { label: 'Orthopedic & Post-Surgical Movement Protocols', share: '18%', count: '615 Patients', color: 'bg-[var(--green)]' },
              { label: 'Mental Health & Trauma Tele-Counseling', share: '16%', count: '547 Patients', color: 'bg-[#3B828E]' },
            ].map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between font-semibold text-[var(--foreground)]">
                  <span>{s.label}</span>
                  <span className="text-[var(--gold)] font-mono">{s.count} ({s.share})</span>
                </div>
                <div className="w-full bg-[var(--background-tertiary)] h-2.5 rounded-full overflow-hidden border border-[var(--border)]">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: s.share }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
