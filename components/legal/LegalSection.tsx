import type React from 'react';

/**
 * LegalSection — one numbered section card used on /privacy and /terms.
 * Single Responsibility: this one card shell; content is passed as
 * children. Previously duplicated identically in both page files —
 * extracted here as the single shared definition.
 */
interface LegalSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <div className="p-6 rounded-2xl bg-surface-900 border border-glass-border">
      <h2 className="text-xl font-semibold text-text-primary mb-3">{title}</h2>
      <p className="text-text-secondary leading-relaxed">{children}</p>
    </div>
  );
}
