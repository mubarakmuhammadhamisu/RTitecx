'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { focusNextOnEnter } from '@/lib/forms/focusNextOnEnter';
import PasswordInput from '@/components/auth/PasswordInput';
import AuthErrorBanner from '@/components/auth/AuthErrorBanner';
import ResendVerificationPanel from '@/components/auth/ResendVerificationPanel';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';
import AuthDivider from '@/components/auth/AuthDivider';

/**
 * LoginForm — the email/password login form, including the email-not-
 * confirmed → resend-panel branch. Wording preserved exactly from the
 * original codebase.
 *
 * Single Responsibility: the login form itself. Redirect handling
 * (reading ?redirect=, sanitizing it, navigating on success) lives in
 * the parent page component (app/login/page.tsx) since that's a
 * page-level concern, not a form-level one.
 */
interface LoginFormProps {
  onLoginSuccess: () => void;
  redirectTo: string;
}

export default function LoginForm({ onLoginSuccess, redirectTo }: LoginFormProps) {
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResend, setShowResend] = useState(false);

  // Refs for Enter-key focus chaining: Email → Password → (Enter submits)
  const passwordRef = useRef<HTMLInputElement>(null);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.error) {
      // Supabase returns this exact string when email confirmation is
      // pending. Detect it and show the resend panel instead of a raw
      // error message.
      if (
        result.error.toLowerCase().includes('email not confirmed') ||
        result.error.toLowerCase().includes('not confirmed')
      ) {
        setShowResend(true);
        return;
      }
      setError(result.error);
    } else {
      onLoginSuccess();
    }
  }

  if (showResend) {
    return (
      <ResendVerificationPanel
        email={email}
        onBack={() => {
          setShowResend(false);
          setError('');
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-md bg-surface-900 rounded-2xl border border-brand-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.1)] p-8">
      <h1 className="text-2xl font-bold text-text-primary">Welcome back</h1>
      <p className="text-text-muted text-sm mt-1">Log in to continue learning</p>

      <div className="mt-6">
        <GoogleSignInButton redirectTo={redirectTo} />
      </div>
      <AuthDivider />

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => focusNextOnEnter(e, passwordRef)}
            className="mt-1.5 w-full px-4 py-3 rounded-lg bg-surface-800 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-brand-indigo-500/60 transition"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-sm font-medium text-text-secondary">Password</label>
            <Link href="/reset-password" className="text-xs text-brand-indigo-400 hover:text-brand-indigo-300 transition">
              Forgot password?
            </Link>
          </div>
          <PasswordInput
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <AuthErrorBanner message={error} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-semibold text-sm transition disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Log In'}
        </button>
      </form>

      <p className="text-sm text-text-muted text-center mt-5">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-brand-indigo-400 hover:text-brand-indigo-300 transition font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
