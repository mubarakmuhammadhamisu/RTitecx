import { Tag, Zap } from 'lucide-react';
import type { CheckoutPricing } from '@/lib/checkout/computeCheckoutPricing';

/**
 * PriceBreakdownCard — Order Summary card with line-item breakdown
 * (base price, coupon discount, points discount, total). Hidden for
 * free courses (parent's decision). Single Responsibility: this one
 * card only.
 */
interface PriceBreakdownCardProps {
  numericPrice: number;
  pricing: CheckoutPricing;
  couponApplied: boolean;
  hasPremium: boolean;
  selectedPlan: 'standard' | 'premium';
  premiumDeadlineDays: number;
}

export default function PriceBreakdownCard({
  numericPrice,
  pricing,
  couponApplied,
  hasPremium,
  selectedPlan,
  premiumDeadlineDays,
}: PriceBreakdownCardProps) {
  return (
    <div className="rounded-2xl bg-surface-900 border border-brand-indigo-500/20 p-4 space-y-2.5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-text-primary">Order Summary</h3>
        {hasPremium && (
          <span
            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
              selectedPlan === 'premium'
                ? 'bg-brand-pink-500/20 text-brand-pink-300 border border-brand-pink-500/30'
                : 'bg-brand-indigo-500/20 text-brand-indigo-300 border border-brand-indigo-500/30'
            }`}
          >
            {selectedPlan === 'premium' ? '🎁 Premium' : 'Standard'}
          </span>
        )}
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-text-muted">Course Price</span>
        <span className="text-text-primary">₦{numericPrice.toLocaleString()}</span>
      </div>

      {couponApplied && (
        <div className="flex justify-between text-sm">
          <span className="text-success flex items-center gap-1">
            <Tag size={12} /> Promo Code Applied
          </span>
          <span className="text-success">−₦{pricing.couponDiscount.toLocaleString()}</span>
        </div>
      )}

      {pricing.pointsDiscount > 0 && (
        <div className="flex justify-between text-sm">
          <span className="text-warning flex items-center gap-1">
            <Zap size={12} /> Points Applied
          </span>
          <span className="text-warning">−₦{pricing.pointsDiscount.toLocaleString()}</span>
        </div>
      )}

      <div className="border-t border-brand-indigo-500/20 pt-2.5 flex justify-between items-center">
        <span className="text-text-primary font-bold">Total</span>
        <span className={`text-2xl font-extrabold ${selectedPlan === 'premium' ? 'text-brand-pink-400' : 'text-brand-indigo-400'}`}>
          ₦{pricing.finalNaira.toLocaleString()}
        </span>
      </div>

      {hasPremium && selectedPlan === 'premium' && (
        <p className="text-xs text-brand-pink-300 text-center pt-1 flex items-center justify-center gap-1">
          {premiumDeadlineDays}-day completion challenge starts after payment
        </p>
      )}
    </div>
  );
}
