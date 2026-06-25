import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/profile/computeProfileStats.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: derive the profile sidebar's "Learning Stats"
 * values from enrolled courses. Mirrors the duration-parsing logic in
 * computeDashboardStats.ts (kept as a separate function rather than
 * shared, since the profile page also needs `certificates`, which
 * dashboard doesn't compute).
 */
export interface ProfileStats {
  enrolledCount: number;
  totalHours: number;
  completedCount: number;
  certificatesCount: number;
}

export function computeProfileStats(enrolledCourses: EnrolledCourse[]): ProfileStats {
  const totalHours = enrolledCourses.reduce((acc, c) => {
    const match = c.duration.match(/(\d+(?:\.\d+)?)/);
    const h = match ? parseFloat(match[1]) : 0;
    return acc + Math.round((c.progress / 100) * h * 10) / 10;
  }, 0);

  const completedCount = enrolledCourses.filter((c) => c.progress === 100).length;

  return {
    enrolledCount: enrolledCourses.length,
    totalHours,
    completedCount,
    certificatesCount: completedCount, // one certificate per completed course
  };
}
