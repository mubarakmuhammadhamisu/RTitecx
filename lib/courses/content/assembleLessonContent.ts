import type { LessonRow } from '@/lib/supabase/rowTypes';
import type { Lesson, LessonContent } from '../courseTypes';
import { fetchVideoContent } from './fetchVideoContent';
import { fetchReadingContent } from './fetchReadingContent';
import { fetchQuizContent } from './fetchQuizContent';
import { fetchInteractiveContent } from './fetchInteractiveContent';

/**
 * lib/courses/content/assembleLessonContent.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: given a flat list of lesson rows, fetch each
 * type's content in parallel (one batched query per type, not one query
 * per lesson) and return fully-typed Lesson objects.
 *
 * This is the ONLY place that dispatches on lesson_type — every other
 * file in lib/courses/content/ handles exactly one type.
 */
export async function assembleLessonContent(lessonRows: LessonRow[]): Promise<Lesson[]> {
  const idsByType = {
    video: lessonRows.filter((l) => l.lesson_type === 'video').map((l) => l.id),
    reading: lessonRows.filter((l) => l.lesson_type === 'reading').map((l) => l.id),
    quiz: lessonRows.filter((l) => l.lesson_type === 'quiz').map((l) => l.id),
    interactive: lessonRows.filter((l) => l.lesson_type === 'interactive').map((l) => l.id),
  };

  const [videoMap, readingMap, quizMap, interactiveMap] = await Promise.all([
    fetchVideoContent(idsByType.video),
    fetchReadingContent(idsByType.reading),
    fetchQuizContent(idsByType.quiz),
    fetchInteractiveContent(idsByType.interactive),
  ]);

  const contentMapByType: Record<string, Map<string, LessonContent>> = {
    video: videoMap,
    reading: readingMap,
    quiz: quizMap as unknown as Map<string, LessonContent>,
    interactive: interactiveMap,
  };

  return lessonRows
    .slice()
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => {
      const content = contentMapByType[row.lesson_type]?.get(row.id);
      return {
        id: row.id,
        title: row.title,
        type: row.lesson_type,
        status: 'locked' as const, // computed later against completion state, not here
        content: content as LessonContent,
      };
    })
    .filter((lesson) => lesson.content !== undefined);
}
