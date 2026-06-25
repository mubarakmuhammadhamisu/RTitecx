import { Medal } from 'lucide-react';
import PodiumCard from './PodiumCard';
import type { LeaderboardDisplayEntry, LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * PodiumSection — top-3 podium, with distinct mobile (1st full-width,
 * 2nd/3rd side-by-side) and desktop (classic 2nd-1st-3rd order) layouts.
 * Single Responsibility: this one section only.
 */
export default function PodiumSection({ top3, tab }: { top3: LeaderboardDisplayEntry[]; tab: LeaderboardTab }) {
  if (top3.length < 3) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-semibold text-text-faint uppercase tracking-widest flex items-center gap-2">
        <Medal size={13} /> Top 3
      </h2>
      <div className="md:hidden space-y-3">
        <PodiumCard entry={top3[0]} tab={tab} borderColor="border-warning/40" medalColor="bg-warning/20 text-warning border border-warning/30" />
        <div className="flex gap-3">
          <PodiumCard entry={top3[1]} tab={tab} borderColor="border-surface-600/60" medalColor="bg-surface-600/30 text-text-secondary border border-surface-600/40" />
          <PodiumCard entry={top3[2]} tab={tab} borderColor="border-bronze/40" medalColor="bg-bronze/20 text-bronze border border-bronze/30" />
        </div>
      </div>
      <div className="hidden md:flex gap-3 items-end">
        <PodiumCard entry={top3[1]} tab={tab} borderColor="border-surface-600/60" medalColor="bg-surface-600/30 text-text-secondary border border-surface-600/40" />
        <PodiumCard entry={top3[0]} tab={tab} borderColor="border-warning/40" medalColor="bg-warning/20 text-warning border border-warning/30" />
        <PodiumCard entry={top3[2]} tab={tab} borderColor="border-bronze/40" medalColor="bg-bronze/20 text-bronze border border-bronze/30" />
      </div>
    </div>
  );
}
