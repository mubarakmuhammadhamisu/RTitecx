import Link from 'next/link';
import { LayoutDashboard, BookOpen, LogOut } from 'lucide-react';

/**
 * MobileMenuUserLinks — nav links shown when the user IS logged in.
 * Single Responsibility: authenticated-state link list + logout action.
 */
interface MobileMenuUserLinksProps {
  onLinkClick: () => void;
  onLogout: () => void;
}

export default function MobileMenuUserLinks({ onLinkClick, onLogout }: MobileMenuUserLinksProps) {
  return (
    <>
      <Link
        href="/dashboard"
        onClick={onLinkClick}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-surface-800/60 text-text-secondary hover:text-text-primary transition"
      >
        <LayoutDashboard size={16} className="text-brand-indigo-400" />
        Dashboard
      </Link>
      <Link
        href="/dashboard/my-courses"
        onClick={onLinkClick}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-surface-800/60 text-text-secondary hover:text-text-primary transition"
      >
        <BookOpen size={16} className="text-brand-indigo-400" />
        My Courses
      </Link>
      <div className="my-2 border-t border-glass-border" />
      <button
        onClick={onLogout}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl hover:bg-danger/10 text-text-muted hover:text-danger transition w-full text-left"
      >
        <LogOut size={16} />
        Log out
      </button>
    </>
  );
}
