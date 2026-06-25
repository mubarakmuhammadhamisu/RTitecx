import Link from 'next/link';
import { fetchPublishedCoursesServer } from '@/lib/courses/fetchPublishedCoursesServer';
import CourseCardGrid from '@/components/courses/CourseCardGrid';
import EmptyCoursesState from '@/components/courses/EmptyCoursesState';

/**
 * CoursePreviewSection — "Popular Courses" landing page section.
 *
 * Single Responsibility: fetch up to 3 published courses (server-side,
 * at request time — no client loading spinner needed) and render them.
 * Card rendering itself is delegated to the shared CourseCardGrid, which
 * is also reused by the full /courses listing page.
 */
export default async function CoursePreviewSection() {
  const courses = await fetchPublishedCoursesServer();
  const preview = courses.slice(0, 3);

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Popular Courses</h2>
        <Link href="/courses" className="text-brand-indigo-400 hover:text-brand-indigo-300 text-sm font-medium">
          View all →
        </Link>
      </div>

      {preview.length === 0 ? <EmptyCoursesState /> : <CourseCardGrid courses={preview} />}
    </section>
  );
}
