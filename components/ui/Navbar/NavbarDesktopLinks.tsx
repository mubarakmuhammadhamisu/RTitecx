import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * NavbarDesktopLinks — the desktop (md+) nav link set, switching between
 * guest and authenticated states.
 * Single Responsibility: desktop nav links only.
 */
interface NavbarDesktopLinksProps {
  user: AppUser | null;
}

export default function NavbarDesktopLinks({ user }: NavbarDesktopLinksProps) {
  return (
    <nav className="hidden md:flex items-center gap-6 text-sm text-text-secondary">
      {!user && (
        <>
          <Link href="/courses" className="hover:text-text-primary transition">
            Courses
          </Link>
          <Link href="/about" className="hover:text-text-primary transition">
            About
          </Link>
        </>
      )}

      {user ? (
        <Link
          href="/dashboard"
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-cta text-white font-semibold shadow-lg hover:opacity-90 transition"
        >
          <LayoutDashboard size={15} />
          Dashboard
        </Link>
      ) : (
        <>
          <Link href="/login" className="hover:text-text-primary transition">
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 rounded-xl bg-gradient-cta text-white font-semibold shadow-lg hover:opacity-90 transition"
          >
            Get Started
          </Link>
        </>
      )}
    </nav>
  );
}
