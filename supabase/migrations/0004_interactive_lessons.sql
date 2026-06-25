-- ════════════════════════════════════════════════════════════════════════
-- 0004_interactive_lessons.sql
-- ────────────────────────────────────────────────────────────────────────
-- Purpose: the NEW interactive code playground / graded test system.
-- This did not exist in the original codebase — it is net-new schema
-- supporting client-side code execution (HTML/CSS/JS, Python via Pyodide,
-- C via Emscripten, Java via CheerpJ) plus an anti-cheat test runner.
--
-- Anti-cheat design: a student's code is run against MULTIPLE admin-
-- defined input/expected-output pairs server-recorded (not just one),
-- so a hardcoded print() that matches a single known output cannot pass.
-- Test cases can be marked `is_hidden` so students never see the exact
-- inputs/outputs used to grade them, only that their code passed or
-- failed N of M cases.
--
-- Run order: FOURTH (after lessons table exists).
-- ════════════════════════════════════════════════════════════════════════

-- ── interactive_lessons ────────────────────────────────────────────────
-- One row per lesson of type 'interactive'. Holds the admin-authored
-- problem statement, starter code, language, and mode.
create table if not exists interactive_lessons (
  lesson_id        uuid primary key references lessons(id) on delete cascade,
  mode             text not null check (mode in ('playground', 'test')),
  -- 'playground' = freeform view/edit/run sandbox, no grading.
  -- 'test'       = graded quiz-like coding challenge (anti-cheat engine below).
  language         text not null check (language in ('web', 'python', 'c', 'java')),
  -- 'web' covers the combined HTML/CSS/JS sandboxed-iframe environment.
  problem_statement text not null default '',  -- shown at top of UI when mode = 'test'
  starter_code      jsonb not null default '{}'::jsonb,
  -- For 'web': { "html": "...", "css": "...", "js": "..." }
  -- For 'python' | 'c' | 'java': { "code": "..." }
  time_limit_seconds integer,                   -- optional per-execution timeout (anti-infinite-loop)
  topics             text[] not null default '{}'
);

-- ── interactive_test_cases ─────────────────────────────────────────────
-- Admin-defined input/expected-output pairs used ONLY when mode = 'test'.
-- A submission must pass ALL non-hidden AND all hidden cases to be marked
-- complete — string-matching a single printed line is not sufficient.
create table if not exists interactive_test_cases (
  id              uuid primary key default gen_random_uuid(),
  lesson_id       uuid not null references lessons(id) on delete cascade,
  label           text not null default '',      -- e.g. "Edge case: empty array"
  input           text not null default '',       -- raw stdin / function args, language-dependent
  expected_output text not null,                  -- exact expected stdout (trimmed) for the case to pass
  is_hidden       boolean not null default false,  -- hidden cases are never sent to the client
  sort_order      integer not null default 0,
  created_at      timestamptz not null default now()
);

create index if not exists idx_test_cases_lesson on interactive_test_cases (lesson_id, sort_order);

-- ── interactive_submissions ────────────────────────────────────────────
-- One row per graded attempt. Stores per-case pass/fail so admins can see
-- exactly where a student's logic broke, without ever exposing hidden
-- case inputs back to the student beyond pass/fail counts.
create table if not exists interactive_submissions (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references profiles(id) on delete cascade,
  lesson_id        uuid not null references lessons(id) on delete cascade,
  submitted_code   text not null,
  total_cases      integer not null default 0,
  passed_cases     integer not null default 0,
  is_fully_passed  boolean not null default false,
  case_results     jsonb not null default '[]'::jsonb,
  -- [{ "test_case_id": "...", "passed": true, "label": "..." }, ...]
  -- Never store the hidden expected_output or the raw stdout diff here
  -- in a way that's selectable by the student (see RLS below) — keep
  -- detailed diffs admin-only; students get pass/fail + label only via
  -- the API response shape, not via direct table access.
  execution_error  text,                            -- compile/runtime error, if any
  submitted_at     timestamptz not null default now()
);

create index if not exists idx_submissions_user_lesson on interactive_submissions (user_id, lesson_id);

-- ── RLS ─────────────────────────────────────────────────────────────────
alter table interactive_lessons enable row level security;
alter table interactive_test_cases enable row level security;
alter table interactive_submissions enable row level security;

create policy "Admins manage interactive lessons"
  on interactive_lessons for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Enrolled students may read interactive_lessons config (problem
-- statement, starter code) but never the test cases directly — those
-- must be delivered through a server route that strips is_hidden=true
-- rows' expected_output before sending to the client during a "run my
-- code against visible examples" preview action. Grading itself runs
-- server-side (or is verified server-side after client execution) so
-- expected_output values never need to reach the browser for hidden
-- cases at all.
create policy "Enrolled students read interactive lesson config"
  on interactive_lessons for select using (
    exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      join enrollments e on e.course_id = m.course_id
      where l.id = interactive_lessons.lesson_id and e.user_id = auth.uid()
    )
  );

create policy "Admins manage test cases"
  on interactive_test_cases for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Students can read NON-HIDDEN test cases only (for example display /
-- "try it yourself" cases shown above the editor). Hidden cases are
-- never selectable by a non-admin under any policy.
create policy "Enrolled students read visible test cases"
  on interactive_test_cases for select using (
    is_hidden = false
    and exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      join enrollments e on e.course_id = m.course_id
      where l.id = interactive_test_cases.lesson_id and e.user_id = auth.uid()
    )
  );

create policy "Students view their own submissions"
  on interactive_submissions for select using (auth.uid() = user_id);

create policy "Students create their own submissions via grading API"
  on interactive_submissions for insert with check (auth.uid() = user_id);

create policy "Admins view all submissions"
  on interactive_submissions for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Mark lesson complete when a 'test' mode submission fully passes ────
create or replace function handle_interactive_full_pass()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.is_fully_passed = true then
    insert into lesson_completions (user_id, lesson_id)
    values (new.user_id, new.lesson_id)
    on conflict (user_id, lesson_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_interactive_full_pass on interactive_submissions;
create trigger trg_interactive_full_pass
  after insert on interactive_submissions
  for each row execute function handle_interactive_full_pass();
