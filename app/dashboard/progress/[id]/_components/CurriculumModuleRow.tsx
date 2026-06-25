import Link from 'next/link';
import { CheckCircle2, Circle } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { ProgressModuleView } from '@/lib/progress/buildProgressModules';

/**
 * CurriculumModuleRow — one module row with its lesson checklist.
 * Single Responsibility: this one row only.
 */
interface CurriculumModuleRowProps {
  module: ProgressModuleView;
  courseSlug: string;
}

export default function CurriculumModuleRow({ module, courseSlug }: CurriculumModuleRowProps) {
  return (
    <GlowCard>
      <div className="flex items-start gap-4">
        {module.completed ? (
          <CheckCircle2 className="text-success shrink-0 mt-0.5" size={22} />
        ) : (
          <Circle className="text-surface-600 shrink-0 mt-0.5" size={22} />
        )}
        <div className="flex-1">
          <h3 className="font-bold text-text-primary text-sm">{module.name}</h3>
          {module.lessons.length > 1 && (
            <div className="mt-3 space-y-2">
              {module.lessons.map((lesson) => (
                <div key={lesson.id} className="flex items-center gap-2 text-xs">
                  {lesson.completed ? (
                    <CheckCircle2 className="text-success/60" size={14} />
                  ) : (
                    <Circle className="text-surface-600" size={14} />
                  )}
                  <span className={lesson.completed ? 'text-text-muted line-through' : 'text-text-secondary'}>
                    {lesson.name}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {!module.completed && (
          <Link href={`/dashboard/courses/${courseSlug}`}>
            <button className="px-3 py-1 rounded-lg text-xs font-medium bg-brand-indigo-500/20 text-brand-indigo-400 hover:bg-brand-indigo-500/30 transition whitespace-nowrap">
              Resume
            </button>
          </Link>
        )}
      </div>
    </GlowCard>
  );
}
