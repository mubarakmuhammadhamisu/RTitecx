-- ════════════════════════════════════════════════════════════════════════
-- 0002_courses_modules_lessons.sql
-- ────────────────────────────────────────────────────────────────────────
-- Purpose: core course catalog schema. Adds a FOURTH lesson type —
-- 'interactive' — alongside the original 'video' | 'reading' | 'quiz'.
-- This is the new, admin-configurable code playground / graded test type.
--
-- Run order: SECOND (after profiles).
-- ════════════════════════════════════════════════════════════════════════

-- ── courses ─────────────────────────────────────────────────────────────
create table if not exists courses (
  id                    uuid primary key default gen_random_uuid(),
  slug                  text not null unique,
  title                 text not null,
  short_description     text not null default '',
  description           text not null default '',
  level                 text not null default 'Beginner',
  duration              text not null default '',
  price                 text not null default '0',
  instructor            text not null default '',
  thumbnail             text not null default '',
  gradient_from         text not null default '#6366f1',  -- references token, not arbitrary
  gradient_to           text not null default '#a855f7',
  features              text[] not null default '{}',
  curriculum            text[] not null default '{}',
  premium_price         text,                               -- null = no premium tier
  premium_deadline_days integer not null default 0,
  premium_perks         text[] not null default '{}',
  is_published          boolean not null default false,
  created_at            timestamptz not null default now(),
  updated_at            timestamptz not null default now()
);

create index if not exists idx_courses_slug on courses (slug);
create index if not exists idx_courses_published on courses (is_published);

-- ── modules ─────────────────────────────────────────────────────────────
create table if not exists modules (
  id          uuid primary key default gen_random_uuid(),
  course_id   uuid not null references courses(id) on delete cascade,
  title       text not null,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists idx_modules_course on modules (course_id, sort_order);

-- ── lessons ─────────────────────────────────────────────────────────────
-- lesson_type 'interactive' is NEW — covers code playgrounds and graded
-- coding tests. Its configuration lives in the `interactive_lessons`
-- table (0005 migration) rather than bloating this row with nullable
-- columns for every possible content shape.
create table if not exists lessons (
  id           uuid primary key default gen_random_uuid(),
  module_id    uuid not null references modules(id) on delete cascade,
  title        text not null,
  lesson_type  text not null check (lesson_type in ('video', 'reading', 'quiz', 'interactive')),
  sort_order   integer not null default 0,
  created_at   timestamptz not null default now()
);

create index if not exists idx_lessons_module on lessons (module_id, sort_order);

-- ── lesson_video_content ───────────────────────────────────────────────
create table if not exists lesson_video_content (
  lesson_id      uuid primary key references lessons(id) on delete cascade,
  video_url      text not null default '',
  duration       text not null default '',
  topics         text[] not null default '{}',
  video_provider text not null default 'youtube'
    check (video_provider in ('youtube', 'gumlet', 'bunny', 'gdrive'))
);

-- ── lesson_reading_content ─────────────────────────────────────────────
create table if not exists lesson_reading_content (
  lesson_id      uuid primary key references lessons(id) on delete cascade,
  markdown_body  text not null default '',
  topics         text[] not null default '{}'
);

-- ── lesson_quiz_content (multiple choice, original behaviour) ─────────
create table if not exists lesson_quiz_content (
  lesson_id  uuid primary key references lessons(id) on delete cascade,
  topics     text[] not null default '{}'
);

create table if not exists quiz_questions (
  id              uuid primary key default gen_random_uuid(),
  lesson_id       uuid not null references lessons(id) on delete cascade,
  question        text not null,
  options         text[] not null,
  correct_answer  integer not null,   -- index into options[]
  points          integer not null default 10,
  sort_order      integer not null default 0
);

create index if not exists idx_quiz_questions_lesson on quiz_questions (lesson_id, sort_order);

-- ── updated_at trigger for courses ─────────────────────────────────────
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_courses_updated_at on courses;
create trigger trg_courses_updated_at
  before update on courses
  for each row execute function set_updated_at();

-- ── Row Level Security ─────────────────────────────────────────────────
alter table courses enable row level security;
alter table modules enable row level security;
alter table lessons enable row level security;
alter table lesson_video_content enable row level security;
alter table lesson_reading_content enable row level security;
alter table lesson_quiz_content enable row level security;
alter table quiz_questions enable row level security;

-- Public can read published courses; admins can read/write everything.
create policy "Published courses are publicly readable"
  on courses for select using (is_published = true);

create policy "Admins manage courses"
  on courses for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Modules readable when course is published"
  on modules for select using (
    exists (select 1 from courses c where c.id = course_id and c.is_published = true)
  );

create policy "Admins manage modules"
  on modules for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

-- Lessons: actual content access (video URLs, quiz answers) is gated
-- further by enrollment — see 0003 enrollments policies for the
-- "enrolled students can read lesson content" rule. Here we only allow
-- admins full access; the public/enrolled read policy is added in 0003
-- after the enrollments table exists (avoids forward-reference).
create policy "Admins manage lessons"
  on lessons for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins manage video content"
  on lesson_video_content for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins manage reading content"
  on lesson_reading_content for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins manage quiz content"
  on lesson_quiz_content for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Admins manage quiz questions"
  on quiz_questions for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );
