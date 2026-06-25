import Image from 'next/image';
import Link from 'next/link';
import { Clock } from 'lucide-react';
import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * CourseCard — one course card: gradient thumbnail with level/price
 * badges, title, short description, duration, and instructor.
 *
 * Single Responsibility: render exactly one course card. Used by both
 * the landing page's "Popular Courses" preview and the full /courses
 * listing — kept in one place so the card design only needs to change
 * once.
 */
interface CourseCardProps {
  course: CourseSchema;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      href={`/courses/${course.slug}`}
      className="group block rounded-2xl bg-surface-900 border border-glass-border overflow-hidden hover:border-brand-indigo-500/40 transition"
    >
      <div
        className="h-40 relative overflow-hidden"
        style={{
          background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})`,
        }}
      >
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-2 left-2 bg-surface-900/70 backdrop-blur text-xs text-text-secondary px-2 py-0.5 rounded-full border border-glass-border">
          {course.level}
        </div>
        <div className="absolute top-2 right-2 bg-surface-900/70 backdrop-blur text-xs text-brand-indigo-300 font-semibold px-2 py-0.5 rounded-full border border-brand-indigo-500/20">
          {course.price}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold group-hover:text-brand-indigo-400 transition text-sm leading-snug">
          {course.title}
        </h3>
        <p className="mt-1.5 text-xs text-text-muted line-clamp-2">{course.shortDescription}</p>
        <div className="mt-3 flex items-center justify-between text-xs text-text-faint">
          <span className="flex items-center gap-1">
            <Clock size={11} /> {course.duration}
          </span>
          <span>{course.instructor}</span>
        </div>
      </div>
    </Link>
  );
}
