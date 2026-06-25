/**
 * YourStatusLoadingState — skeleton shown while my-rank is loading.
 * Single Responsibility: this one state only.
 */
export default function YourStatusLoadingState() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-brand-indigo-500/10 border border-brand-indigo-500/30 animate-pulse">
      <div className="w-5 h-5 rounded-full bg-surface-700 shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="h-3 bg-surface-700 rounded w-1/4" />
        <div className="h-2.5 bg-surface-700/60 rounded w-1/3" />
      </div>
      <div className="h-7 w-14 bg-surface-700 rounded-lg" />
    </div>
  );
}
