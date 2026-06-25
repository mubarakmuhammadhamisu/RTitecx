'use client';

import { useState, useEffect } from 'react';

/**
 * lib/forms/useReferralCode.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: resolve the referral code for registration,
 * preferring the `?ref=` URL param, falling back to the `titecx_ref`
 * cookie (set when a visitor first lands on a referral link, so the
 * code survives navigation away from that landing page — e.g.
 * Landing → About → Register still correctly attributes the referral).
 */
export function useReferralCode(refParam: string | null): string {
  const [refCode, setRefCode] = useState(() =>
    (refParam ?? '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '')
  );

  useEffect(() => {
    if (refCode) return; // URL param already provided — cookie not needed
    try {
      const match = document.cookie.match(/(?:^|;\s*)titecx_ref=([^;]+)/);
      if (match) {
        const cookieCode = decodeURIComponent(match[1])
          .trim()
          .toUpperCase()
          .replace(/[^A-Z0-9-]/g, '');
        if (/^[A-Z]{4}-[A-Z0-9]{4}$/i.test(cookieCode)) setRefCode(cookieCode);
      }
    } catch {
      // private browsing or cookie access blocked — referral simply won't apply
    }
    // refCode intentionally omitted: this effect should only run once on
    // mount to check the cookie fallback, not re-run when refCode changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return refCode;
}
