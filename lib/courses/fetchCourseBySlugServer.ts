import { createSupabaseServerClient } from '@/lib/supabase/serverClient';
import { rowToCourse } from './rowToCourse';
import type { CourseSchema } from './courseTypes';

/**
 * lib/courses/fetchCourseBySlugServer.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: server-side fetch of ONE published course by
 * slug, for use in the /courses/[slug] detail page (a Server Component).
 *
 * Deliberately lightweight — does NOT join modules/lessons, since the
 * public detail page only shows marketing content (description,
 * features, curriculum list as plain text). The full module/lesson tree
 * with typed content is only needed once a student is actually enrolled
 * and viewing the course PLAYER — see fetchCourseWithModules.ts (client
 * version) for that heavier query.
 */
export async function fetchCourseBySlugServer(slug: string): Promise<CourseSchema | null> {
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single();

  if (error || !data) return null;

  return rowToCourse(data, []);
}
