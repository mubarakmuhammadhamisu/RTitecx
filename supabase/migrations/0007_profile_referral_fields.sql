-- ════════════════════════════════════════════════════════════════════════
-- 0007_profile_referral_fields.sql
-- ────────────────────────────────────────────────────────────────────────
-- Purpose: add the 3 profile columns the referral/credits system
-- depends on — credit_balance, lifetime_points, referral_code — and
-- auto-generate a unique referral code for every new profile.
--
-- These were missing from 0001_extensions_and_profiles.sql; this
-- migration fills that gap rather than editing 0001 directly, since
-- 0001 may already have been run against a live database by the time
-- this gap was caught.
--
-- Run order: SEVENTH (after 0005, before/independent of 0006).
-- ════════════════════════════════════════════════════════════════════════

alter table profiles
  add column if not exists credit_balance integer not null default 0,
  add column if not exists lifetime_points integer not null default 0,
  add column if not exists referral_code text unique;

-- ── Referral code generator ─────────────────────────────────────────────
-- Format: 4 letters + "-" + 4 alphanumeric, e.g. "ABCD-1X2Y". Matches
-- the REF_CODE_PATTERN regex (^[A-Z]{4}-[A-Z0-9]{4}$/i) already used
-- client-side in context/auth/attemptReferralClaim.ts and
-- lib/forms/useReferralCode.ts — the first segment MUST be letters-only
-- or the client-side validator will reject otherwise-valid codes.
create or replace function generate_referral_code()
returns text
language plpgsql
as $$
declare
  letter_chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ';        -- 24 letters, excludes ambiguous I/O
  alnum_chars text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';  -- 32 chars, excludes ambiguous I/O/0/1
  letters text := '';
  suffix text := '';
  code text;
  attempt integer := 0;
begin
  loop
    letters := '';
    for i in 1..4 loop
      letters := letters || substr(letter_chars, 1 + floor(random() * length(letter_chars))::int, 1);
    end loop;
    suffix := '';
    for i in 1..4 loop
      suffix := suffix || substr(alnum_chars, 1 + floor(random() * length(alnum_chars))::int, 1);
    end loop;
    code := letters || '-' || suffix;

    exit when not exists (select 1 from profiles where referral_code = code);
    attempt := attempt + 1;
    if attempt > 20 then
      raise exception 'Could not generate a unique referral code after 20 attempts';
    end if;
  end loop;

  return code;
end;
$$;

-- ── Update handle_new_user to assign a referral code on signup ─────────
-- Redefines the trigger function from 0001 to also set referral_code.
-- CREATE OR REPLACE is safe here since the trigger itself (already
-- attached in 0001) references this function by name, not by body.
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, avatar, referral_code)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    upper(left(coalesce(new.raw_user_meta_data->>'name', new.email), 1)),
    generate_referral_code()
  );
  return new;
end;
$$;

-- ── Backfill referral codes for any profiles created before this
--    migration ran (e.g. if 0001 was already live in production) ───────
do $$
declare
  r record;
begin
  for r in select id from profiles where referral_code is null loop
    update profiles set referral_code = generate_referral_code() where id = r.id;
  end loop;
end $$;
