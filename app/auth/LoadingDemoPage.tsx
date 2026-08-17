import { DashboardShell } from '@/components/dashboard/DashboardShell';
import React from 'react';

export const LoadingDemoPage: React.FC = () => {
  return (
    <DashboardShell
      title="System Skeleton Loading States"
      description="Preview of RehabConnect reusable loading skeletons and progress spinners."
      breadcrumbs={[{ label: 'System' }, { label: 'Loading States' }]}
    >
      <div className="space-y-8 animate-pulse">
        {/* KPI Skeleton cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-3">
              <div className="flex justify-between items-center">
                <div className="w-24 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
                <div className="w-8 h-8 bg-slate-200 dark:bg-slate-800 rounded-xl" />
              </div>
              <div className="w-32 h-7 bg-slate-200 dark:bg-slate-800 rounded" />
              <div className="w-20 h-3 bg-slate-200 dark:bg-slate-800 rounded" />
            </div>
          ))}
        </div>

        {/* Skeleton Table */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4">
          <div className="flex justify-between items-center">
            <div className="w-40 h-5 bg-slate-200 dark:bg-slate-800 rounded" />
            <div className="w-24 h-8 bg-slate-200 dark:bg-slate-800 rounded-full" />
          </div>
          <div className="space-y-3 pt-2">
            {[1, 2, 3, 4, 5].map((row) => (
              <div key={row} className="flex items-center justify-between py-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
                  <div className="space-y-1.5">
                    <div className="w-32 h-3.5 bg-slate-200 dark:bg-slate-800 rounded" />
                    <div className="w-24 h-2.5 bg-slate-200 dark:bg-slate-800 rounded" />
                  </div>
                </div>
                <div className="w-20 h-4 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <div className="w-16 h-4 bg-slate-200 dark:bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardShell>
  );
};
