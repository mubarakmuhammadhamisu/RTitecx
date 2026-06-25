import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { rowToCourse } from './rowToCourse';
import type { CourseSchema } from './courseTypes';

/**
 * lib/courses/fetchPublishedCoursesServer.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: server-side equivalent of
 * fetchPublishedCourses.ts, for use inside async Server Components
 * (e.g. the landing page's course preview, which renders at request
 * time without a client-side data fetch / loading spinner).
 */
export async function fetchPublishedCoursesServer(): Promise<CourseSchema[]> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: true });

  if (error || !data) return [];

  return data.map((row) => rowToCourse(row, []));
}
