'use client';

import React, { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

/**
 * AuthGuard — blocks access to any /dashboard/* page unless the user is
 * logged in. Preserves the full URL they were trying to reach and
 * passes it to the login page; after login the user is redirected back
 * to exactly where they wanted to go.
 *
 * Single Responsibility: auth gating only. Loading UI is delegated to
 * the shared LoadingSpinner component.
 */
export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [user, isLoading, router, pathname]);

  if (isLoading) return <LoadingSpinner />;
  if (!user) return null;

  return <>{children}</>;
}
