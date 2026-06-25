import type { CourseSchema, EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/progress/buildProgressModules.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: build the per-module completion view for the
 * progress detail page. Has two paths:
 *  - If the course schema has real modules/lessons (normal case), use
 *    actual lesson completion state.
 *  - If a course has no modules yet (e.g. admin hasn't built out the
 *    curriculum in the dashboard, only listed plain-text curriculum
 *    items), fall back to treating each curriculum string as a
 *    single-lesson "module," using the enrollment's overall progress
 *    as a stand-in completion signal.
 */
export interface ProgressLessonView {
  id: string;
  name: string;
  completed: boolean;
}

export interface ProgressModuleView {
  id: string;
  name: string;
  lessons: ProgressLessonView[];
  completed: boolean;
}

export function buildProgressModules(
  schema: CourseSchema,
  enrolledCourse: EnrolledCourse,
  completedLessonIds: Set<string>
): ProgressModuleView[] {
  if (schema.modules.length > 0) {
    return schema.modules.map((mod) => ({
      id: mod.id,
      name: mod.title,
      lessons: mod.lessons.map((l) => ({
        id: l.id,
        name: l.title,
        completed: completedLessonIds.has(l.id),
      })),
      completed: mod.lessons.every((l) => completedLessonIds.has(l.id)),
    }));
  }

  // Fallback path: no real modules yet, derive from plain curriculum text.
  return schema.curriculum.map((item, idx) => ({
    id: String(idx),
    name: item,
    lessons: [
      {
        id: String(idx),
        name: item,
        completed: enrolledCourse.progress === 100,
      },
    ],
    completed: enrolledCourse.progress === 100,
  }));
}
