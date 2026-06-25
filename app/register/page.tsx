'use client';

import { Suspense, useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { sanitizeRedirectPath } from '@/lib/forms/sanitizeRedirectPath';
import { useReferralCode } from '@/lib/forms/useReferralCode';
import RegisterForm from '@/components/auth/RegisterForm';
import RegisterSuccessScreen from '@/components/auth/RegisterSuccessScreen';
import AuthPageLoadingFallback from '@/components/auth/AuthPageLoadingFallback';

/**
 * RegisterPageContent — owns the redirect target, referral code
 * resolution, and success/form toggle. Form logic itself is delegated
 * to RegisterForm; the post-success screen to RegisterSuccessScreen.
 */
function RegisterPageContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = sanitizeRedirectPath(searchParams.get('redirect'));
  const refCode = useReferralCode(searchParams.get('ref'));

  const [registeredEmail, setRegisteredEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoading && user) router.replace(redirect);
  }, [user, isLoading, redirect, router]);

  const loginRedirectHref = `/login?redirect=${encodeURIComponent(redirect)}`;

  if (registeredEmail) {
    return <RegisterSuccessScreen email={registeredEmail} loginRedirectHref={loginRedirectHref} />;
  }

  return (
    <div className="min-h-screen bg-surface-950 text-text-secondary flex flex-col items-center justify-center px-4">
      <Link href="/" className="text-2xl font-extrabold text-text-primary mb-8 hover:text-brand-indigo-300 transition">
        TITECX
      </Link>
      <RegisterForm
        refCode={refCode}
        loginRedirectHref={loginRedirectHref}
        redirectTo={redirect}
        onRegisterSuccess={setRegisteredEmail}
      />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<AuthPageLoadingFallback />}>
      <RegisterPageContent />
    </Suspense>
  );
}
