import { Briefcase } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { ProfileStats } from '@/lib/profile/computeProfileStats';

/**
 * LearningStatsCard — sidebar card summarizing enrollment/hours/
 * completed/certificates. Single Responsibility: this one card only.
 */
export default function LearningStatsCard({ stats }: { stats: ProfileStats }) {
  const rows = [
    { label: 'Courses Enrolled', value: stats.enrolledCount },
    { label: 'Total Hours', value: `${stats.totalHours}h` },
    { label: 'Completed', value: stats.completedCount },
    { label: 'Certificates', value: stats.certificatesCount },
  ];

  return (
    <GlowCard>
      <h3 className="text-sm font-bold text-text-muted mb-4 flex items-center gap-2">
        <Briefcase size={15} className="text-brand-indigo-400" /> Learning Stats
      </h3>
      <div className="space-y-3">
        {rows.map(({ label, value }) => (
          <div key={label} className="flex justify-between items-center">
            <span className="text-text-muted text-sm">{label}</span>
            <span className="text-text-primary font-bold text-sm">{value}</span>
          </div>
        ))}
      </div>
    </GlowCard>
  );
}
