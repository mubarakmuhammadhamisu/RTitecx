'use client';

import { AlertCircle, X } from 'lucide-react';
import { useProgressToast } from '@/context/ProgressToastContext';

/**
 * ProgressSaveToast — the bottom-right error toast shown when a
 * mark-lesson-complete write fails.
 *
 * Single Responsibility: render and dismiss this one toast. Reads from
 * ProgressToastContext (not AuthContext — that mixing was the original
 * codebase's design, intentionally split apart in this rewrite).
 */
export default function ProgressSaveToast() {
  const { progressSaveError, clearProgressSaveError } = useProgressToast();

  if (!progressSaveError) return null;

  return (
    <div
      role="alert"
      className="fixed bottom-6 right-6 z-50 flex items-start gap-3
        px-4 py-3 rounded-xl max-w-sm
        bg-surface-900 border border-danger/40
        shadow-2xl shadow-danger/10 text-sm text-danger
        toast-animate"
    >
      <AlertCircle size={16} className="shrink-0 mt-0.5" />
      <span className="flex-1 leading-snug">{progressSaveError}</span>
      <button
        onClick={clearProgressSaveError}
        className="text-text-faint hover:text-text-secondary transition shrink-0 -mr-1"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
    </div>
  );
}
