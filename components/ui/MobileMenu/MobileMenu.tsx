'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import MobileMenuToggle from './MobileMenuToggle';
import MobileMenuPanel from './MobileMenuPanel';
import MobileMenuGuestLinks from './MobileMenuGuestLinks';
import MobileMenuUserLinks from './MobileMenuUserLinks';

/**
 * MobileMenu — composes the toggle button, panel shell, and the correct
 * link set (guest vs. authenticated) based on AuthContext.
 *
 * Single Responsibility: own the ONE piece of shared state (open/closed)
 * and decide which link-set to render. Everything else is delegated to
 * dedicated single-responsibility files.
 */
export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();

  const close = () => setIsOpen(false);

  const handleLogout = async () => {
    close();
    await logout();
  };

  return (
    <div className="relative">
      <MobileMenuToggle onClick={() => setIsOpen((v) => !v)} />
      {isOpen && (
        <MobileMenuPanel onBackdropClick={close}>
          {user ? (
            <MobileMenuUserLinks onLinkClick={close} onLogout={handleLogout} />
          ) : (
            <MobileMenuGuestLinks onLinkClick={close} />
          )}
        </MobileMenuPanel>
      )}
    </div>
  );
}
