import { Clock, Package } from 'lucide-react';
import { daysRemaining } from '@/lib/dashboard/daysRemaining';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * MysteryBoxStatusBanner — the premium-tier countdown / earned /
 * forfeited banner shown on an enrolled course card.
 *
 * Single Responsibility: this one banner's 3 mutually-exclusive states
 * only — extracted from the enrolled course card since it's a genuinely
 * separate concern (gamification status) from the card's core job
 * (showing course progress).
 */
export default function MysteryBoxStatusBanner({ course }: { course: EnrolledCourse }) {
  if (course.mysteryBoxStatus === 'earned') {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3 bg-success/10 border border-success/20 text-success text-xs font-medium">
        <Package size={12} className="text-success" />
        🎉 Mystery box earned! Check your email.
      </div>
    );
  }

  if (course.mysteryBoxStatus === 'forfeited') {
    return (
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-3 bg-surface-700/40 border border-surface-600/40 text-text-faint text-xs">
        <Package size={12} />
        Mystery box deadline passed
      </div>
    );
  }

  if (course.purchaseType === 'premium' && course.progress < 100 && course.mysteryBoxStatus === 'pending') {
    const days = daysRemaining(course.premiumDeadline);
    if (days === null) return null;
    const urgent = days <= 7;
    return (
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 text-xs font-medium ${
          urgent
            ? 'bg-danger/10 border border-danger/20 text-danger'
            : 'bg-brand-pink-500/10 border border-brand-pink-500/20 text-brand-pink-300'
        }`}
      >
        <Clock size={12} className={urgent ? 'text-danger' : 'text-brand-pink-400'} />
        {days === 0
          ? '⚠️ Deadline passed — mystery box forfeited'
          : `${days} day${days === 1 ? '' : 's'} left to earn mystery box`}
      </div>
    );
  }

  return null;
}
