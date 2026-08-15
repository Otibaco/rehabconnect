import Link from 'next/link';
import { ArrowRight, Bell, CalendarRange, ClipboardCheck, ShieldCheck } from 'lucide-react';
import { DashboardShell } from '../dashboard/DashboardShell';

const quickLinks = [
  { href: '/patient/assessment', label: 'Start assessment', icon: ClipboardCheck },
  { href: '/patient/consultations/book', label: 'Book consultation', icon: CalendarRange },
  { href: '/patient/notifications', label: 'Notifications', icon: Bell },
  { href: '/patient/settings', label: 'Profile settings', icon: ShieldCheck },
];

export default function PatientOverviewPage() {
  return (
    <DashboardShell
      title="Welcome back, Sarah"
      description="Your rehabilitation journey is organized in one place. Review your care plan, upcoming sessions, and support actions."
      breadcrumbs={[{ href: '/patient', label: 'Patient portal' }, { label: 'Overview' }]}
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <div style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))' }} className="rounded-3xl p-6 text-white shadow-lg lg:col-span-2 gold-border-glow">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">Current status</p>
          <h2 className="mt-3 text-2xl font-bold">Assessment in progress</h2>
          <p className="mt-2 max-w-xl text-sm opacity-90">
            Your care coordinator is reviewing your intake details and will guide the next care steps.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/patient/assessment"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
              style={{ backgroundColor: 'var(--foreground)', color: 'var(--gold-dark)' }}
            >
              Complete assessment <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/patient/dashboard"
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold text-white"
              style={{ borderColor: 'rgba(255,255,255,0.3)' }}
            >
              View dashboard
            </Link>
          </div>
        </div>

        <div style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background-secondary)' }} className="rounded-3xl border p-6 shadow-sm gold-border-glow">
          <p style={{ color: 'var(--foreground-muted)' }} className="text-xs uppercase tracking-[0.2em]">Next session</p>
          <h3 style={{ color: 'var(--foreground)' }} className="mt-3 text-xl font-bold">Video consultation</h3>
          <p style={{ color: 'var(--foreground-muted)' }} className="mt-2 text-sm">Wednesday, 10:30 AM</p>
          <p style={{ color: 'var(--gold)' }} className="mt-2 text-sm font-semibold">Dr. Amara Okafor</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background-secondary)' }}
            className="rounded-2xl border p-5 shadow-sm transition hover:-translate-y-0.5 gold-border-glow"
          >
            <div style={{ backgroundColor: 'rgba(200, 164, 93, 0.15)', color: 'var(--gold)' }} className="mb-4 inline-flex rounded-xl p-3">
              <Icon className="h-5 w-5" />
            </div>
            <p style={{ color: 'var(--foreground)' }} className="text-sm font-semibold">{label}</p>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
