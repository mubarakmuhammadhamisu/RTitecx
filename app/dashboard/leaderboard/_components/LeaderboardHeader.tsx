import Link from 'next/link';
import { Trophy, Zap, BookOpen } from 'lucide-react';
import type { LeaderboardTab } from '@/lib/leaderboard/leaderboardTypes';

/**
 * LeaderboardHeader — title, description, and the tab-aware CTA button.
 * Single Responsibility: this one header only.
 */
export default function LeaderboardHeader({ activeTab }: { activeTab: LeaderboardTab }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-extrabold text-text-primary flex items-center gap-3">
          <Trophy size={26} className="text-warning" /> Leaderboard
        </h1>
        <p className="text-text-muted text-sm mt-1">
          {activeTab === 'credits'
            ? 'Ranked by lifetime credit points earned through referrals. 1 Credit = ₦1.'
            : 'Ranked by learning progress. Completed = 800 pts · In-progress = 200 pts.'}
        </p>
      </div>
      <Link
        href={activeTab === 'credits' ? '/dashboard/referral' : '/courses'}
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-cta hover:opacity-90 text-white text-sm font-semibold transition shrink-0 shadow-lg shadow-brand-indigo-500/20"
      >
        {activeTab === 'credits' ? (
          <>
            <Zap size={14} /> Earn Credits
          </>
        ) : (
          <>
            <BookOpen size={14} /> Browse Courses
          </>
        )}
      </Link>
    </div>
  );
}
