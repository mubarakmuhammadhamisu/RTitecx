'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { sanitizeRedirectPath } from '@/lib/forms/sanitizeRedirectPath';
import LoginForm from '@/components/auth/LoginForm';
import AuthPageLoadingFallback from '@/components/auth/AuthPageLoadingFallback';

/**
 * LoginPageContent — owns the redirect target (read from ?redirect=,
 * sanitized) and the auto-redirect-if-already-logged-in effect. Form
 * logic itself is delegated to LoginForm.
 */
function LoginPageContent() {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = sanitizeRedirectPath(searchParams.get('redirect'));

  useEffect(() => {
    if (!isLoading && user) router.replace(redirect);
  }, [user, isLoading, redirect, router]);

  return (
    <div className="min-h-screen bg-surface-950 text-text-secondary flex flex-col items-center justify-center px-4">
      <Link href="/" className="text-2xl font-extrabold text-text-primary mb-8 hover:text-brand-indigo-300 transition">
        TITECX
      </Link>
      <LoginForm redirectTo={redirect} onLoginSuccess={() => router.replace(redirect)} />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<AuthPageLoadingFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}
