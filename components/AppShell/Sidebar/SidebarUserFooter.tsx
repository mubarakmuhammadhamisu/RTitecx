'use client';

import Link from 'next/link';
import Image from 'next/image';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

/**
 * SidebarUserFooter — the bottom-of-sidebar user avatar/name/email card
 * plus the logout button.
 *
 * Single Responsibility: render signed-in user identity + sign-out
 * action only. Does not handle nav items or shell animation.
 */
export default function SidebarUserFooter() {
  const { user, logout } = useAuth();

  return (
    <div className="pt-4 mt-4 border-t border-brand-indigo-500/10 space-y-3">
      {user && (
        <Link href="/dashboard/profile" className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 bg-gradient-cta flex items-center justify-center text-xs font-bold text-white">
            {user.avatarUrl ? (
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={32}
                height={32}
                className="w-full h-full object-cover"
              />
            ) : (
              user.avatar
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-text-primary truncate">
              {user.name.split(' ')[0]}
            </p>
            <p className="text-xs text-text-faint truncate">{user.email}</p>
          </div>
        </Link>
      )}
      <button
        onClick={logout}
        className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-text-muted hover:text-danger hover:bg-danger/10 transition text-sm font-medium"
      >
        <LogOut size={16} />
        Log out
      </button>
    </div>
  );
}
