import { escapeHtml } from './escapeHtml';
import { accentColors } from '@/lib/theme/tokens';
import type { Certificate } from './buildCertificates';

/**
 * lib/achievements/buildCertificateHtml.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: build the standalone printable certificate
 * HTML document opened in a new window for the "Download" action.
 *
 * This HTML document is a static, self-contained print artifact (not a
 * React component) — it gets handed to `window.open(...).document.write()`
 * — so it intentionally has its own inline <style> rather than using
 * Tailwind classes. Colors are still sourced from lib/theme/tokens.ts
 * (not re-hardcoded here) to keep a single source of truth.
 *
 * SECURITY: userName and cert.title are user-controlled strings and are
 * escaped via escapeHtml() before interpolation — never pass raw values
 * into this template.
 */
export function buildCertificateHtml(userName: string, cert: Certificate): string {
  const safeName = escapeHtml(userName);
  const safeTitle = escapeHtml(cert.title);
  const safeIssuer = escapeHtml(cert.issuer);
  const safeDate = escapeHtml(cert.date);

  const brandColor = accentColors.indigo[500]; // #6366f1
  const courseColor = accentColors.indigo[600]; // #4f46e5

  return `<!DOCTYPE html>
<html>
<head>
  <title>Certificate — ${safeTitle}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', sans-serif;
      background: #fff;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh; padding: 40px;
    }
    .cert {
      border: 4px solid ${brandColor};
      border-radius: 16px;
      padding: 60px 80px;
      max-width: 800px;
      width: 100%;
      text-align: center;
    }
    .brand { font-size: 14px; font-weight: 700; color: ${brandColor}; letter-spacing: 4px; text-transform: uppercase; }
    .heading { font-size: 13px; color: #888; margin: 24px 0 12px; text-transform: uppercase; letter-spacing: 2px; }
    .name { font-size: 36px; font-weight: 900; color: #111; margin-bottom: 12px; }
    .completed { font-size: 14px; color: #555; margin-bottom: 8px; }
    .course { font-size: 24px; font-weight: 700; color: ${courseColor}; margin: 8px 0 32px; }
    .issuer { font-size: 13px; color: #888; }
    .date { font-size: 13px; color: #888; margin-top: 4px; }
    .divider { width: 80px; height: 3px; background: ${brandColor}; margin: 32px auto; border-radius: 2px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <div class="cert">
    <div class="brand">TITECX Academy</div>
    <div class="divider"></div>
    <div class="heading">Certificate of Completion</div>
    <div class="heading" style="font-size:11px">This certifies that</div>
    <div class="name">${safeName}</div>
    <div class="completed">has successfully completed</div>
    <div class="course">${safeTitle}</div>
    <div class="issuer">${safeIssuer}</div>
    <div class="date">${safeDate}</div>
  </div>
  <script>window.onload = () => { window.print(); }</script>
</body>
</html>`;
}
