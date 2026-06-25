-- ════════════════════════════════════════════════════════════════════════
-- 0006_grading_strategy_flexibility.sql
-- ────────────────────────────────────────────────────────────────────────
-- Purpose: amend the interactive-lesson grading model to support
-- CLIENT-SIDE code execution (today's default, to avoid server compute
-- costs on the free tier) while keeping a clean path to flip to
-- SERVER-SIDE execution later without another schema migration.
--
-- ── How grading works now (client-execution strategy) ───────────────────
-- 1. The browser's WASM runtime (Pyodide/Emscripten/CheerpJ/iframe) runs
--    the student's code against EVERY test case — visible AND hidden —
--    because the client needs each case's `input` to run against it,
--    even for hidden cases. This differs from the original 0004 design,
--    which assumed hidden-case inputs never left the server.
-- 2. The client captures each case's actual stdout and sends
--    { test_case_id, actual_output } pairs to the grading API route.
--    The client never sees `expected_output` for hidden cases — only
--    `input` and `label` (needed to run and display the case).
-- 3. The server route ONLY compares submitted actual_output values
--    against the stored expected_output column — it does not execute,
--    compile, or interpret any code itself. This keeps server compute
--    at zero regardless of submission volume, at the cost of trusting
--    the client's reported stdout for grading correctness (a
--    determined cheater could fabricate the actual_output payload sent
--    to the API — see the honesty note below).
--
-- ── How grading will work later (server-execution strategy) ────────────
-- When upgraded to a paid compute tier, app/api/interactive/submit can
-- switch to actually running the student's code server-side (in a
-- sandboxed executor) against hidden cases, with expected_output never
-- leaving the database at all. No further schema change is required for
-- that switch — see lib/interactive/gradingStrategy.ts for the
-- pluggable interface that isolates this decision to one swappable
-- module. This migration's function simply stops being called by the
-- client once that switch happens; it does not need to be dropped.
--
-- ── Honesty note on the client-execution tradeoff ───────────────────────
-- Because the client reports its own execution results, a sufficiently
-- motivated student could intercept the network request and submit a
-- fabricated "pass". This is a known, accepted limitation of free-tier
-- client-side grading (documented here and in gradingStrategy.ts) — it
-- still defeats the original concern (a hardcoded print() matching ONE
-- known expected string), since the student's code must actually
-- produce correct output for cases whose expected values it cannot see.
-- It does not defeat a person willing to forge raw network requests.
--
-- Run order: SIXTH (after 0004 interactive_lessons exists).
-- ════════════════════════════════════════════════════════════════════════

-- Postgres RLS is row-level, not column-level. The 0004 base-table
-- policy ("Enrolled students read visible test cases") only returns
-- non-hidden rows, which is too restrictive for client-execution mode —
-- the client needs hidden-case `input` values too (to run against them),
-- just not `expected_output`. A SECURITY DEFINER function gives us that
-- column-level filtering safely without weakening the base table's RLS.
create or replace function get_interactive_test_cases_for_lesson(p_lesson_id uuid)
returns table (
  id uuid,
  label text,
  input text,
  is_hidden boolean,
  sort_order integer,
  expected_output text
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_is_admin boolean;
begin
  select exists (
    select 1 from profiles p where p.id = auth.uid() and p.role = 'admin'
  ) into v_is_admin;

  -- Caller must be enrolled in the course this lesson belongs to, or be
  -- an admin. Mirrors the enrollment-join check used throughout 0003/0004.
  if not v_is_admin and not exists (
    select 1
    from lessons l
    join modules m on m.id = l.module_id
    join enrollments e on e.course_id = m.course_id
    where l.id = p_lesson_id and e.user_id = auth.uid()
  ) then
    return; -- empty result set for unauthorized callers
  end if;

  return query
    select
      tc.id,
      tc.label,
      tc.input,
      tc.is_hidden,
      tc.sort_order,
      case
        when tc.is_hidden and not v_is_admin then null
        else tc.expected_output
      end as expected_output
    from interactive_test_cases tc
    where tc.lesson_id = p_lesson_id
    order by tc.sort_order asc;
end;
$$;

comment on function get_interactive_test_cases_for_lesson(uuid) is
  'Client-side read path for interactive test cases under the
   client-execution grading strategy. Returns input/label for ALL cases
   (including hidden) so the browser WASM runtime can execute against
   them, but strips expected_output for hidden cases from non-admin
   callers. See migration header for the full grading-strategy design.';
