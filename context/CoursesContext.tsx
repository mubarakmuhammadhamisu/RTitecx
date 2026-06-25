'use client';

import React, { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from './AuthContext';
import { useProgressToast } from './ProgressToastContext';
import type { CourseSchema, EnrolledCourse } from '@/lib/courses/courseTypes';
import type { EnrollmentRow, LessonCompletionRow } from '@/lib/supabase/rowTypes';
import { fetchPublishedCourses } from '@/lib/courses/fetchPublishedCourses';
import { buildEnrolledCourses } from '@/lib/courses/buildEnrolledCourses';

/**
 * context/CoursesContext.tsx
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: course catalog, enrollment state, lesson
 * completion tracking, and the optimistic-update logic for marking a
 * lesson complete.
 *
 * Depends on AuthContext for the current user ID — must be rendered
 * INSIDE <AuthProvider> (see app/layout.tsx for provider order).
 *
 * NOTE: this context loads the lightweight course catalog (no
 * modules/lessons per course — see fetchPublishedCourses) for the "My
 * Courses" list and progress %. The full per-course module/lesson tree
 * used by the course PLAYER page is loaded separately via
 * fetchCourseWithModules, on-demand, when a student opens that course.
 * This avoids fetching every course's entire curriculum just to render
 * a dashboard list.
 */
interface CoursesContextValue {
  courses: CourseSchema[];
  enrolledCourses: EnrolledCourse[];
  completedLessonIds: Set<string>;
  isEnrolled: (slug: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  isLoading: boolean;
  loadError: boolean;
  markLessonComplete: (courseSlug: string, lessonId: string) => Promise<void>;
  refetchEnrollments: () => Promise<void>;
}

const CoursesContext = createContext<CoursesContextValue | null>(null);

export function CoursesProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const { showProgressError } = useProgressToast();

  const [courses, setCourses] = useState<CourseSchema[]>([]);
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([]);
  const [completedLessonIds, setCompletedLessonIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const loadCourseData = useCallback(async (userId: string) => {
    setLoadError(false);
    try {
      const [courseList, { data: enrollments, error: enrollError }, { data: completions, error: compError }] =
        await Promise.all([
          fetchPublishedCourses(),
          supabase.from('enrollments').select('*').eq('user_id', userId),
          supabase.from('lesson_completions').select('*').eq('user_id', userId),
        ]);

      if (enrollError || compError) {
        console.error(
          '[CoursesContext] query failed:',
          enrollError?.message ?? compError?.message
        );
        setLoadError(true);
        return;
      }

      setCourses(courseList);

      const comp = (completions ?? []) as LessonCompletionRow[];
      setCompletedLessonIds(new Set(comp.map((c) => c.lesson_id)));
      setEnrolledCourses(
        buildEnrolledCourses((enrollments ?? []) as EnrollmentRow[], comp, courseList)
      );
    } catch (err) {
      console.error('[CoursesContext] unexpected error:', err);
      setLoadError(true);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      setCourses([]);
      setEnrolledCourses([]);
      setCompletedLessonIds(new Set());
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    loadCourseData(user.id).finally(() => setIsLoading(false));
  }, [user, loadCourseData]);

  const refetchEnrollments = useCallback(async () => {
    if (!user) return;
    await loadCourseData(user.id);
  }, [user, loadCourseData]);

  const isEnrolled = (slug: string) => enrolledCourses.some((c) => c.slug === slug);
  const isLessonCompleted = (lessonId: string) => completedLessonIds.has(lessonId);

  const markLessonComplete = async (courseSlug: string, lessonId: string) => {
    if (!user) return;
    if (completedLessonIds.has(lessonId)) return;

    const schema = courses.find((c) => c.slug === courseSlug);
    const optimisticCompleted = new Set([...completedLessonIds, lessonId]);
    const optimisticProgress = computeOptimisticProgress(schema, optimisticCompleted);

    setCompletedLessonIds(optimisticCompleted);
    if (schema && optimisticProgress !== null) {
      applyOptimisticEnrollmentUpdate(courseSlug, schema, optimisticCompleted, optimisticProgress, setEnrolledCourses);
    }

    const apiResult = await postLessonComplete(courseSlug, lessonId);

    if (apiResult.error) {
      console.error('[markLessonComplete] update failed:', apiResult.error);
      setCompletedLessonIds(completedLessonIds); // rollback to pre-optimistic set
      if (schema) {
        rollbackEnrollmentUpdate(courseSlug, schema, completedLessonIds, setEnrolledCourses);
      }
      showProgressError(
        apiResult.error === 'progress_failed'
          ? 'Lesson saved but progress % could not update. Please reload.'
          : 'Failed to save progress. Please check your connection.'
      );
    }
  };

  return (
    <CoursesContext.Provider
      value={{
        courses,
        enrolledCourses,
        completedLessonIds,
        isEnrolled,
        isLessonCompleted,
        isLoading,
        loadError,
        markLessonComplete,
        refetchEnrollments,
      }}
    >
      {children}
    </CoursesContext.Provider>
  );
}

export function useCourses(): CoursesContextValue {
  const ctx = useContext(CoursesContext);
  if (!ctx) throw new Error('useCourses must be used inside <CoursesProvider>');
  return ctx;
}

// ── Helper functions (kept here, not split into separate files, since
//    they're tightly coupled internal implementation details of the
//    optimistic-update flow above and aren't reused elsewhere) ──────────

function computeOptimisticProgress(
  schema: CourseSchema | undefined,
  optimisticCompleted: Set<string>
): number | null {
  if (!schema || schema.modules.length === 0) return null;
  const allLessons = schema.modules.flatMap((m) => m.lessons);
  const completedCount = allLessons.filter((l) => optimisticCompleted.has(l.id)).length;
  return allLessons.length > 0 ? Math.round((completedCount / allLessons.length) * 100) : 0;
}

function applyOptimisticEnrollmentUpdate(
  courseSlug: string,
  schema: CourseSchema,
  optimisticCompleted: Set<string>,
  optimisticProgress: number,
  setEnrolledCourses: React.Dispatch<React.SetStateAction<EnrolledCourse[]>>
) {
  setEnrolledCourses((prev) =>
    prev.map((c) => {
      if (c.slug !== courseSlug) return c;
      const allLessons = schema.modules.flatMap((m) => m.lessons);
      const nextLesson = allLessons.find((l) => !optimisticCompleted.has(l.id));
      return { ...c, progress: optimisticProgress, nextLessonId: nextLesson?.id };
    })
  );
}

function rollbackEnrollmentUpdate(
  courseSlug: string,
  schema: CourseSchema,
  originalCompleted: Set<string>,
  setEnrolledCourses: React.Dispatch<React.SetStateAction<EnrolledCourse[]>>
) {
  setEnrolledCourses((prev) =>
    prev.map((c) => {
      if (c.slug !== courseSlug) return c;
      const allLessons = schema.modules.flatMap((m) => m.lessons);
      const nextLesson = allLessons.find((l) => !originalCompleted.has(l.id));
      const originalCount = allLessons.filter((l) => originalCompleted.has(l.id)).length;
      const originalProgress =
        allLessons.length > 0 ? Math.round((originalCount / allLessons.length) * 100) : 0;
      return { ...c, progress: originalProgress, nextLessonId: nextLesson?.id };
    })
  );
}

async function postLessonComplete(
  courseSlug: string,
  lessonId: string
): Promise<{ success?: boolean; error?: string }> {
  try {
    const res = await fetch('/api/mark-lesson-complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-protection': '1' },
      body: JSON.stringify({ courseSlug, lessonId }),
    });
    const result = await res.json().catch(() => ({ error: 'parse_failed' }));
    if (!res.ok && result.error !== 'progress_failed') {
      return { error: result.error ?? 'completion_failed' };
    }
    return result;
  } catch {
    return { error: 'completion_failed' };
  }
}
