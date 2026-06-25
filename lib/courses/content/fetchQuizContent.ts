import { supabase } from '@/lib/supabase/client';

/**
 * lib/courses/content/fetchQuizContent.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: fetch quiz lessons' questions for display.
 *
 * SECURITY: correctAnswer is intentionally OMITTED from the returned
 * shape — this function returns QuizContentForDisplay, NOT the full
 * QuizContent type (which includes correctAnswer for admin/grading use).
 * RLS already blocks students from selecting quiz_questions directly
 * (see supabase/migrations/0003 notes), but this function is a second
 * line of defense — even if called with elevated privileges by mistake,
 * it never forwards correct_answer to the caller. Grading must go
 * through app/api/quiz/submit, which reads correct_answer server-side
 * only.
 */
export interface QuizQuestionForDisplay {
  id: string;
  question: string;
  options: string[];
  points: number;
}

export interface QuizContentForDisplay {
  topics: string[];
  questions: QuizQuestionForDisplay[];
}

export async function fetchQuizContent(
  lessonIds: string[]
): Promise<Map<string, QuizContentForDisplay>> {
  const result = new Map<string, QuizContentForDisplay>();
  if (lessonIds.length === 0) return result;

  const [{ data: quizRows }, { data: questionRows }] = await Promise.all([
    supabase.from('lesson_quiz_content').select('*').in('lesson_id', lessonIds),
    supabase
      .from('quiz_questions')
      .select('id, lesson_id, question, options, points, sort_order')
      .in('lesson_id', lessonIds)
      .order('sort_order', { ascending: true }),
  ]);

  for (const lessonId of lessonIds) {
    const quizRow = quizRows?.find((r) => r.lesson_id === lessonId);
    const questions = (questionRows ?? [])
      .filter((q) => q.lesson_id === lessonId)
      .map((q) => ({
        id: q.id,
        question: q.question,
        options: q.options ?? [],
        points: q.points ?? 10,
      }));

    result.set(lessonId, {
      topics: quizRow?.topics ?? [],
      questions, // intentionally lacks correctAnswer — see file header
    });
  }

  return result;
}
