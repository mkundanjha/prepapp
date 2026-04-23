-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- User settings (one row per user)
create table public.user_settings (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  start_date text,
  target_date text,
  pause_active boolean default false,
  pause_from text,
  pause_until text,
  theme_mode text default 'system',
  checks boolean[] default array[false, false, false],
  updated_at timestamptz default now()
);

-- Quiz results history
create table public.quiz_results (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  date text not null,
  score integer not null,
  total integer not null,
  created_at timestamptz default now()
);

-- Session logs
create table public.session_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  label text,
  duration integer,
  started_at timestamptz,
  created_at timestamptz default now()
);

-- Reminders
create table public.reminders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null,
  reminder_id text not null,
  label text,
  time text,
  days integer[],
  enabled boolean default true,
  duration integer,
  unique(user_id, reminder_id)
);

-- Quiz level preference
create table public.quiz_preferences (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade not null unique,
  quiz_level text default 'mixed'
);

-- Row Level Security: users can only access their own data
alter table public.user_settings enable row level security;
alter table public.quiz_results enable row level security;
alter table public.session_logs enable row level security;
alter table public.reminders enable row level security;
alter table public.quiz_preferences enable row level security;

create policy "own data only" on public.user_settings for all using (auth.uid() = user_id);
create policy "own data only" on public.quiz_results for all using (auth.uid() = user_id);
create policy "own data only" on public.session_logs for all using (auth.uid() = user_id);
create policy "own data only" on public.reminders for all using (auth.uid() = user_id);
create policy "own data only" on public.quiz_preferences for all using (auth.uid() = user_id);
