import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import AuthCardWrapper from '@/components/auth/AuthCardWrapper';

/**
 * PasswordUpdatedScreen — shown after a successful password reset.
 * Single Responsibility: this one screen only.
 */
export default function PasswordUpdatedScreen() {
  return (
    <AuthCardWrapper>
      <div className="text-center">
        <CheckCircle2 size={40} className="text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-text-primary mb-2">Password updated!</h1>
        <p className="text-text-muted text-sm mb-6">You can now log in with your new password.</p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded-xl bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white font-semibold transition"
        >
          Go to Login
        </Link>
      </div>
    </AuthCardWrapper>
  );
}
