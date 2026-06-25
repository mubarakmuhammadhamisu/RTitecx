import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '@/components/ui/Footer/Footer';
import CourseCardGrid from '@/components/courses/CourseCardGrid';
import EmptyCoursesState from '@/components/courses/EmptyCoursesState';
import { fetchPublishedCoursesServer } from '@/lib/courses/fetchPublishedCoursesServer';

/**
 * /courses — full public course catalog. Wording preserved exactly from
 * the original codebase. Card rendering delegated to the shared
 * CourseCardGrid (also used on the landing page preview).
 */
export default async function CoursesPage() {
  const courses = await fetchPublishedCoursesServer();

  return (
    <main className="min-h-screen bg-surface-950 text-text-secondary">
      <Navbar />

      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          Explore Our <span className="text-brand-indigo-400">Courses</span>
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-text-muted">
          Learn real-world skills with structured, high-quality courses.
        </p>
      </section>

      <section className="max-w-7xl mx-auto px-4 pb-32">
        {courses.length === 0 ? <EmptyCoursesState /> : <CourseCardGrid courses={courses} />}
      </section>

      <Footer />
    </main>
  );
}
