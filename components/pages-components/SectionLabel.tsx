import React from 'react';

interface SectionLabelProps {
  number?: string;
  text: string;
  className?: string;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ number, text, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-3 text-xs tracking-[0.25em] text-[var(--gold)] uppercase font-mono ${className}`}>
      {number && <span className="text-[var(--gold-light)] font-bold">{number}</span>}
      {number && <span className="text-[var(--border)]">/</span>}
      <span className="font-semibold">{text}</span>
      <div className="h-[1px] w-8 bg-gradient-to-r from-[var(--gold)] to-transparent ml-1"></div>
    </div>
  );
};
