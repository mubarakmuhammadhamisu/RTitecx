import { Zap, CheckCircle2 } from 'lucide-react';

/**
 * PointsRedemptionCard — points-to-apply input + MAX/Apply buttons.
 * Only rendered when pointsEnabled && creditBalance > 0 (parent's
 * decision). Single Responsibility: this one card only.
 */
interface PointsRedemptionCardProps {
  creditBalance: number;
  pointsInput: string;
  onPointsInputChange: (value: string) => void;
  onMaxPoints: () => void;
  onApplyPoints: () => void;
  pointsToApply: number;
  pointsError: string;
}

export default function PointsRedemptionCard({
  creditBalance,
  pointsInput,
  onPointsInputChange,
  onMaxPoints,
  onApplyPoints,
  pointsToApply,
  pointsError,
}: PointsRedemptionCardProps) {
  return (
    <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 p-5 space-y-3">
      <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
        <Zap size={16} className="text-warning" /> Use Points
        <span className="ml-auto text-xs font-normal text-text-muted">
          Balance: <span className="text-warning font-semibold">{creditBalance.toLocaleString()} pts</span>
        </span>
      </h2>
      <div className="flex gap-2">
        <input
          type="number"
          min="0"
          max={creditBalance}
          placeholder="Enter points to apply"
          value={pointsInput}
          onChange={(e) => onPointsInputChange(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg bg-surface-800 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-warning/60 transition"
        />
        <button
          onClick={onMaxPoints}
          className="px-3 py-2.5 rounded-lg bg-warning/20 hover:bg-warning/30 text-warning text-xs font-bold border border-warning/30 transition whitespace-nowrap"
        >
          MAX
        </button>
        <button
          onClick={onApplyPoints}
          className="px-4 py-2.5 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-sm font-semibold transition whitespace-nowrap"
        >
          Apply
        </button>
      </div>
      {pointsToApply > 0 && (
        <p className="text-xs text-warning flex items-center gap-1.5">
          <CheckCircle2 size={13} /> {pointsToApply.toLocaleString()} pts applied (−₦{pointsToApply.toLocaleString()})
        </p>
      )}
      {pointsError && <p className="text-xs text-danger">{pointsError}</p>}
      <p className="text-xs text-text-faint">1 point = ₦1 · Points are applied after any coupon discount</p>
    </div>
  );
}
