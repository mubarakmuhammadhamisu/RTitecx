import { Home, BookOpen, User, BarChart3, Award, Trophy, Zap, type LucideIcon } from 'lucide-react';

/**
 * sidebarNavItems.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the dashboard sidebar's nav item DATA only.
 * No rendering logic lives here — see SidebarNavList.tsx for that.
 */
export interface SidebarNavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const sidebarNavItems: SidebarNavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/dashboard/my-courses', label: 'My Courses', icon: BookOpen },
  { href: '/dashboard/progress', label: 'Progress', icon: BarChart3 },
  { href: '/dashboard/achievements', label: 'Achievements', icon: Award },
  { href: '/dashboard/leaderboard', label: 'Credits Leaderboard', icon: Trophy },
  { href: '/dashboard/referral', label: 'Referrals & Points', icon: Zap },
  { href: '/dashboard/profile', label: 'Profile', icon: User },
];
