import Link from 'next/link';
import { BookOpen } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

/**
 * NoActiveCoursesState — empty state shown when the student has no
 * in-progress courses. Single Responsibility: this one empty state.
 */
export default function NoActiveCoursesState() {
  return (
    <GlowCard className="text-center py-12">
      <BookOpen className="mx-auto mb-4 text-text-faint" size={48} />
      <h3 className="text-lg font-semibold text-text-secondary mb-2">No active courses yet</h3>
      <p className="text-text-faint text-sm mb-6">Browse our catalogue and start learning today.</p>
      <Link
        href="/dashboard/my-courses"
        className="inline-flex items-center gap-2 px-6 py-2.5 bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-sm font-semibold rounded-xl transition"
      >
        Browse Courses
      </Link>
    </GlowCard>
  );
}
