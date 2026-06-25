import type { EnrollmentRow, LessonCompletionRow } from '@/lib/supabase/rowTypes';
import type { CourseSchema, EnrolledCourse } from './courseTypes';

/**
 * lib/courses/buildEnrolledCourses.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: combine enrollment rows + lesson completion rows
 * + the course catalog into the EnrolledCourse view-model used by the
 * "My Courses" dashboard.
 *
 * NOTE: this function expects `courseList` entries to have `modules`
 * populated (with lessons) for an enrollment's course in order to
 * compute `nextLessonId`. If only the lightweight catalog (no modules)
 * was fetched, nextLessonId will be undefined for that course — callers
 * needing it must fetch that course's modules separately.
 */
export function buildEnrolledCourses(
  enrollments: EnrollmentRow[],
  completions: LessonCompletionRow[],
  courseList: CourseSchema[]
): EnrolledCourse[] {
  return enrollments
    .map((row): EnrolledCourse | null => {
      const schema = courseList.find((c) => c.id === row.course_id);
      if (!schema) return null;

      const allLessons = schema.modules.flatMap((m) => m.lessons);
      const completedLessonIds = new Set(completions.map((c) => c.lesson_id));
      const nextLesson = allLessons.find((l) => !completedLessonIds.has(l.id));

      return {
        id: row.id,
        slug: schema.slug,
        title: schema.title,
        instructor: schema.instructor,
        progress: row.progress,
        duration: schema.duration.replace(' hours', 'h').replace(' hour', 'h'),
        students: 0,
        thumbnail: schema.thumbnail,
        gradientFrom: schema.gradientFrom,
        gradientTo: schema.gradientTo,
        nextLessonId: nextLesson?.id,
        completedAt: row.completed_at,
        enrolledAt: row.enrolled_at,
        purchaseType: row.purchase_type ?? 'standard',
        premiumDeadline: row.premium_deadline ?? null,
        mysteryBoxStatus: row.mystery_box_status ?? null,
      };
    })
    .filter((c): c is EnrolledCourse => c !== null);
}
