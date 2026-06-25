import EnrolledCoursesSearchBar from './EnrolledCoursesSearchBar';
import EnrolledCourseCard from './EnrolledCourseCard';
import NoSearchResultsState from './NoSearchResultsState';
import type { EnrolledCourse, FilterStatus } from '@/lib/courses/courseTypes';

/**
 * EnrolledCoursesSection — search/filter bar + paginated enrolled
 * course grid + "Load More" button. Single Responsibility: section
 * composition; individual pieces (search bar, card, empty state) are
 * delegated to their own files.
 */
interface EnrolledCoursesSectionProps {
  search: string;
  onSearchChange: (value: string) => void;
  filter: FilterStatus;
  onFilterChange: (filter: FilterStatus) => void;
  paginated: EnrolledCourse[];
  totalFiltered: number;
  hasMore: boolean;
  onLoadMore: () => void;
}

export default function EnrolledCoursesSection({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  paginated,
  totalFiltered,
  hasMore,
  onLoadMore,
}: EnrolledCoursesSectionProps) {
  return (
    <section>
      <h2 className="text-xl font-bold text-text-primary mb-4">My Enrolled Courses</h2>
      <EnrolledCoursesSearchBar
        search={search}
        onSearchChange={onSearchChange}
        filter={filter}
        onFilterChange={onFilterChange}
      />

      {totalFiltered === 0 ? (
        <NoSearchResultsState hasSearch={search.length > 0} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginated.map((course) => (
              <EnrolledCourseCard key={course.slug} course={course} />
            ))}
          </div>
          {hasMore && (
            <div className="mt-6 text-center">
              <button
                onClick={onLoadMore}
                className="px-8 py-2.5 rounded-xl bg-surface-900 border border-brand-indigo-500/30 hover:border-brand-indigo-500/60 text-text-primary text-sm font-medium transition"
              >
                Load More ({totalFiltered - paginated.length} remaining)
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
