import { supabase } from './client';

/**
 * lib/supabase/uploadAvatar.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: upload a profile avatar image to the "avatars"
 * Supabase Storage bucket and return its public URL.
 *
 * Validates type/size before upload to prevent XSS-via-SVG and oversized
 * payloads. Uses a fixed path (no extension) with upsert so re-uploading
 * always overwrites the same storage object rather than creating
 * orphaned files each time a user changes file type.
 */
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function uploadAvatar(
  userId: string,
  file: File
): Promise<{ url?: string; path?: string; error?: string }> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return { error: 'Only JPG, PNG, WebP, or GIF images are allowed.' };
  }
  if (file.size > MAX_SIZE_BYTES) {
    return { error: 'Image must be under 5 MB.' };
  }

  const path = `${userId}/avatar`;

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(path, file, { upsert: true, contentType: file.type });

  if (uploadError) return { error: uploadError.message };

  const { data } = supabase.storage.from('avatars').getPublicUrl(path);
  return { url: `${data.publicUrl}?t=${Date.now()}`, path };
}
