import { Zap, TrendingUp, Users, CheckCircle2 } from 'lucide-react';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * ReferralStatsGrid — 4-card stat row (spendable points, lifetime
 * points, total referrals, converted). Single Responsibility: this one
 * grid only.
 */
interface ReferralStatsGridProps {
  user: AppUser;
  totalReferrals: number;
  convertedReferrals: number;
  loading: boolean;
}

export default function ReferralStatsGrid({
  user,
  totalReferrals,
  convertedReferrals,
  loading,
}: ReferralStatsGridProps) {
  const cards = [
    {
      label: 'Spendable Points',
      value: user.creditBalance.toLocaleString(),
      sub: '₦1 per point',
      color: 'text-brand-indigo-400',
      Icon: Zap,
    },
    {
      label: 'Lifetime Points',
      value: user.lifetimePoints.toLocaleString(),
      sub: 'never resets',
      color: 'text-brand-purple-400',
      Icon: TrendingUp,
    },
    {
      label: 'Total Referrals',
      value: loading ? '—' : totalReferrals.toString(),
      sub: 'signed up',
      color: 'text-success',
      Icon: Users,
    },
    {
      label: 'Converted',
      value: loading ? '—' : convertedReferrals.toString(),
      sub: 'purchased a course',
      color: 'text-warning',
      Icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {cards.map(({ label, value, sub, color, Icon }) => (
        <div
          key={label}
          className="rounded-2xl bg-linear-to-br from-surface-900/80 to-surface-800/40 border border-brand-indigo-500/20 p-4 space-y-1"
        >
          <div className="flex items-center gap-2">
            <Icon size={18} className={color} />
            <span className="text-xs text-text-faint">{label}</span>
          </div>
          <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
          <p className="text-xs text-text-faint/70">{sub}</p>
        </div>
      ))}
    </div>
  );
}
