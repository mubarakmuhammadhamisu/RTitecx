'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

/**
 * RegisterSuccessScreen — "Check your email" confirmation screen shown
 * after successful sign-up, with a resend-confirmation-link action.
 * Wording preserved exactly from the original codebase.
 *
 * Single Responsibility: this one screen + its resend action.
 */
interface RegisterSuccessScreenProps {
  email: string;
  loginRedirectHref: string;
}

export default function RegisterSuccessScreen({
  email,
  loginRedirectHref,
}: RegisterSuccessScreenProps) {
  const [resendStatus, setResendStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleResend = async () => {
    setResendStatus('sending');
    const { error: resendError } = await supabase.auth.resend({ type: 'signup', email });
    setResendStatus(resendError ? 'error' : 'sent');
  };

  return (
    <div className="min-h-screen bg-surface-950 text-text-secondary flex flex-col items-center justify-center px-4">
      <Link href="/" className="text-2xl font-extrabold text-text-primary mb-8 hover:text-brand-indigo-300 transition">
        TITECX
      </Link>
      <div className="w-full max-w-md bg-surface-900 rounded-2xl border border-success/30 shadow-[0_0_40px_rgba(99,102,241,0.1)] p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/20 border border-success/30 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 size={32} className="text-success" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Check your email</h1>
        <p className="text-text-muted text-sm leading-relaxed">
          We sent a confirmation link to <span className="text-text-primary font-medium">{email}</span>. Click the
          link to activate your account, then log in.
        </p>

        {resendStatus === 'sent' && (
          <div className="mt-4 px-4 py-2.5 rounded-lg bg-success/10 border border-success/20 text-success text-sm">
            ✓ New link sent — also check your spam folder.
          </div>
        )}
        {resendStatus === 'error' && (
          <div className="mt-4 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm">
            <AlertCircle size={14} className="shrink-0" />
            Could not resend. Please wait a moment and try again.
          </div>
        )}

        <div className="mt-6 flex flex-col gap-3">
          <Link
            href={loginRedirectHref}
            className="inline-block px-6 py-3 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-semibold transition"
          >
            Go to Login
          </Link>
          {resendStatus !== 'sent' && (
            <button
              onClick={handleResend}
              disabled={resendStatus === 'sending'}
              className="text-sm text-text-faint hover:text-brand-indigo-400 transition flex items-center justify-center gap-1.5 disabled:opacity-60"
            >
              {resendStatus === 'sending' ? (
                <>
                  <RefreshCw size={13} className="animate-spin" /> Sending…
                </>
              ) : (
                "Didn't get the email? Resend it"
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
