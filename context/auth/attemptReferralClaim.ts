/**
 * context/auth/attemptReferralClaim.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: check localStorage for a pending referral code
 * (set during registration via a referral link) and submit it to the
 * claim-referral API once, after a new session is established. Fails
 * silently — referral claiming is a non-critical background action and
 * must never block or surface errors during sign-in.
 */
const REF_STORAGE_KEY = 'titecx_ref';
const REF_CODE_PATTERN = /^[A-Z]{4}-[A-Z0-9]{4}$/i;

export async function attemptReferralClaim(): Promise<void> {
  try {
    const code = localStorage.getItem(REF_STORAGE_KEY);
    if (!code || !REF_CODE_PATTERN.test(code)) return;

    localStorage.removeItem(REF_STORAGE_KEY);

    await fetch('/api/claim-referral', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-csrf-protection': '1' },
      body: JSON.stringify({ referralCode: code.toUpperCase() }),
    });
  } catch {
    // Silent — referral claiming must never interrupt the auth flow.
  }
}
