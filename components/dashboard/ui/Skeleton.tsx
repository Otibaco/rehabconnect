import React from 'react';

interface SkeletonProps {
  className?: string;
  variant?: 'shimmer' | 'sage' | 'slate';
}

/**
 * Modern borderless skeleton bar with smooth dark theme shimmer
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className = 'h-4 w-full',
  variant = 'shimmer'
}) => {
  const variantStyles = {
    shimmer: 'skeleton-shimmer',
    sage: 'skeleton-sage',
    slate: 'skeleton-slate'
  };

  return (
    <div
      className={`rounded-xs transition-opacity duration-300 ${variantStyles[variant]} ${className}`}
    />
  );
};

/**
 * Skeleton Loader mirroring StatBlock metric layout exactly
 */
export const StatBlockSkeleton: React.FC = () => {
  return (
    <div className="p-5 bg-[var(--background-secondary)]/90 rounded-sm space-y-3 relative shadow-lg transition-all">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3 w-28" variant="slate" />
        <Skeleton className="h-7 w-7 rounded-xs" variant="slate" />
      </div>

      <div className="flex items-baseline justify-between pt-1">
        <Skeleton className="h-8 w-32" variant="sage" />
      </div>

      <Skeleton className="h-3 w-36" variant="slate" />
    </div>
  );
};

/**
 * Skeleton Loader mirroring ConsultationCard layout exactly
 */
export const ConsultationCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-[var(--background-secondary)]/90 rounded-sm space-y-4 shadow-xl">
      {/* Header tag, ID and Status Badge */}
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]/40">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-28 rounded-xs" variant="sage" />
          <Skeleton className="h-3 w-16" variant="slate" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full" variant="sage" />
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-2.5 w-20" variant="slate" />
          <Skeleton className="h-6 w-48" variant="sage" />
          <Skeleton className="h-3.5 w-36" variant="slate" />
        </div>

        <div className="space-y-2">
          <Skeleton className="h-4 w-36" variant="slate" />
          <Skeleton className="h-4 w-44" variant="slate" />
        </div>
      </div>

      {/* Notes block */}
      <div className="p-3 bg-[var(--background-tertiary)]/70 rounded-sm space-y-1.5">
        <Skeleton className="h-2.5 w-24" variant="sage" />
        <Skeleton className="h-3.5 w-full" variant="slate" />
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[var(--border-subtle)]/40 flex items-center justify-between gap-3">
        <Skeleton className="h-4 w-28" variant="slate" />
        <Skeleton className="h-9 w-36 rounded-xs" variant="sage" />
      </div>
    </div>
  );
};

/**
 * Skeleton Loader mirroring PatientProfileCard layout exactly
 */
export const PatientProfileCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-[var(--background-secondary)]/90 rounded-sm space-y-4 shadow-xl">
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]/40">
        <div className="space-y-2">
          <Skeleton className="h-6 w-44" variant="sage" />
          <Skeleton className="h-3.5 w-32" variant="slate" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-16 rounded-xs" variant="slate" />
          <Skeleton className="h-5 w-20 rounded-full" variant="sage" />
        </div>
      </div>

      {/* Concerns pills */}
      <div className="space-y-2">
        <Skeleton className="h-2.5 w-28" variant="slate" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20 rounded-xs" variant="sage" />
          <Skeleton className="h-6 w-24 rounded-xs" variant="sage" />
        </div>
        <Skeleton className="h-3 w-full" variant="slate" />
        <Skeleton className="h-3 w-4/5" variant="slate" />
      </div>

      {/* Footer */}
      <div className="pt-3 border-t border-[var(--border-subtle)]/40 flex items-center justify-between">
        <Skeleton className="h-3.5 w-44" variant="slate" />
        <Skeleton className="h-8 w-36 rounded-xs" variant="sage" />
      </div>
    </div>
  );
};

/**
 * Skeleton Loader mirroring JourneyTimeline step pathway
 */
export const JourneyTimelineSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-[var(--background-secondary)]/90 rounded-sm space-y-6 shadow-xl">
      <div className="space-y-2 pb-3 border-b border-[var(--border-subtle)]/40">
        <Skeleton className="h-3 w-36" variant="sage" />
        <Skeleton className="h-7 w-64" variant="slate" />
      </div>

      <div className="space-y-6 relative pl-6 border-l border-[var(--border-subtle)]">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="relative space-y-2">
            <div className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#5C6B73]/40" />
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-44" variant="sage" />
              <Skeleton className="h-3.5 w-24" variant="slate" />
            </div>
            <Skeleton className="h-3.5 w-full" variant="slate" />
            <Skeleton className="h-3.5 w-3/4" variant="slate" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton Loader mirroring MessagePanel chat UI exactly
 */
export const MessagePanelSkeleton: React.FC = () => {
  return (
    <div className="bg-[var(--background-secondary)]/90 rounded-sm shadow-2xl h-[650px] flex flex-col md:flex-row overflow-hidden">
      {/* Sidebar Conversation List */}
      <div className="w-full md:w-80 border-r border-[var(--border-subtle)]/40 flex flex-col p-4 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-5 w-24" variant="slate" />
          <Skeleton className="h-3 w-20" variant="sage" />
        </div>
        <Skeleton className="h-9 w-full rounded-xs" variant="slate" />

        <div className="space-y-3 pt-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="p-3 bg-[var(--background-tertiary)]/50 rounded-sm flex items-center gap-3">
              <Skeleton className="w-9 h-9 rounded-full shrink-0" variant="sage" />
              <div className="space-y-1.5 flex-1">
                <Skeleton className="h-3.5 w-28" variant="sage" />
                <Skeleton className="h-2.5 w-36" variant="slate" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Chat Room */}
      <div className="flex-1 flex flex-col justify-between p-4 space-y-4">
        {/* Chat Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]/40">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" variant="sage" />
            <div className="space-y-1.5">
              <Skeleton className="h-4 w-36" variant="sage" />
              <Skeleton className="h-2.5 w-24" variant="slate" />
            </div>
          </div>
          <Skeleton className="h-5 w-24 rounded-xs" variant="slate" />
        </div>

        {/* Message Bubbles */}
        <div className="flex-1 space-y-4 py-4 overflow-hidden">
          <div className="flex gap-3 max-w-[80%]">
            <Skeleton className="w-7 h-7 rounded-full shrink-0" variant="sage" />
            <div className="p-3 bg-[var(--background-tertiary)]/70 rounded-md space-y-2 flex-1">
              <Skeleton className="h-3 w-32" variant="sage" />
              <Skeleton className="h-3.5 w-full" variant="slate" />
            </div>
          </div>

          <div className="flex gap-3 max-w-[80%] ml-auto justify-end">
            <div className="p-3 bg-[var(--accent-sage)]/15 rounded-md space-y-2 flex-1">
              <Skeleton className="h-3 w-20" variant="sage" />
              <Skeleton className="h-3.5 w-full" variant="sage" />
            </div>
          </div>

          <div className="flex gap-3 max-w-[80%]">
            <Skeleton className="w-7 h-7 rounded-full shrink-0" variant="sage" />
            <div className="p-3 bg-[var(--background-tertiary)]/70 rounded-md space-y-2 flex-1">
              <Skeleton className="h-3.5 w-3/4" variant="slate" />
            </div>
          </div>
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-subtle)]/40">
          <Skeleton className="w-9 h-9 rounded-xs shrink-0" variant="slate" />
          <Skeleton className="h-10 flex-1 rounded-xs" variant="slate" />
          <Skeleton className="h-10 w-20 rounded-xs shrink-0" variant="sage" />
        </div>
      </div>
    </div>
  );
};

/**
 * Skeleton Loader mirroring Data Tables (Users, Payments, Admin)
 */
export const TableSkeleton: React.FC<{ rows?: number }> = ({ rows = 4 }) => {
  return (
    <div className="p-5 bg-[var(--background-secondary)]/90 rounded-sm space-y-4 shadow-xl">
      {/* Table Header Row */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]/40 px-2">
        <Skeleton className="h-3.5 w-24" variant="sage" />
        <Skeleton className="h-3.5 w-32" variant="sage" />
        <Skeleton className="h-3.5 w-28 hidden sm:block" variant="sage" />
        <Skeleton className="h-3.5 w-28" variant="sage" />
        <Skeleton className="h-3.5 w-20" variant="sage" />
      </div>

      {/* Table Body Rows */}
      <div className="space-y-3">
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            className="p-3.5 bg-[var(--background-tertiary)]/40 rounded-xs flex items-center justify-between gap-4"
          >
            <Skeleton className="h-4 w-20" variant="slate" />
            <Skeleton className="h-4 w-36" variant="sage" />
            <Skeleton className="h-3.5 w-28 hidden sm:block" variant="slate" />
            <Skeleton className="h-3.5 w-32" variant="slate" />
            <Skeleton className="h-5 w-20 rounded-full" variant="sage" />
          </div>
        ))}
      </div>
    </div>
  );
};

/**
 * Skeleton Loader mirroring Admin Consultant Verification Card
 */
export const VerificationCardSkeleton: React.FC = () => {
  return (
    <div className="p-6 bg-[var(--background-secondary)]/90 rounded-sm space-y-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]/40">
        <div className="space-y-2">
          <Skeleton className="h-6 w-48" variant="sage" />
          <Skeleton className="h-3.5 w-56" variant="slate" />
        </div>
        <Skeleton className="h-5 w-24 rounded-full" variant="sage" />
      </div>

      <div className="p-4 bg-[var(--background-tertiary)]/50 rounded-sm space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-3 w-32" variant="slate" />
          <Skeleton className="h-3 w-28" variant="sage" />
        </div>
        <Skeleton className="h-3.5 w-full" variant="slate" />
      </div>

      <div className="flex flex-wrap gap-3 pt-2">
        <Skeleton className="h-9 w-36 rounded-xs" variant="sage" />
        <Skeleton className="h-9 w-36 rounded-xs" variant="slate" />
        <Skeleton className="h-9 w-36 rounded-xs" variant="slate" />
      </div>
    </div>
  );
};

/**
 * Skeleton Loader mirroring Notification items in NotificationsPage
 */
export const NotificationItemSkeleton: React.FC = () => {
  return (
    <div className="p-4 bg-[var(--background-secondary)]/90 rounded-sm space-y-3 shadow-md">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="w-6 h-6 rounded-xs shrink-0" variant="sage" />
          <Skeleton className="h-5 w-24 rounded-xs" variant="sage" />
          <Skeleton className="h-4 w-16 rounded-full" variant="slate" />
        </div>
        <Skeleton className="h-3 w-20" variant="slate" />
      </div>

      <div className="space-y-1.5 pl-8">
        <Skeleton className="h-4 w-3/4" variant="sage" />
        <Skeleton className="h-3.5 w-full" variant="slate" />
      </div>

      <div className="pt-2 flex items-center justify-between gap-3 pl-8">
        <Skeleton className="h-3 w-32" variant="slate" />
        <Skeleton className="h-7 w-28 rounded-xs" variant="sage" />
      </div>
    </div>
  );
};

/**
 * Generic Widget / Chart Skeleton Container
 */
export const WidgetSkeleton: React.FC<{ heightClass?: string }> = ({
  heightClass = 'h-48'
}) => {
  return (
    <div className="p-6 bg-[var(--background-secondary)]/90 rounded-sm space-y-4 shadow-xl">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--border-subtle)]/40">
        <Skeleton className="h-5 w-48" variant="sage" />
        <Skeleton className="h-3 w-20" variant="slate" />
      </div>

      <div className={`w-full bg-[var(--background-tertiary)]/40 rounded-sm flex items-center justify-center p-4 ${heightClass}`}>
        <Skeleton className="h-full w-full rounded-xs" variant="shimmer" />
      </div>
    </div>
  );
};
