import { Trophy } from 'lucide-react';
import GlowCard from '@/components/ui/GlowCard';

/**
 * LearningRankCard — "Your Learning Rank" card showing the student's
 * own position (always #1 of themselves, pending a real leaderboard
 * query on this page — see /dashboard/leaderboard for the full ranking).
 * Single Responsibility: this one card only.
 */
interface LearningRankCardProps {
  userFirstName: string;
  totalPoints: number;
}

export default function LearningRankCard({ userFirstName, totalPoints }: LearningRankCardProps) {
  return (
    <GlowCard>
      <h2 className="text-lg font-bold text-text-primary mb-4">Your Learning Rank</h2>
      {totalPoints === 0 ? (
        <div className="py-6 text-center">
          <Trophy className="mx-auto mb-3 text-text-faint" size={36} />
          <p className="text-text-muted text-sm">Complete lessons to climb the leaderboard!</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold w-6 text-center text-warning">#1</span>
              <span className="text-brand-indigo-400 font-semibold">
                {userFirstName} <span className="text-text-faint font-normal">(you)</span>
              </span>
            </div>
            <span className="text-brand-purple-400 font-bold">{totalPoints.toLocaleString()} pts</span>
          </div>
          <div className="pt-3 border-t border-white/5">
            <p className="text-text-faint text-xs text-center">Complete quizzes to boost your rank.</p>
          </div>
        </div>
      )}
    </GlowCard>
  );
}
