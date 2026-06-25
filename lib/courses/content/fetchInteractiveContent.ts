import { supabase } from '@/lib/supabase/client';
import type { InteractiveContent } from '../courseTypes';

/**
 * lib/courses/content/fetchInteractiveContent.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch interactive_lessons + their test cases
 * for display/execution in the code playground/test UI.
 *
 * GRADING STRATEGY: client-execution (see lib/interactive/gradingStrategy.ts).
 * Test cases are fetched via the get_interactive_test_cases_for_lesson
 * SQL function (migration 0006), which returns ALL cases — including
 * hidden ones — because the browser's WASM runtime needs each case's
 * `input` to execute the student's code against it. `expectedOutput` is
 * stripped to null for hidden cases by that function itself, so this
 * file cannot leak it even by mistake.
 */
export async function fetchInteractiveContent(
  lessonIds: string[]
): Promise<Map<string, InteractiveContent>> {
  const result = new Map<string, InteractiveContent>();
  if (lessonIds.length === 0) return result;

  const { data: lessonRows } = await supabase
    .from('interactive_lessons')
    .select('*')
    .in('lesson_id', lessonIds);

  // Test cases must be fetched per-lesson via the RPC function (it takes
  // a single lesson_id, not a batch) — interactive lessons are typically
  // viewed one at a time (the course player loads one lesson's content
  // at a time), so this is not a performance concern in practice.
  const caseResultsByLesson = await Promise.all(
    lessonIds.map(async (lessonId) => {
      const { data } = await supabase.rpc('get_interactive_test_cases_for_lesson', {
        p_lesson_id: lessonId,
      });
      return { lessonId, cases: data ?? [] };
    })
  );

  const casesByLessonId = new Map(caseResultsByLesson.map((r) => [r.lessonId, r.cases]));

  for (const row of lessonRows ?? []) {
    const rawCases = casesByLessonId.get(row.lesson_id) ?? [];
    const testCases = rawCases.map(
      (c: {
        id: string;
        label: string;
        input: string;
        is_hidden: boolean;
        expected_output: string | null;
      }) => ({
        id: c.id,
        label: c.label ?? '',
        input: c.input ?? '',
        isHidden: c.is_hidden,
        expectedOutput: c.expected_output,
      })
    );

    result.set(row.lesson_id, {
      mode: row.mode,
      language: row.language,
      problemStatement: row.problem_statement ?? '',
      starterCode: row.starter_code ?? {},
      timeLimitSeconds: row.time_limit_seconds ?? undefined,
      topics: row.topics ?? [],
      testCases,
    });
  }

  return result;
}
