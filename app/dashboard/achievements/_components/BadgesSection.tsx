import GlowCard from '@/components/ui/GlowCard';
import type { Badge } from '@/lib/achievements/buildBadges';

/**
 * BadgesSection — "Achievement Badges" grid. Single Responsibility:
 * this one grid only.
 */
export default function BadgesSection({ badges }: { badges: Badge[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-4">Achievement Badges</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <GlowCard
              key={badge.id}
              className={`group ${badge.earned ? 'border-brand-indigo-500/30 hover:border-brand-indigo-500/50' : 'border-surface-600/50 opacity-50'}`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg ${
                    badge.earned ? 'bg-gradient-cta shadow-brand-indigo-500/50' : 'bg-surface-800'
                  }`}
                >
                  <Icon size={28} className={badge.earned ? 'text-white' : 'text-text-faint'} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-text-primary text-sm">{badge.name}</h3>
                  <p className="text-text-muted text-xs mt-0.5">{badge.description}</p>
                  {badge.earned && (
                    <span className="inline-block mt-2 text-xs font-medium px-2 py-0.5 rounded-full bg-success/20 text-success">
                      Earned
                    </span>
                  )}
                </div>
              </div>
            </GlowCard>
          );
        })}
      </div>
    </div>
  );
}
