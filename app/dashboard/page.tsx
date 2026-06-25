'use client';

import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { computeDashboardStats } from '@/lib/dashboard/computeDashboardStats';
import DashboardLoadErrorState from '@/components/courses/DashboardLoadErrorState';
import DashboardHeroSection from './_sections/DashboardHeroSection';
import DashboardStatsGrid from './_sections/DashboardStatsGrid';
import ActiveCoursesSection from './_sections/ActiveCoursesSection';
import CompletedCoursesSection from './_sections/CompletedCoursesSection';

/**
 * /dashboard — student dashboard overview. Composes section components;
 * stats computation is delegated to computeDashboardStats.ts.
 */
export default function DashboardPage() {
  const { user } = useAuth();
  const { enrolledCourses, isLoading, loadError } = useCourses();

  // NOTE: uses an inline spinner (not the full-screen LoadingSpinner
  // component) because this page renders nested inside AppShellLayout's
  // content area, not as a standalone full-viewport page.
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-brand-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  if (!user) return null;
  if (loadError) return <DashboardLoadErrorState />;

  const activeCourses = enrolledCourses.filter((c) => c.progress < 100).slice(0, 4);
  const completedCourses = enrolledCourses.filter((c) => c.progress === 100).slice(0, 3);
  const stats = computeDashboardStats(enrolledCourses);

  return (
    <div className="w-full space-y-8">
      <DashboardHeroSection user={user} />
      <DashboardStatsGrid stats={stats} />
      <ActiveCoursesSection courses={activeCourses} />
      <CompletedCoursesSection courses={completedCourses} />
    </div>
  );
}
