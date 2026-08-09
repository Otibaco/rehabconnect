import React from 'react';
import { LucideIcon } from 'lucide-react';

export type StatAccent =
  | 'gold'
  | 'green'
  | 'terracotta'
  | 'amber'
  | 'sage'
  | 'slate'
  | 'teal'
  | 'sky'
  | 'indigo';

interface StatBlockProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: LucideIcon;
  trend?: string;
  accent?: StatAccent;
}

export const StatBlock: React.FC<StatBlockProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  accent = 'gold'
}) => {
  const accentStyles: Record<
    StatAccent,
    { border: string; text: string; bgGlow: string; iconBg: string }
  > = {
    gold: {
      border: 'border-l-[var(--gold)]',
      text: 'text-[var(--gold-light)]',
      bgGlow: 'hover:bg-amber-950/20',
      iconBg: 'bg-[var(--gold)]/10 text-[var(--gold-light)] border-[var(--gold)]/30'
    },
    green: {
      border: 'border-l-[var(--green-light)]',
      text: 'text-[var(--green-light)]',
      bgGlow: 'hover:bg-emerald-950/20',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    },
    sage: {
      border: 'border-l-[#81A684]',
      text: 'text-[#9EC4A1]',
      bgGlow: 'hover:bg-[#81A684]/10',
      iconBg: 'bg-[#81A684]/15 text-[#9EC4A1] border-[#81A684]/40'
    },
    slate: {
      border: 'border-l-[#5C6B73]',
      text: 'text-[#8EA3AD]',
      bgGlow: 'hover:bg-[#5C6B73]/10',
      iconBg: 'bg-[#5C6B73]/20 text-[#9BB1BC] border-[#5C6B73]/40'
    },
    terracotta: {
      border: 'border-l-[#C96A4B]',
      text: 'text-[#E58567]',
      bgGlow: 'hover:bg-[#C96A4B]/10',
      iconBg: 'bg-[#C96A4B]/15 text-[#E58567] border-[#C96A4B]/40'
    },
    amber: {
      border: 'border-l-[#D99B26]',
      text: 'text-[#F5B842]',
      bgGlow: 'hover:bg-amber-950/20',
      iconBg: 'bg-[#D99B26]/15 text-[#F5B842] border-[#D99B26]/40'
    },
    teal: {
      border: 'border-l-[#3B828E]',
      text: 'text-[#5EC1D0]',
      bgGlow: 'hover:bg-teal-950/20',
      iconBg: 'bg-[#3B828E]/15 text-[#5EC1D0] border-[#3B828E]/40'
    },
    sky: {
      border: 'border-l-sky-500',
      text: 'text-sky-300',
      bgGlow: 'hover:bg-sky-950/20',
      iconBg: 'bg-sky-500/15 text-sky-300 border-sky-500/40'
    },
    indigo: {
      border: 'border-l-indigo-500',
      text: 'text-indigo-300',
      bgGlow: 'hover:bg-indigo-950/20',
      iconBg: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/40'
    }
  };

  const currentAccent = accentStyles[accent] || accentStyles.gold;

  return (
    <div
      className={`p-5 bg-[var(--background-secondary)] border border-[var(--border)] border-l-4 ${currentAccent.border} rounded-sm space-y-2 relative shadow-lg transition-all duration-300 ${currentAccent.bgGlow} crosshair-corner group`}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-[var(--foreground-subtle)] uppercase tracking-wider font-semibold">
          {label}
        </span>
        {Icon && (
          <div className={`p-1.5 rounded-sm border ${currentAccent.iconBg} transition-transform duration-300 group-hover:scale-110`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="font-cinzel text-2xl sm:text-3xl font-bold text-[var(--foreground)] tracking-tight">
        {value}
      </div>

      {(subtext || trend) && (
        <div className="flex items-center gap-2 font-mono text-[10px] text-[var(--foreground-muted)] pt-1 border-t border-[var(--border-subtle)]/50">
          {trend && <span className={`${currentAccent.text} font-bold`}>{trend}</span>}
          {subtext && <span className="truncate">{subtext}</span>}
        </div>
      )}
    </div>
  );
};
