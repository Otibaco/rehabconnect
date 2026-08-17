"use client"
import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { DashboardShell } from '@/components/dashboard/DashboardShell';

interface CoordinatorApplication {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  mdcnNumber: string;
  institution: string;
  submittedDate: string;
  status: 'pending' | 'verified' | 'rejected';
  documents: string[];
}

export const AdminVerificationPage: React.FC = () => {
  const [applications, setApplications] = useState<CoordinatorApplication[]>([
    {
      id: 'app_1',
      name: 'Dr. Folake Adeyemi',
      avatar: 'https://images.unsplash.com/photo-1594824813580-28e08d66579f?auto=format&fit=crop&w=400&q=80',
      specialty: 'Physical Rehabilitation & Neurology',
      mdcnNumber: 'MDCN-74921-NG',
      institution: 'Lagos State University Teaching Hospital (LUTH)',
      submittedDate: 'May 10, 2026',
      status: 'verified',
      documents: ['MDCN Annual Practicing License 2026.pdf', 'MBBS Degree Certificate.pdf'],
    },
    {
      id: 'app_2',
      name: 'Dr. Obinna Nwosu',
      avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=400&q=80',
      specialty: 'Orthopedic Physical Therapy',
      mdcnNumber: 'MDCN-88102-NG',
      institution: 'National Orthopedic Hospital Igbobi, Lagos',
      submittedDate: 'Yesterday',
      status: 'pending',
      documents: ['Medical License MDCN 2026.pdf', 'Postgrad Rehab Diploma.pdf'],
    },
    {
      id: 'app_3',
      name: 'Dr. Fatima Bello',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=400&q=80',
      specialty: 'Clinical Psychology & Neuro-Trauma',
      mdcnNumber: 'MDCN-56291-NG',
      institution: 'Federal Neuro-Psychiatric Hospital Yaba',
      submittedDate: '3 days ago',
      status: 'pending',
      documents: ['License Practicing Cert.pdf', 'Lagos Board Accreditation.pdf'],
    },
  ]);

  const handleVerify = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'verified' } : app))
    );
  };

  const handleReject = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'rejected' } : app))
    );
  };

  return (
    <DashboardShell
      title="Care Coordinator & Doctor Verification"
      description="Review Medical and Dental Council of Nigeria (MDCN) credentials and approve telehealth specialists."
      breadcrumbs={[
        { label: 'Admin', path: '/admin' },
        { label: 'Coordinator Verification' }
      ]}
    >
      <div className="space-y-6 max-w-6xl">
        <div className="p-4 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-[var(--foreground)]">Pending Reviews:</span>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-400 font-bold border border-amber-400/20">
              {applications.filter((a) => a.status === 'pending').length} Doctors
            </span>
          </div>
          <span className="text-[11px] text-[var(--foreground-muted)]">MDCN Database API Synchronized</span>
        </div>

        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="p-5 rounded-2xl bg-[var(--background-secondary)] border border-[var(--border)] space-y-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={app.avatar}
                  alt={app.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[var(--gold)] shrink-0"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-bold text-sm text-[var(--foreground)]">{app.name}</h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[var(--gold)]/10 text-[var(--gold)]">
                      {app.mdcnNumber}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        app.status === 'verified'
                          ? 'bg-emerald-500/15 text-emerald-400'
                          : app.status === 'rejected'
                          ? 'bg-rose-500/15 text-rose-400'
                          : 'bg-amber-400/15 text-amber-400'
                      }`}
                    >
                      {app.status === 'verified' ? 'Verified Specialist' : app.status === 'rejected' ? 'Rejected' : 'Pending Verification'}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--gold)] font-medium">{app.specialty}</p>
                  <p className="text-[11px] text-[var(--foreground-muted)]">{app.institution} • Submitted {app.submittedDate}</p>

                  <div className="flex items-center gap-2 pt-1">
                    {app.documents.map((doc, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-md text-[10px] bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground-muted)] flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3 text-[var(--gold)]" />
                        <span>{doc}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                {app.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleReject(app.id)}
                      className="px-3.5 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleVerify(app.id)}
                      className="px-4 py-2 rounded-xl bg-[var(--gold)] hover:bg-[var(--gold-light)] text-black text-xs font-bold shadow-sm flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Approve & Verify</span>
                    </button>
                  </>
                ) : (
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Active on Telehealth Network
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
};
