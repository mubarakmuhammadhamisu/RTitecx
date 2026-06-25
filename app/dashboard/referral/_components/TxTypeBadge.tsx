import type { PointTransactionType } from '@/lib/referral/referralTypes';

/**
 * TxTypeBadge — +N / -N pts pill, colored by credit/debit.
 * Single Responsibility: this one badge only.
 */
interface TxTypeBadgeProps {
  type: PointTransactionType;
  points: number;
}

export default function TxTypeBadge({ points }: TxTypeBadgeProps) {
  const isCredit = points > 0;
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isCredit ? 'bg-success/20 text-success' : 'bg-danger/20 text-danger'}`}>
      {isCredit ? `+${points}` : points} pts
    </span>
  );
}
