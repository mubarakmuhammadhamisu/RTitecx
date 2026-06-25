'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * lib/profile/usePreferencesToggle.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: handle a single preference checkbox toggle and
 * surface a save error if the write fails. updatePreferences only calls
 * setUser on success, so on failure the checkbox naturally reverts to
 * showing the old (unsaved) value — no manual rollback needed here.
 */
export function usePreferencesToggle() {
  const { updatePreferences } = useAuth();
  const [prefError, setPrefError] = useState('');

  const handlePrefChange = async (
    currentPreferences: AppUser['preferences'],
    key: keyof AppUser['preferences'],
    value: boolean
  ) => {
    setPrefError('');
    const result = await updatePreferences({ ...currentPreferences, [key]: value });
    if (result?.error) {
      setPrefError('Settings could not be saved. Please check your connection.');
    }
  };

  return { prefError, handlePrefChange };
}
