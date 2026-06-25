'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { usePaystackErrorParam } from '@/lib/payments/usePaystackErrorParam';
import DashboardLoadErrorState from '@/components/courses/DashboardLoadErrorState';
import PaystackErrorBanner from './_components/PaystackErrorBanner';
import MyCoursesHero from './_components/MyCoursesHero';
import EnrolledCoursesSection from './_components/EnrolledCoursesSection';
import AvailableCoursesSection from './_components/AvailableCoursesSection';
import type { FilterStatus } from '@/lib/courses/courseTypes';

const ITEMS_PER_PAGE = 6;

/**
 * /dashboard/my-courses — enrolled courses (searchable/filterable/
 * paginated) + available-to-enroll catalogue. Composes section
 * components; all business logic (filtering, pagination math) lives
 * inline here since it's page-specific orchestration, not reusable
 * logic — the reusable pieces (daysRemaining, paystack error parsing)
 * are already extracted to lib/.
 */
export default function MyCoursesPage() {
  const { user } = useAuth();
  const { enrolledCourses, courses, isLoading, loadError } = useCourses();
  const { paystackError, clearPaystackError } = usePaystackErrorParam();

  const [filter, setFilter] = useState<FilterStatus>('all');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-brand-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!user) return null;
  if (loadError) return <DashboardLoadErrorState />;

  const filteredEnrolled = enrolledCourses.filter((c) => {
    const matchFilter =
      filter === 'all' ||
      (filter === 'in-progress' && c.progress < 100) ||
      (filter === 'completed' && c.progress === 100);
    const matchSearch = c.title.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const paginated = filteredEnrolled.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = paginated.length < filteredEnrolled.length;

  const enrolledSlugs = new Set(enrolledCourses.map((c) => c.slug));
  const availableCourses = courses.filter((c) => !enrolledSlugs.has(c.slug));

  return (
    <div className="space-y-10">
      {paystackError && <PaystackErrorBanner message={paystackError} onDismiss={clearPaystackError} />}

      <MyCoursesHero
        user={user}
        enrolledCount={enrolledCourses.length}
        completedCount={enrolledCourses.filter((c) => c.progress === 100).length}
      />

      <EnrolledCoursesSection
        search={search}
        onSearchChange={(v) => {
          setSearch(v);
          setPage(1);
        }}
        filter={filter}
        onFilterChange={(f) => {
          setFilter(f);
          setPage(1);
        }}
        paginated={paginated}
        totalFiltered={filteredEnrolled.length}
        hasMore={hasMore}
        onLoadMore={() => setPage((p) => p + 1)}
      />

      <AvailableCoursesSection courses={availableCourses} />
    </div>
  );
}
