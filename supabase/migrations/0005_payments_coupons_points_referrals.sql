-- ════════════════════════════════════════════════════════════════════════
-- 0005_payments_coupons_points_referrals.sql
-- ────────────────────────────────────────────────────────────────────────
-- Purpose: monetization & gamification tables — Paystack payment records,
-- coupons, points balances, referrals, and mystery box tracking.
--
-- Run order: FIFTH.
-- ════════════════════════════════════════════════════════════════════════

-- ── payments ────────────────────────────────────────────────────────────
create table if not exists payments (
  id                  uuid primary key default gen_random_uuid(),
  user_id             uuid not null references profiles(id) on delete cascade,
  course_id           uuid not null references courses(id) on delete cascade,
  paystack_reference  text not null unique,
  amount_kobo         bigint not null,
  status              text not null default 'pending' check (status in ('success', 'failed', 'pending')),
  paid_at             timestamptz
);

create index if not exists idx_payments_user on payments (user_id);
create index if not exists idx_payments_reference on payments (paystack_reference);

-- ── coupons ─────────────────────────────────────────────────────────────
create table if not exists coupons (
  id                uuid primary key default gen_random_uuid(),
  code              text not null unique,
  discount_percent  integer check (discount_percent between 1 and 100),
  discount_amount_kobo bigint,            -- alternative to percent; one of the two should be set
  max_uses          integer,               -- null = unlimited
  uses_count        integer not null default 0,
  expires_at        timestamptz,
  is_active         boolean not null default true,
  created_at        timestamptz not null default now()
);

-- ── points ──────────────────────────────────────────────────────────────
create table if not exists points_ledger (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references profiles(id) on delete cascade,
  amount      integer not null,                -- positive = earned, negative = spent
  reason      text not null,                    -- e.g. "lesson_completed", "referral_bonus"
  reference_id uuid,                            -- optional FK-like pointer (lesson_id, referral_id, etc)
  created_at  timestamptz not null default now()
);

create index if not exists idx_points_ledger_user on points_ledger (user_id);

-- Materialized balance view (sum of ledger) — read via this view instead
-- of summing the ledger ad hoc in every API route.
create or replace view points_balances as
  select user_id, coalesce(sum(amount), 0) as balance
  from points_ledger
  group by user_id;

-- ── referrals ───────────────────────────────────────────────────────────
create table if not exists referrals (
  id              uuid primary key default gen_random_uuid(),
  referrer_id     uuid not null references profiles(id) on delete cascade,
  referred_id     uuid references profiles(id) on delete set null,
  referral_code   text not null,
  status          text not null default 'pending' check (status in ('pending', 'completed', 'rewarded')),
  created_at      timestamptz not null default now(),
  completed_at    timestamptz
);

create index if not exists idx_referrals_referrer on referrals (referrer_id);
create unique index if not exists idx_referrals_code on referrals (referral_code);

-- ── mystery_box_requests ──────────────────────────────────────────────
-- Tracks premium-tier students who completed within the deadline and are
-- requesting/receiving their mystery box reward.
create table if not exists mystery_box_requests (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references profiles(id) on delete cascade,
  enrollment_id uuid not null references enrollments(id) on delete cascade,
  status        text not null default 'pending' check (status in ('pending', 'approved', 'shipped', 'denied')),
  shipping_address text,
  requested_at  timestamptz not null default now(),
  resolved_at   timestamptz
);

-- ── RLS ─────────────────────────────────────────────────────────────────
alter table payments enable row level security;
alter table coupons enable row level security;
alter table points_ledger enable row level security;
alter table referrals enable row level security;
alter table mystery_box_requests enable row level security;

create policy "Students view their own payments"
  on payments for select using (auth.uid() = user_id);
create policy "Admins manage all payments"
  on payments for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Active coupons are publicly readable for validation"
  on coupons for select using (is_active = true);
create policy "Admins manage coupons"
  on coupons for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Students view their own points ledger"
  on points_ledger for select using (auth.uid() = user_id);
create policy "Admins manage points ledger"
  on points_ledger for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Students view their own referrals"
  on referrals for select using (auth.uid() = referrer_id or auth.uid() = referred_id);
create policy "Admins manage all referrals"
  on referrals for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );

create policy "Students view their own mystery box requests"
  on mystery_box_requests for select using (auth.uid() = user_id);
create policy "Students create their own mystery box request"
  on mystery_box_requests for insert with check (auth.uid() = user_id);
create policy "Admins manage all mystery box requests"
  on mystery_box_requests for all using (
    exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
  );
