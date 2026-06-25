/**
 * lib/referral/formatReferralDate.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: format an ISO date string for display on the
 * referral dashboard (en-NG locale, "12 Jan 2026" style).
 */
export function formatReferralDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}
