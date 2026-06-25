/**
 * LeaderboardLoadingSkeleton — 8-row pulse skeleton shown while a page
 * is loading. Single Responsibility: this one skeleton only.
 */
export default function LeaderboardLoadingSkeleton() {
  return (
    <div className="rounded-2xl bg-surface-900/60 border border-brand-indigo-500/20 overflow-hidden divide-y divide-brand-indigo-500/10">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 px-5 py-4 animate-pulse">
          <div className="w-8 h-8 rounded-full bg-surface-800" />
          <div className="w-9 h-9 rounded-full bg-surface-800" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-surface-800 rounded w-1/3" />
            <div className="h-2.5 bg-surface-800/60 rounded w-1/5" />
          </div>
          <div className="h-6 w-20 bg-surface-800 rounded-full" />
        </div>
      ))}
    </div>
  );
}
