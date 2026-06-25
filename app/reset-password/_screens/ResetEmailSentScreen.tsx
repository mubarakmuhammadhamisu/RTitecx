import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import AuthCardWrapper from '@/components/auth/AuthCardWrapper';

/**
 * ResetEmailSentScreen — confirmation shown after requesting a reset link.
 * Single Responsibility: this one screen only. Wording preserved
 * exactly, including the privacy-conscious "if an account exists"
 * phrasing (avoids confirming/denying account existence).
 */
export default function ResetEmailSentScreen({ email }: { email: string }) {
  return (
    <AuthCardWrapper>
      <div className="text-center">
        <CheckCircle2 size={40} className="text-success mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-text-primary mb-2">Check your email</h1>
        <p className="text-text-muted text-sm">
          If an account exists for <span className="text-text-primary">{email}</span>, we&apos;ve sent a reset
          link. Check your inbox.
        </p>
        <Link href="/login" className="mt-6 inline-block text-sm text-brand-indigo-400 hover:text-brand-indigo-300 transition">
          ← Back to login
        </Link>
      </div>
    </AuthCardWrapper>
  );
}
