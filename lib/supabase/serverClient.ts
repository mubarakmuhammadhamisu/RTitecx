import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

/**
 * lib/supabase/serverClient.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: construct a Supabase client for use in Server
 * Components, Server Actions, and Route Handlers — where the browser
 * client (lib/supabase/client.ts) cannot run because there is no
 * `window`. Reads/writes the session via Next.js cookies.
 */
export async function createSupabaseServerClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component without a writable response —
            // safe to ignore; middleware refreshes the session instead.
          }
        },
      },
    }
  );
}
