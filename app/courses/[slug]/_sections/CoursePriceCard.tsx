import type { CourseSchema } from '@/lib/courses/courseTypes';
import EnrollButton from '@/components/courses/EnrollButton/EnrollButton';

/**
 * CoursePriceCard — Price display + EnrollButton.
 * Single Responsibility: this one price/enroll card only.
 */
export default function CoursePriceCard({ course }: { course: CourseSchema }) {
  return (
    <div className="p-6 rounded-2xl bg-surface-900 border border-glass-border">
      <h3 className="font-semibold text-text-primary mb-3">Price</h3>
      <p className="text-4xl font-extrabold text-brand-indigo-400">{course.price}</p>
      <EnrollButton slug={course.slug} price={course.price} />
    </div>
  );
}
