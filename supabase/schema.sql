-- PaletteSnap reference schema
-- Run this in the Supabase SQL editor (or via psql) to set up a fresh backend.
-- The columns mirror exactly what src/store/useStore.ts reads and writes.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- palettes
-- ---------------------------------------------------------------------------
create table if not exists public.palettes (
  id               text primary key,
  colors           text[]      not null,
  tags             text[]      not null default '{}',
  likes            integer     not null default 0,
  is_user_created  boolean     not null default false,
  created_at       timestamptz not null default now()
);

create index if not exists palettes_created_at_idx
  on public.palettes (created_at desc, id asc);

-- ---------------------------------------------------------------------------
-- likes (one row per device per palette)
-- ---------------------------------------------------------------------------
create table if not exists public.likes (
  device_id   text        not null,
  palette_id  text        not null references public.palettes (id) on delete cascade,
  created_at  timestamptz not null default now(),
  primary key (device_id, palette_id)
);

create index if not exists likes_palette_id_idx on public.likes (palette_id);
create index if not exists likes_device_id_idx  on public.likes (device_id);

-- ---------------------------------------------------------------------------
-- Row level security
--
-- PaletteSnap has no accounts. The client is anonymous, so RLS here only
-- stops writes from other keys, not from other visitors. Tighten these
-- policies if you add auth later.
-- ---------------------------------------------------------------------------
alter table public.palettes enable row level security;
alter table public.likes     enable row level security;

create policy "anyone can read palettes"
  on public.palettes for select
  to anon, authenticated
  using (true);

create policy "anyone can publish a palette"
  on public.palettes for insert
  to anon, authenticated
  with check (is_user_created = true);

create policy "anyone can update like counts"
  on public.palettes for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "anyone can read likes"
  on public.likes for select
  to anon, authenticated
  using (true);

create policy "anyone can add a like"
  on public.likes for insert
  to anon, authenticated
  with check (true);

create policy "anyone can remove a like"
  on public.likes for delete
  to anon, authenticated
  using (true);
