import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * CourseDescriptionSection — "About This Course" block.
 * Single Responsibility: this one text block only.
 */
export default function CourseDescriptionSection({ course }: { course: CourseSchema }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">About This Course</h2>
      <p className="text-text-secondary leading-relaxed">{course.description}</p>
    </div>
  );
}
