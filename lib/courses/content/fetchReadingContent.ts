import { supabase } from '@/lib/supabase/client';
import type { ReadingContent } from '../courseTypes';

/**
 * lib/courses/content/fetchReadingContent.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch lesson_reading_content rows for a batch of
 * lesson IDs, keyed by lesson_id.
 */
export async function fetchReadingContent(
  lessonIds: string[]
): Promise<Map<string, ReadingContent>> {
  const result = new Map<string, ReadingContent>();
  if (lessonIds.length === 0) return result;

  const { data, error } = await supabase
    .from('lesson_reading_content')
    .select('*')
    .in('lesson_id', lessonIds);

  if (error || !data) return result;

  for (const row of data) {
    result.set(row.lesson_id, {
      markdownBody: row.markdown_body ?? '',
      topics: row.topics ?? [],
    });
  }

  return result;
}
