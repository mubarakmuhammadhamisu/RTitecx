import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import CompletedCourseCard from '@/components/courses/CompletedCourseCard';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * CompletedCoursesSection — "Completed Courses" section. Renders
 * nothing if the student has no completed courses (parent decides
 * whether to render this at all). Single Responsibility: section
 * composition only.
 */
export default function CompletedCoursesSection({ courses }: { courses: EnrolledCourse[] }) {
  if (courses.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary">Completed Courses</h2>
        <Link href="/dashboard/my-courses" className="text-sm text-brand-indigo-400 hover:text-brand-indigo-300 transition flex items-center gap-1">
          View all <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <CompletedCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
