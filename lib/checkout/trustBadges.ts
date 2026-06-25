import { type LucideIcon, Award, ShieldCheck, Zap, RefreshCw } from 'lucide-react';

/**
 * lib/checkout/trustBadges.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the trust-badge list shown in the checkout
 * sidebar. Wording preserved exactly from the original codebase.
 *
 * CLEANED UP from the original: removed an unused duplicate
 * `iconsAndText` interface that was identical to `TrustBadge` but never
 * referenced anywhere.
 */
export interface TrustBadge {
  icon: LucideIcon;
  text: string;
}

export const trustBadges: TrustBadge[] = [
  { icon: Award, text: 'Certificate of completion' },
  { icon: ShieldCheck, text: 'Secure & encrypted payment' },
  { icon: Zap, text: 'Instant access after payment' },
  { icon: RefreshCw, text: '24-hour refund policy' },
];
