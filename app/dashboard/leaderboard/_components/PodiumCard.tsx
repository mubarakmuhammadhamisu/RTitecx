import { Zap, BookOpen } from 'lucide-react';
import AvatarCircle from './AvatarCircle';
import type { LeaderboardDisplayEntry, LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * PodiumCard — one top-3 podium card. Single Responsibility: this one
 * card only.
 */
interface PodiumCardProps {
  entry: LeaderboardDisplayEntry;
  medalColor: string;
  borderColor: string;
  tab: LeaderboardTab;
}

export default function PodiumCard({ entry, medalColor, borderColor, tab }: PodiumCardProps) {
  return (
    <div className={`flex-1 rounded-2xl bg-linear-to-br from-surface-900 to-surface-800/60 border ${borderColor} p-5 flex flex-col items-center gap-3 text-center`}>
      <AvatarCircle entry={entry} size="lg" highlight={entry.rank === 1} />
      <p className="font-bold text-text-primary text-sm leading-tight truncate w-full">{entry.name}</p>
      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${medalColor}`}>
        {tab === 'credits' ? <Zap size={11} /> : <BookOpen size={11} />}
        {entry.points.toLocaleString()} pts
      </div>
      <p className="text-xs text-text-faint">
        {entry.coursesCompleted} course{entry.coursesCompleted !== 1 ? 's' : ''} done
        {tab === 'learning' && entry.coursesInProgress ? ` · ${entry.coursesInProgress} in progress` : ''}
      </p>
      <span className="text-3xl mt-1">{entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}</span>
    </div>
  );
}
