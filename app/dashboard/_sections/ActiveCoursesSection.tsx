import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import ActiveCourseCard from '@/components/courses/ActiveCourseCard';
import NoActiveCoursesState from '@/components/courses/NoActiveCoursesState';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * ActiveCoursesSection — "Active Courses" section heading + grid/empty
 * state. Single Responsibility: section composition only.
 */
export default function ActiveCoursesSection({ courses }: { courses: EnrolledCourse[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-text-primary">Active Courses</h2>
        <Link href="/dashboard/my-courses" className="text-sm text-brand-indigo-400 hover:text-brand-indigo-300 transition flex items-center gap-1">
          View all <ChevronRight size={16} />
        </Link>
      </div>

      {courses.length === 0 ? (
        <NoActiveCoursesState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((course) => (
            <ActiveCourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}
