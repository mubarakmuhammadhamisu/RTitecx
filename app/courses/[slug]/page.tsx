import { notFound } from 'next/navigation';
import Navbar from '@/components/ui/Navbar/Navbar';
import Footer from '@/components/ui/Footer/Footer';
import { fetchCourseBySlugServer } from '@/lib/courses/fetchCourseBySlugServer';
import CourseDetailHero from './_sections/CourseDetailHero';
import CourseMetaCard from './_sections/CourseMetaCard';
import CoursePriceCard from './_sections/CoursePriceCard';
import CourseDescriptionSection from './_sections/CourseDescriptionSection';
import CourseFeaturesSection from './_sections/CourseFeaturesSection';
import CourseCurriculumSection from './_sections/CourseCurriculumSection';

type PageProps = { params: Promise<{ slug: string }> };

/**
 * /courses/[slug] — public course detail page. Composes section
 * components; each section's markup lives in its own file under
 * _sections/. Wording preserved exactly from the original codebase.
 */
export default async function CourseDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const course = await fetchCourseBySlugServer(slug);

  // return notFound() — the `return` makes TypeScript correctly narrow
  // `course` from `CourseSchema | null` to `CourseSchema` after this line.
  if (!course) return notFound();

  return (
    <main className="min-h-screen bg-surface-950 text-text-secondary">
      <Navbar />

      <CourseDetailHero course={course} />

      <section className="max-w-5xl mx-auto px-4 py-16 space-y-12">
        <div className="grid sm:grid-cols-2 gap-6">
          <CourseMetaCard course={course} />
          <CoursePriceCard course={course} />
        </div>

        <CourseDescriptionSection course={course} />
        <CourseFeaturesSection course={course} />
        <CourseCurriculumSection course={course} />
      </section>

      <Footer />
    </main>
  );
}
