import OrderSummaryCourseCard from './OrderSummaryCourseCard';
import PriceBreakdownCard from './PriceBreakdownCard';
import TrustBadgesCard from './TrustBadgesCard';
import type { CourseSchema } from '@/lib/courses/courseTypes';
import type { CheckoutPricing } from '@/lib/checkout/computeCheckoutPricing';

/**
 * OrderSummarySidebar — composes the right-column sticky sidebar:
 * course card, price breakdown (hidden for free courses), trust badges.
 * Single Responsibility: composition only.
 */
interface OrderSummarySidebarProps {
  course: CourseSchema;
  isFree: boolean;
  numericPrice: number;
  pricing: CheckoutPricing;
  couponApplied: boolean;
  hasPremium: boolean;
  selectedPlan: 'standard' | 'premium';
}

export default function OrderSummarySidebar({
  course,
  isFree,
  numericPrice,
  pricing,
  couponApplied,
  hasPremium,
  selectedPlan,
}: OrderSummarySidebarProps) {
  return (
    <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-6">
      <OrderSummaryCourseCard course={course} />

      {!isFree && (
        <PriceBreakdownCard
          numericPrice={numericPrice}
          pricing={pricing}
          couponApplied={couponApplied}
          hasPremium={hasPremium}
          selectedPlan={selectedPlan}
          premiumDeadlineDays={course.premiumDeadlineDays}
        />
      )}

      <TrustBadgesCard />
    </div>
  );
}
