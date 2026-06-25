import Link from 'next/link';

/**
 * ProgressCourseNotFoundState — shown when the URL slug doesn't match
 * an enrolled course. Single Responsibility: this one state only.
 */
export default function ProgressCourseNotFoundState() {
  return (
    <div className="flex items-center justify-center py-24 flex-col gap-4">
      <p className="text-text-muted text-lg">Course not found</p>
      <Link href="/dashboard/progress" className="text-brand-indigo-400 hover:text-brand-indigo-300 text-sm transition">
        ← Back to Progress
      </Link>
    </div>
  );
}
