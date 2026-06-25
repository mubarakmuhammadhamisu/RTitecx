'use client';

import React, { useEffect } from 'react';
import { useProgressToast } from '@/context/ProgressToastContext';
import SidebarShell from './Sidebar/SidebarShell';
import ProgressSaveToast from './ProgressSaveToast';

/**
 * AppShellLayout — the outer dashboard shell: max-width container,
 * sidebar slot, main content slot.
 *
 * Single Responsibility: layout composition only. Sidebar internals
 * live in Sidebar/SidebarShell.tsx; the error toast lives in
 * ProgressSaveToast.tsx. This file just arranges them.
 */
interface AppShellLayoutProps {
  children: React.ReactNode;
}

export default function AppShellLayout({ children }: AppShellLayoutProps) {
  const { clearProgressSaveError } = useProgressToast();

  // Clear any stale toast when navigating away from the page that raised it.
  useEffect(() => {
    return () => clearProgressSaveError();
    // clearProgressSaveError is a stable function reference — safe to omit from deps.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-surface-950">
      <div className="max-w-[1440px] mx-auto min-h-screen flex gap-4 p-4 md:p-6 lg:gap-6">
        <SidebarShell />
        <main className="flex-1 overflow-y-auto min-w-0">{children}</main>
      </div>
      <ProgressSaveToast />
    </div>
  );
}
