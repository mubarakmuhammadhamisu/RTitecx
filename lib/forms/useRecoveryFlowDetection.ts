'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';

/**
 * lib/forms/useRecoveryFlowDetection.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: detect whether the current page load is a
 * password-recovery deep link (from the email "reset your password"
 * link) and whether that recovery token is still valid.
 *
 * Supabase may deliver the recovery token as a query param
 * (?type=recovery) OR a hash fragment (#access_token=...&type=recovery)
 * depending on Supabase version and email client — both are checked.
 *
 * Token expiry/reuse is detected by checking whether Supabase
 * established a real session from the token: getUser() validates
 * against Supabase's servers, so an expired or already-used token
 * correctly returns no user instead of being accepted from local cache.
 */
export function useRecoveryFlowDetection() {
  const searchParams = useSearchParams();
  const [isRecoveryFlow, setIsRecoveryFlow] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const checkRecovery = async () => {
      const fromQuery = searchParams.get('type') === 'recovery';
      const hash = typeof window !== 'undefined' ? window.location.hash : '';
      const fromHash = hash.includes('type=recovery');

      if (!fromQuery && !fromHash) return;

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsRecoveryFlow(true);
      } else {
        setTokenExpired(true);
      }
    };

    checkRecovery();
  }, [searchParams]);

  return { isRecoveryFlow, tokenExpired, setTokenExpired };
}
