import Link from 'next/link';
import { Zap, BookOpen, ArrowRight } from 'lucide-react';
import type { LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * YourStatusUnrankedState — high-conversion CTA shown when the student
 * has no rank yet on the active board. Single Responsibility: this one
 * state only (branches on tab for copy/link, but stays one component
 * since the branching is trivial and tightly coupled to this one card).
 */
export default function YourStatusUnrankedState({ tab }: { tab: LeaderboardTab }) {
  if (tab === 'credits') {
    return (
      <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-warning/10 border border-warning/20">
        <Zap size={18} className="text-warning shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-text-primary">You&apos;re not on the Credits Board yet</p>
          <p className="text-xs text-text-muted">
            One referral that converts = instant entry. Earn 10% of every course they buy.
          </p>
        </div>
        <Link
          href="/dashboard/referral"
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-warning/20 hover:bg-warning/30 text-warning text-xs font-semibold transition shrink-0 border border-warning/20"
        >
          Get Link <ArrowRight size={12} />
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 px-5 py-4 rounded-2xl bg-success/10 border border-success/20">
      <BookOpen size={18} className="text-success shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-text-primary">Start learning to appear here</p>
        <p className="text-xs text-text-muted">Even partial progress earns 200 pts. Finish a course for 800 pts.</p>
      </div>
      <Link
        href="/courses"
        className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-success/20 hover:bg-success/30 text-success text-xs font-semibold transition shrink-0 border border-success/20"
      >
        Browse <ArrowRight size={12} />
      </Link>
    </div>
  );
}
