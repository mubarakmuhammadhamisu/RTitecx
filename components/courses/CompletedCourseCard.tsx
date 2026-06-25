import Link from 'next/link';
import Image from 'next/image';
import GlowCard from '@/components/ui/GlowCard';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * CompletedCourseCard — one completed course card with a "Done" badge.
 * Single Responsibility: this one card only.
 */
export default function CompletedCourseCard({ course }: { course: EnrolledCourse }) {
  return (
    <Link href={`/dashboard/courses/${course.slug}`}>
      <GlowCard className="group cursor-pointer hover:border-success/40 transition">
        <div
          className="h-24 rounded-xl overflow-hidden mb-3 relative"
          style={{ background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})` }}
        >
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 768px) calc(100vw - 3rem), 33vw"
            className="object-cover opacity-70"
          />
          <div className="absolute top-2 right-2 bg-success text-white text-xs font-bold px-2 py-0.5 rounded-full">
            ✓ Done
          </div>
        </div>
        <h3 className="text-sm font-bold text-text-primary group-hover:text-success transition">{course.title}</h3>
        <div className="mt-2 h-1.5 bg-success/30 rounded-full overflow-hidden">
          <div className="h-full w-full bg-success" />
        </div>
      </GlowCard>
    </Link>
  );
}
