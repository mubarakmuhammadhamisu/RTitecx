'use client';

import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase/client';
import AuthCardWrapper from '@/components/auth/AuthCardWrapper';
import AuthErrorBanner from '@/components/auth/AuthErrorBanner';

/**
 * RequestResetFormScreen — the initial "Forgot your password?" form.
 * Single Responsibility: this one screen + its submit handler.
 */
interface RequestResetFormScreenProps {
  onEmailSent: (email: string) => void;
}

export default function RequestResetFormScreen({ onEmailSent }: RequestResetFormScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    setLoading(true);

    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? window.location.origin}/reset-password?type=recovery`,
    });

    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      onEmailSent(email);
    }
  }

  return (
    <AuthCardWrapper>
      <h1 className="text-2xl font-bold text-text-primary">Forgot your password?</h1>
      <p className="text-text-muted text-sm mt-1 mb-6">
        Enter your email and we&apos;ll send you a reset link.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium text-text-secondary">Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full px-4 py-3 rounded-lg bg-surface-800 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-brand-indigo-500/60 transition"
          />
        </div>

        {error && <AuthErrorBanner message={error} />}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-gradient-cta text-white font-semibold text-sm transition disabled:opacity-60"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      <Link href="/login" className="block text-center text-sm text-text-faint hover:text-text-secondary transition mt-4">
        ← Back to login
      </Link>
    </AuthCardWrapper>
  );
}
