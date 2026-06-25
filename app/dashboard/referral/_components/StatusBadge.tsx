import type { Referral } from '@/lib/referral/referralTypes';

/**
 * StatusBadge — pending/converted/expired pill.
 * Single Responsibility: this one badge only.
 */
const STATUS_STYLES: Record<Referral['status'], string> = {
  pending: 'bg-warning/20 text-warning border-warning/30',
  converted: 'bg-success/20 text-success border-success/30',
  expired: 'bg-surface-600/20 text-text-faint border-surface-600/30',
};

export default function StatusBadge({ status }: { status: Referral['status'] }) {
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_STYLES[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
