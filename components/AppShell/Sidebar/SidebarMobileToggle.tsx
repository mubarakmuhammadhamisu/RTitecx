'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

/**
 * SidebarMobileToggle — the fixed hamburger button (mobile only) and its
 * dark overlay when the sidebar is open.
 *
 * Single Responsibility: mobile open/close UI affordance only. The
 * sidebar's actual slide animation lives in SidebarShell.tsx, which owns
 * the `isOpen` state and passes it down here.
 */
interface SidebarMobileToggleProps {
  isOpen: boolean;
  onToggle: () => void;
  onOverlayClick: () => void;
}

export default function SidebarMobileToggle({
  isOpen,
  onToggle,
  onOverlayClick,
}: SidebarMobileToggleProps) {
  return (
    <>
      <button
        onClick={onToggle}
        className="md:hidden fixed top-5 right-5 z-50 p-2 rounded-xl bg-surface-900 border border-brand-indigo-500/30 hover:border-brand-indigo-500/60 transition"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onOverlayClick}
            className="md:hidden fixed inset-0 bg-black/60 z-30"
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  );
}
