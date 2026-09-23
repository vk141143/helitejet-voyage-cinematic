create extension if not exists pgcrypto;

do $$ begin
  create type public.app_role as enum ('CUSTOMER', 'SALES', 'ADMIN');
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.request_status as enum ('DRAFT', 'SUBMITTED', 'UNDER_REVIEW', 'SALES_CONTACTED', 'OPTIONS_FOUND', 'QUOTE_SENT', 'CUSTOMER_APPROVAL', 'PAYMENT_PENDING', 'BOOKED', 'COMPLETED', 'CANCELLED', 'REJECTED', 'EXPIRED');
exception when duplicate_object then null;
end $$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  email text not null default '',
  mobile text,
  role public.app_role not null default 'CUSTOMER',
  country text,
  company text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.requests (
  id uuid primary key default gen_random_uuid(),
  request_number text unique not null,
  customer_id uuid not null references public.profiles(id) on delete restrict,
  service_type text not null,
  service_subtype text,
  status public.request_status not null default 'SUBMITTED',
  people_count integer not null check (people_count > 0),
  budget numeric,
  currency text not null default 'EUR',
  departure text,
  destination text,
  start_date date,
  end_date date,
  trip_type text,
  additional_requirements text,
  customer_details jsonb not null default '{}'::jsonb,
  service_details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.request_documents (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  customer_id uuid not null references public.profiles(id) on delete cascade,
  storage_path text not null,
  original_filename text not null,
  mime_type text not null,
  file_size bigint not null,
  document_type text not null default 'SUPPORTING_DOCUMENT',
  created_at timestamptz not null default now()
);

create table if not exists public.request_timeline (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  actor_id uuid references public.profiles(id),
  event_type text not null,
  message text not null,
  created_at timestamptz not null default now()
);

create index if not exists requests_customer_id_idx on public.requests(customer_id);
create index if not exists requests_status_idx on public.requests(status);
create index if not exists request_documents_request_id_idx on public.request_documents(request_id);

create or replace function public.is_role(required_role public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = required_role);
$$;

create or replace function public.next_request_number()
returns text language plpgsql security definer set search_path = public as $$
declare next_number integer;
begin
  select count(*) + 1 into next_number from public.requests;
  return 'HJ-REQ-' || lpad(next_number::text, 6, '0');
end;
$$;

alter table public.profiles enable row level security;
alter table public.requests enable row level security;
alter table public.request_documents enable row level security;
alter table public.request_timeline enable row level security;

drop policy if exists profiles_self_select on public.profiles;
create policy profiles_self_select on public.profiles for select using (id = auth.uid() or public.is_role('ADMIN') or (public.is_role('SALES') and role = 'CUSTOMER'));
drop policy if exists profiles_self_update on public.profiles;
create policy profiles_self_update on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists profiles_customer_insert on public.profiles;
create policy profiles_customer_insert on public.profiles for insert with check (id = auth.uid() and role = 'CUSTOMER');

drop policy if exists requests_customer_select on public.requests;
create policy requests_customer_select on public.requests for select using (customer_id = auth.uid() or public.is_role('ADMIN') or public.is_role('SALES'));
drop policy if exists requests_customer_insert on public.requests;
create policy requests_customer_insert on public.requests for insert with check (customer_id = auth.uid() and public.is_role('CUSTOMER'));
drop policy if exists requests_staff_update on public.requests;
create policy requests_staff_update on public.requests for update using (public.is_role('ADMIN') or public.is_role('SALES')) with check (public.is_role('ADMIN') or public.is_role('SALES'));

drop policy if exists request_documents_customer_select on public.request_documents;
create policy request_documents_customer_select on public.request_documents for select using (customer_id = auth.uid() or public.is_role('ADMIN') or public.is_role('SALES'));
drop policy if exists request_documents_customer_insert on public.request_documents;
create policy request_documents_customer_insert on public.request_documents for insert with check (customer_id = auth.uid() and exists (select 1 from public.requests r where r.id = request_id and r.customer_id = auth.uid()));

drop policy if exists timeline_visible_to_participants on public.request_timeline;
create policy timeline_visible_to_participants on public.request_timeline for select using (exists (select 1 from public.requests r where r.id = request_id and (r.customer_id = auth.uid() or public.is_role('SALES') or public.is_role('ADMIN'))));
drop policy if exists timeline_staff_insert on public.request_timeline;
create policy timeline_staff_insert on public.request_timeline for insert with check (public.is_role('SALES') or public.is_role('ADMIN'));

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, email, mobile, role)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', ''), new.email, new.raw_user_meta_data->>'mobile', 'CUSTOMER')
  on conflict (id) do update set email = excluded.email, full_name = excluded.full_name, mobile = excluded.mobile, updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

insert into storage.buckets (id, name, public) values ('request-documents', 'request-documents', false) on conflict (id) do nothing;

drop policy if exists request_documents_storage_select on storage.objects;
create policy request_documents_storage_select on storage.objects for select using (bucket_id = 'request-documents' and (public.is_role('ADMIN') or public.is_role('SALES') or (auth.uid()::text = (storage.foldername(name))[1])));
drop policy if exists request_documents_storage_insert on storage.objects;
create policy request_documents_storage_insert on storage.objects for insert with check (bucket_id = 'request-documents' and auth.uid()::text = (storage.foldername(name))[1]);
drop policy if exists request_documents_storage_delete on storage.objects;
create policy request_documents_storage_delete on storage.objects for delete using (bucket_id = 'request-documents' and auth.uid()::text = (storage.foldername(name))[1]);
