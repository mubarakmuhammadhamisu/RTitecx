'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export interface PasswordFormFields {
  current: string;
  new: string;
  confirm: string;
}

/**
 * lib/profile/useChangePasswordForm.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the change-password form's state machine.
 * Re-authentication and the actual password update happen server-side
 * in /api/change-password (called via updatePassword in AuthContext) —
 * this hook only manages client-side validation and UI state.
 */
export function useChangePasswordForm() {
  const { updatePassword } = useAuth();

  const [pwForm, setPwForm] = useState<PasswordFormFields>({ current: '', new: '', confirm: '' });
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwLoading, setPwLoading] = useState(false);

  const setField = (key: keyof PasswordFormFields, value: string) => {
    setPwForm((p) => ({ ...p, [key]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPwError('');
    setPwSuccess(false);

    if (!pwForm.current || !pwForm.new || !pwForm.confirm) {
      setPwError('All fields are required.');
      return;
    }
    if (pwForm.new.length < 8) {
      setPwError('New password must be at least 8 characters.');
      return;
    }
    if (pwForm.new !== pwForm.confirm) {
      setPwError('Passwords do not match.');
      return;
    }

    setPwLoading(true);
    const result = await updatePassword(pwForm.current, pwForm.new);
    setPwLoading(false);

    if (result.error) {
      setPwError(result.error);
    } else {
      setPwSuccess(true);
      setPwForm({ current: '', new: '', confirm: '' });
    }
  };

  return { pwForm, setField, pwError, pwSuccess, pwLoading, handlePasswordSubmit };
}
