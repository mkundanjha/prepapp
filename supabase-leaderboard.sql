-- Public profiles table (display name + avatar for leaderboard)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  avatar_url text,
  updated_at timestamptz default now()
);

alter table public.profiles enable row level security;
create policy "profiles readable by all" on public.profiles for select using (true);
create policy "own profile writable" on public.profiles for all using (auth.uid() = id);

-- Leaderboard function: streak * 10 + avg_accuracy ranked top 20
create or replace function public.get_leaderboard()
returns table (
  user_id uuid,
  full_name text,
  avatar_url text,
  total_quizzes bigint,
  avg_pct numeric,
  streak bigint,
  score numeric
) language sql security definer as $$
  with user_dates as (
    select distinct user_id, to_date(date, 'YYYY-MM-DD') as quiz_date
    from quiz_results
  ),
  ranked as (
    select
      user_id,
      quiz_date,
      row_number() over (partition by user_id order by quiz_date asc) as rn
    from user_dates
  ),
  groups as (
    select user_id, quiz_date, (quiz_date - rn::int) as grp
    from ranked
  ),
  current_groups as (
    select distinct user_id, grp
    from groups
    where quiz_date >= current_date - 1
  ),
  streaks as (
    select g.user_id, count(*) as streak
    from groups g
    join current_groups cg on g.user_id = cg.user_id and g.grp = cg.grp
    group by g.user_id
  ),
  stats as (
    select
      user_id,
      count(*) as total_quizzes,
      round(avg(score::numeric / nullif(total, 0) * 100), 1) as avg_pct
    from quiz_results
    group by user_id
  )
  select
    p.id as user_id,
    p.full_name,
    p.avatar_url,
    coalesce(s2.total_quizzes, 0) as total_quizzes,
    coalesce(s2.avg_pct, 0) as avg_pct,
    coalesce(st.streak, 0) as streak,
    round(coalesce(st.streak, 0) * 10 + coalesce(s2.avg_pct, 0) + coalesce(s2.total_quizzes, 0) * 3, 1) as score
  from profiles p
  join stats s2 on s2.user_id = p.id
  left join streaks st on st.user_id = p.id
  order by score desc
  limit 20
$$;
