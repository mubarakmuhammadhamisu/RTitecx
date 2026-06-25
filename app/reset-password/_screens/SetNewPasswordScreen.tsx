'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase/client';
import { validateNewPassword } from '@/lib/forms/validateNewPassword';
import AuthCardWrapper from '@/components/auth/AuthCardWrapper';
import PasswordInput from '@/components/auth/PasswordInput';
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter';
import AuthErrorBanner from '@/components/auth/AuthErrorBanner';

/**
 * SetNewPasswordScreen — the "Set new password" form shown once a valid
 * recovery token is confirmed. Single Responsibility: this one screen +
 * its submit handler.
 */
interface SetNewPasswordScreenProps {
  onSuccess: () => void;
}

export default function SetNewPasswordScreen({ onSuccess }: SetNewPasswordScreenProps) {
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    const validationError = validateNewPassword(newPw, confirmPw);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    const { error: updateError } = await supabase.auth.updateUser({ password: newPw });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
    } else {
      onSuccess();
    }
  }

  return (
    <AuthCardWrapper>
      <h1 className="text-2xl font-bold text-text-primary">Set new password</h1>
      <p className="text-text-muted text-sm mt-1 mb-6">Choose a strong password for your account.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary">New Password</label>
          <div className="mt-1.5">
            <PasswordInput
              placeholder="At least 8 characters + numbers/symbols"
              value={newPw}
              onChange={(e) => setNewPw(e.target.value)}
            />
          </div>
          <PasswordStrengthMeter password={newPw} />
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary">Confirm Password</label>
          <div className="mt-1.5">
            <PasswordInput
              placeholder="Re-enter new password"
              value={confirmPw}
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </div>
        </div>

        {error && <AuthErrorBanner message={error} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-cta text-white font-semibold text-sm transition disabled:opacity-60"
        >
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </AuthCardWrapper>
  );
}
