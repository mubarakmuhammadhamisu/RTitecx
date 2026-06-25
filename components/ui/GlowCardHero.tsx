import React from 'react';

/**
 * GlowCardHero — the stronger-gradient glass panel used for hero
 * sections and primary CTAs (landing page, checkout highlight, etc).
 *
 * Single Responsibility: render only the hero visual treatment.
 * See GlowCard.tsx for the standard card variant.
 */
interface GlowCardHeroProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCardHero({ children, className = '' }: GlowCardHeroProps) {
  return (
    <div
      className={`relative rounded-2xl overflow-hidden p-8
        bg-linear-to-r from-brand-indigo-500/30 to-brand-purple-500/30
        border border-brand-indigo-500/50
        shadow-[0_0_40px_rgba(99,102,241,0.25)]
        ${className}`}
    >
      {children}
    </div>
  );
}
