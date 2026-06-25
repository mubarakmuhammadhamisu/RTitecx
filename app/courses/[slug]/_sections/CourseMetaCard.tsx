import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * CourseMetaCard — Level/Duration/Instructor summary card.
 * Single Responsibility: this one meta card only.
 */
export default function CourseMetaCard({ course }: { course: CourseSchema }) {
  return (
    <div className="p-6 rounded-2xl bg-surface-900 border border-glass-border space-y-2 text-sm text-text-secondary">
      <h3 className="font-semibold text-text-primary mb-3">Course Details</h3>
      <p>
        Level: <span className="text-text-primary">{course.level}</span>
      </p>
      <p>
        Duration: <span className="text-text-primary">{course.duration}</span>
      </p>
      <p>
        Instructor: <span className="text-text-primary">{course.instructor}</span>
      </p>
    </div>
  );
}
