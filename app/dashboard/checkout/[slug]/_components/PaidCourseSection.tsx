import PlanSelector from './PlanSelector';
import SecurePaymentInfoCard from './SecurePaymentInfoCard';
import CouponCard from './CouponCard';
import PointsRedemptionCard from './PointsRedemptionCard';
import PayButtonCard from './PayButtonCard';
import type { CourseSchema } from '@/lib/courses/courseTypes';
import type { CheckoutPricing } from '@/lib/checkout/computeCheckoutPricing';
import type { AppUser } from '@/context/auth/AppUser';

/**
 * PaidCourseSection — composes the entire left-column payment flow for
 * a non-free course: plan selector (if premium tier exists), payment
 * info, coupon, points redemption, and the pay button.
 * Single Responsibility: composition only — each piece is a dedicated file.
 */
interface PaidCourseSectionProps {
  course: CourseSchema;
  user: AppUser;
  hasPremium: boolean;
  selectedPlan: 'standard' | 'premium';
  onSelectPlan: (plan: 'standard' | 'premium') => void;
  numericStandardPrice: number;
  numericPremiumPrice: number;
  numericPrice: number;
  pricing: CheckoutPricing;
  paystackReady: boolean;
  paystackLoadError: boolean;
  coupon: string;
  onCouponChange: (value: string) => void;
  onApplyCoupon: () => void;
  couponApplied: boolean;
  discountPercent: number;
  couponError: string;
  pointsEnabled: boolean;
  pointsInput: string;
  onPointsInputChange: (value: string) => void;
  onMaxPoints: () => void;
  onApplyPoints: () => void;
  pointsToApply: number;
  pointsError: string;
  agreed: boolean;
  onToggleAgreed: () => void;
  paymentError: string;
  processing: boolean;
  onZeroAmountEnroll: () => void;
  onPaystackPay: () => void;
}

export default function PaidCourseSection({
  course,
  user,
  hasPremium,
  selectedPlan,
  onSelectPlan,
  numericStandardPrice,
  numericPremiumPrice,
  numericPrice,
  pricing,
  paystackReady,
  paystackLoadError,
  coupon,
  onCouponChange,
  onApplyCoupon,
  couponApplied,
  discountPercent,
  couponError,
  pointsEnabled,
  pointsInput,
  onPointsInputChange,
  onMaxPoints,
  onApplyPoints,
  pointsToApply,
  pointsError,
  agreed,
  onToggleAgreed,
  paymentError,
  processing,
  onZeroAmountEnroll,
  onPaystackPay,
}: PaidCourseSectionProps) {
  return (
    <div className="space-y-5">
      {hasPremium && (
        <PlanSelector
          course={course}
          selectedPlan={selectedPlan}
          numericStandardPrice={numericStandardPrice}
          numericPremiumPrice={numericPremiumPrice}
          onSelectPlan={onSelectPlan}
        />
      )}

      <SecurePaymentInfoCard paystackLoadError={paystackLoadError} />

      <CouponCard
        coupon={coupon}
        onCouponChange={onCouponChange}
        onApply={onApplyCoupon}
        couponApplied={couponApplied}
        discountPercent={discountPercent}
        couponError={couponError}
      />

      {pointsEnabled && user.creditBalance > 0 && (
        <PointsRedemptionCard
          creditBalance={user.creditBalance}
          pointsInput={pointsInput}
          onPointsInputChange={onPointsInputChange}
          onMaxPoints={onMaxPoints}
          onApplyPoints={onApplyPoints}
          pointsToApply={pointsToApply}
          pointsError={pointsError}
        />
      )}

      <PayButtonCard
        agreed={agreed}
        onToggleAgreed={onToggleAgreed}
        paymentError={paymentError}
        totalKobo={pricing.finalKobo}
        total={pricing.finalNaira}
        processing={processing}
        paystackReady={paystackReady}
        selectedPlan={selectedPlan}
        onZeroAmountEnroll={onZeroAmountEnroll}
        onPaystackPay={onPaystackPay}
      />
    </div>
  );
}
