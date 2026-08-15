import Link from 'next/link';
import { ArrowRight, Bell, CalendarDays, ClipboardCheck, CreditCard } from 'lucide-react';
import { DashboardShell } from '../../dashboard/DashboardShell';

export default function PatientDashboardPage() {
  return (
    <DashboardShell
      title="Care dashboard"
      description="Track your consultation plan, assessment status, and upcoming care actions."
      breadcrumbs={[{ href: '/patient', label: 'Patient portal' }, { label: 'Dashboard' }]}
    >
      <div className="grid gap-6 xl:grid-cols-3">
        <div style={{ background: 'linear-gradient(135deg, var(--gold-dark), var(--gold))' }} className="rounded-3xl p-6 text-white shadow-lg xl:col-span-2 gold-border-glow">
          <p className="text-xs uppercase tracking-[0.2em] opacity-80">Current focus</p>
          <h2 className="mt-3 text-2xl font-bold">Your recovery plan is active</h2>
          <p className="mt-2 text-sm opacity-90">
            Your care team is preparing the next steps and reviewing your assessment details.
          </p>
          <Link
            href="/patient/assessment"
            className="mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition"
            style={{ backgroundColor: 'var(--foreground)', color: 'var(--gold-dark)' }}
          >
            Continue assessment <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div style={{ borderColor: 'var(--border)', backgroundColor: 'var(--background-secondary)' }} className="rounded-3xl border p-6 shadow-sm gold-border-glow">
          <p style={{ color: 'var(--foreground-muted)' }} className="text-xs uppercase tracking-[0.2em]">Next appointment</p>
          <h3 style={{ color: 'var(--foreground)' }} className="mt-3 text-xl font-bold">Video consult</h3>
          <p style={{ color: 'var(--foreground-muted)' }} className="mt-2 text-sm">Wednesday • 10:30 AM</p>
          <p style={{ color: 'var(--gold)' }} className="mt-2 text-sm font-semibold">Dr. Amara Okafor</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          { href: '/patient/assessment', label: 'Assessment status', icon: ClipboardCheck },
          { href: '/patient/consultations/book', label: 'Book consult', icon: CalendarDays },
          { href: '/patient/notifications', label: 'Notifications', icon: Bell },
          { href: '/patient/history', label: 'Payment history', icon: CreditCard },
        ].map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-teal-200 hover:shadow-md"
          >
            <div className="mb-4 inline-flex rounded-xl bg-teal-50 p-3 text-teal-600">
              <Icon className="h-5 w-5" />
            </div>
            <p className="text-sm font-semibold text-slate-900">{label}</p>
          </Link>
        ))}
      </div>
    </DashboardShell>
  );
}
