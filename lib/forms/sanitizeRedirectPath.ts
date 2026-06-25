/**
 * lib/forms/sanitizeRedirectPath.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: sanitize a `?redirect=` query param so it can
 * only point to a relative path within this app — never an absolute URL
 * (https://evil.com) or a protocol-relative URL (//evil.com), both of
 * which would otherwise enable an open-redirect phishing vector after
 * successful login.
 */
export function sanitizeRedirectPath(raw: string | null, fallback = '/dashboard'): string {
  if (!raw) return fallback;
  return raw.startsWith('/') && !raw.startsWith('//') ? raw : fallback;
}
