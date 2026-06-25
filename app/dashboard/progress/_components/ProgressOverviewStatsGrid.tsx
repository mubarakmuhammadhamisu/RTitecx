import { TrendingUp } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { OverallProgressStats } from '@/lib/progress/computeOverallProgressStats';

/**
 * ProgressOverviewStatsGrid — 3-card stat row (overall %, in progress,
 * completed). Single Responsibility: this one grid only.
 */
export default function ProgressOverviewStatsGrid({ stats }: { stats: OverallProgressStats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GlowCard className="group">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-sm">Overall Progress</p>
            <p className="text-3xl font-bold text-text-primary mt-1">{stats.totalProgress}%</p>
          </div>
          <TrendingUp className="text-brand-indigo-400/50 group-hover:text-brand-indigo-400 transition" size={28} />
        </div>
        <div className="mt-3 h-2 bg-surface-800 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-cta" style={{ width: `${stats.totalProgress}%` }} />
        </div>
      </GlowCard>
      <GlowCard>
        <p className="text-text-muted text-sm">In Progress</p>
        <p className="text-3xl font-bold text-text-primary mt-1">{stats.inProgressCount}</p>
      </GlowCard>
      <GlowCard>
        <p className="text-text-muted text-sm">Completed</p>
        <p className="text-3xl font-bold text-text-primary mt-1">{stats.completedCount}</p>
      </GlowCard>
    </div>
  );
}
