import { Zap, BookOpen } from 'lucide-react';
import RankBadge from './RankBadge';
import AvatarCircle from './AvatarCircle';
import type { LeaderboardDisplayEntry, LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * RankingsRow — one row in the rankings list, highlighted if it's the
 * current user. Single Responsibility: this one row only.
 */
interface RankingsRowProps {
  entry: LeaderboardDisplayEntry;
  tab: LeaderboardTab;
  isCurrentUser: boolean;
}

export default function RankingsRow({ entry, tab, isCurrentUser }: RankingsRowProps) {
  const tabIcon =
    tab === 'credits' ? (
      <Zap size={13} className="text-warning shrink-0" />
    ) : (
      <BookOpen size={13} className="text-success shrink-0" />
    );
  const tabPtLabel = tab === 'credits' ? 'pts' : 'lp';

  return (
    <div
      className={`flex items-center gap-4 px-5 py-4 transition ${
        isCurrentUser ? 'bg-brand-indigo-500/10 border-l-2 border-l-brand-indigo-400' : 'hover:bg-brand-indigo-500/5'
      }`}
    >
      <RankBadge rank={entry.rank} />
      <AvatarCircle entry={entry} size="sm" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-text-primary text-sm truncate">
          {entry.name}
          {isCurrentUser && <span className="ml-2 text-xs text-brand-indigo-400 font-normal">(you)</span>}
        </p>
        <p className="text-xs text-text-faint">
          {entry.coursesCompleted} course{entry.coursesCompleted !== 1 ? 's' : ''} completed
          {tab === 'learning' && entry.coursesInProgress ? ` · ${entry.coursesInProgress} in progress` : ''}
        </p>
      </div>
      <div
        className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shrink-0 ${
          tab === 'credits'
            ? 'bg-brand-indigo-500/10 border-brand-indigo-500/20 text-brand-indigo-300'
            : 'bg-success/10 border-success/20 text-success'
        }`}
      >
        {tabIcon}
        {entry.points.toLocaleString()} {tabPtLabel}
      </div>
    </div>
  );
}
