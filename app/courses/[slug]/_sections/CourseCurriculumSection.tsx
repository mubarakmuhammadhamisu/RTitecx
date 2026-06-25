import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * CourseCurriculumSection — numbered curriculum list.
 * Single Responsibility: this one curriculum list only.
 */
export default function CourseCurriculumSection({ course }: { course: CourseSchema }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Curriculum</h2>
      <ol className="space-y-2">
        {course.curriculum.map((item, i) => (
          <li
            key={item}
            className="p-3 rounded-xl bg-surface-900 border border-glass-border text-sm text-text-secondary flex items-center gap-3"
          >
            <span className="w-6 h-6 rounded-full bg-brand-indigo-500/20 text-brand-indigo-400 text-xs font-bold flex items-center justify-center shrink-0">
              {i + 1}
            </span>
            {item}
          </li>
        ))}
      </ol>
    </div>
  );
}
