import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/achievements/computeTotalPoints.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: compute total achievement points — 800 per
 * completed course, 200 per in-progress course.
 */
export function computeTotalPoints(enrolledCourses: EnrolledCourse[]): number {
  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;
  const inProgressCount = enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length;
  return completedCount * 800 + inProgressCount * 200;
}
