import type { ProfileRow } from '@/lib/supabase/rowTypes';
import type { AppUser } from './AppUser';

/**
 * context/auth/rowToAppUser.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: convert a Supabase `profiles` row into the
 * AppUser shape used throughout the app.
 */
export function rowToAppUser(row: ProfileRow): AppUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    avatar: row.avatar,
    avatarUrl: row.avatar_url ?? null,
    role: row.role,
    location: row.location ?? '',
    bio: row.bio ?? '',
    phone: row.phone ?? '',
    preferences: row.preferences ?? {
      email_notifications: true,
      course_recommendations: true,
      weekly_digest: false,
    },
  };
}
