import { Trophy } from 'lucide-react';
import type { LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * LeaderboardEmptyState — shown when a board has zero participants.
 * Single Responsibility: this one empty state only.
 */
export default function LeaderboardEmptyState({ tab }: { tab: LeaderboardTab }) {
  return (
    <div className="py-16 text-center text-text-faint space-y-2 rounded-2xl bg-surface-900/60 border border-brand-indigo-500/20">
      <Trophy size={40} className="mx-auto opacity-30" />
      <p className="text-sm">No participants yet on the {tab === 'credits' ? 'Credits' : 'Learning'} Board.</p>
      <p className="text-xs">
        {tab === 'credits'
          ? 'Refer a friend to earn your first credits and claim the top spot.'
          : 'Start any course to be the first on the Learning Board.'}
      </p>
    </div>
  );
}
