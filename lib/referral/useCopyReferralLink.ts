'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

/**
 * lib/referral/useCopyReferralLink.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: build the current user's referral link and
 * provide a copy-to-clipboard action with a 2-second "Copied!" state.
 */
export function useCopyReferralLink() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  const referralLink = user?.referralCode
    ? `${typeof window !== 'undefined' ? window.location.origin : ''}/?ref=${user.referralCode}`
    : '';

  const copyLink = async () => {
    if (!referralLink) return;
    try {
      await navigator.clipboard.writeText(referralLink);
    } catch {
      // Fallback for non-HTTPS or older browsers.
      const el = document.createElement('textarea');
      el.value = referralLink;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return { referralLink, copied, copyLink };
}
