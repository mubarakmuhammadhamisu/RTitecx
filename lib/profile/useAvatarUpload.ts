'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const MAX_AVATAR_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

/**
 * lib/profile/useAvatarUpload.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: avatar file selection, client-side size
 * validation, and upload state. The actual storage upload logic lives
 * in lib/supabase/uploadAvatar.ts (called via updateAvatar in
 * AuthContext) — this hook only manages the UI-facing state around it.
 */
export function useAvatarUpload() {
  const { updateAvatar } = useAuth();
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [avatarError, setAvatarError] = useState('');

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarError('');

    if (file.size > MAX_AVATAR_SIZE_BYTES) {
      setAvatarError('Image must be under 2MB.');
      return;
    }

    setAvatarLoading(true);
    const result = await updateAvatar(file);
    setAvatarLoading(false);
    if (result?.error) {
      // updateAvatar already rolled back the Storage file on DB failure.
      setAvatarError(result.error);
    }
  };

  return { avatarLoading, avatarError, handleAvatarChange };
}
