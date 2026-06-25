import { supabase } from '@/lib/supabase/client';
import type { VideoContent } from '../courseTypes';

/**
 * lib/courses/content/fetchVideoContent.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch lesson_video_content rows for a batch of
 * lesson IDs and return them keyed by lesson_id, typed as VideoContent.
 */
export async function fetchVideoContent(
  lessonIds: string[]
): Promise<Map<string, VideoContent>> {
  const result = new Map<string, VideoContent>();
  if (lessonIds.length === 0) return result;

  const { data, error } = await supabase
    .from('lesson_video_content')
    .select('*')
    .in('lesson_id', lessonIds);

  if (error || !data) return result;

  for (const row of data) {
    result.set(row.lesson_id, {
      videoUrl: row.video_url ?? '',
      duration: row.duration ?? '',
      topics: row.topics ?? [],
      videoProvider: row.video_provider ?? 'youtube',
    });
  }

  return result;
}
