import { Star } from 'lucide-react';
import RankingsRow from './RankingsRow';
import type { LeaderboardDisplayEntry, LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * RankingsList — the list of entries below the podium (or the full
 * list, on pages beyond 1). Single Responsibility: this one list only;
 * row rendering delegated to RankingsRow.
 */
interface RankingsListProps {
  entries: LeaderboardDisplayEntry[];
  showHeading: boolean;
  tab: LeaderboardTab;
  currentUserId: string | undefined;
}

export default function RankingsList({ entries, showHeading, tab, currentUserId }: RankingsListProps) {
  return (
    <div className="space-y-2">
      {showHeading && (
        <h2 className="text-xs font-semibold text-text-faint uppercase tracking-widest flex items-center gap-2">
          <Star size={13} /> Rankings
        </h2>
      )}
      <div className="rounded-2xl bg-surface-900/60 border border-brand-indigo-500/20 overflow-hidden divide-y divide-brand-indigo-500/10">
        {entries.map((entry) => (
          <RankingsRow key={entry.id} entry={entry} tab={tab} isCurrentUser={entry.id === currentUserId} />
        ))}
      </div>
    </div>
  );
}
