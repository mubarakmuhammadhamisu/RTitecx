'use client';

import { useState } from 'react';
import { buildCertificateHtml } from './buildCertificateHtml';
import type { Certificate } from './buildCertificates';

/**
 * lib/achievements/useCertificateActions.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: the share-to-clipboard and download/print
 * actions for a certificate, plus the "copied" tick state.
 */
export function useCertificateActions(userName: string) {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleShare = async (cert: Certificate) => {
    const url = `${window.location.origin}/certificate/${cert.slug}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      // Fallback for browsers without clipboard API.
      const el = document.createElement('textarea');
      el.value = url;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
    }
    setCopiedId(cert.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDownload = (cert: Certificate) => {
    const html = buildCertificateHtml(userName, cert);
    const win = window.open('', '_blank');
    if (win) {
      win.document.write(html);
      win.document.close();
    }
  };

  return { copiedId, handleShare, handleDownload };
}
