import React from 'react';

/**
 * MobileMenuPanel — the backdrop + slide-down panel shell.
 * Single Responsibility: panel chrome only. Nav content (guest/user
 * link sets) is passed in as children, not owned by this component.
 */
interface MobileMenuPanelProps {
  onBackdropClick: () => void;
  children: React.ReactNode;
}

export default function MobileMenuPanel({ onBackdropClick, children }: MobileMenuPanelProps) {
  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onBackdropClick}
        aria-hidden="true"
      />
      <div className="absolute left-0 top-16 w-full bg-surface-950 border-t border-glass-border z-50">
        <nav className="flex flex-col gap-1 p-6 text-sm">{children}</nav>
      </div>
    </>
  );
}
