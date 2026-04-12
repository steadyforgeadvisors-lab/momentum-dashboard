-- Run this in your Supabase SQL Editor to set up the database

create extension if not exists "uuid-ossp";

create table if not exists tasks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text not null,
  status text not null default 'captured' check (status in ('captured', 'doing', 'done')),
  xp integer default 100,
  created_at timestamptz default now(),
  started_at timestamptz,
  completed_at timestamptz
);

alter table tasks enable row level security;

create policy "Users can manage their own tasks"
  on tasks for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index tasks_user_id_idx on tasks(user_id);
create index tasks_status_idx on tasks(status);