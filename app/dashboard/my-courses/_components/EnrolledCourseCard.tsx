import Link from 'next/link';
import Image from 'next/image';
import { Clock, Users, ChevronRight, Play } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';
import MysteryBoxStatusBanner from './MysteryBoxStatusBanner';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * EnrolledCourseCard — the richer course card used on My Courses (vs.
 * the simpler ActiveCourseCard on the dashboard overview). Includes
 * premium badge, completed badge, student count / "Early Access" pill,
 * and the mystery box status banner.
 *
 * Single Responsibility: this one card. Mystery box logic is delegated
 * to MysteryBoxStatusBanner.tsx since it's a distinct concern.
 */
export default function EnrolledCourseCard({ course }: { course: EnrolledCourse }) {
  const href = course.nextLessonId
    ? `/dashboard/courses/${course.slug}/view/${course.nextLessonId}`
    : `/dashboard/courses/${course.slug}`;

  const progressBarClass =
    course.progress === 100
      ? 'bg-success'
      : course.purchaseType === 'premium'
        ? 'bg-linear-to-r from-brand-pink-500 to-brand-purple-500'
        : 'bg-gradient-cta';

  const progressTextClass =
    course.progress === 100
      ? 'text-success'
      : course.purchaseType === 'premium'
        ? 'text-brand-pink-400'
        : 'text-brand-indigo-400';

  return (
    <Link href={href}>
      <GlowCard className="h-full group cursor-pointer hover:border-brand-purple-500/50 transition">
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
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/20">
            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <Play size={18} className="text-white ml-0.5" />
            </div>
          </div>
          {course.progress === 100 && (
            <div className="absolute top-2 right-2 bg-success text-white text-xs font-bold px-2 py-0.5 rounded-full">
              ✓ Completed
            </div>
          )}
          {course.purchaseType === 'premium' && course.progress < 100 && (
            <div className="absolute top-2 left-2 bg-linear-to-r from-brand-pink-500 to-brand-pink-400 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md">
              🎁 Premium
            </div>
          )}
        </div>

        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-bold text-text-primary group-hover:text-brand-indigo-300 transition text-sm leading-snug">
              {course.title}
            </h3>
            <p className="text-text-muted text-xs mt-0.5">{course.instructor}</p>
          </div>
          <ChevronRight className="text-brand-indigo-400/30 group-hover:text-brand-indigo-400 group-hover:translate-x-1 transition shrink-0" size={18} />
        </div>

        <div className="flex gap-3 mb-3 text-xs text-text-muted">
          <span className="flex items-center gap-1">
            <Clock size={12} className="text-brand-indigo-400/60" />
            {course.duration}
          </span>
          {course.students > 0 ? (
            <span className="flex items-center gap-1">
              <Users size={12} className="text-brand-purple-400/60" />
              {course.students.toLocaleString()} students
            </span>
          ) : (
            <span className="px-1.5 py-0.5 rounded-full bg-brand-indigo-500/15 border border-brand-indigo-500/25 text-brand-indigo-400 text-xs font-medium">
              Early Access
            </span>
          )}
        </div>

        <MysteryBoxStatusBanner course={course} />

        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-text-muted">Progress</span>
            <span className={`font-semibold ${progressTextClass}`}>{course.progress}%</span>
          </div>
          <div className="h-1.5 bg-surface-800 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${progressBarClass}`} style={{ width: `${course.progress}%` }} />
          </div>
        </div>
      </GlowCard>
    </Link>
  );
}
