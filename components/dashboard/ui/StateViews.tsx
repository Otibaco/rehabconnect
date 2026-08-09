import React from 'react';
import { FolderOpen, Loader2, AlertOctagon } from 'lucide-react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionLink?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionLink,
  onAction
}) => {
  return (
    <div className="p-12 bg-[var(--background-secondary)] border border-[var(--border)] rounded-sm text-center space-y-4 font-sans max-w-lg mx-auto shadow-xl crosshair-corner">
      <div className="w-12 h-12 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--gold)] rounded-sm flex items-center justify-center mx-auto">
        <FolderOpen className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h3 className="font-cinzel text-xl font-bold text-[var(--foreground)]">{title}</h3>
        <p className="text-xs text-[var(--foreground-muted)] leading-relaxed">{description}</p>
      </div>

      {actionText && actionLink && (
        <Link
          href={actionLink}
          className="inline-block px-6 py-3 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors mt-2"
        >
          {actionText}
        </Link>
      )}

      {actionText && onAction && !actionLink && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-[var(--gold)] text-[#080907] font-mono text-xs font-bold rounded-sm hover:bg-[var(--gold-light)] transition-colors mt-2"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading secure clinical data...' }) => {
  return (
    <div className="py-20 text-center space-y-3 font-mono text-xs text-[var(--gold)]">
      <Loader2 className="w-8 h-8 animate-spin mx-auto text-[var(--gold)]" />
      <span>{message.toUpperCase()}</span>
    </div>
  );
};

export const ErrorState: React.FC<{ message?: string; onRetry?: () => void }> = ({
  message = 'An unexpected error occurred while loading this section.',
  onRetry
}) => {
  return (
    <div className="p-8 bg-[var(--accent-terracotta)]/10 border border-[var(--accent-terracotta)]/40 rounded-sm text-center space-y-4 font-sans max-w-md mx-auto">
      <AlertOctagon className="w-8 h-8 text-[var(--accent-terracotta)] mx-auto" />
      <h3 className="font-cinzel text-lg font-bold text-[var(--foreground)]">SYSTEM NOTICE</h3>
      <p className="text-xs text-[var(--foreground-muted)]">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2.5 bg-[var(--background-tertiary)] border border-[var(--border-subtle)] text-[var(--foreground)] font-mono text-xs font-bold rounded-sm hover:border-[var(--gold)]"
        >
          RETRY REQUEST
        </button>
      )}
    </div>
  );
};
