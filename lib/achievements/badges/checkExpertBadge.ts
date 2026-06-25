import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/achievements/badges/checkExpertBadge.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: determine whether the "Expert" badge is
 * earned — 90%+ progress across every enrolled course.
 */
export function checkExpertBadge(enrolledCourses: EnrolledCourse[]): boolean {
  return enrolledCourses.length > 0 && enrolledCourses.every((c) => c.progress >= 90);
}
