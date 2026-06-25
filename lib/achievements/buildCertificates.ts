import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/achievements/buildCertificates.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: derive the certificate list (one per completed
 * course) from enrolled courses.
 */
export interface Certificate {
  id: number;
  slug: string;
  title: string;
  issuer: string;
  date: string;
}

export function buildCertificates(completedCourses: EnrolledCourse[]): Certificate[] {
  return completedCourses.map((c, idx) => ({
    id: idx + 1,
    slug: c.slug,
    title: c.title,
    issuer: 'TITECX Academy',
    date: c.completedAt ?? c.enrolledAt
      ? new Date((c.completedAt ?? c.enrolledAt)!).toLocaleDateString('en-GB', {
          month: 'short',
          year: 'numeric',
        })
      : 'Recent',
  }));
}
