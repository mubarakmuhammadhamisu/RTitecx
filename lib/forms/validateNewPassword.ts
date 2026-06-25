import { getPasswordStrength } from './getPasswordStrength';

/**
 * lib/forms/validateNewPassword.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: validate a new password during the password
 * RESET flow. Stricter than registration's check — requires letters AND
 * a number/symbol mix, and a minimum overall strength score, since this
 * is the password the person will rely on going forward.
 */
export function validateNewPassword(newPw: string, confirmPw: string): string | null {
  if (newPw.length < 8) {
    return 'Password must be at least 8 characters.';
  }
  const hasLetter = /[a-zA-Z]/.test(newPw);
  const hasMixChar = /[0-9]/.test(newPw) || /[^a-zA-Z0-9]/.test(newPw);
  if (!hasLetter || !hasMixChar) {
    return 'Password must include letters and at least one number or symbol.';
  }
  if (getPasswordStrength(newPw) < 3) {
    return 'Please choose a stronger password (8+ characters with letters and numbers).';
  }
  if (newPw !== confirmPw) {
    return 'Passwords do not match.';
  }
  return null;
}
