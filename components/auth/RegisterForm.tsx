'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { focusNextOnEnter } from '@/lib/forms/focusNextOnEnter';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthErrorBanner from '@/components/auth/AuthErrorBanner';
import PasswordStrengthMeter from '@/components/auth/PasswordStrengthMeter';
import ConfirmPasswordFeedback from '@/components/auth/ConfirmPasswordFeedback';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import AuthDivider from '@/components/auth/AuthDivider';

/**
 * RegisterForm — the registration form itself (name/email/password/
 * confirm). Wording preserved exactly from the original codebase.
 *
 * Single Responsibility: the form only. Referral code resolution lives
 * in useReferralCode.ts; the post-success screen lives in
 * RegisterSuccessScreen.tsx; redirect handling lives in the parent page.
 */
interface RegisterFormProps {
  refCode: string;
  loginRedirectHref: string;
  redirectTo: string;
  onRegisterSuccess: (email: string) => void;
}

export default function RegisterForm({
  refCode,
  loginRedirectHref,
  redirectTo,
  onRegisterSuccess,
}: RegisterFormProps) {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Refs for Enter-key focus chaining: Name → Email → Password → Confirm
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  // Persist the referral code to localStorage so it survives the
  // Google OAuth redirect round-trip (the page fully navigates away to
  // Google and back — refCode as a prop/state would be lost). The
  // email/password path doesn't need this since `register()` passes
  // refCode directly; this only matters for "Sign up with Google".
  // attemptReferralClaim() (called after first login) reads this same key.
  useEffect(() => {
    if (!refCode) return;
    try {
      localStorage.setItem('titecx_ref', refCode);
    } catch {
      /* private browsing — referral simply won't be attributed via Google sign-up */
    }
  }, [refCode]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Client-side validation, in order, so the user gets the most
    // actionable error first.
    if (!name.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (!confirmPassword) {
      setError('Please confirm your password.');
      return;
    }
    // Confirm password is validated CLIENT-SIDE only — only the real
    // password is sent to Supabase. This field never touches the server.
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    const result = await register(name.trim(), email, password, refCode || undefined);
    setLoading(false);
    if (result.error) {
      setError(result.error);
    } else {
      onRegisterSuccess(email);
    }
  }

  return (
    <div className="w-full max-w-md bg-surface-900 rounded-2xl border border-brand-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.1)] p-8">
      <h1 className="text-2xl font-bold text-text-primary">Create your account</h1>
      <p className="text-text-muted text-sm mt-1">Start learning in minutes</p>

      <div className="mt-6">
        <GoogleSignInButton
          redirectTo={redirectTo}
          label="Sign up with Google"
        />
      </div>
      <AuthDivider />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary">Full Name</label>
          <input
            type="text"
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => focusNextOnEnter(e, emailRef)}
            className="mt-1.5 w-full px-4 py-3 rounded-lg bg-surface-800 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-brand-indigo-500/60 transition"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary">Email</label>
          <input
            ref={emailRef}
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => focusNextOnEnter(e, passwordRef)}
            className="mt-1.5 w-full px-4 py-3 rounded-lg bg-surface-800 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-brand-indigo-500/60 transition"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary">Password</label>
          <div className="mt-1.5">
            <PasswordInput
              ref={passwordRef}
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => focusNextOnEnter(e, confirmPasswordRef)}
            />
          </div>
          <PasswordStrengthMeter password={password} />
        </div>

        <div>
          <label className="text-sm font-medium text-text-secondary">Confirm Password</label>
          <div className="mt-1.5">
            <PasswordInput
              ref={confirmPasswordRef}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              // No onKeyDown — Enter on this final field submits the form
            />
          </div>
          <ConfirmPasswordFeedback password={password} confirmPassword={confirmPassword} />
        </div>

        {error && <AuthErrorBanner message={error} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-semibold text-sm transition disabled:opacity-60"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      <p className="text-sm text-text-muted text-center mt-5">
        Already have an account?{' '}
        <Link
          href={loginRedirectHref}
          className="text-brand-indigo-400 hover:text-brand-indigo-300 transition font-medium"
        >
          Log in
        </Link>
      </p>
    </div>
  );
}
