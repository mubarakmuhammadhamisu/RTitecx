import Link from 'next/link';
import Image from 'next/image';
import { Clock, ChevronRight } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * ProgressCourseRow — one course row on the progress overview page,
 * linking to its detail page.
 *
 * CORRECTED from the original codebase: the original interpolated
 * `course.gradientFrom`/`gradientTo` (hex color strings like "#6366f1")
 * directly into Tailwind class names (`bg-linear-to-br ${from} ${to}`),
 * which produces invalid/no-op classes since those aren't Tailwind
 * tokens. Fixed here using an inline `style` with a real CSS gradient,
 * matching the pattern used elsewhere in this rewrite (e.g. CourseCard).
 *
 * Single Responsibility: this one row only.
 */
export default function ProgressCourseRow({ course }: { course: EnrolledCourse }) {
  return (
    <Link href={`/dashboard/progress/${course.slug}`}>
      <GlowCard className="group cursor-pointer hover:border-brand-indigo-500/50 transition">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative"
            style={{ background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})` }}
          >
            <Image src={course.thumbnail} alt={course.title} fill sizes="64px" className="object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1.5">
              <h3 className="font-bold text-text-primary text-sm group-hover:text-brand-indigo-300 transition truncate pr-2">
                {course.title}
              </h3>
              <span
                className={`text-sm font-bold shrink-0 ${course.progress === 100 ? 'text-success' : 'text-brand-indigo-400'}`}
              >
                {course.progress}%
              </span>
            </div>
            <div className="h-2 bg-surface-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${course.progress === 100 ? 'bg-success' : 'bg-gradient-cta'}`}
                style={{ width: `${course.progress}%` }}
              />
            </div>
            <div className="flex items-center gap-3 mt-1.5 text-xs text-text-faint">
              <span className="flex items-center gap-1">
                <Clock size={11} />
                {course.duration}
              </span>
              {course.progress === 100 && <span className="text-success font-medium">✓ Completed</span>}
              {course.progress > 0 && course.progress < 100 && <span className="text-brand-indigo-400">In Progress</span>}
              {course.progress === 0 && <span>Not started</span>}
            </div>
          </div>
          <ChevronRight className="text-brand-indigo-400/30 group-hover:text-brand-indigo-400 group-hover:translate-x-1 transition shrink-0" size={18} />
        </div>
      </GlowCard>
    </Link>
  );
}
