'use client';

import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { computeOverallProgressStats } from '@/lib/progress/computeOverallProgressStats';
import DashboardLoadErrorState from '@/components/courses/DashboardLoadErrorState';
import ProgressOverviewHero from './_components/ProgressOverviewHero';
import ProgressOverviewStatsGrid from './_components/ProgressOverviewStatsGrid';
import ProgressCourseRow from './_components/ProgressCourseRow';

/**
 * /dashboard/progress — progress overview across all enrolled courses.
 */
export default function ProgressPage() {
  const { user } = useAuth();
  const { enrolledCourses, isLoading, loadError } = useCourses();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-brand-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!user) return null;
  if (loadError) return <DashboardLoadErrorState />;

  const stats = computeOverallProgressStats(enrolledCourses);

  return (
    <div className="space-y-8">
      <ProgressOverviewHero user={user} />
      <ProgressOverviewStatsGrid stats={stats} />

      <div>
        <h2 className="text-xl font-bold text-text-primary mb-4">All Courses Progress</h2>
        <div className="space-y-3">
          {enrolledCourses.map((course) => (
            <ProgressCourseRow key={course.slug} course={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
