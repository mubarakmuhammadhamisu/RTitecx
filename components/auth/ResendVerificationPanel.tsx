'use client';

import { useState } from 'react';
import { MailCheck, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';

/**
 * ResendVerificationPanel — shown only when Supabase returns an "Email
 * not confirmed" error during login. Lets the person request a fresh
 * confirmation link without re-registering. Wording preserved exactly
 * from the original codebase.
 */
interface ResendVerificationPanelProps {
  email: string;
  onBack: () => void;
}

export default function ResendVerificationPanel({ email, onBack }: ResendVerificationPanelProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handleResend = async () => {
    setStatus('sending');
    const { error } = await supabase.auth.resend({ type: 'signup', email });
    setStatus(error ? 'error' : 'sent');
  };

  return (
    <div className="w-full max-w-md bg-surface-900 rounded-2xl border border-brand-indigo-500/20 shadow-[0_0_40px_rgba(99,102,241,0.1)] p-8 text-center">
      <div className="w-14 h-14 rounded-full bg-brand-indigo-500/20 border border-brand-indigo-500/30 flex items-center justify-center mx-auto mb-4">
        <MailCheck size={26} className="text-brand-indigo-400" />
      </div>
      <h2 className="text-xl font-bold text-text-primary mb-2">Email not verified</h2>
      <p className="text-text-muted text-sm leading-relaxed mb-1">
        Your account exists but the confirmation link hasn&apos;t been clicked yet.
      </p>
      <p className="text-text-muted text-sm leading-relaxed mb-6">
        We&apos;ll send a fresh link to <span className="text-text-primary font-medium">{email}</span>.
      </p>

      {status === 'sent' ? (
        <div className="px-4 py-3 rounded-xl bg-success/10 border border-success/20 text-success text-sm mb-5">
          ✓ New link sent — check your inbox (and spam folder).
        </div>
      ) : status === 'error' ? (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-danger/10 border border-danger/20 text-danger text-sm mb-5">
          <AlertCircle size={14} className="shrink-0" />
          Could not send the link. Please try again in a minute.
        </div>
      ) : null}

      <button
        onClick={handleResend}
        disabled={status === 'sending' || status === 'sent'}
        className="w-full py-3 rounded-xl bg-gradient-cta hover:opacity-90 text-white font-semibold text-sm transition disabled:opacity-60 flex items-center justify-center gap-2"
      >
        {status === 'sending' ? (
          <>
            <RefreshCw size={15} className="animate-spin" /> Sending…
          </>
        ) : status === 'sent' ? (
          'Link sent!'
        ) : (
          'Resend verification email'
        )}
      </button>

      <button onClick={onBack} className="mt-4 text-sm text-text-faint hover:text-text-secondary transition">
        ← Back to login
      </button>
    </div>
  );
}
