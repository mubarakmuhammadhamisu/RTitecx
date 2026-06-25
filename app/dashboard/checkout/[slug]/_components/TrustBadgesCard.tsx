import { trustBadges } from '@/lib/checkout/trustBadges';

/**
 * TrustBadgesCard — sidebar list of trust signals.
 * Single Responsibility: this one card only.
 */
export default function TrustBadgesCard() {
  return (
    <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 p-4 space-y-2.5">
      {trustBadges.map(({ icon: Icon, text }) => (
        <div key={text} className="flex items-center gap-2.5 text-xs text-text-muted">
          <Icon size={14} className="text-brand-indigo-400 shrink-0" />
          {text}
        </div>
      ))}
    </div>
  );
}
