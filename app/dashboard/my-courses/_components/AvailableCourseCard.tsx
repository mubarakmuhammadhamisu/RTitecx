import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * AvailableCourseCard — a not-yet-enrolled course card shown in the
 * "Available Courses" section. Links to the public course detail page
 * (not the dashboard player, since the student isn't enrolled yet).
 *
 * Single Responsibility: this one card only.
 */
export default function AvailableCourseCard({ course }: { course: CourseSchema }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <GlowCard className="h-full group cursor-pointer hover:border-brand-indigo-500/40 transition">
        <div
          className="h-36 rounded-xl overflow-hidden mb-4 relative"
          style={{ background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})` }}
        >
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1280px) calc(50vw - 3rem), 33vw"
            className="object-cover"
          />
          <div className="absolute top-2 left-2 bg-surface-900/70 backdrop-blur text-xs text-text-secondary px-2 py-0.5 rounded-full border border-glass-border">
            {course.level}
          </div>
        </div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-bold text-text-primary group-hover:text-brand-indigo-300 transition text-sm leading-snug">
              {course.title}
            </h3>
            <p className="text-text-muted text-xs mt-0.5 line-clamp-2">{course.shortDescription}</p>
          </div>
          <ChevronRight className="text-brand-indigo-400/30 group-hover:text-brand-indigo-400 group-hover:translate-x-1 transition shrink-0 mt-0.5" size={18} />
        </div>
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-brand-indigo-500/10">
          <span className="text-xs text-text-muted flex items-center gap-1">
            <Clock size={12} />
            {course.duration}
          </span>
          <span className="text-sm font-bold text-brand-indigo-400">{course.price}</span>
        </div>
      </GlowCard>
    </Link>
  );
}
