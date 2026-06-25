import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/achievements/badges/checkConsistentBadge.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: determine whether the "Consistent" badge is
 * earned — activity (enrollments + completions) recorded across 7 or
 * more distinct calendar days.
 *
 * This is the best proxy available without a DB-tracked last_login
 * field — a true login-streak badge would need server-side tracking.
 */
export function checkConsistentBadge(enrolledCourses: EnrolledCourse[]): boolean {
  const activityDates = new Set<string>();
  enrolledCourses.forEach((c) => {
    if (c.enrolledAt) activityDates.add(c.enrolledAt.slice(0, 10));
    if (c.completedAt) activityDates.add(c.completedAt.slice(0, 10));
  });
  return activityDates.size >= 7;
}
