import Image from 'next/image';
import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * CourseDetailHero — title, level badge, instructor, thumbnail.
 * Single Responsibility: hero section only.
 */
export default function CourseDetailHero({ course }: { course: CourseSchema }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-linear-to-br from-brand-indigo-600/20 via-brand-purple-600/10 to-transparent" />
      <div className="relative max-w-5xl mx-auto px-4 py-20 flex flex-col md:flex-row gap-10 items-start">
        <div className="flex-1">
          <span className="inline-block px-3 py-1 rounded-full bg-brand-indigo-500/20 border border-brand-indigo-500/30 text-brand-indigo-300 text-xs font-medium mb-4">
            {course.level}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">{course.title}</h1>
          <p className="mt-4 text-lg text-text-secondary">{course.shortDescription}</p>
          <p className="mt-2 text-sm text-text-muted">by {course.instructor}</p>
        </div>
        <div
          className="w-full md:w-80 rounded-2xl overflow-hidden relative aspect-video md:aspect-square shrink-0 border border-glass-border"
          style={{
            background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})`,
          }}
        >
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
