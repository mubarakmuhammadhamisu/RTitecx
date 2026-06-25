import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/achievements/badges/checkFastLearnerBadge.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: determine whether the "Fast Learner" badge is
 * earned — 3+ courses completed where all completedAt timestamps fall
 * within any rolling 30-day window. Uses the earliest completion in
 * each candidate window as the anchor.
 */
export function checkFastLearnerBadge(completedCourses: EnrolledCourse[]): boolean {
  const dates = completedCourses
    .map((c) => (c.completedAt ? new Date(c.completedAt).getTime() : null))
    .filter((d): d is number => d !== null)
    .sort((a, b) => a - b);

  if (dates.length < 3) return false;

  // Slide a 30-day window: if the 3rd-earliest completion is within 30
  // days of the earliest, all 3 fall inside that window.
  const MS_30_DAYS = 30 * 24 * 60 * 60 * 1000;
  for (let i = 0; i <= dates.length - 3; i++) {
    if (dates[i + 2] - dates[i] <= MS_30_DAYS) return true;
  }
  return false;
}
