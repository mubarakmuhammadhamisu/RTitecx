import Link from 'next/link';

/**
 * CheckoutCourseNotFoundState — shown when the URL slug doesn't match
 * any course in the catalog. Single Responsibility: this one state only.
 */
export default function CheckoutCourseNotFoundState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] flex-col gap-4">
      <p className="text-text-muted text-lg">Course not found.</p>
      <Link href="/dashboard/my-courses" className="text-brand-indigo-400 hover:text-brand-indigo-300 transition text-sm">
        ← Back to Courses
      </Link>
    </div>
  );
}
