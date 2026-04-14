-- Momentum Dashboard — Optional Supabase Schema
-- Only needed if you want cloud sync across devices
-- By default, the app uses localStorage (no setup needed)

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,
  title text not null,
  status text not null default 'captured' check (status in ('captured', 'doing', 'done')),
  xp int not null default 100,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  completed_at timestamptz
);

alter table tasks enable row level security;

create policy "Users see own tasks" on tasks
  for all using (auth.uid() = user_id);
