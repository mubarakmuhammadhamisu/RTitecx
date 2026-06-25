import { supabase } from '@/lib/supabase/client';
import type { ModuleRow, LessonRow } from '@/lib/supabase/rowTypes';
import type { CourseSchema, Module } from './courseTypes';
import { rowToCourse } from './rowToCourse';
import { assembleLessonContent } from './content/assembleLessonContent';

/**
 * lib/courses/fetchCourseWithModules.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the main entry point for loading ONE full
 * course — its row, modules, lessons, and each lesson's typed content —
 * assembled into a single CourseSchema object.
 *
 * Query shape: 4 round trips total (course row, module rows, lesson
 * rows, then assembleLessonContent's 4 parallel type-batched queries) —
 * NOT one query per lesson. This matters once a course has 50+ lessons.
 */
export async function fetchCourseWithModules(slug: string): Promise<CourseSchema | null> {
  const { data: courseRow, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (courseError || !courseRow) return null;

  const { data: moduleRows } = await supabase
    .from('modules')
    .select('*')
    .eq('course_id', courseRow.id)
    .order('sort_order', { ascending: true });

  const modules: ModuleRow[] = moduleRows ?? [];
  if (modules.length === 0) return rowToCourse(courseRow, []);

  const { data: lessonRows } = await supabase
    .from('lessons')
    .select('*')
    .in(
      'module_id',
      modules.map((m) => m.id)
    )
    .order('sort_order', { ascending: true });

  const lessons = await assembleLessonContent((lessonRows ?? []) as LessonRow[]);

  const lessonsByModule = new Map<string, typeof lessons>();
  for (const lesson of lessons) {
    const parentRow = (lessonRows ?? []).find((l) => l.id === lesson.id);
    if (!parentRow) continue;
    const bucket = lessonsByModule.get(parentRow.module_id) ?? [];
    bucket.push(lesson);
    lessonsByModule.set(parentRow.module_id, bucket);
  }

  const fullModules: Module[] = modules.map((m) => ({
    id: m.id,
    title: m.title,
    lessons: lessonsByModule.get(m.id) ?? [],
  }));

  return rowToCourse(courseRow, fullModules);
}
