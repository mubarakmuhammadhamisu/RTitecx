import { Zap, ChevronDown, ChevronUp } from 'lucide-react';
import TxTypeBadge from './TxTypeBadge';
import { formatReferralDate } from '@/lib/referral/formatReferralDate';
import type { PointTransaction } from '@/lib/referral/referralTypes';

/**
 * TransactionHistorySection — collapsible "Points Transactions" list.
 * Single Responsibility: this one section only; badge rendering
 * delegated to TxTypeBadge.
 */
interface TransactionHistorySectionProps {
  transactions: PointTransaction[];
  loading: boolean;
  expanded: boolean;
  onToggle: () => void;
}

export default function TransactionHistorySection({
  transactions,
  loading,
  expanded,
  onToggle,
}: TransactionHistorySectionProps) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-surface-900/80 to-surface-800/40 border border-brand-indigo-500/20 overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full px-5 py-4 flex items-center justify-between hover:bg-brand-indigo-500/5 transition"
      >
        <h2 className="font-bold text-text-primary text-base flex items-center gap-2">
          <Zap size={16} className="text-warning" /> Points Transactions
        </h2>
        {expanded ? (
          <ChevronUp size={16} className="text-text-faint" />
        ) : (
          <ChevronDown size={16} className="text-text-faint" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-brand-indigo-500/10">
          {!loading && transactions.length === 0 ? (
            <div className="py-10 text-center text-text-faint text-sm">No transactions yet.</div>
          ) : (
            <div className="divide-y divide-brand-indigo-500/10">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-brand-indigo-500/5 transition">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-text-primary truncate">
                      {tx.description ?? tx.type.replace(/_/g, ' ')}
                    </p>
                    <p className="text-xs text-text-faint">{formatReferralDate(tx.createdAt)}</p>
                  </div>
                  <TxTypeBadge type={tx.type} points={tx.points} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
