import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * CourseFeaturesSection — "What You'll Learn" checklist.
 * Single Responsibility: this one feature list only.
 */
export default function CourseFeaturesSection({ course }: { course: CourseSchema }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">What You&apos;ll Learn</h2>
      <ul className="grid sm:grid-cols-2 gap-3">
        {course.features.map((f) => (
          <li
            key={f}
            className="p-3 rounded-xl bg-surface-900 border border-glass-border text-sm text-text-secondary flex items-start gap-2"
          >
            <span className="text-brand-indigo-400 mt-0.5">✓</span> {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
