import { ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * LeaderboardPagination — prev/next page controls.
 * Single Responsibility: this one control bar only.
 */
interface LeaderboardPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function LeaderboardPagination({ page, totalPages, onPageChange }: LeaderboardPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-surface-900 border border-brand-indigo-500/20 text-text-secondary hover:text-text-primary hover:border-brand-indigo-500/50 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={15} /> Prev
      </button>
      <span className="text-sm text-text-faint">
        Page <span className="text-text-primary font-semibold">{page}</span> of{' '}
        <span className="text-text-primary font-semibold">{totalPages}</span>
      </span>
      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page >= totalPages}
        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-surface-900 border border-brand-indigo-500/20 text-text-secondary hover:text-text-primary hover:border-brand-indigo-500/50 text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        Next <ChevronRight size={15} />
      </button>
    </div>
  );
}
