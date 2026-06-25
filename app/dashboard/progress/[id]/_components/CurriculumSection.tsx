import CurriculumModuleRow from './CurriculumModuleRow';
import type { ProgressModuleView } from '@/lib/progress/buildProgressModules';

/**
 * CurriculumSection — "Course Curriculum" list. Renders nothing if
 * there are no modules. Single Responsibility: section composition only.
 */
interface CurriculumSectionProps {
  modules: ProgressModuleView[];
  courseSlug: string;
}

export default function CurriculumSection({ modules, courseSlug }: CurriculumSectionProps) {
  if (modules.length === 0) return null;

  return (
    <div>
      <h2 className="text-xl font-bold text-text-primary mb-4">Course Curriculum</h2>
      <div className="space-y-3">
        {modules.map((module) => (
          <CurriculumModuleRow key={module.id} module={module} courseSlug={courseSlug} />
        ))}
      </div>
    </div>
  );
}
