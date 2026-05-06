create extension if not exists pgcrypto;

create table if not exists public.polls (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(trim(title)) > 0),
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  title text not null check (char_length(trim(title)) > 0),
  url text,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references public.polls(id) on delete cascade,
  option_id uuid not null references public.poll_options(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists poll_options_poll_id_idx on public.poll_options(poll_id);
create index if not exists votes_poll_id_idx on public.votes(poll_id);
create index if not exists votes_option_id_idx on public.votes(option_id);

alter table public.polls enable row level security;
alter table public.poll_options enable row level security;
alter table public.votes enable row level security;

create policy "Anyone can read polls"
  on public.polls for select
  using (true);

create policy "Anyone can create polls"
  on public.polls for insert
  with check (true);

create policy "Anyone can read poll options"
  on public.poll_options for select
  using (true);

create policy "Anyone can create poll options"
  on public.poll_options for insert
  with check (true);

create policy "Anyone can read votes"
  on public.votes for select
  using (true);

create policy "Anyone can create votes"
  on public.votes for insert
  with check (true);
