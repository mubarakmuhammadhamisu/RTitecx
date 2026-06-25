import Link from 'next/link';

/**
 * MobileMenuGuestLinks — nav links shown when the user is NOT logged in.
 * Single Responsibility: guest-state link list only.
 */
interface MobileMenuGuestLinksProps {
  onLinkClick: () => void;
}

export default function MobileMenuGuestLinks({ onLinkClick }: MobileMenuGuestLinksProps) {
  return (
    <>
      <Link
        href="/courses"
        onClick={onLinkClick}
        className="px-3 py-2.5 rounded-xl hover:bg-surface-800/60 text-text-secondary hover:text-text-primary transition"
      >
        Courses
      </Link>
      <Link
        href="/about"
        onClick={onLinkClick}
        className="px-3 py-2.5 rounded-xl hover:bg-surface-800/60 text-text-secondary hover:text-text-primary transition"
      >
        About
      </Link>
      <div className="my-2 border-t border-glass-border" />
      <Link
        href="/login"
        onClick={onLinkClick}
        className="px-3 py-2.5 rounded-xl hover:bg-surface-800/60 text-text-secondary hover:text-text-primary transition"
      >
        Login
      </Link>
      <Link
        href="/register"
        onClick={onLinkClick}
        className="mt-1 rounded-xl bg-gradient-cta px-4 py-2.5 text-center text-white font-semibold"
      >
        Get Started
      </Link>
    </>
  );
}
