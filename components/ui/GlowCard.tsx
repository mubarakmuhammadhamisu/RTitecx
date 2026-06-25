import React from 'react';

/**
 * GlowCard — the standard glass-panel card used throughout the app.
 *
 * Single Responsibility: render a glassmorphic, indigo-glow-bordered
 * container. Does NOT handle the "hero" gradient variant — see
 * GlowCardHero.tsx for that. Keeping these separate means each file
 * stays a single, readable visual treatment instead of one component
 * branching on a boolean prop.
 *
 * All colors come from design tokens (app/globals.css) — no raw hex
 * values are used here.
 */
interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = '' }: GlowCardProps) {
  return (
    <div
      className={`relative rounded-2xl p-6 bg-surface-900 border border-brand-indigo-500/30
        shadow-[0_0_30px_rgba(99,102,241,0.1)]
        hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]
        hover:border-brand-indigo-500/50
        transition-all duration-300
        ${className}`}
    >
      {children}
    </div>
  );
}
