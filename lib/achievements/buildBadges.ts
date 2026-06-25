import { Zap, Trophy, Star, type LucideIcon } from 'lucide-react';
import { checkFastLearnerBadge } from './badges/checkFastLearnerBadge';
import { checkConsistentBadge } from './badges/checkConsistentBadge';
import { checkExpertBadge } from './badges/checkExpertBadge';
import type { EnrolledCourse } from '@/lib/courses/courseTypes';

/**
 * lib/achievements/buildBadges.ts
 * ────────────────────────────────────────────────────────────────────────
 * Single Responsibility: assemble the badge list, delegating each
 * badge's earned-state calculation to its own dedicated function in
 * lib/achievements/badges/.
 *
 * NOTE: a 'Perfect Score' badge is intentionally omitted until
 * quiz-score storage is implemented — it will be re-added once a
 * quiz_results table tracks per-attempt scores (see schema TODO).
 */
export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: LucideIcon;
  earned: boolean;
}

export function buildBadges(
  completedCourses: EnrolledCourse[],
  enrolledCourses: EnrolledCourse[]
): Badge[] {
  return [
    {
      id: 1,
      name: 'Fast Learner',
      description: 'Complete 3 courses within the same 30-day window',
      icon: Zap,
      earned: checkFastLearnerBadge(completedCourses),
    },
    {
      id: 2,
      name: 'Consistent',
      description: 'Show learning activity across 7 or more days',
      icon: Trophy,
      earned: checkConsistentBadge(enrolledCourses),
    },
    {
      id: 3,
      name: 'Expert',
      description: 'Achieve 90%+ progress in all enrolled courses',
      icon: Star,
      earned: checkExpertBadge(enrolledCourses),
    },
  ];
}
