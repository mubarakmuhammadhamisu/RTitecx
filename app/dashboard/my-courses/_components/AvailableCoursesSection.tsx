import AvailableCourseCard from './AvailableCourseCard';
import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * AvailableCoursesSection — "Available Courses" grid (catalogue minus
 * already-enrolled). Renders nothing if there are none. Single
 * Responsibility: section composition only.
 */
export default function AvailableCoursesSection({ courses }: { courses: CourseSchema[] }) {
  if (courses.length === 0) return null;

  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-bold text-text-primary">Available Courses</h2>
        <p className="text-text-muted text-sm mt-0.5">Courses you haven&apos;t enrolled in yet</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses.map((course) => (
          <AvailableCourseCard key={course.slug} course={course} />
        ))}
      </div>
    </section>
  );
}
