-- Secure development/bootstrap helpers.
-- These functions are intentionally not executable by anon/authenticated browser clients.
-- Run from Supabase SQL Editor or a trusted server-side process only.

create or replace function public.bootstrap_admin(target_user_id uuid)
returns public.profiles
language plpgsql
security definer
set search_path = public
as $$
declare updated_profile public.profiles;
begin
  update public.profiles
  set role = 'ADMIN', updated_at = now()
  where id = target_user_id
  returning * into updated_profile;

  if updated_profile.id is null then
    raise exception 'No profile exists for that authenticated user';
  end if;

  return updated_profile;
end;
$$;

revoke all on function public.bootstrap_admin(uuid) from public, anon, authenticated;
grant execute on function public.bootstrap_admin(uuid) to service_role;
