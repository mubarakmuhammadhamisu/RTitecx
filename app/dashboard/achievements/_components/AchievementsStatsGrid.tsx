import { Award, Star, Trophy } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

/**
 * AchievementsStatsGrid — 3-card stat summary (Certificates / Badges /
 * Points). Single Responsibility: this one grid only.
 */
interface AchievementsStatsGridProps {
  certificatesCount: number;
  badgesEarnedCount: number;
  badgesTotalCount: number;
  totalPoints: number;
}

export default function AchievementsStatsGrid({
  certificatesCount,
  badgesEarnedCount,
  badgesTotalCount,
  totalPoints,
}: AchievementsStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GlowCard className="group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-sm">Certificates Earned</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{certificatesCount}</p>
          </div>
          <Award className="text-brand-indigo-400/60 group-hover:text-brand-indigo-400 transition" size={32} />
        </div>
      </GlowCard>
      <GlowCard className="group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-sm">Badges Earned</p>
            <p className="text-3xl font-bold text-text-primary mt-2">
              {badgesEarnedCount} / {badgesTotalCount}
            </p>
          </div>
          <Star className="text-brand-purple-400/60 group-hover:text-brand-purple-400 transition" size={32} />
        </div>
      </GlowCard>
      <GlowCard className="group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-sm">Total Points</p>
            <p className="text-3xl font-bold text-text-primary mt-2">{totalPoints.toLocaleString()}</p>
          </div>
          <Trophy className="text-brand-indigo-400/60 group-hover:text-brand-indigo-400 transition" size={32} />
        </div>
      </GlowCard>
    </div>
  );
}
