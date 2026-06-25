import type { CourseSchema } from '@/lib/courses/courseTypes';
import CourseCard from './CourseCard';

/**
 * CourseCardGrid — responsive grid layout wrapping a list of CourseCards.
 * Single Responsibility: grid layout only; card rendering is delegated.
 */
interface CourseCardGridProps {
  courses: CourseSchema[];
}

export default function CourseCardGrid({ courses }: CourseCardGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course) => (
        <CourseCard key={course.slug} course={course} />
      ))}
    </div>
  );
}
