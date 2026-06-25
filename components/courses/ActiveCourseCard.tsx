import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Play } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * ActiveCourseCard — one in-progress course card with thumbnail, hover
 * play overlay, and progress bar. Single Responsibility: this one card.
 */
export default function ActiveCourseCard({ course }: { course: EnrolledCourse }) {
  const href = course.nextLessonId
    ? `/dashboard/courses/${course.slug}/view/${course.nextLessonId}`
    : `/dashboard/courses/${course.slug}`;

  return (
    <Link href={href}>
      <GlowCard className="group cursor-pointer hover:border-brand-indigo-500/50 transition h-full">
        <div
          className="h-28 rounded-xl overflow-hidden mb-4 relative"
          style={{ background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})` }}
        >
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) calc(100vw - 3rem), 50vw"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play size={18} className="text-white ml-0.5" />
            </div>
          </div>
        </div>
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-text-primary group-hover:text-brand-indigo-300 transition leading-tight">
              {course.title}
            </h3>
            <p className="text-text-muted text-xs mt-0.5">{course.instructor}</p>
          </div>
          <ChevronRight
            className="text-brand-indigo-400/30 group-hover:text-brand-indigo-400 group-hover:translate-x-1 transition shrink-0"
            size={18}
          />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Progress</span>
            <span className="text-brand-indigo-400 font-semibold">{course.progress}%</span>
          </div>
          <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-cta" style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}
