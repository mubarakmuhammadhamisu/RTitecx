/**
 * lib/dashboard/daysRemaining.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: compute days remaining until a deadline ISO
 * string, used by the premium-tier mystery-box countdown. Returns null
 * if no deadline is set, 0 if the deadline has passed.
 */
export function daysRemaining(deadline: string | null | undefined): number | null {
  if (!deadline) return null;
  const diff = new Date(deadline).getTime() - Date.now();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}
