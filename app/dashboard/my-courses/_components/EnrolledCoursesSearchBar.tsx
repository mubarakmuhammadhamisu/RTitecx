import { Search } from 'lucide-react';
import type { FilterStatus } from '@/lib/courses/courseTypes';

/**
 * EnrolledCoursesSearchBar — the search input + filter pills above the
 * enrolled courses grid. Single Responsibility: this one toolbar only.
 */
interface EnrolledCoursesSearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
}

const FILTERS: { label: string; value: FilterStatus }[] = [
  { label: 'All', value: 'all' },
  { label: 'In Progress', value: 'in-progress' },
  { label: 'Completed', value: 'completed' },
];

export default function EnrolledCoursesSearchBar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
}: EnrolledCoursesSearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      <div className="relative flex-1">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-faint" />
        <input
          type="text"
          placeholder="Search your courses..."
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-surface-900 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-brand-indigo-500/50 transition"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {FILTERS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition border ${
              filter === value
                ? 'bg-brand-indigo-600 border-brand-indigo-500 text-white'
                : 'bg-surface-900 border-brand-indigo-500/20 text-text-muted hover:text-text-primary hover:border-brand-indigo-500/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
