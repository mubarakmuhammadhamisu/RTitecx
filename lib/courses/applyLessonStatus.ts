import type { Lesson, LessonStatus } from './courseTypes';

/**
 * lib/courses/applyLessonStatus.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: given a flat ordered lesson list and the set of
 * completed lesson IDs for the current user, compute each lesson's
 * status ('completed' | 'current' | 'locked').
 *
 * Rule: a lesson is 'current' if it is the first non-completed lesson in
 * order; everything before it is 'completed', everything after is
 * 'locked'. Pure function — no fetching, no side effects.
 */
export function applyLessonStatus(
  lessons: Lesson[],
  completedLessonIds: Set<string>
): Lesson[] {
  let currentAssigned = false;

  return lessons.map((lesson) => {
    let status: LessonStatus;
    if (completedLessonIds.has(lesson.id)) {
      status = 'completed';
    } else if (!currentAssigned) {
      status = 'current';
      currentAssigned = true;
    } else {
      status = 'locked';
    }
    return { ...lesson, status };
  });
}
