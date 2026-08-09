import React from 'react';

type StatusType =
  | 'Upcoming'
  | 'In Progress'
  | 'Completed'
  | 'Cancelled'
  | 'Verified'
  | 'Pending'
  | 'Under Review'
  | 'Rejected'
  | 'Active'
  | 'Paid'
  | 'Granted'
  | 'Restricted';

interface StatusBadgeProps {
  status: StatusType | string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let colorClasses = 'bg-[#5C6B73]/15 border-[#5C6B73]/40 text-[#A2B4BC]';

  if (['Verified', 'Paid', 'Granted'].includes(status)) {
    colorClasses = 'bg-[#81A684]/20 border-[#81A684]/60 text-[#A3C9A6] shadow-[0_0_8px_rgba(129,166,132,0.2)]';
  } else if (['Active', 'Upcoming'].includes(status)) {
    colorClasses = 'bg-sky-500/20 border-sky-500/50 text-sky-300 shadow-[0_0_8px_rgba(14,165,233,0.2)]';
  } else if (['In Progress', 'Under Review', 'Pending'].includes(status)) {
    colorClasses = 'bg-[#D99B26]/20 border-[#D99B26]/50 text-[#F5C252] shadow-[0_0_8px_rgba(217,155,38,0.2)]';
  } else if (['Cancelled', 'Rejected', 'Restricted'].includes(status)) {
    colorClasses = 'bg-[#C96A4B]/20 border-[#C96A4B]/50 text-[#F18D70] shadow-[0_0_8px_rgba(201,106,75,0.2)]';
  } else if (['Completed'].includes(status)) {
    colorClasses = 'bg-[#3B828E]/20 border-[#3B828E]/50 text-[#67C7D4] shadow-[0_0_8px_rgba(59,130,142,0.2)]';
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm border font-mono text-[10px] font-bold uppercase tracking-wider transition-colors ${colorClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current shrink-0 animate-pulse"></span>
      <span>{status}</span>
    </span>
  );
};
