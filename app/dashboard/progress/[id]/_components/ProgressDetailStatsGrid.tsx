import { Clock } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import CircularProgressRing from './CircularProgressRing';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * ProgressDetailStatsGrid — overall %/ring, duration, modules-completed
 * 3-card row. Single Responsibility: this one grid only.
 */
interface ProgressDetailStatsGridProps {
  course: EnrolledCourse;
  completedModules: number;
  totalModules: number;
}

export default function ProgressDetailStatsGrid({
  course,
  completedModules,
  totalModules,
}: ProgressDetailStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <GlowCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text-muted text-sm">Overall Progress</p>
            <p className="text-3xl font-bold text-text-primary mt-1">{course.progress}%</p>
          </div>
          <CircularProgressRing progress={course.progress} />
        </div>
      </GlowCard>
      <GlowCard>
        <p className="text-text-muted text-sm mb-1">Duration</p>
        <p className="text-2xl font-bold text-text-primary flex items-center gap-2">
          <Clock size={18} className="text-brand-purple-400" />
          {course.duration}
        </p>
        <p className="text-text-faint text-xs mt-2">Total course length</p>
      </GlowCard>
      <GlowCard>
        <p className="text-text-muted text-sm mb-1">Modules</p>
        <p className="text-2xl font-bold text-text-primary">
          {completedModules} / {totalModules}
        </p>
        <div className="mt-2 h-2 bg-surface-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-cta"
            style={{ width: totalModules ? `${(completedModules / totalModules) * 100}%` : '0%' }}
          />
        </div>
      </GlowCard>
    </div>
  );
}
