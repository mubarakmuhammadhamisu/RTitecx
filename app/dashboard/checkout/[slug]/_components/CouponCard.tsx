import { Tag, CheckCircle2 } from 'lucide-react';

/**
 * CouponCard — coupon code input + apply button + status messages.
 * Single Responsibility: this one card only.
 */
interface CouponCardProps {
  coupon: string;
  onCouponChange: (value: string) => void;
  onApply: () => void;
  couponApplied: boolean;
  discountPercent: number;
  couponError: string;
}

export default function CouponCard({
  coupon,
  onCouponChange,
  onApply,
  couponApplied,
  discountPercent,
  couponError,
}: CouponCardProps) {
  return (
    <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 p-5 space-y-3">
      <h2 className="text-base font-bold text-text-primary flex items-center gap-2">
        <Tag size={16} className="text-brand-indigo-400" /> Coupon Code
      </h2>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter promo code"
          value={coupon}
          onChange={(e) => onCouponChange(e.target.value)}
          className="flex-1 px-4 py-2.5 rounded-lg bg-surface-800 border border-brand-indigo-500/20 text-text-primary text-sm placeholder-text-faint focus:outline-none focus:border-brand-indigo-500/60 transition"
        />
        <button
          onClick={onApply}
          className="px-4 py-2.5 rounded-lg bg-brand-indigo-600 hover:bg-brand-indigo-700 text-white text-sm font-semibold transition whitespace-nowrap"
        >
          Apply
        </button>
      </div>
      {couponApplied && (
        <p className="text-xs text-success flex items-center gap-1.5">
          <CheckCircle2 size={13} /> {discountPercent}% discount applied!
        </p>
      )}
      {couponError && <p className="text-xs text-danger">{couponError}</p>}
    </div>
  );
}
