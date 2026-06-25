import Image from 'next/image';
import Link from 'next/link';
import GlowCardHero from '@/components/ui/GlowCardHero';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * ProgressDetailHero — course thumbnail/title/instructor + back button.
 * CORRECTED: uses inline style gradient instead of invalid Tailwind
 * class interpolation (same fix as ProgressCourseRow).
 * Single Responsibility: this one hero section only.
 */
export default function ProgressDetailHero({ course }: { course: EnrolledCourse }) {
  return (
    <GlowCardHero>
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-xl overflow-hidden shrink-0 relative"
            style={{ background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})` }}
          >
            <Image src={course.thumbnail} alt={course.title} fill sizes="64px" className="object-cover" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-text-primary leading-tight">{course.title}</h1>
            <p className="text-text-secondary text-sm mt-0.5">by {course.instructor}</p>
          </div>
        </div>
        <Link href="/dashboard/progress">
          <button className="px-4 py-2 rounded-lg bg-surface-900/60 border border-brand-indigo-500/30 hover:border-brand-indigo-500/60 text-text-primary text-sm transition whitespace-nowrap">
            ← Back
          </button>
        </Link>
      </div>
    </GlowCardHero>
  );
}
