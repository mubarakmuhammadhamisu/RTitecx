-- ════════════════════════════════════════════════════════════════════════
-- 0003_enrollments_and_progress.sql
-- ────────────────────────────────────────────────────────────────────────
-- Purpose: enrollment records, lesson completion tracking, and the
-- "enrolled students can read lesson content" RLS policies that were
-- deferred from 0002 (they need this table to exist first).
--
-- Run order: THIRD.
-- ════════════════════════════════════════════════════════════════════════

create table if not exists enrollments (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references profiles(id) on delete cascade,
  course_id           uuid not null references courses(id) on delete cascade,
  progress            integer not null default 0 check (progress between 0 and 100),
  completed_at        timestamptz,
  enrolled_at         timestamptz not null default now(),
  purchase_type       text not null default 'standard' check (purchase_type in ('standard', 'premium', 'free')),
  premium_deadline    timestamptz,
  mystery_box_status  text check (mystery_box_status in ('pending', 'earned', 'forfeited')),
  unique (user_id, course_id)
);

create index if not exists idx_enrollments_user on enrollments (user_id);
create index if not exists idx_enrollments_course on enrollments (course_id);

create table if not exists lesson_completions (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id) on delete cascade,
  lesson_id     uuid not null references lessons(id) on delete cascade,
  completed_at  timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create index if not exists idx_lesson_completions_user on lesson_completions (user_id);

-- ── RLS ─────────────────────────────────────────────────────────────────
alter table enrollments enable row level security;
alter table lesson_completions enable row level security;

create policy "Students view their own enrollments"
  on enrollments for select using (auth.uid() = user_id);

create policy "Students create their own enrollment via enroll API"
  on enrollments for insert with check (auth.uid() = user_id);

create policy "Admins manage all enrollments"
  on enrollments for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Students view their own lesson completions"
  on lesson_completions for select using (auth.uid() = user_id);

create policy "Students mark their own lessons complete"
  on lesson_completions for insert with check (auth.uid() = user_id);

create policy "Admins view all lesson completions"
  on lesson_completions for select using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- ── Deferred from 0002: enrolled students can read lesson content ────────
-- A student may read a lesson row only if they hold an enrollment for
-- the parent course (joined lesson -> module -> course -> enrollment).
create policy "Enrolled students read lessons"
  on lessons for select using (
    exists (
      select 1
      from modules m
      join enrollments e on e.course_id = m.course_id
      where m.id = lessons.module_id and e.user_id = auth.uid()
    )
  );

create policy "Enrolled students read video content"
  on lesson_video_content for select using (
    exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      join enrollments e on e.course_id = m.course_id
      where l.id = lesson_video_content.lesson_id and e.user_id = auth.uid()
    )
  );

create policy "Enrolled students read reading content"
  on lesson_reading_content for select using (
    exists (
      select 1
      from lessons l
      join modules m on m.id = l.module_id
      join enrollments e on e.course_id = m.course_id
      where l.id = lesson_reading_content.lesson_id and e.user_id = auth.uid()
    )
  );

-- NOTE: quiz_questions deliberately does NOT get a broad "enrolled
-- students can select *" policy here, because correct_answer would be
-- readable client-side (defeats the purpose of grading). Quiz delivery
-- to students must go through a server route that strips correct_answer
-- before sending questions to the client. See app/api/quiz/route.ts docs.

-- ── Recompute enrollment.progress whenever a lesson is completed ────────
create or replace function recompute_enrollment_progress()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_course_id uuid;
  v_total_lessons integer;
  v_completed_lessons integer;
  v_new_progress integer;
begin
  select m.course_id into v_course_id
  from lessons l join modules m on m.id = l.module_id
  where l.id = new.lesson_id;

  select count(*) into v_total_lessons
  from lessons l join modules m on m.id = l.module_id
  where m.course_id = v_course_id;

  select count(*) into v_completed_lessons
  from lesson_completions lc
  join lessons l on l.id = lc.lesson_id
  join modules m on m.id = l.module_id
  where m.course_id = v_course_id and lc.user_id = new.user_id;

  v_new_progress := case when v_total_lessons = 0 then 0
    else round((v_completed_lessons::numeric / v_total_lessons) * 100) end;

  update enrollments
  set progress = v_new_progress,
      completed_at = case when v_new_progress = 100 then now() else completed_at end
  where user_id = new.user_id and course_id = v_course_id;

  return new;
end;
$$;

drop trigger if exists trg_recompute_progress on lesson_completions;
create trigger trg_recompute_progress
  after insert on lesson_completions
  for each row execute function recompute_enrollment_progress();
