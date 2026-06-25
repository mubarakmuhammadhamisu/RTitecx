import { Crown, Zap, BookOpen } from 'lucide-react';
import type { LeaderboardTab, MyRankData } from '@/lib/leaderboard/leaderboardTypes';

/**
 * YourStatusRankedState — shown when the student has a confirmed rank.
 * Single Responsibility: this one state only.
 */
export default function YourStatusRankedState({ myRank, tab }: { myRank: MyRankData; tab: LeaderboardTab }) {
  const icon =
    tab === 'credits' ? (
      <Zap size={14} className="text-warning" />
    ) : (
      <BookOpen size={14} className="text-success" />
    );
  const label = tab === 'credits' ? 'lifetime credit pts' : 'learning pts';

  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-brand-indigo-500/10 border border-brand-indigo-500/30">
      <Crown size={18} className="text-warning shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">Your position</p>
        <p className="text-xs text-text-muted flex items-center gap-1">
          {icon}
          {myRank.points.toLocaleString()} {label} · out of {myRank.total.toLocaleString()} participants
        </p>
      </div>
      <div className="text-2xl font-black text-brand-indigo-300 shrink-0">#{myRank.rank}</div>
    </div>
  );
}
