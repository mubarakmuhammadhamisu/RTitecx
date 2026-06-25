-- ════════════════════════════════════════════════════════════════════════
-- 0001_extensions_and_profiles.sql
-- ────────────────────────────────────────────────────────────────────────
-- Purpose: enable required Postgres extensions and create the profiles
-- table that extends Supabase's built-in auth.users.
--
-- Run order: FIRST. Every other migration depends on `profiles` existing.
-- ════════════════════════════════════════════════════════════════════════

create extension if not exists "pgcrypto";   -- gen_random_uuid()
create extension if not exists "pg_trgm";    -- fuzzy search on course titles

-- ── profiles ────────────────────────────────────────────────────────────
-- One row per auth.users row. Created automatically via trigger below.
create table if not exists profiles (
  id                 uuid primary key references auth.users(id) on delete cascade,
  name               text not null default '',
  email              text not null,
  avatar             text not null default '',        -- initials fallback, e.g. "M"
  avatar_url         text,                              -- uploaded image URL
  role               text not null default 'student' check (role in ('student', 'admin')),
  location           text not null default '',
  bio                text not null default '',
  phone              text not null default '',
  preferences        jsonb not null default '{
    "email_notifications": true,
    "course_recommendations": true,
    "weekly_digest": true
  }'::jsonb,
  created_at         timestamptz not null default now()
);

-- Auto-create a profile row whenever a new auth user signs up.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    upper(left(coalesce(new.raw_user_meta_data->>'name', new.email), 1))
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();

-- ── Row Level Security ─────────────────────────────────────────────────
alter table profiles enable row level security;

create policy "Users can view their own profile"
  on profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on profiles for update
  using (auth.uid() = id);

-- Admins can view/update every profile. Checked via the role column on
-- the requester's own profile row (no recursion: this policy only reads
-- the CURRENT user's row to decide, then grants access to ALL rows).
create policy "Admins can view all profiles"
  on profiles for select
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

create policy "Admins can update all profiles"
  on profiles for update
  using (
    exists (
      select 1 from profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );
