import { Users, RefreshCw } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { formatReferralDate } from '@/lib/referral/formatReferralDate';
import type { Referral } from '@/lib/referral/referralTypes';

/**
 * ReferralHistorySection — list of who you've referred and their
 * pending/converted/expired status. Single Responsibility: this one
 * section only; badge rendering delegated to StatusBadge.
 */
interface ReferralHistorySectionProps {
  referrals: Referral[];
  loading: boolean;
}

export default function ReferralHistorySection({ referrals, loading }: ReferralHistorySectionProps) {
  return (
    <div className="rounded-2xl bg-linear-to-br from-surface-900/80 to-surface-800/40 border border-brand-indigo-500/20 overflow-hidden">
      <div className="px-5 py-4 border-b border-brand-indigo-500/10 flex items-center justify-between">
        <h2 className="font-bold text-text-primary text-base flex items-center gap-2">
          <Users size={16} className="text-brand-indigo-400" /> Referral History
        </h2>
        {loading && <RefreshCw size={14} className="text-text-faint animate-spin" />}
      </div>

      {!loading && referrals.length === 0 ? (
        <div className="py-12 text-center text-text-faint space-y-2">
          <Users size={36} className="mx-auto opacity-30" />
          <p className="text-sm">No referrals yet. Share your link to get started.</p>
        </div>
      ) : (
        <div className="divide-y divide-brand-indigo-500/10">
          {referrals.map((ref) => (
            <div key={ref.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-brand-indigo-500/5 transition">
              <div className="w-9 h-9 rounded-full bg-linear-to-br from-surface-700 to-surface-600 flex items-center justify-center text-sm font-bold text-text-secondary shrink-0">
                {ref.refereeName.slice(0, 1).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">{ref.refereeName}</p>
                <p className="text-xs text-text-faint">Joined {formatReferralDate(ref.referredAt)}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <StatusBadge status={ref.status} />
                {ref.status === 'converted' && ref.commissionPoints && (
                  <span className="text-xs text-success font-semibold">+{ref.commissionPoints} pts earned</span>
                )}
                {ref.status === 'pending' && <span className="text-xs text-text-faint">30-day window active</span>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
