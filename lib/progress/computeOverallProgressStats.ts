import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/progress/computeOverallProgressStats.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: derive the progress-overview page's 3 stat
 * values (overall %, in-progress count, completed count).
 */
export interface OverallProgressStats {
  totalProgress: number;
  inProgressCount: number;
  completedCount: number;
}

export function computeOverallProgressStats(enrolledCourses: EnrolledCourse[]): OverallProgressStats {
  const totalProgress = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
    : 0;

  return {
    totalProgress,
    inProgressCount: enrolledCourses.filter((c) => c.progress > 0 && c.progress < 100).length,
    completedCount: enrolledCourses.filter((c) => c.progress === 100).length,
  };
}
