import { supabase } from '@/lib/supabase/client';
import type { CourseSchema } from './courseTypes';
import { rowToCourse } from './rowToCourse';

/**
 * lib/courses/fetchPublishedCourses.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch the lightweight course catalog (course
 * rows only, no modules/lessons) for listing pages — landing page course
 * grid, /courses listing, dashboard "browse more courses" sections.
 *
 * Deliberately does NOT join modules/lessons (that's a much heavier
 * query reserved for fetchCourseWithModules.ts, used only on the single
 * course detail/player page).
 */
export async function fetchPublishedCourses(): Promise<CourseSchema[]> {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: true });

  if (error || !data) return [];

  return data.map((row) => rowToCourse(row, []));
}
