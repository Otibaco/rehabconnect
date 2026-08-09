import React from 'react';
import { BookOpen, FileText, Download, ShieldCheck } from 'lucide-react';

export const PatientResourcesPage: React.FC = () => {
  const guides = [
    { title: 'Understanding Alcohol & Stress Coping Mechanisms', category: 'Clinical Guide', readTime: '5 min read' },
    { title: 'Family Communication in Recovery Pathways', category: 'Caregiver Guide', readTime: '8 min read' },
    { title: 'Relapse Prevention & Emergency Safety Planning', category: 'Safety Protocol', readTime: '10 min read' }
  ];

  return (
    <div className="space-y-8 font-sans">
      
      <div className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm space-y-2 crosshair-corner">
        <span className="font-mono text-xs text-[var(--gold)] font-bold uppercase tracking-widest block">
          CLINICAL KNOWLEDGE BASE
        </span>
        <h1 className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)]">
          RECOVERY RESOURCES & GUIDES
        </h1>
        <p className="text-xs text-[var(--foreground-muted)] max-w-xl">
          Curated clinical materials and psychoeducation guides created by licensed Nigerian medical consultants.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {guides.map((g, i) => (
          <div key={i} className="p-6 bg-[var(--background-secondary)] border border-[var(--border)] hover:border-[var(--gold)] rounded-sm space-y-3 transition-colors shadow-xl crosshair-corner">
            <span className="font-mono text-[10px] text-[var(--gold)] font-bold uppercase block">{g.category}</span>
            <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">{g.title}</h3>
            <span className="font-mono text-[10px] text-[var(--foreground-subtle)] block">{g.readTime}</span>
            <button className="px-4 py-2 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] font-mono text-xs font-bold rounded-sm w-full hover:bg-[var(--gold)] hover:text-[#080907] transition-colors">
              READ GUIDE →
            </button>
          </div>
        ))}
      </div>

    </div>
  );
};
