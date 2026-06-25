import Link from 'next/link';
import { Play } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * ResumeCourseBanner — "Continue where you left off" CTA. Renders
 * nothing if there's no next lesson or the course is already complete.
 * Single Responsibility: this one banner only.
 */
export default function ResumeCourseBanner({ course }: { course: EnrolledCourse }) {
  if (!course.nextLessonId || course.progress >= 100) return null;

  return (
    <Link href={`/dashboard/courses/${course.slug}/view/${course.nextLessonId}`}>
      <GlowCard className="flex items-center justify-between group cursor-pointer hover:border-brand-indigo-500/50 transition">
        <div>
          <p className="text-xs text-brand-indigo-400 font-medium mb-0.5">Continue where you left off</p>
          <p className="text-text-primary font-semibold">Resume Course</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-brand-indigo-600 flex items-center justify-center group-hover:bg-brand-indigo-500 transition">
          <Play size={16} className="text-white ml-0.5" />
        </div>
      </GlowCard>
    </Link>
  );
}
