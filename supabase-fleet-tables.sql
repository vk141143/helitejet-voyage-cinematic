-- Run this in your Supabase SQL editor

create table if not exists aircraft (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('flight','helicopter')),
  model text not null,
  capacity text not null,
  seats integer,
  created_at timestamptz default now()
);

create table if not exists yachts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  yacht_type text,
  length_m numeric,
  capacity text,
  guests integer,
  created_at timestamptz default now()
);

-- Public read (needed for home page planner before login)
alter table aircraft enable row level security;
drop policy if exists "public read aircraft" on aircraft;
drop policy if exists "admin insert aircraft" on aircraft;
drop policy if exists "admin update aircraft" on aircraft;
drop policy if exists "admin delete aircraft" on aircraft;
create policy "public read aircraft" on aircraft for select using (true);
create policy "admin insert aircraft" on aircraft for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);
create policy "admin update aircraft" on aircraft for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN'::app_role)
) with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);
create policy "admin delete aircraft" on aircraft for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);

alter table yachts enable row level security;
drop policy if exists "public read yachts" on yachts;
drop policy if exists "admin insert yachts" on yachts;
drop policy if exists "admin delete yachts" on yachts;
create policy "public read yachts" on yachts for select using (true);
create policy "admin insert yachts" on yachts for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);
create policy "admin delete yachts" on yachts for delete using (
  exists (select 1 from profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);

-- Customer and sales support tickets visible to the requester and admins.
create table if not exists public.support_tickets (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid not null references public.profiles(id) on delete cascade,
  requester_role public.app_role not null check (requester_role in ('CUSTOMER', 'SALES')),
  subject text not null,
  message text not null,
  status text not null default 'OPEN' check (status in ('OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED')),
  admin_response text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.support_tickets enable row level security;
create index if not exists support_tickets_requester_id_idx on public.support_tickets(requester_id);
drop policy if exists "support requester or admin read" on public.support_tickets;
drop policy if exists "customer or sales create support" on public.support_tickets;
drop policy if exists "admin update support" on public.support_tickets;
create policy "support requester or admin read" on public.support_tickets for select using (
  requester_id = auth.uid() or exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);
create policy "customer or sales create support" on public.support_tickets for insert with check (
  requester_id = auth.uid() and requester_role = (select role from public.profiles where id = auth.uid())
  and requester_role in ('CUSTOMER', 'SALES')
);
create policy "admin update support" on public.support_tickets for update using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'::app_role)
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);

-- Live customer booking entitlements. Update these rows from your billing flow
-- or Supabase dashboard after a subscription or credit purchase.
create table if not exists public.customer_entitlements (
  customer_id uuid primary key references public.profiles(id) on delete cascade,
  subscription_status text not null default 'NONE' check (subscription_status in ('NONE', 'ACTIVE', 'PAUSED', 'EXPIRED')),
  subscription_plan text,
  credits_remaining integer not null default 0 check (credits_remaining >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.entitlement_purchases (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles(id) on delete cascade,
  purchase_type text not null check (purchase_type in ('SUBSCRIPTION', 'CREDITS')),
  product_code text not null,
  credits integer not null default 0 check (credits >= 0),
  amount_usd numeric(10, 2) not null check (amount_usd >= 0),
  status text not null default 'COMPLETED' check (status in ('COMPLETED', 'REFUNDED')),
  created_at timestamptz not null default now()
);

-- Request metadata is required before purchase_subscription creates a draft booking.
alter table public.requests add column if not exists request_mode text not null default 'ENQUIRY' check (request_mode in ('BOOKING', 'ENQUIRY'));
alter table public.requests add column if not exists entitlement_snapshot jsonb not null default '{}'::jsonb;
create index if not exists requests_event_type_idx on public.requests(service_type, service_subtype) where service_type = 'EVENT_AVIATION';

alter table public.entitlement_purchases enable row level security;
create index if not exists entitlement_purchases_customer_id_idx on public.entitlement_purchases(customer_id);
drop policy if exists "customers read own purchases" on public.entitlement_purchases;
create policy "customers read own purchases" on public.entitlement_purchases for select using (customer_id = auth.uid());
drop policy if exists "staff read customer purchases" on public.entitlement_purchases;
create policy "staff read customer purchases" on public.entitlement_purchases for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('SALES'::app_role, 'ADMIN'::app_role))
);

create or replace function public.purchase_subscription(plan_code text)
returns void language plpgsql security definer set search_path = public as $$
declare plan_name text; plan_price numeric;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'CUSTOMER'::app_role) then
    raise exception 'Only customers can purchase a subscription';
  end if;
  select name, price into plan_name, plan_price from (values
    ('HORIZON', 'The Horizon Club', 25.00::numeric),
    ('RESERVE', 'The Reserve Club', 50.00::numeric),
    ('HOUSE', 'The House Club', 100.00::numeric)
  ) as plans(code, name, price) where code = upper(plan_code);
  if plan_name is null then raise exception 'Unknown subscription plan'; end if;
  insert into public.entitlement_purchases(customer_id, purchase_type, product_code, amount_usd)
  values (auth.uid(), 'SUBSCRIPTION', upper(plan_code), plan_price);
  insert into public.customer_entitlements(customer_id, subscription_status, subscription_plan, updated_at)
  values (auth.uid(), 'ACTIVE', plan_name, now())
  on conflict (customer_id) do update set subscription_status = 'ACTIVE', subscription_plan = excluded.subscription_plan, updated_at = now();

  if not exists (
    select 1 from public.requests
    where customer_id = auth.uid() and request_mode = 'BOOKING' and status = 'DRAFT'
  ) then
    insert into public.requests (
      request_number, customer_id, service_type, status, request_mode,
      people_count, currency, customer_details, service_details
    ) values (
      public.next_request_number(), auth.uid(), 'AVIATION', 'DRAFT', 'BOOKING',
      1, 'USD', '{}'::jsonb, jsonb_build_object('subscription_plan', plan_name)
    );
  end if;
end;
$$;

create or replace function public.purchase_credits(credit_amount integer)
returns void language plpgsql security definer set search_path = public as $$
declare price numeric;
begin
  if not exists (select 1 from public.profiles where id = auth.uid() and role = 'CUSTOMER'::app_role) then
    raise exception 'Only customers can purchase credits';
  end if;
  if credit_amount not in (1000, 2500, 5000) then raise exception 'Invalid credit package'; end if;
  price := case credit_amount when 1000 then 25.00 when 2500 then 60.00 else 110.00 end;
  insert into public.entitlement_purchases(customer_id, purchase_type, product_code, credits, amount_usd)
  values (auth.uid(), 'CREDITS', credit_amount::text, credit_amount, price);
  insert into public.customer_entitlements(customer_id, credits_remaining, updated_at)
  values (auth.uid(), credit_amount, now())
  on conflict (customer_id) do update set credits_remaining = public.customer_entitlements.credits_remaining + excluded.credits_remaining, updated_at = now();
end;
$$;

revoke all on function public.purchase_subscription(text) from public;
grant execute on function public.purchase_subscription(text) to authenticated;
revoke all on function public.purchase_credits(integer) from public;
grant execute on function public.purchase_credits(integer) to authenticated;

alter table public.customer_entitlements enable row level security;
drop policy if exists "customers read own entitlement" on public.customer_entitlements;
drop policy if exists "staff read customer entitlements" on public.customer_entitlements;
drop policy if exists "admin manage customer entitlements" on public.customer_entitlements;
create policy "customers read own entitlement" on public.customer_entitlements for select using (customer_id = auth.uid());
create policy "staff read customer entitlements" on public.customer_entitlements for select using (
  exists (select 1 from public.profiles where id = auth.uid() and role in ('SALES'::app_role, 'ADMIN'::app_role))
);
create policy "admin manage customer entitlements" on public.customer_entitlements for all using (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'::app_role)
) with check (
  exists (select 1 from public.profiles where id = auth.uid() and role = 'ADMIN'::app_role)
);

create or replace function public.consume_customer_credit()
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.customer_entitlements
  set credits_remaining = credits_remaining - 1, updated_at = now()
  where customer_id = auth.uid() and subscription_status <> 'ACTIVE' and credits_remaining > 0;
end;
$$;

revoke all on function public.consume_customer_credit() from public;
grant execute on function public.consume_customer_credit() to authenticated;

drop policy if exists "customers update own draft booking" on public.requests;
create policy "customers update own draft booking" on public.requests for update using (
  customer_id = auth.uid() and status = 'DRAFT' and request_mode = 'BOOKING'
) with check (
  customer_id = auth.uid() and request_mode = 'BOOKING'
  and status in ('DRAFT', 'SUBMITTED')
);

do $$ begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'requests'
  ) then
    alter publication supabase_realtime add table public.requests;
  end if;
exception when undefined_object then null;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'entitlement_purchases'
  ) then
    alter publication supabase_realtime add table public.entitlement_purchases;
  end if;
exception when undefined_object then null;
end $$;

do $$ begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'customer_entitlements'
  ) then
    alter publication supabase_realtime add table public.customer_entitlements;
  end if;
exception when undefined_object then null;
end $$;
