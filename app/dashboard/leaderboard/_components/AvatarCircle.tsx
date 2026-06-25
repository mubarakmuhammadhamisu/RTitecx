import Image from 'next/image';
import type { LeaderboardDisplayEntry } from '@/lib/leaderboard/leaderboardTypes';

/**
 * AvatarCircle — circular avatar with size variants and an optional
 * gold highlight ring (used for #1 podium position).
 * Single Responsibility: this one avatar element only.
 */
interface AvatarCircleProps {
  entry: LeaderboardDisplayEntry;
  size?: 'sm' | 'md' | 'lg';
  highlight?: boolean;
}

const SIZE_PX: Record<NonNullable<AvatarCircleProps['size']>, number> = { sm: 36, md: 44, lg: 80 };

export default function AvatarCircle({ entry, size = 'md', highlight = false }: AvatarCircleProps) {
  const dims = size === 'lg' ? 'w-20 h-20 text-2xl' : size === 'md' ? 'w-11 h-11 text-sm' : 'w-9 h-9 text-xs';
  const border = highlight ? 'border-2 border-warning/60' : 'border-2 border-brand-indigo-500/30';
  const px = SIZE_PX[size];

  return (
    <div className={`${dims} ${border} rounded-full overflow-hidden bg-linear-to-br from-brand-indigo-600 to-brand-purple-700 flex items-center justify-center font-bold text-white shrink-0`}>
      {entry.avatarUrl ? (
        <Image src={entry.avatarUrl} alt={entry.name} width={px} height={px} className="w-full h-full object-cover" />
      ) : (
        <span>{entry.avatar || entry.name.slice(0, 2).toUpperCase()}</span>
      )}
    </div>
  );
}
