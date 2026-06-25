import Image from 'next/image';
import { Clock, BookOpen, Users, CheckCircle2 } from 'lucide-react';
import type { CourseSchema } from '@/lib/courses/courseTypes';

/**
 * OrderSummaryCourseCard — course thumbnail/title/meta/included-perks
 * sidebar card.
 *
 * CORRECTED from the original codebase: the original interpolated hex
 * gradient strings directly into Tailwind class names
 * (`bg-linear-to-br ${course.gradientFrom} ${course.gradientTo}`),
 * which produces invalid/no-op classes. Fixed using an inline style
 * gradient, consistent with the fix applied throughout this rewrite.
 *
 * Single Responsibility: this one card only.
 */
export default function OrderSummaryCourseCard({ course }: { course: CourseSchema }) {
  const metaItems = [
    { icon: Clock, text: course.duration },
    { icon: BookOpen, text: `${course.curriculum.length} lessons` },
    { icon: Users, text: course.instructor },
  ];

  const includedItems = ['Lifetime access', 'Certificate of completion', ...course.features.slice(0, 2)];

  return (
    <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 overflow-hidden">
      <div
        className="h-40 relative"
        style={{ background: `linear-gradient(to bottom right, ${course.gradientFrom}, ${course.gradientTo})` }}
      >
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-surface-900/80 to-transparent" />
        <div className="absolute bottom-3 left-3">
          <span className="bg-surface-900/80 backdrop-blur text-brand-indigo-300 text-xs font-semibold px-2 py-0.5 rounded-full border border-brand-indigo-500/30">
            {course.level}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <h3 className="font-bold text-text-primary leading-snug">{course.title}</h3>
        <p className="text-text-muted text-xs leading-relaxed">{course.shortDescription}</p>

        <div className="grid grid-cols-3 gap-2 pt-1">
          {metaItems.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex flex-col items-center gap-1 p-2 rounded-lg bg-surface-800/60 border border-brand-indigo-500/10"
            >
              <Icon size={13} className="text-brand-indigo-400" />
              <span className="text-xs text-text-muted text-center leading-tight">{text}</span>
            </div>
          ))}
        </div>

        <div className="pt-1 space-y-1.5">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">Included</p>
          {includedItems.map((item) => (
            <div key={item} className="flex items-center gap-2 text-xs text-text-secondary">
              <CheckCircle2 size={13} className="text-success shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
