-- Remote mode anonymous payment tracking
--
-- This app intentionally avoids user accounts.
-- Payment is tracked by a client-generated device_id (stored in localStorage).
--
-- NOTE: This does NOT provide strong anti-fraud guarantees (the app already has a trust-based paywall),
-- it mainly improves persistence across cache clears.

create table if not exists public.payments (
  device_id text primary key,
  payment_timestamp timestamptz not null default now(),
  checkout_id text,
  game_mode text not null default 'remote'
);

create index if not exists payments_game_mode_idx on public.payments (game_mode);


