import Link from 'next/link';
import { AlertCircle } from 'lucide-react';
import AuthCardWrapper from '@/components/auth/AuthCardWrapper';

/**
 * TokenExpiredScreen — shown when the recovery link is expired/used.
 * Single Responsibility: this one screen only. Wording preserved
 * exactly from the original codebase.
 */
export default function TokenExpiredScreen({ onRequestNew }: { onRequestNew: () => void }) {
  return (
    <AuthCardWrapper>
      <div className="text-center">
        <div className="w-14 h-14 rounded-full bg-warning/10 border border-warning/20 flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={28} className="text-warning" />
        </div>
        <h1 className="text-2xl font-bold text-text-primary mb-2">Link expired</h1>
        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          This password reset link has expired or has already been used. Links are valid for 1
          hour. Request a new one below.
        </p>
        <button
          onClick={onRequestNew}
          className="w-full py-3 rounded-xl bg-gradient-cta text-white font-semibold text-sm transition hover:opacity-90"
        >
          Request a New Link
        </button>
        <Link href="/login" className="block mt-4 text-sm text-text-faint hover:text-text-secondary transition">
          ← Back to login
        </Link>
      </div>
    </AuthCardWrapper>
  );
}
