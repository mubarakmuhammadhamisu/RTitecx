import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/dashboard/computeDashboardStats.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: derive the 4 dashboard stat-card values
 * (enrolled count, total hours learned, completed count, average
 * progress) from the enrolled courses list. Pure function, no side
 * effects.
 */
export interface DashboardStats {
  enrolledCount: number;
  totalHours: number;
  completedCount: number;
  completionRate: number;
}

export function computeDashboardStats(enrolledCourses: EnrolledCourse[]): DashboardStats {
  const totalHours = enrolledCourses.reduce((acc, c) => {
    // Robust parser: handles "6h", "6.5h", "6 hours", "1 hour", etc.
    // Extracts the first numeric value from the string — returns 0 on no match.
    const match = c.duration.match(/(\d+(?:\.\d+)?)/);
    const h = match ? parseFloat(match[1]) : 0;
    return acc + Math.round((c.progress / 100) * h * 10) / 10;
  }, 0);

  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;
  const completionRate = enrolledCourses.length
    ? Math.round(enrolledCourses.reduce((a, c) => a + c.progress, 0) / enrolledCourses.length)
    : 0;

  return {
    enrolledCount: enrolledCourses.length,
    totalHours,
    completedCount,
    completionRate,
  };
}
