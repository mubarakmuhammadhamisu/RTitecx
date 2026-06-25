'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { sidebarNavItems } from './sidebarNavItems';

/**
 * SidebarNavList — renders the nav items and the animated active-state
 * pill indicator.
 *
 * Single Responsibility: nav list rendering only. Item data lives in
 * sidebarNavItems.ts; the surrounding sidebar shell/animation lives in
 * SidebarShell.tsx.
 */
interface SidebarNavListProps {
  onItemClick?: () => void;
}

export default function SidebarNavList({ onItemClick }: SidebarNavListProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/dashboard' ? pathname === '/dashboard' : pathname.startsWith(href);

  return (
    <nav className="space-y-1 flex-1">
      {sidebarNavItems.map(({ href, label, icon: Icon }) => {
        const active = isActive(href);
        return (
          <Link key={href} href={href} onClick={onItemClick}>
            <motion.div
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition relative
                ${active ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary hover:bg-surface-800/50'}`}
              whileHover={{ x: 3 }}
              whileTap={{ scale: 0.97 }}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-2xl bg-linear-to-r from-brand-indigo-500/10 to-brand-purple-500/10 border border-brand-indigo-500/30 -z-10"
                  transition={{ type: 'spring', damping: 22 }}
                />
              )}
              <Icon size={18} className={active ? 'text-brand-indigo-400' : ''} />
              <span className="font-medium text-sm">{label}</span>
              {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-brand-indigo-400" />}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
}
