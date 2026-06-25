import { createBrowserClient } from '@supabase/ssr';

/**
 * lib/supabase/client.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: construct and export the browser Supabase
 * client. Row type definitions live in lib/supabase/rowTypes.ts. Storage
 * helpers (e.g. avatar upload) live in their own dedicated files.
 */
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase env vars. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local'
  );
}

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
