import { Users, RefreshCw } from 'lucide-react';
import type { LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * ParticipantsStatsBar — "N participants on the X Board" line with a
 * spinning refresh indicator while loading. Single Responsibility: this
 * one bar only.
 */
interface ParticipantsStatsBarProps {
  total: number | undefined;
  tab: LeaderboardTab;
  loading: boolean;
}

export default function ParticipantsStatsBar({ total, tab, loading }: ParticipantsStatsBarProps) {
  return (
    <div className="flex items-center gap-2 text-sm text-text-faint">
      <Users size={14} className="text-brand-indigo-400" />
      <span>
        <span className="text-text-primary font-semibold">{total?.toLocaleString() ?? '—'}</span> participants on
        the {tab === 'credits' ? 'Credits' : 'Learning'} Board
      </span>
      {loading && <RefreshCw size={13} className="ml-2 animate-spin text-text-faint" />}
    </div>
  );
}
