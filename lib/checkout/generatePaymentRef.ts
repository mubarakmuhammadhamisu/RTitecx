/**
 * lib/checkout/generatePaymentRef.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: generate a unique Paystack payment reference.
 */
export function generatePaymentRef(slug: string): string {
  return `LRN-${slug.slice(0, 6).toUpperCase()}-${Date.now()}`;
}
