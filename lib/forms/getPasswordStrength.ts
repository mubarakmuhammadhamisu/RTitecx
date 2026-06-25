/**
 * lib/forms/getPasswordStrength.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: compute a 0-4 password strength score.
 * 0 = empty, 1 = too short, 2 = needs numbers/symbols, 3 = good, 4 = strong.
 */
export function getPasswordStrength(pw: string): number {
  if (!pw) return 0;
  const hasMin = pw.length >= 8;
  const hasGood = pw.length >= 12;
  const hasMix = /[0-9]/.test(pw) || /[^a-zA-Z0-9]/.test(pw);
  return !hasMin ? 1 : !hasMix ? 2 : hasGood ? 4 : 3;
}

export const PASSWORD_STRENGTH_BAR_COLORS = ['', 'bg-danger', 'bg-warning', 'bg-info', 'bg-success'];
export const PASSWORD_STRENGTH_LABELS = ['', 'Too simple', 'Add numbers or symbols', 'Good', 'Strong'];
export const PASSWORD_STRENGTH_TEXT_COLORS = ['', 'text-danger', 'text-warning', 'text-info', 'text-success'];
