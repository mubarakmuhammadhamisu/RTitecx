/**
 * lib/achievements/escapeHtml.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: escape user-controlled strings before injection
 * into document.write(). Prevents XSS when user.name or a course title
 * contains HTML special characters. Used exclusively by the certificate
 * download flow (buildCertificateHtml.ts).
 */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
