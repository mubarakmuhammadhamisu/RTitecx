'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { useCourses } from '@/context/CoursesContext';
import { buildProgressModules } from '@/lib/progress/buildProgressModules';
import DashboardLoadErrorState from '@/components/courses/DashboardLoadErrorState';
import ProgressCourseNotFoundState from './_components/ProgressCourseNotFoundState';
import ProgressDetailHero from './_components/ProgressDetailHero';
import ProgressDetailStatsGrid from './_components/ProgressDetailStatsGrid';
import ResumeCourseBanner from './_components/ResumeCourseBanner';
import CurriculumSection from './_components/CurriculumSection';
import ResourcesSupportSection from './_components/ResourcesSupportSection';

interface ProgressDetailPageProps {
  params: Promise<{ id: string }>;
}

/**
 * /dashboard/progress/[id] — detailed progress view for one enrolled
 * course. Composes section components; module-building logic is
 * delegated to lib/progress/buildProgressModules.ts.
 */
export default function ProgressDetailPage({ params }: ProgressDetailPageProps) {
  const { id } = React.use(params);
  const { user } = useAuth();
  const { enrolledCourses, courses, completedLessonIds, isLoading, loadError } = useCourses();

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 rounded-full border-2 border-brand-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }
  if (loadError) return <DashboardLoadErrorState />;

  const enrolledCourse = enrolledCourses.find((c) => c.slug === id);
  const schema = enrolledCourse ? courses.find((c) => c.slug === enrolledCourse.slug) : null;

  if (!enrolledCourse || !schema) {
    return <ProgressCourseNotFoundState />;
  }

  const modules = buildProgressModules(schema, enrolledCourse, completedLessonIds);
  const completedModules = modules.filter((m) => m.completed).length;

  return (
    <div className="space-y-6">
      <ProgressDetailHero course={enrolledCourse} />

      <ProgressDetailStatsGrid
        course={enrolledCourse}
        completedModules={completedModules}
        totalModules={modules.length}
      />

      <ResumeCourseBanner course={enrolledCourse} />

      <CurriculumSection modules={modules} courseSlug={enrolledCourse.slug} />

      <ResourcesSupportSection schema={schema} enrolledCourse={enrolledCourse} />
    </div>
  );
}
