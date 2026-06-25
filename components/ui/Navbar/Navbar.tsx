'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import TitecxForgeLogo from '../TitecxForgeLogo';
import MobileMenu from '../MobileMenu/MobileMenu';
import NavbarDesktopLinks from './NavbarDesktopLinks';

/**
 * Navbar — the sticky top header for all public-site pages.
 * Single Responsibility: shell composition only (logo + desktop links +
 * mobile menu). Hides itself entirely on /dashboard routes, where
 * AppShell's sidebar takes over navigation.
 */
export default function Navbar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const isDashboard = pathname.startsWith('/dashboard');
  if (isDashboard) return null;

  return (
    <header className="sticky top-0 z-50 bg-surface-950/80 backdrop-blur border-b border-glass-border">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link
          href={user ? '/dashboard' : '/'}
          className="text-2xl font-bold text-text-primary hover:text-brand-indigo-300 transition flex items-center"
        >
          <Image src="/titecx_logo.png" width={30} height={15} alt="Titecx logo" className="m-3" />
          <TitecxForgeLogo />
        </Link>

        <NavbarDesktopLinks user={user} />

        <MobileMenu />
      </div>
    </header>
  );
}
