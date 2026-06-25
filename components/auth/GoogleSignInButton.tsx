'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * GoogleSignInButton — "Continue with Google" OAuth button, reused on
 * both /login and /register (Supabase treats sign-in and sign-up via
 * OAuth identically — there's no separate "register with Google" flow).
 *
 * Single Responsibility: this one button + its loading/error state.
 */
interface GoogleSignInButtonProps {
  redirectTo: string;
  label?: string;
}

export default function GoogleSignInButton({
  redirectTo,
  label = 'Continue with Google',
}: GoogleSignInButtonProps) {
  const { signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleClick = async () => {
    setError('');
    setIsLoading(true);
    const result = await signInWithGoogle(redirectTo);
    // On success the browser navigates away immediately, so isLoading
    // only ever needs to be reset on the error path.
    if (result.error) {
      setIsLoading(false);
      setError('Could not start Google sign-in. Please try again.');
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleClick}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-surface-800 border border-glass-border hover:border-brand-indigo-500/40 text-text-primary text-sm font-medium transition disabled:opacity-60"
      >
        <GoogleLogo />
        {isLoading ? 'Redirecting…' : label}
      </button>
      {error && <p className="text-xs text-danger mt-2 text-center">{error}</p>}
    </div>
  );
}

/** Inline Google "G" logomark — kept here since it's only ever used by
 *  this one button and isn't a general-purpose icon. */
function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 01-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.81.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 009 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.97 10.72A5.41 5.41 0 013.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 000 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"
      />
      <path
        fill="#EA4335"
        d="M9 3.58c1.32 0 2.51.46 3.44 1.35l2.59-2.59C13.46.89 11.43 0 9 0A9 9 0 00.96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z"
      />
    </svg>
  );
}
