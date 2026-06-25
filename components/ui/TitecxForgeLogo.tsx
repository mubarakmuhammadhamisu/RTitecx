import React from 'react';

/**
 * TitecxForgeLogo — the "TITECX Forge" wordmark.
 *
 * Single Responsibility: render the exact brand wordmark with its two
 * distinct gradient treatments ("X" and "Forge"). Wording, casing, and
 * the two-gradient split are preserved exactly from the original site
 * per the brand-fidelity requirement — only the implementation now
 * references design tokens (text-gradient-x / text-gradient-forge from
 * app/globals.css) instead of inline hex values.
 */
interface TitecxForgeLogoProps {
  className?: string;
}

export default function TitecxForgeLogo({ className = 'text-2xl' }: TitecxForgeLogoProps) {
  return (
    <span className="flex justify-center items-center font-extrabold">
      TITEC
      <span className={`text-gradient-x tracking-tight ${className}`}>X</span>
      <span className={`text-gradient-forge tracking-tight ml-1 ${className}`}>Forge</span>
    </span>
  );
}
