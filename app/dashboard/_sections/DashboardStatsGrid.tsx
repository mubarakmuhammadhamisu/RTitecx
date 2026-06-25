import { BookOpen, Award, Clock, TrendingUp } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { DashboardStats } from '@/lib/dashboard/computeDashboardStats';

/**
 * DashboardStatsGrid — the 4-card stat grid (Enrolled / Hours / Completed
 * / Avg Progress). Single Responsibility: this one grid only.
 */
export default function DashboardStatsGrid({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: 'Enrolled', value: stats.enrolledCount, Icon: BookOpen, color: 'text-brand-indigo-400' },
    { label: 'Hours Learned', value: `${stats.totalHours}h`, Icon: Clock, color: 'text-brand-purple-400' },
    { label: 'Completed', value: stats.completedCount, Icon: Award, color: 'text-brand-indigo-400' },
    { label: 'Avg Progress', value: `${stats.completionRate}%`, Icon: TrendingUp, color: 'text-brand-purple-400' },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map(({ label, value, Icon, color }) => (
        <GlowCard key={label} className="group">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-muted text-xs font-medium">{label}</p>
              <p className="text-3xl font-bold text-text-primary mt-1">{value}</p>
            </div>
            <Icon className={`${color}/50 group-hover:opacity-100 transition`} size={28} />
          </div>
        </GlowCard>
      ))}
    </div>
  );
}
