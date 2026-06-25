'use client';

import React, { createContext, useContext, useRef, useState } from 'react';

/**
 * context/ProgressToastContext.tsx
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the bottom-right error toast shown when a
 * mark-lesson-complete (or other progress) write fails. Originally lived
 * inside AuthContext; extracted because it has nothing to do with
 * session/profile state and was causing every progress-related toast to
 * also be entangled with auth re-renders.
 */
interface ProgressToastContextValue {
  progressSaveError: string | null;
  showProgressError: (message: string) => void;
  clearProgressSaveError: () => void;
}

const ProgressToastContext = createContext<ProgressToastContextValue | null>(null);

const TOAST_DURATION_MS = 5000;

export function ProgressToastProvider({ children }: { children: React.ReactNode }) {
  const [progressSaveError, setProgressSaveError] = useState<string | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearProgressSaveError = () => {
    setProgressSaveError(null);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
      toastTimerRef.current = null;
    }
  };

  const showProgressError = (message: string) => {
    setProgressSaveError(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setProgressSaveError(null);
      toastTimerRef.current = null;
    }, TOAST_DURATION_MS);
  };

  return (
    <ProgressToastContext.Provider
      value={{ progressSaveError, showProgressError, clearProgressSaveError }}
    >
      {children}
    </ProgressToastContext.Provider>
  );
}

export function useProgressToast(): ProgressToastContextValue {
  const ctx = useContext(ProgressToastContext);
  if (!ctx) throw new Error('useProgressToast must be used inside <ProgressToastProvider>');
  return ctx;
}
