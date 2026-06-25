/**
 * RankBadge — medal emoji for ranks 1-3, numbered circle otherwise.
 * Single Responsibility: this one badge element only.
 */
export default function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="text-2xl">🥇</span>;
  if (rank === 2) return <span className="text-2xl">🥈</span>;
  if (rank === 3) return <span className="text-2xl">🥉</span>;
  return (
    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-800 border border-brand-indigo-500/20 text-text-muted text-sm font-bold shrink-0">
      {rank}
    </span>
  );
}
